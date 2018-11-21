$(function() {
	toUsersManagePage();
	currentExtension();
	groupTourDiscount($("#extensionDiscountText"), $("#extensionDiscountNotice"), $("#extensionDiscountApply"), $("#extensionSubtractNum"), $("#extensionDiscountOption"), $("#coupon-currency"))
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
	isActive();
	ordersAssociated();
	radminidInfo();
});
//跳转到用户管理页面
function toUsersManagePage() {
	var isSales = true;
	$("a#toUsersManagePage").on("click", function() {
		//对于销售人员:
		if(isSales == true) {
			$(this).attr("href", "UsersManageToSales.php");
		}
		//对于管理人员:
		if(isSales == false) {
			$(this).attr("href", "UsersManageToAdmin.php");
		}
	});
}

function currentExtension() {
	$(".extensionItem").find("ul.tab-nav").find("li").on("click", function() {
		$(this).addClass('selected').siblings().removeClass("selected");
		var index = $(this).index();
		$(".extensionItem").find(".tab-item").eq(index).addClass("current").siblings(".tab-item").removeClass("current");
		resetStatus();
	});

}
//激活状态
function isActive() {
	//代理佣金
	var agencyCommission = $(".tab-item.agencyCommission ul li").find("label.switch").find("input");
	agencyCommission.on("change", function() {
		if($(this).attr("checked") == "checked") {
			$(this).parent().parent("li").find("span.status").text("已激活");
		} else {
			$(this).parent().parent("li").find("span.status").text("未激活");
		}
	});
	//折扣码
	var discountCode = $(".tab-item.discountCode ul li").find("label.switch").find("input");
	discountCode.on("change", function() {
		if($(this).attr("checked") == "checked") {
			$(this).parent().parent("li").find("span.status").text("已激活");
		} else {
			$(this).parent().parent("li").find("span.status").text("未激活");
		}
	});
	//旅行社
	var travelAgency = $(".tab-item.travelAgency ul li").find("label.switch").find("input");
	travelAgency.on("change", function() {
		if($(this).attr("checked") == "checked") {
			$(this).parent().parent("li").find("span.status").text("已激活");
		} else {
			$(this).parent().parent("li").find("span.status").text("未激活");
		}
	});
	//订单关联
	var ordersAssociated = $(".tab-item.ordersAssociated ul li").find("label.switch").find("input");
	ordersAssociated.on("change", function() {
		if($(this).attr("checked") == "checked") {
			$(this).parent().parent("li").find("span.status").text("已激活");
		} else {
			$(this).parent().parent("li").find("span.status").text("未激活");
		}
	});
	$(".extensionItem .tab-item ul li.item-content ul.add-msg li.systemNum a").on("mousedown", function() {
		$(this).addClass("selected");
	});
	$(".extensionItem .tab-item ul li.item-content ul.add-msg li.systemNum a").on("mouseup", function() {
		$(this).removeClass("selected");
	});
}

function resetStatus() {
	$(".tab-item ul li").find("span.status").text("未激活");
}

function groupTourDiscount(discountText, discountNotice, discountApply, subtractNum, discountOption, coupon_currency) {
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
			$("input#groupDiscountText").addClass("numFormat");
		}
		//选中折扣码
		else {
			$("input#groupDiscountText").removeClass("numFormat");
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
	var num = 1;
	$(document).on("click", "ul.add-msg div.systemNumTab li.tab_content dd.number a", function() {
		if($.trim($(this).text()) == "") {} else {
			var thisLi = $(this).parent().parent().parent("li");
			var summaryNum = $.trim(thisLi.find("dd.number").text());
			if(thisLi.find("dl.unfold").css("display") == "block") {
				thisLi.find("dl.unfold").remove();
				thisLi.removeClass("current");
				heightRange();
			} else {
				num++;
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
								<input id="numInfo_` + i + `" class="styled" type="checkbox" checked="checked">
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