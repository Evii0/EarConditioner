/**
 * Created by Peter on 17/11/2014.
 */
var timeSignatures = ['2-4', '3-4', '4-4', '6-8'];
var clefs = ['bassClef', 'trebleClef'];
var chosenTS = 0;
var chosenClef = 0;
var numBars = 2;
//change these for difficulty level:
var maxBars = 4;
var maxTS = 4;
var difficulty = 1;

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

            break;
        case 2:
            chosenTS = Math.floor((Math.random() * 2));

            break;
        case 3:
            chosenTS = Math.floor((Math.random() * 3));

            break;
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

}