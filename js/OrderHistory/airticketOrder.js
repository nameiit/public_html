function autoWidth() {
	var dlBox = $(".resultInfo").find("ul li.resultNav").find("dl");
	var liBox = $(".resultInfo").find("ul li.resultDetail").find("dl");
	var newWidth = 0;
	for(var i = 0; i < dlBox.find("dd").length; i++) {
		var cell = $(".resultInfo").find("ul li.resultDetail").find("dl").find("dd");
		dlBox.find("dd").eq(i).css("width", $(cell.eq(i)).width());
		var newWidth = parseInt(newWidth + $(cell.eq(i)).width() + 1);
	}
	$(".resultInfo ul").css({
		"width": newWidth,
	});
	if(newWidth > $(".resultInfo").outerWidth()) {
		$(".resultInfo").css({
			"overflow-x": "scroll",
		});
	}
}

//通用信息选择
function generalInfo() {
	autoWidth();
	$(".showMsg .floor .groupMsg").find(".tabCard ul li").find("input[type='checkbox']").unbind().on("click", function() {
		var txt = $.trim($(this).parent().find("label:visible").text());
		var dlBox = $(".resultInfo").find("ul li.resultNav").find("dl");
		if(!$(this).parent().parent("li").hasClass("selected")) {
			//选中某一项
			$(this).parent().parent("li").addClass("selected");
			dlBox.empty();
			dlBox.append(`<dd class="new">#</dd>`);
			$("div.generalInfo, div.groupTourInfo").find("input:checked").each(function() {
				var labelText = $('label[for=' + $(this).attr("id") + ']').text();
				dlBox.append(`<dd class="new">` + labelText + `</dd>`);
			});
			var newWidth = 0;
			for(var i = 0; i < dlBox.find("dd").length; i++) {
				var cell = $(".resultInfo").find("ul li.resultDetail").find("dl").find("dd");
				newWidth = parseInt(newWidth + $(cell.eq(i)).width() + 1);
				dlBox.find("dd").eq(i).css("width", $(cell.eq(i)).width());
			}
			autoWidth();
			$(".resultInfo ul").css({
				"width": newWidth,
			});
			if(newWidth > $(".resultInfo").outerWidth()) {
				$(".resultInfo").css({
					"overflow-x": "scroll",
				});
			}

		} else {
			var newWidth = 0;
			for(var m = 0; m < dlBox.find("dd").length; m++) {
				if(txt == $.trim($(dlBox.find("dd")[m]).text())) {
					if($(".showMsg .floor .groupMsg").find(".tabCard ul li.selected").length > 1) {
						$(this).parent().parent("li").removeClass("selected");
						$(dlBox.find("dd")[m]).remove();
						for(var j = 0; j < $(".resultInfo").find("ul li.resultDetail").length; j++) {
							$($(".resultInfo").find("ul li.resultDetail")[j]).find("dl").find("dd").eq(m).remove();
							autoWidth();
							var flag = true;
						}
					} else {
						alert("至少选中一条通用信息");
						$(this).attr("checked", "checked");
					}
				}
			}
			if(flag == true) {
				for(var k = 0; k < dlBox.find("dd").length; k++) {
					var cell = $(".resultInfo").find("ul li.resultDetail").find("dl").find("dd");
					newWidth = parseInt(newWidth + $(cell.eq(k)).width() + 1);
					autoWidth();
					$(".resultInfo ul").css({
						"width": newWidth,
					});
					if(newWidth < $(".resultInfo").outerWidth()) {
						$(".resultInfo").css({
							"overflow-x": "initial"
						});
					}
				}
			}
		}
	});
}

//重置
function resetInfo() {
	$(".historicRecord .actionRecord").find("ul").find("li:last-child").find("a").on("click", function() {
		//基本信息部分
		$(".filterBasicInfo").find("input").val("");
		$(".filterBasicInfo").find("input[type='checkbox']").attr("checked", false);
		$(".filterBasicInfo").find("input[type='checkbox']:first").attr("checked", true);
		var defaultTxt = $(".filterBasicInfo").find("select").find("option:first").text();
		$(".filterBasicInfo").find("select").val("all")
		$(".dateRange").hide();
		//高级信息部分
		$(".filterAdvancedInfo").find("input").val("");
		$(".filterAdvancedInfo").find("select").find("option:first").prop("selected", 'selected');
		//独立团信息部分
		$(".filterGroupTourInfo").find("input").val("");
		$(".filterGroupTourInfo").find("select").find("option:first").prop("selected", 'selected');
		$(".filterGroupTourInfo").find("input[type='checkbox']").attr("checked", false);
		$(".filterGroupTourInfo").find("input[type='radio']").attr("checked", false);

	});
}

$(document).ready(function() {
	dateRange();
	accountingNav();
	accountDateRange($("li.dateOption"), $(".dateRange"));
	generalInfo(); //通用信息选择
	resetInfo();
	inputBoxWidth();
	if($("input#salesperson").attr("disabled") == "disabled") {
		$("input#salesperson").css({
			"border": "solid 1px #959595"
		})
	}

	var displayInfo = {
		transaction_id: [],
		currency: [],
		create_time: [],
		salesperson_code: [],
		profit: [],
		revenue: [],
		expense: [],
		code: [],
		coupon: [],
		source_name: [],
		clear_status: [],
		lock_status: [],
		note: [],
		locator: [],
		invoice: [],
		received2: [],
		flight_code: [],
		round_trip: [],
		ticket_type: [],
		passenger_number: [],
		refunded: [],
		travel_agency: []
	};

	/*
	 *   搜索列表
	 */
	$("#salesperson, #source, #travel-agency").on('focus', function() {
		var current_id = $(this).attr('id');
		var target = "";
		if(current_id == 'salesperson') {
			target = 'salesperson';
		} else if(current_id == 'source') {
			target = 'source';
		} else if(current_id == 'travel-agency') {
			target = 'travelAgency';
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

	$(document).on('change', '#lockOrder', function() {
		if(this.checked) {
			$("#clearOrder").prop("checked", true);
		}
	});

	$(".filterInfo ul li.infoDistrict .currencyInfo").find("a").on('click', function() {
		var innerTxt = $.trim($(this).text());
		if(innerTxt == "$") {
			$(this).text("￥");

		} else if(innerTxt == "￥") {
			$(this).text("$");
		}
	});
//	$(document).on('click', '.currencySelected', function() {
//		var html = $(this).html();
//		$(".currencySelected").html(html);
//	});

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

	function getFilterData() {
		var data = {
			transaction_id: $("#transaction-id").val(),
			locator: $("#air-ticket-locator").val(),
			payment_type: ($("#payment-type").val() == 'all') ? '%' : $("#payment-type").val(),
			profit_min: $("#profit-min").val(),
			profit_max: $("#profit-max").val(),
			salesperson: $("#salesperson").val(),
			cost_min: $("#cost-min").val(),
			cost_max: $("#cost-max").val(),
			travel_agency: $("#travel-agency").val(),
			price_min: $("#price-min").val(),
			price_max: $("#price-max").val(),
			source: $("#source").val(),
			adult_number: $("#adult-number").val(),
			children_number: $("#children-number").val(),
			infant_nunmber: $("#infant-number").val(),
			flight_number: $("#flight-number").val(),
			leave_airport: $("#leave-airport").val(),
			arrival_airport: $("#arrival-airport").val(),
			leave_date: $("#leave-date").val(),
			arrival_date: $("#arrival-date").val()
		}

		var profit_currency = $(".currencySelected").eq(0).html();
		if(profit_currency == '$') {
			profit_currency = 'USD';
		} else {
			profit_currency = 'RMB';
		}

		var cost_currency = $(".currencySelected").eq(1).html();
		if(cost_currency == '$') {
			cost_currency = 'USD';
		} else {
			cost_currency = 'RMB';
		}

		var price_currency = $(".currencySelected").eq(2).html();
		if(price_currency == '$') {
			price_currency = 'USD';
		} else {
			price_currency = 'RMB';
		}

		Object.assign(data, {
			profit_currency: profit_currency,
			cost_currency: cost_currency,
			price_currency: price_currency
		});

		var status = [];
		$("li.statusOption").find("input:checked").each(function() {
			status.push($(this).attr("id"));
		});
		if(status.length == 0) {
			alert("请选择订单状态");
			return;
		}
		Object.assign(data, {
			status: JSON.stringify(status)
		});

		today = getTodayYYYYMMDD();
		if($("#time-filter").val() == 'today') {
			Object.assign(data, {
				from_date: delByTransDate(today, 0),
				to_date: addByTransDate(today, 1)
			});
		} else if($("#time-filter").val() == 'week') {
			Object.assign(data, {
				from_date: delByTransDate(today, 6),
				to_date: addByTransDate(today, 1)
			});
		} else if($("#time-filter").val() == 'month') {
			Object.assign(data, {
				from_date: delByTransDate(today, 29),
				to_date: addByTransDate(today, 1)
			});
		} else if($("#time-filter").val() == 'year') {
			Object.assign(data, {
				from_date: delByTransDate(today, 364),
				to_date: addByTransDate(today, 1)
			});
		} else if($("#time-filter").val() == 'all') {
			Object.assign(data, {
				from_date: '0',
				to_date: 'CURRENT_DATE + 1'
			});
		} else {
			var dates = $("#to-date").val().split("-");
			var date = new Date(dates[0], dates[1] - 1, dates[2]);
			var toDate = new Date(date);
			toDate.setDate(date.getDate() + 1);
			toDate = formatDate(toDate);

			Object.assign(data, {
				from_date: $("#from-date").val(),
				to_date: toDate
			});
		}

		if($("#arriveAndDepart")[0].checked && $("#singleTrip")[0].checked) {
			Object.assign(data, {
				round_trip: '%'
			});
		} else if($("#arriveAndDepart")[0].checked && !$("#singleTrip")[0].checked) {
			Object.assign(data, {
				round_trip: 'round'
			});
		} else if(!$("#arriveAndDepart")[0].checked && $("#singleTrip")[0].checked) {
			Object.assign(data, {
				round_trip: 'oneway'
			});
		} else {
			Object.assign(data, {
				round_trip: '%'
			});
		}

		if($("#groupTicket")[0].checked && $("#indivTicket")[0].checked) {
			Object.assign(data, {
				ticket_type: '%'
			});
		} else if($("#groupTicket")[0].checked && !$("#indivTicket")[0].checked) {
			Object.assign(data, {
				ticket_type: 'group'
			});
		} else if(!$("#groupTicket")[0].checked && $("#indivTicket")[0].checked) {
			Object.assign(data, {
				ticket_type: 'individual'
			});
		} else {
			Object.assign(data, {
				ticket_type: '%'
			});
		}

		if($("#refund")[0].checked) {
			Object.assign(data, {
				refunded: 'Y'
			});
		} else {
			Object.assign(data, {
				refunded: 'N'
			});
		}
		console.log(data);
		return data;
	}

	function loadHistoryData(filter, action) {
		if(filter == null) {
			return;
		}
		Object.assign(filter, {
			action: action
		});

		displayInfo = {
			transaction_id: [],
			currency: [],
			create_time: [],
			salesperson_code: [],
			profit: [],
			revenue: [],
			expense: [],
			code: [],
			coupon: [],
			source_name: [],
			clear_status: [],
			lock_status: [],
			note: [],
			locator: [],
			invoice: [],
			received2: [],
			flight_code: [],
			round_trip: [],
			ticket_type: [],
			passenger_number: [],
			refunded: [],
			travel_agency: []
		};
		var url = location.protocol.concat("//").concat(location.host).concat('/database/OrderHistory/AirTicketTour.php');
		$.ajax({
			url: url,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			type: 'GET',
			data: filter,
			success: function(response) {
				$("li.resultDetail").remove();
				response = JSON.parse(response);
				console.log(response);

				for(var i = 0; i < response.length; i++) {
					displayInfo['transaction_id'].push(response[i]['transaction_id']);
					displayInfo['currency'].push(response[i]['currency']);
					displayInfo['create_time'].push(response[i]['create_time']);
					displayInfo['salesperson_code'].push(response[i]['salesperson_code']);
					displayInfo['profit'].push(response[i]['total_profit']);
					displayInfo['revenue'].push(response[i]['received']);
					displayInfo['expense'].push(response[i]['expense']);
					displayInfo['code'].push(response[i]['code']);
					displayInfo['coupon'].push(response[i]['coupon']);
					displayInfo['source_name'].push(response[i]['source_name']);
					displayInfo['clear_status'].push(response[i]['clear_status']);
					displayInfo['lock_status'].push(response[i]['lock_status']);
					displayInfo['note'].push(response[i]['note']);
					displayInfo['locator'].push(response[i]['locators']);
					displayInfo['invoice'].push(response[i]['invoice']);
					displayInfo['received2'].push(response[i]['received2']);
					displayInfo['flight_code'].push(response[i]['flight_code']);
					displayInfo['round_trip'].push(response[i]['round_trip']);
					displayInfo['ticket_type'].push(response[i]['ticket_type']);
					displayInfo['passenger_number'].push(response[i]['wholesaler_code']);
					displayInfo['refunded'].push(response[i]['refunded']);
					displayInfo['travel_agency'].push(response[i]['agency_name']);
				}
				$('#historyOrders').pagination({
					totalData: response.length,
					showData: 15,
					current: 0,
					coping: true,
					homePage: '首页',
					endPage: '末页',
					prevContent: '上页',
					nextContent: '下页',
					callback: function(api) {
						var j = api.getCurrent(); //获取当前页
						var index = (j - 1) * 15;
						var endIndex = (index + 15 < displayInfo['transaction_id'].length) ? index + 15 : displayInfo['transaction_id'].length;
						$("li.resultDetail").remove();
						for(var i = index; i < endIndex; i++) {
							$html = `
							<li class="resultDetail">
                  <dl><dd>` + displayInfo['transaction_id'][i] + `</dd>`;
							$("div.generalInfo, div.groupTourInfo").find("input:checked").each(function() {
//								autoWidth();
								var info = displayInfo[$(this).attr("id")][i];
								if(displayInfo[$(this).attr("id")][i] == null) {
									info = "";
								}
								$html += "<dd>" + info + "</dd>";
							});
							$html += `</dl></li>`;
							$("div.resultInfo ul").eq(0).append($html);
						}
					}
				});
				$('ul.pagination').find('a').click();
				heightRange();
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
	}
	loadHistoryData(getFilterData(), 'getHistoryOrder');

	$("#filter-confirm").on('click', function() {
		loadHistoryData(getFilterData(), 'getHistoryOrder');
	});

	$(document).on('change', 'div.generalInfo div.checkbox input, div.groupTourInfo div.checkbox input', function() {
		$("li.resultDetail").remove();
		$('#historyOrders').pagination({
			totalData: displayInfo['transaction_id'].length,
			showData: 15,
			current: 0,
			coping: true,
			homePage: '首页',
			endPage: '末页',
			prevContent: '上页',
			nextContent: '下页',
			callback: function(api) {
				var j = api.getCurrent(); //获取当前页
				var index = (j - 1) * 15;
				var endIndex = (index + 15 < displayInfo['transaction_id'].length) ? index + 15 : displayInfo['transaction_id'].length;
				$("li.resultDetail").remove();
				for(var i = index; i < endIndex; i++) {
					$html = `
        				<li class="resultDetail">
        					<dl><dd>` + displayInfo['transaction_id'][i] + `</dd>`;
					$("div.generalInfo, div.groupTourInfo").find("input:checked").each(function() {
//						autoWidth();
						var info = displayInfo[$(this).attr("id")][i];
						if(displayInfo[$(this).attr("id")][i] == null) {
							info = "";
						}
						$html += "<dd>" + info + "</dd>";
					});
					$html += `</dl></li>`;
					$("div.resultInfo ul").eq(0).append($html);
					autoWidth();
				}
			}
		});
		$('ul.pagination').find('a').click();
	});
});

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

function inputBoxWidth() {
	var sumWidth = $(".filterInfo.filterGroupTourInfo").find("ul").find("li").find("input#flight-number").width() + 2;
	var boxWidth = (sumWidth - $(".filterInfo ul li.infoDistrict a").width() - 30) / 2;
	//行程日期
	$(".filterInfo ul li.infoDistrict input[type='date']").css("width", (sumWidth - 21) / 2 + "px");
	//总人数
	$(".filterInfo ul li.infoDistrict input[type='text']").css("width", (sumWidth - 21) / 2 + "px");
	//利润/成本/收入
	$(".filterInfo ul li.infoDistrict").find(".currencyInfo").find("input[type='text']").css("width", (boxWidth - 1) + "px");
	$(window).resize(function() {
		var sumWidth = $(".filterInfo.filterGroupTourInfo").find("ul").find("li").find("input#flight-number").width() + 2;
		var boxWidth = (sumWidth - $(".filterInfo ul li.infoDistrict a").width() - 30) / 2;
		//行程日期
		$(".filterInfo ul li.infoDistrict input[type='date']").css("width", (sumWidth - 21) / 2 + "px");
		//总人数
		$(".filterInfo ul li.infoDistrict input[type='text']").css("width", (sumWidth - 21) / 2 + "px");
		//利润/成本/收入
		$(".filterInfo ul li.infoDistrict").find(".currencyInfo").find("input[type='text']").css("width", (boxWidth - 1) + "px");
	});
}
