window.GAME = (function(){
const ROOMS = (window.ROOMS1||[]).concat(window.ROOMS2||[]);
[window.EXPAND, window.EXPAND_B, window.EXPAND_C, window.EXPAND_D].filter(Boolean).forEach(EX=>{
 ROOMS.forEach(r=>{
  const x=EX[r.id]; if(!x) return;
  Object.assign(r.nodes, x.nodes||{});
  Object.entries(x.addChoices||{}).forEach(([nid,list])=>{ if(r.nodes[nid]) r.nodes[nid].ch=(r.nodes[nid].ch||[]).concat(list); });
  (x.objects||[]).forEach(o=>{ if(!r.objects.some(y=>y.id===o.id)) r.objects.push(o); });
 });
});
const VERBS=["PROBE","REFLECT","EVIDENCE","TRADE","BOUNDARY","SILENCE","EXIT","FRAME","PRESSURE","SKULL"];
function verbOf(c){
 if(c.verb) return c.verb;
 if(c.skull) return "SKULL";
 if(c.exit) return "EXIT";
 return ({probe:"PROBE",call:"PROBE",empathy:"REFLECT",evidence:"EVIDENCE",self_interest:"TRADE",concession:"TRADE",
  boundary:"BOUNDARY",refusal:"BOUNDARY",silence:"SILENCE",pressure:"PRESSURE",scarcity:"PRESSURE",
  social_proof:"FRAME",flattery:"FRAME",naming:"REFLECT"})[c.type]||"EVIDENCE";
}
ROOMS.forEach(r=>Object.values(r.nodes).forEach(n=>(n.ch||[]).forEach(c=>{ c.verb=verbOf(c); })));
const S = {
 i:0, insight:0, craft:0, edge:0, skulls:0, walls:0, silences:0, calls:0, wrongCalls:0,
 points:3, carry:{}, results:{}, missed:{}, node:null, room:null, trust:40, fear:20,
 tells:{}, clicked:{}, revealed:{}, examined:{}, turn:0, seen:{}, log:[], signed:false,
 perfect:true, calls_correct:0, calls_wrong:0, skulls_used:0, skulls_detected:0,
 clean_failures:0, warroom_contradiction:false, protected_violation:false, bookkeeper_died:false,
 missed_tactic_tells:0, missed_calls:0, ending_skipped:false, hand:'pen',
 seeds:[], weakened:[], injected:[], burned:{}, known:{}, disabled:{}, pressureMult:1, certainty:50, limitFired:false, clockSet:false, woundSign:null, lastToken:null,
 flags:{}, startedAt:Date.now()
};
function room(){return ROOMS[S.i];}
const POINTS={medium:4,hard:3,mirror:2};
function reset(r){
 S.room=r; S.node=r.start; S.trust=40; S.fear=20; S.tells={}; S.clicked={};
 S.revealed={}; S.examined={}; S.turn=0; S.weakened=[]; S.burned={}; S.disabled={};
 S.pressureMult=1; S.limitFired=false; S.injected=[]; S.callsThisRoom=0;
 S.points = r.id==="mirror" ? POINTS.mirror : (S.hard?POINTS.hard:POINTS.medium);
 S.missed[r.id]=[];
 if(S.hard && r.hardLayer && !(r.hidden||[]).some(h=>h.id===r.hardLayer.id)) r.hidden.push(r.hardLayer);
 if(!S.hard && r.hardLayer) r.hidden=(r.hidden||[]).filter(h=>h.id!==r.hardLayer.id);
 if(S.exitedLast){ S.trust=Math.max(0,S.trust-5); S.exitedLast=false; }
 const fired=S.seeds.filter(x=>x.fires===r.id);
 fired.forEach(f=>{
  const e=f.effect||{};
  if(e.trust) S.trust=Math.max(0,S.trust+e.trust);
  if(e.points) S.points=Math.max(2,S.points+e.points);
  if(e.closeTell) S.burned[e.closeTell]=true;
  if(e.disable) S.disabled[e.disable]=true;
  if(e.knownToOtherSide) S.known[e.knownToOtherSide]=true;
  S.injected.push(f.seed);
 });
 const inj=fired.map(f=>r.inject&&r.inject[f.seed]).filter(Boolean);
 S.node=r.start;
 if(inj.length){
  for(let i=0;i<inj.length;i++){ r.nodes["__inj"+i]=inj[i];
   (inj[i].ch||[]).forEach(c=>{c.next=(i+1<inj.length)?("__inj"+(i+1)):r.start;}); }
  S.node="__inj0";
 }
 enter(S.node);
}
function enter(id){
 S.node=id; const n=room().nodes[id];
 if(!n) return;
 if(n.branch){
  for(const b of n.branch){
   if(b.else) return enter(b.goto);
   if(b.if==="fed" && (S.flags.fed||0)>0) return enter(b.goto);
  }
 }
 if(n.reveals) S.revealed[n.reveals]=true;
 (n.tells||[]).forEach(t=>{
  if(S.burned[t.id]) return;
  const w=Math.max(1,(t.window||3)-(S.hard?1:0));
  S.tells[t.id]={t, until:S.turn+w};
 });
 S.seen[id]=true;
}
function activeTells(){
 return Object.values(S.tells).filter(x=>x.until>=S.turn && !S.clicked[x.t.id]).map(x=>x.t);
}
function clickTell(id){
 const rec=S.tells[id];
 if(!rec||rec.until<S.turn) return {ok:false,msg:"Gone. The window closed."};
 if(S.points<1) return {ok:false,msg:"No attention left this room."};
 S.points--; S.clicked[id]=true;
 if(rec.t.tactic){S.insight++; return {ok:true,reading:rec.t.reading,tactic:rec.t.tactic};}
 return {ok:true,reading:rec.t.reading,tactic:null,fp:rec.t.fp};
}
function examine(id){
 const o=room().objects.find(x=>x.id===id);
 if(!o) return {ok:false};
 if(S.examined[id]) return {ok:true,text:o.text,again:true};
 if(o.cost>S.points) return {ok:false,msg:"No attention left this room."};
 S.points-=o.cost; S.examined[id]=true;
 if(!o.wrong && o.cost>0) S.insight++;
 return {ok:true,text:o.text,wrong:o.wrong};
}
function available(){
 const n=room().nodes[S.node]; if(!n||!n.ch) return [];
 return n.ch.filter(c=>{
  if(c.needsTell && !S.clicked[c.needsTell]) return false;
  if(c.needsObj && !S.examined[c.needsObj]) return false;
  if(c.needsCarry && !S.carry[c.needsCarry]) return false;
  if(S.disabled[c.id]) return false;
  return true;
 });
}
function locked(){
 const n=room().nodes[S.node]; if(!n||!n.ch) return [];
 return n.ch.filter(c=>(c.needsTell&&!S.clicked[c.needsTell])||(c.needsObj&&!S.examined[c.needsObj])||(c.needsCarry&&!S.carry[c.needsCarry]))
  .map(c=>c.needsTell?"a tell you did not read":c.needsObj?"something in the room you did not look at":"something you did not bring from an earlier room");
}
function breakPerfect(why){ S.perfect=false; (S.perfect_broken=S.perfect_broken||[]).push(why); }
function choose(id){
 const c=available().find(x=>x.id===id); if(!c) return null;
 const node=room().nodes[S.node];
 // leaving a node with an unread tactic-bearing tell, or an untaken CALL, breaks perfection
 (node&&node.tells||[]).forEach(t=>{ if(t.tactic && !S.clicked[t.id]){ S.missed_tactic_tells++; breakPerfect('unread tell '+room().id+'/'+t.id); } });
 if(node && c.type!=='call'){
  const call=(node.ch||[]).find(x=>x.type==='call' && available().some(a=>a.id===x.id));
  if(call){ S.missed_calls++; breakPerfect('untaken CALL '+room().id+'/'+call.id); }
 }
 if(c.skull && node && node.wound){
  S.woundSign=node.woundSign||null; S.skulls++;
  S.node=room().lossNode; S.results[room().id]="loss";
  return room().nodes[S.node];
 }
 if(!c.free) S.turn++;
 const d=c.d||{};
 let react=(c.threat||0)*25*S.pressureMult;
 if(c.tactic && S.weakened.indexOf(c.tactic)>=0) react*=0.25;
 if(node && node.npcTactic && S.weakened.indexOf(node.npcTactic)>=0) react*=0.25;
 S.trust=Math.max(0,Math.min(100,S.trust+(d.trust||0)-react*0.2));
 S.fear=Math.max(0,Math.min(100,S.fear+(d.fear||0)+react*0.3));
 if(c.type==="call"){
  const right = c.needsTell ? true : (c.correctIf ? !!(S.examined[c.correctIf]||S.clicked[c.correctIf]||S.revealed[c.correctIf]) : true);
  S.lastCallWrong=!right;
  if(right){ S.calls++; S.calls_correct++; S.callsThisRoom++; S.insight+=2; S.craft++;
   S.points=Math.min(S.points+1, (room().id==="mirror"?POINTS.mirror:(S.hard?POINTS.hard:POINTS.medium)));
   if(c.call) S.weakened.push(c.call); }
  else { S.wrongCalls++; S.calls_wrong++; breakPerfect('wrong CALL '+room().id+'/'+c.id);
         S.trust=Math.max(0,S.trust-10); if(c.burns) S.burned[c.burns]=true; S.pressureMult=1.25; }
 } else if(c.skull){
  S.skulls++; S.skulls_used++; S.edge+=(c.edge||1);
  // a dirty move is undetected only if you already took the room: their tactic called and trust held
  const detected = !(S.trust>=50 && S.weakened.length>0);
  if(detected){ S.skulls_detected++; breakPerfect('detected skull '+room().id+'/'+c.id); }
  if(node && node.wound){ S.protected_violation=true; breakPerfect('protected-vulnerability skull'); }
 } else if(!c.unscored && c.t && c.k && c.verb!=='EXIT'){ S.craft++; }
 if(c.type==="silence") S.silences++;
 if(c.wall) S.walls++;
 if(c.sign){S.signed=true;}
 if(c.chair) S.flags.chair=true;
 if(c.cartel) S.flags.cartel=true;
 if(c.cross) S.flags.cross=true;
 if(c.confess) S.flags.confess=true;
 if(c.feed){ S.flags.fed=(S.flags.fed||0)+c.feed; breakPerfect('fed the Mirror'); }
 if(c.contradiction){ S.warroom_contradiction=true; breakPerfect('War Room contradiction'); }
 if(c.sets) S.carry[c.sets]=true;
 if(c.debt){S.log.push(c.debt.seed); S.seeds.push({seed:c.debt.seed,fires:c.debt.fires,effect:c.debt.effect||{}});}
 if(c.strong){ S.certainty += (c.rebuttal&&c.rebuttal.weak)?-10:15; }
 if(room().turnLimit && S.turn>room().turnLimit && !S.limitFired){
  S.limitFired=true; S.trust=Math.max(0,S.trust-12); S.fear=Math.min(100,S.fear+10);
 }
 S.feedback = S.lastCallWrong ? "She looks at you differently." :
  (c.type==="call" ? "It lands. She does not try that one again." : null);
 if(node && node.npcTactic && S.weakened.indexOf(node.npcTactic)>=0) S.feedback="She tries it again and it does not land.";
 if(S.limitFired && S.turn>room().turnLimit) S.feedback="You have been in this room too long and she can feel it.";
 S.log.push(room().id+":"+c.id);
 enter(c.next);
 return room().nodes[S.node];
}
function endNode(){const n=room().nodes[S.node]; return n && n.end ? n : null;}
function backoutOdds(){
 return Math.round(Math.max(5,Math.min(95,(0.35 + S.fear/200 - S.trust/300)*100)));
}
function finishRoom(){
 const n=endNode(); if(!n) return null;
 S.lastToken=n.token||null;
 if(n.exited){ S.exitedLast=true; (S.exits=S.exits||[]).push(room().id); }
 if((n.carry||[]).indexOf("clock_set")>=0) S.clockSet=true;
 let end=n.end;
 if(S.hard && end==="clean" && room().cleanRequiresCall && S.callsThisRoom===0) end="partial";
 S.results[room().id]=end;
 if(end!=="clean"){ S.clean_failures++; breakPerfect(room().id+' ended '+end); }
 if((n.carry||[]).indexOf("bookkeeper_died")>=0) S.bookkeeper_died=true;
 if((n.carry||[]).indexOf("mirror_held")>=0) S.carry.mirror_held=true;
 (n.carry||[]).forEach(k=>S.carry[k]=true);
 const miss=[];
 if(S.woundSign){ miss.unshift({id:"woundsign",anchor:S.woundSign,reading:S.woundSign}); S.woundSign=null; }
 Object.values(room().nodes).forEach(nd=>(nd.tells||[]).forEach(t=>{if(t.tactic&&!S.clicked[t.id]) miss.push(t);}));
 room().objects.forEach(o=>{if(!S.examined[o.id]&&!o.wrong) miss.push({id:o.id,anchor:o.label,reading:o.text});});
 const hiddenMissed = (room().hidden||[]).filter(h=>!S.revealed[h.id]);
 return {end:end, token:n.token||null, odds:backoutOdds(), arch:n.arch, missed:miss.slice(0,6), hidden:hiddenMissed};
}
function next(){ if(S.signed) return "ending"; S.i++; return S.i>=ROOMS.length?"ending":"room"; }
function ending(){
 const c=S.carry, f=S.flags;
 const mins=Math.round((Date.now()-S.startedAt)/60000);
 const base={insight:S.insight,craft:S.craft,edge:S.edge,skulls:S.skulls,walls:S.walls,mins,
  wrongCalls:S.wrongCalls,token:S.lastToken};
 const fed=(S.flags.fed||0);
 const perfect = S.perfect && S.calls_wrong===0 && S.clean_failures===0 && S.missed_tactic_tells===0 &&
  S.missed_calls===0 && S.skulls_detected===0 && fed===0 && S.warroom_contradiction===false &&
  !!c.mirror_held && S.bookkeeper_died===true && !S.signed;
 const pguard=e=>{ if(perfect && e.id!=="perfect_ledger") throw new Error("PERFECT ASSERTION: a perfect run resolved as "+e.id); return e; };
 const guard=e=>{ if(fed>0&&(e.id==="ledger"||e.id==="doublecross")) throw new Error("THESIS ASSERTION: fed="+fed+" cannot yield "+e.id); return e; };
 if(perfect) return Object.assign(base,{id:"perfect_ledger",rank:1,title:"The Perfect Ledger",perfect:true,mystery:true,
  text:"Voss is found in Marseille. Alive. He does not speak. The 240 million is never recovered, because it was never missing.\n\nEvery transfer is legal and every signature is yours. Lukas Vermeulen is buried on the fourth of December and you do not attend. The brothers are not charged. Ines Marchetti's name is not spoken at any hearing.\n\nYou are fifty-three. You have a house in Knokke. You are alone."});
 if(S.signed) return pguard(guard(Object.assign(base,{id:"signature",rank:10,title:"The Signature",
  text:"You signed on the third day. The estate indemnified you and clause nine covered service matters before 2002. Nobody asked you anything again, which is what you bought. You never learned where Voss went, who the bookkeeper wrote to in October, or which of the four of you came down the slope alone. The file closes with your name on page nine, in your own hand, and it is the only honest thing in the document."})));
 if(f.cross && f.chair && fed===0 && S.insight>=14 && S.craft>=8) return pguard(guard(Object.assign(base,{id:"doublecross",rank:1,title:"The Double Cross",
  text:"You played three men in one house and kept one lie straight across four rooms, and you took the seat at the end of it. Then Voss set a folder on the table: every move you made, by date, in his handwriting, written before you made it. He is not angry. He does not stop you. He says the seat was always going to be yours because he picked you in the kitchen, and that the only person in eleven days you never read was him. You out-thought all of them. He counted on exactly that."})));
 if(f.cartel || c.cartel_man) return pguard(guard(Object.assign(base,{id:"cartel",rank:3,title:"The Cartel's Man",
  text:"The seat is real and the third fund is real and the money clears on the first of every month. You are useful, and useful people are kept. The phone rings when they want it to, and you answer it, because the day you do not answer it you stop being useful. A port at night, and a number you do not recognise, and you pick up."})));
 if(f.chair || c.took_chair) return pguard(guard(Object.assign(base,{id:"chair",rank:2,title:"The Chair",
  text:"",silent:true})));
 if(f.confess && c.mirror_held && S.insight>=10) return pguard(guard(Object.assign(base,{id:"ghost",rank:5,title:"The Bookkeeper's Ghost",
  text:"You worked out that a careless question at a bank desk became a note, and the note named a man who had already written to the board in October, and you said that out loud in a room with three witnesses in it. Nobody told you it was not your fault. His daughter is nineteen and reads law in Leuven, and in March she writes to you, and the letter is four lines long and you keep it."})));
 if(c.tainted_tape) return pguard(guard(Object.assign(base,{id:"dying",rank:6,title:"The Dying Brother's Confession",
  text:"You have it on tape and you got it with a threat, in a room where two other men watched you do it. Emil dies in nine weeks and the tape goes to a prosecutor who listens to eleven minutes of it and then asks how it was obtained. De Vries walks. Marek sends flowers to the funeral, and they are the largest arrangement there."})));
 if(S.silences>=10 && S.skulls===0 && S.insight>=8) return pguard(guard(Object.assign(base,{id:"silence",rank:7,title:"The Silence",
  text:"You went grey rock in every room and held it, which almost nobody manages. Nobody got anything out of you and you got nothing out of them. Friday happens. A name goes on a filing and it is not yours. You learn, two years later and from a newspaper, most of what you could have learned in a week."})));
 if(c.truth_said && c.mirror_held && S.skulls===0 && S.insight>=12 && S.calls>=3) return pguard(guard(Object.assign(base,{id:"ledger",rank:4,title:"The Open Ledger",
  text:"Nothing you used was a lie and every person you spoke to kept the refusals they asked for. Two funds stop clearing, a board member says in a hearing what she said in that glass room, and De Vries says a sentence about a slope in 2001 in his own mouth without anybody holding a match to him. You get nothing out of it. You walk out of the building into a wet Thursday with no money, no seat and no case against you, and the clocks all over the city are on time."})));
 if(S.walls>=4 && S.skulls<=1 && S.insight>=8) return pguard(guard(Object.assign(base,{id:"wall",rank:8,title:"The Wall",
  text:"You refused all of it, calmly, the same way, every time. No deal, no seat, no name, no signature. You lose the money and the answers and you keep the only thing you walked in with. On Monday nobody calls, and on Tuesday nobody calls, and by the end of the month you understand that this is what surviving looks like from the inside."})));
 if(true) return pguard(guard(Object.assign(base,{id:"scapegoat",rank:9,title:"The Scapegoat",
  text:"Three names go to the regulator on Friday and yours is first, alphabetically, which is the filing order the chairman described to you and which you did not hear as a threat. You spend two years explaining a fund you never read, and you never find out what was true. Somewhere in the eleven days it was all in front of you: a clock, a second cup, an empty chair with a used glass, and a one-beat pause before the word estate."})));
}
function playerLines(){
 const out=[];
 (S.log||[]).forEach(entry=>{ const m=/^([a-z]+):(.+)$/.exec(entry); if(!m) return;
  const r=ROOMS.find(x=>x.id===m[1]); if(!r||r.id==="mirror") return;
  Object.values(r.nodes).forEach(n=>(n.ch||[]).forEach(c=>{ if(c.id===m[2]){ const t=c.text.replace(/\[[^\]]*\]/g,"").trim(); if(t.length>3) out.push(t); } }));
 });
 return out;
}
function newRun(hard){
 Object.assign(S,{i:0,insight:0,craft:0,edge:0,skulls:0,walls:0,silences:0,calls:0,wrongCalls:0,carry:{},results:{},flags:{},
  signed:false,seeds:[],log:[],hard:!!hard,startedAt:Date.now(),perfect:true,calls_correct:0,calls_wrong:0,skulls_used:0,
  skulls_detected:0,clean_failures:0,warroom_contradiction:false,protected_violation:false,bookkeeper_died:false,
  missed_tactic_tells:0,missed_calls:0,perfect_broken:[],ending_skipped:false,clockSet:false,exitedLast:false,exits:[],
  hiddenEnding:false,known:{},lastGesture:null});
}
const INTER={cur:null,node:null};
function interStart(def){ INTER.cur=def; INTER.node=def.start; return def.nodes[def.start]; }
function interNode(){ return INTER.cur&&INTER.cur.nodes[INTER.node]; }
function interChoose(id){
 const n=interNode(); if(!n) return null;
 const c=(n.ch||[]).find(x=>x.id===id); if(!c) return null;
 if(c.sets) S.carry[c.sets]=true;
 if(c.hidden_end) S.hiddenEnding=true;
 INTER.node=c.next; return interNode();
}
return {S, newRun, playerLines, ROOMS, VERBS, verbOf, INTER, interStart, interNode, interChoose, POINTS, backoutOdds, breakPerfect, room, reset, enter, activeTells, clickTell, examine, available, locked, choose, endNode, finishRoom, next, ending};
})();
