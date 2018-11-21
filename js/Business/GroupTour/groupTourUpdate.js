$(document).ready(function() {
	addNewPrice();
	addNewGuide();
	getPriceInfo();
	calculateCharge();
	addNewWholesaler();
	// addWholesalerInfo();
	// getWholeSaler();
	confirmRequest();
	printReserve();
	toPrintPage();
	getDays();
	getWholeSaler();
	closeReseveBox();
	$(".toPrintPage ul.reserveTab li.createPrintPage").find("a").on("mousedown", function() {
		$(this).addClass("selected");
	});
	$(".toPrintPage ul.reserveTab li.createPrintPage").find("a").on("mouseup", function() {
		$(this).removeClass("selected");
	});
	$(document).on('mousedown', 'ul.add-msg li.list_cost a', function() {
		$(this).addClass("selected");
	});
	$(document).on('mouseup', 'ul.add-msg li.list_cost a', function() {
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
	/*
	 *  载入当前页的数据
	 */
	function loadCurrentPage(data) {
		var url = location.protocol.concat("//").concat(location.host).concat('/database/Business/GroupTour/GroupTourGetOrderList.php');
		$.ajax({
			url: url,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			type: 'GET',
			data: data,
			success: function(response) {
				console.log(response);
				response = JSON.parse(response);

				$('ul.tabListDetail').empty();
				for(var i = 0; i < response.length; ++i) {
					$html = `<li><dl class="callout_button">`;
					if(response[i]['process'] == 'confirmed') {
						$html += `<label class="confirmedStatus"></label>`;
					} else if(response[i]['process'] == 'pending') {
						$html += `<label class="otherStatus"></label>`;
					}
					$html += `
	            <dd class="listNum"><a href="javascript:void(0);">` + response[i]['transaction_id'] + `</a></dd>
	            <dd class="listCreatTime"><a href="javascript:void(0);">` + response[i]['create_time'] + `</a></dd>
	            <dd class="listGroupNum"><a href="javascript:void(0);">` + response[i]['group_code'] + `</a></dd>
	            <dd class="listJourney"><a href="javascript:void(0);">` + response[i]['schedule'] + `</a></dd>
	            <dd class="listPayment"><a href="javascript:void(0);">` + response[i]['payment_type'] + `</a></dd>
	            <dd class="listCurrency"><a href="javascript:void(0);">` + response[i]['currency'] + `</a></dd>
	            <dd class="listProfit"><a href="javascript:void(0);">` + response[i]['total_profit'] + `</a></dd>
	            <dd class="listPrice"><a href="javascript:void(0);">` + response[i]['received'] + `</a></dd>
	            <dd class="listCost"><a href="javascript:void(0);">` + response[i]['cost'] + `</a></dd>
	            <dd class="listDiscount"><a href="javascript:void(0);">` + response[i]['coupon'] + `</a></dd>
	            </dl>
	        </li>`;
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
		var url = location.protocol.concat("//").concat(location.host).concat('/database/Business/getOrderCount.php');
		$.ajax({
			url: url,
			type: 'GET',
			data: data,
			success: function(response) {
				if(response == 0) {
					$(".noResultBox").css("display", "block");
				} else {
					$('.tabListDetail').empty();
					$('#p3').pagination({
						totalData: response,
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
	 * 载入默认数据
	 */
	loadData(getFilterData());

	function getTodayYYYYMMDD() {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth() + 1;
		var yyyy = today.getFullYear();
		if(dd < 10) {
			dd = '0' + dd;
		}
		if(mm < 10) {
			mm = '0' + mm;
		}
		today = yyyy + '-' + mm + '-' + dd;
		return today;
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

	function getFilterData() {
		var from_date = "";
		var to_date = "";
		var transaction_id = $("#group-update-transaction-id-filter").val();
		var group_code = $("#group-update-group-code-filter").val();

		today = getTodayYYYYMMDD();

		var data = {
			orderType: 'group',
			transaction_id: transaction_id,
			group_code: group_code
		};
		if($("#group-update-date-filter").val() == '1') {
			Object.assign(data, {
				from_date: delByTransDate(today, 0),
				to_date: addByTransDate(today, 1)
			});
		} else if($("#group-update-date-filter").val() == '30') {
			Object.assign(data, {
				from_date: delByTransDate(today, 29),
				to_date: addByTransDate(today, 1)
			});
		} else if($("#group-update-date-filter").val() == '90') {
			Object.assign(data, {
				from_date: delByTransDate(today, 89),
				to_date: addByTransDate(today, 1)
			});
		} else if($("#group-update-date-filter").val() == '180') {
			Object.assign(data, {
				from_date: delByTransDate(today, 179),
				to_date: addByTransDate(today, 1)
			});
		} else {
			var dates = $("#group-update-to-date").val().split("-");
			var date = new Date(dates[0], dates[1] - 1, dates[2]);
			var toDate = new Date(date);
			toDate.setDate(date.getDate() + 1);
			toDate = formatDate(toDate);

			Object.assign(data, {
				from_date: $("#group-update-from-date").val(),
				to_date: toDate
			});
		}
		return data;
	}

	/*
	 * 根据筛选条件得到独立团信息
	 */
	$("#group-tour-update-filter").on('click', function() {
		var data = getFilterData();
		loadData(data);
	});

	$("#group-tour-update-reset").on('click', function() {
		$("#group-update-date-filter").val("30");
		$("#group-update-from-date").val("");
		$("#group-update-to-date").val("");
		$(".selectRange").css("display", "none");
		$("#group-update-transaction-id-filter").val("");
		$("#group-update-group-code-filter").val("");
		var data = getFilterData();
		loadData(data);
	});

	/*
	 * 显示选中订单的具体信息
	 */
	$(document).on('click', 'ul.tabListDetail li', function() {
		unconfirmedRequest();

		// initialize infomation
		sum = 0;
		tourist_guide_name = [];
		tourist_guide_phone = [];

		tourist_guide_write_off = [];
		tourist_guide_write_off_currency = [];

		group_tour_price = [];
		group_tour_price_currency = [];
		group_tour_payment_type = [];
		group_tour_transaction_fee = [];
		group_tour_actual_received = [];
		$("div.collectionInfor ul.add-msg li.addCollection").siblings().remove();

		wholesalerIndex = 0;
		wholesalerList = [];
		$(".addwholesalerInfo").remove();

		$(this).addClass("active").siblings().removeClass("active");
		var transactionId = $('.active').find('dl dd.listNum a')['0'].innerText;
		$("#groupDiscountNotice_update").css("display", "none");

		var url = location.protocol.concat("//").concat(location.host).concat('/database/Business/GroupTour/GroupTourGetDetail.php');
		$.ajax({
			url: url,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			type: 'GET',
			data: {
				transaction_id: transactionId
			},
			success: function(response) {
				$("li.priceInfo").remove();
				response = JSON.parse(response);
				$("#updateGroupNum").val(response['group_code']);
				$("#invoice").val(response['group_tour_invoice']);
				$("#updateFlightNumber").val(response['flight_number']);
				$("#updateBusCompany").val(response['bus_company']);
				$("#updateSalesperson").val(response['salesperson_code']);
				$("#updateSource").val(response['source_name']);
				$("#upadteLeaderNum").val(response['leader_number']);
				$("#updateVisitorNum").val(response['tourist_number']);
				$("#updateNote").val(response['note']);

				$("#updateStartTime").val(response['start_date'].substring(0, 10));
				$("#updateEndTime").val(response['end_date'].substring(0, 10));
				$("#updateDayCount").val(response['duration']);

				$("#indiv_exchange_rate").val(response['exchange_rate_usd_rmb']);

				$("#updateReserve").val(response['reserve']);
				$("#reserve_currency").val(response['reserve_currency']);
				$("#updateTotalCost").val(response['total_cost']);
				$("#total_cost_currency").val(response['total_cost_currency']);
				$("#updateTotalAccount").val(response['total_write_off']);
				$("#total_write_off_currency").html(response['total_write_off_currency']);

				$("#total_profit").val(response['total_profit']);
				$("#total_profit_currency").html(response['currency']);

				if(response['cc_id'] != null) {
					$(".discount-code").addClass("option-active");
					$(".coupon").removeClass("option-active");
					$("#groupDiscountText_update").val(response['cc_code']);
				} else if(response['coupon'] != null) {
					$(".discount-code").removeClass("option-active");
					$(".coupon").addClass("option-active");
					$("#groupDiscountText_update").val(response['coupon']);
					$("#groupDiscountCurrency_update").val(response['coupon_currency']);
				} else {
					$("#groupDiscountText_update").val("");
					$(".discount-code").removeClass("option-active");
					$(".coupon").removeClass("option-active");
				}
				$("#groupDiscountApply_update").click();

				if(response['process'] != null) {
					$(".updateDialog .formAction li.requestReceive").addClass("selected");
					$(".updateDialog .formAction li.requestReceive").find("a").find("img").css("display", "inline-block");
					$(".updateDialog .formAction li.requestReceive").find("a").find("span").text("已请求财务确认接收");
				}

				var url = location.protocol.concat("//").concat(location.host).concat('/database/Business/GroupTour/GroupTourGetGuideInfo.php');
				$.ajax({
					url: url,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					type: 'GET',
					data: {
						transaction_id: transactionId
					},
					success: function(response) {
						response = JSON.parse(response);
						$(".guidesInforTab").css("display", "block");
						$(".guidesInforTab .tabContent ul.reportInfo li.reportTitle").siblings().remove();

						for(var i = 0; i < response.length; i++) {
							var item = '<li>' +
								'<dl>' +
								'<dd>' + response[i]['guide_name'] + '</dd>' +
								'<dd>' + response[i]['phone'] + '</dd>' +
								'<dd>' + response[i]['write_off_currency'] + " " + response[i]['write_off'] + '</dd>' +
								'<dd>' +
								'<a href="javascript:void(0);">' +
								'删除' +
								'</a>' +
								'</dd>' +
								'</dl>' +
								'</li>';
							$(".guidesInforTab .tabContent ul.reportInfo").append(item);
							tourist_guide_name.push(response[i]['guide_name']);
							tourist_guide_phone.push(response[i]['phone']);
							tourist_guide_write_off.push(response[i]['write_off']);
							tourist_guide_write_off_currency.push(response[i]['write_off_currency']);
						}

						//删除
						$(".guidesInforTab .tabContent ul.reportInfo li dl dd a").unbind("click").on("click", function() {
							var sum = Number($("input#updateTotalAccount").val());
							var i = $(this).parent("dd").parent("dl").parent("li").index();
							var accountVal = $(this).parent("dd").parent("dl").find("dd").last().prev().text();
							accountVal = accountVal.split(" ")[1];
							tourist_guide_write_off.splice(i - 1, 1);
							tourist_guide_write_off_currency.splice(i - 1, 1);
							tourist_guide_name.splice(i - 1, 1);
							tourist_guide_phone.splice(i - 1, 1);

							$(this).parent("dd").parent("dl").parent("li").remove();
							sum = sum - parseInt(accountVal);
							$("#updateTotalAccount").val(sum);
							if($(".guidesInforTab .tabContent ul.reportInfo li").length < 2) {
								$(".guidesInforTab").css("display", "none");
							}
							heightRange();
						});

						var url = location.protocol.concat("//").concat(location.host).concat('/database/Business/GroupTour/GroupTourGetSellPrice.php');
						$.ajax({
							url: url,
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded'
							},
							type: 'GET',
							data: {
								transaction_id: transactionId
							},
							success: function(response) {
								response = JSON.parse(response);
								console.log(response);
								for(var i = 0; i < response.length; i++) {
									//									var html = `
									//																						<li>
									//																							<label class="nm-left">应收金额</label>
									//																							<div class="amountReceivable">
									//																							<select class="updatePaymentType" disabled>
									//																								<option value="creditcard">Credit Card</option>
									//																								<option value="mco">MCO</option>
									//																								<option value="alipay">Alipay</option>
									//																								<option value="wechat">WeChat</option>
									//																								<option value="cash">Cash</option>
									//																								<option value="check">Check</option>
									//																								<option value="other">Other</option>
									//																								<option value="remit">REMIT</option>
									//																							</select>
									//																							<input type="text" class="updatePrice">
									//																							<select class="price_currency">
									//																								<option value="USD">$ 美元</option>
									//																								<option value="RMB">￥ 人民币</option>
									//																							</select>
									//												
									//																							</div>
									//																						</li>
									//																						<li class="list_cost">
									//																							<label class="nm-left">手续费</label>
									//																							<input type="text" class="transaction_fee">
									//																							<a href="javascript:void(0);" class="calculateCharge">以4%计算</a>
									//																						</li>
									//																						<li class="actualAmount list_cost">
									//																							<label class="nm-left">净收款</label>
									//																							<input type="text" class="actual_received">
									//																							<span>(货币同应收金额)</span>
									//																						</li>
									//																					`;
									//									$("div.collectionInfor").find("ul.add-msg li.addCollection").before(html);

									group_tour_price.push(response[i]['payment_amount']);
									group_tour_price_currency.push(response[i]['received_currency']);
									group_tour_payment_type.push(response[i]['payment_type']);
									group_tour_transaction_fee.push(response[i]['commission_fee']);
									group_tour_actual_received.push(response[i]['received']);
								}

								for(var i = 0; i < response.length; i++) {
									$(".updatePrice").eq(i).val(response[i]['payment_amount']);
									$(".price_currency").eq(i).val(response[i]['received_currency']);
									$(".updatePaymentType").eq(i).val(response[i]['payment_type']);
									$(".transaction_fee").eq(i).val(response[i]['commission_fee']);
									$(".actual_received").eq(i).val(response[i]['received']);
								}

								var url = location.protocol.concat("//").concat(location.host).concat('/database/Business/GroupTour/GroupTourGetWholeSaler.php');
								$.ajax({
									url: url,
									headers: {
										'Content-Type': 'application/x-www-form-urlencoded'
									},
									type: 'GET',
									data: {
										transaction_id: transactionId
									},
									success: function(response) {
										response = JSON.parse(response);
										//										for (var i = 0; i < response.length; i++) {
										//											var e =
										//											'<li class="requiredItem wholesalerInfo addwholesalerInfo">' +
										//												'<label class="nm-left">批发商</label>' +
										//												'<input type="text" class="wholesaler" id="wholesaler-' + wholesalerIndex + '" placeholder="Search...">' +
										//												'<img src="../img/removeIcon.png" class="removeInfo"/>' +
										//											'</li>';
										//											$("div.groupLeftInfo").find("ul.add-msg li.source").before(e);
										//											wholesalerIndex += 1;
										//										}
										//										$("li.addwholesalerInfo").eq(response.length - 1).find("img").attr("src", "../img/addIcon.png");
										//										$("li.addwholesalerInfo").eq(response.length - 1).find("img").removeClass("removeInfo");
										//										$("li.addwholesalerInfo").eq(response.length - 1).find("img").addClass("addInfo");
										//
										//										for(var i = 0; i < response.length; i++) {
										//											$(".wholesaler").eq(i).val(response[i]);
										//										}
										addWholesalerInfo();
										getWholeSaler();
										heightRange();

										$("#dialog").css("display", "block");
										autoCenter($("#dialog"));
										var addInforContentWidth = $(document).find(".addInforContent").width();
										$(document).find(".addInforContent .guidesInforContent").outerWidth(addInforContentWidth / 3);
										$(document).find(".addInforContent .wholesalerInfoContent").outerWidth(addInforContentWidth / 3);
										$(document).find(".addInforContent .info-price.collectionInfor.collectionContent").outerWidth(addInforContentWidth / 3);
										$(window).resize(function() {
											var addInforContentWidth = $(".addInforContent").width();
											$(document).find(".addInforContent .guidesInforContent").outerWidth(addInforContentWidth / 3);
											$(document).find(".addInforContent .wholesalerInfoContent").outerWidth(addInforContentWidth / 3);
											$(document).find(".addInforContent .info-price.collectionInfor.collectionContent").outerWidth(addInforContentWidth / 3);
										});

										if($.trim($("ul.add-msg li.discountCard dl.discountOption dd.option-active a").text()) == "折扣码") {
											$(".updateInfo .dialog ul.add-msg li.discountCard").find("dl.exchange").find("dd.discount-text").removeClass("list-currency");
											$("ul.add-msg li.discountCard dl.exchange dd.discount-text select").css("display", "none");
										}
										if($.trim($("ul.add-msg li.discountCard dl.discountOption dd.option-active a").text()) == "折扣金额") {
											$(".updateInfo .dialog ul.add-msg li.discountCard").find("dl.exchange").find("dd.discount-text").addClass("list-currency");
											$("ul.add-msg li.discountCard dl.exchange dd.discount-text select").css("display", "inline-block");
										}
									},
									error: function(jqXHR, textStatus, errorThrown) {
										console.log(textStatus, errorThrown);
									}
								});
							},
							error: function(jqXHR, textStatus, errorThrown) {
								console.log(textStatus, errorThrown);
							}
						});
					},
					error: function(jqXHR, textStatus, errorThrown) {
						console.log(textStatus, errorThrown);
					}
				});

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
		$("#dialog").css({
			"left": (bodyW - elW) / 2 + 'px',
			"top": (bodyH - elH) / 2 + 'px'
		});
	};

	/*
	 * 得到销售，导游和来源的下拉列表
	 */
	$("#updateSalesperson, #updateTouristGuide, #updateSource, #accounting-received").on('focus', function() {
		var current_id = $(this).attr('id');
		var target = "";
		if(current_id == 'updateSalesperson') {
			target = 'salesperson';
		} else if(current_id == 'updateSource') {
			target = 'source';
		} else if(current_id == 'updateTouristGuide') {
			target = 'touristGuide';
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

			group_code: $("#updateGroupNum").val(),
			invoice: $("#invoice").val(),
			flight_number: $("#updateFlightNumber").val(),
			bus_company: $("#updateBusCompany").val(),
			salesperson: $("#updateSalesperson").val(),
			source: $("#updateSource").val(),
			leader_number: $("#upadteLeaderNum").val(),
			visitor_number: $("#updateVisitorNum").val(),
			note: $("#updateNote").val(),

			start_date: $("#updateStartTime").val(),
			end_date: $("#updateEndTime").val(),
			duration: $("#updateDayCount").val(),

			reserve: $("#updateReserve").val(),
			reserve_currency: $("#reserve_currency").val(),
			total_cost: $("#updateTotalCost").val(),
			total_cost_currency: $("#total_cost_currency").val(),

			coupon: $("#groupDiscountText_update").val(),
			coupon_currency: $("#groupDiscountCurrency_update").val()
		}

		group_tour_price = [];
		group_tour_price_currency = [];
		group_tour_payment_type = [];
		group_tour_transaction_fee = [];
		group_tour_actual_received = [];
		for(var i = 0; i < $(".updatePrice").length; i++) {
			group_tour_price.push($(".updatePrice").eq(i).val());
			group_tour_price_currency.push($(".price_currency").eq(i).val());
			group_tour_payment_type.push($(".updatePaymentType").eq(i).val());
			group_tour_transaction_fee.push($(".transaction_fee").eq(i).val());
			group_tour_actual_received.push($(".actual_received").eq(i).val());
		}

		wholesalerList = [];
		for(var i = 0; i < $(".wholesaler").length; i++) {
			wholesalerList.push($(".wholesaler").eq(i).val());
		}

		Object.assign(data, {
			wholesaler: JSON.stringify(wholesalerList),
			tourGuide: JSON.stringify(tourist_guide_name),
			guideTel: JSON.stringify(tourist_guide_phone),
			write_off: JSON.stringify(tourist_guide_write_off),
			write_off_currency: JSON.stringify(tourist_guide_write_off_currency),
			price: JSON.stringify(group_tour_price),
			price_currency: JSON.stringify(group_tour_price_currency),
			payment_type: JSON.stringify(group_tour_payment_type),
			transaction_fee: JSON.stringify(group_tour_transaction_fee),
			actual_received: JSON.stringify(group_tour_actual_received)
		});

		return data;
	}

	// 更新订单列表的内容
	function updateDisplayInfo(data) {
		$("li.active").find("dd.listGroupNum a").text(data['group_code']);
		$("li.active").find("dd.listJourney a").text(data['start_date'] + '/' + data['end_date']);
		$("li.active").find("dd.listPayment a").text(data['payment_type']);
		$("li.active").find("dd.listCurrency a").text(data['currency']);
		var sumOfPrice = 0;

		for(var i = 0; i < group_tour_price.length; i++) {
			sumOfPrice += Number(group_tour_price[i]);
		}

		$("li.active").find("dd.listPrice a").text(sumOfPrice);
		$("li.active").find("dd.listCost a").text(data['total_cost'] + '(' + data['reserve'] + '/' + data['write_off'] + ')');
		var reg = /^\d+(\.\d{1,2})?$/;
		var couponValue = 0;
		if(reg.test($("#groupDiscountText_update").val())) {
			couponValue = $("#groupDiscountText_update").val();
			$("li.active").find("dd.listDiscount a").text(couponValue);
			$("li.active").find("dd.listProfit a").text(sumOfPrice - data['total_cost'] - couponValue);
		} else {
			var url = location.protocol.concat("//").concat(location.host).concat('/database/couponSearch.php');
			$.ajax({
				url: url,
				type: 'post',
				data: {
					couponCode: $("#groupDiscountText_update").val()
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
					$("li.active").find("dd.listProfit a").text(sumOfPrice - data['total_cost'] - couponValue);
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log(textStatus, errorThrown);
				}
			});
		}
		$("li.active").find("dd.item-note").text($("#updateNote").val());
	}

	/*
	 * 修改订单内容
	 */
	$("#updateConfirm").on('click', function() {
		$(".updateEditConfirmBox").css("display", "block");
	});
	$("#updateEditActionConfirm").on('click', function() {
		var data = getUpdateInfo();
		var url = location.protocol.concat("//").concat(location.host).concat('/database/Business/GroupTour/GroupTourUpdate.php');
		$.ajax({
			url: url,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			type: 'POST',
			data: data,
			success: function(response) {
				// console.log(response);
				// updateDisplayInfo(data);
				$(".updateEditConfirmBox").css("display", "none");
				location.reload();
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});

	});
	$("#updateEditActionCancel").on('click', function() {
		$(".updateEditConfirmBox").css("display", "none");
	});
	/*
	 * 下载准备金
	 */
	$("#updateAndDownloadConfirm").on('click', function() {
		$(".updateAndDownloadConfirmBox").css("display", "block");
	});
	$(document).on('keyup', 'ul.updateUserTab li.reserveListItem1 input.reserveInput.updatePeopleNum', function() {
		$("ul.updateUserTab").find("input.reserveInput.updatePeopleNum").val($(this).val());
	});
	$("#updateAndDownloadActionConfirm").on('click', function() {
		var data = getUpdateInfo();
		var leaderNum = $("#upadteLeaderNum").val(); //导游人数
		var vistorNum = $("#updateVisitorNum").val(); //游客人数
		var tourGuide = $("#updateTouristGuide").val(); //导游
		//		var startTime = $("#updateStartTime").val(); //出发日期
		var startTime = $(".updateFundMsg").find("input.msgStartTime").val(); //出发日期
		//		var numOfDay = $("#updateDayCount").val(); //天数
		var numOfDay = $(".updateFundMsg").find("input.msgDayNum").val(); //天数

		var reserve = $("#updateReserve").val(); //准备金
		var tempWindow = window.open('', '_blank', '');
		var url = location.protocol.concat("//").concat(location.host).concat('/database/Business/GroupTour/GroupTourUpdate.php');
		$.ajax({
			url: url,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			type: 'POST',
			data: data,
			success: function(response) {
				var data = getUpdateInfo();
				updateDisplayInfo(data);
				var leaderNum = $("#upadteLeaderNum").val(); //导游人数
				var vistorNum = $("#updateVisitorNum").val(); //游客人数
				//				var startTime = $("#updateStartTime").val(); //出发日期
				var startTime = $(".updateFundMsg").find("input.msgStartTime").val(); //出发日期
				//				var numOfDay = $("#updateDayCount").val(); //天数
				var numOfDay = $(".updateFundMsg").find("input.msgDayNum").val(); //天数
				var reserve = $("#updateReserve").val(); //准备金
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
				//天数
				localStorage.setItem("tourDayNum", numOfDay);
				//人数
				//				localStorage.setItem("tourPeopleNum", $("input#msgPeopleCount").val());
				localStorage.setItem("tourPeopleNum", $("ul.updateUserTab").find("input.reserveInput.updatePeopleNum").val());
				//午餐价格
				localStorage.setItem("tourLunchPrice", $("input#updateLunch").val());
				//晚餐价格
				localStorage.setItem("tourDinnerPrice", $("input#updateDinner").val());
				//日期
				localStorage.setItem("tourDate", dateList);
				//司机小费:
				localStorage.setItem("tourDriverTip", $(".driverTipInput").val());
				//货币
				//				localStorage.setItem("tourCurrency", $("select#reserve_currency").val());
				localStorage.setItem("tourCurrency", $(".guidesInforContent").find("select#guide_write_off_currency").val());
				//window.location.href="../printPage.html";
				tempWindow.location.href = '../printPage.html';
				location.reload();
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
		$(".updateAndDownloadConfirmBox").css("display", "none");
	});

	$("#updateAndDownloadActionCancel").on('click', function() {
		$(".updateAndDownloadConfirmBox").css("display", "none");
	});

	/*
	 * 删除订单
	 */
	$("#deleteConfirm").on('click', function() {
		$(".updateDeleteConfirmBox").css("display", "block");
		$(".updateDeleteConfirmBox").find(".confirmNotice").text("确认删除");
	});
	$("#updateDeleteActionConfirm").on('click', function() {
		var transactionId = $('.active').find('dl dd.listNum a')['0'].innerText;
		var url = location.protocol.concat("//").concat(location.host).concat('/database/Business/GroupTour/GroupTourDelete.php');
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
				console.log("删除成功");
				$("#dialog").css("display", "none");
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
	var getTouristGuide = function() {
		var tour_guide = $("#updateTouristGuide").val();
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
				$("#updateGuideTel").val(response);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
	}
	$('#updateTouristGuide').on('change', function() {
		setTimeout(getTouristGuide, 1000);
	});
});

//独立团点击订单号弹出新窗口
function dragForm() {
	var $dialog = $("#dialog");
	//自动居中对话框
	function autoCenter(el) {
		var bodyW = $(window).width();
		var bodyH = $(window).height();
		var elW = el.width();
		var elH = el.height();
		$dialog.css({
			"left": (bodyW - elW) / 2 + 'px',
			"top": (bodyH - elH) / 2 + 'px'
		});
	};
	//点击弹出对话框
	$(".callout_button").click(function() {
		$dialog.css("display", "block");
		var getGroupNum = $(this).parent().siblings("dd.getGroupNum").text();
		$dialog.find("#updateGroupNum").val(getGroupNum); //团号
		autoCenter($dialog);
	});
	//点击关闭对话框
	$(".close_button").click(function() {
		$dialog.css("display", "none");
	});
	//窗口大小改变时，对话框始终居中
	window.onresize = function() {
		autoCenter($dialog);
	};
	//确认/重置选中状态
	$(".updateInfo ul.filterBox  li  dl.confirmMsg dd ").find("a").on("mousedown", function() {
		$(this).addClass("confirm-active");
	});
	$(".updateInfo ul.filterBox  li  dl.confirmMsg dd ").find("a").on("mouseup", function() {
		$(this).removeClass("confirm-active");
	});
	$("a#updateProTab").on("mousedown", function() {
		$(this).addClass("tabhover");
	});
	$("a#updateProTab").on("mouseup", function() {
		$(this).removeClass("tabhover");
	});
}

function updateCashReport(updateReserve, leadNum, visitorNum, fundMsg, msgDayNum, msgStartTime, msgPeopleCount, startTime, endTime, dayCount) {
	//	// 点击准备金弹出准备金计算表
	//	updateReserve.on("focus", function() {
	//		if(leadNum.val() !== "" && visitorNum.val() !== "" &&
	//			startTime.val() !== "" && dayCount.val() !== "") {
	//			fundMsg.css("display", "block");
	//			$(".split").css("display", "block");
	//			msgDayNum.val(dayCount.val());
	//			msgStartTime.val(startTime.val());
	//			msgPeopleCount.val(parseInt(leadNum.val()) + parseInt(visitorNum.val()));
	//			var leftHeight = $(".navInfo ul").height()
	//			var rightHeight = $(".theamInfo").height();
	//			if(rightHeight > leftHeight) {
	//				$(this).blur();
	//				$(".navInfo ul").css("height", rightHeight);
	//			}
	//		} else {
	//			updateReserve.blur();
	//			alert("请填写出团人数，领队人数和日期信息");
	//		}
	//	});

	//生成报表：
	var addListItem1 = function(html) {
		var $html = $(html);
		$('#updateUserTab').append($html);
		$html.addClass("reserveListItem1");
	}
	$("a#updateProTab").on("click", function() {
		$(".updateUserTab").empty();
		$(".updateDriverTipItem").empty();
		var lunch = $("#updateLunch").val();
		var dinner = $('#updateDinner').val();
		var count = msgDayNum.val(); //天数
		var lhnum = msgStartTime.val(); //出发日期
		var numPeople = msgPeopleCount.val();
		var date;

		for(var i = 0; i < count; i++) {
			date = addByTransDate(lhnum, i);
			addListItem1("<li>" + "<label>" + date + "</label></li>");
		}

		$('.reserveListItem1').each(function() {
			var $peopleNumHtml = $("<input type='text' value='" + numPeople + "' class='updatePeopleNum' />");
			$(this).append($peopleNumHtml);
			$peopleNumHtml.addClass("reserveInput");
			var $lunchHtml = $("<input type='text' value='" + lunch + "'/>");
			$(this).append($lunchHtml);
			$lunchHtml.addClass("reserveInput");
			var $dinnerHtml = $("<input type='text' value='" + dinner + "'/>");
			$(this).append($dinnerHtml);
			$dinnerHtml.addClass("reserveInput");
		});

		$('.updateDriverTipItem').append("<label>司机小费</label>");
		var $tipHtml = $("<input type='text' value='" + 5 * count * numPeople + "'/>");
		$('.updateDriverTipItem').append($tipHtml);
		$tipHtml.addClass("driverTipInput");
		fundMsg.css("display", "block");
		$(".updateUserCard").css("display", "block");
		// 准备金 = 司机小费 + （午餐 + 晚餐）* 天数 * 人数
		updateReserve.val(Number($('.driverTipInput').val()) + (Number(lunch) + Number(dinner)) * count * numPeople);
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
		if($(".userTab").css("display") == "block") {
			var reserveInputWidth = $("input.reserveInput").outerWidth();
			var driverTipInputWidth = ((reserveInputWidth * 3) + 19) + "px";
			$("input.driverTipInput").css("cssText", "width:" + driverTipInputWidth + "!important");
		}
		$(window).resize(function() {
			var reserveInputWidth = $("input.reserveInput").outerWidth();
			var driverTipInputWidth = ((reserveInputWidth * 3) + 19) + "px";
			$("input.driverTipInput").css("cssText", "width:" + driverTipInputWidth + "!important");
		});
		//准备金:
		var reserve = $("input#updateReserve").val();
		var exchangeRate = $("input#indiv_exchange_rate").val();
		$("select#reserve_currency").on("change", function() {
			var reserve = $("input#updateReserve").val();
			var exchangeRate = $("input#indiv_exchange_rate").val();
			if($(this).val() == "USD") {
				$("input#updateReserve").val(reserve);
			}
			if($(this).val() == "RMB") {
				$("input#updateReserve").val((Number(reserve) / exchangeRate).toFixed(2));
			}
		});
	});

	// 修改午餐或晚餐和司机小费，自动更新准备金
	$(document).on('keyup', '.reserveInput, .driverTipInput', function() {
		var sum = 0;
		var numPeople = msgPeopleCount.val();
		$('.reserveInput').each(function() {
			sum += Number($(this).val());
		});
		updateReserve.val(sum * numPeople + Number($('.driverTipInput').val()));
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

//添加价格信息
function addNewPrice() {
	$("ul.add-msg li.addCollection").find("a").on("click", function() {
		var e = '<li><label class="nm-left">应收金额</label>' +
			'<div class="amountReceivable">' +
			'<select class="updatePaymentType" disabled>' +
			'<option value="creditcard">Credit Card</option>' +
			'<option value="mco">MCO</option>' +
			'<option value="alipay">Alipay</option>' +
			'<option value="wechat">WeChat</option>' +
			'<option value="cash">Cash</option>' +
			'<option value="check">Check</option>' +
			'<option value="other">Other</option>' +
			'<option value="remit">REMIT</option>' +
			'</select>' +
			'<input type="text" class="updatePrice">' +
			'<select class="price_currency">' +
			'<option value="USD">$ 美元</option>' +
			'<option value="RMB">￥ 人民币</option>' +
			'</select>' +
			'</div>' +
			'</li>' +
			'<li class="list_cost">' +
			'<label class="nm-left">手续费</label>' +
			'<input type="text" class="transaction_fee">' +
			'<a href="javascript:void(0);" class="calculateCharge">以4%计算</a>' +
			'</li>' +
			'<li class="actualAmount list_cost">' +
			'<label class="nm-left">净收款</label>' +
			'<input type="text" class="actual_received">' +
			'<span>(货币同应收金额)</span>' +
			'</li>';
		$("ul.add-msg li.addCollection").before(e);
		heightRange();
	});
}

//添加导游
//function addNewGuide() {
//	$(".guidesInforContent ul li.addNewGuide a").on("click", function() {
//		var sum = Number($("input#updateTotalAccount").val()); //报账信息
//		var exchangeRate = $("input#indiv_exchange_rate").val(); //汇率
//		var guideName = $(".guidesInforContent ul").find(".newGuide").last().find("input.guideName").val();
//		var guideTel = $(".guidesInforContent ul").find(".newGuide").last().find("input.guideTel").val();
//		var accountingInfo = $(".guidesInforContent ul").find(".newGuide").last().find("input.accountingInfo").val();
//		var write_off = $("#updateGuideWriteOff").val();
//		var write_off_currency = $("#guide_write_off_currency").val();
//		if($(".guidesInforContent ul li.list-currency").find("select").val() == "USD") {
//			accountingInfo = "USD" + " " + $(".guidesInforContent ul").find(".newGuide").last().find("input.accountingInfo").val();
//		}
//		if($(".guidesInforContent ul li.list-currency").find("select").val() == "RMB") {
//			accountingInfo = "RMB" + " " + $(".guidesInforContent ul").find(".newGuide").last().find("input.accountingInfo").val();
//		}
//		if(guideName !== "" && guideTel !== "" && accountingInfo !== "") {
//			tourist_guide_name.push(guideName);
//			tourist_guide_phone.push(guideTel);
//			tourist_guide_write_off.push(write_off);
//			tourist_guide_write_off_currency.push(write_off_currency);
//			//转换为USD
//			if($("span#total_write_off_currency").text() == "USD") {
//				if($(".guidesInforContent ul li.list-currency").find("select").val() == "USD") {
//					sum = sum - (-Number($(".guidesInforContent ul").find(".newGuide").last().find("input.accountingInfo").val()));
//				}
//				if($(".guidesInforContent ul li.list-currency").find("select").val() == "RMB") {
//					sum = sum - (-(Number($(".guidesInforContent ul").find(".newGuide").last().find("input.accountingInfo").val()) / exchangeRate).toFixed(2));
//				}
//			}
//			//转换为RMB
//			if($("span#total_write_off_currency").text() == "RMB") {
//				if($(".guidesInforContent ul li.list-currency").find("select").val() == "USD") {
//					sum = sum - (-Number($(".guidesInforContent ul").find(".newGuide").last().find("input.accountingInfo").val()) * exchangeRate);
//				}
//				if($(".guidesInforContent ul li.list-currency").find("select").val() == "RMB") {
//					sum = sum - (-(Number($(".guidesInforContent ul").find(".newGuide").last().find("input.accountingInfo").val())));
//				}
//			}
//			$("#updateTotalAccount").val(sum);
//			$(".guidesInforTab").css("display", "block");
//			var item = '<li>' +
//				'<dl>' +
//				'<dd>' + guideName + '</dd>' +
//				'<dd>' + guideTel + '</dd>' +
//				'<dd>' + accountingInfo + '</dd>' +
//				'<dd>' +
//				'<a href="javascript:void(0);">' +
//				'删除' +
//				'</a>' +
//				'</dd>' +
//				'</dl>' +
//				'</li>';
//			$(".guidesInforTab .tabContent ul.reportInfo").append(item);
//
//			$("#updateTouristGuide").val("");
//			$("#updateGuideTel").val("");
//			$("#updateGuideWriteOff").val("");
//			heightRange();
//			//移除
//			$(".guidesInforTab .tabContent ul.reportInfo li dl dd a").unbind("click").on("click", function() {
//				var i = $(this).parent("dd").parent("dl").parent("li").index();
//				var accountVal = $(this).parent("dd").parent("dl").find("dd").last().prev().text();
//				tourist_guide_write_off.splice(i - 1, 1);
//				tourist_guide_write_off_currency.splice(i - 1, 1);
//				tourist_guide_name.splice(i - 1, 1);
//				tourist_guide_phone.splice(i - 1, 1);
//				var accountInfo = $(this).parent("dd").prev().text();
//				var accountValType = accountInfo.split(" ")[0];
//
//				$(this).parent("dd").parent("dl").parent("li").remove();
//				//转换为USD
//				if($("span#total_write_off_currency").text() == "USD") {
//					if(accountValType == "USD") {
//						accountVal = accountVal.split(" ")[1];
//					}
//					if(accountValType == "RMB") {
//						accountVal = (Number(accountVal.split(" ")[1]) / exchangeRate).toFixed(2);
//					}
//				}
//				//转换为RMB
//				if($("span#total_write_off_currency").text() == "RMB") {
//					if(accountValType == "USD") {
//						accountVal = Number(accountVal.split(" ")[1]) * exchangeRate;
//					}
//					if(accountValType == "RMB") {
//						accountVal = Number(accountVal.split(" ")[1]);
//					}
//				}
//				sum = sum - Number(accountVal);
//				$("#updateTotalAccount").val(sum);
//				if($(".guidesInforTab .tabContent ul.reportInfo li").length < 2) {
//					$(".guidesInforTab").css("display", "none");
//				}
//				heightRange();
//			});
//		} else {
//			alert("请确认要添加的导游信息已填写完整");
//		}
//
//	});
//}

//总收款
function getTotalCollectionInfor() {
	var sumAmount = 0; //总收款
	var currentAmount = 0; //当前收款
	var exchangeRate = $("input#indiv_exchange_rate").val();
	$("li.actualAmount.list_cost").find("input").each(function(i, item) {
		if($("ul.add-msg li div.amountReceivable").eq(i).find("select.price_currency").val() == "USD") {
			currentAmount = Number($(item).val());
		}
		if($("ul.add-msg li div.amountReceivable").eq(i).find("select.price_currency").val() == "RMB") {
			currentAmount = (Number($(item).val()) / exchangeRate).toFixed(2);
		}
		sumAmount = sumAmount - (-currentAmount);
	});
	return sumAmount;
}

//手续费,实际金额
function calculateCharge() {
	$(document).on('keyup', 'ul.add-msg li div.amountReceivable input', function() {
		var amountCollected = $(this).val();
		$(this).parent('div').parent("li").next("li.list_cost").find("input#transaction-fee").val(0);
		$(this).parent('div').parent("li").next("li.list_cost").next("li.actualAmount").find("input").val(amountCollected);
	});
	$(document).on("click", "ul.add-msg li.list_cost a", function() {
		var amountInfo = $(this).parent("li.list_cost").prev().find('div.amountReceivable').find("input.updatePrice").val();
		if(amountInfo == "") {
			alert("请确认应收金额已经填写");
		} else {
			var amountCollected = $(this).parent("li.list_cost").prev().find('div.amountReceivable').find("input.updatePrice").val();
			//手续费 = 应收金额*0.04
			$(this).parent("li.list_cost").find("input").val(Number(amountCollected * 0.04).toFixed(2));
			var charge = $(this).parent("li").find("input").val();
			//实际金额 =应收金额-手续费
			$(this).parent("li.list_cost").next("li.list_cost").find("input").val(Number(amountCollected - charge).toFixed(2));
		}
	});
}
//利润=收款-总花费-折扣
function getPriceInfo() {
	$("ul.add-msg li.list_account.calculateProfit a#update_group_calculateBtn").on("click", function() {
		var exchangeRate = $("input#indiv_exchange_rate").val(); //汇率
		var profit = $("input#total_profit"); //利润
		var totalCost = $("input#updateTotalCost").val(); //总花费
		var amountCollected = getTotalCollectionInfor(); //收款
		var discount; //折扣
		if(exchangeRate == "") {
			alert("请确认汇率信息已填写");
		} else {
			//总花费
			if(totalCost == "") {
				totalCost = 0;
			} else {
				totalCost = $("input#updateTotalCost").val();
			}
			//折扣
			if($("ul.add-msg li.discountCard dl.discountNotice").css("display") == "none") {
				discount = 0;
			} else {
				if($("span#groupSubtractNum_update").text().split(':')[1].split(" ")[2] == "USD") {
					discount = $("span#groupSubtractNum_update").text().split(':')[1].split(" ")[1];
				}
				if($("span#groupSubtractNum_update").text().split(':')[1].split(" ")[2] == "RMB") {
					discount = ($("span#groupSubtractNum_update").text().split(':')[1].split(" ")[1] / exchangeRate).toFixed(2);
				}
			}
			profitCalculate(amountCollected, totalCost, discount, profit, exchangeRate);
		}
	});
}

function profitCalculate(amountCollected, totalCost, discount, profit, exchangeRate) {
	//收款-总花费-折扣=利润
	var profitText = amountCollected - totalCost - discount;
	profit.val(profitText);
	profit.parent().find("span").text("美元");
	//总花费-USD
	if($("select#total_cost_currency").val() == "USD") {
		profitText = amountCollected - totalCost - discount;
		profit.val(profitText.toFixed(2));
		profit.parent().find("span").text("美元");
	}
	//总花费-RMB
	if($("select#total_cost_currency").val() == "RMB") {
		totalCost = (totalCost / exchangeRate).toFixed(2);
		profitText = amountCollected - totalCost - discount;
		profit.val(profitText.toFixed(2));
		profit.parent().find("span").text("美元");
	}
}

function updateGroupTourDiscount(discountText, discountNotice, discountApply, subtractNum, discountOption, coupon_currency) {
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
			var e =
				'<li class="requiredItem wholesalerInfo addwholesalerInfo">' +
				'<label class="nm-left">批发商</label>' +
				'<input type="text" class="wholesaler" id="wholesaler-' + wholesalerIndex + '" placeholder="Search...">' +
				'<img src="../img/addIcon.png" class="addInfo"/>' +
				'</li>';
			$("ul.add-msg li.wholesalerInfo").last().after(e);
			wholesalerIndex += 1;
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

function getWholeSaler() {
	$(".wholesaler").on('focus', function() {
		var current_id = $(this).attr('id');
		var target = "wholesaler";

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
//添加导游
function addNewGuide() {
	$(".guidesInforContent ul li.addNewGuide a").on("click", function() {
		var guideName = $(".guidesInforContent ul li").find("input.guideName").val();
		var guideTel = $(".guidesInforContent ul li").find("input.guideTel").val();
		var accountingInfo = $(".guidesInforContent ul").find(".newGuide").last().find("input.accountingInfo").val();
		var exchangeRate = $("input#group_exchange_rate").val(); //汇率
		if($(".guidesInforContent ul li.list-currency").find("select").val() == "USD") {
			if($(".guidesInforContent ul li").find("input.accountingInfo").val() == "") {
				accountingInfo = "USD" + " " + 0;
			} else {
				accountingInfo = "USD" + " " + $(".guidesInforContent ul li").find("input.accountingInfo").val();
			}
		}
		if($(".guidesInforContent ul li.list-currency").find("select").val() == "RMB") {
			if($(".guidesInforContent ul li").find("input.accountingInfo").val() == "") {
				accountingInfo = "RMB" + " " + 0;
			} else {
				accountingInfo = "RMB" + " " + $(".guidesInforContent ul li").find("input.accountingInfo").val();
			}
		}
		if(guideName !== "" && guideTel !== "" && accountingInfo !== "") {
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
				'<dd>' + accountingInfo + '</dd>' +
				'<dd>' +
				'<a href="javascript:void(0);">' +
				'<img src="../img/removeIcon.png">' +
				'</a>' +
				'</dd>' +
				'</dl>' +
				'</li>';
			$(".guidesInforTab .tabContent ul.reportInfo").find("div.guides_info").append(item);
			if($(".guidesInforTab .tabContent ul.reportInfo li.reportContent").length >= 4) {
				$(".guidesInforTab").find("div.guides_info").css("overflow-y", "scroll");
			} else {
				$(".guidesInforTab").find("div.guides_info").css("overflow-y", "initial");
			}

			$("#updateTouristGuide").val("");
			$("#updateGuideTel").val("");
			$("#updateGuideWriteOff").val("");
			$(".guidesInforContent ul li input.peopleNum").val(""); //人数
			$(".guidesInforContent ul li input.startDate").val(""); //起始日期
			$(".guidesInforContent ul li input.endDate").val(""); //结束日期
			$(".guidesInforContent ul li input.dayNum").val(""); //天数
			$(".guidesInforContent ul li label.switch input").attr("checked", false);
			$(".guidesInforContent input#updateReserve").val("");
			heightRange();
			//移除
			$(".guidesInforTab .tabContent ul.reportInfo li dl dd a").unbind("click").on("click", function() {
				$(this).parent("dd").parent("dl").parent("li").remove();
				if($(".guidesInforTab .tabContent ul.reportInfo li").length < 2) {
					$(".guidesInforTab").css("visibility", "hidden");
					$(".guidesInforTab").css("height", "0px");
					$(".guidesInforTab").css({
						"padding-top": "0px",
						"padding-bottom": "0px",
					});
				}
				if($(".guidesInforTab .tabContent ul.reportInfo li.reportContent").length >= 4) {
					$(".guidesInforTab").find("div.guides_info").css("overflow-y", "scroll");
				} else {
					$(".guidesInforTab").find("div.guides_info").css("overflow-y", "initial");
				}
				heightRange();
			});
		} else {
			alert("请确认要添加的导游信息已填写完整");
		}
	});
}

//添加批发商
function addNewWholesaler() {
	$(".wholesalerInfoContent ul li.addNewWholesaler a").on("click", function() {
		//批发商
		var wholesalerName = $(".wholesalerInfoContent ul").find("li").find("input.wholesaler").val();
		//金额
		var amount = $(".wholesalerInfoContent ul").find("li.list-currency").last().find("input.amountInfo").val();
		var notes = $(".wholesalerInfoContent ul").find("li").find("input.wholesalerNotes").val();
		console.log(amount);
		var accountingInfo;
		if($(".wholesalerInfoContent ul").find("li.list-currency").last().find("select").val() == "USD") {
			accountingInfo = "USD" + " " + amount;
		}
		if($(".wholesalerInfoContent ul").find("li.list-currency").last().find("select").val() == "RMB") {
			accountingInfo = "RMB" + " " + amount;
		}
		if(wholesalerName !== "" && amount !== "") {
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
				'<dd>' + accountingInfo + '</dd>' +
				'<dd>' +
				'<a href="javascript:void(0);">' +
				'<img src="../img/removeIcon.png">' +
				'</a>' +
				'</dd>' +
				'</dl>' +
				'</li>';
			//			$(".wholesalerInfoTab .tabContent ul.reportInfo").append(item);
			$(".wholesalerInfoTab .tabContent ul.reportInfo").find("div.wholesaler_info").append(item);
			if($(".wholesalerInfoTab .tabContent ul.reportInfo li.reportContent").length >= 4) {
				$(".wholesalerInfoTab").find("div.wholesaler_info").css("overflow-y", "scroll");
			} else {
				$(".wholesalerInfoTab").find("div.wholesaler_info").css("overflow-y", "initial");
			}

			$(".wholesalerInfoContent ul").find("li").find("input.wholesaler").val("");
			$(".wholesalerInfoContent ul").find("li.list-currency").last().find("input.amountInfo").val("");
			$(".wholesalerInfoContent ul").find("li").find("input.wholesalerNotes").val("");

			heightRange();
			//移除
			$(".wholesalerInfoTab .tabContent ul.reportInfo li dl dd a").unbind("click").on("click", function() {
				$(this).parent("dd").parent("dl").parent("li").remove();
				if($(".wholesalerInfoTab .tabContent ul.reportInfo li").length < 2) {
					$(".wholesalerInfoTab").css("visibility", "hidden");
					$(".wholesalerInfoTab").css("height", "0px");
					$(".wholesalerInfoTab").css({
						"padding-top": "0px",
						"padding-bottom": "0px",
					});
				}
				if($(".wholesalerInfoTab .tabContent ul.reportInfo li.reportContent").length >= 4) {
					$(".wholesalerInfoTab").find("div.wholesaler_info").css("overflow-y", "scroll");
				} else {
					$(".wholesalerInfoTab").find("div.wholesaler_info").css("overflow-y", "initial");
				}

				heightRange();
			});
		} else {
			alert("请确认要添加的批发商信息已填写完整");
		}
	})
}
//添加收款    
function addNewPrice() {
	$(".collectionContent ul li.addCollection a").on("click", function() {
		//支付方式
		var paymentType = $(".collectionContent ul li").find("select.updatePaymentType").val();
		//金额
		var amount = $(".collectionContent ul li").find("input.updatePrice").val();
		//手续费
		var transaction_fee;
		if($(".collectionContent ul li").find("input.transaction_fee").val() == "") {
			transaction_fee = 0;
		} else {
			transaction_fee = $(".collectionContent ul li").find("input.transaction_fee").val();
		}
		//最终收款
		var actual_received = $(".collectionContent ul li").find("input.actual_received").val();
		var accountingInfo;
		//备注
		var notes = $(".collectionContent ul li").find("input.collectionNotes").val();
		if($(".collectionContent ul").find("li").find("select.price_currency").val() == "USD") {
			accountingInfo = "USD" + " " + amount;
		}
		if($(".collectionContent ul").find("li").find("select.price_currency").val() == "RMB") {
			accountingInfo = "RMB" + " " + amount;
		}
		if(amount !== "") {
			$(".collectionInfoTab").css("visibility", "visible");
			$(".collectionInfoTab").css("height", "auto");
			$(".collectionInfoTab").css({
				"padding-top": "2%",
				"padding-bottom": "2%",
			});
			var item = '<li class="reportContent">' +
				'<dl>' +
				'<dd>' + notes + '</dd>' +
				'<dd>' + paymentType + '</dd>' +
				'<dd class="accountingInfo">' + accountingInfo + '</dd>' +
				'<dd>' + transaction_fee + '</dd>' +
				'<dd>' + actual_received + '</dd>' +
				'<dd>' +
				'<a href="javascript:void(0);">' +
				'<img src="../img/removeIcon.png">' +
				'</a>' +
				'</dd>' +
				'</dl>' +
				'</li>';
			//$(".collectionInfoTab .tabContent ul.reportInfo").append(item);
			console.log(transaction_fee);
			$(".collectionInfoTab .tabContent ul.reportInfo").find("div.collection_info").append(item);
			if($(".collectionInfoTab .tabContent ul.reportInfo li.reportContent").length >= 4) {
				$(".collectionInfoTab").find("div.collection_info").css("overflow-y", "scroll");
			} else {
				$(".collectionInfoTab").find("div.collection_info").css("overflow-y", "initial");
			}

			$(".collectionContent ul li").find("input.updatePrice").val("");
			$(".collectionContent ul").find("li.list-currency").last().find("input.amountInfo").val("");
			$(".collectionContent ul li").find("input.transaction_fee").val("");
			$(".collectionContent ul li").find("input.actual_received").val("");
			$(".collectionContent ul li").find("input.collectionNotes").val("");
			heightRange();
			//移除
			$(".collectionInfoTab .tabContent ul.reportInfo li dl dd a").unbind("click").on("click", function() {
				$(this).parent("dd").parent("dl").parent("li").remove();

				if($(".collectionInfoTab .tabContent ul.reportInfo li").length < 2) {
					$(".collectionInfoTab").css("visibility", "hidden");
					$(".collectionInfoTab").css("height", "0px");
					$(".collectionInfoTab").css({
						"padding-top": "0px",
						"padding-bottom": "0px",
					});
				}
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
	})
}

//打印准备金
function printReserve() {
	$(".guidesInforContent ul li").find("input.btn-switch.large").on("change", function() {
		//人数
		var peopleNum = $(".guidesInforContent ul li input.peopleNum").val();
		//起始日期
		var startDate = $(".guidesInforContent ul li input.startDate").val();
		//结束日期
		var endDate = $(".guidesInforContent ul li input.endDate").val();
		//天数
		var days = $(".guidesInforContent ul li input.dayNum").val();
//		if($(".guidesInforContent input#updateReserve").css("display") == "none") {
			if(peopleNum == "" || startDate == "" || endDate == "" || days == "") {
				alert("请填写人数和日期信息");
				$(".toPrintPage").css("display", "none");
				$(this).attr("checked", false);

			} else {
				$(this).attr("checked", true);
				//显示：
				autoCenter($(".toPrintPage"));
				$(".toPrintPage").width($(".addInforContent").outerWidth(true));
				$(".toPrintPage").css("display", "block");
				$(".updateFundMsg ").css("display", "block");
				$(".showMsg .teamIndie .groupMsg").css("height", "auto");
				//总天数:
				var dayNum = $(".guidesInforContent ul li input.dayNum").val();
				$(".msgDayNum").val(dayNum);
				$(".msgStartTime").val($('.guidesInforContent ul li input.startDate').val());
				$("#msgPeopleCount").val($(".guidesInforContent ul li input.peopleNum").val());
				heightRange();
			}
//		} else {
//			$(this).attr("checked", false);
//			$(".guidesInforContent input#updateReserve").val(" ");
//			$(".guidesInforContent input#updateReserve").css("display", "none");
//			$(".toPrintPage .reserveContent").find(".userTab").css("display", "none");
//		}
	});
}
//生成打印页
function toPrintPage() {
	$(".toPrintPage ul.reserveTab li.createPrintPage").on("click", function() {
		//人数
		var peopleNum = $(".guidesInforContent ul li input.peopleNum").val();
		//起始日期
		var startDate = $(".guidesInforContent ul li input.startDate").val();
		//结束日期
		var endDate = $(".guidesInforContent ul li input.endDate").val();
		if($(".updateFundMsg").css("display") == "none") {
			alert("请确认准备金报表已生成");
		} else {
			var numOfDay = $(".fundMsg").find("input.msgDayNum").val();
			var startTime = $(".fundMsg").find("input.msgStartTime").val();
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
			localStorage.setItem("tourPeopleNum", $("ul.updateUserTab").find(".updatePeopleNum.reserveInput").val());
			//午餐价格
			localStorage.setItem("tourLunchPrice", $("input#updateLunch").val());
			//晚餐价格
			localStorage.setItem("tourDinnerPrice", $("input#updateDinner").val());
			//日期
			localStorage.setItem("tourDate", dateList);
			//司机小费:
			localStorage.setItem("tourDriverTip", $(".driverTipInput").val());
			//货币
			localStorage.setItem("tourCurrency", $("select#guide_write_off_currency").val());
			window.open('../printPage.html');
			setTimeout(function() {
//				$(".guidesInforContent input#updateReserve").css({
//					"display": "inline-block"
//				});
				$(".guidesInforContent input#updateReserve").attr("disabled", true);
				$(".toPrintPage").css("display", "none");
				$(".updateFundMsg ").css("display", "none");
				$(".toPrintPage .reserveContent").find(".userTab").css("display", "none");
			}, 500);
		}
	});

}

function closeReseveBox() {
	$(".toPrintPage ul.reserveTab").find("li.close").on("click", function() {
//		$(".guidesInforContent input#updateReserve").css({
//			"display": "inline-block"
//		});
		$(".guidesInforContent input#updateReserve").attr("disabled", true);
		$(".toPrintPage").css("display", "none");
		$(".updateFundMsg ").css("display", "none");
		$(".toPrintPage .reserveContent").find(".userTab").css("display", "none");
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
	$(".guidesInforContent ul li input.endDate").on('change', function() {
		var startTime = $('.guidesInforContent ul li input.startDate').val();
		var endTime = $(this).val();
		var startNum = parseInt(startTime.replace(/-/g, ''), 10);
		var endNum = parseInt(endTime.replace(/-/g, ''), 10);
		if(startNum > endNum) {} else {
			var days = generateDateCount(endTime, startTime);
			if(!isNaN(days)) {
				//				localStorage.setItem("dayNumMsg", days);
				$(".guidesInforContent ul li input.dayNum").val(days);
			}
		}
	});
	// 根据天数计算结束日期
	$(".guidesInforContent ul li input.dayNum").on('keyup', function() {
		$(".guidesInforContent ul li input.endDate").val(addByTransDate($('.guidesInforContent ul li input.startDate').val(), parseInt($(this).val()) - 1));
	});
	// 根据出发日期计算天数或者结束日期
	$('.guidesInforContent ul li input.startDate').on('change', function() {
		var startTime = $(this).val();
		var endTime = $(".guidesInforContent ul li input.endDate").val();
		var startNum = parseInt(startTime.replace(/-/g, ''), 10);
		var endNum = parseInt(endTime.replace(/-/g, ''), 10);
		var startDay = new Date(startTime);
		var endDay = new Date(endTime);
		if(endDay == 'Invalid Date') {
			var diff = $(".guidesInforContent ul li input.dayNum").val();
			if(diff != undefined) {
				$(".guidesInforContent ul li input.endDate").val(addByTransDate(startTime, parseInt(diff) - 1));
			}
		} else {
			$(".guidesInforContent ul li input.dayNum").val(generateDateCount(endDay, startDay));
		}
	});

}