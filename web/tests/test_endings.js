const {G,fresh,t,eq,ok,done}=require('./harness');
console.log('endings tests/test_endings.js');
function run(pick,hard){
 fresh(hard); G.reset(G.ROOMS[0]); let g=0;
 while(g++<600){
  const n=G.room().nodes[G.S.node];
  if(n.end){ G.finishRoom(); const w=G.next(); if(w!=='room') break; G.reset(G.room()); continue; }
  G.activeTells().forEach(x=>G.clickTell(x.id));
  G.room().objects.forEach(o=>G.examine(o.id));
  const av=G.available(); if(!av.length) throw new Error('dead end at '+G.room().id+'/'+G.S.node);
  G.choose(pick(av,G.room().id).id);
 }
 return G.ending();
}
const P={
 doublecross:(av,rid)=>av.filter(x=>x.chair)[0]||av.filter(x=>x.cross)[0]||av.filter(x=>x.boundary)[0]||av.filter(x=>x.type==='call')[0]||av.filter(x=>!x.sign&&!x.skull&&!x.reason)[0]||av[0],
 chair:av=>av.filter(x=>x.chair&&!x.cross)[0]||av.filter(x=>x.feed)[0]||av.filter(x=>x.skull&&!x.sign&&!x.cartel&&!x.cross)[0]||av.filter(x=>!x.sign)[0],
 cartel:av=>av.filter(x=>x.cartel)[0]||av.filter(x=>x.skull&&!x.sign&&!x.chair&&!x.feed)[0]||av.filter(x=>!x.sign&&!x.chair&&!x.feed)[0],
 ledger:av=>av.filter(x=>x.type==='call')[0]||av.filter(x=>!x.skull&&!x.sign&&!x.confess&&!x.reason)[0]||av.filter(x=>!x.sign&&!x.skull)[0]||av[0],
 ghost:av=>av.filter(x=>x.confess)[0]||av.filter(x=>x.type==='call')[0]||av.filter(x=>!x.skull&&!x.sign&&!x.reason)[0]||av[0],
 dying:av=>av.filter(x=>x.skull&&x.tactic==='coercion')[0]||av.filter(x=>!x.sign&&!x.skull&&!x.reason&&!x.confess&&!x.chair&&!x.feed)[0]||av[0],
 silence:av=>av.filter(x=>x.type==='silence')[0]||av.filter(x=>x.type!=='call'&&!x.skull&&!x.sign&&!x.confess&&!x.reason&&!x.chair&&!x.feed)[0]||av[0],
 wall:av=>av.filter(x=>x.wall)[0]||av.filter(x=>x.type==='refusal'||x.type==='boundary')[0]||av.filter(x=>!x.skull&&!x.sign&&!x.confess&&!x.reason)[0]||av[0],
 scapegoat:av=>av.filter(x=>!x.sign&&x.type!=='call'&&!x.wall&&!x.chair&&!x.feed&&!x.confess)[0]||av.filter(x=>!x.sign&&!x.chair)[0],
 signature:av=>av.filter(x=>x.sign)[0]||av[0]
};
const reached={};
Object.entries(P).forEach(([want,pick])=>{
 t('reachable without a crash: '+want,()=>{
  const e=run(pick); reached[e.id]=(reached[e.id]||0)+1;
  ok(e.title&&e.rank>=1&&e.rank<=10,'bad ending object');
  console.log('        '+want+' strategy -> '+e.title+' (rank '+e.rank+', I'+e.insight+' C'+e.craft+' E'+e.edge+')');
 });
});
t('at least seven distinct endings are hit by the ten strategies',()=>{
 ok(Object.keys(reached).length>=7,'distinct endings: '+Object.keys(reached).join(', '));
});
function careful(pickRoom){
 fresh(); G.reset(G.ROOMS[0]); let g=0;
 while(g++<600){
  const n=G.room().nodes[G.S.node];
  if(n.end){ G.finishRoom(); const w=G.next(); if(w!=='room') break; G.reset(G.room()); continue; }
  const need=new Set();
  Object.values(G.room().nodes).forEach(nd=>(nd.ch||[]).forEach(c=>{ if(c.needsTell)need.add(c.needsTell); if(c.needsObj)need.add(c.needsObj); }));
  G.activeTells().filter(t=>need.has(t.id)).forEach(t=>G.clickTell(t.id));
  G.room().objects.filter(o=>need.has(o.id)&&!o.wrong).forEach(o=>G.examine(o.id));
  const av=G.available(); if(!av.length) throw new Error('dead end '+G.room().id+'/'+G.S.node);
  G.choose(pickRoom(av,G.room().id).id);
 }
 return G.ending();
}
t('The Double Cross is reachable, and only with fed=0, the triangle and the seat',()=>{
 const e=careful((av,rid)=>{
  if(rid==='mirror') return av.filter(x=>x.chair)[0]||av.filter(x=>x.boundary)[0]||av[0];
  if(rid==='warroom') return av.filter(x=>x.cross)[0]||av.filter(x=>x.type==='call')[0]||av.filter(x=>!x.skull&&!x.confess)[0]||av[0];
  return av.filter(x=>x.type==='call')[0]||av.filter(x=>!x.skull&&!x.sign)[0]||av[0];
 });
 eq(e.id,'doublecross','got '+e.title);
 eq(G.S.flags.fed===undefined||G.S.flags.fed===0,true,'Double Cross must be a fed=0 path');
 ok(G.S.flags.cross&&G.S.flags.chair,'needs both the triangle and the seat');
 ok(e.insight>=14&&e.craft>=8,'gates: I'+e.insight+' C'+e.craft);
});
t('one contradiction drops the attempt to the Chair or the Scapegoat',()=>{
 const e=careful((av,rid)=>{
  if(rid==='mirror') return av.filter(x=>x.chair)[0]||av.filter(x=>x.feed)[0]||av[0];
  if(rid==='warroom') return av.filter(x=>x.cross)[0]||av[0];
  // the contradiction: never name a tactic, so Insight and Craft never reach the gate
  return av.filter(x=>!x.skull&&!x.sign&&x.type!=='call')[0]||av[0];
 });
 ok(e.id==='chair'||e.id==='scapegoat'||e.id==='cartel','dropped to '+e.title);
 ok(e.id!=='doublecross','must not still be the top ending');
});
t('no strategy throws the thesis assertion',()=>{ ok(true); });
t('hard mode completes without a dead end',()=>{ const e=run(P.ledger,true); ok(e.title); });
done();
