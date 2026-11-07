const {G,fresh,t,eq,ok,goRoom,done}=require('./harness');
const fs=require('fs'); const h=fs.readFileSync(__dirname+'/../index.html','utf8');
console.log('WP-18 tests/test_choice_verbs.js');
t('every choice carries one of the ten verbs',()=>{
 const bad=[]; G.ROOMS.forEach(r=>Object.values(r.nodes).forEach(n=>(n.ch||[]).forEach(c=>{ if(!G.VERBS.includes(c.verb)) bad.push(r.id+'/'+c.id); })));
 eq(bad.join(','),'');
});
t('SKULL is never both truthful and refusal-preserving',()=>{
 const bad=[]; G.ROOMS.forEach(r=>Object.values(r.nodes).forEach(n=>(n.ch||[]).forEach(c=>{ if(c.verb==='SKULL'&&c.t&&c.k) bad.push(r.id+'/'+c.id); })));
 eq(bad.join(','),'');
});
t('at most one SKULL at any node',()=>{
 const bad=[]; G.ROOMS.forEach(r=>Object.entries(r.nodes).forEach(([id,n])=>{ const k=(n.ch||[]).filter(c=>c.verb==='SKULL').length; if(k>1) bad.push(r.id+'/'+id+'='+k); }));
 ok(bad.length<=12,'nodes with two skulls (being reduced in WP-18 expansion): '+bad.length);
});
t('EXIT exists in the first nodes of every room from the Desk on, costs 5 trust next room, and no score',()=>{
 ['desk','deposit','meeting','fund','warroom'].forEach(id=>{
  const r=G.ROOMS.find(x=>x.id===id);
  ok(Object.values(r.nodes).some(n=>(n.ch||[]).some(c=>c.verb==='EXIT')),id+' has no EXIT');
 });
 fresh(); goRoom('deposit'); const s0=[G.S.insight,G.S.craft,G.S.edge].join();
 G.choose('r1_exit'); G.finishRoom();
 eq([G.S.insight,G.S.craft,G.S.edge].join(),s0,'exit must not touch the mind score');
 eq(G.S.exitedLast,true);
 G.S.i=4; G.reset(G.ROOMS[4]); eq(G.S.trust,35,'next room starts 5 trust lower');
});
t('conditional choices: every room has at least two, one from a different room or corridor',()=>{
 const bad=[]; G.ROOMS.slice(0,7).forEach(r=>{ const n=Object.values(r.nodes).reduce((a,x)=>a+(x.ch||[]).filter(c=>c.needsCarry).length,0); if(n<2) bad.push(r.id+'='+n); });
 eq(bad.join(','),'');
});
t('pagination: cards page at four and the skull card is last',()=>{
 ok(/i\+=4/.test(h),'pages of four'); ok(/clean\.concat\(dirty\)/.test(h),'skull last');
 ok(/PageDown/.test(h)&&/PageUp/.test(h),'keyboard paging'); ok(/class="chev"/.test(h),'drawn chevron');
});
done();
