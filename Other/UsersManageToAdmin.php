<?php session_start();
if (!isset($_SESSION['login']) || $_SESSION['login'] != true) {
	header('location: ../login.php');
}
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<title>用户管理（管理人员）</title>
		<link href="../css/usersManage.css" type="text/css" rel="stylesheet" />
		<link href="../css/style.css" type="text/css" rel="stylesheet" />
		<link href="../css/font-awesome.css" type="text/css" rel="stylesheet" />
		<link href="../css/jquery.searchableSelect.css"  type="text/css" rel="stylesheet"/>
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
			<!--主内容区   s-->
			<div class="msContent">
				<!--左侧导航   s-->
				<div class="navInfo nm-left">
					<ul>
						<li class="shouye">
							<a href="../index.php" class="bm-title">
								<img src="../img/shouye.png">
								首页
							</a>
						</li>
						<li class="yewu">
							<a href="../IndividualTour/IndividualTourCreate.php" class="bm-title ">
								<img src="../img/yewu.png">
								业务
							</a>
							<dl class="detailMsg nm-hide">
								<!--<dd>
									<a href="../GroupTour/GroupTourCreate.php" class="lab-active">
										<label></label> 独立团
									</a>
								</dd>-->
								<dd>
									<a href="../IndividualTour/IndividualTourCreate.php" class="lab-active">
										<label></label> 散拼团
									</a>
								</dd>
								<dd>
									<a href="../AirTicket/AirTicketCreate.php">
										<label></label> 机票
									</a>
								</dd>
							</dl>
						</li>
						<li class="kuaiji">
							<a href="AccountingConfirm.php" class="bm-title">
								<img src="../img/kuaiji.png">
								财务
							</a>
							<dl class="detailMsg nm-hide">
								<!--<dd>
									<a href="../OrderHistory/OrderHistory.php" class="lab-active">
										<label></label> 历史订单
									</a>
								</dd>
								<dd>
									<a href="../AccountingService/GroupTourService.php">
										<label></label> 会计服务
									</a>
								</dd>-->
							</dl>
						</li>
						<li class="guanli">
							<a href="../Manage/TourGuideManage.php" class="bm-title">
								<img src="../img/guanli.png">
								管理
							</a>
							<dl class="detailMsg nm-hide">
								<dd>
									<a href="../Manage/TourGuideManage.php" class="lab-active">
										<label></label> 人员管理
									</a>
								</dd>
								<dd>
									<a href="../Manage/PerformanceManage.php">
										<label></label> 业绩管理
									</a>
								</dd>
							</dl>
						</li>
						<li class="qita title-active">
							<a href="../Other/NoticeManage.php" class="bm-title">
								<img src="../img/c_qita.png">
								其他
							</a>
							<dl class="detailMsg">
								<!--<dd>
								<a href="BusinessManage.php" >
								<label></label>业务管理
								</a>
								</dd>-->
								<dd>
									<a href="NoticeManage.php">
										<label></label>公告管理
									</a>
								</dd>
								<dd>
									<a href="QueryChange.php">
										<label></label>订单变动
									</a>
								</dd>
								<dd>
									<a href="javascript:void(0);" id="toUsersManagePage" class="lab-active">
										<label></label> 用户管理
									</a>
								</dd>
								<dd>
									<a href="messageBoard.php">
										<label></label>留言查询
									</a>
								</dd>
								<dd>
									<a href="Other.php">
										<label></label> 其他管理
									</a>
								</dd>
							</dl>
						</li>
					</ul>
				</div>
				<!--左侧导航   e-->
				<!--右侧内容   s-->
				<div class="theamInfo nm-right">
					<div class="showMsg usersManage">
						<div class="floor usersManageArea">
							<div class="groupMsg">
								<label class="theamTitle"><i></i>用户管理 </label>
								<div class="usersManageContent">
									<div class="userGroup">
										<ul>
											<li class="groupTitle">
												用户组
											</li>
											<li class="salesNav selected">
												销售人员
											</li>
											<li class="accountingNav">
												会计
											</li>
											<li class="financeNav">
												财务
											</li>
											<li class="managerNav">
												管理员
											</li>
											<li class="adminNav">
												admin
											</li>
										</ul>
									</div>
									<div class="usersInfo">
										<ul>
											<li class="userInfoTitle">
												<dl>
													<dd class="detail-active">
														<!--用户名-->
														<select class="searchItem" id="username-filter">
															<option value="all">用户名</option>
														</select>
													</dd>
													<dd>
														最近登录时间
													</dd>
												</dl>
											</li>
											<!--<li class="userDetail">
												<dl>
													<dd class="userName">123</dd>
													<dd class="loginTime">234</dd>
												</dl>
											</li>
											<li class="userDetail">
												<dl>
													<dd class="userName">125</dd>
													<dd class="loginTime">236</dd>
												</dl>
											</li>-->
										</ul>
									</div>
									<div class="rightTab">
										<ul class="usersManageNav">
											<li class="current-item">
												<a href="javascript:void(0);">
													修改
												</a>
											</li>
											<li>
												<a href="javascript:void(0);">
													添加
												</a>
											</li>
										</ul>
										<!--修改用户名，密码   s-->
										<div  class="basicInfo usersManageInfo">
											<ul  class="manageDetail">
												<li>
													<label>用户名</label>
													<input type="text" class="userName" id="update-username">
												</li>
												<li>
													<label>新密码</label>
													<input type="password" id="update-password">
												</li>
												<li>
													<label>确认密码</label>
													<input type="password" id="update-confirm-password">
												</li>
												<li class="actionFilerBox actionFloor">
													<a href="javascript:void(0);" id="update-password-confirm">修改</a>
													<a href="javascript:void(0);" id="update-password-reset">重置</a>
													<a href="javascript:void(0);" class="authorityManageBtn">权限管理</a>
												</li>
											</ul>
										</div>
										<!--修改用户名密码  e-->
										<!--权限管理     s-->
										<div class="authorityManageCard">
											<ul>
												<li class="title">权限管理</li>
												<li>
													<div>
														<label class="switch">
															<input class="btn-switch large" type="checkbox" id="lock-power-control">
														</label>
														<span>LOCK&nbsp;状态修改</span>
													</div>
													<div>
														<label class="switch">
															<input class="btn-switch large" type="checkbox" id="unlock-power-control">
														</label>
														<span>取消LOCK&nbsp;状态修改</span>
													</div>
												</li>
												<li>
													<div>
														<label class="switch">
															<input class="btn-switch large" type="checkbox" id="clear-power-control">
														</label>
														<span>CLEAR&nbsp;状态修改</span>
													</div>
													<div>
														<label class="switch">
															<input class="btn-switch large" type="checkbox" id="unclear-power-control">
														</label>
														<span>取消CLEAR&nbsp;状态修改</span>
													</div>
												</li>
												<li>
													<div>
														<label class="switch">
															<input class="btn-switch large" type="checkbox" id="paid-power-control">
														</label>
														<span>PAID&nbsp;状态修改</span>
													</div>
													<div>
														<label class="switch">
															<input class="btn-switch large" type="checkbox" id="unpaid-power-control">
														</label>
														<span>取消PAID&nbsp;状态修改</span>
													</div>
												</li>
												<li>
													<div>
														<label class="switch">
															<input class="btn-switch large" type="checkbox" id="finish-power-control">
														</label>
														<span>FINISH&nbsp;状态修改</span>
													</div>
													<div>
														<label class="switch">
															<input class="btn-switch large" type="checkbox" id="unfinish-power-control">
														</label>
														<span>取消FINISH&nbsp;状态修改</span>
													</div>
												</li>
											</ul>
										</div>

										<!--权限管理     e-->

										<!--添加用户名密码  s-->
										<div class="addItem usersManageInfo">
											<ul class="manageDetail">
												<li>
													<label>用户名</label>
													<input type="text" class="userName" id="create-username">
												</li>
												<li>
													<label>密码</label>
													<input type="password" id="create-password">
												</li>
												<li>
													<label>确认密码</label>
													<input type="password" id="create-confirm-password">
												</li>
												<li class="actionFilerBox">
													<a href="javascript:void(0);" id="create-user-confirm">
														添加
													</a>
													<a href="javascript:void(0);" id="create-user-reset">
														清空
													</a>
												</li>
											</ul>
										</div>
										<!--添加用户名密码  e-->
									</div>
									<!--确认框       s-->
									<div class="confirmUsersInfo">
										<p class="confirmTitle">
											<img src="../img/userConfirm.png" />
										</p>
										<p class="confirmNotice">
											修改成功
										</p>
										<p class="actionBox">
											<button class="actionConfirm adminConfirm copyInfo">
											复制
											</button>
											<button	class="actionCancel">
											返回
											</button>
										</p>
									</div>
									<!--确认框       e-->
								</div>
							</div>
						</div>
					</div>
				</div>
				<!--右侧内容   e-->
			</div>
			<!--主内容区   e-->
		</div>
		<script type="text/javascript">
			var users = [];
			var sales_users = [];
			var accounting_users = [];
			var finance_users = [];
			var admin_users = [];
			var super_admin = [];
		</script>
		<script src="../js/jquery.min.js" type="text/javascript"></script>
		<script src="../js/homePage/public.js" type="text/javascript"></script>
		<script src="../js/Other/UserAdmin.js" type="text/javascript"></script>
		<script src="../js/jquery.zclip.js" type="text/javascript"></script>
		<script src="../js/clipboard.min.js" type="text/javascript"></script>
		<script src="../js/jquery.searchableSelect.js" type="text/javascript"></script>
	</body>
</html>
