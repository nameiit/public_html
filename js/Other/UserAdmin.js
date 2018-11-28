$(document).ready(function() {
	cardToggle();
	manageToggle();
	confirmAddInfo();
	confirmInfo();
	changePassword();
	// searchTab($("select.searchItem"));
	autoWidth();
//	authorityManage();
	function searchTab(selectItem) {
	    selectItem.searchableSelect({
	        afterSelectItem: function() {
	            if (this.holder.text() !== this.element[0][0].text) {
	                $("dd.detail-active").css({
	                    "overflow": "initial",
	                    "background-color": "#fe6345"
	                });
	            } else {
	                $("dd.detail-active").css({
	                    "overflow": "initial",
	                    "background-color": "#9295ff"
	                });
	            }
	            $("selectItem option:contains(" + this.holder.text() + ")").attr('selected', 'selected');
	            var account_id = ($("#username-filter").val() == 'all')? '' : $("#username-filter").val();
							loadUsers(account_id);
							autoWidth();
	        }
	    });
	}
	function loadFilter() {
		var url = location.protocol.concat("//").concat(location.host).concat('/database/autoComplete.php');
		$.ajax({
			url: url,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			type: 'GET',
			data: {
				action: 'getUserList'
			},
			success: function(response) {
//				console.log(response);
				response = JSON.parse(response);
				for (var i = 0; i < response.length; i++) {
					if (response[i]['user_group_id'] == 1) {
						sales_users.push(response[i]);
					} else if (response[i]['user_group_id'] == 2) {
						accounting_users.push(response[i]);
					} else {
						admin_users.push(response[i]);
					}
				}
				for(var i = 0; i < sales_users.length; i++) {
					$("#username-filter").append("<option value='" + sales_users[i]['account_id'] + "'>" + sales_users[i]['account_id'] + "</option>");
				}
				searchTab($("#username-filter"));
				// heightRange();
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
	}
	loadFilter();
	$("#create-user-confirm").on("click", function() {
		var username = $("#create-username").val();
		var password = $("#create-password").val();
		var confirm_password = $("#create-confirm-password").val();

		if(username == "" || password == "" || confirm_password == "") {
			alert("请确认用户名和密码已经输入");
			return;
		}
		if(password != confirm_password) {
			alert("两次输入的密码必须一致！");
			return;
		}
		var group = $($("div.userGroup ul li.selected")[0])[0]['innerText'];
		var user_group = "";
		if(group == '销售人员') {
			user_group = 'normal';
		} else if(group == '会计') {
			user_group = 'accounting';
		} else {
			user_group = 'admin';
		}
		var url = location.protocol.concat("//").concat(location.host).concat('/database/Other/UserAdmin.php');
		$.ajax({
			url: url,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			type: 'POST',
			data: {
				action: 'createUser',
				username: username,
				password: password,
				user_group: user_group
			},
			success: function(response) {
				console.log(response);
				$("#create-username").val("");
				$("#create-password").val("");
				$("#create-confirm-password").val("");
				loadUsers();
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
	});
	$("#update-password-confirm").on("click", function() {
		var username = $("#update-username").val();
		var password = $("#update-password").val();
		var confirm_password = $("#update-confirm-password").val();
		if(username == "" || password == "" || confirm_password == "") {
			alert("请确认用户名和密码已经输入");
			return;
		}
		if(password != confirm_password) {
			alert("两次输入的密码必须一致！");
			return;
		}
		var url = location.protocol.concat("//").concat(location.host).concat('/database/Other/UserAdmin.php');
		$.ajax({
			url: url,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			type: 'POST',
			data: {
				action: 'updatePassword',
				username: username,
				password: password
			},
			success: function(response) {
				console.log(response);
				$("#update-username").val("");
				$("#update-password").val("");
				$("#update-confirm-password").val("");
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
	});
	function loadUsers(account_id) {
		$("li.userDetail").remove();
		var url = location.protocol.concat("//").concat(location.host).concat('/database/Other/UserAdmin.php');
		$.ajax({
			url: url,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			type: 'GET',
			data: {
				action: 'getUsers',
				account_id: account_id
			},
			success: function(response) {
				response = JSON.parse(response);
				users = response;
				var group = $($("div.userGroup ul li.selected")[0])[0]['innerText'];
				var user_group = "";
				if(group == '销售人员') {
					user_group = 1;
				} else if(group == '会计') {
					user_group = 2;
				} else {
					user_group = 3;
				}
				for(var i = 0; i < users.length; i++) {
					console.log(users[i]);
					console.log(user_group);
					if(users[i]['user_group_id'] == user_group) {
						var last_time_login = (users[i]['last_time_login'] == null) ? "" : users[i]['last_time_login'];
						$html = `
						<li class="userDetail">
							<dl>
								<dd class="userName">` + users[i]['account_id'] + `</dd>
								<dd class="loginTime">` + last_time_login + `</dd>
							</dl>
						</li>`;
						$("div.usersInfo ul").append($html);
					}
				}
				// $("div.userGroup ul li.selected").click();
				heightRange();
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
	}

	$("li.salesNav").on('click', function() {
		$("li.userDetail").remove();
		$("#username-filter").empty();
		$(".searchable-select").remove();
		$("#username-filter").append("<option value='all'>用户名</option>");
		for(var i = 0; i < sales_users.length; i++) {
			$("#username-filter").append("<option value='" + sales_users[i]['account_id'] + "'>" + sales_users[i]['account_id'] + "</option>");
		}
		searchTab($("#username-filter"));
	});
	$("li.accountingNav").on('click', function() {
		$("li.userDetail").remove();
		$("#username-filter").empty();
		$(".searchable-select").remove();
		$("#username-filter").append("<option value='all'>用户名</option>");
		for(var i = 0; i < accounting_users.length; i++) {
			$("#username-filter").append("<option value='" + accounting_users[i]['account_id'] + "'>" + accounting_users[i]['account_id'] + "</option>");
		}
		searchTab($("#username-filter"));
	});
	$("li.managerNav").on('click', function() {
		$("li.userDetail").remove();
		$("#username-filter").empty();
		$(".searchable-select").remove();
		$("#username-filter").append("<option value='all'>用户名</option>");
		for(var i = 0; i < admin_users.length; i++) {
			$("#username-filter").append("<option value='" + admin_users[i]['account_id'] + "'>" + admin_users[i]['account_id'] + "</option>");
		}
		searchTab($("#username-filter"));
	});
	//admin:
	$(".userGroup").find("li.adminNav").on("click",function(){
		
		
	});

	$(document).on('click', 'li.userDetail',  function () {
		$("#update-username").val($(this).find("dd.userName")[0].innerText);
		if ($(".current-item")[0].innerText == '添加') {
			$(".current-item").removeClass("current-item").siblings("li").addClass("current-item");
			$(".usersManageInfo").eq(0).css("display", "block").siblings(".usersManageInfo").css("display", "none");
		}
		$(".authorityManageCard").css("display","none");
		authorityManage();
	});
});

function cardToggle() {
	$(".usersManageNav").find("li").on("click", function() {
		var index = $(this).index();
		if ($(this)[0].innerText == '添加') {
				$(this).addClass("current-item").siblings("li").removeClass("current-item");
				$(".usersManageInfo").eq(index).css("display", "block").siblings(".usersManageInfo").css("display", "none");
		}
		// $("input[type='password']").val("");
		// $("input[type='text']").val("");
		// $(".usersInfo ul").find("li").removeClass("selected");
		// $(".userGroup ul").find("li").removeClass("selected");
	});
}

function manageToggle() {
	//销售人员
	$(".userGroup").find("li.salesNav").on("click", function() {
		$(this).addClass("selected").siblings().removeClass("selected");
	});
	//会计
	$(".userGroup").find("li.accountingNav").on("click", function() {
		$(this).addClass("selected").siblings().removeClass("selected");
	});
	//管理员
	$(".userGroup").find("li.managerNav").on("click", function() {
		$(this).addClass("selected").siblings().removeClass("selected");
	});
	
	//admin
	$(".userGroup").find("li.adminNav").on("click", function() {
		$(this).addClass("selected").siblings().removeClass("selected");
		$html = `
			<li class="userDetail">
				<dl>
					<dd class="userName">` + "用户名" + `</dd>
					<dd class="loginTime">` + "最近登录时间" + `</dd>
				</dl>
			</li>`;
		$("div.usersInfo ul").append($html);
	});

}

function confirmAddInfo() {
	$("#create-user-confirm").on("click", function() {
		$(".confirmUsersInfo").find("p.confirmNotice").text("添加成功");
		userName = $("#create-username").val();
		userPassWord = $("#create-password").val();
		var confirmPassword = $("#create-confirm-password").val();
		copyInfo(userName, userPassWord, confirmPassword);
		console.log(userName);
	});
}

function confirmInfo() {
	$("#update-password-confirm").on("click", function() {
		$(".confirmUsersInfo").find("p.confirmNotice").text("修改成功");
		userName = $("#update-username").val();
		userPassWord = $("#update-password").val();
		var confirmPassword = $("#update-confirm-password").val();
		copyInfo(userName, userPassWord, confirmPassword);
		console.log(userName);
	});
}

function copyInfo(userName, userPassWord, confirmPassword) {
	if(userPassWord !== "" && userName !== "" && confirmPassword == userPassWord) {
		$(".confirmUsersInfo").fadeIn();
		$(".copyInfo").unbind("click");
		var clipboard = new ClipboardJS('.copyInfo', {
			text: function() {
				alert("复制成功!");
				return "用户名:" + userName + "\n" + "密码:" + userPassWord
			}
		});
		$(".actionCancel").on("click", function() {
			$(".confirmUsersInfo").fadeOut();
			clipboard.destroy();
		});
	}
}

function changePassword() {
	$(".usersInfo ul li.userDetail").on("click", function() {
		$(".basicInfo.usersManageInfo").css("display", "block");
		$(".usersManageInfo.addItem").css("display", "none");
		$(".rightTab .usersManageNav").find("li").first().addClass("current-item");
		$(".rightTab .usersManageNav").find("li").last().removeClass("current-item");
		$(this).addClass('selected').siblings("li").removeClass("selected");
		var userName = $.trim($(this).find("dd.userName").text());
		$(".basicInfo.usersManageInfo").find("input.userName").val(userName);
	});
}

function autoWidth() {
	var boxWidth = $(".usersInfo ul li.userInfoTitle dl dd").outerWidth();
	$(".usersInfo ul li.userInfoTitle dl dd").find(".searchable-select-holder").outerWidth(boxWidth);
	$(window).resize(function() {
		var boxWidth = $(".usersInfo ul li.userInfoTitle dl dd").outerWidth();
		$(".usersInfo ul li.userInfoTitle dl dd").find(".searchable-select-holder").outerWidth(boxWidth);
	});
}

//权限管理
function authorityManage(){
	$("ul.manageDetail li.actionFilerBox.actionFloor a.authorityManageBtn").on("click",function(){
//		$(".authorityManageCard").css("display","block");
		$.ajax({
			url: location.protocol.concat("//").concat(location.host).concat('/database/Other/PowerControl/getPowerControl.php'),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			type: 'GET',
			data: {account_id: $("#update-username").val()},
			success: function(response) {
				response = JSON.parse(response);

				if (response[0]['clear_power'] == 'Y') {
					$("#clear-power-control")[0].checked = true;
				} else {
					$("#clear-power-control")[0].checked = false;
				}
				if (response[0]['lock_power'] == 'Y') {
					$("#lock-power-control")[0].checked = true;
				} else {
					$("#lock-power-control")[0].checked = false;
				}
				if (response[0]['paid_power'] == 'Y') {
					$("#paid-power-control")[0].checked = true;
				} else {
					$("#paid-power-control")[0].checked = false;
				}
				if (response[0]['finish_power'] == 'Y') {
					$("#finish-power-control")[0].checked = true;
				} else {
					$("#finish-power-control")[0].checked = false;
				}
				if (response[0]['clear_counter'] == 'Y') {
					$("#unclear-power-control")[0].checked = true;
				} else {
					$("#unclear-power-control")[0].checked = false;
				}
				if (response[0]['lock_counter'] == 'Y') {
					$("#unlock-power-control")[0].checked = true;
				} else {
					$("#unlock-power-control")[0].checked = false;
				}
				if (response[0]['paid_counter'] == 'Y') {
					$("#unpaid-power-control")[0].checked = true;
				} else {
					$("#unpaid-power-control")[0].checked = false;
				}
				if (response[0]['finish_counter'] == 'Y') {
					$("#unfinish-power-control")[0].checked = true;
				} else {
					$("#unfinish-power-control")[0].checked = false;
				}

				$(".authorityManageCard").css("display","block");
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
	});

	var power_group_list = {
		'lock-power-control': 'lock_power',
		'unlock-power-control': 'lock_counter',
		'clear-power-control': 'clear_power',
		'unclear-power-control': 'clear_counter',
		'paid-power-control': 'paid_power',
		'unpaid-power-control': 'paid_counter',
		'finish-power-control': 'finish_power',
		'unfinish-power-control': 'finish_counter'
	}

	$("div.authorityManageCard").find("input[type=checkbox]").on('click', function() {
		var power_group = power_group_list[$(this)[0].id]
		var power_control = $(this)[0].checked ? 'Y' : 'N';

		$.ajax({
			url: location.protocol.concat("//").concat(location.host).concat('/database/Other/PowerControl/setPowerControl.php'),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			type: 'POST',
			data: {
				account_id: $("#update-username").val(),
				power_group: power_group,
				power_control: power_control
			},
			success: function(response) {},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
	});
}
