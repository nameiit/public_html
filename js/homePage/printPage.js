$(function() {
	//天数
	var dayNum = localStorage.getItem("tourDayNum");
	//人数
	var peopleNum = localStorage.getItem("tourPeopleNum");
	//午餐价格
	var lunchPrice = localStorage.getItem("tourLunchPrice");
	//晚餐价格
	var dinnerPrice = localStorage.getItem("tourDinnerPrice");
	//日期
	var dateList = localStorage.getItem("tourDate");
	//货币
	var currency=localStorage.getItem("tourCurrency");
	$(".tourGuidTab tr span.currency").text(currency);
	dateList = dateList.split(',');
	//司机小费
	var driverTip = localStorage.getItem("tourDriverTip");
	for(var i = 0; i < dayNum; i++) {
		var e = '<tr><td class="new"></td></tr>';
		$("tr.mealFee").find("table.mealFeeItem").append(e);
		//服务费
		$("tr.serviceCharge").find("table.serviceChargeItem").append(e);
		$("table.people-count").find("td.new").text(peopleNum);
		$("table.lunch-price").find("td.new").text(lunchPrice);
		$("table.dinner-price").find("td.new").text(dinnerPrice);
		$("table.lunch-price-sum").find("td.new").text(peopleNum * lunchPrice);
		$("table.dinner-price-sum").find("td.new").text(peopleNum * dinnerPrice);
		$("table.date-info").find("td.new").eq(i).text(dateList[i]);
		$("table.serviceDate-info").find("td.new").eq(i).text(dateList[i]);
		$("table.day-num").find("td").last().text(dayNum);
		$("table.people-num").find("td").last().text(peopleNum);
//		$("table.driver-tip-sum").find("td").last().text(driverTip);
//		$("table.driver-tip").find("td").last().text((parseInt(driverTip) / dayNum) / peopleNum);
		$("table.driver-tip").find("td").last().text(driverTip);
		$("table.driver-tip-sum").find("td").last().text(parseInt(driverTip*dayNum*peopleNum));
	}
	$("td.lunch-cost").text(dayNum * peopleNum * lunchPrice);
	$("td.dinner-cost").text(dayNum * peopleNum * dinnerPrice);
	var sumCost = parseInt($("td.lunch-cost").text()) + parseInt($("td.dinner-cost").text()) + parseInt($("table.driver-tip-sum").find("td").last().text());
	$("td.cost-sum").text(sumCost);
	/*$("#myElementId").print({    
		globalStyles: true,
		    mediaPrint: false,
		    stylesheet: null,
		    noPrintSelector: ".no-print",
		    iframe: true,
		    append: null,
		    prepend: null,
		    manuallyCopyFormValues: true,
		    deferred: $.Deferred()
	});*/
	           
})