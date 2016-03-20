/**
 * Created by Administrator on 2015/8/18.
 */
window.onload = window.onresize = function () {
    var view_width = document.getElementsByTagName('html')[0].getBoundingClientRect().width;

    var _html = document.getElementsByTagName('html')[0];

    if (view_width > 640)
    {
        _html.style.fontSize = 640 / 16 + 'px';
    }
    else
    {
        _html.style.fontSize = view_width / 16 + 'px';
    }
}

$(function(){
    FastClick && FastClick.attach(document.body);

    $('#submit').click(function(){

        var oInput = $('#tel');

            if( oInput.val()=="" || ( oInput.val()!="" && !/^1((3|5|8){1}\d{1}|70)\d{8}$/.test(oInput.val()) ) ){
                //$(this).attr('placeholder','请输入正确的手机号码');
                alert('请输入正确的手机号码.');
            }else{
                $('#tel_a2').html($('#tel').val());
                $('.contains_a1').hide();
                $('.contains_a2').show();
            }
    })


})