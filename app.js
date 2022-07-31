"use strict"
var correct = 0;
var trueOrFalse = false;
var problemDiv;
var currentchoice=false;
var currentbutton="";
//Makes array of indexes for sentences
const setOfSentences = [];
var problemContainer = document.getElementById("problemContainer");
for (let i = 0 ; i < 18; i++){
    setOfSentences.push(i);
}
//loads the first sentence
window.addEventListener('load', loadSentence);
$("#score").text("Score: " + correct.toString() + "/9");
function loadSentence(){ 
    $("#questions").text("Question: " + (10-(setOfSentences.length/2)).toString() + "/9");
    problemContainer.innerHTML="";
    let index = Math.floor(Math.random()*setOfSentences.length);
    let specialnumber = setOfSentences[index];
    let indexToRemoveFromSet=index;
    if(index%2==1)
        indexToRemoveFromSet--;
    if (indexToRemoveFromSet !== -1) {
        setOfSentences.splice(indexToRemoveFromSet, 2);
    }
    let sentence = sentences[Math.floor(specialnumber/2)];
    let sentencePart1=sentence.partOne;
    let sentencePart2=sentence.partTwo;
    let meaning=sentence.meaning;
    let specialword="";
    if (specialnumber%2==0){
        specialword=sentence.wrong;
        trueOrFalse = false;
    }
    else{
        specialword=sentence.right;
        trueOrFalse = true;
    }
    $('#problemContainer').prepend(createProblemDiv(sentencePart1, sentencePart2, specialword, meaning));
}
function createProblemDiv(sentencePart1, sentencePart2, specialword, meaning){
    problemDiv = document.createElement('div');
    problemDiv.id = ('problem');
    problemDiv.classList.add('english');
    problemDiv.classList.add('border-bottom');
    problemDiv.innerHTML = sentencePart1;
    problemDiv.appendChild(createTargetWordSpan(specialword));
    problemDiv.innerHTML = problemDiv.innerHTML + sentencePart2;
    problemDiv.innerHTML = problemDiv.innerHTML + "<br>";
    // problemDiv.innerHTML =`<span id="correct" style="color: blue; font-size:1.5rem; ">&#10004;</span>` + problemDiv.innerHTML;
    problemDiv.appendChild(createMeaningSpan(meaning));
    return problemDiv;
}
function createTargetWordSpan(specialword){
    let targetWordSpan = document.createElement('span');
    targetWordSpan.id = 'specialword';
    targetWordSpan.innerHTML = specialword;
    return targetWordSpan;
}
function createMeaningSpan(meaning){
    let meaningSpan = document.createElement('span');
    meaningSpan.id = 'meaning';
    meaningSpan.innerHTML = meaning;
    return meaningSpan;
}
$( "#correct" ).click(function() {
    $(this).addClass("chosen");
    $( "#next" ).text("Next");
    currentbutton="#correct";
    if (true==trueOrFalse){
        correct++;
    }
    currentchoice=true;
    $('#incorrect').prop('disabled', true);
    $("#score").text("Score: " + correct.toString() + "/9");
    check();
    if (setOfSentences.length<=0)
    clearTimer();
});
$( "#incorrect" ).click(function() {
    $(this).addClass("chosen");
    $( "#next" ).text("Next");
    currentbutton="#incorrect";
    if (false==trueOrFalse){
        correct++;
    }
    currentchoice=false;
    $('#correct').prop('disabled', true);
    $("#score").text("Score: " + correct.toString() + "/9");
    check();
    if (setOfSentences.length<=0)
    clearTimer();
});
$( "#next" ).click(function() {
    $( "#next" ).text("Skip");
    if(setOfSentences.length>0){
        loadSentence();
        $('#correct').prop('disabled', false);
        $('#incorrect').prop('disabled', false);
        $('#correct').html("Correct");
        $('#incorrect').html("Incorrect");
        $("#Correct").removeClass("chosen");
        $("#incorrect").removeClass("chosen");
    }
});
function check(){
    if (trueOrFalse==currentchoice)
    $(currentbutton).append(`<span id="correct" style="color: green; font-size:1.5rem; ">&#10004;</span> `);
    else
    $(currentbutton).append(`<span id="correct" style="color: red; font-size:1.5rem; ">&#10008;</span> `);
}