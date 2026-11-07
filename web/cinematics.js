// WP-16 / WP-19.5 — the eleven endings. Part A animation, Part B typewriter, Part C title and score.
window.CINE = (function(){
const P = (a,b,c)=>a+"\n\n"+b+"\n\n"+c;
const E = {
perfect_ledger:{ anim:"money", dur:18000, title:"THE PERFECT LEDGER", ink:"gold", bars:"animate", mystery:true,
 text:P("Voss is found in Marseille. Alive. He does not speak.",
 "The 240 million is never recovered, because it was never missing. Every transfer is legal and every signature is yours. Lukas Vermeulen is buried on the fourth of December. You do not attend.",
 "You are fifty-three. You have a house in Knokke and you are alone.")},
doublecross:{ anim:"folder", dur:12000, title:"THE DOUBLE CROSS", ink:"gold", bars:"animate",
 text:P("Voss sets the folder down. Every move you made is in it, by date, in his hand.",
 "He is not angry and he does not stop you. He says the seat was always yours, because he chose you in a kitchen eleven days ago, and the only person you never read was him.",
 "You are the Architect now. On Tuesdays you make one phone call.")},
cartel:{ anim:"dock", dur:11000, title:"THE CARTEL'S MAN", ink:"gold", bars:"animate",
 text:P("You take the money, the protection and the passport.",
 "The brothers are never charged. The Greek is never named. Ines Marchetti stays at the edge of a photograph, and the photograph in your wallet fades until there is nothing on it.",
 "You wait on a dock at Rotterdam. The phone rings when they want it to.")},
chair:{ anim:"kitchen", dur:9000, title:"THE CHAIR", ink:"bone", bars:"static",
 text:P("You take the seat, the money and the silence.",
 "The room empties. Nobody is charged and nobody is cleared, and the file is closed by a clerk who never met any of you.",
 "A kitchen at eleven at night. A stranger sits down. You are the next one's narrator.")},
ghost:{ anim:"yard", dur:10000, title:"THE BOOKKEEPER'S GHOST", ink:"gold", bars:"animate",
 text:P("You say it out loud, in a room with three witnesses in it: the question was yours.",
 "You go to prison for a death you did not intend. The brothers walk. Ines Marchetti's name is read into the record by you, and spelled wrong in the transcript. Lukas Vermeulen's daughter reads law in Leuven.",
 "The sentence is four years. You serve two. In the yard, a stranger sits down and asks what you are.")},
dying:{ anim:"hospital", dur:10000, title:"THE DYING BROTHER'S CONFESSION", ink:"dim", bars:"animate",
 text:P("Emil dies in a hospital bed in Ghent on the nineteenth of January.",
 "The recording is in your pocket and it is tainted, because you held a match to a dying man to get it. A prosecutor listens to eleven minutes and asks how it was obtained. De Vries walks. Marek sends the largest arrangement to the funeral.",
 "You keep the recorder. You do not play it again.")},
ledger:{ anim:"court", dur:12000, title:"THE OPEN LEDGER", ink:"gold", bars:"insight_first",
 text:P("Nothing you used was a lie, and every person you spoke to kept the refusals they asked for.",
 "Two funds stop clearing. The cartel is named in three jurisdictions. Two brothers are convicted and one dies before sentencing. Ines Marchetti's name is spoken aloud for the first time in twenty-five years, by a prosecutor who never met her.",
 "You walk out with nothing. You have a room above a bookshop in Antwerp. You sleep.")},
silence:{ anim:"blank", dur:8000, title:"THE SILENCE", ink:"bone_on_bone", bars:"craft_only",
 text:P("Grey rock, in every room, all the way through. Nobody got anything out of you.",
 "The brothers go free. The cartel keeps the route. Lukas Vermeulen's family is paid nothing. You learned Ines Marchetti's name in the War Room and you have never said it to anyone.",
 "You are fifty-three. You have a flat in Berchem. You are alone.")},
wall:{ anim:"corridor", dur:7000, title:"THE WALL", ink:"bright_gold", bars:"no_edge",
 text:P("You refused all of it, calmly, the same way, every time.",
 "No deal, no seat, no name, no signature. Friday happens anyway. A name goes on a filing and it is not yours, and you never learn whose it was or what the woman in the photograph was called.",
 "A door, a corridor, a Monday. The clock is correct. You sleep.")},
scapegoat:{ anim:"newsstand", dur:9000, title:"THE SCAPEGOAT", ink:"oxide", bars:"static_low",
 text:P("They hand your name to the press on the Friday, first on a list of three.",
 "You never learn what was true. It was all in front of you: a clock four minutes slow, a second cup, an empty chair with a used glass, and a one-beat pause before the word estate.",
 "Your face is on a newspaper you cannot read. You are fifty-three. You are alone.")},
signature:{ anim:"contract", dur:6000, title:"THE SIGNATURE", ink:"bone", bars:"none",
 text:P("You signed on the third day, and the game ended there.",
 "Nine pages. Eight protected you. The ninth covered service matters before 2002, which is a mountain in 2001 and a woman whose name you never learned.",
 "The screen fades to your own signature, already dry.")}
};
// Part A — painted sequences, same brushwork and palette logic as the rooms
const ANIM = {
money:()=>`<svg viewBox="0 0 800 450" class="cine"><defs>
 <radialGradient id="cl"><stop offset="0" stop-color="#ffdfa0" stop-opacity=".9"/><stop offset="1" stop-color="#ffdfa0" stop-opacity="0"/></radialGradient>
 <filter id="cb"><feTurbulence type="fractalNoise" baseFrequency=".01 .02" numOctaves="3" seed="9" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="7" xChannelSelector="R" yChannelSelector="G"/></filter></defs>
 <rect width="800" height="450" fill="#0a0907"/>
 <g filter="url(#cb)">
  ${Array.from({length:24},(_,i)=>{const d=[['#caa05a',120,55],['#b8863f',120,55],['#9a7a4e',120,55],['#8e7a9a',120,55]][i%4];
   const x=((i*137)%760), y=((i*91)%380);
   return `<g class="note n${i%6}" style="--dx:${x}px;--dy:${y}px;--d:${(i*0.16).toFixed(2)}s"><rect x="0" y="0" width="${d[1]}" height="${d[2]}" rx="3" fill="${d[0]}"/><rect x="8" y="8" width="${d[1]-16}" height="6" fill="#00000022"/><circle cx="${d[1]-22}" cy="${d[2]/2}" r="11" fill="#00000018"/></g>`;}).join('')}
  ${Array.from({length:12},(_,i)=>`<rect class="col" style="--cd:${(3+i*0.12).toFixed(2)}s" x="${54+i*60}" y="250" width="44" height="130" fill="#b2914f"/>`).join('')}
  ${Array.from({length:6},(_,i)=>`<g class="scr" style="--sd:${(5+i*0.2).toFixed(2)}s"><rect x="${70+i*120}" y="120" width="92" height="110" fill="#0e1410"/>
   ${Array.from({length:7},(_,j)=>`<rect x="${76+i*120}" y="${128+j*14}" width="${40+((i*7+j*13)%40)}" height="4" fill="#9fd39a" opacity=".8"/>`).join('')}</g>`).join('')}
 </g>
 <g class="lamp8"><line x1="400" y1="0" x2="400" y2="54" stroke="#2a2218" stroke-width="3"/><circle cx="400" cy="68" r="12" fill="#ffdfa0"/><circle cx="400" cy="68" r="120" fill="url(#cl)" opacity=".35"/></g>
 <g class="fig"><ellipse cx="400" cy="300" rx="52" ry="26" fill="#141210"/><path d="M348 318 q52-26 104 0 l6 86 q-58 18 -116 0z" fill="#141210"/>
  <ellipse cx="352" cy="372" rx="13" ry="8" fill="#8a6b52"/><ellipse cx="448" cy="372" rx="13" ry="8" fill="#8a6b52"/>
  <rect class="pen" x="440" y="366" width="26" height="4" rx="2" fill="#c9a24a"/></g>
 <rect class="blackout" width="800" height="450" fill="#000" opacity="0"/>
</svg>`,
folder:()=>`<svg viewBox="0 0 800 450" class="cine"><rect width="800" height="450" fill="#0b0a09"/>
 <g><rect x="140" y="250" width="520" height="160" fill="#2a2118"/><rect x="140" y="250" width="520" height="8" fill="#3c3022"/></g>
 <g class="fold"><rect x="220" y="150" width="360" height="200" rx="4" fill="#cdbf9e"/><rect x="220" y="150" width="360" height="14" fill="#b8a888"/>
  ${Array.from({length:7},(_,i)=>`<g class="pg" style="--pd:${(1.6+i*0.9).toFixed(2)}s"><rect x="232" y="166" width="336" height="170" fill="#e8e0cf"/>
   <text x="250" y="${196+0}" font-family="Cormorant Unicase, serif" font-size="15" fill="#3a332a">${['28 OCT 23:04','29 OCT 09:12','30 OCT 16:40','31 OCT 11:55','01 NOV 14:02','02 NOV 19:30','03 NOV 08:08'][i]}</text>
   <rect x="250" y="212" width="${150+i*22}" height="3" fill="#6b6252"/><rect x="250" y="226" width="${110+i*18}" height="3" fill="#6b6252"/></g>`).join('')}
  <rect class="pg blank" style="--pd:9.9s" x="232" y="166" width="336" height="170" fill="#e8e0cf"/></g>
 <g class="hand8"><ellipse cx="640" cy="300" rx="46" ry="20" fill="#9a7a5e"/><circle cx="618" cy="296" r="4" fill="#c9a24a"/></g>
 <rect class="blackout" width="800" height="450" fill="#000" opacity="0"/></svg>`,
dock:()=>`<svg viewBox="0 0 800 450" class="cine"><rect width="800" height="450" fill="#121722"/>
 <rect y="0" width="800" height="250" fill="#1b2430"/><rect y="250" width="800" height="200" fill="#0d1319"/>
 ${Array.from({length:18},(_,i)=>`<rect class="wave" style="--wd:${(i*0.11).toFixed(2)}s" x="${i*46}" y="${300+((i*31)%18)}" width="40" height="3" fill="#3a4a5c" opacity=".7"/>`).join('')}
 <g class="crane"><rect x="520" y="60" width="10" height="200" fill="#2b3340"/><rect x="420" y="60" width="220" height="8" fill="#2b3340"/><line x1="470" y1="68" x2="470" y2="160" stroke="#2b3340" stroke-width="3"/>
  <rect class="cont" x="432" y="160" width="78" height="46" fill="#7a3a2c"/></g>
 <g class="figd"><path d="M150 250 q22-16 44 0 l6 72 q-28 10 -56 0z" fill="#0a0c0f"/><ellipse cx="172" cy="244" rx="18" ry="11" fill="#0a0c0f"/>
  <circle class="cig" cx="196" cy="268" r="2.4" fill="#e07a3a"/></g>
 <g class="photo8"><rect x="186" y="276" width="34" height="24" fill="#d8cdb0"/></g>
 <rect class="blackout" width="800" height="450" fill="#000" opacity="0"/></svg>`,
kitchen:()=>window.ART.bg('kitchen')
 .replace('class="bg"','class="cine kitchenend"')
 .replace('</svg>', `<g class="stranger9"><ellipse cx="560" cy="286" rx="22" ry="13" fill="#0c0b0a"/><path d="M532 300 q28-16 56 0 l6 60 q-34 12 -68 0z" fill="#0c0b0a"/></g>
 <rect class="blackout" width="800" height="450" fill="#000" opacity="0"/></svg>`),
yard:()=>`<svg viewBox="0 0 800 450" class="cine"><rect width="800" height="450" fill="#9a9a96"/>
 <rect y="0" width="800" height="230" fill="#aeaea8"/><rect y="230" width="800" height="220" fill="#7e7e78"/>
 ${Array.from({length:40},(_,i)=>`<line x1="${i*20}" y1="40" x2="${i*20}" y2="230" stroke="#6c6c66" stroke-width="1.4" opacity=".8"/>`).join('')}
 ${Array.from({length:12},(_,i)=>`<line x1="0" y1="${40+i*16}" x2="800" y2="${40+i*16}" stroke="#6c6c66" stroke-width="1.4" opacity=".8"/>`).join('')}
 <rect x="220" y="300" width="360" height="12" fill="#5d5d57"/><rect x="236" y="312" width="12" height="40" fill="#5d5d57"/><rect x="552" y="312" width="12" height="40" fill="#5d5d57"/>
 <g><path d="M300 240 q22-16 44 0 l6 62 q-28 10 -56 0z" fill="#6a6a64"/><ellipse cx="322" cy="234" rx="18" ry="11" fill="#8a8a82"/></g>
 <g class="stranger8"><path d="M400 240 q22-16 44 0 l6 62 q-28 10 -56 0z" fill="#3c3c38"/><ellipse cx="422" cy="234" rx="18" ry="11" fill="#3c3c38"/></g>
 <rect class="blackout" width="800" height="450" fill="#000" opacity="0"/></svg>`,
hospital:()=>`<svg viewBox="0 0 800 450" class="cine"><rect width="800" height="450" fill="#1a1f22"/>
 <rect y="0" width="800" height="260" fill="#232a2d"/><rect x="520" y="40" width="240" height="200" fill="#121a1e"/>
 ${Array.from({length:12},(_,i)=>`<line class="rain8" style="--rd:${(i*0.14).toFixed(2)}s" x1="${536+i*18}" y1="48" x2="${532+i*18}" y2="226" stroke="#7f98a8" stroke-width="1"/>`).join('')}
 <rect y="260" width="800" height="190" fill="#141a1c"/>
 <rect x="120" y="250" width="420" height="90" rx="8" fill="#2e3538"/><rect x="140" y="236" width="180" height="26" rx="10" fill="#cfd6d4"/>
 <ellipse cx="200" cy="236" rx="26" ry="16" fill="#b59277"/>
 <rect x="150" y="268" width="360" height="60" fill="#55605f"/>
 <ellipse cx="330" cy="272" rx="20" ry="9" fill="#b08a68"/>
 <g><rect x="580" y="286" width="70" height="40" rx="4" fill="#9aa0a2"/><circle class="rec8" cx="638" cy="296" r="5" fill="#d8352a"/></g>
 <rect class="blackout" width="800" height="450" fill="#000" opacity="0"/></svg>`,
court:()=>`<svg viewBox="0 0 800 450" class="cine"><rect width="800" height="450" fill="#1d1a16"/>
 <rect y="0" width="800" height="240" fill="#2b2620"/><rect x="280" y="60" width="240" height="180" fill="#3c342a"/>
 <rect y="240" width="800" height="210" fill="#191612"/>
 ${Array.from({length:5},(_,i)=>`<rect x="${60+i*150}" y="300" width="120" height="16" fill="#4a3f30"/>`).join('')}
 <g><path d="M380 180 q22-16 44 0 l6 60 q-28 10 -56 0z" fill="#15120f"/><ellipse cx="402" cy="174" rx="17" ry="10" fill="#c09b79"/><rect x="424" y="208" width="30" height="22" fill="#ded3b8"/></g>
 <g class="anna8"><ellipse cx="200" cy="292" rx="17" ry="10" fill="#c9a385"/><path d="M180 300 q20-12 40 0 l4 22 q-24 8 -48 0z" fill="#6b6257"/></g>
 <g class="gavel8"><rect x="560" y="286" width="44" height="10" rx="4" fill="#6b4a2c"/></g>
 <rect class="blackout" width="800" height="450" fill="#000" opacity="0"/></svg>`,
blank:()=>`<svg viewBox="0 0 800 450" class="cine"><rect width="800" height="450" fill="#e8e0cf"/>
 <rect class="doorline" x="0" y="430" width="800" height="5" fill="#9fb27a"/>
 <rect class="blackout" width="800" height="450" fill="#000" opacity="0"/></svg>`,
corridor:()=>`<svg viewBox="0 0 800 450" class="cine"><rect width="800" height="450" fill="#c9c6bc"/>
 <rect y="0" width="800" height="300" fill="#d4d1c6"/><rect y="300" width="800" height="150" fill="#9f9c92"/>
 <path d="M300 60 L300 340 L500 300 L500 100z" fill="#b8b5aa"/>
 <g class="door8"><rect x="300" y="60" width="200" height="280" fill="#8b8679"/></g>
 <g><rect x="596" y="96" width="76" height="76" fill="#efece2"/><circle cx="634" cy="134" r="31" fill="#fbf8f0" stroke="#6b6861" stroke-width="2"/>
  <line x1="634" y1="134" x2="634" y2="112" stroke="#2a2a26" stroke-width="2"/><line x1="634" y1="134" x2="650" y2="140" stroke="#2a2a26" stroke-width="2"/>
  <line class="sec8" x1="634" y1="134" x2="634" y2="108" stroke="#8c2f24" stroke-width="1.4"/></g>
 <rect class="blackout" width="800" height="450" fill="#000" opacity="0"/></svg>`,
newsstand:()=>`<svg viewBox="0 0 800 450" class="cine"><rect width="800" height="450" fill="#14161a"/>
 <rect y="200" width="800" height="250" fill="#20242a"/>
 <g><rect x="180" y="150" width="440" height="280" fill="#e4dcc8"/>
  <rect x="206" y="176" width="300" height="22" fill="#2a2721"/><rect x="206" y="206" width="380" height="12" fill="#55504a"/>
  <rect x="206" y="240" width="180" height="140" fill="#3a3a38"/>
  <ellipse cx="296" cy="286" rx="30" ry="20" fill="#1e1e1c"/><path d="M256 300 q40-22 80 0 l6 80 q-46 14 -92 0z" fill="#1e1e1c"/>
  <rect x="402" y="240" width="184" height="6" fill="#6b6657"/><rect x="402" y="256" width="150" height="6" fill="#6b6657"/><rect x="402" y="272" width="170" height="6" fill="#6b6657"/></g>
 <g class="hand9"><ellipse cx="640" cy="200" rx="48" ry="20" fill="#9a7a5e"/></g>
 <rect class="blackout" width="800" height="450" fill="#000" opacity="0"/></svg>`,
contract:()=>`<svg viewBox="0 0 800 450" class="cine"><rect width="800" height="450" fill="#100e0c"/>
 <rect y="250" width="800" height="200" fill="#3a2c1e"/>
 <g class="doc8"><rect x="200" y="120" width="400" height="280" fill="#ece5d4"/>
  ${Array.from({length:9},(_,i)=>`<rect x="228" y="${152+i*22}" width="${230+((i*37)%120)}" height="4" fill="#6b6557"/>`).join('')}
  <rect x="228" y="352" width="150" height="2" fill="#2a2721"/>
  <path class="sig8" d="M232 348 q16-18 30 0 q10-14 20 2 q12-16 26 0 q10-10 22 4" stroke="#1a1a2e" stroke-width="2.6" fill="none"/></g>
 <g class="hand10"><ellipse cx="300" cy="392" rx="52" ry="22" fill="#b2865f"/><path d="M276 372 q14 6 22 2" stroke="#7d4f44" stroke-width="2.4" fill="none"/>
  <rect x="330" y="348" width="70" height="7" rx="3" fill="#1d2430" transform="rotate(-18 330 348)"/></g>
 <rect class="blackout" width="800" height="450" fill="#000" opacity="0"/></svg>`
};
function get(id){ return E[id]||E.scapegoat; }
function anim(id){ const e=get(id); return (ANIM[e.anim]||ANIM.blank)(); }
return {get, anim, ENDINGS:E, ANIM};
})();
