const {G,t,eq,done}=require('./harness');
console.log('graph tests/test_graph.js');
t('zero dangling targets',()=>{
 const bad=[];
 G.ROOMS.forEach(r=>{const ids=Object.keys(r.nodes);
  Object.values(r.nodes).forEach(n=>{
   (n.ch||[]).forEach(c=>{ if(c.next&&!ids.includes(c.next)) bad.push(r.id+'/'+c.id+' -> '+c.next); });
   (n.branch||[]).forEach(b=>{ if(b.goto&&!ids.includes(b.goto)) bad.push(r.id+' branch -> '+b.goto); });
  });});
 eq(bad.join(', '),'');
});
t('zero unreachable nodes',()=>{
 const bad=[];
 G.ROOMS.forEach(r=>{
  const tg=new Set([r.start]);
  Object.values(r.nodes).forEach(n=>{(n.ch||[]).forEach(c=>tg.add(c.next));(n.branch||[]).forEach(b=>tg.add(b.goto));});
  Object.keys(r.nodes).forEach(id=>{ if(!tg.has(id)&&!id.startsWith('__inj')) bad.push(r.id+'/'+id); });
 });
 eq(bad.join(', '),'');
});
t('every room declares a loss node that exists and ends',()=>{
 const bad=[];
 G.ROOMS.forEach(r=>{ const n=r.nodes[r.lossNode]; if(!n||!n.end) bad.push(r.id); });
 eq(bad.join(', '),'');
});
t('every tell carries a false positive and no tell is labelled with its tactic in the anchor',()=>{
 const bad=[];
 G.ROOMS.forEach(r=>Object.entries(r.nodes).forEach(([id,n])=>(n.tells||[]).forEach(tl=>{
  if(!tl.fp) bad.push(r.id+'/'+id+'/'+tl.id+' has no false positive');
  if(tl.tactic && tl.anchor.toLowerCase().includes(tl.tactic.split('_')[0])) bad.push(r.id+'/'+tl.id+' anchor names its tactic');
 })));
 eq(bad.join(', '),'');
});
t('every skull choice is flagged and every CALL declares a tactic',()=>{
 const bad=[];
 G.ROOMS.forEach(r=>Object.values(r.nodes).forEach(n=>(n.ch||[]).forEach(c=>{
  if(c.skull && c.t && c.k) bad.push(r.id+'/'+c.id+' flagged skull but reads clean');
  if(c.type==='call' && !c.call) bad.push(r.id+'/'+c.id+' CALL with no tactic');
 })));
 eq(bad.join(', '),'');
});
done();
