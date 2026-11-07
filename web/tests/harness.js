global.window={};
require('../content1.js');require('../content2.js');require('../content3.js');require('../content4.js');require('../engine.js');
const G=global.window.GAME;
let pass=0,fail=0,names=[];
function fresh(hard){
 const S=G.S;
 S.i=0;S.insight=0;S.craft=0;S.edge=0;S.skulls=0;S.walls=0;S.silences=0;S.calls=0;S.wrongCalls=0;
 S.carry={};S.results={};S.flags={};S.signed=false;S.seeds=[];S.log=[];S.clockSet=false;
 S.hard=!!hard;S.startedAt=Date.now()-2.4e6;
 S.perfect=true;S.calls_correct=0;S.calls_wrong=0;S.skulls_used=0;S.skulls_detected=0;S.clean_failures=0;
 S.warroom_contradiction=false;S.protected_violation=false;S.bookkeeper_died=false;S.missed_tactic_tells=0;
 S.missed_calls=0;S.perfect_broken=[];
 return S;
}
function t(name,fn){ try{fn(); pass++; console.log('  PASS  '+name);}catch(e){fail++;names.push(name);console.log('  FAIL  '+name+' :: '+e.message);} }
function eq(a,b,m){ if(a!==b) throw new Error((m||'')+' expected '+JSON.stringify(b)+' got '+JSON.stringify(a)); }
function ok(v,m){ if(!v) throw new Error(m||'expected truthy'); }
function room(id){ return G.ROOMS.find(r=>r.id===id); }
function goRoom(id){ const idx=G.ROOMS.findIndex(r=>r.id===id); G.S.i=idx; G.reset(G.ROOMS[idx]); }
function play(){ for(const id of arguments) G.choose(id); }
function done(){ console.log('\n'+pass+' passed, '+fail+' failed'+(fail?': '+names.join(', '):'')); process.exit(fail?1:0); }
module.exports={G,fresh,t,eq,ok,room,goRoom,play,done};
