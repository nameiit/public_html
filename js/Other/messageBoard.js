//留言板
function messageBoard() {
	autoWrap();
    autoHeight();
	addQuestion();
	answerQuestion();
	resolvedIssues();
	// confirmInfo();
	toUsersManagePage();
	applyTicket();
	autoCenter($(".messageBoard .rightMeaaageTab .applyTicketContent"));
	$(window).resize(function() {
		autoHeight();
		autoWrap();
	});
	$(".rightMeaaageTab").find(".detailMsg").find("ul").find("li").find("a.applyTicket").on("mousedown", function() {
		$(this).addClass("selected");
	});
	$(".rightMeaaageTab").find(".detailMsg").find("ul").find("li").find("a.applyTicket").on("mouseup", function() {
		$(this).removeClass("selected");
	});
	// questionTitleInfo();
	loadQuestions();

	$("#travel-agency-search").on('click', function() {
		var agency_name = $("#travel_agency").val();
		loadQuestions(agency_name);
	});
}

function loadQuestions(agency_name) {
	var url = location.protocol.concat("//").concat(location.host).concat('/database/Other/QuestionBoard.php');
	$.ajax({
		url: url,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		type: 'GET',
		data: {
			action: 'getQuestions',
			agency_name: agency_name
		},
		success: function(response) {
			response = JSON.parse(response);
			questions_list = response;
			$(".messageDetail").remove();
			if($(".messageBoard .leftMessageTab ul.problemMsg input[type='checkbox']").attr("checked")) {
				for(var i = 0; i < questions_list.length; i++) {
					if(questions_list[i]['question_status'] == 'pending') {
						var ask_name = "";
						if(questions_list[i]['salesperson_code'] == null) {
							ask_name = questions_list[i]['agency_name'];
						} else {
							ask_name = questions_list[i]['salesperson_code'];
						}
						var ans_content;
						if(questions_list[i]['answer_content'] == null) {
							ans_content = "";
						} else {
							ans_content = questions_list[i]['answer_content'];
						}
//						console.log(questions_list[i]['question_content']);
						$html = `
						<li class="messageDetail">
							<dl >
								<dd class="questionId" style="display: none"> ` + questions_list[i]['question_id'] + `</dd>
								<dd class="askItem">` + ask_name + `</dd>
								<dd class="askTime">` + questions_list[i]['question_time'] + `</dd>
								<dd class="problemContent">` + questions_list[i]['question_title'] + `</dd>
								<dd class="moreInfo">` +questions_list[i]['question_content']+ `</dd>
								<dd class="answerInfo">` + ans_content + `</dd>
							</dl>
						</li>`;
						$(".messageCard").append($html);
					}
				}
			} else {
				for(var i = 0; i < questions_list.length; i++) {
					var ask_name = "";
					if(questions_list[i]['salesperson_code'] == null) {
						ask_name = questions_list[i]['agency_name'];
					} else {
						ask_name = questions_list[i]['salesperson_code'];
					}
					var ans_content;
					if(questions_list[i]['answer_content'] == null) {
						ans_content = "";
					} else {
						ans_content = questions_list[i]['answer_content'];
					}
					var $html = `<li class="messageDetail">`;
					if(questions_list[i]['question_status'] == 'solved') {
						$html = `<li class="messageDetail resolved">`;
					}
					$html += `
						<dl >
							<dd class="questionId" style="display: none"> ` + questions_list[i]['question_id'] + `</dd>
							<dd class="askItem">` + ask_name + `</dd>
							<dd class="askTime">` + questions_list[i]['question_time'] + `</dd>
							<dd class="problemContent">` + questions_list[i]['question_title'] + `</dd>
							<dd class="moreInfo">` + questions_list[i]['question_content'] + `</dd>
							<dd class="answerInfo">` + ans_content + `</dd>
						</dl>
					</li>`;
					
					$(".messageCard").append($html);
				}
			}
			heightRange();
			autoHeight();
			autoWrap();
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(textStatus, errorThrown);
		}
	});
}

function heightRange() {
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
}
//文字换行
function autoWrap() {
	for(var i = 0; i < $("ul.messageCard li.messageDetail").length; i++) {
		var dlHeight = $("ul.messageCard li.messageDetail").eq(i).find("dl").height();
//		$("ul.messageCard li.messageDetail").eq(i).find("dl").find("dd").css("height", dlHeight + "px");
//		$("ul.messageCard li.messageDetail").eq(i).find("dl").find("dd").css("overflow", "hidden");
		if($("ul.messageCard li.messageDetail").eq(i).find("dl").find("dd").css("height")=="38px"){
			$("ul.messageCard li.messageDetail").eq(i).find("dl").find("dd").css("line-height","38px");
		}
	}
}

function autoHeight() {
	var askItem = $("ul.messageCard li dd.askItem");
	var askTime = $("ul.messageCard li dd.askTime");
	var problemContent = $("ul.messageCard li dd.problemContent");
	var moreInfo = $("ul.messageCard li dd.moreInfo");
	var answerInfo = $("ul.messageCard li dd.answerInfo");
	for(var j = 0; j < askItem.length; j++) {
		var maxHeight = Math.max($(askItem[j]).height(), $(askTime[j]).height(), $(problemContent[j]).height(), $(moreInfo[j]).height(),
			$(answerInfo[j]).height());
		if(maxHeight > 42) {
			$("ul.messageCard li").eq(j).find("dl").find("dd").css({
				"line-height": 32 + "px",
				"height": maxHeight
			});
		}
		
	}


}


//添加问题部分
function addQuestion() {
	$("ul.answerAndAdd li.addItem").on("click", function() {
		$(this).addClass("selected");
		$(".detailMsg.addCard").css("display", "inline-block");
		$(".detailMsg.answerCard").css("display", "none");
		$(".detailMsg.resolvedCard").css("visibility", "hidden");
		$("ul.answerAndAdd li.answerItem").removeClass("selected");
		$("ul.messageCard li.messageDetail").removeClass("selected");
		$(".rightMeaaageTab").find(".detailMsg.addCard").find("ul").find("li").find("textarea").val("");
		heightRange();
	});
	//添加
	$(".rightMeaaageTab .detailMsg.addCard ul li.actionFilerBox").find("a:first").unbind("click").on("click", function() {
		var questionTxt = $.trim($(".rightMeaaageTab .detailMsg ul li.questionInfoTxt").find("textarea").val());
		var moreTxt = $.trim($(".rightMeaaageTab .detailMsg ul li.moreInfoTxt").find(".moreInfo_content").html());
		var typeInfo = $(".filterMessage ul li select").val();
		var salesName = $(".filterMessage ul li input").val();
		if(questionTxt !== "") {
			$(".confirmUsersInfo").css("display", "block");
			//确认发布:
			$(".confirmUsersInfo").find("p.actionBox").find("button.actionConfirm").unbind("click").on("click", function() {
				var url = location.protocol.concat("//").concat(location.host).concat('/database/Other/QuestionBoard.php');
				$.ajax({
					url: url,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					type: 'POST',
					data: {
						action: 'createQuestion',
						title: questionTxt,
						content: moreTxt
					},
					success: function(response) {
						location.reload();
					},
					error: function(jqXHR, textStatus, errorThrown) {
						console.log(textStatus, errorThrown);
					}
				});
				autoHeight();
				answerQuestion();
				heightRange();
				autoWrap();
			});
			//取消:
			$(".confirmUsersInfo").find("p.actionBox").find("button.actionCancel").unbind("click").on("click", function() {
				$(".confirmUsersInfo").css("display", "none");
			});

		} else {
			alert("请确认标题信息已经填写");
		}

	});
	//清空
	$(".rightMeaaageTab .detailMsg.addCard ul li.actionFilerBox").find("a:last").on("click", function() {
		$(".rightMeaaageTab .detailMsg ul li.questionInfoTxt").find("textarea").val("");
		//		$(".rightMeaaageTab .detailMsg ul li.moreInfoTxt").find("textarea").val("");
		//		$(".rightMeaaageTab .detailMsg ul li.moreInfoTxt").find("textarea").attr("disabled",false);
		$(".rightMeaaageTab .detailMsg ul li.moreInfoTxt").find(".moreInfo_content").html("");
		$(".rightMeaaageTab .detailMsg ul li.moreInfoTxt").find(".moreInfo_content").attr("contenteditable", true);
		heightRange();
	});
}
//解答问题部分
function answerQuestion() {
	$(document).on('click', 'ul.messageCard li.messageDetail', function() {
		var thisLi = $(this);
		var questionId = $(this).find(".questionId")[0].innerHTML;
		if($(this).hasClass("selected")) {
			$(this).removeClass("selected");
		} else {
			$(this).addClass("selected");
			$(this).siblings().removeClass("selected");
			$(".detailMsg.addCard").css("display", "none");
			$(".detailMsg.resolvedCard").css("visibility", "hidden");
			$(".detailMsg.answerCard").css("display", "inline-block");
			$(".rightMeaaageTab").find(".detailMsg.answerCard").find("ul").find("li").find("textarea").val("");
			$("ul.answerAndAdd li.answerItem").addClass("selected");
			$("ul.answerAndAdd li.addItem").removeClass("selected");
			var questionTxt = $.trim($(this).find("dd.problemContent").text());
			var moreTxt = $.trim($(this).find("dd.moreInfo").html());
			$("p.answerTxt").html(questionTxt);
			$("p.answerMoreInfo").html(moreTxt);
			heightRange();
			//回复
			$(".detailMsg.answerCard").find("ul li.actionFilerBox").find("a:first").unbind("click").on("click", function() {
				var replyTxt = $(".detailMsg.answerCard").find("textarea").val();
				thisLi.find("dl").find("dd.answerInfo").text(replyTxt);
				autoHeight();
				autoWrap(); //回复文字换行
				$("ul.messageCard").find("li.messageDetail.selected").find("dl").find("dd.answerInfo").css({
					"width": "22%",
					"padding-left": "1%",
					"text-align": "left"
				});
				var url = location.protocol.concat("//").concat(location.host).concat('/database/Other/QuestionBoard.php');
				$.ajax({
					url: url,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					type: 'POST',
					data: {
						action: 'answerQuestion',
						questionId: questionId,
						answerContent: replyTxt
					},
					success: function(response) {
						loadQuestions();
						$("ul.answerAndAdd li.addItem").click();
						heightRange();
					},
					error: function(jqXHR, textStatus, errorThrown) {
						console.log(textStatus, errorThrown);
					}
				});
			});
			//清空
			$(".detailMsg.answerCard").find("ul li.actionFilerBox").find("a:last").on("click", function() {
				$(".detailMsg.answerCard").find("textarea").val("");
			});
		}
	});
}
//确认
function confirmInfo() {
	$(".filterMessage ul li select").find("option").on("mouseenter", function() {
		$(this).addClass("hover");
	});
	$(".filterMessage ul li").find("a").on("click", function() {
		var typeInfo = $(".filterMessage ul li select").val();
		var salesInfo = $(".filterMessage ul li input[type=text]").val();
		console.log(typeInfo + "\n" + salesInfo);
	});
	$(".filterMessage ul li").find("a").on("mousedown", function() {
		$(this).addClass("selected");
	});
	$(".filterMessage ul li").find("a").on("mouseup", function() {
		$(this).removeClass("selected");
	});
}

//已解决的问题
function resolvedIssues() {
	$(".messageBoard .leftMessageTab ul.problemMsg input[type='checkbox']").on("click", function() {
		$("p.answerTxt").html("");
		$("p.answerMoreInfo").html("");
		$(".messageDetail").remove();
		//		heightRange();
		//未选中状态
		if(!$(this).attr("checked")) {
			$("ul.messageCard li.messageDetail").removeClass("selected");
			$(this).parent().parent("ul.problemMsg").find("li:last").css("visibility", "visible");

			for(var i = 0; i < questions_list.length; i++) {
				var ask_name = "";
				if(questions_list[i]['salesperson_code'] == null) {
					ask_name = questions_list[i]['agency_name'];
				} else {
					ask_name = questions_list[i]['salesperson_code'];
				}
				var ans_content;
				if(questions_list[i]['answer_content'] == null) {
					ans_content = "";
				} else {
					ans_content = questions_list[i]['answer_content'];
				}
				var $html = `<li class="messageDetail">`;
				if(questions_list[i]['question_status'] == 'solved') {
					$html = `<li class="messageDetail resolved">`;
				}
				$html += `
					<dl >
						<dd class="questionId" style="display: none"> ` + questions_list[i]['question_id'] + `</dd>
						<dd class="askItem">` + ask_name + `</dd>
						<dd class="askTime">` + questions_list[i]['question_time'] + `</dd>
						<dd class="problemContent">` + questions_list[i]['question_title'] + `</dd>
						<dd class="moreInfo">` + questions_list[i]['question_content'] + `</dd>
						<dd class="answerInfo">` + ans_content + `</dd>
					</dl>
				</li>`;
				$(".messageCard").append($html);
				autoHeight();
				autoWrap();
				heightRange();
			}
			$(document).on('click', 'ul.messageCard  li.messageDetail', function() {
				if($(this).hasClass("resolved")) {
					$(".detailMsg.addCard").css("display", "none");
					$(".detailMsg.answerCard").css("display", "none");
					$(".detailMsg.resolvedCard").css("visibility", "visible");
					$(".rightMeaaageTab .detailMsg.resolvedCard").find("ul").find("li.actionFilerBox").find("a");
					//已解决问题信息详情
					var questionTxt = $.trim($(this).find("dd.problemContent").text());
					var moreTxt = $.trim($(this).find("dd.moreInfo").text());
					var answer = $.trim($(this).find("dd.answerInfo").text());
					$("p.answerTxt").html(questionTxt);
					$("p.answerMoreInfo").html(moreTxt);
					$("p.answer").html(answer);
				} else {
					$(".detailMsg.addCard").css("display", "none");
					$(".detailMsg.answerCard").css("display", "visible");
					$(".detailMsg.resolvedCard").css("visibility", "none");
				}
			});

		} else {
			$(this).parent().parent("ul.problemMsg").find("li:last").css("visibility", "hidden");
			for(var i = 0; i < questions_list.length; i++) {
				if(questions_list[i]['question_status'] == 'pending') {
					var ask_name = "";
					if(questions_list[i]['salesperson_code'] == null) {
						ask_name = questions_list[i]['agency_name'];
					} else {
						ask_name = questions_list[i]['salesperson_code'];
					}
					var ans_content;
					if(questions_list[i]['answer_content'] == null) {
						ans_content = "";
					} else {
						ans_content = questions_list[i]['answer_content'];
					}
					$html = `
					<li class="messageDetail">
						<dl >
							<dd class="questionId" style="display: none"> ` + questions_list[i]['question_id'] + `</dd>
							<dd class="askItem">` + ask_name + `</dd>
							<dd class="askTime">` + questions_list[i]['question_time'] + `</dd>
							<dd class="problemContent">` + questions_list[i]['question_title'] + `</dd>
							<dd class="moreInfo">` + questions_list[i]['question_content'] + `</dd>
							<dd class="answerInfo">` + ans_content + `</dd>
						</dl>
					</li>`;

					$(".messageCard").append($html);
					autoHeight();
					autoWrap();
					heightRange();
				}
			}
		}
	});
}
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

//申请机票行程
function applyTicket() {
	$(".rightMeaaageTab .detailMsg ul li").find("a.applyTicket").on("click", function() {
		autoCenter($(".messageBoard .rightMeaaageTab .applyTicketContent"));
		$(".messageBoard .rightMeaaageTab .applyTicketContent").css("display", "block");
		submitApplyInfo();
	});
	$(".messageBoard .rightMeaaageTab .applyTicketContent").find("p").find("img.close").on("click", function() {
		$(".messageBoard .rightMeaaageTab .applyTicketContent").css("display", "none");
		setTimeout(function() {
			$(".messageBoard .rightMeaaageTab .applyTicketContent").find("ul.nav").find("li").first().addClass("selected");
			$(".messageBoard .rightMeaaageTab .applyTicketContent").find("ul.nav").find("li").first().siblings().removeClass("selected");
			$(".messageBoard .rightMeaaageTab .applyTicketContent").find(".tab-item").first().addClass("selected");
			$(".messageBoard .rightMeaaageTab .applyTicketContent").find(".tab-item").first().siblings().removeClass("selected");
			$(".messageBoard .rightMeaaageTab .applyTicketContent .tab-item form ul li.remove").parent("ul").remove();
		}, 1000);
		$(".messageBoard .rightMeaaageTab .applyTicketContent").find("input").val("");
	});
	$(".messageBoard .rightMeaaageTab .applyTicketContent").find("ul.nav").find("li").on("click", function() {
		if(!$(this).hasClass("selected")) {
			$(this).addClass("selected");
			$(this).siblings("li").removeClass("selected");
		}
		var index = $(this).index();
		$(".messageBoard .rightMeaaageTab .applyTicketContent").find(".tab-item").eq(index).addClass("selected");
		$(".messageBoard .rightMeaaageTab .applyTicketContent").find(".tab-item").eq(index).siblings().removeClass("selected");
		autoCenter($(".messageBoard .rightMeaaageTab .applyTicketContent"));
		submitApplyInfo();
	});
	//添加机票行程
	$(".messageBoard .rightMeaaageTab .applyTicketContent").find(".tab-item.multipleJourney").find("a.addJourney").on("click", function() {
		var e = '<ul>' +
			'<li>' +
			'<dl>' +
			'<dd><span class="mark"><img src="../img/required.png" /></span><span class="title titleOffset">启程日期</span></dd>' +
			'<dd><input type="date"  class="departureDate_multiple"  /></dd>' +
			'</dl>' +
			'</li>' +
			'<li>' +
			'<dl>' +
			'<dd><span class="mark"><img src="../img/required.png" /></span><span class="title titleOffset">出发地</span></dd>' +
			'<dd><input type="text"  placeholder="请输入城市或者机场名称" class="departurePlace_multiple"/></dd>' +
			'</dl>' +
			'</li>' +
			'<li class="rightOffset">' +
			'<dl>' +
			'<dd><span class="mark"><img src="../img/required.png" /></span><span class="title titleOffset">抵达地</span></dd>' +
			'<dd><input type="text"  placeholder="请输入城市或者机场名称" class="destination_multiple"/></dd>' +
			'</dl>' +
			'</li>' +
			'<li class="remove"><img src="../img/removeIcon.png"></li>' +
			'</ul>';
		$(".multipleJourney").find(".departureInfo").append(e);
		autoCenter($(".messageBoard .rightMeaaageTab .applyTicketContent"));
		//删除已添加
		$(".messageBoard .rightMeaaageTab .applyTicketContent .tab-item form ul li.remove").unbind("click").on("click", function() {
			$(this).parent("ul").remove();
			autoCenter($(".messageBoard .rightMeaaageTab .applyTicketContent"));
		});
	});
}

function autoCenter(el) {
	var bodyW = $(window).outerWidth(true);
	var bodyH = $(window).outerHeight(true);
	var elW = el.outerWidth(true);
	var elH = el.outerHeight(true);
	el.css({
		"left": (bodyW - elW) / 2 + 'px',
		"top": (bodyH - elH) / 2 + 'px'
	});
};
//提交
function submitApplyInfo() {
	$(".applyTicketContent .tab-content .tab-item.selected").find("a.submit").on("click", function() {
		var applyType = $(".messageBoard .rightMeaaageTab .applyTicketContent ul.nav li.selected").text();
		if(applyType == "单程") {
			getSingleTripInfo();
		}
		if(applyType == "往返") {
			getRoundTripInfo();
		}
		if(applyType == "多程") {
			multipleJourney();
		}
	});
}
//单程
function getSingleTripInfo() {
	//启程日期
	var departureDate = $("input[type='date'].departureDate_single").val();
	//出发地
	var departure = $("input.departurePlace_single").val();
	//抵达地
	var destination = $("input.destination_single").val();
	//出发时间
	var departureTime = $("input.departureTime_single").val();
	//抵达时间
	var arrivalTime = $("input.arrivalTime_single").val();
	//舱位
	var shippingSpace = $("select.shippingSpaceInfo").val();
	//人数
	var peopleNum = $("input.peopleNum_single").val();
	//其他需求
	var otherDemand = $("input.otherDemand_single").val();
	if(departureDate == "" || departure == "" || destination == "") {
		alert("请确认必填项已填写完整");
	} else {
		var singleTrip_text = "启程日期:&nbsp;&nbsp;" + departureDate + "<br>出发地:&nbsp;&nbsp;" + departure + "<br>抵达地:&nbsp;&nbsp;" + destination + "<br>舱位:&nbsp;&nbsp;" + shippingSpace;
		if(departureTime !== "") {
			singleTrip_text = singleTrip_text + "<br>出发时间:&nbsp;&nbsp;" + departureTime;
		}
		if(arrivalTime !== "") {
			singleTrip_text = singleTrip_text + "<br>抵达时间:&nbsp;&nbsp;" + arrivalTime;
		}
		if(otherDemand !== "") {
			singleTrip_text = singleTrip_text + "<br>其他需求:&nbsp;&nbsp;" + otherDemand;
		}
		if(peopleNum !== "") {
			singleTrip_text = singleTrip_text + "<br>人数:&nbsp;&nbsp;" + peopleNum;
		}
		$(".detailMsg.addCard ul li.moreInfoTxt").find(".moreInfo_content").html(singleTrip_text);
		$(".detailMsg.addCard ul li.moreInfoTxt").find(".moreInfo_content").attr("contenteditable", "false");
		heightRange();
		resetApplyInfo();
	}
}
//往返
function getRoundTripInfo() {
	//启程日期
	var departureDate = $("input[type='date'].departureDate_round").val();
	//出发地
	var departure = $("input.departurePlace_round").val();
	//返程日期
	var returnDate = $("input.returnDate_round").val();
	//抵达地
	var destination = $("input.destination_round").val();
	//出发时间
	var departureTime = $("input.departureTime_round").val();
	//抵达时间
	var arrivalTime = $("input.arrivalTime_round").val();
	//舱位
	var shippingSpace = $("select.shippingSpaceInfo_round").val();
	//人数
	var peopleNum = $("input.peopleNum_round").val();
	//其他需求
	var otherDemand = $("input.otherDemand_round").val();
	if(departureDate == "" || departure == "" || destination == "" || returnDate == "") {
		alert("请确认必填项已填写完整");
	} else {
		var roundTrip_text = "启程日期:&nbsp;&nbsp;" + departureDate + "<br>出发地:&nbsp;&nbsp;" + departure + "<br>返程日期:&nbsp;&nbsp;" + returnDate + "<br>抵达地:&nbsp;&nbsp;" + destination + "<br>舱位:&nbsp;&nbsp;" + shippingSpace;
		if(departureTime !== "") {
			roundTrip_text = roundTrip_text + "<br>出发时间:&nbsp;&nbsp;" + departureTime;
		}
		if(arrivalTime !== "") {
			roundTrip_text = roundTrip_text + "<br>抵达时间:&nbsp;&nbsp;" + arrivalTime;
		}
		if(otherDemand !== "") {
			roundTrip_text = roundTrip_text + "<br>其他需求:&nbsp;&nbsp;" + otherDemand;
		}
		if(peopleNum !== "") {
			roundTrip_text = roundTrip_text + "<br>人数:&nbsp;&nbsp;" + peopleNum;
		}
		$(".detailMsg.addCard ul li.moreInfoTxt").find(".moreInfo_content").html(roundTrip_text);
		$(".detailMsg.addCard ul li.moreInfoTxt").find(".moreInfo_content").attr("contenteditable", "false");
		heightRange();
		resetApplyInfo();
	}
}
//多程
function multipleJourney() {
	//启程日期
	var departureDate = $("input[type='date'].departureDate_multiple");
	//出发地
	var departure = $("input.departurePlace_multiple");
	//抵达地
	var destination = $("input.destination_multiple");
	//出发时间
	var departureTime = $("input.departureTime_multiple").val();
	//抵达时间
	var arrivalTime = $("input.arrivalTime_multiple").val();
	//舱位
	var shippingSpace = $("select.shippingSpaceInfo_multiple").val();
	//人数
	var peopleNum = $("input.peopleNum_multiple").val();
	//其他需求
	var otherDemand = $("input.otherDemand_multiple").val();
	var departureDate_flag = false;
	var departure_flag = false;
	var destination_flag = false;
	departureDate.each(function(i, item) {
		if($(item).val() == "") {
			departureDate_flag = true;
		}
	});
	departure.each(function(i, item) {
		if($(item).val() == "") {
			departure_flag = true;
		}
	});
	destination.each(function(i, item) {
		if($(item).val() == "") {
			destination_flag = true;
		}
	});
	if(departureDate_flag == true || departure_flag == true || destination_flag == true) {
		alert("请确认必填项已填写完整");

	} else {
		var multiple_text = "";
		var multiple_text_item;
		for(var i = 0; i < departureDate.length; i++) {
			multiple_text_item = "行程" + Number(i + 1) + ":&nbsp;&nbsp;<br>" + "启程日期:&nbsp;&nbsp;" + departureDate.eq(i).val() + "<br>出发地:&nbsp;&nbsp;" + departure.eq(i).val() + "<br>抵达地:&nbsp;&nbsp;" + destination.eq(i).val() + "<br>舱位:&nbsp;&nbsp;" + shippingSpace;
			multiple_text = multiple_text + "<hr>" + multiple_text_item;
			if(departureTime !== "") {
				multiple_text = multiple_text + "<br>出发时间:&nbsp;&nbsp;" + departureTime;
			}
			if(arrivalTime !== "") {
				multiple_text = multiple_text + "<br>抵达时间:&nbsp;&nbsp;" + arrivalTime;
			}
			if(otherDemand !== "") {
				multiple_text = multiple_text + "<br>其他需求:&nbsp;&nbsp;" + otherDemand;
			}
			if(peopleNum !== "") {
				multiple_text = multiple_text + "<br>人数:&nbsp;&nbsp;" + peopleNum;
			}
		}
		console.log(multiple_text);
		$(".detailMsg.addCard ul li.moreInfoTxt").find(".moreInfo_content").html(multiple_text);
		$(".detailMsg.addCard ul li.moreInfoTxt").find(".moreInfo_content").attr("contenteditable", "false");
		heightRange();
		resetApplyInfo();
	}
}

function resetApplyInfo() {
	$(".messageBoard .rightMeaaageTab .applyTicketContent").css("display", "none");
	setTimeout(function() {
		$(".messageBoard .rightMeaaageTab .applyTicketContent").find("ul.nav").find("li").first().addClass("selected");
		$(".messageBoard .rightMeaaageTab .applyTicketContent").find("ul.nav").find("li").first().siblings().removeClass("selected");
		$(".messageBoard .rightMeaaageTab .applyTicketContent").find(".tab-item").first().addClass("selected");
		$(".messageBoard .rightMeaaageTab .applyTicketContent").find(".tab-item").first().siblings().removeClass("selected");
		$(".messageBoard .rightMeaaageTab .applyTicketContent .tab-item form ul li.remove").parent("ul").remove();
	}, 1000);
	$(".messageBoard .rightMeaaageTab .applyTicketContent").find("input").val("");
}

/*
//问题的标题信息
function questionTitleInfo() {
	removeTitleInfo();
	titleGroup();
	//新增
	$(".rightMeaaageTab").find(".detailMsg").find("ul").find("li.questionInfoTxt").find("ul.titleCard").find("li.addTitle").find("a").on("click", function() {
		if($(".rightMeaaageTab .detailMsg ul li.questionInfoTxt ul.titleCard li a").hasClass("hover")) {
			$(".rightMeaaageTab .detailMsg ul li.questionInfoTxt ul.titleCard li a").removeClass("hover");
			$(".rightMeaaageTab .detailMsg ul li.questionInfoTxt ul.titleCard li a").find("img").css("display", "none");
		} else {
			$(".rightMeaaageTab").find(".detailMsg").find("ul").find("li.questionInfoTxt").find("ul.titleCard").find("li.addBox").css("display", "inline-block");
			$(".rightMeaaageTab").find("li.addBox").find("input").on("keydown", function() {
				if(event.keyCode == 13) {
					var txt = $.trim($("li.addBox").find("input").val()); //当前输入框的值
					if(txt !== "") {
						var e = '<li class="titleItem"><a href="javascript:void(0);">' +
							txt + '<img src="../img/close_icon.png"  class="removeTitle"/>' +
							'</a></li>';
						$(".rightMeaaageTab").find("li.addBox").find("input").val("");
						$(".rightMeaaageTab").find("li.addBox").css("display", "none");
						$(".rightMeaaageTab").find(".detailMsg").find("ul").find("li.questionInfoTxt").find("ul.titleCard").find("li.addBox").before(e);
						removeTitleInfo();
						titleGroup();
						resolvedIssues();
					}
				}
			});
		}

	});
}
function removeTitleInfo() {
	$(".rightMeaaageTab").find(".detailMsg").find("ul").find("li.questionInfoTxt").find("ul.titleCard").find("li.remove").on("click", function() {
		$(".rightMeaaageTab").find(".detailMsg").find("ul").find("li.questionInfoTxt").find("ul.titleCard").find("li.addBox").css("display", "none");
		if($(this).siblings("li.titleItem").find("a").hasClass("hover")) {
			$(this).siblings("li.titleItem").find("img").css("display", "none");
			$(this).siblings("li.titleItem").find("a").removeClass("hover");
		} else {
			$(this).siblings("li.titleItem").find("img").css("display", "block");
			$(this).siblings("li.titleItem").find("a").addClass("hover");
		}
	});
	//移除
	$(".rightMeaaageTab").find(".detailMsg").find("ul").find("li.questionInfoTxt").find("ul.titleCard").find("li").find("a").find("img.removeTitle").on("click", function() {
		$(this).parent().parent("li").remove();
	});
}
function titleGroup() {
	$(".rightMeaaageTab").find("li.titleItem").on("click", function() {
		var txt = $(this).text();
		localStorage.setItem("titleInfo", $.trim(txt));
		var titleGroup = $(".rightMeaaageTab").find("textarea.titleInfo").val() + localStorage.getItem("titleInfo");
		$(".rightMeaaageTab").find("textarea.titleInfo").val(titleGroup);
		removeTitleInfo();
	});
}
*/
