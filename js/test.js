/*
 * @author callthefront
 * @description Simple quiz
 * @date 2023.07.31
*/


// Global Variables
var stage = 1;
let data = null;
var size = 0;


// If the document is loaded...
$(function(){

    // Select a mode
    $("#button1").click(function(){
        size = 5;
        localStorage.setItem('mode', size);
        make_quiz(size);
        location.href="main.html";
    });

    $("#button2").click(function(){
        size = 10;
        localStorage.setItem('mode', size);
        make_quiz(size);
        location.href="main.html";
    });

    // Get the size
    if(localStorage.getItem('mode') != null) {
        size = localStorage.getItem('mode');
        $("#show").text("1/"+size);
    };

    // Get the quiz data
    if(localStorage.getItem('data') != null) {
        var tempdata = localStorage.getItem("data");
        size = localStorage.getItem("mode");

        if(tempdata != null) {
            data = JSON.parse(tempdata);
        }

        // window.localStorage.clear();
    };

    // Continue the quiz
    $(".myAnswer").click(function(){
        continue_quiz($(this).val());
    });

});


 
// Make quiz data & Store it as JSON
function make_quiz(size) {
    data = new Array();

    for(var i=0; i<size; i++){
        var obj = new Object();
        obj.name = "dummy string";
        obj.code = Math.floor(Math.random() * (size-1) + 1);
        obj.result = false;
        data.push(obj);
    }

    localStorage.setItem('data', JSON.stringify(data));
};



// Move to next quiz
function continue_quiz(btn_num) {

    // Check
    // alert("data: "+data[3].name+" / stage: "+stage+" / size: "+size+" / btn_num: "+btn_num);

    // Stage info
    $("#show").text(stage+"/"+size);

    // Answer check
    if(btn_num == data[stage-1].code){
        data[stage-1].result = true;
        alert("Good");
    }
    else {
        alert("Oh, no");
    }

    stage++;

    // Finished the quizzes
    if(stage > size){
        var score = 0;

        for(var i=0; i<size; i++){
            // alert(data[i].result);
            if(data[i].result == true)
                score++;
        }

        alert("you won "+score+" times");
        location.href = "index.html";
    }
    else {
        $("#show").text(stage+"/"+size);
    }
};

