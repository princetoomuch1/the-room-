const {G,fresh,t,eq,ok,done}=require('./harness');
require('../content3.js');
const W=global.window, fs=require('fs');
const h=fs.readFileSync(__dirname+'/../index.html','utf8');
console.log('WP-19 tests/test_story_length.js');
t('before-context exists and runs in order to the night of the call',()=>{
 eq(W.BEFORE.length,5); ok(/2001/.test(W.BEFORE[0].date)); ok(/8 November 2026/.test(W.BEFORE[4].date));
 ok(/function before\(i\)/.test(h)&&/before\(0\)/.test(h),'start must play the before-context');
});
t('prologue: Meera, the photograph warning, and the hidden ending',()=>{
 G.interStart(W.PROLOGUE); G.interChoose('p1c');
 eq(G.INTER.node,'p_turned'); eq(G.S.hiddenEnding,true);
 eq(W.PROLOGUE.nodes.p_turned.arch,'You turned the car around.');
 fresh(); G.interStart(W.PROLOGUE); ['p1b2','p2a','p3a'].forEach(id=>G.interChoose(id));
 eq(G.S.carry.warned_about_photo,true);
 fresh(); G.interStart(W.PROLOGUE); ['p1b2','p2a','p3c'].forEach(id=>G.interChoose(id));
 eq(G.S.carry.suspicious_of_meera,true);
});
t('the prologue flags change lines in later rooms',()=>{
 const k=G.ROOMS[0], m=G.ROOMS[4];
 ok(Object.values(k.nodes).some(n=>(n.ch||[]).some(c=>c.needsCarry==='warned_about_photo')),'Kitchen must react to the warning');
 ok(Object.values(m.nodes).some(n=>(n.ch||[]).some(c=>c.needsCarry==='suspicious_of_meera')),'Meeting must react to suspicion of Meera');
});
t('every corridor sets its flag and the next room references it',()=>{
 const order=['kitchen','desk','table','deposit','meeting','fund','warroom','mirror'];
 const miss=[];
 Object.entries(W.CORRIDORS).forEach(([after,c])=>{
  const flags=new Set(); Object.values(c.nodes).forEach(n=>(n.ch||[]).forEach(x=>{ if(x.sets) flags.add(x.sets); }));
  if(after==='warroom') return;  // the last corridor has no choice by design
  if(!flags.size){ miss.push(after+': sets no flag'); return; }
  const next=G.ROOMS[order.indexOf(after)+1];
  const used=[...flags].some(f=>Object.values(next.nodes).some(n=>(n.ch||[]).some(x=>x.needsCarry===f)));
  if(!used) miss.push(after+' corridor flags '+[...flags].join('/')+' not referenced in '+next.id);
 });
 eq(miss.join(' | '),'');
});
t('memory nodes exist and are reachable',()=>{
 const mem=[]; G.ROOMS.forEach(r=>Object.entries(r.nodes).forEach(([id,n])=>{ if(n.memory) mem.push(r.id+'/'+id); }));
 ok(mem.length>=6,'memories: '+mem.join(', '));
 G.ROOMS.forEach(r=>Object.entries(r.nodes).forEach(([id,n])=>{ if(!n.memory) return;
  const reach=Object.values(r.nodes).some(x=>(x.ch||[]).some(c=>c.next===id)); ok(reach,r.id+'/'+id+' unreachable'); }));
});
t('Lukas, Ines and the Greek are in the rooms, not only in the bible',()=>{
 const txt=JSON.stringify(G.ROOMS);
 ok(/Vermeulen/.test(txt)&&/Boris/.test(txt),'Lukas and his cat');
 ok(/Ines/.test(txt)&&/earring/i.test(txt),'Ines and the earring');
 ok(/the Greek/.test(txt),'the Greek');
 ok(/read_lukas_letter/.test(txt)&&/knows_greek/.test(txt),'both feed the War Room');
});
t('epilogues: three paragraphs, under 550 characters',()=>{
 require('../art.js'); require('../cinematics.js');
 Object.entries(W.CINE.ENDINGS).forEach(([id,e])=>{ eq(e.text.split('\n\n').length,3,id); ok(e.text.length<550,id); });
});
t('the story bible exists and is dated',()=>{
 const b=fs.readFileSync(__dirname+'/../content/story/bible.md','utf8');
 ok(/Dated 2026-11-08/.test(b)); ok(/Ines Marchetti/.test(b)&&/Lukas Vermeulen/.test(b)&&/the Greek/.test(b));
});
done();
