<?php session_start();
if (!isset($_SESSION['login']) || $_SESSION['login'] != true) {
	header('location: ../login.php');
}

function alert($msg) {
		echo "<script type='text/javascript'>alert('$msg');</script>";
}

if ($_SESSION["group_name"] == 'normal') {
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
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<title>其他管理-财务确认</title>
		<link href="../css/otherInfo.css" type="text/css" rel="stylesheet" />
		<link href="../css/style.css" type="text/css" rel="stylesheet" />
		<link href="../css/font-awesome.css" type="text/css" rel="stylesheet" />
		<link href="../css/pagination.css" type="text/css" rel="stylesheet" />
		<link href="../css/mco.css" type="text/css" rel="stylesheet" />
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
									<a href="../Other/AccountingConfirm.php" class="lab-active">
										<label></label>业务管理
									</a>
								</dd>
								<dd>
									<a href="../AccountingService/AirTicketDataExport.php">
										<label></label>数据导出
									</a>
								</dd>
								<dd>
									<a href="../AccountingService/Supplement.php">
										<label></label>增补以及退款
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
								<!--其他管理   s-->
								<label class="theamTitle"> <i></i>业务管理</label>
								<!--其他管理   e-->
								<div class="otherManageNav">
									<ul>
										<li class="current-item">
											<a href="javascript:void(0);">
												财务确认
											</a>
										</li>
										<li>
											<a href="BusinessManage.php">
												MCO
											</a>
										</li>
									</ul>
								</div>
								<!--左边   s-->
								<div class="leftInfoCard searchCard">
									<div class="filterBox systematicSearch">
										<label class="markMsg"><i></i>系统搜索</label>
										<ul class="searchFloor">
											<li>
												<div class="leftFloor">
													<label>系统编号</label>
													<input type="text" id="transaction-id">
												</div>
												<div class="rightFloor">
													<div class="rightContent salesInfo">
														<label>销售</label>
														<input type="text" placeholder="Search..." id="salesperson">
													</div>
													<div class="rightContent">
														<label>类型</label>
														<select id="type">
															<option value="all">全部</option>
															<option value="group">独立团</option>
															<option value="individual">散拼团</option>
															<option value="airticket">机票</option>
														</select>
													</div>
												</div>
											</li>
											<li class="dealtime">
												<div class="leftFloor">
													<label>成交时间</label>
													<select id="settletime">
														<option value="all">全部</option>
														<option value="customized">Customize</option>
														<option value="today">本日</option>
														<option value="current_month">本月</option>
													</select>
												</div>
												<div class="rightFloor">
													<input type="date" id="from-date">
													<span>~</span>
													<input type="date" id="to-date">
												</div>
											</li>
											<li>
												<div class="leftFloor">
													<label>顾客姓名</label>
													<!--<input type="text" id="customer-name">-->
													<input type="text" placeholder="Last Name"  class="name" id="lname">
													<input type="text" placeholder="First Name" class="name" id="fname">
												</div>
												<div class="rightFloor">
													<div class="rightContent wholesalerInfo">
														<label>批发商</label>
														<input type="text" id="wholesaler" placeholder="Search...">
													</div>
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
														<img src="../img/invoice_icon1.png" />
													</div>
												</div>
											</li>
											<li>
												<div class="leftFloor">
													<label>Locator</label>
													<input type="text" id="locator">
												</div>
												<div class="rightFloor">
													<div class="rightContent">
														<label>Airline</label>
														<input type="text" id="airline">
													</div>
													<div class="rightContent">
														<label>支付方式</label>
														<select class="payment" id="payment-type">
															<option value="all">全部</option>
															<option value="cc">CC</option>
															<option value="non-cc">NON-CC</option>
															<option value="mco">MCO</option>
														</select>
													</div>
												</div>
											</li>
											<!--选择NON-CC 新增的一行 s-->
											<li class="place">
												<div class="leftFloor">
													<label>成交地点</label>
													<select id="deal-location">
														<option value="all">全部</option>
														<option value="CN">中国</option>
														<option value="US">美国</option>
													</select>
												</div>
												<div class="rightFloor" id="non-cc-payment-type">
													<div class="checkbox checkbox-success">
														<input id="cash" class="styled" type="checkbox" checked="checked">
														<label for="cash"><i>现金</i></label>
													</div>
													<div class="checkbox checkbox-success">
														<input id="check" class="styled" type="checkbox" checked="checked">
														<label for="check"><i>支票</i></label>
													</div>
													<div class="checkbox checkbox-success">
														<input id="alipay" class="styled" type="checkbox" checked="checked"/>
														<label for="alipay"><i>支付宝</i></label>
													</div>
													<div class="checkbox checkbox-success">
														<input id="wechat" class="styled" type="checkbox" checked="checked"/>
														<label for="wechat"><i>微信支付</i></label>
													</div>
													<div class="checkbox checkbox-success">
														<input id="remit" class="styled" type="checkbox" checked="checked"/>
														<label for="remit"><i>汇款</i></label>
													</div>
												</div>
											</li>
											<!--选择NON-CC 新增的一行 e-->
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
													<!--增补单-->
													<div class="rightContent">
														<label>增补单</label>
														<select id="sup">
															<option value="all">全部</option>
															<option value="Y">YES</option>
															<option value="N">NO</option>
														</select>
													</div>
												</div>
											</li>
											<li>
												<div class="leftFloor">
													<label>FINISH状态</label>
													<select id="finish-status">
														<option value="all">全部</option>
														<option value="Y">YES</option>
														<option value="N">NO</option>
													</select>
												</div>
												<div class="rightFloor">
													<div class="rightContent">
														<label>PAID状态</label>
														<select id="paid-status">
															<option value="all">全部</option>
															<option value="Y">YES</option>
															<option value="N">NO</option>
														</select>
													</div>
													<!--退款-->
													<div class="rightContent">
														<label>退款</label>
														<select id="ref">
															<option value="all">全部</option>
															<option value="Y">YES</option>
															<option value="N">NO</option>
														</select>
													</div>
												</div>
											</li>
											<li class="btnList">
												<div class="leftFloor">
													<a href="javascript:void(0);" id="filter-confirm">查找</a>
													<a href="javascript:void(0);" class="resetBtn" id="filter-reset">重置</a>
												</div>
												<div class="rightFloor currencyInfo">
													<div class="rightContent">
														<a href="javascript:void(0);" class="selectAllBtn">全选</a>
														<a href="javascript:void(0);" class="selectNoneBtn">全不选</a>
													</div>
													<div class="rightContent ">
															<img src="../img/notice_icon.png" />
															货币单位：美元
													</div>
												</div>
											</li>
										</ul>
									</div>
								</div>
								<!--会计服务     s-->
								<div class="rightInfoCard accounting-right">
									<label class="markMsg"><i></i>会计服务</label>
									<ul class="add-msg">
										<li class="titleInfo single-row">
											<label></label>
											<span>详情</span>
											<span>总计</span>
										</li>
										<li class="single-row cellBox invoiceCell">
											<label>INVOICE</label>
											<input type="text" id="update-invoice">
											<input type="text" disabled="disabled"/>
										</li>
										<li class="single-row cellBox debtCell">
											<label>Debt</label>
											<input type="text" id="update-debt">
											<input type="text" disabled="disabled"/>
										</li>
										<li class="single-row cellBox receivableCell">
											<label>应收款</label>
											<input type="text" id="update-receive">
											<input type="text" disabled="disabled"/>
										</li>
										<li class="single-row cellBox salePriceCell" >
											<label>卖价</label>
											<input type="text" id="update-selling-price">
											<input type="text" disabled="disabled"/>
										</li>
										<li class="checkNo">
											<label>Check No.</label>
											<input type="text" id="check-number">
										</li>
										<li class="finishStatus">
											<a href="javascript:void(0);" class="confirmLock confirmBtn">LOCK</a>
											<a href="javascript:void(0);" class="confirmClear confirmBtn">CLEAR</a>
											<a href="javascript:void(0);" class="confirmPaid confirmBtn">PAID</a>
											<a href="javascript:void(0);" class="confirmFinish confirmBtn">FINISH</a>
										</li>
										<li class="cancelStatus">
											<a href="javascript:void(0);" class="cancelLock">取消LOCK</a>
											<a href="javascript:void(0);" class="cancelClear">取消CLEAR</a>
											<a href="javascript:void(0);" class="cancelPaid">取消PAID</a>
											<a href="javascript:void(0);" class="cancelFinish">取消FINISH</a>
										</li>
										<li class="actionTabInfo">
											<a href="javascript:void(0);" class="addCheckNo">添加Check No.</a>
											<a href="javascript:void(0);" class="restoreInfo">还原</a>
											<a href="javascript:void(0);" class="confirmChange">确认修改</a>
										</li>
										<li class="moreOptions">
											<a href="javascript:void(0);">更多选项</a>
										</li>
									</ul>
								</div>
								<!--会计服务     e-->
								<ul class="listInfo defaultList confirmlist confirmFloor">
									<li class="listTitle">
										<dl>
											<dd class="systemNum">系统编号</dd>
											<dd class="invoice">INVOICE</dd>
											<dd class="profit">
												<label>
													利润&#40;<span id="sum_profit"></span>&#41;
												</label>
											</dd>
											<dd class="debt">
												<label>
													Debt&#40;<span id="sum_debt"></span>&#41;
												</label>
											</dd>
											<dd class="receivable">
												<label>
													应收款&#40;<span id="sum_received"></span>&#41;
												</label>
											</dd>
											<dd class="salePrice">
												<label>
													卖价&#40;<span id="sum_selling_price"></span>&#41;
												</label>
											</dd>
											<dd class="createDate" id="create-time-sort">
												创建时间
												<img src="../img/arrowUp0_icon.png" class="arrow_up">
												<img src="../img/arrowDown0_icon.png" class="arrow_down">
											</dd>
											<dd class="startTime" id="leave-time-sort">
												出发时间
												<img src="../img/arrowUp0_icon.png" class="arrow_up">
												<img src="../img/arrowDown0_icon.png" class="arrow_down">
											</dd>
											<dd class="returnTime" id="return-time-sort">
												回程时间
												<img src="../img/arrowUp0_icon.png" class="arrow_up">
												<img src="../img/arrowDown0_icon.png" class="arrow_down">
											</dd>
											<dd class="lockStatus">LOCK</dd>
											<dd class="finishStatus">FINISH</dd>
											<dd class="number">关联</dd>
										</dl>
									</li>
									<li class="listDetail">
										<dl>
											<dd class="systemNum">124</dd>
											<dd class="invoice">12346tony</dd>
											<dd class="profit">
												100
											</dd>
											<dd class="debt">
												N&nbsp;|&nbsp;1400-1300
											</dd>
											<dd class="receivable">
												CC
											</dd>
											<dd class="salePrice">300</dd>
											<dd class="createDate">2018-12-12</dd>
											<dd class="startTime">2018-12-12</dd>
											<dd class="returnTime">2018-12-12</dd>
											<dd class="lockStatus yesStatus"></dd>
											<dd class="finishStatus"></dd>
											<dd class="number">
												<a href="javascript:void(0);">null</a>
											</dd>
										</dl>
									</li>
									<li class="listDetail">
										<dl>
											<dd class="systemNum">121</dd>
											<dd class="invoice">12346tony</dd>
											<dd class="profit">
												100
											</dd>
											<dd class="debt">
												N&nbsp;|&nbsp;-200
											</dd>
											<dd class="receivable">
												CC
											</dd>
											<dd class="salePrice">300</dd>
											<dd class="createDate">2018-12-12</dd>
											<dd class="startTime">2018-12-12</dd>
											<dd class="returnTime">2018-12-12</dd>
											<dd class="lockStatus noStatus"></dd>
											<dd class="finishStatus"></dd>
											<dd class="number">
												<a href="javascript:void(0);">132,134,135</a>
											</dd>
										</dl>
									</li>
									<li class="listDetail">
										<dl>
											<dd class="systemNum">002</dd>
											<dd class="invoice">tony12346</dd>
											<dd class="profit">
												200
											</dd>
											<dd class="debt">
												Y&nbsp;|&nbsp;100
											</dd>
											<dd class="receivable">
												Y&nbsp;|&nbsp;120
											</dd>
											<dd class="salePrice">222</dd>
											<dd class="createDate">2018-12-12</dd>
											<dd class="startTime">2018-12-12</dd>
											<dd class="returnTime">2018-12-12</dd>
											<dd class="lockStatus"></dd>
											<dd class="finishStatus yesStatus"></dd>
											<dd class="number">
												<a href="javascript:void(0);">132,134,135</a>
											</dd>
										</dl>
									</li>
									<li class="listDetail">
										<dl>
											<dd class="systemNum">022</dd>
											<dd class="invoice">tony12346</dd>
											<dd class="profit">
												300
											</dd>
											<dd class="debt">
												Y&nbsp;|&nbsp;212
											</dd>
											<dd class="receivable">
												N&nbsp;|&nbsp;120
											</dd>
											<dd class="salePrice">333</dd>
											<dd class="createDate">2018-12-12</dd>
											<dd class="startTime">2018-12-12</dd>
											<dd class="returnTime">2018-12-12</dd>
											<dd class="lockStatus"></dd>
											<dd class="finishStatus noStatus"></dd>
											<dd class="number">
												<a href="javascript:void(0);">132,134,135</a>
											</dd>
										</dl>
									</li>
									<li class="listDetail">
										<dl>
											<dd class="systemNum">022</dd>
											<dd class="invoice">tony12346</dd>
											<dd class="profit">
												300
											</dd>
											<dd class="debt">
												Y&nbsp;|&nbsp;212
											</dd>
											<dd class="receivable">
												CC
											</dd>
											<dd class="salePrice">333</dd>
											<dd class="createDate">2018-12-12</dd>
											<dd class="startTime">2018-12-12</dd>
											<dd class="returnTime">2018-12-12</dd>
											<dd class="lockStatus"></dd>
											<dd class="finishStatus yesStatus"></dd>
											<dd class="number">
												<a href="javascript:void(0);">132,134,135</a>
											</dd>
										</dl>
									</li>
								</ul>
								<!--10.17    e-->
								<!--分页  s-->
								<div class="nav-box eg">
									<ul class="pagination m-style" id="confirmPagination"></ul>
								</div>
								<!--分页  e-->
								<!--左边   e-->
								<!--确认框       s-->
								<div class="confirmNoticeInfo">
									<p class="confirmTitle">
										<img src="../img/confirmInfo.png" />
									</p>
									<p class="confirmNotice">
										确认是否更改
									</p>
									<p class="actionBox">
										<button class="actionConfirm">确认</button>
										<button	class="actionCancel">取消</button>
									</p>
								</div>
								<!--确认框    e-->
								<!--无记录    s-->
								<div class="noRecord">
									<p class="confirmTitle">
										<img src="../img/confirmInfo.png" />
									</p>
									<p class="confirmNotice">
										没有记录
									</p>
									<p class="actionBox">
										<!--<button class="actionConfirm">确认</button>-->
										<button	class="actionCancel">返回</button>
									</p>
								</div>
								<!--无记录    e-->
							</div>
						</div>
					</div>
				</div>
				<!--右侧内容   e-->
			</div>
			<!--主内容区   e-->
		</div>
		<script type="text/javascript">
			  var checkNumber = {};
			  var fs_id = {};
		</script>
		<script src="../js/jquery.min.js" type="text/javascript"></script>
		<script src="../js/jquery.pagination.js" type="text/javascript"></script>
		<script src="../js/homePage/public.js" type="text/javascript"></script>
		<script src="../js/Other/Other.js" type="text/javascript"></script>
		<script src="../js/Other/AccountingConfirm.js" type="text/javascript"></script>
		<script src="../js/Accounting/accountingConfirm.js" type="text/javascript"></script>
	</body>
</html>
