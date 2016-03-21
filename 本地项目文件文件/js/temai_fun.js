
	//获取顶级分类
	function get_cat_top(){
		$.ajax({
			url: "/temai/get_cat_top",
			type: 'POST',
			dataType: "json",
			timeout: 15000,
			cache: false,
			data: {},
			success: function(response, msg, settings){
				
				if(response.data.result == 'T'){
					list=response.data.cat_list;
					option='';
					for(var i in list){
						$('#p_cat_1').append('<option value="' + list[i].aid + '">' + list[i].name + '</option>');
					}
				}else{
					alert(response.data.msg);
					return false;
				}
			},
			error:	function(XMLHttpRequest,event,ajaxOptions, thrownError){
			}
		});
	}
	//获取二级分类
	function get_cat_second(parent_cid){
		$.ajax({
			url: "/temai/get_cat_second",
			type: 'POST',
			dataType: "json",
			timeout: 15000,
			cache: false,
			data: {parent_cid:parent_cid},
			success: function(response, msg, settings){
				
				if(response.data.result == 'T'){
					$('#p_cat_2').empty();
					list=response.data.cat_list;
					option='';
					for(var i in list){
						$('#p_cat_2').append('<option value="' + list[i].aid + '">' + list[i].name + '</option>');
					}
				}else{
					alert(response.data.msg);
					return false;
				}
			},
			error:	function(XMLHttpRequest,event,ajaxOptions, thrownError){
			}
		});
	}
	//获取三级分类
	function get_cat_third(parent_cid){
		$.ajax({
			url: "/temai/get_cat_third",
			type: 'POST',
			dataType: "json",
			timeout: 15000,
			cache: false,
			data: {parent_cid:parent_cid},
			success: function(response, msg, settings){
				
				if(response.data.result == 'T'){
					$('#p_cat_3').empty();
					list=response.data.cat_list;
					option='';
					for(var i in list){
						$('#p_cat_3').append('<option value="' + list[i].aid + '">' + list[i].name + '</option>');
					}
				}else{
					alert(response.data.msg);
					return false;
				}
			},
			error:	function(XMLHttpRequest,event,ajaxOptions, thrownError){
			}
		});
	}
	//获取属性
	function get_cat_property(){
		cid=$('#p_cat_3').val();
		if(!cid){
			cid=$('#p_cat_2').val();
			if(!cid){
				cid=$('#p_cat_2').val();
			}
		}
		if(!cid){
			return false;
		}
		
		$.ajax({
			url: "/temai/get_cat_property",
			type: 'POST',
			dataType: "json",
			timeout: 15000,
			cache: false,
			data: {cid:cid},
			success: function(response, msg, settings){
				
				if(response.data.result == 'T'){
					$("#cat_top_id").val($("#p_cat_1").val());
					$("#cat_second_id").val($("#p_cat_2").val());
					$("#cat_third_id").val($("#p_cat_3").val());
					table=response.data.table;
					//alert(table);
					$("#p_params").html(table);
					/*table='<table>';
					for(var i in list){
						row=list[i];
						if(row.isneed=='1'){
							xing='*';
						}else{
							xing='';
						}
						table+='<tr><td>'+xing+row.name+'</td><td>';
						if(row.type=='0'){
							table+="<input type='text' name='"+row.id+"' /></td></tr>";
						}else if(row.type=='1'){
							//select

							table+="<select name='"+row.id+"'></select></td></tr>";
						}else if(row.type=='2'){
							//checkbox
						}else if(row.type=='3'){
							//radio
						}
						$('#p_cat_3').append('<option value="' + list[i].aid + '">' + list[i].name + '</option>');
					}*/
				}else{
					alert(response.data.msg);
					return false;
				}
			},
			error:	function(XMLHttpRequest,event,ajaxOptions, thrownError){
			}
		});
	}

	$(document).ready(function() {
		// 一级分类节点
		var first_cate_node = $("#first_cate");
		// 二级分类节点
		var second_cate_node = $("#second_cate");
		// 初始化一级分类
		if(parent_cid!='no'){
			loadAreasEdit();
		}else{
			loadAreas(first_cate_node, -1);
		}
		
		$(first_cate_node).bind("change keyup",
		function() {
			var cid = first_cate_node.val();
			loadAreas(second_cate_node, cid);
		});
	});

	function loadAreas(item, cid) {
		$(item).children().remove();
		if (cid == -1) {
			$(item).append('<option value="0">选择分类</option>');
			for (var i in cate_list) {
				$(item).append('<option value="' + i + '">' + cate_list[i].category_name + '</option>');
			}
		} else if (cid == "") {
			$(item).hide();
		} else {
			$(item).show();
			//$(item).append('<option value="">二级分类</option>');
			var sub_category = cate_list[cid].sub_category;
			for (var i in sub_category) {
				$(item).append('<option value="' + i + '">' + sub_category[i].category_name + '</option>');
			}
		}
	}
	
	function loadAreasEdit(){
		// 一级分类节点
		var first_cate_node = $("#first_cate");
		// 二级分类节点
		var second_cate_node = $("#second_cate");
		first_cate_node.children().remove();
		second_cate_node.children().remove();
		first_cate_node.append('<option value="0">选择分类</option>');
		for (var i in cate_list) {
			if(i==parent_cid){
				selected=" selected";
			}else{
				selected="";
			}
			first_cate_node.append('<option value="' + i + '"'+selected+'>' + cate_list[i].category_name + '</option>');
		}
		second_cate_node.show();
		var sub_category=cate_list[parent_cid].sub_category;
		for (var i in sub_category) {
			if(i==sub_cid){
				selected=" selected";
			}else{
				selected="";
			}
			second_cate_node.append('<option value="' + i + '"'+selected+'>' + sub_category[i].category_name + '</option>');
		}
	}

	$(function(){
		//基本信息/详情/自定义规格切换
		var get_dc_tab_tb=$(".pro_detail_cont .sell_tab span");
		var get_dc_tab_tbc=$(".pro_detail_cont .dc_box");
		get_dc_tab_tb.on("click",function(){
			$(this).addClass("ck").siblings("span").removeClass("ck");
			get_dc_tab_tbc.hide().eq($(this).index()).show();			
		});
		
		
		//保存
		/*$("#baseSaveBtn").on("click",function(){
			var flag=true;
			
			$(".required_write").each(function(index, element) {
          		if($(this).val().length==0){
					easyDialog.open({
						container : 'error_win',
						fixed : true
					});
					flag=false;
					return;
				}
				
            });
			if(flag){
				easyDialog.open({
				  container : 'ok_win',
				  fixed : true
				});
			}
			
		});*/
		$(".close_btn").click(function(){
			easyDialog.close();	
		});
		
		//下一步
		$("#nextBtn").click(function(){
			if(check_index()){
				get_dc_tab_tb[1].click();
			}	
		})
		
		$("#nextBtn2").click(function(){
			get_dc_tab_tb[2].click();
		})
		
		$("#chooseBtn").click(function(){
			get_cat_top();
			easyDialog.open({
				container : 'chooseCate_win',
				fixed : true
			});
		})

		$("#time_limit").change(function(){
			if(this.checked==true){
				$("#time_limit_days").attr('disabled',false);
			}else{
				$("#time_limit_days").attr('disabled',true);
			}
		})
		
		$("#useDiy").change(function(){
			if(this.checked==true){
				$(".diyInfo_a").attr('disabled',false);
				$(".diyInfo_b").attr('disabled',false);
			}else{
				$(".diyInfo_a").val('');
				$(".diyInfo_b").val('');
				$(".diyInfo_a").attr('disabled',true);
				$(".diyInfo_b").attr('disabled',true);
				$("#diySaveBtn").hide();
				$("#doTable").html('');
			}
		})

		$(".upload_bg").click(function(e){
			//e.preventDefault();
			var clik_num=$(".upload_bg").index($(this));
			$('input[type=file]').eq(clik_num).trigger('click');
		})

		
	});
	
	//生成规格参数
	$("#doBtn").click(function(){
		$("#doTable").empty();
		$("#diySaveBtn").hide()
		var arr_a=[];
		var arr_b=[];
		$(".ck_list input.diyInfo_a").not(".diyInfoLong_input").each(function(index, element) {
			var tValu=$(this).val();
			if(tValu!=""){
				arr_a[index]=tValu;
			}
		});
		$(".ck_list input.diyInfo_b").not(".diyInfoLong_input").each(function(index, element) {
			var tValu=$(this).val();
			if(tValu!=""){
				arr_b[index]=tValu;
			}
		});
		if($("#importantA").val() == ''){
			return;
		}
		if((arr_a.length>0)){
			//生成表头
			var str_th="<tr><td style='padding-left:35px'>"+$("#importantA").val()+"</td><td  style='padding-left:35px'>"+$("#importantB").val()+"</td><td style='padding-left:35px'>独立售价</td><td  style='padding-left:30px'>库存</td><td>是否上架</td></tr>";
			var str_td="";
			//生成内容
			jishu=0;
			if(arr_b.length>0 && $("#importantB").val() != ''){
				for(var i=0;i<arr_a.length;i++){
					
					for(var j=0;j<arr_b.length;j++){
						if(product_stock!='no'){
							item_price=" value='"+product_stock[jishu].unit_price+"'";
							item_stock=" value='"+product_stock[jishu].stock_num+"'";
							if(product_stock[jishu].is_show=='1'){
								item_status=" checked";
							}else{
								item_status="";
							}				
						}else{
							item_price=" value='"+$("#current_price").val()+"'";
							item_stock="";
							item_status=" checked";
						}
						jishu++;
						if(!arr_b[j] || !arr_a[i]){
							continue;
						}
						str_td+='<tr><td><input type="hidden" name="custom_property['+jishu+'][item_a_name]" value='+$("#importantA").val()+'><input type="hidden" name="custom_property['+jishu+'][item_b_name]" value='+$("#importantB").val()+'><input name="custom_property['+jishu+'][item_a]" type="text" class="diyInfo_b diyInfo_input" value='+arr_a[i]+' readonly="true" /></td>';
						str_td+='<td><input name="custom_property['+jishu+'][item_b]" type="text" class="diyInfo_b diyInfo_input" value='+arr_b[j]+' readonly="true" /></td>';
						str_td+='<td>'
						+'<input'+item_price+' name="custom_property['+jishu+'][item_price]" type="text" onblur="checkProductIndependentPrice(this)" class="diyInfo_b diyInfoLong_input diyInfo_input" /></td>'
						+'<td>'
						+'<input'+item_stock+' name="custom_property['+jishu+'][item_stock]" type="text" onblur="checkProductIndependentNumber(this)" class="diyInfo_b diyInfo_input" /></td>'
						+'<td>'
						+'<input'+item_status+' name="custom_property['+jishu+'][item_status]" type="checkbox" class="diyInfo_b diyInfo_chkbox" />上架</td></tr>';
					}
					
				}
			}else{
				for(var i=0;i<arr_a.length;i++){
					if(product_stock!='no'){
							item_price=" value='"+product_stock[jishu].unit_price+"'";
							item_stock=" value='"+product_stock[jishu].stock_num+"'";
							if(product_stock[jishu].is_show=='1'){
								item_status=" checked";
							}else{
								item_status="";
							}				
						}else{
							item_price=" value="+$("#current_price").val();
							item_stock="";
							item_status=" checked";
						}
						jishu++;
						if(!arr_a[i]){
							continue;
						}
						str_td+='<tr><td><input type="hidden" name="custom_property['+jishu+'][item_a_name]" value='+$("#importantA").val()+'><input type="hidden" name="custom_property['+jishu+'][item_b_name]" value='+$("#importantB").val()+'><input name="custom_property['+jishu+'][item_a]" type="text" class="diyInfo_b diyInfo_input" value='+arr_a[i]+' readonly="true" /></td>';
						str_td+='<td><input name="custom_property['+jishu+'][item_b]" type="hidden" class="diyInfo_b diyInfo_input" value="" /></td>';
						str_td+='<td>'
						+'<input'+item_price+' name="custom_property['+jishu+'][item_price]" type="text" onblur="checkProductIndependentPrice(this)" class="diyInfo_b diyInfoLong_input diyInfo_input" /></td>'
						+'<td>'
						+'<input'+item_stock+' name="custom_property['+jishu+'][item_stock]" type="text" onblur="checkProductIndependentNumber(this)" class="diyInfo_b diyInfo_input" /></td>'
						+'<td>'
						+'<input'+item_status+' name="custom_property['+jishu+'][item_status]" type="checkbox" class="diyInfo_b diyInfo_chkbox" />上架</td></tr>';
				}
			}
			
			$("#diySaveBtn").show();
			$("#doTable").append(str_th+str_td);
		}
		product_stock='no';
		
	})

	/*$("#upload_img_1").fileupload({
		url:"upload_product_img",//文件上传地址，当然也可以直接写在input的data-url属性内
		formData:{pic_num:"1",tmp_product_id:$('#tmp_product_id').val()},//如果需要额外添加参数可以在这里添加
		done:function(e,result){
			rs=JSON.parse(result.result);
			if(rs.data.result=='T'){
				$('#pic_flag').val('1');
				pic_url=rs.data.pic_url;
				easyDialog.open({
				  container : 'pic_win',
				  fixed : true
				});
				$('#cropbox').attr('src','/temai/get_tmp_img?pic_url='+pic_url);
				$('.img-container > img').cropper('destroy');
				crop();
			}else{
				alert(rs.data.msg);
			}
			

		}
	})
	$("#upload_img_2").fileupload({
		url:"upload_product_img",//文件上传地址，当然也可以直接写在input的data-url属性内
		formData:{pic_num:"2",tmp_product_id:$('#tmp_product_id').val()},//如果需要额外添加参数可以在这里添加
		done:function(e,result){
			rs=JSON.parse(result.result);
			if(rs.data.result=='T'){
				$('#pic_flag').val('2');
				pic_url=rs.data.pic_url;
				easyDialog.open({
				  container : 'pic_win',
				  fixed : true
				});
				$('#cropbox').attr('src','/temai/get_tmp_img?pic_url='+pic_url);
				$('.img-container > img').cropper('destroy');
				crop();
			}else{
				alert(rs.data.msg);
			}
		}
	})
	$("#upload_img_3").fileupload({
		url:"upload_product_img",//文件上传地址，当然也可以直接写在input的data-url属性内
		formData:{pic_num:"3",tmp_product_id:$('#tmp_product_id').val()},//如果需要额外添加参数可以在这里添加
		done:function(e,result){
			rs=JSON.parse(result.result);
			if(rs.data.result=='T'){
				$('#pic_flag').val('3');
				pic_url=rs.data.pic_url;
				easyDialog.open({
				  container : 'pic_win',
				  fixed : true
				});
				$('#cropbox').attr('src','/temai/get_tmp_img?pic_url='+pic_url);
				$('.img-container > img').cropper('destroy');
				crop();
			}else{
				alert(rs.data.msg);
			}
		}
	})
	$("#upload_img_4").fileupload({
		url:"upload_product_img",//文件上传地址，当然也可以直接写在input的data-url属性内
		formData:{pic_num:"4",tmp_product_id:$('#tmp_product_id').val()},//如果需要额外添加参数可以在这里添加
		done:function(e,result){
			rs=JSON.parse(result.result);
			if(rs.data.result=='T'){
				$('#pic_flag').val('4');
				pic_url=rs.data.pic_url;
				easyDialog.open({
				  container : 'pic_win',
				  fixed : true
				});
				$('#cropbox').attr('src','/temai/get_tmp_img?pic_url='+pic_url);
				$('.img-container > img').cropper('destroy');
				crop();
			}else{
				alert(rs.data.msg);
			}
		}
	})
	$("#upload_img_5").fileupload({
		url:"upload_product_img",//文件上传地址，当然也可以直接写在input的data-url属性内
		formData:{pic_num:"5",tmp_product_id:$('#tmp_product_id').val()},//如果需要额外添加参数可以在这里添加
		done:function(e,result){
			rs=JSON.parse(result.result);
			if(rs.data.result=='T'){
				$('#pic_flag').val('5');
				pic_url=rs.data.pic_url;
				easyDialog.open({
				  container : 'pic_win',
				  fixed : true
				});
				$('#cropbox').attr('src','/temai/get_tmp_img?pic_url='+pic_url);
				$('.img-container > img').cropper('destroy');
				crop();
			}else{
				alert(rs.data.msg);
			}
		}
	})*/
	
  /*$('#cropbox').Jcrop({
	  aspectRatio: 1,
	  minSize: [415,415],
	  onSelect: updateCoords,
	  onDblClick: cut_img_submit,
	},function(){
		jcrop_api = this;
  });

  function crop(pic_url){
	jcrop_api.setImage(pic_url);
  }

  function updateCoords(c)
  {
    $('#x').val(c.x);
    $('#y').val(c.y);
    $('#w').val(c.w);
    $('#h').val(c.h);
  };

  function checkCoords()
  {
    if (parseInt($('#w').val())) return true;
    alert('请选定一块区域然后提交');
    return false;
  };*/

  $("#upload_img_1").fileupload({
		url:"upload_product_img",//文件上传地址，当然也可以直接写在input的data-url属性内
		formData:{pic_num:"1",tmp_product_id:$('#tmp_product_id').val()},//如果需要额外添加参数可以在这里添加
		done:function(e,result){
			rs=JSON.parse(result.result);
			num = 1;
			if(rs.data.result=='T'){
				$('#pic_flag').val(num);
				pic_url=rs.data.pic_url;
				id='img_'+num;
				img_url_input="img_url_"+num;
				$("#"+img_url_input).val(num);
				$("#"+id).attr('src',pic_url);
			}else{
				alert(rs.data.msg);
			}
			

		}
  })

  $("#upload_img_2").fileupload({
		url:"upload_product_img",//文件上传地址，当然也可以直接写在input的data-url属性内
		formData:{pic_num:"2",tmp_product_id:$('#tmp_product_id').val()},//如果需要额外添加参数可以在这里添加
		done:function(e,result){
			rs=JSON.parse(result.result);
			num = 2;
			if(rs.data.result=='T'){
				$('#pic_flag').val(num);
				pic_url=rs.data.pic_url;
				id='img_'+num;
				img_url_input="img_url_"+num;
				$("#"+img_url_input).val(num);
				$("#"+id).attr('src',pic_url);
			}else{
				alert(rs.data.msg);
			}
			

		}
  })

  $("#upload_img_3").fileupload({
		url:"upload_product_img",//文件上传地址，当然也可以直接写在input的data-url属性内
		formData:{pic_num:"3",tmp_product_id:$('#tmp_product_id').val()},//如果需要额外添加参数可以在这里添加
		done:function(e,result){
			rs=JSON.parse(result.result);
			num=3;
			if(rs.data.result=='T'){
				$('#pic_flag').val(num);
				pic_url=rs.data.pic_url;
				id='img_'+num;
				img_url_input="img_url_"+num;
				$("#"+img_url_input).val(num);
				$("#"+id).attr('src',pic_url);
			}else{
				alert(rs.data.msg);
			}
			

		}
  })

  $("#upload_img_4").fileupload({
		url:"upload_product_img",//文件上传地址，当然也可以直接写在input的data-url属性内
		formData:{pic_num:"4",tmp_product_id:$('#tmp_product_id').val()},//如果需要额外添加参数可以在这里添加
		done:function(e,result){
			rs=JSON.parse(result.result);
			num=4;
			if(rs.data.result=='T'){
				$('#pic_flag').val(num);
				pic_url=rs.data.pic_url;
				id='img_'+num;
				img_url_input="img_url_"+num;
				$("#"+img_url_input).val(num);
				$("#"+id).attr('src',pic_url);
			}else{
				alert(rs.data.msg);
			}
			

		}
  })

  $("#upload_img_5").fileupload({
		url:"upload_product_img",//文件上传地址，当然也可以直接写在input的data-url属性内
		formData:{pic_num:"5",tmp_product_id:$('#tmp_product_id').val()},//如果需要额外添加参数可以在这里添加
		done:function(e,result){
			rs=JSON.parse(result.result);
			num=5;
			if(rs.data.result=='T'){
				$('#pic_flag').val(num);
				pic_url=rs.data.pic_url;
				id='img_'+num;
				img_url_input="img_url_"+num;
				$("#"+img_url_input).val(num);
				$("#"+id).attr('src',pic_url);
				
			}else{
				alert(rs.data.msg);
			}
			

		}
  })

  function cut_img_submit(){
	x=$('#dataX').val();
	y=$('#dataY').val();
	w=$('#dataWidth').val();
	h=$('#dataHeight').val();
	pic_flag=$('#pic_flag').val();
	tmp_product_id=$('#tmp_product_id').val();
	$.ajax({
        url: "/temai/upload_img_cut",
        type: 'POST',
        dataType: "json",
        timeout: 15000,
        cache: false,
        data: {x:x,y:y,w:w,h:h,pic_flag:pic_flag,tmp_product_id:tmp_product_id},
        success: function(response, msg, settings){
			
            if(response.data.result == 'T'){
				id='img_'+pic_flag;
				img_url_input="img_url_"+pic_flag;
				$("#"+img_url_input).val(pic_flag);
				$("#"+id).attr('src',response.data.pic_url);
				easyDialog.close({
				  container : 'pic_win',
				  fixed : true
				});
                return true;
            }else{
                alert(response.data.msg);
                return false;
            }
        },
        error:	function(XMLHttpRequest,event,ajaxOptions, thrownError){
        }
    });
  }
 