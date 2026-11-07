const {G,fresh,t,eq,ok,goRoom,done}=require('./harness');
console.log('WP-04 tests/test_attention.js');
t('point budget is flat and does not reference global insight',()=>{
 [0,12,28,45].forEach(i=>{ fresh(); G.S.insight=i; goRoom('meeting'); eq(G.S.points,4,'insight='+i); });
});
t('hard mode is 3, the Mirror is 2',()=>{
 fresh(true); goRoom('desk'); eq(G.S.points,3);
 fresh(); goRoom('mirror'); eq(G.S.points,2);
});
t('a room carrying a skull-debt consequence loses one point, floor 2',()=>{
 fresh(); goRoom('kitchen'); G.choose('a1a'); G.choose('a2c'); G.choose('a3d');
 G.S.i=1; G.reset(G.ROOMS[1]); eq(G.S.points,3);
 fresh(true); goRoom('kitchen'); G.choose('a1a'); G.choose('a2c'); G.choose('a3d');
 G.S.i=1; G.reset(G.ROOMS[1]); eq(G.S.points,2,'hard + debt floors at 2');
});
t('engine points function contains no reference to insight',()=>{
 const src=require('fs').readFileSync(__dirname+'/../engine.js','utf8');
 const fn=src.slice(src.indexOf('const POINTS='),src.indexOf('function enter('));
 ok(!/insight/.test(fn),'insight still referenced in the points path');
});
t('insight still gates endings',()=>{
 const src=require('fs').readFileSync(__dirname+'/../engine.js','utf8');
 ok(/S\.insight>=/.test(src),'insight must still gate endings');
});
done();
