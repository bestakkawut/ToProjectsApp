var fs = require('fs');

module.exports = {
    cl_games: function(id){
        if(!id){
            //คำถาม
            var choice = [
                '#E805E7', // violet
                '#05E85E', // green
                '#1259FF', // blue
                '#FFF100', // yellow
                '#FF6600'  // orange
            ];
            var qs,popout;
            var que = [];
            var j = k = choice.length;
        
            for(var i = 0 ;i < k ; i++){
                qs = choice[Math.floor(Math.random()*j)];
                iqs = choice.indexOf(qs);
                popout = choice.splice(iqs,1);
                que[i] = qs;
                j--;
            }
            
            return que;
        }
    },


    switchInput: function(io,value,led,socket){
        if(value==1){
            led.writeSync(value);
            socket.emit('new message', {msg:{stat:true,data:io}});
        }else{
            led.writeSync(0);
            // socket.emit('new message', {msg:{stat:false,data:'error switchInput function'+io}});
        }    
    },

    saveScoreToLog: function(obj,game,n){        
        var file = __dirname+"/log/games_"+game+"/"+n+"_"+game+".txt";
        var logger = fs.createWriteStream(file);
        logger.write('เกมที่ :'+game+' \r\n');
        logger.write('คะแนน:'+obj.score+'\r\n');
        logger.write('เวลา:'+obj.time+'\r\n');
        logger.write('ถูก:'+obj.true+'ครั้ง'+' ผิด:'+obj.false+'ครั้ง');
        logger.close;
    }
    
};
 