// THE ROOM — Chapter I. Before, the prologue, and the corridors. WP-19.1, 19.2.
window.BEFORE = [
 {date:"February 2001", text:"A winter posting below the Prokletije. Five men and one translator, Ines Marchetti, thirty-two, from Trieste. You loved her. You never told her."},
 {date:"11 February 2001", text:"A descent in the dark that did not need to happen. You stayed at the post on the radio. In the morning they told you she slipped on the ice."},
 {date:"2001 to 2026", text:"The other four never spoke of it, and never sat in one room together again. You did not ask why. Daniel Voss stayed your friend. He built a shipping business in Antwerp."},
 {date:"28 October 2026, 21:20", text:"Voss walked out of a locked office and did not come back. The news says 240 million euros went through three shipping funds. His bookkeeper, Lukas Vermeulen, has not been seen since."},
 {date:"8 November 2026, 22:41", text:"Eleven days later, your phone rings. You are already in the car."}
];
window.PROLOGUE = {
 id:"drive", title:"The Drive", place:"The ring road, Antwerp. 22:41.", art:"drive",
 start:"p1",
 nodes:{
  p1:{sp:"meera", name:"Meera Rao", em:"even", line:"Hale. Anna's house. Now. Before the police come back.",
   ch:[
    {id:"p1a",text:"Why now, Meera?",verb:"PROBE",next:"p1b"},
    {id:"p1b2",text:"[say nothing and drive]",verb:"SILENCE",next:"p2"},
    {id:"p1c",text:"[turn the car around]",verb:"EXIT",hidden_end:true,next:"p_turned"}]},
  p1b:{sp:"meera", name:"Meera Rao", em:"even", line:"Because tomorrow she will have a lawyer. Tonight she has a kitchen.",
   ch:[{id:"p1b1",text:"[drive]",verb:"SILENCE",next:"p2"},
       {id:"p1b3",text:"[turn the car around]",verb:"EXIT",hidden_end:true,next:"p_turned"}]},
  p2:{sp:null, memory:true, em:"still", line:"She said the rain here sounded like the rain at home.", fx:["italic","slow-reveal"],
   ch:[{id:"p2a",text:"[the phone lights up again]",verb:"SILENCE",next:"p3"}]},
  p3:{sp:"meera", name:"Meera Rao", em:"even", line:"There is a photograph on her fridge. Do not ask her about the photograph.",
   ch:[
    {id:"p3a",text:"What is in it?",verb:"PROBE",sets:"warned_about_photo",next:"p3b"},
    {id:"p3b2",text:"[say nothing]",verb:"SILENCE",next:"p4"},
    {id:"p3c",text:"I already know what is in it.",verb:"EVIDENCE",sets:"suspicious_of_meera",next:"p3c2"}]},
  p3b:{sp:"meera", name:"Meera Rao", em:"even", line:"Four men on a slope. One of them is you. [The line goes dead.]",
   ch:[{id:"p3b1",text:"[drive]",verb:"SILENCE",next:"p4"}]},
  p3c2:{sp:"meera", name:"Meera Rao", em:"even", line:"Then you know more than I was told you did. [A pause.] Drive carefully, Hale.",
   ch:[{id:"p3c3",text:"[drive]",verb:"SILENCE",next:"p4"}]},
  p4:{sp:null, em:"still", line:"[The car stops. The rain stops. Your hands stay on the wheel. Her kitchen light is on.]",
   ch:[{id:"p4a",text:"[get out of the car]",verb:"EXIT",next:"p_done"}]},
  p_turned:{end:"hidden", arch:"You turned the car around."},
  p_done:{end:"done"}
 }
};
window.CORRIDORS = {
 kitchen:{ id:"c1", title:"The Stairwell", place:"Anna's building. 23:52.", art:"stair",
  start:"c1a", nodes:{
   c1a:{sp:null, line:"[A notice board by the letterboxes. A missing-person poster: Daniel Voss. One corner already curling. A neighbour comes down with a shawl over her shoulders.]",
    ch:[{id:"c1a1",text:"Did you know him?",verb:"PROBE",sets:"neighbour_spoke",next:"c1b"},
        {id:"c1a2",text:"[say nothing and let her pass]",verb:"SILENCE",next:"c1_end"}]},
   c1b:{sp:"neighbour", name:"Mrs Claes", em:"tired", line:"He carried her shopping up in the rain. Last month he stopped. He looked at the clocks instead.",
    ch:[{id:"c1b1",text:"[go down the stairs]",verb:"EXIT",next:"c1_end"}]},
   c1_end:{end:"done"}}},
 desk:{ id:"c2", title:"The Lobby", place:"The bank, Meir. 17:40.", art:"lobby",
  start:"c2a", nodes:{
   c2a:{sp:null, line:"[A guard watching you leave. Above the counter, a muted business channel.]",
    ch:[{id:"c2a1",text:"[look at the television]",verb:"PROBE",sets:"saw_ticker",next:"c2b"},
        {id:"c2a2",text:"[look at the guard]",verb:"PROBE",next:"c2c"}]},
   c2b:{sp:null, fx:["color-shift"], line:"[The ticker turns over. VERMEULEN, VOSS BOOKKEEPER, FOUND IN MERKSEM DOCK. The guard is still watching you.]",
    ch:[{id:"c2b1",text:"[walk out]",verb:"EXIT",next:"c2_end"}]},
   c2c:{sp:null, line:"[He looks away first. Behind him the ticker turns over and you do not read it.]",
    ch:[{id:"c2c1",text:"[walk out]",verb:"EXIT",next:"c2_end"}]},
   c2_end:{end:"done"}}},
 table:{ id:"c3", title:"The Street", place:"Off the Kipdorp. 16:15.", art:"street",
  start:"c3a", nodes:{
   c3a:{sp:null, line:"[A grey saloon with two men in it, engine off. They do not move when you pass.]",
    ch:[{id:"c3a1",text:"[memorise the plate]",verb:"PROBE",sets:"car_plate",next:"c3b"},
        {id:"c3a2",text:"[walk on]",verb:"EXIT",next:"c3_end"}]},
   c3b:{sp:null, line:"[1-KQZ-417. A rosary on the mirror. One of them is turning a lighter over and not smoking.]",
    ch:[{id:"c3b1",text:"[walk on]",verb:"EXIT",next:"c3_end"}]},
   c3_end:{end:"done"}}},
 deposit:{ id:"c4", title:"The Stairs Down", place:"Borgerhout, fourth floor. 01:10.", art:"stair2",
  start:"c4a", nodes:{
   c4a:{sp:null, line:"[Your phone rings. Unknown number.]",
    ch:[{id:"c4a1",text:"[answer]",verb:"PROBE",sets:"unknown_call",next:"c4b"},
        {id:"c4a2",text:"[decline]",verb:"BOUNDARY",next:"c4c"},
        {id:"c4a3",text:"[let it ring]",verb:"SILENCE",next:"c4_end"}]},
   c4b:{sp:null, line:"[Nothing on the line. Then, very far away, a clock ticking. It stops. They hang up.]",
    ch:[{id:"c4b1",text:"[keep walking]",verb:"EXIT",next:"c4_end"}]},
   c4c:{sp:null, line:"[It rings again at once. Number withheld. You put it face down.]",
    ch:[{id:"c4c1",text:"[keep walking]",verb:"EXIT",next:"c4_end"}]},
   c4_end:{end:"done"}}},
 meeting:{ id:"c5", title:"The Lift", place:"The board building. 12:06.", art:"lift",
  start:"c5a", nodes:{
   c5a:{sp:null, line:"[The lift stops at three. Sluys gets in. He does not look at you.]",
    ch:[{id:"c5a1",text:"Chairman.",verb:"PROBE",sets:"sluys_rode_lift",next:"c5b"},
        {id:"c5a2",text:"[wait]",verb:"SILENCE",sets:"sluys_rode_lift",next:"c5c"}]},
   c5b:{sp:"board", name:"Hendrik Sluys", em:"cold", line:"[To the doors.] Rowing in the morning. The water was very flat. [He gets out at two.]",
    ch:[{id:"c5b1",text:"[ride down]",verb:"EXIT",next:"c5_end"}]},
   c5c:{sp:null, line:"[He gets out at two. He has left a thumbprint on the button for the ground floor.]",
    ch:[{id:"c5c1",text:"[ride down]",verb:"EXIT",next:"c5_end"}]},
   c5_end:{end:"done"}}},
 fund:{ id:"c6", title:"The Doorman", place:"The Vlaeykensgang. 23:30.", art:"door",
  start:"c6a", nodes:{
   c6a:{sp:"doorman", name:"The doorman", em:"flat", line:"For you, sir. It came this morning. No name on it.",
    ch:[{id:"c6a1",text:"[open it]",verb:"PROBE",sets:"envelope_photo",next:"c6b"},
        {id:"c6a2",text:"[put it in your coat unopened]",verb:"SILENCE",sets:"envelope_unopened",next:"c6_end"}]},
   c6b:{sp:null, line:"[The same photograph as Anna's fridge, printed wider. At the edge of the frame, a woman's shoulder and a dark sleeve. No note.]",
    ch:[{id:"c6b1",text:"[go out into the rain]",verb:"EXIT",next:"c6_end"}]},
   c6_end:{end:"done"}}},
 warroom:{ id:"c7", title:"The Hallway", place:"Kalmthout. After.", art:"hall",
  start:"c7a", nodes:{
   c7a:{sp:null, fx:["italic","slow-reveal"], line:"The pendant lamp is off behind you. Ahead is a door you did not see when you came in.",
    ch:[{id:"c7a1",text:"[open it]",verb:"EXIT",next:"c7_end"}]},
   c7_end:{end:"done"}}}
};
