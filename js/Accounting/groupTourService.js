function round(value, decimals) {
	return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function serviceNav() {
	$("ul.serviceNav").find("li").on("click", function() {
		heightRanges();
	});
}

function backToTop() {
	$(".accountingRight .orderList").find("a.backTop").on("click", function() {
		$("html, body").animate({
			scrollTop: 0
		});
	});
}

//折扣
function accountingDiscount() {
	//	heightRange();
	$(".msgDiscount").find("a.discountItem").on("click", function() {
		$(this).addClass("discount-active").siblings().removeClass("discount-active");
	});
	$(".discount-apply").on("click", function() {
		//选中折扣金额
		if($(".msgDiscount").find("a#discount-value").hasClass("discount-active")) {
			var reg = /^\d+(\.\d{1,2})?$/;
			if($("#discountText").val() == "" || !reg.test($("#discountText").val())) {
				$(".discountNotice").css("display", "none");
				$("#orderProfit").val(round($("#orderprice").val() - $("#orderCosting").val(), 2));
				alert('请输入正确的折扣金额');
			} else {
				$(".discountNotice").css("display", "block");
				$(".discountNotice").text('优惠金额: ' + $("#discountText").val() + "美元");
				$("#orderProfit").val(round($("#orderprice").val() - $("#orderCosting").val() - $("#discountText").val(), 2));
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
					couponCode: $("#discountText").val()
				},
				success: function(response) {
					if(response == "") {
						alert('折扣码不存在, 请重新输入正确的折扣码');
						$(".discountNotice").css("display", "none");
						$("#orderProfit").val(round($("#orderprice").val() - $("#orderCosting").val(), 2));
					} else if(response == 'Expired') {
						$(".discountNotice").css("display", "block");
						$(".discountNotice").text('该折扣码已过期');
						$("#orderProfit").val(round($("#orderprice").val() - $("#orderCosting").val(), 2));
					} else {
						$(".discountNotice").css("display", "block");
						$(".discountNotice").text('优惠金额: ' + response + '美元');
						$("#orderProfit").val(round($("#orderprice").val() - $("#orderCosting").val() - response, 2));
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log(textStatus, errorThrown);
				}
			});
		}
	});
}

//加载会计服务页面时左右两侧的高度:
function heightRanges() {
	var leftHeight = $(".navInfo ul").height();
	var rightHeight = $(".theamInfo").height();
	if(rightHeight > leftHeight) {
		$(".navInfo ul").css("height", rightHeight);
		$(".navInfo ul").css("padding-bottom", "4.16vh");
	} else if(rightHeight < leftHeight) {
		$(".navInfo ul").css("height", rightHeight);
		$(".navInfo ul").css("padding-bottom", "4.16vh");
	}
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

//表格状态
function editOrder() {
	var transactionId = $('dl.order-active dd.order-id').text();
	$(".kuaijiMsg .accountingLeft .modifyOrders").find("li.filterTitle").find("span").text(transactionId);

	var url = location.protocol.concat("//").concat(location.host).concat('/database/Accounting/GroupTour.php');
	$.ajax({
		url: url,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		type: 'post',
		data: {
			transactionId: transactionId,
			action: 'getOrderDetail'
		},
		success: function(response) {
			response = JSON.parse(response);
			$("#orderCurrency").attr("value", response['currency']);
			$("#orderprice").attr("value", response['price']);
			$("#orderCosting").attr("value", response['expense']);
			$("#orderProfit").attr("value", response['total_profit']);
			if(response['cc_id'] != null) {
				$("#discount-code").addClass('discount-active');
				$("#discount-value").removeClass('discount-active');
				$(".discountNotice").css("display", "block");
				$(".discountNotice").text('优惠金额: ' + response['coupon'] + '美元');
				$("#discountText").val(response['code']);
			} else if(response['coupon'] != null) {
				$("#discount-value").addClass('discount-active');
				$("#discount-code").removeClass('discount-active');
				$(".discountNotice").css("display", "block");
				$(".discountNotice").text('优惠金额: ' + response['coupon'] + '美元');
				$("#discountText").val(response['coupon']);
			} else {
				$("#discount-value").removeClass('discount-active');
				$("#discount-code").removeClass('discount-active');
				$(".discountNotice").css("display", "block");
				$(".discountNotice").text('未使用任何优惠');
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(textStatus, errorThrown);
		}
	});
}

function listStatus() {
	$(".orderList ul.order-detail li").find("dl").on('click', function() {
		var thisDl = $(this);
		if(!$(this).hasClass("order-active")) {
			$(this).addClass("order-active");
			$(".kuaijiMsg .accountingLeft .modifyOrders").css("display", "block");
			editOrder();
		} else {
			$(this).removeClass("order-active");
			if($(".orderList ul.order-detail dl.order-active").length < 1) {
				$(".kuaijiMsg .accountingLeft .modifyOrders").css("display", "none");
			}
			if($(".orderList ul.order-detail dl.order-active").length >= 1) {
				$(".kuaijiMsg .accountingLeft .modifyOrders").css("display", "block");
			}
		}
		heightRange();
		
		if($(".kuaijiMsg .accountingLeft .modifyOrders").css("display") == "block") {
			// 确认CLEAR/LOCK
			$("#clearOrder, #lockOrder").on("click", function() {
				$(this).addClass("current-status");
				if($(this)['0'].id == 'clearOrder') {
					$(".clearConfirmBox").removeClass("nm-hide");
					$(".clearConfirmBox").find(".confirmNotice").text("确认CLEAR");
				} else if($(this)['0'].id == 'lockOrder') {
					$(".lockConfirmBox").removeClass("nm-hide");
					$(".lockConfirmBox").find(".confirmNotice").text("确认LOCK");
				}
			});
		}
		else{
			$("#clearOrder, #lockOrder").unbind("click");
		}
	});

}

$(document).ready(function() {
	arrowStatus();
//	confirmStatus();
	var offset = 0;

	function loadFilterData(offset) {
		var data = {
			offset: offset,
			transactionId: $("#accounting-service-filter-transaction-id").val(),
			groupCode: $("#accounting-service-filter-grouptour-code").val(),
			salesperson: $("#accounting-service-filter-salesperson").val(),
			wholesaler: $("#accounting-service-filter-wholesaler").val(),
			invoice: $("#accounting-service-filter-invoice").val(),
			fromDate: $("#accounting-service-filter-from-date").val(),
			toDate: $("#accounting-service-filter-to-date").val()
		}

		var url = location.protocol.concat("//").concat(location.host).concat('/database/Accounting/GroupTour/getOrderList.php');
		$.ajax({
			url: url,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			type: 'GET',
			data: data,
			success: function(response) {
				response = JSON.parse(response);
				for(var i = 0; i < response.length; i++) {
					var $html = '';
					if(response[i]['clear_status'] == 'N') {
						$html = '<li><dl>';
					} else if(response[i]['clear_status'] == 'Y') {
						$html = '<li><dl class="clearAndUnlock">';
					}
					$html += '<dd class="order-id">' + response[i]['transaction_id'] + '</dd>' +
						'<dd class="salesman">' + response[i]['salesperson_code'] + '</dd>' +
						'<dd class="groupNum">' + response[i]['group_code'] + '</dd>' +
						'<dd class="createTime">' + response[i]['create_time'].substring(0, 10) + '</dd>' +
						'<dd class="wholesalers">' + response[i]['wholesaler_code'] + '</dd>' +
						'<dd>' + response[i]['title'] + '</dd>' +
						'<dd class="invoice">' + response[i]['invoice'] + '</dd>' +
						'<dd class="amount">' + response[i]['payment_amount'] + '</dd>' +
						'</dl></li>';
					$('ul.order-detail').append($html);
				}
				$(".orderList ul.order-detail li").find("dl").unbind('click');
				listStatus();
				heightRange();
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
	}
	// 载入默认的数据
	loadFilterData(offset);

	$("#accounting-service-filter-salesperson, #accounting-service-filter-agency").on('focus', function() {
		var current_id = $(this).attr('id');
		var target = "";
		if(current_id == 'accounting-service-filter-salesperson') {
			target = "salesperson";
		} else if(current_id == 'accounting-service-filter-agency') {
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

	// 重置页面，清空筛选条件
	$("a.resetInfo").on("click", function() {
		$(this).parent("li").siblings().find("input").attr("value", "");
		$('ul.order-detail').empty();
		$(".filterInfo").removeClass("filter-on");
		offset = 0;
		loadFilterData(offset);
		$(".modifyOrders").hide();
	});

	// 筛选条件
	$(".filterInfo").on("click", function() {
		offset = 0;
		$('ul.order-detail').empty();
		$(this).addClass("filter-on");
		loadFilterData(offset);
		heightRange();
	});

	//点击展开
	$(".order-unfold").on("click", function() {
		offset += 20;
		loadFilterData(offset);
		heightRange();
	});

	$("#clearActionConfirm, #lockActionConfirm").on('click', function() {
		var orderList = [];
		for(var i = 0; i < $(".order-active").length; i++) {
			orderList.push($(".order-active")[i]['firstChild']['innerHTML']);
			$(".order-active").parent().addClass("toBeClearedOrLocked");
		}
		var action = $(this)['0'].id;
		var data = {
			orderList: orderList
		};
		if(action == 'clearActionConfirm') {
			data['action'] = 'clear';
		} else if(action == 'lockActionConfirm') {
			data['action'] = 'lock';
		}

		var url = location.protocol.concat("//").concat(location.host).concat('/database/Accounting/GroupTour.php');
		$.ajax({
			url: url,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			type: 'post',
			data: data,
			success: function(response) {
				if(action == 'clearActionConfirm') {
					$(".toBeClearedOrLocked").find("dl.order-active")
						.css("background-color", "#bebebe")
						.css("color", "#ffffff")
						.removeClass("order-active");
					$(".toBeClearedOrLocked").removeClass("toBeClearedOrLocked");
				} else if(action == 'lockActionConfirm') {
					$(".toBeClearedOrLocked").remove();
				}
				$(".current-status").removeClass("current-status");
				$(".confirmInfo").addClass("nm-hide");
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
	});
	$("#clearActionCancel, #lockActionCancel").on('click', function() {
		$(".current-status").removeClass("current-status");
		$(".confirmInfo").addClass("nm-hide");
	});

	//全选 or 全不选
	$(".action-checkAll, .action-invert").on("mousedown", function() {
		if($(this)['0'].innerText == '全选') {
			$(this).find("img").attr("src", "../img/quanxuan_c.png");
		} else if($(this)['0'].innerText == '全不选') {
			$(this).find("img").attr("src", "../img/cha_c.png");
		}
		$(this).addClass("check-active");
	});
	$(".action-checkAll, .action-invert").on("mouseup", function() {
		if($(this)['0'].innerText == '全选') {
			$(this).find("img").attr("src", "../img/quanxuan_d.png");
			$(".orderList ul.order-detail li").find("dl").addClass("order-active");
		} else if($(this)['0'].innerText == '全不选') {
			$(this).find("img").attr("src", "../img/cha_d.png");
			$(".orderList ul.order-detail li").find("dl").removeClass("order-active");
		}
		$(".kuaijiMsg .accountingLeft .modifyOrders").css("display", "none");
		setTimeout(function() {
			$(".check-active").removeClass("check-active");
		}, 70);
	});

	$("#orderprice, #orderCosting").on('keyup', function() {
		$("#orderProfit").val(
			round(Number($("#orderprice").val()) - Number($("#orderCosting").val()) - Number($(".discountNotice").text().replace(/[^\d\.]*/g, '')), 2)
		);
	});

	$("#accounting-edit-confirm").on('click', function() {
		$(".accountingEditConfirmBox").css("display", "block");
	});

	$("#accountingEditActionConfirm").on('click', function() {
		var data = {
			action: 'update',
			transactionId: $('dl.order-active dd.order-id').text(),
			currency: $("#orderCurrency").val(),
			price: $("#orderprice").val(),
			expense: $("#orderCosting").val(),
			coupon: $("#discountText").val(),
			couponValue: $(".discountNotice").text().replace(/^\D+/g, ''),
			profit: $("#orderProfit").val()
		};

		var url = location.protocol.concat("//").concat(location.host).concat('/database/Accounting/GroupTour.php');
		$.ajax({
			url: url,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			type: 'post',
			data: data,
			success: function(response) {
				if(response == 'code expired') {
					alert("Coupon Code Expired");
					return;
				} else if(response == 'coupon not exist') {
					alert("Coupon Code Does Not Exist");
					return;
				}

				$(".accountingEditConfirmBox").css("display", "none");

				var transactionDetails = [];
				transactionDetails.push($("#orderprice").attr("value"));
				transactionDetails.push($("#orderCosting").attr("value"));
				transactionDetails.push($("#orderProfit").attr("value"));
				transactionDetails = $("#orderCurrency").attr("value") + " " + transactionDetails.join(" | ");
				$("div.orderList ul.order-detail li dl.order-active").find("dd.transactionDetails").text(transactionDetails);

				if(response == 'Successfully updated') {
					$("div.orderList ul.order-detail li dl.order-active").find("dd.discount-code").text($(".discountNotice").text().replace(/^\D+/g, ''));
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
	});

	$("#accountingEditActionCancel").on('click', function() {
		$(".accountingEditConfirmBox").css("display", "none");
	});

	$("#accounting-edit-reset").on('click', function() {
		editOrder();
	});
});

function leftFloatBox() {
	$(document).scroll(function() {
		var winScrollTop = $(window).scrollTop();
		if(winScrollTop > 90) {
			$(".kuaijiMsg .accountingLeft").css("top", "-60px");
			//$(".kuaijiMsg .accountingLeft").css("position", "fixed");
		} else {
			$(".kuaijiMsg .accountingLeft").css("top", "initial");
			//$(".kuaijiMsg .accountingLeft").css("position", "absolute");
		}
	});
	var accountingLeftHeight = $(".kuaijiMsg").find(".accountingLeft").height();
	var groupMsgHeight = $(".theamInfo").find(".showMsg.kuaijiMsg").find(".accountingService").find(".groupMsg").height();
	if(groupMsgHeight < accountingLeftHeight) {
		$(".theamInfo").find(".showMsg.kuaijiMsg").find(".accountingService").find(".groupMsg").css("height", accountingLeftHeight);
	}
}

function arrowStatus() {
	$(".accountingRight .orderList ul.order-title li").on("click", function() {
		//上白下橙
		if(($(this).find("img.arrow_down").attr("src") == "../img/arrowDown_icon.png") && ($(this).find("img.arrow_up").attr("src") == "../img/arrowUp0_icon.png")) {
			$(this).find("img.arrow_down").attr("src", "../img/arrowDown0_icon.png");
			$(this).find("img.arrow_up").attr("src", "../img/arrowUp_icon.png");
		} else {
			$(this).find("img.arrow_down").attr("src", "../img/arrowDown_icon.png");
			$(this).find("img.arrow_up").attr("src", "../img/arrowUp0_icon.png");
		}
		$(this).siblings("li").find("img.arrow_down").attr("src", "../img/arrowDown0_icon.png");
		$(this).siblings("li").find("img.arrow_up").attr("src", "../img/arrowUp0_icon.png");
	});
}

function confirmStatus() {
	

}