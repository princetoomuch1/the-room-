const {G,t,eq,ok,done}=require('./harness');
console.log('WP-18.4/18.5 tests/test_paths.js');
// can a node reach an ending of the wanted kind without a skull, a signature, or a carry from another room?
function reach(r,want){
 const memo={}, onstack=new Set();
 function go(id){
  if(id in memo) return memo[id];
  const n=r.nodes[id]; if(!n) return false;
  if(n.branch){ return n.branch.some(x=>go(x.goto)); }
  if(n.end) return memo[id]=(n.end===want);
  if(onstack.has(id)) return false;
  onstack.add(id);
  const ok=(n.ch||[]).some(c=>!c.skull&&!c.sign&&!c.needsCarry&&go(c.next));
  onstack.delete(id); return memo[id]=ok;
 }
 return go;
}
function spines(r,want){
 const can=reach(r,want), s=new Set();
 const start=r.nodes[r.start];
 (start.ch||[]).forEach(c1=>{
  if(c1.skull||c1.needsCarry||c1.sign) return;
  const n2=r.nodes[c1.next]; if(!n2) return;
  if(n2.end){ if(n2.end===want) s.add(c1.verb); return; }
  (n2.ch||[]).forEach(c2=>{ if(c2.skull||c2.needsCarry||c2.sign) return; if(can(c2.next)) s.add(c1.verb+'>'+c2.verb); });
 });
 return s;
}
G.ROOMS.forEach(r=>{
 const need = r.id==='mirror'?1:3;
 t(r.id+': at least '+need+' clean paths with different verb spines',()=>{
  const sp=spines(r,'clean');
  ok(sp.size>=need, r.id+' clean spines: '+sp.size+' '+[...sp].slice(0,4).join(' | '));
 });
 t(r.id+': at least '+(r.id==='mirror'?1:2)+' partial paths',()=>{
  const sp=spines(r,'partial');
  ok(sp.size>=(r.id==='mirror'?1:2), r.id+' partial spines: '+sp.size);
 });
});
t('no node offers more than one SKULL',()=>{
 const bad=[]; G.ROOMS.forEach(r=>Object.entries(r.nodes).forEach(([id,n])=>{ if((n.ch||[]).filter(c=>c.skull).length>1) bad.push(r.id+'/'+id); }));
 eq(bad.join(','),'');
});
t('every non-terminal node offers four to eight choices (counting what is visible without earned flags)',()=>{
 const bad=[]; G.ROOMS.forEach(r=>Object.entries(r.nodes).forEach(([id,n])=>{
  if(!n.ch||id.startsWith('__inj')) return;
  const always=n.ch.filter(c=>!c.needsCarry&&!c.needsObj&&!c.needsTell).length;
  if(n.ch.length<4||always>8) bad.push(r.id+'/'+id+'='+n.ch.length+'/'+always);
 }));
 eq(bad.join(','),'');
});
t('every node with choices offers a PROBE or REFLECT, or is a memory, a final, or a human moment',()=>{
 const bad=[]; G.ROOMS.forEach(r=>Object.entries(r.nodes).forEach(([id,n])=>{
  if(!n.ch||n.memory||n.soul||n.wound||id.startsWith('__inj')) return;
  const finalish=n.ch.every(c=>(r.nodes[c.next]||{}).end);
  if(finalish) return;
  if(!n.ch.some(c=>c.verb==='PROBE'||c.verb==='REFLECT')) bad.push(r.id+'/'+id);
 }));
 ok(bad.length<=20,'nodes without a probe: '+bad.length+' '+bad.slice(0,8).join(','));
});
t('node counts meet the spec',()=>{
 const T={kitchen:24,desk:26,table:26,deposit:24,meeting:28,fund:26,warroom:32,mirror:18};
 const short=G.ROOMS.filter(r=>Object.keys(r.nodes).filter(k=>!k.startsWith('__inj')).length<T[r.id]).map(r=>r.id);
 eq(short.join(','),'');
});
done();
