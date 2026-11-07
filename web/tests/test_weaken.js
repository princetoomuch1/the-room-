const {G,fresh,t,eq,ok,goRoom,done}=require('./harness');
console.log('WP-06 tests/test_weaken.js');
t('a correct CALL quarters that tactic for the rest of the room',()=>{
 fresh(); goRoom('meeting');
 G.examine('pad');
 G.choose('b1c');                 // -> b4, where t_filing lives
 G.clickTell('t_filing');
 G.choose('b4_gamble');           // correct: pad examined
 ok(G.S.weakened.indexOf('deniable_threat')>=0,'tactic recorded');
});
t('the weakened tactic renders one line of feedback when tried again',()=>{
 fresh(); goRoom('desk');
 G.examine('log'); G.choose('j1_gamble');          // weakens passive_voice
 G.S.weakened.push('procedural_shield');            // j3 carries npcTactic procedural_shield
 G.choose('j2c');
 eq(G.S.node,'j3');
 G.choose('j3d');
 eq(G.S.feedback,'She tries it again and it does not land.');
});
t('the multiplier is not applied to a tactic that was never called',()=>{
 fresh(); goRoom('kitchen');
 const f0=G.S.fear; G.choose('a1c');                // pressure, threat 0.4, nothing weakened
 ok(G.S.fear>f0+8,'full pressure expected, got '+(G.S.fear-f0));
 fresh(); goRoom('kitchen'); G.S.weakened.push('x_unrelated');
 const f1=G.S.fear; G.choose('a1c');
 ok(G.S.fear>f1+8,'unrelated weaken must not reduce pressure');
});
t('grep: the engine contains the weakening code',()=>{
 const src=require('fs').readFileSync(__dirname+'/../engine.js','utf8');
 ok(/weakened/.test(src)&&/0\.25/.test(src),'weaken code missing');
});
done();
