$(document).ready(function() {
	sendMail();
	travelInfor();
	confirmRequest();
	paymentMethod();
	priceCalculate();
	getCalculateprofitInfo();
	$("div.notesInfor").on("keyup", function() {
		heightRange();
	});
	ordersAssociated();
	radminidInfo();
	systematicSearch();
	getTimeInfo();
	resetSystematicSearch();
	checkInvoice();
	arrowStatus();
	rateInfo();//费率
	passengerInfo();//乘客
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
	var salePrice = 0; //销售价
	var basePrice = 0; //底价
	var returnCash = 0;; //返现
	var discount = 0;
	var profit = $("#airTicketProfit");
	var exchangeRate = 0;
	/*
	 *  载入当前页的数据
	 */
	function loadCurrentPage(data) {
		$.ajax({
			url: location.protocol.concat("//").concat(location.host).concat('/database/Business/AirTicket/AirTicketGetOrderList.php'),
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
					var wholesaler = response[i]['wholesaler_code'] == null ? '' : response[i]['wholesaler_code'];
					var lockStatus = response[i]['lock_status'] == 'Y' ? 'yesStatus' : 'noStatus';
					var finishStatus = response[i]['finish_status'] == 'Y' ? 'yesStatus' : 'noStatus';
					var following_id = response[i]['following_id_collection'] == null ? '' : response[i]['following_id_collection'];
					var $html = `
							<li><dl class="callout_button_plane">
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

				if (response['sum_profit'] == null) {
					$("#sum_profit").text(0);
				} else {
					$("#sum_profit").text(response['sum_profit']);
				}
				if (response['sum_debt'] == null) {
					$("#sum_debt").text(0);
				} else {
					$("#sum_debt").text(response['sum_debt']);
				}
				if (response['sum_received'] == null) {
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
					$('#airticket-pagination').pagination({
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
							inputData['offset'] = (i - 1) * 15;
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
			orderType: 'airticket',
			transaction_id: $("#transaction-id").val(),
			locator: $("#locator").val(),
			fname: $("#fname").val(),
			lname: $("#lname").val(),
			from_invoice: $("#from-invoice").val(),
			to_invoice: $("#to-invoice").val(),
			invoice: $("#invoice-filter").val(),
			wholesaler: $("#wholesaler-filter").val(),
			payment_type: $("#payment-type").val(),
			lock_status: $("#lock-status").val(),
			clear_status: $("#clear-status").val(),
			paid_status: $("#paid-status").val(),
			finish_status: $("#paid-status").val(),
			airline: $("#airline").val()
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
	loadData(getFilterData());

	$("#filter-confirm").on('click', function() {
		loadData(getFilterData());
	});
	$("#filter-reset").on('click', function() {
		$(".filterBox ul.searchFloor li div").find("input").val("");
		$(".filterBox ul.searchFloor li div").find("select").val("all");
		loadData(getFilterData());
	});

	/*
	 * 显示选中订单的具体信息
	 */
	$(document).on('click', 'ul.tabListDetail li', function() {
		// unconfirmedRequest();
		$(this).addClass("active").siblings().removeClass("active");
		var transactionId = $('.active').find('dl dd.systemNum a')['0'].innerText;
		if(isNaN(transactionId)) {
			transactionId = transactionId.substring(0, transactionId.length - 3);
		}
		$.ajax({
			url: location.protocol.concat("//").concat(location.host).concat('/database/Business/AirTicket/AirTicketGetDetail.php'),
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			type: 'GET',
			data: { transaction_id: transactionId },
			success: function(response) {
				response = JSON.parse(response);
				console.log(response);
				$("#airticket-itinerary").val(response['itinerary']);
				$("#airticket_salesperson").val(response['salesperson_code']);
				$("#air-ticket-create-locator").val(response['locators']);
				$("#air-ticket-create-air-company-code").val(response['flight_code']);

				if(response['round_trip'] == 'oneway') {
					$(".roundTripItem").removeClass("option-active");
					$(".singleTripItem").addClass("option-active");
				} else {
					$(".roundTripItem").addClass("option-active");
					$(".singleTripItem").removeClass("option-active");
				}
				if(response['ticket_type'] == 'individual') {
					$(".update-group").removeClass("option-active");
					$(".update-individual").addClass("option-active");
				} else {
					$(".update-group").addClass("option-active");
					$(".update-individual").removeClass("option-active");
				}

				$("#air-ticket-create-total-number").val(response['total_number']);
				$("#ticketed_time").val(response['ticketed_date'].substring(0, 10));
				$("#wholesaler").val(response['wholesaler_code']);
				$("#air-ticket-create-invoice").val(response['invoice']);
				$("#airticket_source").val(response['source_name']);
				$("#air-ticket-create-note").val(response['note']);

				$("#air-ticket-schedule").empty();
				var numTrips = response['flight_number'].length;
				for(var i = 0; i < numTrips; i++) {
					$("#air-ticket-schedule").append(`
												<li class="requiredItem">
														<label class="nm-left">旅途</label>
														<div class="tour">
																<input type="text" placeholder="航班号" class="flightNum"  value=""/>
																<input type="date" placeholder="出发时间" class="startTime"/>
																<input type="text" placeholder="机场" class="airport"/>
														</div>
												</li>
										`);
				}
				$("ul#air-ticket-schedule").find("li").first().append(
					`
					<img src="../img/addIcon.png" class="addInfo">
					<img src="../img/deleteIcon.png" class="deleteInfo"/>
					`
				);
				for(var i = 0; i < numTrips; i++) {
					$(".flightNum").eq(i).val(response['flight_number'][i]);
					$("input.startTime").eq(i).val(response['depart_date'][i].substring(0, 10));
					$(".airport").eq(i).val(response['depart_airport'][i].concat('-').concat(response['arrival_airport'][i]));
				}

				$("#exchange_rate").val(response['exchange_rate_usd_rmb']);
				var payment_area = response['deal_location'] == 'US' ? '美国' : '中国';
				$("#payment-area")[0].innerHTML = payment_area;
				$("#air_amountDue").val(response['selling_price']);
				var selling_currency = response['selling_currency'] == 'USD' ? '美元' : '人民币';
				$("#sell-price-currency")[0].innerText = selling_currency;

				$("#air-ticket-base-price").val(response['base_price']);
				var base_currency = response['base_currency'] == 'USD' ? '美元' : '人民币';
				$("#base-price-currency")[0].innerText = base_currency;

				var payment_type = response['payment_type'];
				if(payment_type == 'airmco') {
					payment_type = '航司刷卡+MCO';
				} else if(payment_type == 'airall') {
					payment_type = '航司全额刷卡';
				} else if(payment_type == 'remit') {
					payment_type = 'REMIT';
				} else if(payment_type == 'wechat') {
					payment_type = '微信支付';
				} else if(payment_type == 'alipay') {
					payment_type = '支付宝';
				} else if(payment_type == 'check') {
					payment_type = '支票';
				} else if(payment_type == 'cash') {
					payment_type = '现金';
				}
				$("#air-ticket-create-payment-type").text(payment_type);
				$("#airTicketProfit").val(response['total_profit']);
				$("#profit-currency")[0].innerText = '美元';


				if($("#air-ticket-create-payment-type")[0].innerHTML == "航司刷卡+MCO") {
					$("#airmco").click();
					$("#mco-party").text(response['mco_info'][0]['mco_party']);
					$("#face-value").val(response['mco_info'][0]['face_value']);
					var face_currency = '美元';
					if(response['mco_info'][0]['face_currency'] == 'RMB') {
						face_currency = '人民币';
					};
					$("#face-currency").text(face_currency);
					$("#mco-value").val(response['mco_info'][0]['mco_value']);
					var mco_currency = '美元';
					if(response['mco_info'][0]['face_currency'] == 'RMB') {
						mco_currency = '人民币';
					};
					$("#mco-currency").text(mco_currency);
					$("#mco-credit").val(response['mco_info'][0]['mco_credit']);
					var mco_credit_currency = '美元';
					if(response['mco_info'][0]['face_currency'] == 'RMB') {
						mco_credit_currency = '人民币';
					};
					$("#mco-credit-currency").text(mco_credit_currency);
					$("#fee-ratio").val(response['mco_info'][0]['fee_ratio']);

					$("#card-number").val(response['mco_info'][0]['card_number']);
					var expire_date = response['mco_info'][0]['exp_date'].split("/");
					$("#expired-date-month").val(expire_date[0]);
					$("#expired-date-year").val(expire_date[1]);
					$("#card-holder").val(response['mco_info'][0]['cardholder']);
					$("#mco-receiver").val(response['mco_info'][0]['account_id']);
				}

				for (var i = 0; i < response['total_number'] - 1; i++) {
					$("div#passenger-list").append(`
						<span>
							<select class="passenger-info">
								<option value="adult">成人</option>
								<option value="youth">青年</option>
								<option value="children">儿童</option>
								<option value="infant">婴儿</option>
							</select>
							<input type="text" placeholder="姓/名" class="passenger-name">
							<input type="text" placeholder="票号" class='passenger-ticket-number'>
						</span>
						`);
				}
				var customer_type = response['customer_type'].split(",");
				var customer_name = response['customer_name'].split(",");
				var airticket_number = response['airticket_number'].split(",");
				for (var i = 0; i < response['total_number']; i++) {
					$(".passenger-info").eq(i).val(customer_type[i]);
					$(".passenger-name").eq(i).val(customer_name[i]);
					$(".passenger-ticket-number").eq(i).val(airticket_number[i]);
				}
				$("#ticket-create-customer-phone").val(response['phone']);
				$("#ticket-create-customer-email").val(response['email']);

				if(response['birth_date'] != null) {
					$("#ticket-create-customer-birthday").val(response['birth_date'].substring(0, 10));
				}
				$("#ticket-create-customer-gender").val(response['gender']);
				var other_contact_type = response['other_contact_type'].charAt(0).toUpperCase() + response['other_contact_type'].slice(1);
				$("#update-customer-otherContact").val(other_contact_type);
				$("#ticket-create-customer-otherContactLabel").text(other_contact_type + '帐号');
				$("#ticket-create-customer-otherContactNumber").val(response['other_contact_number']);
				$("#ticket-create-customer-zipcode").val(response['zipcode']);

				// $("ul.add-msg div.systemNumTab").css("display", "none");
				// $("li.tab_content").remove();
				// if(response['following_id_collection'] != null) {
				// 	var collection_ids = response['following_id_collection'].split(",");
				// 	for(var i = 0; i < collection_ids.length; i++) {
				// 		$.ajax({
				// 			url: location.protocol.concat("//").concat(location.host).concat('/database/Business/getCollectionList.php'),
				// 			type: 'GET',
				// 			data: {
				// 				collection_id: collection_ids[i]
				// 			},
				// 			success: function(response) {
				// 				response = JSON.parse(response);
				//
				// 				var following_id = response['following_id'];
				// 				if(following_id == null) {
				// 					following_id = "";
				// 				}
				// 				var appendContent = `
				// 							<li class="tab_content">
				// 								<dl>
				// 									<dd class="selectInfo">
				// 										<div class="checkbox checkbox-success">
				// 											<input class="styled" type="checkbox" checked="checked" >
				// 											<label></label>
				// 										</div>
				// 									</dd>
				// 									<dd class="numberInfo">` + response['transaction_id'] + `</dd>
				// 									<dd class="salesInfo">` + response['salesperson_code'] + `</dd>
				// 									<dd class="number">
				// 										<a>` + following_id + `</a>
				// 									</dd>
				// 								</dl>
				// 							</li>
				// 						`;
				//
				// 				$("ul.add-msg div.systemNumTab").css("display", "block");
				// 				$("ul.add-msg div.systemNumTab").find("li.tab_title").after(appendContent);
				// 				// $("ul.add-msg li.systemNum input").val("");
				// 				heightRange();
				// 				var ddCell = $("ul.add-msg div.systemNumTab li.tab_content dd");
				// 				ddCell.on("mouseenter", function() {
				// 					ddCell.each(function(i, item) {
				// 						var txt = $.trim($(item).text());
				// 						txt = txt.replace(/[\r\n]/g, "");
				// 						$(item).attr("title", txt);
				// 					});
				// 				});
				// 			},
				// 			error: function(jqXHR, textStatus, errorThrown) {
				// 				console.log(textStatus, errorThrown);
				// 			}
				// 		});
				// 	}
				// }
				//
				// $("#airticket-dialog").css("display", "block");
				// // document.getElementById("airTicketDiscountApply_update").click();
				// autoCenter($("#airticket-dialog"));
				// //利润   s
				// salePrice = response['sale_price']; //销售价
				// basePrice = response['base_price']; //底价
				// returnCash = response['received2']; //返现
				// profit = $("#airTicketProfit"); //利润
				// exchangeRate = response['exchange_rate_usd_rmb']; //利率
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

	//其他联系方式：
	$("#ticket-create-customer-otherContact").on('change', function() {
		$("#ticket-create-customer-otherContactLabel").text($("#ticket-create-customer-otherContact").val() + '帐号');
	});

	/*
	 * 得到销售，导游和来源的下拉列表
	 */
	$("#airticket_salesperson, #airticket_source, #wholesaler-filter, #accounting-received, #wholesaler, #mco-receiver").on('focus', function() {
		var current_id = $(this).attr('id');
		var target = "";
		if(current_id == 'airticket_salesperson') {
			target = 'salesperson';
		} else if(current_id == 'airticket_source') {
			target = 'source';
		} else if(current_id == 'wholesaler-filter' || current_id == 'wholesaler') {
			target = 'wholesaler';
		}
		else if(current_id == 'accounting-received' || current_id == 'mco-receiver') {
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
		var round_trip = 'oneway';
		if($("#air-ticket-create-round-trip").hasClass('option-active')) {
			round_trip = 'round';
		}
		var ticket_type = 'individual';
		if($("#air-ticket-create-ticket-type").hasClass('option-active')) {
			ticket_type = 'group';
		}

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
		var profit_currency = $("#profit-currency")[0].innerHTML;

		var data = {
			transactionId: $('.active').find('dl dd.listNum a')['0'].innerText,
			itinerary: $("#airticket-itinerary").val(),
			salesperson: $("#airticket_salesperson").val(),
			locator: $("#air-ticket-create-locator").val(),
			flight_code: $("#air-ticket-create-air-company-code").val(),
			round_trip: round_trip,
			ticket_type: ticket_type,
			total_number: $("#air-ticket-create-total-number").val(),
			wholesaler: $("#wholesaler").val(),
			invoice: $("#air-ticket-create-invoice").val(),
			source: $("#airticket_source").val(),
			note: $("#air-ticket-create-note").val(),

			exchange_rate: $("#exchange_rate").val(),
			payment_area: payment_area,
			sell_price: $("#air_amountDue").val(),
			sell_price_currency: sell_price_currency,
			base_price: $("#air-ticket-base-price").val(),
			base_price_currency: base_price_currency,
			payment_type: payment_type,
			profit: profit,
			profit_currency: profit_currency,

			adult_number: $("#air-ticket-create-adult-number").val(),
			youth_number: $("#air-ticket-create-youth-number").val(),
			children_number: $("#air-ticket-create-children-number").val(),
			infant_number: $("#air-ticket-create-baby-number").val(),
			passenger_list: $("#air-ticket-create-passenger-list").val(),

			phone: $("#ticket-create-customer-phone").val(),
			email: $("#ticket-create-customer-email").val(),
			birthday: $("#ticket-create-customer-birthday").val(),
			gender: $("#ticket-create-customer-gender").val(),
			other_contact_type: $("#ticket-create-customer-otherContact").val(),
			other_contact_number: $("#ticket-create-customer-otherContactNumber").val(),
			zipcode: $("#ticket-create-customer-zipcode").val(),
		}

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

		if(payment_type == 'airmco') {
			var mco_party = $("#mco-party")[0].innerHTML;
			var face_value = $("#face-value").val();
			var face_currency = $("#face-currency")[0].innerHTML == '美元' ? 'USD' : 'RMB';
			var mco_value = $("#mco-value").val();
			var mco_currency = $("#mco-currency")[0].innerHTML == '美元' ? 'USD' : 'RMB';
			var mco_credit = $("#mco-credit").val();
			var mco_credit_currency = $("#mco-credit-currency")[0].innerHTML == '美元' ? 'USD' : 'RMB';
			var fee_ratio = $("#fee-ratio").val();

			Object.assign(data, {
				mco_party: mco_party,
				face_value: face_value,
				face_currency: face_currency,
				mco_value: mco_value,
				mco_currency: mco_currency,
				mco_credit: mco_credit,
				mco_credit_currency: mco_credit_currency,
				fee_ratio: fee_ratio,
				card_number: $("#card-number").val(),
				expired_date_month: $("#expired-date-month").val(),
				expired_date_year: $("#expired-date-year").val(),
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

	/*
	 * 修改订单内容
	 */
	$("#updateConfirm").on('click', function() {
		$(".updateEditConfirmBox").css("display", "block");
	});

	$("#updateEditActionConfirm").on('click', function() {
		var data = getUpdateInfo();
		$.ajax({
			url: location.protocol.concat("//").concat(location.host).concat('/database/Business/AirTicket/AirTicketUpdate.php'),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			type: 'POST',
			data: data,
			success: function(response) {
				// console.log(response);
				location.reload();
				// updateDisplayInfo(data);
				$("#airticket-dialog").css("display", "none");
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

	// 更新订单列表的内容
	function updateDisplayInfo(data) {
		console.log(data);
		$("li.active").find("dd.listInvoice a").text(data['invoice']);
		$("li.active").find("dd.listLocation a").text(data['locator']);
		$("li.active").find("dd.listPayment a").text(data['payment_type']);
		$("li.active").find("dd.listCurrency a").text(data['currency']);
		$("li.active").find("dd.listPrice a").text(data['sell_price']);
		// $("li.active").find("dd.listReturnCash a").text(data['receive2']);
		$("li.active").find("dd.listCost a").text(data['base_price']);

		var reg = /^\d+(\.\d{1,2})?$/;
		var couponValue = 0;
		if(reg.test(data['coupon'])) {
			couponValue = Number(data['coupon']);
			$("li.active").find("dd.listDiscount a").text(couponValue);
			$("li.active").find("dd.listProfit a").text(Number(data['sell_price']) + Number(data['receive2']) - Number(data['base_price']) - couponValue);
		} else {
			var url = location.protocol.concat("//").concat(location.host).concat('/database/couponSearch.php');
			$.ajax({
				url: url,
				type: 'post',
				data: {
					couponCode: data['coupon']
				},
				success: function(response) {
					if(response == "") {
						couponValue = 0;
					} else if(response == 'Expired') {
						couponValue = 0;
					} else {
						couponValue = response;
					}
					$("li.active").find("dd.listDiscount a").text(couponValue);
					$("li.active").find("dd.listProfit a").text(Number(data['sell_price']) + Number(data['receive2']) - Number(data['base_price']) - couponValue);
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log(textStatus, errorThrown);
				}
			});
		}
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
		var url = location.protocol.concat("//").concat(location.host).concat('/database/Business/AirTicket/AirTicketDelete.php');
		$.ajax({
			url: url,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			type: 'POST',
			data: {
				action: 'deleteOrder',
				transaction_id: transactionId
			},
			success: function(response) {
				$("#airticket-dialog").css("display", "none");
				$(".updateDeleteConfirmBox").css("display", "none");
				$(".active").remove();
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

function dragAirBox() {
	var $dialog2 = $("#airticket-dialog");
	//机票弹出对话框
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
	$(document).on('click', '.callout_button_plane', function() {
		$("#airticket-dialog").css("display", "block");
		autoCenter($("#airticket-dialog"));
	});
	//点击关闭对话框
	$(".close_button-plane").click(function() {
		$("#airticket-dialog").css("display", "none");
		$(".updateDialog").find(".formAction").find("li.sendInvoice").find(".sendBox").css("display", "none");
	});
	//窗口大小改变时，对话框始终居中
	window.onresize = function() {
		autoCenter($("#airticket-dialog"));
	};
	//确认/重置选中状态

	$(".updateInfo ul.filterBox  li  dl.confirmMsg dd ").find("a").on("mousedown", function() {
		$(this).addClass("confirm-active");
	});
	$(".updateInfo ul.filterBox  li  dl.confirmMsg dd ").find("a").on("mouseup", function() {
		$(this).removeClass("confirm-active");
	});
}

//单程、往返
function airTicketOption() {
	//机票部分 (团票/散票;往返/单程切换)
	$(".ticket-option").find("dd").on("click", function() {
		$(this).addClass("option-active").siblings().removeClass("option-active");
	});
}

//总人数计算
function headCount() {
	$("#air-ticket-create-adult-number, #air-ticket-create-children-number, #air-ticket-create-baby-number, #air-ticket-create-youth-number").on("keyup", function() {
		var sum = parseInt($("#air-ticket-create-adult-number").val()) +
			parseInt($("#air-ticket-create-children-number").val()) +
			parseInt($("#air-ticket-create-baby-number").val()) +
			parseInt($("#air-ticket-create-youth-number").val());
		$("#air-ticket-create-total-number").val(sum);
	})
}

function autoCenterBox(el) {
	var bodyW = $("body").width() + 17;
	var bodyH = $(window).height();
	var elW = el.width();
	var elH = el.outerHeight();
	el.css({
		"left": (bodyW - parseFloat(bodyW * elW / 100)) / 2 + 'px',
		"top": (bodyH - elH) / 2 + 'px'
	});
}

function tipsBoxAutoCenter() {
	var tipsBoxHeight = $(".updateDialog").find(".formAction").find("li.sendInvoice").find(".sendBox").find("ul").outerHeight(true);
	var sendBoxHeight = $(".updateDialog .formAction li.sendInvoice").outerHeight();
	$(".updateDialog .formAction li.sendInvoice .sendBox").css({
		"top": -(tipsBoxHeight / 2 + sendBoxHeight / 2) + "px"
	});
	document.styleSheets[0].addRule('.updateDialog .formAction li.sendInvoice .sendBox::before', 'top:' + (tipsBoxHeight - 40) / 2 + 'px');
	document.styleSheets[0].addRule('.updateDialog .formAction li.sendInvoice .sendBox::after', 'top:' + (tipsBoxHeight - 40) / 2 + 'px');
}

function sendMail() {
	var layer;
	layui.use(['layer', 'jquery'], function() {
		layer = layui.layer;
	});
	$(".updateDialog").find(".formAction").find("li.sendInvoice").find("a.send").on("click", function() {
		$("li.sendInvoice").find(".sendBox").css("display", "block");
		$(".sendBox ul li input").val("");
		$("img.removeMail").parent("li.sendContent").remove();
		tipsBoxAutoCenter();
	});

	//添加/移除
	$(".sendBox").find("ul").find("li.sendContent").find("img").on("click", function() {
		if($(this).hasClass("addMail")) {
			var e = '<li class="sendContent">' +
				'<input type="text" name="newMail" />' +
				'<img src="../img/addIcon.png"  class="addMail"/>' +
				'</li>';
			$(".sendBox").find("ul").find("li.sendBtn").before(e);
			$(this).attr("src", "../img/removeIcon.png");
			$(this).removeClass("addMail");
			$(this).addClass("removeMail");
			sendMail();
		} else if($(this).hasClass("removeMail")) {
			$(this).parent("li.sendContent").remove();
		}
		tipsBoxAutoCenter();
	});

	//发送邮件
	$(".sendBox ul li a.sendMailBtn").unbind("click").on('click', function() {
		var transactionId = $('.active').find('dl dd.listNum a')['0'].innerText;
		var lname = $("#update-customer-lname").val();
		var fname = $("#update-customer-fname").val();
		var price = $("#update-receive1").val();
		var itinerary = $("#airticket-itinerary").val();
		var method = $("#air-ticket-create-payment-type option:selected").text();
		var startstring = itinerary.substring(0, 6);
		var start1 = startstring.match(/1P-\s/g);
		var start2 = startstring.match(/1\.[A-Z]/g);
		var start3 = startstring.match(/\*\w{6}/g);
		var start4 = startstring.match(/RP/g);

		var type;
		if(start1 != null) {
			type = 1;
		} else if(start2 != null) {
			type = 2;
		} else if(start3 != null) {
			type = 3;
		} else if(start4 != null) {
			type = 4;
		}
		var description;
		switch(type) {
			case 1:
				description = itinerary.match(/\d[\s\*]+\w{2}\s*\d*\w{1}\s\d{2}\w{3}\s\w{2}\s*\w{6}\s\w{3}\s*\d+[P,A,N]/g);
				break
			case 2:
				description = itinerary.match(/\d\.\s+\w{2}\d+\s+\w+\s*(\w{2}\d{2}\w{3})\s+\w{6}\s+\w{3}\s*\d+/g);
				break;
			case 3:
				description = itinerary.match(/\d\s+\w{2}\s*\d*\w{1}\s\d{2}\w{3}\s\d\s*\w{6}\s\w{3}\s*\d+\s*[A-Za-z0-9\/\s\*]*/g);
				break;
			case 4:
				description = itinerary.match(/\d\s*\w{2}\s*\d*\s[A-Z]\s\d{2}\w{3}\s\d\s\w{6}/g);
				break;
			default:
				break;
		}
		var isSend = false;
		var receiver = "";
		$(".sendBox ul li input").each(function(i, item) {
			if($(item).val() !== "") {
				isSend = true;
				receiver = receiver + ";" + $(item).val();
			} else {
				isSend = false;
			}
		});
		if(isSend == false) {
			alert("邮件信息不能为空");
		} else {
			layer.confirm('是否确认发送?',
				function(index) {
					layer.close(index);
					$("li.sendInvoice").find(".sendBox").css("display", "none");
					$.ajax({
						url: "../../AirTicket/SendEmail.php",
						type: "POST",
						data: {
							receiver: receiver.substr(1, receiver.length),
							bill_name: lname + " " + fname,
							price: price,
							itinerary: description,
							transactionId: transactionId,
							method: method
						},
						success: function(data) {
							if(data == "1") {
								alert("邮件发送成功");
							} else {
								alert("邮件发送失败！");
							}
						},
					});
				}
			);
		}
	});
	//取消发送
	$(".sendBox ul li a.cancelBtn").on("click", function() {
		$("li.sendInvoice").find(".sendBox").css("display", "none");
	});
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

//折扣
function updateAirTicketTourDiscount(discountText, discountNotice, discountApply, subtractNum, discountOption, coupon_currency) {
	heightRange();
	discountOption.find("dd").on("click", function() {
		$(this).addClass("option-active").siblings().removeClass("option-active");
	});
	discountApply.on("click", function() {
		profit = $("input#airTicketProfit"); //利润
		basePrice = $("input#air-ticket-base-price").val();
		salePrice = $("input#air_amountDue").val();
		returnCash = $("input#update-receive2").val();
		exchangeRate = $("input#exchange_rate").val();
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
				if($("ul.add-msg li.discountCard dl.discountNotice").css("display") == "none") {
					discount = 0;
				} else {
					if($("span#airTicketSubtractNum_update").text().split(':')[1].split(" ")[2] == "USD") {
						discount = $("span#airTicketSubtractNum_update").text().split(':')[1].split(" ")[1];
					}
					if($("span#airTicketSubtractNum_update").text().split(':')[1].split(" ")[2] == "RMB") {
						discount = ($("span#airTicketSubtractNum_update").text().split(':')[1].split(" ")[1] / exchangeRate).toFixed(2);
					}
				}
				updateProfitCalculate(basePrice, salePrice, returnCash, discount, profit, exchangeRate);
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
							if($("span#airTicketSubtractNum_update").text().split(':')[1].split(" ")[2] == "USD") {
								discount = $("span#airTicketSubtractNum_update").text().split(':')[1].split(" ")[1];
							}
							if($("span#airTicketSubtractNum_update").text().split(':')[1].split(" ")[2] == "RMB") {
								discount = ($("span#airTicketSubtractNum_update").text().split(':')[1].split(" ")[1] / exchangeRate).toFixed(2);
							}
						}
						updateProfitCalculate(basePrice, salePrice, returnCash, discount, profit, exchangeRate);
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log(textStatus, errorThrown);
				}
			});
		}

	});
}

function confirmRequest() {
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
		<li class="requiredItem">
			<label class="nm-left">旅途</label>
			<div class="tour nm-left">
				<input type="text" placeholder="航班号" class="flightNum"  value=""/>
				<input type="date" placeholder="出发时间" class="startTime"/>
				<input type="text" placeholder="机场" class="airport" maxlength="3"/>
			</div>
		</li>
		`;
	$("ul#air-ticket-schedule").append(e);
	heightRange();
}

//删除
function deleteTravelInfor() {
	if($("ul#air-ticket-schedule").find("li.requiredItem").length > 1) {
		$("ul#air-ticket-schedule").find("li.requiredItem").last().remove();
	} else {
		alert("至少含一项旅途");
	}
	heightRange();
}

//付款方式：
function paymentMethod() {
	$('.dropdown-submenu > a').submenupicker();
	//地区
	$("ul.add-msg li.payment-type div.payment .area").find(".dropdown-menu").find("li").find("a").on("click", function() {
		$("ul.add-msg li.payment-type div.payment .area").find("button").find("span.txt").text($(this).text());
	});
	//支付方式-信用卡
	$("ul.add-msg li.payment-type div.payment .paymentMethod").find(".dropdown-menu.method1").find("li").find("a").on("click", function() {
		var txt = "信用卡" + $(this).text();
		$("ul.add-msg li.payment-type div.payment .paymentMethod").find("button").find("span.txt").text(txt);
		var way = $("ul.add-msg li.payment-type div.payment .paymentMethod").find("button").find("span.txt").text();
		if(way == "信用卡MCO") {
			$(".mcoList").css("display", "block");
		} else {
			$(".mcoList").css("display", "none");
		}
	});
	//非信用卡
	$("ul.add-msg li.payment-type div.payment .paymentMethod").find(".dropdown-menu.method2").find("li").find("a").on("click", function() {
		$("ul.add-msg li.payment-type div.payment .paymentMethod").find("button").find("span.txt").text($(this).text());
		$(".mcoList").css("display", "none");
	});
	//实行
	$("ul.add-msg li.payment-type.execute div.payment").find(".dropdown-menu").find("li").find("a").on("click", function() {
		$("ul.add-msg li.payment-type.execute div.payment").find("button").find("span.txt").text($(this).text());
		if($("ul.add-msg li.payment-type.execute div.payment").find("button").find("span.txt").text() == "OTHER") {
			$("ul.add-msg li.payment-type.execute input.other").css("display", "inline-block");
		} else {
			$("ul.add-msg li.payment-type.execute input.other").css("display", "none");
		}
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
		if(currentArea.text() == "美国") {
			currentCurrency.text("美元");
		}
		if(currentArea.text() == "中国") {
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
			if($(item).text() == "人民币") {
				num++;
			}
			currencyArr.push($(item).text());
		});
		if(($.inArray("人民币", currencyArr) !== -1) && num < len) {
			$(".airticketMsg ul.add-msg li.exchangeRate").addClass("requiredItem");
		} else {
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
		$(".creditCardInfo").find("input").val("");
		$(".creditCardInfo").find("select").prop('selectedIndex', 0);
		$(".creditCardInfo").css("display", "none");

	}
	//支付方式-信用卡
	$(".payService ul li .payment").find(".paymentMethod").find("ul.dropdown-menu.creditCardPayment").find("li").find("a").on("click", function() {
		var payment_type = $(".payService ul li .payment").find(".paymentMethod").find("button.btn").find("span.txt");
		payment_type.text($(this).text());
		//信用卡和MCO支付
		if(payment_type.text() == "航司刷卡+MCO") {
			$(".mcoList").css("display", "block");

			$("input#face-value").removeClass("notRequired");
			$("input#mco-value").removeClass("notRequired");
			$("input#mco-credit").removeClass("notRequired");
			$("input#card-number").removeClass("notRequired");
			$("input#card-holder").removeClass("notRequired");
			$(".creditCardInfo").css("display", "block"); //输入信用卡
		}
		else {
			$(".mcoList").css("display", "none");
			$(".creditCardInfo").find("input").val("");
			$(".creditCardInfo").find("select").prop('selectedIndex', 0);
			$(".creditCardInfo").css("display", "none"); //输入信用卡
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

		}
	});
	//支付方式-非信用卡
	$(".payService ul li .payment").find(".paymentMethod").find("ul.dropdown-menu.no-creditCardPayment").find("li").find("a").on("click", function() {
		var payment_type = $(".payService ul li .payment").find(".paymentMethod").find("button.btn").find("span.txt");
		payment_type.text($(this).text());
		$(".mcoList").css("display", "none");

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

		$(".creditCardInfo").find("input").val("");
		$(".creditCardInfo").find("select").prop('selectedIndex', 0);
		$(".creditCardInfo").css("display", "none");


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
		salePrice = $("input.airTicket_sellPrice").val();
		faceValue = $(this).val();
		mcoAmount = $("input.airTicket_mcoAmount").val();
		if(salePrice !== "") {
			mcoAmountCalculate($("input.airTicket_mcoAmount"), salePrice, faceValue);
		}
	});
	//mco金额
	$("input.airTicket_mcoAmount").on("keyup", function() {
		salePrice = $("input.airTicket_sellPrice").val();
		faceValue = $("input.airTicket_faceValue").val();
		mcoAmount = $(this).val();
		if(salePrice !== "") {
			faceValueCalculate($("input.airTicket_faceValue"), mcoAmount, salePrice);
		}
	});
	//卖价
	$("input.airTicket_sellPrice").on("keyup", function() {
		salePrice = $(this).val();
		faceValue = $("input.airTicket_faceValue").val();
		mcoAmount = $("input.airTicket_mcoAmount").val();
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
		salePrice = $(this).val()
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
			mcoCredit = $("input.mcoCreditInfo").val();
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
			mcoCredit = $("input.mcoCreditInfo").val();
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
			mcoCredit = $("input.mcoCreditInfo").val();
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

	//卖价下拉菜单选择
	$("ul.dropdown-menu.currency_box.salePrice_currencyBox").find("li").find("a").on("click", function() {
		profitType();
		exchangeRate = $("input#exchange_rate").val();
		profit = $("input#airTicketProfit");
		salePrice = $("input#air_amountDue").val();
		basePrice = $("input#air-ticket-base-price").val();
		mcoAmount = $("input.airTicket_mcoAmount").val();
		mcoCredit = $("input.mcoCreditInfo").val();
		if($("li.list_account.profitInfor").find("span").text() == "人民币") {
			salePrice = $("input#air_amountDue").val();;
			basePrice = $("input#air-ticket-base-price").val();
			mcoAmount = $("input.airTicket_mcoAmount").val();
			mcoCredit = $("input.mcoCreditInfo").val();
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
		mcoCredit = $("input.mcoCreditInfo").val();
		if($("li.list_account.profitInfor").find("span").text() == "人民币") {
			salePrice = $("input#air_amountDue").val();
			basePrice = $("input#air-ticket-base-price").val();
			mcoAmount = $("input.airTicket_mcoAmount").val();
			mcoCredit = $("input.mcoCreditInfo").val();
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
	});
	//mco金额下拉菜单:
	$("ul.dropdown-menu.currency_box.mcoAmount_currencyBox").find("li").find("a").on("click", function() {
		profitType();
		exchangeRate = $("input#exchange_rate").val();
		profit = $("input#airTicketProfit");
		salePrice = $("input#air_amountDue").val();
		basePrice = $("input#air-ticket-base-price").val();
		mcoAmount = $("input.airTicket_mcoAmount").val();
		mcoCredit = $("input.mcoCreditInfo").val();
		if($("li.list_account.profitInfor").find("span").text() == "人民币") {
			salePrice = $("input#air_amountDue").val();
			basePrice = $("input#air-ticket-base-price").val();
			mcoAmount = $("input.airTicket_mcoAmount").val();
			mcoCredit = $("input.mcoCreditInfo").val();
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
		mcoCredit = $("input.mcoCreditInfo").val();
		if($("li.list_account.profitInfor").find("span").text() == "人民币") {
			salePrice = $("input#air_amountDue").val();
			basePrice = $("input#air-ticket-base-price").val();
			mcoAmount = $("input.airTicket_mcoAmount").val();
			mcoCredit = $("input.mcoCreditInfo").val();
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
		profitInfor(profit, salePrice, basePrice, mcoAmount, mcoCredit, exchangeRate);
	});

	var checkNum = /^\d+(\.\d+)?$/;
	$(".payService").find("input").on("keyup", function() {
		if(!checkNum.test($(this).val())) {
			//			alert("请输入数字");
			$("input#exchange_rate").val("");
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

//箭头切换：
function arrowStatus() {
	$(".updateTab ul.tabListTitle li a").on("click", function() {
		if(($(this).find("img.arrow_down").attr("src") == "../img/arrowDown_icon.png") && ($(this).find("img.arrow_up").attr("src") == "../img/arrowUp0_icon.png")) {
			$(this).find("img.arrow_down").attr("src", "../img/arrowDown0_icon.png");
			$(this).find("img.arrow_up").attr("src", "../img/arrowUp_icon.png");
		} else {
			$(this).find("img.arrow_down").attr("src", "../img/arrowDown_icon.png");
			$(this).find("img.arrow_up").attr("src", "../img/arrowUp0_icon.png");
		}
		$(this).parent("li").siblings("li").find("img.arrow_down").attr("src", "../img/arrowDown0_icon.png");
		$(this).parent("li").siblings("li").find("img.arrow_up").attr("src", "../img/arrowUp0_icon.png");
	});
}

//费率：
function rateInfo() {
	$(".updateDialog .updateForm ul.add-msg li.list_account.rate a").on("mousedown", function() {
		$(this).addClass("selected");
	});
	$(".updateDialog .updateForm ul.add-msg li.list_account.rate a").on("mouseup", function() {
		$(this).removeClass("selected");
	});
	$(".updateDialog .updateForm ul.add-msg li.list_account.rate a").on("click", function() {
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
