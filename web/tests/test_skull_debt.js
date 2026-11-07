const {G,fresh,t,eq,ok,goRoom,play,done}=require('./harness');
console.log('WP-03 tests/test_skull_debt.js');
function baselinePoints(id){ fresh(); goRoom(id); return G.S.points; }
t('kitchen_lawyer: a dirty Kitchen measurably hardens the Desk',()=>{
 const base=baselinePoints('desk'); eq(base,4,'baseline Desk points');
 fresh(); goRoom('kitchen'); play('a1a','a2c','a3d');   // skull: manufactured consequence
 ok(G.S.seeds.some(s=>s.seed==='kitchen_lawyer'),'seed not written');
 play('a1a'); G.finishRoom();
 G.S.i=1; G.reset(G.ROOMS[1]);
 eq(G.S.node,'__inj0','injected consequence must run before the opening line');
 ok(/solicitor/.test(G.ROOMS[1].nodes.__inj0.line),'authored consequence line');
 eq(G.S.trust,25,'trust must start 15 lower than 40');
 eq(G.S.points,base-1,'one attention point fewer');
});
t('desk_note: a dirty Desk marks a Table objection known to the other side',()=>{
 fresh(); goRoom('desk'); play('j1a','j2c','j3b');      // skull at j3b
 ok(G.S.seeds.some(s=>s.seed==='desk_note'),'seed');
 G.S.i=2; G.reset(G.ROOMS[2]);
 eq(G.S.node,'__inj0'); eq(!!G.S.known.clause9,true,'clause9 known to the other side');
});
t('deposit_radu: buying Radu empties a chair at the Meeting and closes a move',()=>{
 fresh(); goRoom('deposit'); play('r1d');               // skull: purchase
 ok(G.S.seeds.some(s=>s.seed==='deposit_radu'),'seed');
 G.S.i=4; G.reset(G.ROOMS[4]);
 eq(G.S.node,'__inj0'); eq(!!G.S.disabled.b2a,true,'b2a must be unavailable');
 play('inj_b1');
 ok(!G.available().some(c=>c.id==='b2a')||G.S.node!=='b2','disabled choice must not be offered');
});
t('meeting_devries: trading a name hardens the War Room and burns a tell',()=>{
 fresh(); goRoom('meeting'); play('b1c','b4d');          // skull: scapegoat a third party
 ok(G.S.seeds.some(s=>s.seed==='meeting_devries'),'seed');
 G.S.i=6; G.reset(G.ROOMS[6]);
 eq(G.S.node,'__inj0'); eq(G.S.trust,15,'trust 25 lower');
 eq(!!G.S.burned.t_loyal,true,'t_loyal must be closed early');
});
t('data-driven: with no seed in the log there is no injection',()=>{
 fresh(); G.S.i=1; G.reset(G.ROOMS[1]);
 eq(G.S.node,'j1','clean run must open on the NPC line');
 eq(G.S.trust,40); eq(G.S.points,4);
});
done();
