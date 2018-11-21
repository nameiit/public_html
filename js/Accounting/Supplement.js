$(function() {
	searchInfo();
	toUsersManagePage();
	//	autoWidth();
	searchSwitch();
	resetInfo();
	searchInfo();
	noRecord();
	confirmSupplement();
	confirmRefund();
	
	//退款金额-汇率：
	$(".supplementfloor ul.searchFloor.refund li.refundAmount").find("select").on("change", function() {
		var currentTxt = $.trim($(this).find("option:selected").text());
		if(currentTxt == "人民币") {
			$(".supplementfloor ul.searchFloor.refund li.exchangeRate").css("display", "block");
		} else {
			$(".supplementfloor ul.searchFloor.refund li.exchangeRate").css("display", "none");
		}
	});
	//增补-汇率：
	$(".supplementfloor ul.searchFloor.supplement li").find("select").on("change", function() {
		var currentTxt = $.trim($(this).find("option:selected").text());
		var currencyArr = [];
		$(".supplementfloor ul.searchFloor.supplement li").find("select").each(function(i, item) {
			currencyArr.push($.trim($(item).find("option:selected").text()));
			if(currencyArr.indexOf("人民币") !== -1) {
				$(".supplementfloor ul.searchFloor.supplement li.exchangeRate").css("display", "block");
			} else {
				$(".supplementfloor ul.searchFloor.supplement li.exchangeRate").css("display", "none");
			}
		});
	});

});

//切换:
function searchSwitch() {
	//旅游团-机票
	$(".groupSearch ul.manageNav.searchInfo li").on("click", function() {
		$("ul.searchFloor").find("input").val("");
		$(this).addClass("current-item").siblings().removeClass("current-item");
		$(".searchResult").css("display", "none");
		if($.trim($(this).text()) == "旅游团") {
			$("ul.searchFloor.touristGroups").css("display", "inline-block");
			$("ul.searchFloor.airticketInfo").css("display", "none");
			$(".searchResult ul li.title dl dd.changeItem").text("团号");
			$(".searchResult ul li.detail dl dd.changeItem").addClass("groupNum");
			$(".searchResult ul li.detail dl dd.changeItem").removeClass("locator");
		}
		if($.trim($(this).text()) == "机票") {
			$("ul.searchFloor.touristGroups").css("display", "none");
			$("ul.searchFloor.airticketInfo").css("display", "inline-block");
			$(".searchResult ul li.title dl dd.changeItem").text("Locator");
			$(".searchResult ul li.detail dl dd.changeItem").addClass("locator");
			$(".searchResult ul li.detail dl dd.changeItem").removeClass("groupNum");
		}
	});
	//	//增补-退款
	$(".fillSupplement  ul.manageNav.supplementInfo li").on("click", function() {
		$(".supplementfloor ul.searchFloor li input").val("");
		$(".supplementfloor ul.searchFloor li.supplementItem select").prop('selectedIndex', 0);
		$(this).addClass("current-item").siblings().removeClass("current-item");
		if($.trim($(this).text()) == "增补") {
			$("ul.searchFloor.supplement").css("display", "inline-block");
			$("ul.searchFloor.refund").css("display", "none");
		}
		if($.trim($(this).text()) == "退款") {
			$("ul.searchFloor.supplement").css("display", "none");
			$("ul.searchFloor.refund").css("display", "inline-block");
		}

	});
}

//清空
function resetInfo() {
	$(" ul.searchFloor li.btnList a.resetBtn").on("click", function() {
		$("ul.searchFloor").find("input").val("");
		$(".supplementfloor ul.searchFloor li.supplementItem select").prop('selectedIndex', 0);
		$(".searchResult").css("display", "none");
	});
}
//搜索   s
function searchInfo() {
	$(".supplementfloor ul.searchFloor li.btnList a").on("mouseup", function() {
		$(this).removeClass("selected");
	});
	$(".supplementfloor ul.searchFloor li.btnList a").on("mousedown", function() {
		$(this).addClass("selected");
	});
	$(".supplementfloor ul.searchFloor li.btnList a.queryBtn").unbind("click").on("click", function() {
		var type = $.trim($(".supplementfloor ul.manageNav.searchInfo li.current-item").text());
		if(type == "旅游团") {
			if($("ul.touristGroups li input.systemNum").val() !== "") {
				$(".searchResult").css("display", "block");
				$(".searchResult ul li.title dl dd.changeItem").text("团号");
				$(".searchResult ul li.detail dl dd.changeItem").addClass("groupNum");
				$(".searchResult ul li.detail dl dd.changeItem").removeClass("locator");
				//				groupSearch();
			}

		}
		if(type == "机票") {
			if($("ul.airticketInfo li input.systemNum").val() !== "") {
				$(".searchResult ul li.title dl dd.changeItem").text("Locator");
				$(".searchResult ul li.detail dl dd.changeItem").addClass("locator");
				$(".searchResult ul li.detail dl dd.changeItem").removeClass("groupNum");
				$(".searchResult").css("display", "block");
				//				airticketSearch();
			}

		}
	});
}
//旅游团搜索
function groupSearch() {
	//	var systemNumTxt = $("ul.touristGroups li input.systemNum").val();
	//	var groupNumTxt = $(" ul.touristGroups li input.groupNum").val();
	//	var listText = $("div.systemNumTab li dl dd.systemNum").text();
	//	var currentInputTxt = $.trim(systemNumTxt);
	//	var currentListTxt = $.trim(listText);
	//	if(systemNumTxt !== "") {
	//		var e = `
	//						<li class="detail">
	//							<dl>
	//								<dd class="systemNum">
	//									` + systemNumTxt + `
	//								</dd>
	//								<dd class="changeItem">
	//									` + groupNumTxt + `
	//								</dd>
	//								<dd></dd>
	//								<dd></dd>
	//								<dd></dd>
	//								<dd></dd>
	//								<dd></dd>
	//								<dd></dd>
	//								<dd></dd>
	//								<dd></dd>
	//							</dl>
	//						</li>
	//					`;
	//		$(".searchResult ul li.title").after(e);
	//		heightRange();
	//
	//	}
}
//机票搜索
function airticketSearch() {
	//	var systemNumTxt = $("ul.searchFloor.airticketInfo li input.systemNum").val();
	//	var locatorTxt = $(" ul.searchFloor.airticketInfo li input.locator").val();
	//	var listText = $("div.systemNumTab li dl dd.systemNum").text();
	//	var currentInputTxt = $.trim(systemNumTxt);
	//	var currentListTxt = $.trim(listText);
	//	if(systemNumTxt !== "") {
	//		if(currentListTxt.indexOf(currentInputTxt) == -1) {
	//			var e = `
	//						<li class="detail">
	//							<dl>
	//								<dd class="systemNum">
	//									` + systemNumTxt + `
	//								</dd>
	//								<dd class="changeItem">
	//									` + locatorTxt + `
	//								</dd>
	//								<dd></dd>
	//								<dd></dd>
	//								<dd></dd>
	//								<dd></dd>
	//								<dd></dd>
	//								<dd></dd>
	//								<dd></dd>
	//								<dd></dd>
	//							</dl>
	//						</li>
	//					`;
	//			$(".searchResult ul li.title").after(e);
	//			$("ul.searchFloor.airticketInfo li.systemNum input").val("");
	//			heightRange();
	//
	//		} else {
	//			$("ul.searchFloor.airticketInfo li.systemNum input").val("");
	//		}
	//	}
}

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
//旅游团搜索   e

//增补-退款：
//确认增补：
function confirmSupplement() {
	$("ul.searchFloor.supplement li.btnList").find("a.confirmBtn").on("click", function() {
		var confirmFlag;
		//		alert($("ul.searchFloor.supplement li").find("input:visible").length);
		$("ul.searchFloor.supplement li").find("input:visible").each(function(i, item) {
			if($.trim($(item).val()) == "") {
				confirmFlag = false;
			} else {
				confirmFlag = true;
			}
		});
		if(confirmFlag) {
			$(".confirmNoticeInfo").addClass("confirmSupplement");
			$(".confirmNoticeInfo").removeClass("noRecord");
			$(".confirmNoticeInfo").removeClass("confirmRefund");
			$(".confirmSupplement").find("p.confirmNotice").text("确认增补");
			$(".confirmSupplement").css("display", "block");
			//确认
			$(".confirmSupplement").find("p.actionBox").find("button.actionConfirm").on("click", function() {
				setTimeout(function() {
					$(".confirmSupplement").css("display", "none");
				}, 500);
			});
			//取消
			$(".confirmSupplement").find("p.actionBox").find("button.actionCancel").on("click", function() {
				$(".confirmSupplement").css("display", "none");
			});

		} else {
			alert("请确认增补信息已填写完整");
		}

	});
}
//确认退款：
function confirmRefund() {
	$("ul.searchFloor.refund li.btnList").find("a.confirmBtn").on("click", function() {
		var confirmFlag;
		$("ul.searchFloor.refund li").find("input:visible").each(function(i, item) {
			if($.trim($(item).val()) == "") {
				confirmFlag = false;
			} else {
				confirmFlag = true;
			}
		});
		if(confirmFlag) {
			$(".confirmNoticeInfo").addClass("confirmRefund");
			$(".confirmNoticeInfo").removeClass("noRecord");
			$(".confirmNoticeInfo").removeClass("confirmSupplement");
			$(".confirmRefund").find("p.confirmNotice").text("确认退款");
			$(".confirmRefund").css("display", "block");
			//确认
			$(".confirmRefund").find("p.actionBox").find("button.actionConfirm").on("click", function() {
				setTimeout(function() {
					$(".confirmRefund").css("display", "none");
				}, 500);
			});
			//取消
			$(".confirmRefund").find("p.actionBox").find("button.actionCancel").on("click", function() {
				$(".confirmRefund").css("display", "none");
			});

		} else {
			alert("请确认退款信息已填写完整");
		}

	});
}

function noRecord() {
	$(".confirmNoticeInfo").removeClass("confirmSupplement");
	$(".confirmNoticeInfo").removeClass("confirmRefund");
	$(".confirmNoticeInfo").addClass("noRecord");
	$(".noRecord").find("p.confirmNotice").text("确认增补");
	//确认
	$(".noRecord").find("p.actionBox").find("button.actionConfirm").on("click", function() {
		setTimeout(function() {
			$(".noRecord").css("display", "none");
		}, 500);
	});
	//取消
	$(".noRecord").find("p.actionBox").find("button.actionCancel").on("click", function() {
		$(".noRecord").css("display", "none");
	});
}