$(function() {
	listStatus();
	confirmCancel();
	toUsersManagePage();
	backToTop();
});
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
function listStatus() {
	$(".contentFloor .cancelFloor ul.btnList li a").on("mousedown", function() {
		$(this).addClass("selected");
	});
	$(".contentFloor .cancelFloor ul.btnList li a").on("mouseup", function() {
		$(this).removeClass("selected");
	});
	//导航
	$(".navFloor").find("ul").find("li").on("click", function() {
		var index = $(this).index();
		$(this).addClass("current").siblings("li").removeClass("current");
//		$(".contentFloor").find(".cancelFloor").eq(index).css("display", "block").siblings(".cancelFloor").css("display", "none");
		var offsetTop=$(".contentFloor").find(".cancelFloor").eq(index).offset().top-26;
//		console.log(offsetTop+"   "+index);
		$("html,body").animate({
			scrollTop:offsetTop
		},{duration: 500,easing: "swing"});
		
		autoHeight();
	});
	var ddCell = $("ul.tabFloor li dd");
	ddCell.on("mouseenter", function() {
		ddCell.each(function(i, item) {
			var txt = $.trim($(item).text());
			txt = txt.replace(/[\r\n]/g, "");
			$(item).attr("title", txt);
		});
	});
}

//取消..
function confirmCancel() {
	//选中状态：
	$(document).on("click", "ul.tabFloor li.listDetail dl dd:not([class='number'])", function() {
		if($(this).parent().find("dd.systemNum").hasClass("selected")) {
			$(this).parent().find("dd.systemNum").removeClass("selected");
		} else {
			$(this).parent().find("dd.systemNum").addClass("selected");
		}
	});
	//全选：
	$(".contentFloor .cancelFloor ul.btnList li a.selectAllBtn").on("click", function() {
		if($.trim($(this).text()) == "全选") {
			$(this).parent().parent().parent(".cancelFloor").find("ul.tabFloor li.listDetail dl dd.systemNum").addClass("selected");
			$(this).text("全不选");
		} else {
			$(this).parent().parent().parent(".cancelFloor").find("ul.tabFloor li.listDetail dl dd.systemNum").removeClass("selected");
			$(this).text("全选");
		}
	});
	autoHeight();
	//取消LOCK:
	cancelLock();
	rejectCancelLock();
	lockPagination();
	arrowStatus_lock();
	radminidLockInfo();
	//取消CLEAR:
	cancelClear();
	rejectCancelClear();
	clearPagination();
	arrowStatus_clear();
	radminidClearInfo();
	//取消PAID:
	cancelPaid();
	rejectCancelPaid();
	paidPagination();
	arrowStatus_paid();
	radminidPaidInfo();
	//取消FINISH:
	cancelFinish();
	rejectCancelFinish();
	finishPagination();
	arrowStatus_finish();
	radminidFinishInfo();
}

function autoHeight() {
	var systemNum = $("ul.tabFloor li.listDetail").find("dd.systemNum");
	var profit = $("ul.tabFloor li.listDetail").find("dd.profit");
	var debt = $("ul.tabFloor li.listDetail").find("dd.debt")
	var externalInvoice = $("ul.tabFloor li.listDetail").find("dd.externalInvoice");
	var receivable = $("ul.tabFloor li.listDetail").find("dd.receivable");
	var salePrice = $("ul.tabFloor li.listDetail").find("dd.salePrice");
	var createDate = $("ul.tabFloor li.listDetail").find("dd.createDate");
	var startTime = $("ul.tabFloor li.listDetail").find("dd.startTime");
	var returnTime = $("ul.tabFloor li.listDetail").find("dd.returnTime");
	var lockStatus = $("ul.tabFloor li.listDetail").find("dd.lockStatus");
	var finishStatus = $("ul.tabFloor li.listDetail").find("dd.finishStatus");
	var numberInfo = $("ul.tabFloor li.listDetail").find("dd.number").find("a");
	for(var j = 0; j < systemNum.length; j++) {
		var maxHeight = Math.max($(systemNum[j]).height(), $(profit[j]).height(), $(debt[j]).height(), $(externalInvoice[j]).height(),
			$(receivable[j]).height(), $(salePrice[j]).height(), $(createDate[j]).height(), $(startTime[j]).height(), $(returnTime[j]).height(),
			$(lockStatus[j]).height(), $(finishStatus[j]).height(), $(numberInfo[j]).height());
		if(maxHeight > 30) {
			$("ul.tabFloor li.listDetail").eq(j).find("dl").find("dd").css({
				"height": maxHeight,
				"line-height": maxHeight + "px"
			});
		}
	}
}
//取消LOCK-"取消"
function cancelLock() {
	$(".contentFloor .cancelFloor ul.btnList li a.cancelLockBtn").on("click", function() {
		var len = $(".cancelLock ul.tabFloor li.listDetail dl dd.systemNum.selected").length;
		if(len < 1) {
			alert("至少选中一行");
		} else {
			$(".confirmNoticeInfo").addClass("cancelLockTips");
			$(".confirmNoticeInfo").removeClass("rejectCancelLockTips");
			$(".confirmNoticeInfo").removeClass("cancelClearTips");
			$(".confirmNoticeInfo").removeClass("rejectCancelClearTips");
			$(".confirmNoticeInfo").removeClass("cancelPaidTips");
			$(".confirmNoticeInfo").removeClass("rejectCancelPaidTips");
			$(".confirmNoticeInfo").removeClass("cancelFinishTips");
			$(".confirmNoticeInfo").removeClass("rejectCancelFinishTips");
			$(".cancelLockTips p.confirmNotice").html("取消LOCK<br><span style='font-size:14px;'>该操作会同时取消CLEAR</span>");
			$(".cancelLockTips").css("display", "block");
			//确认
			$(".cancelLockTips").find("p.actionBox").find("button.actionConfirm").unbind("click").on("click", function() {
				//取消LOCK
				$(".cancelLock ul.tabFloor li.listDetail dl dd.systemNum.selected").parent("dl").each(function(i, item) {
					$(item).find("dd.lockStatus").removeClass("yesStatus");
					$(item).find("dd.lockStatus").addClass("noStatus");
					//取消CLEAR
					var debtInfo = $.trim($(item).find("dd.debt").text()).split("|")[0];
					if($.trim(debtInfo) == "Y") {
						var debtArr = [];
						var clearInfo = $.trim($(item).find("dd.debt").text()).split("|");
						for(var j = 0; j < clearInfo.length; j++) {
							debtArr.push(clearInfo[j]);
						}
						debtArr.splice(0, 1, "N");
						$(item).find("dd.debt").text(debtArr[0] + " | " + debtArr[1]);
					}
					setTimeout(function() {
						$(".cancelLockTips").css("display", "none");
					}, 500);
				});

			});
			//取消
			$(".cancelLockTips").find("p.actionBox").find("button.actionCancel").unbind("click").on("click", function() {
				$(".cancelLockTips").css("display", "none");
			});

		}
	});
}
//取消LOCK-"驳回"
function rejectCancelLock() {
	$(".contentFloor .cancelLock ul.btnList li a.rejectBtn").on("click", function() {
		var len = $(".cancelLock ul.tabFloor li.listDetail dl dd.systemNum.selected").length;
		if(len < 1) {
			alert("至少选中一行");
		} else {
			$(".confirmNoticeInfo").addClass("rejectCancelLockTips");
			$(".confirmNoticeInfo").removeClass("cancelLockTips");
			$(".confirmNoticeInfo").removeClass("cancelClearTips");
			$(".confirmNoticeInfo").removeClass("rejectCancelClearTips");
			$(".confirmNoticeInfo").removeClass("cancelPaidTips");
			$(".confirmNoticeInfo").removeClass("rejectCancelPaidTips");
			$(".confirmNoticeInfo").removeClass("cancelFinishTips");
			$(".confirmNoticeInfo").removeClass("rejectCancelFinishTips");
			$(".rejectCancelLockTips p.confirmNotice").html("确认驳回");
			$(".rejectCancelLockTips").css("display", "block");
			//确认
			$(".rejectCancelLockTips").find("p.actionBox").find("button.actionConfirm").unbind("click").on("click", function() {
				setTimeout(function() {
					$(".rejectCancelLockTips").css("display", "none");
				}, 500);
			});
			//取消
			$(".rejectCancelLockTips").find("p.actionBox").find("button.actionCancel").unbind("click").on("click", function() {
				$(".rejectCancelLockTips").css("display", "none");
			});
		}
	});
}
//取消LOCK-分页
function lockPagination() {
	$('#lockPagination').pagination({
		totalData: 20,
		showData: 10,
		coping: true,
		homePage: '首页',
		endPage: '末页',
		prevContent: '上页',
		nextContent: '下页',
		callback: function(api) {
			var j = api.getCurrent(); //获取当前页
			$(".cancelLock ul li.listDetail").remove();
			var e = `<li class="listDetail">
						<dl>
							<dd class="systemNum"></dd>
							<dd class="invoice"></dd>
							<dd class="profit"></dd>
							<dd class="debt"></dd>
							<dd class="receivable"></dd>
							<dd class="salePrice"></dd>
							<dd class="createDate"></dd>
							<dd class="startTime"></dd>
							<dd class="returnTime"></dd>
							<dd class="lockStatus"></dd>
							<dd class="finishStatus"></dd>
							<dd class="number">
								<a href="javascript:void(0);"></a>
							</dd>
						</dl>
					</li>`;
			$(".cancelLock ul.tabFloor").find("li.listTitle").after(e);
			heightRange();
			autoHeight();
		}
	});
}
//取消LOCK-"箭头切换"
function arrowStatus_lock() {
	$(".cancelLock ul li.listTitle dd").on("click", function() {
		if(($(this).find("img.arrow_down").attr("src") == "../img/arrowDown_icon.png") && ($(this).find("img.arrow_up").attr("src") == "../img/arrowUp0_icon.png")) {
			$(this).find("img.arrow_down").attr("src", "../img/arrowDown0_icon.png");
			$(this).find("img.arrow_up").attr("src", "../img/arrowUp_icon.png");
		} else {
			$(this).find("img.arrow_down").attr("src", "../img/arrowDown_icon.png");
			$(this).find("img.arrow_up").attr("src", "../img/arrowUp0_icon.png");
		}
		$(this).siblings("dd").find("img.arrow_down").attr("src", "../img/arrowDown0_icon.png");
		$(this).siblings("dd").find("img.arrow_up").attr("src", "../img/arrowUp0_icon.png");
	});
}
//取消LOCK-关联编号：
function radminidLockInfo() {
	$(".cancelLock ul li dd.number a").on("click", function() {
		if($.trim($(this).text()) == "") {} 
		else {
			var thisLi = $(this).parent().parent().parent("li");
			var summaryNum = $.trim(thisLi.find("dd.number").text());
			var lockInfo = thisLi.find("dd.lockStatus").attr("class"); //LOCK状态
			var clearInfo = $.trim(thisLi.find("dd.debt").text()); //CLEAR
			var finishInfo = thisLi.find("dd.finishStatus").attr("class"); //FINISH
			var paidInfo = thisLi.find("dd.receivable").text(); //PAID
			var finishTxt = $.trim(thisLi.find("dd.finishStatus").text());
			if(thisLi.find("dl.unfold").css("display") == "block") {
				thisLi.find("dl.unfold").remove();
				thisLi.removeClass("current");
				heightRange();
			} else {
				var currentNum = thisLi.find("dd.systemNum").text();
				var numInfo = $.trim($(this).text()).split(",");
				for(var i = 0; i < numInfo.length; i++) {
					var e = `
					<dl class="unfold">
						<dd class="systemNum">` + numInfo[i] + `
						</dd>
						<dd class="invoice"></dd>
						<dd class="profit"></dd>
						<dd class="debt">` + clearInfo + `</dd>
						<dd class="receivable">` + paidInfo + `</dd>
						<dd class="salePrice"></dd>
						<dd class="createDate"></dd>
						<dd class="startTime"></dd>
						<dd class="returnTime"></dd>
						<dd	class="` + lockInfo + `"></dd>
						<dd class="` + finishInfo + `"></dd>
						<dd class="number">
							<a href="javascript:void(0);">
							</a>
						</dd>
					</div>
					`;
					thisLi.append(e);
					autoHeight();
					heightRange();
					$(".cancelLock ul li dl.unfold dd.number a").unbind("click");
				}
				thisLi.addClass("current");
				autoHeight();
			}
		}

	});
}

//取消CLEAR-"取消"
function cancelClear() {
	$(".contentFloor .cancelFloor ul.btnList li a.cancelClearBtn").on("click", function() {
		var len = $(".cancelClear ul.tabFloor li.listDetail dl dd.systemNum.selected").length;
		if(len < 1) {
			alert("至少选中一行");
		} else {
			$(".confirmNoticeInfo").removeClass("rejectCancelLockTips");
			$(".confirmNoticeInfo").removeClass("cancelLockTips");
			$(".confirmNoticeInfo").removeClass("rejectCancelClearTips");
			$(".confirmNoticeInfo").removeClass("cancelPaidTips");
			$(".confirmNoticeInfo").removeClass("rejectCancelPaidTips");
			$(".confirmNoticeInfo").removeClass("cancelFinishTips");
			$(".confirmNoticeInfo").removeClass("rejectCancelFinishTips");
			$(".confirmNoticeInfo").addClass("cancelClearTips");
			$(".cancelClearTips").css("display", "block");
			$(".cancelClearTips p.confirmNotice").html("确认CLEAR");
			//确认
			$(".cancelClearTips").find("p.actionBox").find("button.actionConfirm").unbind("click").on("click", function() {
				$(".cancelClear ul.tabFloor li.listDetail dl dd.systemNum.selected").parent("dl").each(function(i, item) {
					var debtInfo = $.trim($(item).find("dd.debt").text()).split("|")[0];
					if($.trim(debtInfo) == "Y") {
						var debtArr = [];
						var clearInfo = $.trim($(item).find("dd.debt").text()).split("|");
						for(var j = 0; j < clearInfo.length; j++) {
							debtArr.push(clearInfo[j]);
						}
						debtArr.splice(0, 1, "N");
						$(item).find("dd.debt").text(debtArr[0] + " | " + debtArr[1]);
					}
				});
				setTimeout(function() {
					$(".cancelClearTips").css("display", "none");
				}, 500);
			});
			//取消
			$(".cancelClearTips").find("p.actionBox").find("button.actionCancel").unbind("click").on("click", function() {
				$(".cancelClearTips").css("display", "none");
			});
		}
	});
}
//取消CLEAR-"驳回"
function rejectCancelClear() {
	$(".contentFloor .cancelClear ul.btnList li a.rejectBtn").on("click", function() {
		var len = $(".cancelClear ul.tabFloor li.listDetail dl dd.systemNum.selected").length;
		if(len < 1) {
			alert("至少选中一行");
		} else {
			$(".confirmNoticeInfo").addClass("rejectCancelClearTips");
			$(".confirmNoticeInfo").removeClass("rejectCancelLockTips");
			$(".confirmNoticeInfo").removeClass("cancelLockTips");
			$(".confirmNoticeInfo").removeClass("cancelClearTips");
			$(".confirmNoticeInfo").removeClass("cancelPaidTips");
			$(".confirmNoticeInfo").removeClass("rejectCancelPaidTips");
			$(".confirmNoticeInfo").removeClass("cancelFinishTips");
			$(".confirmNoticeInfo").removeClass("rejectCancelFinishTips");
			$(".rejectCancelClearTips p.confirmNotice").html("确认驳回");
			$(".rejectCancelClearTips").css("display", "block");
			//确认
			$(".rejectCancelClearTips").find("p.actionBox").find("button.actionConfirm").unbind("click").on("click", function() {
				setTimeout(function() {
					$(".rejectCancelClearTips").css("display", "none");
				}, 500);
			});
			//取消
			$(".rejectCancelClearTips").find("p.actionBox").find("button.actionCancel").unbind("click").on("click", function() {
				$(".rejectCancelClearTips").css("display", "none");
			});
		}
	});
}
//取消Clear-"分页"
function clearPagination() {
	$('#clearPagination').pagination({
		totalData: 30,
		showData: 10,
		coping: true,
		homePage: '首页',
		endPage: '末页',
		prevContent: '上页',
		nextContent: '下页',
		callback: function(api) {
			var j = api.getCurrent(); //获取当前页
			$(".cancelClear ul li.listDetail").remove();
			var e = `<li class="listDetail">
						<dl>
							<dd class="systemNum"></dd>
							<dd class="invoice"></dd>
							<dd class="profit"></dd>
							<dd class="debt"></dd>
							<dd class="receivable"></dd>
							<dd class="salePrice"></dd>
							<dd class="createDate"></dd>
							<dd class="startTime"></dd>
							<dd class="returnTime"></dd>
							<dd class="lockStatus"></dd>
							<dd class="finishStatus"></dd>
							<dd class="number">
								<a href="javascript:void(0);"></a>
							</dd>
						</dl>
					</li>`;
			$(".cancelClear ul.tabFloor").find("li.listTitle").after(e);
			heightRange();
			autoHeight();
		}
	});
}

//取消Clear"箭头切换"
function arrowStatus_clear() {
	$(".cancelClear ul li.listTitle dd").on("click", function() {
		if(($(this).find("img.arrow_down").attr("src") == "../img/arrowDown_icon.png") && ($(this).find("img.arrow_up").attr("src") == "../img/arrowUp0_icon.png")) {
			$(this).find("img.arrow_down").attr("src", "../img/arrowDown0_icon.png");
			$(this).find("img.arrow_up").attr("src", "../img/arrowUp_icon.png");
		} else {
			$(this).find("img.arrow_down").attr("src", "../img/arrowDown_icon.png");
			$(this).find("img.arrow_up").attr("src", "../img/arrowUp0_icon.png");
		}
		$(this).siblings("dd").find("img.arrow_down").attr("src", "../img/arrowDown0_icon.png");
		$(this).siblings("dd").find("img.arrow_up").attr("src", "../img/arrowUp0_icon.png");
	});
}
//取消Clear-关联编号：
function radminidClearInfo() {
	$(".cancelClear ul li dd.number a").on("click", function() {
		if($.trim($(this).text()) == "") {} 
		else {
			var thisLi = $(this).parent().parent().parent("li");
			var summaryNum = $.trim(thisLi.find("dd.number").text());
			var lockInfo = thisLi.find("dd.lockStatus").attr("class"); //LOCK状态
			var clearInfo = $.trim(thisLi.find("dd.debt").text()); //CLEAR
			var finishInfo = thisLi.find("dd.finishStatus").attr("class"); //FINISH
			var paidInfo = thisLi.find("dd.receivable").text(); //PAID
			var finishTxt = $.trim(thisLi.find("dd.finishStatus").text());
			if(thisLi.find("dl.unfold").css("display") == "block") {
				thisLi.find("dl.unfold").remove();
				thisLi.removeClass("current");
				heightRange();
			} else {
				var currentNum = thisLi.find("dd.systemNum").text();
				var numInfo = $.trim($(this).text()).split(",");
				for(var i = 0; i < numInfo.length; i++) {
					var e = `
					<dl class="unfold">
						<dd class="systemNum">` + numInfo[i] + `
						</dd>
						<dd class="invoice"></dd>
						<dd class="profit"></dd>
						<dd class="debt">` + clearInfo + `</dd>
						<dd class="receivable">` + paidInfo + `</dd>
						<dd class="salePrice"></dd>
						<dd class="createDate"></dd>
						<dd class="startTime"></dd>
						<dd class="returnTime"></dd>
						<dd	class="` + lockInfo + `"></dd>
						<dd class="` + finishInfo + `"></dd>
						<dd class="number">
							<a href="javascript:void(0);">
							
							</a>
						</dd>
					</div>
					`;
					thisLi.append(e);
					autoHeight();
					heightRange();
					$(".cancelClear ul li dl.unfold dd.number a").unbind("click");
				}
				thisLi.addClass("current");
				autoHeight();
			}
		}

	});
}
//取消PAID-"取消"
function cancelPaid() {
	$(".contentFloor .cancelFloor ul.btnList li a.cancelPaidBtn").on("click", function() {

		var len = $(".cancelPaid ul.tabFloor li.listDetail dl dd.systemNum.selected").length;
		if(len < 1) {
			alert("至少选中一行");
		} else {
			$(".confirmNoticeInfo").addClass("cancelPaidTips");
			$(".confirmNoticeInfo").removeClass("cancelLockTips");
			$(".confirmNoticeInfo").removeClass("rejectCancelLockTips");
			$(".confirmNoticeInfo").removeClass("cancelClearTips");
			$(".confirmNoticeInfo").removeClass("rejectCancelClearTips");
			$(".confirmNoticeInfo").removeClass("rejectCancelPaidTips");
			$(".confirmNoticeInfo").removeClass("cancelFinishTips");
			$(".confirmNoticeInfo").removeClass("rejectCancelFinishTips");
			$(".cancelPaidTips").css("display", "block");
			var ccNum = 0;
			$(".cancelPaid ul.tabFloor li.listDetail dl dd.systemNum.selected").parent("dl").each(function(j, cell) {
				if(($.trim($(cell).find("dd.receivable").text()) == "CC")) {
					ccNum++;
					if(ccNum == 1) {
						$(".cancelPaidTips p.confirmNotice").html("CC支付无法取消PAID");
					}
					if(ccNum > 1) {
						$(".cancelPaidTips p.confirmNotice").html("部分订单为CC支付<br>无法同时取消PAID");
					}
					$(".cancelPaidTips .confirmTitle img").attr("src", "../img/error_icon.png");
					$(".cancelPaidTips").find("p.actionBox").find("button.actionConfirm").css("display", "none");
					$(".cancelPaidTips").find("p.actionBox").find("button.actionCancel").text("返回");
					$(".cancelPaidTips").find("p.actionBox").find("button.actionCancel").css("width", "100%");
				} else {
					$(".cancelPaidTips p.confirmNotice").text("取消PAID");
					$(".cancelPaidTips p.confirmNotice").html("取消PAID<br><span style='font-size:14px;'>该操作会同时取消FINISH</span>");
					$(".cancelPaidTips").find("p.actionBox").find("button.actionConfirm").css("display", "inline-block");
					$(".cancelPaidTips").find("p.actionBox").find("button.actionCancel").text("取消");
					$(".cancelPaidTips").find("p.actionBox").find("button.actionCancel").css("width", "50%");
					$(".cancelPaidTips .confirmTitle img").attr("src", "../img/confirmInfo.png");
				}

			});

			//确认
			$(".cancelPaidTips").find("p.actionBox").find("button.actionConfirm").unbind("click").on("click", function() {
				$(".cancelPaid ul.tabFloor li.listDetail dl dd.systemNum.selected").parent("dl").each(function(i, item) {
					var receivableType = $.trim($(item).find("dd.receivable").text()).split("|")[0];
					//改变应收款的状态
					if($.trim(receivableType) == "Y") {
						var receivableArr = [];
						var paidInfo = $.trim($(item).find("dd.receivable").text()).split("|");
						for(var j = 0; j < paidInfo.length; j++) {
							receivableArr.push(paidInfo[j]);
						}
						receivableArr.splice(0, 1, "N");
						$(item).find("dd.receivable").text(receivableArr[0] + " | " + receivableArr[1]);
					}
					//Finish状态：
					if($(item).find("dd.finishStatus").hasClass("yesStatus")) {
						$(item).find("dd.finishStatus").removeClass("yesStatus");
						$(item).find("dd.finishStatus").addClass("noStatus");
					}
				});
				setTimeout(function() {
					$(".cancelPaidTips").css("display", "none");
				}, 500);
			});
			//取消：
			$(".cancelPaidTips").find("p.actionBox").find("button.actionCancel").unbind("click").on("click", function() {
				$(".cancelPaidTips").css("display", "none");
			});

		}

	});

}
//取消PAID-"驳回"：
function rejectCancelPaid() {
	$(".contentFloor .cancelPaid ul.btnList li a.rejectBtn").on("click", function() {
		var len = $(".cancelPaid ul.tabFloor li.listDetail dl dd.systemNum.selected").length;
		if(len < 1) {
			alert("至少选中一行");
		} 
		else {
			$(".confirmNoticeInfo").removeClass("rejectCancelClearTips");
			$(".confirmNoticeInfo").removeClass("rejectCancelLockTips");
			$(".confirmNoticeInfo").removeClass("cancelLockTips");
			$(".confirmNoticeInfo").removeClass("cancelClearTips");
			$(".confirmNoticeInfo").removeClass("cancelPaidTips");
			$(".confirmNoticeInfo").removeClass("cancelFinishTips");
			$(".confirmNoticeInfo").removeClass("rejectCancelFinishTips");
			$(".confirmNoticeInfo").addClass("rejectCancelPaidTips");
			$(".rejectCancelPaidTips p.confirmNotice").html("确认驳回");
			$(".rejectCancelPaidTips").css("display", "block");
			//确认
			$(".rejectCancelPaidTips").find("p.actionBox").find("button.actionConfirm").unbind("click").on("click", function() {
				setTimeout(function() {
					$(".rejectCancelPaidTips").css("display", "none");
				}, 500);
			});
			//取消
			$(".rejectCancelPaidTips").find("p.actionBox").find("button.actionCancel").unbind("click").on("click", function() {
				$(".rejectCancelPaidTips").css("display", "none");
			});
		}
	});
}
//取消PAID-"分页"
function paidPagination() {
	$('#paidPagination').pagination({
		totalData: 10,
		showData: 10,
		coping: true,
		homePage: '首页',
		endPage: '末页',
		prevContent: '上页',
		nextContent: '下页',
		callback: function(api) {
			var j = api.getCurrent(); //获取当前页
			$(".cancelPaid ul li.listDetail").remove();
			var e = `<li class="listDetail">
						<dl>
							<dd class="systemNum"></dd>
							<dd class="invoice"></dd>
							<dd class="profit"></dd>
							<dd class="debt"></dd>
							<dd class="receivable"></dd>
							<dd class="salePrice"></dd>
							<dd class="createDate"></dd>
							<dd class="startTime"></dd>
							<dd class="returnTime"></dd>
							<dd class="lockStatus"></dd>
							<dd class="finishStatus"></dd>
							<dd class="number">
								<a href="javascript:void(0);"></a>
							</dd>
						</dl>
					</li>`;
			$(".cancelPaid ul.tabFloor").find("li.listTitle").after(e);
			heightRange();
			autoHeight();
			
		}
	});
}
//取消PAID-"切换"
function arrowStatus_paid() {
	$(".cancelPaid ul li.listTitle dd").on("click", function() {
		if(($(this).find("img.arrow_down").attr("src") == "../img/arrowDown_icon.png") && ($(this).find("img.arrow_up").attr("src") == "../img/arrowUp0_icon.png")) {
			$(this).find("img.arrow_down").attr("src", "../img/arrowDown0_icon.png");
			$(this).find("img.arrow_up").attr("src", "../img/arrowUp_icon.png");
		} else {
			$(this).find("img.arrow_down").attr("src", "../img/arrowDown_icon.png");
			$(this).find("img.arrow_up").attr("src", "../img/arrowUp0_icon.png");
		}
		$(this).siblings("dd").find("img.arrow_down").attr("src", "../img/arrowDown0_icon.png");
		$(this).siblings("dd").find("img.arrow_up").attr("src", "../img/arrowUp0_icon.png");
	});
}
//取消Paid-关联编号：
function radminidPaidInfo() {
	$(".cancelPaid ul li dd.number a").on("click", function() {
		if($.trim($(this).text()) == "") {} 
		else {
			var thisLi = $(this).parent().parent().parent("li");
			var summaryNum = $.trim(thisLi.find("dd.number").text());
			var lockInfo = thisLi.find("dd.lockStatus").attr("class"); //LOCK状态
			var clearInfo = $.trim(thisLi.find("dd.debt").text()); //CLEAR
			var finishInfo = thisLi.find("dd.finishStatus").attr("class"); //FINISH
			var paidInfo = thisLi.find("dd.receivable").text(); //PAID
			var finishTxt = $.trim(thisLi.find("dd.finishStatus").text());
			if(thisLi.find("dl.unfold").css("display") == "block") {
				thisLi.find("dl.unfold").remove();
				thisLi.removeClass("current");
				heightRange();
			} 
			else {
				var currentNum = thisLi.find("dd.systemNum").text();
				var numInfo = $.trim($(this).text()).split(",");
				for(var i = 0; i < numInfo.length; i++) {
					var e = `
					<dl class="unfold">
						<dd class="systemNum">` + numInfo[i] + `
						</dd>
						<dd class="invoice"></dd>
						<dd class="profit"></dd>
						<dd class="debt">` + clearInfo + `</dd>
						<dd class="receivable">` + paidInfo + `</dd>
						<dd class="salePrice"></dd>
						<dd class="createDate"></dd>
						<dd class="startTime"></dd>
						<dd class="returnTime"></dd>
						<dd	class="` + lockInfo + `"></dd>
						<dd class="` + finishInfo + `"></dd>
						<dd class="number">
							<a href="javascript:void(0);">
							
							</a>
						</dd>
					</div>
					`;
					thisLi.append(e);
					autoHeight();
					heightRange();
					$(".cancelPaid ul li dl.unfold dd.number a").unbind("click");
				}
				thisLi.addClass("current");
				autoHeight();
			}
		}

	});
}


//取消FINISH-"取消":
function cancelFinish() {
	$(".contentFloor .cancelFloor ul.btnList li a.cancelFinishBtn").on("click", function() {
		var len = $(".cancelFinish ul.tabFloor li.listDetail dl dd.systemNum.selected").length;
		if(len < 1) {
			alert("至少选中一行");
		} 
		else {
			$(".confirmNoticeInfo").removeClass("cancelLockTips");
			$(".confirmNoticeInfo").removeClass("rejectCancelLockTips");
			$(".confirmNoticeInfo").removeClass("cancelClearTips");
			$(".confirmNoticeInfo").removeClass("rejectCancelClearTips");
			$(".confirmNoticeInfo").removeClass("cancelPaidTips");
			$(".confirmNoticeInfo").removeClass("rejectCancelPaidTips");
			$(".confirmNoticeInfo").removeClass("rejectCancelFinishTips");
			$(".confirmNoticeInfo").addClass("cancelFinishTips");

			$(".cancelFinishTips p.confirmNotice").text("取消FINISH");
			$(".cancelFinishTips").css("display","block");
			//确认：
			$(".cancelFinishTips").find("p.actionBox").find("button.actionConfirm").unbind("click").on("click", function() {
				$(".cancelFinish ul.tabFloor li.listDetail dl dd.systemNum.selected").parent("dl").each(function(i, item) {
					if($(item).find("dd.finishStatus").hasClass("yesStatus")) {
						$(item).find("dd.finishStatus").removeClass("yesStatus");
						$(item).find("dd.finishStatus").addClass("noStatus");
					}
					setTimeout(function() {
						$(".cancelFinishTips").css("display", "none");
					}, 500);
				});
			});
			//取消：
			$(".cancelFinishTips").find("p.actionBox").find("button.actionCancel").unbind("click").on("click", function() {
				$(".cancelFinishTips").css("display", "none");
			});

		}

	});
}
//取消FINISH-"驳回":
function rejectCancelFinish() {
	$(".contentFloor .cancelFinish  ul.btnList li a.rejectBtn").on("click", function() {
		var len = $(".cancelFinish ul.tabFloor li.listDetail dl dd.systemNum.selected").length;
		if(len < 1) {
			alert("至少选中一行");
		} else {
			$(".confirmNoticeInfo").removeClass("rejectCancelClearTips");
			$(".confirmNoticeInfo").removeClass("rejectCancelLockTips");
			$(".confirmNoticeInfo").removeClass("cancelLockTips");
			$(".confirmNoticeInfo").removeClass("cancelClearTips");
			$(".confirmNoticeInfo").removeClass("cancelPaidTips");
			$(".confirmNoticeInfo").removeClass("cancelFinishTips");
			$(".confirmNoticeInfo").removeClass("rejectCancelPaidTips");
			$(".confirmNoticeInfo").addClass("rejectCancelFinishTips");
			$(".rejectCancelFinishTips p.confirmNotice").html("确认驳回");
			$(".rejectCancelFinishTips").css("display", "block");
			//确认
			$(".rejectCancelFinishTips").find("p.actionBox").find("button.actionConfirm").unbind("click").on("click", function() {
				setTimeout(function() {
					$(".rejectCancelFinishTips").css("display", "none");
				}, 500);
			});
			//取消
			$(".rejectCancelFinishTips").find("p.actionBox").find("button.actionCancel").unbind("click").on("click", function() {
				$(".rejectCancelFinishTips").css("display", "none");
			});
		}
	});
}
//取消FINISH-"分页":
function finishPagination() {
	$('#finishPagination').pagination({
		totalData: 10,
		showData: 2,
		coping: true,
		homePage: '首页',
		endPage: '末页',
		prevContent: '上页',
		nextContent: '下页',
		callback: function(api) {
			var j = api.getCurrent(); //获取当前页
			$(".cancelFinish ul li.listDetail").remove();
			var e = `<li class="listDetail">
						<dl>
							<dd class="systemNum"></dd>
							<dd class="invoice"></dd>
							<dd class="profit"></dd>
							<dd class="debt"></dd>
							<dd class="receivable"></dd>
							<dd class="salePrice"></dd>
							<dd class="createDate"></dd>
							<dd class="startTime"></dd>
							<dd class="returnTime"></dd>
							<dd class="lockStatus"></dd>
							<dd class="finishStatus"></dd>
							<dd class="number">
								<a href="javascript:void(0);"></a>
							</dd>
						</dl>
					</li>`;
			$(".cancelFinish ul.tabFloor").find("li.listTitle").after(e);
			heightRange();
			autoHeight();
			
		}
	});
}
//取消FINISH-"切换":
function arrowStatus_finish() {
	$(".cancelFinish ul li.listTitle dd").on("click", function() {
		if(($(this).find("img.arrow_down").attr("src") == "../img/arrowDown_icon.png") && ($(this).find("img.arrow_up").attr("src") == "../img/arrowUp0_icon.png")) {
			$(this).find("img.arrow_down").attr("src", "../img/arrowDown0_icon.png");
			$(this).find("img.arrow_up").attr("src", "../img/arrowUp_icon.png");
		} else {
			$(this).find("img.arrow_down").attr("src", "../img/arrowDown_icon.png");
			$(this).find("img.arrow_up").attr("src", "../img/arrowUp0_icon.png");
		}
		$(this).siblings("dd").find("img.arrow_down").attr("src", "../img/arrowDown0_icon.png");
		$(this).siblings("dd").find("img.arrow_up").attr("src", "../img/arrowUp0_icon.png");
	});
}
//取消Paid-关联编号：
function radminidFinishInfo() {
	$(".cancelFinish ul li dd.number a").on("click", function() {
		if($.trim($(this).text()) == "") {} 
		else {
			var thisLi = $(this).parent().parent().parent("li");
			var summaryNum = $.trim(thisLi.find("dd.number").text());
			var lockInfo = thisLi.find("dd.lockStatus").attr("class"); //LOCK状态
			var clearInfo = $.trim(thisLi.find("dd.debt").text()); //CLEAR
			var finishInfo = thisLi.find("dd.finishStatus").attr("class"); //FINISH
			var paidInfo = thisLi.find("dd.receivable").text(); //PAID
			var finishTxt = $.trim(thisLi.find("dd.finishStatus").text());
			if(thisLi.find("dl.unfold").css("display") == "block") {
				thisLi.find("dl.unfold").remove();
				thisLi.removeClass("current");
				heightRange();
			} else {
				var currentNum = thisLi.find("dd.systemNum").text();
				var numInfo = $.trim($(this).text()).split(",");
				for(var i = 0; i < numInfo.length; i++) {
					var e = `
					<dl class="unfold">
						<dd class="systemNum">` + numInfo[i] + `
						</dd>
						<dd class="invoice"></dd>
						<dd class="profit"></dd>
						<dd class="debt">` + clearInfo + `</dd>
						<dd class="receivable">` + paidInfo + `</dd>
						<dd class="salePrice"></dd>
						<dd class="createDate"></dd>
						<dd class="startTime"></dd>
						<dd class="returnTime"></dd>
						<dd	class="` + lockInfo + `"></dd>
						<dd class="` + finishInfo + `"></dd>
						<dd class="number">
							<a href="javascript:void(0);">
							
							</a>
						</dd>
					</div>
					`;
					thisLi.append(e);
					autoHeight();
					heightRange();
					$(".cancelFinish ul li dl.unfold dd.number a").unbind("click");
				}
				thisLi.addClass("current");
				autoHeight();
			}
		}

	});
}
//返回顶部：
function backToTop() {
	$(".contentFloor a.backTop").on("click", function() {
		$("html, body").animate({
			scrollTop: 0
		});
	});
}