<?php
session_start();
if (!isset($_SESSION['login']) || $_SESSION['login'] != true) {
	header('location: ../login.php');
}
 ?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<title>管理-业绩管理</title>
		<link href="../css/performanceManage.css" rel="stylesheet" type="text/css" />
		<link href="../css/style.css" type="text/css" rel="stylesheet" />
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
			<!--content s-->
			<div class="msContent">
				<!--左侧导航    s-->
				<div class="navInfo nm-left">
					<ul>
						<li class="shouye">
							<a href="../index.php" class="bm-title">
								<img src="../img/shouye.png"> 首页
							</a>
						</li>
						<li class="yewu">
							<a href="../GroupTour/GroupTourCreate.php" class="bm-title ">
								<img src="../img/yewu.png"> 业务
							</a>
							<dl class="detailMsg nm-hide">
								<dd>
									<a href="../GroupTour/GroupTourCreate.php" class="lab-active">
										<label></label> 独立团
									</a>
								</dd>
								<dd>
									<a href="../IndividualTour/IndividualTourCreate.php">
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
							<a href="../Other/AccountingConfirm.php" class="bm-title">
								<img src="../img/kuaiji.png"> 财务
							</a>
							<dl class="detailMsg nm-hide">
							</dl>
						</li>
						<li class="guanli title-active">
							<a href="javascript:void(0);" class="bm-title">
								<img src="../img/c_guanli.png"> 管理
							</a>
							<dl class="detailMsg">
								<dd>
									<a href="TourGuideManage.php">
										<label></label> 人员管理
									</a>
								</dd>
								<dd>
									<a href="javascript:void(0);" class="lab-active">
										<label></label> 业绩管理
									</a>
								</dd>
								<dd>
									<a href="FinancialAudit.php">
										<label></label>财务审核
									</a>
								</dd>
							</dl>
						</li>
						<li class="bm-title qita">
							<a href="../Other/NoticeManage.php">
								<img src="../img/qita.png"> 其他
							</a>
						</li>
					</ul>

				</div>
				<!--左侧导航    e-->
				<!--右侧内容    s-->
				<div class="theamInfo nm-right">
					<div class="showMsg performanceMsg">
						<div class="floor">
							<div class="groupMsg">
								<!--概况  s-->
								<label class="theamTitle">
									<i></i>
									概况
								</label>
								<!--概况  e-->
								<!--左侧销售人员业绩     s-->
								<div class="performanceTheam">
									<p class="infoTitle">
										<label class="nm-left">销售人员业绩</label>
										<a href="SalesPerformance.php" class="nm-right">详细报告</a>
										<div style="clear:both;"></div>
									</p>
									<ul class="filterBox">
										<li class="salesItem">
											<input id="performance-filter-salesperson" type="text" placeholder="销售人员"  <?php if ($_SESSION["group_name"] == 'normal') { echo "value='" . $_SESSION['username'] . "' disabled"; } ?>>
										</li>
										<li class="dateItem">
											<select id="performance-time-filter">
												<option value="daily">每日</option>
												<option value="monthly" selected>每月</option>
												<option value="seasonly">每三个月</option>
												<option value="hyearly">每半年</option>
												<option value="yearly">每年</option>
											</select>
										</li>
										<li class="actionItem">
											<a href="javascript:void(0);" id="sales-performance-filter">查看</a>
										</li>
									</ul>
									<p class="tips">销售人员：<label></label></p>
									<ul class="rankingList performanceList">
										<li class="listTitle">
											<dl>
												<dd>时间</dd>
												<dd>独立团</dd>
												<dd>散拼团</dd>
												<dd>机票</dd>
												<dd>总和</dd>
											</dl>
										</li>
										<li class="detailInfo">
											<dl>
	                        <dd class="time">2015-05</dd>
	                        <dd class="groupTour">123</dd>
	                        <dd class="individualTour">456</dd>
	                        <dd class="airTicket">789</dd>
	                        <dd class="sum">1234</dd>
	                    </dl>
											<dl>
	                        <dd class="time">2015-05</dd>
	                        <dd class="groupTour">123</dd>
	                        <dd class="individualTour">456</dd>
	                        <dd class="airTicket">789</dd>
	                        <dd class="sum">1234</dd>
	                    </dl>
										</li>
									</ul>
								</div>
								<!--左侧销售人员业绩     e-->
								<!--右侧总体业绩             s-->
								<div class="performanceTheam aggregatePerformance">
									<p class="infoTitle">
										<label class="nm-left">总体业绩</label>
										<a href="travelAgencyPerformance.php" class="nm-right">旅行社业绩</a>
										<div style="clear:both;"></div>
									</p>
									<div class="tabCard">
									    <canvas class="chart" id="line-chart"></canvas>
									</div>

									<div class="tabCard">
									    <canvas class="chart" id="pie-chart"></canvas>
									</div>
								</div>
								<!--右侧总体业绩             e-->
							</div>
						</div>
					</div>
				</div>
				<!--右侧内容    e-->
			</div>
			<!--content e-->
		</div>
		<script src="../js/jquery.min.js" type="text/javascript"></script>
		<!-- Chart.js -->
		<!-- http://www.chartjs.org/docs/2.7.2/ -->
		<script src="../js/Chart.min.js" type="text/javascript"></script>
		<script src="../js/homePage/public.js" type="text/javascript"></script>
		<script src="../js/Management/performance.js" type="text/javascript"></script>
		<script type="text/javascript">
			$(function(){
				var totalHeight=$(".aggregatePerformance").height();
				$(".tabCard").css("height",totalHeight/2);
			});
		</script>

	</body>
</html>
