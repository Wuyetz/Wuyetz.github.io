window.onload = function () {


// hides buttons that are used in later stages
$("#knock").toggle();
$("#quarterF").toggle();
$("#semiF").toggle();
$("#finale").toggle();
$("#refresh").toggle();
$("#myTable").hide();


// object constructor for our teams, "member" and "inter" are used later to compare two teams with equal other stats
function Team (name,power,points,scored,conceded,member,inter){
    this.name = name;
    this.power = power;
    this.points = points;
    this.scored = scored;
    this.conceded = conceded;
    this.member = member;
    this.inter = inter;
}

// teams with power based on fifa rankings with a little dose of my subjectivity, sorted into appropriate groups
var russia = new Team("Russia",90,0,0,0,0,"");
var saudiArabia = new Team("Saudi Arabia",80,0,0,0,1,"");
var egypt = new Team("Egypt",86,0,0,0,2,"");
var uruguay = new Team("Uruguay",88,0,0,0,3,"");
var groupA = [russia,saudiArabia,egypt,uruguay];

var portugal = new Team("Portugal",96,0,0,0,0,"");
var spain = new Team("Spain",95,0,0,0,1,"");
var morocco = new Team("Morocco",85,0,0,0,2,"");
var iran = new Team("Iran",86,0,0,0,3,"");
var groupB = [portugal,spain,morocco,iran];

var france = new Team("France",95,0,0,0,0,"");
var australia = new Team("Australia",85,0,0,0,1,"");
var peru = new Team("Peru",89,0,0,0,2,"");
var denmark = new Team("Denmark",89,0,0,0,3,"");
var groupC = [france,australia,peru,denmark];

var argentina = new Team("Argentina",96,0,0,0,0,"");
var iceland = new Team("Iceland",89,0,0,0,1,"");
var croatia = new Team("Croatia",91,0,0,0,2,"");
var nigeria = new Team("Nigeria",83,0,0,0,3,"");
var groupD = [argentina,iceland,croatia,nigeria];

var brazil = new Team("Brazil",98,0,0,0,0,"");
var switzerland = new Team("Switzerland",92,0,0,0,1,"");
var costaRica = new Team("Costa Rica",86,0,0,0,2,"");
var serbia = new Team("Serbia",86,0,0,0,3,"");
var groupE = [brazil,switzerland,costaRica,serbia];

var germany = new Team("Germany",99,0,0,0,0,"");
var mexico = new Team("Mexico",90,0,0,0,1,"");
var sweden = new Team("Sweden",89,0,0,0,2,"");
var southKorea = new Team("South Korea",81,0,0,0,3,"");
var groupF = [germany,mexico,sweden,southKorea];

var belgium = new Team("Belgium",95,0,0,0,0,"");
var panama = new Team("Panama",83,0,0,0,1,"");
var tunisia = new Team("Tunisia",88,0,0,0,2,"");
var england = new Team("England",94,0,0,0,3,"");
var groupG = [belgium,panama,tunisia,england];

var poland = new Team("Poland",93,0,0,0,0,"");
var senegal = new Team("Senegal",87,0,0,0,1,"");
var colombia = new Team("Colombia",92,0,0,0,2,"");
var japan = new Team("Japan",82,0,0,0,3,"");
var groupH = [poland,senegal,colombia,japan];

// arrays used in later stages
var groups = [groupA,groupB,groupC,groupD,groupE,groupF,groupG,groupH];
var progressed = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
var eliminated = [];
var quarter = [];
var semi = [];
var final = [];
var third = [];

// used in match result functions
var coeficients = [0.83,0.72,0.67,0.59,0.56,0.54,0.52,0.51];

// "flavor" text for colorful match results
var extraTime = ["1 - 0","1 - 0","1 - 0","2 - 0","2 - 0","3 - 0","2 - 1","2 - 1","3 - 1","3 - 2"];

var highlights = [];

var winEasy = [" utterly humiliates "," dominates "," destroys "," shines against ",
                   " easily wins against "," outclasses "," humiliates "," dazzles against "," crushes ", "shines vs. ",
                   " easily wins vs. "," dazzles vs. "," breathtakingly defeats "," astonishes against "];

var winNormal = [" defeats "," wins against "," secures a win against "," wins vs. "," secures a victory vs. "];

var winHard = [" barely defeats "," hardly wins against "," wins hard-fought victory vs. "," barely overcomes ",
                   " unnervingly wins vs. "];

var winSurprise = [" surprises "," unexpectedly wins against "," surprises against "," surprisingly wins vs. ",
                      "surprises vs. "];
                      
var winHighscore = [" wins an entertaining win vs. "," outscores "," outplays "];

var drawBoring = [" draw "," boringly draw "," put us to sleep with "," forgettably draw "];

var drawNormal = [" draw "];

var drawHighscore = [" draw "," entertain with "];


// group matches results function
function result (x,y,match,group,gx=0,gy=0) {
    /* gives us random number of scored goals for both teams, taking teams powers relative to each other into account, first goal the easiest and consecutive ones harder and harder to score because of "coeficients" array being used
    */
    for(i=0;i<coeficients.length;i++){
    gx+=(Math.round(Math.random()*coeficients[i]*x.power/y.power));
    gy+=(Math.round(Math.random()*coeficients[i]*y.power/x.power));
    }
    
    // adds high scoring games to "highlights" array
    var res;
    if (((gx+gy)>4)&&(gx!==gy)&&(gx!==0)&&(gy!==0)){
        res = x.name+" vs. "+y.name+" "+gx+"-"+gy+" during group phase";
        highlights.push(res);
    if((gx===gy)&&(gx+gy)>5){res = x.name+" vs. "+y.name+" "+gx+"-"+gy+" during group phase";
           highlights.push(res);
       }
    }
    
    // picks "flavor" text depending on the result
    var outcome;
    if (gx===gy){
        if ((gx+gy)===0){outcome=drawBoring[Math.floor(Math.random()*drawBoring.length)]}
        else if ((gx+gy)===2){outcome=drawNormal[Math.floor(Math.random()*drawNormal.length)]}
        else {outcome=drawHighscore[Math.floor(Math.random()*drawHighscore.length)]}
    }else{
        if ((((x.power-y.power)>10)&&(gy>gx))||((gx>gy)&&((y.power-x.power)>10)))
            {outcome=winSurprise[Math.floor(Math.random()*winSurprise.length)]}
        else{
            if (((gx-gy)>3)||(3<(gy-gx))){outcome=winEasy[Math.floor(Math.random()*winEasy.length)]}
            else {
                if(((gx+gy)>3)&&(((gx-gy)<3)||((gy-gx)<3)))
                {outcome=winHighscore[Math.floor(Math.random()*winHighscore.length)]}
                else {
                    if (((gx-gy)===1)||(1===(gy-gx))){outcome=winHard[Math.floor(Math.random()*winHard.length)]}
                    else{outcome=winNormal[Math.floor(Math.random()*winNormal.length)]}
                }
            }
        }
    }
    
    /* adds points etc. depending on the result, adds "scalps" of defeated teams to winning teams, later to be used in comparison in case of equal other stats in group, outputs result
    */
    if(gx>gy){
        x.points+=3;
        x.scored+=gx;
        y.scored+=gy;
        x.conceded+=gy;
        y.conceded+=gx;
        if(match === 0){group[0].inter+="b"}
        if(match === 1){group[2].inter+="d"}
        if(match === 2){group[0].inter+="c"}
        if(match === 3){group[1].inter+="d"}
        if(match === 4){group[0].inter+="d"}
        if(match === 5){group[1].inter+="c"}
        output = x.name+outcome+y.name+" "+gx+" - "+gy+"!";
        return output;
    }else if(gx<gy){
        y.points+=3;
        x.scored+=gx;
        y.scored+=gy;
        x.conceded+=gy;
        y.conceded+=gx;
        if(match === 0){group[1].inter+="a"}
        if(match === 1){group[3].inter+="c"}
        if(match === 2){group[2].inter+="a"}
        if(match === 3){group[3].inter+="b"}
        if(match === 4){group[3].inter+="a"}
        if(match === 5){group[2].inter+="b"}
        output = y.name+outcome+x.name+" "+gy+" - "+gx+"!";
        return output;
    }else{
        x.points+=1;
        y.points+=1;
        x.scored+=gx;
        y.scored+=gy;
        x.conceded+=gy;
        y.conceded+=gx;
        output = x.name+" and "+y.name+outcome+gx+" - "+gy+".";
        return output;
    }
}


// compares two teams based on their points
function compare(p1,p2) {
  if (p1.points < p2.points)
     return 3;
  if (p1.points > p2.points)
    return -3;
  return 0;
}


// compares two teams based on their goal differences if points are equal
function compareGd(p1,p2) {
    if (p1.points === p2.points){
        if (p1.goalDiff < p2.goalDiff)
     return 1;
  if (p1.goalDiff > p2.goalDiff)
    return -1;
  return 0; 
    }
}


// compares two teams based on number of goals they scored if points and goal differences are equal
function compareSc(p1,p2) {
    if ((p1.points === p2.points)&&(p1.goalDiff === p2.goalDiff)){
        if (p1.scored < p2.scored)
     return 1;
  if (p1.scored > p2.scored)
    return -1;
  return 0; 
    }
}

// compares two teams based on their mutual game result stored in "inter" value if all of their other stats are equal
function compareInt0(p1,p2) {
    if ((p1.points===p2.points)&&(p1.goalDiff===p2.goalDiff)&&(p1.scored===p2.scored)){
    if ((p1.member===0)&&(p2.member === 1)){
            if (p1.inter.indexOf('b') > -1){return -1}
            else if (p2.inter.indexOf('a') > -1){return 1}  
            else {return 0} 
    }
    else if ((p1.member===1)&&(p2.member === 0)){
            if (p1.inter.indexOf('a') > -1){return -1}
            else if (p2.inter.indexOf('b') > -1){return 1}  
            else {return 0} 
    }
    else if ((p1.member===0)&&(p2.member === 2)){
            if (p1.inter.indexOf('c') > -1){return -1}
            else if (p2.inter.indexOf('a') > -1){return 1}  
            else {return 0} 
    }
    else if ((p1.member===2)&&(p2.member === 0)){
            if (p1.inter.indexOf('a') > -1){return -1}
            else if (p2.inter.indexOf('c') > -1){return 1}  
            else {return 0} 
    }
    else if ((p1.member===0)&&(p2.member === 3)){
            if (p1.inter.indexOf('d') > -1){return -1}
            else if (p2.inter.indexOf('a') > -1){return 1}  
            else {return 0} 
    }
    else if ((p1.member===3)&&(p2.member === 0)){
            if (p1.inter.indexOf('a') > -1){return -1}
            else if (p2.inter.indexOf('d') > -1){return 1}  
            else {return 0} 
    }
    else if ((p1.member===1)&&(p2.member === 2)){
            if (p1.inter.indexOf('c') > -1){return -1}
            else if (p2.inter.indexOf('b') > -1){return 1}  
            else {return 0} 
    }
    else if ((p1.member===2)&&(p2.member === 1)){
            if (p1.inter.indexOf('b') > -1){return -1}
            else if (p2.inter.indexOf('c') > -1){return 1}  
            else {return 0} 
    }
    else if ((p1.member===1)&&(p2.member === 3)){
            if (p1.inter.indexOf('d') > -1){return -1}
            else if (p2.inter.indexOf('b') > -1){return 1}  
            else {return 0} 
    }
    else if ((p1.member===3)&&(p2.member === 1)){
            if (p1.inter.indexOf('b') > -1){return -1}
            else if (p2.inter.indexOf('d') > -1){return 1}  
            else {return 0} 
    }
    else if ((p1.member===2)&&(p2.member === 3)){
            if (p1.inter.indexOf('d') > -1){return -1}
            else if (p2.inter.indexOf('c') > -1){return 1}  
            else {return 0} 
    }
    else if ((p1.member===3)&&(p2.member === 2)){
            if (p1.inter.indexOf('c') > -1){return -1}
            else if (p2.inter.indexOf('d') > -1){return 1}  
            else {return 0} 
    }    
}
}


// fills out "myTable" with that group´s info when called
function table (group){
    
    document.getElementById("Tn").innerHTML = "TEAM";
    document.getElementById("Tp").innerHTML = "POINTS";
    document.getElementById("Ts").innerHTML = "SCORED";
    document.getElementById("Tc").innerHTML = "CONCEDED";
    
    document.getElementById("T0n").innerHTML = group[0].name;
    document.getElementById("T0p").innerHTML = group[0].points;
    document.getElementById("T0s").innerHTML = group[0].scored;
    document.getElementById("T0c").innerHTML = group[0].conceded;
    
    document.getElementById("T1n").innerHTML = group[1].name;
    document.getElementById("T1p").innerHTML = group[1].points;
    document.getElementById("T1s").innerHTML = group[1].scored;
    document.getElementById("T1c").innerHTML = group[1].conceded;
    
    document.getElementById("T2n").innerHTML = group[2].name;
    document.getElementById("T2p").innerHTML = group[2].points;
    document.getElementById("T2s").innerHTML = group[2].scored;
    document.getElementById("T2c").innerHTML = group[2].conceded;
    
    document.getElementById("T3n").innerHTML = group[3].name;
    document.getElementById("T3p").innerHTML = group[3].points;
    document.getElementById("T3s").innerHTML = group[3].scored;
    document.getElementById("T3c").innerHTML = group[3].conceded;
}


// checks if "instr" is visible
var queryInstr = $("#instr");
var isInstrVisible = queryInstr.is(":visible");


groupa.onclick = function(){
    // shows "myTable", hides this group´s button
    $("#myTable").show();
    $("#groupa").toggle(300);
    // fills out appropriate html with results of group matches
    document.getElementById("W0").innerHTML = "<br>"+"Welcome to group A!"+"<br>";
    document.getElementById("S0").innerHTML = result(groupA[0],groupA[1],0,groupA);
    document.getElementById("S1").innerHTML = result(groupA[2],groupA[3],1,groupA);
    document.getElementById("S2").innerHTML = result(groupA[0],groupA[2],2,groupA);
    document.getElementById("S3").innerHTML = result(groupA[1],groupA[3],3,groupA);
    document.getElementById("S4").innerHTML = result(groupA[0],groupA[3],4,groupA);
    document.getElementById("S5").innerHTML = result(groupA[1],groupA[2],5,groupA);
    // hides "instr" if it´s not hidden already
    if(isInstrVisible === true){
    $("#instr").hide()}   
    // calculates goal differences
    groupA[0].goalDiff;
    groupA[1].goalDiff;
    groupA[2].goalDiff;
    groupA[3].goalDiff;
    for(g=0;g<4;g++){
        groupA[g].goalDiff = groupA[g].scored - groupA[g].conceded
    };
    // sorts teams by FIFA rules
    groupA.sort(compare);
    groupA.sort(compareGd);
    groupA.sort(compareSc);
    groupA.sort(compareInt0);
    // fills out table for this group
    table(groupA);
    // adds top two teams from group to "progressed"
    progressed[0] = groupA[0];
    progressed[1] = groupA[1];
    // if all group buttons are clicked shows "knock" button
    if(groupA[0].points>0&&groupB[0].points>0&&groupC[0].points>0&&groupD[0].points>0&&groupE[0].points>0&&groupF[0].points>0&&groupG[0].points>0&&groupH[0].points>0){
    $("#knock").toggle();}
};


groupb.onclick = function(){
    $("#myTable").show();
    $("#groupb").toggle(300);
    document.getElementById("W0").innerHTML = "<br>"+"Welcome to group B!"+"<br>";
    document.getElementById("S0").innerHTML = result(groupB[0],groupB[1],0,groupB);
    document.getElementById("S1").innerHTML = result(groupB[2],groupB[3],1,groupB);
    document.getElementById("S2").innerHTML = result(groupB[0],groupB[2],2,groupB);
    document.getElementById("S3").innerHTML = result(groupB[1],groupB[3],3,groupB);
    document.getElementById("S4").innerHTML = result(groupB[0],groupB[3],4,groupB);
    document.getElementById("S5").innerHTML = result(groupB[1],groupB[2],5,groupB);
    if(isInstrVisible === true){
    $("#instr").hide()}   
    groupB[0].goalDiff;
    groupB[1].goalDiff;
    groupB[2].goalDiff;
    groupB[3].goalDiff;
    for(g=0;g<4;g++){
        groupB[g].goalDiff = groupB[g].scored - groupB[g].conceded
    };
    groupB.sort(compare);
    groupB.sort(compareGd);
    groupB.sort(compareSc);
    groupB.sort(compareInt0);
    table(groupB);
    progressed[2] = groupB[0];
    progressed[3] = groupB[1];
    progressed.push(groupA[0],groupA[1]);
    if(groupA[0].points>0&&groupB[0].points>0&&groupC[0].points>0&&groupD[0].points>0&&groupE[0].points>0&&groupF[0].points>0&&groupG[0].points>0&&groupH[0].points>0){
    $("#knock").toggle();}
};


groupc.onclick = function(){
    $("#myTable").show();
    $("#groupc").toggle(300);
    document.getElementById("W0").innerHTML = "<br>"+"Welcome to group C!"+"<br>";
    document.getElementById("S0").innerHTML = result(groupC[0],groupC[1],0,groupC);
    document.getElementById("S1").innerHTML = result(groupC[2],groupC[3],1,groupC);
    document.getElementById("S2").innerHTML = result(groupC[0],groupC[2],2,groupC);
    document.getElementById("S3").innerHTML = result(groupC[1],groupC[3],3,groupC);
    document.getElementById("S4").innerHTML = result(groupC[0],groupC[3],4,groupC);
    document.getElementById("S5").innerHTML = result(groupC[1],groupC[2],5,groupC);
    if(isInstrVisible === true){
    $("#instr").hide()}   
    groupC[0].goalDiff;
    groupC[1].goalDiff;
    groupC[2].goalDiff;
    groupC[3].goalDiff;
    for(g=0;g<4;g++){
        groupC[g].goalDiff = groupC[g].scored - groupC[g].conceded
    };
    groupC.sort(compare);
    groupC.sort(compareGd);
    groupC.sort(compareSc);
    groupC.sort(compareInt0);
    table(groupC);
    progressed[4] = groupC[0];
    progressed[5] = groupC[1];
    if(groupA[0].points>0&&groupB[0].points>0&&groupC[0].points>0&&groupD[0].points>0&&groupE[0].points>0&&groupF[0].points>0&&groupG[0].points>0&&groupH[0].points>0){
    $("#knock").toggle();
    }
}


groupd.onclick = function(){
    $("#myTable").show();
    $("#groupd").toggle(300);
    document.getElementById("W0").innerHTML = "<br>"+"Welcome to group D!"+"<br>";
    document.getElementById("S0").innerHTML = result(groupD[0],groupD[1],0,groupD);
    document.getElementById("S1").innerHTML = result(groupD[2],groupD[3],1,groupD);
    document.getElementById("S2").innerHTML = result(groupD[0],groupD[2],2,groupD);
    document.getElementById("S3").innerHTML = result(groupD[1],groupD[3],3,groupD);
    document.getElementById("S4").innerHTML = result(groupD[0],groupD[3],4,groupD);
    document.getElementById("S5").innerHTML = result(groupD[1],groupD[2],5,groupD);
    if(isInstrVisible === true){
    $("#instr").hide()}   
    groupD[0].goalDiff;
    groupD[1].goalDiff;
    groupD[2].goalDiff;
    groupD[3].goalDiff;
    for(g=0;g<4;g++){
        groupD[g].goalDiff = groupD[g].scored - groupD[g].conceded
    };
    groupD.sort(compare);
    groupD.sort(compareGd);
    groupD.sort(compareSc);
    groupD.sort(compareInt0);
    table(groupD);
    progressed[6] = groupD[0];
    progressed[7] = groupD[1];
    if(groupA[0].points>0&&groupB[0].points>0&&groupC[0].points>0&&groupD[0].points>0&&groupE[0].points>0&&groupF[0].points>0&&groupG[0].points>0&&groupH[0].points>0){
    $("#knock").toggle();
    }
}


groupe.onclick = function(){
    $("#myTable").show();
    $("#groupe").toggle(300);
    document.getElementById("W0").innerHTML = "<br>"+"Welcome to group E!"+"<br>";
    document.getElementById("S0").innerHTML = result(groupE[0],groupE[1],0,groupE);
    document.getElementById("S1").innerHTML = result(groupE[2],groupE[3],1,groupE);
    document.getElementById("S2").innerHTML = result(groupE[0],groupE[2],2,groupE);
    document.getElementById("S3").innerHTML = result(groupE[1],groupE[3],3,groupE);
    document.getElementById("S4").innerHTML = result(groupE[0],groupE[3],4,groupE);
    document.getElementById("S5").innerHTML = result(groupE[1],groupE[2],5,groupE);
    if(isInstrVisible === true){
    $("#instr").hide()}   
    groupE[0].goalDiff;
    groupE[1].goalDiff;
    groupE[2].goalDiff;
    groupE[3].goalDiff;
    for(g=0;g<4;g++){
        groupE[g].goalDiff = groupE[g].scored - groupE[g].conceded
    };
    groupE.sort(compare);
    groupE.sort(compareGd);
    groupE.sort(compareSc);
    groupE.sort(compareInt0);
    table(groupE);
    progressed[8] = groupE[0];
    progressed[9] = groupE[1];
    if(groupA[0].points>0&&groupB[0].points>0&&groupC[0].points>0&&groupD[0].points>0&&groupE[0].points>0&&groupF[0].points>0&&groupG[0].points>0&&groupH[0].points>0){
    $("#knock").toggle();
    }
}


groupf.onclick = function(){
    $("#myTable").show();
    $("#groupf").toggle(300);
    document.getElementById("W0").innerHTML = "<br>"+"Welcome to group F!"+"<br>";
    document.getElementById("S0").innerHTML = result(groupF[0],groupF[1],0,groupF);
    document.getElementById("S1").innerHTML = result(groupF[2],groupF[3],1,groupF);
    document.getElementById("S2").innerHTML = result(groupF[0],groupF[2],2,groupF);
    document.getElementById("S3").innerHTML = result(groupF[1],groupF[3],3,groupF);
    document.getElementById("S4").innerHTML = result(groupF[0],groupF[3],4,groupF);
    document.getElementById("S5").innerHTML = result(groupF[1],groupF[2],5,groupF);
    if(isInstrVisible === true){
    $("#instr").hide()}   
    groupF[0].goalDiff;
    groupF[1].goalDiff;
    groupF[2].goalDiff;
    groupF[3].goalDiff;
    for(g=0;g<4;g++){
        groupF[g].goalDiff = groupF[g].scored - groupF[g].conceded
    };
    groupF.sort(compare);
    groupF.sort(compareGd);
    groupF.sort(compareSc);
    groupF.sort(compareInt0);
    table(groupF);
    progressed[10] = groupF[0];
    progressed[11] = groupF[1];
    if(groupA[0].points>0&&groupB[0].points>0&&groupC[0].points>0&&groupD[0].points>0&&groupE[0].points>0&&groupF[0].points>0&&groupG[0].points>0&&groupH[0].points>0){
    $("#knock").toggle();
    }
}


groupg.onclick = function(){
    $("#myTable").show();
    $("#groupg").toggle(300);
    document.getElementById("W0").innerHTML = "<br>"+"Welcome to group G!"+"<br>";
    document.getElementById("S0").innerHTML = result(groupG[0],groupG[1],0,groupG);
    document.getElementById("S1").innerHTML = result(groupG[2],groupG[3],1,groupG);
    document.getElementById("S2").innerHTML = result(groupG[0],groupG[2],2,groupG);
    document.getElementById("S3").innerHTML = result(groupG[1],groupG[3],3,groupG);
    document.getElementById("S4").innerHTML = result(groupG[0],groupG[3],4,groupG);
    document.getElementById("S5").innerHTML = result(groupG[1],groupG[2],5,groupG);
    if(isInstrVisible === true){
    $("#instr").hide()}   
    groupG[0].goalDiff;
    groupG[1].goalDiff;
    groupG[2].goalDiff;
    groupG[3].goalDiff;
    for(g=0;g<4;g++){
        groupG[g].goalDiff = groupG[g].scored - groupG[g].conceded
    };
    groupG.sort(compare);
    groupG.sort(compareGd);
    groupG.sort(compareSc);
    groupG.sort(compareInt0);
    table(groupG);
    progressed[12] = groupG[0];
    progressed[13] = groupG[1];
    if(groupA[0].points>0&&groupB[0].points>0&&groupC[0].points>0&&groupD[0].points>0&&groupE[0].points>0&&groupF[0].points>0&&groupG[0].points>0&&groupH[0].points>0){
    $("#knock").toggle();
    }
}


grouph.onclick = function(){
    $("#myTable").show();
    $("#grouph").toggle(300);
    document.getElementById("W0").innerHTML = "<br>"+"Welcome to group H!"+"<br>";
    document.getElementById("S0").innerHTML = result(groupH[0],groupH[1],0,groupH);
    document.getElementById("S1").innerHTML = result(groupH[2],groupH[3],1,groupH);
    document.getElementById("S2").innerHTML = result(groupH[0],groupH[2],2,groupH);
    document.getElementById("S3").innerHTML = result(groupH[1],groupH[3],3,groupH);
    document.getElementById("S4").innerHTML = result(groupH[0],groupH[3],4,groupH);
    document.getElementById("S5").innerHTML = result(groupH[1],groupH[2],5,groupH);
    if(isInstrVisible === true){
    $("#instr").hide()}   
    groupH[0].goalDiff;
    groupH[1].goalDiff;
    groupH[2].goalDiff;
    groupH[3].goalDiff;
    for(g=0;g<4;g++){
        groupH[g].goalDiff = groupH[g].scored - groupH[g].conceded
    };
    groupH.sort(compare);
    groupH.sort(compareGd);
    groupH.sort(compareSc);
    groupH.sort(compareInt0);
    table(groupH);
    progressed[14] = groupH[0];
    progressed[15] = groupH[1];
    if(groupA[0].points>0&&groupB[0].points>0&&groupC[0].points>0&&groupD[0].points>0&&groupE[0].points>0&&groupF[0].points>0&&groupG[0].points>0&&groupH[0].points>0){
    $("#knock").toggle();
    }
}


/* knockout phase functions compared to group match function deal with draw result by deciding a winner by a random extra time or penalty result
*/
function knockout (z,t,gz=0,gt=0) {
    
    for(q=0;q<coeficients.length;q++){
    gz+=(Math.round(Math.random()*coeficients[q]*z.power/t.power));
    gt+=(Math.round(Math.random()*coeficients[q]*t.power/z.power));
    et = (Math.floor(Math.random()*10));
    }
    
    if (((gz+gt)>4)&&(gz!==gt)&&(gz!==0)&&(gt!==0)){
        var res; 
        res = z.name+" vs. "+t.name+" "+gz+"-"+gt+" during knockout phase";
        highlights.push(res);
    }
    
    var outcome;
    if (gz===gt){
        if ((gz+gt)===0){outcome=drawBoring[Math.floor(Math.random()*drawBoring.length)]}
        else if ((gz+gt)===2){outcome=drawNormal[Math.floor(Math.random()*drawNormal.length)]}
        else {outcome=drawHighscore[Math.floor(Math.random()*drawHighscore.length)]}
    }else{
        if ((((z.power-t.power)>10)&&(gt>gz))||((gz>gt)&&((t.power-z.power)>10)))
            {outcome=winSurprise[Math.floor(Math.random()*winSurprise.length)]}
        else{
            if (((gz-gt)>3)||(3<(gt-gz))){outcome=winEasy[Math.floor(Math.random()*winEasy.length)]}
            else {
                if(((gz+gt)>3)&&(((gz-gt)<3)||((gt-gz)<3)))
                {outcome=winHighscore[Math.floor(Math.random()*winHighscore.length)]}
                else {
                    if (((gz-gt)===1)||(1===(gt-gz))){outcome=winHard[Math.floor(Math.random()*winHard.length)]}
                    else{outcome=winNormal[Math.floor(Math.random()*winNormal.length)]}
                }
            }
        }
    }
    
    if(gz>gt){
        output = z.name+outcome+t.name+" "+gz+" - "+gt+"!";
        quarter.push(z);
        return output;
    }else if(gz<gt){
        output = t.name+outcome+z.name+" "+gt+" - "+gz+"!";
        quarter.push(t);
        return output;
    }else{
       var hg;
       var res;
       var pen = Math.round(Math.random()*3);
       if(pen===0){hg=","+z.name+" won it on penalties"}else if(pen===1){hg=","+t.name+" won it on penalties"}else if(pen===2){hg=","+z.name+" won it "+extraTime[et]+" in extra time"}else if(pen===3){hg=","+t.name+" won it "+extraTime[et]+" in extra time"}
       if ((gz===gt)&&((gz+gt)>3)){res = z.name+" vs. "+t.name+" "+gz+"-"+gt+" during regular time in the knockout phase"+hg;
           highlights.push(res);
       }
       if(pen===0){
         quarter.push(z);
         output = z.name+" and "+t.name+outcome+gz+" - "+gt+" in regular time."+"<br>"+z.name+" advances to next round after penalty shootout!";
         return output;
       }else if(pen===1){
         quarter.push(t);
         output = z.name+" and "+t.name+outcome+gz+" - "+gt+" in regular time."+"<br>"+t.name+" advances to next round after penalty shootout!";
         return output;
       }else if(pen===2){
         quarter.push(z);
         output = z.name+" and "+t.name+outcome+gz+" - "+gt+" in regular time."+"<br>"+z.name+" advances to next round after an "+extraTime[et]+" extra time!";
         return output;
       }else{
         quarter.push(t);
         output = z.name+" and "+t.name+outcome+gz+" - "+gt+" in regular time."+"<br>"+t.name+" advances to next round after an "+extraTime[et]+" extra time!";
         return output;
       } 
    }
}

/* knockout phase - gives us results of matches between "progressed" teams, matching them by fifa rules, hiddes "myTable" and "knock" and shows "quarterF"
*/
knock.onclick = function(){
    document.getElementById("W1").innerHTML = "Welcome to knockout phase! Teams still with us are: "+"<br>";
    for(kn=0;kn<16;kn++){
        if(kn===8){
            document.getElementById("W2").innerHTML += "<br>";
        }
        if(kn===14){
            document.getElementById("W2").innerHTML += progressed[14].name+" and ";continue;
        }
        if(kn===15){
            document.getElementById("W2").innerHTML += progressed[15].name+"."+"<br>";continue;
        }
            document.getElementById("W2").innerHTML += progressed[kn].name+", ";
    }; 
    document.getElementById("W0").innerHTML = "";
    document.getElementById("S0").innerHTML = "";
    document.getElementById("S1").innerHTML = "";
    document.getElementById("S2").innerHTML = "";
    document.getElementById("S3").innerHTML = "";
    document.getElementById("S4").innerHTML = "";
    document.getElementById("S5").innerHTML = "";
    $("#myTable").toggle()   
    document.getElementById("Sk0").innerHTML = knockout(progressed[4],progressed[7],0,0);
    document.getElementById("Sk1").innerHTML = knockout(progressed[0],progressed[3],0,0);
    document.getElementById("Sk2").innerHTML = knockout(progressed[2],progressed[1],0,0);
    document.getElementById("Sk3").innerHTML = knockout(progressed[6],progressed[5],0,0);
    document.getElementById("Sk4").innerHTML = knockout(progressed[8],progressed[11],0,0);
    document.getElementById("Sk5").innerHTML = knockout(progressed[12],progressed[15],0,0);
    document.getElementById("Sk6").innerHTML = knockout(progressed[10],progressed[9],0,0);
    document.getElementById("Sk7").innerHTML = knockout(progressed[14],progressed[13],0,0);
    $("#knock").toggle(300);
    $("#quarterF").toggle();
}


// quarterfinal results function, works similar to knockout
function quarterFinal (z,t,gz=0,gt=0) {
    
    for(qf=0;qf<coeficients.length;qf++){
    gz+=(Math.round(Math.random()*coeficients[qf]*z.power/t.power));
    gt+=(Math.round(Math.random()*coeficients[qf]*t.power/z.power));
    et = (Math.floor(Math.random()*10));
    }
    
    if (((gz+gt)>4)&&(gz!==gt)&&(gz!==0)&&(gt!==0)){
        var res;
        res = z.name+" vs. "+t.name+" "+gz+"-"+gt+" in quarterfinal";
        highlights.push(res);
            }
            
    var outcome;
    if (gz===gt){
        if ((gz+gt)===0){outcome=drawBoring[Math.floor(Math.random()*drawBoring.length)]}
        else if ((gz+gt)===2){outcome=drawNormal[Math.floor(Math.random()*drawNormal.length)]}
        else {outcome=drawHighscore[Math.floor(Math.random()*drawHighscore.length)]}
    }else{
        if ((((z.power-t.power)>10)&&(gt>gz))||((gz>gt)&&((t.power-z.power)>10)))
            {outcome=winSurprise[Math.floor(Math.random()*winSurprise.length)]}
        else{
            if (((gz-gt)>3)||(3<(gt-gz))){outcome=winEasy[Math.floor(Math.random()*winEasy.length)]}
            else {
                if(((gz+gt)>3)&&(((gz-gt)<3)||((gt-gz)<3)))
                {outcome=winHighscore[Math.floor(Math.random()*winHighscore.length)]}
                else {
                    if (((gz-gt)===1)||(1===(gt-gz))){outcome=winHard[Math.floor(Math.random()*winHard.length)]}
                    else{outcome=winNormal[Math.floor(Math.random()*winNormal.length)]}
                }
            }
        }
    }
    
    if(gz>gt){
        output = "<br>"+z.name+outcome+t.name+" "+gz+" - "+gt+" and progresses to semifinal!";
        semi.push(z);
        return output;
    }else if(gz<gt){
        output = "<br>"+t.name+outcome+z.name+" "+gt+" - "+gz+" and progresses to semifinal!";
        semi.push(t);
        return output;
    }else{
        var hg;
        var res;
        var pen = Math.round(Math.random()*3);
        if(pen===0){hg=","+z.name+" won it on penalties"}else if(pen===1){hg=","+t.name+" won it on penalties"}else if(pen===2){hg=","+z.name+" won it "+extraTime[et]+" in extra time"}else if(pen===3){hg=","+t.name+" won it "+extraTime[et]+" in extra time"}
       if ((gz===gt)&&((gz+gt)>3)){res = z.name+" vs. "+t.name+" "+gz+"-"+gt+" during regular time in the quarterfinal"+hg;
           highlights.push(res);
       }
       if(pen===0){
         semi.push(z);
         output = "<br>"+z.name+" and "+t.name+outcome+gz+" - "+gt+" in regular time."+"<br>"+z.name+" advances to semifinal after penalty shootout!";
         return output;
       }else if(pen===1){
         semi.push(t);
         output = "<br>"+z.name+" and "+t.name+outcome+gz+" - "+gt+" in regular time."+"<br>"+t.name+" advances to semifinal after penalty shootout!";
         return output;
       }else if(pen===2){
         semi.push(z);
         output = "<br>"+z.name+" and "+t.name+outcome+gz+" - "+gt+" in regular time."+"<br>"+z.name+" advances to semifinal after an "+extraTime[et]+" extra time!";
         return output;
       }else{
         semi.push(t);
         output = "<br>"+z.name+" and "+t.name+outcome+gz+" - "+gt+" in regular time."+"<br>"+t.name+" advances to semifinal after an "+extraTime[et]+" extra time!";
         return output;
       }
    }
}

// quarterfinal matches
quarterF.onclick = function(){
document.getElementById("W3").innerHTML = "Welcome to quarterfinal! Teams still marching towards World Cup are: "+"<br>";
for(qe=0;qe<8;qe++){
    if(qe===6){
        document.getElementById("W4").innerHTML += quarter[6].name+" and ";continue;
    }
    if(qe===7){
        document.getElementById("W4").innerHTML += quarter[7].name+"."+"<br>";continue;
    }
        document.getElementById("W4").innerHTML += quarter[qe].name+", ";
    }; 
    document.getElementById("W1").innerHTML = "";
    document.getElementById("W2").innerHTML = "";
    document.getElementById("Sk0").innerHTML = "";
    document.getElementById("Sk1").innerHTML = "";
    document.getElementById("Sk2").innerHTML = "";
    document.getElementById("Sk3").innerHTML = "";
    document.getElementById("Sk4").innerHTML = "";
    document.getElementById("Sk5").innerHTML = "";
    document.getElementById("Sk6").innerHTML = "";
    document.getElementById("Sk7").innerHTML = "";
    document.getElementById("Sq0").innerHTML = quarterFinal(quarter[0],quarter[1],0,0);
    document.getElementById("Sq1").innerHTML = quarterFinal(quarter[4],quarter[5],0,0);
    document.getElementById("Sq2").innerHTML = quarterFinal(quarter[6],quarter[7],0,0);
    document.getElementById("Sq3").innerHTML = quarterFinal(quarter[2],quarter[3],0,0); 
    $("#quarterF").toggle(300);
    $("#semiF").toggle();
}

// semifinal results function, works similar to knockout function
function semiFinal (z,t,gz=0,gt=0) {
    
    for(f=0;f<coeficients.length;f++){
    gz+=(Math.round(Math.random()*coeficients[f]*z.power/t.power));
    gt+=(Math.round(Math.random()*coeficients[f]*t.power/z.power));
    et = (Math.floor(Math.random()*10));
    }
    
    if (((gz+gt)>4)&&(gz!==gt)&&(gz!==0)&&(gt!==0)){
        var res; 
        res = z.name+" vs. "+t.name+" "+gz+"-"+gt+" in semifinal";
        highlights.push(res);
    }
    
    var outcome;
    if (gz===gt){
        if ((gz+gt)===0){outcome=drawBoring[Math.floor(Math.random()*drawBoring.length)]}
        else if ((gz+gt)===2){outcome=drawNormal[Math.floor(Math.random()*drawNormal.length)]}
        else {outcome=drawHighscore[Math.floor(Math.random()*drawHighscore.length)]}
    }else{
        if ((((z.power-t.power)>10)&&(gt>gz))||((gz>gt)&&((t.power-z.power)>10)))
            {outcome=winSurprise[Math.floor(Math.random()*winSurprise.length)]}
        else{
            if (((gz-gt)>3)||(3<(gt-gz))){outcome=winEasy[Math.floor(Math.random()*winEasy.length)]}
            else {
                if(((gz+gt)>3)&&(((gz-gt)<3)||((gt-gz)<3)))
                {outcome=winHighscore[Math.floor(Math.random()*winHighscore.length)]}
                else {
                    if (((gz-gt)===1)||(1===(gt-gz))){outcome=winHard[Math.floor(Math.random()*winHard.length)]}
                    else{outcome=winNormal[Math.floor(Math.random()*winNormal.length)]}
                }
            }
        }
    }
    
    if(gz>gt){
        output = "<br>"+z.name+outcome+t.name+" "+gz+" - "+gt+" and progresses to final!";
        final.push(z);
        third.push(t);
        return output;
    }else if(gz<gt){
        output = "<br>"+t.name+outcome+z.name+" "+gt+" - "+gz+" and progresses to final!";
        final.push(t);
        third.push(z);
        return output;
    }else{
        var pen = Math.round(Math.random()*3);
        var res;
        var hg;
        if(pen===0){hg=","+z.name+" won it on penalties"}else if(pen===1){hg=","+t.name+" won it on penalties"}else if(pen===2){hg=","+z.name+" won it "+extraTime[et]+" in extra time"}else if(pen===3){hg=","+t.name+" won it "+extraTime[et]+" in extra time"}
       if ((gz===gt)&&((gz+gt)>3)){res = z.name+" vs. "+t.name+" "+gz+"-"+gt+" during regular time in the semifinal"+hg;
           highlights.push(res);
       }
       if(pen===0){
         final.push(z);
         third.push(t);
         output = "<br>"+z.name+" and "+t.name+outcome+gz+" - "+gt+" in regular time."+z.name+" advances to final after penalty shootout!";
         return output;
       }else if(pen===1){
         final.push(t);
         third.push(z);
         output = "<br>"+z.name+" and "+t.name+outcome+gz+" - "+gt+" in regular time."+t.name+" advances to next round after penalty shootout!";
         return output;
       }else if(pen===2){
         final.push(z);
         third.push(t);
         output = "<br>"+z.name+" and "+t.name+outcome+gz+" - "+gt+" in regular time."+z.name+" advances to next round after an "+extraTime[et]+" extra time!";
         return output;
       }else{
         final.push(t);
         third.push(z);
         output = "<br>"+z.name+" and "+t.name+outcome+gz+" - "+gt+" in regular time."+t.name+" advances to next round after an "+extraTime[et]+" extra time!";
         return output;
       }
    }
}

// semifinal matches
semiF.onclick = function(){
    document.getElementById("W5").innerHTML = "Welcome to semifinal! Last four standing are: "+"<br>";
    document.getElementById("W6").innerHTML = semi[0].name+" against "+semi[1].name+" and "+semi[2].name+" against "+semi[3].name+"!"+"<br>";
    document.getElementById("Ss0").innerHTML = semiFinal(semi[0],semi[1],0,0);
    document.getElementById("Ss1").innerHTML = semiFinal(semi[2],semi[3],0,0);
    document.getElementById("W3").innerHTML = "";
    document.getElementById("W4").innerHTML = "";
    document.getElementById("Sq0").innerHTML = "";
    document.getElementById("Sq1").innerHTML = "";
    document.getElementById("Sq2").innerHTML = "";
    document.getElementById("Sq3").innerHTML = "";
    $("#semiF").toggle(300);
    $("#finale").toggle();
}

// third place result function
function thirdPlace (z,t,gz=0,gt=0) {
    
    for(h=0;h<coeficients.length;h++){
    gz+=(Math.round(Math.random()*coeficients[h]*z.power/t.power));
    gt+=(Math.round(Math.random()*coeficients[h]*t.power/z.power));
    et = (Math.floor(Math.random()*10));
    }
    
    if (((gz+gt)>4)&&(gz!==gt)&&(gz!==0)&&(gt!==0)){
        var res; 
        res = z.name+" vs. "+t.name+" "+gz+"-"+gt+" for third place";
        highlights.push(res);
    }
    
    var outcome;
    if (gz===gt){
        if ((gz+gt)===0){outcome=drawBoring[Math.floor(Math.random()*drawBoring.length)]}
        else if ((gz+gt)===2){outcome=drawNormal[Math.floor(Math.random()*drawNormal.length)]}
        else {outcome=drawHighscore[Math.floor(Math.random()*drawHighscore.length)]}
    }else{
        if ((((z.power-t.power)>10)&&(gt>gz))||((gz>gt)&&((t.power-z.power)>10)))
            {outcome=winSurprise[Math.floor(Math.random()*winSurprise.length)]}
        else{
            if (((gz-gt)>3)||(3<(gt-gz))){outcome=winEasy[Math.floor(Math.random()*winEasy.length)]}
            else {
                if(((gz+gt)>3)&&(((gz-gt)<3)||((gt-gz)<3)))
                {outcome=winHighscore[Math.floor(Math.random()*winHighscore.length)]}
                else {
                    if (((gz-gt)===1)||(1===(gt-gz))){outcome=winHard[Math.floor(Math.random()*winHard.length)]}
                    else{outcome=winNormal[Math.floor(Math.random()*winNormal.length)]}
                }
            }
        }
    }
    
    if(gz>gt){
        output = "<br>"+z.name+outcome+t.name+" "+gz+" - "+gt+" and finishes third!";
        return output;
    }else if(gz<gt){
        output = "<br>"+t.name+outcome+z.name+" "+gt+" - "+gz+" and finishes third!";
        return output;
    }else{
       var pen = Math.round(Math.random()*3);
       var res;
       var hg;
       if(pen===0){hg=","+z.name+" won it on penalties"}else if(pen===1){hg=","+t.name+" won it on penalties"}else if(pen===2){hg=","+z.name+" won it "+extraTime[et]+" in extra time"}else if(pen===3){hg=","+t.name+" won it "+extraTime[et]+" in extra time"}
       if ((gz===gt)&&((gz+gt)>3)){res = z.name+" vs. "+t.name+" "+gz+"-"+gt+" during regular time while competing for third place"+hg;
           highlights.push(res);
       }
       if(pen===0){
         output = "<br>"+z.name+" and "+t.name+outcome+gz+" - "+gt+" in regular time. "+z.name+" places third in the World Cup after penalty shootout!";
         return output;
       }else if(pen===1){
         output = "<br>"+z.name+" and "+t.name+outcome+gz+" - "+gt+" in regular time. "+t.name+" places third in the World Cup after penalty shootout!";
         return output;
       }else if(pen===2){
         output = "<br>"+z.name+" and "+t.name+outcome+gz+" - "+gt+" in regular time. "+z.name+" places third in the World Cup after an "+extraTime[et]+" extra time!";
         return output;
       }else{
         output = "<br>"+z.name+" and "+t.name+outcome+gz+" - "+gt+" in regular time. "+t.name+" places third in the World Cup after an "+extraTime[et]+" extra time!";
         return output;
        }
    }
}


// world cup final function 
function worldCup (z,t,gz=0,gt=0) {
    
    for(n=0;n<coeficients.length;n++){
    gz+=(Math.round(Math.random()*coeficients[n]*z.power/t.power));
    gt+=(Math.round(Math.random()*coeficients[n]*t.power/z.power));
    et = (Math.floor(Math.random()*10));
    }
    
    if (((gz+gt)>4)&&(gz!==gt)&&(gz!==0)&&(gt!==0)){
        var res;
        res = z.name+" vs. "+t.name+" "+gz+"-"+gt+" in the final";
        highlights.push(res);
    }
    
    var outcome;
    if (gz===gt){
        if ((gz+gt)===0){outcome=drawBoring[Math.floor(Math.random()*drawBoring.length)]}
        else if ((gz+gt)===2){outcome=drawNormal[Math.floor(Math.random()*drawNormal.length)]}
        else {outcome=drawHighscore[Math.floor(Math.random()*drawHighscore.length)]}
    }else{
        if ((((z.power-t.power)>10)&&(gt>gz))||((gz>gt)&&((t.power-z.power)>10)))
            {outcome=winSurprise[Math.floor(Math.random()*winSurprise.length)]}
        else{
            if (((gz-gt)>3)||(3<(gt-gz))){outcome=winEasy[Math.floor(Math.random()*winEasy.length)]}
            else {
                if(((gz+gt)>3)&&(((gz-gt)<3)||((gt-gz)<3)))
                {outcome=winHighscore[Math.floor(Math.random()*winHighscore.length)]}
                else {
                    if (((gz-gt)===1)||(1===(gt-gz))){outcome=winHard[Math.floor(Math.random()*winHard.length)]}
                    else{outcome=winNormal[Math.floor(Math.random()*winNormal.length)]}
                }
            }
        }
    } 
    
    if(gz>gt){
        output = "<br>"+z.name+outcome+t.name+" "+gz+" - "+gt+" and wins the World Cup!!!";
        return output;
    }else if(gz<gt){
        output = "<br>"+t.name+outcome+z.name+" "+gt+" - "+gz+" and wins the World Cup!!!";
        return output;
    }else{
       var pen = Math.round(Math.random()*3);
       var res;
       var hg;
       if(pen===0){hg=","+z.name+" won it on penalties"}else if(pen===1){hg=","+t.name+" won it on penalties"}else if(pen===2){hg=","+z.name+" won it "+extraTime[et]+" in extra time"}else if(pen===3){hg=","+t.name+" won it "+extraTime[et]+" in extra time"}
       if ((gz===gt)&&((gz+gt)>3)){res = z.name+" vs. "+t.name+" "+gz+"-"+gt+" during regular time in the final"+hg;
           highlights.push(res);
       }
       if(pen===0){
         output = "<br>"+z.name+" and "+t.name+outcome+gz+" - "+gt+" in regular time. "+z.name+" wins the World Cup after penalty shootout!!!";
         return output;
       }else if(pen===1){
         output = "<br>"+z.name+" and "+t.name+outcome+gz+" - "+gt+" in regular time. "+t.name+" wins the World Cup after penalty shootout!!!"; 
         return output;
       }else if(pen===2){
         output = "<br>"+z.name+" and "+t.name+outcome+gz+" - "+gt+" in regular time. "+z.name+" wins the World Cup after an "+extraTime[et]+" extra time!!!";
         return output;
       }else{
         output = "<br>"+z.name+" and "+t.name+outcome+gz+" - "+gt+" in regular time. "+t.name+" wins the World Cup after an "+extraTime[et]+" extra time!!!";
         return output;
       }
    }
}

// 3rd place and final matches, showing highlights of the tournament
finale.onclick = function(){
    document.getElementById("W7").innerHTML = third[0].name+" and "+third[1].name+" will compete for third place, "+"<br>";
    document.getElementById("W8").innerHTML = "and for the World Cup: "+final[0].name+" against "+final[1].name+"..."+"<br>";
    document.getElementById("Sf0").innerHTML = thirdPlace(third[0],third[1],0,0);
    document.getElementById("Sf1").innerHTML = worldCup(final[0],final[1],0,0);
    document.getElementById("W5").innerHTML = "";
    document.getElementById("W6").innerHTML = "";
    document.getElementById("Ss0").innerHTML = "";
    document.getElementById("Ss1").innerHTML = "";
    $("#finale").toggle(300);
    $("#refresh").toggle();
    if(highlights.length>1){
        document.getElementById("Hl0").innerHTML = "<br>"+"We had some really exciting matches during this World Cup, especially: "+"<br>"+"<br>"
        document.getElementById("Hl1").innerHTML = highlights.join("<br>");
    }else if(highlights.length===1){
    document.getElementById("Hl0").innerHTML = "<br>"+"We had a particularly exciting match during this World Cup, "
    document.getElementById("Hl1").innerHTML = highlights.join("<br>");  
    }
}


/* reset to beggining function, hidding "refresh" and showing group buttons, resetting arrays and team objects, sorting groups in original order
*/

refresh.onclick = function(){

    $("#refresh").toggle();
    $("#groupa").toggle();
    $("#groupb").toggle();
    $("#groupc").toggle();
    $("#groupd").toggle();
    $("#groupe").toggle();
    $("#groupf").toggle();
    $("#groupg").toggle();
    $("#grouph").toggle();

    document.getElementById("W7").innerHTML = "";
    document.getElementById("W8").innerHTML = "";
    document.getElementById("Sf0").innerHTML = "";
    document.getElementById("Sf1").innerHTML = "";
    document.getElementById("Hl0").innerHTML = "";
    document.getElementById("Hl1").innerHTML = "";

    progressed.length = 0;
    eliminated.length = 0;
    quarter.length = 0;
    semi.length = 0;
    final.length = 0;
    third.length = 0;

    function compareMem(p1,p2) {
        if (p1.member < p2.member)
     return -1;
        if (p1.member > p2.member)
     return 1;
     return 0; 
    }

    for(x=0;x<groups.length;x++){
        groups[x].sort(compareMem);  
    }

    for(v = 0;v<groups.length;v++){
        for(j = 0;j<groups[v].length; j++){
        groups[v][j].points = 0;
        groups[v][j].scored = 0;
        groups[v][j].conceded = 0;
        groups[v][j].goalDiff = 0;
        groups[v][j].inter = "";
    }
    
    highlights = [];
}

}

}
