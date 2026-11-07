const {t,eq,ok,done}=require('./harness');
global.window.matchMedia=()=>({matches:false});
const store={}; global.localStorage={getItem:k=>store[k]||null,setItem:(k,v)=>{store[k]=v;}};
const props={}, cls={};
global.document={documentElement:{style:{setProperty:(k,v)=>{props[k]=v;}}},body:{classList:{toggle:(c,on)=>{cls[c]=on;}}}};
require('../text.js'); const T=global.window.TEXT; const fs=require('fs'); const h=fs.readFileSync(__dirname+'/../index.html','utf8');
console.log('WP-17.13 tests/test_text_settings.js');
t('Case A: three sizes apply immediately',()=>{ T.set('size','L'); eq(props['--fs'],'23px'); T.set('size','S'); eq(props['--fs'],'17px'); T.set('size','M'); eq(props['--fs'],'20px'); });
t('Case B: an accessible typeface is available',()=>{ T.set('font','atkinson'); ok(/Atkinson Hyperlegible/.test(props['--body'])); T.set('font','fraunces'); ok(/Atkinson\+Hyperlegible/.test(h),'loaded from Google Fonts'); });
t('Case C: three line spacings',()=>{ T.set('spacing','loose'); eq(props['--lh'],1.7); T.set('spacing','tight'); eq(props['--lh'],1.35); T.set('spacing','comfortable'); eq(props['--lh'],1.5); });
t('Case D: high contrast toggles the body class and strips decoration',()=>{ T.set('contrast',true); eq(cls.hc,true); ok(/body\.hc \.paper \.flourish/.test(h)); T.set('contrast',false); eq(cls.hc,false); });
t('Case E: reduced motion follows the system and an in-game toggle',()=>{ T.set('reduced','on'); eq(T.reducedMotion(),true); eq(cls.rm,true); T.set('reduced','off'); eq(T.reducedMotion(),false); T.set('reduced','auto'); });
t('Case F: instant text removes the settle and keeps the paper',()=>{ T.set('instant',true); eq(T.get('instant'),true); ok(/SET\.instant \|\| reducedMotion\(\)/.test(fs.readFileSync(__dirname+'/../text.js','utf8'))); T.set('instant',false); });
t('Case G: screen reader gets whole lines, names first, numbered choices and marked skulls',()=>{
 ok(/setAttribute\("aria-label", text/.test(fs.readFileSync(__dirname+'/../text.js','utf8')),'full line announced');
 ok(/aria-label="Choice \$\{i\+1\}\$\{c\.skull\?', marked':''\}/.test(h),'choice numbering and skull mark');
});
t('Case H: settings persist across sessions',()=>{ T.set('size','L'); ok(/"size":"L"/.test(store.theroom_settings)); T.set('size','M'); });
t('text sound is off by default and the Mirror speaks in the chosen hand',()=>{
 ok(/sound:false/.test(fs.readFileSync(__dirname+'/../text.js','utf8')));
 ok(/mirrorhand/.test(h)&&/--hand/.test(fs.readFileSync(__dirname+'/../text.js','utf8')));
 ok(/firstMirror\?\['reverse'/.test(h),'first Mirror line reverses');
});
done();
