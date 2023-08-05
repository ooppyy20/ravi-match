


// Global Variables
var size = 0;
var quiz_num = 0;
var quizzes = null;


// When the document is loaded...
$(function() {

    if(localStorage.getItem('bg_ran') == null){
        var bg_ran = Math.floor(Math.random() * 3);
        if(bg_ran == 0) {
            $(".background").css("background-image","url('resources/img/background_r.jpg')");
        }
        else if(bg_ran == 1){
            $(".background").css("background-image","url('resources/img/background_y.jpg')");
        }
        else if(bg_ran == 2){
            $(".background").css("background-image","url('resources/img/background_b.jpg')");
        }
        localStorage.setItem('bg_ran', bg_ran);
    }

    // Things
    $("#randomTitle").draggable({
      scroll : false,
      cursor: "move",
      revert: "invalid",
      drag: function() {
        $(this).css("width", "10px");
      },
    });

    $( ".album" ).droppable({
      tolerance: "pointer",
      classes: {
        "ui-droppable-hover": "album-hovered"
      },
      drop: function( event, ui ) {
        location.reload(true);

        // Continue the quiz
        // alert($(this).attr("value"));
        continue_quiz($(this).attr("value"));
      }
    });




    // Select a mode
    $("#mode1").click(function(){
      size = 5;
      localStorage.setItem('mode', 1);
      localStorage.setItem('size', size);
      make_quiz(size);
    });

    $("#mode2").click(function(){
        size = 10;
        localStorage.setItem('mode', 2);
        localStorage.setItem('size', size);
        make_quiz(size);
    });

    $("#mode3").click(function(){
        size = 7;
        localStorage.setItem('mode', 3);
        localStorage.setItem('size', size);
        make_quiz(size);
    });


    // Refresh the random title
    if(localStorage.getItem('quizzes') != null) {
        quizzes = localStorage.getItem("quizzes");
        quizzes = JSON.parse(quizzes);
        size = localStorage.getItem("size");
        quiz_num = localStorage.getItem("quiz_num");

        // window.localStorage.clear();
        // alert("quizzes: "+quizzes[quiz_num].title+" / stage: "+quiz_num+" / size: "+size+" / album: "+quizzes[quiz_num].album);
        
        // alert("quiz_num: "+quiz_num+"/ size: "+size);
        // size = localStorage.getItem("size");
        // quiz_num = localStorage.getItem("quiz_num");

        if(quiz_num <= size) {
          // alert("제목 가져오는 중...");
          $("#randomTitle").text(quizzes[quiz_num-1].title);
        }
    };


    // Show result
    if(localStorage.getItem('goto_result') != null) {
      var sw = localStorage.getItem("goto_result");

      if(sw == "true") {
        quizzes = localStorage.getItem("quizzes");
        quizzes = JSON.parse(quizzes);
        size = localStorage.getItem("size");
        quiz_num = localStorage.getItem("quiz_num");

        var score = 0;

        $(".results").empty();

        for(var i=0; i<size; i++){
            // alert(data[i].result);
            if(quizzes[i].result == true) {
                score++;

                $(".results").append(
                  "<div class='resultBox'>" +
                      "<img src='./resources/img/Album" + quizzes[i].album + ".jpg'/>" +
                      "<h2>" + quizzes[i].title + "</h2>" +
                  "</div>"
                );
            }

            else {
              $(".results").append(
                "<div class='resultBox' style='background-color: #f3c4c4'>" +
                    "<img src='./resources/img/Album" + quizzes[i].album + ".jpg'/>" +
                    "<h2>" + quizzes[i].title + "</h2>" +
                "</div>"
              );
            }
        }

        if(localStorage.getItem('mode') != 3) {
            $("#scoreBox").append("<h1 id='score'>"+score+"/"+localStorage.getItem('size')+"</h1>");
        }
        else {
          $("#scoreBox").append("<h1 id='time'>"+(localStorage.getItem("start_time")-localStorage.getItem("end_time"))+"</h1>");
        }

        localStorage.removeItem("goto_result");
      }
  };

});

 
// Make quiz data & Store it as JSON
function make_quiz(size) {
    quizzes = new Array();
    is_picked = new Array();
    var ran;

    for(var i=0; i<size; i++){
        var obj = new Object();

        do {
            ran = Math.floor(Math.random() * (songs.length-1));
        } while(is_picked.includes(ran));

        obj.title = songs[ran].title;
        obj.album = songs[ran].album;
        obj.result = false;

        is_picked.push(ran);

        quizzes.push(obj);
    }

    localStorage.setItem('quizzes', JSON.stringify(quizzes));
    localStorage.setItem('quiz_num', 1);
    localStorage.setItem('start_time', new Date());
};


// Move to next quiz
function continue_quiz(album_code) {
    quizzes = localStorage.getItem("quizzes");
    quizzes = JSON.parse(quizzes);
    size = localStorage.getItem("size");
    quiz_num = localStorage.getItem("quiz_num");
    mode = localStorage.getItem("mode");

    // Check
    // alert("quizzes: "+quizzes[quiz_num].title+" / stage: "+quiz_num+" / size: "+size+" / album: "+quizzes[quiz_num].album);

    // Stage info
    // $("#show").text(stage+"/"+size);

    // Answer check
    if(album_code == quizzes[quiz_num-1].album 
      || (quizzes[quiz_num-1].title == "아 몰라 일단 Do The Dance" && album_code == 1) 
      || (quizzes[quiz_num-1].title == "아 몰라 일단 Do The Dance" && album_code == 2) 
      || (quizzes[quiz_num-1].title == "Lean on me" && album_code == 1) 
      || (quizzes[quiz_num-1].title == "Lean on me" && album_code == 2) 
      || (quizzes[quiz_num-1].title == "뇌비우스의 띠 (Feat. ESBEE)" && album_code == 1) 
      || (quizzes[quiz_num-1].title == "뇌비우스의 띠 (Feat. ESBEE)" && album_code == 2)
      ){
        quizzes[quiz_num-1].result = true;
        // alert("Good");
    }
    else {
        // alert("Oh, no");
    }

    quiz_num++;
    localStorage.setItem('quiz_num', quiz_num);
    localStorage.setItem('quizzes', JSON.stringify(quizzes));

    // Finished the quizzes
    if(quiz_num > size){
        localStorage.setItem('end_time', new Date());
        localStorage.setItem('goto_result', true);
        location.href = "quiz-score.html";
    }
};
