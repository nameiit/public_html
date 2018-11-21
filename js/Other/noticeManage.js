$(function() {
	checkedState();
	listStatus();
	toUsersManagePage();
	receive_notice();
	autoHeight();
	noticeInfo();
	deleteNoticeInfo();
});

function listStatus() {
	$(document).on('click', 'ul.listInfo li.listDetail dl', function() {
		if($(this).hasClass("selected")) {
			$(this).removeClass("selected");
		} else {
			$(this).addClass("selected");
			deleteNoticeInfo();
		}
	});

	$(".leftInfoCard .checkbox.notice_status").find("input[type='checkbox']").on("change", function() {
		//未过期
		if($(this).attr("checked") == "checked") {
			$(".listInfo.defaultList").css("display", "block");
			$(".listInfo.disabledListInfo").css("display", "none");
			autoHeight();
			loadNotExpiredNotice();
		}
		//已过期
		else {
			$(".listInfo.disabledListInfo").css("display", "block");
			$(".listInfo.defaultList").css("display", "none");
			autoHeight_disabledListInfo();
			loadAllNotice();
			autoHeight_disabledListInfo();
		}
	});

	$(".filterBox ul li.mco_info").find("a").on("click", function() {
		if($(".filterBox ul li.mco_info a.selected").text() == "公告") {
			$(".filterBox ul li.deleteNotice a").css("display", "inline-block");
		}
		// if($(".filterBox ul li.mco_info a.selected").text() == "MCO") {
		// 	$(".filterBox ul li.deleteNotice a").css("display", "none");
		// }
		heightRange();
	});

	$("ul.addInfo li.receiver dl dd a").on("mousedown", function() {
		$(this).addClass('selected');
	});

	$("ul.addInfo li.receiver dl dd a").on("mouseup", function() {
		$(this).removeClass('selected');
	});

	$(".filterBox ul li.deleteNotice").find("a").on("mousedown", function() {
		$(this).addClass('selected');
	});

	$(".filterBox ul li.deleteNotice").find("a").on("mouseup", function() {
		$(this).removeClass('selected');
	});
}

//删除公告
function deleteNoticeInfo() {
	$(".filterBox ul li.deleteNotice a").on("click", function() {
		$(".confirmNoticeInfo").css("display", "block");
		$(".confirmNoticeInfo").addClass("deleteNoticeInfo");
		$(".confirmNoticeInfo").removeClass("postNoticeInfo");
		$(".deleteNoticeInfo").find("p.confirmNotice").text("确认删除");
		//确认
		$(".deleteNoticeInfo").find("p.actionBox").find("button.actionConfirm").unbind("click").on("click", function() {
			for(var i = 0; i < $("li.listDetail dl.selected").length; i++) {
				var notice_id = $("li.listDetail dl.selected").eq(i).find("dd.noticeID")[0].innerText;
				var url = location.protocol.concat("//").concat(location.host).concat('/database/Other/NoticeMessage/deleteNotice.php');
				$.ajax({
					url: url,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					type: 'POST',
					data: {
						notice_id: notice_id
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
		$(".deleteNoticeInfo").find("p.actionBox").find("button.actionCancel").unbind("click").on("click", function() {
			$(".deleteNoticeInfo").css("display", "none");
		});
	});

}

function receive_notice() {
	$("ul.addInfo li.receiver dl dd").find("select").on("change", function() {
		if($("#receiver").val() == "customize") {
			$("ul.addInfo li.receiver").find("input[type='text']").attr("disabled", false);
			$("ul.addInfo li.getReceiver").css("display", "block");
			$("ul.addInfo li.receiver dl dd:last-child").css("display", "inline-block");
			$("ul.addInfo li.receiver").find("input[type='text']").val("");
			//接受公告的人
			$("ul.addInfo li.receiver").find("input[type='text']").on("keyup", function() {
				if($("ul.addInfo li.receiver dl dd .autocomplete-items").find("div").find("strong").text() !== "No matched result") {
					$("ul.addInfo li.receiver dl dd a").on("click", function() {
						if($(this).parent("dd").find("input[type='text']").val() !== "") {
							var name_info = $.trim($(this).parent("dd").find("input[type='text']").val());
							name_info = name_info + ";";
							$("li.getReceiver").find("textarea").val($.trim($("li.getReceiver").find("textarea").val()) + name_info);
							$(this).parent("dd").find("input[type='text']").val("");
							$(this).parent("dd").find("input[type='text']").blur();
						}
					});
				} else {
					$("ul.addInfo li.receiver dl dd a").unbind("click").on("click", function() {
						var name_info = "";
						$("li.getReceiver").find("textarea").val($.trim($("li.getReceiver").find("textarea").val()) + name_info);
						$(this).parent("dd").find("input[type='text']").val("");
						$(this).parent("dd").find("input[type='text']").blur();
					});
				}
			})
		} else {
			$("ul.addInfo li.receiver").find("input[type='text']").attr("disabled", true);
			$("ul.addInfo li.getReceiver").css("display", "none");
			$("ul.addInfo li.getReceiver textarea").val("");
			$("ul.addInfo li.receiver dl dd:last-child").css("display", "none");
		}
		heightRange();
	});
	//类别
	$("ul.addInfo li.category select").on("change", function() {
		if($(this).find("option:selected").text() == "其他") {
			$("ul.addInfo li.category input.other_info").css("display", "inline-block");
		} else {
			$("ul.addInfo li.category input.other_info").css("display", "none");
		}
	});
}

function autoHeight() {
	//未过期
	var noticeBox = $("ul.listInfo.defaultList").find("li.listDetail").find("dl").find("dd.notice_content");
	for(var j = 0; j < noticeBox.length; j++) {
		if($(noticeBox[j]).height() > 42) {
			$("ul.listInfo.defaultList").find("li.listDetail").eq(j).find("dl").find("dd").css({
				"height": $(noticeBox[j]).height(),
			});
		}
	}
}

function autoHeight_disabledListInfo() {
	//过期
	var notice_Box = $("ul.listInfo.disabledListInfo").find("li.listDetail").find("dl").find("dd.notice_content"); //公告内容
	for(var i = 0; i < notice_Box.length; i++) {
		if($(notice_Box[i]).height() > 42) {
			$("ul.listInfo.disabledListInfo").find("li.listDetail").eq(i).find("dl").find("dd").css({
				"height": $(notice_Box[i]).height(),
			});
		}
	}

	var notice_Status = $("ul.listInfo.disabledListInfo").find("li.listDetail").find("dl").find("dd.status"); //过期
	for(var i = 0; i < notice_Status.length; i++) {
		if($(notice_Status[i]).height() > 42) {
			$("ul.listInfo.disabledListInfo").find("li.listDetail").eq(i).find("dl").find("dd").css({
				"height": $(notice_Status[i]).height(),
			});
		}
	}

}

function noticeInfo() {
	//清空
	$("ul.addInfo li.actionFilerBox a.resetInfo").on("click", function() {
		resetNoticeInfo();
	});
}

function resetNoticeInfo() {
	$("ul.addInfo li.notice_content textarea").val(""); //公告内容
}

function loadNotExpiredNotice() {
	$("ul.defaultList").find("li.listDetail").remove();
	var url = location.protocol.concat("//").concat(location.host).concat('/database/Other/NoticeMessage/getNotExpiredNoticeCount.php');
	$.ajax({
		url: url,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		type: 'GET',
		data: {},
		success: function(response) {
			console.log(response);
			$("ul.defaultList").find("li.listDetail").remove();
			$('#noticePagination').pagination({
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
					var url = location.protocol.concat("//").concat(location.host).concat('/database/Other/NoticeMessage/getNotExpiredNotice.php');
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
							response = JSON.parse(response);
							notExpiredNotice = response;
							for(var i = 0; i < notExpiredNotice.length; i++) {
								var html = `
									<li class="listDetail">
										<dl>
											<dd class="noticeID">` + response[i]['notice_id'] + `</dd>
											<dd class="notice_type">` + response[i]['category'] + `</dd>
											<dd class="notice_ author">` + response[i]['edited_by'] + `</dd>
											<dd class="notice_content">` + response[i]['content'] + `</dd>
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

function loadAllNotice() {
	var url = location.protocol.concat("//").concat(location.host).concat('/database/Other/NoticeMessage/getAllNoticeCount.php');
	$.ajax({
		url: url,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		type: 'GET',
		data: {},
		success: function(response) {
			$('#noticePagination').pagination({
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
					$("ul.disabledListInfo").find("li.listDetail").remove();
					var url = location.protocol.concat("//").concat(location.host).concat('/database/Other/NoticeMessage/getAllNotice.php');
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
							response = JSON.parse(response);
							allNotice = response;
							for(var i = 0; i < allNotice.length; i++) {
								var html = `
									<li class="listDetail">
										<dl>
											<dd class="noticeID">` + response[i]['notice_id'] + `</dd>
											<dd class="notice_type">` + response[i]['category'] + `</dd>
											<dd class="notice_author">` + response[i]['edited_by'] + `</dd>
											<dd class="notice_content">` + response[i]['content'] + `</dd>
											<dd class="status">` + response[i]['valid_until'] + `</dd>
										</dl>
									</li>
								`;
								$("ul.disabledListInfo").append(html);
								autoHeight_disabledListInfo();
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

$(document).ready(function() {
	$("#user_id").on('focus', function() {
		var current_id = $(this).attr('id');
		var target = 'user_id';

		var url = location.protocol.concat("//").concat(location.host).concat('/database/autoComplete.php');
		$.ajax({
			url: url,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			type: 'post',
			data: {
				target: target
			},
			success: function(response) {
				autocomplete(document.getElementById(current_id), JSON.parse(response));
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
	});

	loadNotExpiredNotice();

	function getNoticeData() {
		var category = $("#category").val();
		if(category == 'other') {
			category = $("#other_category").val();
		}

		var go_top = $("#top")[0]['checked'];
		if(go_top) {
			go_top = 'Y';
		} else {
			go_top = 'N';
		}

		var target = $("#receiver").val();
		if(target == 'customize') {
			target = $("#target_list").val();
		}

		var data = {
			category: category,
			valid_until: $("#valid_until").val(),
			go_top: go_top,
			target: target,
			notice_content: $("#notice_content").val()
		}

		return data;
	}

	$("#create_notice").on('click', function() {
		//有效期
		var expiryDate = $("input#valid_until").val();
		//公告内容
		var noticeContent = $("textarea#notice_content").val();
		//接受公告的人
		var noticeReceiver = $("textarea#target_list").val();
		if(expiryDate == "" || noticeContent == "" || (noticeReceiver == "" && $("select#receiver").val() == "customize")) {
			alert("请确认公告信息已填写完整");
		} else {
			$(".confirmNoticeInfo").css("display", "block");
			$(".confirmNoticeInfo").addClass("postNoticeInfo");
			$(".confirmNoticeInfo").removeClass("deleteNoticeInfo");
			$(".postNoticeInfo").find("p.confirmNotice").text("确认发布");
			//确认
			$(".confirmNoticeInfo").find("p.actionBox").find("button.actionConfirm").on("click", function() {
				var data = getNoticeData();
				var url = location.protocol.concat("//").concat(location.host).concat('/database/Other/NoticeMessage/createNotice.php');
				$.ajax({
					url: url,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					type: 'POST',
					data: data,
					success: function(response) {
						// console.log(response);
						$(".postNoticeInfo").css("display", "none");
						location.reload();
					},
					error: function(jqXHR, textStatus, errorThrown) {
						console.log(textStatus, errorThrown);
					}
				});
			});
			//取消
			$(".postNoticeInfo").find("p.actionBox").find("button.actionCancel").on("click", function() {
				$(".postNoticeInfo").css("display", "none");
			});
		}
	});
});
