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
		var offsetTop=$(".contentFloor").find(".cancelFloor").eq(index).offset().top-26;
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
		var len=$(this).parent().parent().parent().find("li.listDetail").length;
		if($(this).parent().find("dd.systemNum").hasClass("selected")) {
			$(this).parent().find("dd.systemNum").removeClass("selected");
			if($(this).parent().parent().parent().find("dd.systemNum.selected").length==0){
				$(this).parent().parent("li.listDetail").parent("ul").siblings("ul.btnList").find("a.selectAllBtn").text("全选");
			}
		}
		else {
			$(this).parent().find("dd.systemNum").addClass("selected");
			if($(this).parent().parent().parent().find("dd.systemNum.selected").length==len){
				$(this).parent().parent("li.listDetail").parent("ul").siblings("ul.btnList").find("a.selectAllBtn").text("全不选");
			}
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
	arrowStatus_lock();
//	radminidLockInfo();
	//取消CLEAR:
	cancelClear();
	rejectCancelClear();
	arrowStatus_clear();
//	radminidClearInfo();
	//取消PAID:
	cancelPaid();
	rejectCancelPaid();
	arrowStatus_paid();
//	radminidPaidInfo();
	//取消FINISH:
	cancelFinish();
	rejectCancelFinish();
	arrowStatus_finish();
//	radminidFinishInfo();
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
				var ap_ip_list = [];
				for (var i = 0; i < $(".cancelLock ul.tabFloor li.listDetail dl dd.systemNum.selected").length; i++) {
					var id = $(".cancelLock ul.tabFloor li.listDetail dl dd.systemNum.selected")[i].innerText;
					ap_ip_list.push(lock_ap_id[Number(id)]);
				}
				$.ajax({
		      url: location.protocol.concat("//").concat(location.host).concat('/database/Management/audit/cancelLock.php'),
		      type: 'POST',
					data: {
						ap_id_list: JSON.stringify(ap_ip_list)
					},
		      success: function(response) {
						location.reload();
		      },
		      error: function(jqXHR, textStatus, errorThrown) {
		        console.log(textStatus, errorThrown);
		      }
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
				var ap_ip_list = [];
				for (var i = 0; i < $(".cancelLock ul.tabFloor li.listDetail dl dd.systemNum.selected").length; i++) {
					var id = $(".cancelLock ul.tabFloor li.listDetail dl dd.systemNum.selected")[i].innerText;
					ap_ip_list.push(lock_ap_id[Number(id)]);
				}
				$.ajax({
					url: location.protocol.concat("//").concat(location.host).concat('/database/Management/audit/reject.php'),
					type: 'POST',
					data: {
						ap_id_list: JSON.stringify(ap_ip_list)
					},
					success: function(response) {
						location.reload();
					},
					error: function(jqXHR, textStatus, errorThrown) {
						console.log(textStatus, errorThrown);
					}
				});
			});
			//取消
			$(".rejectCancelLockTips").find("p.actionBox").find("button.actionCancel").unbind("click").on("click", function() {
				$(".rejectCancelLockTips").css("display", "none");
			});
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
//function radminidLockInfo() {
//	$(".cancelLock ul li dd.number a").on("click", function() {
//		if($.trim($(this).text()) == "") {}
//		else {
//			var thisLi = $(this).parent().parent().parent("li");
//			var summaryNum = $.trim(thisLi.find("dd.number").text());
//			var lockInfo = thisLi.find("dd.lockStatus").attr("class"); //LOCK状态
//			var clearInfo = $.trim(thisLi.find("dd.debt").text()); //CLEAR
//			var finishInfo = thisLi.find("dd.finishStatus").attr("class"); //FINISH
//			var paidInfo = thisLi.find("dd.receivable").text(); //PAID
//			var finishTxt = $.trim(thisLi.find("dd.finishStatus").text());
//			if(thisLi.find("dl.unfold").css("display") == "block") {
//				thisLi.find("dl.unfold").remove();
//				thisLi.removeClass("current");
//				heightRange();
//			} else {
//				var currentNum = thisLi.find("dd.systemNum").text();
//				var numInfo = $.trim($(this).text()).split(",");
//				for(var i = 0; i < numInfo.length; i++) {
//					var e = `
//					<dl class="unfold">
//						<dd class="systemNum">` + numInfo[i] + `
//						</dd>
//						<dd class="invoice"></dd>
//						<dd class="profit"></dd>
//						<dd class="debt">` + clearInfo + `</dd>
//						<dd class="receivable">` + paidInfo + `</dd>
//						<dd class="salePrice"></dd>
//						<dd class="createDate"></dd>
//						<dd class="startTime"></dd>
//						<dd class="returnTime"></dd>
//						<dd	class="` + lockInfo + `"></dd>
//						<dd class="` + finishInfo + `"></dd>
//						<dd class="number">
//							<a href="javascript:void(0);">
//							</a>
//						</dd>
//					</div>
//					`;
//					thisLi.append(e);
//					autoHeight();
//					heightRange();
//					$(".cancelLock ul li dl.unfold dd.number a").unbind("click");
//				}
//				thisLi.addClass("current");
//				autoHeight();
//			}
//		}
//
//	});
//}

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
			$(".cancelClearTips p.confirmNotice").html("取消CLEAR");
			//确认
			$(".cancelClearTips").find("p.actionBox").find("button.actionConfirm").unbind("click").on("click", function() {
				var ap_ip_list = [];
				for (var i = 0; i < $(".cancelClear ul.tabFloor li.listDetail dl dd.systemNum.selected").length; i++) {
					var id = $(".cancelClear ul.tabFloor li.listDetail dl dd.systemNum.selected")[i].innerText;
					ap_ip_list.push(clear_ap_id[Number(id)]);
				}
				$.ajax({
		      url: location.protocol.concat("//").concat(location.host).concat('/database/Management/audit/cancelClear.php'),
		      type: 'POST',
					data: {
						ap_id_list: JSON.stringify(ap_ip_list)
					},
		      success: function(response) {
						location.reload();
		      },
		      error: function(jqXHR, textStatus, errorThrown) {
		        console.log(textStatus, errorThrown);
		      }
		    });
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
				var ap_ip_list = [];
				for (var i = 0; i < $(".cancelClear ul.tabFloor li.listDetail dl dd.systemNum.selected").length; i++) {
					var id = $(".cancelClear ul.tabFloor li.listDetail dl dd.systemNum.selected")[i].innerText;
					ap_ip_list.push(clear_ap_id[Number(id)]);
				}
				$.ajax({
					url: location.protocol.concat("//").concat(location.host).concat('/database/Management/audit/reject.php'),
					type: 'POST',
					data: {
						ap_id_list: JSON.stringify(ap_ip_list)
					},
					success: function(response) {
						location.reload();
					},
					error: function(jqXHR, textStatus, errorThrown) {
						console.log(textStatus, errorThrown);
					}
				});
			});
			//取消
			$(".rejectCancelClearTips").find("p.actionBox").find("button.actionCancel").unbind("click").on("click", function() {
				$(".rejectCancelClearTips").css("display", "none");
			});
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
//function radminidClearInfo() {
//	$(".cancelClear ul li dd.number a").on("click", function() {
//		if($.trim($(this).text()) == "") {}
//		else {
//			var thisLi = $(this).parent().parent().parent("li");
//			var summaryNum = $.trim(thisLi.find("dd.number").text());
//			var lockInfo = thisLi.find("dd.lockStatus").attr("class"); //LOCK状态
//			var clearInfo = $.trim(thisLi.find("dd.debt").text()); //CLEAR
//			var finishInfo = thisLi.find("dd.finishStatus").attr("class"); //FINISH
//			var paidInfo = thisLi.find("dd.receivable").text(); //PAID
//			var finishTxt = $.trim(thisLi.find("dd.finishStatus").text());
//			if(thisLi.find("dl.unfold").css("display") == "block") {
//				thisLi.find("dl.unfold").remove();
//				thisLi.removeClass("current");
//				heightRange();
//			} else {
//				var currentNum = thisLi.find("dd.systemNum").text();
//				var numInfo = $.trim($(this).text()).split(",");
//				for(var i = 0; i < numInfo.length; i++) {
//					var e = `
//					<dl class="unfold">
//						<dd class="systemNum">` + numInfo[i] + `
//						</dd>
//						<dd class="invoice"></dd>
//						<dd class="profit"></dd>
//						<dd class="debt">` + clearInfo + `</dd>
//						<dd class="receivable">` + paidInfo + `</dd>
//						<dd class="salePrice"></dd>
//						<dd class="createDate"></dd>
//						<dd class="startTime"></dd>
//						<dd class="returnTime"></dd>
//						<dd	class="` + lockInfo + `"></dd>
//						<dd class="` + finishInfo + `"></dd>
//						<dd class="number">
//							<a href="javascript:void(0);">
//
//							</a>
//						</dd>
//					</div>
//					`;
//					thisLi.append(e);
//					autoHeight();
//					heightRange();
//					$(".cancelClear ul li dl.unfold dd.number a").unbind("click");
//				}
//				thisLi.addClass("current");
//				autoHeight();
//			}
//		}
//
//	});
//}
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
				var ap_ip_list = [];
				for (var i = 0; i < $(".cancelPaid ul.tabFloor li.listDetail dl dd.systemNum.selected").length; i++) {
					var id = $(".cancelPaid ul.tabFloor li.listDetail dl dd.systemNum.selected")[i].innerText;
					ap_ip_list.push(paid_ap_id[Number(id)]);
				}
				$.ajax({
		      url: location.protocol.concat("//").concat(location.host).concat('/database/Management/audit/cancelPaid.php'),
		      type: 'POST',
					data: {
						ap_id_list: JSON.stringify(ap_ip_list)
					},
		      success: function(response) {
						location.reload();
		      },
		      error: function(jqXHR, textStatus, errorThrown) {
		        console.log(textStatus, errorThrown);
		      }
		    });
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
				var ap_ip_list = [];
				for (var i = 0; i < $(".cancelPaid ul.tabFloor li.listDetail dl dd.systemNum.selected").length; i++) {
					var id = $(".cancelPaid ul.tabFloor li.listDetail dl dd.systemNum.selected")[i].innerText;
					ap_ip_list.push(paid_ap_id[Number(id)]);
				}
				$.ajax({
					url: location.protocol.concat("//").concat(location.host).concat('/database/Management/audit/reject.php'),
					type: 'POST',
					data: {
						ap_id_list: JSON.stringify(ap_ip_list)
					},
					success: function(response) {
						location.reload();
					},
					error: function(jqXHR, textStatus, errorThrown) {
						console.log(textStatus, errorThrown);
					}
				});
			});
			//取消
			$(".rejectCancelPaidTips").find("p.actionBox").find("button.actionCancel").unbind("click").on("click", function() {
				$(".rejectCancelPaidTips").css("display", "none");
			});
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
//function radminidPaidInfo() {
//	$(".cancelPaid ul li dd.number a").on("click", function() {
//		if($.trim($(this).text()) == "") {}
//		else {
//			var thisLi = $(this).parent().parent().parent("li");
//			var summaryNum = $.trim(thisLi.find("dd.number").text());
//			var lockInfo = thisLi.find("dd.lockStatus").attr("class"); //LOCK状态
//			var clearInfo = $.trim(thisLi.find("dd.debt").text()); //CLEAR
//			var finishInfo = thisLi.find("dd.finishStatus").attr("class"); //FINISH
//			var paidInfo = thisLi.find("dd.receivable").text(); //PAID
//			var finishTxt = $.trim(thisLi.find("dd.finishStatus").text());
//			if(thisLi.find("dl.unfold").css("display") == "block") {
//				thisLi.find("dl.unfold").remove();
//				thisLi.removeClass("current");
//				heightRange();
//			}
//			else {
//				var currentNum = thisLi.find("dd.systemNum").text();
//				var numInfo = $.trim($(this).text()).split(",");
//				for(var i = 0; i < numInfo.length; i++) {
//					var e = `
//					<dl class="unfold">
//						<dd class="systemNum">` + numInfo[i] + `
//						</dd>
//						<dd class="invoice"></dd>
//						<dd class="profit"></dd>
//						<dd class="debt">` + clearInfo + `</dd>
//						<dd class="receivable">` + paidInfo + `</dd>
//						<dd class="salePrice"></dd>
//						<dd class="createDate"></dd>
//						<dd class="startTime"></dd>
//						<dd class="returnTime"></dd>
//						<dd	class="` + lockInfo + `"></dd>
//						<dd class="` + finishInfo + `"></dd>
//						<dd class="number">
//							<a href="javascript:void(0);">
//
//							</a>
//						</dd>
//					</div>
//					`;
//					thisLi.append(e);
//					autoHeight();
//					heightRange();
//					$(".cancelPaid ul li dl.unfold dd.number a").unbind("click");
//				}
//				thisLi.addClass("current");
//				autoHeight();
//			}
//		}
//
//	});
//}

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
				var ap_ip_list = [];
				for (var i = 0; i < $(".cancelFinish ul.tabFloor li.listDetail dl dd.systemNum.selected").length; i++) {
					var id = $(".cancelFinish ul.tabFloor li.listDetail dl dd.systemNum.selected")[i].innerText;
					ap_ip_list.push(finish_ap_id[Number(id)]);
				}
				$.ajax({
		      url: location.protocol.concat("//").concat(location.host).concat('/database/Management/audit/cancelFinish.php'),
		      type: 'POST',
					data: {
						ap_id_list: JSON.stringify(ap_ip_list)
					},
		      success: function(response) {
						location.reload();
		      },
		      error: function(jqXHR, textStatus, errorThrown) {
		        console.log(textStatus, errorThrown);
		      }
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
				var ap_ip_list = [];
				for (var i = 0; i < $(".cancelFinish ul.tabFloor li.listDetail dl dd.systemNum.selected").length; i++) {
					var id = $(".cancelFinish ul.tabFloor li.listDetail dl dd.systemNum.selected")[i].innerText;
					ap_ip_list.push(finish_ap_id[Number(id)]);
				}
				$.ajax({
					url: location.protocol.concat("//").concat(location.host).concat('/database/Management/audit/reject.php'),
					type: 'POST',
					data: {
						ap_id_list: JSON.stringify(ap_ip_list)
					},
					success: function(response) {
						location.reload();
					},
					error: function(jqXHR, textStatus, errorThrown) {
						console.log(textStatus, errorThrown);
					}
				});
			});
			//取消
			$(".rejectCancelFinishTips").find("p.actionBox").find("button.actionCancel").unbind("click").on("click", function() {
				$(".rejectCancelFinishTips").css("display", "none");
			});
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
//function radminidFinishInfo() {
//	$(".cancelFinish ul li dd.number a").on("click", function() {
//		if($.trim($(this).text()) == "") {}
//		else {
//			var thisLi = $(this).parent().parent().parent("li");
//			var summaryNum = $.trim(thisLi.find("dd.number").text());
//			var lockInfo = thisLi.find("dd.lockStatus").attr("class"); //LOCK状态
//			var clearInfo = $.trim(thisLi.find("dd.debt").text()); //CLEAR
//			var finishInfo = thisLi.find("dd.finishStatus").attr("class"); //FINISH
//			var paidInfo = thisLi.find("dd.receivable").text(); //PAID
//			var finishTxt = $.trim(thisLi.find("dd.finishStatus").text());
//			if(thisLi.find("dl.unfold").css("display") == "block") {
//				thisLi.find("dl.unfold").remove();
//				thisLi.removeClass("current");
//				heightRange();
//			} else {
//				var currentNum = thisLi.find("dd.systemNum").text();
//				var numInfo = $.trim($(this).text()).split(",");
//				for(var i = 0; i < numInfo.length; i++) {
//					var e = `
//					<dl class="unfold">
//						<dd class="systemNum">` + numInfo[i] + `
//						</dd>
//						<dd class="invoice"></dd>
//						<dd class="profit"></dd>
//						<dd class="debt">` + clearInfo + `</dd>
//						<dd class="receivable">` + paidInfo + `</dd>
//						<dd class="salePrice"></dd>
//						<dd class="createDate"></dd>
//						<dd class="startTime"></dd>
//						<dd class="returnTime"></dd>
//						<dd	class="` + lockInfo + `"></dd>
//						<dd class="` + finishInfo + `"></dd>
//						<dd class="number">
//							<a href="javascript:void(0);">
//
//							</a>
//						</dd>
//					</div>
//					`;
//					thisLi.append(e);
//					autoHeight();
//					heightRange();
//					$(".cancelFinish ul li dl.unfold dd.number a").unbind("click");
//				}
//				thisLi.addClass("current");
//				autoHeight();
//			}
//		}
//
//	});
//}
//返回顶部：

function backToTop() {
	$(".contentFloor a.backTop").on("click", function() {
		$("html, body").animate({
			scrollTop: 0
		});
	});
}

$(document).ready(function () {
	function loadUnlockCancel(data) {
		lock_ap_id = {};
    $.ajax({
      url: location.protocol.concat("//").concat(location.host).concat('/database/Management/audit/getUnlockList.php'),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      type: 'GET',
      data: data,
      success: function(response) {
				$("#unlock-request-list li.listDetail").remove();
				response = JSON.parse(response);
				for (var i = 0; i < response.length; i++) {
					lock_ap_id[response[i]['transaction_id']] = response[i]['ap_id'];
					var lockStatus = response[i]['lock_status'] == 'Y'? 'yesStatus' : 'noStatus';
          var finishStatus = response[i]['finish_status'] == 'Y'? 'yesStatus' : 'noStatus';
					$append = `
						<li class="listDetail">
							<dl>
								<dd class="systemNum">`+ response[i]['transaction_id'] + `</dd>
								<dd class="invoice">`+ response[i]['invoice'] + `</dd>
								<dd class="profit">`+ response[i]['total_profit'] + `</dd>
								<dd class="debt">`+ response[i]['debt'] + `</dd>
								<dd class="receivable">`+ response[i]['received'] + `</dd>
								<dd class="salePrice">`+ response[i]['selling_price'] + `</dd>
								<dd class="createDate">`+ response[i]['create_time'].substring(0, 10) + `</dd>
								<dd class="startTime">`+ response[i]['depart_date'].substring(0, 10) + `</dd>
								<dd class="returnTime">`+ response[i]['arrival_date'].substring(0, 10) + `</dd>
								<dd class="lockStatus ` + lockStatus + `"></dd>
								<dd class="finishStatus ` + finishStatus + `"></dd>
							</dl>
						</li>
					`;
					$("#unlock-request-list").append($append);
					heightRange();
					autoHeight();
				}
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
      }
    });
  }
  function getUnlockCount() {
    $("ul#unlock-request-list .listDetail").remove();
    $.ajax({
      url: location.protocol.concat("//").concat(location.host).concat('/database/Management/audit/getUnlockCount.php'),
      type: 'GET',
      success: function(response) {
        if(response != 0) {
          $('#lockPagination').pagination({
              totalData: response,
              showData: 10,
              current: 0,
              coping: true,
              homePage: '首页',
              endPage: '末页',
              prevContent: '上页',
              nextContent: '下页',
              callback: function(api) {
                  var j = api.getCurrent(); //获取当前页
									var data = {offset: (j - 1) * 10};
                  loadUnlockCancel(data);
              }
          });
          $('ul#lockPagination').find('a').click();
        }
        heightRange();
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
      }
    });
  }
	getUnlockCount();

	function loadUnclearCancel(data) {
		clear_ap_id = {};
    $.ajax({
      url: location.protocol.concat("//").concat(location.host).concat('/database/Management/audit/getUnclearList.php'),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      type: 'GET',
      data: data,
      success: function(response) {
				$("#unclear-request-list li.listDetail").remove();
				response = JSON.parse(response);
				for (var i = 0; i < response.length; i++) {
					clear_ap_id[response[i]['transaction_id']] = response[i]['ap_id'];
					var lockStatus = response[i]['lock_status'] == 'Y'? 'yesStatus' : 'noStatus';
          var finishStatus = response[i]['finish_status'] == 'Y'? 'yesStatus' : 'noStatus';
					$append = `
						<li class="listDetail">
							<dl>
								<dd class="systemNum">`+ response[i]['transaction_id'] + `</dd>
								<dd class="invoice">`+ response[i]['invoice'] + `</dd>
								<dd class="profit">`+ response[i]['total_profit'] + `</dd>
								<dd class="debt">`+ response[i]['debt'] + `</dd>
								<dd class="receivable">`+ response[i]['received'] + `</dd>
								<dd class="salePrice">`+ response[i]['selling_price'] + `</dd>
								<dd class="createDate">`+ response[i]['create_time'].substring(0, 10) + `</dd>
								<dd class="startTime">`+ response[i]['depart_date'].substring(0, 10) + `</dd>
								<dd class="returnTime">`+ response[i]['arrival_date'].substring(0, 10) + `</dd>
								<dd class="lockStatus ` + lockStatus + `"></dd>
								<dd class="finishStatus ` + finishStatus + `"></dd>
							</dl>
						</li>
					`;
					$("#unclear-request-list").append($append);
					heightRange();
					autoHeight();
				}
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
      }
    });
  }
  function getUnclearCount() {
    $("u#unclear-request-list .listDetail").remove();
    $.ajax({
      url: location.protocol.concat("//").concat(location.host).concat('/database/Management/audit/getUnclearCount.php'),
      type: 'GET',
      success: function(response) {
        if(response != 0) {
          $('#clearPagination').pagination({
              totalData: response,
              showData: 10,
              current: 0,
              coping: true,
              homePage: '首页',
              endPage: '末页',
              prevContent: '上页',
              nextContent: '下页',
              callback: function(api) {
                  var j = api.getCurrent(); //获取当前页
									var data = {offset: (j - 1) * 10};
                  loadUnclearCancel(data);
              }
          });
          $('ul#clearPagination').find('a').click();
        }
        heightRange();
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
      }
    });
  }
	getUnclearCount();

	function loadUnpaidCancel(data) {
		paid_ap_id = {};
    $.ajax({
      url: location.protocol.concat("//").concat(location.host).concat('/database/Management/audit/getUnpaidList.php'),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      type: 'GET',
      data: data,
      success: function(response) {
				$("#unpaid-request-list li.listDetail").remove();
				response = JSON.parse(response);
				for (var i = 0; i < response.length; i++) {
					paid_ap_id[response[i]['transaction_id']] = response[i]['ap_id'];
					var lockStatus = response[i]['lock_status'] == 'Y'? 'yesStatus' : 'noStatus';
          var finishStatus = response[i]['finish_status'] == 'Y'? 'yesStatus' : 'noStatus';
					$append = `
						<li class="listDetail">
							<dl>
								<dd class="systemNum">`+ response[i]['transaction_id'] + `</dd>
								<dd class="invoice">`+ response[i]['invoice'] + `</dd>
								<dd class="profit">`+ response[i]['total_profit'] + `</dd>
								<dd class="debt">`+ response[i]['debt'] + `</dd>
								<dd class="receivable">`+ response[i]['received'] + `</dd>
								<dd class="salePrice">`+ response[i]['selling_price'] + `</dd>
								<dd class="createDate">`+ response[i]['create_time'].substring(0, 10) + `</dd>
								<dd class="startTime">`+ response[i]['depart_date'].substring(0, 10) + `</dd>
								<dd class="returnTime">`+ response[i]['arrival_date'].substring(0, 10) + `</dd>
								<dd class="lockStatus ` + lockStatus + `"></dd>
								<dd class="finishStatus ` + finishStatus + `"></dd>
							</dl>
						</li>
					`;
					$("#unpaid-request-list").append($append);
					heightRange();
					autoHeight();
				}
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
      }
    });
  }
  function getUnpaidCount() {
    $("ul#unpaid-request-list .listDetail").remove();
    $.ajax({
      url: location.protocol.concat("//").concat(location.host).concat('/database/Management/audit/getUnpaidCount.php'),
      type: 'GET',
      success: function(response) {
        if(response != 0) {
          $('#paidPagination').pagination({
              totalData: response,
              showData: 10,
              current: 0,
              coping: true,
              homePage: '首页',
              endPage: '末页',
              prevContent: '上页',
              nextContent: '下页',
              callback: function(api) {
                  var j = api.getCurrent(); //获取当前页
									var data = {offset: (j - 1) * 10};
                  loadUnpaidCancel(data);
              }
          });
          $('ul#paidPagination').find('a').click();
        }
        heightRange();
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
      }
    });
  }
	getUnpaidCount();

	function loadUnfinishCancel(data) {
		finish_ap_id = {};
		$.ajax({
			url: location.protocol.concat("//").concat(location.host).concat('/database/Management/audit/getUnfinishList.php'),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			type: 'GET',
			data: data,
			success: function(response) {
				$("#unfinish-request-list li.listDetail").remove();
				response = JSON.parse(response);
				for (var i = 0; i < response.length; i++) {
					finish_ap_id[response[i]['transaction_id']] = response[i]['ap_id'];
					var lockStatus = response[i]['lock_status'] == 'Y'? 'yesStatus' : 'noStatus';
					var finishStatus = response[i]['finish_status'] == 'Y'? 'yesStatus' : 'noStatus';
					$append = `
						<li class="listDetail">
							<dl>
								<dd class="systemNum">`+ response[i]['transaction_id'] + `</dd>
								<dd class="invoice">`+ response[i]['invoice'] + `</dd>
								<dd class="profit">`+ response[i]['total_profit'] + `</dd>
								<dd class="debt">`+ response[i]['debt'] + `</dd>
								<dd class="receivable">`+ response[i]['received'] + `</dd>
								<dd class="salePrice">`+ response[i]['selling_price'] + `</dd>
								<dd class="createDate">`+ response[i]['create_time'].substring(0, 10) + `</dd>
								<dd class="startTime">`+ response[i]['depart_date'].substring(0, 10) + `</dd>
								<dd class="returnTime">`+ response[i]['arrival_date'].substring(0, 10) + `</dd>
								<dd class="lockStatus ` + lockStatus + `"></dd>
								<dd class="finishStatus ` + finishStatus + `"></dd>
							</dl>
						</li>
					`;
					$("#unfinish-request-list").append($append);
					heightRange();
					autoHeight();
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
	}
	function getUnfinishCount() {
		$("ul#unfinish-request-list .listDetail").remove();
		$.ajax({
			url: location.protocol.concat("//").concat(location.host).concat('/database/Management/audit/getUnfinishCount.php'),
			type: 'GET',
			success: function(response) {
				if(response != 0) {
					$('#finishPagination').pagination({
							totalData: response,
							showData: 10,
							current: 0,
							coping: true,
							homePage: '首页',
							endPage: '末页',
							prevContent: '上页',
							nextContent: '下页',
							callback: function(api) {
									var j = api.getCurrent(); //获取当前页
									var data = {offset: (j - 1) * 10};
									loadUnfinishCancel(data);
							}
					});
					$('ul#finishPagination').find('a').click();
				}
				heightRange();
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
	}
	getUnfinishCount();
});
