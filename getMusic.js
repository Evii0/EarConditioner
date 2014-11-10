/**
 * Created by Peter on 22/10/2014.
 */
var firstNote = 0;
var secondNote = 0;
var fileNames = ['C2', 'C2Sharp', 'D2', 'D2Sharp', 'E2', 'F2', 'F2Sharp', 'G2', 'G2Sharp', 'A2', 'A2Sharp', 'B2',
    'C3', 'C3Sharp', 'D3', 'D3Sharp', 'E3', 'F3', 'F3Sharp', 'G3', 'G3Sharp', 'A3', 'A3Sharp', 'B3', 'C4', 'C4Sharp',
    'D4', 'D4Sharp', 'E4', 'F4', 'F4Sharp', 'G4', 'G4Sharp', 'A4', 'A4Sharp', 'B4', 'C5', 'C5Sharp', 'D5', 'D5Sharp',
    'E5', 'F5', 'F5Sharp', 'G5', 'G5Sharp', 'A5', 'A5Sharp', 'B5', 'C6'];

var maxInterval = 12;
var upOrDown = 0;

function playInterval(){
    firstNote = Math.floor((Math.random() * 49)+ 1);
    var aud = new Audio('PianoNotes-Chrotchets/' + fileNames[firstNote] +'.mp3');
    console.log('note: ' + fileNames[firstNote] + ' number: ' + firstNote);
    aud.play();

    setTimeout(playInterval2, 650);
}

function playInterval2(){
    upOrDown = Math.floor((Math.random() * maxInterval)+ 1);
    if(upOrDown >= 6){
        secondNote = firstNote + upOrDown;
        if(firstNote + upOrDown > 48)secondNote = 48;
    }
    else if(upOrDown < 6){
        secondNote = firstNote - upOrDown;
        if(firstNote - upOrDown < 0)secondNote = 0;
    }

    console.log('Interval: ' + upOrDown);
    var aud3 = new Audio('PianoNotes-Chrotchets/' + fileNames[secondNote] +'.mp3');

    aud3.play();
    console.log('note: ' + fileNames[secondNote] + ' number: ' + secondNote);
    setTimeout(playInterval3, 1000);
}

function playInterval3(){
    var aud = new Audio('PianoNotes-Chrotchets/' + fileNames[firstNote] +'.mp3');
    var aud3 = new Audio('PianoNotes-Chrotchets/' + fileNames[secondNote] +'.mp3');
    aud.play();
    aud3.play();

    console.log(getIntervalName());
}
function repeatInterval(){
    var aud = new Audio('PianoNotes-Chrotchets/' + fileNames[firstNote] +'.mp3');
    var aud3 = new Audio('PianoNotes-Chrotchets/' + fileNames[secondNote] +'.mp3');
    aud.play();
    aud3.play();

    console.log(getIntervalName());
}

//currently no allowances for double flats or double sharps
function getIntervalName(){
    switch(upOrDown){
        case 0:
            //me being lazy, doesn't account for Diminished Seconds (changing this will probably require altering getCorrespondingValue())
            return "Perfect Unison";
        case 1:
            if(getCorrespondingValue() == 1)return "Augmented Unison";
            else return "Minor Second";
        case 2:
            if(getCorrespondingValue() == 2)return "Major Second";
            else return "Diminished Third";
        case 3:
            if(getCorrespondingValue() == 3)return "Minor Third";
            else return "Augmented Second";
        case 4:
            if(getCorrespondingValue() == 3)return "Major Third";
            else return "Diminished Fourth";
        case 5:
            if(getCorrespondingValue() == 4)return "Perfect Fourth";
            else return "Augmented Third";
        case 6:
            if(getCorrespondingValue() == 4)return "Augmented Fourth";
            else return "Diminished Fifth";
        case 7:
            if(getCorrespondingValue() == 5)return "Perfect Fifth";
            else return "Diminished Sixth";
        case 8:
            if(getCorrespondingValue() == 6)return "Minor Sixth";
            else return "Augmented Fifth";
        case 9:
            if(getCorrespondingValue() == 7)return "Diminished Seventh";
            else return "Major Sixth";
        case 10:
            if(getCorrespondingValue() == 7)return "Minor Seventh";
            else return "Augmented Sixth";
        case 11:
            if(getCorrespondingValue() == 7)return "Major Seventh";
            else return "Diminished Octave";
        case 12:
            if(getCorrespondingValue() == 8)return "Perfect Octave";
            else return "Augmented Seventh";
    }
}

function getCorrespondingValue(){
    var values = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    var firstLetter = fileNames[firstNote].substring(0,1);
    var secondLetter = fileNames[secondNote].substring(0,1);

    //brute force because G->D returns 5 instead of 4, don't know if there are more that will do this, if not, this is fine, if so, better solution needed.
    if(firstLetter == 'G' && secondLetter == 'D')return 4;

    if(Math.max(values.indexOf(firstLetter), values.indexOf(secondLetter)) == values.indexOf(firstLetter)){
        return 9-(values.indexOf(firstLetter) - values.indexOf(secondLetter) + 1);
    }
    else if(values.indexOf(firstLetter) == values.indexOf(secondLetter)){
        if(firstNote == secondNote)return 0;
        else return 1;
    }
    else{
        return ((values.indexOf(secondLetter) - values.indexOf(firstLetter)) + 1);
    }
}

function checkGuess(){
    var inputValue = document.getElementsByName('guessBox')[0].value;
    if(getIntervalName() == inputValue){
        alert("Correct!");
        return;
    }
    alert("Wrong - "+getIntervalName() );
}