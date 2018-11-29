<?php
session_start();
if (!isset($_SESSION['login']) || $_SESSION['login'] != true) {
	header('location: ../login.php');
}

function alert($msg) {
		echo "<script type='text/javascript'>alert('$msg');</script>";
}

if ($_SESSION["group_name"] == 'accounting') {
	alert("权限不足");
	if(isset($_SERVER['HTTP_REFERER'])) {
    $previous = $_SERVER['HTTP_REFERER'];
	}
	echo "<script type='text/javascript'>window.location.href = '$previous';</script>";
}
 ?>
<!DOCTYPE html>
<html>

	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<title>旅行社业绩</title>
		<link href="../css/performanceManage.css" rel="stylesheet" type="text/css" />
		<link href="../css/style.css" type="text/css" rel="stylesheet" />
		<link href="../css/jquery.searchableSelect.css"  type="text/css" rel="stylesheet"/>
		<link href="../css/salesPerformance.css" type="text/css" rel="stylesheet" />
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
								<label class="theamTitle">
									<i></i>
									旅行社业绩
								</label>
								<!--左侧内容   s-->
								<div class="performanceTheam">
									<!--右箭头   s-->
									<!--<a class="arrow" href="javascript:void(0);">
										&raquo;
									</a>-->
									<!--右箭头   e-->
									<ul class="salesNav">
										<li class="optionItem plusItem">
											<a href="javascript:void(0);">
												<img src="../img/plus.png" />
											</a>
											</li>
										<li class="optionItem minusItem">
											<a href="javascript:void(0);">
												<img src="../img/minus.png" />
											</a>
										</li>
										<li class="salesFilter">
											<input id="travelAgency" type="text" placeholder="旅行社">
											<a href="javascript:void(0);" class="confirmBtn">确认</a>
   										</li>
   										<li class="backBox"><a href="PerformanceManage.php" class="ms-back">返回概况</a></li>
									</ul>
									<div class="salesCard">
										<div class="leftInfo">
											<ul>
												<li>
													<select id="time_filter">
														<option value="daily">每日</option>
														<option value="monthly" selected>每月</option>
														<option value="seasonly">每3个月</option>
														<option value="hyearly">每半年</option>
													</select>
												</li>
												<li>
													<dl>
														<dd><label>From</label></dd>
														<dd><input type="date" id="startTime"></dd>
													</dl>
												</li>
												<li>
													<dl>
														<dd><label>To</label></dd>
														<dd><input type="date" id="endTime"></dd>
													</dl>
												</li>
											</ul>
										</div>
										<div class="rightInfo">
											<ul>
												<li class="chartTitle">旅行社</li>
											</ul>
										</div>
										<p class="currency">
											<img src="../img/currencyIcon.png" />
											货币&nbsp;:&nbsp;美元
										</p>
										<!--单人情况表   s-->
										<ul class="rankingList rankingList1 travelAgencyInfo">
											<li class="listTitle">
												<dl>
													<dd>日期</dd>
													<dd>机票销售总额</dd>
												</dl>
											</li>
											<!--test s-->
											<li class="detailInfo">
												<dl><dd>2018-05-03-2018-08-03</dd><dd>123</dd></dl>
											</li>
											<li class="detailInfo">
												<dl><dd>2018-05-03-2018-08-03</dd><dd>123</dd></dl>
											</li>
											<li class="detailInfo">
												<dl><dd>2018-05-03-2018-08-03</dd><dd>123</dd></dl>
											</li>
											<li class="detailInfo">
												<dl><dd>2018-05-03-2018-08-03</dd><dd>123</dd></dl>
											</li>
											<li class="detailInfo">
												<dl><dd>2018-05-03-2018-08-03</dd><dd>123</dd></dl>
											</li>
											<li class="detailInfo">
												<dl><dd>2018-05-03-2018-08-03</dd><dd>123</dd></dl>
											</li>
											<!--test e-->
										</ul>
										<!--单人情况表      e-->
										<!--选择多条旅行社信息的表  s-->
										<ul class="rankingList rankingList2 travelAgencyInfo">
											<li class="listTitle">
												<dl>
													<dd>日期</dd>
													<dd>旅行社</dd>
													<dd>机票销售总额</dd>
												</dl>
											</li>
											<!--test s-->
											<li class="detailInfo">
												<dl>
													<dd>2018-05-03-2018-08-03</dd>
													<dd class="travelAgency">旅行社1</dd>
													<dd>123</dd>
												</dl>
											</li>
											<li class="detailInfo">
												<dl>
													<dd>2018-05-03-2018-08-03</dd>
													<dd class="travelAgency">旅行社2</dd>
													<dd>123</dd>
												</dl>
											</li>
											<li class="detailInfo">
												<dl>
													<dd>2018-05-03-2018-08-03</dd>
													<dd class="travelAgency">旅行社3</dd>
													<dd>123</dd>
												</dl>
											</li>
											<li class="detailInfo">
												<dl>
													<dd>2018-05-03-2018-08-03</dd>
													<dd class="travelAgency">旅行社4</dd>
													<dd>123</dd>
												</dl>
											</li>
											<li class="detailInfo">
												<dl>
													<dd>2018-05-03-2018-08-03</dd>
													<dd class="travelAgency">旅行社5</dd>
													<dd>123</dd>
												</dl>
											</li>

											<!--test e-->
										</ul>
										<!--选择多条旅行社信息的表   e-->
									</div>
								</div>
								<!--左侧内容   e-->
								<!--右侧内容   s-->
								<div class="performanceTheam chartInfo">

									<p class="infoTitle">
										<label class="nm-left totalPerformance">旅行社总体业绩表现</label>
										<div style="clear:both;"></div>
									</p>
									<div class="tabCard">
										<!--图表部分   s-->
										<canvas class="chart"></canvas>
										<!--图表部分   e-->
									</div>
									<p class="infoTitle">
										<label class="nm-left">个人业绩</label>
											<select>
												<option value="group">独立团</option>
												<option value="indivi" >散拼团</option>
												<option value="airTicket">机票</option>
												<option value="sum" selected>总和</option>
											</select>
											<div style="clear:both;"></div>
									</p>
									<div class="tabCard">
										<canvas class="chart" id="bar-chart"></canvas>
											<div id="container2" class="chart"></div>
									</div>
								</div>
								<!--右侧内容  e-->
							</div>
						</div>
					</div>
				</div>
				<!--右侧内容    e-->
			</div>
			<!--content e-->
		</div>
		<script src="../js/jquery.min.js" type="text/javascript"></script>
		<script src="../js/Chart.min.js" type="text/javascript"></script>
		<script src="../js/homePage/public.js" type="text/javascript"></script>
		<script src="../js/homePage/travelAgencyPerformance.js" type="text/javascript"></script>
		<script src="../js/jquery.searchableSelect.js" type="text/javascript"></script>
	</body>
</html>
