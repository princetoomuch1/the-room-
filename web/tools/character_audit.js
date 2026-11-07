global.window={};
require('../content1.js');require('../content2.js');require('../content3.js');require('../content4.js');require('../engine.js');
const R=global.window.GAME.ROOMS;
function allText(roomId,npc){
 const r=R.find(x=>x.id===roomId); let s='';
 Object.values(r.nodes).forEach(n=>{ s+=' '+(n.line||''); (n.ch||[]).forEach(c=>s+=' '+c.text); (n.tells||[]).forEach(t=>s+=' '+t.anchor+' '+t.reading+' '+(t.fp||'')); });
 r.objects.forEach(o=>s+=' '+o.label+' '+o.text);
 (r.hidden||[]).forEach(h=>s+=' '+h.text);
 return s;
}
const SPECS={
 anna:{room:'kitchen',fields:{
  'name/age/origin':/Deurne|forty-seven/i,'work':/translate|port contracts/i,'loves (radio)':/radio|shipping forecast/i,
  'contradiction':/nineteen years/i,'wound':/Annie/,'thing under the thing':/he was real|do not have the man/i,
  'signature line 1':/Do not read me a document/i,'signature line 2':/I have the minute/i,
  'notices Hale':/scar|your hand/i,'will never say':/Did you love him/}},
 joost:{room:'desk',fields:{
  'want (pension)':/nineteen months/i,'contradiction (he opened it)':/I opened it/i,'wound (2011)':/2011|Jan De Voslei/i,
  'human moment (ruler)':/ruler/i,'notices Hale':/your name first|name/i,'will never say':/director|note about me/i}},
 mieke:{room:'table',fields:{
  'want (closure)':/closed|closure/i,'contradiction (kind silencer)':/kindness|kind version/i,'wound/limit':/tell them you read it|I did not do that/i,
  'human moment (water)':/water she does not drink|pours a glass/i,'notices Hale':/read it again/i,'will never say (liar)':/liar/i}},
 radu:{room:'deposit',fields:{
  'want (not to hold it)':/envelope/i,'contradiction (remembers)':/ten to nine|twenty-eighth/i,'wound (children)':/children/i,
  'human moment (key on nail)':/key is still on its nail|nail by the door/i,'notices Hale':/people like me/i,'will never say':/recorded|record/i}}
};
let out=[],ok=true;
Object.entries(SPECS).forEach(([who,spec])=>{
 const txt=allText(spec.room);
 const hits=Object.entries(spec.fields).map(([f,re])=>[f,re.test(txt)]);
 const n=hits.filter(h=>h[1]).length, tot=Object.keys(spec.fields).length;
 const target = who==='anna' ? 8 : 6, scale = who==='anna' ? 10 : 10;
 const scaled = Math.round(n/tot*scale);
 out.push(who+': '+scaled+'/10 reachable ('+n+'/'+tot+' specified fields) target '+target+'/10 '+(scaled>=target?'PASS':'FAIL'));
 hits.filter(h=>!h[1]).forEach(h=>out.push('    missing: '+h[0]));
 if(scaled<target) ok=false;
});
console.log(out.join('\n'));
process.exit(ok?0:1);
