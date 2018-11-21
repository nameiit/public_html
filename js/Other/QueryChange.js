$(function() {
//	listStatus();
	autoHeight();
	resetInfo();
	$(window).resize(function() {
		autoHeight();
	});
	toUsersManagePage();
});
//function listStatus() {
//	$(document).on('click', 'ul.listInfo li.listDetail dl', function() {
//		if($(this).hasClass("selected")) {
//			$(this).removeClass("selected");
//		} else {
//			$(this).addClass("selected");
//		}
//	});
//}
function autoHeight() {
	var logID = $("ul.listInfo li.listDetail").find("dd.logID");
	var orderNum = $("ul.listInfo li.listDetail").find("dd.orderNum");
	var amendantRecord = $("ul.listInfo li.listDetail").find("dd.amendantRecord");
	var beforeChange = $("ul.listInfo li.listDetail").find("dd.beforeChange");
	var afterChange = $("ul.listInfo li.listDetail").find("dd.afterChange");
	var changedBy = $("ul.listInfo li.listDetail").find("dd.changedBy");
	var changeTime = $("ul.listInfo li.listDetail").find("dd.changeTime");
	for(var j = 0; j < logID.length; j++) {
		var maxHeight = Math.max(
			$(logID[j]).height(),
			$(orderNum[j]).height(),
			$(amendantRecord[j]).height(),
			$(beforeChange[j]).height(),
			$(afterChange[j]).height(),
			$(changedBy[j]).height(),
			$(changeTime[j]).height()
		);
		if(maxHeight > 32) {
			$("ul.listInfo li.listDetail").eq(j).find("dl").find("dd").css({
				"height": maxHeight,
			});
		}
	}
}

//重置
function resetInfo(){
	$(".rightInfoCard.orderChangeQuery ul li.actionFilerBox").find("a.resetInfo").on("click", function() {
		resetMcoInfo();
	});
}

function resetMcoInfo(){
	$(".rightInfoCard.orderChangeQuery").find("input").val("");
}

function loadTableContent(data) {
	var url = location.protocol.concat("//").concat(location.host).concat('/database/Other/UpdateLog/updateLog.php');
	$.ajax({
		url:url,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		type: 'GET',
		data: data,
		success: function(response) {
			response = JSON.parse(response);
			$('.listDetail').remove();
			for (var i = 0; i < response.length; ++i) {
				$html = `<li class=listDetail><dl>
					<dd class="logID">` + response[i]['log_id'] + `</dd>
					<dd class="orderNum">` + response[i]['transaction_id'] + `</dd>
					<dd class="amendantRecord">` + response[i]['name'] + `</dd>
					<dd class="beforeChange">` + response[i]['change_before'] + `</dd>
					<dd class="afterChange">` + response[i]['change_after'] + `</dd>
					<dd class="changedBy">` + response[i]['revised_by'] + `</dd>
					<dd class="changeTime">` + response[i]['revised_time'] + `</dd>
				</dl></li>`;
				$('ul.listInfo').append($html);
			}
			heightRange();
			autoHeight();
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(textStatus, errorThrown);
		}
	});
}

function loadRowCount(data) {
	var url = location.protocol.concat("//").concat(location.host).concat('/database/Other/UpdateLog/getLogCount.php');
	$.ajax({
		url: url,
		type: 'GET',
		data: data,
		success: function(response) {
			// console.log(response);
			if(response == 0) {
				$(".noResultBox").css("display", "block");
			} else {
				$('.listDetail').empty();
				$('#queryPagination').pagination({
					totalData: response,
					showData: 15,
					current: 0,
					coping: true,
					homePage: '首页',
					endPage: '末页',
					prevContent: '上页',
					nextContent: '下页',
					callback: function(api) {
						var i = api.getCurrent(); //获取当前页
						var inputData = data;
						Object.assign(inputData, {
							offset: (i - 1) * 15
						});
						loadTableContent(inputData);
					}
				});
				$('ul.pagination').find('a').click();
			}
			heightRange();
			autoHeight();
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(textStatus, errorThrown);
		}
	});
}

function getTodayYYYYMMDD() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1;
	var yyyy = today.getFullYear();
	if(dd < 10) {
		dd = '0' + dd;
	}
	if(mm < 10) {
		mm = '0' + mm;
	}
	today = yyyy + '-' + mm + '-' + dd;
	return today;
}

function getFilterData() {
	var from_date = $("#updateLogFromDate").val();
	var to_date = $("#updateLogToDate").val();
	var transaction_id = $("#updateLogTransactionID").val();
	var revised_by = $("#updateLogRevisedBy").val();
	today = getTodayYYYYMMDD();
	var data = {
		from_date: from_date,
		to_date: to_date,
		transaction_id: transaction_id,
		revised_by: revised_by,
		today: today
	};
	return data
}

$(document).ready(function() {
	loadRowCount(getFilterData());
	$("#filter-confirm").on('click', function () {
		loadRowCount(getFilterData());
	});
});
