$(function() {
	travelAgencyAction();
});

function travelAgencyAction() {
	$(".optionItem").on("mousedown", function() {
		$(this).addClass("option-active");
	});
	$(".optionItem").on("mouseup", function() {
		$(this).removeClass("option-active");
	});
	$("ul.salesNav").find("li").find("a.confirmBtn").on("mousedown", function() {
		$(this).addClass("selected");
	});
	$("ul.salesNav").find("li").find("a.confirmBtn").on("mouseup", function() {
		$(this).removeClass("selected");
	});

	//添加
	$(".plusItem").on("click", function() {
		$("li.salesFilter").css("visibility", "visible");
		minusAction();
		//确认添加:
		$("ul.salesNav").find("li").find("a.confirmBtn").on("click", function() {
			var salesNameTxt = $.trim($("li.salesFilter").find("input").val());
			var salesInfo = $.trim($(".salesName").text());
			if(salesInfo.indexOf(salesNameTxt) !== -1) {
				alert("输入的销售人员信息不能一致");
				$("li.salesFilter").find("input").val("");
			} else {
				var e = `<li class="salesName">` + salesNameTxt + `</li>`;
				$(".rightInfo ul").append(e);
				//当前为背景为灰色
				$("li.salesName:last").addClass("selected").siblings("li.salesName").removeClass("selected");
				travelAgencyNameState(); //选中状态
				$("#performance-filter-salesperson").val("");
			}
		});
	});
}

function minusAction() {
	$(".minusItem").on("click", function() {
		//移除当前选中的元素
		$(".rightInfo ul").find("li.salesName.selected").remove("");
		$("li.salesFilter").find("input").val("");
		//移除至只剩下一个
		if($(".rightInfo ul").find("li.salesName").length == 1) {
			$("ul.rankingList1").fadeIn("slow");
			$("ul.rankingList2").css("display", "none");
		}
		if($(".rightInfo ul").find("li.salesName").length > 1) {
			$(".salesDetail").empty();
		}
		//全部移除
		if($(".rightInfo ul").find("li.salesName").length < 1) {
			$("ul.rankingList1").fadeIn("slow");
			$("ul.rankingList2").css("display", "none");
		}
		travelAgencyAction();
	});
}
//表1和表2的切换
function travelAgencyNameState() {
	$(".rightInfo").find("ul").find("li.salesName").unbind("click").on("click", function() {
		if(!$(this).hasClass("selected")) {
			$(this).addClass("selected");
			heightRange();
			if($("li.salesName.selected").length >= 2) {
				$("ul.rankingList2").fadeIn("slow");
				$("ul.rankingList1").css("display", "none");
			} else {
				$("ul.rankingList1").fadeIn("slow");
				$("ul.rankingList2").css("display", "none");
			}
		} else {
			$(this).removeClass("selected");
			if($("li.salesName.selected").length >= 2) {
				$("ul.rankingList2").fadeIn("slow");
				$("ul.rankingList1").css("display", "none");

			} else if($("li.salesName.selected").length == 1) {
				//当前选中只剩下一个元素时
				$("ul.rankingList1").fadeIn("slow");
				$("ul.rankingList2").css("display", "none");

			} 
		}
	});
}

