var flag = 1;
var flag1 = 1;

$('#mobile').blur(function(){
    var reg = /^(1[0-9][0-9]|15[0-9]|18[0-9])\d{8}$/;
    var mobile = $('#mobile').val();

    if ((mobile == '') || (mobile == "请输入您的手机号")) {
        $(".row1").remove();
        $("#mobile").removeClass("bor_green");
        flag1 = 0;
        return false;
    }if (!reg.test(mobile)) {
        $(".row1").remove();
        $("#mobile").after('<em class="bg_red row1">手机号码格式不正确</em>');
        $("#mobile").addClass("bor_red");
        flag1 = 0;
        return false;
    }else{
        /*$.post("/user/check_mobile_reg", {mobile:mobile},function(data){
         if(data == '1'){
         $("#mfyzm1").attr('src','/user/seccode/?t=' + Math.random());
         $(".row1").remove();
         $("#mobile").after('<b class="row1">用户名已存在</b>');
         //$("#mobile").addClass("bor_red");
         flag1 = 0;
         return false;
         }else{
         $(".row1").remove();
         $("#mobile").after('<b class="row1" style=" display:none;"></b>');
         $("#mobile").removeClass("bor_green");
         flag1 = 1;
         return true;
         }
         });*/
        $(".row1").remove();
        $("#mobile").after('<em class="row1" style=" display:none;"></em>');
        $("#mobile").removeClass("bor_green");
        flag1 = 1;
        return true;
    }
});

/*$('#invite').blur(function(){
 var invite = $('#invite').val();
 var reg = /^\d{8}$/;
 if ((invite == '') || (invite == '请输入8位数邀请码')) {
 $(".row4").remove();
 return false;
 }
 if (invite.length != 8) {
 $(".row4").remove();
 $("#invite").removeClass("bor_green");
 $("#invite").after('<p class="msg_box bg_red row4">请输入8位数字邀请码</p>');
 return false;
 }else{
 $.post("index.php?act=login&op=check_invite", {invite:invite},function(data){
 if(data == '0'){
 $(".row4").remove();
 $("#invite").after('<p class="msg_box bg_red row4">邀请码不存在</p>');
 return false;
 }else{
 $(".row4").remove();
 return true;
 }
 });
 }
 });*/

countdown=120;
function settime(obj) {
    if (countdown == 0) {
        $("#mfyzm").removeAttr("disabled")
        $("#mfyzm").val("免费获取短信验证码");
        countdown = 120;
        return false;
    } else {
        $("#mfyzm").attr("disabled", true);
        $("#mfyzm").val("重新发送(" + countdown + ")");
        countdown--;
    }
    setTimeout(function(){settime(obj);},1000)
}

function sendmes2(){
    var obj = $(this);
    var mobile = $.trim($("input[id='mobile']").val());
    var password = $.trim($("input[id='password']").val());
    var password_confirm = $.trim($("input[id='password_confirm']").val());
    var scode = $("#scode").val();


    if(mobile=='请输入您的手机号'){
        $(".row1").remove();
        $("#mobile").after('<em class="bg_red row1">请输入手机号</em>');
        return false;
    }else if(password==''){
        $(".row2").remove();
        $("#password").after('<em class="bg_red row2">请输入密码</em>');
        return false;
    }else if(password_confirm==''){
        $(".row3").remove();
        $("#password_confirm").after('<em class="bg_red row3">请输入确认密码</em>');
        return false;
    }else if(password!=password_confirm) {
        $(".row3").remove();
        $("#password_confirm").after('<em class="bg_red row3">输入密码不一致</em>');
        //$("#password_confirm").addClass("bor_red");
        return false;
    }else if(scode == ''){

        alert("请输入验证码");
        return false;

    }else{

    }

    //var data = "mobile="+mobile;
    $.ajax({
        url: "/sms/get_sms_code",
        type: 'POST',
        dataType: "json",
        timeout: 15000,
        cache: false,
        data: {mobile:mobile,scode:scode},
        success: function(response, msg, settings){
            $("#mfyzm1").attr('src','/user/seccode/?t=' + Math.random());
            if(response.result == 'T'){
                //alert(response.showInfo);
                settime(obj);
                return true;
            }else{
                alert(response.msg);
                return false;
            }
        },
        error:	function(XMLHttpRequest,event,ajaxOptions, thrownError){
        }
    });
}



function check_mobile_reg(mobile,scode){
    $.post("/user/check_mobile_reg", {mobile:mobile,scode:scode},function(data){
        if(data == '1'){
            $("#mfyzm1").attr('src','/user/seccode/?t=' + Math.random());
            $(".row1").remove();
            $("#mobile").after('<em class="bg_red row1">用户名已存在</em>');
            //$("#mobile").addClass("bor_red");
            flag1 = 0;
        }else if(data == '3'){
            $("#mfyzm1").attr('src','/user/seccode/?t=' + Math.random());
            alert('验证码错误');
            flag1 = 0;
        }else if(data == '2'){

        }else{
            $("#mfyzm1").attr('src','/user/seccode/?t=' + Math.random());
        }
    });
}

$('#captcha').blur(function(){
    var mobile = $('#mobile').val();
    var captcha = $('#captcha').val();
    if(captcha==''){
        $(".row5").remove();
        $("#mfyzm").after('<em class="bg_red row5">请输入短信验证码</em>');
        flag = 0;
        return false;
    }
    if(mobile==''){
        $(".row5").remove();
        $("#mfyzm").after('<em class="bg_red row5">未获取短信验证码</em>');
        $("#captcha").removeClass("bor_green").addClass("bor_red");
        flag = 0;
        return false;
    }
    $(".row5").remove();
    flag = 1;
    /*$.post("index.php?act=login&op=check_mobile", {mobile:mobile,captcha:captcha},function(data){
     if(data == '0'){
     $(".row5").remove();
     //$("#captcha").removeClass("bor_green").addClass("bor_red");
     $("#mfyzm").after('<em class="bg_red row5">短信验证码错误</em>');
     flag = 0;
     return false;
     }else{
     flag = 1;
     $(".row5").remove();
     //$("#captcha").removeClass("bor_green");
     return true;;
     }
     });*/
});

$(function () {
    $("#registerBtn").click(function () {
        var user = $("#mobile").val();
        var password = $("#password").val();
        if ((user == "") || (user == "请输入您的手机号")) {
            $("#mobile").next('em').remove();
            $("#mobile").after('<em class="bg_red row1">请输入您的手机号</em>');
            //$("#mobile").addClass("bor_red");
            flag = 0;
        }
        if (password == "") {
            $("#password").next('em').remove();
            $("#password").after('<em class="bg_red row2">请输入6-24位字符,区分大小写</em>');
            $("#password").addClass("bor_red");
            flag = 0;
        } else {
            if (password.length < 6 || password.length > 24) {
                $(".row2").remove();
                $("#password").after('<em class="bg_red row2">请输入6-24位字符,区分大小写</em>');
                $("#password").addClass("bor_red");
                flag = 0;
            }
        }

        if ($("#password_confirm").val() == "") {
            $(".row3").remove();
            $("#password_confirm").after('<em class="bg_red row3">请输入6-24位字符,区分大小写</em>');
            $("#password_confirm").addClass("bor_red");
            flag = 0;
        }
        if (password != ($("#password_confirm").val())) {
            $(".row3").remove();
            $("#password_confirm").after('<em class="bg_red row3">输入密码不一致</em>');
            $("#password_confirm").addClass("bor_red");
            flag = 0;
        }
        if ($("#scode").val() == "") {
            $(".row4").remove();
            $("#scode").after('<em class="bg_red row4">请输入验证码</em>');
            $("#scode").addClass("bor_red");
            flag = 0;
        }
        if ($("#captcha").val() == "") {
            $(".row5").remove();
            $("#mfyzm").after('<em class="bg_red row5">请输入短信验证码</em>');
            $("#captcha").addClass("bor_red");
            flag = 0;
        }
        if (flag == 1 && flag1 == 1) {
            $("#register_form").submit();
            return false;
        } else {
            return false;
        }
    });

    $("#mobile").focus(function () {
        $(".row1").remove();
        $("#mobile").after('<em class="bg_gray row1">请输入您的手机号码</em>');
        $("#mobile").removeClass("bor_red").addClass("bor_green");
    });
    $("#password").focus(function () {
        $(".row2").remove();
        $("#password").after('<em class="bg_gray row2">请输入6-24位字符,区分大小写</em>');
        $("#password").removeClass("bor_red").addClass("bor_green");
    });
    $("#password_confirm").focus(function () {
        $(".row3").remove();
        $("#password_confirm").after('<em class="bg_gray row3">请再次输入密码</em>');
        $("#password_confirm").removeClass("bor_red").addClass("bor_green");
    });
    $("#scode").focus(function () {
        $(".row4").remove();
        //$("#scode").after('<em class="row4">请输入验证码</em>');
        $("#scode").removeClass("bor_red").addClass("bor_green");
    });
    $("#captcha").focus(function () {
        $(".row5").remove();
        $("#mfyzm").after('<em class="bg_gray row5">请输入短信验证码</em>');
        $("#captcha").removeClass("bor_red").addClass("bor_green");
    });

    $("#password").blur(function () {
        var pass = $(this).val();
        if (pass.length > 0) {
            if (pass.length < 6 || pass.length > 24) {
                $(".row2").remove();
                $("#password").after('<em class="bg_red row2">请输入6-24位字符,区分大小写</em>');
                $("#password").addClass("bor_red");
                flag = 0;
            } else {
                $(".row2").remove();
                $("#password").removeClass("bor_green");
            }
        } else {
            $(".row2").remove();
            $("#password").removeClass("bor_green");
        }
    });

    $("#password_confirm").blur(function () {
        var pass = $(this).val();
        if (pass.length == 0) {
            $(".row3").remove();
            $("#password_confirm").removeClass("bor_green");
            flag = 1;
        }
    });

    $("#password,#password_confirm").blur(function () {
        if ($("#password").val() != "" && $("#password_confirm").val()!=""){
            if (($("#password").val()) != ($("#password_confirm").val())) {
                $(".row3").remove();
                $("#password_confirm").after('<em class="bg_red row3">输入密码不一致</em>');
                $("#password_confirm").addClass("bor_red");
                flag = 0;
            } else {
                $(".row3").remove();
                $("#password_confirm").removeClass("bor_green");
                flag = 1;
            }
        }
    });

    $("#captcha").blur(function () {
        var inv = $(this).val();
        if (inv.length == 0) {
            $(".row5").remove();
            $("#captcha").removeClass("bor_green");
            //$("#sendsms").after('<p class="msg_box bg_red row4">请输入短信验证码</p>');
        }
    });
});
