$(document).ready(function() {
	arrowStatus();
	listStatus();
    /*
     * Get auto-complete search list
     */
    $("#accounting-service-filter-salesperson, #accounting-service-filter-wholesaler").on('focus', function() {
        var current_id = $(this).attr('id');
				var target = "";
				if (current_id == 'accounting-service-filter-salesperson') {
					target = "salesperson";
				} else if (current_id == 'accounting-service-filter-wholesaler') {
					target = "wholesaler";
				}
        var url = location.protocol.concat("//").concat(location.host).concat('/database/autoComplete.php');
        $.ajax({
            url: url,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            type: 'post',
            data: { target: target},
            success: function(response) { autocomplete(document.getElementById(current_id), JSON.parse(response)); },
            error: function(jqXHR, textStatus, errorThrown) { console.log(textStatus, errorThrown); }
        });
    });

    /*
     * Display order list
     */
    var offset = 0;

    function loadFilterData(offset) {
        var data = {
            action: 'filter',
            offset: offset,
            transactionId: $("#accounting-service-filter-transaction-id").val(),
            locator: $("#accounting-service-filter-locator").val(),
            salespersonId: $("#accounting-service-filter-salesperson").val(),
            flightNumber: $("#accounting-service-filter-flight-number").val(),
            customerCount: $("#accounting-service-filter-customer-count").val(),
            fromDate: $("#accounting-service-filter-from-date").val(),
            toDate: addByTransDate($("#accounting-service-filter-to-date").val(), 1)
        }
        var url = location.protocol.concat("//").concat(location.host).concat('/database/Accounting/AirTicket.php');
        $.ajax({
            url: url,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            type: 'GET',
            data: data,
            success: function(response) {
                response = JSON.parse(response);

                for (var i = 0; i < response.length; i++) {
                    var coupon = (response[i]['coupon'] == null) ? '0.00' : response[i]['coupon'];
                    var $html = '';
                    if (response[i]['clear_status'] == 'N') {
                        $html = '<li><dl>';
                    } else if (response[i]['clear_status'] == 'Y') {
                        $html = '<li><dl class="clearAndUnlock">';
                    }
                    $html +=
                        '<dd class="order-id">' + response[i]['transaction_id'] + '</dd>' +
                        '<dd class="locator">' + response[i]['locators'] + '</dd>' +
                        '<dd class="invoice">' + response[i]['invoice'] + '</dd>' +
                        '<dd class="createDate">' + response[i]['create_time'].substring(0, 10) + '</dd>' +
                        '<dd class="salesman">' + response[i]['salesperson_code'] + '</dd>' +
                        '<dd class="transactionDetails">' + response[i]['transaction_details'] + '</dd>' +
                        '<dd class="discount-code">' + coupon + '</dd>' +
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

    // Load default data to be displayed
    loadFilterData(offset);

    /*
     * Load more data
     */
    $(".order-unfold").on("click", function() {
        offset += 20;
        loadFilterData(offset);
        heightRange();
    });

    /*
     * Apply filter condition
     */
    $(".filterInfo").on("click", function() {
        offset = 0;
        $('ul.order-detail').empty();
        $(this).addClass("filter-on");
        loadFilterData(offset);
        heightRange();
    });

    /*
     * Reset filter condition
     */
    $("a.resetInfo").on("click", function() {
        $(this).parent("li").siblings().find("input").attr("value", "");
        $('ul.order-detail').empty();
        $(".filterInfo").removeClass("filter-on");
        offset = 0;
        loadFilterData(offset);
        $(".modifyOrders").hide();
    });

    /*
     * Clear or lock one or more orders
     */
//  $("#clearOrder, #lockOrder").on("click", function() {
//      $(this).addClass("current-status");
//      if ($(this)['0'].id == 'clearOrder') {
//          $(".clearConfirmBox").removeClass("nm-hide");
//          $(".clearConfirmBox").find(".confirmNotice").text("确认CLEAR");
//      } else if ($(this)['0'].id == 'lockOrder') {
//          $(".lockConfirmBox").removeClass("nm-hide");
//          $(".lockConfirmBox").find(".confirmNotice").text("确认LOCK");
//      }
//  });
    $("#clearActionConfirm, #lockActionConfirm").on('click', function() {
        var orderList = [];
        for (var i = 0; i < $(".order-active").length; i++) {
            orderList.push($(".order-active")[i]['firstChild']['innerHTML']);
            $(".order-active").parent().addClass("toBeClearedOrLocked");
        }
        var action = $(this)['0'].id;
        var data = {
            orderList: orderList
        };
        if (action == 'clearActionConfirm') {
            data['action'] = 'clear';
        } else if (action == 'lockActionConfirm') {
            data['action'] = 'lock';
        }

        var url = location.protocol.concat("//").concat(location.host).concat('/database/Accounting/AirTicket.php');
        $.ajax({
            url: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: 'POST',
            data: data,
            success: function(response) {
                if (action == 'clearActionConfirm') {
                    $(".toBeClearedOrLocked").find("dl.order-active")
                        .css("background-color", "#bebebe")
                        .css("color", "#ffffff")
                        .removeClass("order-active");
                    $(".toBeClearedOrLocked").removeClass("toBeClearedOrLocked");
                } else if (action == 'lockActionConfirm') {
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

    /*
     * All select or all un-select
     */
    $(".action-checkAll, .action-invert").on("mousedown", function() {
        if ($(this)['0'].innerText == '全选') {
            $(this).find("img").attr("src", "../img/quanxuan_c.png");
        } else if ($(this)['0'].innerText == '全不选') {
            $(this).find("img").attr("src", "../img/cha_c.png");
        }
        $(this).addClass("check-active");
    });
    $(".action-checkAll, .action-invert").on("mouseup", function() {
        if ($(this)['0'].innerText == '全选') {
            $(this).find("img").attr("src", "../img/quanxuan_d.png");
            $(".orderList ul.order-detail li").find("dl").addClass("order-active");
        } else if ($(this)['0'].innerText == '全不选') {
            $(this).find("img").attr("src", "../img/cha_d.png");
            $(".orderList ul.order-detail li").find("dl").removeClass("order-active");
        }
        $(".kuaijiMsg .accountingLeft .modifyOrders").css("display", "none");
        setTimeout(function() {
            $(".check-active").removeClass("check-active");
        }, 70);
    });

    /*
     * Edit order info
     */
    $("#orderprice, #orderCosting, #orderCashBack").on('keyup', function() {
        $("#orderProfit").val(
            round((Number($("#orderprice").val()) + Number($("#orderCashBack").val())
                    - Number($("#orderCosting").val()) - Number($(".discountNotice").text().replace( /[^\d\.]*/g, ''))), 2)
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
            receive2: $("#orderCashBack").val(),
            coupon: $("#discountText").val(),
            couponValue: $(".discountNotice").text().replace(/^\D+/g, ''),
            profit: $("#orderProfit").val()
        };

        var url = location.protocol.concat("//").concat(location.host).concat('/database/Accounting/AirTicket.php');
        $.ajax({
            url: url,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            type: 'POST',
            data: data,
            success: function(response) {
                if (response == 'code expired') {
                    alert("Coupon Code Expired");
                    return;
                } else if (response == 'coupon not exist') {
                    alert("Coupon Code Does Not Exist");
                    return;
                }

                $(".accountingEditConfirmBox").css("display", "none");

                var transactionDetails = [];
                transactionDetails.push($("#orderprice").attr("value"));
                transactionDetails.push($("#orderCashBack").attr("value"));
                transactionDetails.push($("#orderCosting").attr("value"));
                transactionDetails.push($("#orderProfit").attr("value"));
                transactionDetails = $("#orderCurrency").attr("value") + " " + transactionDetails.join(" | ");
                $("div.orderList ul.order-detail li dl.order-active").find("dd.transactionDetails").text(transactionDetails);

                if (response == 'Successfully updated') {
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


function editOrder() {
    var transactionId = $('dl.order-active dd.order-id').text();
    $(".kuaijiMsg .accountingLeft .modifyOrders").find("li.filterTitle").find("span").text(transactionId);

    var url = location.protocol.concat("//").concat(location.host).concat('/database/Accounting/AirTicket.php');
    $.ajax({
        url: url,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        type: 'GET',
        data: { transactionId: transactionId, action: 'getOrderDetail' },
        success: function(response) {
            response = JSON.parse(response);
            console.log(response);
            $("#orderCurrency").attr("value", response['currency']);
            $("#orderprice").attr("value", response['received']);
            $("#orderCosting").attr("value", response['expense']);
            $("#orderCashBack").attr("value", response['received2']);
            $("#orderProfit").attr("value", response['total_profit']);
            if (response['cc_id'] != null) {
                $("#discount-code").addClass('discount-active');
                $("#discount-value").removeClass('discount-active');
                $(".discountNotice").css("display", "block");
                $(".discountNotice").text('优惠金额: ' + response['coupon']+'美元');
                $("#discountText").val(response['code']);
            } else if (response['coupon'] != null) {
                $("#discount-value").addClass('discount-active');
                $("#discount-code").removeClass('discount-active');
                $(".discountNotice").css("display", "block");
                $(".discountNotice").text('优惠金额: ' + response['coupon']+'美元');
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

//折扣
function accountingDiscount_airticket() {
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
				$("#orderProfit").val(round(Number($("#orderprice").val()) + Number($("#orderCashBack").val()) - Number($("#orderCosting").val()), 2));
				alert('请输入正确的折扣金额');
			} else {
				$(".discountNotice").css("display", "block");
				$(".discountNotice").text('优惠金额: ' + $("#discountText").val()+'美元');
				$("#orderProfit").val(round(Number($("#orderprice").val()) + Number($("#orderCashBack").val())
                                                - Number($("#orderCosting").val()) - Number($("#discountText").val()), 2));
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
						$("#orderProfit").val(round(Number($("#orderprice").val()) + Number($("#orderCashBack").val()) - Number($("#orderCosting").val()), 2));
					} else if(response == 'Expired') {
						$(".discountNotice").css("display", "block");
						$(".discountNotice").text('该折扣码已过期');
						$("#orderProfit").val(round(Number($("#orderprice").val()) + Number($("#orderCashBack").val()) - Number($("#orderCosting").val()), 2));
					} else {
						$(".discountNotice").css("display", "block");
						$(".discountNotice").text('优惠金额: ' + response+'美元');
						$("#orderProfit").val(round(Number($("#orderprice").val()) + Number($("#orderCashBack").val()) - Number($("#orderCosting").val())  - response, 2));
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log(textStatus, errorThrown);
				}
			});
		}
	});
}
function arrowStatus(){
	$(".accountingRight .orderList ul.order-title li").on("click",function(){
		//上白下橙
		if(($(this).find("img.arrow_down").attr("src")=="../img/arrowDown_icon.png")&&($(this).find("img.arrow_up").attr("src")=="../img/arrowUp0_icon.png")){
			$(this).find("img.arrow_down").attr("src","../img/arrowDown0_icon.png");
			$(this).find("img.arrow_up").attr("src","../img/arrowUp_icon.png");
		}
		else{
			$(this).find("img.arrow_down").attr("src","../img/arrowDown_icon.png");
			$(this).find("img.arrow_up").attr("src","../img/arrowUp0_icon.png");
		}
		$(this).siblings("li").find("img.arrow_down").attr("src","../img/arrowDown0_icon.png");
		$(this).siblings("li").find("img.arrow_up").attr("src","../img/arrowUp0_icon.png");
	});
}
