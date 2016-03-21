//产品标题最大的长度限制
var MAX_TITLE_LENGTH_LIMIT = 21;
//检查长度
function checkProductTitleStringLength() {
    var title_value = $('#title').val();
    var title_string_length = title_value.toString().length;
    if (title_string_length > MAX_TITLE_LENGTH_LIMIT) {
        $('#title_length_notice').show();
        $('#title_length_desc').hide();
        return false;
    } else {
        $('#title_length_notice').hide();
		$('#title_length_desc').show();
        return true;
    }
}


function ajaxSubmitData() {
    if (!window.confirm('确认保存吗?')) {
        return false;
    }
	if (!checkBeforeSubmit()) {
        return false;
    }
    $('#diySaveBtn').val('正在提交');
    $('#baseSaveBtn').val('正在提交');
    $('#diySaveBtn').attr("disabled", "disabled");
    $('#baseSaveBtn').attr("disabled", "disabled");
    var AjaxURL = "/temai/manage_add_do";
	//$('#ajax_submit_form').submit();
    $.ajax({
        type: "POST",
        dataType: "json",
        url: AjaxURL,
        data: $('#ajax_submit_form').serialize(),
        success: function(result) {
            if (result.data.result == 'T') {
				//window.location.href='/temai/manage_list?type=check';
				if(result.data.product_status=='1'){
					easyDialog.open({
					  container : 'ok_win_check',
					  fixed : true
					});
				}else{
					easyDialog.open({
					  container : 'ok_win',
					  fixed : true
					});
				}
            } else {
                $('#diySaveBtn').attr("disabled", false);
                $('#diySaveBtn').val('保存');
				$('#baseSaveBtn').attr("disabled", false);
                $('#baseSaveBtn').val('保存');
                alert(result.data.msg);
            }
        },
        error: function(data) {
            $('#diySaveBtn').attr("disabled", false);
            $('#diySaveBtn').val('保存');
			$('#baseSaveBtn').attr("disabled", false);
            $('#baseSaveBtn').val('保存');
            alert("error:" + data.responseText);
        }
    });
}

function preview_p(tmp_product_id){
	if (!checkBeforeSubmit()) {
        return false;
    }
	window.open('/temai/preview_tmp?'+$('#ajax_submit_form').serialize());
	//alert(tmp_product_id);
}

//检查数量
function checkProductNumber() {
    var product_num_value = $('#product_num').val();
	if(product_num_value == ''){
		$('#product_num_notice').hide();
		$('#product_num_desc').show();
		return false;
	}
    var type = "^[0-9]*[1-9][0-9]*$";
    var re = new RegExp(type);
    if (product_num_value.match(re) == null || product_num_value < 0 || product_num_value > 10000) {
        $('#product_num_notice').show();
        $('#product_num_desc').hide();
        return false;
    } else {
        $('#product_num_notice').hide();
		$('#product_num_desc').show();
        return true;
    }
}
//检查自定义库存
function checkProductIndependentNumber(obj) {
    var product_num_value = $(obj).val();
    var type = "^[0-9]*[1-9][0-9]*$";
    var re = new RegExp(type);
    if (product_num_value.match(re) == null || product_num_value < 0 || product_num_value > 10000) {
		$(obj).val('');
        alert('必须输入大于0小于等于10000的整数数字');
        return false;
    } else {
        return true;
    }
}
//删除左右两端的空格
function jstrim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
//检查小数
function checkNumber2Point(total_money_value) {
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
	if(current_price_value == ''){
		$('#original_price_notice').hide();
		$('#original_price_desc').show();
		return false;
	}
    if (!checkNumber2Point(current_price_value)) {
        $('#original_price_notice').show();
		$('#original_price_desc').hide();
        return false;
    }
    if (current_price_value <= 0 || current_price_value > 100000000) {
        $('#original_price_notice').show();
        $('#original_price_desc').hide();
        return false;
    }
    $('#original_price_notice').hide();
	$('#original_price_desc').show();
    return true;
}
//检查售价
function checkProductCurrentPrice() {
    var current_price_value = $('#current_price').val();
	if(current_price_value == ''){
		$('#current_price_notice').hide();
		$('#current_price_desc').show();
		return false;
	}
    if (!checkNumber2Point(current_price_value)) {
        $('#current_price_notice').show();
        $('#current_price_desc').hide();
        return false;
    }
    if (current_price_value <= 0 || current_price_value > 100000000) {
        $('#current_price_notice').show();
		$('#current_price_desc').hide();
        return false;
    }
    $('#current_price_notice').hide();
	$('#current_price_desc').show();
    return true;
}
//检查独立价格
function checkProductIndependentPrice(obj) {
    var current_price_value = $(obj).val();
    if (!checkNumber2Point(current_price_value)) {
		$(obj).val('');
        alert('需要输入大于0的数字,最多保留2位小数');
        return false;
    }
    if (current_price_value <= 0 || current_price_value > 100000000) {
		$(obj).val('');
        alert('需要输入大于0的数字,最多保留2位小数');
        return false;
    }
    
    return true;
}
//检查商品参数
function checkProductProperty(){
	if($("#property_table").val()==undefined){
		alert('请填写商品参数');
		return false;
	}
	$("[isneed]").each(function(){
		if($(this).val().length==0){
			alert('带*商品参数不能为空');
			return false;
		}
	});
	return true;
}
//提交前的检查
function checkBeforeSubmit() {
	if(!checkProductProperty()){
		return false;
	}
	var flag=true;
	$(".required_write").each(function(index, element) {
		if($(this).val()==null || $(this).val().length==0){
			alert($(this).attr('name'));
			easyDialog.open({
				container : 'error_win',
				fixed : true
			});
			flag=false;
			return;
		} 
		
	});
	if(!flag){
		return false;
	}
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
	if($("#img_url_1").val()==""){
		alert('请上传主图片');
		return false;
	}
	if($("#p_cat_1").val()==""){
		alert('请选择一级行业分类');
		return false;
	}
	if($("#p_cat_2").val()==""){
		alert('请选择二级行业分类');
		return false;
	}
    
	return true;
}

//检查首页
function check_index(){
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

// 切换活动报名提示
function changeApplyTips() {
    var curId = $('#activity_type_id').val();
    $('#apply_tips').text('说明：' + activity_type_list[curId]['apply_type_tips']);
}


//添加新规格A项
function add_item_a(){
	$("#span_a_item").append('<input type="text" value="" class="diyInfo_a diyInfo_input" />');
}


//添加新规格B项
function add_item_b(){
	$("#span_b_item").append('<input type="text" value="" class="diyInfo_b diyInfo_input" />');
}