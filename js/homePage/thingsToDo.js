/*
 * 待处理事项
 */
function addNewMatters() {
	layer.open({
		type: 1,
		title: '添加事项',
		skin: 'layui-layer-rim newMatters',
		area: ['400px', '320px'], //宽高
		btn: ['添加', '取消'],
		content: '<div class="text_box">' +
								'<form class="layui-form" action="">' +
									'<div class="layui-form-item layui-form-text">' +
										'<p class="title">标题</p>' +
										'<textarea id="text_book_title" placeholder=""  class="layui-textarea"></textarea>' +
										'<p class="title">内容' +
											'<span class="checkbox checkbox-success nm-right">' +
												'<input id="import" class="styled" type="checkbox">' +
												'<label for="import">重要</label>' +
											'</span>' +
										'</p>' +
										'<textarea id="text_book" placeholder=""  class="layui-textarea"></textarea>' +
									'</div>' +
								'</form>' +
							'</div>',
		yes: function(index) {
			var title = $.trim($(".newMatters").find("#text_book_title").val());
			var content = $.trim($(".newMatters").find("#text_book").val());
			var importance = document.getElementById("import");

			if(importance.checked != true) {
				importance = 'normal'
			} else {
				importance = 'highlight'
			}

			AddNewThing(title, content, importance, 'notice', 'no');

			layer.msg('添加成功', {
				icon: 1,
				time: 1000
			})
			layer.close(index);
		}
	});
	$(".layui-layer-rim").find(".layui-layer-btn").find("a").addClass("layui-col-md6");
	$(".layui-layer-rim").find(".layui-layer-btn").find("a").addClass("layui-col-sm6");
	$(".layui-layer-rim").find(".layui-layer-btn").find("a").addClass("layui-col-xs6");
	$(".layui-layer-btn.layui-layer-btn-").css("margin-top", "2px");
}

function AddNewThing(titlestr, contentstr, importance, typess, addtimes) {
	var url = location.protocol.concat("//").concat(location.host).concat('/database/Other/ThingsToDo/createThingsToDo.php');
	$.ajax({
		url: url,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		type: 'POST',
		data: {
			title: titlestr,
			content: contentstr,
			important: importance,
			type: typess,
			addtime: addtimes
		},
		success: function(response) {
			getThingsToDo();
			console.log(response);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(textStatus, errorThrown);
		}
	});
}

function getThingsToDo() {
	$("ul.ttolist li.tothing").remove();
	var url = location.protocol.concat("//").concat(location.host).concat('/database/Other/ThingsToDo/getThingsToDo.php');
	$.ajax({
		url: url,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		type: 'GET',
		data: {},
		success: function(response) {
			response = JSON.parse(response);

			var pendinglen = response[0].length;
			var $countpending = `待处理事项：<span>` + pendinglen + `</span>`;
			$("li.pendingcount").append($countpending);

			var ttocontent = {};
			var ttotid = {};
			var ttoimportance = {};

			for(var i = 0; i < response[0].length; i++) {
				var $html = '';
				if(response[3][i] == 'normal') {
					$html = `
						<li class = "tothing">
							<a href="javascript:void(0);">
								<span>` + response[1][i] + `</span>
							</a>
						</li>`;
				} else {
					$html = `
						<li class = "tothing">
							<a href="javascript:void(0);">
								<i></i>
								<span>` + response[1][i] + `</span>
							</a>
						</li>`;
				}
				$("ul.ttolist").append($html);
				ttocontent[response[1][i]] = response[2][i];
				ttotid[response[1][i]] = response[0][i];
				ttoimportance[response[1][i]] = response[3][i];
			}

			showttocontent(ttocontent, ttotid, ttoimportance);
			var l = $("ul.ttolist").find("li").length;
			l = l + 1;
			if(l >= 1 && l <= 5) {
				$(".homePage").find(".otherUserInfo.pendingItem").find("ul").css({
					"overflow-y": "hidden",
					"height": "auto"
				});
			} else if(l > 5) {
				$(".homePage").find(".otherUserInfo.pendingItem").find("ul").css({
					"overflow-y": "scroll",
					"height": "246px"
				});
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(textStatus, errorThrown);
		}
	});
}

function showttocontent(stringvar, idvar, importanceVar) {
	$(".otherUserInfo.pendingItem").find("ul").find("li").on("click", function() {
		var index = $(this).index();

		var titleInfo = $(this).find("a").find("span").text();
		titleInfo = titleInfo.replace("[", "");
		titleInfo = titleInfo.replace("]", "");
		titleInfo = $.trim(titleInfo);
		var content = stringvar[titleInfo];
		var ttoid = idvar[titleInfo];
		var importance = importanceVar[titleInfo];
		if (importance == 'highlight') {
			importance = 'checked';
		} else {
			importance = '';
		}
		var thisLi = $(this);

		layer.open({
			type: 1,
			skin: 'layui-layer-rim amendMatters',
			title: titleInfo,
			area: ['400px', '320px'],
			btn: ['修改', '取消', '删除'],
			content:
				'<div class="text_box">' +
					'<form class="layui-form" action="">' +
						'<div class="layui-form-item layui-form-text">' +
							'<p class="title">标题</p>' +
								'<textarea id="text_book_title" placeholder=""  class="layui-textarea">' + titleInfo + '</textarea>' +
								'<p class="title">内容' +
									'<span class="checkbox checkbox-success nm-right">' +
										'<input id="import" class="styled" type="checkbox"' + importance + '>' +
										'<label for="import">重要</label>' +
									'</span>' +
								'</p>' +
								'<textarea id="text_book" placeholder=""  class="layui-textarea">' + content + '</textarea>' +
							'</div>' +
						'</form>' +
				'</div>',
			yes: function(index) {
				//修改
				var matterTxt = $(".amendMatters").find("#text_book_title").val();
				var contenttext = $(".amendMatters").find("#text_book").val();
				var importance = document.getElementById("import");

				if(importance.checked != true) {
					importance = 'normal'
				} else {
					importance = 'highlight'
				}

				UpdateThings(matterTxt, contenttext, ttoid, importance);

				layer.msg('修改成功', {
					icon: 1,
					time: 1000
				});
				layer.close(index);
			},
			//删除
			btn3: function() {
				deleteThingsToDo(ttoid);
			}
		});
		$(".layui-layer-rim").find(".layui-layer-btn").find("a").addClass("layui-col-md4");
		$(".layui-layer-rim").find(".layui-layer-btn").find("a").addClass("layui-col-sm4");
		$(".layui-layer-rim").find(".layui-layer-btn").find("a").addClass("layui-col-xs4");
		$(".layui-layer-btn.layui-layer-btn-").css("margin-top", "2px");
	});
}

function UpdateThings(titlestr, contentstr, tid, importance) {
	var title = titlestr;
	var content = contentstr;
	var ttoid = tid;
	var importance = importance;

	var url = location.protocol.concat("//").concat(location.host).concat('/database/Other/ThingsToDo/updateThingsToDo.php');
	$.ajax({
		url: url,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		type: 'POST',
		data: {
			title: title,
			content: content,
			ttid: ttoid,
			important: importance
		},
		success: function(response) {
			console.log(response);
			getThingsToDo();
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(textStatus, errorThrown);
		}
	});
}

function deleteThingsToDo(id) {
	var url = location.protocol.concat("//").concat(location.host).concat('/database/Other/ThingsToDo/deleteThingsToDo.php');
	$.ajax({
		url: url,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		type: 'POST',
		data: {
			id: id
		},
		success: function(response) {
			console.log(response);
			getThingsToDo();
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(textStatus, errorThrown);
		}
	});
} 
