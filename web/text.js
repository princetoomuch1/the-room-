// WP-17.3–17.13 — the reading experience. Settle reveal, FX, settings, text sound.
window.TEXT = (function(){
const DEF={size:"M",font:"fraunces",spacing:"comfortable",contrast:false,reduced:"auto",instant:false,sound:false,hand:"pen"};
let SET=Object.assign({},DEF);
try{ const s=JSON.parse(localStorage.getItem("theroom_settings")||"null"); if(s) SET=Object.assign(SET,s); }catch(e){}
function save(){ try{ localStorage.setItem("theroom_settings",JSON.stringify(SET)); }catch(e){} }
function reducedMotion(){
 if(SET.reduced==="on") return true; if(SET.reduced==="off") return false;
 return !!(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
const SIZES={S:17,M:20,L:23}, SPACING={tight:1.35,comfortable:1.5,loose:1.7};
const HANDS={pen:'Fraunces,Georgia,serif',typewriter:'"Special Elite","Courier Prime",monospace',pencil:'Caveat,cursive',marker:'"Permanent Marker",Caveat,cursive'};
function apply(){
 const r=document.documentElement;
 r.style.setProperty("--fs",SIZES[SET.size]+"px");
 r.style.setProperty("--lh",SPACING[SET.spacing]);
 r.style.setProperty("--body",SET.font==="atkinson"?'"Atkinson Hyperlegible",Fraunces,Georgia,serif':'Fraunces,Spectral,"Iowan Old Style",Georgia,serif');
 r.style.setProperty("--hand",HANDS[SET.hand]||HANDS.pen);
 document.body.classList.toggle("hc",!!SET.contrast);
 document.body.classList.toggle("rm",reducedMotion());
}
function set(k,v){ SET[k]=v; save(); apply(); }
function get(k){ return SET[k]; }

// ---------- text sound: synthesised, off by default ----------
let AC=null;
const VOICE={anna:[1900,0.9],joost:[900,0.6],mieke:[3200,0.5],radu:[1500,1.2],board:[2400,1.0],gio:[2100,0.7],
 marek:[700,1.3],devries:[1300,0.8],emil:[1100,0.5],meera:[2000,0.8],voss:[1600,0.7],mirror:[1700,0.8],_:[1800,0.8]};
function ctx(){ if(!AC){ try{ AC=new (window.AudioContext||window.webkitAudioContext)(); }catch(e){ AC=null; } } return AC; }
function key(voice){
 if(!SET.sound) return; const a=ctx(); if(!a) return;
 const [f,vol]=VOICE[voice]||VOICE._;
 const o=a.createOscillator(), g=a.createGain(), lp=a.createBiquadFilter();
 o.type="square"; o.frequency.value=f*Math.pow(2,((Math.random()*6)-3)/12)/8;
 lp.type="lowpass"; lp.frequency.value=2000;
 g.gain.setValueAtTime(0.0001,a.currentTime); g.gain.exponentialRampToValueAtTime(0.018*vol,a.currentTime+0.004);
 g.gain.exponentialRampToValueAtTime(0.0001,a.currentTime+0.04);
 o.connect(lp); lp.connect(g); g.connect(a.destination); o.start(); o.stop(a.currentTime+0.05);
}
function chime(){
 if(!SET.sound) return; const a=ctx(); if(!a) return;
 const o=a.createOscillator(), g=a.createGain(); o.type="sine"; o.frequency.value=440;
 g.gain.setValueAtTime(0.0001,a.currentTime); g.gain.exponentialRampToValueAtTime(0.05,a.currentTime+0.02);
 g.gain.exponentialRampToValueAtTime(0.0001,a.currentTime+0.8);
 o.connect(g); g.connect(a.destination); o.start(); o.stop(a.currentTime+0.85);
}
function bell(){ if(!SET.sound) return; const a=ctx(); if(!a) return;
 const o=a.createOscillator(), g=a.createGain(); o.type="triangle"; o.frequency.value=1760;
 g.gain.setValueAtTime(0.03,a.currentTime); g.gain.exponentialRampToValueAtTime(0.0001,a.currentTime+0.6);
 o.connect(g); g.connect(a.destination); o.start(); o.stop(a.currentTime+0.62); }

// ---------- the settle ----------
const SPEED={normal:22,slow:40,fast:12};
const PAUSE={",":80,";":120,".":180,"?":220,"—":140,"\n":400};
function escH(s){ return s.replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c])); }
// returns {html, total}: every character is laid out from the start, so nothing reflows
function build(text, opts){
 const o=opts||{}, fx=o.fx||[];
 const speed=SPEED[fx.includes("slow-reveal")?"slow":(o.speed||"normal")];
 const chars=[...text]; const n=chars.length; const scale=speed/SPEED.normal;
 let t=fx.includes("silence")?600:0; const times=new Array(n);
 // word anchors land 40ms before the rest of their word
 let i=0;
 while(i<n){
  if(/\s/.test(chars[i])){ times[i]=t; t+=(PAUSE[chars[i]]||0)*scale; i++; continue; }
  let j=i; while(j<n && !/\s/.test(chars[j])) j++;
  times[i]=t; t+=speed;
  for(let k=i+1;k<j;k++){ times[k]=t+40-speed; t+=speed; t+=(PAUSE[chars[k]]||0)*scale; }
  i=j;
 }
 if(fx.includes("reverse")){ const max=t; for(let k=0;k<n;k++) times[k]=max-times[k]; }
 let inSt=false; let html="";
 chars.forEach((ch,k)=>{
  if(ch==="[") { inSt=true; html+='<span class="st">'; }
  const cls = k===n-1 ? "c last" : "c";
  html+= ch===" "||ch==="\n" ? escH(ch) : `<span class="${cls}" style="animation-delay:${times[k]}ms">${escH(ch)}</span>`;
  if(ch==="]") { inSt=false; html+="</span>"; }
 });
 if(inSt) html+="</span>";
 return {html, total:t+200*scale};
}
function reveal(el, text, opts){
 const o=opts||{}, fx=o.fx||[];
 el.classList.remove("fx-shake","fx-wobble","fx-italic","fx-weight","fx-color","fx-blur","revealing","done");
 if(fx.includes("italic")) el.classList.add("fx-italic");
 if(fx.includes("weight")) el.classList.add("fx-weight");
 if(fx.includes("color-shift")) el.classList.add("fx-color");
 el.setAttribute("aria-label", text.replace(/\[|\]/g,""));
 const instant = SET.instant || reducedMotion() || fx.includes("blur-in");
 if(instant){
  el.innerHTML=escH(text).replace(/\[([^\]]+)\]/g,'<span class="st">[$1]</span>');
  if(fx.includes("blur-in") && !reducedMotion()) el.classList.add("fx-blur");
  el.classList.add("done"); return Promise.resolve(0);
 }
 const b=build(text,o); el.innerHTML=b.html; el.classList.add("revealing");
 if(fx.includes("shake")) el.classList.add("fx-shake");
 if(fx.includes("wobble")) el.classList.add("fx-wobble");
 if(SET.sound){ const voice=o.voice||"_"; let k=0; const step=Math.max(30,Math.round(b.total/Math.max(1,text.length))*2);
  const iv=setInterval(()=>{ key(voice); if((k+=step)>=b.total) clearInterval(iv); }, step); }
 return new Promise(res=>setTimeout(()=>{ el.classList.add("done"); res(b.total); }, b.total));
}
function skip(el){ if(!el) return; el.querySelectorAll(".c").forEach(c=>c.style.animationDelay="0ms"); el.classList.add("done"); }
// composition rules (17.5)
function legalFx(fx, room){
 const f=fx||[]; const max = room==="mirror"?3:2;
 if(f.length>max) return false;
 if(f.includes("shake")&&f.includes("blur-in")) return false;
 if(f.includes("wobble")&&f.includes("reverse")) return false;
 return true;
}
apply();
return {apply,set,get,reveal,skip,build,legalFx,chime,bell,key,reducedMotion,SET:()=>SET,HANDS,SPEED,PAUSE};
})();
