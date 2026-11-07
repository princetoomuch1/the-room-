const {G,fresh,t,eq,ok,goRoom,play,done}=require('./harness');
console.log('WP-01 tests/test_mirror_reasons.js');
t('Case A: the reproduced exploit v1c->v2d->v3a->v4a yields partial, not clean',()=>{
 fresh(); G.S.carry={truth_said:true}; goRoom('mirror');
 play('v1c','v2d','v3a');            // fed reasons, then a boundary
 eq(G.S.node,'v_cracked','v4 must route to v_cracked when fed>0');
 play('vc1');
 const o=G.finishRoom();
 eq(o.end,'partial'); eq(!!G.S.carry.mirror_held,false,'mirror_held');
 const e=G.ending(); ok(e.id!=='ledger'&&e.id!=='doublecross','ending was '+e.id);
});
t('Case B: clean boundary, fed=0, two boundaries held -> clean + mirror_held',()=>{
 fresh(); G.S.carry={truth_said:true}; goRoom('mirror');
 play('v1a','v2a','v4a');
 eq(G.S.flags.fed===undefined||G.S.flags.fed===0,true,'fed must be 0');
 const o=G.finishRoom(); eq(o.end,'clean'); eq(!!G.S.carry.mirror_held,true);
});
t('Case C: one reason then silence -> partial',()=>{
 fresh(); G.S.carry={truth_said:true}; goRoom('mirror');
 play('v1c','v2c'); eq(G.S.flags.fed,1);
 eq(G.S.node,'v_cracked'); play('vc2');
 eq(G.finishRoom().end,'partial');
});
t('Case D: three reasons then a late boundary is not redeemed',()=>{
 fresh(); G.S.carry={truth_said:true}; goRoom('mirror');
 play('v1d','v3a'); ok((G.S.flags.fed||0)>=3,'fed='+G.S.flags.fed);
 eq(G.S.node,'v_cracked'); play('vc1');
 eq(G.finishRoom().end,'partial');
});
t('assertion throws if a fed run is ever resolved as Open Ledger',()=>{
 fresh(); G.S.flags.fed=2; G.S.carry={truth_said:true,mirror_held:true};
 G.S.insight=20; G.S.skulls=0; G.S.calls=5; G.S.silences=0;
 let threw=false; try{G.ending();}catch(e){threw=/THESIS ASSERTION/.test(e.message);}
 ok(threw,'assertion did not fire');
});
done();
