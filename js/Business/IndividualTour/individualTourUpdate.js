$(function() {
	dateRange();
	dragForm2();
	updateIndivTourDiscount($("#indivDiscountText_update"), $("#indivDiscountNotice_update"), $("#indivDiscountApply_update"), $("#indivSubtractNum_update"), $("#indivDiscountOption_update"), $("#indivDiscountText_update_currency"));
	//	addClients();
	dateTimeCalculate($("#indiv_startTime"), $("#indiv_endTime"), $("#indiv_num_days"));
	updateIndivTourDiscount($("#indivTourDiscountText"), $("#indivTourDiscountNotice"), $("#indivTourDiscountApply"), $("#indivTourSubtractNum"), $("#indivTourDiscountOption"), $("#updateIndivDiscountTextCurrency"));
	autoCenterBox($("#dialog2"));
	autoCenterBox($(".updateDialog .customerInfo.addClients"));
//	calculateCharge();
	confirmRequest();
	systematicSearch();
	getTimeInfo();
	resetSystematicSearch();
	checkInvoice();
	Pagination();
	ordersAssociated();
	radminidInfo();
	paymentMethod();
	priceCalculate();
	getCalculateProfitInfo();
	arrowStatus();
	destinationInfo();//目的地
	rateInfo();//费率
	fullMcoPayment();//选择全额mco
	partCreditCard();
	$("div.notesInfor").on("keyup", function() {
		heightRange();
	});

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
	//其他联系方式：
	$("#indivOtherContact").on('change', function() {
		$("#indivOtherContactLabel").text($("#indivOtherContact").val() + '帐号');
	});

	$(document).scroll(function() {
		var winScrollTop = $(window).scrollTop();
		if(winScrollTop > 90) {
			$("#dialog2").css({
				"top": "50px",
				"margin-top": "0px"
			});
			$(".addClients.customerInfo").css("top", "10%");
		} else {
			autoCenterBox($("#dialog2"));
			autoCenterBox($(".addClients.customerInfo"));
		}
	});

	//折扣-折扣金额
	$(".info-price-individual ul.add-msg li.discountCard dl.discountOption dd").on("click", function() {
		if($.trim($(this).text()) == "折扣码") {
			$(this).parent("dl").parent("li").find("dl.exchange").find("dd.discount-text").removeClass("list-currency");
			$(".info-price-individual  ul.add-msg li.discountCard dl.exchange dd.discount-text select").css("display", "none");
		}
		if($.trim($(this).text()) == "折扣金额") {
			$(this).parent("dl").parent("li").find("dl.exchange").find("dd.discount-text").addClass("list-currency");
			$(".info-price-individual  ul.add-msg li.discountCard dl.exchange dd.discount-text select").css("display", "inline-block");
		}
	});
	$(".updateDialog .customerInfo.addClients ul.add-msg li.discountCard dl.discountOption dd").on("click", function() {
		if($.trim($(this).text()) == "折扣码") {
			$(this).parent("dl").parent("li").find("dl.exchange").find("dd.discount-text").removeClass("list-currency");
			$(".updateDialog .customerInfo.addClients ul.add-msg li.discountCard dl.exchange dd.discount-text select").css("display", "none");
		}
		if($.trim($(this).text()) == "折扣金额") {
			$(this).parent("dl").parent("li").find("dl.exchange").find("dd.discount-text").addClass("list-currency");
			$(".updateDialog .customerInfo.addClients ul.add-msg li.discountCard dl.exchange dd.discount-text select").css("display", "inline-block");
		}
	});

	//	updateFinancialInfo();
	updateGetPriceInfoByTotalPrice();
	//	updateGetPriceInfoByClient();
});

$(document).ready(function() {
	/*
	 *  载入当前页的数据
	 */
	function loadCurrentPage(data) {
		var url = location.protocol.concat("//").concat(location.host).concat('/database/Business/IndividualTour/IndividualTourGetOrderList.php');
		$.ajax({
			url: url,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			type: 'GET',
			data: data,
			success: function(response) {
				response = JSON.parse(response);
				console.log(response);
				$('ul.tabListDetail').empty();
				for(var i = 0; i < response.length; i++) {
					var lockStatus = response[i]['lock_status'] == 'Y' ? 'yesStatus' : 'noStatus';
					var finishStatus = response[i]['finish_status'] == 'Y' ? 'yesStatus' : 'noStatus';
					var following_id = response[i]['following_id_collection'] == null ? '' : response[i]['following_id_collection'];

					var $html = `
							<li><dl class="callout_button">
	                <dd class="systemNum"><a href='javascript:void(0);'>` + response[i]['transaction_id'] + `</a></dd>
	                <dd class='invoice'><a href='javascript:void(0);'>` + response[i]['invoice'] + `</a></dd>
	                <dd class='profit'><a href='javascript:void(0);'>` + response[i]['total_profit'] + `</a></dd>
	                <dd class='debt'><a href='javascript:void(0);'>` + response[i]['debt'] + `</a></dd>
	                <dd class='receivable'><a href='javascript:void(0);'>` + response[i]['received'] + `</a></dd>
	                <dd class='salePrice'><a href='javascript:void(0);'>` + response[i]['selling_price'] + `</a></dd>
	                <dd class='createDate'><a href='javascript:void(0);'>` + response[i]['create_time'].substring(0, 10) + `</a></dd>
	                <dd class='customerName'><a href='javascript:void(0);'>` + response[i]['customer_name'] + `</a></dd>
	                <dd class='startTime'><a href='javascript:void(0);'>` + response[i]['depart_date'].substring(0, 10) + `</a></dd>
	                <dd class='returnTime'><a href='javascript:void(0);'>` + response[i]['arrival_date'].substring(0, 10) + `</a></dd>
	                <dd class='lockStatus ` + lockStatus + `'><a href='javascript:void(0);'></a></dd>
	                <dd class='finishStatus ` + finishStatus + `'><a href='javascript:void(0);'></a></dd>
	                <dd class='number'><a href='javascript:void(0);'>` + following_id + `</a></dd>
	            </dl></li>`
					$('ul.tabListDetail').append($html);
				}
				heightRange();
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
	}

	function loadData(data) {
		$.ajax({
			url: location.protocol.concat("//").concat(location.host).concat('/database/Business/getOrderCount.php'),
			type: 'GET',
			data: data,
			success: function(response) {
				response = JSON.parse(response);

				if(response['sum_profit'] == null) {
					$("#sum_profit").text(0);
				} else {
					$("#sum_profit").text(response['sum_profit']);
				}
				if(response['sum_debt'] == null) {
					$("#sum_debt").text(0);
				} else {
					$("#sum_debt").text(response['sum_debt']);
				}
				if(response['sum_received'] == null) {
					$("#sum_received").text(0);
				} else {
					$("#sum_received").text(response['sum_received']);
				}
				if (response['sum_selling_price'] == null) {
					$("#sum_selling_price").text(0);
				} else {
					$("#sum_selling_price").text(response['sum_selling_price']);
				}

				var num_orders = response['num_orders'];
				if(num_orders == 0) {
					$(".noResultBox").css("display", "block");
				} else {
					$('.tabListDetail').empty();
					$('#p4').pagination({
						totalData: num_orders,
						showData: 15,
						current: 0,
						coping: true,
						homePage: '首页',
						endPage: '末页',
						prevContent: '上页',
						nextContent: '下页',
						callback: function(api) {
							var i = api.getCurrent(); //获取当前页
							var inputData = data;
							Object.assign(inputData, {
								offset: (i - 1) * 15
							});
							loadCurrentPage(inputData);
						}
					});
					$('ul.pagination').find('a').click();
				}
				heightRange();
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
	}

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
    if (diff.length == 15) {
      diff = diff[14];
    } else {
      diff = diff.substring(14, 16);
    }

    if (month - Number(diff) < 0) {
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
			orderType: 'individual',
			transaction_id: $("#transaction-id").val(),
			product_code: $("#product-code").val(),
			fname: $("#fname").val(),
      lname: $("#lname").val(),
			from_invoice: $("#from-invoice").val(),
      to_invoice: $("#to-invoice").val(),
			invoice: $("#invoice-filter").val(),
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
    var to_date = new Date(year + 1, month, day);

		if($("#settletime").val() == 'all') {
			data['from_date'] = "0";
			data['to_date'] = formatDate(to_date);
		} else if($("#settletime").val() == 'today') {
			data['from_date'] = formatDate(today);
			data['to_date'] = formatDate(to_date);
		} else if($("#settletime").val() == 'current_month') {
			data['from_date'] = formatDate(new Date(year, month, 1));
			data['to_date'] = formatDate(to_date);
		} else if ($("#settletime").val().startsWith('current_month-')) {
			getFromAndToDate(data);
		} else {
			from_date = $("#from-date").val() == ""? "0" : $("#from-date").val();
			to_date = $("#to-date").val() == ""? formatDate(to_date) : $("#to-date").val();
			data['from_date'] = from_date;
			data['to_date'] = to_date;
		}

		if (data['payment_type'] == 'non-cc') {
      data['deal_location'] = $("#deal-location").val();
      var non_cc_payment_type = [];
      $("#non-cc-payment-type div input").each(function () {
        if ($(this)[0].checked) {
          non_cc_payment_type.push($(this)[0].id);
        }
      });
      data['non_cc_payment_type'] = JSON.stringify(non_cc_payment_type);
    }
		return data;
	}
	loadData(getFilterData());

	/*
	 * 根据筛选条件得到独立团信息
	 */
	$("#individual-tour-update-filter").on('click', function() {
		var data = getFilterData();
		loadData(data);
	});

	$("#individual-tour-update-reset").on('click', function() {
		$("#individual-update-date-filter").val("30");
		$("#individual-update-from-date").val("");
		$("#individual-update-to-date").val("");
		$(".selectRange").css("display", "none");
		$("#individual-update-transaction-id-filter").val("");
		$("#individual-update-product-code-filter").val("");
		var data = getFilterData();
		loadData(data);
	});

	/*
	 * 显示选中订单的具体信息
	 */
	$(document).on('click', 'ul.tabListDetail li', function() {
		unconfirmedRequest();

		$(this).addClass("active").siblings().removeClass("active");
		var transactionId = $('.active').find('dl dd.systemNum a')['0'].innerText;
		if(isNaN(transactionId)) {
			transactionId = transactionId.substring(0, transactionId.length - 3);
		}
		$("#indivDiscountNotice_update").css("display", "none");

		var url = location.protocol.concat("//").concat(location.host).concat('/database/Business/IndividualTour/IndividualTourGetDetail.php');
		$.ajax({
			url: url,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			type: 'GET',
			data: { transaction_id: transactionId },
			success: function(response) {
				response = JSON.parse(response);
				console.log(response);

				// individual_tour_id = response['indiv_tour_id'];
				// // 填充弹出窗口的数据
				$("#indiv_tour_id").val(response['product_code']);
				$("#indiv_salesperson").val(response['salesperson_code']);
				$("#indiv_tour_name").val(response['tour_name']);
				$("#indiv_wholesaler").val(response['wholesaler_code']);
				$("#invoice").val(response['indiv_tour_invoice']);
				$("#indiv_source").val(response['source_name']);
				$("#indiv_note").val(response['note']);

				$("#indiv_startTime").val(response['depart_date'].substring(0, 10));
				$("#indiv_endTime").val(response['arrival_date'].substring(0, 10));
				$("#indiv_num_days").val(response['duration']);

				$("#indiv_exchange_rate").val(response['exchange_rate']);
				var deal_location = (response['deal_location'] == 'US') ? '美国' : '中国';
				$("#payment-area")[0].innerHTML = deal_location;

				$("#indiv_base_price").val(response['base_price']);
				var base_currency = response['base_currency'] == 'USD' ? '美元' : '人民币';
				$("#base-price-currency")[0].innerHTML = base_currency;

				$("#indiv_sale_price").val(response['selling_price']);
				var selling_currency = response['selling_currency'] == 'USD' ? '美元' : '人民币';
				$("#sell-price-currency")[0].innerHTML = selling_currency;

				var payment_type = response['payment_type'];
				if (payment_type == 'cash') {
					payment_type = '现金';
				} else if (payment_type == 'check') {
					payment_type = '支票';
				} else if (payment_type == 'alipay') {
					payment_type = '支付宝';
				} else if (payment_type == 'wechat') {
					payment_type = '微信支付';
				} else if (payment_type == 'remit') {
					payment_type = 'REMIT';
				} else if (payment_type == 'wholesalerall') {
					payment_type = '供应商全额刷卡';
				} else if (payment_type == 'wholesalercheck') {
					payment_type = '供应商部分刷卡+支票';
				} else if (payment_type == 'wholesalercash') {
					payment_type = '供应商部分刷卡+现金';
				} else if (payment_type == 'wholesaleralipay') {
					payment_type = '供应商部分刷卡+支付宝';
				} else if (payment_type == 'wholesalerwechat') {
					payment_type = '供应商部分刷卡+微信支付';
				} else if (payment_type == 'wholesalerremit') {
					payment_type = '供应商部分刷卡+REMIT';
				} else if (payment_type == 'wholesalermco') {
					payment_type = '供应商部分刷卡+额外MCO';
				} else if (payment_type == 'mcoall') {
					payment_type = '全额MCO';
				}
				$("#indiv-tour-payment-type")[0].innerHTML = payment_type;
				$("#indiv-profit").val(response['total_profit']);

				if(payment_type == "供应商部分刷卡+额外MCO" || payment_type == '全额MCO') {
					$("#wholesalermco").click();
					$("#mco-party").text(response['mco_party']);
					$("#face-value").val(response['face_value']);
					var face_currency = '美元';
					if(response['face_currency'] == 'RMB') {
						face_currency = '人民币';
					};
					$("#face-currency").text(face_currency);
					$("#mco-value").val(response['mco_value']);
					var mco_currency = '美元';
					if(response['mco_currency'] == 'RMB') {
						mco_currency = '人民币';
					};
					$("#mco-currency").text(mco_currency);
					$("#mco-credit").val(response['mco_credit']);
					var mco_credit_currency = '美元';
					if(response['mco_credit_currency'] == 'RMB') {
						mco_credit_currency = '人民币';
					};
					$("#mco-credit-currency").text(mco_credit_currency);
					$("#fee-ratio").val(response['fee_ratio']);

					$("#card-number").val(response['card_number']);
					var expire_date = response['exp_date'].split("/");
					$("#expired-date-month").val(expire_date[0]);
					$("#expired-date-year").val(expire_date[1]);
					$("#card-holder").val(response['cardholder']);
					$("#mco-receiver").val(response['account_id']);
				}


				$("#indivLastName").val(response['lname']);
				$("#indivFirstName").val(response['fname']);
				$("#indivClientTel").val(response['phone']);
				$("#indivOtherContact").val(response['other_contact_type']);
				$("#indivOtherContactLabell").text(response['other_contact_type'] + '帐号');
				$("#indivOtherContactNumber").val(response['other_contact_number']);
				$("#indivBirthday").val(response['birth_date'].substring(0, 10));
				$("#indivGender").val(response['gender']);
				$("#indivClientEmail").val(response['email']);
				$("#indivZipCode").val(response['zipcode']);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
	});

	function autoCenter(el) {
		var bodyW = $(window).width();
		var bodyH = $(window).height();
		var elW = el.width();
		var elH = el.height();
		$("#dialog2").css({
			"left": (bodyW - elW) / 2 + 'px',
			"top": (bodyH - elH) / 2 + 'px'
		});
	};

	/*
	 * 得到销售，导游和来源的下拉列表
	 */
	$("#indiv_salesperson, #indiv_wholesaler, #indiv_source, #accounting-received, #wholesaler").on('focus', function() {
		var current_id = $(this).attr('id');
		var target = "";
		if(current_id == 'indiv_salesperson') {
			target = 'salesperson';
		} else if(current_id == 'indiv_source') {
			target = 'source';
		} else if(current_id == 'indiv_wholesaler' || current_id == 'wholesaler') {
			target = 'wholesaler';
		} else if(current_id == 'accounting-received') {
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

	// 得到更新窗口数据
	function getUpdateInfo() {
		var data = {
			transactionId: $('.active').find('dl dd.listNum a')['0'].innerText,

			product_code: $("#update-product-code").val(),
			tour_name: $("#indiv_tour_name").val(),
			invoice: $("#invoice").val(),
			salesperson: $("#indiv_salesperson").val(),
			wholesaler: $("#indiv_wholesaler").val(),
			source: $("#indiv_source").val(),
			note: $("#indiv_note").val(),

			start_date: $("#indiv_startTime").val(),
			end_date: $("#indiv_endTime").val(),
			durating: $("#indiv_num_days").val(),

			base_price: $("#indiv_base_price").val(),
			base_price_currency: $("#update_base_price_currency").val(),
			sell_price: $("#update_indivAmountDue").val(),
			sell_price_currency: $("#update_sell_price_currency").val(),
			transaction_fee: $("#transaction_fee").val(),
			actual_received: $("#indiv_sale_price").val(),
			coupon: $("#indivDiscountText_update").val(),
			coupon_currency: $("#indivDiscountText_update_currency").val(),

			lname: $("#add-customer-lname").val(),
			fname: $("#add-customer-fname").val(),
			phone: $("#indivClientTel").val(),
			other_contact_type: $("#indivOtherContact").val(),
			other_contact_number: $("#indivOtherContactNumber").val(),

			birthday: $("#indivBirthday").val(),
			gender: $("#indivGender").val(),
			email: $("#indivClientEmail").val(),
			zipcode: $("#indivZipCode").val(),

			join_date: $("#add-customer-join-date").val(),
			join_location: $("#add-customer-join-location").val(),
			leave_date: $("#add-customer-leave-date").val(),
			leave_location: $("#add-customer-leave-location").val()
		}
		return data;
	}

	/*
	 * 修改订单内容
	 */
	$("#updateConfirm").on('click', function() {
		$(".updateEditConfirmBox").css("display", "block");
	});

	$("#updateEditActionConfirm").on('click', function() {
		var data = getUpdateInfo();

		var displayData = data;
		var transactionId = $('.active').find('dl dd.listNum a')['0'].innerText;
		var url = location.protocol.concat("//").concat(location.host).concat('/database/Business/IndividualTour/IndividualTourUpdate.php');
		$.ajax({
			url: url,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			type: 'POST',
			data: data,
			success: function(response) {
				console.log(response);
				$("#dialog2").css("display", "none");
				location.reload();
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
		$(".updateEditConfirmBox").css("display", "none");
	});

	$("#updateEditActionCancel").on('click', function() {
		$(".updateEditConfirmBox").css("display", "none");
	});

	$("#indivOtherContact").on('change', function() {
		$("#indivOtherContactLabel").text($("#indivOtherContact").val() + '帐号');
	});

	// 更新订单列表的内容
	function updateDisplayInfo(data) {
		$("li.active").find("dd.listGroupNum a").text(data['product_code']);
		$("li.active").find("dd.listSales a").text(data['wholesaler']);
		$("li.active").find("dd.listJourney a").text(data['start_date'] + '/' + data['end_date']);
		$("li.active").find("dd.listPayment a").text('multiple');
		$("li.active").find("dd.listCurrency a").text('USD');
		$("li.active").find("dd.listPrice a").text(data['receive']);
		$("li.active").find("dd.listCost a").text(data['base_price']);
	}

	/*
	 * 删除订单
	 */
	$("#deleteConfirm").on('click', function() {
		$(".updateDeleteConfirmBox").css("display", "block");
		$(".updateDeleteConfirmBox").find(".confirmNotice").text("确认删除");
	});

	$("#updateDeleteActionConfirm").on('click', function() {
		var transactionId = $('.active').find('dl dd.listNum a')['0'].innerText;
		var url = location.protocol.concat("//").concat(location.host).concat('/database/Business/IndividualTour/IndividualTourDelete.php');
		$.ajax({
			url: url,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			type: 'POST',
			data: {
				transaction_id: transactionId
			},
			success: function(response) {
				// console.log(response);
				$("#dialog2").css("display", "none");
				$(".updateDeleteConfirmBox").css("display", "none");
				$(".active").remove();
				location.reload();
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
	});

	$("#updateDeleteActionCancel").on('click', function() {
		$(".updateDeleteConfirmBox").css("display", "none");
	});

	$("#noResultBox .actionBox #actionCancel").on('click', function() {
		$("#noResultBox").css("display", "none");
	});
});

//散拼团点击订单号弹出新窗口
function dragForm2() {
	var $dialog2 = $("#dialog2");

	//自动居中对话框
	function autoCenter(el) {
		var bodyW = $(window).width();
		var bodyH = $(window).height();
		var elW = el.width();
		var elH = el.outerHeight();
		$dialog2.css({
			"left": (bodyW - elW) / 2 + 'px',
			"top": (bodyH - elH) / 2 + 'px'
		});
	};

	//点击弹出对话框
	$(document).on('click', '.callout_button', function() {
		$dialog2.css("display", "block");
		autoCenter($dialog2);
	});

	//点击关闭对话框
	$(".close_button2").click(function() {
		$dialog2.css("display", "none");
	});

	//窗口大小改变时，对话框始终居中
	window.onresize = function() {
		autoCenter($dialog2);
	};

	$(".updateInfo ul.filterBox  li  dl.confirmMsg dd ").find("a").on("mousedown", function() {
		$(this).addClass("confirm-active");
	});
	$(".updateInfo ul.filterBox  li  dl.confirmMsg dd ").find("a").on("mouseup", function() {
		$(this).removeClass("confirm-active");
	});
}

function autoCenterBox(el) {
	var bodyW = $(window).width();
	var bodyH = $(window).height();
	var elW = el.width();
	var elH = el.outerHeight();
	el.css({
		"left": (bodyW - elW) / 2 + 'px',
		"top": (bodyH - elH) / 2 + 'px'
	});
};

function resetCustomerInfo() {
	$("#add-customer-lname").val("");
	$("#add-customer-fname").val("");
	$("#indivClientTel").val("");
	$("#indivOtherContact").val("WeChat");
	$("#indivOtherContactLabel").text("WeChat帐号");
	$("#indivOtherContactNumber").val("");

	$("#indivBirthday").val("");
	$("#indivGender").val("");
	$("#indivClientEmail").val("");
	$("#indivZipCode").val("");
	$("#add-customer-note").val("");

	$("#add-customer-join-date").val("");
	$("#add-customer-join-location").val("");
	$("#add-customer-leave-date").val("");
	$("#add-customer-leave-location").val("");

	$("#add-customer-currency").val("");
	$("#add-customer-payment-type").val("");
	$("#add-customer-price").val("");
	$("#indivTourDiscountText").val("");
	$("dl#indivTourDiscountNotice").css("cssText", "display:none !important");
}

function getCustomerEditInfo() {
	if($("#add-customer-lname").val() == "" || $("#add-customer-fname").val() == "") {
		alert("请输入客户姓名!");
		return false;
	}
	return data = {
		lname: $("#add-customer-lname").val(),
		fname: $("#add-customer-fname").val(),
		phone: $("#indivClientTel").val(),
		other_contact_type: $("#indivOtherContact").val(),
		other_contact_number: $("#indivOtherContactNumber").val(),

		birthday: $("#indivBirthday").val(),
		gender: $("#indivGender").val(),
		email: $("#indivClientEmail").val(),
		zipcode: $("#indivZipCode").val(),
		note: $("#add-customer-note").val(),

		join_date: $("#add-customer-join-date").val(),
		join_location: $("#add-customer-join-location").val(),
		leave_date: $("#add-customer-leave-date").val(),
		leave_location: $("#add-customer-leave-location").val(),

		paymentType: $("#add-customer-payment-type").val(),
		payment_amount: $("#update_indivClientAmountDue").val(),
		payment_amount_currency: $("#update_client_currency").val(),

		transaction_fee: $("#indiv_transaction_fee").val(),
		actual_received: $("#add-customer-price").val(),

		coupon: $("#indivTourDiscountText").val(),
		coupon_currency: $("#updateIndivDiscountTextCurrency").val()
	};
}

function heightRange() {
	var leftHeight = $(".navInfo ul").height();
	var rightHeight = $(".theamInfo").height();
	if(rightHeight > leftHeight) {
		$(".navInfo ul").css("height", rightHeight);
	}
	if(rightHeight < leftHeight) {
		$(".navInfo ul").css("height", rightHeight);
	}
}

//更新页面利润计算    s
function updateFinancialInfo() {
	//切换
	$(".info-price-individual li.salePriceInfo dl.salePrice dd").unbind("click").on("click", function() {
		var exchangeRate = $("input#indiv_exchange_rate").val();
		if(exchangeRate == "") {
			alert("请先输入汇率");
		}
	});
}

//手续费,实际金额
function calculateCharge() {
	//按总卖价：
	$("ul.add-msg li.list_cost a").on("click", function() {
		if($("#update_indivAmountDue").val() == "") {
			alert("请确认应收金额已经填写");
		} else {
			var amountCollected = Number($("input#update_indivAmountDue").val()); //应收金额
			//手续费
			//手续费 = 应收金额*0.04
			$("ul.add-msg li.list_cost a").parent("li").find("input").val(Number(amountCollected * 0.04).toFixed(2));
			var charge = $("ul.add-msg li.list_cost a").parent("li").find("input").val();
			//实际金额 =应收金额-手续费
			$("ul.add-msg li.actualAmount").find("input").val(Number(amountCollected - charge).toFixed(2));
		}
	});
}

//按总卖价
function updateGetPriceInfoByTotalPrice() {
	$("ul.add-msg li.list_account.calculateProfit a#updateCalculateBtnByTotalPrice").on("click", function() {
		var exchangeRate = $("input#indiv_exchange_rate").val(); //汇率
		var profit = $("input#indiv-profit"); //利润
		var basePrice = $("input#indiv_base_price").val(); //底价
		var salePrice = $("input#indiv_sale_price").val(); //总卖价
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
				salePrice = $("input#indiv_sale_price").val();
			}
			//折扣
			if($("ul.add-msg li.discountCard dl.discountNotice").css("display") == "none") {
				discount = 0;
			} else {
				if($("span#indivSubtractNum_update").text().split(':')[1].split(" ")[2] == "USD") {
					discount = $("span#indivSubtractNum_update").text().split(':')[1].split(" ")[1];
				}
				if($("span#indivSubtractNum_update").text().split(':')[1].split(" ")[2] == "RMB") {
					discount = ($("span#indivSubtractNum_update").text().split(':')[1].split(" ")[1] / exchangeRate).toFixed(2);
				}
			}
			updateProfitCalculateByTotalPrice(basePrice, salePrice, discount, profit, exchangeRate);
		}
	});
}

//按总卖价
function updateProfitCalculateByTotalPrice(basePrice, salePrice, discount, profit, exchangeRate) {
	//销售价-底价-折扣=利润
	var profitText = salePrice - basePrice - discount;
	profit.val(profitText.toFixed(2));
	profit.parent().find("span").text("美元");
	if($("select#update_base_price_currency").val() == "USD" && $("select#update_sell_price_currency").val() == "USD") {
		profit.val(profitText.toFixed(2));
		profit.parent().find("span").text("美元");
	}
	if($("select#update_base_price_currency").val() == "RMB" && $("select#update_sell_price_currency").val() == "USD") {
		basePrice = (basePrice / exchangeRate).toFixed(2);
		profitText = salePrice - basePrice - discount;
		profit.val(profitText.toFixed(2));
		profit.parent().find("span").text("美元");
	}
	if($("select#update_base_price_currency").val() == "USD" && $("select#update_sell_price_currency").val() == "RMB") {
		salePrice = (salePrice / exchangeRate).toFixed(2);
		profitText = salePrice - basePrice - discount;
		profit.val(profitText.toFixed(2));
		profit.parent().find("span").text("美元");
	}
	if($("select#update_base_price_currency").val() == "RMB" && $("select#update_sell_price_currency").val() == "RMB") {
		salePrice = (salePrice / exchangeRate).toFixed(2);
		basePrice = (basePrice / exchangeRate).toFixed(2);
		profitText = salePrice - basePrice - discount;
		profit.val(profitText.toFixed(2));
		profit.parent().find("span").text("美元");
	}
}

//折扣
function updateIndivTourDiscount(discountText, discountNotice, discountApply, subtractNum, discountOption, coupon_currency) {
	heightRange();
	discountOption.find("dd").on("click", function() {
		$(this).addClass("option-active").siblings().removeClass("option-active");
	});
	discountApply.unbind("click").on("click", function() {
		//选中折扣金额
		if(discountOption.find("dd.coupon").hasClass("option-active")) {
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

//按客户
function updateGetPriceInfoByClient() {
	$("ul.add-msg li.list_account.calculateProfit a#updateCalculateBtnByClients").on("click", function() {
		//汇率
		var exchangeRate = $("input#indiv_exchange_rate").val();
		//底价
		var basePrice = $("input#indiv_base_price").val();
		if(basePrice == "") {
			basePrice = 0;
		} else {
			basePrice = $("input#indiv_base_price").val();
		}
		//利润
		var profit = $("input#update_profit_client");
		//实际支付
		var actualPayment = getTotalPriceInfo();
		updateProfitCalculateByClient(basePrice, profit, exchangeRate, actualPayment)
	});
}

//销售价-折扣
function getTotalPriceInfo() {
	//利率
	var exchangeRate = $("input#indiv_exchange_rate").val();
	//实际支付
	var actualPayment = $("dd.customer-actualpayment.updatePaymentactual");
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

function updateProfitCalculateByClient(basePrice, profit, exchangeRate, actualPayment) {
	//销售价-底价-折扣=利润
	var profitText = actualPayment - basePrice;
	profit.val(profitText.toFixed(2));
	if($("select#update_base_price_currency").val() == "USD") {
		profit.val(profitText.toFixed(2));
	}
	if($("select#update_base_price_currency").val() == "RMB") {
		basePrice = (basePrice / exchangeRate).toFixed(2);
		profitText = actualPayment - basePrice;
		profit.val(profitText.toFixed(2));
	}
}

function confirmRequest(thisLi) {
	$(".updateDialog .formAction li.requestReceive").on("click", function() {
		if(!$(".updateDialog .formAction li.requestReceive").hasClass("selected")) {
			$(".confirmRequest").css("display", "block");
			$(".confirmRequest .actionBox button.actionConfirm").on("click", function() {
				var transactionId = $('.active').find('dl dd.listNum a')['0'].innerText;
				var account_id = $("#accounting-received").val();

				var url = location.protocol.concat("//").concat(location.host).concat('/database/Business/ConfirmReceived.php');
				$.ajax({
					url: url,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					type: 'post',
					data: {
						transaction_id: transactionId,
						account_id: account_id
					},
					success: function(response) {
						confirmedRequest();
						$('.active').find("dl").find("dd").first().before("<label class='otherStatus'></label>");
						setTimeout(function() {
							$(".confirmRequest").css("display", "none");
						}, 500);
					},
					error: function(jqXHR, textStatus, errorThrown) {
						console.log(textStatus, errorThrown);
					}
				});
			});
		}
		$(".confirmRequest .actionBox button.actionCancel").on("click", function() {
			$(".confirmRequest").css("display", "none");
		});
	});
}

function confirmedRequest() {
	$(".updateDialog .formAction li.requestReceive").addClass("selected");
	$(".updateDialog .formAction li.requestReceive").find("a").find("img").css("display", "inline-block");
	$(".updateDialog .formAction li.requestReceive").find("a").find("span").text("已请求财务确认接收");
}

function unconfirmedRequest() {
	$(".updateDialog .formAction li.requestReceive").removeClass("selected");
	$(".updateDialog .formAction li.requestReceive").find("a").find("img").css("display", "none");
	$(".updateDialog .formAction li.requestReceive").find("a").find("span").text("销售已收款，请求财务确认接收");
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

//INVOICE输入检测
function checkInvoice() {
	$(".systematicSearch ul.searchFloor li div.invoiceInfo div.invoice1").find("input").on("keyup", function() {
		if($(this).siblings("input").val()==""){
   			alert("请确认两项信息已输入");
   		}
   		else{
   			if((!isNaN($(this).val()))&&(!isNaN($(this).siblings("input").val()))) {

	 		}
	 		else {
	 			alert("请确认填写数字格式");
				if(isNaN($(this).val())){
					$(this).val("");
					$(this).focus();
				}
				if(isNaN($(this).siblings("input").val())){
					$(this).siblings("input").val("");
					$(this).siblings("input").focus();
				}
	 		}
   		}
	});
	$(".systematicSearch ul.searchFloor li div.invoiceInfo").find("img").on("click",function(){
		if($(this).attr("src")=="../img/invoice_icon1.png"){
			$(this).attr("src","../img/invoice_icon2.png");
			$(".filterBox ul.searchFloor li div.invoiceInfo div.invoice2").css("display","none");
			$(".filterBox ul.searchFloor li div.invoiceInfo div.invoice1").css("display","inline-block");
			$(".systematicSearch ul.searchFloor li div.invoiceInfo").find("input").val("");
		}
		else{
			$(this).attr("src","../img/invoice_icon1.png");
			$(".filterBox ul.searchFloor li div.invoiceInfo div.invoice1").css("display","none");
			$(".filterBox ul.searchFloor li div.invoiceInfo div.invoice2").css("display","inline-block");
			$(".systematicSearch ul.searchFloor li div.invoiceInfo").find("input").val("");
		}
	});
}

//箭头切换：
function arrowStatus() {
	$(".updateTab ul.tabListTitle li a").on("click", function() {
		if(($(this).find("img.arrow_down").attr("src") == "../img/arrowDown_icon.png") && ($(this).find("img.arrow_up").attr("src") == "../img/arrowUp0_icon.png")) {
			$(this).find("img.arrow_down").attr("src", "../img/arrowDown0_icon.png");
			$(this).find("img.arrow_up").attr("src", "../img/arrowUp_icon.png");
		}
		else {
			$(this).find("img.arrow_down").attr("src", "../img/arrowDown_icon.png");
			$(this).find("img.arrow_up").attr("src", "../img/arrowUp0_icon.png");
		}
		$(this).parent("li").siblings("li").find("img.arrow_down").attr("src", "../img/arrowDown0_icon.png");
		$(this).parent("li").siblings("li").find("img.arrow_up").attr("src", "../img/arrowUp0_icon.png");
	});
}

function Pagination() {
	$('#p4').pagination({
		totalData: 30,
		showData: 10,
		coping: true,
		homePage: '首页',
		endPage: '末页',
		prevContent: '上页',
		nextContent: '下页',
		callback: function(api) {
			var j = api.getCurrent(); //获取当前页
			$('ul.tabList.tabListDetail').empty();
			var e = `<li>
				<dl class="callout_button">
					<label class="confirmedStatus"></label>
					<dd class='systemNum'><a href='javascript:void(0);'></a></dd>
	            	<dd class='invoice'><a href='javascript:void(0);'></a></dd>
	            	<dd class='profit'><a href='javascript:void(0);'></a></dd>
	           		<dd class='debt'><a href='javascript:void(0);'></a></dd>
	            	<dd class='receivable'><a href='javascript:void(0);'></a></dd>
	            	<dd class='salePrice'><a href='javascript:void(0);'></a></dd>
	            	<dd class='createDate'><a href='javascript:void(0);'></a></dd>
	            	<dd class='customerName'><a href='javascript:void(0);'></a></dd>
	            	<dd class='startTime'><a href='javascript:void(0);'></a></dd>
	            	<dd class='returnTime'><a href='javascript:void(0);'></a></dd>
	            	<dd class='lockStatus'></dd>
	            	<dd class='finishStatus'></dd>
	            	<dd class='number'><a href="javascript:void(0);"></a></dd>
	            </dl>
	        </li>`;
			$('ul.tabListDetail').append(e);
			heightRange();
		}
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
		if(systemNumTxt !== "") {
			if(currentListTxt.indexOf(currentInputTxt) == -1) {
				i++;
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

function radminidInfo() {
	$(document).on("click", "ul.add-msg div.systemNumTab li.tab_content dd.number a", function() {
		if($.trim($(this).text()) == "") {} else {
			var thisLi = $(this).parent().parent().parent("li");
			var summaryNum = $.trim(thisLi.find("dd.number").text());
			if(thisLi.find("dl.unfold").css("display") == "block") {
				thisLi.find("dl.unfold").remove();
				thisLi.removeClass("current");
				heightRange();
			} else {
				var currentNum = thisLi.find("dd.numberInfo").text();
				var numInfo = $.trim($(this).text()).split(",");
				var numArr = [];
				for(var j = 0; j < numInfo.length; j++) {
					numArr.push(numInfo[j]);
				}
				localStorage.setItem("numArr", numArr);
				for(var i = 0; i < numInfo.length; i++) {
					var serialNum;
					if(i == 0) {
						numArr = localStorage.getItem("numArr");
						numArr = numArr.split(',');
						numArr.splice(0, 1);
						serialNum = currentNum + ',' + numArr;
						serialNum = $.trim(serialNum);
					}
					//1个编号:
					if(numInfo.length == 1) {
						serialNum = serialNum.replace(',', '');
					}
					var e = `
					<dl class="unfold">
						<dd class="selectInfo">
							<div class="checkbox checkbox-success">
								<input id="numInfo_` + i + `" class="styled" type="checkbox">
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
					numArr = localStorage.getItem("numArr");
					numArr = numArr.split(',');
					numArr.splice(i + 1, 1);
					serialNum = serialNum = currentNum + ',' + numArr;
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
//	$(".currency_type").find("button").on("click",function(){
//		$("ul.currency_box").css("cssText", "display:none !important");
//	});

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
		$(".payService ul li .payment").find("ul.dropdown-menu.drop3Menu").css({
			"width":"120px",
			"top":"115px",
			"left":"106px"
		})
		$(".payService ul li .payment").find("ul.dropdown-menu.drop3Menu").css("min-width", "initial");
		$(".partCreditCard").find("li").removeClass("requiredItem");
	});
	if($(".mcoList").css("display") == "block") {
		$(".mcoList").css("display", "block");
		$("input#face-value").removeClass("notRequired");
		$("input#mco-value").removeClass("notRequired");
		$("input#mco-credit").removeClass("notRequired");
		$("input#card-number").removeClass("notRequired");
		$("input#card-holder").removeClass("notRequired");

	} else {
		$("input#face-value").addClass("notRequired");
		$("input#mco-value").addClass("notRequired");
		$("input#mco-credit").addClass("notRequired");
		$("input#card-number").addClass("notRequired");
		$("input#card-holder").addClass("notRequired");
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
		//信用卡和MCO支付
		if(($.trim(payment_type.text()) == "供应商部分刷卡+额外MCO") || ($.trim(payment_type.text()) == "全额MCO")) {
			$(".mcoList").css("display", "block");
			$("input#face-value").removeClass("notRequired");
			$("input#mco-value").removeClass("notRequired");
			$("input#mco-credit").removeClass("notRequired");
			$("input#card-number").removeClass("notRequired");
			$("input#card-holder").removeClass("notRequired");
//			console.log($(".requiredItem").find("input:not([class='notRequired'])").length);
			$(".creditCardInfo").css("display", "block");
		}
		else {
			$(".mcoList").css("display", "none");
			$("input#face-value").addClass("notRequired");
			$("input#mco-value").addClass("notRequired");
			$("input#mco-credit").addClass("notRequired");
			$("input#card-number").addClass("notRequired");
			$("input#card-holder").addClass("notRequired");
//			console.log($(".requiredItem").find("input:not([class='notRequired'])").length);
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
		$(".partCreditCard").find("li").removeClass("requiredItem");
		$("input.non-creditCardAmount").val("");
		$("input.creditCardAmount").val("");

	});
	//非刷卡支付
	$(".payService ul li .payment").find(".paymentMethod").find("ul.dropdown-menu.no-creditCardPayment").find("li").find("a").on("click", function() {
		var payment_type = $(".payService ul li .payment").find(".paymentMethod").find("button.btn").find("span.txt");
		payment_type.text($(this).text());
		$(".mcoList").css("display", "none");

		$("input#face-value").addClass("notRequired");
		$("input#mco-value").addClass("notRequired");
		$("input#mco-credit").addClass("notRequired");
		$("input#card-number").addClass("notRequired");
		$("input#card-holder").addClass("notRequired");

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
		$(".partCreditCard").find("li").removeClass("requiredItem");
		$("input.non-creditCardAmount").val("");
		$("input.creditCardAmount").val("");
	});
	//供应商部分刷卡+非刷卡支付
	$(".payService ul li .payment").find(".paymentMethod").find("ul.dropdown-menu.drop3Menu").find("li").find("a").on("click", function() {
		var payment_type = $(".payService ul li .payment").find(".paymentMethod").find("button.btn").find("span.txt");
		payment_type.text("供应商部分刷卡+" + $(this).text());
		$(".mcoList").css("display", "none");
		$(".partCreditCard").css("display", "block");
		$(".partCreditCard").find("li").addClass("requiredItem");
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
	salePrice = $("input#indiv_sale_price").val();
	basePrice = $("input#indiv_base_price").val();
 	mcoAmount = $("input.indiv_mcoAmount").val();
	mcoCredit = $("input.mcoCreditInfo").val();
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
		salePrice = $("input#indiv_sale_price").val();;
		basePrice = $("input#indiv_base_price").val()
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
	$("input.mcoCreditInfo").on("keyup", function() {
		profitType();
		exchangeRate = $("input#indiv_exchange_rate").val();
		profit = $("input#indiv-profit");
		salePrice = $("input#indiv_sale_price").val();;
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
			salePrice = $("input#indiv_sale_price").val();;
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

		$(".partCreditCard").find("li").find("span.currency").text($.trim($("span.salePrice_currency").text()));

		profitInfor(profit, salePrice, basePrice, mcoAmount, mcoCredit, exchangeRate);
	});
	//底价下拉菜单:
	$("ul.dropdown-menu.currency_box.basePrice_currencyBox").find("li").find("a").on("click", function() {
		profitType();

		exchangeRate =$("input#indiv_exchange_rate").val();
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
	$(".payService").find("input").on("keyup", function() {
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

//目的地  s
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
//目的地  e
//费率      s
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
		exchangeRate = $("input#indiv_exchange_rate").val();
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
			salePrice = $("input#indiv_sale_price").val();
			basePrice = $("input#indiv_base_price").val();
			mcoAmount = $("input#mco-value").val();
			mcoCredit = $("input#mco-credit").val();
		}
		profitInfor(profit, salePrice, basePrice, mcoAmount, mcoCredit, exchangeRate);
	});

}
//费率      e

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
		var exchangeRate = $("input#indiv_exchange_rate").val();
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
			salePrice = $("input#indiv_sale_price").val();
			basePrice =	$("input#indiv_base_price").val();
			mcoAmount = $("input#mco-value").val();
			mcoCredit = $("input#mco-credit").val();
		}
		profitInfor(profit, salePrice, basePrice, mcoAmount, mcoCredit, exchangeRate);
	});
}

//供应商部分刷卡+非刷卡支付
function partCreditCard() {
	$("input.creditCardAmount").on("keyup", function() {
		var salePrice =  $("input#indiv_sale_price").val();
		if(salePrice !== "") {
			var amount = Number(salePrice - $(this).val());
			$("input.non-creditCardAmount").val(amount);
		}
	})
	$("input.non-creditCardAmount").on("keyup", function() {
		var salePrice =  $("input#indiv_sale_price").val();
		if(salePrice !== "") {
			var amount = Number(salePrice - $(this).val());
			$("input.creditCardAmount").val(amount);
		}
	})
}
