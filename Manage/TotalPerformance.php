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
		<title>总体业绩</title>
		<link href="../css/performanceManage.css" rel="stylesheet" type="text/css" />
		<link href="../css/style.css" type="text/css" rel="stylesheet" />
		<link href="../css/jquery.searchableSelect.css" type="text/css" rel="stylesheet" />
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
								<!--<dd>
									<a href="../OrderHistory/OrderHistory.php" class="lab-active">
										<label></label> 历史订单
									</a>
								</dd>
								<dd>
									<a href="../AccountingService/GroupTourService.php"><label></label> 会计服务</a>
								</dd>-->
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
									总体业绩
								</label>
								<!--左侧内容   s-->
								<div class="performanceTheam">
									<!--右箭头   s-->
									<a class="arrow" href="javascript:void(0);">
										&raquo;
									</a>
									<!--右箭头   e-->
									<div class="nav-back">
									<span class="filter_title">基本筛选</span>
									<a href="PerformanceManage.php" class="ms-back totalPage">返回概况</a>
									</div>
									<div class="salesCard totalCard">
										<div class="leftInfo">
											<ul>
												<li>
													<select>
														<option>
															每月
														</option>
														<option>
															每日
														</option>
														<option>
															每3个月
														</option>
														<option>
															每半年
														</option>
													</select>
													<select>
														<option>
															部门
														</option>
														<option>
															西安
														</option>
														<option>
															北京
														</option>
														<option>
															纽约
														</option>
													</select>
												</li>
												<li>
													<dl>
														<dd><label>From</label></dd>
														<dd><input type="date"></dd>
													</dl>
												</li>
												<li>
													<dl>
														<dd><label>To</label></dd>
														<dd><input type="date"></dd>
													</dl>
												</li>
											</ul>
										</div>
									</div>
									<div  class="diviLine">

									</div>
									<span class="filter_title">高级筛选</span>
									<div class="salesCard totalCard filter_box">
										<div class="leftInfo">
											<ul>
												<li>
													<dd>
														<select name="">
															<option value="">顾客来源</option>
														</select>
													</dd>
												</li>
												<li>
													<dd>
														<select name="">
															<option value="">支付方式</option>
															<option >Credit Card</option>
															<option >MCO</option>
															<option >Alipay</option>
															<option >WeChat</option>
															<option >Cash</option>
															<option >Check</option>
															<option >Other</option>
															<option>REMIT</option>
														</select>
													</dd>
												</li>
												<li class="selectInfoBox">
													<dd>独立团</dd>
													<dd>散拼团</dd>
													<dd>机票</dd>
												</li>
												<li class="detailInfo">
													<dd class="nm-hide">
														<select name="">
															<option value="">零售商</option>
															<option>代理商</option>
															<option>无</option>
														</select>
													</dd>
													<dd class="nm-hide">
														<input type="text" placeholder="代理商"/>
													</dd>
												</li>
											</ul>

										</div>
									</div>
								</div>
								<!--左侧内容   e-->

								<!--右侧内容   s-->
								<div class="performanceTheam chartInfo">
									<a href="javascript:void(0);" class="nm-right newChart">生成表格</a>
									<div class="tabCard totalMsgCard">
										<p>总体业绩</p>
										<!--图表部分   s-->
										<div id="container" class="chart" style="border: solid 1px #ccc;"></div>
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
		<script src="../js/jquery.min.js" type="text/javascript"></script>
		<script src="../js/homePage/public.js" type="text/javascript"></script>
		<script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts/echarts.min.js"></script>
		<script src="../js/homePage/salesPerformance.js" type="text/javascript"></script>
		<script src="../js/jquery.searchableSelect.js" type="text/javascript"></script>
		<script type="text/javascript">
			$(function() {
				arrowAction();
//				autoCenter($(".arrow"));
				currentStates();
				$(".performanceTheam .nav-back").find("a.ms-back").on("mousedown",function(){
					$(this).addClass("selected");
				});
				$(".performanceTheam .nav-back").find("a.ms-back").on("mouseup",function(){
					$(this).removeClass("selected");
				});
			});
		</script>

	</body>

</html>
