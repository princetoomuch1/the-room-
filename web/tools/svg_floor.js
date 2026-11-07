global.window={};require('../art.js');
const ROOMS=['kitchen','desk','table','deposit','meeting','fund','warroom','mirror'];
const FLOOR={bytes:4000,paths:28};
// the Mirror's brief specifies no brushwork and no texture, so it carries its own floor
const MIRROR_FLOOR={bytes:1500,paths:15};
let fail=[];
const rows=ROOMS.map(id=>{
 const s=window.ART.bg(id);
 const paths=(s.match(/<path|<ellipse|<circle|<line|<rect|<text/g)||[]).length;
 const brush=/feDisplacementMap/.test(s), glow=/radialGradient id="g"/.test(s), vig=/url\(#v\)/.test(s);
 // the Mirror is specified as the one room with no brushwork
 const needBrush = id!=='mirror';
 const f = needBrush?FLOOR:MIRROR_FLOOR;
 const ok = s.length>=f.bytes && paths>=f.paths && glow && vig && (needBrush?brush:!brush);
 if(!ok) fail.push(id);
 return [id,(s.length/1024).toFixed(1)+'KB',paths+' marks',brush?'brush':'flat',glow?'light':'NO LIGHT',vig?'vignette':'NO VIGNETTE',ok?'PASS':'FAIL'];
});
rows.forEach(r=>console.log(r[0].padEnd(9)+r[1].padStart(7)+'  '+r[2].padStart(9)+'  '+r[3].padEnd(6)+r[4].padEnd(7)+r[5].padEnd(10)+r[6]));
console.log('floor: >='+FLOOR.bytes+' bytes, >='+FLOOR.paths+' marks, named light, vignette, brushwork.');
console.log('Mirror floor: >='+MIRROR_FLOOR.bytes+' bytes, >='+MIRROR_FLOOR.paths+' marks, flat by brief (no brushwork, no texture).');
process.exit(fail.length?1:0);
