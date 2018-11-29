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
		<title>销售人员业绩</title>
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
									销售人员业绩
								</label>
								<!--左侧内容   s-->
								<div class="performanceTheam">
									<!--右箭头   s-->
									<!--<a class="arrow" href="javascript:void(0);">
										&raquo;
									</a>-->
									<!--右箭头   e-->

									<ul class="salesNav">
										<?php
										if ($_SESSION["group_name"] != 'normal') {
										 ?>
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
											<input id="performance-filter-salesperson" type="text" placeholder="销售人员">
											<a href="javascript:void(0);" class="confirmBtn">确认</a>
 										</li>
									<?php } ?>
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
										<?php
										if ($_SESSION["group_name"] != 'normal') {
										 ?>
										<div class="rightInfo">
											<ul>
												<li class="chartTitle">销售人员</li>
											</ul>
										</div>
									<?php } ?>
										<p class="currency">
											<img src="../img/currencyIcon.png" />
											货币&nbsp;:&nbsp;美元
										</p>
										<ul class="rankingList rankingList1">
											<li class="listTitle">
												<dl>
													<dd>日期</dd>
													<dd>独立团</dd>
													<dd>散拼团</dd>
													<dd>机票</dd>
													<dd>总和</dd>
												</dl>
											</li>
										</ul>
										<!--选择多条销售名时的表  s-->
										<ul class="rankingList rankingList2">
											<li class="listTitle">
												<dl>
													<dd>日期</dd>
													<dd>销售</dd>
													<dd>独立团</dd>
													<dd>散拼团</dd>
													<dd>机票</dd>
													<dd>总和</dd>
												</dl>
											</li>
										</ul>
										<!--选择多条销售名时的表   e-->
									</div>
								</div>
								<!--左侧内容   e-->
								<!--右侧内容   s-->
								<div class="performanceTheam chartInfo">

									<p class="infoTitle">
										<label class="nm-left">销售业绩</label>
										<div style="clear:both;"></div>
									</p>
									<!-- 0713mw -->
									<div class="tabCard">
										<!--图表部分   s-->
										<canvas class="chart" id="total-chart"></canvas>
										<!--图表部分   e-->
									</div>
									<p class="infoTitle">
										<label class="nm-left">个人业绩</label>
											<select id="type_filter" onchange="selectSales()">
												<option value="group">独立团</option>
												<option value="indivi" >散拼团</option>
												<option value="airTicket">机票</option>
												<option value="sum" selected>总和</option>
											</select>
											<div style="clear:both;"></div>
									</p>
									<div class="tabCard">
									<canvas class="chart" id="bar-chart"></canvas>
									<canvas class="chart" id="dou-chart"></canvas>


										<!--图表部分 <p>业绩占比</p>  s-->
										<div id="container2" class="chart"></div>

									<!--------------------------------------------------->
										<!--图表部分   e-->
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
		<?php
		if ($_SESSION["group_name"] == 'normal') {
			$user_code = $_SESSION['username'];
			echo "<script type='text/javascript'>localStorage.setItem('sales_code', '$user_code');</script>";
		} else {
			echo "<script type='text/javascript'>localStorage.setItem('sales_code', '');</script>";
		}
		 ?>
		<script src="../js/jquery.min.js" type="text/javascript"></script>
		<!-- Chart.js -->
		<!-- http://www.chartjs.org/docs/2.7.2/ -->
		<script src="../js/Chart.min.js" type="text/javascript"></script>
		<script src="../js/homePage/public.js" type="text/javascript"></script>
		<script src="../js/Management/salesPerformance.js" type="text/javascript"></script>
		<script src="../js/homePage/salesPerformance.js" type="text/javascript"></script>
		<script src="../js/jquery.searchableSelect.js" type="text/javascript"></script>
		<script type="text/javascript">
			$(function(){
				// arrowAction();
				// selectDate();
				// ckdate($("#startTime"),$("#endTime"));
//				autoCenter($(".arrow"));
				autoWrap();
				$("ul.salesNav li").find("a.ms-back").on("mousedown",function(){
					$(this).addClass("selected");
				});
				$("ul.salesNav li").find("a.ms-back").on("mouseup",function(){
					$(this).removeClass("selected");
				});
			});
		</script>
	</body>
</html>
