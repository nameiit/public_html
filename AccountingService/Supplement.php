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
		<title>财务-增补单</title>
		<link href="../css/font-awesome.css" type="text/css" rel="stylesheet" />
		<link href="../css/style.css" type="text/css" rel="stylesheet" />
		<link href="../css/otherInfo.css" type="text/css" rel="stylesheet" />
		<!--<link href="../css/pagination.css" type="text/css" rel="stylesheet" />-->
		<link href="../css/Supplement.css" type="text/css" rel="stylesheet" />
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
							<a href="../Other/AccountingConfirm.php" class="bm-title">
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
									<a href="AirTicketDataExport.php">
										<label></label>数据导出
									</a>
								</dd>
								<dd>
									<a href="Supplement.php" class="lab-active">
										<label></label>增补退款
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
								<label class="theamTitle supplementTitle"> <i></i>增补退款</label>
								<!--旅游团搜索   s-->
								<div class="groupSearch supplementfloor">
									<!--<label class="markMsg"><i></i>旅游团搜索</label>-->
									<ul class="manageNav searchInfo">
										<li class="current-item">
											<a href="javascript:void(0);">
												旅游团
											</a>
										</li>
										<li>
											<a href="javascript:void(0);">
												机票
											</a>
										</li>
									</ul>
									<ul class="searchFloor touristGroups">
										<li class="requiredItem">
											<label>系统编号</label>
											<input type="text" class="systemNum" id="tour-transaction-id">
										</li>
										<li>
											<label>团号</label>
											<input type="text" class="groupNum" id="tour-product-code">
										</li>
										<li class="btnList">
											<a href="javascript:void(0);" class="queryBtn">
												查询
											</a>
											<a href="javascript:void(0);" class="resetBtn">
												清空
											</a>
										</li>
									</ul>
									<ul class="searchFloor airticketInfo">
										<li class="requiredItem">
											<label>系统编号</label>
											<input type="text"  class="systemNum" id="airticket-transaction-id">
										</li>
										<li>
											<label>票号</label>
											<input type="text" class="ticketNum"  id="airticket-number">
										</li>
										<li>
											<label>Locator</label>
											<input type="text" class="locator" id="airticket-locator">
										</li>
										<li>
											<label>INVOICE</label>
											<input type="text" class="invoice" id="airticket-invoice">
										</li>
										<li class="btnList">
											<a href="javascript:void(0);" class="queryBtn">
												查询
											</a>
											<a href="javascript:void(0);" class="resetBtn">
												清空
											</a>
										</li>
									</ul>
								</div>
								<!--旅游团搜索   e-->
								<!--填写增补       s-->
								<div class="fillSupplement supplementfloor">
								<!--	<label class="markMsg"><i></i>填写增补</label>-->
									<ul class="manageNav supplementInfo">
										<li class="current-item">
											<a href="javascript:void(0);">
												增补
											</a>
										</li>
										<li>
											<a href="javascript:void(0);">
												退款
											</a>
										</li>
									</ul>
									<ul class="searchFloor supplement">
										<li class="requiredItem">
											<label>系统编号</label>
											<input type="text" id="sup-transaction-id">
										</li>
										<li class="wholesaler">
											<label>批发商</label>
											<input type="text" id="wholesaler-sup" placeholder="Search..." >
										</li>
										<li>
											<label>INVOICE</label>
											<input type="text" id="invoice-sup">
										</li>
										<li class="supplementItem">
											<label>增补收入</label>
											<input type="text" id="sup-extra-in">
											<select id="sup-extra-in-currency">
												<option value="USD">美元</option>
												<option value="RMB">人民币</option>
											</select>
										</li>
										<li class="supplementItem">
											<label>增补成本</label>
											<input type="text" id="sup-extra-out">
											<select id="sup-extra-out-currency">
												<option value="USD">美元</option>
												<option value="RMB">人民币</option>
											</select>
										</li>
										<li class="exchangeRate">
											<label>汇率</label>
											<input type="text" id="sup-exchange-rate">
										</li>
										<li class="btnList">
											<a href="javascript:void(0);" class="confirmBtn">
												确认
											</a>
											<a href="javascript:void(0);" class="resetBtn">
												清空
											</a>
										</li>
									</ul>
									<ul class="searchFloor refund">
										<li class="requiredItem">
											<label>系统编号</label>
											<input type="text" id="ref-transaction-id">
										</li>
										<li class="wholesaler">
											<label>批发商</label>
											<input type="text" id="wholesaler-ref" placeholder="Search..." >
										</li>
										<li>
											<label>INVOICE</label>
											<input type="text" id="invoice-ref">
										</li>
										<li>
											<label>申请退款</label>
											<select class="refund" id="ref-type">
												<option value="okay_its_yours">已收金额退款</option>
												<option value="nice_gotit">已付金额退款</option>
											</select>
										</li>
										<li class="supplementItem refundAmount requiredItem">
											<label>退款金额</label>
											<input type="text" id="ref-value">
											<select id="ref-currency">
												<option value="USD">美元</option>
												<option value="RMB">人民币</option>
											</select>
										</li>
										<li class="exchangeRate">
											<label>汇率</label>
											<input type="text" id="ref-exchange-rate">
										</li>
										<li class="btnList">
											<a href="javascript:void(0);" class="confirmBtn">
												确认
											</a>
											<a href="javascript:void(0);" class="resetBtn">
												清空
											</a>
										</li>
									</ul>
								</div>
								<!--填写增补       e-->
									<div class="searchResult">
										<p class="currency">单位：美元</p>
										<ul>
											<li class="title">
												<dl>
													<dd>系统编号</dd>
													<dd>类型</dd>
													<!--<dd class="changeItem">团号</dd>-->
													<dd>顾客</dd>
													<dd>批发商</dd>
													<dd>INVOICE</dd>
													<dd>利润</dd>
													<dd>应收金额</dd>
													<dd>实收金额</dd>
													<dd>应付金额</dd>
													<dd>实付金额</dd>
													<!--<dd>增补</dd>
													<dd>退款</dd>-->
												</dl>
											</li>
										</ul>
									</div>
									<!--确认框       s-->
									<div class="confirmNoticeInfo noRecord">
										<p class="confirmTitle">
											<img src="../img/confirmInfo.png" />
										</p>
										<p class="confirmNotice">
											没有记录
										</p>
										<p class="actionBox">
											<button class="actionConfirm" >确认</button>
											<button	class="actionCancel">取消</button>
										</p>
									</div>
									<!--确认框     e-->
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
		<script src="../js/Accounting/Supplement.js" type="text/javascript"></script>
	</body>
</html>
