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
		<title>其他管理-MCO</title>
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
						<div class="floor otherManageArea">
							<div class="groupMsg">
								<!--其他管理   s-->
								<label class="theamTitle"><i></i> 其他管理 </label>
								<!--其他管理   e-->
								<div class="otherManageNav">
									<ul>
										<li>
											<a href="AccountingConfirm.php">
												财务确认
											</a>
										</li>
										<li class="current-item">
											<a href="javascript:void(0);">MCO</a>
										</li>
									</ul>
								</div>
								<!--左边   s-->
								<div class="leftInfoCard">
									<div class="filterBox">
										<ul>
											<li class="markCompleted">
												<a href="javascript:void(0);">标记为已完成</a>
											</li>
											<li class="deleteNotice">
												<a href="javascript:void(0);">删除</a>
											</li>
										</ul>
									</div>
									<ul class="listInfo defaultList">
										<li class="listTitle">
											<dl>
												<dd class="mco_ID">ID</dd>
												<dd class="mco_author">发布人</dd>
												<dd class="mco_receiver">接收人</dd>
												<dd class="mco_time">发布时间</dd>
												<dd class="mco_bankCard">银行卡信息</dd>
												<dd class="mco_content">信息备注</dd>
											</dl>
										</li>
										<li class="listDetail">
											<dl>
												<dd class="mco_ID">ID</dd>
												<dd class="mco_author">发布人</dd>
												<dd class="mco_receiver">接收人</dd>
												<dd class="mco_time">发布时间</dd>
												<dd class="mco_bankCard">银行卡信息</dd>
												<dd class="mco_content">信息备注</dd>
											</dl>
										</li>
									</ul>
									<!--分页  s-->
									<div class="nav-box eg">
										<ul class="pagination m-style" id="mcoPagination"></ul>
									</div>
									<!--分页  e-->
								</div>
								<!--左边   e-->
								<!--右边   s-->
								<div class="rightInfoCard mcoManage_rightInfo">
									<ul class="addInfo">
										<li class="title">MCO</li>
										<!--<li class="top_info">
											<div class="checkbox checkbox-success">
												<input id="mco_top" class="styled" type="checkbox" />
												<label for="mco_top">置顶</label>
											</div>
										</li>-->
										<!--置顶   s-->
										<li class="top_info requiredItem mcoInfo">
											<label>系统编号</label>
											<input type="text"  class="systemNum"/>
											<label class="switch">
												<input class="btn-switch large" type="checkbox">
											</label>
											<span>置顶</span>
										</li>
										
										<!--置顶   e-->
										<li class="requiredItem">
											<label>MCO接收人</label>
											<input type="text" placeholder="search..." id="mco_receiver">
										</li>
										<!--<li class="time requiredItem">
											<span>该信息</span>
											<input type="text" id="mco_expired_time"><i>小时后过期</i>
										</li>-->
										<!--<li class="requiredItem">
											<label>持卡人</label>
											<input type="text" id="card-holder">
										</li>-->
										<li class="requiredItem">
											<label>卡号</label>
											<input type="text" id="card-number">
										</li>
										<li class="requiredItem expDate">
											<label>过期日</label>
											<select id="expired-date-month">
												<option value="01">01</option>
												<option value="02">02</option>
												<option value="03">03</option>
												<option value="04">04</option>
												<option value="05">05</option>
												<option value="06">06</option>
												<option value="07">07</option>
												<option value="08">08</option>
												<option value="09">09</option>
												<option value="10">10</option>
												<option value="11">11</option>
												<option value="12">12</option>
											</select>
											<select id="expired-date-year">
												<option value="18">18</option>
												<option value="19">19</option>
												<option value="20">20</option>
												<option value="21">21</option>
												<option value="22">22</option>
												<option value="23">23</option>
												<option value="24">24</option>
												<option value="25">25</option>
											</select>
										</li>
										<!--<li class="requiredItem mark">
											<label>安全码</label>
											<input type="text" maxlength="3" id="security-code">
										</li>-->
										<!--<li class="requiredItem">
											<label>金额</label>
											<input type="text" id="charging-amount">
										</li>
										<li class="requiredItem expDate">
											<label>货币</label>
											<select id="currency">
												<option value="USD">USD</option>
												<option value="RMB">RMB</option>
											</select>

										</li>
										<li>
											<label class="other">银行电话</label>
											<input type="text" id="billing-phone">
										</li>
										<li class="requiredItem">
											<label>账单地址</label>
											<textarea id="billing-address"></textarea>
										</li>-->
										<li class="requiredItem">
											<label>持卡人</label>
											<input type="text" id="card-holder">
										</li>
										<li>
											<label>备注</label>
											<textarea id="mco-note"></textarea>
										</li>
										<li class="actionFilerBox">
											<a href="javascript:void(0);" class="filterInfo">发布</a>
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
										<button class="actionConfirm" id="create-mco">确认</button>
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
			allMCO = [];
			notExpiredMCO = [];
		</script>
		<script src="../js/jquery.min.js" type="text/javascript"></script>
		<script src="../js/jquery.pagination.js" type="text/javascript"></script>
		<script src="../js/homePage/public.js" type="text/javascript"></script>
		<script src="../js/Other/Other.js" type="text/javascript"></script>
		<script src="../js/Other/mco.js" type="text/javascript"></script>
	</body>
</html>
