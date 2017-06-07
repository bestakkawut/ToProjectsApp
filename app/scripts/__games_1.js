

    $(document).ready(function(){
        games_start();

        socket.on('new message', function(msg){
            switch(msg.data) {
                case 'btn0':
                    document.getElementById("#btn0").click();
                    break;
                case 'btn1':  
                    document.getElementById("#btn1").click();
                    break;
                case 'btn2':  
                    document.getElementById("#btn2").click();
                    break;    
            }
        });        

    });
    
    function games_start(){
        var qs,iqs,popout,_qchoice = [];
        if(iquestion!=0){  
            // qs เลือกคำถามใน array question
            if( question.length < 1){
                question = _question;
                _question = [];
                qs = question[Math.floor(Math.random()*question.length)];
                console.log('ifquestion: '+qs);
                _qchoice = randomQuestion(qchoice,3,qs);
            }else{
                qs = question[Math.floor(Math.random()*question.length)]; 
                _qchoice = randomQuestion(qchoice,3,qs);   
            }
            
            $('.games').text(maxtimes);    
            clear_field();
            // กำหนดคำถาม
            $(".question").css("background-color",qs);
            // กำหนดตัวเลือก 
            for(var x in _qchoice){
                $(".answer_box").append("<button id=#btn"+x+" class='answer_choice' "
                +"style='background-color:"+_qchoice[x]+"' "
                +"onclick=check_answer('"+_qchoice[x]+"','"+qs+"')"  //ใส่ฟังชั่นตรวจคำตอบ
                +"></button>");
            }          
            // หาที่อยู่ของคำถามใน array  
            iqs = question.indexOf(qs);
            // ตัดคำถามที่ได้ออกจาก array เพื่อไม่ให้สุ่มซ้ำขึ้นมาอีก
            _question.push(question.splice(iqs,1));
            console.log('games_start _question: '+_question);   
            console.log(iquestion);
            
        }else{
            //จบเกม
            end_games();
        }
        
    }

    // ฟังชั่นตรวจคำตอบ
    function check_answer(choice,answer){
        if(iquestion!=0){
            if(choice != answer){
                // ตอบผิด
                // wrong 
                saveResponse(false);
                $('.process').text('YOU ARE WRONG');
                console.log('YOU ARE WRONG');
            }else{
                // ตอบถูก
                //correct
                $('.process').text('NEXT QUESTION');
                console.log('NEXT QUESTION'); 
                // เพิ่มคะแนนทีละ 1
                scores++;
                saveResponse(true,seconds,scores);    
                // ทำให้เวลาเริ่มนับ0ใหม่         
                seconds = 0;                
                // ลดจำนวนคำถาม
                iquestion--;
                games_start();
            }
        }else{
            //จบเกม
            end_games();
        }
    }

    // ฟังชั่น จบเกม
    function end_games(){
        if(maxtimes <= 4){                      
            $('.process').text('Next games incoming');     
            saveScoretoLog(answer,maxtimes,n);
            maxtimes++;
            iquestion = 5;   
            console.log('true:'+answer.true+' false:'+answer.false);
            console.log('time:'+answer.time+' score:'+answer.score);
            answer.true = answer.time = answer.false = answer.score =  0;
            delaying();
        }else{
            iquestion = 0;
            maxtimes = 0;
            clearInterval(timer);
            $('.process').text('GAMES END');
            clear_field();
            console.log('GAMES END');
        }
        
    }
    // ฟังชั่นล้างinterface
    function clear_field(){
         $(".question").css("background-color","white");
         $('.timer').text(0);
         $('.answer_box').empty();         
    }

    function delaying(){
        var sec=3;
        clear_field();
        $('.timer').text(sec);        
        var delaytime = setInterval(function(){            
                sec--;
                $('.timer').text(sec);
                if(sec==0){
                    console.log('iquestion:'+iquestion);
                    clearInterval(delaytime);
                    games_start();
                }
            },1000);
    }


/// save file
    function saveResponse(ans,sec,scor){
        if(ans){
            answer.true += 1;
            answer.time += sec;
            answer.score = scor;
        }else{
            answer.false += 1;
        }
    }

    function saveScoretoLog(obj,games,n){
        
        $.ajax({
            url: 'http://'+window.location.host+'/games/saving/'+games+'/'+n,
            type: 'POST',
            data: obj,
            success:function(data){
                console.log('send data succeed');
            },
            error:function(jq,err){
                console.log('error : '+err);
            }
        });
        
    }