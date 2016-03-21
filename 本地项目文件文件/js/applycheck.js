//产品标题最大的长度限制
var MAX_TITLE_LENGTH_LIMIT = 16;
//检查长度
function checkProductTitleStringLength() {
    var title_value = $('#title').val();
    var title_string_length = title_value.toString().length;
    if (title_string_length > MAX_TITLE_LENGTH_LIMIT) {
        $('#title_length_notice').show();
        return false;
    } else {
        $('#title_length_notice').hide();
        return true;
    }
}

function ajaxUpdateData() {
    if (!checkBeforeSubmit()) {
        return false;
    }
    if (!window.confirm('确认修改并报名该活动吗?')) {
        return false;
    }
    $('#submit_ajax_button').val('正在提交');
    $('#submit_ajax_button').attr("disabled", "disabled");
    var AjaxURL = "/activity/manage_ajax_update?isjson=1";
    $.ajax({
        type: "POST",
        dataType: "json",
        url: AjaxURL,
        data: $('#ajax_submit_form').serialize(),
        success: function(result) {
            if (result.data.errno == 0) {
                $('#submit_ajax_button').val('报名成功');
                alert(result.data.errmsg);
                window.location.href = "/activity/manage_index";
            } else {
                $('#submit_ajax_button').attr("disabled", false);
                $('#submit_ajax_button').val('提交报名');
                alert(result.data.errmsg);
            }
        },
        error: function(data) {
            $('#submit_ajax_button').attr("disabled", false);
            $('#submit_ajax_button').val('提交报名');
            alert("error:" + data.responseText);
        }
    });
}

function ajaxSubmitData() {
    if (!checkBeforeSubmit()) {
        return false;
    }
    if (!window.confirm('确认报名该活动吗?')) {
        return false;
    }
    $('#submit_ajax_button').val('正在提交');
    $('#submit_ajax_button').attr("disabled", "disabled");
    var AjaxURL = "/activity/apply_ajax_submit?isjson=1";
    $.ajax({
        type: "POST",
        dataType: "json",
        url: AjaxURL,
        data: $('#ajax_submit_form').serialize(),
        success: function(result) {
            if (result.data.errno == 0) {
                $('#submit_ajax_button').val('报名成功');
                //alert(result.data.errmsg);
                window.location.href = "/activity/manage_index";
            } else {
                $('#submit_ajax_button').attr("disabled", false);
                $('#submit_ajax_button').val('提交报名');
                alert(result.data.errmsg);
            }
        },
        error: function(data) {
            $('#submit_ajax_button').attr("disabled", false);
            $('#submit_ajax_button').val('提交报名');
            alert("error:" + data.responseText);
        }
    });
}

//检查数量
function checkProductNumber() {
    var product_num_value = $('#product_num').val();
    var type = "^[0-9]*[1-9][0-9]*$";
    var re = new RegExp(type);
    if (product_num_value.match(re) == null || product_num_value < 0 || product_num_value > 10000) {
        $('#product_num_notice').show();
        return false;
    } else {
        $('#product_num_notice').hide();
        return true;
    }
}
//删除左右两端的空格
function jstrim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
//检查小数
function checkNumber2Point(total_money_value) {
    //小数点不能是第一个
    if(total_money_value.toString().indexOf('.') == 0){
        return false;
    }
    //判断小数位数；注意（indexOf 查找不到时返回的是 ‘-1’）
    if (total_money_value.toString().indexOf('.') >= 1) {
        var arr_data = total_money_value.toString().split('.');
        if (arr_data[1].length > 2 || arr_data[1].length < 1) {
            return false;
        }
    }
    if (isNaN(total_money_value)) {
        return false;
    }
    return true;
}

//检查原价
function checkProductOriginalPrice() {
    var current_price_value = $('#original_price').val();
    if (!checkNumber2Point(current_price_value)) {
        $('#original_price_notice').show();
        return false;
    }
    if (current_price_value <= 0 || current_price_value > 100000000) {
        $('#original_price_notice').show();
        return false;
    }
    $('#original_price_notice').hide();
    checkOriginalPriceAboutActivityType();
    return true;
}
//检查售价
function checkProductCurrentPrice() {
    var current_price_value = $('#current_price').val();
    if (!checkNumber2Point(current_price_value)) {
        $('#current_price_notice').show();
        return false;
    }
    if (current_price_value <= 0 || current_price_value > 100000000) {
        $('#current_price_notice').show();
        return false;
    }
    $('#current_price_notice').hide();
    checkCurrentPriceAboutActivityType();
    return true;
}
//提交前的检查
function checkBeforeSubmit() {
    var parent_cid_value = $('#first_cate').val();
    var sub_cid_value = $('#second_cate').val();
    var title_value = $('#title').val();
    if (!parent_cid_value || parent_cid_value == '0') {
        alert('请选择商品分类');
		$('#first_cate').focus();
        return false;
    }
    if (!sub_cid_value || sub_cid_value == '0') {
        alert('请选择商品分类');
		$('#second_cate').focus();
        return false;
    }
    if (!title_value) {
        alert('商品名称必须填写');
		$('#title').focus();
        return false;
    }
    if (!checkProductTitleStringLength()) {
        alert('商品名称必须小于等于16个汉字或者英文字母');
		$('#title').focus();
        return false;
    }
    if (!checkProductNumber()) {
        alert('商品数量请输入1-10000之间的正整数');
        return false;
    }
    if (!checkProductCurrentPrice()) {
        alert('售价请输入0.01-10000000之间的数字,最多保留2位小数');
        return false;
    }
    if (!checkProductOriginalPrice()) {
        alert('原价请输入0.01-10000000之间的数字,最多保留2位小数');
        return false;
    }
    var contact_username_value = jstrim($('#contact_username').val());
    var contact_wangwang_value = jstrim($('#contact_wangwang').val());
    var contact_email_value = jstrim($('#contact_email').val());
    var contact_mobile_value = jstrim($('#contact_mobile').val());
    var contact_qq_value = jstrim($('#contact_qq').val());
    if (!contact_username_value) {
        alert('联系人姓名为必填项,请输入');
        return false;
    }
    if (!contact_wangwang_value) {
        alert('卖家旺旺为必填项,请输入');
        return false;
    }
    if (!contact_email_value) {
        alert('联系邮箱为必填项,请输入');
        return false;
    }
    if (!isEmail(contact_email_value)) {
        alert('邮箱格式错误,请检查');
        return false;
    }
	if (!contact_mobile_value) {
        alert('联系手机为必填项,请输入');
        return false;
    }
	var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
    if(!myreg.test(contact_mobile_value)){
        alert('请输入有效的手机号码！');
        return false;
    }
    if (!contact_qq_value) {
        alert('联系QQ为必填项,请输入');
        return false;
    }
var	re = /^[0-9]{5,10}$/;
    if(!(re.test(contact_qq_value))){
        alert("联系QQ格式不正确"); 
        return false;
    }
    if (checkPostageStatusAboutActivityType() !== '') {
        alert(checkPostageStatusAboutActivityType());
        return false;
    }
    if (checkCurrentPriceAboutActivityType() !== '') {
        alert(checkCurrentPriceAboutActivityType());
        return false;
    }
    if (checkOriginalPriceAboutActivityType() !== '') {
        alert(checkOriginalPriceAboutActivityType());
        return false;
    }
    if (checkDiscountAboutActivityType() !== '') {
        alert(checkDiscountAboutActivityType());
        return false;
    }
	return true;
}
//邮箱格式检查
function isEmail(str) {
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    return reg.test(str);
}


//检查活动输入限制
function checkInputLimitByActivityTypeId() {
    // 切换报名提示文案
    changeApplyTips();

    // 检查包邮类型是否符合
    checkPostageStatusAboutActivityType();

    // 检查当前价格是否符合
    if (checkProductCurrentPrice()) {
        checkCurrentPriceAboutActivityType();
    }

    // 检查原价是否符合
    if (checkProductOriginalPrice()) {
        checkOriginalPriceAboutActivityType();
    }

    // 检查折扣是否符合
    if (checkDiscountAboutActivityType() !== '') {
        checkDiscountAboutActivityType();
    }

}

// 检查活动类型与邮费关系,返回错误文案
function checkPostageStatusAboutActivityType() {
    var curId = $('#activity_type_id').val();
    var postageStatus = $('input[name="postage_status"]');
    var flag = false;

    for (var i = 0; i < postageStatus.length; i++) {
        if (postageStatus[i].checked) {
            var currentPostageStatus = postageStatus[i].value;

            for (var j = 0; j < activity_type_list[curId]['limit_postage_status'].length; j++) {
                if (currentPostageStatus == activity_type_list[curId]['limit_postage_status'][j]) {
                    flag = true;
                }
            }
        }
    }

    var str = '';
    if (!flag) {
        str = '请选择符合活动要求的邮费类型';
    }
    $('#postage_status_notice').text(str);
    return str;
}

// 检查当前价格是否符合活动要求，返回错误文案
function checkCurrentPriceAboutActivityType() {
    var curId = $('#activity_type_id').val();
    var currentPrice = $('#current_price').val();
    var min_price = activity_type_list[curId]['min_price'];
    var max_price = activity_type_list[curId]['max_price'];
    var str = '';
    if (currentPrice * 100 < min_price * 100) {
        str = '活动价格必须大于等于：' + min_price + '元';
    }
    if (currentPrice * 100 > max_price * 100) {
        str = '活动价格必须小于等于：' + max_price + '元';
    }
    $('#activity_current_price_notice').text(str);
    return str;
}

// 检查原价是否符合活动要求，返回错误文案
function checkOriginalPriceAboutActivityType() {
    var curId = $('#activity_type_id').val();
    var originalPrice = $('#original_price').val();
    var min_price = activity_type_list[curId]['limit_original_price'][0];
    var max_price = activity_type_list[curId]['limit_original_price'][1];
    var str = '';
    if (originalPrice * 100 < min_price * 100) {
        str = '商品原价必须大于等于：' + min_price + '元';
    }
    if (originalPrice * 100 > max_price * 100) {
        str = '商品原价必须小于等于：' + max_price + '元';
    }
    $('#activity_original_price_notice').text(str);
    return str;
}

// 检查折扣是否符合活动要求，返回错误文案
function checkDiscountAboutActivityType() {
    var curId = $('#activity_type_id').val();
    var currentPrice = $('#current_price').val();
    var originalPrice = $('#original_price').val();
    var discount = parseInt(currentPrice * 100 / originalPrice);
    var limit_discount = activity_type_list[curId]['limit_discount'] * 10;
    var str = '';
    if (limit_discount !== 0 && discount > limit_discount) {
        str = '活动价/原价折扣必须小于等于：' + (limit_discount / 10) + '折';
    }
    if (checkCurrentPriceAboutActivityType() === '' && checkOriginalPriceAboutActivityType() === '') {
        $('#activity_current_price_notice').text(str);
        $('#activity_original_price_notice').text(str);
    }
    return str;
}

// 切换活动报名提示
function changeApplyTips() {
    var curId = $('#activity_type_id').val();
    $('#apply_tips').text('说明：' + activity_type_list[curId]['apply_type_tips']);
}

