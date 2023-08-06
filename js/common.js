


// Global Variables
var size = 0;
var quiz_num = 0;
var quizzes = null;


// When the document is loaded...
$(function() {

  // Background image load
    if(localStorage.getItem('bg_ran') == null){
      var bg_ran = Math.floor(Math.random() * 3);
      localStorage.setItem('bg_ran', bg_ran);
    }
    
    if(localStorage.getItem('bg_ran') == 0) {
      $(".background").css("background-image","url('resources/img/background_r.jpg')");
    }
    else if(localStorage.getItem('bg_ran') == 1){
        $(".background").css("background-image","url('resources/img/background_y.jpg')");
    }
    else if(localStorage.getItem('bg_ran') == 2){
        $(".background").css("background-image","url('resources/img/background_b.jpg')");
    }

    // Things
    $("#randomTitle").draggable({
      // containment: "#body",
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
        continue_quiz($(this).attr("value"));
      }
    });




    // Select a mode
    $("#mode1").click(function(){
      size = 30;
      localStorage.setItem('mode', 1);
      localStorage.setItem('size', size);
      make_quiz(size);
    });

    $("#mode2").click(function(){
        size = 5;
        localStorage.setItem('mode', 2);
        localStorage.setItem('size', size);
        make_quiz(size);
    });

    // Refresh the random title

    if(localStorage.getItem('quizzes') != null) {
        quizzes = localStorage.getItem("quizzes");
        quizzes = JSON.parse(quizzes);
        bg_ran = localStorage.getItem("bg_ran");
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
          $("#randomTitle").animate({ top: 0, left: 0 }, 0);
        }
        
        if(bg_ran == 0) {
          $(".background").css("background-image","url('resources/img/background_r.jpg')");
        }
        else if(bg_ran == 1){
            $(".background").css("background-image","url('resources/img/background_y.jpg')");
        }
        else if(bg_ran == 2){
            $(".background").css("background-image","url('resources/img/background_b.jpg')");
        }

        $("#progress").text(quiz_num+"/"+size);
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

        if(localStorage.getItem('mode') == 1) {
            $("#scoreBox").append("<h1 id='score'>"+score+"/"+localStorage.getItem('size')+"</h1>");
        }
        else {
          $("#scoreBox").append("<h1 id='time'>"+(Date.parse(localStorage.getItem("end_time"))-Date.parse(localStorage.getItem("start_time")))/1000+"</h1>");
        }

        localStorage.removeItem("goto_result");
        localStorage.removeItem("bg_ran");
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

