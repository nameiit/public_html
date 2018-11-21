/*
 * 日历
 */
function getCalendarToDo() {
	var url = location.protocol.concat("//").concat(location.host).concat('/database/Other/Calendar/getCalendar.php');
	$.ajax({
		url: url,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		type: 'POST',
		data: {},
		success: function(response) {
			response = JSON.parse(response);

			var title = {};
			var content = {};
			var importance = {};
			var id = {};

			for(var i = 0; i < response[0].length; i++) {
				datatime = response[4][i];
				var timestr = datatime.split(" ");
				title[timestr[0]] = response[1][i];
				content[timestr[0]] = response[2][i];
				importance[timestr[0]] = response[3][i];
				id[timestr[0]] = response[0][i];
			}
			calendar(title, content, importance, id);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(textStatus, errorThrown);
		}
	});
}

function calendar(titleObj, contentObj, importanceObj, idObj) {
	layui.use(['layer', 'form', 'jquery', 'laydate', 'util'], function() {
		var layer = layui.layer,
			$ = layui.jquery,
			laydate = layui.laydate,
			util = layui.util,
			form = layui.form;
		var new_date = new Date();
		if(titleObj != null) {
			Object.keys(titleObj).forEach(key => {
				chose_moban1(key, titleObj, contentObj);
				$(".layui-layer-rim").addClass("addNoteBox");
				$(".layui-layer-rim").find(".layui-layer-btn").find("a").addClass("layui-col-md6");
				$(".layui-layer-rim").find(".layui-layer-btn").find("a").addClass("layui-col-sm6");
				$(".layui-layer-rim").find(".layui-layer-btn").find("a").addClass("layui-col-xs6");
			});
		}
			
		//获取隐藏的弹出层内容
		var date_choebox = $('.date_box').html();
		
		//初次调用：
		loding_date(new_date, titleObj, contentObj);
		
		//日历插件
		function loding_date(date_value, titleObj, contentObj) {
			laydate.render({
				elem: '#calendar',
				type: 'date',
				theme: 'grid',
				max: '2099-06-16 23:59:59',
				position: 'static',
				range: false,
				value: date_value,
				calendar: false,
				btns: false,
				ready: function(Date) {
					var monthChangeFlag = false;
					var date = util.toDateString(Date * 1000, 'yyyy-MM-dd'); //当前日期
					currentDate(date, monthChangeFlag);
					dateArr = date.split('-');
					dateArr[1] = dateArr[1].replace("0", "");
					var dateMonth = [];
					dateMonth.push(dateArr[0]);
					dateMonth.push(dateArr[1]);
					dateMonth = dateMonth.join('-');
					$("i.laydate-next-m,i.laydate-prev-m").unbind("click").click(function() {
						$("td.layui-this").removeClass("layui-this"); //td的默认标记
						var monthTxt = $(this).parent().find(".laydate-set-ym").find("span").attr("lay-ym");
						if(monthTxt == dateMonth) {
							monthChangeFlag = false;
						} else {
							monthChangeFlag = true;
						}
						currentDate(date, monthChangeFlag); //标记当前日期
					});
					
				},
				done: function(value, date, endDate) {
					//console.log(value); //得到日期生成的值，如：2017-08-18
					//console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
					//console.log(endDate); //得结束的日期时间对象
					if($(".layui-this").find("span.laydate-day-mark").text() !== "") {
						//修改备注
						date_chose_delete(value, titleObj, contentObj, importanceObj);
						$(".layui-layer-rim").removeClass("addNoteBox");
						$(".layui-layer-rim").find(".layui-layer-btn").find("a").addClass("layui-col-md4");
						$(".layui-layer-rim").find(".layui-layer-btn").find("a").addClass("layui-col-sm4");
						$(".layui-layer-rim").find(".layui-layer-btn").find("a").addClass("layui-col-xs4");
					} else {
						//添加备注
						date_chose(value, titleObj, contentObj); //添加
						$(".layui-layer-rim").addClass("addNoteBox");
						$(".layui-layer-rim").find(".layui-layer-btn").find("a").addClass("layui-col-md6");
						$(".layui-layer-rim").find(".layui-layer-btn").find("a").addClass("layui-col-sm6");
						$(".layui-layer-rim").find(".layui-layer-btn").find("a").addClass("layui-col-xs6");
					}
				},
				mark: titleObj
			});
		}

		//标记当前日期
		function currentDate(date, flag) {
			var tdBox = $(".layui-laydate-content").find("td");
			for(var i = 0; i < tdBox.length; i++) {
				var now = $(tdBox[i]).attr("lay-ymd");
				dateArr = date.split('-');
				dateArr[1] = dateArr[1].replace("0", "");
				if(dateArr[2] > 10) {
					dateArr[2] = dateArr[2];
				} else {
					dateArr[2] = dateArr[2].replace("0", "");
				}
				date = dateArr.join('-');
				if($.trim($(tdBox[i]).attr("lay-ymd")) == $.trim(date)) {
					if(!flag) {
						tdBox.eq(i).attr("id", "currentDate");
					}
				} else {
					tdBox.eq(i).attr("id", "");
				}
			}
		}

		//添加备注
		function date_chose(obj_date, titleObj, contentObj) {
			var index = layer.open({
				type: 1,
				skin: 'layui-layer-rim calendarInfo',
				title: '添加备注',
				area: ['400px', '320px'], //宽高
				btn: ['确定', '取消'],
				content:
					'<div class="text_box">' +
						'<form class="layui-form" action="">' +
							'<div class="layui-form-item layui-form-text">' +
								'<p class="title">标题</p>' +
								'<textarea id="text_book_title" placeholder="" class="layui-textarea"></textarea>' +
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
				success: function() {},
				yes: function() {
					//调用添加/编辑标注方法
					if($('#text_book_title').val() != '') {
						var title = $("#text_book_title").val();
						var content = $("#text_book").val();
						var importance = $("#import")[0].checked;
						var addtime = obj_date;
						if(importance) {
							importance = 'highlight'
						} else {
							importance = 'normal'
						}
						AddNewThingInCalendar(title, content, importance, 'calendar', addtime, titleObj, contentObj, importanceObj);
						layer.close(index);
					} else {
						layer.msg('不能为空', {
							icon: 2
						});
					}
				},
			});
		}

		//删除备注
		function date_chose_delete(obj_date, titleObj, contentObj, importanceObj) {
			var importance = "";
			if (importanceObj[obj_date] == 'highlight') {
				importance = "checked";
			}
			var index = layer.open({
				type: 1,
				skin: 'layui-layer-rim calendarInfo',
				title: '修改备注',
				area: ['400px', '320px'], //宽高
				btn: ['修改', '取消', '删除'],
				content:
					'<div class="text_box">' +
						'<form class="layui-form" action="">' +
							'<div class="layui-form-item layui-form-text">' +
								'<p class="title">标题</p>' +
									'<textarea id="text_book_title" placeholder=""  class="layui-textarea"></textarea>' +
									'<p class="title">内容' +
									'<span class="checkbox checkbox-success nm-right">' +
										'<input id="import" class="styled" type="checkbox"' + importance + '>' +
										'<label for="import">重要</label>' +
									'</span>' +
								'</p>' +
								' <textarea id="text_book" placeholder=""  class="layui-textarea"></textarea>' +
							'</div>' +
						'</form>' +
					'</div>',
				success: function() {
					$('#text_book_title').val(titleObj[obj_date]);
					$('#text_book').val(contentObj[obj_date]);
				},
				yes: function() {
					if($('#text_book').val() != '') {
						var title = $("#text_book_title").val();
						var content = $("#text_book").val();
						var importance = $("#import")[0].checked;
						var addtime = obj_date;
						if(importance) {
							importance = 'highlight'
						} else {
							importance = 'normal'
						}
						updateCalendarToDo(title, content, importance, addtime, titleObj, contentObj, importanceObj);
						layer.close(index);
					} else {
						layer.msg('不能为空', {
							icon: 2
						});
					}
				},
				btn3: function() {
					chexiao(obj_date, titleObj, contentObj, importanceObj);
				},
			});
		}

		//定义添加/编辑标注方法
		function chose_moban(obj_date, titleObj, contentObj, importanceObj, title, content, importance) {
			$('#calendar').html('');
			titleObj[obj_date] = title;
			contentObj[obj_date] = content;
			importanceObj[obj_date] = importance;
			//再次调用日历控件，
			loding_date(obj_date, titleObj, contentObj);
		}

		function chose_moban1(obj_date, titleObj, contentObj) {
			$('#calendar').html('');
			loding_date(obj_date, titleObj, contentObj);
		}

		//删除
		function chexiao(obj_date, titleObj, contentObj, importanceObj) {
			delete titleObj[obj_date];
			delete contentObj[obj_date];
			delete importanceObj[obj_date];
			deleteFromCalendar(obj_date, titleObj, contentObj);
		}

		function AddNewThingInCalendar(titlestr, contentstr, importance, typess, addtimes, titleObj, contentObj, importanceObj) {
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
					chose_moban(addtimes, titleObj, contentObj, importanceObj, titlestr, contentstr, importance);
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log(textStatus, errorThrown);
				}
			});
		}

		function updateCalendarToDo(titlestr, contentstr, importance, datetiemstr, titleObj, contentObj, importanceObj) {
			var title = titlestr;
			var content = contentstr;
			var importance = importance;
			var datetime = datetiemstr;

			var url = location.protocol.concat("//").concat(location.host).concat('/database/Other/Calendar/updateCalendar.php');
			$.ajax({
				url: url,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				type: 'POST',
				data: {
					title: title,
					content: content,
					important: importance,
					datetime: datetime
				},
				success: function(response) {
					chose_moban(datetime, titleObj, contentObj, importanceObj, title, content, importance);
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log(textStatus, errorThrown);
				}
			});
		}

		function deleteFromCalendar(datestr, titleObj, contentObj) {
			var url = location.protocol.concat("//").concat(location.host).concat('/database/Other/Calendar/deleteCalendar.php');
			$.ajax({
				url: url,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				type: 'POST',
				data: {
					datetime: datestr
				},
				success: function(response) {
					$('#calendar').html('');
					loding_date(datestr, titleObj, contentObj);
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log(textStatus, errorThrown);
				}
			});
		}
	});
}
