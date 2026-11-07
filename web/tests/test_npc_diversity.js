const {t,eq,ok,done}=require('./harness');
require('../rigs.js'); require('../faces.js');
const R=global.window.RIGS, F=global.window.FACES, EXP=global.window.EXPRESSIONS;
console.log('WP-20 tests/test_npc_diversity.js');
const NAMED=['anna','joost','mieke','radu','board','gio','marek','devries','emil','meera','voss'];
t('silhouette test: no two characters within 15% of each other',()=>{
 const ids=Object.keys(R); const vec=id=>{const r=R[id];return [r.shoulders/46,r.head/1.1,r.neck/16,(r.lean+12)/24,(r.drop+6)/24];};
 const close=[];
 for(let i=0;i<ids.length;i++)for(let j=i+1;j<ids.length;j++){
  const a=vec(ids[i]),b=vec(ids[j]); const d=Math.sqrt(a.reduce((s,x,k)=>s+(x-b[k])**2,0))/Math.sqrt(a.length);
  if(d<0.15) close.push(ids[i]+'~'+ids[j]+'='+d.toFixed(3));
 }
 eq(close.join(', '),'');
});
t('every silhouette has a named shape and none repeat',()=>{
 const shapes=Object.values(R).map(r=>r.shape); eq(new Set(shapes).size,shapes.length,'duplicate shape');
});
t('idle: exactly one fidget, one breathing rate, one blink rate',()=>{
 const bad=Object.entries(R).filter(([id,r])=>!r.fidget||typeof r.fidget.what!=='string'||Array.isArray(r.fidget.what)||typeof r.breath!=='number'||typeof r.blink!=='number').map(x=>x[0]);
 eq(bad.join(','),'');
});
t('blink bands: anxious 20-25, still 11-15',()=>{
 ['joost','radu'].forEach(id=>ok(R[id].blink>=20&&R[id].blink<=25,id+' blink '+R[id].blink));
 ['board','devries'].forEach(id=>ok(R[id].blink>=11&&R[id].blink<=15,id+' blink '+R[id].blink));
});
t('gestures: named characters use three to six of the twelve and have one surprise',()=>{
 NAMED.filter(x=>x!=='voss').forEach(id=>{const r=R[id]; ok(r.gestures.length>=3&&r.gestures.length<=6,id+' gestures '+r.gestures.length);
  ok(r.surprise&&!r.gestures.includes(r.surprise.gesture),id+' surprise must be outside the set');});
});
t('expressions: eight, including the lying face that flattens',()=>{
 eq(EXP.length,8);
 ['lying','listening','thinking','resisting','caught','conceding','human'].forEach(e=>ok(F.emotions[e],'missing expression '+e));
 const L=F.emotions.lying; eq(L.mouth,'flat'); ok(L.gx<0&&L.gy<0,'eyes up-left');
});
t('human moments: every named character has one, with alt text and a hold of 2 to 4 seconds',()=>{
 NAMED.forEach(id=>{const h=R[id].human; ok(h&&h.alt&&h.ms>=2000&&h.ms<=4000,id+' human moment');});
});
t('every rigged character renders a distinct portrait',()=>{
 const svgs=Object.keys(R).map(id=>F.render(id,'neutral',{}));
 eq(new Set(svgs).size,svgs.length,'two portraits rendered identically');
});
done();
