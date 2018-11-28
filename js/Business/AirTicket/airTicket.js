//单程、往返
function airTicketOption() {
	//机票部分 (团票/散票;往返/单程切换)
	$(".ticket-option").find("dd").on("click", function() {
		$(this).addClass("option-active").siblings().removeClass("option-active");
	});

	//单程/往返:
	$(".flightCodeNav").find("dd.roundTripItem").on("click", function() {
		$(".singleTripInfo").css("display", "none");
		$(".roundTripInfo").css("display", "inline-block");
	});
	$(".flightCodeNav").find("dd.singleTripItem").on("click", function() {
		$(".singleTripInfo").css("display", "inline-block");
		$(".roundTripInfo").css("display", "none");
	});
}

//总人数计算
function headCount() {
	$("#air-ticket-create-adult-number, #air-ticket-create-children-number, #air-ticket-create-baby-number, #air-ticket-create-youth-number").on("keyup", function() {
		var adultNumber = $.trim($("#air-ticket-create-adult-number").val());
		var youthNumber = $.trim($("#air-ticket-create-youth-number").val());
		var childrenNumber = $.trim($("#air-ticket-create-children-number").val());
		var babyNumber = $.trim($("#air-ticket-create-baby-number").val());
		if(adultNumber == "") {
			adultNumber = 0;
		}
		if(youthNumber == "") {
			youthNumber = 0;
		}
		if(childrenNumber == "") {
			childrenNumber = 0;
		}
		if(babyNumber == "") {
			babyNumber = 0;
		}
		var sum = parseInt(adultNumber) +
			parseInt(youthNumber) +
			parseInt(childrenNumber) +
			parseInt(babyNumber);
		$("#air-ticket-create-total-number").val(sum);
	})
}

$(document).ready(function() {
	headCount();
	travelInfor();
	paymentMethod();
	priceCalculate();
	getCalculateprofitInfo();
	ordersAssociated();
	passengerInfo();
	radminidInfo();
	rateInfo();
	showProfitBox();
	$("div.notesInfor").on("keyup", function() {
		heightRange();
	});

	$("ul.add-msg li.list_cost a").on("mousedown", function() {
		$(this).addClass("selected");
	});
	$("ul.add-msg li.list_cost a").on("mouseup", function() {
		$(this).removeClass("selected");
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

	$("#ticket-create-customer-otherContact").on('change', function() {
		$("#ticket-create-customer-otherContactLabel").text(
			$("#ticket-create-customer-otherContact").val() + '帐号'
		);
	});

	$("#airticket_salesperson, #airticket_source, #travel-agency-source, #wholesaler, #mco-receiver").on('focus', function() {
		var current_id = $(this).attr('id');
		var target = "";
		if(current_id == 'airticket_salesperson') {
			target = 'salesperson';
		} else if (current_id == 'airticket_source') {
			target = 'source';
		} else if (current_id == 'travel-agency-source') {
			target = 'travelAgency'
		} else if (current_id == 'wholesaler') {
			target = 'wholesaler';
		} else if (current_id == 'mco-receiver') {
			target = 'user_id';
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

	function resetCustomerForm() {
		$("#ticket-create-customer-phone").val("");
		$("#ticket-create-customer-email").val("");
		$("#ticket-create-customer-otherContact").val("");
		$("#ticket-create-customer-otherContactLabel").text("WeChat帐号");
		$("#ticket-create-customer-otherContactNumber").val("");
		$("#ticket-create-customer-birthday").val("");
		$("#ticket-create-customer-gender").val("");
		$("#ticket-create-customer-zipcode").val("");
		$("select#ticket-create-customer-otherContact").parent("dd").removeClass("requiredItem");
		$("input#ticket-create-customer-otherContactNumber").parent("dd").removeClass("requiredItem");
		$("#ticket-create-customer-phone").parent("dd").removeClass("requiredItem");
	}

	$("#indivTourCancel").on("click", function() {
		$('#createAirTicketForm').trigger("reset"); //重置表单
		resetCustomerForm();

		//支付信息重置：
		$("span#air-ticket-create-payment-type").text("支付方式");
		$("ul.add-msg .mcoList").css("display", "none");
		$("ul.add-msg .mcoList").find("input").val("");
		$("span.currency_txt").text("美元");
		$(".airticketMsg ul.add-msg").find("input").val("");
		//订单关联的重置：
		$("ul.add-msg div.systemNumTab").css("display", "none");
		$("ul.add-msg div.systemNumTab").find("li.tab_content").remove();
		$(".addClients ul.clients-info li dl dd input").val("");

		//信用卡信息：
		$(".creditCardInfo").find("input").val("");
		$(".creditCardInfo").find("select").prop('selectedIndex', 0);
		$(".creditCardInfo").css("display", "none");
		$("ul.add-msg li.creditCardItem div.checkbox input").attr("checked",false);

		$(".addClients ul.clients-info li dl dd.passenger div#passenger-list").find("span.new").remove();
		$(".addClients ul.clients-info li dl dd.passenger div select").prop('selectedIndex', 0);
		$("ul#air-ticket-schedule").find("li.new").remove();

		heightRange();

		var leftHeight = $(".navInfo ul").height()
		var rightHeight = $(".theamInfo").height();
		if(rightHeight < leftHeight) {
			$(this).blur();
			$(".navInfo ul").css("height", rightHeight);
		}
		$("#airTicketDiscountNotice").addClass("nm-hide");
	});

	function getData() {
		var payment_area = $("#payment-area")[0].innerHTML == '中国' ? 'CN' : 'US';
		var sell_price_currency = $("#sell-price-currency")[0].innerHTML == '美元' ? 'USD' : 'RMB';
		var base_price_currency = $("#base-price-currency")[0].innerHTML == '美元' ? 'USD' : 'RMB';
		var payment_type = $("#air-ticket-create-payment-type")[0].innerHTML;
		if(payment_type == '现金') {
			payment_type = 'cash';
		} else if(payment_type == '支票') {
			payment_type = 'check';
		} else if(payment_type == '支付宝') {
			payment_type = 'alipay';
		} else if(payment_type == '微信支付') {
			payment_type = 'wechat';
		} else if(payment_type == 'REMIT') {
			payment_type = 'remit';
		} else if(payment_type == '航司全额刷卡') {
			payment_type = 'airall';
		} else if(payment_type == '航司刷卡+MCO') {
			payment_type = 'airmco';
		}
		var profit = $("#airTicketProfit").val();
		var profit_currency = $("#profit-currency")[0].innerHTML == '美元' ? 'USD' : 'RMB';

		var numOfAdult = numOfYouth = numOfChildren = numOfBaby = 0;
		for(var i = 0; i < $(".passenger-info").length; i++) {
			if($(".passenger-info").eq(i).val() == 'adult') {
				numOfAdult++;
			} else if($(".passenger-info").eq(i).val() == 'youth') {
				numOfYouth++;
			} else if($(".passenger-info").eq(i).val() == 'children') {
				numOfChildren++;
			} else if($(".passenger-info").eq(i).val() == 'infant') {
				numOfBaby++;
			}
		}

		var data = {
			itinerary: $("#airticket-itinerary").val(),

			salesperson: $("#airticket_salesperson").val(),
			locator: $("#air-ticket-create-locator").val(),
			air_company_code: $("#air-ticket-create-air-company-code").val(),
			roundTrip: ($("#air-ticket-create-round-trip").hasClass('option-active')) ? 'round' : 'oneway',
			ticketType: ($("#air-ticket-create-ticket-type").hasClass('option-active')) ? 'group' : 'individual',
			numPassenger: $("#air-ticket-create-total-number").val(),
			wholesaler: $("#wholesaler").val(),
			ticketed_time: $("#ticketed_time").val(),
			invoice: $("#air-ticket-create-invoice").val(),
			source: $("#airticket_source").val(),
			note: $("#air-ticket-create-note").val(),

			exchange_rate: $("#exchange_rate").val(),
			payment_area: payment_area,
			sell_price: $("#air_amountDue").val(),
			sell_price_currency: sell_price_currency,
			base_price: $("#air-ticket-base-price").val(),
			base_price_currency: base_price_currency,
			payType: payment_type,
			profit: profit,
			profit_currency: profit_currency,

			numOfAdult: numOfAdult,
			numOfYouth: numOfYouth,
			numOfChildren: numOfChildren,
			numOfBaby: numOfBaby,

			phone: $("#ticket-create-customer-phone").val(),
			email: $("#ticket-create-customer-email").val(),
			otherContact: $("#ticket-create-customer-otherContact").val(),
			otherContactNumber: $("#ticket-create-customer-otherContactNumber").val(),
			birthday: $("#ticket-create-customer-birthday").val(),
			gender: $("#ticket-create-customer-gender").val(),
			zipcode: $("#ticket-create-customer-zipcode").val()
		};

		var flight_number = [];
		var leave_date = [];
		var schedule = [];

		for(var i = 0; i < $(".flightNum").length; i++) {
			flight_number.push($(".flightNum").eq(i).val());
			leave_date.push($(".startTime").eq(i).val());
			schedule.push($(".airport").eq(i).val());
		}
		Object.assign(data, {
			flight_number: JSON.stringify(flight_number),
			leave_date: JSON.stringify(leave_date),
			schedule: JSON.stringify(schedule)
		});

		var passenger_list = [];
		var ticket_number = [];
		var passenger_type = [];
		for(var i = 0; i < $(".passenger-name").length; i++) {
			passenger_list.push($(".passenger-name").eq(i).val());
			ticket_number.push($(".passenger-ticket-number").eq(i).val());
			passenger_type.push($(".passenger-info").eq(i).val());
		}
		data['passenger_list'] = JSON.stringify(passenger_list);
		data['ticket_number'] = JSON.stringify(ticket_number);
		data['passenger_type'] = JSON.stringify(passenger_type);

		if(payment_type == 'airmco') {
			var mco_party = $("#mco-party")[0].innerHTML;
			var mco_invoice = $("#mco-invoice").val();
			var face_value = $("#face-value").val();
			var face_currency = $("#face-currency")[0].innerHTML == '美元' ? 'USD' : 'RMB';
			var mco_value = $("#mco-value").val();
			var mco_currency = $("#mco-currency")[0].innerHTML == '美元' ? 'USD' : 'RMB';
			var mco_credit = $("#mco-credit").val();
			var mco_credit_currency = $("#mco-credit-currency")[0].innerHTML == '美元' ? 'USD' : 'RMB';
			var fee_ratio = $("#fee-ratio").val();

			Object.assign(data, {
				mco_party: mco_party,
				mco_invoice: mco_invoice,
				face_value: face_value,
				face_currency: face_currency,
				mco_value: mco_value,
				mco_currency: mco_currency,
				mco_credit: mco_credit,
				mco_credit_currency: mco_credit_currency,
				fee_ratio: fee_ratio,
				card_number: $("#card-number").val(),
				expire_month: $("#expired-date-month").val(),
				expire_year: $("#expired-date-year").val(),
				card_holder: $("#card-holder").val(),
				mco_receiver: $("#mco-receiver").val()
			});
		}

		if($("dd.selectInfo div.checkbox input").length > 0) {
			var collection_list = [];
			$("dd.selectInfo div.checkbox input").each(function() {
				collection_list.push($(this).parent().parent().next()[0].innerHTML);
			});
			data['collection_list'] = JSON.stringify(collection_list);
		}

		return data;
	}

	function resetInputForm() {
		$("#airTicketDiscountNotice").addClass("nm-hide");
		$('#createAirTicketForm').trigger("reset"); //重置表单
		resetCustomerForm();
		var leftHeight = $(".navInfo ul").height()
		var rightHeight = $(".theamInfo").height();
		if(rightHeight < leftHeight) {
			$(this).blur();
			$(".navInfo ul").css("height", rightHeight);
		}
	}

	$("#airTicketSubmit").on('click', function() {
		// 		var data = getData();
		// 		if(data['flightCode'] == "" || data['salesperson'] == "" || data['locator'] == "" ||
		// 			data['numOfAdult'] == "" || data['numOfChildren'] == "" || data['numOfBaby'] == "" ||
		// 			data['source'] == "" || data['leaveDate'] == "" || data['arriveDate'] == "" || data['leaveLocation'] == "" ||
		// 			data['arriveLocation'] == "" || data['expense'] == "" || data['price'] == "" || data['received2'] == "" ||
		// 			data['lastName'] == "" || data['firstName'] == "" || data['phone'] == "" || data['birthday'] == "" || data['gender'] == "UNKNOWN") {
		// 			//必填项：
		// 			/*$("#ticket-create-customer-lastName").addClass("nm-error");
		// 			$("#ticket-create-customer-firstName").addClass("nm-error");
		// 			$("#ticket-create-customer-phone").addClass("nm-error");
		// 			$("#ticket-create-customer-birthday").addClass("nm-error");
		// 			$("#ticket-create-customer-email").addClass("nm-error");
		// 			$("#ticket-create-customer-gender").addClass("nm-error");*/
		// //			alert("看看你是不是填完了");
		// 			return false;
		// 		}
		$(".airticketCreateConfirmBox").css("display", "block");
	});

	$("#airticketCreateActionConfirm").on('click', function() {
		var inputData = getData();
		console.log(inputData);

		var url = location.protocol.concat("//").concat(location.host).concat('/database/Business/AirTicket/AirTicketCreate.php');
		$.ajax({
			url: url,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			type: 'post',
			data: inputData,
			success: function(response) {
				console.log(response);
				resetInputForm();
				$(".airticketCreateConfirmBox").css("display", "none");
				$(".airticketCreateSuccessBox").css("display", "block");
				$(".airticketCreateSuccessBox p.confirmNotice").text("提交成功");
				$(".airticketCreateSuccessBox p.confirmNotice").find("img").attr("src", "../img/userConfirm.png");
				$(".airticketCreateSuccessBox p.actionBox").find(".actionConfirm").text("知道了");
				$(".airticketCreateSuccessBox p.actionBox").find(".actionConfirm").css({
					"width": "100%",
					"border-bottom-right-radius": "7px",
					"border": "0px"
				});
				$(".airticketCreateSuccessBox p.actionBox").find(".actionCancel").css("display", "none");

				//重置：
				//支付信息重置：
				$("span#air-ticket-create-payment-type").text("支付方式");
				$("ul.add-msg .mcoList").css("display", "none");
				$("ul.add-msg .mcoList").find("input").val("");
				$("span.currency_txt").text("美元");
				//$(".airticketMsg ul.add-msg").find("input").val(" ");
				//订单关联的重置：
				$("ul.add-msg div.systemNumTab").css("display", "none");
				$("ul.add-msg div.systemNumTab").find("li.tab_content").remove();
				$(".addClients ul.clients-info li dl dd input").val("");

				$(".creditCardInfo").find("input").val("");
				$(".creditCardInfo").find("select").prop('selectedIndex', 0);
				$(".creditCardInfo").css("display", "none");
				$("ul.add-msg li.creditCardItem div.checkbox input").attr("checked",false);

				$(".addClients ul.clients-info li dl dd.passenger div select").prop('selectedIndex', 0);
				$(".addClients ul.clients-info li dl dd.passenger div#passenger-list").find("span.new").remove();
				$("ul#air-ticket-schedule").find("li.new").remove();
				heightRange();

			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
	});

	$("#airticketCreateActionCancel").on('click', function() {
		$(".airticketCreateConfirmBox").css("display", "none");
	});

	$("#airticketCreateSuccessConfirm").on('click', function() {
		$(".airticketCreateSuccessBox").css("display", "none");
	});
	//	VerifyRequiredItems();
	$("#airTicketSubmit").unbind("click").on("click", function() {
		if(!VerifyRequiredItems()) {
			return false;
		} else {
			$(".airticketCreateConfirmBox").css("display", "block");
			$(".airticketCreateConfirmBox").removeClass("nm-hide");
		}
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
	$(".requiredItem").find("input").not(".notRequired").each(function() {
		if($(this).val() == "") {
			num++;
			$(this).addClass("error");

		} else {
			$(this).removeClass("error");
		}
	});
	var payment = checkPaymentMethod();
	if((payment == false) || (num > 0)) {
		alert("请确认必填信息已全部填写");
		return false;
	} else {
		return true;
	}
}

function checkPaymentMethod() {
	if($.trim($("span#air-ticket-create-payment-type").text()) == "支付方式") {
		$("ul.add-msg li.payment-type.paymentMethodInfo div.payment").addClass("error");
		$("ul.add-msg li.payment-type.paymentMethodInfo div.payment").find(".btn-default").css("border", "0px");
		return false;
	} else {
		$("ul.add-msg li.payment-type.paymentMethodInfo div.payment").removeClass("error");
		$("ul.add-msg li.payment-type.paymentMethodInfo div.payment").find(".btn-default").css("border", "solid 1px #969696");
		return true;
	}
}

function checkNumber() {
	var m = 0;
	var checkNum = /^\d+(\.\d+)?$/;
	$("input.numFormat").each(function() {
		if($(this).val() !== "") {
			if(!checkNum.test(Math.abs($(this).val()))) {
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

function checkedCell() {
	$(".bms-tab").find("ul.accountRecordMsg").find("li").click(function() {
		$(this).addClass("accounting-active").siblings().removeClass("accounting-active");
	});
}

function dateRangew() {
	$(".showMsg").find(".datePicker").find("select").on("change", function() {
		var currentText = $(this).find("option:selected").text();
		if(currentText == "Customized") {
			$(".datePicker").find(".selectRange").css("display", "inline-block");
			$(this).parentsUntil(".showMsg").siblings().find(".datePicker").find(".selectRange").css("display", "none");
			$(".datePicker").trigger("change");
			$(this).parentsUntil(".showMsg").siblings().find(".datePicker").find("select").find("option").eq(0).attr("selected", 'selected'); //默认选中第一个
		}
		else {
			$(".datePicker").find(".selectRange").css("display", "none");
		}
	});
}

function addClients() {
	$(".confirmAmend").find("a").on("click", function() {
		$(".customerInfo.addClients").fadeOut();
	});
	$("#closeAddBox").on("click", function() {
		$(".customerInfo.addClients").fadeOut();
	});
}

function autoCenterBox(el) {
	var bodyW = $("body").width() + 17;
	var bodyH = $(window).height();
	var elW = el.width();
	var elH = el.height();
	el.css({
		"left": (bodyW - parseFloat(bodyW * elW / 100)) / 2 + 'px',
		"top": (bodyH - elH) / 2 + 'px'
	});
};

function airTicketTourDiscount(discountText, discountNotice, discountApply, subtractNum, discountOption, coupon_currency) {
	heightRange();
	discountOption.find("dd").on("click", function() {
		$(this).addClass("option-active").siblings().removeClass("option-active");
	});
	discountApply.on("click", function() {
		var basePrice = 0; //底价
		var salePrice = 0; //销售价
		var returnCash = 0; //返现
		var discount; //折扣
		var exchangeRate = 0; //汇率
		var profit = $("#airTicketProfit");
		basePrice = $("input#air-ticket-base-price").val();
		salePrice = $("input#air-ticket-sell-price").val();
		returnCash = $("input#air-ticket-received2").val();
		exchangeRate = $("input#exchange_rate").val();
		//选中折扣金额
		if(discountOption.find("dd.coupon").hasClass("option-active")) {
			$("#airTicketDiscountText").addClass("numFormat");
			var reg = /^\d+(\.\d{1,2})?$/;
			if(discountText.val() == "" || !reg.test(discountText.val())) {
				discountNotice.css("display", "none");
				alert('请输入正确的折扣金额');
			} else {
				$("#airTicketDiscountText").removeClass("numFormat");
				discountNotice.css("display", "block");
				subtractNum.text('优惠金额: ' + discountText.val() + ' ' + coupon_currency.val());
				heightRange();
				if($("ul.add-msg li.discountCard dl.discountNotice").css("display") == "none") {
					discount = 0;
				} else {
					if($("span#airTicketSubtractNum").text().split(':')[1].split(" ")[2] == "USD") {
						discount = $("span#airTicketSubtractNum").text().split(':')[1].split(" ")[1];
					}
					if($("span#airTicketSubtractNum").text().split(':')[1].split(" ")[2] == "RMB") {
						discount = ($("span#airTicketSubtractNum").text().split(':')[1].split(" ")[1] / exchangeRate).toFixed(2);
						profitCalculate(basePrice, salePrice, returnCash, discount, profit, exchangeRate);
					}
				}
				profitCalculate(basePrice, salePrice, returnCash, discount, profit, exchangeRate);
			}
		}
		//选中折扣码
		else {
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
						if($("ul.add-msg li.discountCard dl.discountNotice").css("display") == "none") {
							discount = 0;
						} else {
							if($("span#airTicketSubtractNum").text().split(':')[1].split(" ")[2] == "USD") {
								discount = $("span#airTicketSubtractNum").text().split(':')[1].split(" ")[1];
							}
							if($("span#airTicketSubtractNum").text().split(':')[1].split(" ")[2] == "RMB") {
								discount = ($("span#airTicketSubtractNum").text().split(':')[1].split(" ")[1] / exchangeRate).toFixed(2);
								profitCalculate(basePrice, salePrice, returnCash, discount, profit, exchangeRate);
							}
						}
						profitCalculate(basePrice, salePrice, returnCash, discount, profit, exchangeRate);
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log(textStatus, errorThrown);
				}
			});
		}
	});
}

function travelInfor() {
	$(document).on('click', '.floor .addInfo .cardRight.info-date ul.add-msg li:first img.addInfo', function() {
		addTravelInfor();
	});
	$(document).on('click', '.floor .addInfo .cardRight.info-date ul.add-msg li:first img.deleteInfo', function() {
		deleteTravelInfor();
	});
}

//添加
function addTravelInfor() {
	var e = `
		<li class="requiredItem new">
			<label class="nm-left">旅途</label>
			<div class="tour nm-left">
				<input type="text" placeholder="航班号" class="flightNum"  value=""/>
				<input type="date" placeholder="出发时间" class="startTime"/>
				<input type="text" placeholder="机场" class="airport" maxlength="7"/>
			</div>
		</li>
		`;
	$(".floor .addInfo .cardRight.info-date").find("ul.add-msg").append(e);
	heightRange();
}

//删除
function deleteTravelInfor() {
	if($(".floor .addInfo .cardRight.info-date").find("ul.add-msg").find("li.requiredItem").length > 1) {
		$(".floor .addInfo .cardRight.info-date").find("ul.add-msg").find("li.requiredItem").last().remove();
	} else {
		alert("至少含一项旅途");
	}
	heightRange();
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
		if(currentArea.text() == "美国") {
			currentCurrency.text("美元");
		}
		if(currentArea.text() == "中国") {
			currentCurrency.text("人民币");
		}

	});
	//货币
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
			$(".airticketMsg ul.add-msg li.exchangeRate").addClass("requiredItem");
			//alert("请输入汇率信息");
		}
		else {
			$(".airticketMsg ul.add-msg li.exchangeRate").removeClass("requiredItem");
		}
	});
	//支付方式
	$(".payService ul li .payment").find(".paymentMethod").find("ul.dropdown-menu.methodList").find("li").find("a").on("click", function() {
		$(".payService ul li .payment").find(".paymentMethod").find("ul.dropdown-menu.methodList").css("width", "50%");

	});
	if($(".mcoList").css("display") == "block") {
		$(".mcoList").css("display", "block");
		$("input#face-value").removeClass("notRequired");
		$("input#mco-value").removeClass("notRequired");
		$("input#mco-credit").removeClass("notRequired");
		$("input#card-number").removeClass("notRequired");
		$("input#card-holder").removeClass("notRequired");
		$("input#mco-receiver").removeClass("notRequired");

	} else {
		$("input#face-value").addClass("notRequired");
		$("input#mco-value").addClass("notRequired");
		$("input#mco-credit").addClass("notRequired");
		$("input#card-number").addClass("notRequired");
		$("input#card-holder").addClass("notRequired");
		$("input#mco-receiver").addClass("notRequired");

		$("ul.add-msg li.list_account.profitInfor a").css("display", "hidden");
		$("input#face-value").val("");
		$("input#mco-value").val("");
		$("input#mco-credit").val("");
		$("input#fee-ratio").val("");
		$("span#mco-party").text("");
		$("input.mco_invoice").val("");
//		$("input#airTicketProfit").val("");
		$("span.mcoAmount_currency").text("美元");
		$("span.mcoCredit_currency").text("美元");
		$("span.faceValue_currency").text("美元");


		$(".creditCardInfo").find("input").val("");
		$(".creditCardInfo").find("select").prop('selectedIndex', 0);
		$(".creditCardInfo").css("display", "none");
		$("ul.add-msg li.creditCardItem div.checkbox input").attr("checked",false);

	}
	//支付方式-信用卡
	$(".payService ul li .payment").find(".paymentMethod").find("ul.dropdown-menu.creditCardPayment").find("li").find("a").on("click", function() {
		var payment_type = $(".payService ul li .payment").find(".paymentMethod").find("button.btn").find("span.txt");
		payment_type.text($(this).text());
		$("ul.add-msg li.payment-type.paymentMethodInfo div.payment").removeClass("error");
		$("ul.add-msg li.payment-type.paymentMethodInfo div.payment").find(".btn-default").css("border", "solid 1px #969696");
		//信用卡和MCO支付
		if(payment_type.text() == "航司刷卡+MCO") {

			$(".mcoList").css("display", "block");
			$("input#face-value").removeClass("notRequired");
			$("input#mco-value").removeClass("notRequired");
			$("input#mco-credit").removeClass("notRequired");
			$("input#card-number").removeClass("notRequired");
			$("input#card-holder").removeClass("notRequired");
			$("input#mco-receiver").removeClass("notRequired");
			$("ul.add-msg li.list_account.profitInfor a").css("visibility", "visible");

			$(".creditCardInfo").css("display", "block"); //输入信用卡


		} else {
			$(".creditCardInfo").find("input").val("");
			$(".creditCardInfo").find("select").prop('selectedIndex', 0);
			$(".creditCardInfo").css("display", "none"); //输入信用卡
			$(".mcoList").css("display", "none");
			$("input#face-value").addClass("notRequired");
			$("input#mco-value").addClass("notRequired");
			$("input#mco-credit").addClass("notRequired");
			$("input#card-number").addClass("notRequired");
			$("input#card-holder").addClass("notRequired");
			$("input#mco-receiver").addClass("notRequired");
			$("ul.add-msg li.list_account.profitInfor a").css("display", "hidden");
			$("input#face-value").val("");
			$("input#mco-value").val("");
			$("input#mco-credit").val("");
			$("input#fee-ratio").val("");
			$("span#mco-party").text("");
			$("input.mco_invoice").val("");
			$("span.mcoAmount_currency").text("美元");
			$("span.mcoCredit_currency").text("美元");
			$("span.faceValue_currency").text("美元");
			$("ul.add-msg li.creditCardItem div.checkbox input").attr("checked",false);
		}
		heightRange();
	});

	//支付方式-非信用卡
	$(".payService ul li .payment").find(".paymentMethod").find("ul.dropdown-menu.no-creditCardPayment").find("li").find("a").on("click", function() {
		var payment_type = $(".payService ul li .payment").find(".paymentMethod").find("button.btn").find("span.txt");
		payment_type.text($(this).text());
		$(".mcoList").css("display", "none");
		$("ul.add-msg li.payment-type.paymentMethodInfo div.payment").removeClass("error");
		$("ul.add-msg li.payment-type.paymentMethodInfo div.payment").find(".btn-default").css("border", "solid 1px #969696");

		$("input#face-value").addClass("notRequired");
		$("input#mco-value").addClass("notRequired");
		$("input#mco-credit").addClass("notRequired");
		$("input#card-number").addClass("notRequired");
		$("input#card-holder").addClass("notRequired");
		$("input#mco-receiver").addClass("notRequired");

		$("ul.add-msg li.list_account.profitInfor a").css("display", "hidden");
		$("input#face-value").val("");
		$("input#mco-value").val("");
		$("input#mco-credit").val("");
		$("input#fee-ratio").val("");
		$("span#mco-party").text("");
		$("input.mco_invoice").val("");

		$("span.mcoAmount_currency").text("美元");
		$("span.mcoCredit_currency").text("美元");
		$("span.faceValue_currency").text("美元");

		$(".creditCardInfo").find("input").val("");
		$(".creditCardInfo").find("select").prop('selectedIndex', 0);
		$(".creditCardInfo").css("display", "none");
		$("ul.add-msg li.creditCardItem div.checkbox input").attr("checked",false);
	});


	//刷卡公司:
	$(".payService ul li .payment").find("ul.companyMenu").find("li").find("a").on("click", function() {
		var companyInfo = $(".payService ul li .payment").find(".creditCardCompanies").find("button.btn").find("span.txt");
		companyInfo.text($(this).text());
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
	salePrice = $("input.airTicket_sellPrice").val();
	faceValue = $("input.airTicket_faceValue").val();
	mcoAmount = $("input.airTicket_mcoAmount").val();
	//票面
	$("input.airTicket_faceValue").on("keyup", function() {
		salePrice = $.trim($("input.airTicket_sellPrice").val());
		faceValue = $(this).val();
		mcoAmount = $.trim($("input.airTicket_mcoAmount").val());
		if(salePrice !== "") {
			mcoAmountCalculate($("input.airTicket_mcoAmount"), salePrice, faceValue);
		}
	});
	//mco金额
	$("input.airTicket_mcoAmount").on("keyup", function() {
		salePrice = $.trim($("input.airTicket_sellPrice").val());
		faceValue = $.trim($("input.airTicket_faceValue").val())
		mcoAmount = $(this).val();
		if(salePrice !== "") {
			faceValueCalculate($("input.airTicket_faceValue"), mcoAmount, salePrice);
		}
	});
	//卖价
	$("input.airTicket_sellPrice").on("keyup", function() {
		salePrice = $(this).val();
		faceValue = $.trim($("input.airTicket_faceValue").val());
		mcoAmount = $.trim($("input.airTicket_mcoAmount").val());
		if(faceValue !== "") {
			mcoAmountCalculate($("input.airTicket_mcoAmount"), salePrice, faceValue);
		}
	});
	//MCO Credit MCO金额  费率

	//费率=(MCO金额-MCO Credit)/MCO金额
	var rateInfo;
	rateInfo = $("input.rateInfo").val();
	//mco credit
	var mcoCreditInfo;
	mcoCreditInfo = $("input.mcoCreditInfo").val();
	//MCO 金额
	$("input.airTicket_mcoAmount").on("keyup", function() {
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
		mcoAmount = $("input.airTicket_mcoAmount").val();
		if(mcoAmount !== "") {
			mcoCreditCalculate($("input.mcoCreditInfo"), mcoAmount, rateInfo);
		}
	});
	//MCO Credit
	$("input.mcoCreditInfo").on("keyup", function() {
		rateInfo = $("input.rateInfo").val();
		mcoCreditInfo = $(this).val();
		mcoAmount = $("input.airTicket_mcoAmount").val();
		if(mcoAmount !== "") {
			rateInfoCalculate($("input.rateInfo"), mcoAmount, mcoCreditInfo);
		}
	});
}

//mco金额:
function mcoAmountCalculate(mcoAmountBox, salePrice, faceValue) {
	var exchangeRate = $("input#exchange_rate").val();
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
		salePrice = (salePrice / exchangeRate).toFixed(2);
		mcoAmountInfo = Number(salePrice - faceValue).toFixed(2);
		mcoAmountBox.val(mcoAmountInfo);
		$("span.txt.currency_txt.mcoAmount_currency").text("美元");
	}
	if(salePriceType == "美元" && faceValueType == "人民币") {
		faceValue = (faceValue / exchangeRate).toFixed(2);
		mcoAmountInfo = Number(salePrice - faceValue).toFixed(2);
		mcoAmountBox.val(mcoAmountInfo);
		$("span.txt.currency_txt.mcoAmount_currency").text("美元");
	}
}
//卖价:
function sellPriceCalculate(sellPriceBox, mcoAmount, faceValue) {
	var sellPriceInfo = Number(Number(faceValue) + Number(mcoAmount)).toFixed(2);
	sellPriceBox.val(sellPriceInfo);
	var exchangeRate = $("input#exchange_rate").val();
	var faceValueType = $.trim($("span.txt.currency_txt.faceValue_currency").text());
	var mcoAmountType = $.trim($("span.txt.currency_txt.mcoAmount_currency").text());
	if(faceValue == "美元" && mcoAmount == "美元") {
		$("span.txt.currency_txt.salePrice_currency").text("美元");
	}
	if(faceValue == "人民币" && mcoAmount == "人民币") {
		$("span.txt.currency_txt.salePrice_currency").text("美元");
	}
	if(faceValue == "人民币" && mcoAmount == "美元") {
		$("span.txt.currency_txt.salePrice_currency").text("美元");
		faceValue = (faceValue / exchangeRate).toFixed(2);
		sellPriceInfo = Number(Number(faceValue) + Number(mcoAmount)).toFixed(2);
		sellPriceBox.val(sellPriceInfo);
	}
	if(faceValue == "美元" && mcoAmount == "人民币") {
		$("span.txt.currency_txt.salePrice_currency").text("美元");
		mcoAmount = (mcoAmount / exchangeRate).toFixed(2);
		sellPriceInfo = Number(Number(faceValue) + Number(mcoAmount)).toFixed(2);
		sellPriceBox.val(sellPriceInfo);

	}

}
//票面
function faceValueCalculate(faceValueBox, mcoAmount, salePrice) {
	var exchangeRate = $("input#exchange_rate").val();
	var faceValueInfo = Number(salePrice - mcoAmount).toFixed(2);
	faceValueBox.val(faceValueInfo);
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
//利润
function getCalculateprofitInfo() {
	//利润=卖价-底价-MCO金额+MCO Credit
	var exchangeRate = $("input#exchange_rate").val();
	var profit;
	var salePrice;
	var basePrice;
	var mcoAmount;
	var mcoCredit;
	var profit = $("input#airTicketProfit");
	var salePrice = $("input#air_amountDue").val();
	var basePrice = $("input#air-ticket-base-price").val();
	var mcoAmount = $("input.airTicket_mcoAmount").val();
	var mcoCredit = $("input.mcoCreditInfo").val();
	//卖价
	$("input#air_amountDue").on("keyup", function() {
		profitType();
		exchangeRate = $("input#exchange_rate").val();
		profit = $("input#airTicketProfit");
		salePrice = $(this).val();
		basePrice = $("input#air-ticket-base-price").val();
		mcoAmount = $("input.airTicket_mcoAmount").val();
		mcoCredit = $("input.mcoCreditInfo").val();
		if($("li.list_account.profitInfor").find("span").text() == "美元") {
			//卖价人民币
			if($("span.salePrice_currency").text() == "人民币") {
				salePrice = (salePrice / exchangeRate).toFixed(2);
			}
			//底价人民币
			if($("span.basePrice_currency").text() == "人民币") {
				basePrice = (basePrice / exchangeRate).toFixed(2);
			}
			//mco金额人民币
			if($("span.mcoAmount_currency").text() == "人民币") {
				mcoAmount = (mcoAmount / exchangeRate).toFixed(2);
			}
			//mco credit
			if($("span.mcoCredit_currency").text() == "人民币") {
				mcoCredit = (mcoCredit / exchangeRate).toFixed(2);
			}
		}
		if($("li.list_account.profitInfor").find("span").text() == "人民币") {
			salePrice = $("input#air_amountDue").val();
			basePrice = $("input#air-ticket-base-price").val();
			mcoAmount = $("input.airTicket_mcoAmount").val();
			mcoCredit = $("input.numFormat.mcoCreditInfo").val();
		}
		profitInfor(profit, salePrice, basePrice, mcoAmount, mcoCredit, exchangeRate);
	});
	//底价
	$("input#air-ticket-base-price").on("keyup", function() {
		profitType();
		exchangeRate = $("input#exchange_rate").val();
		profit = $("input#airTicketProfit");
		salePrice = $("input#air_amountDue").val();
		basePrice = $(this).val();
		mcoAmount = $("input.airTicket_mcoAmount").val();
		mcoCredit = $("input.mcoCreditInfo").val();
		if($("li.list_account.profitInfor").find("span").text() == "美元") {
			//卖价人民币
			if($("span.salePrice_currency").text() == "人民币") {
				salePrice = (salePrice / exchangeRate).toFixed(2);
			}
			//底价人民币
			if($("span.basePrice_currency").text() == "人民币") {
				basePrice = (basePrice / exchangeRate).toFixed(2);
			}
			//mco金额人民币
			if($("span.mcoAmount_currency").text() == "人民币") {
				mcoAmount = (mcoAmount / exchangeRate).toFixed(2);
			}
			//mco credit
			if($("span.mcoCredit_currency").text() == "人民币") {
				mcoCredit = (mcoCredit / exchangeRate).toFixed(2);
			}
		}
		if($("li.list_account.profitInfor").find("span").text() == "人民币") {
			salePrice = $("input#air_amountDue").val();
			basePrice = $("input#air-ticket-base-price").val();
			mcoAmount = $("input.airTicket_mcoAmount").val();
			mcoCredit = $("input.numFormat.mcoCreditInfo").val();
		}
		profitInfor(profit, salePrice, basePrice, mcoAmount, mcoCredit, exchangeRate);
	});
	//mco金额
	$("input.airTicket_mcoAmount").on("keyup", function() {
		profitType();
		exchangeRate = $("input#exchange_rate").val();
		profit = $("input#airTicketProfit");
		salePrice = $("input#air_amountDue").val();
		basePrice = $("input#air-ticket-base-price").val();
		mcoAmount = $(this).val();
		mcoCredit = $("input.numFormat.mcoCreditInfo").val();
		if($("li.list_account.profitInfor").find("span").text() == "美元") {
			//卖价人民币
			if($("span.salePrice_currency").text() == "人民币") {
				salePrice = (salePrice / exchangeRate).toFixed(2);
			}
			//底价人民币
			if($("span.basePrice_currency").text() == "人民币") {
				basePrice = (basePrice / exchangeRate).toFixed(2);
			}
			//mco金额人民币
			if($("span.mcoAmount_currency").text() == "人民币") {
				mcoAmount = (mcoAmount / exchangeRate).toFixed(2);
			}
			//mco credit
			if($("span.mcoCredit_currency").text() == "人民币") {
				mcoCredit = (mcoCredit / exchangeRate).toFixed(2);
			}
		}
		if($("li.list_account.profitInfor").find("span").text() == "人民币") {
			salePrice = $("input#air_amountDue").val();
			basePrice = $("input#air-ticket-base-price").val();
			mcoAmount = $("input.airTicket_mcoAmount").val();
			mcoCredit = $("input.numFormat.mcoCreditInfo").val();
		}
		profitInfor(profit, salePrice, basePrice, mcoAmount, mcoCredit, exchangeRate);
	});
	//mcoCredit
	$("input.mcoCreditInfo").on("keyup", function() {
		profitType();
		exchangeRate = $("input#exchange_rate").val();
		profit = $("input#airTicketProfit");
		salePrice = $("input#air_amountDue").val();
		basePrice = $("input#air-ticket-base-price").val();
		mcoAmount = $("input.airTicket_mcoAmount").val();
		mcoCredit = $(this).val();
		if($("li.list_account.profitInfor").find("span").text() == "美元") {
			//卖价人民币
			if($("span.salePrice_currency").text() == "人民币") {
				salePrice = (salePrice / exchangeRate).toFixed(2);
			}
			//底价人民币
			if($("span.basePrice_currency").text() == "人民币") {
				basePrice = (basePrice / exchangeRate).toFixed(2);
			}
			//mco金额人民币
			if($("span.mcoAmount_currency").text() == "人民币") {
				mcoAmount = (mcoAmount / exchangeRate).toFixed(2);
			}
			//mco credit
			if($("span.mcoCredit_currency").text() == "人民币") {
				mcoCredit = (mcoCredit / exchangeRate).toFixed(2);
			}

		}
		if($("li.list_account.profitInfor").find("span").text() == "人民币") {
			salePrice = $("input#air_amountDue").val();
			basePrice = $("input#air-ticket-base-price").val();
			mcoAmount = $("input.airTicket_mcoAmount").val();
			mcoCredit = $("input.mcoCreditInfo").val();
		}
		profitInfor(profit, salePrice, basePrice, mcoAmount, mcoCredit, exchangeRate);
	});
	$("input#exchange_rate").on("keyup", function() {
		profitType();
		exchangeRate = $("input#exchange_rate").val();
		profit = $("input#airTicketProfit");
		salePrice = $("input#air_amountDue").val();
		basePrice = $("input#air-ticket-base-price").val();
		mcoAmount = $("input.airTicket_mcoAmount").val();
		mcoCredit = $("input.numFormat.mcoCreditInfo").val();
		//利润单位美元:
		if($("li.list_account.profitInfor").find("span").text() == "美元") {
			//卖价人民币
			if($("span.salePrice_currency").text() == "人民币") {
				salePrice = (salePrice / exchangeRate).toFixed(2);
			}

			//底价人民币
			if($("span.basePrice_currency").text() == "人民币") {
				basePrice = (basePrice / exchangeRate).toFixed(2);
			}
			//mco金额人民币
			if($("span.mcoAmount_currency").text() == "人民币") {
				mcoAmount = (mcoAmount / exchangeRate).toFixed(2);
			}
			//mco credit
			if($("span.mcoCredit_currency").text() == "人民币") {
				mcoCredit = (mcoCredit / exchangeRate).toFixed(2);
			}
		}
		if($("li.list_account.profitInfor").find("span").text() == "人民币") {
			salePrice = $("input#air_amountDue").val();
			basePrice = $("input#air-ticket-base-price").val();
			mcoAmount = $("input.airTicket_mcoAmount").val();
			mcoCredit = $("input.numFormat.mcoCreditInfo").val();
		}
		profitInfor(profit, salePrice, basePrice, mcoAmount, mcoCredit, exchangeRate);
	});

	//卖价下拉菜单选择
	$("ul.dropdown-menu.currency_box.salePrice_currencyBox").find("li").find("a").on("click", function() {
		profitType();
		exchangeRate = $("input#exchange_rate").val();
		profit = $("input#airTicketProfit");
		salePrice = $("input#air_amountDue").val();
		basePrice = $("input#air-ticket-base-price").val();
		mcoAmount = $("input.airTicket_mcoAmount").val();
		mcoCredit = $("input.numFormat.mcoCreditInfo").val();
		if($("li.list_account.profitInfor").find("span").text() == "人民币") {
			salePrice = $("input#air_amountDue").val();
			basePrice = $("input#air-ticket-base-price").val();
			mcoAmount = $("input.airTicket_mcoAmount").val();
			mcoCredit = $("input.numFormat.mcoCreditInfo").val();
		}
		if($("span.salePrice_currency").text() == "人民币") {
			if($("li.list_account.profitInfor").find("span").text() == "美元") {
				if(exchangeRate == "") {
					alert("请输入汇率信息");
				} else {
					salePrice = (salePrice / exchangeRate).toFixed(2);
				}
			}
		}
		if($("li.list_account.profitInfor").find("span").text() == "美元") {
			if(exchangeRate == "") {
			} else {
				//底价人民币
				if($("span.basePrice_currency").text() == "人民币") {
					basePrice = (basePrice / exchangeRate).toFixed(2);
				}
				//卖价人民币
				if($("span.salePrice_currency").text() == "人民币") {
					salePrice = (salePrice / exchangeRate).toFixed(2);
				}
				//mco金额人民币
				if($("span.mcoAmount_currency").text() == "人民币") {
					mcoAmount = (mcoAmount / exchangeRate).toFixed(2);
				}
				//mco credit
				if($("span.mcoCredit_currency").text() == "人民币") {
					mcoCredit = (mcoCredit / exchangeRate).toFixed(2);
				}
			}

		}
		profitInfor(profit, salePrice, basePrice, mcoAmount, mcoCredit, exchangeRate);
	});
	//底价下拉菜单:
	$("ul.dropdown-menu.currency_box.basePrice_currencyBox").find("li").find("a").on("click", function() {
		profitType();
		exchangeRate = $("input#exchange_rate").val();
		profit = $("input#airTicketProfit");
		salePrice = $("input#air_amountDue").val();
		basePrice = $("input#air-ticket-base-price").val();
		mcoAmount = $("input.airTicket_mcoAmount").val();
		mcoCredit = $("input.numFormat.mcoCreditInfo").val();
		if($("li.list_account.profitInfor").find("span").text() == "人民币") {
			salePrice = $("input#air_amountDue").val();
			basePrice = $("input#air-ticket-base-price").val();
			mcoAmount = $("input.airTicket_mcoAmount").val();
			mcoCredit = $("input.numFormat.mcoCreditInfo").val();
		}
		if($("span.basePrice_currency").text() == "人民币") {
			if($("li.list_account.profitInfor").find("span").text() == "美元") {
				if(exchangeRate == "") {
					alert("请输入汇率信息");
				} else {
					basePrice = (basePrice / exchangeRate).toFixed(2);
				}
			}
		}
		if($("li.list_account.profitInfor").find("span").text() == "美元") {
			if(exchangeRate == "") {} else {
				//卖价人民币
				if($("span.salePrice_currency").text() == "人民币") {
					if(exchangeRate == "") {} else {
						salePrice = (salePrice / exchangeRate).toFixed(2);
						profitInfor(profit, salePrice, basePrice, mcoAmount, mcoCredit, exchangeRate);
					}
				}
				//mco金额人民币
				if($("span.mcoAmount_currency").text() == "人民币") {
					mcoAmount = (mcoAmount / exchangeRate).toFixed(2);
				}
				//mco credit
				if($("span.mcoCredit_currency").text() == "人民币") {
					mcoCredit = (mcoCredit / exchangeRate).toFixed(2);
				}
			}
		}
	});
	//mco金额下拉菜单:
	$("ul.dropdown-menu.currency_box.mcoAmount_currencyBox").find("li").find("a").on("click", function() {
		profitType();
		exchangeRate = $("input#exchange_rate").val();
		profit = $("input#airTicketProfit");
		salePrice = $("input#air_amountDue").val();
		basePrice = $("input#air-ticket-base-price").val();
		mcoAmount = $("input.airTicket_mcoAmount").val();
		mcoCredit = $("input.numFormat.mcoCreditInfo").val();
		if($("li.list_account.profitInfor").find("span").text() == "人民币") {
			salePrice = $("input#air_amountDue").val();
			basePrice = $("input#air-ticket-base-price").val();
			mcoAmount = $("input.airTicket_mcoAmount").val();
			mcoCredit = $("input.numFormat.mcoCreditInfo").val();
		}
		if($("span.mcoAmount_currency").text() == "人民币") {
			if($("li.list_account.profitInfor").find("span").text() == "美元") {
				if(exchangeRate == "") {
					alert("请输入汇率信息");
				} else {
					mcoAmount = (mcoAmount / exchangeRate).toFixed(2);
				}
			}
		}
		if($("li.list_account.profitInfor").find("span").text() == "美元") {
			if(exchangeRate == "") {
			} else {
				//卖价人民币
				if($("span.salePrice_currency").text() == "人民币") {
					salePrice = (salePrice / exchangeRate).toFixed(2);
				}
				//底价人民币
				if($("span.basePrice_currency").text() == "人民币") {
					basePrice = (basePrice / exchangeRate).toFixed(2);
				}
				//mco credit
				if($("span.mcoCredit_currency").text() == "人民币") {
					mcoCredit = (mcoCredit / exchangeRate).toFixed(2);
				}
			}
		}
		profitInfor(profit, salePrice, basePrice, mcoAmount, mcoCredit, exchangeRate);
	});
	//mcoCredit
	$("ul.dropdown-menu.currency_box.mcoCredit_currencyBox").find("li").find("a").on("click", function() {
		profitType();
		exchangeRate = $("input#exchange_rate").val();
		profit = $("input#airTicketProfit");
		salePrice = $("input#air_amountDue").val();
		basePrice = $("input#air-ticket-base-price").val();
		mcoAmount = $("input.airTicket_mcoAmount").val();
		mcoCredit = $("input.numFormat.mcoCreditInfo").val();
		if($("li.list_account.profitInfor").find("span").text() == "人民币") {
			salePrice = $("input#air_amountDue").val();
			basePrice = $("input#air-ticket-base-price").val();
			mcoAmount = $("input.airTicket_mcoAmount").val();
			mcoCredit = $("input.numFormat.mcoCreditInfo").val();
		}
		if($("span.mcoCredit_currency").text() == "人民币") {
			if($("li.list_account.profitInfor").find("span").text() == "美元") {
				if(exchangeRate == "") {
					alert("请输入汇率信息");
				} else {
					mcoCredit = (mcoCredit / exchangeRate).toFixed(2);
				}
			}
		}
		if($("li.list_account.profitInfor").find("span").text() == "美元") {
			if(exchangeRate == "") {
			}
			else {
				//卖价人民币
				if($("span.salePrice_currency").text() == "人民币") {
					salePrice = (salePrice / exchangeRate).toFixed(2);
				}
				//底价人民币
				if($("span.basePrice_currency").text() == "人民币") {
					basePrice = (basePrice / exchangeRate).toFixed(2);
				}
				//mco金额人民币
				if($("span.mcoAmount_currency").text() == "人民币") {
					mcoAmount = (mcoAmount / exchangeRate).toFixed(2);
				}
			}
		}
		profitInfor(profit, salePrice, basePrice, mcoAmount, mcoCredit, exchangeRate);
	});

	var checkNum = /^\d+(\.\d+)?$/;
	$(".payService").find("input.numFormat").on("keyup", function() {
		if(!checkNum.test($(this).val())) {
			//alert("请输入数字");
			$("input#airTicketProfit").val("");
		}
	});
}
function profitInfor(profit, salePrice, basePrice, mcoAmount, mcoCredit, exchangeRate) {
	profitType();
	//利润=卖价-底价-MCO金额+MCO Credit
	var profitTxt = salePrice - basePrice - mcoAmount + Number(mcoCredit);
	profit.val(profitTxt.toFixed(2));
}
function profitType() {
	var currencyArr = [];
	currencyArr.push($("span.salePrice_currency").text());
	currencyArr.push($("span.basePrice_currency").text());
	currencyArr.push($("span.mcoAmount_currency").text());
	currencyArr.push($("span.mcoCredit_currency").text());
	if($.inArray("美元", currencyArr) !== -1) {
		//按美元:
		$("li.list_account.profitInfor").find("span").css("visibility", "visible");
		$("li.list_account.profitInfor").find("span").text("美元");
	}
	if($.inArray("美元", currencyArr) == -1 && $.inArray("货币", currencyArr) == -1 && $.inArray("人民币", currencyArr) !== -1) {
		//按人民币:
		$("li.list_account.profitInfor").find("span").css("visibility", "visible");
		$("li.list_account.profitInfor").find("span").text("人民币");
	} else {
		//按美元:
		$("li.list_account.profitInfor").find("span").css("visibility", "visible");
		$("li.list_account.profitInfor").find("span").text("美元");
	}
}

//订单关联   s
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
		var systemNumTxt = $("ul.add-msg li.systemNum input").val();
		var listText = $("ul.add-msg div.systemNumTab li dl dd.numberInfo").text();
		var currentInputTxt = $.trim(systemNumTxt);
		var currentListTxt = $.trim(listText);

		if(currentListTxt.indexOf(currentInputTxt) == -1) {
			i++;
			// 得到关联订单的信息
			$.ajax({
				url: location.protocol.concat("//").concat(location.host).concat('/database/Business/getCollectionList.php'),
				type: 'GET',
				data: {
					collection_id: currentInputTxt
				},
				success: function(response) {
					if(response == 'Not exist transactions!') {
						alert('订单不存在!');
					} else {
						response = JSON.parse(response);

						var following_id = response['following_id'];
						if(following_id == null) {
							following_id = "";
						}

						var appendContent = `
								<li class="tab_content">
									<dl>
										<dd class="selectInfo">
											<div class="checkbox checkbox-success">
												<input class="styled" type="checkbox" checked="checked" >
												<label></label>
											</div>
										</dd>
										<dd class="numberInfo">` + response['transaction_id'] + `</dd>
										<dd class="salesInfo">` + response['salesperson_code'] + `</dd>
										<dd class="number">
											<a>` + following_id + `</a>
										</dd>
									</dl>
								</li>
							`;

						$("ul.add-msg div.systemNumTab").css("display", "block");
						$("ul.add-msg div.systemNumTab").find("li.tab_title").after(appendContent);
						$("ul.add-msg li.systemNum input").val("");
						heightRange();

						var ddCell = $("ul.add-msg div.systemNumTab li.tab_content dd");
						ddCell.on("mouseenter", function() {
							ddCell.each(function(i, item) {
								var txt = $.trim($(item).text());
								txt = txt.replace(/[\r\n]/g, "");
								$(item).attr("title", txt);
							});
						});
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log(textStatus, errorThrown);
				}
			});
		} else {
			$("ul.add-msg li.systemNum input").val("");
		}
	});
}

function radminidInfo() {
	$(document).on("click", "ul.add-msg div.systemNumTab li.tab_content dd.number a", function() {
		if($.trim($(this).text()) != "") {
			var thisLi = $(this).parent().parent().parent("li");
			if(thisLi.find("dl.unfold").css("display") == "block") {
				thisLi.find("dl.unfold").remove();
				thisLi.removeClass("current");
				heightRange();
			} else {
				var currentNum = thisLi.find("dd.numberInfo").text();
				var numInfo = $.trim($(this).text()).split(",");
				var numArr = [];
				for(var i = 0; i < numInfo.length; i++) {
					$.ajax({
						url: location.protocol.concat("//").concat(location.host).concat('/database/Business/getCollectionList.php'),
						type: 'GET',
						data: {
							collection_id: numInfo[i]
						},
						success: function(response) {
							if(response == 'Not exist transactions!') {
								alert('订单不存在!');
							} else {
								response = JSON.parse(response);

								var appendContent = `
										<dl class="unfold">
											<dd class="selectInfo">
												<div class="checkbox checkbox-success">
													<input class="styled" type="checkbox">
													<label></label>
												</div>
											</dd>
											<dd class="numberInfo">` + response['transaction_id'] + `</dd>
											<dd class="salesInfo">` + response['salesperson_code'] + `</dd>
											<dd class="number"><a></a></dd>
										</dl>
									`;

								thisLi.append(appendContent);
								heightRange();
								$("ul.add-msg div.systemNumTab li.tab_content dl.unfold dd.number a").unbind("click");
							}
						},
						error: function(jqXHR, textStatus, errorThrown) {
							console.log(textStatus, errorThrown);
						}
					});
				}
				thisLi.addClass("current");
			}
		}
	});
}
//订单关联   e
function passengerInfo() {
	$(document).on('click', '.addClients ul.clients-info li dl dd.passenger img.addInfo', function() {
		addPassenger();
	});
	$(document).on('click', '.addClients ul.clients-info li dl dd.passenger img.deleteInfo', function() {
		deletePassenger();
	});
}
//添加
function addPassenger() {
	var e = `
			<span class="new">
			<select class='passenger-info'>
				<option value='adult'>成人</option>
				<option value='youth'>青年</option>
				<option value='children'>儿童</option>
				<option value='infant'>婴儿</option>
			</select>
			<input type="text"  placeholder="姓/名" class='passenger-name'>
			<input type="text"  placeholder="票号" class='passenger-ticket-number'>
		</span>`;
	$(".addClients ul.clients-info li dl dd.passenger div").append(e);
	heightRange();
}
//删除
function deletePassenger() {
	if($(".addClients ul.clients-info li dl dd.passenger div span").length > 1) {
		$(".addClients ul.clients-info li dl dd.passenger div span").last().remove();
	}
	else {
		alert("至少含一项乘客信息");
	}
	heightRange();
}
//费率
function rateInfo() {
	$(".airticketMsg ul.add-msg li.list_account.rate a").on("mousedown", function() {
		$(this).addClass("selected");
	});
	$(".airticketMsg ul.add-msg li.list_account.rate a").on("mouseup", function() {
		$(this).removeClass("selected");
	});
	$(".airticketMsg ul.add-msg li.list_account.rate a").on("click", function() {
		profitType();
		var mcoAmount = $("input#mco-value").val(); //MCO金额
		var mcoCredit = $("input#mco-credit").val(); //MCO Credit
		var exchangeRate;
		var profit;
		var salePrice;
		var basePrice;
		if(mcoAmount == "") {
			alert("请先输入MCO金额");
		}
		else {
			$("input#mco-credit").val((Number(mcoAmount) * 0.96).toFixed(2));
			$("input#fee-ratio").val("4.00%");
		}
		mcoCredit = $("input#mco-credit").val();
		mcoAmount = $("input#mco-value").val();
		exchangeRate = $("input#exchange_rate").val();
		profit = $("input#airTicketProfit");
		salePrice = $("input#air_amountDue").val();
		basePrice = $("input#air-ticket-base-price").val();
		if($("li.list_account.profitInfor").find("span").text() == "美元") {
			//卖价人民币
			if($("span.salePrice_currency").text() == "人民币") {
				salePrice = (salePrice / exchangeRate).toFixed(2);
			}
			//底价人民币
			if($("span.basePrice_currency").text() == "人民币") {
				basePrice = (basePrice / exchangeRate).toFixed(2);
			}
		}
		if($("li.list_account.profitInfor").find("span").text() == "人民币") {
			salePrice = $("input#air_amountDue").val();
			basePrice = $("input#air-ticket-base-price").val();
			mcoAmount = $("input#mco-value").val();
			mcoCredit = $("input#mco-credit").val();
		}
		profitInfor(profit, salePrice, basePrice, mcoAmount, mcoCredit, exchangeRate);

	})
}
//利润的显示
function showProfitBox() {
	$(".payService").find("input").on("keyup", function() {
		var salePrice = $("input#air_amountDue").val();
		var basePrice = $("input#air-ticket-base-price").val();
		if(salePrice == "" || basePrice == "") {
			$("li.list_account.profitInfor").css("display", "none");
		} else {
			$("li.list_account.profitInfor").css("display", "block");
		}
	});
}
