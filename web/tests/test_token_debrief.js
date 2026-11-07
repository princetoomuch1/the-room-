const {G,fresh,t,eq,ok,goRoom,play,done}=require('./harness');
const fs=require('fs');
console.log('WP-07 tests/test_token_debrief.js');
t('a genuine yes renders agreement and nothing else',()=>{
 fresh(); goRoom('kitchen'); play('a1a','a2a','a4a','a6a','a7a','a8a','a9a');
 const o=G.finishRoom();
 eq(o.end,'clean'); eq(o.token,'agreement');
});
t('a pressured yes renders compliance with numeric back-out odds',()=>{
 fresh(); goRoom('kitchen'); play('a1a','a2c','a3d');
 const o=G.finishRoom();
 eq(o.token,'compliance'); ok(typeof o.odds==='number'&&o.odds>0&&o.odds<100,'odds='+o.odds);
});
t('the debrief carries both strings and no advice',()=>{
 const h=fs.readFileSync(__dirname+'/../index.html','utf8');
 ok(/You got an agreement\./.test(h),'agreement string');
 ok(/You got compliance\. It holds for now; it will not hold\./.test(h),'compliance string');
 ok(/Back-out odds \$\{out\.odds\}%/.test(h),'odds rendered');
 ok(!/you should have/i.test(h),'no advice');
});
t('the token line is announced to a screen reader',()=>{
 const h=fs.readFileSync(__dirname+'/../index.html','utf8');
 ok(/aria-live="polite"[^>]*>\$\{out\.token/.test(h.replace(/\n/g,'')),'aria-live on the token line');
});
done();
