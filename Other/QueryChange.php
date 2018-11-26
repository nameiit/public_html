<?php
session_start();
if (!isset($_SESSION['login']) || $_SESSION['login'] != true) {
	header('location: ../login.php');
}
 ?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<title>其他-订单变动查询</title>
		<link href="../css/otherInfo.css" type="text/css" rel="stylesheet" />
		<link href="../css/style.css" type="text/css" rel="stylesheet" />
		<link href="../css/font-awesome.css" type="text/css" rel="stylesheet" />
		<link href="../css/pagination.css" type="text/css" rel="stylesheet" />
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
									<a href="QueryChange.php" class="lab-active">
										<label></label>订单变动
									</a>
								</dd>
								<dd>
									<a href="javascript:void(0);" id="toUsersManagePage">
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
					<div class="showMsg otherManage">
						<div class="floor otherManageArea">
							<div class="groupMsg">
								<!--其他管理   s-->
								<label class="theamTitle orderChange"><i></i>订单变动查询</label>
								<!--其他管理   e-->
								<!--左边   s-->
								<div class="leftInfoCard orderChangeQuery">
									<ul class="listInfo">
										<li class="listTitle">
											<dl>
												<dd class="logID">Log&nbsp;ID</dd>
												<dd class="orderNum">订单号</dd>
												<dd class="amendantRecord">修改记录</dd>
												<dd class="beforeChange">修改前</dd>
												<dd class="afterChange">修改后</dd>
												<dd class="changedBy">修改人</dd>
												<dd class="changeTime">修改时间</dd>
											</dl>
										</li>
										<!-- <li class="listDetail">
											<dl>
												<dd class="logID">1111111111</dd>
												<dd class="orderNum">0000000002</dd>
												<dd class="amendantRecord">
													修改记录修改记录修改记录修改记录修改记录
												</dd>
												<dd class="beforeChange">
													修改前修改前修改前修改前修改前修改前
												</dd>
												<dd class="afterChange">
													修改后修改后修改后
												</dd>
												<dd class="changedBy">修改人</dd>
												<dd class="changeTime">修改时间</dd>
											</dl>
										</li> -->
										<!-- <li class="listDetail">
											<dl>
												<dd class="logID">002</dd>
												<dd class="orderNum">0000000002</dd>
												<dd class="amendantRecord">
													修改
												</dd>
												<dd class="beforeChange">
													修改前修改前修改前修改前修改前修改前
												</dd>
												<dd class="afterChange">
													修改后修改后修改后
												</dd>
												<dd class="changedBy">修改人</dd>
												<dd class="changeTime">修改时间</dd>
											</dl>
										</li> -->
									</ul>
									<!--分页  s-->
									<div class="nav-box eg">
										<ul class="pagination m-style" id="queryPagination"></ul>
									</div>
									<!--分页  e-->
								</div>
								<!--左边   e-->
								<!--右边   s-->
								<div class="rightInfoCard orderChangeQuery">
									<ul class="addInfo">
										<li class="title">
											筛选
										</li>
										<li>
											<label>订单号</label>
											<input type="text" id="updateLogTransactionID"/>
										</li>
										<li class="dateInfo">
											<label>修改时间</label>
											<div>
												<input type="date" id="updateLogFromDate">
												<span>~</span>
												<input type="date" id="updateLogToDate">
											</div>
										</li>
										<li>
											<label>修改人</label>
											<input type="text" id="updateLogRevisedBy"/>
										</li>

										<li class="actionFilerBox">
											<a href="javascript:void(0);" class="filterInfo" id="filter-confirm">确认</a>
											<a href="javascript:void(0);" class="resetInfo">清空</a>
										</li>
									</ul>
								</div>
								<!--右边   e-->
								<!--确认框       s-->
								<div class="confirmNoticeInfo">
									<p class="confirmTitle">
										<img src="../img/confirmInfo.png" />
									</p>
									<p class="confirmNotice">确认</p>
									<p class="actionBox">
										<button class="actionConfirm" id="create-mco">确认</button>
										<button	class="actionCancel">取消</button>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!--右侧内容   e-->
			</div>
			<!--主内容区   e-->
		</div>
		<script src="../js/jquery.min.js" type="text/javascript"></script>
		<script src="../js/jquery.pagination.js" type="text/javascript"></script>
		<script src="../js/homePage/public.js" type="text/javascript"></script>
		<script src="../js/Other/Other.js" type="text/javascript"></script>
		<script src="../js/Other/QueryChange.js" type="text/javascript"></script>
	</body>
</html>
