$(".id_input").change(function () {
    $(".id_input").attr("check_result", "fail");
    $(".id_check_success").hide();
    $(".id_check_button").show();
  });

$(".id_check_button").click(function () {
    var id = $(".id_input");
    
    if ((id.val() == "") || ($.trim(id.val()) != id.val())) {
      swal("아이디를 입력해주세요.");
      return;
    }

    $.ajax({
      method: "POST",
      url: "/auth/signup/id-check",
      data: { userId: id.val() },
    })
      .done(function (result) {
        if (result == "실패") {
          id.val("");
          swal("중복된 아이디입니다.");
        } else {
          swal("사용 가능한 아이디입니다.");
          id.attr("check_result", "success");
          $(".id_check_success").show();
          $(".id_check_success").css("display", "inline");
          $(".id_check_button").hide();
        }
      })
      .fail(function (xhr, textStatus, errorThrown) {
        alert("에러");
        console.log(xhr, textStatus, errorThrown);
      });
  });

  function selectEmail() {
    var $email2 = $("input[name=email2]"); 
    if ($("#select-email").val() == "1") {
      $email2.attr("readonly", false);
      $email2.val("");
    }  else {
      $email2.attr("readonly", true);
      $email2.val($("#select-email").val());
    }
  }

  $("form").submit(function () {
    if ($(".id_input").attr("check_result") == "fail") {
      swal("아이디가 중복인지 확인해주십시오.");
      return false;
    }
  });