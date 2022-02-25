
var time=10;
var min="";
var sec="";

var x=setInterval(function(){
    min=parseInt(time/60);
    sec=time%60;

    $("#demo").text(min+"분 "+sec+"초 ");
    time--;

    if(time<0)
    {
        clearInterval(x);

        /*

        swal("축하합니다");
        $('.vanish').remove();

        */
    }

    
},1000);




 




