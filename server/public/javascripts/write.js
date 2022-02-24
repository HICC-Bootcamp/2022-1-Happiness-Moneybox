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