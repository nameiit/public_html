$(function() {
	searchTab();
	manageTabAction();
	autoWidth();
	detailInfo();
	fillAmendBox();
	addInfo();
	heightRange();
	$(document).on('click', ".manageTab .tabCard ul.manageTabTitle li", function() {
		$(this).addClass("detail-active");
		$(this).siblings().removeClass("detail-active");
	});
	$(".manageTabActionNav").find("li").on("click", function() {
		resetInfo();
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

function autoWidth() {
	var sum = 0
	for(var i = 0; i < $(".manageTab .tabCard ul.manageTabTitle li").length - 1; i++) {
		sum = sum + $(".manageTab .tabCard ul.manageTabTitle li").eq(i).outerWidth();
	}
	var ulWidth = $(".manageTab .tabCard ul.manageTabTitle").outerWidth();
	$(".manageTab .tabCard ul.manageTabTitle li").last().outerWidth(ulWidth - sum - 1);
	var travelCellWidth = $(".manageTab .tabCard ul li.travelAgencyInfo").outerWidth();
	$(".manageTab .tabCard ul li.travelAgencyInfo").find(".searchable-select-holder").outerWidth(travelCellWidth);
	var statusCellWidth = $(".manageTab .tabCard ul li.statusInfo").outerWidth();
	$(".manageTab .tabCard ul li.statusInfo").find(".searchable-select-holder").outerWidth(statusCellWidth);
	$(window).resize(function() {
		var sum = 0
		for(var i = 0; i < $(".manageTab .tabCard ul.manageTabTitle li").length - 1; i++) {
			sum = sum + $(".manageTab .tabCard ul.manageTabTitle li").eq(i).outerWidth();
		}
		var ulWidth = $(".manageTab .tabCard ul.manageTabTitle").outerWidth();
		$(".manageTab .tabCard ul.manageTabTitle li").last().outerWidth(ulWidth - sum - 1);
		var travelCellWidth = $(".manageTab .tabCard ul li.travelAgencyInfo").outerWidth();
		$(".manageTab .tabCard ul li.travelAgencyInfo").find(".searchable-select-holder").outerWidth(travelCellWidth);
		var statusCellWidth = $(".manageTab .tabCard ul li.statusInfo").outerWidth();
		$(".manageTab .tabCard ul li.statusInfo").find(".searchable-select-holder").outerWidth(statusCellWidth);

	});
}
//下拉
function searchTab() {
	$("select.searchItem").searchableSelect({
		afterSelectItem: function() {
			console.log(this.holder.text());
			console.log(this.element[0][0].text);
			console.log(this.element[0][0]);
			if(this.holder.text() !== this.element[0][0].text) {
				$("li.detail-active").css({
					"overflow": "initial",
					"background-color": "#fe6345"
				});
			} else {
				$("li.detail-active").css({
					"overflow": "initial",
					"background-color": "#9295ff"
				});
			}

		}
	});
}
//地址详情查看
var detailText = "详情详情";
var detailAddress = "地址地址";
var addressArr = [];
var detailArr = [];
//查看详情:
function detailInfo() {
	for(var i = 0; i < $("ul.manageTabDetail li dd.addressInfo").length; i++) {
		$("ul.manageTabDetail li dd.addressInfo").eq(i).find("a.address-tips").attr("title", i + detailAddress);
		addressArr.push(i + detailAddress);
	}
	localStorage.setItem("addressInfo", addressArr);
	new $.Zebra_Tooltips($('.address-tips'), {
		'background_color': '#000000',
		'color': '#FFF'
	});
	//详情查看
	for(var i = 0; i < $("ul.manageTabDetail li dd.tabDetailInfo").length; i++) {
		$("ul.manageTabDetail li dd.tabDetailInfo").eq(i).find("a.tabDetail-tips").attr("title", i + detailText);
		detailArr.push(i + detailText);
	}
	localStorage.setItem("detailInfo", detailArr);
	new $.Zebra_Tooltips($('.tabDetail-tips'), {
		'background_color': '#000000',
		'color': '#FFF'
	});

}
//重置
function resetInfo() {
	$("input.travelAgencyName").val("");
	$("input.mail").val("");
	$("input.tel").val("");
	$("input.createTime").val("");
	$("input.address").val("");
	$("input.zipCode").val("");
	$("input.area").val("");
	$("textarea.detail").val("");
}

function fillAmendBox() {
	$(".manageTab .tabCard ul li").on("click", function() {
		var thisLi = $(this);
		var index = $(this).index();
		thisLi.addClass("detail-active");
		thisLi.siblings().removeClass("detail-active");
		$(".amendTabMsg").css("display", "block");
		$(".amendTabMsg").removeClass("nm-hide");
		$(".addTabMsg").addClass("nm-hide");
		$(".addTabMsg").css("display", "none");
		$(".amendInfo").addClass("manage-active");
		$(".amendInfo").siblings().removeClass("manage-active"); //修改项
		//选中某一项，修改项出现
		if($("ul.manageTabDetail li.detail-active").length == 1) {
			var travelAgencyName = $.trim(thisLi.find("dd.travelAgencyInfo").text()); //旅行社名字
			var travelAgencyMail = $.trim(thisLi.find("dd.mailInfo").text()); //邮件
			var travelAgencyTel = $.trim(thisLi.find("dd.tabTelInfo").text()); //联系电话
			var travelAgencyCreateTime = $.trim(thisLi.find("dd.createTimeInfo").text()); //创建时间
			var travelAgencyAddress = localStorage.getItem("addressInfo"); //地址
			travelAgencyAddress = travelAgencyAddress.split(',');
			console.log(travelAgencyAddress);
			var travelAgencyDetail = localStorage.getItem("detailInfo"); //详情
			travelAgencyDetail = travelAgencyDetail.split(',');
			console.log(travelAgencyDetail);
			$(".amendTabMsg").find("input.travelAgencyName").val(travelAgencyName);
			$(".amendTabMsg").find("input.mail").val(travelAgencyMail);
			$(".amendTabMsg").find("input.tel").val(travelAgencyTel);
			$(".amendTabMsg").find("input.createTime").val(travelAgencyCreateTime);
			$(".amendTabMsg").find("input.address").val(travelAgencyAddress[index]);
			$(".amendTabMsg").find("textarea.detail").val(travelAgencyDetail[index]);
			localStorage.setItem("travelAgencyName", $.trim(travelAgencyName));
			localStorage.setItem("travelAgencyMail", $.trim(travelAgencyMail));
			localStorage.setItem("travelAgencyTel", $.trim(travelAgencyTel));
			localStorage.setItem("travelAgencyCreateTime", $.trim(travelAgencyCreateTime));
			localStorage.setItem("travelAgencyAddress", travelAgencyAddress[index]);
			localStorage.setItem("travelAgencyDetail", travelAgencyDetail[index]);
		}
		if($("ul.manageTabDetail li.detail-active").length > 1) {
			resetInfo();
		}

		amandInfo(thisLi);
		detailInfo();

	});

}
//修改
function amandInfo(thisLi) {
	//修改项
	if($(".amendTabMsg").css("display") == "block") {
		$(".confirmAmendInfo").on("click", function() {
			var index = $(this).index();
			var travelAgencyName = $(".amendTabMsg").find("input.travelAgencyName").val();
			var travelAgencyMail = $(".amendTabMsg").find("input.mail").val();
			var travelAgencyTel = $(".amendTabMsg").find("input.tel").val();
			var travelAgencyCreateTime = $(".amendTabMsg").find("input.createTime").val();
			var travelAgencyAddress = $(".amendTabMsg").find("input.address").val();
			var travelAgencyDetail = $(".amendTabMsg").find("textarea.detail").val();
			if(thisLi.hasClass("detail-active")) {
				thisLi.find("dd.travelAgencyInfo").text(travelAgencyName);
				thisLi.find("dd.mailInfo").text(travelAgencyMail);
				thisLi.find("dd.tabTelInfo").text(travelAgencyTel);
				thisLi.find("dd.createTimeInfo").text(travelAgencyCreateTime);
				thisLi.find("dd.addressInfo").find("a.address-tips").attr("title", travelAgencyAddress);
				thisLi.find("dd.tabDetailInfo").find("a.tabDetail-tips").attr("title", travelAgencyDetail);
				new $.Zebra_Tooltips($('.detail-active .address-tips'), {
					'background_color': '#000000',
					'color': '#FFF'
				});
				new $.Zebra_Tooltips($('.detail-active a.tabDetail-tips'), {
					'background_color': '#000000',
					'color': '#FFF'
				});
			}

		});
		$(".confirmReset").on("click", function() {
			$(".amendTabMsg").find("input.travelAgencyName").val(localStorage.getItem("travelAgencyName"));
			$(".amendTabMsg").find("input.mail").val(localStorage.getItem("travelAgencyMail"));
			$(".amendTabMsg").find("input.tel").val(localStorage.getItem("travelAgencyTel"));
			$(".amendTabMsg").find("input.createTime").val(localStorage.getItem("travelAgencyCreateTime"));
			$(".amendTabMsg").find("input.address").val(localStorage.getItem("travelAgencyAddress"));
			$(".amendTabMsg").find("textarea.detail").val(localStorage.getItem("travelAgencyDetail"));
		});
	}
} //添加：

function addInfo() {
	//添加项
	if($(".addTabMsg").css("display") == "block") {
		//添加
		$(".confirmAddInfo").on("click", function() {
			if($("input.travelAgencyName").val() !== "") {
				var customerInfo = {
					tabId: "123",
					travelAgencyName: $(".addTabMsg").find("input.travelAgencyName").val(),
					travelAgencyMail: $(".addTabMsg").find("input.mail").val(),
					travelAgencyTel: $(".addTabMsg").find("input.tel").val(),
					travelAgencyCreateTime: $(".addTabMsg").find("input.createTime").val(),
					travelAgencyAddress: '查看',
					travelAgencyDetail: '查看',
					travelAgencyStatus: 'Active',
					travelAgencyAddressTitle: $(".addTabMsg").find("input.address").val(),
					travelAgencyDetailTitle: $(".addTabMsg").find("textarea.detail").val()
				};
				var e = `
			<li class="new">
				<dl>

					<dd class="tabId">` + customerInfo.tabId + `</dd>
					<dd class="travelAgencyInfo">` + customerInfo.travelAgencyName + `</dd>
					<dd class="mailInfo">` + customerInfo.travelAgencyMail + `</dd>
					<dd class="tabTelInfo">` + customerInfo.travelAgencyTel + `</dd>
					<dd class="createTimeInfo">` + customerInfo.travelAgencyCreateTime + `</dd>
					<dd class="addressInfo"><a class="address-tips" title="` + customerInfo.travelAgencyAddressTitle + `">` + customerInfo.travelAgencyAddress + `</a></dd>
					<dd class="tabDetailInfo"><a class="tabDetail-tips" title="` + customerInfo.travelAgencyDetailTitle + `">` + customerInfo.travelAgencyDetail + `</a></dd>
					<dd class="statusInfo">` + customerInfo.travelAgencyStatus + `</dd>
				</dl>
			</li>
			`;
				$("ul.manageTabDetail").append(e);
				if($(".manageTab .tabCard ul li").hasClass("new")) {
					new $.Zebra_Tooltips($('.manageTab .tabCard ul li.new .address-tips'), {
						'background_color': '#000000',
						'color': '#FFF'
					});
					new $.Zebra_Tooltips($('.manageTab .tabCard ul li.new a.tabDetail-tips'), {
						'background_color': '#000000',
						'color': '#FFF'
					});
				} else {
					detailInfo();
				}
				fillAmendBox();
				heightRange();

			} else {
				alert("请确认姓名信息已填写");
			}
		});
		//重置
		$(".confirmReset").on("click", function() {
			resetInfo();

		});
	}

}
