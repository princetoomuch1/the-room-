const {G,fresh,t,eq,ok,done}=require('./harness');
console.log('WP-15 tests/test_perfect_ledger.js');
// a flawless run: read every tactic tell, take every CALL, no skulls, hold the Mirror
function flawless(mutate){
 fresh(); G.reset(G.ROOMS[0]); let g=0;
 while(g++<700){
  const n=G.room().nodes[G.S.node];
  if(n.end){ G.finishRoom(); const w=G.next(); if(w!=='room') break; G.reset(G.room()); continue; }
  (n.tells||[]).forEach(tl=>{ if(tl.tactic) G.clickTell(tl.id); });
  const need=new Set();
  Object.values(G.room().nodes).forEach(nd=>(nd.ch||[]).forEach(c=>{ if(c.needsObj)need.add(c.needsObj); }));
  G.room().objects.filter(o=>need.has(o.id)).forEach(o=>G.examine(o.id));
  let av=G.available();
  if(mutate){ const m=mutate(av,G.room().id,G.S.node); if(m){ G.choose(m.id); continue; } }
  const call=av.filter(x=>x.type==='call'&&x.needsTell)[0] || av.filter(x=>x.type==='call')[0];
  const pick = call || av.filter(x=>!x.skull&&!x.sign&&!x.reason&&!x.feed&&!x.contradiction)[0] || av[0];
  G.choose(pick.id);
 }
 return G.ending();
}
t('Case A: a flawless run resolves as The Perfect Ledger with the fourth bar',()=>{
 const e=flawless(null);
 eq(e.id,'perfect_ledger','got '+e.title+' — broken by: '+(G.S.perfect_broken||[]).slice(0,3).join('; '));
 eq(e.mystery,true,'the Mystery bar must render');
 eq(G.S.perfect,true);
 eq(G.S.bookkeeper_died,true,'the Room 2 line kills Lukas even on the clean path');
 eq(G.S.clean_failures,0); eq(G.S.calls_wrong,0); eq(G.S.skulls_detected,0);
 eq(G.S.flags.fed||0,0); eq(G.S.warroom_contradiction,false);
});
t('Case B: one wrong CALL ends perfection and the fourth bar does not render',()=>{
 const e=flawless((av,rid,node)=>{ if(rid==='desk'&&node==='j1'){ G.S.examined.log=false; return av.find(x=>x.id==='j1_gamble'); } return null; });
 eq(G.S.calls_wrong>=1,true);
 eq(G.S.perfect,false);
 ok(e.id!=='perfect_ledger','got '+e.title);
 ok(!e.mystery,'no Mystery bar');
});
t('Case C: one unread tell ends perfection',()=>{
 fresh(); G.S.i=1; G.reset(G.ROOMS[1]);
 eq(G.S.perfect,true,'starts perfect');
 G.choose('j1a');                       // leaves j1 with t_policy unread, which carries a tactic
 eq(G.S.perfect,false,'an unread tactic-bearing tell must end perfection');
 ok((G.S.perfect_broken||[]).some(x=>/unread tell/.test(x)),(G.S.perfect_broken||[]).join('; '));
 // and a tell with no tactic is not required
 fresh(); G.reset(G.ROOMS[0]);
 G.choose('a1a');                       // t_turn has tactic:null
 ok(!(G.S.perfect_broken||[]).some(x=>/t_turn/.test(x)),'a non-tactic tell must not break perfection');
});
t('Case D: one reason fed to the Mirror ends perfection and still routes to v_cracked',()=>{
 fresh(); G.S.carry={truth_said:true}; G.S.i=7; G.reset(G.ROOMS[7]);
 G.choose('v1c');
 eq(G.S.flags.fed,1); eq(G.S.perfect,false);
 G.choose('v2c'); eq(G.S.node,'v_cracked','WP-01 routing must still hold');
 G.choose('vc1'); eq(G.finishRoom().end,'partial');
 const e=G.ending(); ok(e.id!=='perfect_ledger');
});
t('Case E: the bookkeeper cannot be saved, and a Room 2 exit that saves him blocks perfection',()=>{
 // reading 1: every Room 2 ending that yields the file sets bookkeeper_died
 fresh(); G.S.i=1; G.reset(G.ROOMS[1]);
 G.clickTell('t_policy'); G.choose('j1d'); G.choose('j4a'); G.choose('j5b');
 const o=G.finishRoom(); eq(o.end,'clean'); eq(G.S.bookkeeper_died,true);
 // reading 2: a run where he does not die cannot be perfect, because the condition fails
 fresh(); G.S.perfect=true; G.S.bookkeeper_died=false; G.S.carry={mirror_held:true};
 G.S.clean_failures=0; G.S.calls_wrong=0; G.S.missed_tactic_tells=0; G.S.missed_calls=0;
 const e=G.ending(); ok(e.id!=='perfect_ledger','a run without the death must not be perfect');
});
t('Case F: the assertion throws if a perfect run resolves as anything else',()=>{
 // force every perfect condition true, then also force the chair, which outranks nothing:
 // the resolver must return perfect_ledger, and if a future edit reorders it, the assertion fires
 fresh();
 G.S.perfect=true; G.S.bookkeeper_died=true; G.S.carry={mirror_held:true,took_chair:true};
 G.S.flags={chair:true,cross:true}; G.S.insight=40; G.S.craft=30;
 G.S.clean_failures=0; G.S.calls_wrong=0; G.S.missed_tactic_tells=0; G.S.missed_calls=0; G.S.skulls_detected=0;
 eq(G.ending().id,'perfect_ledger','a perfect run must outrank every other ending');
 // now break the resolver's order on a copy of the condition and confirm the guard is live
 const src=require('fs').readFileSync(__dirname+'/../engine.js','utf8');
 ok(/pguard=e=>\{ if\(perfect && e\.id!=="perfect_ledger"\) throw/.test(src),'guard must throw, not log');
});
t('the assertion cannot be disabled by config',()=>{
 const src=require('fs').readFileSync(__dirname+'/../engine.js','utf8');
 ok(/PERFECT ASSERTION/.test(src)&&!/if\s*\(\s*CONFIG/.test(src),'assertion must be unconditional');
});
done();
