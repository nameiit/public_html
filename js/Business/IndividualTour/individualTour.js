$(function() {
	//-按客户
	//总卖价
	indivTourDiscount($("#indivDiscountText"), $("#indivDiscountNotice"), $("#indivDiscountApply"), $("#indivSubtractNum"), $("#indivDiscountOption"), $("#indivDiscountTextCurrency"));
	indivTourDiscount($("#edit_indivTour_DiscountText"), $("#edit_indivTourDiscountNotice"), $("#edit_indivDiscountApply"), $("#edit_indivTourSubtractNum"), $("#edit_indivDiscountOption"), $("#edit_indiv-discountText-currency"));
	addClients();
	sendFormMsg();
	client_check(); //客户信息验证
	indivTourDiscount($("#indiv-discountText"), $("#indiv-discountNotice"), $("#indiv-discountApply"), $("#indiv-subtractNum"), $("#indiv-discountOption"), $("#indiv-discountText-currency"));

	paymentMethod();
	priceCalculate();
	getCalculateProfitInfo();

	ItineraryInfo();
	$("div.notesInfor").on("keyup", function() {
		heightRange();
	});
	ordersAssociated();
	radminidInfo();
	destinationInfo();
	showProfitBox();
	rateInfo();
	fullMcoPayment();
	partCreditCard();
	$("ul.add-msg li.list_cost a").on("mousedown", function() {
		$(this).addClass("selected");
	});
	$("ul.add-msg li.list_cost a").on("mouseup", function() {
		$(this).removeClass("selected");
	});
	$(".addClients ul.clients-info li dl dd.list_cost a").on("mousedown", function() {
		$(this).addClass("selected");
	});
	$(".addClients ul.clients-info li dl dd.list_cost a").on("mouseup", function() {
		$(this).removeClass("selected");
	});

	//折扣-折扣金额
	$("ul.add-msg li.discountCard dl.discountOption dd").on("click", function() {
		if($.trim($(this).text()) == "折扣码") {
			$(this).parent("dl").parent("li").find("dl.exchange").find("dd.discount-text").removeClass("list-currency");
			$("ul.add-msg li.discountCard dl.exchange dd.discount-text select").css("display", "none");
		}
		if($.trim($(this).text()) == "折扣金额") {
			$(this).parent("dl").parent("li").find("dl.exchange").find("dd.discount-text").addClass("list-currency");
			$("ul.add-msg li.discountCard dl.exchange dd.discount-text select").css("display", "inline-block");
		}
	});
	$(".addClients.editcustomerInfo ul.add-msg li.discountCard dl.discountOption dd").on("click", function() {
		if($.trim($(this).text()) == "折扣码") {
			$(this).parent("dl").parent("li").find("dl.exchange").find("dd.discount-text").removeClass("list-currency");
			$("ul.add-msg li.discountCard dl.exchange dd.discount-text select").css("display", "none");
		}
		if($.trim($(this).text()) == "折扣金额") {
			$(this).parent("dl").parent("li").find("dl.exchange").find("dd.discount-text").addClass("list-currency");
			$("ul.add-msg li.discountCard dl.exchange dd.discount-text select").css("display", "inline-block");
		}
	});
});

//散拼团的js
//散拼团表单提交
function sendFormMsg() {
	function getData() {
		var payment_area = $("#payment-area")[0].innerHTML == '中国' ? 'CN' : 'US';
		var sell_price_currency = $("#sell-price-currency")[0].innerHTML == '美元' ? 'USD' : 'RMB';
		var base_price_currency = $("#base-price-currency")[0].innerHTML == '美元' ? 'USD' : 'RMB';
		var payment_type = $("#indiv-tour-payment-type")[0].innerText;
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
		} else if(payment_type == '供应商全额刷卡') {
			payment_type = 'wholesalerall';
		} else if(payment_type == '供应商部分刷卡+支票') {
			payment_type = 'wholesalercheck';
		} else if(payment_type == '供应商部分刷卡+现金') {
			payment_type = 'wholesalercash';
		} else if(payment_type == '供应商部分刷卡+支付宝') {
			payment_type = 'wholesaleralipay';
		} else if(payment_type == '供应商部分刷卡+微信支付') {
			payment_type = 'wholesalerwechat';
		} else if(payment_type == '供应商部分刷卡+REMIT') {
			payment_type = 'wholesalerremit';
		} else if(payment_type == '供应商部分刷卡+额外MCO') {
			payment_type = 'wholesalermco';
		} else if(payment_type == '全额MCO') {
			payment_type = 'mcoall';
		}
		var profit = $("#indiv-profit").val();
		var profit_currency = $("#profit-currency")[0].innerText == '美元' ? 'USD' : 'RMB';

		var data = {
			indiv_tour_id: $("#indiv_tour_id").val(),
			indiv_salesperson: $("#indiv_salesperson").val(),
			indiv_tour_name: $("#indiv_tour_name").val(),
			indiv_wholesaler: $("#indiv_wholesaler").val(),
			invoice: $("#invoice").val(),
			indiv_source: $("#indiv_source").val(),
			indiv_note: $("#indiv_note").val(),

			us_class: $("#us-class").val(),
			first_class: $("#first-class").val(),
			second_class: $("#second-class").val(),
			third_class: $("#third-class").val(),
			indiv_startTime: $("#indiv_startTime").val(),
			indiv_endTime: $("#indiv_endTime").val(),
			indiv_num_days: $("#indiv_num_days").val(),

			indiv_exchange_rate: $("#indiv_exchange_rate").val(),
			payment_area: payment_area,
			indiv_sell_price: $("#indiv_sale_price").val(),
			indiv_sell_price_currency: sell_price_currency,
			indiv_base_price: $("#indiv_base_price").val(),
			indiv_base_price_currency: base_price_currency,
			payment_type: payment_type,
			profit: profit,
			profit_currency: profit_currency,

			fname: $("#indivFirstName").val(),
			lname: $("#indivLastName").val(),
			phone: $("#indivClientTel").val(),
			otherContactWay: $("#indivOtherContact").val(),
			otherContactInfo: $("#indivOtherContactNumber").val(),
			birthday: $("#indivBirthday").val(),
			gender: $("#indivGender").val(),
			email: $("#indivClientEmail").val(),
			zipcode: $("#indivZipCode").val(),
		};

		if (payment_type == 'wholesalermco' || payment_type == 'mcoall') {
			var mco_party = $("#mco-party")[0].innerHTML;
			var face_value = $("#face-value").val();
			var face_currency = $("#face-currency")[0].innerHTML == '美元' ? 'USD' : 'RMB';
			var mco_value = $("#mco-value").val();
			var mco_currency = $("#mco-currency")[0].innerHTML == '美元' ? 'USD' : 'RMB';
			var mco_credit = $("#mco-credit").val();
			var mco_credit_currency = $("#mco-credit-currency")[0].innerHTML == '美元' ? 'USD' : 'RMB';
			var fee_ratio = $("#fee-ratio").val();

			var card_number = $("#card-number").val();
			var expired_date_month = $("#expired-date-month").val();
			var expired_date_year = $("#expired-date-year").val();
			var card_holder = $("#card-holder").val();
			var mco_receiver = $("#mco-receiver").val();

			Object.assign(data, {
				mco_party: mco_party,
				face_value: face_value,
				face_currency: face_currency,
				mco_value: mco_value,
				mco_currency: mco_currency,
				mco_credit: mco_credit,
				mco_credit_currency: mco_credit_currency,
				fee_ratio: fee_ratio,
				card_number: card_number,
				expired_date_month: expired_date_month,
				expired_date_year: expired_date_year,
				card_holder: card_holder,
				mco_receiver: mco_receiver
			});
		} else if (payment_type == 'wholesalercheck' ||
							 payment_type == 'wholesalercash' ||
							 payment_type == 'wholesaleralipay' ||
							 payment_type == 'wholesalerwechat' ||
							 payment_type == 'wholesalerremit') {
			data['cc_amount'] = $("#wholesaler-charge-amount").val();
			data['noncc_amount'] = $("#mco-charge-amount").val();
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
		$("#indivDiscountNotice").addClass("nm-hide");
		$('#createIndivTourForm').trigger("reset"); //重置表单
		$("li.customerInfo").remove();
		$("#customerInfoArea").hide();
		$("#customerInfoArea .updateInfo").hide();
		$("#customerInfoAreaDivider").hide();
		var leftHeight = $(".navInfo ul").height()
		var rightHeight = $(".theamInfo").height();
		if(rightHeight < leftHeight) {
			$(this).blur();
			$(".navInfo ul").css("height", rightHeight);
		}
	}

	$("#individualTourCreateActionConfirm").on('click', function() {
		var inputData = getData();
		console.log(inputData);

		var url = location.protocol.concat("//").concat(location.host).concat('/database/Business/IndividualTour/IndividualTourCreate.php');
		$.ajax({
			url: url,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			type: 'POST',
			data: inputData,
			success: function(response) {
				console.log(response);
				resetInputForm();
				$(".individualtourCreateConfirmBox").css("display", "none");
				$(".individualtourCreateSuccessBox").css("display", "block");
				$(".individualtourCreateSuccessBox p.confirmNotice").text("提交成功");
				$(".individualtourCreateSuccessBox p.confirmNotice").find("img").attr("src", "../img/userConfirm.png");
				$(".individualtourCreateSuccessBox p.actionBox").find(".actionConfirm").text("知道了");
				$(".individualtourCreateSuccessBox p.actionBox").find(".actionConfirm").css({
					"width": "100%",
					"border-bottom-right-radius": "7px",
					"border": "0px"
				});
				$(".individualtourCreateSuccessBox p.actionBox").find(".actionCancel").css("display", "none");

				$("span#indiv-tour-payment-type").text("支付方式");
				$("ul.add-msg .mcoList").css("display", "none");
				$("ul.add-msg .mcoList").find("input").val("");
				$("span.currency_txt").text("美元");

				$("ul.add-msg div.systemNumTab").css("display", "none");
				$("ul.add-msg div.systemNumTab").find("li.tab_content").remove();
				$(".addClients ul.clients-info li dl dd input").val("");
				//重置：
				$(".creditCardInfo").find("input").val("");
				$(".creditCardInfo").find("select").prop('selectedIndex', 0);
				$(".creditCardInfo").css("display", "none");

				$("span#indiv-tour-payment-type").text("支付方式");
				$("span#mco-party").text("");
				$(".mcoList").css("display", "none");

			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
	});

	$("#individualTourCreateActionCancel").on('click', function() {
		$(".individualtourCreateConfirmBox").css("display", "none");
	});
	$("#individualtourCreateSuccessConfirm").on('click', function() {
		$(".individualtourCreateSuccessBox").css("display", "none");
	});
}

//添加客户
function addClients() {
	$("#indivOtherContact").on('change', function() {
		$("#indivOtherContactLabel").text($("#indivOtherContact").val() + "帐号");
	});
	$(".newClients").on("click", function() {
		$(".newClientsMsg").css({
			"display": "block",
			"margin-top": "20px",
			"padding-top": "10px",
			"border-top": "dashed 1px #d2d2d2"
		});
		var leftHeight = $(".navInfo ul").height()
		var rightHeight = $(".theamInfo").height();
		if(rightHeight > leftHeight) {
			$(this).blur();
			$(".navInfo ul").css("height", rightHeight);
		}
		if(rightHeight < leftHeight) {
			$(this).blur();
			$(".navInfo ul").css("height", rightHeight);
		}
	});
	$("input#indivClientTel").on("keypress", function() {
		var telMsg = $.trim($("#indivClientTel").val());
		if(telMsg !== "") {
			$("select#indivOtherContact").parent("dd").removeClass("requiredItem");
			$("input#indivOtherContactNumber").parent("dd").removeClass("requiredItem");
			$("#indivClientTel").parent("dd").addClass("requiredItem");
		}
	});

	$("#indivTourCancel").on("click", function() {
		$('.addCustomerArea').empty();
		$('#createIndivTourForm').trigger('reset');
		resetCustomerForm();
		$("#indivDiscountNotice").addClass("nm-hide");
		$("li.customerInfo").remove();
		$("#customerInfoArea").hide();
		$("#customerInfoArea .updateInfo").hide();
		$("#customerInfoAreaDivider").hide();

		//输入信用卡
		$(".creditCardInfo").find("input").val("");
		$(".creditCardInfo").find("select").prop('selectedIndex', 0);
		$(".creditCardInfo").css("display", "none");

		$("span#indiv-tour-payment-type").text("支付方式");
		$("span#mco-party").text("");
		$(".mcoList").css("display", "none");

		var leftHeight = $(".navInfo ul").height()
		var rightHeight = $(".theamInfo").height();
		if(rightHeight < leftHeight) {
			$(".navInfo ul").css("height", rightHeight);
		}
	});
	$("#indiv_startTime").on("change", function() {
		$("#joinDate").val($(this).val());
	});
	$("#indiv_endTime").on("change", function() {
		$("#leaveDate").val($(this).val());
	});
	$("#otherContact").on("change", function() {
		$("#otherContactLabel").text($(this).val() + "帐号");
	});
	$("#edit-otherContact").on("change", function() {
		$("#edit-otherContactLabel").text($(this).val() + "帐号");
	});
}

//客户信息验证
function client_check() {
	//电话验证
	$("#clientTel").on('change', function() {
		var reg = /^(?:\(?[0\+]?\d{1,3}\)?)[\s-]?(?:0|\d{1,4})[\s-]?(?:(?:13\d{9})|(?:\d{7,8}))$/;
		if($(this).val().search(reg) == -1) {
			alert("电话号码格式不正确");
			$(this).addClass("error");
			$(this).focus();
		} else {
			$(this).blur();
			$(this).removeClass("error");
			$(this).next("input").focus();
		}
		return true;
	});

	//邮箱验证
	$("#clientEmail").on('change', function() {
		var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
		if($(this).val().search(reg) == -1) {
			$(this).addClass("error");
			$(this).focus();
			alert("邮箱格式不正确");
		} else {
			$(this).blur();
			$(this).removeClass("error");
			$(this).next("input").focus();
		}
		return true;
	});

	//生日验证
	$("#birthday").on('change', function() {
		var reg = /^[\d]{4}[-\ ][\d]{1,2}[-\ ][\d]{1,2}$/;
		if($(this).val().search(reg) == -1) {
			alert("邮箱格式不正确,请参考1995-10-11格式填写");
			$(this).addClass("error");
			$(this).focus();
		} else {
			$(this).blur();
			$(this).removeClass("error");
			$(this).next("input").focus();
		}
		return true;
	});

	//邮政编码验证
	$("#zipCode").on('change', function() {
		var reg = /^[0-9][0-9]{5}$/;
		if($(this).val().search(reg) == -1) {
			alert("邮政编码格式不正确,请参考712000格式填写");
			$(this).addClass("error");
			$(this).focus();
		} else {
			$(this).blur();
			$(this).removeClass("error");
			$(this).next("input").focus();
		}
		return true;
	});
}

function checkedCell() {
	$(".bms-tab").find("ul.accountRecordMsg").find("li").click(function() {
		$(this).addClass("accounting-active").siblings().removeClass("accounting-active");
	});
}

function resetCustomerForm() {
	$("#indivLastName").val("");
	$("#indivFirstName").val("");
	$("#indivClientEmail").val("");
	$("#indivClientTel").val("");
	$("#indivOtherContact").val("WeChat");
	$("#indivOtherContactLabel").text("WeChat帐号");
	$("#indivOtherContactNumber").val("");
	$("#indivBirthday").val("");
	$("#indivGender").val("M");
	$("#indivZipCode").val("");
	$("#indivJoinDate").val("");
	$("#indivJoinLocation").val("");
	$("#indivLeaveDate").val("");
	$("#indivLeaveLocation").val("");
	$("#indivClientTel").parent("dd").removeClass("requiredItem");
	$("select#indivOtherContact").parent("dd").removeClass("requiredItem");
	$("input#indivOtherContactNumber").parent("dd").removeClass("requiredItem");
	$(".addClients ul.clients-info li dl dd.list_currency input[type='text']").val("");
	$(".addClients ul.clients-info li dl dd.list_cost input[type='text']").val("");
}

$(document).ready(function() {
	$("#indiv_salesperson, #indiv_wholesaler, #indiv_source, #mco-receiver").on('focus', function() {
		var current_id = $(this).attr('id');
		var target = "";
		if(current_id == 'indiv_salesperson') {
			target = 'salesperson';
		} else if (current_id == 'indiv_source') {
			target = 'source';
		} else if (current_id == 'indiv_wholesaler') {
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

	//确认/重置选中状态
	$(".updateInfo ul.filterBox  li  dl.confirmMsg dd ").find("a").on("mousedown", function() {
		$(this).addClass("confirm-active");
	});
	$(".updateInfo ul.filterBox  li  dl.confirmMsg dd ").find("a").on("mouseup", function() {
		$(this).removeClass("confirm-active");
	});
	$("#indivTourSubmit").unbind("click").on("click", function() {
		if(!VerifyRequiredItems()) {
			return false;
		} else {
			$(".individualtourCreateConfirmBox").css("display", "block");
			$(".individualtourCreateConfirmBox").removeClass("nm-hide");
		}
	});

	//	VerifyRequiredItems();
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
	if($.trim($("span#indiv-tour-payment-type").text()) == "支付方式") {
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

//折扣
function indivTourDiscount(discountText, discountNotice, discountApply, subtractNum, discountOption, coupon_currency) {
	heightRange();
	discountOption.find("dd").on("click", function() {
		$(this).addClass("option-active").siblings().removeClass("option-active");
	});
	discountApply.unbind("click").on("click", function() {
		//选中折扣金额
		if(discountOption.find("dd.coupon").hasClass("option-active")) {
			$("#indiv-discountText").addClass("numFormat");
			var reg = /^\d+(\.\d{1,2})?$/;
			if(discountText.val() == "" || !reg.test(discountText.val())) {
				discountNotice.css("cssText", "display:none !important");
				alert('请输入正确的折扣金额');
			} else {
				discountNotice.css("cssText", "display:inline-block !important");
				subtractNum.text('优惠金额: ' + discountText.val() + ' ' + coupon_currency.val());
				heightRange();
			}
		}
		//选中折扣码
		else {
			$("#indiv-discountText").removeClass("numFormat");
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
						discountNotice.css("cssText", "display:none !important");
					} else if(response == 'Expired') {
						discountNotice.css("cssText", "display:inline-block !important");
						subtractNum.text('该折扣码已过期');
					} else {
						discountNotice.css("cssText", "display:inline-block !important");
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

//手续费,实际金额
function calculateCharge() {
	//按总卖价：
	$("ul.add-msg li.list_cost a").on("click", function() {
		if($("input#indiv_sale_price").val() == "") {
			alert("请确认应收金额已经填写");
		} else {
			var amountCollected = Number($("input#indiv_sale_price").val()); //应收金额
			//手续费
			//手续费 = 应收金额*0.04
			$("ul.add-msg li.list_cost a").parent("li").find("input").val(Number(amountCollected * 0.04).toFixed(2));
			var charge = $("ul.add-msg li.list_cost a").parent("li").find("input").val();
			//实际金额 =应收金额-手续费
			$("ul.add-msg li.actualAmount").find("input").val(Number(amountCollected - charge).toFixed(2));
		}
	});

	//按总卖价
	$("ul.add-msg li.list_currency").find("input#indiv_sale_price").on('keyup', function() {
		var amountCollected = $(this).val(); //总应收金额
		$("ul.add-msg li.list_cost").find("input").val(0);
		$("ul.add-msg li.actualAmount").find("input").val(amountCollected);
	});
}

//按总卖价
function getPriceInfoByTotalPrice() {
	$("ul.add-msg li.list_account.calculateProfit a#calculateBtnByTotalPrice").on("click", function() {
		var exchangeRate = $("input#indiv_exchange_rate").val(); //汇率
		var profit = $("input#indiv-profit"); //利润
		var basePrice = $("input#indiv_base_price").val(); //底价
		//		var salePrice = $("input#indiv_sale_price").val(); //总卖价
		var salePrice = $("ul.add-msg li.actualAmount").find("input").val(); //实际金额
		var discount; //折扣
		if(exchangeRate == "") {
			alert("请确认汇率信息已填写");
		} else {
			//底价
			if(basePrice == "") {
				basePrice = 0;
			} else {
				basePrice = $("input#indiv_base_price").val();
			}
			//卖价
			if(salePrice == "") {
				salePrice = 0;
			} else {
				salePrice = $("ul.add-msg li.actualAmount").find("input").val();
			}
			//折扣
			if($("ul.add-msg li.discountCard dl.discountNotice").css("display") == "none") {
				discount = 0;
			} else {
				if($("span#indiv-subtractNum").text().split(':')[1].split(" ")[2] == "USD") {
					discount = $("span#indiv-subtractNum").text().split(':')[1].split(" ")[1];
				}
				if($("span#indiv-subtractNum").text().split(':')[1].split(" ")[2] == "RMB") {
					discount = ($("span#indiv-subtractNum").text().split(':')[1].split(" ")[1] / exchangeRate).toFixed(2);
				}
			}
			profitCalculateByTotalPrice(basePrice, salePrice, discount, profit, exchangeRate);
		}
	});
}

function profitCalculateByTotalPrice(basePrice, salePrice, discount, profit, exchangeRate) {
	//销售价-底价-折扣=利润
	var profitText = salePrice - basePrice - discount;
	profit.val(profitText.toFixed(2));
	profit.parent().find("span").text("美元");
	if($("select#indiv_base_price_currency").val() == "USD" && $("select#indiv_sell_price_currency").val() == "USD") {
		profit.val(profitText.toFixed(2));
		profit.parent().find("span").text("美元");
	}
	if($("select#indiv_base_price_currency").val() == "RMB" && $("select#indiv_sell_price_currency").val() == "USD") {
		basePrice = (basePrice / exchangeRate).toFixed(2);
		profitText = salePrice - basePrice - discount;
		profit.val(profitText.toFixed(2));
		profit.parent().find("span").text("美元");
	}
	if($("select#indiv_base_price_currency").val() == "USD" && $("select#indiv_sell_price_currency").val() == "RMB") {
		salePrice = (salePrice / exchangeRate).toFixed(2);
		profitText = salePrice - basePrice - discount;
		profit.val(profitText.toFixed(2));
		profit.parent().find("span").text("美元");
	}
	if($("select#indiv_base_price_currency").val() == "RMB" && $("select#indiv_sell_price_currency").val() == "RMB") {
		salePrice = (salePrice / exchangeRate).toFixed(2);
		basePrice = (basePrice / exchangeRate).toFixed(2);
		profitText = salePrice - basePrice - discount;
		profit.val(profitText.toFixed(2));
		profit.parent().find("span").text("美元");
	}
}

//销售价-折扣
function getTotalPriceInfo() {
	//利率
	var exchangeRate = $("input#indiv_exchange_rate").val();
	//实际支付
	var actualPayment = $("dd.display-customer-actual.paymentactual");
	var currentProfit = 0;
	var totalProfit = 0;
	actualPayment.each(function(i, item) {
		//美元
		if($(item).text().indexOf("USD") !== -1) {
			currentProfit = $(item).text().split("USD")[1].split("(")[0];
		}
		//人民币
		if($(item).text().indexOf("RMB") !== -1) {
			currentProfit = (Number($(item).text().split("RMB")[1].split("(")[0]) / exchangeRate).toFixed(2);
		}
		totalProfit = totalProfit + Number(currentProfit);
	});
	return totalProfit;
}

//支付信息部分  s
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
		}
		if($.trim(currentArea.text()) == "中国") {
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
			if($.trim($(item).text()) == "人民币") {
				num++;
			}
			currencyArr.push($.trim($(item).text()));
		});
		if(($.inArray("人民币", currencyArr) !== -1) && num < len) {
			$("ul.add-msg li.exchangeRate").addClass("requiredItem");
		} else {
			$("ul.add-msg li.exchangeRate").removeClass("requiredItem");
		}
	});
	//支付方式
	$(".payService ul li .payment").find(".paymentMethod").find("ul.dropdown-menu.methodList").find("li").find("a").on("click", function() {
		$(".payService ul li .payment").find(".paymentMethod").find("ul.dropdown-menu.methodList").css("min-width", "initial");
		$(".payService ul li .payment").find(".paymentMethod").find("ul.dropdown-menu.methodList").css("width", "40%");
		$(".payService ul li .payment").find("ul.dropdown-menu.creditCardPayment").css("width", "200%");
		$(".payService ul li .payment").find("ul.dropdown-menu.drop3Menu").css("width", "120px");
		$(".payService ul li .payment").find("ul.dropdown-menu.drop3Menu").css("min-width", "initial");
		$(".partCreditCard").css("display", "none");
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

		$("input#face-value").val("");
		$("input#mco-value").val("");
		$("input#mco-credit").val("");
		$("input#fee-ratio").val("");
		$("span#mco-party").text("");

		$("span.mcoAmount_currency").text("美元");
		$("span.mcoCredit_currency").text("美元");
		$("span.faceValue_currency").text("美元");

		//输入信用卡
		$(".creditCardInfo").find("input").val("");
		$(".creditCardInfo").find("select").prop('selectedIndex', 0);
		$(".creditCardInfo").css("display", "none");
	}
	//刷卡支付
	$(".payService ul li .payment").find(".paymentMethod").find("ul.dropdown-menu.creditCardPayment").find("li").find("a").on("click", function() {
		var payment_type = $(".payService ul li .payment").find(".paymentMethod").find("button.btn").find("span.txt");
		payment_type.text($(this).text());
		$("ul.add-msg li.payment-type.paymentMethodInfo div.payment").removeClass("error");
		$("ul.add-msg li.payment-type.paymentMethodInfo div.payment").find(".btn-default").css("border", "solid 1px #969696");
		//信用卡和MCO支付
		if(($.trim(payment_type.text()) == "供应商部分刷卡+额外MCO") || ($.trim(payment_type.text()) == "全额MCO")) {
			$(".mcoList").css("display", "block");
			$("input#face-value").removeClass("notRequired");
			$("input#mco-value").removeClass("notRequired");
			$("input#mco-credit").removeClass("notRequired");
			$("input#card-number").removeClass("notRequired");
			$("input#card-holder").removeClass("notRequired");
			$("input#mco-receiver").removeClass("notRequired");
			$("ul.add-msg li.list_account.profitInfor a").css("visibility", "visible");
			$(".creditCardInfo").css("display", "block");
		} else {
			$(".mcoList").css("display", "none");
			$("input#face-value").addClass("notRequired");
			$("input#mco-value").addClass("notRequired");
			$("input#mco-credit").addClass("notRequired");
			$("input#card-number").addClass("notRequired");
			$("input#card-holder").addClass("notRequired");
			$("input#mco-receiver").addClass("notRequired");
			$("ul.add-msg li.list_account.profitInfor a").css("visibility", "hidden");

			$("input#face-value").val("");
			$("input#mco-value").val("");
			$("input#mco-credit").val("");
			$("input#fee-ratio").val("");
			$("span#mco-party").text("");

			$("span.mcoAmount_currency").text("美元");
			$("span.mcoCredit_currency").text("美元");
			$("span.faceValue_currency").text("美元");

			$(".creditCardInfo").find("input").val("");
			$(".creditCardInfo").find("select").prop('selectedIndex', 0);
			$(".creditCardInfo").css("display", "none");
		}
		heightRange();
		$(".partCreditCard").css("display", "none");
		$("input.non-creditCardAmount").val("");
		$("input.creditCardAmount").val("");
	});

	//非刷卡支付
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

		$("span.mcoAmount_currency").text("美元");
		$("span.mcoCredit_currency").text("美元");
		$("span.faceValue_currency").text("美元");

		$("input#face-value").val("");
		$("input#mco-value").val("");
		$("input#mco-credit").val("");
		$("input#fee-ratio").val("");
		$("span#mco-party").text("");

		//输入信用卡
		$(".creditCardInfo").find("input").val("");
		$(".creditCardInfo").find("select").prop('selectedIndex', 0);
		$(".creditCardInfo").css("display", "none");
		$(".partCreditCard").css("display", "none");
		$("input.non-creditCardAmount").val("");
		$("input.creditCardAmount").val("");
	});
	//供应商部分刷卡+非刷卡支付
	$(".payService ul li .payment").find(".paymentMethod").find("ul.dropdown-menu.drop3Menu").find("li").find("a").unbind("click").on("click", function() {
		var payment_type=$(".payService ul li .payment").find(".paymentMethod").find("button.btn").find("span.txt");
		var payment_txt = "供应商部分刷卡+" + $.trim($(this).text());
		$("span#indiv-tour-payment-type").text(payment_txt);
		console.log(payment_txt);
		$(".mcoList").css("display", "none");
		$(".partCreditCard").css("display", "block");



	});
	//刷卡公司
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
	salePrice = $("input.indiv_sellPrice").val();
	faceValue = $("input.indiv_faceValue").val();
	mcoAmount = $("input.indiv_mcoAmount").val();
	$("input.indiv_faceValue").trigger("change");
	//票面
	$("input.indiv_faceValue").on("keyup", function() {
		salePrice = $("input.indiv_sellPrice").val();
		faceValue = $(this).val();
		mcoAmount = $("input.indiv_mcoAmount").val();
		if(salePrice !== "") {
			mcoAmountCalculate($("input.indiv_mcoAmount"), salePrice, faceValue);
		}
	});
	//mco金额
	$("input.indiv_mcoAmount").on("keyup", function() {
		salePrice = $("input.indiv_sellPrice").val();
		faceValue = $("input.indiv_faceValue").val();
		mcoAmount = $(this).val();
		if(salePrice !== "") {
			faceValueCalculate($("input.indiv_faceValue"), mcoAmount, salePrice);
		}
	});
	//卖价
	$("input.indiv_sellPrice").on("keyup", function() {
		salePrice = $(this).val();
		faceValue = $("input.indiv_faceValue").val();
		mcoAmount = $("input.indiv_mcoAmount").val();
		if(faceValue !== "") {
			mcoAmountCalculate($("input.indiv_mcoAmount"), salePrice, faceValue);
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
	$("input.indiv_mcoAmount").on("keyup", function() {
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
		mcoAmount = $("input.indiv_mcoAmount").val();
		if(mcoAmount !== "") {
			mcoCreditCalculate($("input.mcoCreditInfo"), mcoAmount, rateInfo);
		}
	});
	//Mco Credit:
	$("input.mcoCreditInfo").on("keyup", function() {
		rateInfo = $("input.rateInfo").val();
		mcoCreditInfo = $(this).val();
		mcoAmount = $("input.indiv_mcoAmount").val();
		if(mcoAmount !== "") {
			rateInfoCalculate($("input.rateInfo"), mcoAmount, mcoCreditInfo);
		}
	});
}

//mco金额:
function mcoAmountCalculate(mcoAmountBox, salePrice, faceValue) {
	var exchangeRate = $("input#indiv_exchange_rate").val();
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

//卖价:
function sellPriceCalculate(sellPriceBox, mcoAmount, faceValue) {
	var exchangeRate = $("input#indiv_exchange_rate").val();
	var sellPriceInfo = Number(Number(faceValue) + Number(mcoAmount)).toFixed(2);
	sellPriceBox.val(sellPriceInfo);

	var faceValueType = $.trim($("span.txt.currency_txt.faceValue_currency").text());
	var mcoAmountType = $.trim($("span.txt.currency_txt.mcoAmount_currency").text());

	if(faceValueType == "美元" && mcoAmount == "美元") {
		$("span.txt.currency_txt.salePrice_currency").text("美元");
	}
	if(faceValueType == "人民币" && mcoAmount == "人民币") {
		$("span.txt.currency_txt.salePrice_currency").text("人民币");
	}
	if(faceValueType == "人民币" && mcoAmount == "美元") {
		$("span.txt.currency_txt.salePrice_currency").text("美元");
		faceValue = (faceValue / exchangeRate).toFixed(2);
		sellPriceInfo = Number(Number(faceValue) + Number(mcoAmount)).toFixed(2);
		sellPriceBox.val(sellPriceInfo);
	}
	if(faceValueType == "美元" && mcoAmount == "人民币") {
		$("span.txt.currency_txt.salePrice_currency").text("美元");
		mcoAmount = (mcoAmount / exchangeRate).toFixed(2);
		sellPriceInfo = Number(Number(faceValue) + Number(mcoAmount)).toFixed(2);
		sellPriceBox.val(sellPriceInfo);
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

//function mcoAmountCalculate2(mcoAmountBox, mcoCreditInfo, rateInfo) {
//	//MCO金额=MCO Credit/(1-费率);
//	var mcoAmountTxt = (Number(mcoCreditInfo / (1 - rateInfo))).toFixed(2);
//	mcoAmountBox.val(mcoAmountTxt);
//}

//利润
function getCalculateProfitInfo() {
	//利润=卖价-底价-MCO金额+MCO Credit
	var exchangeRate = $("input#indiv_exchange_rate").val();
	var profit;
	var salePrice;
	var basePrice;
	var mcoAmount;
	var mcoCredit;
	var profit = $("input#indiv-profit");
	var salePrice = $("input#indiv_sale_price").val();
	var basePrice = $("input#indiv_base_price").val();
	var mcoAmount = $("input.indiv_mcoAmount").val();
	var mcoCredit = $("input.mcoCreditInfo").val();
	//卖价
	$("input#indiv_sale_price").on("keyup", function() {
		profitType();
		exchangeRate = $("input#indiv_exchange_rate").val();
		profit = $("input#indiv-profit");
		salePrice = $(this).val();
		basePrice = $("input#indiv_base_price").val();
		mcoAmount = $("input.indiv_mcoAmount").val();
		mcoCredit = $("input.mcoCreditInfo").val();
		if($.trim($("li.list_account.profitInfor").find("span").text()) == "美元") {
			//卖价人民币
			if($.trim($("span.salePrice_currency").text()) == "人民币") {
				salePrice = (salePrice / exchangeRate).toFixed(2);
			}
			//底价人民币
			if($.trim($("span.basePrice_currency").text()) == "人民币") {
				basePrice = (basePrice / exchangeRate).toFixed(2);
			}
			//mco金额人民币
			if($.trim($("span.mcoAmount_currency").text()) == "人民币") {
				mcoAmount = (mcoAmount / exchangeRate).toFixed(2);

			}
			//mco credit
			if($.trim($("span.mcoCredit_currency").text()) == "人民币") {
				mcoCredit = (mcoCredit / exchangeRate).toFixed(2);
			}

		}
		if($.trim($("li.list_account.profitInfor").find("span").text()) == "人民币") {
			salePrice = $("input#indiv_sale_price").val();
			basePrice = $("input#indiv_base_price").val();
			mcoAmount = $("input.indiv_mcoAmount").val();
			mcoCredit = $("input.mcoCreditInfo").val();
		}
		profitInfor(profit, salePrice, basePrice, mcoAmount, mcoCredit, exchangeRate);
	});
	//底价
	$("input#indiv_base_price").on("keyup", function() {
		profitType();
		exchangeRate = $("input#indiv_exchange_rate").val();
		profit = $("input#indiv-profit");
		salePrice = $("input#indiv_sale_price").val();
		basePrice = $(this).val();
		mcoAmount = $("input.indiv_mcoAmount").val();
		mcoCredit = $("input.mcoCreditInfo").val();
		if($.trim($("li.list_account.profitInfor").find("span").text()) == "美元") {
			//卖价人民币
			if($.trim($("span.salePrice_currency").text()) == "人民币") {
				salePrice = (salePrice / exchangeRate).toFixed(2);
			}
			//底价人民币
			if($.trim($("span.basePrice_currency").text()) == "人民币") {
				basePrice = (basePrice / exchangeRate).toFixed(2);
			}
			//mco金额人民币
			if($.trim($("span.mcoAmount_currency").text()) == "人民币") {
				mcoAmount = (mcoAmount / exchangeRate).toFixed(2);

			}
			//mco credit
			if($.trim($("span.mcoCredit_currency").text()) == "人民币") {
				mcoCredit = (mcoCredit / exchangeRate).toFixed(2);
			}
		}
		if($.trim($("li.list_account.profitInfor").find("span").text()) == "人民币") {
			salePrice = $("input#indiv_sale_price").val();
			basePrice = $("input#indiv_base_price").val();
			mcoAmount = $("input.indiv_mcoAmount").val();
			mcoCredit = $("input.mcoCreditInfo").val();
		}
		profitInfor(profit, salePrice, basePrice, mcoAmount, mcoCredit, exchangeRate);
	});
	//mco金额
	$("input.indiv_mcoAmount").on("keyup", function() {
		profitType();
		exchangeRate = $("input#indiv_exchange_rate").val();
		profit = $("input#indiv-profit");
		salePrice = $("input#indiv_sale_price").val();
		basePrice = $("input#indiv_base_price").val();
		mcoAmount = $(this).val();
		mcoCredit = $("input.mcoCreditInfo").val();
		if($.trim($("li.list_account.profitInfor").find("span").text()) == "美元") {
			//卖价人民币
			if($.trim($("span.salePrice_currency").text()) == "人民币") {
				salePrice = (salePrice / exchangeRate).toFixed(2);
			}
			//底价人民币
			if($.trim($("span.basePrice_currency").text()) == "人民币") {
				basePrice = (basePrice / exchangeRate).toFixed(2);
			}
			//mco金额人民币
			if($.trim($("span.mcoAmount_currency").text()) == "人民币") {
				mcoAmount = (mcoAmount / exchangeRate).toFixed(2);

			}
			//mco credit
			if($.trim($("span.mcoCredit_currency").text()) == "人民币") {
				mcoCredit = (mcoCredit / exchangeRate).toFixed(2);

			}

		}
		if($.trim($("li.list_account.profitInfor").find("span").text()) == "人民币") {
			salePrice = $("input#indiv_sale_price").val();
			basePrice = $("input#indiv_base_price").val();
			mcoAmount = $("input.indiv_mcoAmount").val();
			mcoCredit = $("input.mcoCreditInfo").val();
		}
		profitInfor(profit, salePrice, basePrice, mcoAmount, mcoCredit, exchangeRate);
	});
	//mcoCredit
	$("input.numFormat.mcoCreditInfo").on("keyup", function() {
		profitType();
		exchangeRate = $("input#indiv_exchange_rate").val();
		profit = $("input#indiv-profit");
		salePrice = $("input#indiv_sale_price").val();
		basePrice = $("input#indiv_base_price").val();
		mcoAmount = $("input.indiv_mcoAmount").val();
		mcoCredit = $(this).val();
		if($.trim($("li.list_account.profitInfor").find("span").text()) == "美元") {
			//卖价人民币
			if($.trim($("span.salePrice_currency").text()) == "人民币") {
				salePrice = (salePrice / exchangeRate).toFixed(2);
			}
			//底价人民币
			if($.trim($("span.basePrice_currency").text()) == "人民币") {
				basePrice = (basePrice / exchangeRate).toFixed(2);
			}
			//mco金额人民币
			if($.trim($("span.mcoAmount_currency").text()) == "人民币") {
				mcoAmount = (mcoAmount / exchangeRate).toFixed(2);

			}
			//mco credit
			if($.trim($("span.mcoCredit_currency").text()) == "人民币") {
				mcoCredit = (mcoCredit / exchangeRate).toFixed(2);
			}

		}
		if($.trim($("li.list_account.profitInfor").find("span").text()) == "人民币") {
			salePrice = $("input#indiv_sale_price").val();
			basePrice = $("input#indiv_base_price").val();
			mcoAmount = $("input.indiv_mcoAmount").val();
			mcoCredit = $("input.mcoCreditInfo").val();
		}
		profitInfor(profit, salePrice, basePrice, mcoAmount, mcoCredit, exchangeRate);
	});
	$("input#indiv_exchange_rate").on("keyup", function() {
		profitType();
		exchangeRate = $("input#indiv_exchange_rate").val();
		profit = $("input#indiv-profit");
		salePrice = $("input#indiv_sale_price").val();
		basePrice = $("input#indiv_base_price").val();
		mcoAmount = $("input.indiv_mcoAmount").val();
		mcoCredit = $("input.mcoCreditInfo").val();
		//利润单位美元:
		if($.trim($("li.list_account.profitInfor").find("span").text()) == "美元") {
			//卖价人民币
			if($.trim($("span.salePrice_currency").text()) == "人民币") {
				salePrice = (salePrice / exchangeRate).toFixed(2);
			}
			//底价人民币
			if($.trim($("span.basePrice_currency").text()) == "人民币") {
				basePrice = (basePrice / exchangeRate).toFixed(2);
			}
			//mco金额人民币
			if($.trim($("span.mcoAmount_currency").text()) == "人民币") {
				mcoAmount = (mcoAmount / exchangeRate).toFixed(2);
			}
			//mco credit
			if($.trim($("span.mcoCredit_currency").text()) == "人民币") {
				mcoCredit = (mcoCredit / exchangeRate).toFixed(2);
			}
		}
		if($.trim($("li.list_account.profitInfor").find("span").text()) == "人民币") {
			salePrice = $("input#indiv_sale_price").val();
			basePrice = $("input#indiv_base_price").val();
			mcoAmount = $("input.indiv_mcoAmount").val();
			mcoCredit = $("input.mcoCreditInfo").val();
		}
		profitInfor(profit, salePrice, basePrice, mcoAmount, mcoCredit, exchangeRate);
	});

	//卖价下拉菜单选择
	$("ul.dropdown-menu.currency_box.salePrice_currencyBox").find("li").find("a").on("click", function() {
		profitType();
		exchangeRate = $("input#indiv_exchange_rate").val();
		profit = $("input#indiv-profit");
		salePrice = $("input#indiv_sale_price").val();
		basePrice = $("input#indiv_base_price").val();
		mcoAmount = $("input.indiv_mcoAmount").val();
		mcoCredit = $("input.mcoCreditInfo").val();

		if($.trim($("li.list_account.profitInfor").find("span").text()) == "人民币") {
			salePrice = $("input#indiv_sale_price").val();
			basePrice = $("input#indiv_base_price").val();
			mcoAmount = $("input.indiv_mcoAmount").val();
			mcoCredit = $("input.mcoCreditInfo").val();
		}
		if($.trim($("span.salePrice_currency").text()) == "人民币") {
			if($.trim($("li.list_account.profitInfor").find("span").text()) == "美元") {
				if(exchangeRate == "") {
					alert("请输入汇率信息");
				} else {
					salePrice = (salePrice / exchangeRate).toFixed(2);
				}
			}

		}
		if($.trim($("li.list_account.profitInfor").find("span").text()) == "美元") {
			//底价人民币
			if($.trim($("span.basePrice_currency").text()) == "人民币") {
				basePrice = (basePrice / exchangeRate).toFixed(2);
			}
			//mco金额人民币
			if($.trim($("span.mcoAmount_currency").text()) == "人民币") {
				mcoAmount = (mcoAmount / exchangeRate).toFixed(2);

			}
			//mco credit
			if($.trim($("span.mcoCredit_currency").text()) == "人民币") {
				mcoCredit = (mcoCredit / exchangeRate).toFixed(2);

			}
		}

		profitInfor(profit, salePrice, basePrice, mcoAmount, mcoCredit, exchangeRate);
	});
	//底价下拉菜单:
	$("ul.dropdown-menu.currency_box.basePrice_currencyBox").find("li").find("a").on("click", function() {
		profitType();

		exchangeRate = $("input#indiv_exchange_rate").val();
		profit = $("input#indiv-profit");
		salePrice = $("input#indiv_sale_price").val();
		basePrice = $("input#indiv_base_price").val();
		mcoAmount = $("input.indiv_mcoAmount").val();
		mcoCredit = $("input.mcoCreditInfo").val();

		if($.trim($("li.list_account.profitInfor").find("span").text()) == "人民币") {
			salePrice = $("input#indiv_sale_price").val();
			basePrice = $("input#indiv_base_price").val();
			mcoAmount = $("input.indiv_mcoAmount").val();
			mcoCredit = $("input.mcoCreditInfo").val();
		}
		if($.trim($("span.basePrice_currency").text()) == "人民币") {
			if($.trim($("li.list_account.profitInfor").find("span").text()) == "美元") {
				if(exchangeRate == "") {
					alert("请输入汇率信息");
				} else {
					basePrice = (basePrice / exchangeRate).toFixed(2);
				}
			}
		}
		if($.trim($("li.list_account.profitInfor").find("span").text()) == "美元") {
			//卖价人民币
			if($.trim($("span.salePrice_currency").text()) == "人民币") {
				salePrice = (salePrice / exchangeRate).toFixed(2);
			}
			//mco金额人民币
			if($.trim($("span.mcoAmount_currency").text()) == "人民币") {
				mcoAmount = (mcoAmount / exchangeRate).toFixed(2);

			}
			//mco credit
			if($.trim($("span.mcoCredit_currency").text()) == "人民币") {
				mcoCredit = (mcoCredit / exchangeRate).toFixed(2);

			}
		}

		profitInfor(profit, salePrice, basePrice, mcoAmount, mcoCredit, exchangeRate);
	});

	//mco金额下拉菜单:
	$("ul.dropdown-menu.currency_box.mcoAmount_currencyBox").find("li").find("a").on("click", function() {
		profitType();
		exchangeRate = $("input#indiv_exchange_rate").val();
		profit = $("input#indiv-profit");
		salePrice = $("input#indiv_sale_price").val();
		basePrice = $("input#indiv_base_price").val();
		mcoAmount = $("input.indiv_mcoAmount").val();
		mcoCredit = $("input.mcoCreditInfo").val();

		if($.trim($("li.list_account.profitInfor").find("span").text()) == "人民币") {
			salePrice = $("input#indiv_sale_price").val();
			basePrice = $("input#indiv_base_price").val();
			mcoAmount = $("input.indiv_mcoAmount").val();
			mcoCredit = $("input.mcoCreditInfo").val();
		}
		if($.trim($("span.mcoAmount_currency").text()) == "人民币") {
			if($.trim($("li.list_account.profitInfor").find("span").text()) == "美元") {
				if(exchangeRate == "") {
					alert("请输入汇率信息");
				} else {
					mcoAmount = (mcoAmount / exchangeRate).toFixed(2);

				}

			}

		}
		if($.trim($("li.list_account.profitInfor").find("span").text()) == "美元") {
			//卖价人民币
			if($.trim($("span.salePrice_currency").text()) == "人民币") {
				salePrice = (salePrice / exchangeRate).toFixed(2);
			}
			//底价人民币
			if($.trim($("span.basePrice_currency").text()) == "人民币") {
				basePrice = (basePrice / exchangeRate).toFixed(2);
			}
			//mco credit
			if($.trim($("span.mcoCredit_currency").text()) == "人民币") {
				mcoCredit = (mcoCredit / exchangeRate).toFixed(2);

			}
		}

		profitInfor(profit, salePrice, basePrice, mcoAmount, mcoCredit, exchangeRate);
	});
	//mcoCredit
	$("ul.dropdown-menu.currency_box.mcoCredit_currencyBox").find("li").find("a").on("click", function() {
		profitType();

		exchangeRate = $("input#indiv_exchange_rate").val();
		profit = $("input#indiv-profit");
		salePrice = $("input#indiv_sale_price").val();
		basePrice = $("input#indiv_base_price").val();
		mcoAmount = $("input.indiv_mcoAmount").val();
		mcoCredit = $("input.mcoCreditInfo").val();

		if($.trim($("li.list_account.profitInfor").find("span").text()) == "人民币") {
			salePrice = $("input#indiv_sale_price").val();
			basePrice = $("input#indiv_base_price").val();
			mcoAmount = $("input.indiv_mcoAmount").val();
			mcoCredit = $("input.mcoCreditInfo").val();
		}
		if($.trim($("span.mcoCredit_currency").text()) == "人民币") {
			if($.trim($("li.list_account.profitInfor").find("span").text()) == "美元") {
				if(exchangeRate == "") {
					alert("请输入汇率信息");
				} else {
					mcoCredit = (mcoCredit / exchangeRate).toFixed(2);

				}
			}
		}

		if($.trim($("li.list_account.profitInfor").find("span").text()) == "美元") {
			//卖价人民币
			if($.trim($("span.salePrice_currency").text()) == "人民币") {
				salePrice = (salePrice / exchangeRate).toFixed(2);
			}
			//底价人民币
			if($.trim($("span.basePrice_currency").text()) == "人民币") {
				basePrice = (basePrice / exchangeRate).toFixed(2);
			}
			//mco金额人民币
			if($.trim($("span.mcoAmount_currency").text()) == "人民币") {
				mcoAmount = (mcoAmount / exchangeRate).toFixed(2);

			}
		}

		profitInfor(profit, salePrice, basePrice, mcoAmount, mcoCredit, exchangeRate);
	});

	var checkNum = /^\d+(\.\d+)?$/;
	$(".payService").find("input.numFormat").on("keyup", function() {
		if(!checkNum.test($(this).val())) {
			$("input#indiv-profit").val("");
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
	currencyArr.push($.trim($("span.salePrice_currency").text()));
	currencyArr.push($.trim($("span.basePrice_currency").text()));
	currencyArr.push($.trim($("span.mcoAmount_currency").text()));
	currencyArr.push($.trim($("span.mcoCredit_currency").text()));
	//	console.log(currencyArr);
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

//Itinerary
function ItineraryInfo() {
	$(".floor .addInfo .cardLeft.itineraryInfo .individualTourInfo .btnArea a").on("mousedown", function() {
		$(this).addClass("selected");
	});
	$(".floor .addInfo .cardLeft.itineraryInfo .individualTourInfo .btnArea a").on("mouseup", function() {
		$(this).removeClass("selected");
	});
	//清空
	$(".floor .addInfo .cardLeft.itineraryInfo .individualTourInfo .btnArea a.clear").on("click", function() {
		$(".floor .addInfo .cardLeft.itineraryInfo .individualTourInfo textarea").val(" ");
	});

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
			$("ul.add-msg li.destination select.thirdItem").find("option.firstOption").css("display", "block");
			$("ul.add-msg li.destination select.thirdItem").prop('selectedIndex', 0);
		} else {
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
//利润的显示
function showProfitBox() {
	$(".payService").find("input").on("keyup", function() {
		var salePrice = $("input#indiv_sale_price").val();
		var basePrice = $("input#indiv_base_price").val();
		if(salePrice == "" || basePrice == "") {
			$("li.list_account.profitInfor").css("display", "none");
		} else {
			$("li.list_account.profitInfor").css("display", "block");
		}
	});
}
//费率   s
function rateInfo() {
	$("ul.add-msg li.rate a").on("mousedown", function() {
		$(this).addClass("selected");
	});
	$("ul.add-msg li.rate a").on("mouseup", function() {
		$(this).removeClass("selected");
	});
	$("ul.add-msg li.rate a").on("click", function() {
		profitType();
		var mcoAmount = $("input#mco-value").val(); //MCO金额
		var mcoCredit = $("input#mco-credit").val(); //MCO Credit
		var exchangeRate;
		var profit;
		var salePrice;
		var basePrice;
		if(mcoAmount == "") {
			alert("请先输入MCO金额");
		} else {

			$("input#mco-credit").val((Number(mcoAmount) * 0.96).toFixed(2));
			$("input#fee-ratio").val("4.00%");
		}
		mcoCredit = $("input#mco-credit").val();
		mcoAmount = $("input#mco-value").val();
		exchangeRate = $("input#exchange_rate").val();
		profit = $("input#indiv-profit");
		salePrice = $("input#indiv_sale_price").val();
		basePrice = $("input#indiv_base_price").val();
		if($("ul.add-msg li.list_account.profitInfor").find("span").text() == "美元") {
			if($("span.salePrice_currency").text() == "人民币") {
				salePrice = (salePrice / exchangeRate).toFixed(2);
			}
			if($("span.basePrice_currency").text() == "人民币") {
				basePrice = (basePrice / exchangeRate).toFixed(2);
			}
			if($.trim($("span.mcoAmount_currency").text()) == "人民币") {
				mcoAmount = (mcoAmount / exchangeRate).toFixed(2);
			}
			if($.trim($("span.mcoCredit_currency").text()) == "人民币") {
				mcoCredit = (mcoCredit / exchangeRate).toFixed(2);
			}
		}
		if($("ul.add-msg li.list_account.profitInfor").find("span").text() == "人民币") {
			salePrice = $("input#air_amountDue").val();
			basePrice = $("input#air-ticket-base-price").val();
			mcoAmount = $("input#mco-value").val();
			mcoCredit = $("input#mco-credit").val();
		}
		profitInfor(profit, salePrice, basePrice, mcoAmount, mcoCredit, exchangeRate);
	});

}

//费率   e
//选择全额mco
function fullMcoPayment() {
	$(".payService ul li .payment").find(".paymentMethod").find("ul.dropdown-menu.creditCardPayment").find("li").find("a").on("click", function() {
		var payment_type = $(".payService ul li .payment").find(".paymentMethod").find("button.btn").find("span.txt");
//		payment_type.text($(this).text());
		if($.trim(payment_type.text()) == "全额MCO") {
			var salePrice = $("input#indiv_sale_price").val();
			if($.trim(salePrice) !== "") {
				$("input#face-value").val(0);
				$("input#mco-value").val(salePrice);
			}
		}
		if($.trim(payment_type.text()) == "供应商部分刷卡+额外MCO") {
			$("input#face-value").val("");
			$("input#mco-value").val("");
		}
		var mcoCredit = $("input#mco-credit").val();
		var mcoAmount = $("input#mco-value").val();
		var exchangeRate = $("input#exchange_rate").val();
		var profit = $("input#indiv-profit");
		var salePrice = $("input#indiv_sale_price").val();
		var basePrice = $("input#indiv_base_price").val();
		if($("ul.add-msg li.list_account.profitInfor").find("span").text() == "美元") {
			if($("span.salePrice_currency").text() == "人民币") {
				salePrice = (salePrice / exchangeRate).toFixed(2);
			}
			if($("span.basePrice_currency").text() == "人民币") {
				basePrice = (basePrice / exchangeRate).toFixed(2);
			}
			if($.trim($("span.mcoAmount_currency").text()) == "人民币") {
				mcoAmount = (mcoAmount / exchangeRate).toFixed(2);
			}
			if($.trim($("span.mcoCredit_currency").text()) == "人民币") {
				mcoCredit = (mcoCredit / exchangeRate).toFixed(2);
			}

		}
		if($("ul.add-msg li.list_account.profitInfor").find("span").text() == "人民币") {
			salePrice = $("input#air_amountDue").val();
			basePrice = $("input#air-ticket-base-price").val();
			mcoAmount = $("input#mco-value").val();
			mcoCredit = $("input#mco-credit").val();
		}
		profitInfor(profit, salePrice, basePrice, mcoAmount, mcoCredit, exchangeRate);
	});
}

function partCreditCard() {
	$("input.creditCardAmount").on("keyup", function() {
		var salePrice = $("input#indiv_sale_price").val();
		if(salePrice !== "") {
			var amount = Number(salePrice - $(this).val());
			$("input.non-creditCardAmount").val(amount);
		}
	})
	$("input.non-creditCardAmount").on("keyup", function() {
		var salePrice = $("input#indiv_sale_price").val();
		if(salePrice !== "") {
			var amount = Number(salePrice - $(this).val());
			$("input.creditCardAmount").val(amount);
		}
	})
}
