// Painted-portrait face renderer. Emotion drives brows, lids, gaze, mouth.
window.FACES = (function(){
const C = {
 anna:{skin:"#c9a385",shade:"#9a7257",hair:"#3a2a24",hairStyle:"bob",jaw:0.92,age:0.5,lip:"#8d5b52",eye:"#4a5a3f",cardigan:"#6b6257",frame:null},
 joost:{skin:"#cdab8e",shade:"#9d7a5e",hair:"#8e8b84",hairStyle:"thin",jaw:1.0,age:0.75,lip:"#956b60",eye:"#5a6470",cardigan:"#2f3a44",frame:"#2a2a2a"},
 mieke:{skin:"#d8b79a",shade:"#a9855f",hair:"#241c19",hairStyle:"back",jaw:0.88,age:0.3,lip:"#9c4f4a",eye:"#3f3a33",cardigan:"#1d2229",frame:null},
 radu:{skin:"#bd9470",shade:"#8d6748",hair:"#1f1a17",hairStyle:"crop",jaw:0.95,age:0.25,lip:"#8a5a4e",eye:"#473a30",cardigan:"#4a4d3f",frame:null},
 board:{skin:"#d3b295",shade:"#a3815f",hair:"#b9b4ab",hairStyle:"back",jaw:1.04,age:0.8,lip:"#8f6459",eye:"#4d5560",cardigan:"#1b1f26",frame:null},
 gio:{skin:"#c39b76",shade:"#926d4d",hair:"#2b2320",hairStyle:"back",jaw:1.0,age:0.6,lip:"#8b5750",eye:"#33281f",cardigan:"#242a2e",frame:null},
 marek:{skin:"#c4a183",shade:"#92735a",hair:"#56504a",hairStyle:"crop",jaw:1.0,age:0.65,lip:"#8a5f56",eye:"#56606b",cardigan:"#2c2e31",frame:null},
 devries:{skin:"#c09b79",shade:"#8f6f52",hair:"#6b655d",hairStyle:"crop",jaw:0.9,age:0.7,lip:"#86594f",eye:"#4d5a60",cardigan:"#3a3f36",frame:null},
 emil:{skin:"#b59277",shade:"#87674f",hair:"#9a958d",hairStyle:"thin",jaw:0.86,age:0.8,lip:"#7d5850",eye:"#5a5148",cardigan:"#5c5346",frame:null},
 meera:{skin:"#a77b57",shade:"#7a5639",hair:"#141010",hairStyle:"back",jaw:0.9,age:0.45,lip:"#7d4a40",eye:"#2a1f17",cardigan:"#1d2531",frame:null},
 neighbour:{skin:"#d0b097",shade:"#a08068",hair:"#cfcac2",hairStyle:"bob",jaw:0.92,age:0.9,lip:"#8f6a60",eye:"#5a6066",cardigan:"#7a5a4a",frame:null},
 doorman:{skin:"#8a6448",shade:"#5e4330",hair:"#1a1614",hairStyle:"crop",jaw:1.02,age:0.5,lip:"#6e4a40",eye:"#2a211b",cardigan:"#20262c",frame:null},
 voss:{skin:"#8e8a86",shade:"#5f5c59",hair:"#44413e",hairStyle:"back",jaw:0.96,age:0.55,lip:"#6d615d",eye:"#8e9aa4",cardigan:"#1a1c1f",frame:null}
};
// emotion: lid (0 wide .. 1 closed), brow (-1 raised .. 1 lowered), gaze x/y, mouth type, tension
const E = {
 tired:{lid:.42,brow:.15,gx:-2,gy:1,mouth:"flat",t:.2},
 guarded:{lid:.3,brow:.3,gx:-3,gy:0,mouth:"tight",t:.5},
 flat:{lid:.26,brow:.05,gx:0,gy:0,mouth:"flat",t:.3},
 cracking:{lid:.5,brow:-.3,gx:-1,gy:2,mouth:"down",t:.7},
 open:{lid:.14,brow:-.2,gx:0,gy:0,mouth:"soft",t:.35},
 afraid:{lid:.05,brow:-.5,gx:3,gy:-1,mouth:"open",t:.85},
 formal:{lid:.28,brow:.1,gx:0,gy:0,mouth:"tight",t:.35},
 wary:{lid:.34,brow:.35,gx:-3,gy:0,mouth:"tight",t:.55},
 hard:{lid:.38,brow:.55,gx:0,gy:0,mouth:"flat",t:.6},
 quiet:{lid:.45,brow:-.1,gx:-2,gy:2,mouth:"down",t:.4},
 shut:{lid:.5,brow:.5,gx:0,gy:1,mouth:"tight",t:.6},
 warm:{lid:.2,brow:-.15,gx:0,gy:0,mouth:"smile",t:.15},
 even:{lid:.26,brow:0,gx:0,gy:0,mouth:"flat",t:.25},
 respect:{lid:.2,brow:-.1,gx:0,gy:0,mouth:"soft",t:.3},
 careful:{lid:.3,brow:.1,gx:-4,gy:0,mouth:"tight",t:.45},
 cornered:{lid:.08,brow:-.45,gx:4,gy:-1,mouth:"open",t:.9},
 opening:{lid:.2,brow:-.2,gx:0,gy:1,mouth:"soft",t:.4},
 smooth:{lid:.24,brow:-.05,gx:0,gy:0,mouth:"smile",t:.2},
 cooling:{lid:.32,brow:.3,gx:0,gy:0,mouth:"tight",t:.5},
 cold:{lid:.36,brow:.5,gx:0,gy:0,mouth:"flat",t:.55},
 exposed:{lid:.16,brow:-.35,gx:-2,gy:1,mouth:"open",t:.75},
 calm:{lid:.26,brow:0,gx:0,gy:0,mouth:"flat",t:.2},
 interested:{lid:.18,brow:-.2,gx:0,gy:0,mouth:"soft",t:.3},
 still:{lid:.3,brow:.05,gx:0,gy:0,mouth:"flat",t:.25},
 breaking:{lid:.44,brow:-.4,gx:-1,gy:2,mouth:"down",t:.8},
 fading:{lid:.5,brow:-.25,gx:0,gy:2,mouth:"down",t:.5},
 lying:{lid:.26,brow:0,gx:-3,gy:-2,mouth:"flat",t:.25},
 listening:{lid:.2,brow:-.15,gx:0,gy:0,mouth:"soft",t:.2},
 thinking:{lid:.3,brow:.05,gx:-4,gy:0,mouth:"tight",t:.3},
 resisting:{lid:.3,brow:.35,gx:0,gy:1,mouth:"tight",t:.5},
 caught:{lid:.04,brow:-.5,gx:0,gy:0,mouth:"open",t:.4},
 conceding:{lid:.44,brow:-.2,gx:0,gy:3,mouth:"soft",t:.3},
 human:{lid:.9,brow:-.3,gx:0,gy:0,mouth:"open",t:.2}
};
function mouthPath(kind,t){
 const w=22, y=118;
 switch(kind){
  case "smile": return `M${64-w} ${y} q${w} ${7+4*t} ${2*w} 0`;
  case "soft": return `M${64-w} ${y} q${w} ${3} ${2*w} 0`;
  case "flat": return `M${64-w} ${y} q${w} ${1} ${2*w} 0`;
  case "tight": return `M${64-w+3} ${y} q${w-3} ${0} ${2*(w-3)} 0`;
  case "down": return `M${64-w} ${y+2} q${w} ${-5-3*t} ${2*w} 0`;
  case "open": return `M${64-w+4} ${y-1} q${w-4} ${12+6*t} ${2*(w-4)} 0 q${-(w-4)} ${4} ${-2*(w-4)} 0`;
 }
}
function hair(style,col){
 switch(style){
  case "bob": return `<path d="M24 74 q-4-46 40-48 q44 2 40 48 q-6-26-40-28 q-34 2-40 28z" fill="${col}"/>
   <path d="M22 72 q-3 26 4 40 q-10-20-8-42z" fill="${col}"/><path d="M106 72 q3 26-4 40 q10-20 8-42z" fill="${col}"/>`;
  case "thin": return `<path d="M30 66 q6-30 34-30 q28 0 34 30 q-14-16-34-16 q-20 0-34 16z" fill="${col}" opacity=".85"/>`;
  case "crop": return `<path d="M28 70 q2-38 36-38 q34 0 36 38 q-10-22-36-22 q-26 0-36 22z" fill="${col}"/>`;
  case "back": return `<path d="M26 70 q2-40 38-40 q36 0 38 40 q-8-26-38-26 q-30 0-38 26z" fill="${col}"/>`;
 }
}
function render(id, emotion, opts){
 const c = C[id] || C.anna, e = E[emotion] || E.flat, o = opts||{};
 const rig = (window.RIGS&&window.RIGS[id]) || {shoulders:34,head:1,neck:10,lean:0,drop:0};
 const lid = e.lid + (o.blink?0.95:0), gx = e.gx + (o.gx||0), gy = e.gy;
 const jw = 40*c.jaw;
 const eyeOpen = Math.max(0.6, 7.5*(1-lid));
 const browY = 78 + e.brow*5;
 const aging = c.age;
 const mirror = id==="voss";
 return `<svg viewBox="0 0 128 170" class="face" aria-hidden="true">
 <defs>
  <radialGradient id="lg_${id}" cx="42%" cy="18%" r="85%">
   <stop offset="0" stop-color="#fff" stop-opacity=".30"/><stop offset="1" stop-color="#000" stop-opacity=".55"/>
  </radialGradient>
  <filter id="paint_${id}" x="-20%" y="-20%" width="140%" height="140%">
   <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="7" result="n"/>
   <feDisplacementMap in="SourceGraphic" in2="n" scale="1.6" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
 </defs>
 <g filter="url(#paint_${id})" opacity="${mirror?0.55:1}" transform="translate(0 ${rig.drop}) rotate(${rig.lean} 64 160)">
  <path d="M${64-rig.shoulders} 170 q${rig.shoulders*0.2} -${16+rig.neck*0.4} ${rig.shoulders} -${18+rig.neck*0.4} q${rig.shoulders*0.8} ${2} ${rig.shoulders} ${18+rig.neck*0.4}z" fill="${c.cardigan}"/>
  <path d="M54 ${140-rig.neck*0.3} q10 8 20 0 l3 ${14+rig.neck*0.5} q-13 7 -26 0z" fill="${c.skin}"/>
  <g transform="translate(64 96) scale(${rig.head}) translate(-64 -96)">
  <path d="M${64-jw} 86 q0 46 ${jw} 58 q${jw} -12 ${jw} -58 q0-44 -${jw}-44 q-${jw} 0 -${jw} 44z" fill="${c.skin}"/>
  <path d="M${64-jw} 86 q0 46 ${jw} 58 q-6-30-10-58z" fill="${c.shade}" opacity=".5"/>
  ${hair(c.hairStyle, c.hair)}
  <path d="M${64-jw} 86 q0 46 ${jw} 58 q${jw} -12 ${jw} -58 q0-44 -${jw}-44 q-${jw} 0 -${jw} 44z" fill="url(#lg_${id})"/>
  <path d="M40 ${browY} q10 ${-4-e.brow*3} 20 ${1+e.brow*2}" stroke="${c.hair}" stroke-width="${2.6+aging}" fill="none" stroke-linecap="round" opacity=".9"/>
  <path d="M68 ${browY+1+e.brow*2} q10 ${-1-e.brow*2} 20 ${-4-e.brow*3}" stroke="${c.hair}" stroke-width="${2.6+aging}" fill="none" stroke-linecap="round" opacity=".9"/>
  <g>
   <ellipse cx="50" cy="94" rx="10" ry="${eyeOpen}" fill="#efe6dc"/>
   <ellipse cx="78" cy="94" rx="10" ry="${eyeOpen}" fill="#efe6dc"/>
   <circle cx="${50+gx}" cy="${94+gy}" r="${Math.min(4.2,eyeOpen*0.62)}" fill="${c.eye}"/>
   <circle cx="${78+gx}" cy="${94+gy}" r="${Math.min(4.2,eyeOpen*0.62)}" fill="${c.eye}"/>
   <circle cx="${50+gx}" cy="${94+gy}" r="${Math.min(1.9,eyeOpen*0.3)}" fill="#0c0b0a"/>
   <circle cx="${78+gx}" cy="${94+gy}" r="${Math.min(1.9,eyeOpen*0.3)}" fill="#0c0b0a"/>
   <path d="M40 94 q10 ${-9+lid*11} 20 0" stroke="${c.shade}" stroke-width="2" fill="none"/>
   <path d="M68 94 q10 ${-9+lid*11} 20 0" stroke="${c.shade}" stroke-width="2" fill="none"/>
  </g>
  <path d="M64 98 q-4 10 -2 14 q4 2 8 0" stroke="${c.shade}" stroke-width="2" fill="none" opacity=".75"/>
  <path d="${mouthPath(e.mouth, e.t)}" stroke="${c.lip}" stroke-width="${e.mouth==='open'?2:3.2}" fill="${e.mouth==='open'?'#3a2321':'none'}" stroke-linecap="round"/>
  ${aging>.5?`<path d="M38 108 q4 6 2 12" stroke="${c.shade}" stroke-width="1.4" fill="none" opacity=".5"/><path d="M90 108 q-4 6 -2 12" stroke="${c.shade}" stroke-width="1.4" fill="none" opacity=".5"/>`:''}
  ${c.frame?`<g stroke="${c.frame}" stroke-width="2.2" fill="none" opacity=".9"><circle cx="50" cy="94" r="14"/><circle cx="78" cy="94" r="14"/><path d="M64 94h0M36 92l-10 4M92 92l10 4"/></g>`:''}
  </g>
 </g></svg>`;
}
function hands(move){
 const thumb = move==="ring" ? '<circle cx="243" cy="57" r="5" fill="#d9b25a"/><path d="M236 62 q8 -6 14 -3" stroke="#8a5a4a" stroke-width="3.4" fill="none" stroke-linecap="round"/>' : '';
 const ruler = move==="square" ? '<rect x="96" y="44" width="128" height="6" rx="2" fill="#cfc6ad" opacity=".85"/>' : '';
 return `<svg viewBox="0 0 320 90" class="hands" aria-hidden="true">
  <defs><filter id="hp"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" seed="3" result="n"/>
  <feDisplacementMap in="SourceGraphic" in2="n" scale="1.4" xChannelSelector="R" yChannelSelector="G"/></filter></defs>
  <g filter="url(#hp)" fill="#b2865f">
   <path d="M20 86 q6-34 40-34 q28 0 34 14 q10-10 20-2 q8-8 16 0 q8-6 14 4 q4 18-10 26 q-30 10-114-8z" opacity=".95"/>
   <path d="M300 86 q-6-34-40-34 q-28 0-34 14 q-10-10-20-2 q-8-8-16 0 q-8-6-14 4 q-4 18 10 26 q30 10 114-8z" opacity=".95"/>
  </g>
  <path d="M250 60 q10 4 16 1" stroke="#7d4f44" stroke-width="2.4" fill="none" opacity=".9"/>
  <path d="M252 63 q7 3 12 1" stroke="#9a6a5c" stroke-width="1.2" fill="none" opacity=".8"/>
  ${thumb}${ruler}
 </svg>`;
}
return {render, hands, emotions:E};
})();
