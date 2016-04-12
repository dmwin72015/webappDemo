/**
 * Created by Administrator on 2015/8/18.
 */
! function(e, t) {
    var mresize = function() {
        var view_width = document.getElementsByTagName('html')[0].getBoundingClientRect().width;
        var n = Math.min(750, view_width);
        return n ? void(t.documentElement.style.fontSize = n / 16 + "px") : !1;
    };
    mresize();
    e.addEventListener("resize", mresize, !1);
    e.addEventListener("DOMContentLoaded", mresize, !1);
    e.addEventListener("load", mresize, !1);
}(window, document);

$(function() {
    // FastClick && FastClick.attach(document.body);
    // $('#birthday').mdatetimer(config);
    var currYear = (new Date()).getFullYear();
    var opt = {};
    opt.date = { preset: 'date' };
    opt.datetime = { preset: 'datetime' };
    opt.time = { preset: 'time' };
    opt.default = {
        theme: 'android-ics light', //皮肤样式
        display: 'modal', //显示方式 
        mode: 'scroller', //日期选择模式
        dateFormat: 'yyyy-mm-dd',
        lang: 'zh',
        showNow: true,
        nowText: "今天",
        startYear: currYear - 50, //开始年份
        endYear: currYear + 10 //结束年份
    };
    $("#birthday").mobiscroll($.extend(opt['date'], opt['default']));
    $('.sex_icon').click(function() {
        $(this).addClass('selected').siblings().removeClass('selected');
    })

    // $('#select_course').toggle(function(){
    //     $('.filter').show(),
    //     $('#').addClass('show');
    // },function(){
    //     $('.filter').hide(),
    //     $('#course').removeClass('show');
    // });
})
