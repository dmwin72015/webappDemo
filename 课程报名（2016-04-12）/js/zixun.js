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
$(function(t) {
	// body...
	$('#ask_list>dd').on('click',function(i,e){
		var n = $(this).attr('data-num');

	})
})