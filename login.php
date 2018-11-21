<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<link href="css/font-awesome.css" type="text/css" rel="stylesheet" />
		<link href="css/style.css" type="text/css" rel="stylesheet" />
		<link href="css/login.css" type="text/css" rel="stylesheet"/>
		<title>登录页</title>
	</head>
	<body>
		<div class="msWidth loginPage">
			<div class="leftInfo">
				<img src="img/welcome.png" />
			</div>
			<div class="rightInfo">
				<form class="loginItem">
					<ul>
						<li class="loginTitle">
							<!--欢&nbsp;&nbsp;迎&nbsp;&nbsp;使&nbsp;&nbsp;用&nbsp;&nbsp;系&nbsp;&nbsp;统-->
						</li>
						<li class="userInfo">
							<label>登录用户</label>
							<img src="img/bms-user.png" />
							<input type="text" class="userName"/>
						</li>
						<li class="userInfo">
							<label>登录密码</label>
							<img src="img/bms-pass.png" />
							<input type="password"  class="userPassWord"/>
						</li>
						<li class="passWordItem">
							<!-- <div class="checkbox checkbox-success">
								<input id="passWordCheckbox" class="styled" type="checkbox">
								<label for="passWordCheckbox">
		                           	记住密码
		             			</label>
							</div> -->
							<!--<a href="javascript:void(0);" class="forgetPassord">
								忘记密码
							</a>-->
						</li>
						<li class="loginBtn">
							<a href="javascript:void(0);">
								<!--<i>登</i>-->
								<!--<i>录</i>-->
							</a>
						</li>
						<li class="loginTxt">
							账号密码错误，请重新输入!
						</li>
						<li class="forgetPassBox">
							<a href="javascript:void(0);" class="forgetPassord">
								忘记密码?
							</a>
						</li>
					</ul>
				</form>
			</div>

		</div>
		<script src="js/jquery.min.js" type="text/javascript"></script>
		<script src="js/homePage/login.js" type="text/javascript"></script>
		<script type="text/javascript">
			$(function(){
				boxInterval();
				// verifyUserInfo();
			});
		</script>
	</body>
</html>
