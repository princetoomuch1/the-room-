// Painted room backgrounds. One named light source each, brush displacement,
// radial falloff, a wrong object in frame, canvas vignette. Briefs: content/briefs/rooms.md
window.ART = (function(){
const F = `<filter id="brush" x="-12%" y="-12%" width="124%" height="124%">
 <feTurbulence type="fractalNoise" baseFrequency="0.011 0.019" numOctaves="4" seed="11" result="n"/>
 <feDisplacementMap in="SourceGraphic" in2="n" scale="9" xChannelSelector="R" yChannelSelector="G"/></filter>
<filter id="brush2" x="-12%" y="-12%" width="124%" height="124%">
 <feTurbulence type="fractalNoise" baseFrequency="0.02 0.03" numOctaves="3" seed="23" result="n2"/>
 <feDisplacementMap in="SourceGraphic" in2="n2" scale="5" xChannelSelector="R" yChannelSelector="G"/></filter>
<filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" seed="5" result="g"/>
 <feColorMatrix in="g" type="saturate" values="0"/><feComposite in2="SourceGraphic" operator="in" result="gt"/>
 <feBlend in="SourceGraphic" in2="gt" mode="overlay"/></filter>`;
const VIG = `<radialGradient id="v" cx="48%" cy="32%" r="74%"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset=".6" stop-color="#000" stop-opacity=".46"/><stop offset="1" stop-color="#000" stop-opacity=".94"/></radialGradient>`;
const G = (x,y,r,c,o)=>`<radialGradient id="g" cx="${x}%" cy="${y}%" r="${r}%"><stop offset="0" stop-color="${c}" stop-opacity="${o||.85}"/><stop offset=".42" stop-color="${c}" stop-opacity=".2"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`;
// brush stroke helper: irregular quad, never axis-aligned
const q=(x,y,w,h,f,o)=>`<path d="M${x} ${y+1} q${w*0.5} ${-2} ${w} ${0} q${2} ${h*0.5} ${-1} ${h} q${-w*0.5} ${2} ${-w} ${0} q${-2} ${-h*0.5} ${1} ${-h}z" fill="${f}"${o?` opacity="${o}"`:''}/>`;
const dab=(n,x,y,sx,sy,f,op,seed)=>{let s='';for(let i=0;i<n;i++){const r=((i*9301+(seed||7)*49297)%233280)/233280;const r2=((i*4099+(seed||7)*7919)%233280)/233280;s+=`<ellipse cx="${x+r*sx}" cy="${y+r2*sy}" rx="${3+r*7}" ry="${2+r2*4}" fill="${f}" opacity="${(op||.3)*(0.4+r)}"/>`;}return s;};

const R = {
kitchen:()=>`<svg viewBox="0 0 800 450" class="bg" preserveAspectRatio="xMidYMid slice">
 <defs>${F}${VIG}${G(46,10,70,"#cfe0b0")}</defs>
 <rect width="800" height="450" fill="#15130f"/>
 <g filter="url(#brush)">
  ${q(0,118,800,204,"#2a2a24")}
  <g>${Array.from({length:14},(_,i)=>Array.from({length:4},(_,j)=>q(60+i*48,130+j*42,44,38,"#ddd6c6",(0.45+0.55*Math.exp(-Math.abs(i-6)/5)).toFixed(2))).join('')).join('')}</g>
  ${q(0,310,800,26,"#7a4526")}${q(0,336,800,114,"#1b1814")}
  ${q(120,300,190,44,"#4b4a44")}${q(130,306,170,30,"#2c3330")}
  ${q(470,96,150,150,"#20201c")}${q(560,140,34,26,"#d9cdb4",".75")}
  ${q(640,130,120,110,"#0e1014")}${q(268,318,40,22,"#8c2f24")}
  <circle cx="392" cy="330" r="9" fill="#d9b25a"/>${q(356,314,26,26,"#cfc6b4",".9")}
  ${dab(26,60,300,700,120,"#3a3a30",.25,3)}
 </g>
 <g id="bulb"><line x1="400" y1="0" x2="400" y2="54" stroke="#2a2823" stroke-width="3"/>
  <circle cx="400" cy="66" r="13" fill="#e8f0c8"/><circle cx="400" cy="66" r="4" fill="#fff8d0"/></g>
 <rect width="800" height="450" fill="url(#g)"/>
 <g id="rain" opacity=".5">${Array.from({length:16},(_,i)=>`<line x1="${645+i*7}" y1="132" x2="${641+i*7}" y2="238" stroke="#cfe0b0" stroke-width="1" opacity="${(0.15+0.45*((i*37)%11)/11).toFixed(2)}"/>`).join('')}</g>
 <g id="smoke" opacity=".35"><path d="M520 300 q-10-24 4-40 q12-14 2-30" stroke="#e6e2d4" stroke-width="3" fill="none" stroke-linecap="round"/></g>
 <rect width="800" height="450" fill="url(#v)"/>
</svg>`,

desk:()=>`<svg viewBox="0 0 800 450" class="bg" preserveAspectRatio="xMidYMid slice">
 <defs>${F}${VIG}${G(40,72,46,"#9fd39a",.8)}</defs>
 <rect width="800" height="450" fill="#101210"/>
 <g filter="url(#brush)">
  ${q(0,60,800,250,"#2b2f2c")}
  ${dab(34,0,70,800,230,"#343a35",.3,9)}
  ${q(0,300,800,46,"#6d5436")}${q(0,316,800,10,"#8d6b44",".8")}
  ${q(0,344,800,106,"#15171a")}
  ${q(90,250,620,56,"#7d6240")}
  ${q(96,296,608,14,"#c9bda2",".55")}
  ${q(150,268,190,34,"#efe7d2",".92")}${q(158,274,120,4,"#8d8878",".7")}${q(158,282,150,3,"#a09a89",".6")}
  <path d="M196 268 l108 0" stroke="#cfc6ad" stroke-width="5" opacity=".9"/>
  ${q(372,254,16,50,"#c0342a")}${q(366,300,28,16,"#d8cdb2",".9")}
  <text x="372" y="312" font-family="monospace" font-size="11" fill="#2b2b2b">047</text>
  ${q(600,246,54,30,"#8c2f24",".85")}
  ${q(680,236,66,70,"#1c1f1d")}
  ${q(430,220,120,86,"#1a1d1b")}
  <g>${q(248,318,96,112,"#2c2a26")}${q(256,300,80,28,"#4b4337",".95")}${dab(10,252,300,86,110,"#5a5046",.4,13)}</g>
 </g>
 <g filter="url(#brush2)">
  <path d="M258 196 q10-26 32-26 q22 0 30 26 q-14-12-31-12 q-17 0-31 12z" fill="#8e8b84"/>
  <ellipse cx="290" cy="214" rx="30" ry="16" fill="#cdab8e" opacity=".9"/>
  ${q(236,286,24,14,"#c6a384",".95")}${q(320,286,24,14,"#c6a384",".95")}
 </g>
 <g id="lamp"><path d="M560 196 q0 22 -34 26 l0 8 q40 -2 44 -34z" fill="#8a6b2f"/>
  <path d="M498 214 q24-20 48 0 q-24 10 -48 0z" fill="#b8902f"/><circle cx="522" cy="222" r="9" fill="#dff3cf"/></g>
 <rect width="800" height="450" fill="url(#g)"/>
 <g filter="url(#grain)" opacity=".5">${q(150,268,190,34,"#efe7d2",".2")}</g>
 <rect width="800" height="450" fill="url(#v)"/>
</svg>`,

table:()=>`<svg viewBox="0 0 800 450" class="bg" preserveAspectRatio="xMidYMid slice">
 <defs>${F}${VIG}${G(64,24,64,"#e6e9ea",.75)}</defs>
 <rect width="800" height="450" fill="#15161a"/>
 <g filter="url(#brush)">
  ${q(0,40,800,280,"#33363c")}
  ${dab(30,0,50,800,250,"#3b3f46",.28,17)}
  ${q(430,40,320,250,"#aeb6bb",".92")}
  <g>${Array.from({length:5},(_,i)=>`<line x1="${430+i*64}" y1="40" x2="${430+i*64}" y2="290" stroke="#6f777c" stroke-width="3" opacity=".7"/>`).join('')}</g>
  <line x1="430" y1="170" x2="750" y2="170" stroke="#6f777c" stroke-width="3" opacity=".7"/>
  ${q(452,196,52,94,"#4a5a3a")}${dab(14,448,190,60,96,"#6d7f4f",.5,21)}
  ${q(0,300,800,150,"#6b4a30")}${q(0,300,800,12,"#8e6440",".9")}
  ${q(250,320,230,66,"#ded3b8")}${q(262,332,70,8,"#6c6252",".9")}${q(262,348,150,6,"#8d8371",".7")}${q(262,360,120,6,"#8d8371",".55")}
  <path d="M414 352 q22-4 34 2 q-4 8 -34 -2z" fill="#c9a24a"/>
  <ellipse cx="538" cy="348" rx="17" ry="7" fill="#cfd9d4" opacity=".5"/>${q(524,318,28,34,"#dde6e2",".45")}
  <g>${q(640,306,104,120,"#2d2a26")}${q(648,292,88,26,"#3d382f",".95")}</g>
  ${q(120,120,96,74,"#20201c")}
 </g>
 <g filter="url(#brush2)" opacity=".92">
  <path d="M250 150 q12-34 44-34 q30 0 42 34 q-18-16-42-16 q-24 0-44 16z" fill="#241c19"/>
  <ellipse cx="294" cy="180" rx="34" ry="20" fill="#2a2d33"/>
  ${q(260,300,36,16,"#c6a082",".95")}${q(276,292,36,16,"#d2ae8f",".95")}
 </g>
 <rect width="800" height="450" fill="url(#g)"/><rect width="800" height="450" fill="url(#v)"/>
</svg>`,

deposit:()=>`<svg viewBox="0 0 800 450" class="bg" preserveAspectRatio="xMidYMid slice">
 <defs>${F}${VIG}${G(24,14,56,"#f0d79a",.9)}</defs>
 <rect width="800" height="450" fill="#100f0d"/>
 <g filter="url(#brush)">
  ${q(0,70,420,250,"#4a463c")}
  ${dab(40,0,70,420,250,"#5a5346",.3,29)}
  <path d="M60 120 q6 70 -4 196 q-18-100 4-196z" fill="#2a271f" opacity=".7"/>
  ${q(0,318,420,132,"#211d17")}
  ${q(420,60,380,270,"#1a1713")}
  ${q(430,70,300,250,"#8c2f24",".92")}
  ${q(740,70,60,250,"#0d0c0a")}
  ${q(470,120,230,200,"#15130f")}
  ${q(486,150,70,160,"#2a251d")}${q(600,210,120,100,"#3a3228",".9")}
  ${q(620,250,90,60,"#51402c")}
  <circle cx="452" cy="196" r="4" fill="#c9a24a"/><path d="M450 200 q4 10 -1 18" stroke="#c9a24a" stroke-width="2" fill="none"/>
  <ellipse cx="560" cy="330" rx="15" ry="6" fill="#cfc6b4" opacity=".55"/>
  <path d="M120 96 q10 48 -2 96" stroke="#6b6354" stroke-width="2" fill="none" opacity=".6"/>
  <ellipse cx="150" cy="104" rx="46" ry="16" fill="#3a352c" opacity=".8"/>
 </g>
 <g id="bulb"><line x1="150" y1="0" x2="150" y2="58" stroke="#2a2823" stroke-width="3"/>
  <circle cx="150" cy="72" r="14" fill="#ffe9a8"/><circle cx="150" cy="72" r="5" fill="#fff6d2"/></g>
 <g filter="url(#brush2)">
  <path d="M408 150 q10-30 36-30 q26 0 34 30 q-16-14-35-14 q-19 0-35 14z" fill="#1f1a17"/>
  <ellipse cx="442" cy="178" rx="32" ry="19" fill="#bd9470"/>
  ${q(410,300,34,15,"#ad8663",".95")}
 </g>
 <rect width="800" height="450" fill="url(#g)"/>
 <g filter="url(#grain)" opacity=".45">${q(0,70,420,250,"#6a6354",".18")}</g>
 <rect width="800" height="450" fill="url(#v)"/>
</svg>`,

meeting:()=>`<svg viewBox="0 0 800 450" class="bg" preserveAspectRatio="xMidYMid slice">
 <defs>${F}${VIG}${G(50,6,86,"#dfeadf",.6)}</defs>
 <rect width="800" height="450" fill="#15181a"/>
 <g filter="url(#brush)">
  ${q(0,40,800,268,"#3c4442")}
  ${dab(36,0,50,800,250,"#454d4a",.28,37)}
  ${q(60,26,240,14,"#cfe6cf",".8")}${q(330,26,240,14,"#cfe6cf",".55")}${q(600,26,160,14,"#cfe6cf",".75")}
  ${q(110,88,250,130,"#e7eae2",".95")}
  <path d="M130 120 q50-8 96 2" stroke="#6b7a72" stroke-width="3" fill="none" opacity=".8"/>
  <path d="M130 142 q70-6 140 4" stroke="#6b7a72" stroke-width="2" fill="none" opacity=".6"/>
  <path d="M130 164 q40-4 72 2" stroke="#8c2f24" stroke-width="3" fill="none" opacity=".7"/>
  ${q(0,306,800,144,"#2f2a23")}
  <ellipse cx="400" cy="328" rx="340" ry="44" fill="#4a4034"/>
  <ellipse cx="400" cy="322" rx="330" ry="38" fill="#5a4c3c" opacity=".9"/>
  ${q(330,312,84,24,"#e9e0c8")}
  <path d="M430 320 q18-4 28 2 q-6 8 -28 -2z" fill="#c9a24a"/>
  ${q(520,312,66,40,"#15161a",".95")}
  <g>${[120,200,560,650].map(x=>q(x,300,70,20,"#241f19",".9")).join('')}</g>
  <g>${[132,212,572,662].map(x=>q(x,292,26,12,"#d6bb9c",".9")).join('')}</g>
  <ellipse cx="236" cy="346" rx="16" ry="5" fill="#5b4a33" opacity=".7"/>
  <path d="M90 410 q120-18 220 4" stroke="#1d1a15" stroke-width="3" fill="none" opacity=".5"/>
 </g>
 <g filter="url(#brush2)">
  <path d="M372 196 q12-32 42-32 q28 0 38 32 q-18-14-40-14 q-22 0-40 14z" fill="#b9b4ab"/>
  <ellipse cx="412" cy="226" rx="34" ry="21" fill="#d3b295"/>
  ${q(366,300,40,16,"#c8a687",".95")}
  <path d="M452 300 q12-6 20-1" stroke="#c8a687" stroke-width="12" fill="none" stroke-linecap="round"/>
  ${q(404,252,18,56,"#2f3b55",".95")}
 </g>
 <g id="flick" opacity=".5">${q(300,22,200,10,"#f4ffe9",".5")}</g>
 <rect width="800" height="450" fill="url(#g)"/><rect width="800" height="450" fill="url(#v)"/>
</svg>`,

fund:()=>`<svg viewBox="0 0 800 450" class="bg" preserveAspectRatio="xMidYMid slice">
 <defs>${F}${VIG}${G(26,62,40,"#f3d9a0",.85)}</defs>
 <rect width="800" height="450" fill="#0e1016"/>
 <g filter="url(#brush)">
  ${q(0,20,800,300,"#1b2franch".replace('franch','0'))}
  ${q(260,20,540,300,"#22303f",".95")}
  <g>${Array.from({length:6},(_,i)=>`<line x1="${280+i*92}" y1="20" x2="${280+i*92}" y2="320" stroke="#3f5668" stroke-width="3" opacity=".6"/>`).join('')}</g>
  ${dab(60,270,60,520,230,"#36506a",.22,41)}
  <g>${Array.from({length:46},(_,i)=>q(284+((i*53)%500),70+((i*71)%200),5,4,"#f0d79a",(0.25+0.5*((i*29)%7)/7).toFixed(2))).join('')}</g>
  ${q(0,318,800,132,"#191410")}
  ${q(180,268,420,56,"#51331f")}${q(186,314,408,12,"#6b4526",".85")}
  ${q(214,246,96,26,"#d9c8a4",".92")}${q(318,250,84,22,"#c6b592",".85")}${q(406,248,80,24,"#cdbb98",".8")}
  <path d="M520 240 q18 2 20 24 q-16 6 -22 -2z" fill="#b8902f" opacity=".9"/>
  <ellipse cx="566" cy="262" rx="13" ry="18" fill="#9a5d22" opacity=".85"/>
  ${q(236,330,70,56,"#2b231c",".95")}
  ${q(120,240,70,84,"#8c2f24",".9")}
 </g>
 <g filter="url(#brush2)">
  <path d="M300 150 q12-30 40-30 q26 0 34 30 q-16-14-37-14 q-21 0-37 14z" fill="#2b2320"/>
  ${q(292,178,96,150,"#242a2e")}
  <ellipse cx="340" cy="176" rx="30" ry="18" fill="#2b2320" opacity=".85"/>
  ${q(286,250,22,34,"#242a2e",".95")}${q(372,250,22,34,"#242a2e",".95")}
 </g>
 <g id="lamp2"><path d="M612 236 q0 20 -28 24 l0 8 q34-2 38-32z" fill="#7a5f28"/><circle cx="596" cy="258" r="8" fill="#ffe9b8"/></g>
 <g id="rain" opacity=".4">${Array.from({length:22},(_,i)=>`<line x1="${286+i*22}" y1="${30+((i*31)%40)}" x2="${282+i*22}" y2="${150+((i*47)%120)}" stroke="#bcd0e0" stroke-width="1" opacity="${(0.1+0.4*((i*23)%9)/9).toFixed(2)}"/>`).join('')}</g>
 <rect width="800" height="450" fill="url(#g)"/><rect width="800" height="450" fill="url(#v)"/>
</svg>`,

warroom:()=>`<svg viewBox="0 0 800 450" class="bg" preserveAspectRatio="xMidYMid slice">
 <defs>${F}${VIG}${G(42,12,56,"#f2c98a",.9)}</defs>
 <rect width="800" height="450" fill="#100d0b"/>
 <g filter="url(#brush)">
  ${q(0,60,800,256,"#302620")}
  ${dab(40,0,70,800,240,"#3b2f26",.3,53)}
  ${q(56,96,250,166,"#d8cdb0",".95")}
  <g>${Array.from({length:16},(_,i)=>`<circle cx="${76+((i*37)%220)}" cy="${118+((i*53)%130)}" r="2.6" fill="#8c2f24"/>`).join('')}</g>
  <path d="M86 140 L180 196 L124 232 L246 160 L140 118" stroke="#8c2f24" stroke-width="1.6" fill="none" opacity=".85"/>
  <path d="M108 170 L236 206" stroke="#8c2f24" stroke-width="1.6" fill="none" opacity=".6"/>
  ${q(560,88,210,170,"#17120e")}
  ${q(0,314,800,136,"#1a1511")}
  ${q(170,272,520,52,"#4e3a24")}${q(176,316,508,12,"#6a4e2f",".85")}
  <path d="M432 262 q26-2 30 22 q-22 6 -32 -4z" fill="#b8902f" opacity=".92"/>
  ${q(300,290,74,30,"#2a221a",".95")}
  <ellipse cx="640" cy="300" rx="15" ry="20" fill="#cfd9d4" opacity=".35"/>${q(628,300,26,22,"#dbe4df",".3")}
  <g>${q(600,316,96,110,"#241d17")}${q(608,300,80,26,"#352b21",".95")}</g>
  <g>${q(236,330,86,96,"#2b231b")}${q(244,316,70,24,"#3a2f24",".95")}</g>
 </g>
 <g id="lamp3"><line x1="400" y1="0" x2="400" y2="50" stroke="#2a2218" stroke-width="3"/>
  <path d="M362 50 q38-14 76 0 q-10 26 -38 26 q-28 0-38 -26z" fill="#4e3b22"/><circle cx="400" cy="74" r="10" fill="#ffdfa0"/></g>
 <g opacity=".5">
  <path d="M250 262 q-40 44 -70 86" stroke="#0d0a08" stroke-width="22" fill="none" opacity=".5"/>
  <path d="M430 300 q-20 56 -34 94" stroke="#0d0a08" stroke-width="20" fill="none" opacity=".45"/>
  <path d="M624 318 q-14 50 -20 82" stroke="#0d0a08" stroke-width="18" fill="none" opacity=".4"/>
 </g>
 <g filter="url(#brush2)">
  <path d="M212 190 q10-30 36-30 q26 0 34 30 q-16-14-35-14 q-19 0-35 14z" fill="#56504a"/>
  <ellipse cx="248" cy="218" rx="31" ry="19" fill="#c4a183"/>
  ${q(208,292,30,14,"#b6946f",".95")}
  <ellipse cx="428" cy="238" rx="28" ry="18" fill="#c09b79" opacity=".92"/>
  ${q(398,284,24,14,"#b08a68",".9")}${q(440,284,24,14,"#b08a68",".9")}
  <ellipse cx="646" cy="252" rx="25" ry="17" fill="#b59277" opacity=".85"/>
  ${q(612,290,74,40,"#5c5346",".9")}
 </g>
 <g id="rain" opacity=".45">${Array.from({length:14},(_,i)=>`<line x1="${578+i*13}" y1="96" x2="${574+i*13}" y2="238" stroke="#9fb6c8" stroke-width="1" opacity="${(0.12+0.4*((i*19)%7)/7).toFixed(2)}"/>`).join('')}</g>
 <rect width="800" height="450" fill="url(#g)"/><rect width="800" height="450" fill="url(#v)"/>
</svg>`,

mirror:()=>`<svg viewBox="0 0 800 450" class="bg" preserveAspectRatio="xMidYMid slice">
 <defs>${VIG}${G(50,46,44,"#aab4bc",.4)}</defs>
 <rect width="800" height="450" fill="#1a1d20"/>
 <rect x="0" y="0" width="800" height="330" fill="#20242a"/>
 <rect x="236" y="54" width="328" height="286" fill="#2a3036"/>
 <rect x="248" y="66" width="304" height="262" fill="#171b20"/>
 <g opacity=".5">
  <rect x="268" y="150" width="264" height="120" fill="#2a2a24"/>
  <rect x="300" y="166" width="40" height="34" fill="#ddd6c6" opacity=".5"/>
  <rect x="352" y="166" width="40" height="34" fill="#ddd6c6" opacity=".35"/>
  <rect x="268" y="258" width="264" height="12" fill="#7a4526" opacity=".6"/>
  <circle cx="470" cy="236" r="6" fill="#d9b25a" opacity=".5"/>
 </g>
 <rect x="0" y="330" width="800" height="120" fill="#13161a"/>
 <rect x="0" y="330" width="800" height="3" fill="#39434b"/>
 <rect x="0" y="406" width="800" height="4" fill="#9fb27a" opacity=".55"/>
 <g><rect x="624" y="96" width="76" height="76" fill="#1d2228"/><circle cx="662" cy="134" r="31" fill="#2b3238"/>
  <line x1="662" y1="134" x2="662" y2="112" stroke="#cfd6da" stroke-width="2"/>
  <line x1="662" y1="134" x2="678" y2="140" stroke="#cfd6da" stroke-width="2"/>
  <line x1="662" y1="134" x2="650" y2="150" stroke="#8c2f24" stroke-width="1.4" id="sec"/></g>
 <rect width="800" height="450" fill="url(#g)"/><rect width="800" height="450" fill="url(#v)"/>
</svg>`
};

// ---- WP-19.2 corridors and the prologue: same brushwork, one light, one wrong object each ----
const SCENE = (bg,light,body)=>`<svg viewBox="0 0 800 450" class="bg" preserveAspectRatio="xMidYMid slice">
 <defs>${F}${VIG}${G(light[0],light[1],light[2],light[3],light[4])}</defs>
 <rect width="800" height="450" fill="${bg}"/><g filter="url(#brush)">${body}</g>
 <rect width="800" height="450" fill="url(#g)"/><rect width="800" height="450" fill="url(#v)"/></svg>`;
Object.assign(R,{
 drive:()=>SCENE("#06080b",[50,40,60,"#d9b25a",.5],`
  ${q(0,0,800,300,"#0b1016")}
  <g id="rain">${Array.from({length:40},(_,i)=>`<line x1="${(i*41)%800}" y1="${(i*23)%260}" x2="${(i*41)%800-6}" y2="${(i*23)%260+40}" stroke="#9fb6c8" stroke-width="1.2" opacity="${(0.15+0.35*((i*7)%5)/5).toFixed(2)}"/>`).join('')}</g>
  ${dab(30,40,120,720,140,"#d9b25a",.25,61)}
  <ellipse cx="400" cy="250" rx="300" ry="40" fill="#1a1712" opacity=".8"/>
  ${q(0,300,800,150,"#120f0c")}
  <path d="M200 450 q200-120 400 0" stroke="#2a2520" stroke-width="22" fill="none"/>
  <ellipse cx="400" cy="420" rx="110" ry="40" fill="none" stroke="#3a3128" stroke-width="10"/>
  <rect x="560" y="360" width="60" height="30" rx="4" fill="#0e1218"/><rect x="566" y="366" width="48" height="18" fill="#9fd39a" opacity=".6"/>
  ${q(632,380,40,12,"#c9a24a",".25")}`),
 stair:()=>SCENE("#121110",[50,6,62,"#e8d7a8",.75],`
  ${q(0,40,800,290,"#3b3830")}${dab(30,0,50,800,270,"#46423a",.3,63)}
  ${Array.from({length:8},(_,i)=>q(120+i*44,330-i*30,320,14,"#5a5246"))}
  ${q(560,90,170,150,"#d6cdb6")}${q(574,104,90,120,"#ece4d0")}
  ${q(588,116,60,40,"#c9bfa6")}<path d="M660 104 q12 6 4 16" stroke="#8a826e" stroke-width="2" fill="none"/>
  ${q(80,250,26,16,"#8c2f24",".8")}${q(0,330,800,120,"#1e1b17")}`),
 lobby:()=>SCENE("#0f1214",[62,8,58,"#dfe6ee",.6],`
  ${q(0,40,800,290,"#2c3236")}${dab(30,0,50,800,270,"#353c41",.3,65)}
  ${q(420,60,220,120,"#141a1e")}${q(432,72,196,96,"#1e2a2e")}${q(432,150,196,16,"#8c2f24",".85")}
  ${q(120,170,60,160,"#1a1d20")}<ellipse cx="150" cy="160" rx="18" ry="12" fill="#1a1d20"/>
  ${q(0,330,800,120,"#1a1d20")}${q(300,320,200,20,"#4a4036")}${q(690,240,40,70,"#4a5a3a",".8")}`),
 street:()=>SCENE("#0e1013",[78,10,56,"#cfd8df",.55],`
  ${q(0,30,800,300,"#2a2e33")}${dab(36,0,40,800,280,"#33383e",.28,67)}
  ${q(60,60,140,240,"#1c1f23")}${q(600,60,160,240,"#1c1f23")}
  ${q(0,300,800,150,"#191b1e")}
  <path d="M240 330 q160-50 320 0 l0 40 q-160 20 -320 0z" fill="#5a5d60"/>${q(300,300,200,40,"#3f4245",".95")}
  ${q(316,306,70,22,"#1b2a33",".9")}${q(404,306,80,22,"#1b2a33",".9")}
  <circle cx="300" cy="372" r="18" fill="#0d0e10"/><circle cx="500" cy="372" r="18" fill="#0d0e10"/>
  ${q(380,358,40,8,"#e8e0cf",".7")}<circle cx="352" cy="318" r="3" fill="#e07a3a"/>`),
 stair2:()=>SCENE("#0f0e0c",[30,10,50,"#ffe9a8",.8],`
  ${q(0,60,800,270,"#3e3a31")}${dab(36,0,70,800,250,"#4a4539",.3,69)}
  ${Array.from({length:7},(_,i)=>q(380-i*40,320-i*28,300,14,"#5a5145"))}
  ${q(500,90,120,220,"#8c2f24",".85")}<circle cx="512" cy="206" r="4" fill="#c9a24a"/>
  ${q(0,330,800,120,"#1d1a16")}${q(640,260,50,40,"#0e1218")}${q(650,266,30,20,"#9fd39a",".5")}`),
 lift:()=>SCENE("#121416",[50,0,70,"#dfeadf",.55],`
  ${q(120,20,560,420,"#3a4040")}${dab(30,130,30,540,400,"#454b4b",.3,71)}
  ${q(160,60,230,360,"#59605f")}${q(410,60,230,360,"#59605f")}
  <line x1="400" y1="60" x2="400" y2="420" stroke="#2a2e2e" stroke-width="4"/>
  ${Array.from({length:6},(_,i)=>`<circle cx="700" cy="${140+i*30}" r="9" fill="${i===5?'#c9a24a':'#2a2e2e'}"/>`).join('')}
  ${q(694,286,12,8,"#e8e0cf",".35")}`),
 door:()=>SCENE("#0d0f14",[40,40,46,"#f3d9a0",.7],`
  ${q(0,20,800,310,"#1f2a36")}${dab(50,0,30,800,290,"#2b3a4a",.25,73)}
  <g id="rain">${Array.from({length:30},(_,i)=>`<line x1="${(i*53)%800}" y1="${(i*17)%300}" x2="${(i*53)%800-4}" y2="${(i*17)%300+30}" stroke="#9fb6c8" stroke-width="1" opacity=".4"/>`).join('')}</g>
  ${q(260,80,220,250,"#3a2c1e")}${q(276,96,188,234,"#5a4026",".9")}
  ${q(300,190,80,130,"#20262c")}<ellipse cx="340" cy="180" rx="22" ry="14" fill="#8a6448"/>${q(318,166,44,10,"#1a1614")}
  ${q(380,250,44,30,"#e8e0cf",".92")}${q(0,330,800,120,"#141418")}`),
 hall:()=>SCENE("#0a0908",[50,60,40,"#9fb27a",.35],`
  ${q(0,60,800,260,"#1e1915")}${dab(30,0,70,800,240,"#28211b",.28,75)}
  ${q(340,120,120,220,"#0f0c0a")}${q(340,330,120,6,"#9fb27a",".7")}
  <line x1="400" y1="0" x2="400" y2="40" stroke="#2a2218" stroke-width="3"/><circle cx="400" cy="52" r="10" fill="#2a2218"/>
  ${q(0,320,800,130,"#120f0c")}${q(560,220,70,90,"#241d17",".9")}`)
});

return {bg:id=>(R[id]||R.kitchen)()};
})();
