<?php
session_start();
   if (!isset($_SESSION['login']) || $_SESSION['login'] != true) {
   	header('location: login.php');
   }
 ?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<title>后台管理系统（首页）</title>
		<link href="css/style.css" type="text/css" rel="stylesheet" />
		<link href="css/homePage.css" type="text/css" rel="stylesheet" />
		<link href="layui/css/layui.css" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" href="css/date.css" type="text/css"/>
		<link href="css/font-awesome.css" rel="stylesheet" type="text/css" />
	</head>
	<body>
		<div class="msWidth">
			<!--header s-->
			<div class="header">
				<div class="nm-left">
					<span class="ms-theam">旅行社管理系统</span>
				</div>
				<div class="nm-right user-info">
					<ul>
						<li>
							<a href="javascript:void(0);">
								<span><?php echo $_SESSION['username']; ?>
							</a>
						</li>
						<li class="login">
							<a href="javascript:void(0);">
								退出
							</a>
						</li>
					</ul>
				</div>
			</div>
			<!--header e-->
			<div class="msContent">
				<!--左侧导航 s-->
				<div class="navInfo nm-left">
					<ul>
						<li class="shouye title-active">
							<a href="javascript:void(0);" class="bm-title">
								<img src="img/c_shouye.png">
								首页
							</a>
						</li>
						<li class="yewu">
							<a href="GroupTour/GroupTourCreate.php" class="bm-title ">
								<img src="img/yewu.png">
								业务
							</a>
							<dl class="detailMsg nm-hide">
								<dd>
									<a href="GroupTour/GroupTourCreate.php" class="lab-active">
										<label></label> 独立团
									</a>
								</dd>
								<dd>
									<a href="IndividualTour/IndividualTourCreate.php">
										<label></label> 散拼团
									</a>
								</dd>
								<dd>
									<a href="AirTicket/AirTicketCreate.php">
										<label></label> 机票
									</a>
								</dd>
							</dl>
						</li>
						<li class="kuaiji">
							<a href="Other/AccountingConfirm.php" class="bm-title">
								<img src="img/kuaiji.png">
								财务
							</a>
							<dl class="detailMsg nm-hide">
								<!--<dd>
									<a href="javascript:void(0);" class="lab-active">
										<label></label> 历史订单
									</a>
								</dd>
								<dd>
									<a href="javascript:void(0);">
										<label></label> 会计服务
									</a>
								</dd>-->
							</dl>
						</li>
						<li class="guanli">
							<a href="Manage/TourGuideManage.php" class="bm-title">
								<img src="img/guanli.png">
								管理
							</a>
							<dl class="detailMsg nm-hide">
								<dd>
									<a href="javascript:void(0);" class="lab-active">
										<label></label> 导游
									</a>
								</dd>
								<dd>
									<a href="javascript:void(0);">
										<label></label> 销售
									</a>
								</dd>
								<dd>
									<a href="javascript:void(0);">
										<label></label> 批发商
									</a>
								</dd>
							</dl>
						</li>
						<li class="bm-title qita">
							<a href="Other/NoticeManage.php">
								<img src="img/qita.png">
								其他
							</a>
						</li>
					</ul>
				</div>
				<!--左侧导航 e-->
				<!--右侧信息展示   s-->
				<div class="theamInfo nm-right">
					<div class="showMsg homePage">
						<div class="floor ">
							<div class="groupMsg">
								<!--登录用户信息 s-->
								<div class="userInfoFloor">
									<div class="userNameInfo">
										<ul>
											<li>
												姓名：<span><?php echo $_SESSION['username']; ?></span>
											</li>
											<li>
												用户组：<span><?php echo $_SESSION["group_name"]; ?></span>
											</li>
										</ul>
									</div>
									<div class="loginInfo">
										<ul>
											<li>
												上次登录：<span><?php echo $_SESSION['last_time_login']; ?></span>
											</li>
											<li class = " pendingcount">
											</li>
											<li>
												<a href="Other/UsersManageToSales.php">
													修改密码
												</a>
											</li>
										</ul>
									</div>
									<!--天气-->
									<div class="weather nm-right" id="weather"></div>
								</div>
								<!--登录用户信息 e-->
								<div class="otherInfoFloor">
									<!--工作日历 s-->
									<div class="workCalendar otherUserInfo">
										<label class="mark">工作日历</label>
										<div class="layui-inline" id="calendar"></div>
									</div>
									<!--工作日历  e-->
									<!--待处理事项 s-->
									<div class="otherUserInfo pendingItem">
										<label class="mark">待处理事项</label>
                   	<ul class = "ttolist">
            					<a href="javascript:void(0);" class="addNewItem" onclick="addNewMatters()" >
            						<img src="img/item_icon.png" />
            						<!--添加-->
            					</a>
										</ul>
									</div>
									<!--待处理事项 e-->
									<!--相关提醒     s-->
									<div class="otherUserInfo noticeInfo">
										<label class="mark">相关提醒</label>
                    <ul class="noticelist"></ul>
									</div>
									<!--相关提醒     e-->
									<!--当月已成交订单 s-->
									<div class="otherUserInfo userOrderInfo">
										<label class="mark">当月已成交订单</label>
										<label class="mark currency">货币：USD</label>
                    <ul class = "getorder"></ul>
									</div>
									<!--当月已成交订单 e-->
									<!--客户增长  s-->
									<div class="otherUserInfo customerGrowth">
										<label class="mark">最近七日销售榜</label>
										<div class="customerGrowthInfo">
											<ul class = "cgrowth"></ul>
										</div>
									</div>
									<!--客户增长  e-->
								</div>
							</div>
						</div>
					</div>
				</div>
				<!--右侧信息展示   e-->
			</div>
		</div>
		<!-- JS -->
		<script src="js/jquery.min.js" type="text/javascript"></script>
		<script src="js/homePage/public.js" type="text/javascript"></script>
		<script src="js/homePage/homePage.js" type="text/javascript"></script>
	    <script src="js/homePage/weather.js" type="text/javascript"></script>
	    <script src="js/homePage/calendar.js" type="text/javascript"></script>
	    <script src="js/homePage/thingsToDo.js" type="text/javascript"></script>
	    <script src="js/homePage/notice.js" type="text/javascript"></script>
		<script src="layui/layui.js" type="text/javascript"></script>
		<script type="text/javascript">
			$(function() {
				homePage();
			});
		</script>
	</body>
</html>
