global.window={};
require('../content1.js');require('../content2.js');require('../content3.js');require('../content4.js');require('../engine.js');
const R=global.window.GAME.ROOMS;
let bad=[],total=0,words=[];
R.forEach(r=>Object.entries(r.nodes).forEach(([id,n])=>{
 if(!n.line) return; total++;
 const w=n.line.replace(/\[[^\]]*\]/g,'').replace(/[“”]/g,'').trim().split(/\s+/).filter(Boolean).length;
 words.push(w);
 if(w>20 && !n.lecture) bad.push(r.id+'/'+id+' = '+w+'w');
}));
words.sort((a,b)=>a-b);
console.log('NPC lines: '+total+' | median '+words[Math.floor(total/2)]+'w | longest '+words[words.length-1]+'w');
console.log('unmarked lines over 20 words: '+bad.length);
bad.forEach(b=>console.log('  '+b));
process.exit(bad.length?1:0);
