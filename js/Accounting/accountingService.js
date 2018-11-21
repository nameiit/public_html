function round(value, decimals) {
	return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
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
				$(".discountNotice").text('优惠金额: ' + $("#discountText").val()+'美元');
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
						$(".discountNotice").text('优惠金额: ' + response+'美元');
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
//CLEAR/LOCK
function serviceStatus() {
	$(".action-item").on("click", function() {
		if($(this).hasClass("current-status")) {
			$(this).removeClass("current-status");
		} else {
			$(this).addClass("current-status");
		}
	});
	$(".action-clear").on("click", function() {
		$(".confirmInfo").removeClass("nm-hide");
		$(".confirmInfo").find(".confirmNotice").text("确认CLEAR");
	});
	$(".action-lock").on("click", function() {
		$(".confirmInfo").removeClass("nm-hide");
		$(".confirmInfo").find(".confirmNotice").text("确认LOCK");
	});
}

function serviceNav() {
	$("ul.serviceNav").find("li").on("click", function() {
		heightRange();
	});
}
//加载会计服务页面时左右两侧的高度:
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

function backToTop() {
	$(".accountingRight .orderList").find("a.backTop").on("click", function() {
		$("html, body").animate({
			scrollTop: 0
		});
	});
}

function leftFloatBox() {
	$(document).scroll(function() {
		var winScrollTop = $(window).scrollTop();
		if(winScrollTop > 90) {
			$(".kuaijiMsg .accountingLeft").css("top", "-60px");
		} else {
			$(".kuaijiMsg .accountingLeft").css("top", "initial");
		}
	});
	var accountingLeftHeight = $(".kuaijiMsg").find(".accountingLeft").height();
	var groupMsgHeight = $(".theamInfo").find(".showMsg.kuaijiMsg").find(".accountingService").find(".groupMsg").height();
	if(groupMsgHeight < accountingLeftHeight) {
		$(".theamInfo").find(".showMsg.kuaijiMsg").find(".accountingService").find(".groupMsg").css("height", accountingLeftHeight);
	}
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
