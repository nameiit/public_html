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
            target = 'wholesaler';
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

    /*
     * Display order list
     */
    var offset = 0;

    function loadFilterData(offset) {
        var data = {
            action: 'filter',
            offset: offset,
            transactionId: $("#accounting-service-filter-transaction-id").val(),
            individualTourCode: $("#accounting-service-filter-individualtour-code").val(),
            salespersonId: $("#accounting-service-filter-salesperson").val(),
            wholeasler: $("#accounting-service-filter-wholesaler").val(),
            touristCount: $("#accounting-service-filter-tourist-count").val(),
            fromDate: $("#accounting-service-filter-from-date").val(),
            toDate: addByTransDate($("#accounting-service-filter-to-date").val(), 1)
        }
        var url = location.protocol.concat("//").concat(location.host).concat('/database/Accounting/IndividualTour.php');
        $.ajax({
            url: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
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
                    $html += '<dd class="order-id">' + response[i]['transaction_id'] + '</dd>' +
                        '<dd class="group-num">' + response[i]['product_code'] + '</dd>' +
                        '<dd class="createDate">' + response[i]['create_time'].substring(0, 10) + '</dd>' +
                        '<dd class="salesman">' + response[i]['salesperson_code'] + '</dd>' +
                        '<dd class="clients">' + response[i]['wholesaler'] + '</dd>' +
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
     * Rest filter condition
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
//      if ($("dl.userList.selected").length == 0) {
//          return;
//      }
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
        for (var i = 0; i < $("dl.userList.selected").length; i++) {
            orderList.push($("dl.userList.selected").eq(i).find("dd.collectionId").text());
            $("dl.userList.selected").eq(i).addClass("toBeClearedOrLocked");
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


        var url = location.protocol.concat("//").concat(location.host).concat('/database/Accounting/IndividualTour.php');
        $.ajax({
            url: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: 'POST',
            data: data,
            success: function(response) {
                if (action == 'clearActionConfirm') {
                    $(".toBeClearedOrLocked")
                        .addClass("clear")
                        .removeClass("selected")
                        .removeClass("toBeClearedOrLocked");
                } else if (action == 'lockActionConfirm') {
                    $(".toBeClearedOrLocked")
                        .addClass("clear")
                        .addClass("lock")
                        .append("<hr>")
                        .removeClass("selected")
                        .removeClass("toBeClearedOrLocked");
                }
                $(".current-status").removeClass("current-status");
                $(".confirmInfo").addClass("nm-hide");
                $("dl.userList").find("input").attr("checked", false);

                var clearCount = 0,
                    lockCount = 0;
                for (var i = 0; i < $("dl.userList").length; i++) {
                    if (!$("dl.userList").eq(i).hasClass("clear") && !$("dl.userList").eq(i).hasClass("lock")) {
                        break;
                    }
                    if ($("dl.userList").eq(i).hasClass("lock")) {
                        console.log("haha", i);
                        lockCount += 1;
                        clearCount += 1;
                    } else if ($("dl.userList").eq(i).hasClass("clear")) {
                        console.log("hehe", i);
                        clearCount += 1;
                    }
                }

                console.log(lockCount, clearCount);

                if (lockCount == $("dl.userList").length) {
                    $("dl.userList").remove();
                    $("dl.order-selected").remove();
                } else if (clearCount == $("dl.userList").length) {
                    $("dl.order-selected").addClass("clearAndUnlock");
                }

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
//  $(".action-checkAll, .action-invert").on("mouseup", function() {
//      if ($(this)['0'].innerText == '全选') {
//
//          $(this).find("img").attr("src", "../img/quanxuan_d.png");
//         	$(".orderList ul.order-detail li").find("dl").addClass("order-active");
//          $("dl.userList").find("input").attr("checked", true);
//
//      } else if ($(this)['0'].innerText == '全不选') {
//
//          $(this).find("img").attr("src", "../img/cha_d.png");
//          $("dl.userList").removeClass("selected");
//          $("dl.userList").find("input").attr("checked", false);
//
//      }
//      $(".kuaijiMsg .accountingLeft .modifyOrders").css("display", "none");
//      setTimeout(function() {
//          $(".check-active").removeClass("check-active");
//      }, 70);
//  });
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
    

    /*
     * Edit order info
     */
    $(".ordersTab").find("#orderCosting").on('keyup', function() {
        if (!$.isNumeric($(this).val())) {
            alert("请输入数字");
        }
        $(".ordersTab").find("#orderProfit").val(
            round(
                $(".ordersTab").find("#orderprice").val() -
                $(".ordersTab").find("#orderCosting").val() -
                $(".ordersTab").find("#orderDiscount").val(), 2)
        );
    });
    $(".itemTab").find("#orderprice").on('keyup', function() {
        if (!$.isNumeric($(this).val())) {
            alert("请输入数字");
        }
    });


    $("#accounting-edit-confirm").on('click', function() {
        $(".accountingEditConfirmBox").css("display", "block");
    });
    $("#accountingEditActionConfirm").on('click', function() {
        var data = {
            action: 'updateTransaction',
            transactionId: $('dl.order-selected dd.order-id').text(),
            expense: $(".ordersTab").find("#orderCosting").val()
        };

        var url = location.protocol.concat("//").concat(location.host).concat('/database/Accounting/IndividualTour.php');
        $.ajax({
            url: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: 'POST',
            data: data,
            success: function(response) {

                $(".accountingEditConfirmBox").css("display", "none");
                var transactionDetails = [];
                transactionDetails.push($(".ordersTab").find("#orderprice").attr("value"));
                transactionDetails.push($(".ordersTab").find("#orderCosting").attr("value"));
                transactionDetails.push($(".ordersTab").find("#orderProfit").attr("value"));
                transactionDetails = $(".ordersTab").find("#orderCurrency").attr("value") + " " + transactionDetails.join(" | ");
                $("div.orderList ul.order-detail li dl.order-selected").find("dd.transactionDetails").text(transactionDetails);

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

    $("#accounting-edit-tour-detail-confirm").on('click', function() {
        $(".accountingEditTourDetailConfirmBox").css("display", "block");
    });
    $("#accountingEditTourDetailActionConfirm").on('click', function() {
        var data = {
            action: 'updateTourDetail',
            indiv_collection_id: $("dl.order-selected").siblings("dl.userList.selected").find("dd.collectionId").text(),
            coupon: $(".itemTab").find("#discountText").val(),
            payment_amount: $(".itemTab").find("#orderprice").val(),
            currency: $(".itemTab").find("#orderCurrency").val()
        };

        var url = location.protocol.concat("//").concat(location.host).concat('/database/Accounting/IndividualTour.php');
        $.ajax({
            url: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: 'POST',
            data: data,
            success: function(response) {
                $(".accountingEditTourDetailConfirmBox").css("display", "none");

                if (response == 'code expired') {

                    alert("Coupon Code Expired");
                    return;

                } else if (response == 'coupon not exist') {

                    alert("Coupon Code Does Not Exist");
                    return;

                } else if (response == 'Successfully updated') {

                    $("dl.userList.selected").find("dd.currencyMsg span").text($(".itemTab").find("#orderCurrency").val());
                    $("dl.userList.selected").find("dd.sumMsg span").text($(".itemTab").find("#orderprice").val());
                    $("dl.userList.selected").find("dd.discountMsg span").text($(".itemTab").find(".discountNotice").text().replace(/^\D+/g, ''));

                    $.ajax({
                        url: url,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        type: 'GET',
                        data: {
                            action: 'updateDisplayInfo',
                            transactionId: $('dl.order-selected dd.order-id').text()
                        },
                        success: function(response) {

                            response = JSON.parse(response);
                            $("dl.order-selected dd.transactionDetails").text(response['transaction_details']);
                            $("dl.order-selected dd.discount-code").text(response['coupon']);

                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            console.log(textStatus, errorThrown);
                        }
                    });
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    });
    $("#accountingEditTourDetailActionCancel").on('click', function() {
        $(".accountingEditTourDetailConfirmBox").css("display", "none");
    });
    $("#accounting-edit-tour-detail-reset").on('click', function() {
        editTourDetail();
    });
});


function editOrder() {
    var transactionId = $('dl.order-selected dd.order-id').text();
    $(".kuaijiMsg .accountingLeft .ordersTab").find("li.filterTitle").find("span").text(transactionId);

    var url = location.protocol.concat("//").concat(location.host).concat('/database/Accounting/IndividualTour.php');
    $.ajax({
        url: url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        type: 'GET',
        data: {
            transactionId: transactionId,
            action: 'getOrderDetail'
        },
        success: function(response) {
            response = JSON.parse(response);

            $(".ordersTab").find("#orderCurrency").attr("value", response['currency']);
            $(".ordersTab").find("#orderprice").attr("value", response['revenue']);
            $(".ordersTab").find("#orderCosting").attr("value", response['cost']);
            $(".ordersTab").find("#orderProfit").attr("value", response['total_profit']);
            $(".ordersTab").find("#orderDiscount").attr("value", response['coupon']);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}

function editTourDetail() {
    var transactionId = $('dl.order-selected dd.order-id').text()
    $(".kuaijiMsg .accountingLeft .itemTab").find("li.filterTitle").find("span").text(transactionId);

    var indiv_collection_id = $("dl.order-selected").siblings("dl.userList.selected").find("dd.collectionId").text();

    var url = location.protocol.concat("//").concat(location.host).concat('/database/Accounting/IndividualTour.php');
    $.ajax({
        url: url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        type: 'GET',
        data: {
            indiv_collection_id: indiv_collection_id,
            action: 'getTourDetails'
        },
        success: function(response) {
            response = JSON.parse(response);

            $(".itemTab").find("#orderCurrency").attr("value", response['currency']);
            $(".itemTab").find("#orderprice").attr("value", response['payment_amount']);

            if (response['cc_id'] != null) {

                $("#discount-code").addClass('discount-active');
                $("#discount-value").removeClass('discount-active');
                $(".itemTab").find("#discountText").attr("value", response['code']);
                $(".discountNotice").css("display", "block");
                $(".discountNotice").text('优惠金额: ' + response['coupon']+'美元');

            } else if (response['coupon'] != null) {

                $("#discount-value").addClass('discount-active');
                $("#discount-code").removeClass('discount-active');
                $(".itemTab").find("#discountText").attr("value", response['coupon']);
                $(".discountNotice").css("display", "block");
                $(".discountNotice").text('优惠金额: ' + response['coupon']+'美元');

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

//function listStatus() {
//  $(".orderList ul.order-detail li").find("dl:first").on('click', function() {
//
//      var thisDl = $(this);
//
//      if ($(this).hasClass("order-selected")) {
//
//          $(this).siblings("dl.userList").remove();
//          $(".kuaijiMsg .accountingLeft .modifyOrders.ordersTab").css("display", "none");
//          $(".kuaijiMsg .accountingLeft .modifyOrders.itemTab").css("display", "none");
//          $(this).removeClass("order-selected");
//
//      } else {
//
//          $(this).addClass("order-selected");
//          $(this).parent().siblings("li").find("dl.order-selected").removeClass("order-selected");
//          $(this).parent().siblings("li").find("dl.userList").remove();
//
//          $(".kuaijiMsg .accountingLeft .modifyOrders.ordersTab").css("display", "block");
//          $(".kuaijiMsg .accountingLeft .modifyOrders.itemTab").css("display", "none");
//
//          var transaction_id = $(this).find("dd.order-id").text();
//          var url = location.protocol.concat("//").concat(location.host).concat('/database/Accounting/IndividualTour.php');
//          $.ajax({
//              url: url,
//              headers: {
//                  'Content-Type': 'application/x-www-form-urlencoded'
//              },
//              type: 'GET',
//              data: {
//                  transactionId: transaction_id,
//                  action: 'getCustomerList'
//              },
//              success: function(response) {
//                  response = JSON.parse(response);
//                  for (var i = 0; i < response.length; i++) {
//                      var $html = `<dl class="userList">`;
//                      if (response[i]['lock_status'] == 'Y') {
//                          $html = `<dl class="userList clear lock">`;
//                      } else if (response[i]['clear_status'] == 'Y') {
//                          $html = `<dl class="userList clear">`;
//                      }
//                      $html +=
//                          `
//                          <dd class="listStatus">
//                              <input type="checkbox" />
//                          </dd>
//                          <dd class="collectionId" style="display: none;">` + response[i]['indiv_collection_id'] + `</dd>
//                          <dd class="nameMsg">
//                              姓名：<span> ` + response[i]['customer_name'] + `</span>
//                          </dd>
//                          <dd class="currencyMsg">
//                              货币：<span> ` + response[i]['currency'] + `</span>
//                          </dd>
//                          <dd class="sumMsg">
//                              金额：<span> ` + response[i]['payment_amount'] + `</span>
//                          </dd>
//                          <dd class="discountMsg">
//                              折扣：<span> ` + response[i]['coupon'] + `</span>
//                          </dd>
//                      </dl>
//                      `;
//                      thisDl.parent().append($html);
//                  }
//                  for(var i = 0;i < $("dl.userList").length; i++){
//  					if ($("dl.userList").eq(i).hasClass("lock")){
//  						$("dl.userList").eq(i).append("<hr>");
//  					};
//  				}
//                  thisDl.parent().find("dl.userList").css("display", "block");
//
//                  $(".orderList ul.order-detail li").find("dl.userList").unbind("click").on("click", function() {
//                      if ($(this).hasClass('selected')) {
//                          $(this).removeClass("selected");
//                          $(this).find('input[type="checkbox"]').attr("checked", false);
//                      } else {
//                          $(this).addClass("selected");
//                          $(this).find('input[type="checkbox"]').attr("checked", true);
//                          $(".kuaijiMsg .accountingLeft .modifyOrders.ordersTab").css("cssText", "display:none !important");
//                          $(".kuaijiMsg .accountingLeft .modifyOrders.itemTab").css("display", "block");
//                          $(".kuaijiMsg .accountingLeft .modifyOrders.ordersTab").hide();
//                      }
//
//                      if ($(".orderList ul.order-detail li").find("dl.userList.selected").length == 0) {
//                          $(".kuaijiMsg .accountingLeft .modifyOrders.ordersTab").css("cssText", "display:block !important");
//                          $(".kuaijiMsg .accountingLeft .modifyOrders.itemTab").css("display", "none");
//                          $(".kuaijiMsg .accountingLeft .modifyOrders.ordersTab").show();
//                      } else if ($(".orderList ul.order-detail li").find("dl.userList.selected").length > 1) {
//                          $(".kuaijiMsg .accountingLeft .modifyOrders.itemTab").css("display", "none");
//                      } else if ($(".orderList ul.order-detail li").find("dl.userList.selected").length == 1) {
//                          $(".kuaijiMsg .accountingLeft .modifyOrders.itemTab").css("display", "block");
//                          editTourDetail();
//                      }
//                  });
//
//                  editOrder();
//                  heightRange();
//              },
//              error: function(jqXHR, textStatus, errorThrown) {
//                  console.log(textStatus, errorThrown);
//              }
//          });
//      }
//  });
//}
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
