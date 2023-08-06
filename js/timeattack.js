
$(function() {
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

          if(localStorage.getItem("titleboxcolor") == "true")
            $("#randomTitle").css("background-color", "#f3c4c4");
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

});


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

        quiz_num++;
        localStorage.setItem('quiz_num', quiz_num);
        localStorage.setItem('quizzes', JSON.stringify(quizzes));
        localStorage.setItem('titleboxcolor', false);
    
        // Finished the quizzes
        if(quiz_num > size){
            localStorage.setItem('end_time', new Date());
            localStorage.setItem('goto_result', true);
            location.href = "timeattack-score.html";
        }
    }
    else {
        localStorage.setItem('titleboxcolor', true);
    }

};
