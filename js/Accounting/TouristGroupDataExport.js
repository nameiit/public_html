$(function() {
	systematicSearch();
	resetSystematicSearch();
	checkInvoice();
	getTimeInfo();
	choiceDate();
	incomeAccount();
	toUsersManagePage();
	// Pagination();

	var choiceInfo = $(".choiceItem .choiceInfo");
	var maxHeight;
	var heightArr=[];
	for(var i = 0; i < $(".choiceItem .choiceInfo").length; i++) {
		heightArr.push($(choiceInfo[i]).height());
	}
	maxHeight=Math.max.apply(null, heightArr);
	choiceInfo.css({
		"height": maxHeight,
	});

});

function Pagination() {
 	$('#choicePagination').pagination({
 		totalData: 20,
 		showData: 10,
 		coping: true,
 		homePage: '首页',
 		endPage: '末页',
 		prevContent: '上页',
 		nextContent: '下页',
 		callback: function(api) {
 			var j = api.getCurrent(); //获取当前页
 			$("li.resultDetail").remove();
 			var e = `<li class="resultDetail">
						<dl></dl>`;
 			$(".resultTab").find("li.resultNav").after(e);
 			var ddCell=`<dd></dd>`;
   			for(var i=0;i<$(".resultTab ul li.resultNav").find("dd").length;i++){
   				console.log($(".resultTab ul li.resultNav").find("dd").length);
   				$(".resultTab").find("li.resultDetail").find("dl").append(ddCell);
   			}
 			heightRange();
 		}
 	});
 }

function systematicSearch() {
	$(".filterBox ul.searchFloor li.btnList").find("a").on("mousedown", function() {
		$(this).addClass('selected');
	});
	$(".filterBox ul.searchFloor li.btnList").find("a").on("mouseup", function() {
		$(this).removeClass('selected');
	});
	//成交时间:
	$(".systematicSearch ul li div.rightContent.timeList").find("select").on("change", function() {
		var currentText = $.trim($(this).find("option:selected").text());
		if(currentText == "Customize") {
			$(".systematicSearch ul li div.rightContent.dealTime").css("display", "inline-block");
		} else {
			$(".systematicSearch ul li div.rightContent.dealTime").css("display", "none");
		}
	});
	//支付方式：
	$(".systematicSearch ul li").find("select.payment").on("change", function() {
		var currentText = $.trim($(this).find("option:selected").text());
		if(currentText == "NON-CC") {
			$(".systematicSearch ul.searchFloor li div.placeInfo").css("display", "inline-block");
		} else {
			$(".systematicSearch ul.searchFloor li div.placeInfo").css("display", "none");
		}
	});
}

//重置：
function resetSystematicSearch() {
	$(".systematicSearch ul.searchFloor li div a.resetBtn").on("click", function() {
		$(".systematicSearch ul.searchFloor li div").find("input").val("");
		$(".systematicSearch ul.searchFloor li div").find("select").val("");
		$(".systematicSearch ul.searchFloor li div.placeInfo").css("display", "none");
		$(".systematicSearch ul li div.rightContent.dealTime").css("display", "none");
	});
}

function checkInvoice() {
	$(".systematicSearch ul.searchFloor li div.invoiceInfo div.invoice1").find("input").on("keyup", function() {
		if(!isNaN($(this).val())) {

		} else {
			alert("请确认填写数字格式");
			$(this).val("");

		}
	});
	$(".systematicSearch ul.searchFloor li div.invoiceInfo").find("img").on("click", function() {
		if($(this).attr("src") == "../img/invoice_icon1.png") {
			$(this).attr("src", "../img/invoice_icon2.png");
			$(".filterBox ul.searchFloor li div.invoiceInfo div.invoice2").css("display", "none");
			$(".filterBox ul.searchFloor li div.invoiceInfo div.invoice1").css("display", "inline-block");
			$(".systematicSearch ul.searchFloor li div.invoiceInfo").find("input").val("");
		} else {
			$(this).attr("src", "../img/invoice_icon1.png");
			$(".filterBox ul.searchFloor li div.invoiceInfo div.invoice1").css("display", "none");
			$(".filterBox ul.searchFloor li div.invoiceInfo div.invoice2").css("display", "inline-block");
			$(".systematicSearch ul.searchFloor li div.invoiceInfo").find("input").val("");
		}
	});
}

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
		$(".systematicSearch ul li div.rightContent.timeList").find("select").append(e);
	}
	for(j = 12; j > currentMonth - 1; j--, num++) {
		monthInfo = year - 1 + "-" + j;
		e = `
			<option  value="current_month-` + num + `"  >` + monthInfo + `</option>
		`;
		$(".systematicSearch ul li div.rightContent.timeList").find("select").append(e);
	}
}

//数据选择：
function choiceDate() {
	//	$(".otherManageNav ul li.current-item")
	$(".choiceItem ul.btnList li a").on("mousedown", function() {
		$(this).addClass("selected");
	});
	$(".choiceItem ul.btnList li a").on("mouseup", function() {
		$(this).removeClass("selected");
	});
	$(".choiceItem.quickChoice .choiceInfo dl dd a").on("mousedown", function() {
		$(this).addClass("current");
	});
	$(".choiceItem.quickChoice .choiceInfo dl dd a").on("mouseup", function() {
		$(this).removeClass("current");
	});
	$(".confirmSave div.choiceBtn").find("input").on("click", function() {
		$(this).attr("checked", true).parent().parent().siblings().find("input").attr("checked", false);
	});
	$(".choiceItem .choiceInfo ul li.choiceContent div.selected").find("input").on("click", function() {
		if(!$(this).parent().parent("div.selected").hasClass("current")) {
			$(this).parent().parent("div.selected").addClass("current");
		} else {
			$(this).parent().parent("div.selected").removeClass("current");
		}
	});
	$(".choiceItem ul.btnList li a.resetBtn").unbind("click").on("click", function() {
		resetChoice();
	});

	incomeAccount();
	costAccount();
	saveScheme();
	default1();
	default2();
	default3();
	default4();
	salesJournal();
	// viewTable();
	// downData();

}

//重置：
function resetChoice() {
	$(".choiceItem .choiceInfo ul li.choiceContent .selected").find("input").attr("checked", false);
	$(".choiceItem .choiceInfo ul li.choiceContent .selected").removeClass("current");
}

//成本核算
function costAccount() {
	$(".choiceItem.quickChoice .choiceInfo dl dd a.costAccount").on("click", function() {
		resetChoice();
		//		$(".choiceItem .choiceInfo ul li.choiceContent .selected").find("input#systemNum").attr("checked",true);
		//		$(".choiceItem .choiceInfo ul li.choiceContent .selected").find("input#invoice").attr("checked",true);
		//		$(".choiceItem .choiceInfo ul li.choiceContent .selected").find("input#createDate").attr("checked",true);
		//		$(".choiceItem .choiceInfo ul li.choiceContent .selected").find("input#cost").attr("checked",true);
		//		$(".choiceItem .choiceInfo ul li.choiceContent .selected").find("input#paid").attr("checked",true);
		//		$(".choiceItem .choiceInfo ul li.choiceContent .selected").find("input#startTime").attr("checked",true);
		//		$(".choiceItem .choiceInfo ul li.choiceContent .selected").find("input#returnTime").attr("checked",true);
	});
}

//收入核算
function incomeAccount() {
	$(".choiceItem.quickChoice .choiceInfo dl dd a.incomeAccount").on("click", function() {
		resetChoice();
		//		$(".choiceItem .choiceInfo ul li.choiceContent .selected").find("input#systemNum").attr("checked",true);
		//		$(".choiceItem .choiceInfo ul li.choiceContent .selected").find("input#invoice").attr("checked",true);
		//		$(".choiceItem .choiceInfo ul li.choiceContent .selected").find("input#createDate").attr("checked",true);
		//		$(".choiceItem .choiceInfo ul li.choiceContent .selected").find("input#receivable").attr("checked",true);
		//		$(".choiceItem .choiceInfo ul li.choiceContent .selected").find("input#received").attr("checked",true);
		//		$(".choiceItem .choiceInfo ul li.choiceContent .selected").find("input#refund").attr("checked",true);
		//		$(".choiceItem .choiceInfo ul li.choiceContent .selected").find("input#actualRefund").attr("checked",true);
		//		$(".choiceItem .choiceInfo ul li.choiceContent .selected").find("input#startTime").attr("checked",true);
		//		$(".choiceItem .choiceInfo ul li.choiceContent .selected").find("input#returnTime").attr("checked",true);
	});
}

//默认1
function default1() {
	$(".choiceItem.quickChoice .choiceInfo dl dd a.default1").on("click", function() {
		resetChoice();
	});
}

//默认2
function default2() {
	$(".choiceItem.quickChoice .choiceInfo dl dd a.default2").on("click", function() {
		resetChoice();

	});
}

//默认3
function default3() {
	$(".choiceItem.quickChoice .choiceInfo dl dd a.default3").on("click", function() {
		resetChoice();

	});
}

//默认4
function default4() {
	$(".choiceItem.quickChoice .choiceInfo dl dd a.default4").on("click", function() {
		resetChoice();

	});
}

//销售日报
function salesJournal() {
	$(".choiceItem.quickChoice .choiceInfo dl dd a.salesJournal").on("click", function() {
		resetChoice();

	});
}

//保存方案：
function saveScheme() {
	$(".choiceItem ul.btnList li a.saveScheme").on("click", function() {
		var choiceNum = $(".choiceItem .choiceInfo ul li.choiceContent .selected.current").length;
		if(choiceNum < 1) {
			alert("至少选择一项");
		} else {
			$(".confirmSave").css("display", "block");
			$(".confirmSave .confirmTitle").find("img").attr("src", "../img/confirmInfo.png");
			$(".confirmNoticeInfo p.confirmInfor").css("display", "inline-block");
			$(".confirmNoticeInfo p.saveSuccess").css("display", "none");
			$(".confirmSave div.choiceBtn").css("display", "inline-block");
			$(".confirmSave").find("p.actionBox").find("button.actionConfirm").css("display", "inline-block");
			$(".confirmSave").find("p.actionBox").find("button.actionCancel").text("取消");
			$(".confirmSave").find("p.actionBox").find("button.actionCancel").css("width", "50%");
			$(".confirmSave div.choiceBtn").find("input").attr("checked", false);

			//确认
			$(".confirmSave").find("p.actionBox").find("button.actionConfirm").on("click", function() {
				$(".confirmSave .confirmTitle").find("img").attr("src", "../img/userConfirm.png");
				$(".confirmNoticeInfo p.confirmInfor").css("display", "none");
				$(".confirmNoticeInfo p.saveSuccess").css("display", "inline-block");
				$(".confirmSave div.choiceBtn").css("display", "none");
				//			setTimeout(function() {
				// 				$(".confirmSave").css("display", "none");
				// 			}, 500);

				$(".confirmSave").find("p.actionBox").find("button.actionConfirm").css("display", "none");
				$(".confirmSave").find("p.actionBox").find("button.actionCancel").text("返回");
				$(".confirmSave").find("p.actionBox").find("button.actionCancel").css("width", "100%");

			});
			//取消
			$(".confirmSave").find("p.actionBox").find("button.actionCancel").on("click", function() {
				$(".confirmSave").css("display", "none");
			});
		}

	});
}

// //查看表格s
// function viewTable() {
// 	$(".choiceItem ul.btnList li a.viewBtn").on("click", function() {
// 		var choiceNum = $(".choiceItem .choiceInfo ul li.choiceContent .selected.current").length;
// 		var dlBox = $(".resultTab ul li.resultNav dl");
// 		var dlDetail = $(".resultTab ul li.resultDetail dl");
// 		if(choiceNum < 1) {
// 			alert("至少选择一项");
// 			dlBox.empty();
// 			dlDetail.empty();
// 			$(".resultTab").css("display", "none");
// 		} else {
// 			$(".resultTab").css("display", "block");
// 			var labelTxt;
// 			var choiceNum = $(".choiceItem .choiceInfo ul li.choiceContent .selected.current").length;
// 			var selectedItem = $(".choiceItem .choiceInfo ul li.choiceContent div.selected.current");
// 			dlBox.empty();
// 			dlDetail.empty();
// 			for(var i = 0; i < choiceNum; i++) {
// 				labelTxt = $.trim($(selectedItem).eq(i).find("div.checkbox").find("label").text());
// 				var e = `<dd>` + labelTxt + `</dd>`;
// 				dlBox.append(e);
// 				dlDetail.append(`<dd>123456789</dd>`);
// 				autoWidth();
// 				if(autoWidth() > $(".resultTab").outerWidth()) {
// 					$(".resultTab").css({
// 						"overflow-x": "scroll",
// 					});
// 				} else {
// 					$(".resultTab").css({
// 						"overflow-x": "initial"
// 					});
// 				}
// 				heightRange();
// 			}
// 		}
// 		heightRange();
// 	});
//
// }

// //下载数据至本地
// function downData() {
// 	$(".choiceItem ul.btnList li a.downData").on("click", function() {
// 		var choiceNum = $(".choiceItem .choiceInfo ul li.choiceContent .selected.current").length;
// 		if(choiceNum < 1) {
// 			alert("至少选择一项");
// 		} else {
//
// 		}
// 	});
// }

function autoWidth() {
	var dlBox = $(".resultTab ul li.resultNav dl");
	var dlDetail = $(".resultTab ul li.resultDetail dl");
	var ulWidth = 0.5;
	for(var i = 0; i < dlBox.find("dd").length; i++) {
		var cell = dlDetail.find("dd");
		dlBox.find("dd").eq(i).css("width", $(cell.eq(i)).width());
		ulWidth = ulWidth + $(cell.eq(i)).outerWidth(true);
		//		console.log($(cell.eq(i)).outerWidth(true));
	}

	$(".resultTab ul.result").css("width", ulWidth + "px");
	return ulWidth;
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


$(document).ready(function() {
	/*
	 *   Retuan date in 'YYYY-MM-DD' format
	 */
	function formatDate(date) {
		var month = '' + (date.getMonth() + 1),
			day = '' + date.getDate(),
			year = date.getFullYear();

		if(month.length < 2) month = '0' + month;
		if(day.length < 2) day = '0' + day;

		return [year, month, day].join('-');
	}

	function getFromAndToDate(data) {
		var today = new Date();
		var year = today.getFullYear();
		var month = today.getMonth();
		var day = today.getDate();

		var diff = $("#settletime").val();
		if(diff.length == 15) {
			diff = diff[14];
		} else {
			diff = diff.substring(14, 16);
		}

		if(month - Number(diff) < 0) {
			from_date = new Date(year - 1, 12 - (Number(diff) - month), 1);
			to_date = new Date(year - 1, 12 - (Number(diff) - month) + 1, 0);
		} else {
			from_date = new Date(year, month - Number(diff), 1);
			to_date = new Date(year, month - Number(diff) + 1, 0);
		}
		data['from_date'] = formatDate(from_date);
		data['to_date'] = formatDate(to_date);
		return data;
	}

	function getFilterData() {
		var data = {
			transaction_id: $("#transaction-id").val(),
			group_number: $("#group-number").val(),
			fname: $("#fname").val(),
			lname: $("#lname").val(),
			from_invoice: $("#from-invoice").val(),
			to_invoice: $("#to-invoice").val(),
			invoice: $("#invoice-filter").val(),
			start_date: $("#start-date").val(),
			end_date: $("#end-date").val(),
			wholesaler: $("#wholesaler").val(),
			payment_type: $("#payment-type").val(),
			lock_status: $("#lock-status").val(),
			clear_status: $("#clear-status").val(),
			paid_status: $("#paid-status").val(),
			finish_status: $("#paid-status").val()
		};

		var today = new Date();
		var year = today.getFullYear();
		var month = today.getMonth();
		var day = today.getDate();
		var from_date = "";
		var to_date = new Date(year, month + 1, 0);

		if($("#settletime").val() == 'all') {
			data['from_date'] = "0";
			data['to_date'] = formatDate(to_date);
		} else if($("#settletime").val() == 'today') {
			data['from_date'] = formatDate(today);
			data['to_date'] = formatDate(to_date);
		} else if($("#settletime").val() == 'current_month') {
			data['from_date'] = formatDate(new Date(year, month, 1));
			data['to_date'] = formatDate(to_date);
		} else if($("#settletime").val().startsWith('current_month-')) {
			getFromAndToDate(data);
		} else {
			from_date = $("#from-date").val() == "" ? "0" : $("#from-date").val();
			to_date = $("#to-date").val() == "" ? formatDate(to_date) : $("#to-date").val();
			data['from_date'] = from_date;
			data['to_date'] = to_date;
		}

		if(data['payment_type'] == 'non-cc') {
			data['deal_location'] = $("#deal-location").val();
			var non_cc_payment_type = [];
			$("#non-cc-payment-type div input").each(function() {
				if($(this)[0].checked) {
					non_cc_payment_type.push($(this)[0].id);
				}
			});
			data['non_cc_payment_type'] = JSON.stringify(non_cc_payment_type);
		}

		return data;
	}

	// 查看数据
	function getDisplayData(filter) {
		$("li.resultDetail").remove();
		var dlBox = $(".resultTab ul li.resultNav dl");

		$.ajax({
			url: location.protocol.concat("//").concat(location.host).concat('/database/Accounting/DataExport/indivTourDataExport.php'),
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			type: 'GET',
			data: filter,
			success: function(response) {
				response = JSON.parse(response);
				console.log(response);

				$(".resultTab").css("display", "block");
				var labelTxt;
				var choiceNum = $(".choiceItem .choiceInfo ul li.choiceContent .selected.current").length;
				var selectedItem = $(".choiceItem .choiceInfo ul li.choiceContent div.selected.current");
				dlBox.empty();

				for(var i = 0; i < choiceNum; i++) {
					labelTxt = $.trim($(selectedItem).eq(i).find("div.checkbox").find("label").text());
					var e = `<dd>` + labelTxt + `</dd>`;
					dlBox.append(e);
				}

				for (var i = 0; i < response.length; i++) {
					var resultDetail = `<li class="resultDetail"><dl>`;
					for (var j = 0; j < choiceNum; j++) {
						var selectedId = $(selectedItem).eq(j).find("input")[0].id;
						resultDetail += `<dd>` + response[i][selectedId] + `</dd>`;
					}
					resultDetail += `</dl></li>`;
					$("ul.result").append(resultDetail);
					autoWidth();
					if(autoWidth() > $(".resultTab").outerWidth()) {
						$(".resultTab").css({
							"overflow-x": "scroll",
						});
					} else {
						$(".resultTab").css({
							"overflow-x": "initial"
						});
					}
					heightRange();
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
	}
	$(".choiceItem ul.btnList li a.viewBtn").on("click", function() {
		var choiceNum = $(".choiceItem .choiceInfo ul li.choiceContent .selected.current").length;

		var data = getFilterData();
		if(choiceNum < 1) {
			alert("至少选择一项");
			dlBox.empty();
			dlDetail.empty();
			$(".resultTab").css("display", "none");
		} else {
			$.ajax({
				url: location.protocol.concat("//").concat(location.host).concat('/database/Accounting/DataExport/indivTourDataExportGetCount.php'),
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				type: 'GET',
				data: data,
				success: function(numOfTransactions) {
					console.log(numOfTransactions);
					// 拿到符合要求的订单的数量
					if (numOfTransactions == 0) {
						/***
						* 弹窗显示找不到结果
						***/
						alert("没有符合的结果");
					} else {
						$('#choicePagination').pagination({
							totalData: numOfTransactions,
							showData: 20,
							current: 0,
							coping: true,
							homePage: '首页',
							endPage: '末页',
							prevContent: '上页',
							nextContent: '下页',
							callback: function(api) {
								var i = api.getCurrent(); //获取当前页
								var inputData = data;
								inputData['offset'] = (i - 1) * 20;
								getDisplayData(inputData);
							}
						});
						$('ul.pagination').find('a').click();
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log(textStatus, errorThrown);
				}
			});
		}
	});


	function JSONToCSVConvertor(JSONData, ReportTitle) {
	    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

	    var CSV = '';

	    CSV += ReportTitle + '\r\n\n';

		var row = "";

		var choiceNum = $(".choiceItem .choiceInfo ul li.choiceContent .selected.current").length;
		var selectedItem = $(".choiceItem .choiceInfo ul li.choiceContent div.selected.current");
		for(var i = 0; i < choiceNum; i++) {
			row += $.trim($(selectedItem).eq(i).find("div.checkbox").find("label").text()) + ',';
		}
		row = row.slice(0, -1);

		CSV += row + '\r\n';

	    for (var i = 0; i < arrData.length; i++) {
	        var row = "";
			for(var j = 0; j < choiceNum; j++) {
				var label = $(selectedItem).eq(j).find("input")[0].id;
				var temp = arrData[i][label] == null ? '' : arrData[i][label];
				row += '"' + temp + '",';
			}
	        row.slice(0, row.length - 1);
	        CSV += row + '\r\n';
	    }

	    if (CSV == '') {
	        alert("Invalid data");
	        return;
	    }

	    //Generate a file name
	    var fileName = "旅游团数据导出";

	    var uri = 'data:text/xls;charset=utf-8,\uFEFF' + CSV;

	    var link = document.createElement("a");
	    link.href = uri;

	    link.style = "visibility:hidden";
	    link.download = fileName + ".xls";

	    document.body.appendChild(link);
	    link.click();
	    document.body.removeChild(link);
	}

	// 下载数据
	$(".choiceItem ul.btnList li a.downData").on("click", function() {
		var choiceNum = $(".choiceItem .choiceInfo ul li.choiceContent .selected.current").length;
		if(choiceNum < 1) {
			alert("至少选择一项");
		} else {
			var filter = getFilterData();
			$.ajax({
				url: location.protocol.concat("//").concat(location.host).concat('/database/Accounting/DataExport/indivTourDataExport.php'),
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				type: 'GET',
				data: filter,
				success: function(response) {
					response = JSON.parse(response);
					console.log(response);
					JSONToCSVConvertor(response, "旅游团数据导出");
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log(textStatus, errorThrown);
				}
			});
		}
	});
});
