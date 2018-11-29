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
		<title>业务管理-财务确认</title>
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
			<!--主内容区   s-->
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
							<a href="AccountingConfirm.php" class="bm-title">
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
						<li class="guanli">
							<a href="../Manage/TourGuideManage.php" class="bm-title">
								<img src="../img/guanli.png"> 管理
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
								<img src="../img/c_qita.png"> 其他
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
				<!--右侧内容   s-->
				<div class="theamInfo nm-right">
					<div class="showMsg otherManage">
						<div class="floor otherManageArea">
							<div class="groupMsg">
								<!--其他管理   s-->
								<label class="theamTitle">
									<i></i>
									其他管理
								</label>
								<!--其他管理   e-->
								<div class="otherManageNav">
										<ul>
											<!--<li class="current-item">
												<a href="javascript:void(0);">折扣码</a>
											</li>-->
											<li>
												<a href="Other.php">其他</a>
											</li>
											<li>
												<a href="extendedFunctionPage.php">扩展功能</a>
											</li>
										</ul>
									</div>
								<!--左边   s-->
								<div class="leftInfoCard">
									<div class="checkbox checkbox-success">
										<input id="checkbox9" class="styled" type="checkbox" checked="checked">
										<label for="checkbox9">只查看未过期折扣码</label>
					             	</div>
					             	<div class="filterBox">
					             		<ul>
					             			<li class="discountCode"><input type="text" placeholder="折扣码" id="coupon-code-filter"></li>
					             			<li class="discountAmount"><input type="text" placeholder="折扣金额" id="coupon-value-filter"></li>
					             			<li class="action-item searchInfo"><a href="javascript:void(0);" id="coupon-filter-confirm">查询</a></li>
					             			<li class="action-item disabledInfo"><a href="javascript:void(0);" id="coupon-disable-confirm">Disable</a></li>
					             		</ul>
					             	</div>
					             	<ul class="listInfo defaultList">
					             		<li class="listTitle">
					             			<dl>
					             				<dd>折扣码</dd>
					             				<dd>折扣金额</dd>
					             				<dd>销售人员</dd>
					             				<dd>详情</dd>
					             			</dl>
					             		</li>
					             		<!--test s-->
					             		<li class="listDetail">
					             			<dl>
					             				<dd class="discountCodeMsg">123</dd>
					             				<dd class="discountAmountMsg"></dd>
					             				<dd class="salesMsg"></dd>
					             				<dd class="detailMsg">
					             					详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情
					             				</dd>
					             			</dl>
					             		</li>
					             		<li class="listDetail">
					             			<dl>
					             				<dd class="discountCodeMsg">123</dd>
					             				<dd class="discountAmountMsg"></dd>
					             				<dd class="salesMsg"></dd>
					             				<dd class="detailMsg">
					             					详情
					             				</dd>
					             			</dl>
					             		</li>
					             		<li class="listDetail">
					             			<dl>
					             				<dd class="discountCodeMsg">123</dd>
					             				<dd class="discountAmountMsg"></dd>
					             				<dd class="salesMsg"></dd>
					             				<dd class="detailMsg">
					             					详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情
					             				</dd>
					             			</dl>
					             		</li>
					             		<!--test e-->
					             	</ul>
					             	<ul class="listInfo disabledListInfo">
					             		<li class="listTitle">
					             			<dl>
					             				<dd>折扣码</dd>
					             				<dd>折扣金额</dd>
					             				<dd>销售人员</dd>
					             				<dd>详情</dd>
					             				<dd>过期</dd>
					             			</dl>
					             		</li>
					             		<!--test s-->
					             		<li class="listDetail">
											<dl>
					             				<dd class="discountCodeMsg">123123123123123123123123123123123123123123123123123123123123123123123123123123123
					             				123123123123123123123123123123123123123123123123123123123123123123123123123123123</dd>
					             				<dd class="discountAmountMsg"></dd>
					             				<dd class="salesMsg"></dd>
					             				<dd class="detailMsg">详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情</dd>
												<dd class="status"></dd>
					             			</dl>
					             		</li>
					             		<li class="listDetail">
											<dl>
					             				<dd class="discountCodeMsg">折扣码</dd>
					             				<dd class="discountAmountMsg"></dd>
					             				<dd class="salesMsg"></dd>
					             				<dd class="detailMsg">详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情</dd>
												<dd class="status"></dd>
					             			</dl>
					             		</li>
					             		<li class="listDetail">
											<dl>
					             				<dd class="discountCodeMsg">折扣码折扣码折扣码折扣码折扣码折扣码折扣码折扣码折扣码折扣码折扣码折扣码折扣码折扣码折扣码折扣码折扣码折扣码</dd>
					             				<dd class="discountAmountMsg"></dd>
					             				<dd class="salesMsg"></dd>
					             				<dd class="detailMsg">详情详情详情详情</dd>
												<dd class="status"></dd>
					             			</dl>
					             		</li>
					             		<!--test e-->
					             	</ul>
					             	<a href="javascript:void(0);" class="order-unfold">
										<img src="../img/unfold.png">点击进入下一页
									</a>
								</div>
								<!--左边   e-->
								<!--右边   s-->
								<div class="rightInfoCard">
									<ul class="addInfo">
										<li class="title">添加</li>
										<li>
											<label>折扣码</label>
											<input type="text" id="insert-coupon-code">
										</li>
										<li class="currencyInfor">
											<label>货币</label>
											<select>
												<option value="USD">$ 美元</option>
												<option value="RMB">￥ 人民币</option>
											</select>
										</li>
										<li>
											<label>折扣金额</label>
											<input type="text" id="insert-coupon-value">
										</li>
										<li>
											<label>销售人员</label>
											<input id="insert-coupon-salesperson" type="text" placeholder="Search...">
										</li>
										<li>
											<label>详情</label>
											<textarea rows="3" id="insert-coupon-description"></textarea>
										</li>
										<li class="actionFilerBox">
											<a href="javascript:void(0);" class="filterInfo" id="insert-cuopon">添加</a>
											<a href="javascript:void(0);" class="resetInfo" id="insert-reset">重置</a>
										</li>
									</ul>
								</div>
								<!--右边   e-->
							</div>
						</div>
					</div>
				</div>
				<!--右侧内容   e-->
			</div>
			<!--主内容区   e-->
		</div>
		<script src="../js/jquery.min.js" type="text/javascript"></script>
		<script src="../js/homePage/public.js" type="text/javascript"></script>
		<script src="../js/Other/Other.js" type="text/javascript"></script>
		<script src="../js/Other/CouponManagement.js" type="text/javascript"></script>
		<!--<script type="text/javascript">
			$(function(){
				detailText();
			});
		</script>-->
	</body>
</html>
