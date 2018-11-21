$(document).ready(function() {
	//	addInforContentWidth();
	addNewGuide();
	addNewPrice();
	//	getPriceInfor();
	calculateCharge();
	addWholesalerInfo();
	addNewWholesaler();
	printReserve();
	getDays();
	toPrintPage();
	closeReseveBox();

	//
	flightInfor();
	paymentMethod();
	totalCostInfo();
	getPriceInfor();
	priceCalculate();
	ordersAssociated();
	radminidInfo();
	destinationInfo();
	//	var checkNum = /^\d+(\.\d+)?$/;
	//	$(document).find("input.numFormat").on("keyup", function() {
	//		if(!checkNum.test($(this).val())) {
	//			$(this).val("");
	//		}
	//	});

	$(document).on("mousedown", "ul.add-msg li.list_cost a", function() {
		$(this).addClass("selected");
	});
	$(document).on("mouseup", "ul.add-msg li.list_cost a", function() {
		$(this).removeClass("selected");
	});
	$(".toPrintPage ul.reserveTab li.createPrintPage").find("a").on("mousedown", function() {
		$(this).addClass("selected");
	});
	$(".toPrintPage ul.reserveTab li.createPrintPage").find("a").on("mouseup", function() {
		$(this).removeClass("selected");
	});
	$(".toPrintPage .reserveContent .reserveFundInfo ul.add-msg li.list_split a").on("mousedown", function() {
		$(this).addClass('selected');
	});
	$(".toPrintPage .reserveContent .reserveFundInfo ul.add-msg li.list_split a").on("mouseup", function() {
		$(this).removeClass('selected');
	});

	//折扣-折扣金额
	$("ul.add-msg li.discountCard dl.discountOption dd").unbind("click").on("click", function() {
		if($.trim($(this).text()) == "折扣码") {
			$(this).parent("dl").parent("li").find("dl.exchange").find("dd.discount-text").removeClass("list-currency");
			$("ul.add-msg li.discountCard dl.exchange dd.discount-text select").css("display", "none");
		}
		if($.trim($(this).text()) == "折扣金额") {
			$(this).parent("dl").parent("li").find("dl.exchange").find("dd.discount-text").addClass("list-currency");
			$("ul.add-msg li.discountCard dl.exchange dd.discount-text select").css("display", "inline-block");
		}
	});

	//取消表单提交
	$("#groupTourCancel").on("click", function() {
		$("#groupDiscountNotice").css("display", "none");
		$("li.reportTitle").siblings().remove();
		$(".guidesInforTab").hide();
		$("a#proTab").removeClass("tabhover");
		$('#createGroupTourForm').trigger("reset"); //重置表单
		$(".fundMsg").css("display", "none");
		$(".userTab").css("display", "none");
		$(".split").css("display", "none");
		$(".split2").css("display", "block");

		$(".guidesInforTab").css("display", "none");
		$(".wholesalerInfoTab").css("display", "none");
		$(".collectionInfoTab").css("display", "none");

		sum = 0;

		tourist_guide_name = [];
		tourist_guide_phone = [];
		tourist_guide_reserve = [];
		tourist_guide_write_off = [];
		tourist_guide_write_off_currency = [];

		group_tour_price = [];
		group_tour_price_currency = [];
		group_tour_payment_type = [];
		group_tour_transaction_fee = [];
		group_tour_actual_received = [];
		group_tour_price_note = [];

		wholesalerList = [];
		wholesalerNote = [];
		wholesalerPrice = [];
		wholesalerCurrency = [];

		//		$(".floor .addInfo .cardRight.info-price.collectionInfor").find("ul.add-msg").find("li:not([class='addCollection'])").remove();
		//		var html = `
		//		<li>
		//			<label class="nm-left">应收金额</label>
		//			<div class="amountReceivable">
		//				<select class="paymentType">
		//					<option value="creditcard">Credit Card</option>
		//					<option value="mco">MCO</option>
		//					<option value="alipay">Alipay</option>
		//					<option value="wechat">WeChat</option>
		//					<option value="cash">Cash</option>
		//					<option value="check">Check</option>
		//					<option value="other">Other</option>
		//					<option value="remit">REMIT</option>
		//				</select>
		//				<input type="text" class="price">
		//				<select class="price_currency">
		//					<option value="USD">$ 美元</option>
		//					<option value="RMB">￥ 人民币</option>
		//				</select>
		//			</div>
		//		</li>
		//		<li class="list_cost">
		//			<label class="nm-left">手续费</label>
		//			<input type="text" class="transaction-fee">
		//			<a href="javascript:void(0);" class="calculateCharge">以4%计算</a>
		//		</li>
		//		<li class="actualAmount list_cost">
		//			<label class="nm-left">净收款</label>
		//			<input type="text" class="actual-received">
		//			<span>(货币同应收金额)</span>
		//		</li>
		//		`;
		//		$(".floor .addInfo .cardRight.info-price.collectionInfor").find("ul.add-msg").find("li.addCollection").before(html);

		var leftHeight = $(".navInfo ul").height()
		var rightHeight = $(".theamInfo").height();
		if(rightHeight < leftHeight) {
			$(this).blur();
			$(".navInfo ul").css("height", rightHeight);
		}
	});

	// Check whether all required information is given
	/*function checkInput() {
		if($("#groupNum").val() == "" || $("#flightNum").val() == "" || $("#busCompany").val() == "" ||
			$("#salespersonInput").val() == "" || $("#tourGuide").val() == "" || $("#guideTel").val() == "" ||
			$("#agent").val() == "" || $("#leadNum").val() == "" || $("#visitorNum").val() == "" || $("#note").val() == "" ||
			$("#price").val() == "" || $("#write_off").val() == "" || $("#totalCost").val() == "") {
			//          alert("看看你是不是填完了");
			return false;
		}
		return true;
	}*/

	function getInputData() {
		var data = {
			groupNum: $("#groupNum").val(),
			invoice: $("#invoice").val(),
			flightNum: $("#flightNum").val(),
			busCompany: $("#busCompany").val(),
			salespersonInput: $("#salespersonInput").val(),
			groupTourSource: $('#groupTourSource').val(),
			leaderNumber: $("#leadNum").val(),
			visitorNumber: $("#visitorNum").val(),
			note: $("#note").val(),
			startTime: $("#startTime").val(),
			endTime: $("#endTime").val(),
			duration: $("#dateCount").val(),

			exchange_rate: $("#group_exchange_rate").val(),
			other_cost: $("#other-cost").val(),
			other_cost_currency: $("#other-cost-currency").val(),
			total_cost: $("#totalCost").val(),
			coupon: $("#groupDiscountText").val(),
			coupon_currency: $("#groupDiscountSelect").val()
		};

		Object.assign(data, {
			wholesaler: JSON.stringify(wholesalerList),
			wholesalerNote: JSON.stringify(wholesalerNote),
			wholesalerPrice: JSON.stringify(wholesalerPrice),
			wholesalerCurrency: JSON.stringify(wholesalerCurrency),

			tourGuide: JSON.stringify(tourist_guide_name),
			guideTel: JSON.stringify(tourist_guide_phone),
			guideReverse: JSON.stringify(tourist_guide_reserve),
			write_off: JSON.stringify(tourist_guide_write_off),
			write_off_currency: JSON.stringify(tourist_guide_write_off_currency),

			price: JSON.stringify(group_tour_price),
			price_currency: JSON.stringify(group_tour_price_currency),
			payment_type: JSON.stringify(group_tour_payment_type),
			transaction_fee: JSON.stringify(group_tour_transaction_fee),
			actual_received: JSON.stringify(group_tour_actual_received),
			priceNote: JSON.stringify(group_tour_price_note)
		});

		return data;
	}

	function resetInputForm() {
		$("#groupDiscountNotice").css("display", "none");
		$("li.reportTitle").siblings().remove();
		$(".guidesInforTab").hide();
		$('#createGroupTourForm').trigger("reset"); //重置表单
		$(".fundMsg").css("display", "none");
		$(".userTab").css("display", "none");
		$(".split").css("display", "none");
		$(".split2").css("display", "block");
		sum = 0;
		tourist_guide_name = [];
		tourist_guide_phone = [];
		tourist_guide_reserve = [];
		tourist_guide_write_off = [];
		tourist_guide_write_off_currency = [];

		group_tour_price = [];
		group_tour_price_currency = [];
		group_tour_payment_type = [];
		group_tour_transaction_fee = [];
		group_tour_actual_received = [];
		group_tour_price_note = [];

		wholesalerList = [];
		wholesalerNote = [];
		wholesalerPrice = [];
		wholesalerCurrency = [];

		$(".toPrintPage").css("display", "none");

		var leftHeight = $(".navInfo ul").height()
		var rightHeight = $(".theamInfo").height();
		if(rightHeight < leftHeight) {
			$(this).blur();
			$(".navInfo ul").css("height", rightHeight);
		}
	}

	//表单提交
	/*$("#groupTourSubmit").on('click', function() {
		if(!checkInput()) {
			return false;
		}
		// 弹出确认提示框
		$(".grouptourCreateConfirmBox").css("display", "block");
	});*/

	$("#groupTourSubmit").unbind("click").on("click", function() {
		if(!VerifyRequiredItems()) {
			return false;
		} else {
			$(".grouptourCreateConfirmBox").css("display", "block");
			$(".grouptourCreateConfirmBox").removeClass("nm-hide");
		}
	});

	// 点击确认
	$("#groupTourCreateActionConfirm").on('click', function() {
		var inputData = getInputData();
		console.log(inputData);
		var url = location.protocol.concat("//").concat(location.host).concat('/database/Business/GroupTour/GroupTourCreate.php');
		$.ajax({
			url: url,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			type: 'post',
			data: inputData,
			success: function(response) {
				// $(this).parent().siblings("p.confirmNotice").text("提交成功");
				// $(this).parent().siblings("p.confirmTitle").find("img").attr("src","../img/userConfirm.png");
				resetInputForm();
				$(".grouptourCreateConfirmBox").css("display", "none");
				$(".grouptourCreateSuccessBox").css("display", "block");
				$(".grouptourCreateSuccessBox p.confirmNotice").text("提交成功");
				$(".grouptourCreateSuccessBox p.confirmNotice").find("img").attr("src", "../img/userConfirm.png");
				$(".grouptourCreateSuccessBox p.actionBox").find(".actionConfirm").text("知道了");
				$(".grouptourCreateSuccessBox p.actionBox").find(".actionConfirm").css({
					"width": "100%",
					"border-bottom-right-radius": "7px",
					"border": "0px"
				});
				$(".grouptourCreateSuccessBox p.actionBox").find(".actionCancel").css("display", "none");
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log("提交失败");
				console.log(textStatus, errorThrown);
			}
		});
	});

	// 点击取消
	$("#groupTourCreateActionCancel").on('click', function() {
		$(".grouptourCreateConfirmBox").css("display", "none");
	});

	$("#grouptourCreateSuccessConfirm").on('click', function() {
		$(".grouptourCreateSuccessBox").css("display", "none");
	});

	//表单提交并下载
	/*$("#groupTourSubmitAndDownload").on('click', function() {
		if(!checkInput()) {
			return false;
		}
		// 弹出确认提示框
		$(".grouptourDownloadBox").css("display", "block");
	});*/
	//提交并下载
	//	$("#groupTourSubmitAndDownload").on("click", function() {
	//		if(!VerifyRequiredItems()) {
	//			return false;
	//		} else {
	//
	//			if($(".toPrintPage .reserveContent").find(".fundMsg").css("display") == "block") {
	//				$(".grouptourDownloadBox").css("display", "block");
	//			} else {
	//				layer.msg('请确认准备金报表已生成', {
	//					icon: 0,
	//					time: 1000
	//				});
	//			}
	//		}
	//	});
	// 点击确认
	/*$("#button#grouptourCreateSuccessConfirm").on('click', function() {
//		window.location.href="printPage.html";
		$(this).attr("href", "UsersManageToSales.php");
	});*/

	$(document).on('keyup', 'ul.userTab1 li.reserveListItem input.reserveInput.peopleNum', function() {
		$("ul.userTab1").find("input.reserveInput.peopleNum").val($(this).val());
	});

	// 根据结束日期生成天数
	$('#endTime').on('change', function() {
		var startTime = $('#startTime').val();
		var endTime = $('#endTime').val();
		var startNum = parseInt(startTime.replace(/-/g, ''), 10);
		var endNum = parseInt(endTime.replace(/-/g, ''), 10);
		if(startNum > endNum) {
			//$('#endTime').removeAttr('value');
			//('#dateCount').removeAttr('value');
			//alert("结束时间不能在开始时间之前！");
		} else {
			var days = generateDateCount(endTime, startTime);
			if(!isNaN(days)) {
				$('#dateCount').val(days);
			}
		}
	});

	// 根据天数计算结束日期
	$('#dateCount').on('keyup', function() {
		$('#endTime').val(addByTransDate($('#startTime').val(), parseInt($('#dateCount').val()) - 1));
	});

	// 根据出发日期计算天数或者结束日期
	$('#startTime').on('change', function() {
		var startTime = $('#startTime').val();
		var endTime = $('#endTime').val();
		var startNum = parseInt(startTime.replace(/-/g, ''), 10);
		var endNum = parseInt(endTime.replace(/-/g, ''), 10);
		var startDay = new Date(startTime);
		var endDay = new Date(endTime);
		if(endDay == 'Invalid Date') {
			var diff = $('#dateCount').val();
			if(diff != undefined) {
				$('#endTime').val(addByTransDate(startTime, parseInt(diff) - 1));
			}
		} else {
			if(startNum > endNum) {
				//				$('#endTime').removeAttr('value');
				//				$('#dateCount').removeAttr('value');
				//				alert("结束时间不能在开始时间之前");

			} else {
				$('#dateCount').val(generateDateCount(endDay, startDay));
			}
		}
	});

	// 点击准备金弹出准备金计算表
	var addListItem = function(html) {
		var $html = $(html);
		$('.userTab1').append($html);
		$html.addClass("reserveListItem");
	}

	$("a#proTab").on("mousedown", function() {
		$(this).addClass("tabhover");
	});
	$("a#proTab").on("mouseup", function() {
		$(this).removeClass("tabhover");
	});
	//调整餐标：
	$("a#proTab").on("click", function() {
		$(".userTab1").empty();
		$(".driverTipItem").empty();
		var lunch = $("#lunch").val();
		var dinner = $('#dinner').val();
		var count = $(".dayNum").val(); //天数
		var lhnum = $(".startDate").val(); //出发日期
		var numPeople = $("input#peopleCount").val();
		if(lunch == "" || dinner == "" || count == "" || lhnum == "" || numPeople == "") {
			alert("请确认信息已填写完整");
		} else {
			var date;
			for(var i = 0; i < count; i++) {
				date = addByTransDate(lhnum, i);
				addListItem("<li>" + "<label>" + date + "</label></li>");
			}
			$('.reserveListItem').each(function() {
				//人数
				var $peopleNumHtml = $("<input type='text' value='" + numPeople + "' class='peopleNum'/>");
				$(this).append($peopleNumHtml);
				$peopleNumHtml.addClass("reserveInput");
				var $lunchHtml = $("<input type='text' value='" + lunch + "'/>");
				$(this).append($lunchHtml);
				$lunchHtml.addClass("reserveInput");
				var $dinnerHtml = $("<input type='text' value='" + dinner + "'/>");
				$(this).append($dinnerHtml);
				$dinnerHtml.addClass("reserveInput");
			});
			$('.driverTipItem').append("<label>司机小费(人/天)</label>");
//			var $tipHtml = $("<input type='text' value='" + 5 * count * numPeople + "'/>");
			var $tipHtml = $("<input type='text' value='5'/>");
			$('.driverTipItem').append($tipHtml);
			$tipHtml.addClass("driverTipInput");

			$("#fundMsg").css("display", "block");
			$(".userTab").css("display", "block");

			// 准备金 = 司机小费 + （午餐 + 晚餐）* 天数 * 人数
			$('#reserve').val(Number($('.driverTipInput').val()) + (Number(lunch) + Number(dinner)) * count * numPeople);

			//左右两侧保持高度相等
			var leftHeight = $(".navInfo ul").height();
			var rightHeight = $(".theamInfo").height();
			if(rightHeight > leftHeight) {
				$(this).blur();
				$(".navInfo ul").css("height", rightHeight);
			}
			if(rightHeight < leftHeight) {
				$(this).blur();
				$(".theamInfo").css("height", leftHeight);
			}
			//司机小费文本框的宽度
			if($(".userTab").css("display") == "block") {
				var reserveInputWidth = $("input.reserveInput").outerWidth();
				var driverTipInputWidth = ((reserveInputWidth * 3) + 10) + "px";
				$("input.driverTipInput").css("cssText", "width:" + driverTipInputWidth + "!important");
			}
			$(window).resize(function() {
				var reserveInputWidth = $("input.reserveInput").outerWidth();
				var driverTipInputWidth = ((reserveInputWidth * 3) + 10) + "px";
				$("input.driverTipInput").css("cssText", "width:" + driverTipInputWidth + "!important");
			});
			var reserve = $("input#reserve").val();
			var exchangeRate = $("input#group_exchange_rate").val();
			//准备金
			$("select#reserve_currency").on("change", function() {
				var reserve = $("input#reserve").val();
				var exchangeRate = $("input#group_exchange_rate").val();
				if($(this).val() == "USD") {
					$("input#reserve").val(reserve);
				}
				if($(this).val() == "RMB") {
					$("input#reserve").val((Number(reserve) / exchangeRate).toFixed(2));
				}
			});
			autoCenter($(".toPrintPage"));
		}

	});

	// 修改午餐或晚餐和司机小费，自动更新准备金
	$(document).on('keyup', '.reserveInput, .driverTipInput', function() {
		var sum = 0;
		var numPeople = $("#peopleCount").val();
		$('.reserveInput').each(function() {
			sum += Number($(this).val());
		});
		$('#reserve').val(sum * numPeople + Number($('.driverTipInput').val()));
	});
	//总人数  s
	$("input#leadNum").on("keyup",function(){
		var leadNum;//领队人数
		var visitorNum;//游客人数
		visitorNum=$("input#visitorNum").val();
		leadNum=$(this).val();
		if(leadNum!==""&&visitorNum!==""){
			$("input#peopleCount").val(Number(visitorNum)+Number(leadNum));
		}
	});
	$("input#visitorNum").on("keyup",function(){
		var leadNum;//领队人数
		var visitorNum;//游客人数
		visitorNum=$(this).val();
		leadNum=$("input#leadNum").val();
		if(leadNum!==""&&visitorNum!==""){
			$("input#peopleCount").val(Number(visitorNum)+Number(leadNum));
		}
	});
	//总人数  e
	$("#salespersonInput, #groupTourSource, #tourGuide, #agent").on('focus', function() {
		var current_id = $(this).attr('id');
		var target = "";
		if(current_id == 'salespersonInput') {
			target = 'salesperson';
		} else if(current_id == 'groupTourSource') {
			target = 'source';
		} else if(current_id == 'tourGuide') {
			target = 'touristGuide';
		} else if(current_id == 'agent') {
			target = "wholesaler";
		}

		var url = location.protocol.concat("//").concat(location.host).concat('/database/autoComplete.php');
		$.ajax({
			url: url,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			type: 'post',
			data: {
				target: target
			},
			success: function(response) {
				autocomplete(document.getElementById(current_id), JSON.parse(response));
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
	});

	var getTouristGuide = function() {
		var tour_guide = $("#tourGuide").val();
		var fname = tour_guide.split(" ")[0];
		var lname = tour_guide.split(" ")[1];

		var url = location.protocol.concat("//").concat(location.host).concat('/database/autoComplete.php');
		$.ajax({
			url: url,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			type: 'POST',
			data: {
				target: 'tourGuidePhone',
				fname: fname,
				lname: lname
			},
			success: function(response) {
				$("#guideTel").val(response);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
	}

	$('#tourGuide').on('change', function() {
		setTimeout(getTouristGuide, 1000);
	});
});

function VerifyRequiredItems() {
	layui.use(['layer', 'jquery'], function() {
		var layer = layui.layer;
	});
	$("input#ticket-create-customer-phone").on("keypress", function() {
		var telMsg = $("#ticket-create-customer-phone").val();
		if(telMsg !== "") {
			$("select#ticket-create-customer-otherContact").parent("dd").removeClass("requiredItem");
			$("input#ticket-create-customer-otherContactNumber").parent("dd").removeClass("requiredItem");
			$("#ticket-create-customer-phone").parent("dd").addClass("requiredItem");
		}
	});
	if(checkNull() && checkNumber()) {
		return true;
	}
}

function checkNull() {
	var num = 0;
	$(".requiredItem").find("input").each(function() {
		if($(this).val() == "") {
			num++;
			$(this).addClass("error");

		} else {
			$(this).removeClass("error");
		}
	});
	if(num > 0) {
		alert("请确认必填信息已全部填写");
		return false;
	} else {
		return true;
	}
}

function checkNumber() {
	var m = 0;
	var checkNum = /^\d+(\.\d+)?$/;
	$("input.numFormat").each(function() {
		if($(this).val() !== "") {
			if(!checkNum.test($(this).val())) {
				m++;
				$(this).addClass("error");
			} else {
				$(this).removeClass("error");
			}
		}
	});
	if(m > 0) {
		alert("输入格式有误");
		return false;
	} else {
		return true;
	}
}

//添加导游
function addNewGuide() {
	$(".guidesInforContent ul li.addNewGuide a").on("click", function() {
		var guideName = $(".guidesInforContent ul li").find("input.guideName").val();
		var guideTel = $(".guidesInforContent ul li").find("input.guideTel").val();
		var accountingInfo = $(".guidesInforContent ul").find(".newGuide").last().find("input.accountingInfo").val();
		var exchangeRate = $("input#group_exchange_rate").val(); //汇率
		var write_off = $("#guideWriteOff").val();
		//		var write_off_currency = $("#guide_write_off_currency").val();
		var write_off_currency = $.trim($(".guidesInforContent ul li").find("div.currency_type").find("span.guideWriteOff_currency").text());
		// var guide_reverse = $("").val();
		if($.trim($(".guidesInforContent ul li").find("div.currency_type").find("span.guideWriteOff_currency").text()) == "美元") {
			if($(".guidesInforContent ul li").find("input.accountingInfo").val() == "") {
				accountingInfo = "USD" + " " + 0;
			} else {
				if($("input#reserve").val() == "") {
					accountingInfo = "USD" + " " + $(".guidesInforContent ul li").find("input.accountingInfo").val();
				} else {
					accountingInfo = "USD" + " " + Number(Number($("input#reserve").val()) + Number($(".guidesInforContent ul li").find("input.accountingInfo").val()));
				}
			}
		}
		if($.trim($(".guidesInforContent ul li").find("div.currency_type").find("span.guideWriteOff_currency").text()) == "货币") {
			if($(".guidesInforContent ul li").find("input.accountingInfo").val() == "") {
				accountingInfo = "USD" + " " + 0;
			} else {
				if($("input#reserve").val() == "") {
					accountingInfo = "USD" + " " + $(".guidesInforContent ul li").find("input.accountingInfo").val();
				} else {
					accountingInfo = "USD" + " " + Number(Number($("input#reserve").val()) + Number($(".guidesInforContent ul li").find("input.accountingInfo").val()));
				}
			}
		}
		if($.trim($(".guidesInforContent ul li").find("div.currency_type").find("span.guideWriteOff_currency").text()) == "人民币") {
			if($(".guidesInforContent ul li").find("input.accountingInfo").val() == "") {
				accountingInfo = "RMB" + " " + 0;
			} else {
				if($("input#reserve").val() == "") {
					accountingInfo = "RMB" + " " + $(".guidesInforContent ul li").find("input.accountingInfo").val();
				} else {
					accountingInfo = "RMB" + " " + Number(Number($("input#reserve").val()) + Number($(".guidesInforContent ul li").find("input.accountingInfo").val()));
				}
			}

		}
		if(guideName !== "" && guideTel !== "" && accountingInfo !== "") {
			tourist_guide_name.push(guideName);
			tourist_guide_phone.push(guideTel);
			// tourist_guide_reserve.push(guide_reverse);
			tourist_guide_write_off.push(write_off);
			tourist_guide_write_off_currency.push(write_off_currency);
			$(".guidesInforTab").css("visibility", "visible");
			$(".guidesInforTab").css("height", "auto");
			$(".guidesInforTab").css({
				"padding-top": "2%",
				"padding-bottom": "2%",
			});

			var item = '<li class="reportContent">' +
				'<dl>' +
				'<dd>' + guideName + '</dd>' +
				'<dd>' + guideTel + '</dd>' +
				'<dd class="accountingInfo">' + accountingInfo + '</dd>' +
				'<dd>' +
				'<a href="javascript:void(0);">' +
				'<img src="../img/removeIcon.png">' +
				'</a>' +
				'</dd>' +
				'</dl>' +
				'</li>';
			$(".guidesInforTab .tabContent ul.reportInfo").find("div.guides_info").append(item);
			//未填写   s
			//导游:
			if($(".guidesInforTab .tabContent ul.reportInfo").find("li.reportContent").length == 0) {
				$(".guidesInforTab").css("visibility", "visible");
				$(".guidesInforTab").css("height", "auto");
				$(".guidesInforTab").css({
					"padding-top": "2%",
					"padding-bottom": "2%",
				});
				$(".guidesInforTab div.notFilled").css("display", "block");
			} else {
				$(".guidesInforTab").css("visibility", "visible");
				$(".guidesInforTab").css("height", "auto");
				$(".guidesInforTab").css({
					"padding-top": "2%",
					"padding-bottom": "2%",
				});
				$(".guidesInforTab div.notFilled").css("display", "none");
			}
			//供应商:
			if($(".wholesalerInfoTab .tabContent ul.reportInfo").find("li.reportContent").length == 0) {
				$(".wholesalerInfoTab").css("visibility", "visible");
				$(".wholesalerInfoTab").css("height", "auto");
				$(".wholesalerInfoTab").css({
					"padding-top": "2%",
					"padding-bottom": "2%",
				});
				$(".wholesalerInfoTab div.notFilled").css("display", "block");
			} else {
				$(".wholesalerInfoTab").css("visibility", "visible");
				$(".wholesalerInfoTab").css("height", "auto");
				$(".wholesalerInfoTab").css({
					"padding-top": "2%",
					"padding-bottom": "2%",
				});
				$(".wholesalerInfoTab div.notFilled").css("display", "none");
			}
			//收款:
			if($(".collectionInfoTab  .tabContent ul.reportInfo").find("li.reportContent").length == 0) {
				$(".collectionInfoTab ").css("visibility", "visible");
				$(".collectionInfoTab").css("height", "auto");
				$(".collectionInfoTab ").css({
					"padding-top": "2%",
					"padding-bottom": "2%",
				});
				$(".collectionInfoTab  div.notFilled").css("display", "block");
			} else {
				$(".collectionInfoTab ").css("visibility", "visible");
				$(".collectionInfoTab ").css("height", "auto");
				$(".collectionInfoTab ").css({
					"padding-top": "2%",
					"padding-bottom": "2%",
				});
				$(".collectionInfoTab  div.notFilled").css("display", "none");
			}
			//未填写 e

			if($(".guidesInforTab .tabContent ul.reportInfo li.reportContent").length >= 4) {
				$(".guidesInforTab").find("div.guides_info").css("overflow-y", "scroll");
			} else {
				$(".guidesInforTab").find("div.guides_info").css("overflow-y", "initial");
			}

			$("#tourGuide").val("");
			$("#guideTel").val("");
			$("#guideWriteOff").val("");
			$(".guidesInforContent ul li").find("div.currency_type").find("span.guideWriteOff_currency").text("货币");
			$(".guidesInforContent ul li input.peopleNum").val(""); //人数
			$(".guidesInforContent ul li input.startDate").val(""); //起始日期
			$(".guidesInforContent ul li input.endDate").val(""); //结束日期
			$(".guidesInforContent ul li input.dayNum").val(""); //天数
			$(".guidesInforContent ul li label.switch input").attr("checked", false);
			$(".guidesInforContent input#reserve").val("");
			//已知花费	
			$("ul.add-msg li.list_account.knownCost").find("span").css("visibility", "visible");
			$("ul.add-msg li.list_account.knownCost").find("input").val(knownCostCalculate());
			$("input#group_exchange_rate").on("keyup", function() {
				$("ul.add-msg li.list_account.knownCost").find("span").css("visibility", "visible");
				$("ul.add-msg li.list_account.knownCost").find("input").val(knownCostCalculate());

				var knownCost = Number($("ul.add-msg li.list_account.knownCost").find("input").val());
				var otherCost = Number($("input#other-cost").val());
				var exchangeRate = $("input#group_exchange_rate").val();
				totalCostProfitType(); //总花费类型
				var totalCostType = $.trim($("li.list_currency.list_account.totalCost").find("span").text());
				totalCostCalculate(knownCost, otherCost, exchangeRate, totalCostType);

			});
			var knownCost = Number($("ul.add-msg li.list_account.knownCost").find("input").val());
			var otherCost = Number($("input#other-cost").val());
			var exchangeRate = $("input#group_exchange_rate").val();
			totalCostProfitType(); //总花费类型
			var totalCostType = $.trim($("li.list_currency.list_account.totalCost").find("span").text());
			totalCostCalculate(knownCost, otherCost, exchangeRate, totalCostType);

			//利润
			var totalCostType = $.trim($("li.list_currency.list_account.totalCost").find("span").text());
			var totalIncomeType = $.trim($("li.list_currency.list_account.totalIncome").find("span").text());
			var totalCost = Number($("input#totalCost").val());
			var totalIncome = Number($("li.list_currency.list_account.totalIncome").find("input").val());
			var profit = $("input#groupProfit");
			var exchangeRate = $("input#group_exchange_rate").val();
			profitCalculate(totalCostType, totalIncomeType, totalCost, totalIncome, profit, exchangeRate);

			heightRange();
			//移除
			$(".guidesInforTab .tabContent ul.reportInfo li dl dd a").unbind("click").on("click", function() {
				var i = $(this).parent("dd").parent("dl").parent("li").index();
				tourist_guide_write_off.splice(i - 1, 1);
				tourist_guide_write_off_currency.splice(i - 1, 1);
				// tourist_guide_reserve.splice(i - 1, 1);
				tourist_guide_name.splice(i - 1, 1);
				tourist_guide_phone.splice(i - 1, 1);
				$(this).parent("dd").parent("dl").parent("li").remove();
				if($(".guidesInforTab .tabContent ul.reportInfo li").length < 2) {
					//					$(".guidesInforTab").css("visibility", "hidden");
					//					$(".guidesInforTab").css("height", "0px");
					//					$(".guidesInforTab").css({
					//						"padding-top": "0px",
					//						"padding-bottom": "0px",
					//					});
					if(($(".wholesalerInfoTab .tabContent ul.reportInfo").find("li.reportContent").length > 0) || ($(".collectionInfoTab  .tabContent ul.reportInfo").find("li.reportContent").length > 0)) {
						$(".guidesInforTab").css("visibility", "visible");
						$(".guidesInforTab").css("height", "auto");
						$(".guidesInforTab").css({
							"padding-top": "2%",
							"padding-bottom": "2%",
						});
						$(".guidesInforTab div.notFilled").css("display", "block");
					} else {
						$(".guidesInforTab").css("visibility", "hidden");
						$(".guidesInforTab").css("height", "0px");
						$(".guidesInforTab").css({
							"padding-top": "0px",
							"padding-bottom": "0px",
						});
						$(".guidesInforTab div.notFilled").css("display", "none");

						$(".collectionInfoTab").css("visibility", "hidden");
						$(".collectionInfoTab").css("height", "0px");
						$(".collectionInfoTab").css({
							"padding-top": "0px",
							"padding-bottom": "0px",
						});
						$(".collectionInfoTab div.notFilled").css("display", "none");

						$(".wholesalerInfoTab").css("visibility", "hidden");
						$(".wholesalerInfoTab").css("height", "0px");
						$(".wholesalerInfoTab").css({
							"padding-top": "0px",
							"padding-bottom": "0px",
						});
						$(".wholesalerInfoTab div.notFilled").css("display", "none");
					}

				}
				if($(".wholesalerInfoTab .tabContent ul.reportInfo li").length < 2 && $(".guidesInforTab .tabContent ul.reportInfo li").length < 2) {
					$("ul.add-msg li.list_account.knownCost").find("span").css("visibility", "hidden");
				}

				if($(".guidesInforTab .tabContent ul.reportInfo li.reportContent").length >= 4) {
					$(".guidesInforTab").find("div.guides_info").css("overflow-y", "scroll");
				} else {
					$(".guidesInforTab").find("div.guides_info").css("overflow-y", "initial");
				}

				$("ul.add-msg li.list_account.knownCost").find("input").val(knownCostCalculate());
				var knownCost = Number($("ul.add-msg li.list_account.knownCost").find("input").val());

				var otherCost = Number($("input#other-cost").val());
				var exchangeRate = $("input#group_exchange_rate").val();
				totalCostProfitType(); //总花费类型
				var totalCostType = $.trim($("li.list_currency.list_account.totalCost").find("span").text());
				totalCostCalculate(knownCost, otherCost, exchangeRate, totalCostType);

				//利润
				var totalCostType = $.trim($("li.list_currency.list_account.totalCost").find("span").text());
				var totalIncomeType = $.trim($("li.list_currency.list_account.totalIncome").find("span").text());
				var totalCost = Number($("input#totalCost").val());
				var totalIncome = Number($("li.list_currency.list_account.totalIncome").find("input").val());
				var profit = $("input#groupProfit");
				var exchangeRate = $("input#group_exchange_rate").val();
				profitCalculate(totalCostType, totalIncomeType, totalCost, totalIncome, profit, exchangeRate);

				heightRange();
			});
		} else {
			alert("请确认要添加的导游信息已填写完整");
		}
	});
}

//添加供应商
function addNewWholesaler() {
	$(".wholesalerInfoContent ul li.addNewWholesaler a").on("click", function() {
		//批发商
		var wholesalerName = $(".wholesalerInfoContent ul").find("li").find("input.wholesaler").val();
		//金额
		var amount = $(".wholesalerInfoContent ul").find("li.list-currency").last().find("input.amountInfo").val();
		//		var currency = $("#wholesaler-currency").val();
		var currency = $.trim($(".wholesalerInfoContent ul li").find("div.payment").find("span.supplier_currency").text());
		//类型
		var notes = $(".wholesalerInfoContent ul").find("li.supplierType").find("select").val();
		var accountingInfo;
		if($.trim($(".wholesalerInfoContent ul li").find("div.payment").find("span.supplier_currency").text()) == "美元") {
			accountingInfo = "USD" + " " + amount;
		}
		if($.trim($(".wholesalerInfoContent ul li").find("div.payment").find("span.supplier_currency").text()) == "货币") {
			accountingInfo = "USD" + " " + amount;
		}
		if($.trim($(".wholesalerInfoContent ul li").find("div.payment").find("span.supplier_currency").text()) == "人民币") {
			accountingInfo = "RMB" + " " + amount;
		}
		if(wholesalerName !== "" && amount !== "") {
			wholesalerList.push(wholesalerName);
			wholesalerNote.push(notes);
			wholesalerPrice.push(amount);
			wholesalerCurrency.push(currency);
			$(".wholesalerInfoTab").css("visibility", "visible");
			$(".wholesalerInfoTab").css("height", "auto");
			$(".wholesalerInfoTab").css({
				"padding-top": "2%",
				"padding-bottom": "2%",
			});
			var item = '<li class="reportContent">' +
				'<dl>' +
				'<dd>' + wholesalerName + '</dd>' +
				'<dd>' + notes + '</dd>' +
				'<dd class="accountingInfo">' + accountingInfo + '</dd>' +
				'<dd>' +
				'<a href="javascript:void(0);">' +
				'<img src="../img/removeIcon.png">' +
				'</a>' +
				'</dd>' +
				'</dl>' +
				'</li>';
			$(".wholesalerInfoTab .tabContent ul.reportInfo").find("div.wholesaler_info").append(item);
			//未填写   s
			//导游:
			if($(".guidesInforTab .tabContent ul.reportInfo").find("li.reportContent").length == 0) {
				$(".guidesInforTab").css("visibility", "visible");
				$(".guidesInforTab").css("height", "auto");
				$(".guidesInforTab").css({
					"padding-top": "2%",
					"padding-bottom": "2%",
				});
				$(".guidesInforTab div.notFilled").css("display", "block");
			} else {
				$(".guidesInforTab").css("visibility", "visible");
				$(".guidesInforTab").css("height", "auto");
				$(".guidesInforTab").css({
					"padding-top": "2%",
					"padding-bottom": "2%",
				});
				$(".guidesInforTab div.notFilled").css("display", "none");
			}
			//供应商:
			if($(".wholesalerInfoTab .tabContent ul.reportInfo").find("li.reportContent").length == 0) {
				$(".wholesalerInfoTab").css("visibility", "visible");
				$(".wholesalerInfoTab").css("height", "auto");
				$(".wholesalerInfoTab").css({
					"padding-top": "2%",
					"padding-bottom": "2%",
				});
				$(".wholesalerInfoTab div.notFilled").css("display", "block");
			} else {
				$(".wholesalerInfoTab").css("visibility", "visible");
				$(".wholesalerInfoTab").css("height", "auto");
				$(".wholesalerInfoTab").css({
					"padding-top": "2%",
					"padding-bottom": "2%",
				});
				$(".wholesalerInfoTab div.notFilled").css("display", "none");
			}
			//收款:
			if($(".collectionInfoTab  .tabContent ul.reportInfo").find("li.reportContent").length == 0) {
				$(".collectionInfoTab ").css("visibility", "visible");
				$(".collectionInfoTab").css("height", "auto");
				$(".collectionInfoTab ").css({
					"padding-top": "2%",
					"padding-bottom": "2%",
				});
				$(".collectionInfoTab  div.notFilled").css("display", "block");
			} else {
				$(".collectionInfoTab ").css("visibility", "visible");
				$(".collectionInfoTab ").css("height", "auto");
				$(".collectionInfoTab ").css({
					"padding-top": "2%",
					"padding-bottom": "2%",
				});
				$(".collectionInfoTab  div.notFilled").css("display", "none");
			}
			//未填写 e

			if($(".wholesalerInfoTab .tabContent ul.reportInfo li.reportContent").length >= 4) {
				$(".wholesalerInfoTab").find("div.wholesaler_info").css("overflow-y", "scroll");
			} else {
				$(".wholesalerInfoTab").find("div.wholesaler_info").css("overflow-y", "initial");
			}
			$(".wholesalerInfoContent ul").find("li").find("input.wholesaler").val("");
			$(".wholesalerInfoContent ul").find("li.list-currency").last().find("input.amountInfo").val("");
			$(".wholesalerInfoContent ul").find("li").find("input.wholesalerNotes").val("");
			$(".wholesalerInfoContent ul").find("li").find("input.wholesalerInvoice").val("");
			$(".wholesalerInfoContent ul li").find("div.payment").find("span.supplier_currency").text("货币");
			//已知花费	
			$("ul.add-msg li.list_account.knownCost").find("span").css("visibility", "visible");
			$("ul.add-msg li.list_account.knownCost").find("input").val(knownCostCalculate());
			$("input#group_exchange_rate").on("keyup", function() {
				$("ul.add-msg li.list_account.knownCost").find("span").css("visibility", "visible");
				$("ul.add-msg li.list_account.knownCost").find("input").val(knownCostCalculate());
				var knownCost = Number($("ul.add-msg li.list_account.knownCost").find("input").val());
				var otherCost = Number($("input#other-cost").val());
				var exchangeRate = $("input#group_exchange_rate").val();
				totalCostProfitType(); //总花费类型
				var totalCostType = $.trim($("li.list_currency.list_account.totalCost").find("span").text());
				totalCostCalculate(knownCost, otherCost, exchangeRate, totalCostType);

			});
			//			totalCostCalculate();
			//			var knownCost = Number(knownCostCalculate());
			var knownCost = Number($("ul.add-msg li.list_account.knownCost").find("input").val());
			var otherCost = Number($("input#other-cost").val());
			var exchangeRate = $("input#group_exchange_rate").val();
			totalCostProfitType(); //总花费类型
			var totalCostType = $.trim($("li.list_currency.list_account.totalCost").find("span").text());
			totalCostCalculate(knownCost, otherCost, exchangeRate, totalCostType);

			//利润
			var totalCostType = $.trim($("li.list_currency.list_account.totalCost").find("span").text());
			var totalIncomeType = $.trim($("li.list_currency.list_account.totalIncome").find("span").text());
			var totalCost = Number($("input#totalCost").val());
			var totalIncome = Number($("li.list_currency.list_account.totalIncome").find("input").val());
			var profit = $("input#groupProfit");
			var exchangeRate = $("input#group_exchange_rate").val();
			profitCalculate(totalCostType, totalIncomeType, totalCost, totalIncome, profit, exchangeRate);

			heightRange();
			//移除
			$(".wholesalerInfoTab .tabContent ul.reportInfo li dl dd a").unbind("click").on("click", function() {
				var i = $(this).parent("dd").parent("dl").parent("li").index();
				wholesalerList.splice(i - 1, 1);
				wholesalerNote.splice(i - 1, 1);
				wholesalerPrice.splice(i - 1, 1);
				wholesalerCurrency.splice(i - 1, 1);
				$(this).parent("dd").parent("dl").parent("li").remove();

				if($(".wholesalerInfoTab .tabContent ul.reportInfo li").length < 2) {
					//					$(".wholesalerInfoTab").css("visibility", "hidden");
					//					$(".wholesalerInfoTab").css("height", "0px");
					//					$(".wholesalerInfoTab").css({
					//						"padding-top": "0px",
					//						"padding-bottom": "0px",
					//					});
					if(($(".guidesInforTab .tabContent ul.reportInfo").find("li.reportContent").length > 0) || ($(".collectionInfoTab  .tabContent ul.reportInfo").find("li.reportContent").length > 0)) {
						$(".wholesalerInfoTab").css("visibility", "visible");
						$(".wholesalerInfoTab").css("height", "auto");
						$(".wholesalerInfoTab").css({
							"padding-top": "2%",
							"padding-bottom": "2%",
						});
						$(".wholesalerInfoTab div.notFilled").css("display", "block");
					} else {
						$(".wholesalerInfoTab").css("visibility", "hidden");
						$(".wholesalerInfoTab").css("height", "0px");
						$(".wholesalerInfoTab").css({
							"padding-top": "0px",
							"padding-bottom": "0px",
						});
						$(".wholesalerInfoTab div.notFilled").css("display", "none");

						$(".collectionInfoTab").css("visibility", "hidden");
						$(".collectionInfoTab").css("height", "0px");
						$(".collectionInfoTab").css({
							"padding-top": "0px",
							"padding-bottom": "0px",
						});
						$(".collectionInfoTab div.notFilled").css("display", "none");

						$(".guidesInforTab").css("visibility", "hidden");
						$(".guidesInforTab").css("height", "0px");
						$(".guidesInforTab").css({
							"padding-top": "0px",
							"padding-bottom": "0px",
						});
						$(".guidesInforTab div.notFilled").css("display", "none");
					}

				}
				if($(".wholesalerInfoTab .tabContent ul.reportInfo li").length < 2 && $(".guidesInforTab .tabContent ul.reportInfo li").length < 2) {
					$("ul.add-msg li.list_account.knownCost").find("span").css("visibility", "hidden");
				}

				if($(".wholesalerInfoTab .tabContent ul.reportInfo li.reportContent").length >= 4) {
					$(".wholesalerInfoTab").find("div.wholesaler_info").css("overflow-y", "scroll");
				} else {
					$(".wholesalerInfoTab").find("div.wholesaler_info").css("overflow-y", "initial");
				}
				$("ul.add-msg li.list_account.knownCost").find("input").val(knownCostCalculate());
				var knownCost = Number($("ul.add-msg li.list_account.knownCost").find("input").val());
				var otherCost = Number($("input#other-cost").val());
				var exchangeRate = $("input#group_exchange_rate").val();
				totalCostProfitType(); //总花费类型
				var totalCostType = $.trim($("li.list_currency.list_account.totalCost").find("span").text());
				totalCostCalculate(knownCost, otherCost, exchangeRate, totalCostType);

				//利润
				var totalCostType = $.trim($("li.list_currency.list_account.totalCost").find("span").text());
				var totalIncomeType = $.trim($("li.list_currency.list_account.totalIncome").find("span").text());
				var totalCost = Number($("input#totalCost").val());
				var totalIncome = Number($("li.list_currency.list_account.totalIncome").find("input").val());
				var profit = $("input#groupProfit");
				var exchangeRate = $("input#group_exchange_rate").val();
				profitCalculate(totalCostType, totalIncomeType, totalCost, totalIncome, profit, exchangeRate);

				heightRange();
			});
		} else {
			alert("请确认要添加的供应商信息已填写完整");
		}
	})
}

//添加收款
function addNewPrice() {
	$(".collectionContent ul li.addCollection a").on("click", function() {
		//支付方式
		//		var paymentType = $(".collectionContent ul li").find("select.paymentType").val();
		var paymentType = $.trim($(".payService ul li .payment").find(".paymentMethod").find("button.btn").find("span.txt").text());

		//金额
		var amount = $(".collectionContent ul li").find("input.paymentAmount").val();
		//		var currency = $(".collectionContent ul").find("li").find("select.price_currency").val();
		var currency = $.trim($(".collectionContent ul").find("li").find("div.currency_type").find("span.paymentAmount_currency").text());

		var accountingInfo;
		//	accountingInfo = "USD" + " " + amount;
		//标题
		var title = $(".collectionContent ul li").find("input.title").val();
		var mcoInfo;
		if($("ul.add-msg .mcoList").css("display") == "block") {
			mcoInfo = "已存储";
		} else {
			mcoInfo = "无";
		}
		if($.trim($(".collectionContent ul").find("li").find("div.currency_type").find("span.paymentAmount_currency").text()) == "美元") {
			accountingInfo = "USD" + " " + amount;
		}
		if($.trim($(".collectionContent ul").find("li").find("div.currency_type").find("span.paymentAmount_currency").text()) == "人民币") {
			accountingInfo = "RMB" + " " + amount;
		}
		if($.trim($(".collectionContent ul").find("li").find("div.currency_type").find("span.paymentAmount_currency").text()) == "货币") {
			accountingInfo = "USD" + " " + amount;
		}
		if(amount !== "") {
			group_tour_price.push(amount);
			group_tour_price_currency.push(currency);
			group_tour_payment_type.push(paymentType);
			//			group_tour_transaction_fee.push(transaction_fee);
			//			group_tour_actual_received.push(actual_received);
			//			group_tour_price_note.push(notes);
			$(".collectionInfoTab").css("visibility", "visible");
			$(".collectionInfoTab").css("height", "auto");
			$(".collectionInfoTab").css({
				"padding-top": "2%",
				"padding-bottom": "2%",
			});
			var item = '<li class="reportContent">' +
				'<dl>' +
				'<dd>' + title + '</dd>' +
				'<dd>' + paymentType + '</dd>' +
				'<dd class="accountingInfo">' + accountingInfo + '</dd>' +
				'<dd>' + mcoInfo + '</dd>' +
				'<dd>' +
				'<a href="javascript:void(0);">' +
				'<img src="../img/removeIcon.png">' +
				'</a>' +
				'</dd>' +
				'</dl>' +
				'</li>';

			$(".collectionInfoTab .tabContent ul.reportInfo").find("div.collection_info").append(item);
			//未填写   s
			//导游:
			if($(".guidesInforTab .tabContent ul.reportInfo").find("li.reportContent").length == 0) {
				$(".guidesInforTab").css("visibility", "visible");
				$(".guidesInforTab").css("height", "auto");
				$(".guidesInforTab").css({
					"padding-top": "2%",
					"padding-bottom": "2%",
				});
				$(".guidesInforTab div.notFilled").css("display", "block");
			} else {
				$(".guidesInforTab").css("visibility", "visible");
				$(".guidesInforTab").css("height", "auto");
				$(".guidesInforTab").css({
					"padding-top": "2%",
					"padding-bottom": "2%",
				});
				$(".guidesInforTab div.notFilled").css("display", "none");
			}
			//供应商:
			if($(".wholesalerInfoTab .tabContent ul.reportInfo").find("li.reportContent").length == 0) {
				$(".wholesalerInfoTab").css("visibility", "visible");
				$(".wholesalerInfoTab").css("height", "auto");
				$(".wholesalerInfoTab").css({
					"padding-top": "2%",
					"padding-bottom": "2%",
				});
				$(".wholesalerInfoTab div.notFilled").css("display", "block");
			} else {
				$(".wholesalerInfoTab").css("visibility", "visible");
				$(".wholesalerInfoTab").css("height", "auto");
				$(".wholesalerInfoTab").css({
					"padding-top": "2%",
					"padding-bottom": "2%",
				});
				$(".wholesalerInfoTab div.notFilled").css("display", "none");
			}
			//收款:
			if($(".collectionInfoTab  .tabContent ul.reportInfo").find("li.reportContent").length == 0) {
				$(".collectionInfoTab ").css("visibility", "visible");
				$(".collectionInfoTab").css("height", "auto");
				$(".collectionInfoTab ").css({
					"padding-top": "2%",
					"padding-bottom": "2%",
				});
				$(".collectionInfoTab  div.notFilled").css("display", "block");
			} else {
				$(".collectionInfoTab ").css("visibility", "visible");
				$(".collectionInfoTab ").css("height", "auto");
				$(".collectionInfoTab ").css({
					"padding-top": "2%",
					"padding-bottom": "2%",
				});
				$(".collectionInfoTab  div.notFilled").css("display", "none");
			}
			//未填写 e

			if($(".collectionInfoTab .tabContent ul.reportInfo li.reportContent").length >= 4) {
				$(".collectionInfoTab").find("div.collection_info").css("overflow-y", "scroll");
			} else {
				$(".collectionInfoTab").find("div.collection_info").css("overflow-y", "initial");
			}
			//			$(".collectionContent ul li").find("input.price").val("");
			//			$(".collectionContent ul").find("li.list-currency").last().find("input.amountInfo").val("");
			//			$(".collectionContent ul li").find("input.transaction-fee").val("");
			//			$(".collectionContent ul li").find("input.actual-received").val("");
			//			$(".collectionContent ul li").find("input.collectionNotes").val("");
			$(".collectionContent ul li").find("select.price_currency").val("USD");
			$(".payService ul li .payment").find(".paymentMethod").find("button.btn").find("span.txt").text("支付方式");
			$(".collectionContent ul li").find("input.paymentAmount").val("");
			$(".collectionContent ul li").find("input.title").val("");
			$(".collectionContent ul").find(".mcoList").css("display", "none");
			$(".collectionContent ul").find("li").find("div.currency_type").find("span.paymentAmount_currency").text("货币");

			//总收入：
			$("ul.add-msg li.list_account.totalIncome").find("span").css("visibility", "visible");
			$("ul.add-msg li.list_account.totalIncome").find("input").val(getTotalCollectionInfor());
			$("input#group_exchange_rate").on("keyup", function() {
				$("ul.add-msg li.list_account.totalIncome").find("span").css("visibility", "visible");
				$("ul.add-msg li.list_account.totalIncome").find("input").val(getTotalCollectionInfor());
			});

			//利润
			var totalCostType = $.trim($("li.list_currency.list_account.totalCost").find("span").text());
			var totalIncomeType = $.trim($("li.list_currency.list_account.totalIncome").find("span").text());
			var totalCost = Number($("input#totalCost").val());
			var totalIncome = Number($("li.list_currency.list_account.totalIncome").find("input").val());
			var profit = $("input#groupProfit");
			var exchangeRate = $("input#group_exchange_rate").val();
			profitCalculate(totalCostType, totalIncomeType, totalCost, totalIncome, profit, exchangeRate);

			heightRange();
			//移除
			$(".collectionInfoTab .tabContent ul.reportInfo li dl dd a").unbind("click").on("click", function() {
				var i = $(this).parent("dd").parent("dl").parent("li").index();
				group_tour_price.splice(i - 1, 1);
				group_tour_price_currency.splice(i - 1, 1);
				group_tour_payment_type.splice(i - 1, 1);
				group_tour_transaction_fee.splice(i - 1, 1);
				group_tour_actual_received.splice(i - 1, 1);
				group_tour_price_note.splice(i - 1, 1);

				$(this).parent("dd").parent("dl").parent("li").remove();
				$("ul.add-msg li.list_account.totalIncome").find("input").val(getTotalCollectionInfor());

				if($(".collectionInfoTab .tabContent ul.reportInfo li").length < 2) {
					//					$(".collectionInfoTab").css("visibility", "hidden");
					//					$(".collectionInfoTab").css("height", "0px");
					//					$(".collectionInfoTab").css({
					//						"padding-top": "0px",
					//						"padding-bottom": "0px",
					//					});
					//					$("ul.add-msg li.list_account.totalIncome").find("span").css("visibility", "hidden");

					if(($(".guidesInforTab .tabContent ul.reportInfo").find("li.reportContent").length > 0) || ($(".wholesalerInfoTab .tabContent ul.reportInfo").find("li.reportContent").length > 0)) {
						$(".collectionInfoTab ").css("visibility", "visible");
						$(".collectionInfoTab").css("height", "auto");
						$(".collectionInfoTab ").css({
							"padding-top": "2%",
							"padding-bottom": "2%",
						});
						$(".collectionInfoTab  div.notFilled").css("display", "block");
					} else {
						$(".collectionInfoTab").css("visibility", "hidden");
						$(".collectionInfoTab").css("height", "0px");
						$(".collectionInfoTab").css({
							"padding-top": "0px",
							"padding-bottom": "0px",
						});
						$(".collectionInfoTab  div.notFilled").css("display", "none");

						$(".wholesalerInfoTab").css("visibility", "hidden");
						$(".wholesalerInfoTab").css("height", "0px");
						$(".wholesalerInfoTab").css({
							"padding-top": "0px",
							"padding-bottom": "0px",
						});
						$(".wholesalerInfoTab  div.notFilled").css("display", "none");

						$(".guidesInforTab").css("visibility", "hidden");
						$(".guidesInforTab").css("height", "0px");
						$(".guidesInforTab").css({
							"padding-top": "0px",
							"padding-bottom": "0px",
						});
						$(".guidesInforTab  div.notFilled").css("display", "none");

						$("ul.add-msg li.list_account.totalIncome").find("span").css("visibility", "hidden");
					}

				}
				//利润
				var totalCostType = $.trim($("li.list_currency.list_account.totalCost").find("span").text());
				var totalIncomeType = $.trim($("li.list_currency.list_account.totalIncome").find("span").text());
				var totalCost = Number($("input#totalCost").val());
				var totalIncome = Number($("li.list_currency.list_account.totalIncome").find("input").val());
				var profit = $("input#groupProfit");
				var exchangeRate = $("input#group_exchange_rate").val();
				profitCalculate(totalCostType, totalIncomeType, totalCost, totalIncome, profit, exchangeRate);

				if($(".collectionInfoTab .tabContent ul.reportInfo li.reportContent").length >= 4) {
					$(".collectionInfoTab").find("div.collection_info").css("overflow-y", "scroll");
				} else {
					$(".collectionInfoTab").find("div.collection_info").css("overflow-y", "initial");
				}
				heightRange();
			});
		} else {
			alert("请确认要添加的应收金额信息已填写完整");
		}
		//		}
	})
}

//总收入   s
function getTotalCollectionInfor() {
	var sumAmount = 0; //总收款
	var currentAmount = 0; //当前收款
	var exchangeRate = $("input#group_exchange_rate").val();
	var linshi = [];
	$(".collectionInfoTab .tabContent ul.reportInfo li:not([class='reportTitle'])").each(function(i, item) {
		$(".collectionInfoTab .tabContent ul.reportInfo li dl dd.accountingInfo").text().split("");
		linshi.push($(item).find("dl dd.accountingInfo").text().split(" ")[0]);
	});
	if($.inArray("USD", linshi) !== -1) {
		//按美元:
		$(".collectionInfoTab .tabContent ul.reportInfo li:not([class='reportTitle'])").each(function(i, item) {
			if($(item).find("dl dd.accountingInfo").text().split(" ")[0] == "USD") {
				currentAmount = Number($(item).find("dl").find("dd.accountingInfo").text().split(" ")[1]);
				$("ul.add-msg li.exchangeRate").removeClass("requiredItem");
			}
			if($(item).find("dl dd.accountingInfo").text().split(" ")[0] == "RMB") {
				if(exchangeRate == "") {
					alert("请填写汇率信息");
					$("ul.add-msg li.exchangeRate").addClass("requiredItem");
					currentAmount = 0;
				} else {
					currentAmount = (Number($(item).find("dl").find("dd.accountingInfo").text().split(" ")[1]) / exchangeRate).toFixed(2);
				}
			}
			$("ul.add-msg li.list_account.totalIncome").find("span").text("美元");
			sumAmount = sumAmount - (-currentAmount);
		});

	} else {
		$(".collectionInfoTab .tabContent ul.reportInfo li:not([class='reportTitle'])").each(function(i, item) {
			currentAmount = Number($(item).find("dl").find("dd.accountingInfo").text().split(" ")[1]);
			$("ul.add-msg li.list_account.totalIncome").find("span").text("人民币");
			sumAmount = sumAmount - (-currentAmount);
			$("ul.add-msg li.exchangeRate").removeClass("requiredItem");
		});
	}
	return sumAmount;
}

//总收入   e

//总报账    s
function getTotalAccountInfor() {
	var sumAmount = 0; //总报账
	var currentAmount = 0; //当前报账
	var exchangeRate = $("input#group_exchange_rate").val();
	var linshi = [];
	var accountType = "";
	$(".guidesInforTab .tabContent ul.reportInfo li:not([class='reportTitle'])").each(function(i, item) {
		$(".guidesInforTab .tabContent ul.reportInfo li dl dd.accountingInfo").text().split("");
		linshi.push($(item).find("dl dd.accountingInfo").text().split(" ")[0]);
	});

	if($.inArray("USD", linshi) !== -1) {
		//按美元:
		$(".guidesInforTab .tabContent ul.reportInfo li:not([class='reportTitle'])").each(function(i, item) {
			if($(item).find("dl dd.accountingInfo").text().split(" ")[0] == "USD") {
				currentAmount = Number($(item).find("dl").find("dd.accountingInfo").text().split(" ")[1]);
				$("ul.add-msg li.exchangeRate").removeClass("requiredItem");
			}
			if($(item).find("dl dd.accountingInfo").text().split(" ")[0] == "RMB") {
				if(exchangeRate == "") {
					alert("请填写汇率信息");
					$("ul.add-msg li.exchangeRate").addClass("requiredItem");
					currentAmount = 0;

				} else {

					currentAmount = (Number($(item).find("dl").find("dd.accountingInfo").text().split(" ")[1]) / exchangeRate).toFixed(2);
				}
			}
			$("ul.add-msg li.list_account.knownCost").find("span").text("美元");
			accountType = "美元";
			sumAmount = sumAmount - (-currentAmount);
		});

	} else {
		$(".guidesInforTab .tabContent ul.reportInfo li:not([class='reportTitle'])").each(function(i, item) {
			currentAmount = Number($(item).find("dl").find("dd.accountingInfo").text().split(" ")[1]);

			accountType = "人民币";
			sumAmount = sumAmount - (-currentAmount);
			$("ul.add-msg li.exchangeRate").removeClass("requiredItem");
			if((localStorage.getItem("accountType") !== localStorage.getItem("supplierType")) && localStorage.getItem("accountType") !== "" && localStorage.getItem("supplierType") !== "") {
				$("ul.add-msg li.list_account.knownCost").find("span").text("美元");
			} else {
				$("ul.add-msg li.list_account.knownCost").find("span").text("人民币");
			}
		});

	}
	var totalAccount = {
		sum: sumAmount,
		type: accountType
	}
	localStorage.setItem("accountType", accountType);
	console.log(totalAccount.sum);
	return totalAccount;
}
//总供应商金额 s
function getTotalSupplierAmountInfor() {
	var sumAmount = 0; //总供应商金额
	var currentAmount = 0; //当前供应商金额
	var exchangeRate = $("input#group_exchange_rate").val();
	var linshi = [];
	var supplierType = "";
	$(".wholesalerInfoTab .tabContent ul.reportInfo li:not([class='reportTitle'])").each(function(i, item) {
		$(".wholesalerInfoTab .tabContent ul.reportInfo li dl dd.accountingInfo").text().split("");
		linshi.push($(item).find("dl dd.accountingInfo").text().split(" ")[0]);
	});
	if($.inArray("USD", linshi) !== -1) {
		//按美元:
		$(".wholesalerInfoTab .tabContent ul.reportInfo li:not([class='reportTitle'])").each(function(i, item) {
			if($(item).find("dl dd.accountingInfo").text().split(" ")[0] == "USD") {
				currentAmount = Number($(item).find("dl").find("dd.accountingInfo").text().split(" ")[1]);
				$("ul.add-msg li.exchangeRate").removeClass("requiredItem");
			}
			if($(item).find("dl dd.accountingInfo").text().split(" ")[0] == "RMB") {
				if(exchangeRate == "") {
					alert("请填写汇率信息");
					$("ul.add-msg li.exchangeRate").addClass("requiredItem");
					currentAmount = 0;
				} else {

					currentAmount = (Number($(item).find("dl").find("dd.accountingInfo").text().split(" ")[1]) / exchangeRate).toFixed(2);
				}
			}
			$("ul.add-msg li.list_account.knownCost").find("span").text("美元");
			supplierType = "美元";
			sumAmount = sumAmount - (-currentAmount);
		});

	} else {
		$(".wholesalerInfoTab .tabContent ul.reportInfo li:not([class='reportTitle'])").each(function(i, item) {
			currentAmount = Number($(item).find("dl").find("dd.accountingInfo").text().split(" ")[1]);
			//			$("ul.add-msg li.list_account.knownCost").find("span").text("人民币");
			supplierType = "人民币";
			sumAmount = sumAmount - (-currentAmount);
			$("ul.add-msg li.exchangeRate").removeClass("requiredItem");
			if((localStorage.getItem("accountType") !== localStorage.getItem("supplierType")) && localStorage.getItem("accountType") !== "" && localStorage.getItem("supplierType") !== "") {
				$("ul.add-msg li.list_account.knownCost").find("span").text("美元");
			} else {
				$("ul.add-msg li.list_account.knownCost").find("span").text("人民币");
			}
		});

	}
	var totalSupplier = {
		sum: sumAmount,
		type: supplierType
	}
	localStorage.setItem("supplierType", supplierType);
	return totalSupplier;

}
//总供应商金额 e
//已知花费      s
function knownCostCalculate() {
	//已知花费=所有报账的和+所有供应商金额的和
	var exchangeRate = $("input#group_exchange_rate").val();
	var knownCost = 0;
	var totalSupplierInfo = getTotalSupplierAmountInfor();
	var totalAccountInfor = getTotalAccountInfor();
	var totalSupplierAmountType = totalSupplierInfo.type;
	var totalAccountInforType = totalAccountInfor.type;
	var totalSupplierAmount = totalSupplierInfo.sum;
	var totalAccount = totalAccountInfor.sum;
	if((totalSupplierAmountType !== totalAccountInforType) && ($(".guidesInforTab .tabContent ul.reportInfo").find("li.reportContent").length > 0) && ($(".wholesalerInfoTab .tabContent ul.reportInfo").find("li.reportContent").length > 0)) {
		//	if((totalSupplierAmountType !== totalAccountInforType) && ($(".guidesInforTab ").css("visibility") == "visible") && ($(".wholesalerInfoTab").css("visibility") == "visible")) {
		$("ul.add-msg li.exchangeRate").addClass("requiredItem");
		localStorage.setItem("required", "true");
		//		$("ul.add-msg li.list_account.knownCost").find("span").css("visibility","hidden");
		$("ul.add-msg li.list_account.knownCost").find("span").text("美元");
		if(exchangeRate == "") {
			alert("请填写汇率信息");

		} else {
			if(getTotalAccountInfor().type == "人民币") {
				knownCost = Number(totalAccount / exchangeRate).toFixed(2) - (-Number(totalSupplierAmount));
			}
			if(getTotalSupplierAmountInfor().type == "人民币") {
				knownCost = Number(totalAccount) - (-Number(totalSupplierAmount / exchangeRate).toFixed(2));
			}
			$("input#group_exchange_rate").on("keyup", function() {
				if(getTotalAccountInfor().type == "人民币") {
					knownCost = Number(totalAccount / exchangeRate).toFixed(2) - (-Number(totalSupplierAmount));
				}
				if(getTotalSupplierAmountInfor().type == "人民币") {
					knownCost = Number(totalAccount) - (-Number(totalSupplierAmount / exchangeRate).toFixed(2));
				}
			});

		}
	} else {
		$("ul.add-msg li.exchangeRate").removeClass("requiredItem");
		localStorage.setItem("required", "false");
		knownCost = Number(totalAccount) + Number(totalSupplierAmount);
	}
	return knownCost;

}

//已知花费      e
function totalCostCalculate(knownCost, otherCost, exchangeRate, totalCostType) {
	//总花费=已知花费+其他花费
	if(otherCost == "") {
		$("input#other-cost").val("");
		otherCost = 0;
	} else {
		otherCost = Number($("input#other-cost").val());
	}
	if(totalCostType == "美元") {
		//其他花费：
		if($.trim($("span.otherCost_currency").text()) == "人民币") {
			if(exchangeRate == "") {
				alert("请确认汇率信息");
				$("input#groupProfit").val(" ");

			} else {
				otherCost = (otherCost / exchangeRate).toFixed(2);
			}
			$("input#totalCost").val(knownCost - (-Number(otherCost)));
			$("ul.add-msg li.exchangeRate").addClass("requiredItem");
		}
		//已知花费：
		if($.trim($("li.list_currency.list_account.knownCost").find("span").text()) == "人民币") {
			if(exchangeRate == "") {
				alert("请确认汇率信息");
				$("input#groupProfit").val(" ");

			} else {
				knownCost = (knownCost / exchangeRate).toFixed(2);
			}
			$("input#totalCost").val(knownCost - (-Number(otherCost)));
			$("ul.add-msg li.exchangeRate").addClass("requiredItem");
		} else {
			$("input#totalCost").val(knownCost - (-Number(otherCost)));
			$("ul.add-msg li.exchangeRate").removeClass("requiredItem");
		}
	}
	if(totalCostType == "人民币") {
		$("input#totalCost").val(knownCost - (-Number(otherCost)));
		$("ul.add-msg li.exchangeRate").removeClass("requiredItem");
	}
}
//总花费     s
function totalCostInfo() {
	$("input#other-cost").on("keyup", function() {
		var knownCost = Number($("li.list_currency.list_account.knownCost").find("input").val());
		var otherCost = Number($("input#other-cost").val());
		var exchangeRate = $("input#group_exchange_rate").val();
		totalCostProfitType(); //总花费类型
		var totalCostType = $.trim($("li.list_currency.list_account.totalCost").find("span").text());
		if($("ul.add-msg li.list_account.knownCost span").css("visibility") == "hidden") {
			alert("请确认已知花费");
		} else {
			totalCostCalculate(knownCost, otherCost, exchangeRate, totalCostType);
		}
	});

	$("ul.dropdown-menu.otherCost_currencyBox").find("li").find("a").on("click", function() {
		var knownCost = Number(knownCostCalculate());
		var otherCost = Number($("input#other-cost").val());
		var exchangeRate = $("input#group_exchange_rate").val();
		totalCostProfitType(); //总花费类型
		var totalCostType = $.trim($("li.list_currency.list_account.totalCost").find("span").text());
		if($("ul.add-msg li.list_account.knownCost span").css("visibility") == "hidden") {
			alert("请确认已知花费");
		} else {
			totalCostCalculate(knownCost, otherCost, exchangeRate, totalCostType);
		}
	});
}

function totalCostProfitType() {
	var currencyArr = [];
	currencyArr.push($.trim($("span.otherCost_currency").text()));
	currencyArr.push($.trim($("li.list_currency.list_account.knownCost").find("span").text()));
	if($.inArray("美元", currencyArr) !== -1) {
		//按美元:
		$("li.list_currency.list_account.totalCost").find("span").css("visibility", "visible");
		$("li.list_currency.list_account.totalCost").find("span").text("美元");

	}
	if($.inArray("美元", currencyArr) == -1 && $.inArray("货币", currencyArr) == -1 && $.inArray("人民币", currencyArr) !== -1) {
		//按人民币:
		$("li.list_currency.list_account.totalCost").find("span").css("visibility", "visible");
		$("li.list_currency.list_account.totalCost").find("span").text("人民币");
	} else {
		//按美元:
		$("li.list_currency.list_account.totalCost").find("span").css("visibility", "visible");
		$("li.list_currency.list_account.totalCost").find("span").text("美元");
	}
}

//总花费     e
//利润
function getPriceInfor() {
	$("input#other-cost").on("keyup", function() {
		var totalCostType = $.trim($("li.list_currency.list_account.totalCost").find("span").text());
		var totalIncomeType = $.trim($("li.list_currency.list_account.totalIncome").find("span").text());
		var totalCost = Number($("input#totalCost").val());
		var totalIncome = Number($("li.list_currency.list_account.totalIncome").find("input").val());
		var profit = $("input#groupProfit");
		var exchangeRate = $("input#group_exchange_rate").val();
		profitCalculate(totalCostType, totalIncomeType, totalCost, totalIncome, profit, exchangeRate);
	});
	$("input#totalCost").on("keyup", function() {
		var totalCostType = $.trim($("li.list_currency.list_account.totalCost").find("span").text());
		var totalIncomeType = $.trim($("li.list_currency.list_account.totalIncome").find("span").text());
		var totalCost = Number($("input#totalCost").val());
		var totalIncome = Number($("li.list_currency.list_account.totalIncome").find("input").val());
		var profit = $("input#groupProfit");
		var exchangeRate = $("input#group_exchange_rate").val();
		profitCalculate(totalCostType, totalIncomeType, totalCost, totalIncome, profit, exchangeRate);
	});
	$("input#group_exchange_rate").on("keyup", function() {
		var totalCostType = $.trim($("li.list_currency.list_account.totalCost").find("span").text());
		var totalIncomeType = $.trim($("li.list_currency.list_account.totalIncome").find("span").text());
		var totalCost = Number($("input#totalCost").val());
		var totalIncome = Number($("li.list_currency.list_account.totalIncome").find("input").val());
		var profit = $("input#groupProfit");
		var exchangeRate = $("input#group_exchange_rate").val();
		profitCalculate(totalCostType, totalIncomeType, totalCost, totalIncome, profit, exchangeRate);
	});
	$("ul.dropdown-menu.currency_box.otherCost_currencyBox").find("li").find("a").on("click", function() {
		var totalCostType = $.trim($("li.list_currency.list_account.totalCost").find("span").text());
		var totalIncomeType = $.trim($("li.list_currency.list_account.totalIncome").find("span").text());
		var totalCost = Number($("input#totalCost").val());
		var totalIncome = Number($("li.list_currency.list_account.totalIncome").find("input").val());
		var profit = $("input#groupProfit");
		var exchangeRate = $("input#group_exchange_rate").val();
		profitCalculate(totalCostType, totalIncomeType, totalCost, totalIncome, profit, exchangeRate);
	});
	$(".guidesInforContent ul li.addNewGuide a").on("click", function() {
		var totalCostType = $.trim($("li.list_currency.list_account.totalCost").find("span").text());
		var totalIncomeType = $.trim($("li.list_currency.list_account.totalIncome").find("span").text());
		var totalCost = Number($("input#totalCost").val());
		var totalIncome = Number($("li.list_currency.list_account.totalIncome").find("input").val());
		var profit = $("input#groupProfit");
		var exchangeRate = $("input#group_exchange_rate").val();
		profitCalculate(totalCostType, totalIncomeType, totalCost, totalIncome, profit, exchangeRate);
	});
	$(".wholesalerInfoContent ul li.addNewWholesaler a").on("click", function() {
		var totalCostType = $.trim($("li.list_currency.list_account.totalCost").find("span").text());
		var totalIncomeType = $.trim($("li.list_currency.list_account.totalIncome").find("span").text());
		var totalCost = Number($("input#totalCost").val());
		var totalIncome = Number($("li.list_currency.list_account.totalIncome").find("input").val());
		var profit = $("input#groupProfit");
		var exchangeRate = $("input#group_exchange_rate").val();
		profitCalculate(totalCostType, totalIncomeType, totalCost, totalIncome, profit, exchangeRate);
	});
	$(".collectionContent ul.add-msg li.addCollection a").on("click", function() {
		var totalCostType = $.trim($("li.list_currency.list_account.totalCost").find("span").text());
		var totalIncomeType = $.trim($("li.list_currency.list_account.totalIncome").find("span").text());
		var totalCost = Number($("input#totalCost").val());
		var totalIncome = Number($("li.list_currency.list_account.totalIncome").find("input").val());
		var profit = $("input#groupProfit");
		var exchangeRate = $("input#group_exchange_rate").val();
		profitCalculate(totalCostType, totalIncomeType, totalCost, totalIncome, profit, exchangeRate);
	});

}
//利润计算
function profitCalculate(totalCostType, totalIncomeType, totalCost, totalIncome, profit, exchangeRate) {
	//利润=总收入-总花费
	//总花费
	if(totalCost == "") {
		totalCost = 0;
		$("input#totalCost").val("");
		profit.val(" ");
	} else {
		totalCost = Number($("input#totalCost").val());
	}
	//总收入
	if(totalIncome == "") {
		totalIncome = 0;
		$("li.list_currency.list_account.totalIncome").find("input").val("");
	} else {
		totalIncome = Number($("li.list_currency.list_account.totalIncome").find("input").val());
	}
	if($("li.list_currency.list_account.totalCost").find("span").css("visibility") == "visible") {
		if((totalCostType !== totalIncomeType)) {
			$("li.list_account.calculateProfit").find("span").text("美元");
			$("li.list_account.calculateProfit").find("span").css("visibility", "visible");
			if(totalCostType == "人民币") {
				profit.val((totalIncome - (totalCost / exchangeRate)).toFixed(2));
			}
			if(totalIncomeType == "人民币") {
				profit.val(((totalIncome / exchangeRate) - totalCost).toFixed(2));
			}
		}
		if(totalCostType == "人民币" && totalIncomeType == "人民币") {
			$("li.list_account.calculateProfit").find("span").text("人民币");
			$("li.list_account.calculateProfit").find("span").css("visibility", "visible");
			profit.val((totalIncome - totalCost).toFixed(2));
		}
		if(totalCostType == "美元" && totalIncomeType == "美元") {
			$("li.list_account.calculateProfit").find("span").text("美元");
			$("li.list_account.calculateProfit").find("span").css("visibility", "visible");
			profit.val((totalIncome - totalCost).toFixed(2));
		}
		if($("li.list_currency.list_account.totalIncome").find("span").css("visibility") == "hidden") {
			$("li.list_account.calculateProfit").find("span").css("visibility", "hidden");
			$("li.list_account.calculateProfit").find("span").text("");
			profit.val("");
			$("li.list_currency.list_account.totalIncome").find("input").val("");
		}
	}

}

//手续费,实际金额
function calculateCharge() {
	$(document).on('keyup', 'ul.add-msg li div.amountReceivable input', function() {
		var amountCollected = $(this).val();
		$(this).parent('div').parent("li").next("li.list_cost").find("input#transaction-fee").val(0);
		$(this).parent('div').parent("li").next("li.list_cost").next("li.actualAmount").find("input").val(amountCollected);
	});
	$(document).on("click", "ul.add-msg li.list_cost a", function() {
		var amountInfo = $(this).parent("li.list_cost").prev().find('div.amountReceivable').find("input.price").val();
		if(amountInfo == "") {
			alert("请确认应收金额已经填写");
		} else {
			var amountCollected = $(this).parent("li.list_cost").prev().find('div.amountReceivable').find("input.price").val();
			//手续费 = 应收金额*0.04
			$(this).parent("li.list_cost").find("input").val(Number(amountCollected * 0.04).toFixed(2));
			var charge = $(this).parent("li").find("input").val();
			//实际金额 =应收金额-手续费
			$(this).parent("li.list_cost").next("li.list_cost").find("input").val(Number(amountCollected - charge).toFixed(2));
		}
	});
}

function groupTourDiscount(discountText, discountNotice, discountApply, subtractNum, discountOption, coupon_currency) {
	heightRange();
	discountOption.find("dd").on("click", function() {
		$(this).addClass("option-active").siblings().removeClass("option-active");
	});
	discountApply.on("click", function() {
		//选中折扣金额
		if(discountOption.find("dd.coupon").hasClass("option-active")) {
			var reg = /^\d+(\.\d{1,2})?$/;
			if(discountText.val() == "" || !reg.test(discountText.val())) {
				discountNotice.css("display", "none");
				alert('请输入正确的折扣金额');
			} else {
				discountNotice.css("display", "block");
				subtractNum.text('优惠金额: ' + discountText.val() + ' ' + coupon_currency.val());
				heightRange();
			}
			$("input#groupDiscountText").addClass("numFormat");
		}
		//选中折扣码
		else {
			$("input#groupDiscountText").removeClass("numFormat");
			var url = location.protocol.concat("//").concat(location.host).concat('/database/couponSearch.php');
			$.ajax({
				url: url,
				type: 'post',
				data: {
					couponCode: discountText.val()
				},
				success: function(response) {
					console.log(response);
					if(response == "") {
						alert('折扣码不存在, 请重新输入正确的折扣码');
						discountNotice.css("display", "none")
					} else if(response == 'Expired') {
						discountNotice.css("display", "block");
						subtractNum.text('该折扣码已过期');
					} else {
						discountNotice.css("display", "block");
						subtractNum.text('优惠金额: ' + response);
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log(textStatus, errorThrown);
				}
			});
		}

	});
}

//批发商
function addWholesalerInfo() {
	$("ul.add-msg li.wholesalerInfo img").unbind("click").on("click", function() {
		if($(this).hasClass("addInfo")) {
			$(this).attr("src", "../img/removeIcon.png");

			wholesalerIndex += 1;

			var e =
				'<li class="requiredItem wholesalerInfo addwholesalerInfo">' +
				'<label class="nm-left">批发商</label>' +
				'<input type="text" class="wholesaler" id="agent-' + wholesalerIndex + '" type="text" placeholder="Search...">' +
				'<img src="../img/addIcon.png" class="addInfo"/>' +
				'</li>';
			$("ul.add-msg li.wholesalerInfo").last().after(e);

			$(this).removeClass("addInfo");
			$(this).addClass("removeInfo");

			addWholesalerInfo();
			getWholeSaler();
			heightRange();
		} else if($(this).hasClass("removeInfo")) {
			$(this).parent("li.wholesalerInfo").remove();
			heightRange();
		}
	});
}

//打印准备金
function printReserve() {
	
	$(".guidesInforContent ul li").find("input.btn-switch.large").on("click", function() {
		if($(".guidesInforContent input#reserve").val() == "") {
			$(this).attr("checked", true);
			//显示：
			autoCenter($(".toPrintPage"));
			$(".toPrintPage").css("display", "block");
			autoCenter($(".toPrintPage"));
			$("#fundMsg").css("display", "block");
			$(".showMsg .teamIndie .groupMsg").css("height", "auto");
			//总天数:
			var dayNum = $(".guidesInforContent ul li input.dayNum").val();
			$(".daynum").val(dayNum);
			$(".startime").val($('.guidesInforContent ul li input.startDate').val());
			$("#peopleCount").val($(".guidesInforContent ul li input.peopleNum").val());
			heightRange();
		} else {
			$(".guidesInforContent input#reserve").val("");
		}

	});

}

//生成打印页
function toPrintPage() {
	$(".toPrintPage .reserveContent .reserveFundInfo ul.add-msg li.list_split a.createPrintPage").on("click", function() {
		//人数
		var peopleNum =$("input#peopleCount").val();
		//起始日期
		var startDate = $(".toPrintPage .reserveContent .reserveFundInfo ul.add-msg li input.startDate").val();
		//结束日期
		var endDate = $(".toPrintPage .reserveContent .reserveFundInfo ul.add-msg li input.endDate").val();
		
		var lunch = $("#lunch").val();
		var dinner = $('#dinner').val();
		var count = $(".dayNum").val(); //天数
		if(lunch == "" || dinner == "" || count == "" || startDate == "" || peopleNum == ""||endDate=="") {
			alert("请确认信息已填写完整");
		} else {
			var numOfDay = $(".toPrintPage .reserveContent .reserveFundInfo ul.add-msg li").find("input.dayNum").val();
			var startTime = $(".toPrintPage .reserveContent .reserveFundInfo ul.add-msg li").find("input.startDate").val();
			var dateList = [];
			var reserveInput = [];
			$('.reserveInput').each(function() {
				reserveInput.push($(this).val());
			});
			var reserveInfo = [];
			for(var offset = 0; offset < numOfDay; offset++) {
				var row = new Array(addByTransDate(startTime, offset))
				dateList.push(row);
			}
			localStorage.setItem("tourPeopleNum", $("input#peopleCount").val());
			localStorage.setItem("tourDayNum", numOfDay);
			//天数
			localStorage.setItem("tourPeopleNum", $("ul.userTab1").find("input.reserveInput.peopleNum").val());
			//午餐价格
			localStorage.setItem("tourLunchPrice", $("input#lunch").val());
			//晚餐价格
			localStorage.setItem("tourDinnerPrice", $("input#dinner").val());
			//日期
			localStorage.setItem("tourDate", dateList);
			//司机小费:
			localStorage.setItem("tourDriverTip", $(".driverTipInput").val());
			//货币
			//			localStorage.setItem("tourCurrency", $("select#guide_write_off_currency").val());
			var guide_write_off_currency = $.trim($(".guidesInforContent ul li").find("div.currency_type").find("span.guideWriteOff_currency").text());
			if(guide_write_off_currency == "货币") {
				guide_write_off_currency = "USD";
			}
			if(guide_write_off_currency == "人民币") {
				guide_write_off_currency = "RMB";
			}
			if(guide_write_off_currency == "美元") {
				guide_write_off_currency = "USD";
			}

			localStorage.setItem("tourCurrency", guide_write_off_currency);
			window.open('../printPage.html');
//			setTimeout(function() {
//				$(".guidesInforContent input#reserve").attr("disabled", true);
//				$(".toPrintPage").css("display", "none");
//				$("#fundMsg").css("display", "none");
//				$(".toPrintPage .reserveContent").find(".userTab").css("display", "none");
//				$(".toPrintPage .reserveContent .reserveFundInfo ul.add-msg li").find("input").val("");
//				$(".userTab").css("display","none");
//				
//			}, 500);
		}
	});
}

function closeReseveBox() {
	$(".toPrintPage ul.reserveTab").find("li.close").on("click", function() {
		$(".guidesInforContent input#reserve").attr("disabled", true);
		$(".toPrintPage").css("display", "none");
		$("#fundMsg").css("display", "none");
		$(".toPrintPage .reserveContent").find(".userTab").css("display", "none");
		$(".toPrintPage .reserveContent .reserveFundInfo ul.add-msg li").find("input").val("");
		$(".userTab").css("display","none");
		
		if($("input#reserve").val()==""){
			$("input.btn-switch.large").attr("checked",false);
		}
		else{
			$("input.btn-switch.large").attr("checked",true);
		}
		
	});
}

function autoCenter(el) {
	var bodyW = $(window).width();
	var bodyH = $(window).height();
	var elW = el.width();
	var elH = el.height();
	el.css({
		"left": (bodyW - elW) / 2 + 'px',
		"top": (bodyH - elH) / 2 + 'px'
	});
};

function getDays() {
	// 根据结束日期生成天数
	$(".toPrintPage .reserveContent .reserveFundInfo ul.add-msg li input.endDate").on('change', function() {
		var startTime = $('.toPrintPage .reserveContent .reserveFundInfo ul.add-msg li input.startDate').val();
		var endTime = $(this).val();
		var startNum = parseInt(startTime.replace(/-/g, ''), 10);
		var endNum = parseInt(endTime.replace(/-/g, ''), 10);
		if(startNum > endNum) {} else {
			var days = generateDateCount(endTime, startTime);
			if(!isNaN(days)) {
				$(".toPrintPage .reserveContent .reserveFundInfo ul.add-msg li input.dayNum").val(days);
			}
		}
	});
	// 根据天数计算结束日期
	$(".toPrintPage .reserveContent .reserveFundInfo ul.add-msg li input.dayNum").on('keyup', function() {
		$(".toPrintPage .reserveContent .reserveFundInfo ul.add-msg li input.endDate").val(addByTransDate($('.toPrintPage .reserveContent .reserveFundInfo ul.add-msg li input.startDate').val(), parseInt($(this).val()) - 1));
	});
	// 根据出发日期计算天数或者结束日期
	$('.toPrintPage .reserveContent .reserveFundInfo ul.add-msg li input.startDate').on('change', function() {
		var startTime = $(this).val();
		var endTime = $(".toPrintPage .reserveContent .reserveFundInfo ul.add-msg li input.endDate").val();
		var startNum = parseInt(startTime.replace(/-/g, ''), 10);
		var endNum = parseInt(endTime.replace(/-/g, ''), 10);
		var startDay = new Date(startTime);
		var endDay = new Date(endTime);
		if(endDay == 'Invalid Date') {
			var diff = $(".toPrintPage .reserveContent .reserveFundInfo ul.add-msg li input.dayNum").val();
			if(diff != undefined) {
				$(".toPrintPage .reserveContent .reserveFundInfo ul.add-msg li input.endDate").val(addByTransDate(startTime, parseInt(diff) - 1));
			}
		} else {
			$(".toPrintPage .reserveContent .reserveFundInfo ul.add-msg li input.dayNum").val(generateDateCount(endDay, startDay));
		}
	});

}

//旅客航班信息：
function flightInfor() {
	$("div.flightInfor,div.notesInfor").on("keyup", function() {
		heightRange();
	});
	$("div.notesInfor").on("keyup", function() {
		heightRange();
	});
}

function paymentMethod() {
	$('.dropdown-submenu > a').submenupicker();
	//地区
	$(".payService ul li .payment").find(".areaFloor").find("ul.dropdown-menu").find("li").find("a").on("click", function() {
		//当前地区
		var currentArea = $(".payService ul li .payment").find(".areaFloor").find("button.btn").find("span.txt");
		currentArea.text($(this).text());
		//当前货币
		var currentCurrency = $(".payService").find("span.currency_txt");
		if($.trim(currentArea.text()) == "美国") {
			currentCurrency.text("美元");
			$(".addInfo").find("select").val("USD");
		}
		if($.trim(currentArea.text()) == "中国") {
			currentCurrency.text("人民币");
			$(".addInfo").find("select").val("RMB");
		}
	});
	//刷卡支付
	$(".payService ul li .payment").find(".paymentMethod").find("ul.dropdown-menu.creditCardPayment").find("li").find("a").on("click", function() {
		var payment_type = $(".payService ul li .payment").find(".paymentMethod").find("button.btn").find("span.txt");
		payment_type.text($(this).text());
		//信用卡和MCO支付
		if(($.trim(payment_type.text()) == "供应商部分刷卡+额外MCO") || ($.trim(payment_type.text()) == "全额MCO")) {
			$(".mcoList").css("display", "block");
		} else {
			$(".mcoList").css("display", "none");
		}
	});
	//非刷卡支付
	$(".payService ul li .payment").find(".paymentMethod").find("ul.dropdown-menu.no-creditCardPayment").find("li").find("a").on("click", function() {
		var payment_type = $(".payService ul li .payment").find(".paymentMethod").find("button.btn").find("span.txt");
		payment_type.text($(this).text());
		$(".mcoList").css("display", "none");
	});
	//供应商部分刷卡+非刷卡支付
	$(".payService ul li .payment").find(".paymentMethod").find("ul.dropdown-menu.drop3Menu").find("li").find("a").on("click", function() {
		var payment_type = $(".payService ul li .payment").find(".paymentMethod").find("button.btn").find("span.txt");
		payment_type.text("供应商部分刷卡+" + $(this).text());
		$(".mcoList").css("display", "none");
	});
	//刷卡公司
	$(".payService ul li .payment").find("ul.companyMenu").find("li").find("a").on("click", function() {
		var companyInfo = $(".payService ul li .payment").find(".creditCardCompanies").find("button.btn").find("span.txt");
		companyInfo.text($(this).text());
	});
	$(".payService").find("ul.currency_box li").find("a").on("click", function() {
		var currency_type = $(this).parent("li").parent("ul").parent("div.dropdown").find("span.currency_txt");
		currency_type.text($(this).text());
		//汇率必填验证：
		var currencyArr = [];
		var num = 0;
		var len = $("span.currency_txt").length;
		$("span.currency_txt").each(function(i, item) {
			if($(item).text() == "人民币") {
				num++;
			}
			currencyArr.push($(item).text());
		});
		if(($.inArray("人民币", currencyArr) !== -1) && num < len) {
			$("ul.add-msg li.exchangeRate").addClass("requiredItem");
		} else {
			$("ul.add-msg li.exchangeRate").removeClass("requiredItem");
		}
	});

}

function priceCalculate() {
	//票面-MCO金额-卖价
	//MCO金额=卖价-票面
	//卖价
	var salePrice;
	//票面
	var faceValue;
	//MCO金额
	var mcoAmount;
	salePrice = $("input.paymentAmount").val();
	faceValue = $("input.groupTour_faceValue").val();
	mcoAmount = $("input.groupTour_mcoAmount").val();
	//票面
	$("input.groupTour_faceValue").on("keyup", function() {
		salePrice = $("input.paymentAmount").val();
		faceValue = $(this).val();
		mcoAmount = $("input.groupTour_mcoAmount").val();
		if(salePrice !== "") {
			mcoAmountCalculate($("input.groupTour_mcoAmount"), salePrice, faceValue);
		}
	});
	//mco金额
	$("input.groupTour_mcoAmount").on("keyup", function() {
		salePrice = $("input.paymentAmount").val();
		faceValue = $("input.groupTour_faceValue").val();
		mcoAmount = $(this).val();
		if(salePrice !== "") {
			faceValueCalculate($("input.groupTour_faceValue"), mcoAmount, salePrice);
		}
	});
	//卖价
	$("input.paymentAmount").on("keyup", function() {
		salePrice = $(this).val();
		faceValue = $("input.groupTour_faceValue").val();
		mcoAmount = $("input.groupTour_mcoAmount").val();
		if(faceValue !== "") {
			mcoAmountCalculate($("input.groupTour_mcoAmount"), salePrice, faceValue);
		}
	});
	//MCO Credit MCO金额  费率

	//费率=(MCO金额-MCO Credit)/MCO金额
	var rateInfo;
	rateInfo = $("input.rateInfo").val();
	//mco credit
	var mcoCreditInfo;
	mcoCreditInfo = $("input.mcoCreditInfo").val();
	//Mco 金额变动
	$("input.groupTour_mcoAmount").on("keyup", function() {
		rateInfo = $("input.rateInfo").val();
		mcoCreditInfo = $("input.mcoCreditInfo").val();
		mcoAmount = $(this).val();
		if(mcoCreditInfo !== "") {
			rateInfoCalculate($("input.rateInfo"), mcoAmount, mcoCreditInfo);
		}
	});
	//费率
	$("input.rateInfo").on("keyup", function() {
		rateInfo = $(this).val();
		mcoCreditInfo = $("input.mcoCreditInfo").val();
		mcoAmount = $("input.groupTour_mcoAmount").val();
		if(mcoAmount !== "") {
			mcoCreditCalculate($("input.mcoCreditInfo"), mcoAmount, rateInfo);
		}
	});
	//Mco Credit:
	$("input.mcoCreditInfo").on("keyup", function() {
		rateInfo = $("input.rateInfo").val();
		mcoCreditInfo = $(this).val();
		mcoAmount = $("input.groupTour_mcoAmount").val();
		if(mcoAmount !== "") {
			rateInfoCalculate($("input.rateInfo"), mcoAmount, mcoCreditInfo);
		}
	});
}
//mco金额:
function mcoAmountCalculate(mcoAmountBox, salePrice, faceValue) {
	var exchangeRate = $("input#group_exchange_rate").val();
	var mcoAmountInfo = Number(salePrice - faceValue).toFixed(2);
	mcoAmountBox.val(mcoAmountInfo);
	var salePriceType = $.trim($("span.txt.currency_txt.salePrice_currency").text());
	var faceValueType = $.trim($("span.txt.currency_txt.faceValue_currency").text());

	if(salePriceType == "美元" && faceValueType == "美元") {
		$("span.txt.currency_txt.mcoAmount_currency").text("美元");
	}
	if(salePriceType == "人民币" && faceValueType == "人民币") {
		$("span.txt.currency_txt.mcoAmount_currency").text("人民币");
	}
	if(salePriceType == "人民币" && faceValueType == "美元") {
		$("span.txt.currency_txt.mcoAmount_currency").text("美元");
		salePrice = (salePrice / exchangeRate).toFixed(2);
		mcoAmountInfo = Number(salePrice - faceValue).toFixed(2);
		mcoAmountBox.val(mcoAmountInfo);
	}
	if(salePriceType == "美元" && faceValueType == "人民币") {
		$("span.txt.currency_txt.mcoAmount_currency").text("美元");
		faceValue = (faceValue / exchangeRate).toFixed(2);
		mcoAmountInfo = Number(salePrice - faceValue / exchangeRate).toFixed(2);
		mcoAmountBox.val(mcoAmountInfo);
	}
}
//票面
function faceValueCalculate(faceValueBox, mcoAmount, salePrice) {
	var faceValueInfo = Number(salePrice - mcoAmount).toFixed(2);
	faceValueBox.val(faceValueInfo);
	var exchangeRate = $("input#indiv_exchange_rate").val();
	var mcoAmountType = $.trim($("span.txt.currency_txt.mcoAmount_currency").text());
	var salePriceType = $.trim($("span.txt.currency_txt.salePrice_currency").text());
	if(mcoAmountType == "美元" && salePriceType == "美元") {
		$("span.txt.currency_txt.faceValue_currency").text("美元");
	}
	if(mcoAmountType == "人民币" && salePriceType == "人民币") {
		$("span.txt.currency_txt.faceValue_currency").text("人民币");
	}
	if(mcoAmountType == "人民币" && salePriceType == "美元") {
		$("span.txt.currency_txt.faceValue_currency").text("美元");
		mcoAmount = (mcoAmount / exchangeRate).toFixed(2);
		faceValueInfo = Number(salePrice - mcoAmount).toFixed(2);
		faceValueBox.val(faceValueInfo);
	}
	if(mcoAmountType == "美元" && salePriceType == "人民币") {
		$("span.txt.currency_txt.faceValue_currency").text("美元");
		salePrice = (salePrice / exchangeRate).toFixed(2);
		faceValueInfo = Number(salePrice - mcoAmount).toFixed(2);
		faceValueBox.val(faceValueInfo);
	}

}

//费率
function rateInfoCalculate(rateInfoBox, mcoAmount, mcoCreditInfo) {
	//费率=(MCO金额-MCO Credit)/MCO金额
	var rateInfoTxt = (Number(mcoAmount - mcoCreditInfo) / mcoAmount).toFixed(4);
	rateInfoTxt = Number(rateInfoTxt * 100).toFixed(2) + "%";
	rateInfoBox.val(rateInfoTxt);
}

//mcoCredit
function mcoCreditCalculate(mcoCreditBox, mcoAmount, rateInfo) {
	//MCO Credit=MCO金额-费率*MCO金额
	if($.inArray("%", rateInfo) !== -1) {
		rateInfo = Number(rateInfo.split("%")[0] / 100);
	}
	var mcoCreditTxt = (Number(mcoAmount - (mcoAmount * rateInfo))).toFixed(2);
	mcoCreditBox.val(mcoCreditTxt);
}

//订单关联   s
/*
 	关于"订单关联"：
 	一、输入框输入信息，点击确认后，表增加新的一行(li) : ordersAssociated();
 	变量:
 *  1. relatedNum  ->  要关联的编号(dd.number>a的内容)
 * 	   relatedNum = relatedNum + ',' + "21" + i;(假定要关联的编号的个数是不固定的,第一次确认时为2个，第二次为3个...)
 * 	
 * 	3. i  ->第i个新增行
 * 	4. systemNumTxt -> 输入框输入的值(即，"系统编号"格子dd.numberInfo的内容)
 * 	5. numberInfo    ->"系统编号"
 * 	6. currentInputTxt、currentListTxt ->用做判断两次输入的内容不能一致
 * 	7. ddCell 表中每一个单元格
 * 	   txt 每个单元格的内容
 * 
 * */

function ordersAssociated() {
	$("ul.add-msg li.systemNum a").on("mousedown", function() {
		$(this).addClass("selected");
	});
	$("ul.add-msg li.systemNum a").on("mouseup", function() {
		$(this).removeClass("selected");
	});
	var i = 1;
	var relatedNum = "123"; //关联编号
	$("ul.add-msg li.systemNum a").on("click", function() {
		//确认后增加新的一列：
		var systemNumTxt = $("ul.add-msg li.systemNum input").val();//输入框的值
		var listText = $("ul.add-msg div.systemNumTab li dl dd.numberInfo").text();//系统编号
		var currentInputTxt = $.trim(systemNumTxt);
		var currentListTxt = $.trim(listText);
		if(systemNumTxt!== "") {
			if(currentListTxt.indexOf(currentInputTxt) == -1) {
				i++;
				//relatedNum：是为了测试关联编号个数不同而设置的;目前每次确认后，会增加一个新的关联编号
				relatedNum = relatedNum + ',' + "21" + i;
				var e = `
						<li class="tab_content">
							<dl>
								<dd class="selectInfo">
									<div class="checkbox checkbox-success">
										<input id="numInfo` + i + `"    class="styled" type="checkbox" checked="checked">
										<label for="numInfo` + i + `"></label>
									</div>
								</dd>
								<dd class="numberInfo">
									` + systemNumTxt +
									`
								</dd>
								<dd class="salesInfo">
									MICHEAL_SHENG
								</dd>
								
								<dd class="number">
									<a>
									` + relatedNum +
					`
									</a>
								</dd>
							</dl>
						</li>
					`;
				$("ul.add-msg div.systemNumTab").css("display", "block");
				$("ul.add-msg div.systemNumTab").find("li.tab_title").after(e);
				$("ul.add-msg li.systemNum input").val("");
				heightRange();
				//一个格子中信息不能完整显示的情况：
				var ddCell = $("ul.add-msg div.systemNumTab li.tab_content dd");
				ddCell.on("mouseenter", function() {
					ddCell.each(function(i, item) {
						var txt = $.trim($(item).text());
						txt = txt.replace(/[\r\n]/g, "");
						$(item).attr("title", txt);
					});
				});

			} else {
				$("ul.add-msg li.systemNum input").val("");
			}
		}
	});
}
/*
 	关于"订单关联"：
 	radminidInfo();
 	二、 点击任意一行"关联编号"的格子(dd.number>a),当前行(li)中,增加与其关联的几行(dl.unfold)
 		增加关联行的个数与当前行关联编号的个数一致(假定当前点击行关联编号的个数为2,则展开的关联行为2行)
 		若已增加，点击时进行移除(即收起的效果)
 		变量:
 		
 		1. thisLi ->当前点击的任意行(li)
 		2. currentNum->当前点击行"系统编号"格子的内容(li>dl>dd.numberInfo) (假定为：231)
 		3. numInfo->当前点击行"关联编号"格子的内容(dd.number a)     (假定为：["123", "212"])
 		   numInfo[i]   第i项关联行(dl.unfold) "系统编号"的内容
 		   i=0   123
 		   1=2   212
 		4. numArr->临时数组，用于存放关联编号格子的内容 (["123", "212"])
 		5. localStorage.setItem("numArr", numArr);存放关联编号格子的内容 
 			每增加一个关联行(dl.unfold)后,取出值不变
 		        即 numArr = localStorage.getItem("numArr");//取出值不变 (123,212)
 		6. numArr.splice(i + 1, 1);
 * 		      在任意一行的关联行(dl.unfold)中，"关联编号"的内容(dd.number>a),不包含当前关联行(dl.unfold)的"系统编号"的值，需要移除
 * 	       i=0   	numArr 212
 * 		   i=1      numArr 123
 * 		7. serialNum  关联行(dl.unfold)中，"关联编号"的内容
 * 		   serialNum = serialNum = currentNum + ',' + numArr;//展开部分:关联编号"当前系统编号"+"移除对应项之后的numArr"
 * 		   i=0 serialNum  231,212
 * 		   i=1 serialNum  231,123
 *      8. 
 * 		由于i=0，serialNum会出现未定义的情况，所需要重新赋值
 * 		if(i == 0) {
			//i=0时，serialNum需要重新赋值
			numArr = localStorage.getItem("numArr");
			numArr = numArr.split(',');
			numArr.splice(0, 1);
			serialNum = currentNum + ',' + numArr;
			serialNum = $.trim(serialNum);
			}
			只关联一个编号时，numArr 移除对应项之后为空 serialNum值也应为空
			//1个编号:
			if(numInfo.length == 1) {
				//关联编号的只有一个的情况：
					serialNum = serialNum.replace(',', '');
			}
 *         
 *          
 * 			
 * */
function radminidInfo() {
	//关联编号的展开：
	$(document).on("click", "ul.add-msg div.systemNumTab li.tab_content dd.number a", function() {
		if($.trim($(this).text()) == "") {
		} else {
			//关联编号的个数不为0的情况：
			var thisLi = $(this).parent().parent().parent("li");
			if(thisLi.find("dl.unfold").css("display")=="block") {
				//收起
				thisLi.find("dl.unfold").remove();
				thisLi.removeClass("current");
				heightRange();
			} else {
				//展开
				var currentNum = thisLi.find("dd.numberInfo").text();//当前系统编号格子的内容
				var numInfo = $.trim($(this).text()).split(",");//当前关联编号格子的内容
				console.log(numInfo);
				var numArr = [];
				for(var j = 0; j < numInfo.length; j++) {
					numArr.push(numInfo[j]);//将当前关联编号格子的数字放入数组
				}
				localStorage.setItem("numArr", numArr);//并保存
				console.log(localStorage.getItem("numArr"));
				for(var i = 0; i < numInfo.length; i++) {
					var serialNum;//展开部分，关联编号格子的内容
					if(i == 0) {
						//i=0时，serialNum需要重新赋值
						numArr = localStorage.getItem("numArr");
						numArr = numArr.split(',');
						numArr.splice(0, 1);
						serialNum = currentNum + ',' + numArr;
						serialNum = $.trim(serialNum);
					}
					//1个编号:
					if(numInfo.length == 1) {
						//关联编号的只有一个的情况：
						serialNum = serialNum.replace(',', '');
					}
					var e = `
					<dl class="unfold">
						<dd class="selectInfo">
							<div class="checkbox checkbox-success">
								<input id="numInfo_` + i + `" class="styled" type="checkbox" >
								<label for="numInfo_` + i + `"></label>
							</div>
						</dd>
						<dd class="numberInfo">
							` + numInfo[i] + `
						</dd>
						<dd class="salesInfo">
							MICHEAL_SHENG
						</dd>
						
						<dd class="number">
							<a>` +
						serialNum + `
							</a>
						</dd>
					</dl>
					`;
					thisLi.append(e);
					//numInfo[i] 为展开部分,系统编号格子的内容
					numArr = localStorage.getItem("numArr");//取出   
					numArr = numArr.split(',');
					numArr.splice(i + 1, 1);//展开部分，第i列，在数组中移除对应的一项(第二列,[222,224])
					serialNum = serialNum = currentNum + ',' + numArr;//展开部分:关联编号"当前系统编号"+"移除对应项之后的numArr"
					serialNum = $.trim(serialNum);
					heightRange();
					$("ul.add-msg div.systemNumTab li.tab_content dl.unfold dd.number a").unbind("click");
				}
				thisLi.addClass("current");
			}
		}

	});
}

//订单关联   e
//目的地分类：
function destinationInfo() {
	//US分类：
	//未选择前：
	$("ul.add-msg li.destination select.firstItem").find("option").not(".firstOption").css("display", "none"); //一级
	$("ul.add-msg li.destination select.secondItem").find("option").not(".firstOption").css("display", "none"); //二级
	$("ul.add-msg li.destination select.thirdItem").find("option").not(".firstOption").css("display", "none"); //三级
	//US分类：
	$("ul.add-msg li.destination select.usItem").on("change", function() {
		var currentTxt = $.trim($(this).find("option:selected").text());
		if(currentTxt == "跟团游") {
			$("ul.add-msg li.destination select.firstItem").find("option").not(".firstOption").css("display", "block");
			destinationFirstClass();
		}
		if(currentTxt == "自助游") {
			$("ul.add-msg li.destination select.firstItem").find("option").not(".firstOption").css("display", "block");
			destinationFirstClass();
		}
		if(currentTxt == "US分类") {
			$("ul.add-msg li.destination select.firstItem").find("option").not(".firstOption").css("display", "none");
			$("ul.add-msg li.destination select.firstItem").prop('selectedIndex', 0);
			$("ul.add-msg li.destination select.secondItem").prop('selectedIndex', 0);
			$("ul.add-msg li.destination select.thirdItem").prop('selectedIndex', 0);
		}
	});

}
//一级分类：
function destinationFirstClass() {
	$("ul.add-msg li.destination select.firstItem").on("change", function() {
		var currentTxt = $.trim($(this).find("option:selected").text());
		if(currentTxt == "出境游") {
			$("ul.add-msg li.destination select.secondItem").find("option").not(".firstOption").css("display", "block");
			$("ul.add-msg li.destination select.secondItem").find("option.outboundTravel").css("display", "block");
			$("ul.add-msg li.destination select.secondItem").find("option.domesticTourism").css("display", "none");

			destinationSecondClass();
		}
		if(currentTxt == "国内游") {
			$("ul.add-msg li.destination select.secondItem").find("option").not(".firstOption").css("display", "block");
			$("ul.add-msg li.destination select.secondItem").find("option.outboundTravel").css("display", "none");
			$("ul.add-msg li.destination select.secondItem").find("option.domesticTourism").css("display", "block");
			destinationSecondClass();
		}
		if(currentTxt == "一级分类") {
			$("ul.add-msg li.destination select.secondItem").find("option").not(".firstOption").css("display", "none");
			$("ul.add-msg li.destination select.secondItem").prop('selectedIndex', 0);
			$("ul.add-msg li.destination select.thirdItem").prop('selectedIndex', 0);
		}
	});
}
//二级分类
function destinationSecondClass() {
	$("ul.add-msg li.destination select.secondItem").on("change", function() {
		var currentTxt = $.trim($(this).find("option:selected").text());
		if(currentTxt == "二级分类") {
			$("ul.add-msg li.destination select.thirdItem").find("option").not(".firstOption").css("display", "none");
			$("ul.add-msg li.destination select.thirdItem").find("option.firstOption").css("display","block");
			$("ul.add-msg li.destination select.thirdItem").prop('selectedIndex', 0);
		} 
		else {
			$("ul.add-msg li.destination select.thirdItem").find("option").not(".firstOption").css("display", "block");
			if(currentTxt == "马代") {
				$("ul.add-msg li.destination select.thirdItem").find("option").not(".maldives").css("display", "none");
			}
			if(currentTxt == "东南亚") {
				$("ul.add-msg li.destination select.thirdItem").find("option").not(".southeastAsia").css("display", "none");
			}
			if(currentTxt == "欧洲") {
				$("ul.add-msg li.destination select.thirdItem").find("option").not(".europe").css("display", "none");
			}
			if(currentTxt == "日韩") {
				$("ul.add-msg li.destination select.thirdItem").find("option").not(".japan_korea").css("display", "none");
			}
			if(currentTxt == "美洲") {
				$("ul.add-msg li.destination select.thirdItem").find("option").not(".america").css("display", "none");
			}
			if(currentTxt == "澳洲") {
				$("ul.add-msg li.destination select.thirdItem").find("option").not(".australia").css("display", "none");
			}
			if(currentTxt == "中东非") {
				$("ul.add-msg li.destination select.thirdItem").find("option").not(".middleEastAfrica").css("display", "none");
			}
			if(currentTxt == "海岛") {
				$("ul.add-msg li.destination select.thirdItem").find("option").not(".island").css("display", "none");
			}
			if(currentTxt == "游轮") {
				$("ul.add-msg li.destination select.thirdItem").find("option").not(".tanker").css("display", "none");
			}
			if(currentTxt == "港澳台") {
				$("ul.add-msg li.destination select.thirdItem").find("option").not(".hongKongMacaoTaiwan").css("display", "none");
			}
			if(currentTxt == "周边") {
				$("ul.add-msg li.destination select.thirdItem").find("option").not(".periphery").css("display", "none");
			}
			if(currentTxt == "国内长线") {
				$("ul.add-msg li.destination select.thirdItem").find("option").not(".domesticLongLine").css("display", "none");
			}
		}
	});
}
