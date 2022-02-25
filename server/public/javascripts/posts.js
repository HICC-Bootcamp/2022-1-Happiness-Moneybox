$(".delete").click(function (e) {
  var 글번호 = e.target.dataset.id;
  var 지금누른거 = $(this);
  $.ajax({
    method: "DELETE",
    url: "/posts/" + 글번호,
  })
    .done(function (결과) {
      console.log("삭제 성공했어용");
      지금누른거.parent("td").parent("tr").fadeOut();
    })
    .fail(function (xhr, textStatus, errorThrown) {
      console.log(xhr, textStatus, errorThrown);
    });
});

$(".delete-send").click(function () {
    if ($(".delete-on").css("display") == "none") {
      $(".delete-on").show();
    } else {
      $(".delete-on").hide();
    }
});

  var date = new Date("12,31,2022").getTime();
  var now = new Date();
  var year = now.getFullYear();
  var dday = Math.floor((date - now) / (1000 * 60 * 60 * 24)) + 1;
  //dday = 0;
  $("#d-day").html(dday);
  $("#year").html(year);

  if (dday == 0) {
    $("#list").attr("id", "list-dday");
    $("#picture").hide();
    $(".delete-send").hide();
    $(".add").hide();
    $(".post").css({ "pointer-events": "ato","font-weight":"bold" });
    $(".dday-congratulation").show();
    $(".last-day").hide();
  } else {
    $("#list").attr("id", "list");
    $("#picture").show();
    $(".delete-send").show();
    $(".add").show();
    $(".post").css({ "pointer-events": "none","font-weight":"normal" });
    $(".dday-congratulation").hide();
    $(".last-day").show();
  }

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