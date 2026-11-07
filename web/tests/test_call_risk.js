const {G,fresh,t,eq,ok,goRoom,play,done}=require('./harness');
console.log('WP-05 tests/test_call_risk.js');
t('a wrong CALL costs 10 trust, burns the tell, and raises the next pressure',()=>{
 fresh(); goRoom('desk');
 const t0=G.S.trust;
 G.choose('j1_gamble');                     // ungated, and the log was never examined
 eq(G.S.lastCallWrong,true,'should be wrong');
 eq(G.S.trust,t0-10,'trust');
 eq(!!G.S.burned.t_policy,true,'tell burned');
 eq(G.S.pressureMult,1.25,'next pressure multiplier');
 eq(G.S.feedback,'She looks at you differently.','feedback line, no explanation');
 ok(!/wrong|should/i.test(G.S.feedback),'must not explain the mistake');
});
t('the same CALL is correct once the contradiction has been surfaced',()=>{
 fresh(); goRoom('desk');
 G.examine('log');
 const i0=G.S.insight;
 G.choose('j1_gamble');
 eq(G.S.lastCallWrong,false);
 eq(G.S.insight,i0+2,'+2 Insight');
 ok(G.S.weakened.indexOf('passive_voice')>=0,'tactic weakened');
});
t('every room from the Desk onward has at least one CALL with no needsTell',()=>{
 const miss=[];
 G.ROOMS.slice(1,7).forEach(r=>{
  const n=Object.values(r.nodes).reduce((a,nd)=>a+(nd.ch||[]).filter(c=>c.type==='call'&&!c.needsTell).length,0);
  if(n===0) miss.push(r.id);
 });
 eq(miss.join(','),'','rooms with no gamble CALL');
});
t('the twenty gated CALLs still cannot be taken without the tell',()=>{
 fresh(); goRoom('kitchen'); G.choose('a1a');
 ok(!G.available().some(c=>c.id==='a3_call'),'gated CALL must stay closed');
});
done();
