// WP-17.2 — the text panel is a piece of paper on the table, not a rectangle.
window.PAPER = (function(){
function rng(seed){ let s=0; for(const ch of String(seed)) s=(s*31+ch.charCodeAt(0))>>>0; return ()=>{ s=(s*1103515245+12345)>>>0; return s/4294967296; }; }
// a torn edge: an uneven line with one or two nicks, not a scalloped border
function tornPath(seed,w,h){
 const r=rng(seed), pts=[], N=48, amp=3.2;
 const nickAt=[Math.floor(r()*N), Math.floor(r()*N)];
 function side(len,steps,fx,fy){
  for(let i=0;i<=steps;i++){
   const t=i/steps; let off=(r()-0.5)*amp;
   if(nickAt.includes(i)) off+=(r()<0.5?-1:1)*(4+r()*4);
   pts.push(fx(t,off)+','+fy(t,off));
  }
 }
 side(w,N,(t,o)=>(t*w).toFixed(1),(t,o)=>(o).toFixed(1));
 side(h,Math.round(N*0.4),(t,o)=>(w+o).toFixed(1),(t,o)=>(t*h).toFixed(1));
 side(w,N,(t,o)=>(w-t*w).toFixed(1),(t,o)=>(h+o).toFixed(1));
 side(h,Math.round(N*0.4),(t,o)=>(o).toFixed(1),(t,o)=>(h-t*h).toFixed(1));
 return 'M'+pts.join(' L')+' Z';
}
const FLOURISH=[
 'M2 14 q6-12 14-10 q-6 2 -8 10 q6-2 8 2 q-8 2 -14 -2z',
 'M2 4 q10 2 16 12 q-8-4 -16 -2z M4 14 q8-2 12 4 q-10 0-12 -4z',
 'M12 2 q-4 8 2 12 q-8-2 -8 -8 q0-4 6 -4z M14 10 q6 0 6 6 q-4-4 -6 -6z'
];
function panel(seed, w, h, opts){
 const o=opts||{}, r=rng(seed+'f');
 const fl=FLOURISH[Math.floor(r()*FLOURISH.length)];
 const fx=8+r()*10, fy=6+r()*8;
 return `<svg class="paper" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true">
  <defs>
   <filter id="pg_${seed}"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" seed="7" result="g"/>
    <feColorMatrix in="g" type="saturate" values="0"/><feComposite in2="SourceGraphic" operator="in"/></filter>
   <linearGradient id="lit_${seed}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#000" stop-opacity=".08"/><stop offset=".06" stop-color="#000" stop-opacity="0"/></linearGradient>
   <clipPath id="cp_${seed}"><path d="${tornPath(seed,w,h)}"/></clipPath>
  </defs>
  <path class="sheet" d="${tornPath(seed,w,h)}" fill="#e8e0cf"/>
  <g clip-path="url(#cp_${seed})">
   <rect width="${w}" height="${h}" filter="url(#pg_${seed})" opacity=".04" style="mix-blend-mode:multiply"/>
   <line class="fold" x1="${w*0.08}" y1="${h*0.3}" x2="${w*0.62}" y2="0" stroke="#8d8471" stroke-width="1" opacity=".06"/>
   <rect width="${w}" height="${h}" fill="url(#lit_${seed})"/>
  </g>
  ${o.noFlourish?'':`<g class="flourish" transform="translate(${fx.toFixed(0)},${fy.toFixed(0)})" fill="#b8924a"><path d="${fl}"/></g>`}
 </svg>`;
}
function card(seed, skull){
 const w=600,h=58;
 return `<svg class="cardpaper" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true">
  <path d="${tornPath(seed,w,h)}" fill="${skull?'#c9bfa8':'#e8e0cf'}"/>
  ${skull?`<path d="M${w*0.12} 4 L${w*0.34} ${h-6}" stroke="#a9a08a" stroke-width="1" opacity=".55"/>`:''}
 </svg>`;
}
const NUMERALS={1:'M4 2 h10 M9 2 v20 M4 22 h10',2:'M2 2 h7 M5.5 2 v20 M2 22 h7 M13 2 h7 M16.5 2 v20 M13 22 h7',
 3:'M1 2h5 M3.5 2v20 M1 22h5 M9 2h5 M11.5 2v20 M9 22h5 M17 2h5 M19.5 2v20 M17 22h5',
 4:'M2 2h6 M5 2v20 M2 22h6 M12 2 l5 20 l5-20',5:'M2 2 l5 20 l5-20 M14 2h6 M17 2v20 M14 22h6',
 6:'M2 2 l5 20 l5-20 M14 2h4 M16 2v20 M14 22h4 M19 2h4 M21 2v20 M19 22h4',
 7:'M1 2 l4 20 l4-20 M11 2h3 M12.5 2v20 M11 22h3 M16 2h3 M17.5 2v20 M16 22h3 M21 2h3 M22.5 2v20 M21 22h3',
 8:'M1 2h4 M3 2v20 M1 22h4 M8 2 l4 20 l4-20 M18 2h4 M20 2v20 M18 22h4'};
function numeral(n){
 const d=NUMERALS[n]||NUMERALS[8];
 return `<svg class="num" viewBox="0 0 26 24" aria-hidden="true"><path d="${d}" stroke="#b8924a" stroke-width="2.2" fill="none" stroke-linecap="round"/></svg>`;
}
function skullMark(){
 return `<svg class="skullmark" viewBox="0 0 20 20" aria-hidden="true">
  <path d="M3 8 q0-6 7-6 q7 0 7 6 q0 5 -3 6 l0 3 q-4 2 -8 0 l0-3 q-3-1 -3-6z" fill="none" stroke="#8c2f24" stroke-width="1.6"/>
  <circle cx="7.2" cy="9" r="1.7" fill="#8c2f24"/><circle cx="12.8" cy="9" r="1.7" fill="#8c2f24"/>
  <path d="M10 12 l0 2.4" stroke="#8c2f24" stroke-width="1.3"/></svg>`;
}
return {panel, card, numeral, skullMark, tornPath};
})();
