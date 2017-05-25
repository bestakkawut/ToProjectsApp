
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
    }
};
