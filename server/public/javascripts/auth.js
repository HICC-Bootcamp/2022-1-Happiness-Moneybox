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

  function passwordSame(){
    var password=document.getElementById('password').value;
    var passwordCheck=document.getElementById('passwordCheck').value;

    if(!((password=="")&&(passwordCheck=="")))
    {
      if(password==passwordCheck){
         document.getElementById('passwordCheck_alert').textContent='비밀번호가 일치합니다.'; 
         document.getElementById('passwordCheck_alert').style.color='blue';
         document.getElementById('password').setAttribute("check_result", "success");
        }
      if((password!=passwordCheck))
      {
        document.getElementById('passwordCheck_alert').textContent='비밀번호가 일치하지 않습니다.';
        document.getElementById('passwordCheck_alert').style.color='red';
        document.getElementById('password').setAttribute("check_result", "fail");
       } 
    }
    else
    {
      document.getElementById('passwordCheck_alert').textContent='';
    }
  }
  
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

    if ($("#password").attr("check_result") == "fail") {
      swal("비밀번호가 일치하는지 확인해주십시오.");
      return false;
    }
  });