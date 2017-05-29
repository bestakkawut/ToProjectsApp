var fs = require('fs');
fs.writeFile(__dirname+"/log",'hey threre',function(err){
    if(err){
        return console.log(err);
    }
    console.log('file was saved');
});
module.exports = {
    cl_games: function(id){
        if(!id){
            //คำถาม
            var choice = [
                '#E805E7', // violet
                '#05E85E', // green
                '#1259FF', // blue
                '#FFF100' // yellow
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
            socket.emit('new message', {msg:{stat:false,data:'error switchInput function'+io}});
        }    
    }


    

};
