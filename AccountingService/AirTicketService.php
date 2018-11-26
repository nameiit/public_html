<?php
session_start();
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
		<title>后台管理系统（会计服务页面-机票）</title>
		<link href="../css/accountingService.css" rel="stylesheet" type="text/css" />
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
				<!--左侧导航   s-->
				<div class="navInfo nm-left">
					<ul>
						<li class="shouye">
							<a href="../index.php" class="bm-title">
								<img src="../img/shouye.png"> 首页
							</a>
						</li>
						<li class="yewu">
							<a href="../IndividualTour/IndividualTourCreate.php" class="bm-title ">
								<img src="../img/yewu.png"> 业务
							</a>
							<dl class="detailMsg nm-hide">
								<!--<dd>
									<a href="../GroupTour/GroupTourCreate.php">
										<label></label> 独立团
									</a>
								</dd>-->
								<dd>
									<a href="../IndividualTour/IndividualTourCreate.php">
										<label></label> 散拼团
									</a>
								</dd>
								<dd>
									<a href="javascript:void(0);" class="lab-active">
										<label></label> 机票
									</a>
								</dd>
							</dl>
						</li>
						<li class="kuaiji title-active">
							<a href="../Other/AccountingConfirm.php" class="bm-title">
								<img src="../img/c_kuaiji.png"> 财务
							</a>
							<dl class="detailMsg">
								<!--<dd>
									<a href="../OrderHistory/OrderHistory.php">
										<label></label> 历史订单
									</a>
								</dd>
								<dd>
									<a href="javascript:void(0);" class="lab-active"><label></label> 会计服务</a>
								</dd>-->
								<dd>
									<a href="../Other/AccountingConfirm.php">
										<label></label>业务管理
									</a>
								</dd>
							</dl>
						</li>
						<li class="guanli">
							<a href="../Manage/TourGuideManage.php" class="bm-title">
								<img src="../img/guanli.png"> 管理
							</a>
							<dl class="detailMsg nm-hide">
								<dd>
									<a href="javascript:void(0);" class="lab-active">
										<label></label> 导游
									</a>
								</dd>
								<dd>
									<a href="javascript:void(0);">
										<label></label> 销售
									</a>
								</dd>
								<dd>
									<a href="javascript:void(0);">
										<label></label> 供应商
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

				<!--左侧导航   e-->
				<!--右侧内容   s-->
				<div class="theamInfo nm-right">
					<div class="showMsg kuaijiMsg">
						<div class="floor accountingService">
							<div class="groupMsg">
								<!--左侧  content  s-->
								<div class="accountingLeft">
									<!--筛选条件   s-->
									<div class="filerCondition">
										<ul class="serviceNav">
											<li>
												<a href="GroupTourService.php">独立团</a>
											</li>
											<li>
												<a href="IndividualTourService.php">散拼团</a>
											</li>
											<li  class="service-active">
												<a href="javascript:void(0);">机票</a>
											</li>
										</ul>
										<ul class="filerDetail ">
											<li class="filterTitle">筛选条件</li>
											<li>
												<label>订单号</label>
												<input type="text" id="accounting-service-filter-transaction-id">
											</li>
											<li>
												<label>机票定位</label>
												<input type="text" id="accounting-service-filter-locator">
											</li>
											<li>
												<label>销售人员</label>
												<input id="accounting-service-filter-salesperson" type="text" placeholder="Search...">
											</li>
											<li>
												<!--<label>航班号</label>
												<input type="text" id="accounting-service-filter-flight-number">-->
												<label>批发商</label>
												<input id="accounting-service-filter-wholesaler" type="text" placeholder="Search...">
											</li>
											<li>
												<label>INVOICE</label>
												<input type="text" id="accounting-service-filter-invoice">
											</li>
											<li class="infoDistrict">
												<label>创建日期</label>
												<input type="date" id="accounting-service-filter-from-date">
												<span>~</span>
												<input type="date" id="accounting-service-filter-to-date">
											</li>
											<li class="actionFilerBox">
												<a href="javascript:void(0);" class="filterInfo">筛选</a>
												<a href="javascript:void(0);" class="resetInfo">重置</a>
											</li>
										</ul>
									</div>
									<!--筛选条件   e-->
									<!--修改订单    s-->
									<div class="modifyOrders filerCondition airTicketOrders">
										<ul class="filerDetail">
											<li class="filterTitle">订单编号:<span>1234567890</span></li>
											<!--<li>
												<label>货币单位</label>
												<select id="orderCurrency">
													<option value="USD">$ 美元</option>
													<option value="RMB">￥ 元</option>
												</select>
											</li>
											<li>
												<label>总机票价格</label>
												<input type="text" id="orderprice">
											</li>
											<li>
												<label>总成本价</label>
												<input type="text" placeholder="" id="orderCosting">
											</li>
											<li>
												<label>返现</label>
												<input type="text" id="orderCashBack">
											</li>
											<li class="discountCard">
												<label>折扣</label>
												<div class="msgDiscount">
													<a href="javascript:void(0);" class="discountItem" id="discount-code">折扣码</a>
													<a href="javascript:void(0);" class="discountItem" id="discount-value">折扣金额</a>
													<input type="text" placeholder="" id="discountText">
													<a href="javascript:void(0);" class="discount-apply">Apply</a>
													<span class="discountNotice"></span>
												</div>
											</li>
											<li>
												<label>利润</label>
												<input type="text" id="orderProfit" disabled>
											</li>-->
											<li class="list-currency">
												<label>AMOUNT</label>
												<input type="text" />
												<select id="orderCurrency">
													<option value="USD">$ 美元</option>
													<option value="RMB">￥ 元</option>
												</select>
											</li>
											<li class="actionFilerBox">
												<a href="javascript:void(0);" id="accounting-edit-confirm">确认修改</a>
												<a href="javascript:void(0);" id="accounting-edit-reset">重置</a>
											</li>
										</ul>
									</div>
									<!--修改订单    e-->
								</div>
								<!--左侧 content  e-->
								<!--右侧content  s-->
								<div class="accountingRight accountingOrders indiviOrders">
									<ul class="orderStatus">
										<li class="action-checkAll action-check">
											<img src="../img/quanxuan_d.png" />全选
										</li>
										<li class="action-invert action-check">
											<img src="../img/cha_d.png" />全不选
										</li>
										<li class="action-clear action-item" id="clearOrder">CLEAR</li>
										<li class="action-lock action-item" id="lockOrder">LOCK</li>
									</ul>
									<div class="orderList airTicket_orderList">
										<ul class="order-title">
											<!--<li class="order-id">#</li>
											<li class="group-num">定位</li>
											<li class="provider">供应商</li>
											<li class="createDate">创建日期</li>
											<li class="clients">INVOICE</li>
											<li class="transactionDetails">交易详情（价格|返现|成本|利润）</li>
											<li class="salesman">销售人员</li>
											<li class="discount-code">折扣</li>-->
											<li class="order-id">#
												<img src="../img/arrowUp0_icon.png"  class="arrow_up"/>
												<img src="../img/arrowDown0_icon.png" class="arrow_down"/>
											</li>
											<li class="salesman">
												销售人员
												<img src="../img/arrowUp0_icon.png"  class="arrow_up"/>
												<img src="../img/arrowDown0_icon.png" class="arrow_down"/>
											</li>
											<li class="client">客户
												<img src="../img/arrowUp0_icon.png"  class="arrow_up"/>
												<img src="../img/arrowDown0_icon.png" class="arrow_down"/>
											</li>
											<li class="createTime">时间
												<img src="../img/arrowUp0_icon.png"  class="arrow_up"/>
												<img src="../img/arrowDown0_icon.png" class="arrow_down"/>
											</li>
											<li class="wholesalers">批发商
												<img src="../img/arrowUp0_icon.png"  class="arrow_up"/>
												<img src="../img/arrowDown0_icon.png" class="arrow_down"/>
											</li>
											<li class="invoice">
												INVOICE
												<img src="../img/arrowUp0_icon.png"  class="arrow_up"/>
												<img src="../img/arrowDown0_icon.png" class="arrow_down"/>
											</li>
											<li class="amount">
												AMOUNT
												<img src="../img/arrowUp0_icon.png"  class="arrow_up"/>
												<img src="../img/arrowDown0_icon.png" class="arrow_down"/>
											</li>
										</ul>
										<ul class="order-detail">
											<li>
												<dl>
													<dd class="order-id"></dd>
													<dd class="salesman"></dd>
													<dd class="client"></dd>
													<dd class="createTime"></dd>
													<dd class="wholesalers"></dd>
													<dd class="invoice"></dd>
													<dd class="amount"></dd>
												</dl>
											</li>
										</ul>
										<a href="javascript:void(0);" class="order-unfold">
											<img src="../img/unfold.png">点击进入下一页
										</a>
										<a href="javascript:void(0);" class="backTop">
											<img src="../img/back.png" />
										</a>
									</div>
								</div>
								<!--右侧content  e-->
							</div>
						</div>
					</div>
				</div>
				<!--右侧内容   e-->
			</div>
			<?php
			   $confirmBoxClass = "accountingEditConfirmBox";
			   $confirmButtonClass = "accountingEditActionConfirm";
			   $cancelButtonClass = "accountingEditActionCancel";
			   include('../confirmInfo.php');

			   $confirmBoxClass = "clearConfirmBox";
			   $confirmButtonClass = "clearActionConfirm";
			   $cancelButtonClass = "clearActionCancel";
			   include('../confirmInfo.php');

			   $confirmBoxClass = "lockConfirmBox";
			   $confirmButtonClass = "lockActionConfirm";
			   $cancelButtonClass = "lockActionCancel";
			   include('../confirmInfo.php');
			?>
			<!--content e-->
		</div>
		<script src="../js/jquery.min.js" type="text/javascript"></script>
		<script src="../js/homePage/public.js" type="text/javascript"></script>
		<script src="../js/Accounting/accountingService.js"></script>
		<script src="../js/Accounting/airTicketService.js"></script>
		<script type="text/javascript">
			$(function() {
				accountingDiscount_airticket();
				serviceNav();
				//返回顶部
				backToTop();
				leftFloatBox();
				$(".orderList ul.order-detail li").find("dl").on("click",function(){
					leftFloatBox();
					heightRange();
				});
			});
		</script>

	</body>

</html>
