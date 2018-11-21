$(function() {
	manageTabAction();
	autoWidth();

	// detailInfo();
	// fillAmendBox();
	// addInfo();
	// heightRange();
	// $(document).on('click', ".manageTab .tabCard ul.manageTabTitle li", function() {
	// 	$(this).addClass("detail-active");
	// 	$(this).siblings().removeClass("detail-active");
	// });
	// $(".manageTabActionNav").find("li").on("click", function() {
	// 	resetInfo();
	// });
	function loadFilter() {
		var url = location.protocol.concat("//").concat(location.host).concat('/database/autoComplete.php');
		$.ajax({
			url: url,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			type: 'post',
			data: { target: 'travelAgency' },
			success: function(response) {
				response = JSON.parse(response);
				// 中文姓名搜索
				var reg = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/;
				for (var i = 0; i < response.length; i++) {
					var name = response[i].split(" ");
					if (name[1] != null && (reg.test(name[0]) || reg.test(name[1]))) {
						response[i] = name[1] + name[0];
					}
					$("#travel-agency-name-filter").append("<option value='" + response[i] + "'>" + response[i] + "</option>");
				}

				searchTab($("#travel-agency-name-filter, #travel-agency-status-filter"), getFilterData, loadData);
				autoWidth();
				heightRange();
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
	}
	loadFilter();

	var filterData = { travel_agency_name: "all", status: "all" };

    function getFilterData() {
        filterData.travel_agency_name = $("#travel-agency-name-filter").val();
        filterData.status = $("#travel-agency-status-filter").val();
        return filterData;
    }

	var limit = 10;
    function loadData(inputData) {
        var data = inputData;
        Object.assign(data, {
            action: 'getTravelAgencyList',
            limit: limit
        });
        var url = location.protocol.concat("//").concat(location.host).concat('/database/Management/TravelAgency.php');
        $.ajax({
            url: url,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            type: 'GET',
            data: data,
            success: function(response) {
                $("ul.manageTabDetail").empty();
                response = JSON.parse(response);
                for (var i = 0; i < response.length; i++) {
                    var email = "";
					if (response[i]['email'] != null) {
						email = response[i]['email'];
					}

					var phone = "";
					if (response[i]['phone'] != null) {
						phone = response[i]['phone'];
					}

					var address = "";
					if (response[i]['agency_address'] != null) {
						address = response[i]['agency_address'];
					}

                    $html = `
                    <li><dl><dd class="tabId">` + response[i]['ta_id'] + `</dd>
                            <dd class="travelAgencyInfo"> ` + response[i]['agency_name'] + `</dd>
                            <dd class="mailInfo">` + email + `</dd>
                            <dd class="tabTelInfo"> ` + phone + `</dd>
                            <dd class="createTimeInfo">` + response[i]['create_time'].substring(0, 10) + `</dd>
                            <dd class="addressInfo">` + address + `</dd>
                            <dd class="tabDetailInfo zebra_tips2" title="" ><p></p></dd>
							<dd class="statusInfo">` + response[i]['active_status'] + `</dd>
                    </dl></li>
                    `;
                    $("ul.manageTabDetail").append($html);
					//
                    var len = $("dd.tabDetailInfo").length;

                    if (response[i]['description'] != "") {
                        $($("dd.tabDetailInfo")[len - 1]).attr("title", response[i]['description']);
                        $($("dd.tabDetailInfo")[len - 1]).text("详情");
					}
                }
                autoWidth();
                new $.Zebra_Tooltips($('.zebra_tips2'), {
                    'background_color': '#000000',
                    'color': '#FFF'
                });
                $("ul.manageTabDetail li dd.statusInfo").each(function(i,item){
					if($.trim($(item).text()) == "Y") {
						$(item).addClass("Ystatus");
						$(item).text("");
					}
					if($.trim($(item).text()) == "N") {
						$(item).addClass("Nstatus");
						$(item).text("");
					}
				});
				heightRange();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    }
	// 载入更多
    $(".order-unfold").on("click", function() {
        limit += 10;
		loadData(filterData);
        resetUpdateTable();
	});
	function resetUpdateTable() {
		$("#update-travel-agency-name").val("");
		$("#update-travel-agency-email").val("");
		$("#update-travel-agency-phone").val("");
		$("#update-travel-agency-createtime").val("");
		$("#update-travel-agency-address").val("");
		$("#update-travel-agency-zipcode").val("");
		$("#update-travel-agency-region").val("");
		$("#update-travel-agency-description").val("");
	}
	$(document).on('click', ".manageTab .tabCard ul.manageTabDetail li", function() {
        $(this).addClass("detail-active");
        $(this).siblings().removeClass("detail-active");
        $(".amendTabMsg").css("display", "block");
        $(".amendTabMsg").removeClass("nm-hide");
        $(".addTabMsg").addClass("nm-hide");
        $(".addTabMsg").css("display", "none");
        $(".amendInfo").addClass("manage-active");
        $(".amendInfo").siblings().removeClass("manage-active");
        var ta_id = $(this).find(".tabId").text();
        getTravelAgencyDetail(ta_id);
    });
	$(document).on('click', ".manageTab .tabCard ul.manageTabTitle li", function() {
		$(this).addClass("detail-active");
		$(this).siblings().removeClass("detail-active");
	});
	function getTravelAgencyDetail(ta_id) {
		var url = location.protocol.concat("//").concat(location.host).concat('/database/Management/TravelAgency.php');
		$.ajax({
			url: url,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			type: 'GET',
			data: {
				action: 'getTravelAgencyInfo',
				ta_id: ta_id
			},
			success: function(response) {
				response = JSON.parse(response);
				$("#update-travel-agency-name").val(response['agency_name']);
				$("#update-travel-agency-email").val(response['email']);
				$("#update-travel-agency-phone").val(response['phone']);
				$("#update-travel-agency-createtime").val(response['create_time'].substring(0, 10));
				$("#update-travel-agency-address").val(response['address']);
				$("#update-travel-agency-zipcode").val(response['zipcode']);
				$("#update-travel-agency-region").val(response['country']);
				$("#update-travel-agency-description").val(response['description']);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
	}
	$("#update-confirm").on('click', function() {
		$(".updateConfirmBox").css("display", "block");
	});
	$("#updateActionConfirm").on('click', function() {
		var ta_id = $(document).find(".detail-active .tabId")[0].innerHTML;
		var url = location.protocol.concat("//").concat(location.host).concat('/database/Management/TravelAgency.php');
		$.ajax({
			url: url,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			type: 'POST',
			data: {
				action: 'updateTravelAgency',
				ta_id: ta_id,
				agency_name: $("#update-travel-agency-name").val(),
				email: $("#update-travel-agency-email").val(),
				phone: $("#update-travel-agency-phone").val(),
				create_time: $("#update-travel-agency-createtime").val(),
				address: $("#update-travel-agency-address").val(),
				zipcode: $("#update-travel-agency-zipcode").val(),
				region: $("#update-travel-agency-region").val(),
				description: $("#update-travel-agency-description").val()
			},
			success: function(response) {
				$(".updateConfirmBox").css("display", "none");
				loadData(filterData);
				resetUpdateTable();
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
	});
	$("#updateActionCancel").on('click', function() {
		$(".updateConfirmBox").css("display", "none");
	});
	$("#update-reset").on('click', function() {
		if ($(document).find(".detail-active .tabId").length == 1) {
			var tourist_guide_id = $(document).find(".detail-active .tabId")[0].innerHTML;
			getTouristGuideInfo(tourist_guide_id);
		} else {
			resetUpdateTable();
		}
	});
	$("#insert-confirm").on('click', function() {
        $(".insertConfirmBox").css("display", "block");
    });
    $("#insertActionConfirm").on('click', function() {
        var url = location.protocol.concat("//").concat(location.host).concat('/database/Management/TravelAgency.php');
        $.ajax({
            url: url,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            type: 'POST',
            data: {
                action: 'insertTravelAgency',
				agency_name: $("#insert-travel-agency-name").val(),
				email: $("#insert-travel-agency-email").val(),
				phone: $("#insert-travel-agency-phone").val(),
				create_time: $("#insert-travel-agency-createtime").val(),
				address: $("#insert-travel-agency-address").val(),
				zipcode: $("#insert-travel-agency-zipcode").val(),
				region: $("#insert-travel-agency-region").val(),
				description: $("#insert-travel-agency-description").val()
            },
            success: function(response) {
                $(".insertConfirmBox").css("display", "none");
                loadData(filterData);
                resetInsertTable();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    });
    $("#insertActionCancel").on('click', function() {
        $(".insertConfirmBox").css("display", "none");
    });
    $("#insert-reset").on('click', function() {
        resetInsertTable();
    });
	function resetInsertTable() {
		$("#insert-travel-agency-name").val("");
		$("#insert-travel-agency-email").val("");
		$("#insert-travel-agency-phone").val("");
		$("#insert-travel-agency-createtime").val("");
		$("#insert-travel-agency-address").val("");
		$("#insert-travel-agency-zipcode").val("");
		$("#insert-travel-agency-region").val("");
		$("#insert-travel-agency-description").val("");
    }

	$("#update-clear").on('click', function() {
        $(".deleteConfirmBox").css("display", "block");
    });
    $("#deleteActionConfirm").on('click', function() {
        var ta_id = $(document).find(".detail-active .tabId")[0].innerHTML;
        var url = location.protocol.concat("//").concat(location.host).concat('/database/Management/TravelAgency.php');
        $.ajax({
            url: url,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            type: 'POST',
            data: {
                action: 'deleteTravelAgency',
                ta_id: ta_id
            },
            success: function(response) {
                console.log(response);
                $(".deleteConfirmBox").css("display", "none");
                loadData(filterData);
                resetUpdateTable();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    });
    $("#deleteActionCancel").on('click', function() {
        $(".deleteConfirmBox").css("display", "none");
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
	$(".manageTab .tabCard ul.manageTabTitle li").last().outerWidth(ulWidth - sum - 4);
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
		$(".manageTab .tabCard ul.manageTabTitle li").last().outerWidth(ulWidth - sum - 4);
		var travelCellWidth = $(".manageTab .tabCard ul li.travelAgencyInfo").outerWidth();
		$(".manageTab .tabCard ul li.travelAgencyInfo").find(".searchable-select-holder").outerWidth(travelCellWidth);
		var statusCellWidth = $(".manageTab .tabCard ul li.statusInfo").outerWidth();
		$(".manageTab .tabCard ul li.statusInfo").find(".searchable-select-holder").outerWidth(statusCellWidth);
	});
}

/*
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
*/
