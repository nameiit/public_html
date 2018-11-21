/*
 * 相关提醒
 */
function getNotice() {
 	var url = location.protocol.concat("//").concat(location.host).concat('/database/indexDB.php');
 	$.ajax({
 		url: url,
 		headers: {
 			'Content-Type': 'application/x-www-form-urlencoded'
 		},
 		type: 'POST',
 		data: {
 			action: 'getEventNotice'
 		},
 		success: function(response) {
 			$("ul.noticelist li.detailInfo").remove();
 			response = JSON.parse(response);

 			var $html = "";
 			for(var i = 0; i < response[0].length; i++) {
 				if(response[2][i] == "Y") {
 					$html = `
 							<li class="detailInfo">
 								<a href="javascript:void(0);">
 									<img src="img/top_icon.png" />
 									<label>&#12304;` + response[1][i] + `&#12305;</label>
 									<span>` + response[0][i] + `</span>
 								</a>
 							</li>
 					`;
 				} else {
 					var $html = "";
 					$html = `
 							<li class="detailInfo">
 								<a href="javascript:void(0);">
 									<label>&#12304;` + response[1][i] + `&#12305;</label>
 									<span>` + response[0][i] + `</span>
 								</a>
 							</li>
 					`;
 				}
 				$("ul.noticelist").append($html);
 			}
 			infoTips();

 			var len = $("ul.noticelist").find("li").length;
 			len = len + 1;
 			if(len >= 1 && len <= 6) {
 				$(".homePage").find(".otherUserInfo.noticeInfo").find("ul").css({
 					"overflow-y": "hidden",
 					"height": "auto"
 				});
 			} else if(len > 6) {
 				$(".homePage").find(".otherUserInfo.noticeInfo").find("ul").css({
 					"overflow-y": "scroll",
 					"height": "270px"
 				});
 			}
 		},
 		error: function(jqXHR, textStatus, errorThrown) {
 			console.log(textStatus, errorThrown);
 		}
 	});
 }

function infoTips() {
	$(".otherUserInfo.noticeInfo").find("ul").find("li").on("click", function() {
		var index = $(this).index();

		var titleInfo = $(this).find("a").find("label").text();
		titleInfo = titleInfo.substring(1, titleInfo.length - 1);
		titleInfo = $.trim(titleInfo);

		var content = $(this).find("a").find("span").text();
		layer.open({
			type: 1,
			skin: 'layui-layer-rim infoTips',
			title: titleInfo,
			area: ['252px', '224px'],
			btn: ['确定'],
			content: '<div class="text_box">' +
				'<form class="layui-form" action="">' +
				'<div class="layui-form-item layui-form-text">' +
				' <p>' + content + '</p>' +
				'</div>' +
				'</form>' +
				'</div>',
		});
	});
}
