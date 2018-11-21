$(document).ready(function () {
  /*
   *  载入当前页的数据
   */
  function loadCurrentPage(data) {
    checkNumber = {};
    $.ajax({
      url: location.protocol.concat("//").concat(location.host).concat('/database/Accounting/AccountingConfirm/getOrderList.php'),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      type: 'GET',
      data: data,
      success: function(response) {
        response = JSON.parse(response);
        // console.log(response);

        $('li.listDetail').remove();
        for(var i = 0; i < response.length; i++) {
          var lockStatus = response[i]['lock_status'] == 'Y'? 'yesStatus' : 'noStatus';
          var finishStatus = response[i]['finish_status'] == 'Y'? 'yesStatus' : 'noStatus';
          var following_id = response[i]['following_id_collection'] == null? '' : response[i]['following_id_collection'];
          $html = `
            <li class="listDetail">
              <dl>
                <dd class="systemNum"> ` + response[i]['transaction_id'] + `</dd>
                <dd class="invoice">` + response[i]['invoice']  + `</dd>
                <dd class="profit">` + response[i]['total_profit']  + `</dd>
                <dd class="debt">` + response[i]['debt']  + `</dd>
                <dd class="receivable">` + response[i]['received']  + `</dd>
                <dd class="salePrice">` + response[i]['selling_price']  + `</dd>
                <dd class="createDate">` + response[i]['create_time'].substring(0, 10)  + `</dd>
                <dd class="startTime">` + response[i]['depart_date'].substring(0, 10)  + `</dd>
                <dd class="returnTime">` + response[i]['arrival_date'].substring(0, 10)  + `</dd>
                <dd class="lockStatus ` + lockStatus + `"></dd>
                <dd class="finishStatus ` + finishStatus + `"></dd>
                <dd class="number"><a>` + following_id + `</a></dd>
              </dl>
            </li>
          `;
          $('ul.confirmlist').append($html);
          if (response[i]['check_no'] != null) {
            checkNumber[response[i]['transaction_id']] = response[i]['check_no'];
          }
        }
        radminidInfo();
        autoHeight();
        heightRange();
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
      }
    });
  }

  function loadData(data) {
    $(".listDetail").remove();
    $.ajax({
      url: location.protocol.concat("//").concat(location.host).concat('/database/Accounting/AccountingConfirm/getOrderCount.php'),
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
          $(".noRecord").css("display", "block");
        	//确认
         	$(".noRecord").find("p.actionBox").find("button.actionConfirm").on("click", function() {
        			setTimeout(function() {
        				$(".noRecord").css("display", "none");
        			}, 500);
      		});
       		//取消
       		$(".noRecord").find("p.actionBox").find("button.actionCancel").on("click", function() {
       			$(".noRecord").css("display", "none");
       		});
        } else {
          $('#confirmPagination').pagination({
						totalData: num_orders,
						showData: 20,
						current: 0,
						coping: true,
						homePage: '首页',
						endPage: '末页',
						prevContent: '上页',
						nextContent: '下页',
						callback: function(api) {
							var j = api.getCurrent(); //获取当前页
              data['offset'] = (j - 1) * 20;
              loadCurrentPage(data);
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
      transaction_id: $("#transaction-id").val(),
      salesperson: $("#salesperson").val(),
      type: $("#type").val(),
      fname: $("#fname").val(),
      lname: $("#lname").val(),
      wholesaler: $("#wholesaler").val(),
      from_invoice: $("#from-invoice").val(),
      to_invoice: $("#to-invoice").val(),
      invoice: $("#invoice-filter").val(),
      locator: $("#locator").val(),
      airline: $("#airline").val(),
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

  $("#filter-confirm").on("click", function () {
    loadData(getFilterData());
  });

 	$("#filter-reset").on('click', function () {
    loadData(getFilterData());
  });

  /*
   * 得到销售和批发商的下拉列表
   */
  $("#salesperson, #wholesaler").on('focus', function() {
    var current_id = $(this).attr('id');
    var target = "";
    if(current_id == 'salesperson') {
      target = 'salesperson';
    } else if(current_id == 'wholesaler') {
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

  $("#create-time-sort").on('click', function () {
    var data = getFilterData();
    if ($(this).find("img.arrow_up")[0].src == location.protocol.concat("//").concat(location.host).concat('/img/arrowUp0_icon.png')) {
      data['create_time_sort'] = 'ORDER BY create_time DESC';
    } else {
      data['create_time_sort'] = 'ORDER BY create_time ASC';
    }
    loadData(data);
  });
  $("#leave-time-sort").on('click', function () {
    var data = getFilterData();
    if ($(this).find("img.arrow_up")[0].src == location.protocol.concat("//").concat(location.host).concat('/img/arrowUp0_icon.png')) {
      data['leave_time_sort'] = 'ORDER BY depart_date DESC';
    } else {
      data['leave_time_sort'] = 'ORDER BY depart_date ASC';
    }
    loadData(data);
  });
  $("#return-time-sort").on('click', function () {
    var data = getFilterData();
    if ($(this).find("img.arrow_up")[0].src == location.protocol.concat("//").concat(location.host).concat('/img/arrowUp0_icon.png')) {
      data['return_time_sort'] = 'ORDER BY arrival_date DESC';
    } else {
      data['return_time_sort'] = 'ORDER BY arrival_date ASC';
    }
    loadData(data);
  });

  //关联编号：
  function radminidInfo() {
  	$(document).on('click', "ul.listInfo.confirmFloor li dd.number a", function () {
  		if($.trim($(this).text())!= ""&&$.trim($(this).text())!="null") {
  			var thisLi = $(this).parent().parent().parent("li");
  			if(thisLi.find("dl.unfold").css("display") == "block") {
  				thisLi.find("dl.unfold").remove();
  				thisLi.removeClass("current");
  				heightRange();
  			} else {
  				var currentNum = thisLi.find("dd.systemNum").text();
  				var numInfo = $.trim($(this).text()).split(",");
  				for(var i = 0; i < numInfo.length; i++) {
            $.ajax({
  						url: location.protocol.concat("//").concat(location.host).concat('/database/Accounting/AccountingConfirm/getCollectionOrder.php'),
  						type: 'GET',
  						data: {
  							collection_id: numInfo[i]
  						},
  						success: function(response) {
  							if(response == 'Not exist transactions!') {
  								alert('订单不存在!');
  							} else {
  								response = JSON.parse(response);

                  var lockStatus = response[0]['lock_status'] == 'Y'? 'yesStatus' : 'noStatus';
                  var finishStatus=response[0]['finish_status'] == 'Y'? 'yesStatus' : 'noStatus';
  								var appendContent = `
                      <dl class="unfold">
                        <dd class="systemNum"> ` + response[0]['transaction_id'] + `</dd>
                        <dd class="invoice">` + response[0]['invoice']  + `</dd>
                        <dd class="profit">` + response[0]['total_profit']  + `</dd>
                        <dd class="debt">` + response[0]['debt']  + `</dd>
                        <dd class="receivable">` + response[0]['received']  + `</dd>
                        <dd class="salePrice">` + response[0]['selling_price']  + `</dd>
                        <dd class="createDate">` + response[0]['create_time'].substring(0, 10)  + `</dd>
                        <dd class="startTime">` + response[0]['depart_date'].substring(0, 10)  + `</dd>
                        <dd class="returnTime">` + response[0]['arrival_date'].substring(0, 10)  + `</dd>
                        <dd class="lockStatus ` + lockStatus + `"></dd>
                        <dd class="finishStatus ` + finishStatus + `"></dd>
                        <dd class="number"><a></a></dd>
                      </dl>
  									`;

  								thisLi.append(appendContent);
                  autoHeight();
        					heightRange();
        					$("ul.listInfo.confirmFloor li dl.unfold dd.number a").unbind("click");
  							}
  						},
  						error: function(jqXHR, textStatus, errorThrown) {
  							console.log(textStatus, errorThrown);
  						}
  					});
  				}

  				thisLi.addClass("current");
  				//总结：
  				var sumAmount = 0;
  				var amount = thisLi.find("dl.unfold").find("dd.amount");
  				var currentAmount = 0;
  				amount.each(function(i, item) {
  					currentAmount = $(item).text().split("USD")[1];
  					sumAmount = sumAmount - (-currentAmount);
  				});
  				autoHeight();
  			}
  		}
  	});
  }

});
