$(document).ready(function() {
	manageTabAction();

	function loadFilter() {
		var url = location.protocol.concat("//").concat(location.host).concat('/database/autoComplete.php');
		$.ajax({
			url: url,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			type: 'post',
			data: {
				target: 'salesperson'
			},
			success: function(response) {
				response = JSON.parse(response);
				for(var i = 0; i < response.length; i++) {
					$("#salesperson-code-filter").append("<option value='" + response[i] + "'>" + response[i] + "</option>");
				}

				$.ajax({
					url: url,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					type: 'post',
					data: {
						target: 'salesperson_name'
					},
					success: function(response) {
						response = JSON.parse(response);
						// 中文姓名搜索
						var reg = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/;
						for(var i = 0; i < response.length; i++) {
							var name = response[i].split(" ");
							if(reg.test(name[0]) || reg.test(name[1])) {
								response[i] = name[1] + name[0];
							}
							$("#salesperson-name-filter").append("<option value='" + response[i] + "'>" + response[i] + "</option>");
						}

						searchTab($("#salesperson-code-filter, #salesperson-name-filter, #salesperson-gender-filter, #salesperson-department-filter, #salesperson-status-filter"),
							getFilterData, loadData);
						var pWidth = $(".manageTab .tabCard ul.manageTabTitle").find("li.tabOffice").width();
						$(".manageTab .tabCard ul.manageTabTitle li.tabOffice").find(".searchable-select").find(".searchable-select-holder").css("width", pWidth);

					},
					error: function(jqXHR, textStatus, errorThrown) {
						console.log(textStatus, errorThrown);
					}
				});
				heightRange();
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});

	}
	loadFilter();

	var filterData = {
		salesperson_code: "all",
		salesperson_name: "all",
		gender: "all",
		department: "all"
	};

	function getFilterData() {
		filterData.salesperson_code = $("#salesperson-code-filter").val();
		filterData.salesperson_name = $("#salesperson-name-filter").val();
		filterData.gender = $("#salesperson-gender-filter").val();
		filterData.department = $("#salesperson-department-filter").val();
		filterData.status = $("#salesperson-status-filter").val();
		return filterData;
	}

	var limit = 10;

	function loadData(inputData) {
		var data = inputData;
		Object.assign(data, {
			action: 'getSalespersonList',
			limit: limit
		});
		var url = location.protocol.concat("//").concat(location.host).concat('/database/Management/Salesperson.php');
		$.ajax({
			url: url,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			type: 'GET',
			data: data,
			success: function(response) {
				$("ul.manageTabDetail").empty();
				response = JSON.parse(response);
				for(var i = 0; i < response.length; i++) {

					var gender = response[i]['gender'];
					if(gender == 'M') {
						gender = '男';
					} else if(gender == 'F') {
						gender = '女'
					} else {
						gender = '未知';
					}

					// 中文姓名检测
					var reg = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/;
					var displayName = "";
					var name = response[i]['name'].split(" ");
					if(reg.test(name[0]) || reg.test(name[1])) {
						displayName = name[1] + name[0];
					} else {
						displayName = name[0] + ' ' + name[1];
					}

					$html = `
                    <li><dl><dd class="tabId">` + response[i]['salesperson_id'] + `</dd>
                            <dd class="codeInfo"> ` + response[i]['salesperson_code'] + `</dd>
                            <dd class="tabName"> ` + displayName + `</dd>
                            <dd class="tabGender">` + gender + `</dd>
                            <dd class="tabTel">` + response[i]['phone'] + `</dd>
                            <dd class="divisionInfo">` + response[i]['department_name'] + `</dd>
                            <dd class="tabEmail">` + response[i]['email'] + `</dd>
                            <dd class="tabDetail zebra_tips2" title="" ><p></p></dd>
							<dd class="zebra_tips2"><p></p></dd>
							<dd class="tabOffice">` + response[i]['active_status'] + `</dd>
                    </dl></li>
                    `;
					$("ul.manageTabDetail").append($html);

					var len = $("dd.tabDetail").length;
					if(response[i]['description'] != "") {
						$($("dd.tabDetail")[len - 1]).attr("title", response[i]['description']);
						$($("dd.tabDetail")[len - 1]).text("详情");
					}
				}
				new $.Zebra_Tooltips($('.zebra_tips2'), {
					'background_color': '#000000',
					'color': '#FFF'
				});
				$("ul.manageTabDetail li dd.tabOffice").each(function(i,item){
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

	function getSalespersonInfo(salesperson_id) {
		var url = location.protocol.concat("//").concat(location.host).concat('/database/Management/Salesperson.php');
		$.ajax({
			url: url,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			type: 'GET',
			data: {
				action: 'getSalespersonInfo',
				salesperson_id: salesperson_id
			},
			success: function(response) {
				response = JSON.parse(response);
				$("#update-salesperson-lname").val(response['lname']);
				$("#update-salesperson-fname").val(response['fname']);
				$("#update-salesperson-code").val(response['salesperson_code']);
				$("#update-salesperson-gender").val(response['gender']);
				$("#update-salesperson-phone").val(response['phone']);
				$("#update-salesperson-department").val(response['department_name']);
				$("#update-salesperson-email").val(response['email']);
				$("#update-salesperson-description").val(response['description']);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
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

		var salesperson_id = $(this).find(".tabId").text();
		getSalespersonInfo(salesperson_id);
	});
	$(document).on('click', ".manageTab .tabCard ul.manageTabTitle li", function() {
		$(this).addClass("detail-active");
		$(this).siblings().removeClass("detail-active");
	});

	$("#update-confirm").on('click', function() {
		$(".updateConfirmBox").css("display", "block");
	});
	$("#updateActionConfirm").on('click', function() {
		var salesperson_id = $(document).find(".detail-active .tabId")[0].innerHTML;
		var url = location.protocol.concat("//").concat(location.host).concat('/database/Management/Salesperson.php');
		$.ajax({
			url: url,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			type: 'POST',
			data: {
				action: 'updateSalesperson',
				salesperson_id: salesperson_id,
				lname: $("#update-salesperson-lname").val(),
				fname: $("#update-salesperson-fname").val(),
				salesperson_code: $("#update-salesperson-code").val(),
				gender: $("#update-salesperson-gender").val(),
				phone: $("#update-salesperson-phone").val(),
				department: $("#update-salesperson-department").val(),
				email: $("#update-salesperson-email").val(),
				description: $("#update-salesperson-description").val()
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
		if($(document).find(".detail-active .tabId").length == 1) {
			var salesperson_id = $(document).find(".detail-active .tabId")[0].innerHTML;
			getSalespersonInfo(salesperson_id);
		} else {
			resetUpdateTable();
		}
	});

	$("#insert-confirm").on('click', function() {
		$(".insertConfirmBox").css("display", "block");
	});
	$("#insertActionConfirm").on('click', function() {
		var url = location.protocol.concat("//").concat(location.host).concat('/database/Management/Salesperson.php');
		$.ajax({
			url: url,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			type: 'POST',
			data: {
				action: 'insertSalesperson',
				lname: $("#insert-salesperson-lname").val(),
				fname: $("#insert-salesperson-fname").val(),
				salesperson_code: $("#insert-salesperson-code").val(),
				gender: $("#insert-salesperson-gender").val(),
				phone: $("#insert-salesperson-phone").val(),
				department: $("#insert-salesperson-department").val(),
				email: $("#insert-salesperson-email").val(),
				description: $("#insert-salesperson-description").val()
			},
			success: function(response) {
				if (response == 'Resister First') {
					alert("该用户名不存在，请先前往'用户管理'添加用户名");
					return;
				}
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

	$("#delete-confirm").on('click', function() {
		$(".deleteConfirmBox").css("display", "block");
	});
	$("#deleteActionConfirm").on('click', function() {
		var salesperson_id = $(document).find(".detail-active .tabId")[0].innerHTML;
		var url = location.protocol.concat("//").concat(location.host).concat('/database/Management/Salesperson.php');
		$.ajax({
			url: url,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			type: 'POST',
			data: {
				action: 'deleteSalesperson',
				salesperson_id: salesperson_id
			},
			success: function(response) {
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

	function resetInsertTable() {
		$("#insert-salesperson-lname").val("");
		$("#insert-salesperson-fname").val("");
		$("#insert-salesperson-code").val("");
		$("#insert-salesperson-gender").val("");
		$("#insert-salesperson-phone").val("");
		$("#insert-salesperson-department").val("");
		$("#insert-salesperson-email").val("");
		$("#insert-salesperson-description").val("");
	}

	function resetUpdateTable() {
		$("#update-salesperson-lname").val("");
		$("#update-salesperson-fname").val("");
		$("#update-salesperson-code").val("");
		$("#update-salesperson-gender").val("");
		$("#update-salesperson-phone").val("");
		$("#update-salesperson-department").val("");
		$("#update-salesperson-email").val("");
		$("#update-salesperson-description").val("");
	}

	toSalesManagePage(); //跳转到销售人员页面
});
