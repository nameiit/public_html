function checkedState() {
	$(".otherManageNav ul").find("li").on("click", function() {
		if($(this).hasClass("current-item")) {
			//$(this).removeClass("current-item");
		} else {
			$(this).addClass("current-item").siblings().removeClass("current-item");
		}
	});
	$(".filterBox ul").find("li").on("mousedown", function() {
		$(this).addClass("selected");
	});
	$(".filterBox ul ").find("li").on("mouseup", function() {
		$(this).removeClass("selected");
	});
	//是否过期
	$(".checkbox-success input[type='checkbox']").on("change", function() {
		//过期的：
		if($(this).attr("checked") !== "checked") {
			$(".defaultList").hide();
			$(".disabledListInfo").show();
			detailText(); //已过期部分，"详情"文本的换行问题
		} else {
			//未过期的
			$(".defaultList").show();
			$(".disabledListInfo").hide();
		}
	});
}
//查询
function filterCodeInfo() {
	$("li.searchInfo.action-item").on("click", function() {
		var discountCode = $("li.discountCode").find("input[type='text']").val();
		var discountAmount = $("li.discountAmount").find("input[type='text']").val();
		var discountCodeMsg = $("ul.listInfo").find("li").find("dd.discountCodeMsg"); //折扣码
		var discountAmountMsg = $("ul.listInfo").find("li").find("dd.discountAmountMsg"); //折扣金额
		var salesMsg = $("ul.listInfo").find("li").find(".salesMsg"); //销售人员
		var detailMsg = $("ul.listInfo").find("li").find(".detailMsg"); //详情
		if(discountCode == "" || discountAmount == "") {}
		if(discountCode !== "" || discountAmount !== "") {
			//alert(discountCode+"+"+discountAmount);
			discountCodeMsg.text($.trim(discountCode));
			discountAmountMsg.text($.trim(discountAmount));
		}

	});
}

function salesAction() {
	$(".optionItem").on("mousedown", function() {
		$(this).addClass("option-active");
	});
	$(".optionItem").on("mouseup", function() {
		$(this).removeClass("option-active");
	});
	//添加
	$(".plusItem").on("click", function() {
		$("li.salesFilter").css("visibility", "visible");
		$("li.salesFilter").find("input").on("keydown", function() {
			if(event.keyCode == 13) {
				var salesNameTxt = $.trim($("li.salesFilter").find("input").val()); //当前输入框的值
				var salesInfo = $.trim($(".salesName").text()); //销售人员信息
				console.log(salesNameTxt);
				if($(".salesName").length > 0) {
					if(salesInfo.indexOf(salesNameTxt) !== -1) {
						alert("输入的销售人员信息不能一致");
						$("li.salesFilter").find("input").val(" ");
					} else {
						var e = `
							<li class="salesName">` + salesNameTxt + `
							</li>
							`;
						$(".rightInfo ul").append(e);
						//当前为背景为灰色
						$("li.salesName:last").addClass("selected").siblings("li.salesName").removeClass("selected");
						$("li.salesFilter").find("input").val(" "); //清空输入框的值
						salesNameState();
					}
				}
			}
		});
		minusAction();

	});

}
//移除
function minusAction() {
	$(".minusItem").on("click", function() {
		//移除当前选中的元素
		$(".rightInfo ul").find("li.salesName.selected").remove("");
		$("li.salesFilter").find("input").val("");
	});
}
//销售人员的选中状态
function salesNameState() {
	$(".rightInfo").find("ul").find("li.salesName").unbind("click").on("click", function() {
		if(!$(this).hasClass("selected")) {
			$(this).addClass("selected");
		} else {
			$(this).removeClass("selected");
		}
	});
}

function resetInfo() {
	$(".resetInfo").on("click", function() {
		$("ul.addInfo").find("input").val(" ");
	});
}

//跳转到用户管理页面
function toUsersManagePage() {
	var isSales = true;
	$("a#toUsersManagePage").on("click", function() {
		//对于销售人员:
		if(isSales == true) {
			$(this).attr("href", "UsersManageToSales.php");
		}
		//对于管理人员:
		if(isSales == false) {
			$(this).attr("href", "UsersManageToAdmin.php");
		}
	});
}
//"确认添加"按钮的状态
function addStatus() {
	$("ul.salesNav").find("li.salesFilter").find(".addBtn").on("mousedown", function() {
		$(this).addClass("selected");
	});
	$("ul.salesNav").find("li.salesFilter").find(".addBtn").on("mouseup", function() {
		$(this).removeClass("selected");
	});
}
//"折扣码"页面,列表的选中状态
function listStatus() {
	$("ul.listInfo").find("li").find("dl").on("click", function() {
		if($(this).hasClass("selected")) {
			$(this).removeClass("selected");
		} else {
			$(this).addClass("selected");
		}
	});
}
//详情文字的换行
function detailText() {
	//"折扣码"详情修改(未过期部分):
	var detailBox = $("ul.listInfo.defaultList").find("li").find("dl").find("dd.detailMsg");
	for(var j = 0; j < detailBox.length; j++) {
		if($(detailBox[j]).height() >= 32) {
			$("ul.listInfo.defaultList").find("li.listDetail").eq(j).find("dl").find("dd").css({
				"height": $(detailBox[j]).height(),
				"line-height": $(detailBox[j]).height() + "px"
			});
		}
	}
	//"折扣码","过期"部分详情：
	var detailBox2 = $("ul.listInfo.disabledListInfo").find("li").find("dl").find("dd.detailMsg");
	for(var j = 0; j < detailBox.length; j++) {
		//		alert($(detailBox2[j]).height());
		if($(detailBox2[j]).height() >= 32) {
			$("ul.listInfo.disabledListInfo").find("li.listDetail").eq(j).find("dl").find("dd").css({
				"height": $(detailBox2[j]).height(),
				"line-height": $(detailBox2[j]).height() + "px"
			});
		}
	}
	//"分部"页详情
	var detailCell = $(".divisionRightInfo").find("ul.divisionMsg").find("li").find("dl").find("dd.divisionDetail");
	for(var i = 0; i < detailCell.length; i++) {
		if($(detailCell[i]).height() >= 32) {
			$(".divisionRightInfo").find("ul.divisionMsg").find("li").eq(i).find("dl").find("dd.divisionName").css({
				"height": $(detailCell[i]).height(),
				"line-height": $(detailCell[i]).height() + "px"
			});
		}
	}
}
//添加分部
function addDivisionInfo() {
	$("ul.addInfo").find(".actionFilerBox").find("a.filterInfo").on("click", function() {
		var divisionName = $("ul.addInfo").find("li").find("input[type='text'].divisionName").val();
		var divisionDetail = $("ul.addInfo").find("li").find("textarea.divisionDetail").val();
		if(divisionName == "") {
			alert("分部名称不能为空");
		} else {
			var e = `
					<li>
						<dl>
							<dd class="divisionName">` + divisionName + `</dd>
							<dd class="divisionDetail">` + divisionDetail + `</dd>
						</dl>
					</li>`;
			$(".divisionRightInfo").find("ul.divisionMsg").append(e);
			detailText();
		}
	});
}
//重置:
function resetDivisionInfo() {
	$("ul.addInfo").find(".actionFilerBox").find("a.resetInfo").on("click", function() {
		var divisionName = $("ul.addInfo").find("li").find("input[type='text'].divisionName").val(" ");
		var divisionDetail = $("ul.addInfo").find("li").find("textarea.divisionDetail").val(" ");
	});
}
//其他管理---其他
function otherManage() {
	toUsersManagePage(); //跳转到用户管理页面
	$(".optionItem").on("mousedown", function() {
		$(this).addClass("option-active");
	});
	$(".optionItem").on("mouseup", function() {
		$(this).removeClass("option-active");
	});
	$(".otherManageArea .manageCard ul li dl.manageCardNav dd.confirmManageInfo a").on("mousedown", function() {
		$(this).addClass("option-active");
	});
	$(".otherManageArea .manageCard ul li dl.manageCardNav dd.confirmManageInfo a").on("mouseup", function() {
		$(this).removeClass("option-active");
	});
	$(".manageCard.exchangeRateCard").find("ul").find("li").find("a.selected").on("mousedown", function() {
		$(this).addClass("current");
	});
	$(".manageCard.exchangeRateCard").find("ul").find("li").find("a.selected").on("mouseup", function() {
		$(this).removeClass("current");
	});
	addAction(); //添加
	// removeAction();//移除
	selectedStatus(); //选中状态
	divisionAutoWrap(); //分部详情的换行
	moreInfo(); //更多
	//MCO刷卡公司
	addMcoInfo();
	removeMcoInfo();
	selectedMcoInfo();
}

function selectedStatus() {
	$(document).on('click', '#customer-source-list dd', function() {
		if(!$(this).hasClass("selected")) {
			$(this).addClass("selected");
		} else {
			$(this).removeClass("selected");
		}
	});
}
//添加
function addAction() {
	var manageBox = $(".otherManageArea .manageCard.manageContent"); //顾客来源，货币，支付方式
	manageBox.find(".plusItem").on("click", function() {
		$(this).parentsUntil(".manageCard.manageContent").find("dd.confirmManageInfo").css("display", "inline-block"); //可输入部分
		//点击确认
		$(this).parentsUntil(".manageCard.manageContent").find("dd.confirmManageInfo").find("a").on("click", function() {
			//当前列表
			$(this).parentsUntil(".manageCard.manageContent").find("li.manegeDetailInfo").css("display", "block");
			var inputText = $(this).parentsUntil(".manageCard.manageContent").find("dd.confirmManageInfo").find("input").val();
			var listText = $(this).parentsUntil(".manageCard.manageContent").find("li.manegeDetailInfo").find("dd").text();
			var currentInputTxt = $.trim(inputText); //当前输入框的值
			var currentListTxt = $.trim(listText); //销售人员信息
			if($(this).parentsUntil(".manageCard.manageContent").find("input").val() == "") {
				alert("请确认信息已输入");
			} else if(currentListTxt.indexOf(currentInputTxt) !== -1) {
				//					alert("输入的销售人员信息不能一致");
				$(this).parentsUntil(".manageCard.manageContent").find("dd.confirmManageInfo").find("input").val(" ");
			} else {
				var e = `
							<dd>` + currentInputTxt + `
							</dd>
							`;
				$(this).parentsUntil(".manageCard.manageContent").find("li.manegeDetailInfo").find("dl").append(e);
				//当前为背景为灰色
				$(this).parentsUntil(".manageCard.manageContent").find("li.manegeDetailInfo").find("dd:last").addClass("selected").siblings("dd").removeClass("selected");
				$(this).parentsUntil(".manageCard.manageContent").find("dd.confirmManageInfo").find("input").val(" "); //清空输入框的值
				selectedStatus();
			}
		});
		//enter
		$(this).parentsUntil(".manageCard.manageContent").find("input").on("keydown", function() {
			if(event.keyCode == 13) {
				//当前列表
				$(this).parentsUntil(".manageCard.manageContent").find("li.manegeDetailInfo").css("display", "block");
				var inputText = $(this).parentsUntil(".manageCard.manageContent").find("dd.confirmManageInfo").find("input").val();
				var listText = $(this).parentsUntil(".manageCard.manageContent").find("li.manegeDetailInfo").find("dd").text();
				var currentInputTxt = $.trim(inputText); //当前输入框的值
				var currentListTxt = $.trim(listText); //销售人员信息
				if(currentListTxt.indexOf(currentInputTxt) !== -1) {
					//					alert("输入的销售人员信息不能一致");
					$(this).parentsUntil(".manageCard.manageContent").find("dd.confirmManageInfo").find("input").val(" ");
				} else {
					var e = `
							<dd>` + currentInputTxt + `
							</dd>
							`;
					$(this).parentsUntil(".manageCard.manageContent").find("li.manegeDetailInfo").find("dl").append(e);
					//当前为背景为灰色
					$(this).parentsUntil(".manageCard.manageContent").find("li.manegeDetailInfo").find("dd:last").addClass("selected").siblings("dd").removeClass("selected");
					$(this).parentsUntil(".manageCard.manageContent").find("dd.confirmManageInfo").find("input").val(" "); //清空输入框的值
					selectedStatus();
				}
			}
		});

	});
}
//移除
function removeAction() {
	$(".otherManageArea .manageCard.manageContent").find(".minusItem").on("click", function() {
		//移除当前选中的元素
		$(".otherManageArea .manageCard.manageContent").find("li.manegeDetailInfo").find("dd.selected").remove();
		$(".otherManageArea .manageCard.manageContent").find("dd.confirmManageInfo").find("input").val(" ");
		addAction();
	});
}
//分部部分"详情文字"的换行
function divisionAutoWrap() {
	//"分部"页-详情
	var detailCell = $(".otherManageArea .manageCard.divisionCard").find(".divisionRightInfo").find("ul.divisionMsg").find("li").find("dl").find("dd.divisionDetail");
	for(var i = 0; i < detailCell.length; i++) {
		if($(detailCell[i]).height() >= 32) {
			$(".otherManageArea .manageCard.divisionCard").find(".divisionRightInfo").find("ul.divisionMsg").find("li").eq(i).find("dl").find("dd.divisionName").css({
				"height": $(detailCell[i]).height(),
				"line-height": $(detailCell[i]).height() + "px"
			});
			$(".otherManageArea .manageCard.divisionCard").find(".divisionRightInfo").find("ul.divisionMsg").find("li").eq(i).css({
				"height": $(detailCell[i]).height(),
				"line-height": $(detailCell[i]).height() + "px"
			});
		}
	}
}

//更多
function moreInfo() {
	$(".manageCard").find("a.order-unfold").on("click", function() {
		var e = `
				<dd>` + "" + `
				</dd>
				`;
		$(this).parentsUntil(".manageCard.manageContent").find("li.manegeDetailInfo").find("dl").append(e);
	});
}
//MCO刷卡公司
function addMcoInfo() {
	var manageBox = $(".manageCard.creditCardCompanies");
	manageBox.find(".plusItem").on("click", function() {
		$(this).parentsUntil(".manageCard.creditCardCompanies").find("dd.confirmManageInfo").css("display", "inline-block"); //可输入部分
		//点击确认
		$(this).parentsUntil(".manageCard.creditCardCompanies").find("dd.confirmManageInfo").find("a").on("click", function() {
			//当前列表
			$(this).parentsUntil(".manageCard.creditCardCompanies").find("li.manegeDetailInfo").css("display", "block");

			var inputText = $(this).parentsUntil(".manageCard.creditCardCompanies").find("dd.confirmManageInfo").find("input").val();
			var listText = $(this).parentsUntil(".manageCard.creditCardCompanies").find("li.manegeDetailInfo").find("dd").text();
			var currentInputTxt = $.trim(inputText); //当前输入框的值
			var currentListTxt = $.trim(listText); //销售人员信息
			if($(this).parentsUntil(".manageCard.creditCardCompanies").find("input").val() == "") {
				alert("请确认信息已输入");
			}
			//			else if(currentListTxt.indexOf(currentInputTxt) !== -1) {
			//				//					alert("输入的销售人员信息不能一致");
			//				$(this).parentsUntil(".manageCard.creditCardCompanies").find("dd.confirmManageInfo").find("input").val(" ");
			//			} 
			else {
				var e = `<li class="contentInfo">
								<dl class="detailContent">
									<dd class="orderInfo"></dd>
									<dd class="nameInfor">` + currentInputTxt + `</dd>
								</dl>
							</li>`
				$(this).parentsUntil(".manageCard.creditCardCompanies").find("dl.detailTitle").parent("li").parent("ul").append(e);
				var orderInfo = $(".otherManageArea .manageCard.creditCardCompanies ul li.manegeDetailInfo dl.companyInfor ul li.contentInfo dd.orderInfo");
				orderInfo.each(function(i, item) {
					$(item).text(i + 1);
				});

				//当前为背景为灰色
				//				$(this).parentsUntil(".manageCard.creditCardCompanies").find("li.contentInfo:last").addClass("selected").siblings("li.contentInfo").removeClass("selected");
				$(this).parentsUntil(".manageCard.creditCardCompanies").find("dd.confirmManageInfo").find("input").val(" "); //清空输入框的值
//				selectedMcoInfo();
				heightRange();
			}
		});
		//enter
		$(this).parentsUntil(".manageCard.manageContent").find("input").on("keydown", function() {
			$(this).parentsUntil(".manageCard.creditCardCompanies").find("li.manegeDetailInfo").css("display", "block");
			var inputText = $(this).parentsUntil(".manageCard.creditCardCompanies").find("dd.confirmManageInfo").find("input").val();
			var listText = $(this).parentsUntil(".manageCard.creditCardCompanies").find("li.manegeDetailInfo").find("dd").text();
			var currentInputTxt = $.trim(inputText); //当前输入框的值
			var currentListTxt = $.trim(listText); //销售人员信息
			if(event.keyCode == 13) {
				//				if(currentListTxt.indexOf(currentInputTxt) !== -1) {
				//					//alert("输入的销售人员信息不能一致");
				//					$(this).parentsUntil(".manageCard.manageContent").find("dd.confirmManageInfo").find("input").val(" ");
				//				} 
				//				else {
				var e = `<li class="contentInfo">
								<dl class="detailContent">
									<dd class="orderInfo"></dd>
									<dd class="nameInfor">` + currentInputTxt + `</dd>
								</dl>
							</li>`
				$(this).parentsUntil(".manageCard.creditCardCompanies").find("dl.detailTitle").parent("li").parent("ul").append(e);
				var orderInfo = $(".otherManageArea .manageCard.creditCardCompanies ul li.manegeDetailInfo dl.companyInfor ul li.contentInfo dd.orderInfo");
				orderInfo.each(function(i, item) {
					$(item).text(i + 1);
				});
				//当前为背景为灰色
				//$(this).parentsUntil(".manageCard.creditCardCompanies").find("li.contentInfo:last").addClass("selected").siblings("li.contentInfo").removeClass("selected");
				$(this).parentsUntil(".manageCard.creditCardCompanies").find("dd.confirmManageInfo").find("input").val(" "); //清空输入框的值
				heightRange();
				//				}
			}
		});

	});
}
function selectedMcoInfo() {
	$(document).on("click", ".manageCard.creditCardCompanies li .companyInfor ul li.contentInfo", function () {	
		if(!$(this).hasClass("selected")) {
			$(this).addClass("selected");
		} else {
			$(this).removeClass("selected");
		}
	});
}

function removeMcoInfo() {
	$(".otherManageArea .manageCard.creditCardCompanies").find(".minusItem").on("click", function() {
		//移除当前选中的元素
		$(".otherManageArea .manageCard.creditCardCompanies").find("li.contentInfo.selected").remove();

		var orderInfo = $(".otherManageArea .manageCard.creditCardCompanies ul li.manegeDetailInfo dl.companyInfor ul li.contentInfo dd.orderInfo");
		orderInfo.each(function(i, item) {
			$(item).text(i + 1);
		});
		if($(".manageCard.creditCardCompanies").find("li.contentInfo").length < 1) {
			localStorage.setItem("orderNum", 0);
		}
		$(".otherManageArea .manageCard.creditCardCompanies").find("dd.confirmManageInfo").find("input").val(" ");
		addMcoInfo();
		selectedMcoInfo();
	});
}