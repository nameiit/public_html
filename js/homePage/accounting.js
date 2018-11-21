function accountingNav() {
	var leftHeight = $(".navInfo ul").height()
	var rightHeight = $(".theamInfo").height();
	if(rightHeight > leftHeight) {
		$(this).blur();
		$(".navInfo ul").css("height", rightHeight);
	}
	if(rightHeight < leftHeight) {
		$(this).blur();
		$(".navInfo ul").css("height", rightHeight);
	}
	$(".accountingNav ul").find("li").find("a").on("click", function() {
		if(!$(this).parent().hasClass("accountingNav-active")) {
			$(this).parent().addClass("accountingNav-active");
		} else {
			$(this).parent().removeClass("accountingNav-active");
		}
		$(".nav-box").css("display", "none");
		var pages = ["OrderHistory.php", "GroupTourHistory.php", "IndividualTourHistory.php", "AirTicketHistory.php", "GroupAndIndividual.php", "GroupAndAirticket.php", "IndividualAndAirTicket.php"];
		//都取消选中
		if(!($(".groupTour").hasClass("accountingNav-active")) && (!$(".individualTour").hasClass("accountingNav-active")) && (!$(".airTicket").hasClass("accountingNav-active"))) {
			$(".recordAll").addClass("accountingNav-active");
			$(this).attr("href", pages[0]);

		}
		//只选中独立团
		if($(".groupTour").hasClass("accountingNav-active") && (!$(".individualTour").hasClass("accountingNav-active")) && (!$(".airTicket").hasClass("accountingNav-active"))) {
			$(".recordAll").removeClass("accountingNav-active");
			$(this).attr("href", pages[1]);
		}
		//只选中散拼团
		if($(".individualTour").hasClass("accountingNav-active") && (!$(".groupTour").hasClass("accountingNav-active")) && (!$(".airTicket").hasClass("accountingNav-active"))) {
			$(".recordAll").removeClass("accountingNav-active");
			$(this).attr("href", pages[2]);

		}
		//只选中机票
		if($(".airTicket").hasClass("accountingNav-active") && (!$(".groupTour").hasClass("accountingNav-active")) && (!$(".individualTour").hasClass("accountingNav-active"))) {
			$(".recordAll").removeClass("accountingNav-active");
			$(this).attr("href", pages[3]);
		}
		//选中独立团+散拼团
		if($(".groupTour").hasClass("accountingNav-active") && ($(".individualTour").hasClass("accountingNav-active")) && (!$(".airTicket").hasClass("accountingNav-active"))) {
			$(".recordAll").removeClass("accountingNav-active");
			$(this).attr("href", pages[4]);

		}
		//选中独立团+机票
		if($(".groupTour").hasClass("accountingNav-active") && (!$(".individualTour").hasClass("accountingNav-active")) && ($(".airTicket").hasClass("accountingNav-active"))) {
			$(".recordAll").removeClass("accountingNav-active");
			$(this).attr("href", pages[5]);
		}
		//选中机票+散拼团
		if(!$(".groupTour").hasClass("accountingNav-active") && ($(".individualTour").hasClass("accountingNav-active")) && ($(".airTicket").hasClass("accountingNav-active"))) {
			$(".recordAll").removeClass("accountingNav-active");
			$(this).attr("href", pages[6]);
		}
		//同时选中
		if($(".airTicket").hasClass("accountingNav-active") && ($(".groupTour").hasClass("accountingNav-active")) && ($(".individualTour").hasClass("accountingNav-active"))) {
			$(".recordAll").addClass("accountingNav-active");
			$(this).attr("href", pages[0]);
			setTimeout(function() {
				accountingHide();
			}, 100);
		}

		var leftHeight = $(".navInfo ul").height()
		var rightHeight = $(".theamInfo").height();
		if(rightHeight > leftHeight) {
			$(this).blur();
			$(".navInfo ul").css("height", rightHeight);
		}
		if(rightHeight < leftHeight) {
			$(this).blur();
			$(".navInfo ul").css("height", rightHeight);
		}

	});

	function accountingHide() {
		$(".groupTour").delay("slow").removeClass("accountingNav-active");
		$(".individualTour").delay("slow").removeClass("accountingNav-active");
		$(".airTicket").delay("slow").removeClass("accountingNav-active");
	}
	$(".accountingNav ul").find("li.recordAll").find("a").on("click", function() {
		$(this).parent().addClass("accountingNav-active");
		$(this).attr("href", "OrderHistory.php");
		$(this).parent().siblings("li").removeClass("accountingNav-active");
	});

}
//状态切换
function labToggle(labOuter) {
	labOuter.find("a").on("click", function() {
		if(!$(this).hasClass("option-active")) {
			$(this).addClass("option-active");
		} else {
			$(this).removeClass("option-active");
		}
	});
}
//时间区间
function accountDateRange(dateSelect, dateInfo) {
	dateSelect.find("select").on("change", function() {
		var currentText = $(this).find("option:selected").text();
		if(currentText == "Customized") {
			dateInfo.css("visibility", "initial");
			dateInfo.css("display", "inline-block");
			var dateBox = $(".filterInfo ul li.dateOption .groupTourDateRange").find("input");
			var dateSelectBox = $(".filterInfo ul li.dateOption").find("select").outerWidth();
			var spanWidth = $(".filterInfo ul li.dateOption").find("span").outerWidth();
			dateBox.css("cssText", "width:" + (dateSelectBox - spanWidth) / 2 + "px" + "!important");
		} else {
			dateInfo.css("visibility", "hidden");
			dateInfo.css("display", "none");
		}

	});
	$(window).resize(function() {
		var dateBox = $(".filterInfo ul li.dateOption .groupTourDateRange").find("input");
		var dateSelectBox = $(".filterInfo ul li.dateOption").find("select").outerWidth();
		var spanWidth = $(".filterInfo ul li.dateOption").find("span").outerWidth();
		dateBox.css("cssText", "width:" + (dateSelectBox - spanWidth) / 2 + "px" + "!important");
	});
	$("li.finishDateOption").find("select").on("change", function() {
		var currentText = $(this).find("option:selected").text();
		if(currentText == "Customized") {
			$(".finishDateRange").css("display", "block");
		} else {
			$(".finishDateRange").css("display", "none");
		}
	});

	var dateBox = $(".filterInfo ul li.dateOption .groupTourDateRange").find("input");
	var dateSelectBox = $(".filterInfo ul li.dateOption").find("select").outerWidth();
	var spanWidth = $(".filterInfo ul li.dateOption").find("span").outerWidth();
	dateBox.css("cssText", "width:" + (dateSelectBox - spanWidth) / 2 + "px" + "!important");

}
//选中状态
function checkedCell() {
	$(".bms-tab").find("ul.accountRecordMsg").find("li").click(function() {
		$(this).addClass("accounting-active").siblings().removeClass("accounting-active");
	});
}
//通用信息选择
function generalInfo() {
	var dlBox = $(".resultInfo").find("ul li.resultNav").find("dl");
	var liBox = $(".resultInfo").find("ul li.resultDetail").find("dl");
	var newWidth = 0;
	for(var i = 0; i < dlBox.find("dd").length; i++) {
		var cell = $(".resultInfo").find("ul li.resultDetail").find("dl").find("dd");
		dlBox.find("dd").eq(i).css("width", $(cell.eq(i)).width());
	}
	$(".showMsg .floor .groupMsg").find(".tabCard ul li").find("input[type='checkbox']").on("click", function() {
		var txt = $.trim($(this).parent().find("label:visible").text());
		var e = `<dd class="new">` + txt + `</dd>`;
		var e2 = `<dd class="new"></dd>`;
		if(!$(this).parent().parent("li").hasClass("selected")) {
			//选中某一项
			$(this).parent().parent("li").addClass("selected");
			$(e).appendTo(dlBox);
			$(e2).appendTo(liBox);
			var newWidth = 0;
			for(var i = 0; i < dlBox.find("dd").length; i++) {
				var cell = $(".resultInfo").find("ul li.resultDetail").find("dl").find("dd");
				var newWidth = newWidth + $(cell.eq(i)).width() + 1;
				dlBox.find("dd").eq(i).css("width", $(cell.eq(i)).width());
			}
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
					var newWidth = parseInt(newWidth + $(cell.eq(k)).width() + 1);
					console.log(k);
					console.log(newWidth);
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

function resetInfo() {
	$(".historicRecord .actionRecord").find("ul").find("li:last-child").find("a").on("click", function() {
		//基本信息部分
		$(".filterBasicInfo").find("input").val("");
		$(".filterBasicInfo").find("input[type='checkbox']").attr("checked", false);
		$(".filterBasicInfo").find("input[type='checkbox']:first").attr("checked", true);
		var defaultTxt = $(".filterBasicInfo").find("select").find("option:first").text();
		$(".filterBasicInfo").find("select").find("option:selected").text(defaultTxt);
		$(".filterBasicInfo").find("li.dateRange").css("visibility", "hidden");
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

