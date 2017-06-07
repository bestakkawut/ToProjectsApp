
function in_array(array, el) {
    for(var i = 0 ; i < array.length; i++) 
        if(array[i] == el) return true;
    return false;
}


function randomQuestion(data,times,q){
    var que = [] , qs , iqs ,popout = [];
    // ตัดคำถาม
    for(var i = 0;i<data.length;i++){
        if(data[i]==q){
            popout = data.splice(data.indexOf(data[i]),1);
            break;
        }
    }
    console.log('randomData : ' + data);
    console.log('question in random:'+q+'question splice'+popout);
    var j  = data.length;    
    for(var i = 0 ;i < 2 ; i++){
        qs = data[Math.floor(Math.random()*j)];
        que.push(qs);
        iqs = data.splice(data.indexOf(qs),1);
        popout = popout.concat(iqs);
        j--;
    }
    qchoice = data.concat(popout);
    console.log(qchoice);
    que.splice( Math.floor(Math.random()*2) , 0 ,q );   
    return que;
    
}

