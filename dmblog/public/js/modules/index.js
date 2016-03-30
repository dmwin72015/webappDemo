seajs.config({
    alias: {
        'jquery': 'modules/sea-jquery',
        'datatable': 'modules/sea-jquery-datatable',
        'easing': 'modules/sea-jquery-easing',
        'index': 'modules/index'
    }
});
define(function (require, exports, module) {
    var $ = require('jquery');
    var $datatable = require('datatable')($);
    var $easing = require('easing')($);
    $(function () {
        var nav = $('#nav');
        var oBgBlock = $('#textbg');
        var timer = null;
        $('.nav>ul>li').on({
            'mouseover': function (ev) {
                var _this = $(this);
                timer = setTimeout(function () {
                    oBgBlock.stop().animate({
                        width: _this.outerWidth(),
                        left: _this.position().left
                    }, 300);
                }, 200);
            },
            'mouseout': function (ev) {
                if (!$.contains(nav[0],oBgBlock[0])) {
                    var oCurr = $('li.cuurent');
                    oBgBlock.stop().animate({
                        width: oCurr.outerWidth(),
                        left: oCurr.position().left
                    }, 300);
                }
                clearTimeout(timer);
            }
        });
    });
    //判断某一个元素实在包含另一个元素
    function isContains(o1, o2) {
        if (o1.compareDocumentPosition) {
            //TODO compareDocumentPosition返回值有点问题
            return o1 === o2 || !!(o1.compareDocumentPosition(o2) === 20);
        }
        if (o1.contains && o1.nodeType === 1) {
            return o1.contains(o2) && o1 !== o2;
        }
        while (o1 = o1.parentNode) {
            if (o1 === o2) {
                return true;
            }
            return false;
        }
    }
})