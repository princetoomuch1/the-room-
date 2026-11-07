const {t,eq,ok,done}=require('./harness');
require('../paper.js');
const P=global.window.PAPER, fs=require('fs');
const h=fs.readFileSync(__dirname+'/../index.html','utf8');
console.log('WP-17.1/17.2 tests/test_text_system.js');
t('Case A: the font stack is chosen, not inherited',()=>{
 ok(/Fraunces/.test(h),'Fraunces must load');
 ok(/Cormorant\+Unicase|Cormorant Unicase/.test(h),'Cormorant Unicase must load');
 ok(/Caveat/.test(h)&&/Special\+Elite|Special Elite/.test(h),'hand and typewriter faces must load');
 const bad=h.match(/system-ui|-apple-system|Segoe UI|Roboto|Helvetica|Arial|sans-serif/g)||[];
 eq(bad.length,0,'system fonts found: '+bad.join(','));
 ok(/fonts\.googleapis\.com/.test(h),'webfonts must come from the allowed host');
 const fam=(h.match(/family=([A-Za-z+]+)/g)||[]).map(x=>x.slice(7));
 eq(fam.sort().join(','),['Atkinson+Hyperlegible','Caveat','Cormorant+Unicase','Fraunces','Permanent+Marker','Special+Elite'].sort().join(','),'exactly the chosen families');
});
t('Case B: the panel is torn paper, not a rectangle',()=>{
 const a=P.panel('kitchen',760,220,{}), b=P.panel('warroom',760,220,{});
 ok(/class="sheet"/.test(a)&&/d="M0/.test(a),'torn path must be drawn');
 const ea=a.match(/d="(M[^"]+)"/)[1], eb=b.match(/d="(M[^"]+)"/)[1];
 ok(ea!==eb,'Kitchen and War Room must have different torn edges');
 ok(/feTurbulence/.test(a),'paper grain');
 ok(/class="fold"/.test(a),'fold line');
 ok(/class="flourish"/.test(a),'gold flourish');
 ok(/mix-blend-mode:multiply/.test(a),'grain must multiply');
});
t('the panel has the specified shadow, perspective, enter, idle and burn',()=>{
 ok(/drop-shadow\(0 8px 32px rgba\(0,0,0,\.55\)\)/.test(h),'drop shadow');
 ok(/rotateX\(1\.5deg\)/.test(h),'perspective warp');
 ok(/@keyframes rise/.test(h)&&/\.32s/.test(h),'enter rise 320ms');
 ok(/@keyframes burn/.test(h)&&/burn \.6s/.test(h),'burn-out 600ms');
 ok(/sheetwrap\.idle/.test(h)&&/setTimeout\(\(\)=>\{const q=document\.getElementById\('sheet'\)/.test(h),'idle shadow after 4s');
 ok(/marginLeft=x\.toFixed/.test(h),'parallax on the panel');
});
t('the Mirror panel has no flourish',()=>{
 ok(!/class="flourish"/.test(P.panel('mirror',760,220,{noFlourish:true})));
 ok(/noFlourish:mirror/.test(h),'the room render must pass it');
});
t('the name plate is a torn slip, arrives before the line, and is blank in the Mirror',()=>{
 ok(/class="plate"/.test(h)&&/clip-path:polygon/.test(h),'torn slip');
 ok(/@keyframes plate/.test(h)&&/translateX\(-8px\)/.test(h),'slides in from the left');
 ok(/mirror\|\|!name\?'<div class="plate" aria-hidden="true">&nbsp;<\/div>'/.test(h),'blank slip in the Mirror');
});
t('Case G: choices are torn cards with drawn roman numerals',()=>{
 ok(/class="pcard/.test(h),'cards not buttons');
 ok(/PAPER\.numeral\(i\+1\)/.test(h),'drawn numerals');
 [1,2,3,4,5,6,7,8].forEach(n=>ok(/path d=/.test(P.numeral(n)),'numeral '+n));
 ok(/pcard:hover\{transform:translate\(2px,-2px\)/.test(h),'hover lift');
 ok(/cflour/.test(h),'hover flourish');
});
t('Case H: the skull card is always last, darker, with a drawn skull',()=>{
 ok(/const clean=list\.filter\(c=>!c\.skull\), dirty=list\.filter\(c=>c\.skull\)/.test(h),'skulls sorted last');
 ok(/clean\.concat\(dirty\)/.test(h));
 ok(/#c9bfa8/.test(P.card('x',true)),'darker paper');
 ok(/circle cx="7\.2"/.test(P.skullMark()),'drawn skull, not an icon');
 ok(/pcard\.sk:hover \.ctext\{border-bottom:1px solid #8c2f24\}/.test(h),'oxide underline on hover');
});
t('regression: no system font leakage anywhere in the shipped files',()=>{
 const files=['index.html','paper.js','cinematics.js','faces.js','art.js','engine.js','content1.js','content2.js'];
 const bad=[];
 files.forEach(f=>{const s=fs.readFileSync(__dirname+'/../'+f,'utf8');
  const m=s.match(/system-ui|-apple-system|Segoe UI|\bRoboto\b|Helvetica|\bArial\b|sans-serif/g);
  if(m) bad.push(f+': '+m.join(','));});
 eq(bad.join(' | '),'');
});
done();
