$(".delete").click(function (button) {
  if(confirm("삭제하시면 복구할 수 없습니다. 정말 삭제하시겠습니까?")){
    var num = button.target.dataset.id;
    $.ajax({
      method: "DELETE",
      url: "/posts/" + num,
    })
     .done(function (결과) {
      location.reload();
    })
    .fail(function (xhr, textStatus, errorThrown) {
      console.log(xhr, textStatus, errorThrown);
    });
  }
});

$(".delete-send").click(function () {
    if ($(".delete-on").css("display") == "none") {
      $(".delete-on").show();
    } else {
      $(".delete-on").hide();
    }
});

$(".dday_button").click(function(){
  $(".vanish").fadeIn();
  $("#list").fadeOut();
  $("#picture").fadeOut();
});

$(".back").click(function(){
  $(".vanish").fadeOut();
  $("#list").fadeIn();
  $("#picture").fadeIn();
})

var year = new Date().getFullYear();
var date = new Date("12,31,2022").getTime();
var now = new Date();
var year = now.getFullYear();
var dday = Math.floor((date - now) / (1000 * 60 * 60 * 24)) + 1;
//dday = 0;
$("#d-day").html(dday);
$("#year").html(year);

var date = new Date("2,28,2022 00:00:00").getTime();
var now = new Date().getTime();
var time=Math.floor((date-now)/(1000));
var day=1;
var hour=1;
var min=1;
var sec=1;

var x=setInterval(function(){
  day=parseInt(time/(60*60*24));
  hour=parseInt((time/(60*60))%24);
  min=parseInt((time/60)%60);
  sec=time%60;
    
  $("#d-day").text(day+1);
  $("#demo").text(day + "일 " + hour + "시간 " + min+"분 "+sec+"초");
  time--;

  if ((day<=0)&&(hour<=0)&&(min<=0)&&(sec<=0)) {
    $(".vanish").hide();
    $("#list").show();
    $("#list").attr("id", "list-dday");
    $("#picture").hide();
    $(".delete-send").hide();
    $(".add").hide();
    $(".post").css({ "pointer-events": "ato","font-weight":"bold" });
    $(".dday-congratulation").show();
    $(".last-day").hide();
  }

  if(time<0)
  {
      clearInterval(x);
  }
},1000);

$(window).resize(function (){
  var width_size = window.outerWidth;
        
  if (width_size <= 1000) {
    $("#picture").css({"right":"0%", "position":"static"});
    $("#list").css({"left":"0%" , "position":"static"});
  } else{
    $("#picture").css({"right":"55%" , "position":"absolute"});
    $("#list").css({"left":"55%" , "position":"absolute"});
  }
});

function empty_check(){
  var title=$('.title').val();
  var content=$('.content').val();

  if(title=="")
  {
      swal("제목을 입력하세요.");
      return false;
  }
  if(content=="")
  {
      swal("내용을 입력하세요.");
      return false;
  }
}