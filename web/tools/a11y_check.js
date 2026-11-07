const fs=require('fs');
const h=fs.readFileSync(__dirname+'/../index.html','utf8');
const checks=[
 ['aria-label on interactive nodes',(h.match(/aria-label/g)||[]).length>=5,(h.match(/aria-label/g)||[]).length+' labels'],
 ['aria-live on the token line',/aria-live="polite"/.test(h),'present'],
 ['prefers-reduced-motion honoured',/prefers-reduced-motion/.test(h),'present'],
 ['information animations kept under reduced motion',!/prefers-reduced-motion[^}]*\.face/.test(h),'eyes and hands excluded'],
 ['visible focus state',/focus-visible/.test(h),'present'],
 ['stage described to a screen reader',/role="img"/.test(h),'present'],
 ['tab order follows the dialogue (no tabindex overrides)',!/tabindex="[1-9]/.test(h),'no positive tabindex'],
 ['content note before the War Room',/r\.note/.test(h),'present'],
 ['skip option on the noted room',/skipRoom/.test(h),'present'],
 ['body text at least 14px',/font-size:19px/.test(h)&&/font-size:14px/.test(h),'dialogue 19px, controls 14px']
];
let fail=0;
checks.forEach(c=>{ console.log((c[1]?'PASS  ':'FAIL  ')+c[0]+' — '+c[2]); if(!c[1])fail++; });
process.exit(fail?1:0);
