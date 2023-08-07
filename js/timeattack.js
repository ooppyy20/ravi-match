

// Move to next quiz
function continue_quiz(album_code) {
    quizzes = localStorage.getItem("quizzes");
    quizzes = JSON.parse(quizzes);
    size = localStorage.getItem("size");
    bg_ran = localStorage.getItem("bg_ran");
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

        // Refresh
        if(quiz_num <= size) {
            // alert("제목 가져오는 중...");

            $("#randomTitle").text(quizzes[quiz_num-1].title);
            $("#randomTitle").animate({ top: 0, left: 0 }, 0);
            $("#randomTitle").css("background-color", "#ffffff");
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
        else if(bg_ran == 3){
            $(".background").css("background-image","url('resources/img/background_w.jpg')");
        }

        if(quiz_num <= size)  
            $("#progress").text(quiz_num+"/"+size);

        // Finished the quizzes
        if(quiz_num > size){
            localStorage.setItem('end_time', new Date());
            localStorage.setItem('goto_result', true);
            location.href = "timeattack-score.html";
        }
    }
    else {
        localStorage.setItem('titleboxcolor', true);
        $("#randomTitle").animate({ top: 0, left: 0 }, 0);
        $("#randomTitle").css("background-color", "#f3c4c4");
        $("#randomTitle").effect("shake", {direction: "down", times: 1, distance: 7}, 200);
    }

};
