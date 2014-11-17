/**
 * Created by Peter on 17/11/2014.
 */
var timeSignatures = ["2-4", "3-4", "4-4", "6-8"];
var clefs = ['bassClef', 'trebleClef'];
var chosenTS = 0;
var chosenClef = 0;
var numBars = 2;
//change these for difficulty level:
var maxBars = 4;
var maxTS = 4;
var difficulty = 3;

var rhythm = [];

function pageLoad(){
    generateRhythm();
    drawPalate();
}

function generateRhythm(){
    chosenClef = Math.floor((Math.random() * 2));
    numBars = Math.floor((Math.random() * maxBars)+ 1);
    if(numBars == 1)numBars++;

    switch(difficulty){
        case 1:
            chosenTS = 0;
            var notes = ['minum', 'crotchet', 'doubleQuaver'];
            createNotes(notes);
            break;
        case 2:
            chosenTS = Math.floor((Math.random() * 2));
            var notes = ['minum', 'dottedMinum', 'crotchet', 'dottedcrotchetQuaver', 'quadSemiquaver'];
            createNotes(notes);
            break;
        case 3:
            chosenTS = Math.floor((Math.random() * 3));
            var notes = ['semibreve', 'minum', 'dottedMinum', 'crotchet', 'dottedcrotchetQuaver', 'quadSemiquaver', 'doubleQuaver', 'quaverSemiquaver'];
            createNotes(notes);
            break;
    }
}

function createNotes(noteRange){
    var length = numBars;
    var notes = noteRange;
    var numBeats = 0;
    if(chosenTS == 0)numBeats = 2;
    else if(chosenTS == 1) numBeats = 3;
    else if(chosenTS == 2)numBeats = 4;

    while(length > 0){
        var barLength = numBeats;
        while(barLength > 0) {
            var note = Math.floor((Math.random() * notes.length));
            barLength = barLength - noteToBeats(notes[note], timeSignatures[chosenTS]);
            //chosen a note that exceeds the limit of the bar, keep on picking notes until you have picked one that is acceptable
            /*if(barLength < 0){
                var count = 0;
                while (barLength < 0){
                    if(count == 10)location.reload();
                    barLength = barLength + noteToBeats(notes[note], timeSignatures[chosenTS]);
                    note = Math.floor((Math.random() * 3));
                    barLength = barLength - noteToBeats(notes[note], timeSignatures[chosenTS]);
                    count++;
                }
            }*/
            rhythm.push(notes[note]);
        }
        length--;
    }
}

function noteToBeats(note, ts) {
    if (note == "semibreve") {
        if (ts == "2-4" || ts == "3-4" || ts == "4-4")return 4;
        else return 8;
    }
    if (note == "minum") {
        if (ts == "2-4" || ts == "3-4" || ts == "4-4")return 2;
        else return 4;
    }
    if (note == "dottedMinum") {
        if (ts == "2-4" || ts == "3-4" || ts == "4-4")return 3;
        else return 6;
    }
    if (note == "crotchet"){
        if (ts == "2-4" || ts == "3-4" || ts == "4-4")return 1;
        else return 2;
    }
    if (note == "dottedcrotchetQuaver") {
        if (ts == "2-4" || ts == "3-4" || ts == "4-4")return 2;
        else return 4;
    }
    if (note == "quaver") {
        if (ts == "2-4" || ts == "3-4" || ts == "4-4")return .5;
        else return 1;
    }
    if (note == "doubleQuaver") {
        if (ts == "2-4" || ts == "3-4" || ts == "4-4")return 1;
        else return 2;
    }
    if (note == "quaverSemiquaver") {
        if (ts == "2-4" || ts == "3-4" || ts == "4-4")return 1;
        else return 2;
    }
    if (note == "quadSemiquaver") {
        if (ts == "2-4" || ts == "3-4" || ts == "4-4")return 1;
        else return 2;
    }
}

function drawPalate(){
    var lineLength = 645;
    var c=document.getElementById("canvas");
    var ctx=c.getContext("2d");
    ctx.clearRect(0,0, 800, 200);
    //var img= new Image("/EarConditioner/Images/bassClef.png");
    var clef = new Image();
    var tSignature = new Image();
    clef.onload = function(){
        if(chosenClef == 0) {
            ctx.drawImage(clef, 20, 80, 50, 60);
        }
        else if(chosenClef == 1){
            ctx.drawImage(clef, 20, 40, 50, 110);
        }
    }
    clef.src = "/EarConditioner/Images/"+ clefs[chosenClef] +".png";
    tSignature.onload = function(){
        ctx.drawImage(tSignature, 62, 46, 70, 110);
    }
    tSignature.src = "/EarConditioner/Images/" + timeSignatures[chosenTS] +".png";
    ctx.rect(110,100,lineLength,1);
    ctx.rect(110, 90, 1, 20);
    ctx.rect(755, 90, 1, 20);
    switch(numBars){
        case 2:
            ctx.rect((lineLength/2) + 110, 90, 1, 20);
            break;
        case 3:
            ctx.rect((lineLength/3) + 110, 90, 1, 20);
            ctx.rect((lineLength/3)*2 + 110, 90, 1, 20);
            break;
        case 4:
            ctx.rect((lineLength/4)+110, 90, 1, 20);
            ctx.rect((lineLength/2)+110, 90, 1, 20);
            ctx.rect((lineLength *.75)+110 , 90, 1, 20);
    }
    ctx.stroke();
}

function playRhythm(){
    console.log(rhythm);
}