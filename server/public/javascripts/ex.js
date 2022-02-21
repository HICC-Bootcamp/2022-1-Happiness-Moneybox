

function passwordSame(){
  var password=document.getElementById('password').value;
  var passwordCheck=document.getElementById('passwordCheck').value;
  var nickname=document.getElementById('nickname').value;

  if(!((password=="")&&(passwordCheck=="")))
  {
    if(password==passwordCheck){
       document.getElementById('passwordCheck_alert').textContent=' 비밀번호가 일치합니다.'; 
       document.getElementById('passwordCheck_alert').style.color='black';
      }
    if((password!=passwordCheck))
    {
      document.getElementById('passwordCheck_alert').textContent='비밀번호가 일치하지 않습니다.';
      document.getElementById('passwordCheck_alert').style.color='red';
     } 
  }
  
}

