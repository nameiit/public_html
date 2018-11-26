$(function() {
	listStatus();
	deleteMcoInfo();
	markCompleted();
	autoHeight();
	postMcoInfo();
	resetInfo();
	toUsersManagePage();
	$(window).resize(function(){
		autoHeight();
	})
});

function listStatus() {
	$(document).on('click', 'ul.listInfo li.listDetail dl', function() {
		if($(this).hasClass("selected")) {
			$(this).removeClass("selected");
		} else {
			$(this).addClass("selected");
			deleteMcoInfo();
		}
	});
	$(".filterBox ul li.deleteNotice").find("a").on("mousedown", function() {
		$(this).addClass('selected');
	});
	$(".filterBox ul li.deleteNotice").find("a").on("mouseup", function() {
		$(this).removeClass('selected');
	});
	$(".filterBox ul li.markCompleted").find("a").on("mousedown", function() {
		$(this).addClass('selected');
	});
	$(".filterBox ul li.markCompleted").find("a").on("mouseup", function() {
		$(this).removeClass('selected');
	});
}
//删除
function deleteMcoInfo() {
	$(".filterBox ul li.deleteNotice a").on("click", function() {
		$(".confirmNoticeInfo").css("display", "block");
		$(".confirmNoticeInfo").addClass("deleteMcoInfo");
		$(".confirmNoticeInfo").removeClass("postMcoInfo");
		$(".confirmNoticeInfo").removeClass("markMcoInfo");
		$(".deleteMcoInfo").find("p.confirmNotice").text("确认删除");
		//确认
		$(".deleteMcoInfo").find("p.actionBox").find("button.actionConfirm").unbind("click").on("click", function() {
			for(var i = 0; i < $("li.listDetail dl.selected").length; i++) {
				var mco_id = $("li.listDetail dl.selected").eq(i).find("dd.mco_ID")[0].innerText;
				var url = location.protocol.concat("//").concat(location.host).concat('/database/Other/MCO/deleteMCO.php');
				$.ajax({
					url: url,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					type: 'POST',
					data: {
						mco_id: mco_id
					},
					success: function(response) {
						location.reload();
					},
					error: function(jqXHR, textStatus, errorThrown) {
						console.log(textStatus, errorThrown);
					}
				});
			}
		});
		//取消
		$(".deleteMcoInfo").find("p.actionBox").find("button.actionCancel").unbind("click").on("click", function() {
			$(".deleteMcoInfo").css("display", "none");
		});
	});

}
//标记为已完成
function markCompleted() {
	$(".filterBox ul li.markCompleted a").on("click", function() {
		$(".confirmNoticeInfo").css("display", "block");
		$(".confirmNoticeInfo").addClass("markMcoInfo");
		$(".confirmNoticeInfo").removeClass("deleteMcoInfo");
		$(".confirmNoticeInfo").removeClass("postMcoInfo");
		$(".markMcoInfo").find("p.confirmNotice").html("标记后无法更改和查看<br>是否标记？");
		//确认
		$(".markMcoInfo").find("p.actionBox").find("button.actionConfirm").unbind("click").on("click", function() {
			for(var i = 0; i < $("li.listDetail dl.selected").length; i++) {
				var mco_id = $("li.listDetail dl.selected").eq(i).find("dd.mco_ID")[0].innerText;
				var url = location.protocol.concat("//").concat(location.host).concat('/database/Other/MCO/markMCO.php');
				$.ajax({
					url: url,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					type: 'POST',
					data: {
						mco_id: mco_id
					},
					success: function(response) {
						location.reload();
					},
					error: function(jqXHR, textStatus, errorThrown) {
						console.log(textStatus, errorThrown);
					}
				});
			}
		});
		//取消
		$(".markMcoInfo").find("p.actionBox").find("button.actionCancel").unbind("click").on("click", function() {
			$(".markMcoInfo").css("display", "none");
		});
	});
}
function autoHeight() {
	var mcoContent = $("ul.listInfo li.listDetail").find("dd.mco_content");
	var mcoBankCard = $("ul.listInfo li.listDetail").find("dd.mco_bankCard");
	var mcoTime = $("ul.listInfo li.listDetail").find("dd.mco_time");
	var mcoAuthor = $("ul.listInfo li.listDetail").find("dd.mco_author");
	var mcoID = $("ul.listInfo li.listDetail").find("dd.mco_ID");
	for(var j = 0; j < mcoContent.length; j++) {
		var maxHeight = Math.max($(mcoContent[j]).height(), $(mcoBankCard[j]).height(), $(mcoTime[j]).height(), $(mcoAuthor[j]).height(), $(mcoID[j]).height());
		if(maxHeight > 32) {
			$("ul.listInfo li.listDetail").eq(j).find("dl").find("dd").css({
				"height": maxHeight,
			});
		}
	}
}
//发布
function postMcoInfo() {
	$(".rightInfoCard.mcoManage_rightInfo ul li.actionFilerBox").find("a.filterInfo").on("click", function() {
		var flag = false;
		$(".rightInfoCard.mcoManage_rightInfo ul  li.requiredItem").find("input").each(function(i, item) {
			if($(item).val() == "") {
				flag = true;
			}
		});
		if(flag == true||$(".rightInfoCard.mcoManage_rightInfo ul li.requiredItem").find("textarea").val()=="") {
			alert("请确认必填信息已填写完整");
		}
		else {
			$(".confirmMcoInfo").css("display", "block");
			$(".confirmNoticeInfo").css("display", "block");
			$(".confirmNoticeInfo").addClass("postMcoInfo");
			$(".confirmNoticeInfo").removeClass("deleteMcoInfo");
			$(".confirmNoticeInfo").removeClass("markMcoInfo");
			$(".postMcoInfo").find("p.confirmNotice").text("确认发布");
			//确认
			$(".postMcoInfo").find("p.actionBox").find("button.actionConfirm").unbind("click").on("click", function() {
				var data = {
					user_id: $("#mco_receiver").val(),
					mco_expired_time: $("#mco_expired_time").val(),
					card_holder: $("#card-holder").val(),
					card_number: $("#card-number").val(),
					expired_date: $("#expired-date-month").val() + $("#expired-date-year").val(),
					security_code: $("#security-code").val(),
					charging_amount: $("#charging-amount").val(),
					currency: $("#currency").val(),
					billing_phone: $("#billing-phone").val(),
					billing_address: $("#billing-address").val(),
					note: $("#mco-note").val()
				}

				var url = location.protocol.concat("//").concat(location.host).concat('/database/Other/MCO/createMCO.php');
				$.ajax({
					url: url,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					type: 'POST',
					data: data,
					success: function(response) {
						location.reload();
					},
					error: function(jqXHR, textStatus, errorThrown) {
						console.log(textStatus, errorThrown);
					}
				});
			});
			//取消
			$(".postMcoInfo").find("p.actionBox").find("button.actionCancel").on("click", function() {
				$(".postMcoInfo").css("display", "none");
			});
		}

	});
}
//重置
function resetInfo(){
	$(".rightInfoCard.mcoManage_rightInfo ul li.actionFilerBox").find("a.resetInfo").on("click", function() {
		resetMcoInfo();
	});
}
function resetMcoInfo(){
	$(".rightInfoCard.mcoManage_rightInfo").find("input").val("");
	$(".rightInfoCard.mcoManage_rightInfo").find("textarea").val("");
	$(".rightInfoCard.mcoManage_rightInfo").find("select").val($(".rightInfoCard.mcoManage_rightInfo").find("select").find("option").first().val());
}
function loadNotExpiredMCO() {
	$("ul.defaultList").find("li.listDetail").remove();
	var url = location.protocol.concat("//").concat(location.host).concat('/database/Other/MCO/getNotExpiredMCOCount.php');
	$.ajax({
		url: url,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		type: 'GET',
		data: {},
		success: function(response) {
			$("ul.defaultList").find("li.listDetail").remove();
			$('#mcoPagination').pagination({
				totalData: response,
				showData: 10,
				current: 0,
				coping: true,
				homePage: '首页',
				endPage: '末页',
				prevContent: '上页',
				nextContent: '下页',
				callback: function(api) {
					var j = api.getCurrent(); //获取当前页
					$("ul.defaultList").find("li.listDetail").remove();
					var url = location.protocol.concat("//").concat(location.host).concat('/database/Other/MCO/getNotExpiredMCO.php');
					$.ajax({
						url: url,
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						type: 'GET',
						data: {
							offset: (j - 1) * 10
						},
						success: function(response) {
//							console.log(response);
							response = JSON.parse(response);
							notExpiredMCO = response;
							for(var i = 0; i < notExpiredMCO.length; i++) {
								var html = `
									<li class="listDetail">
										<dl>
											<dd class="mco_ID">` + response[i]['notice_id'] + `</dd>
											<dd class="mco_author">` + response[i]['edited_by'] + `</dd>
											<dd class="mco_receiver"></dd>
											<dd class="mco_time">` + response[i]['create_time'] + `</dd>
											<dd class="mco_bankCard">` + response[i]['content'] + `</dd>
											<dd class="mco_content">` + response[i]['note'] + `</dd>
										</dl>
									</li>
								`;
								$("ul.defaultList").append(html);
								autoHeight();
								heightRange();
							}
						},
						error: function(jqXHR, textStatus, errorThrown) {
							console.log(textStatus, errorThrown);
						}
					});
					heightRange();
				}
			});
			$('ul.pagination').find('a').click();
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(textStatus, errorThrown);
		}
	});
}
$(document).ready(function () {
	$("#mco_receiver").on('focus', function() {
	 var current_id = $(this).attr('id');
	 var url = location.protocol.concat("//").concat(location.host).concat('/database/autoComplete.php');
	 $.ajax({
		 url: url,
		 headers: {
			 'Content-Type': 'application/x-www-form-urlencoded'
		 },
		 type: 'POST',
		 data: {
			 target: 'user_id'
		 },
		 success: function(response) {
			 autocomplete(document.getElementById(current_id), JSON.parse(response));
		 },
		 error: function(jqXHR, textStatus, errorThrown) {
			 console.log(textStatus, errorThrown);
		 }
	 });
 	});

	loadNotExpiredMCO();

});
