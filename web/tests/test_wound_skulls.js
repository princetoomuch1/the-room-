const {G,fresh,t,eq,ok,room,goRoom,play,done}=require('./harness');
console.log('WP-02 tests/test_wound_skulls.js');
t('desk/j7c now ends the Desk in loss and the register is not collected',()=>{
 fresh(); goRoom('desk');
 play('j1a','j2b','j4a','j5c');
 eq(G.S.node,'j7','should be at the wound node');
 play('j7c');
 eq(G.S.node,room('desk').lossNode);
 const o=G.finishRoom(); eq(o.end,'loss');
 eq(!!G.S.carry.has_name,false,'name must not be collected');
 eq(G.S.edge,0,'no Edge awarded on a wound skull');
});
t('deposit/r6c reference implementation still ends in loss',()=>{
 fresh(); goRoom('deposit');
 play('r1a','r2a','r4a','r5a'); eq(G.S.node,'r6');
 play('r6c'); eq(G.finishRoom().end,'loss');
});
t('the disclosed warning sign is surfaced as a vignette, with no lecture',()=>{
 fresh(); goRoom('desk');
 play('j1a','j2b','j4a','j5c','j7c');
 const o=G.finishRoom();
 ok(o.missed.length>0 && /ruler/.test(o.missed[0].anchor),'vignette: '+JSON.stringify(o.missed[0]));
 ok(!/should have/i.test(o.arch),'no lecture in the closing line');
});
t('validator: every skull on a wound node routes to the declared loss node',()=>{
 const bad=[];
 G.ROOMS.forEach(r=>Object.entries(r.nodes).forEach(([id,n])=>{
  if(!n.wound) return;
  if(!r.lossNode) bad.push(r.id+': wound node '+id+' but no lossNode declared');
  (n.ch||[]).forEach(c=>{ if(c.skull && c.next!==r.lossNode && !(r.nodes[c.next]||{}).end) bad.push(r.id+'/'+id+'/'+c.id); });
 }));
 eq(bad.join('; '),'','unrouted wound skulls');
});
done();
