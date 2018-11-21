//通用信息选择
function generalInfo() {
	$(".tabCard ul li").find("input[type='checkbox']").on("click", function() {
		var txt = $.trim($(this).parent().find("label:visible").text());
		var e = `<dd class="new">` + txt + `</dd>`;
		var e2 = `<dd class="new"></dd>`;
		var dlBox = $(".resultInfo").find("ul li.resultNav").find("dl");
		var liBox = $(".resultInfo").find("ul li.resultDetail").find("dl");
		if(!$(this).parent().parent("li").hasClass("selected")) {
			//选中某一项
			$(this).parent().parent("li").addClass("selected");
			$(e).appendTo(dlBox);
			$(e2).appendTo(liBox);
			var dWidth = dlBox.find("dd").outerWidth();
			var newWidth = dWidth * (dlBox.find("dd").length);
			$(".resultInfo ul").css({
				"width": newWidth,
			});
			
			if(newWidth > $(".resultInfo").outerWidth()) {
				$(".resultInfo").css({
					"overflow-x": "scroll",
				});
			}

		} else {
			for(var i = 0; i < dlBox.find("dd").length; i++) {
				if(txt == $.trim($(dlBox.find("dd")[i]).text())) {
					var dWidth = dlBox.find("dd").outerWidth();
					var newWidth = dWidth * (dlBox.find("dd").length);
					if(newWidth > dWidth * 2) {
						$(this).parent().parent("li").removeClass("selected");
						$(dlBox.find("dd")[i]).remove();
						for(var j = 0; j < $(".resultInfo").find("ul li.resultDetail").length; j++) {
							var dWidth = dlBox.find("dd").outerWidth();
							var newWidth = dWidth * (dlBox.find("dd").length);
							$(".resultInfo ul").css({
								"width": newWidth,
							});
							$($(".resultInfo").find("ul li.resultDetail")[j]).find("dl").find("dd").eq(i).remove();
							if(newWidth < $(".resultInfo").outerWidth()) {
								$(".resultInfo").css({
									"overflow-x": "initial",
								});
							}

						}

					}
					else{
						alert("至少选中一条通用信息");
						$(this).attr("checked","checked");
					}
				}
			}

		}
	});
}

//重置
function resetInfo(){
	$(".historicRecord .actionRecord").find("ul").find("li:last-child").find("a").on("click",function(){
		//基本信息部分
		$(".filterBasicInfo").find("input").val("");
		$(".filterBasicInfo").find("input[type='checkbox']").attr("checked",false);
		$(".filterBasicInfo").find("input[type='checkbox']:first").attr("checked",true);
		var defaultTxt=$(".filterBasicInfo").find("select").find("option:first").text();
		$(".filterBasicInfo").find("select").find("option:selected").text(defaultTxt);
		$(".filterBasicInfo").find("li.dateRange").css("visibility","hidden");
		//高级信息部分
		$(".filterAdvancedInfo").find("input").val("");
		$(".filterAdvancedInfo").find("select").find("option:first").prop("selected", 'selected');
		//独立团信息部分
		$(".filterGroupTourInfo").find("input").val("");
		$(".filterGroupTourInfo").find("select").find("option:first").prop("selected", 'selected');
		$(".filterGroupTourInfo").find("input[type='checkbox']").attr("checked",false);
		$(".filterGroupTourInfo").find("input[type='radio']").attr("checked",false);

	});
}

function orderPagination(){
	$('#historyOrders').pagination({
		totalData: 100,
		showData: 15,
		coping: true,
		coping: true,
		homePage: '首页',
		endPage: '末页',
		prevContent: '上页',
		nextContent: '下页',
		callback: function(api) {
			var i = api.getCurrent(); //获取当前页
			$(".resultInfo").find("li.resultDetail").find("dd");
			for(var m=0;m<$(".resultInfo").find("li.resultDetail").length;m++){
				$($(".resultInfo").find("li.resultDetail")[m]).find("dd").text(m+"第"+i+"页");
			}
		}
			
		});
}
