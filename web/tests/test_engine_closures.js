const {G,fresh,t,eq,ok,goRoom,play,done}=require('./harness');
const fs=require('fs');
console.log('WP-08 tests/test_engine_closures.js');
t('8a boomerang: a weak rebuttal drops certainty, a strong one raises it',()=>{
 fresh(); goRoom('desk'); const c0=G.S.certainty;
 G.choose('j1b');                                  // strong, rebuttal marked weak
 eq(G.S.certainty,c0-10,'weak rebuttal should drop certainty');
 fresh(); goRoom('fund'); const c1=G.S.certainty;
 G.choose('g1c'); G.choose('g2c');                 // strong, rebuttal not weak
 eq(G.S.certainty,c1+15,'strong hold should raise certainty');
});
t('8b turn limits are present on every room and fire pressure when exceeded',()=>{
 const missing=G.ROOMS.filter(r=>!r.turnLimit).map(r=>r.id);
 eq(missing.join(','),'','rooms with no turnLimit');
 fresh(); goRoom('deposit'); G.S.turn=99;
 const t0=G.S.trust; G.choose('r1a');
 ok(G.S.limitFired,'limit must fire'); ok(G.S.trust<t0,'stalling must cost trust');
 ok(/too long/.test(G.S.feedback||''),'one authored line: '+G.S.feedback);
});
t('8c hard mode: every room has a loaded hard layer, windows are shorter, clean needs a CALL',()=>{
 const missing=G.ROOMS.filter(r=>!r.hardLayer).map(r=>r.id);
 eq(missing.join(','),'','rooms with no hard overlay');
 fresh(true); goRoom('kitchen'); G.choose('a1a');
 const hardWin=Object.values(G.S.tells)[0].until-G.S.turn;
 fresh(); goRoom('kitchen'); G.choose('a1a');
 const medWin=Object.values(G.S.tells)[0].until-G.S.turn;
 ok(hardWin<medWin,'hard windows must be shorter: '+hardWin+' vs '+medWin);
 // same clean path, two modes, two outcomes
 fresh(true); goRoom('kitchen'); play('a1a','a2a','a4a','a6a','a7a','a8a','a9a');
 eq(G.finishRoom().end,'partial','hard clean without a CALL must drop to partial');
 fresh(); goRoom('kitchen'); play('a1a','a2a','a4a','a6a','a7a','a8a','a9a');
 eq(G.finishRoom().end,'clean','medium clean path unaffected');
});
t('8c hard mode adds one extra hidden layer and medium does not see it',()=>{
 fresh(true); goRoom('warroom'); const h=G.ROOMS[6].hidden.length;
 fresh(); goRoom('warroom'); const m=G.ROOMS[6].hidden.length;
 eq(h-m,1,'hard must add exactly one layer');
});
t('8d accessibility: aria labels, reduced motion, focus states all present',()=>{
 const h=fs.readFileSync(__dirname+'/../index.html','utf8');
 ok((h.match(/aria-label/g)||[]).length>=4,'aria labels');
 ok(/prefers-reduced-motion/.test(h),'reduced motion');
 ok(/focus-visible/.test(h),'focus states');
 ok(/role="img"/.test(h),'stage described');
});
t('13a the clock freezes only after a Wall ending',()=>{
 fresh(); eq(G.S.clockSet,false);
 goRoom('mirror'); play('v1a','v2a','v4a'); G.finishRoom();
 eq(G.S.clockSet,true,'Wall ending must set the clock');
 fresh(); G.S.carry={truth_said:true}; goRoom('mirror'); play('v1c','v2d','v3a','vc1'); G.finishRoom();
 eq(G.S.clockSet,false,'a cracked Mirror must not stop the clock');
});
t('13b the hand is drawn on the two named nodes and nowhere else',()=>{
 const moves=[];
 G.ROOMS.forEach(r=>Object.entries(r.nodes).forEach(([id,n])=>{ if(n.handMove) moves.push(r.id+'/'+id+':'+n.handMove); }));
 eq(moves.sort().join(', '),'desk/j7:square, kitchen/a6:ring');
 const f=fs.readFileSync(__dirname+'/../faces.js','utf8');
 ok(/move==="ring"/.test(f)&&/move==="square"/.test(f),'frames must exist in the renderer');
});
done();
