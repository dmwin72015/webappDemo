seajs.config({
    // 别名配置
    alias: {
        'jquery': "modules/seaJquery.js",
        'datatable': 'modules/seaJqueryDatatable.js',
        'index': 'index.js'
    },
    //变量配置
    vars: {
        'locale': 'other'
        //可以再require的参数中使用，在普通字符串中无效
        //var a = require('{locale}/a'); 有效
        //var啊= '{locale}' ; 无效
    },
    // 提前加载并初始化好指定模块
    preload: ['jquery']
});
define(function (require, exports, module) {
    var $ = require('jquery');
    require('datatable')();
    /***公共方法 START***/

    //匹配邮箱的正则表达式
    function regMail(mail) {
        var regMail = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/g;
        return regMail.test(mail);
    }

    //匹配IP的正则表达式
    function regIP(IP) {
        var regIP = /^(\d{1,2}|1\d{2}|2[0-5]{2})\.(\d{1,2}|1\d{2}|2[0-5]{2})\.(\d{1,2}|1\d{2}|2[0-5]{2})\.(\d{1,2}|1\d{2}|2[0-5]{2})$/g;
        return regIP.test(IP);
    }

    //匹配手机号码的正则表达式
    function regPhone(phone) {
        var regPhone = /^(1[34578][0-9]{9})|(1[34578][0-9]-[0-9]{4}-[0-9]{4})|(1[34578][0-9]-[0-9]{8})$/g;
        return regPhone.test(phone);
    }

    //匹配QQ号码的正则表达式
    function regQQ(QQ) {
        var regQQ = /^[0-9]{5,11}$/g;
        return regQQ.test(QQ);
    }

    //判断元素之间的包含关系,f表示是否可以包含自己
    function isContain(a, b, f) {
        return a.compareDocumentPosition
            ? (function (a, b) {
            return (f ? a === b : !!0) || (!!(a.compareDocumentPosition(b) & 16));
        }(a, b))
            : (function (a, b) {
            return !!f && a.contains(b)
        }(a, b));
    }

    /***公共方法 END***/
    $(function () {
        //右侧菜单滑动效果
        var $Li = $('#menu_son_tab li');
        if ($Li.length > 0) {
            var $bot_line = $('#bot_line').css({
                width: $Li.eq(0).outerWidth() + 'px',
                left: $Li[0].offsetLeft + 'px'
            });
            $Li.on({
                'mouseover': function () {
                    $bot_line.stop().animate({
                        left: $(this).position().left,
                        width: $(this).outerWidth()
                    }, 200)
                },
                'mouseout': function (ev) {
                    var oTo = ev.relatedTarget.parentNode,
                        oSr = this.parentNode;
                    if (!isContain(oSr, oTo)) {
                        var oCur = $('#menu_son_tab li.current').eq(0);
                        $bot_line.stop().animate({
                            left: oCur.position().left,
                            width: oCur.outerWidth()
                        }, 200)
                    }
                },
                'click': function (ev) {
                    var i = $(this).index();
                    $(this).addClass('current').siblings().removeClass('current');
                    $('.main_body_tab').eq(i).show().siblings().hide();
                }
            });
        }
        //提示消息隐藏
        $('.notices_msg_close').on('click', function () {
            $('.notices_detail_box').hide();
        });
        //复选框选中
        $('.checkbox_label').on('click', function () {
            $(this).find('.icon_check').toggleClass('selected');
            return false;
        });
        //登录页面，合作伙伴图标动画
        $('.icon_case').hover(function () {
            $(this).addClass('on');
        }, function () {
            $(this).removeClass('on');
        })
    });
    $(function () {
        var oTable = $('#mydataTable').dataTable({
            ajax: 'data/data.json',//数据源
            columns: [              //列定义，对应的数据源中的json的value（切记不是key，key都是规定的值:data）。
                {data: 'reg_user'},
                {data: 'promoter'},
                {data: 'money'},
                {data: 'time'}
            ],
            displayLength:15,//设置每页的数量
            lengthMenu: [[15, 30, 45, -1], ["15条", "30条", "45条", "所有"]],//设置翻页选项的条数，第一个是数量，第二个是对应的名字（可不写）
            dom: '<"onTableTop"lf>rt<"afterTableBot"pi><"clear">',
            //dom:'<"toolbar">frtip',
            language: {
                url: 'i18n/zh_CN.json'
            },
            columnDefs: [{//列渲染，针对于每一列的操作，例如数据处理，修改样式等等。
                'render': function (data, type, row) {
                    return data + '(' + row['money'] + ')';
                },
                'targets': 0
            }],
            createdRow: function (row, data, index) {//创建行回调，就是针对每一行进行操作，例如数据处理，修改样式等等。
                //row 每行dom元素
                //data 所有数据
                //index 行号
                if (data['money'].replace(/\$|\,/g, '')>500) {
                    $('td',row).eq(2).css({
                        'color':'red',
                        'font-weight':'bold'
                    })
                }
            },
            //当处理大数据时，延迟渲染数据，有效提高Datatables处理能力
            "deferRender": true
        });
        $('div.toolbar').append($('div.page_wrap'));
    });
    module.exports = {
        info: {
            version: '1.1.0',
            author: 'Dongmin'
        },
        isMail: regMail,
        isIP: regIP,
        isQQ: regQQ,
        isPhone: regPhone
    }
});
