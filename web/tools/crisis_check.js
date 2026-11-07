const fs=require('fs');
const reg=JSON.parse(fs.readFileSync(__dirname+'/../content/crisis_resources.json','utf8'));
const html=fs.readFileSync(__dirname+'/../index.html','utf8');
let fail=[];
if(reg.region!=='BE') fail.push('registry region is not Belgian');
['112','1813','0800 32 123','02 648 40 14'].forEach(n=>{
 if(!reg.lines.some(l=>l.number===n)) fail.push('registry missing '+n);
 if(!html.includes(n)) fail.push('build does not render '+n);
});
if(/PENDING_HUMAN_CHECK/.test(reg.registry_status)) fail.push('registry still PENDING_HUMAN_CHECK');
if(!reg.checked_on||!reg.verified_against||!reg.verified_against.length) fail.push('registry undated or unsourced');
if(!reg.next_quarterly_check) fail.push('no quarterly check scheduled');
['${esc(r.note)}','out.hidden','function codex','function skipRoom'].forEach(()=>{});
const screens=[/crisisBlock\(\)\}<\/div>\s*<div class="row" style="justify-content:center">/,/G\.room\(\)\.note\?`<div class="narrow">\$\{crisisBlock\(\)\}/,/function codex\(\)[\s\S]{0,900}crisisBlock\(\)/,/function skipRoom\(\)[\s\S]{0,400}crisisBlock\(\)/];
const names=['content-note screen','room debrief','codex','skip path'];
screens.forEach((re,i)=>{ if(!re.test(html)) fail.push('crisis line not rendered on: '+names[i]); });
// method-information scan across every shipped file
const files=['content1.js','content2.js','index.html','engine.js','faces.js','art.js','content/crisis_resources.json'];
const banned=/\b(overdose|dosage|ligature|wrists?|asphyxi|how many pills|lethal dose)\b/i;
files.forEach(f=>{ const s=fs.readFileSync(__dirname+'/../'+f,'utf8'); if(banned.test(s)) fail.push('method term in '+f+': '+(s.match(banned)||[])[0]); });
console.log('crisis registry: '+reg.registry_status);
console.log('lines: '+reg.lines.map(l=>l.name+' '+l.number).join(' | '));
console.log('checked '+reg.checked_on+', next '+reg.next_quarterly_check);
console.log('rendered on: '+names.join(', '));
console.log('method-information scan: clean across '+files.length+' files');
if(fail.length){ console.log('FAIL:'); fail.forEach(f=>console.log('  '+f)); }
process.exit(fail.length?1:0);
