$(document).ready(function() {
	//	changePassword(); //确认修改
	//	changeBasicInfo(); //基本信息修改
	function loadSalesInfo() {
		var salesperson_code = localStorage.getItem('user_code');
		var url = location.protocol.concat("//").concat(location.host).concat('/database/Other/SalesInfoUpdate.php');
		$.ajax({
			url: url,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			type: 'GET',
			data: {
				action: "getSalesInfo",
				salesperson_code: salesperson_code
			},
			success: function(response) {
				console.log(response);
				response = JSON.parse(response);
				$("#sales-last-name").val(response['lname']);
				$("#sales-first-name").val(response['fname']);
				$("#sales-gender").val(response['gender']);
				$("#sales-phone").val(response['phone']);
				$("#sales-department").val(response['department_name']);
				$("#sales-email").val(response['email']);
				$("#sales-description").val(response['description']);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
	}
	loadSalesInfo();
	$("#update-reset").on('click', function() {
		loadSalesInfo();
	});
	$("#update-confirm").on('click', function() {
		var requiredFlag;
		$("ul.manageDetail li.requiredItem").each(function(i, item) {
			if($(item).find("input").val() == "") {
				requiredFlag = false;
			} else {
				requiredFlag = true;
			}

			if(requiredFlag) {
				changeBasicInfo();
			} else {
				$(".confirmUsersInfo").css("display", "block");
				$(".confirmUsersInfo p.confirmNotice").text("请确认信息已填写完整");
				$(".confirmUsersInfo .confirmTitle").find("img").attr("src", "../img/confirmInfo.png");
				$(".confirmUsersInfo").find("p.actionBox").find("button.actionConfirm").css("display", "none");
				$(".confirmUsersInfo").find("p.actionBox").find("button.actionCancel").css("width", "100%");
				$(".confirmUsersInfo").find("p.actionBox").find("button.actionCancel").text("返回");
				$(".confirmUsersInfo").find("p.actionBox").find("button.actionCancel").on("click", function() {
					$(".confirmUsersInfo").css("display", "none");
				});
			}

		});
		//		var salesperson_code = localStorage.getItem('user_code');
		//		var url = location.protocol.concat("//").concat(location.host).concat('/database/Other/SalesInfoUpdate.php');
		//		$.ajax({
		//			url: url,
		//			headers: {
		//				'Content-Type': 'application/x-www-form-urlencoded'
		//			},
		//			type: 'POST',
		//			data: {
		//				action: "updateSalesInfo",
		//				salesperson_code: salesperson_code,
		//				lname: $("#sales-last-name").val(),
		//				fname: $("#sales-first-name").val(),
		//				gender: $("#sales-gender").val(),
		//				phone: $("#sales-phone").val(),
		//				department: $("#sales-department").val(),
		//				email: $("#sales-email").val(),
		//				description: $("#sales-description").val()
		//			},
		//			success: function(response) {
		//				console.log(response);
		//			},
		//			error: function(jqXHR, textStatus, errorThrown) {
		//				console.log(textStatus, errorThrown);
		//			}
		//		});
	});

	$("#update-password-reset").on('click', function() {
		$("#new-password").val("");
		$("#confirm-password").val("");
	});

	$("#update-password-confirm").on('click', function() {
		var new_password = $("#new-password").val();
		var confirm_password = $("#confirm-password").val();
		var old_password = $("input#old-password").val();
		var oldPass = "1234";
		if(new_password == "" || old_password == "") {
			alert("请确认密码信息已经输入");
		} else {
			if(new_password !== confirm_password) {
				//				alert("两次输入的密码不同!");
				$(".confirmUsersInfo").css("display", "block");
				$(".confirmUsersInfo p.confirmNotice").text("两次输入的密码不同");
				$(".confirmUsersInfo .confirmTitle").find("img").attr("src", "../img/confirmInfo.png");
				$(".confirmUsersInfo").find("p.actionBox").find("button.actionConfirm").css("display", "none");
				$(".confirmUsersInfo").find("p.actionBox").find("button.actionCancel").css("width", "100%");
				$(".confirmUsersInfo").find("p.actionBox").find("button.actionCancel").text("返回");
				$(".confirmUsersInfo").find("p.actionBox").find("button.actionCancel").on("click", function() {
					$(".confirmUsersInfo").css("display", "none");
				});
			}
			if(old_password !== oldPass) {
				$(".confirmUsersInfo").css("display", "block");
				$(".confirmUsersInfo p.confirmNotice").text("密码错误");
				$(".confirmUsersInfo .confirmTitle").find("img").attr("src", "../img/confirmInfo.png");
				$(".confirmUsersInfo").find("p.actionBox").find("button.actionConfirm").css("display", "none");
				$(".confirmUsersInfo").find("p.actionBox").find("button.actionCancel").css("width", "100%");
				$(".confirmUsersInfo").find("p.actionBox").find("button.actionCancel").text("返回");
				$(".confirmUsersInfo").find("p.actionBox").find("button.actionCancel").on("click", function() {
					$(".confirmUsersInfo").css("display", "none");
				});
			} else {
				changePassword();
				var salesperson_code = localStorage.getItem('user_code');
				var url = location.protocol.concat("//").concat(location.host).concat('/database/Other/SalesInfoUpdate.php');
				$.ajax({
					url: url,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					type: 'POST',
					data: {
						action: "updatePassword",
						salesperson_code: salesperson_code,
						new_password: new_password
					},
					success: function(response) {
						$("#new-password").val("");
						$("#confirm-password").val("");
						$("input#old-password").val("");
						alert("更新成功!");
					},
					error: function(jqXHR, textStatus, errorThrown) {
						console.log(textStatus, errorThrown);
					}
				});
			}
		}

	});

});
//确认修改(销售人员：修改密码部分)：
function changePassword() {
	$("#update-password-confirm").on("click", function() {
		$(".confirmUsersInfo .confirmTitle").find("img").attr("src", "../img/userConfirm.png");
		$(".confirmUsersInfo").find("p.actionBox").find("button.actionConfirm").css("display", "inline-block");
		$(".confirmUsersInfo").find("p.actionBox").find("button.actionCancel").css("width", "50%");
		$(".confirmUsersInfo").find("p.actionBox").find("button.actionCancel").text("取消");
		$(".confirmUsersInfo").find("p.confirmNotice").text("修改成功");
		newPassWord = $("#new-password").val(); //新密码
		confirmPassword = $("#confirm-password").val(); //确认新密码
		copyInfo(newPassWord, confirmPassword);
	});
}

function copyInfo(userPassWord, confirmPassword) {
	if(userPassWord !== "" && confirmPassword !== "" && (userPassWord == confirmPassword)) {
		$(".actionConfirm").addClass("confirmPass");
		$(".actionCancel").addClass("cancelBtn");
		$(".actionConfirm").removeClass("confirmBasic");
		$(".actionCancel").removeClass("cancelBasic");
		$(".confirmUsersInfo").fadeIn();
		$(".actionConfirm").text("复制");
		$(".copyInfo").unbind("click");
		var clipboard = new ClipboardJS('.confirmPass', {
			text: function() {
				alert("复制成功!");
				return "修改后的密码:" + userPassWord
			}
		});
		$(".cancelBtn").unbind("click").on("click", function() {
			clipboard.destroy();
			$(".confirmUsersInfo").fadeOut();
		});
	}
}
//确认修改(销售人员：修改基本信息部分)：
function changeBasicInfo() {
	//	$("#update-confirm").unbind("click").on("click", function() {
	//		$(".actionConfirm").removeClass("confirmPass");
	//		$(".actionCancel").removeClass("cancelBtn");
	//		$(".actionConfirm").addClass("confirmBasic");
	//		$(".actionCancel").addClass("cancelBasic");
	//		if($(".usersManageNav li").first().hasClass("current-item")) {
	//			var lastName = $("#sales-last-name").val();
	//			var firstName = $("#sales-first-name").val();
	//			var salesPhone = $("#sales-phone").val();
	//			var salesEmail = $("#sales-email").val();
	//			var salesDes = $("textarea#sales-description").val();
	//			if(lastName !== "" && firstName !== "" && salesPhone !== "" && salesEmail !== "" && salesDes !== "") {
	//				$(".confirmUsersInfo").fadeIn();
	//				$(".actionConfirm").text("确认");
	//				$(".cancelBasic").unbind("click").on("click", function() {
	//					$(".confirmUsersInfo").fadeOut();
	//				});
	//			} else {
	//				alert("请确认要修改的信息已填写完整");
	//			}
	//		}
	//
	//	});
	$(".confirmUsersInfo").css("display", "block");
	$(".confirmUsersInfo .confirmTitle").find("img").attr("src", "../img/userConfirm.png");
	$(".confirmUsersInfo").find("p.actionBox").find("button.actionConfirm").css("display", "inline-block");
	$(".confirmUsersInfo").find("p.actionBox").find("button.actionCancel").css("width", "50%");
	$(".confirmUsersInfo").find("p.actionBox").find("button.actionCancel").text("取消");
	$(".confirmUsersInfo").find("p.confirmNotice").text("确认修改");
	$(".confirmUsersInfo").find("p.actionBox").find("button.actionConfirm").text("修改");
	$(".confirmUsersInfo").find("p.actionBox").find("button.actionConfirm").on("click", function() {
		var salesperson_code = localStorage.getItem('user_code');
		var url = location.protocol.concat("//").concat(location.host).concat('/database/Other/SalesInfoUpdate.php');
		$.ajax({
			url: url,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			type: 'POST',
			data: {
				action: "updateSalesInfo",
				salesperson_code: salesperson_code,
				lname: $("#sales-last-name").val(),
				fname: $("#sales-first-name").val(),
				gender: $("#sales-gender").val(),
				phone: $("#sales-phone").val(),
				department: $("#sales-department").val(),
				email: $("#sales-email").val(),
				description: $("#sales-description").val()
			},
			success: function(response) {
				console.log(response);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});

		$(".confirmUsersInfo").css("display", "none");

	});
	$(".confirmUsersInfo").find("p.actionBox").find("button.actionCancel").on("click", function() {
		$(".confirmUsersInfo").css("display", "none");

	});

}