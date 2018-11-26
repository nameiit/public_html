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
		<title>其他管理-其他</title>
		<link href="../css/otherInfo.css" type="text/css" rel="stylesheet" />
		<link href="../css/style.css" type="text/css" rel="stylesheet" />
		<link href="../css/font-awesome.css" type="text/css" rel="stylesheet" />
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
			<!--主内容区  s-->
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
									<a href="BusinessManage.php">
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
									<a href="Other.php" class="lab-active">
										<label></label> 其他管理
									</a>
								</dd>
							</dl>
						</li>
					</ul>
				</div>
				<!--左侧导航   e-->
				<!--右侧导航   s-->
				<div class="theamInfo nm-right">
					<div class="showMsg otherManage">
						<div class="floor otherManageArea">
							<div class="groupMsg">
								<!--其他管理   s-->
								<label class="theamTitle"> <i></i> 其他管理 </label>
								<!--其他管理   e-->
								<div class="otherManageNav">
									<ul>
										<li class="current-item">
											<a href="javascript:void(0);">
												其他
											</a>
										</li>
										<li>
											<a href="extendedFunctionPage.php">扩展功能</a>
										</li>
									</ul>
								</div>
								<!--左侧  s-->
								<div class="leftManageInfo">
									<!--顾客来源  s-->
									<div class="manageCard manageContent">
										<ul>
											<li class="manageTitle">
												顾&nbsp;客&nbsp;来&nbsp;源
											</li>
											<li class="manageAction">
												<dl class="manageCardNav">
													<dd class="optionItem plusItem">
														<a href="javascript:void(0);">
															<img src="../img/plus.png">
														</a>
													</dd>
													<dd class="optionItem minusItem">
														<a href="javascript:void(0);" id="delete-customer-source">
															<img src="../img/minus.png">
														</a>
													</dd>
													<dd class="confirmManageInfo">
														<input type="text" id="customer-source-name">
														<a href="javascript:void(0);" class="confirmBtn" id="customer-source-confirm">确认</a>
													</dd>
												</dl>
											</li>
											<li class="manegeDetailInfo">
												<label>顾客来源</label>
												<dl id="customer-source-list">
													<!--test s-->
													<dd class="selected">来源</dd>
													<dd>来源</dd>
													<dd>来源</dd>
													<dd>来源</dd>
													<dd>来源</dd>
													<dd>来源</dd>
													<dd>来源</dd>
													<dd>来源</dd>
													<dd>来源</dd>
													<dd>来源</dd>
													<dd>来源</dd>
													<dd>来源</dd>
													<dd>来源</dd>
													<dd>来源</dd>
													<dd>来源</dd>
													<dd>来源</dd>
													<dd>来源</dd>
													<dd>来源</dd>
													<dd>来源</dd>
													<dd>来源</dd>
													<!--test e-->
												</dl>
											</li>
										</ul>
									</div>
									<!--顾客来源  e-->
								</div>
								<!--左侧  e-->
								<!--右侧  s-->
								<div class="rightManageInfo">
									<!--分部   s-->
									<div class="manageCard divisionCard">
										<ul>
											<li class="manageTitle">
												分&nbsp;&nbsp;部
											</li>
											<li class="manegeDetailInfo">
												<div class="rightInfo divisionRightInfo">
													<ul class="divisionMsg">
														<li class="tabTitle">
															<dl>
																<dd class="divisionName">分部</dd>
																<dd class="divisionDetail">详情</dd>
															</dl>
														</li>
													</ul>
												</div>
												<div class="rightInfoCard divisionRightInfoCard">
													<ul class="addInfo">
														<li class="title">添加</li>
														<li>
															<label>分部</label>
															<input type="text" class="divisionName" id="department-name">
														</li>
														<li>
															<label>详情</label>
															<textarea rows="3" class="divisionDetail" id="department-detail"></textarea>
														</li>
														<li class="actionFilerBox">
															<a href="javascript:void(0);" class="filterInfo" id="add-department-confirm">确认</a>
															<a href="javascript:void(0);" class="resetInfo" id="add-department-reset">重置</a>
														</li>
													</ul>
												</div>
											</li>
										</ul>
									</div>
									<!--分部  e-->
									<!--MCO刷卡公司   s-->
									<div class="creditCardCompanies manageCard">
										<ul>
											<li class="manageTitle">
												MCO&nbsp;刷&nbsp;卡&nbsp;公&nbsp;司
											</li>
											<li class="manageAction">
												<dl class="manageCardNav">
													<dd class="optionItem plusItem">
														<a href="javascript:void(0);">
															<img src="../img/plus.png">
														</a>
													</dd>
													<dd class="optionItem minusItem">
														<a href="javascript:void(0);">
															<img src="../img/minus.png">
														</a>
													</dd>
													<dd class="confirmManageInfo">
														<input type="text" id="mco-party">
														<a href="javascript:void(0);" class="confirmBtn" id="add-mco-party-confirm">确认</a>
													</dd>
												</dl>
											</li>
											<li class="manegeDetailInfo">
												<label>MCO刷卡公司</label>
												<dl class="companyInfor">
													<ul>
														<li>
															<dl class="detailTitle">
																<dd class="orderInfo">顺序</dd>
																<dd class="nameInfor">公司名称</dd>
															</dl>
														</li>
														<!--<li class="contentInfo">
															<dl class="detailContent">
																<dd class="orderInfo">1</dd>
																<dd class="nameInfor">GIT</dd>
															</dl>
														</li>
														<li class="contentInfo selected">
															<dl class="detailContent">
																<dd class="orderInfo">1</dd>
																<dd class="nameInfor">GIT</dd>
															</dl>
														</li>-->
													</ul>
												</dl>
											</li>
										</ul>
									</div>
									<!--MCO刷卡公司   e-->
								</div>
								<!--右侧  e-->
							</div>
						</div>
					</div>
				</div>
				<!--右侧导航   e-->
			</div>
			<!--主内容区  e-->
		</div>
		<?php
		$status = $_SESSION["group_name"];
		echo "<script type='text/javascript'>localStorage.setItem('status', '$status');</script>";
		 ?>
		<script src="../js/jquery.min.js" type="text/javascript"></script>
		<script src="../js/homePage/public.js" type="text/javascript"></script>
		<script src="../js/homePage/otherInfo.js" type="text/javascript"></script>
		<script src="../js/Other/OtherManagement.js" type="text/javascript"></script>
		<script type="text/javascript">
			$(function () {
				otherManage();
			});
		</script>
	</body>
</html>
