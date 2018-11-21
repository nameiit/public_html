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
		<title>财务-数据导出</title>
		<link href="../css/font-awesome.css" type="text/css" rel="stylesheet" />
		<link href="../css/style.css" type="text/css" rel="stylesheet" />
		<link href="../css/otherInfo.css" type="text/css" rel="stylesheet" />
		<link href="../css/pagination.css" type="text/css" rel="stylesheet" />
		<link href="../css/dataExport.css" type="text/css" rel="stylesheet" />
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
						<li class="kuaiji title-active">
							<a href="AccountingConfirm.php" class="bm-title">
								<img src="../img/c_kuaiji.png">
								财务
							</a>
							<dl class="detailMsg">
								<!--<dd>
								<a href="../OrderHistory/OrderHistory.php" >
								<label></label> 历史订单
								</a>
								</dd>
								<dd>
								<a href="../AccountingService/GroupTourService.php">
								<label></label> 会计服务
								</a>
								</dd>-->
								<dd>
									<a href="../Other/AccountingConfirm.php" >
										<label></label>业务管理
									</a>
								</dd>
								<dd>
									<a href="AirTicketDataExport.php" class="lab-active">
										<label></label>数据导出
									</a>
								</dd>
								<dd>
									<a href="Supplement.php">
										<label></label>增补单
									</a>
								</dd>
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
						<li class="bm-title qita">
							<a href="../Other/NoticeManage.php">
								<img src="../img/qita.png">
								其他
							</a>
						</li>
					</ul>
				</div>
				<!--左侧导航   e-->
				<!--右侧内容   s-->
				<div class="theamInfo nm-right">
					<div class="showMsg otherManage">
						<div class="floor otherManageArea accountingContent">
							<div class="groupMsg">
								<label class="theamTitle"> <i></i>数据导出</label>
								<div class="otherManageNav">
									<ul>
										<li>
											<a href="TouristGroupDataExport.php">
												旅游团
											</a>
										</li>
										<li class="current-item">
											<a href="javascript:void(0);">
												机票
											</a>
										</li>
									</ul>
								</div>
								<!--系统筛选    s-->
								<div class="filterBox systematicSearch">
									<label class="markMsg"><i></i>系统筛选</label>
									<ul class="searchFloor">
										<li>
											<div class="leftFloor">
												<label>系统编号</label>
												<input type="text" id="transaction-id">
											</div>
											<div class="rightFloor">
												<div class="rightContent">
													<label>Locator</label>
													<input type="text" id="locator">
												</div>
												<div class="rightContent timeList">
													<label>成交时间</label>
													<select id="settletime">
														<option value="all">全部</option>
														<option value="customized">Customize</option>
														<option value="today">本日</option>
														<option value="current_month">本月</option>
													</select>
												</div>
												<div class="rightContent dealTime">
													<input type="date" id="from-date">
														<span>-</span>
													<input type="date" id="to-date">
												</div>
											</div>
										</li>
										<li>
											<div class="leftFloor customerName">
												<label>顾客姓名</label>
												<input type="text" placeholder="Last Name" class="name" id="lname">
												<input type="text" placeholder="First Name" class="name" id="fname">
											</div>
											<div class="rightFloor invoiceInfo">
												<div class="rightContent invoiceInfo">
													<label>INVOICE</label>
													<div class="invoice1">
														<input type="text" id="from-invoice">
														<span>-</span>
														<input type="text" id="to-invoice">
													</div>
													<div class="invoice2">
														<input type="text" id="invoice-filter">
													</div>
													<img src="../img/invoice_icon1.png">
												</div>
											</div>
										</li>
										<li>
											<div class="leftFloor">
												<label>Airline</label>
												<input type="text" 1>
											</div>
											<div class="rightFloor">
												<div class="rightContent">
													<label>出发日期</label>
													<input type="date" id="leave-date">
												</div>
												<div class="rightContent">
													<label>返程日期</label>
													<input type="date" id="return-date">
												</div>
												<div class="rightContent">
													<label>出票时间</label>
													<input type="date" id="issue-time">
												</div>
											</div>
										</li>
										<li>
											<div class="leftFloor">
												<label>开票商</label>
												<input type="text" id="wholesaler">
											</div>
											<div class="rightFloor">
												<div class="rightContent">
													<label>结算方式</label>
													<select class="payment" id="payment-type">
														<option value="all">全部</option>
														<option value="cc">CC</option>
														<option value="non-cc">NON-CC</option>
														<option value="mco">MCO</option>
													</select>
												</div>
												<div class="placeInfo">
														<div class="rightContent placeList">
															<label>成交地点</label>
															<select id="deal-location">
																<option value="all">全部</option>
																<option value="CN">中国</option>
																<option value="US">美国</option>
															</select>
														</div>
														<div class="rightContent place" id="non-cc-payment-type">
															<div class="checkbox checkbox-success">
																<input id="cash" class="styled" type="checkbox">
																<label for="cash"><i>现金</i></label>
															</div>
															<div class="checkbox checkbox-success">
																<input id="check" class="styled" type="checkbox">
																<label for="check"><i>支票</i></label>
															</div>
															<div class="checkbox checkbox-success">
																<input id="alipay" class="styled" type="checkbox">
																<label for="alipay"><i>支付宝</i></label>
															</div>
															<div class="checkbox checkbox-success">
																<input id="wechat" class="styled" type="checkbox">
																<label for="wechat"><i>微信支付</i></label>
															</div>
															<div class="checkbox checkbox-success">
																<input id="remit" class="styled" type="checkbox">
																<label for="remit"><i>汇款</i></label>
															</div>
														</div>
													</div>
											</div>
										</li>
										<li>
											<div class="leftFloor">
												<label>LOCK状态</label>
												<select id="lock-status">
													<option value="all">全部</option>
													<option value="Y">YES</option>
													<option value="N">NO</option>
												</select>
											</div>
											<div class="rightFloor">
												<div class="rightContent">
													<label>CLEAR状态</label>
													<select id="clear-status">
														<option value="all">全部</option>
														<option value="Y">YES</option>
														<option value="N">NO</option>
													</select>
												</div>
												<div class="rightContent">
													<label>PAID状态</label>
													<select id="paid-status">
														<option value="all">全部</option>
														<option value="Y">YES</option>
														<option value="N">NO</option>
													</select>
												</div>
												<div class="rightContent">
													<label>FINISH状态</label>
													<select id="finish-status">
														<option value="all">全部</option>
														<option value="Y">YES</option>
														<option value="N">NO</option>
													</select>
												</div>
											</div>
										</li>
										<li class="btnList">
											<div class="leftFloor">
												<a href="javascript:void(0);" class="resetBtn" id="filter-reset">重置</a>
											</div>
										</li>
									</ul>
								</div>
								<!--系统筛选    e-->
								<!--选择模块    s-->
								<div class="choiceFloor">
									<!--数据选择   s-->
									<div class="dataChoice choiceItem">
										<label class="markMsg"><i></i>数据选择</label>
										<!--下单信息   s-->
										<div class="choiceInfo">
											<ul>
												<li class="titleTitle">下单信息</li>
												<li class="choiceContent">
													<dl>
														<dd>
															<div class="selected">
																<div class="checkbox checkbox-success checkboxBtn">
																	<input class="styled" type="checkbox" id="transaction_id">
																	<label for="transaction_id">系统编号<i></i></label>
																</div>
															</div>
														</dd>
														<dd>
															<div class="selected">
																<div class="checkbox checkbox-success checkboxBtn">
																	<input class="styled" type="checkbox" id="salesperson_code">
																	<label for="salesperson_code">业务员<i></i></label>
																</div>
															</div>
														</dd>
													</dl>
												</li>
												<li class="choiceContent">
													<dl>
														<dd>
															<div class="selected">
																<div class="checkbox checkbox-success checkboxBtn">
																	<input class="styled" type="checkbox" id="create_time">
																	<label for="create_time">创建时间<i></i></label>
																</div>
															</div>
														</dd>
														<dd>
															<div class="selected">
																<div class="checkbox checkbox-success checkboxBtn">
																	<input class="styled" type="checkbox" id="source_name">
																	<label for="source_name">顾客来源<i></i></label>
																</div>
															</div>
														</dd>
													</dl>
												</li>
												<li class="choiceContent">
													<dl>
														<dd>
															<div class="selected">
																<div class="checkbox checkbox-success checkboxBtn">
																	<input class="styled" type="checkbox" id="wholesaler_code">
																	<label for="wholesaler_code">开票商<i></i></label>
																</div>
															</div>
														</dd>
														<dd>
															<div class="selected">
																<div class="checkbox checkbox-success checkboxBtn">
																	<input class="styled" type="checkbox" id="invoice">
																	<label for="invoice">INVOICE<i></i></label>
																</div>
															</div>
														</dd>
													</dl>
												</li>
												<li class="choiceContent">
													<dl>
														<dd>
															<div class="selected">
																<div class="checkbox checkbox-success checkboxBtn">
																	<input class="styled" type="checkbox" id="ticketed_date">
																	<label for="ticketed_date">出票时间<i></i></label>
																</div>
															</div>
														</dd>
														<dd>
															<div class="selected">
																<div class="checkbox checkbox-success checkboxBtn">
																	<input class="styled" type="checkbox" id="customer_name">
																	<label for="customer_name">客人姓名<i></i></label>
																</div>
															</div>
														</dd>
													</dl>
												</li>
												<li class="choiceContent">
													<dl>
														<dd>
															<div class="selected">
																<div class="checkbox checkbox-success checkboxBtn">
																	<input class="styled" type="checkbox" id="note">
																	<label for="note">备注<i></i></label>
																</div>
															</div>
														</dd>
														<dd></dd>
													</dl>
												</li>
											</ul>
										</div>
										<!--财务核算   s-->
										<div class="choiceInfo">
											<ul>
												<li class="titleTitle">财务核算</li>
												<li class="choiceContent">
													<dl>
														<dd>
															<div class="selected">
																<div class="checkbox checkbox-success checkboxBtn">
																	<input class="styled" type="checkbox" id="exchange_rate_usd_rmb">
																	<label for="exchange_rate_usd_rmb">汇率<i></i></label>
																</div>
															</div>
														</dd>
														<dd>
															<div class="selected">
																<div class="checkbox checkbox-success checkboxBtn">
																	<input class="styled" type="checkbox" id="payment_type">
																	<label for="payment_type">结算方式<i></i></label>
																</div>
															</div>
														</dd>
													</dl>
												</li>
												<li class="choiceContent">
													<dl>
														<dd>
															<div class="selected">
																<div class="checkbox checkbox-success checkboxBtn">
																	<input class="styled" type="checkbox" id="selling_price">
																	<label for="selling_price">票价<i></i></label>
																</div>
															</div>
														</dd>
														<dd>
															<div class="selected">
																<div class="checkbox checkbox-success checkboxBtn">
																	<input class="styled" type="checkbox" id="received">
																	<label for="received">实收金额<i></i></label>
																</div>
															</div>
														</dd>
													</dl>
												</li>
												<li class="choiceContent">
													<dl>
														<dd>
															<div class="selected">
																<div class="checkbox checkbox-success checkboxBtn">
																	<input class="styled" type="checkbox" id="base_price">
																	<label for="base_price">航司底价<i></i></label>
																</div>
															</div>
														</dd>
														<dd>
															<div class="selected">
																<div class="checkbox checkbox-success checkboxBtn">
																	<input class="styled" type="checkbox" id="give_me_refund_usd">
																	<label for="give_me_refund_usd">申请退款<i></i></label>
																</div>
															</div>
														</dd>
													</dl>
												</li>
												<li class="choiceContent">
													<dl>
														<dd>
															<div class="selected">
																<div class="checkbox checkbox-success checkboxBtn">
																	<input class="styled" type="checkbox" id="okay_its_yours_usd">
																	<label for="okay_its_yours_usd">实付退款<i></i></label>
																</div>
															</div>
														</dd>
														<dd>
															<div class="selected">
																<div class="checkbox checkbox-success checkboxBtn">
																	<input class="styled" type="checkbox" id="nice_gotit_usd">
																	<label for="nice_gotit_usd">实收退款<i></i></label>
																</div>
															</div>
														</dd>
													</dl>
												</li>
												<li class="choiceContent">
													<dl>
														<dd>
															<div class="selected">
																<div class="checkbox checkbox-success checkboxBtn">
																	<input class="styled" type="checkbox" id="total_profit">
																	<label for="total_profit">毛利<i></i></label>
																</div>
															</div>
														</dd>
														<dd></dd>
													</dl>
												</li>
											</ul>
										</div>
										<!--财务核算   e-->
										<!--机票信息   s-->
										<div class="choiceInfo airticketInfo">
											<ul>
												<li class="titleTitle">机票信息</li>
												<li class="choiceContent">
													<dl>
														<dd>
															<div class="selected">
																<div class="checkbox checkbox-success checkboxBtn">
																	<input class="styled" type="checkbox" id="airticket_number">
																	<label for="airticket_number">票号<i></i></label>
																</div>
															</div>
														</dd>
														<dd>
															<div class="selected">
																<div class="checkbox checkbox-success checkboxBtn">
																	<input class="styled" type="checkbox" id="airline_filter">
																	<label for="airline_filter">Airline<i></i> </label>
																</div>
															</div>
														</dd>
													</dl>
												</li>
												<li class="choiceContent">
													<dl class="choice">
														<dd class="choiceContent">
															<div class="selected">
																<div class="checkbox checkbox-success checkboxBtn">
																	<input class="styled" type="checkbox" id="depart_date">
																	<label for="depart_date">出发时间<i></i></label>
																</div>
															</div>
														</dd>
														<dd class="choiceContent">
															<div class="selected">
																<div class="checkbox checkbox-success checkboxBtn">
																	<input class="styled" type="checkbox" id="arrival_date">
																	<label for="arrival_date">返程时间<i></i></label>
																</div>
															</div>
														</dd>
													</dl>
												</li>
												<!--<li class="choiceContent">
													<dl>
														<dd>
															<div class="selected">
																<div class="checkbox checkbox-success checkboxBtn">
																	<input class="styled" type="checkbox" id="startPlace">
																	<label for="startPlace">出发地<i></i></label>
																</div>
															</div>
														</dd>
														<dd>
															<div class="selected">
																<div class="checkbox checkbox-success checkboxBtn">
																	<input class="styled" type="checkbox" id="destination">
																	<label for="destination">目的地<i></i></label>
																</div>
															</div>
														</dd>
													</dl>
												</li>-->
												<li class="choiceContent">
													<dl>
														<dd>
															<div class="selected">
																<div class="checkbox checkbox-success checkboxBtn">
																	<input class="styled" type="checkbox" id="ticket_type">
																	<label for="ticket_type">团散<i></i></label>
																</div>
															</div>
														</dd>
														<dd>
															<div class="selected">
																<div class="checkbox checkbox-success checkboxBtn">
																	<input class="styled" type="checkbox" id="round_trip">
																	<label for="round_trip">机票类型<i></i></label>
																</div>
															</div>
														</dd>
													</dl>
												</li>
												<li class="choiceContent">
													<dl>
														<dd>
															<div class="selected">
																<div class="checkbox checkbox-success checkboxBtn">
																	<input class="styled" type="checkbox" id="locators">
																	<label for="locators">Locator<i></i></label>
																</div>
															</div>
														</dd>
														<dd>
															<div class="selected">
																<div class="checkbox checkbox-success checkboxBtn">
																	<input class="styled" type="checkbox" id="itinerary">
																	<label for="itinerary">itinerary<i></i></label>
																</div>
															</div>
														</dd>
													</dl>
												</li>
											</ul>
										</div>
										<!--机票信息   e-->
										<ul class="btnList">
											<li>
												<a href="javascript:void(0);" class="resetBtn">重置</a>
												<a href="javascript:void(0);" class="viewBtn">查看表格</a>
												<a href="javascript:void(0);" class="downData">下载数据至本地</a>
												<a href="javascript:void(0);" class="saveScheme">保存该方案</a
											</li>
										</ul>
									</div>
									<!--数据选择   e-->
									<!--快速选择   s-->
									<div class="quickChoice choiceItem">
										<label class="markMsg"><i></i>快速选择</label>
										<div class="choiceInfo">
											<ul>
												<li class="choiceContent">
													<dl>
														<dd>
															<a href="javascript:void(0);" class="default1">默认1</a>
														</dd>
														<dd>
															<a href="javascript:void(0);" class="default2">默认2</a>
														</dd>
													</dl>
												</li>
												<li class="choiceContent">
													<dl>
														<dd>
															<a href="javascript:void(0);" class="default3">默认3</a>
														</dd>
														<dd>
															<a href="javascript:void(0);" class="default4">默认4</a>
														</dd>
													</dl>
												</li>
												<li class="choiceContent">
													<dl>
														<dd>
															<a href="javascript:void(0);" class="costAccount">成本核算</a>
														</dd>
														<dd>
															<a href="javascript:void(0);" class="incomeAccount">收入核算</a>
														</dd>
													</dl>
												</li>
												<li class="choiceContent">
													<dl>
														<dd>
															<a href="javascript:void(0);" class="salesJournal">销售日报</a>
														</dd>
														<dd></dd>
													</dl>
												</li>
											</ul>
										</div>
									</div>
									<!--快速选择   e-->
								</div>
								<!--选择模块    e-->
								<!--选择之后的表格 s-->
								<div class="resultTab">
									<ul class="result">
										<li class="title">结果</li>
										<li class="resultNav">
											<dl>
												<!--<dd></dd>-->
											</dl>
										</li>
										<li class="resultDetail">
											<dl>
												<!--<dd></dd>-->
											</dl>
										</li>
										<li class="resultDetail">
											<dl>
												<!--<dd></dd>-->
											</dl>
										</li>
									</ul>
									<!--分页   s-->
									<div class="nav-box eg">
										<ul class="pagination m-style" id="choicePagination"></ul>
									</div>
									<!--分页   e-->
								</div>
								<!--选择之后的表格 e-->
								<!--确认框       s-->
								<div class="confirmNoticeInfo confirmSave">
									<p class="confirmTitle">
										<img src="../img/confirmInfo.png" />
									</p>
									<p class="confirmNotice confirmInfor">
										请选择你要保存的位置
									</p>
									<div class="choiceBtn">
										<div class="selected">
											<div class="checkbox checkbox-success checkboxBtn">
												<input class="styled" type="checkbox" id="default1">
												<label for="default1">默认1<i></i> </label>
											</div>
										</div>
										<div class="selected">
											<div class="checkbox checkbox-success checkboxBtn">
												<input class="styled" type="checkbox" id="default2">
												<label for="default2">默认2<i></i> </label>
											</div>
										</div>
										<div class="selected">
											<div class="checkbox checkbox-success checkboxBtn">
												<input class="styled" type="checkbox" id="default3">
												<label for="default3">默认3<i></i> </label>
											</div>
										</div>
										<div class="selected">
											<div class="checkbox checkbox-success checkboxBtn">
												<input class="styled" type="checkbox" id="default4">
												<label for="default4">默认4<i></i> </label>
											</div>
										</div>
									</div>
									<p class="saveSuccess confirmNotice">保存成功</p>
									<p class="actionBox">
										<button class="actionConfirm">确认</button>
										<button	class="actionCancel">取消</button>
									</p>
								</div>
								<!--确认框       e-->
							</div>
						</div>
					</div>
				</div>
				<!--右侧内容   e-->
			</div>
			<!--主内容区   e-->
		</div>
		<script src="../js/jquery-1.11.0.min.js" type="text/javascript"></script>
		<script src="../js/jquery.pagination.js" type="text/javascript"></script>
		<script src="../js/homePage/public.js" type="text/javascript"></script>
		<script src="../js/Accounting/dataExport.js" type="text/javascript"></script>
	</body>
</html>
