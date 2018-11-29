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
		<title>其他管理-公告管理</title>
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
							<a href="../GroupTour/GroupTourCreate.php" class="bm-title ">
								<img src="../img/yewu.png">
								业务
							</a>
							<dl class="detailMsg nm-hide">
								<dd>
									<a href="../GroupTour/GroupTourCreate.php" class="lab-active">
										<label></label> 独立团
									</a>
								</dd>
								<dd>
									<a href="../IndividualTour/IndividualTourCreate.php" >
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
									<a href="javascript:void(0);" class="lab-active">
										<label></label>公告管理
									</a>
								</dd>
								<dd>
									<a href="QueryChange.php">
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
								<label class="theamTitle"> <i></i> 公告管理 </label>
								<!--其他管理   e-->
								<!--<div class="otherManageNav">
									<ul>
										<li>
											<a href="BusinessManage.php">
												折扣码
											</a>
										</li>
										<li class="current-item">
											<a href="javascript:void(0);">
												公告管理
											</a>
										</li>
										<li>
											<a href="Mco.php">MCO</a>
										</li>
										<li>
											<a href="Other.php">
												其他
											</a>
										</li>
									</ul>
								</div>-->
								<!--左边   s-->
								<div class="leftInfoCard">
									
									<div class="filterBox noticeManage">
										<ul>
											<li>
												<div class="checkbox checkbox-success notice_status">
													<input id="checkbox9" class="styled" type="checkbox" checked="checked">
													<label for="checkbox9">只查看未过期公告</label>
												</div>
											</li>
											<li class="deleteNotice">
												<a href="javascript:void(0);">
													删除该公告
												</a>
											</li>
										</ul>
									</div>
									<ul class="listInfo defaultList">
										<li class="listTitle">
											<dl>
												<dd class="noticeID">ID</dd>
												<dd>类别</dd>
												<dd>发布人</dd>
												<dd class="notice_content">公告内容</dd>
											</dl>
										</li>
									</ul>
									<ul class="listInfo disabledListInfo">
										<li class="listTitle">
											<dl>
												<dd class="noticeID">ID</dd>
												<dd>类别</dd>
												<dd>发布人</dd>
												<dd class="notice_content">公告内容</dd>
												<dd>过期</dd>
											</dl>
										</li>
									</ul>
									<!--分页  s-->
									<div class="nav-box eg">
										<ul class="pagination m-style" id="noticePagination"></ul>
									</div>
									<!--分页  e-->
								</div>
								<!--左边   e-->
								<!--右边   s-->
								<div class="rightInfoCard noticeManage_rightInfo">
									<ul class="addInfo">
										<li class="title">
											添加公告
										</li>
										<li class="top_info">
											<div class="checkbox checkbox-success">
												<input id="top" class="styled" type="checkbox" />
												<label for="top">置顶</label>
											</div>
										</li>
										<li class="category">
											<label>类别</label>
											<select id="category">
												<option value="通知">通知</option>
												<option value="提醒">提醒</option>
												<option value="other">其他</option>
											</select>
											<input type="text" class="other_info" id="other_category">
										</li>
										<li class="dateInfo">
											<label>有效期至</label>
											<input type="date" id="valid_until">
										</li>
										<li class="receiver">
											<label>接受公告的人</label>
											<dl>
												<dd>
													<select id="receiver">
														<option value="all">全部</option>
														<option value="sales">销售</option>
														<option value="accounting">会计</option>
														<option value="customize">Customize</option>
													</select>
												</dd>
												<dd>
													<input type="text"  placeholder="search..." id="user_id" disabled="disabled"/>
													<a href="javascript:void(0);">确认</a>
												</dd>
											</dl>
										</li>
										<li class="getReceiver">
											<label style="visibility: hidden;"></label>
											<textarea id="target_list"></textarea>
										</li>

										<li class="notice_content">
											<label>公告内容</label>
											<textarea id="notice_content"></textarea>
										</li>
										<li class="actionFilerBox">
											<a href="javascript:void(0);" class="filterInfo" id="create_notice">发布</a>
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
									<p class="confirmNotice">确认发布</p>
									<p class="actionBox">
										<button class="actionConfirm">确认</button>
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
		<script type="text/javascript">
			var notExpiredNotice = [];
			var allNotice = [];
		</script>
		<script src="../js/jquery.min.js" type="text/javascript"></script>
		<script src="../js/jquery.pagination.js" type="text/javascript"></script>
		<script src="../js/homePage/public.js" type="text/javascript"></script>
		<script src="../js/Other/Other.js" type="text/javascript"></script>
		<script src="../js/Other/noticeManage.js" type="text/javascript"></script>
	</body>
</html>
