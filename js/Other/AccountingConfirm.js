 $(function() {
 	getTimeInfo();
 	listStatus();
 	autoHeight();
 	toUsersManagePage();
 	$(window).resize(function() {
 		autoHeight();
 	})
 	accountingConfirm();
 	confirmChange();
 	moreOptions();
 	checkInvoice();
 	arrowStatus();
 	addCheckNo();
 	selectAll();
 	selectNone();
 });

 function listStatus() {
 	$(".filterBox ul li.deleteNotice").find("a").on("mousedown", function() {
 		$(this).addClass('selected');
 	});
 	$(".filterBox ul li.deleteNotice").find("a").on("mouseup", function() {
 		$(this).removeClass('selected');
 	});
 	$(".filterBox ul li.markCompleted").find("a").on("mousedown", function() {
 		$(this).addClass('selected');
 	});
 	$(".filterBox ul li.markCompleted").find("a").on("mouseup", function() {
 		$(this).removeClass('selected');
 	});
 	//会计服务模块
 	$(".accounting-right ul.add-msg li.actionTabInfo a").on("mousedown", function() {
 		$(this).addClass("selected");
 	});
 	$(".accounting-right ul.add-msg li.actionTabInfo a").on("mouseup", function() {
 		$(this).removeClass("selected");
 	});
 	$(".accounting-right ul.add-msg li.moreOptions a").on("mousedown", function() {
 		$(this).addClass("selected");
 	});
 	$(".accounting-right ul.add-msg li.moreOptions a").on("mouseup", function() {
 		$(this).removeClass("selected");
 	});

 }

 function autoHeight() {
 	var systemNum = $("ul.listInfo li.listDetail").find("dd.systemNum");
 	var profit = $("ul.listInfo li.listDetail").find("dd.profit");
 	var debt = $("ul.listInfo li.listDetail").find("dd.debt")
 	var externalInvoice = $("ul.listInfo li.listDetail").find("dd.externalInvoice");
 	var receivable = $("ul.listInfo li.listDetail").find("dd.receivable");
 	var salePrice = $("ul.listInfo li.listDetail").find("dd.salePrice");
 	var createDate = $("ul.listInfo li.listDetail").find("dd.createDate");
 	var startTime = $("ul.listInfo li.listDetail").find("dd.startTime");
 	var returnTime = $("ul.listInfo li.listDetail").find("dd.returnTime");
 	var lockStatus = $("ul.listInfo li.listDetail").find("dd.lockStatus");
 	var finishStatus = $("ul.listInfo li.listDetail").find("dd.finishStatus");
 	var numberInfo = $("ul.listInfo li.listDetail").find("dd.number").find("a");
 	for(var j = 0; j < systemNum.length; j++) {
 		var maxHeight = Math.max($(systemNum[j]).height(), $(profit[j]).height(), $(debt[j]).height(), $(externalInvoice[j]).height(),
 			$(receivable[j]).height(), $(salePrice[j]).height(), $(createDate[j]).height(), $(startTime[j]).height(), $(returnTime[j]).height(),
 			$(lockStatus[j]).height(), $(finishStatus[j]).height(), $(numberInfo[j]).height());
 		if(maxHeight > 30) {
 			$("ul.listInfo li.listDetail").eq(j).find("dl").find("dd").css({
 				"height": maxHeight,
 				"line-height": maxHeight + "px"
 			});
 		}
 	}
 }

 //成交时间:
 function getTimeInfo() {
 	var date = new Date;
 	var year = date.getFullYear();
 	var currentMonth = date.getMonth() + 1;
 	if(currentMonth < 10) {
 		currentMonth = "0" + currentMonth;
 	} else {
 		currentMonth = currentMonth;
 	}
 	var monthInfo = year + "";
 	var e;
 	var num = 1;
 	for(var i = currentMonth - 1; i > 0; i--, num++) {
 		if(i < 10) {
 			monthInfo = year + "-0" + i;
 		} else {
 			monthInfo = year + "-" + i;
 		}
 		e = `
			<option  value="current_month-` + num + `"  >` + monthInfo + `</option>
		`;
 		$(".filterBox ul li.dealtime div.leftFloor").find("select").append(e);
 	}
 	for(j = 12; j > currentMonth - 1; j--, num++) {
 		monthInfo = year - 1 + "-" + j;
 		e = `
			<option  value="current_month-` + num + `"  >` + monthInfo + `</option>
		`;
 		$(".filterBox ul li.dealtime div.leftFloor").find("select").append(e);
 	}
 }

 function accountingConfirm() {
 	$(".filterBox ul.searchFloor li div a").on("mousedown", function() {
 		$(this).addClass("selected");
 	});
 	$(".filterBox ul.searchFloor li div a").on("mouseup", function() {
 		$(this).removeClass("selected");
 	});
 	$(".rightInfoCard.rightFloor ul li a").on("mousedown", function() {
 		$(this).addClass("selected");
 	});
 	$(".rightInfoCard.rightFloor ul li a").on("mouseup", function() {
 		$(this).removeClass("selected");
 	});
 	//重置：
 	$(".filterBox ul.searchFloor li div a.resetBtn").on("click", function() {
 		resetInfo();
 	});

 	//成交时间:
 	$(".filterBox ul li.dealtime div.leftFloor").find("select").on("change", function() {
 		var currentText = $.trim($(this).find("option:selected").text());
 		if(currentText == "Customize") {
 			$(".filterBox ul li.dealtime").find(".rightFloor").css("display", "inline-block");
 		} else {
 			$(".filterBox ul li.dealtime").find(".rightFloor").css("display", "none");
 		}

 	});

 	//支付方式：
 	$(".filterBox ul li").find("select.payment").on("change", function() {
 		var currentText = $.trim($(this).find("option:selected").text());
 		if(currentText == "NON-CC") {
 			$(".filterBox ul li.place").css("display", "inline-block");
 		} else {
 			$(".filterBox ul li.place").css("display", "none");
 		}
 	});

 	var ddCell = $("ul.listInfo.confirmFloor li dd");
 	ddCell.on("mouseenter", function() {
 		ddCell.each(function(i, item) {
 			var txt = $.trim($(item).text());
 			txt = txt.replace(/[\r\n]/g, "");
 			$(item).attr("title", txt);
 		});
 	});

 }

 //重置：
 function resetInfo() {
 	$(".filterBox ul.searchFloor li div").find("input").val("");
 	$(".filterBox ul.searchFloor li div").find("select").val("");
 	$(".filterBox ul li.place").css("display", "none");
 	$(".filterBox ul li.dealtime").find(".rightFloor").css("display", "none");
 }

 //确认更改：
 function confirmChange() {
 	$(document).on("click", "ul.listInfo li.listDetail dl:not([class='summaryInfo'])", function() {
 		var currentLockStatus = $(this).find("dd.lockStatus");
 		//		var currentClearStatus = $(this).find("dd.clearStatus");
 		var currentClearStatus = $(this).find("dd.debt").text().split('|')[0];
 		//		var currentPaidStatus = $(this).find("dd.paidStatus");
 		var currentPaidStatus = $(this).find("dd.receivable").text().split('|')[0];
 		var currentFinishStatus = $(this).find("dd.finishStatus");
 		//类型
 		var statusType;
 		var selectedArr = []; //选中的类型
 		if(!$("ul.listInfo.confirmFloor li dd.systemNum").hasClass("selected")) {
 			$(".accounting-right ul.add-msg li.finishStatus a").find("a.confirmLock").unbind("click");
 			$(".accounting-right ul.add-msg li.finishStatus a").find("a.confirmClear").unbind("click");
 			$(".accounting-right ul.add-msg li.finishStatus a").find("a.confirmPaid").unbind("click");
 			$(".accounting-right ul.add-msg li.finishStatus a").find("a.confirmFinish").unbind("click");
 			//没有选中
 			$(".accounting-right ul.add-msg li.invoiceCell input").val("");
 			$(".accounting-right ul.add-msg li.debtCell input").val("");
 			$(".accounting-right ul.add-msg li.receivableCell input").val("");
 			$(".accounting-right ul.add-msg li.salePriceCell input").val("");
 		} else {
 			confirmLock(); //确认LOCK
 			confirmClear(); //确认CLEAR
 			confirmPaid(); //确认PAID
 			confirmFinish(); //确认FINISH

 			//取消
 			cancelLock();
 			cancelClear(currentClearStatus);
 			cancelPaid(currentPaidStatus);
 			cancelFinish();
 			//总金额：
 			//sumAmountInfo();
 			getListInfo();
 		}
 	});
 	//选中状态：
 	$(document).on("click", "ul.listInfo li.listDetail dl dd:not([class='number'])", function() {
 		if($(this).parent().find("dd.systemNum").hasClass("selected")) {
 			$(this).parent().find("dd.systemNum").removeClass("selected");
 			// 			$(".accountingContent .groupMsg div.sumAmount span").text("0");
 			// 			$(".accountingContent .groupMsg div.sumAmount").css("width", "auto");
 		} else {
 			$(this).parent().find("dd.systemNum").addClass("selected");
 		}
 	});
 }

 //Lock的状态：
 function getLockStatus() {
 	//lock项：所选行的lock状态
 	var lockArr = [];
 	var isLock;
 	var lock_0 = $($("ul.listInfo.confirmFloor li dd.systemNum.selected").parent("dl")[0]).find("dd.lockStatus").hasClass("yesStatus");
 	for(var i = 0; i < $("dd.systemNum.selected").parent("dl").length; i++) {
 		var lockInfo = $($("ul.listInfo.confirmFloor li dd.systemNum.selected").parent("dl")[i]).find("dd.lockStatus").hasClass("yesStatus");
 		lockArr.push(lockInfo);
 		//所选行中的lock信息相同：
 		if(lock_0 == lockArr[i]) {
 			if(lock_0 == true) {
 				//LOCK都是勾的情况
 				//所选行中lock的状态
 				isLock = true;
 			}
 			if(lock_0 == false) {
 				//LOCK都是叉的情况
 				isLock = false;
 			}
 		} else {
 			isLock = false;
 		}
 	}
 	return isLock;
 }

 //Clear的状态：
 function getClearStatus() {
 	var clearArr = [];
 	var isClear;
 	var debt_0 = $.trim($($("ul.listInfo.confirmFloor li dd.systemNum.selected").parent("dl")[0]).find("dd.debt").text()).split("|")[0];
 	for(var i = 0; i < $("dd.systemNum.selected").parent("dl").length; i++) {
 		//debt项:所选行的debt状态
 		var debtInfo = $.trim($($("ul.listInfo.confirmFloor li dd.systemNum.selected").parent("dl")[i]).find("dd.debt").text()).split("|")[0];
 		clearArr.push(debtInfo);
 		//所选行中的debt信息相同：
 		if(debt_0 == clearArr[i]) {
 			if($.trim(debt_0) == "Y") {
 				//debt都为Y
 				isClear = true;
 			}
 			if($.trim(debt_0) == "N") {
 				//debt都为N
 				isClear = false;
 			}
 		} else {
 			isClear = false;
 		}
 	}
 	return isClear;

 }

 //Paid的状态：
 function getPaidStatus() {
 	var paidArr = [];
 	var isPaid;
 	//应收款项：
 	var receivable_0 = $.trim($($("ul.listInfo.confirmFloor li dd.systemNum.selected").parent("dl")[0]).find("dd.receivable").text()).split("|")[0];
 	for(var i = 0; i < $("dd.systemNum.selected").parent("dl").length; i++) {
 		var receivableInfo = $.trim($($("ul.listInfo.confirmFloor li dd.systemNum.selected").parent("dl")[i]).find("dd.receivable").text()).split("|")[0];
 		paidArr.push(receivableInfo);
 		if(receivable_0 == paidArr[i]) {
 			if($.trim(receivable_0) == "Y") {
 				//都为Y,已经进行过PAID
 				isPaid = true;
 			}
 			if($.trim(receivable_0) == "N") {
 				//都为N，都未进行PAID
 				isPaid = false;
 			}
 			if($.trim(receivable_0) == "CC") {
 				isPaid = true;
 			}
 		} else {
 			if(paidArr.indexOf("N") == -1) {
 				isPaid = true;
 			} else {
 				isPaid = false;
 			}
 		}
 	}
 	return isPaid;
 }

 //Finish的状态：
 function getFinishStatus() {
 	var finishArr = [];
 	var isFinish;
 	for(var i = 0; i < $("dd.systemNum.selected").parent("dl").length; i++) {
 		var finish_0 = $($("ul.listInfo.confirmFloor li dd.systemNum.selected").parent("dl")[0]).find("dd.finishStatus").hasClass("yesStatus");
 		var finishInfo = $($("ul.listInfo.confirmFloor li dd.systemNum.selected").parent("dl")[i]).find("dd.finishStatus ").hasClass("yesStatus");
 		finishArr.push(finishInfo);
 		console.log(finishArr);
 		//FINISH项：所选行中FINISH的状态
 		if(finish_0 == finishArr[i]) {
 			if(finish_0 == true) {
 				//finish都是勾的情况:
 				isFinish = true;
 			}
 			if(finish_0 == false) {
 				//finish都是叉的情况:
 				isFinish = false;
 			}
 		} else {
 			isFinish = false;
 		}
 	}

 	return isFinish;
 }

 //确认LOCK
 function confirmLock(lockStatus) {
 	$(".accounting-right ul.add-msg li.finishStatus").find("a.confirmLock").on("click", function() {
 		$(this).addClass("selected");
 		var thisBox = $(this);
 		$(".confirmNoticeInfo").addClass("confirmLockInfo");
 		$(".confirmNoticeInfo").removeClass("confirmClearInfo");
 		$(".confirmNoticeInfo").removeClass("lockTips");
 		$(".confirmNoticeInfo").removeClass("confirmPaidInfo");
 		$(".confirmNoticeInfo").removeClass("confirmInfoFinish");
 		$(".confirmNoticeInfo").removeClass("paidTips");
 		$(".confirmNoticeInfo").removeClass("singleRow_confirmTips");
 		$(".confirmNoticeInfo").removeClass("multiRow_confirmTips");

 		$(".confirmNoticeInfo").removeClass("cancelLockTips");
 		$(".confirmNoticeInfo").removeClass("cancelClearTips");
 		$(".confirmNoticeInfo").removeClass("cancelPaidTips");
 		$(".confirmNoticeInfo").removeClass("cancelFinishTips");
 		$(".confirmNoticeInfo").removeClass("amendTips");
 		var lockFlag = getLockStatus();
 		if(lockFlag) {
 			$(".confirmLockInfo p.confirmNotice").text("已经LOCK");
 		} else {
 			$(".confirmLockInfo p.confirmNotice").text("确认LOCK");
 		}
 		$(".confirmLockInfo").css("display", "block");
 		//确认
 		$(".confirmLockInfo").find("p.actionBox").find("button.actionConfirm").unbind("click").on("click", function() {
 			var fs_id_list = [];
 			$("dd.systemNum.selected").each(function() {
 				var transaction_id = $(this)[0].innerText;
 				fs_id_list.push(fs_id[transaction_id]);
 			});

 			if($.trim($(".confirmNoticeInfo p.confirmNotice").text()) !== "部分编号无法执行该操作") {
 				$.ajax({
 					url: location.protocol.concat("//").concat(location.host).concat('/database/Accounting/AccountingConfirm/orderLock.php'),
 					type: 'POST',
 					data: {
 						fs_id_list: JSON.stringify(fs_id_list)
 					},
 					success: function(response) {
 						if(response == 'No access permission') {
 							alert("没有Lock权限");
 						} else {
 							//确认LOCK
 							$("dd.systemNum.selected").parent("dl").each(function(i, item) {
 								$(item).find("dd.lockStatus").removeClass("noStatus");
 								$(item).find("dd.lockStatus").addClass("yesStatus");
 							});
 							thisBox.removeClass("selected");
 						}
 						$(".confirmLockInfo").css("display", "none");
 					},
 					error: function(jqXHR, textStatus, errorThrown) {
 						console.log(textStatus, errorThrown);
 					}
 				});
 			}
 		});
 		//取消
 		$(".confirmLockInfo").find("p.actionBox").find("button.actionCancel").unbind("click").on("click", function() {
 			$(".confirmLockInfo").css("display", "none");
 			thisBox.removeClass("selected");
 		});
 	});
 }

 //确认CLEAR:
 function confirmClear() {
 	//确认Clear
 	$(".accounting-right ul.add-msg li.finishStatus").find("a.confirmClear").on("click", function() {
 		var ifLock = getLockStatus();
 		var thisBox = $(this);
 		//test s
 		var clearFlag = getClearStatus();
 		$(this).addClass("selected");
 		$(".confirmNoticeInfo").addClass("confirmClearInfo");
 		$(".confirmNoticeInfo").removeClass("confirmLockInfo");
 		$(".confirmNoticeInfo").removeClass("lockTips");
 		$(".confirmNoticeInfo").removeClass("confirmPaidInfo");
 		$(".confirmNoticeInfo").removeClass("confirmInfoFinish");
 		$(".confirmNoticeInfo").removeClass("paidTips");
 		$(".confirmNoticeInfo").removeClass("singleRow_confirmTips");
 		$(".confirmNoticeInfo").removeClass("multiRow_confirmTips");

 		$(".confirmNoticeInfo").removeClass("cancelLockTips");
 		$(".confirmNoticeInfo").removeClass("cancelClearTips");
 		$(".confirmNoticeInfo").removeClass("cancelPaidTips");
 		$(".confirmNoticeInfo").removeClass("cancelFinishTips");
 		$(".confirmNoticeInfo").removeClass("amendTips");
 		//已经LOCK
 		if(ifLock) {
 			if(clearFlag) {
 				$(".confirmClearInfo p.confirmNotice").text("已经CLEAR");
 			} else {
 				$(".confirmClearInfo p.confirmNotice").text("确认CLEAR");
 			}
 			$(".confirmClearInfo").css("display", "block");
 			$(".confirmClearInfo").find("p.actionBox").find("button.actionConfirm").unbind("click").on("click", function() {
 				var fs_id_list = [];
 				$("dd.systemNum.selected").each(function() {
 					var transaction_id = $(this)[0].innerText;
 					fs_id_list.push(fs_id[transaction_id]);
 				});

 				if($.trim($(".confirmNoticeInfo p.confirmNotice").text()) !== "部分编号无法执行该操作") {
 					$.ajax({
 						url: location.protocol.concat("//").concat(location.host).concat('/database/Accounting/AccountingConfirm/orderClear.php'),
 						type: 'POST',
 						data: {
 							fs_id_list: JSON.stringify(fs_id_list)
 						},
 						success: function(response) {
 							if(response == 'No access permission') {
 								alert("没有Clear权限");
 							} else {
 								//已经LOCK-确认CLEAR
 								if($.trim($(".confirmNoticeInfo  p.confirmNotice").text()) !== "部分编号无法执行该操作") {
 									$("dd.systemNum.selected").parent("dl").each(function(i, item) {
 										var debtArr = [];
 										var clearInfo = $.trim($(item).find("dd.debt").text()).split("|");
 										for(var j = 0; j < clearInfo.length; j++) {
 											debtArr.push(clearInfo[j]);
 										}
 										debtArr.splice(0, 1, "Y");
 										$(item).find("dd.debt").text(debtArr[0] + " | " + debtArr[1]);
 									});
 									thisBox.removeClass("selected");
 								}
 								thisBox.removeClass("selected");
 							}
 							$(".confirmClearInfo").css("display", "none");
 						},
 						error: function(jqXHR, textStatus, errorThrown) {
 							console.log(textStatus, errorThrown);
 						}
 					});
 				}
 			});
 			//取消
 			$(".confirmClearInfo").find("p.actionBox").find("button.actionCancel").unbind("click").on("click", function() {
 				$(".confirmClearInfo").css("display", "none");
 				thisBox.removeClass("selected");
 			});
 		} else {
 			//先进行LOCK
 			lockTips(thisBox);
 			console.log("请先进行LOCK");
 		}
 	});

 }

 //请先进行LOCK
 function lockTips(thisBox) {
 	$(".confirmNoticeInfo").addClass("lockTips");
 	$(".confirmNoticeInfo").removeClass("confirmClearInfo");
 	$(".confirmNoticeInfo").removeClass("confirmLockInfo");
 	$(".confirmNoticeInfo").removeClass("confirmPaidInfo");
 	$(".confirmNoticeInfo").removeClass("confirmInfoFinish");
 	$(".confirmNoticeInfo").removeClass("paidTips");
 	$(".confirmNoticeInfo").removeClass("singleRow_confirmTips");
 	$(".confirmNoticeInfo").removeClass("multiRow_confirmTips");

 	$(".confirmNoticeInfo").removeClass("cancelLockTips");
 	$(".confirmNoticeInfo").removeClass("cancelClearTips");
 	$(".confirmNoticeInfo").removeClass("cancelPaidTips");
 	$(".confirmNoticeInfo").removeClass("cancelFinishTips");
 	$(".confirmNoticeInfo").removeClass("amendTips");
 	$(".lockTips p.confirmNotice").text("部分编号没有LOCK");
 	$(".lockTips").css("display", "block");
 	$(".lockTips").find("p.actionBox").find("button.actionConfirm").unbind("click").on("click", function() {
 		setTimeout(function() {
 			$(".lockTips").css("display", "none");
 			thisBox.removeClass("selected");
 			$(".accounting-right ul.add-msg li.finishStatus a").removeClass("selected");
 		}, 500);

 	});
 	//取消
 	$(".lockTips").find("p.actionBox").find("button.actionCancel").unbind("click").on("click", function() {
 		$(".lockTips").css("display", "none");
 		thisBox.removeClass("selected");
 		$(".accounting-right ul.add-msg li.finishStatus a").removeClass("selected");
 	});
 }

 //确认PAID
 function confirmPaid() {
 	$(".accounting-right ul.add-msg li.finishStatus").find("a.confirmPaid").on("click", function() {
 		var paidFlag = getPaidStatus();
 		$(this).addClass("selected");
 		var thisBox = $(this);
 		$(".confirmNoticeInfo").addClass("confirmPaidInfo");
 		$(".confirmNoticeInfo").removeClass("confirmLockInfo");
 		$(".confirmNoticeInfo").removeClass("confirmClearInfo");
 		$(".confirmNoticeInfo").removeClass("lockTips");
 		$(".confirmNoticeInfo").removeClass("confirmInfoFinish");
 		$(".confirmNoticeInfo").removeClass("paidTips");
 		$(".confirmNoticeInfo").removeClass("singleRow_confirmTips");
 		$(".confirmNoticeInfo").removeClass("multiRow_confirmTips");

 		$(".confirmNoticeInfo").removeClass("cancelLockTips");
 		$(".confirmNoticeInfo").removeClass("cancelClearTips");
 		$(".confirmNoticeInfo").removeClass("cancelPaidTips");
 		$(".confirmNoticeInfo").removeClass("cancelFinishTips");
 		$(".confirmNoticeInfo").removeClass("amendTips");
 		if(paidFlag) {
 			$(".confirmPaidInfo p.confirmNotice").text("已经PAID");
 		} else {
 			$(".confirmPaidInfo p.confirmNotice").text("确认PAID");
 		}
 		$(".confirmPaidInfo").css("display", "block");
 		$(".confirmPaidInfo").find("p.actionBox").find("button.actionConfirm").unbind("click").on("click", function() {
 			if($.trim($(".confirmNoticeInfo  p.confirmNotice").text()) !== "部分编号无法执行该操作") {
 				var fs_id_list = [];
 				$("dd.systemNum.selected").each(function() {
 					var transaction_id = $(this)[0].innerText;
 					fs_id_list.push(fs_id[transaction_id]);
 				});

 				if($.trim($(".confirmNoticeInfo p.confirmNotice").text()) !== "部分编号无法执行该操作") {
 					$.ajax({
 						url: location.protocol.concat("//").concat(location.host).concat('/database/Accounting/AccountingConfirm/orderPaid.php'),
 						type: 'POST',
 						data: {
 							fs_id_list: JSON.stringify(fs_id_list)
 						},
 						success: function(response) {
 							if(response == 'No access permission') {
 								alert("没有Paid权限");
 							} else {
 								$("dd.systemNum.selected").parent("dl").each(function(i, item) {
 									if($.trim($(item).find("dd.receivable").text()) !== "CC") {
 										var paidInfo = $.trim($(item).find("dd.receivable").text()).split("|");
 										var receivableArr = [];
 										for(var j = 0; j < paidInfo.length; j++) {
 											receivableArr.push(paidInfo[j]);
 										}
 										receivableArr.splice(0, 1, "Y");
 										$(item).find("dd.receivable").text(receivableArr[0] + " | " + receivableArr[1]);
 									}
 								});
 								thisBox.removeClass("selected");
 							}
 							$(".confirmPaidInfo").css("display", "none");
 						},
 						error: function(jqXHR, textStatus, errorThrown) {
 							console.log(textStatus, errorThrown);
 						}
 					});
 				}
 			}
 		});
 		//取消
 		$(".confirmPaidInfo").find("p.actionBox").find("button.actionCancel").unbind("click").on("click", function() {
 			$(".confirmPaidInfo").css("display", "none");
 			thisBox.removeClass("selected");
 		});
 	});

 }

 //确认FINISH
 function confirmFinish() {
 	//确认Finish
 	$(".accounting-right ul.add-msg li.finishStatus").find("a.confirmFinish").on("click", function() {
 		var ifPaid = getPaidStatus();
 		var thisBox = $(this);
 		var finishFlag = getFinishStatus();
 		$(this).addClass("selected");
 		$(".confirmNoticeInfo").addClass("confirmInfoFinish");
 		$(".confirmNoticeInfo").removeClass("confirmClearInfo");
 		$(".confirmNoticeInfo").removeClass("confirmLockInfo");
 		$(".confirmNoticeInfo").removeClass("lockTips");
 		$(".confirmNoticeInfo").removeClass("confirmPaidInfo");
 		$(".confirmNoticeInfo").removeClass("paidTips");
 		$(".confirmNoticeInfo").removeClass("singleRow_confirmTips");
 		$(".confirmNoticeInfo").removeClass("multiRow_confirmTips");

 		$(".confirmNoticeInfo").removeClass("cancelLockTips");
 		$(".confirmNoticeInfo").removeClass("cancelClearTips");
 		$(".confirmNoticeInfo").removeClass("cancelPaidTips");
 		$(".confirmNoticeInfo").removeClass("cancelFinishTips");
 		$(".confirmNoticeInfo").removeClass("amendTips");
 		if(ifPaid) {
 			if(finishFlag) {
 				$(".confirmInfoFinish p.confirmNotice").text("已经Finish");
 			} else {
 				$(".confirmInfoFinish p.confirmNotice").text("确认Finish");
 			}
 			$(".confirmInfoFinish").css("display", "block");
 			//确认Finish
 			$(".confirmInfoFinish").find("p.actionBox").find("button.actionConfirm").unbind("click").on("click", function() {
 				if($.trim($(".confirmNoticeInfo  p.confirmNotice").text()) !== "部分编号无法执行该操作") {
 					var fs_id_list = [];
 					$("dd.systemNum.selected").each(function() {
 						var transaction_id = $(this)[0].innerText;
 						fs_id_list.push(fs_id[transaction_id]);
 					});

 					if($.trim($(".confirmNoticeInfo p.confirmNotice").text()) !== "部分编号无法执行该操作") {
 						$.ajax({
 							url: location.protocol.concat("//").concat(location.host).concat('/database/Accounting/AccountingConfirm/orderFinish.php'),
 							type: 'POST',
 							data: {
 								fs_id_list: JSON.stringify(fs_id_list)
 							},
 							success: function(response) {
 								if(response == 'No access permission') {
 									alert("没有Finish权限");
 								} else {
 									//确认Finish
 									$("dd.systemNum.selected").parent("dl").each(function(i, item) {
 										$(item).find("dd.finishStatus").removeClass("noStatus");
 										$(item).find("dd.finishStatus").addClass("yesStatus");
 									});
 									thisBox.removeClass("selected");
 								}
 								$(".confirmInfoFinish").css("display", "none");
 							},
 							error: function(jqXHR, textStatus, errorThrown) {
 								console.log(textStatus, errorThrown);
 							}
 						});
 					}
 				}
 			});
 			//取消：
 			$(".confirmInfoFinish").find("p.actionBox").find("button.actionCancel").unbind("click").on("click", function() {
 				$(".confirmInfoFinish").css("display", "none");
 				thisBox.removeClass("selected");
 			});
 		} else {
 			paidTips(thisBox);
 			console.log("请先进行PAID");
 		}
 	});
 }

 function paidTips(thisBox) {
 	$(".confirmNoticeInfo").addClass("paidTips");
 	$(".confirmNoticeInfo").removeClass("lockTips");
 	$(".confirmNoticeInfo").removeClass("confirmClearInfo");
 	$(".confirmNoticeInfo").removeClass("confirmLockInfo");
 	$(".confirmNoticeInfo").removeClass("confirmPaidInfo");
 	$(".confirmNoticeInfo").removeClass("confirmInfoFinish");
 	$(".confirmNoticeInfo").removeClass("singleRow_confirmTips");
 	$(".confirmNoticeInfo").removeClass("multiRow_confirmTips");

 	$(".confirmNoticeInfo").removeClass("cancelLockTips");
 	$(".confirmNoticeInfo").removeClass("cancelClearTips");
 	$(".confirmNoticeInfo").removeClass("cancelPaidTips");
 	$(".confirmNoticeInfo").removeClass("cancelFinishTips");
 	$(".confirmNoticeInfo").removeClass("amendTips");
 	$(".paidTips p.confirmNotice").text("部分编号没有PAID");
 	$(".paidTips").css("display", "block");
 	$(".paidTips").find("p.actionBox").find("button.actionConfirm").unbind("click").on("click", function() {
 		setTimeout(function() {
 			$(".paidTips").css("display", "none");
 			thisBox.removeClass("selected");
 			$(".accounting-right ul.add-msg li.finishStatus a").removeClass("selected");
 		}, 500);

 	});
 	//取消
 	$(".paidTips").find("p.actionBox").find("button.actionCancel").unbind("click").on("click", function() {
 		$(".paidTips").css("display", "none");
 		thisBox.removeClass("selected");
 		$(".accounting-right ul.add-msg li.finishStatus a").removeClass("selected");
 	});
 }

 //更多选项：
 function moreOptions() {
 	$(".accounting-right ul.add-msg li.moreOptions").find("a").on("click", function() {
 		if($(".accounting-right ul.add-msg li.cancelStatus").css("display") == "none") {
 			$(".accounting-right ul.add-msg li.cancelStatus").css("display", "block");
 		} else {
 			$(".accounting-right ul.add-msg li.cancelStatus").css("display", "none");
 		}
 	});
 }
 //取消LOCK
 function cancelLock() {
 	$(".accounting-right ul.add-msg li.cancelStatus").find("a.cancelLock").on("click", function() {
 		var thisBox = $(this);
 		$(".confirmNoticeInfo").removeClass("paidTips");
 		$(".confirmNoticeInfo").removeClass("lockTips");
 		$(".confirmNoticeInfo").removeClass("confirmClearInfo");
 		$(".confirmNoticeInfo").removeClass("confirmLockInfo");
 		$(".confirmNoticeInfo").removeClass("confirmPaidInfo");
 		$(".confirmNoticeInfo").removeClass("confirmInfoFinish");
 		$(".confirmNoticeInfo").removeClass("singleRow_confirmTips");
 		$(".confirmNoticeInfo").removeClass("multiRow_confirmTips");
 		$(".confirmNoticeInfo").removeClass("cancelClearTips");
 		$(".confirmNoticeInfo").removeClass("cancelPaidTips");
 		$(".confirmNoticeInfo").removeClass("cancelFinishTips");
 		$(".confirmNoticeInfo").removeClass("amendTips");

 		$(".confirmNoticeInfo").addClass("cancelLockTips");

 		if(amendApplicationTips()) {
 			$(".cancelLockTips").css("display", "block");
 		}

 		$(".cancelLockTips p.confirmNotice").html("取消LOCK<br><span style='font-size:14px;'>该操作会同时取消CLEAR</span>");
 		$(".cancelLockTips").find("p.actionBox").find("button.actionConfirm").unbind("click").on("click", function() {
 			var fs_id_list = [];
 			$("dd.systemNum.selected").each(function() {
 				var transaction_id = $(this)[0].innerText;
 				fs_id_list.push(fs_id[transaction_id]);
 			});

 			$.ajax({
 				url: location.protocol.concat("//").concat(location.host).concat('/database/Accounting/AccountingConfirm/orderUnlock.php'),
 				type: 'POST',
 				data: {
 					fs_id_list: JSON.stringify(fs_id_list)
 				},
 				success: function(response) {
 					if(response == 'No access permission') {
 						alert("没有Unlock权限, 已提交Unlock审核");
 					} else {
 						//确认LOCK
 						$("dd.systemNum.selected").parent("dl").each(function(i, item) {
 							$(item).find("dd.lockStatus").removeClass("yesStatus");
 							$(item).find("dd.lockStatus").addClass("noStatus");

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
 					}
 					$(".cancelLockTips").find("p.actionBox").find("button.actionConfirm").unbind("click");
 					$(".cancelLockTips").css("display", "none");
 				},
 				error: function(jqXHR, textStatus, errorThrown) {
 					console.log(textStatus, errorThrown);
 				}
 			});
 		});
 		//取消
 		$(".cancelLockTips").find("p.actionBox").find("button.actionCancel").unbind("click").on("click", function() {
 			$(".cancelLockTips").css("display", "none");
 			thisBox.removeClass("selected");
 		});
 	});
 }

 //取消CLEAR
 function cancelClear(currentClearStatus) {
 	$(".accounting-right ul.add-msg li.cancelStatus").find("a.cancelClear").on("click", function() {
 		var thisBox = $(this);
 		$(".confirmNoticeInfo").removeClass("paidTips");
 		$(".confirmNoticeInfo").removeClass("lockTips");
 		$(".confirmNoticeInfo").removeClass("confirmClearInfo");
 		$(".confirmNoticeInfo").removeClass("confirmLockInfo");
 		$(".confirmNoticeInfo").removeClass("confirmPaidInfo");
 		$(".confirmNoticeInfo").removeClass("confirmInfoFinish");
 		$(".confirmNoticeInfo").removeClass("singleRow_confirmTips");
 		$(".confirmNoticeInfo").removeClass("multiRow_confirmTips");
 		$(".confirmNoticeInfo").removeClass("cancelLockTips");
 		$(".confirmNoticeInfo").removeClass("cancelPaidTips");
 		$(".confirmNoticeInfo").removeClass("cancelFinishTips");
 		$(".confirmNoticeInfo").removeClass("amendTips");
 		$(".confirmNoticeInfo").addClass("cancelClearTips");
 		if(amendApplicationTips()) {
 			$(".cancelClearTips").css("display", "block");
 		}
 		$(".cancelClearTips p.confirmNotice").text("取消CLEAR");
 		//确认
 		$(".cancelClearTips").find("p.actionBox").find("button.actionConfirm").unbind("click").on("click", function() {
 			var fs_id_list = [];
 			$("dd.systemNum.selected").each(function() {
 				var transaction_id = $(this)[0].innerText;
 				fs_id_list.push(fs_id[transaction_id]);
 			});

 			$.ajax({
 				url: location.protocol.concat("//").concat(location.host).concat('/database/Accounting/AccountingConfirm/orderUnclear.php'),
 				type: 'POST',
 				data: {
 					fs_id_list: JSON.stringify(fs_id_list)
 				},
 				success: function(response) {
 					if(response == 'No access permission') {
 						alert("没有Unclear权限, 已提交Unclear审核");
 					} else {
 						$("dd.systemNum.selected").parent("dl").each(function(i, item) {
 							if($.trim(currentClearStatus) == "Y") {
 								var debtArr = [];
 								var clearInfo = $.trim($(item).find("dd.debt").text()).split("|");
 								for(var j = 0; j < clearInfo.length; j++) {
 									debtArr.push(clearInfo[j]);
 								}
 								debtArr.splice(0, 1, "N");
 								$(item).find("dd.debt").text(debtArr[0] + " | " + debtArr[1]);
 							}
 						});
 					}
 					$(".cancelClearTips").find("p.actionBox").find("button.actionConfirm").unbind("click");
 					$(".cancelClearTips").css("display", "none");
 				},
 				error: function(jqXHR, textStatus, errorThrown) {
 					console.log(textStatus, errorThrown);
 				}
 			});
 		});
 		//取消
 		$(".cancelClearTips").find("p.actionBox").find("button.actionCancel").unbind("click").on("click", function() {
 			$(".cancelClearTips").css("display", "none");
 			thisBox.removeClass("selected");
 		});
 	});
 }

 //取消PAID
 function cancelPaid(currentPaidStatus) {
 	$(".accounting-right ul.add-msg li.cancelStatus").find("a.cancelPaid").on("click", function() {
 		var thisBox = $(this);
 		$(".confirmNoticeInfo").removeClass("paidTips");
 		$(".confirmNoticeInfo").removeClass("lockTips");
 		$(".confirmNoticeInfo").removeClass("confirmClearInfo");
 		$(".confirmNoticeInfo").removeClass("confirmLockInfo");
 		$(".confirmNoticeInfo").removeClass("confirmPaidInfo");
 		$(".confirmNoticeInfo").removeClass("confirmInfoFinish");
 		$(".confirmNoticeInfo").removeClass("singleRow_confirmTips");
 		$(".confirmNoticeInfo").removeClass("multiRow_confirmTips");
 		$(".confirmNoticeInfo").removeClass("cancelLockTips");
 		$(".confirmNoticeInfo").removeClass("cancelClearTips");
 		$(".confirmNoticeInfo").removeClass("cancelFinishTips");
 		$(".confirmNoticeInfo").removeClass("amendTips");
 		$(".confirmNoticeInfo").addClass("cancelPaidTips");
 		if(amendApplicationTips()) {
 			$(".cancelPaidTips").css("display", "block");
 		}
 		var ccNum = 0;
 		$("dd.systemNum.selected").parent("dl").each(function(i, item) {
 			if(($.trim($(item).find("dd.receivable").text()) == "CC")) {
 				ccNum++;
 				if(ccNum == 1) {
 					$(".cancelPaidTips p.confirmNotice").text("CC支付无法取消PAID");
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

 		//确认：
 		$(".cancelPaidTips").find("p.actionBox").find("button.actionConfirm").unbind("click").on("click", function() {
 			var fs_id_list = [];
 			$("dd.systemNum.selected").each(function() {
 				var transaction_id = $(this)[0].innerText;
 				fs_id_list.push(fs_id[transaction_id]);
 			});

 			$.ajax({
 				url: location.protocol.concat("//").concat(location.host).concat('/database/Accounting/AccountingConfirm/orderUnpaid.php'),
 				type: 'POST',
 				data: {
 					fs_id_list: JSON.stringify(fs_id_list)
 				},
 				success: function(response) {
 					if(response == 'No access permission') {
 						alert("没有Unpaid权限, 已提交Unpaid审核");
 					} else {
 						$("dd.systemNum.selected").parent("dl").each(function(i, item) {
 							var receivableType = $.trim($(item).find("dd.receivable").text()).split("|")[0];
 							//改变应收款的状态
 							if((receivableType == "Y")) {
 								var receivableArr = [];
 								var paidInfo = $.trim($(item).find("dd.receivable").text()).split("|");
 								for(var j = 0; j < paidInfo.length; j++) {
 									receivableArr.push(paidInfo[j]);
 								}
 								receivableArr.splice(0, 1, "N");
 								$(item).find("dd.receivable").text(receivableArr[0] + " | " + receivableArr[1]);
 							}

 							if($(item).find("dd.finishStatus").hasClass("yesStatus")) {
 								$(item).find("dd.finishStatus").removeClass("yesStatus");
 								$(item).find("dd.finishStatus").addClass("noStatus");
 							}
 						});
 					}
 					$(".cancelPaidTips").find("p.actionBox").find("button.actionConfirm").unbind("click");
 					$(".cancelPaidTips").css("display", "none");
 				},
 				error: function(jqXHR, textStatus, errorThrown) {
 					console.log(textStatus, errorThrown);
 				}
 			});
 		});
 		//取消
 		$(".cancelPaidTips").find("p.actionBox").find("button.actionCancel").unbind("click").on("click", function() {
 			$(".cancelPaidTips").css("display", "none");
 			thisBox.removeClass("selected");
 		});
 	});
 }

 //取消Finish
 function cancelFinish() {
 	$(".accounting-right ul.add-msg li.cancelStatus").find("a.cancelFinish").on("click", function() {
 		var thisBox = $(this);
 		$(".confirmNoticeInfo").removeClass("paidTips");
 		$(".confirmNoticeInfo").removeClass("lockTips");
 		$(".confirmNoticeInfo").removeClass("confirmClearInfo");
 		$(".confirmNoticeInfo").removeClass("confirmLockInfo");
 		$(".confirmNoticeInfo").removeClass("confirmPaidInfo");
 		$(".confirmNoticeInfo").removeClass("confirmInfoFinish");
 		$(".confirmNoticeInfo").removeClass("singleRow_confirmTips");
 		$(".confirmNoticeInfo").removeClass("multiRow_confirmTips");
 		$(".confirmNoticeInfo").removeClass("cancelLockTips");
 		$(".confirmNoticeInfo").removeClass("cancelClearTips");
 		$(".confirmNoticeInfo").removeClass("cancelPaidTips");
 		$(".confirmNoticeInfo").removeClass("amendTips");
 		$(".confirmNoticeInfo").addClass("cancelFinishTips");
 		if(amendApplicationTips()) {
 			$(".cancelFinishTips").css("display", "block");
 		}
 		$(".cancelFinishTips p.confirmNotice").text("取消FINISH");
 		//确认
 		$(".cancelFinishTips").find("p.actionBox").find("button.actionConfirm").unbind("click").on("click", function() {
 			var fs_id_list = [];
 			$("dd.systemNum.selected").each(function() {
 				var transaction_id = $(this)[0].innerText;
 				fs_id_list.push(fs_id[transaction_id]);
 			});

 			$.ajax({
 				url: location.protocol.concat("//").concat(location.host).concat('/database/Accounting/AccountingConfirm/orderUnfinish.php'),
 				type: 'POST',
 				data: {
 					fs_id_list: JSON.stringify(fs_id_list)
 				},
 				success: function(response) {
 					if(response == 'No access permission') {
 						alert("没有Unfinish权限, 已提交Unfinish审核");
 					} else {
 						$("dd.systemNum.selected").parent("dl").each(function(i, item) {
 							if($(item).find("dd.finishStatus").hasClass("yesStatus")) {
 								$(item).find("dd.finishStatus").removeClass("yesStatus");
 								$(item).find("dd.finishStatus").addClass("noStatus");
 							}
 						});
 					}
 					$(".cancelFinishTips").find("p.actionBox").find("button.actionConfirm").unbind("click")
 					$(".cancelFinishTips").css("display", "none");
 				},
 				error: function(jqXHR, textStatus, errorThrown) {
 					console.log(textStatus, errorThrown);
 				}
 			});
 		});
 		//取消
 		$(".cancelFinishTips").find("p.actionBox").find("button.actionCancel").unbind("click").on("click", function() {
 			$(".cancelFinishTips").css("display", "none");
 			thisBox.removeClass("selected");
 		});
 	});
 }

 //总计
 function sumAmountInfo() {
 	var sumAmount = 0;
 	var amount = $("dd.systemNum.selected").parent("dl").find("dd.amount");
 	var currentAmount = 0;
 	var currencyType;
 	amount.each(function(i, item) {
 		currencyType = $(item).text().split(" ")[0];
 		currentAmount = $(item).text().split("USD")[1];
 		sumAmount = sumAmount - (-currentAmount);
 	});
 	$(".accountingContent .groupMsg div.sumAmount span").text(currencyType + " " + sumAmount);
 	$(".accountingContent .groupMsg div.sumAmount").css("width", "inherit");

 }
 //当前时间
 function currentTime() {
 	var date = new Date();
 	var current = ""
 	var year = date.getFullYear();
 	var month = date.getMonth() + 1;
 	var seconds = date.getSeconds();
 	if(month < 10) {
 		month = "0" + month;
 	} else {
 		month = month;
 	}
 	var day = date.getDate();
 	var hour = date.getHours();
 	var minute = date.getMinutes();
 	if(minute < 10) {
 		minute = "0" + minute;
 	} else {
 		minute = minute;
 	}
 	if(seconds < 10) {
 		seconds = "0" + seconds;
 	} else {
 		seconds = seconds;
 	}
 	current = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + seconds;
 	return current;

 }

 //INVOICE输入检测:
 function checkInvoice() {
 	$(".systematicSearch ul.searchFloor li div.invoiceInfo div.invoice1").find("input").on("keyup", function() {
 		if($(this).siblings("input").val() == "") {
 			alert("请确认两项信息已输入");
 		} else {
 			if((!isNaN($(this).val())) && (!isNaN($(this).siblings("input").val()))) {

 			} else {
 				alert("请确认填写数字格式");
 				if(isNaN($(this).val())) {
 					$(this).val("");
 					$(this).focus();
 				}
 				if(isNaN($(this).siblings("input").val())) {
 					$(this).siblings("input").val("");
 					$(this).siblings("input").focus();
 				}
 			}
 		}

 	});
 	$(".systematicSearch ul.searchFloor li div.invoiceInfo").find("img").on("click", function() {
 		if($(this).attr("src") == "../img/invoice_icon1.png") {
 			$(this).attr("src", "../img/invoice_icon2.png");
 			$(".filterBox ul.searchFloor li div.rightContent.invoiceInfo div.invoice2").css("display", "none");
 			$(".filterBox ul.searchFloor li div.rightContent.invoiceInfo div.invoice1").css("display", "inline-block");
 			$(".systematicSearch ul.searchFloor li div.invoiceInfo").find("input").val("");
 		} else {
 			$(this).attr("src", "../img/invoice_icon1.png");
 			$(".filterBox ul.searchFloor li div.rightContent.invoiceInfo div.invoice1").css("display", "none");
 			$(".filterBox ul.searchFloor li div.rightContent.invoiceInfo div.invoice2").css("display", "inline-block");
 			$(".systematicSearch ul.searchFloor li div.invoiceInfo").find("input").val("");
 		}
 	});
 }

 //箭头切换：
 function arrowStatus() {
 	$("ul.listInfo.defaultList.confirmlist.confirmFloor li.listTitle dd").on("click", function() {
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

 //添加CheckNo.
 function addCheckNo() {
 	$(".accounting-right ul.add-msg li.actionTabInfo a.addCheckNo").on("click", function() {
 		if($(".accounting-right ul.add-msg li.checkNo").css("display") == "none") {
 			$(".accounting-right ul.add-msg li.checkNo").css("display", "block");
 		} else {
 			$(".accounting-right ul.add-msg li.checkNo").css("display", "none");
 			$(".accounting-right ul.add-msg li.checkNo").find("input").val("");
 		}
 	});
 }

 //获取数据
 function getListInfo() {
 	if($("dd.systemNum.selected").length == 0) {
 		$(".accounting-right ul.add-msg li.cellBox").removeClass("multi-row");
 		$(".accounting-right ul.add-msg li.cellBox").addClass("single-row");
 		$(".accounting-right ul.add-msg li.titleInfo").addClass("single-row");
 		$(".accounting-right ul.add-msg li.titleInfo").removeClass("multi-row");
 		$(".accounting-right ul.add-msg li.titleInfo").find("span").first().text("详情");
 		$(".rightInfoCard.accounting-right").find("input").val("");
 	}
 	if($("dd.systemNum.selected").length == 1) {
 		$(".accounting-right ul.add-msg li.cellBox").removeClass("multi-row");
 		$(".accounting-right ul.add-msg li.cellBox").addClass("single-row");
 		$(".accounting-right ul.add-msg li.titleInfo").addClass("single-row");
 		$(".accounting-right ul.add-msg li.titleInfo").removeClass("multi-row");
 		$(".accounting-right ul.add-msg li.titleInfo").find("span").first().text("详情");
 		singleRowInfo(); //选中单行
 	}
 	if($("dd.systemNum.selected").length > 1) {
 		$(".accounting-right ul.add-msg li.cellBox").addClass("multi-row");
 		$(".accounting-right ul.add-msg li.cellBox").removeClass("single-row");
 		$(".accounting-right ul.add-msg li.titleInfo").css("display", "block");
 		$(".accounting-right ul.add-msg li.titleInfo").removeClass("single-row");
 		$(".accounting-right ul.add-msg li.titleInfo").addClass("multi-row");
 		$(".accounting-right ul.add-msg li.titleInfo").find("span").first().text("单行");
 		multiRowInfo(); //选中多行
 	}
 }

 //选中单行
 function singleRowInfo() {
 	var invoiceTxt = $.trim($("ul.listInfo.confirmFloor li dd.systemNum.selected").parent().find("dd.invoice").text()); //invoice
 	var debtTxt = $.trim($("ul.listInfo.confirmFloor li dd.systemNum.selected").parent().find("dd.debt").text()); //debt
 	var receivableTxt = $.trim($("ul.listInfo.confirmFloor li dd.systemNum.selected").parent().find("dd.receivable").text()); //应收款
 	var salePriceTxt = $.trim($("ul.listInfo.confirmFloor li dd.systemNum.selected").parent().find("dd.salePrice").text()); //卖价

 	localStorage.setItem("initial_invoice", invoiceTxt);

 	localStorage.setItem("initial_receivable", receivableTxt);

 	localStorage.setItem("initial_salePrice", salePriceTxt);
 	var profitTxt = $.trim($("ul.listInfo.confirmFloor li dd.systemNum.selected").parent().find("dd.profit").text()); //利润
 	localStorage.setItem("initial_profit", profitTxt);

 	$(".accounting-right ul.add-msg li.invoiceCell input").first().val(invoiceTxt);

 	var debtVal = Number($.trim(debtTxt.split('|')[1]).split('/')[1]);
 	if(isNaN(debtVal)) {
 		debtVal = 0;
 	}

 	var debt = Number($.trim(debtTxt.split('|')[1]).split('/')[0]) - debtVal;
 	if(debt == "") {
 		debt = 0;
 	}
 	$(".accounting-right ul.add-msg li.debtCell input").first().val(debt.toFixed(2));
 	localStorage.setItem("initial_debt", debtTxt);
 	if(receivableTxt == "CC") {
 		$(".accounting-right ul.add-msg li.receivableCell input").first().val("");
 	} else {
 		$(".accounting-right ul.add-msg li.receivableCell input").first().val($.trim(receivableTxt.split('|')[1]));
 	}

 	$(".accounting-right ul.add-msg li.salePriceCell input").first().val(salePriceTxt);
 	singleRow_confirmChange();

 	var transactionId = $("ul.listInfo.confirmFloor li dd.systemNum.selected")[0].innerText;
 	if(checkNumber[transactionId] != null) {
 		$(".accounting-right ul.add-msg li.checkNo").css("display", "block");
 		$("#check-number").val(checkNumber[transactionId]);
 	} else {
 		$(".accounting-right ul.add-msg li.checkNo").css("display", "none");
 		$(".accounting-right ul.add-msg li.checkNo").find("input").val("");
 	}
 }

 //还原信息-单行
 function restoreInfo_singleRow() {
 	$(".accounting-right ul.add-msg li.actionTabInfo a.restoreInfo").unbind("click").on("click", function() {
 		singleRowInfo();
// 		var invoiceTxt = localStorage.getItem("initial_invoice");
// 		var debtTxt = localStorage.getItem("initial_debt");
// 		var receivableTxt = localStorage.getItem("initial_receivable");
// 		var salePriceTxt = localStorage.getItem("initial_salePrice");
// 		var profitTxt = localStorage.getItem("initial_profit")
// 		//还原
// 		//invoice
// 		$(".accounting-right ul.add-msg li.invoiceCell input").first().val(invoiceTxt);
// 		$("dd.systemNum.selected").parent("dl").find("dd.invoice").text(invoiceTxt);
// 		//debt
// 		var debtVal = Number($.trim(debtTxt.split('|')[1]).split('/')[1]);
// 		if(isNaN(debtVal)) {
// 			debtVal = 0;
// 		}
//
// 		var debt = Number($.trim(debtTxt.split('|')[1]).split('/')[0]) - debtVal;
// 		$(".accounting-right ul.add-msg li.debtCell input").first().val(debt.toFixed(2));
// 		$("dd.systemNum.selected").parent("dl").find("dd.debt").text(debtTxt);
// 		//应收款
// 		if(receivableTxt == "CC") {
// 			$(".accounting-right ul.add-msg li.receivableCell input").first().val("");
// 		} else {
// 			$(".accounting-right ul.add-msg li.receivableCell input").first().val($.trim(receivableTxt.split('|')[1]));
// 		}
// 		$("dd.systemNum.selected").parent("dl").find("dd.receivable").text(receivableTxt);
// 		//卖价
// 		$(".accounting-right ul.add-msg li.salePriceCell input").first().val(salePriceTxt);
// 		$("dd.systemNum.selected").parent("dl").find("dd.salePrice").text(salePriceTxt);
 	});
 }
 //确认修改-提示框-单行
 function singleRow_confirmChange() {
 	$(".accounting-right ul.add-msg li.actionTabInfo a.confirmChange").unbind("click").on("click", function() {
 		$(".confirmNoticeInfo").addClass("singleRow_confirmTips");
 		$(".confirmNoticeInfo").removeClass("paidTips");
 		$(".confirmNoticeInfo").removeClass("lockTips");
 		$(".confirmNoticeInfo").removeClass("confirmClearInfo");
 		$(".confirmNoticeInfo").removeClass("confirmLockInfo");
 		$(".confirmNoticeInfo").removeClass("confirmPaidInfo");
 		$(".confirmNoticeInfo").removeClass("confirmInfoFinish");
 		$(".confirmNoticeInfo").removeClass("multiRow_confirmTips");
 		$(".confirmNoticeInfo").removeClass("cancelLockTips");
 		$(".confirmNoticeInfo").removeClass("cancelClearTips");
 		$(".confirmNoticeInfo").removeClass("cancelPaidTips");
 		$(".confirmNoticeInfo").removeClass("cancelFinishTips");
 		$(".confirmNoticeInfo").removeClass("amendTips");

 		var initialDebt = $.trim(Number(localStorage.getItem("initial_debt").split('|')[1]).toFixed(2));
 		var currentDebt = $.trim(Number($(".accounting-right ul.add-msg li.debtCell input").first().val()).toFixed(2));
 		console.log(initialDebt);
 		console.log(currentDebt);
 		if(currentDebt == initialDebt) {
 			//debt值未改变
 			var receivableTxt = $("dd.systemNum.selected").parent("dl").find("dd.receivable").text(); //应收款
 			if($.trim(receivableTxt) == "CC") {
 				//应收款是CC
 				var initialInvoice = $.trim(localStorage.getItem("initial_invoice")); //invoice
 				var currentInvoice = $.trim($(".accounting-right ul.add-msg li.invoiceCell input").first().val());
 				if(currentInvoice == initialInvoice) {
 					$(".singleRow_confirmTips p.confirmNotice").text("没有改动");
 					$(".singleRow_confirmTips").css("display", "block");
 					$(".singleRow_confirmTips").find("p.actionBox").find("button.actionConfirm").css("display", "none");
 					$(".singleRow_confirmTips").find("p.actionBox").find("button.actionCancel").css("width", "100%");
 					$(".singleRow_confirmTips").find("p.actionBox").find("button.actionCancel").text("返回");
 					//取消
 					$(".singleRow_confirmTips").find("p.actionBox").find("button.actionCancel").on("click", function() {
 						$(".singleRow_confirmTips").css("display", "none");
 					});
 				} else {
 					changeInfo_singleRow();
 				}

 			} else {
 				//应收款不是CC
 				var initialReceivable = $.trim(localStorage.getItem("initial_receivable").split('|')[1]);
 				var currentReceivable = $.trim($(".accounting-right ul.add-msg li.receivableCell input").first().val());
 				if(currentReceivable == initialReceivable) {
 					//应收款未改变
 					var initialInvoice = $.trim(localStorage.getItem("initial_invoice")); //invoice
 					var currentInvoice = $.trim($(".accounting-right ul.add-msg li.invoiceCell input").first().val());
 					if(currentInvoice == initialInvoice) {
 						//invoice未改变
 						$(".singleRow_confirmTips p.confirmNotice").text("没有改动");
 						$(".singleRow_confirmTips").css("display", "block");
 						$(".singleRow_confirmTips").find("p.actionBox").find("button.actionConfirm").css("display", "none");
 						$(".singleRow_confirmTips").find("p.actionBox").find("button.actionCancel").css("width", "100%");
 						$(".singleRow_confirmTips").find("p.actionBox").find("button.actionCancel").text("返回");
 						//取消
 						$(".singleRow_confirmTips").find("p.actionBox").find("button.actionCancel").on("click", function() {
 							$(".singleRow_confirmTips").css("display", "none");
 						});
 					} else {
 						changeInfo_singleRow();
 					}

 				} else {
 					//应收款已改变
 					var paidStatus = $.trim($("dd.systemNum.selected").parent("dl").find("dd.receivable").text()).split("|")[0]; //paid的状态
 					if(paidStatus == "Y") {
 						//已经paid
 						$(".singleRow_confirmTips p.confirmNotice").text("已经PAID无法修改");
 						$(".singleRow_confirmTips").css("display", "block");
 						$(".singleRow_confirmTips").find("p.actionBox").find("button.actionConfirm").css("display", "none");
 						$(".singleRow_confirmTips").find("p.actionBox").find("button.actionCancel").css("width", "100%");
 						$(".singleRow_confirmTips").find("p.actionBox").find("button.actionCancel").text("返回");
 						//取消
 						$(".singleRow_confirmTips").find("p.actionBox").find("button.actionCancel").on("click", function() {
 							$(".singleRow_confirmTips").css("display", "none");
 						});
 					} else {
 						//未PAID
 						changeInfo_singleRow();

 					}

 				}

 			}
 		} else {
 			//debt值已改变
 			var lockStatus = $("dd.systemNum.selected").parent("dl").find("dd.lockStatus");
 			if(lockStatus.hasClass("yesStatus")) {
 				//已经lock
 				$(".singleRow_confirmTips p.confirmNotice").text("已经LOCK无法修改");
 				$(".singleRow_confirmTips").css("display", "block");
 				$(".singleRow_confirmTips").find("p.actionBox").find("button.actionConfirm").css("display", "none");
 				$(".singleRow_confirmTips").find("p.actionBox").find("button.actionCancel").css("width", "100%");
 				$(".singleRow_confirmTips").find("p.actionBox").find("button.actionCancel").text("返回");
 				//取消
 				$(".singleRow_confirmTips").find("p.actionBox").find("button.actionCancel").on("click", function() {
 					$(".singleRow_confirmTips").css("display", "none");
 				});

 			} else {
 				//未lock
 				var receivableTxt = $("dd.systemNum.selected").parent("dl").find("dd.receivable").text();
 				if($.trim(receivableTxt) == "CC") {
 					//应收款是CC
 					changeInfo_singleRow();
 				} else {
 					//应收款不是CC
 					var initialReceivable = $.trim(localStorage.getItem("initial_receivable").split('|')[1]);
 					var currentReceivable = $.trim($(".accounting-right ul.add-msg li.receivableCell input").first().val());
 					console.log(initialReceivable);
 					console.log(currentReceivable);
 					if(currentReceivable == initialReceivable) {
 						//应收款未发生改变
 						changeInfo_singleRow();
 					} else {
 						//应收款已改变
 						//paid的状态:
 						var paidStatus = $.trim($("dd.systemNum.selected").parent("dl").find("dd.receivable").text()).split("|")[0];
 						if(paidStatus == "Y") {
 							//已经paid
 							$(".singleRow_confirmTips p.confirmNotice").text("已经PAID无法修改");
 							$(".singleRow_confirmTips").css("display", "block");
 							$(".singleRow_confirmTips").find("p.actionBox").find("button.actionConfirm").css("display", "none");
 							$(".singleRow_confirmTips").find("p.actionBox").find("button.actionCancel").css("width", "100%");
 							$(".singleRow_confirmTips").find("p.actionBox").find("button.actionCancel").text("返回");
 							//取消
 							$(".singleRow_confirmTips").find("p.actionBox").find("button.actionCancel").on("click", function() {
 								$(".singleRow_confirmTips").css("display", "none");
 							});
 						} else {
 							//未paid
 							changeInfo_singleRow();
 						}

 					}

 				}

 			}

 		}

 	});
 	restoreInfo_singleRow(); //还原
 }
 //单行-修改：
 function changeInfo_singleRow() {
 	$(".singleRow_confirmTips p.confirmNotice").text("确认修改");
 	$(".singleRow_confirmTips").css("display", "block");
 	$(".singleRow_confirmTips").find("p.actionBox").find("button.actionConfirm").css("display", "inline-block");
 	$(".singleRow_confirmTips").find("p.actionBox").find("button.actionCancel").css("width", "50%");
 	$(".singleRow_confirmTips").find("p.actionBox").find("button.actionCancel").text("取消");

 	$(".singleRow_confirmTips").find("p.actionBox").find("button.actionConfirm").unbind("click").on("click", function() {
 		var getInvoice = $(".accounting-right ul.add-msg li.invoiceCell input").first().val(); //invoice
 		if(getInvoice != '') {
 			$("dd.systemNum.selected").parent("dl").find("dd.invoice").text(getInvoice);
 		}

 		//Debt s
 		var initialDebt = $.trim(Number(localStorage.getItem("initial_debt").split('|')[1]).toFixed(2));
 		var currentDebt = $.trim(Number($(".accounting-right ul.add-msg li.debtCell input").first().val()).toFixed(2));
 		if(currentDebt !== initialDebt) {
 			var getDebt = $(".accounting-right ul.add-msg li.debtCell input").first().val(); //debt
 			var debtType = $.trim($("dd.systemNum.selected").parent("dl").find("dd.debt").text()).split("|")[0]; //类型
 			var debtEnd = $.trim($("dd.systemNum.selected").parent("dl").find("dd.debt").text()).split("|")[1].split('/')[1];
 			var debtTxt; //修改之后的debt
 			debtTxt = debtType + "|" + getDebt;
 			$("dd.systemNum.selected").parent("dl").find("dd.debt").text(debtTxt);
 			localStorage.setItem("initial_debt", debtTxt);
 		}
 		//Debt e

 		//应收款 s
 		var getReceivable = $(".accounting-right ul.add-msg li.receivableCell input").first().val();
 		var receivableType = $.trim($("dd.systemNum.selected").parent("dl").find("dd.receivable").text()).split("|")[0]; //类型
 		var receivableTxt = receivableType + "|" + getReceivable;
 		if(getReceivable != '') {
 			if(receivableType !== "CC") {
 				$("dd.systemNum.selected").parent("dl").find("dd.receivable").text(receivableTxt);
 				localStorage.setItem("initial_receivable", receivableTxt);
 			}
 		}
 		//应收款 e
 		//卖价
 		var getSalePrice = $(".accounting-right ul.add-msg li.salePriceCell input").first().val();
 		if(getSalePrice != '') {
 			$("dd.systemNum.selected").parent("dl").find("dd.salePrice").text(getSalePrice);
 		}

 		setTimeout(function() {
 			$(".singleRow_confirmTips").css("display", "none");
 		}, 500);
 	});
 	// 	data = {
 	// 		fs_id: fs_id[$("dd.selected")[0].innerText],
 	// 		invoice: $("#update-invoice").val(),
 	// 		debt: $("#update-debt").val(),
 	// 		receive: $("#update-receive").val(),
 	// 		selling_price: $("#update-selling-price").val(),
 	// 		check_no: $("#check-number").val()
 	// 	};
 	// 	$.ajax({
 	// 		url: location.protocol.concat("//").concat(location.host).concat('/database/Accounting/AccountingConfirm/singleRowUpdate.php'),
 	// 		type: 'POST',
 	// 		data: {
 	// 			data
 	// 		},
 	// 		success: function(response) {
 	// 			$(".singleRow_confirmTips").css("display", "none");
 	// 		},
 	// 		error: function(jqXHR, textStatus, errorThrown) {
 	// 			console.log(textStatus, errorThrown);
 	// 		}
 	// 	});
 	//取消
 	$(".singleRow_confirmTips").find("p.actionBox").find("button.actionCancel").on("click", function() {
 		$(".singleRow_confirmTips").css("display", "none");
 	});

 }
 
 
 //选中多行
 function multiRowInfo() {
 	var sameInvoice; //所选行中的invoce是否一致
 	var sameDebt; //所选行中的Debt是否一致
 	var sameReceivable; //所选行中的应收款是否一致
 	var sameSalePrice; //所选行中的卖价是否一致
 	var sumDebt = 0;
 	var sumReceivable = 0;
 	var sumSalePrice = 0;
 	var receivableArr = [];
 	var debtArr = [];
 	var debt_0 = $.trim($($("dd.systemNum.selected").parent("dl")[0]).find("dd.debt").text());
 	for(var i = 0; i < $("dd.systemNum.selected").parent("dl").length; i++) {
 		//invoice
 		var invoice_0 = $.trim($($("dd.systemNum.selected").parent("dl")[0]).find("dd.invoice").text());
 		localStorage.setItem("multiRow_initial_invoice", invoice_0); //选中多行修改前的invoice
 		if(invoice_0 == $.trim($($("dd.systemNum.selected").parent("dl")[i]).find("dd.invoice").text())) {
 			//选中行的invoice相同
 			$(".accounting-right ul.add-msg li.invoiceCell input").val(invoice_0);
 			sameInvoice = true;
 		} else {
 			//选中行的invoice不相同
 			$(".accounting-right ul.add-msg li.invoiceCell input").val("");
 			sameInvoice = false;
 		}
 		//debt
 		var currentDebt = $($("dd.systemNum.selected").parent("dl")[i]).find("dd.debt").text().split('|')[1];
 		// 		var currentDebt = $.trim($($("dd.systemNum.selected").parent("dl")[i]).find("dd.debt").text().split('|')[1]).split('/')[0];
 		// 		var debtVal = Number($.trim($($("dd.systemNum.selected").parent("dl")[i]).find("dd.debt").text().split('|')[1]).split('/')[1]);
 		// 		if(isNaN(debtVal)) {
 		// 			debtVal = 0;
 		// 		}
 		// 		var currentDebt = Number($.trim($($("dd.systemNum.selected").parent("dl")[i]).find("dd.debt").text().split('|')[1]).split('/')[0]) - debtVal;
 		sumDebt = Number(sumDebt + Number(currentDebt));
 		localStorage.setItem("multiRow_initial_debt", debt_0); //选中多行修改前的debt
 		localStorage.setItem("multiRow_sum_debt", sumDebt.toFixed(2));
 		if(debt_0.split('|')[0] == $.trim($($("dd.systemNum.selected").parent("dl")[i]).find("dd.debt").text()).split('|')[0]) {
 			if(debt_0.split('|')[1] == $.trim(currentDebt)) {
 				$(".accounting-right ul.add-msg li.debtCell input").first().val($.trim(debt_0.split('|')[1]));
 				sameDebt = true;
 			} else {
 				$(".accounting-right ul.add-msg li.debtCell input").first().val("");
 				sameDebt = false;
 			}
 			//选中行的debt相同
 			$(".accounting-right ul.add-msg li.debtCell input").last().val(sumDebt.toFixed(2));

 		} else {
 			//选中行的debt不相同
 			$(".accounting-right ul.add-msg li.debtCell input").first().val("");
 			$(".accounting-right ul.add-msg li.debtCell input").last().val(sumDebt.toFixed(2));
 			sameDebt = false;
 		}

 		//应收款
 		var receivable_0 = $.trim($($("dd.systemNum.selected").parent("dl")[0]).find("dd.receivable").text());
 		var currentReceivable = $($("dd.systemNum.selected").parent("dl")[i]).find("dd.receivable").text().split('|')[1];
 		receivableArr.push($.trim($($("dd.systemNum.selected").parent("dl")[i]).find("dd.receivable").text()));
 		var hasCC;
 		if(receivableArr[i] == "CC") {
 			currentReceivable = 0;
 			hasCC = true;
 			localStorage.setItem("hasCC", hasCC);
 		} else {
 			hasCC = false;
 			currentReceivable = $($("dd.systemNum.selected").parent("dl")[i]).find("dd.receivable").text().split('|')[1];
 			localStorage.setItem("hasCC", hasCC);
 		}
 		sumReceivable = Number(sumReceivable + Number(currentReceivable));
 		localStorage.setItem("multiRow_initial_receivable", receivable_0); //选中多行修改前的应收款
 		localStorage.setItem("multiRow_sum_receivable", sumReceivable);

 		if(receivable_0.split('|')[0] == $.trim($($("dd.systemNum.selected").parent("dl")[i]).find("dd.receivable").text()).split('|')[0]) {
 			//选中行的应收款相同
 			if(receivable_0 == "CC") {
 				$(".accounting-right ul.add-msg li.receivableCell input").first().val("");
 				$(".accounting-right ul.add-msg li.receivableCell input").last().val(sumReceivable);
 			} else {
 				if($.trim(currentReceivable) == receivable_0.split('|')[1]) {
 					$(".accounting-right ul.add-msg li.receivableCell input").first().val($.trim(receivable_0.split('|')[1]));
 					$(".accounting-right ul.add-msg li.receivableCell input").last().val(sumReceivable);
 					sameReceivable = true;
 				} else {
 					$(".accounting-right ul.add-msg li.receivableCell input").last().val(sumReceivable);
 					$(".accounting-right ul.add-msg li.receivableCell input").first().val("");

 					sameReceivable = false;
 				}
 			}
 			//sameReceivable = true;
 		} else {
 			//选中行的应收款不相同
 			if(hasCC == true) {
 				$(".accounting-right ul.add-msg li.receivableCell input").first().val("");
 				$(".accounting-right ul.add-msg li.receivableCell input").last().val(Number(sumReceivable));
 				sameReceivable = false;
 			} else {
 				// 				$(".accounting-right ul.add-msg li.receivableCell input").val("");
 				$(".accounting-right ul.add-msg li.receivableCell input").first().val("");
 				$(".accounting-right ul.add-msg li.receivableCell input").last().val(Number(sumReceivable));
 				sameReceivable = false;
 			}
 		}
 		//卖价
 		var currentSalePrice = $.trim($($("dd.systemNum.selected").parent("dl")[i]).find("dd.salePrice").text());
 		sumSalePrice = Number(sumSalePrice + Number(currentSalePrice));
 		var salePrice_0 = $.trim($($("dd.systemNum.selected").parent("dl")[0]).find("dd.salePrice").text());
 		localStorage.setItem("multiRow_initial_salePrice", salePrice_0); //选中多行修改前的salePrice
 		localStorage.setItem("multiRow_sum_salePrice", sumSalePrice);
 		if(salePrice_0 == $.trim($($("dd.systemNum.selected").parent("dl")[i]).find("dd.salePrice").text())) {
 			//选中行的卖价相同
 			$(".accounting-right ul.add-msg li.salePriceCell input").last().val(sumSalePrice);
 			$(".accounting-right ul.add-msg li.salePriceCell input").first().val(salePrice_0);
 			sameSalePrice = true;

 		} else {
 			//选中行的卖价不相同
 			$(".accounting-right ul.add-msg li.salePriceCell input").first().val("");
 			$(".accounting-right ul.add-msg li.salePriceCell input").last().val(sumSalePrice);

 			sameSalePrice = false;
 		}
 	}

 	var selectedCheck = null;
 	// 找到支票号码不为空的订单
 	for(var i = 0; i < $("dd.systemNum.selected").length; i++) {
 		var transactionId = $("dd.systemNum.selected")[i].innerText;
 		if(checkNumber[transactionId] != null) {
 			selectedCheck = checkNumber[transactionId];
 			break;
 		}
 	}
 	if(selectedCheck == null) {
 		// 如果所有选中订单都不存在支票号
 		$(".accounting-right ul.add-msg li.checkNo").css("display", "none");
 		$(".accounting-right ul.add-msg li.checkNo").find("input").val("");
 	} else {
 		for(var i = 0; i < $("dd.systemNum.selected").length; i++) {
 			var transactionId = $("dd.systemNum.selected")[i].innerText;
 			if(checkNumber[transactionId] == null) {
 				// 如果存在支票号为空的订单则不显示
 				$(".accounting-right ul.add-msg li.checkNo").css("display", "none");
 				$(".accounting-right ul.add-msg li.checkNo").find("input").val("");
 				break;
 			} else if(checkNumber[transactionId] != selectedCheck) {
 				// 如果存在不同的支票号则不显示
 				$(".accounting-right ul.add-msg li.checkNo").css("display", "none");
 				$(".accounting-right ul.add-msg li.checkNo").find("input").val("");
 			} else {
 				// 如果所有选中的订单共用一个支票号则显示
 				$(".accounting-right ul.add-msg li.checkNo").css("display", "block");
 				$("#check-number").val(selectedCheck);
 			}
 		}
 	}

 	multiRow_confirmChange();
 }

 //确认修改-提示框-多行
 function multiRow_confirmChange() {
 	$(".accounting-right ul.add-msg li.actionTabInfo a.confirmChange").unbind("click").on("click", function() {
 		$(".confirmNoticeInfo").addClass("multiRow_confirmTips");
 		$(".confirmNoticeInfo").removeClass("singleRow_confirmTips");
 		$(".confirmNoticeInfo").removeClass("paidTips");
 		$(".confirmNoticeInfo").removeClass("lockTips");
 		$(".confirmNoticeInfo").removeClass("confirmClearInfo");
 		$(".confirmNoticeInfo").removeClass("confirmLockInfo");
 		$(".confirmNoticeInfo").removeClass("confirmPaidInfo");
 		$(".confirmNoticeInfo").removeClass("confirmInfoFinish");
 		$(".confirmNoticeInfo").removeClass("cancelLockTips");
 		$(".confirmNoticeInfo").removeClass("cancelClearTips");
 		$(".confirmNoticeInfo").removeClass("cancelPaidTips");
 		$(".confirmNoticeInfo").removeClass("cancelFinishTips");
 		$(".confirmNoticeInfo").removeClass("amendTips");
 		$("dd.systemNum.selected").each(function(i, item) {
 			var systemNumText = $.trim($(item).text());
 			systemNumText = systemNumText.substring(systemNumText.length - 3);
 			if(systemNumText == "mco") {
 				//已经paid
 				$(".multiRow_confirmTips p.confirmNotice").text("选中行有MCO,无法复数修改");
 				$(".multiRow_confirmTips").css("display", "block");
 				$(".multiRow_confirmTips").find("p.actionBox").find("button.actionConfirm").css("display", "none");
 				$(".multiRow_confirmTips").find("p.actionBox").find("button.actionCancel").css("width", "100%");
 				$(".multiRow_confirmTips").find("p.actionBox").find("button.actionCancel").text("返回");
 				//取消
 				$(".multiRow_confirmTips").find("p.actionBox").find("button.actionCancel").on("click", function() {
 					$(".multiRow_confirmTips").css("display", "none");
 				});

 			} else {
 				var lockStatus = $(item).parent("dl").find("dd.lockStatus").hasClass("yesStatus");
 				if(lockStatus) {
 					$(".multiRow_confirmTips p.confirmNotice").text("部分选中行已经LOCK,无法修改");
 					$(".multiRow_confirmTips").css("display", "block");
 					$(".multiRow_confirmTips").find("p.actionBox").find("button.actionConfirm").css("display", "none");
 					$(".multiRow_confirmTips").find("p.actionBox").find("button.actionCancel").css("width", "100%");
 					$(".multiRow_confirmTips").find("p.actionBox").find("button.actionCancel").text("返回");
 					//取消
 					$(".multiRow_confirmTips").find("p.actionBox").find("button.actionCancel").on("click", function() {
 						$(".multiRow_confirmTips").css("display", "none");
 					});
 				} else {
 					var paidStatus = $.trim($(item).parent("dl").find("dd.receivable").text().split("|")[0]);
 					if(paidStatus == "Y" || paidStatus == "CC") {
 						$(".multiRow_confirmTips p.confirmNotice").text("部分选中行已经PAID,无法修改");
 						$(".multiRow_confirmTips").css("display", "block");
 						$(".multiRow_confirmTips").find("p.actionBox").find("button.actionConfirm").css("display", "none");
 						$(".multiRow_confirmTips").find("p.actionBox").find("button.actionCancel").css("width", "100%");
 						$(".multiRow_confirmTips").find("p.actionBox").find("button.actionCancel").text("返回");
 						//取消
 						$(".multiRow_confirmTips").find("p.actionBox").find("button.actionCancel").on("click", function() {
 							$(".multiRow_confirmTips").css("display", "none");
 						});
 					} else {
 						if($(".accounting-right ul.add-msg li.debtCell input").first().val() !== "" || $(".accounting-right ul.add-msg li.receivableCell input").first().val() !== "") {
 							changeInfo_multiRow();
 						}
 					}
 				}

 			}

 		});
 	});
 	restoreInfo_multiRow();
 }
 //确认修改-多行
 function changeInfo_multiRow() {
 	$(".multiRow_confirmTips p.confirmNotice").text("确认修改");
 	$(".multiRow_confirmTips").css("display", "block");
 	$(".multiRow_confirmTips").find("p.actionBox").find("button.actionConfirm").css("display", "inline-block");
 	$(".multiRow_confirmTips").find("p.actionBox").find("button.actionCancel").css("width", "50%");
 	$(".multiRow_confirmTips").find("p.actionBox").find("button.actionCancel").text("取消");
 	$(".multiRow_confirmTips").find("p.actionBox").find("button.actionConfirm").unbind("click").on("click", function() {
 		var len = $("dd.systemNum.selected").length;
 		var getInvoice = $(".accounting-right ul.add-msg li.invoiceCell input").first().val(); //invoice
 		if(getInvoice!==""){
 			$("dd.systemNum.selected").parent("dl").find("dd.invoice").text(getInvoice);
 		}
 		//Debt s
 		var getDebt = $(".accounting-right ul.add-msg li.debtCell input").first().val(); //debt
 		var debtType = $.trim($("dd.systemNum.selected").parent("dl").find("dd.debt").text()).split("|")[0]; //类型
 		var debtEnd = $.trim($("dd.systemNum.selected").parent("dl").find("dd.debt").text()).split("|")[1].split('/')[1];
 		var debtTxt; //修改之后的debt
 		if(getDebt !== "") {
 			debtTxt = debtType + "|" + getDebt;
 			$("dd.systemNum.selected").parent("dl").find("dd.debt").text(debtTxt);
 			localStorage.setItem("multiRow_initial_debt", debtTxt);
 			$(".accounting-right ul.add-msg li.debtCell input").last().val(Number(getDebt * len).toFixed(2));
 			localStorage.setItem("multiRow_sum_debt", Number(getDebt * len).toFixed(2));
 		}
 		//Debt e
 		//应收款 s
 		var getReceivable = $(".accounting-right ul.add-msg li.receivableCell input").first().val();
 		var receivableType = $.trim($("dd.systemNum.selected").parent("dl").find("dd.receivable").text()).split("|")[0]; //类型
 		var receivableTxt = receivableType + "|" + getReceivable;
 		if(getReceivable != '') {
 			if(receivableType !== "CC") {
 				$("dd.systemNum.selected").parent("dl").find("dd.receivable").text(receivableTxt);
 				localStorage.setItem("multiRow_initial_receivable", receivableTxt);
 				$(".accounting-right ul.add-msg li.receivableCell input").last().val(Number(getReceivable * len));
 				localStorage.setItem("multiRow_sum_receivable", Number(getReceivable * len));
 			}
 		}
 		//应收款 e
 		setTimeout(function() {
 			$(".multiRow_confirmTips").css("display", "none");
 		}, 500);
 	});
 	//取消
 	$(".multiRow_confirmTips").find("p.actionBox").find("button.actionCancel").on("click", function() {
 		$(".multiRow_confirmTips").css("display", "none");
 	});
 	// 	var fs_id_list = [];
 	// 	for(var i = 0; i < $("dd.selected").length; i++) {
 	// 		fs_id_list.push(fs_id[$("dd.selected")[i].innerText]);
 	// 	}
 	// 	data = {
 	// 		fs_id_list: JSON.stringify(fs_id_list),
 	// 		invoice: $("#update-invoice").val(),
 	// 		debt: $("#update-debt").val(),
 	// 		receive: $("#update-receive").val(),
 	// 		selling_price: $("#update-selling-price").val(),
 	// 		check_no: $("#check-number").val()
 	// 	};
 	// 	$.ajax({
 	// 		url: location.protocol.concat("//").concat(location.host).concat('/database/Accounting/AccountingConfirm/multiRowUpdate.php'),
 	// 		type: 'POST',
 	// 		data: {
 	// 			data
 	// 		},
 	// 		success: function(response) {
 	// 			$(".multiRow_confirmTips").css("display", "none");
 	// 		},
 	// 		error: function(jqXHR, textStatus, errorThrown) {
 	// 			console.log(textStatus, errorThrown);
 	// 		}
 	// 	});
 }
 //还原信息-多行
 function restoreInfo_multiRow() {
 	//还原
 	$(".accounting-right ul.add-msg li.actionTabInfo a.restoreInfo").unbind("click").on("click", function() {
 		multiRowInfo();
 		$("dd.systemNum.selected").parent("dl").find("dd.invoice")
 	});

 }
 
 
 // 是否提交修改申请：
 function amendApplicationTips() {
 	var permission = true;
 	if(!permission) {
 		$(".confirmNoticeInfo").removeClass("multiRow_confirmTips");
 		$(".confirmNoticeInfo").removeClass("singleRow_confirmTips");
 		$(".confirmNoticeInfo").removeClass("paidTips");
 		$(".confirmNoticeInfo").removeClass("lockTips");
 		$(".confirmNoticeInfo").removeClass("confirmClearInfo");
 		$(".confirmNoticeInfo").removeClass("confirmLockInfo");
 		$(".confirmNoticeInfo").removeClass("confirmPaidInfo");
 		$(".confirmNoticeInfo").removeClass("confirmInfoFinish");
 		$(".confirmNoticeInfo").removeClass("cancelLockTips");
 		$(".confirmNoticeInfo").removeClass("cancelClearTips");
 		$(".confirmNoticeInfo").removeClass("cancelPaidTips");
 		$(".confirmNoticeInfo").removeClass("cancelFinishTips");

 		$(".confirmNoticeInfo").addClass("amendTips");

 		$(".amendTips p.confirmNotice").text("是否提交修改申请");
 		$(".amendTips").css("display", "block");
 		$(".amendTips").find("p.actionBox").find("button.actionConfirm").on("click", function() {
 			setTimeout(function() {
 				$(".amendTips").css("display", "none");
 			}, 500);
 		});
 		//取消
 		$(".amendTips").find("p.actionBox").find("button.actionCancel").on("click", function() {
 			$(".amendTips").css("display", "none");
 		});
 	}
 	return permission;
 }
 //全选
 function selectAll() {
 	$(".filterBox ul.searchFloor li div.rightFloor a.selectAllBtn").on("click", function() {
 		$("ul.listInfo li.listDetail dl").find("dd.systemNum").addClass("selected");
 		var currentClearStatus = $("ul.listInfo li.listDetail dl").find("dd.systemNum.selected").parent().find("dd.debt").text().split('|')[0];
 		var currentPaidStatus = $("ul.listInfo li.listDetail dl").find("dd.systemNum.selected").parent().find("dd.receivable").text().split('|')[0];
 		getListInfo();
 		confirmLock(); //确认LOCK
 		confirmClear(); //确认CLEAR
 		confirmPaid(); //确认PAID
 		confirmFinish(); //确认FINISH
 		//取消
 		cancelLock();
 		cancelClear(currentClearStatus);
 		cancelPaid(currentPaidStatus);
 		cancelFinish();

 	});
 }
 //全不选
 function selectNone() {
 	$(".filterBox ul.searchFloor li div.rightFloor a.selectNoneBtn").on("click", function() {
 		$("ul.listInfo li.listDetail dl").find("dd.systemNum").removeClass("selected");
 		getListInfo();
 	});
 }