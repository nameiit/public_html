function boxInterval() {
	//右侧的间距
	var bHeight = $("body").height();
	var loginItemHeight = $(".loginItem").height();
	$(".loginItem").css("margin-top", (bHeight - loginItemHeight) / 2);
	//左侧间距
	var imgHeight = $(".leftInfo").find("img").height();
	$('.leftInfo').find("img").css("bottom", (bHeight - imgHeight) / 2);

}

function verifyUserInfo() {
	$("form.loginItem").find("li.loginBtn").find("a").on("click", function() {
		var LoginInfo = $("form.loginItem").find("li.userInfo").find("input[type='text'].userName").val();
		var userPassWord = $("form.loginItem").find("li.userInfo").find("input[type='password'].userPassWord").val();
		var noticeTxt = $("form.loginItem").find("li.loginTxt");
		localStorage.setItem("Login", "zs_staria@163.com");
		localStorage.setItem("userPassWord", "112233");
		if(LoginInfo == "" || userPassWord == "") {
			noticeTxt.css("visibility", "visible");
			noticeTxt.text("账户和密码不能为空");
		}
		if(LoginInfo !== localStorage.getItem("Login") || userPassWord !== localStorage.getItem("userPassWord")) {
			noticeTxt.css("visibility", "visible");
			console.log(LoginInfo + "\n" + localStorage.getItem("Login") + "\n" + userPassWord + "\n" + localStorage.getItem("userPassWord"));
			noticeTxt.text("账号密码错误，请重新输入!");
		} else {
			noticeTxt.css("visibility", "hidden");
		}
	});

	$("form.loginItem").find("li.loginBtn").find("a").on("mousedown", function() {
		$(this).css("background", "url(img/dengluBtnDefault.png) center center no-repeat");
		$(this).css("background-size", "100%");
	})
	$("form.loginItem").find("li.loginBtn").find("a").on("mouseup", function() {
		$(this).css("background", "url(img/dengluBtn.png) center center no-repeat");
		$(this).css("background-size", "100%");
	});
	if($("form.loginItem").find("li.userInfo").find("input[type='password'].userPassWord").val() !== "") {
		$("#passWordCheckbox").on('click', function() {
			//		alert(1);
			if($(".loginPage .rightInfo .loginItem ul li.userInfo input[type='password']").hasClass("selected")) {
				$(".loginPage .rightInfo .loginItem ul li.userInfo input[type='password']").removeClass("selected");
				$(".loginPage .rightInfo .loginItem ul li.userInfo input[type='password']").attr("disabled", false);

			} else {
				$(".loginPage .rightInfo .loginItem ul li.userInfo input[type='password']").addClass("selected");
				$(".loginPage .rightInfo .loginItem ul li.userInfo input[type='password']").attr("disabled", "disabled");
			}
		});
	}
	$("#passWordCheckbox").on('click', function() {
		if($("form.loginItem").find("li.userInfo").find("input[type='password'].userPassWord").val() !== "") {
			if($(".loginPage .rightInfo .loginItem ul li.userInfo input[type='password']").hasClass("selected")) {
				$(".loginPage .rightInfo .loginItem ul li.userInfo input[type='password']").removeClass("selected");
				$(".loginPage .rightInfo .loginItem ul li.userInfo input[type='password']").attr("disabled", false);
			} else {
				$(".loginPage .rightInfo .loginItem ul li.userInfo input[type='password']").addClass("selected");
				$(".loginPage .rightInfo .loginItem ul li.userInfo input[type='password']").attr("disabled", "disabled");
			}
		}
	});
}

$(document).ready(function() {
	$("form.loginItem").find("li.loginBtn").find("a").on('click', function() {
		var username = $("form.loginItem").find("li.userInfo").find("input[type='text'].userName").val();
		var password = $("form.loginItem").find("li.userInfo").find("input[type='password'].userPassWord").val();

		var noticeTxt = $("form.loginItem").find("li.loginTxt");
		if(username == "" || password == "") {
			noticeTxt.css("visibility", "visible");
			noticeTxt.text("账户和密码不能为空");
		}
		var url = location.protocol.concat("//").concat(location.host).concat('/database/Authentication/login.php');
		$.ajax({
			url: url,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			type: 'GET',
			data: {
				username: username,
				password: password
			},
			success: function(response) {
				console.log(response);
				if(response == 'Invalid password.') {
					noticeTxt.css("visibility", "visible");
					noticeTxt.text("登录密码错误，请重新输入!");
				} else if(response == 'User_Not_Exist') {
					noticeTxt.css("visibility", "visible");
					noticeTxt.text("用户名不存在，请重新输入!");
				} else {
					window.location.href = location.protocol.concat("//").concat(location.host).concat('/index.php');
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
	});
	//enter
	$(".loginPage .rightInfo .loginItem ul li.userInfo input.userPassWord").on("keydown", function() {
		if(event.keyCode == 13) {
			var username = $("form.loginItem").find("li.userInfo").find("input[type='text'].userName").val();
			var password = $("form.loginItem").find("li.userInfo").find("input[type='password'].userPassWord").val();

			var noticeTxt = $("form.loginItem").find("li.loginTxt");
			if(username == "" || password == "") {
				noticeTxt.css("visibility", "visible");
				noticeTxt.text("账户和密码不能为空");
			}
			var url = location.protocol.concat("//").concat(location.host).concat('/database/Authentication/login.php');
			$.ajax({
				url: url,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				type: 'GET',
				data: {
					username: username,
					password: password
				},
				success: function(response) {
					console.log(response);
					if(response == 'Invalid password.') {
						noticeTxt.css("visibility", "visible");
						noticeTxt.text("登录密码错误，请重新输入!");
					} else if(response == 'User_Not_Exist') {
						noticeTxt.css("visibility", "visible");
						noticeTxt.text("用户名不存在，请重新输入!");
					} else {
						window.location.href = location.protocol.concat("//").concat(location.host).concat('/index.php');
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log(textStatus, errorThrown);
				}
			});

		}
	});

});
