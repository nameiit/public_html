window.onload = function heightRanges() {
	var leftHeight = $(".navInfo ul").height();
	var rightHeight = $(".theamInfo").height();
	if(rightHeight > leftHeight) {
		$(".navInfo ul").css("height", rightHeight);
		//		$(".navInfo ul").css("padding-bottom", "4.16vh");
	}
	if(rightHeight < leftHeight) {
		$(".navInfo ul").css("height", rightHeight);
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

function manageTabAction() {
	$(".manageTabActionNav").find("li").on("click", function() {
		if(!$(this).hasClass("manage-active")) {
			$(this).addClass("manage-active");
			$(this).siblings().removeClass("manage-active");
		} else {
			//			$(this).removeClass("manage-active");
		}
		//添加
		if($(".addInfo").hasClass("manage-active")) {
			$(".addTabMsg").css("display", "block");
			$(".amendTabMsg").css("display", "none");
			$(".amendTabMsg").addClass("nm-hide");
			resetInfo();
		}
		//修改
		if($(".amendInfo").hasClass("manage-active")) {
			$(".amendTabMsg").css("display", "block");
			$(".amendTabMsg").removeClass("nm-hide");
			$(".addTabMsg").addClass("nm-hide");
			$(".addTabMsg").css("display", "none");
		}

	});
}

function resetInfo() {
	$(".lastName").val("");
	$(".firstName").val("");
	$(".gender").val("");
	$(".age").val("");
	$(".cellphone").val("");
	$(".email").val("");
	$(".manage_otherContact").val("");
	$(".otherContactNum").val("");
	$(".detailInfo").val("");
	//销售人员部分
	$(".code").val("");
	$(".division").val("");
	//供应商部分
	$(".supplierName").val(""); //供应商名称
	$(".supplierEmail").val(""); //供应商邮件
	$(".linkManName").val(""); //联系人姓名
	$(".area").val(""); //地区
	$(".linkManTel").val(""); //联系人电话
	$(".businessType").val(""); //业务类型

}
//出现修改框并显示修改信息:
function fillAmendBox() {
	$(".manageTab .tabCard ul li").on("click", function() {
		var thisLi = $(this);
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
			var last_name = thisLi.find(".tabName").text().split(" ")[0];
			var first_name = thisLi.find(".tabName").text().split(" ")[1];
			$(".amendTabMsg").find(".lastName").val($.trim(last_name));
			$(".amendTabMsg").find(".firstName").val($.trim(first_name));
			$(".amendTabMsg").find(".gender").val($.trim(thisLi.find(".tabGender").text()));
			$(".amendTabMsg").find(".age").val($.trim(thisLi.find(".tabAge").text()));
			$(".amendTabMsg").find(".cellphone").val($.trim(thisLi.find(".tabTel").text()));
			$(".amendTabMsg").find(".email").val($.trim(thisLi.find(".tabEmail").text()));
			$(".amendTabMsg").find(".manage_otherContact").val($.trim(thisLi.find(".tabOtherContact").text().split(":")[0]));
			$(".amendTabMsg").find(".otherContactNum").val($.trim(thisLi.find(".tabOtherContact").text().split(":")[1]));
			$(".amendTabMsg").find(".manage_otherContactLab").text($.trim(thisLi.find(".tabOtherContact").text().split(":")[0]) + "账号");
			$(".amendTabMsg").find(".detailInfo").val($.trim(thisLi.find(".tabDetail").text()));

			localStorage.setItem("tour_last_name", $.trim(last_name));
			localStorage.setItem("tour_first_name", $.trim(first_name));
			localStorage.setItem("tour_gender", $.trim(thisLi.find(".tabGender").text()));
			localStorage.setItem("tour_age", $.trim(thisLi.find(".tabAge").text()));
			localStorage.setItem("tour_cellphone", $.trim(thisLi.find(".tabTel").text()));
			localStorage.setItem("tour_email", $.trim(thisLi.find(".tabEmail").text()));
			localStorage.setItem("tour_manage_otherContact", $.trim(thisLi.find(".tabOtherContact").text().split(":")[0]));
			localStorage.setItem("tour_otherContactNum", $.trim(thisLi.find(".tabOtherContact").text().split(":")[1]));
			localStorage.setItem("tour_manage_otherContactLab", $.trim(thisLi.find(".tabOtherContact").text().split(":")[0]) + "账号");
			localStorage.setItem("tour_detailInfo", $.trim(thisLi.find(".tabDetail").text()));

		}
		if($("ul.manageTabDetail li.detail-active").length > 1) {
			resetInfo();

		}

		amandInfo(thisLi);
		deleteInfo(thisLi);

	});

}
//添加：
function addInfo() {
	//添加项
	if($(".addTabMsg").css("display") == "block") {
		//添加
		$(".confirmAddInfo").on("click", function() {
			if($(".lastName").val() !== "" && $(".firstName").val() !== "") {
				var customerInfo = {
					tabId: "123",
					lastName: $(".addTabMsg").find(".lastName").val(),
					firstName: $(".addTabMsg").find(".firstName").val(),
					gender: $(".addTabMsg").find(".gender").val(),
					age: $(".addTabMsg").find(".age").val(),
					phone: $(".addTabMsg").find(".cellphone").val(),
					email: $(".addTabMsg").find(".email").val(),
					otherContactWay: $(".addTabMsg").find(".manage_otherContact").val(),
					otherContactNumber: $(".addTabMsg").find(".otherContactNum").val(),
					detail: $(".addTabMsg").find(".detailInfo").val(),
				};
				var e = `
			<li>
				<dl>

					<dd class="tabId">` + customerInfo.tabId + `</dd>
					<dd class="tabName">` + customerInfo.lastName + " " + customerInfo.firstName + `</dd>
					<dd class="tabGender">` + customerInfo.gender + `</dd>
					<dd class="tabAge">` + customerInfo.age + `</dd>
					<dd class="tabTel">` + customerInfo.phone + `</dd>
					<dd class="tabEmail">` + customerInfo.email + `</dd>
					<dd class="tabOtherContact">` + customerInfo.otherContactWay + ":" + customerInfo.otherContactNumber + `</dd>
					<dd class="tabDetail">` + customerInfo.detail + `</dd>
				</dl>
			</li>
			`;
				$("ul.manageTabDetail").append(e);
				fillAmendBox();

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
//修改
function amandInfo(thisLi) {
	//修改项
	if($(".amendTabMsg").css("display") == "block") {
		$(".confirmAmendInfo").on("click", function() {
			var rName = $(".amendTabMsg").find(".lastName").val() + " " + $(".amendTabMsg").find(".firstName").val(); //姓名
			var rGender = $(".amendTabMsg").find(".gender").val(); //性别
			var rAge = $(".amendTabMsg").find(".age").val(); //年龄
			var rTel = $(".amendTabMsg").find(".cellphone").val(); //移动电话
			var rEmail = $(".amendTabMsg").find(".email").val(); //邮箱
			var rOtherContact = $(".amendTabMsg").find(".manage_otherContact").val() + ":" + $(".amendTabMsg").find(".otherContactNum").val(); //其他联系方式
			var rDetailInfo = $(".amendTabMsg").find(".detailInfo").val();
			if(thisLi.hasClass("detail-active")) {
				thisLi.find(".tabName").text(rName);
				thisLi.find(".tabGender").text(rGender);
				thisLi.find(".tabAge").text(rAge);
				thisLi.find(".tabTel").text(rTel);
				thisLi.find(".tabEmail").text(rEmail);
				thisLi.find(".tabOtherContact").text(rOtherContact);
				thisLi.find(".tabDetail").text(rDetailInfo);
			}
		});
		$(".confirmReset").on("click", function() {
			$(".amendTabMsg").find(".lastName").val(localStorage.getItem("tour_last_name"));
			$(".amendTabMsg").find(".firstName").val(localStorage.getItem("tour_first_name"));
			$(".amendTabMsg").find(".gender").val(localStorage.getItem("tour_gender"));
			$(".amendTabMsg").find(".age").val(localStorage.getItem("tour_age"));
			$(".amendTabMsg").find(".cellphone").val(localStorage.getItem("tour_cellphone"));
			$(".amendTabMsg").find(".email").val(localStorage.getItem("tour_email"));
			$(".amendTabMsg").find(".manage_otherContact").val(localStorage.getItem("tour_manage_otherContact"));
			$(".amendTabMsg").find(".otherContactNum").val(localStorage.getItem("tour_otherContactNum"));
			$(".amendTabMsg").find(".manage_otherContactLab").text(localStorage.getItem("tour_manage_otherContactLab"));
			$(".amendTabMsg").find(".detailInfo").val(localStorage.getItem("tour_detailInfo"));
		});
	}

}
//删除(人员管理-导游部分)：
function deleteInfo(thisLi) {
	if($(".amendTabMsg").css("display") == "block") {
		$(".deleteInfo").on("click", function() {
			thisLi.remove();
			heightRange();
		});
	}
}

//点击展开
function loadMore() {
	$(".order-unfold").on("click", function() {
		$(".manageTabDetail").append($(".manageTabDetail").clone());
		heightRange();
	});
}
//对销售人员的不可见:
function toSalesManagePage() {
	var flag = false;
	$("a#goSalesManage").on("click", function() {
		//销售人员
		if(flag == true) {
			$(this).attr("href", "javascript:void(0);");
			alert("无法访问");
		}
		//非销售人员
		if(flag == false) {
			$(this).attr("href", "SalesManage.php");
		}
	});
}

//销售人员部分
//出现修改框，并显示修改信息:
function fillSalesAmendBox() {
	$(".manageTab .tabCard ul li").on("click", function() {
		var thisLi = $(this);
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
			var last_name = thisLi.find(".tabName").text().split(" ")[0];
			var first_name = thisLi.find(".tabName").text().split(" ")[1];
			$(".amendTabMsg").find(".lastName").val($.trim(last_name));
			$(".amendTabMsg").find(".firstName").val($.trim(first_name));
			$(".amendTabMsg").find(".gender").val($.trim(thisLi.find(".tabGender").text())); //性别
			$(".amendTabMsg").find(".cellphone").val($.trim(thisLi.find(".tabTel").text())); //移动电话
			$(".amendTabMsg").find(".email").val($.trim(thisLi.find(".tabEmail").text())); //邮件
			$(".amendTabMsg").find(".detailInfo").val($.trim(thisLi.find(".tabDetail").text())); //详情
			$(".amendTabMsg").find(".code").val($.trim(thisLi.find(".codeInfo").text())); //Code
			$(".amendTabMsg").find(".division").find("option:selected").text($.trim(thisLi.find(".divisionInfo").text())); //分部

			//销售部分
			localStorage.setItem("sales_last_name", $.trim(last_name));
			localStorage.setItem("sales_first_name", $.trim(first_name));
			localStorage.setItem("sales_gender", $.trim(thisLi.find(".tabGender").text()));
			localStorage.setItem("sales_cellphone", $.trim(thisLi.find(".tabTel").text()));
			localStorage.setItem("sales_email", $.trim(thisLi.find(".tabEmail").text()));
			localStorage.setItem("sales_detailInfo", $.trim(thisLi.find(".tabDetail").text()));
			localStorage.setItem("sales_code", $.trim(thisLi.find(".codeInfo").text()));
			localStorage.setItem("sales_division", $.trim(thisLi.find(".divisionInfo").text()));

		}
		if($("ul.manageTabDetail li.detail-active").length > 1) {
			resetInfo();
		}

		amandSalesInfo(thisLi);

	});

}
//修改销售人员信息
function amandSalesInfo(thisLi) {
	//修改项
	if($(".amendTabMsg").css("display") == "block") {
		$(".confirmAmendInfo").on("click", function() {
			var rName = $(".amendTabMsg").find(".lastName").val() + " " + $(".amendTabMsg").find(".firstName").val(); //姓名
			var rGender = $(".amendTabMsg").find(".gender").val(); //性别
			var rTel = $(".amendTabMsg").find(".cellphone").val(); //移动电话
			var rEmail = $(".amendTabMsg").find(".email").val(); //邮件
			var rDetailInfo = $(".amendTabMsg").find(".detailInfo").val();
			//Code
			var rCode = $(".amendTabMsg").find(".code").val();
			//分部
			var rDivision = $(".amendTabMsg").find(".division").find("option:selected").text();
			if(thisLi.hasClass("detail-active")) {
				thisLi.find(".tabName").text(rName);
				thisLi.find(".tabGender").text(rGender);
				thisLi.find(".tabTel").text(rTel);
				thisLi.find(".tabEmail").text(rEmail);
				thisLi.find(".tabDetail").text(rDetailInfo);
				//Code
				thisLi.find(".codeInfo").text(rCode);
				//分部
				thisLi.find(".divisionInfo").text(rDivision);
			}

		});
		$(".confirmReset").on("click", function() {
			//			resetInfo();
			$(".amendTabMsg").find(".lastName").val(localStorage.getItem("sales_last_name"));
			$(".amendTabMsg").find(".firstName").val(localStorage.getItem("sales_first_name"));
			$(".amendTabMsg").find(".gender").val(localStorage.getItem("sales_gender")); //性别
			$(".amendTabMsg").find(".cellphone").val(localStorage.getItem("sales_cellphone")); //移动电话
			$(".amendTabMsg").find(".email").val(localStorage.getItem("sales_email")); //邮件
			$(".amendTabMsg").find(".detailInfo").val(localStorage.getItem("sales_detailInfo")); //详情
			$(".amendTabMsg").find(".code").val(localStorage.getItem("sales_code")); //Code
			$(".amendTabMsg").find(".division").find("option:selected").text(localStorage.getItem("sales_division")); //分部

		});
	}
}
//添加销售人员信息
function addSalesInfo() {
	//添加项
	if($(".addTabMsg").css("display") == "block") {
		//添加
		$(".confirmAddInfo").on("click", function() {
			if($(".lastName").val() !== "" && $(".firstName").val() !== "") {
				var customerInfo = {
					tabId: "123",
					lastName: $(".addTabMsg").find(".lastName").val(),
					firstName: $(".addTabMsg").find(".firstName").val(),
					gender: $(".addTabMsg").find(".gender").val(),
					code: $(".addTabMsg").find(".code").val(),
					phone: $(".addTabMsg").find(".cellphone").val(),
					email: $(".addTabMsg").find(".email").val(),
					division: $(".addTabMsg").find(".division").find("option:selected").text(),
					detail: $(".addTabMsg").find(".detailInfo").val(),
				};
				var e = `
			<li>
				<dl>

					<dd class="tabId">` + customerInfo.tabId + `</dd>
					<dd class="codeInfo">` + customerInfo.code + `</dd>
					<dd class="tabName">` + customerInfo.lastName + " " + customerInfo.firstName + `</dd>
					<dd class="tabGender">` + customerInfo.gender + `</dd>
					<dd class="tabTel">` + customerInfo.phone + `</dd>
					<dd class="divisionInfo">` + customerInfo.division + `</dd>
					<dd class="tabEmail">` + customerInfo.email + `</dd>
					<dd class="tabDetail">` + customerInfo.detail + `</dd>
				</dl>
			</li>
			`;
				$("ul.manageTabDetail").append(e);
				fillSalesAmendBox()

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

//供应商部分
//出现修改框，并显示修改信息:
function fillSupplierAmendBox() {
	$(".manageTab .tabCard ul li").on("click", function() {
		var thisLi = $(this);
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
			$(".amendTabMsg").find(".supplierName").val($.trim(thisLi.find(".supplierNameTab").text())); //供应商名称
			$(".amendTabMsg").find(".supplierEmail").val($.trim(thisLi.find(".supplierEmailTab").text())); //供应商邮件
			$(".amendTabMsg").find(".linkManName").val($.trim(thisLi.find(".linkManNameTab").text())); //联系人姓名
			$(".amendTabMsg").find(".area").val($.trim(thisLi.find(".areaInfoTab").text())); //地区
			$(".amendTabMsg").find(".linkManTe").val(""); //联系人电话
			$(".amendTabMsg").find(".businessType").val($.trim(thisLi.find(".businessTypeTab").text())); //业务类型
			$(".amendTabMsg").find(".detailInfo").val($.trim(thisLi.find(".tabDetailTab").text())); //详情
			$(".amendTabMsg").find(".code").val($.trim(thisLi.find(".codeInfo").text()));

			localStorage.setItem("supplier_name", $.trim(thisLi.find(".supplierNameTab").text()));
			localStorage.setItem("supplier_email", $.trim(thisLi.find(".supplierEmailTab").text()));
			localStorage.setItem("supplier_linkManName", $.trim(thisLi.find(".linkManNameTab").text()));
			localStorage.setItem("supplier_area", $.trim(thisLi.find(".areaInfoTab").text()));
			localStorage.setItem("supplier_businessType", $.trim(thisLi.find(".businessTypeTab").text()));
			localStorage.setItem("supplier_detailInfo", $.trim(thisLi.find(".tabDetailTab").text()));
			localStorage.setItem("supplier_code", $.trim(thisLi.find(".codeInfo").text()));

		}
		if($("ul.manageTabDetail li.detail-active").length > 1) {
			resetInfo();
		}

		amandSupplierInfo(thisLi);

	});

}

//修改供应商信息
function amandSupplierInfo(thisLi) {
	//修改项
	if($(".amendTabMsg").css("display") == "block") {
		$(".confirmAmendInfo").on("click", function() {
			var rsName = $(".amendTabMsg").find(".supplierName").val(); //供应商名称
			//供应商邮件
			var rsEmail = $(".amendTabMsg").find(".supplierEmail").val();
			//联系人姓名
			var rsLinkManName = $(".amendTabMsg").find(".linkManName").val();
			//地区
			var rsArea = $(".amendTabMsg").find(".area").val();
			//联系人电话
			var rsLinkManTel = $(".amendTabMsg").find(".linkManTel").val();
			//业务类型
			var rsBusinessType = $(".amendTabMsg").find(".businessType").val();
			//详情
			var rsDetailInfo = $(".amendTabMsg").find(".detailInfo").val();
			//Code
			var rsCode = $(".amendTabMsg").find(".code").val();
			if(thisLi.hasClass("detail-active")) {
				thisLi.find(".supplierNameTab").text(rsName); //供应商名称
				thisLi.find(".supplierEmailTab").text(rsEmail); //供应商邮件
				thisLi.find(".linkManNameTab").text(rsLinkManName); //联系人姓名
				thisLi.find(".areaInfoTab").text(rsArea); //地区
				thisLi.find(".tabDetailTab").text(rsDetailInfo); //详情
				thisLi.find(".businessTypeTab").text(rsBusinessType); //业务类型
				//Code
				thisLi.find(".codeInfo").text(rsCode);
			}

		});
		//重置
		$(".confirmReset").on("click", function() {
			//			resetInfo();
			//供应商部分
			$(".amendTabMsg").find(".supplierName").val(localStorage.getItem("supplier_name")); //供应商名称
			$(".amendTabMsg").find(".supplierEmail").val(localStorage.getItem("supplier_email")); //供应商邮件
			$(".amendTabMsg").find(".linkManName").val(localStorage.getItem("supplier_linkManName")); //联系人姓名
			$(".amendTabMsg").find(".area").val(localStorage.getItem("supplier_area")); //地区
			$(".amendTabMsg").find(".linkManTe").val(""); //联系人电话
			$(".amendTabMsg").find(".businessType").val(localStorage.getItem("supplier_businessType")); //业务类型
			$(".amendTabMsg").find(".detailInfo").val(localStorage.getItem("supplier_detailInfo")); //详情
			$(".amendTabMsg").find(".code").val(localStorage.getItem("supplier_code"));
		});
	}
}

//添加供应商信息
//添加销售人员信息
function addSupplierInfo() {
	//添加项
	if($(".addTabMsg").css("display") == "block") {
		//添加
		$(".confirmAddInfo").on("click", function() {
			if($(".supplierName").val() !== "") {
				var customerInfo = {
					tabId: "123",
					supplierName: $(".addTabMsg").find(".supplierName").val(), //供应商名称
					supplierEmail: $(".addTabMsg").find(".supplierEmail").val(), //供应商邮件
					linkManName: $(".addTabMsg").find(".linkManName").val(), //联系人姓名
					code: $(".addTabMsg").find(".code").val(), //code
					rArea: $(".addTabMsg").find(".area").val(), //地区
					businessType: $(".addTabMsg").find(".businessType").val(), //业务类型
					detail: $(".addTabMsg").find(".detailInfo").val(), //详情
				};
				var e = `
			<li>
				<dl>

					<dd class="tabId">` + customerInfo.tabId + `</dd>
					<dd class="codeInfo">` + customerInfo.code + `</dd>
					<dd class="supplierNameTab">` + customerInfo.supplierName + `</dd>
					<dd class="supplierEmailTab">` + customerInfo.supplierEmail + `</dd>
					<dd class="linkManNameTab">` + customerInfo.linkManName + `</dd>
					<dd class="areaInfoTab">` + customerInfo.rArea + `</dd>
					<dd class="businessTypeTab">` + customerInfo.businessType + `</dd>
					<dd class="tabDetailTab">` + customerInfo.detail + `</dd>
				</dl>
			</li>
			`;
				$("ul.manageTabDetail").append(e);
				fillSupplierAmendBox();

			} else {
				alert("请确认供应商名称已填写");
			}
		});
		//重置
		$(".confirmReset").on("click", function() {
			resetInfo();
			//供应商部分
		});
	}

}
//下拉搜索
function searchTab(searchBox) {
	searchBox.searchableSelect({
		afterSelectItem: function() {
			var linshi = this.element[0][0].text;
			console.log(linshi);
			localStorage.setItem("linshi", linshi);
			if(this.holder.text() !== this.element[0][0].text) {
				$("li.detail-active").css({
					"overflow": "initial",
					"background-color": "#fe6345"
				});
			} else {
				$(".searchable-select-holder").on("click", function() {
					$(this).parent().find(".searchable-select-item:first").text("取消");
					$(this).parent().find(".searchable-select-item:first").on("click", function() {
						$(this).parent().find(".searchable-select-holder").text(localStorage.getItem("linshi"));
						console.log(localStorage.getItem("linshi"));
						$("li.detail-active").css({
							"overflow": "initial",
							"background-color": "#9295ff"
						});
					});
				});

				$("li.detail-active").css({
					"overflow": "initial",
					"background-color": "#9295ff"
				});
			}
		}
	});
}

//详情
function detailInfo($) {
	data = {
		detailFlag: true,
		deteilText: "详情详情详情详情详情详情详情详情详情详情详情详情"
	}
	if(data['detailFlag'] == true) {
		for(var i = 0; i < $("dd.tabDetail").length; i++) {
			var dataInfo = data['deteilText'] + i; //详情信息
			$($("dd.tabDetail")[i]).attr("title", dataInfo);
			$("dd.tabDetail").text("详情");
		}
		//提示框
		new $.Zebra_Tooltips($('.zebra_tips'), {
			'background_color': '#000000',
			'color': '#FFF'
		});
	} else {
		$("dd.tabDetail").text(" ");
	}
	//销售：
	if(data['detailFlag'] == true) {
		for(var i = 0; i < $("dd.tabDetail").length; i++) {
			var dataInfo = data['deteilText'] + i; //详情信息
			$($("dd.tabDetail")[i]).attr("title", dataInfo);
		}
		$("dd.tabDetail").text("详情");
		//提示框
		new $.Zebra_Tooltips($('.zebra_tips2'), {
			'background_color': '#000000',
			'color': '#FFF'
		});
	} else {
		$("dd.tabDetail").text(" ");
	}

	//供应商部分的详情提示框     s
	if(data['detailFlag'] == true) {
		for(var i = 0; i < $("dd.tabDetailTab").length; i++) {
			var dataInfo = data['deteilText'] + i; //详情信息
			$($("dd.tabDetailTab")[i]).attr("title", dataInfo);
		}
		$("dd.tabDetailTab").text("详情");
		//提示框
		new $.Zebra_Tooltips($('.zebra_tips'), {
			'background_color': '#000000',
			'color': '#FFF'
		});
	} else {
		$("dd.tabDetailTab").text(" ");
	}

	//供应商部分的详情提示框     e

}
