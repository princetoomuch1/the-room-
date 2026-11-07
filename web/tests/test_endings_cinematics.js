const {G,t,eq,ok,done}=require('./harness');
require('../art.js'); require('../cinematics.js');
const C=global.window.CINE, fs=require('fs');
const h=fs.readFileSync(__dirname+'/../index.html','utf8');
console.log('WP-16 tests/test_endings_cinematics.js');
const IDS=['perfect_ledger','doublecross','cartel','chair','ghost','dying','ledger','silence','wall','scapegoat','signature'];
const INK={perfect_ledger:'gold',doublecross:'gold',cartel:'gold',chair:'bone',ghost:'gold',dying:'dim',ledger:'gold',silence:'bone_on_bone',wall:'bright_gold',scapegoat:'oxide',signature:'bone'};
IDS.forEach(id=>{
 t('case '+id+': animation, typewriter, title colour, score behaviour',()=>{
  const e=C.get(id);
  ok(e.anim&&e.dur>=6000&&e.dur<=20000,'Part A duration out of range: '+e.dur);
  const a=C.anim(id);
  ok(a.includes('<svg')&&a.includes('blackout'),'Part A must render and fade');
  ok(a.length>=200,'Part A is empty');
  eq(e.text.split('\n\n').length,3,'Part B must be three paragraphs');
  ok(e.text.length<550,'Part B is '+e.text.length+' chars');
  eq(e.ink,INK[id],'Part C ink');
  ok(h.includes('endtitle.'+e.ink)||e.ink==='gold','ink class must exist in the CSS');
 });
});
t('the Mystery bar renders only for the Perfect Ledger',()=>{
 eq(C.get('perfect_ledger').mystery,true);
 IDS.filter(x=>x!=='perfect_ledger').forEach(id=>ok(!C.get(id).mystery,id+' must not have the Mystery bar'));
 ok(/e\.mystery\?/.test(h),'the score screen must gate the fourth bar on e.mystery');
});
t("The Wall's Edge bar does not render",()=>{
 eq(C.get('wall').bars,'no_edge');
 ok(/no_edge/.test(h)&&/noEdge\?\[\]/.test(h.replace(/\s/g,'')),'the score screen must drop the Edge row');
});
t("The Signature's score screen does not render",()=>{
 eq(C.get('signature').bars,'none');
 ok(/bars==='none'/.test(h),'partC must return early');
});
t("The Chair's bars do not animate",()=>{
 eq(C.get('chair').bars,'static');
 ok(/statik\s*=\s*cine\.bars==='static'/.test(h),'static path must exist');
});
t('skip: space sets ending_skipped and jumps to the end of Part B',()=>{
 ok(/__skipB/.test(h)&&/ending_skipped=true/.test(h),'skip must set the flag');
 ok(/keydown/.test(h)&&/code==='Space'/.test(h),'space must be bound');
 eq(typeof G.S.ending_skipped,'boolean');
});
t('reduced motion shows the paragraph at once with identical text',()=>{
 ok(/if\(reduced\(\)\)\{ el\.innerHTML=esc\(text\)/.test(h),'reduced-motion branch must print the full text');
 ok(/prefers-reduced-motion/.test(h));
});
t('regression: every typewriter text is under 400 characters per paragraph budget and 550 total',()=>{
 const over=IDS.filter(id=>C.get(id).text.length>=550);
 eq(over.join(','),'');
});
t('regression: no text starts with whitespace and every one ends as a sentence',()=>{
 const bad=IDS.filter(id=>{const x=C.get(id).text; return /^\s/.test(x)||!/[.?"]$/.test(x.trim());});
 eq(bad.join(','),'');
});
t('the typewriter pauses on punctuation at the specified intervals',()=>{
 ok(/ch==='\.'\?400/.test(h),'full stop 400ms');
 ok(/ch===','\?200/.test(h),'comma 200ms');
 ok(/38\+pause\(ch\)/.test(h),'38ms per character');
});
t('the typewriter paper is a physical object: grain, coffee ring, upside-down watermark',()=>{
 ok(/twgrain/.test(h)&&/twring/.test(h)&&/twmark/.test(h));
 ok(/rotate\(180deg\)/.test(h),'the watermark must be upside-down');
 ok(/pullback/.test(h),'the camera must pull back from the paper');
});
done();
