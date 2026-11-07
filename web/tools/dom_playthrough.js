// Headless click-through of the real page. Plays title -> before -> prologue -> 8 rooms + corridors -> ending.
const path=require('path'), fs=require('fs');
const {JSDOM}=require(path.join('/home/claude/tools-dom/node_modules/jsdom'));
const dir=path.join(__dirname,'..');
let html=fs.readFileSync(path.join(dir,'index.html'),'utf8');
// inline local scripts so jsdom runs them in order
html=html.replace(/<script src="([^"]+)"><\/script>/g,(m,f)=>`<script>${fs.readFileSync(path.join(dir,f),'utf8')}</script>`);
html=html.replace(/<link[^>]+fonts\.googleapis[^>]*>/g,'');
const errors=[];
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,
 beforeParse(w){ w.matchMedia=()=>({matches:true,addListener(){},removeListener(){}}); w.AudioContext=undefined;
  w.onerror=(m)=>{errors.push(String(m));}; w.console.error=(...a)=>errors.push(a.join(' ')); }});
const w=dom.window, d=w.document;
// reduced motion -> instant text, so we do not wait on animations
w.TEXT.set('reduced','on'); w.TEXT.set('instant',true);
const app=()=>d.getElementById('app');
const clickText=(re)=>{ const b=[...d.querySelectorAll('button')].find(x=>re.test(x.textContent)); if(!b) return false; b.click(); return true; };
const flush=(ms)=>new Promise(r=>setTimeout(r,ms||5));
(async()=>{
 const strategy=process.argv[2]||'clean';
 const log=[];
 if(!/The Room/.test(app().textContent)) errors.push('title did not render');
 clickText(/Begin/);
 for(let i=0;i<6;i++){ if(!clickText(/^Continue$/)) break; await flush(); }
 if(!/Meera/.test(app().textContent)) errors.push('prologue did not render');
 log.push('prologue');
 let guard=0, roomsSeen=new Set(), corridors=0, scored=0;
 while(guard++<900){
  await flush(2);
  const txt=app().textContent;
  if(/Return\./.test(txt) && d.querySelector('.ret')) { log.push('ending reached'); break; }
  if(d.querySelector('.vig')){ await flush(3100); continue; }
  if(d.querySelector('.scorerow')||d.querySelector('.endtitle')||d.querySelector('.twpaper')||d.querySelector('.cine')) { await flush(30); continue; }
  const cards=[...d.querySelectorAll('#cs .pcard, .cardstack .pcard')];
  const btns=[...d.querySelectorAll('button')];
  const go=btns.find(b=>/^(Go in|Continue into the room|Continue|Next room|End|Next)$/.test(b.textContent.trim()));
  if(d.getElementById('pl') && d.querySelector('.clockbox')){
   const room=w.GAME.room().id; roomsSeen.add(room);
   d.querySelectorAll('.chip').forEach(c=>{ if(/Read the tell/.test(c.getAttribute('aria-label')||'')) c.click(); });
  }
  const cs=d.getElementById('cs'); if(cs) cs.classList.remove('hold');
  if(cards.length){
   const pick = strategy==='dirty' ? (cards.find(c=>c.classList.contains('sk'))||cards[0])
              : (cards.find(c=>/Call a|CALL/.test(c.textContent))||cards.find(c=>!c.classList.contains('sk')&&!/sign it/.test(c.textContent))||cards[0]);
   if(d.querySelector('.place') && !d.querySelector('.clockbox')) corridors++;
   pick.click(); continue;
  }
  const chev=d.querySelector('.chev'); if(chev && !cards.length){ chev.click(); continue; }
  if(go){ if(/Next room|End/.test(go.textContent)) scored++; go.click(); continue; }
  const cont=btns.find(b=>/Continue/.test(b.textContent)); if(cont){ cont.click(); continue; }
  errors.push('stuck at '+(w.GAME.room()&&w.GAME.room().id)+'/'+w.GAME.S.node+' avail='+w.GAME.available().map(c=>c.id).join(',')+' pcards='+d.querySelectorAll('.pcard').length+' html='+app().innerHTML.slice(0,200)); break;
 }
 // fast-forward the ending sequence timers
 for(let k=0;k<40 && !d.querySelector('.ret');k++) await flush(1000);
 const e=w.GAME.ending();
 console.log('strategy:',strategy);
 console.log('rooms played:',[...roomsSeen].join(', '));
 console.log('corridor nodes clicked:',corridors,'| room score cards:',scored);
 console.log('ending:',e.title,'| perfect:',w.GAME.S.perfect,'| exits:',(w.GAME.S.exits||[]).join(',')||'none');
 console.log('runtime errors:',errors.length?errors.slice(0,5):'none');
 process.exit(errors.length?1:0);
})();
