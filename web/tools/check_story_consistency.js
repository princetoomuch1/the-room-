// Every line in the game must agree with content/story/bible.md on the named facts.
global.window={};
require('../content1.js');require('../content2.js');require('../content3.js');require('../content4.js');require('../engine.js');
require('../art.js');require('../cinematics.js');
const R=global.window.GAME.ROOMS;
const all=[];
R.forEach(r=>Object.entries(r.nodes).forEach(([id,n])=>{ if(n.line) all.push([r.id+'/'+id,n.line]); if(n.arch) all.push([r.id+'/'+id,n.arch]); (n.ch||[]).forEach(c=>all.push([r.id+'/'+c.id,c.text])); }));
[global.window.PROLOGUE].concat(Object.values(global.window.CORRIDORS)).forEach(g=>Object.entries(g.nodes).forEach(([id,n])=>{ if(n.line) all.push([g.id+'/'+id,n.line]); }));
global.window.BEFORE.forEach((b,i)=>all.push(['before/'+i,b.text]));
Object.entries(global.window.CINE.ENDINGS).forEach(([id,e])=>all.push(['ending/'+id,e.text]));
const RULES=[
 ['Ines has one surname',/Ines (?!Marchetti)[A-Z][a-z]+/],
 ['Lukas has one surname',/Lukas (?!Vermeulen)[A-Z][a-z]+/],
 ['the bookkeeper is not dead before the Desk',null],
 ['Voss left at 21:20 on 28 October',/(2[0-9]|1[0-9]|3[01]) October.*Voss.*(left|walked)(?![\s\S]*28)/],
 ['nobody calls the slope a murder by Voss',/Voss (killed|murdered) (her|Ines)/i],
 ['the Greek ordered Lukas killed, not the brothers',/(Marek|De Vries|Emil) (killed|ordered) (Lukas|the bookkeeper)/i],
 ['Hale was not on the slope',/(you|Hale) (were|was) on the (ice|slope)/i],
 ['Ines was thirty-two',/Ines[^.]{0,40}\b(twenty|thirty-(?!two)|forty)/i]
];
const fails=[];
RULES.forEach(([name,re])=>{ if(!re) return; all.forEach(([where,txt])=>{ if(re.test(txt)) fails.push(name+' — '+where+': '+txt.slice(0,90)); }); });
// timeline rule: before the Desk, nothing may say Lukas or the bookkeeper is dead
const preDesk=all.filter(([w])=>/^(before|drive|kitchen|c1)\//.test(w));
preDesk.forEach(([w,t])=>{ if(/(bookkeeper|Lukas|Vermeulen)[^.]*(dead|died|body|buried)/i.test(t)) fails.push('bookkeeper dead before the Desk — '+w); });
console.log('lines checked: '+all.length+' | rules: '+RULES.length);
if(fails.length){ console.log('CONTRADICTIONS:'); fails.forEach(f=>console.log('  '+f)); process.exit(1); }
console.log('no contradiction with the story bible');
