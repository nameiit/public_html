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
		<title>管理-财务审核</title>
		<link href="../css/style.css" type="text/css" rel="stylesheet" />
		<link href="../css/pagination.css" type="text/css" rel="stylesheet" />
		<link href="../css/FinancialAudit.css" type="text/css" rel="stylesheet" />
	</head>
	<body>
		<div class="msWidth managePage">
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
				<!--左侧导航     s-->
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
									<a href="TourGuideManage.php" >
										<label></label> 人员管理
									</a>
								</dd>
								<dd>
									<a href="PerformanceManage.php">
										<label></label> 业绩管理
									</a>
								</dd>
								<dd>
									<a href="javascript:void(0);" class="lab-active">
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
				<!--左侧导航     e-->
				<!--右侧内容     s-->
				<div class="theamInfo nm-right">
					<div class="showMsg guanliMsg">
						<div class="floor manageArea">
							<div class="groupMsg">
								<!--导航-->
								<div class="navFloor">
									<ul>
										<li class="current"><a href="#cancelLock">取消LOCK</a></li>
										<li><a href="#cancelClear">取消CLEAR</a></li>
										<li><a href="#cancelPaid">取消PAID</a></li>
										<li><a href="#cancelFinish">取消FINISH</a></li>
									</ul> 
								</div>
								<!--内容-->
								<div class="contentFloor">
									<!--取消LOCK   s-->
									<div class="cancelFloor cancelLock" id="cancelLock">
										<!--lock-->
										<label class="markMsg"><i></i>申请列表-取消LOCK</label>
										<ul class="btnList">
											<li>
												<a href="javascript:void(0);" class="selectAllBtn nm-left">
													全选
												</a>
												<a href="javascript:void(0);" class="rejectBtn nm-right">
													驳回
												</a>
												<a href="javascript:void(0);" class="cancelLockBtn nm-right">
													取消LOCK
												</a>
											</li>
										</ul>
										<!--tab s-->
										<ul class="tabFloor">
											<li class="listTitle">
												<dl>
													<dd class="systemNum">系统编号</dd>
													<dd class="invoice">INVOICE</dd>
													<dd class="profit">
														<label>
															利润&#40;<span>12345</span>&#41;
														</label>
													</dd>
													<dd class="debt">
														<label>
															Debt&#40;<span>12345</span>&#41;
														</label>
													</dd>
													<dd class="receivable">
														<label>
															应收款&#40;<span>12345</span>&#41;
														</label>
													</dd>
													<dd class="salePrice">
														<label>
															卖价&#40;<span>12345</span>&#41;
														</label>
													</dd>
													<dd class="createDate">
														创建时间
														<img src="../img/arrowUp0_icon.png" class="arrow_up">
														<img src="../img/arrowDown0_icon.png" class="arrow_down">
													</dd>
													<dd class="startTime">
														出发时间
														<img src="../img/arrowUp0_icon.png" class="arrow_up">
														<img src="../img/arrowDown0_icon.png" class="arrow_down">
													</dd>
													<dd class="returnTime">
														回程时间
														<img src="../img/arrowUp0_icon.png" class="arrow_up">
														<img src="../img/arrowDown0_icon.png" class="arrow_down">
													</dd>
													<dd class="lockStatus">LOCK</dd>
													<dd class="finishStatus">FINISH</dd>
													<!--<dd class="number">关联</dd>-->
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
														Y&nbsp;|&nbsp;200
													</dd>
													<dd class="receivable">
														CC
													</dd>
													<dd class="salePrice">300</dd>
													<dd class="createDate">2018-12-12</dd>
													<dd class="startTime">2018-12-12</dd>
													<dd class="returnTime">2018-12-12</dd>
													<dd class="lockStatus yesStatus"></dd>
													<dd class="finishStatus noStatus"></dd>
													<!--<dd class="number">
														<a href="javascript:void(0);">123</a>
													</dd>-->
												</dl>
											</li>
											<li class="listDetail">
												<dl>
													<dd class="systemNum">002</dd>
													<dd class="invoice">12346tony</dd>
													<dd class="profit">
														100
													</dd>
													<dd class="debt">
														N&nbsp;|&nbsp;200
													</dd>
													<dd class="receivable">
														CC
													</dd>
													<dd class="salePrice">300</dd>
													<dd class="createDate">2018-12-12</dd>
													<dd class="startTime">2018-12-12</dd>
													<dd class="returnTime">2018-12-12</dd>
													<dd class="lockStatus yesStatus"></dd>
													<dd class="finishStatus noStatus"></dd>
													<!--<dd class="number">
														<a href="javascript:void(0);">123</a>
													</dd>-->
												</dl>
											</li>
										</ul>
										<!--tab e-->
										<div class="nav-box eg">
											<ul class="pagination m-style" id="lockPagination"></ul>
										</div>
									</div>
									<!--取消LOCK   e-->
									<!--取消CLEAR  s-->
									<div class="cancelFloor cancelClear" id="cancelClear">
										<!--clear-->
										<label class="markMsg"><i></i>申请列表-取消CLEAR</label>
										<ul class="btnList">
											<li>
												<a href="javascript:void(0);" class="selectAllBtn nm-left">
													全选
												</a>
												<a href="javascript:void(0);" class="rejectBtn nm-right">
													驳回
												</a>
												<a href="javascript:void(0);" class="cancelClearBtn nm-right">
													取消CLEAR
												</a>
											</li>
										</ul>
										<!--tab s-->
										<ul class="tabFloor">
											<li class="listTitle">
												<dl>
													<dd class="systemNum">系统编号</dd>
													<dd class="invoice">INVOICE</dd>
													<dd class="profit">
														<label>
															利润&#40;<span>12345</span>&#41;
														</label>
													</dd>
													<dd class="debt">
														<label>
															Debt&#40;<span>12345</span>&#41;
														</label>
													</dd>
													<dd class="receivable">
														<label>
															应收款&#40;<span>12345</span>&#41;
														</label>
													</dd>
													<dd class="salePrice">
														<label>
															卖价&#40;<span>12345</span>&#41;
														</label>
													</dd>
													<dd class="createDate">
														创建时间
														<img src="../img/arrowUp0_icon.png" class="arrow_up">
														<img src="../img/arrowDown0_icon.png" class="arrow_down">
													</dd>
													<dd class="startTime">
														出发时间
														<img src="../img/arrowUp0_icon.png" class="arrow_up">
														<img src="../img/arrowDown0_icon.png" class="arrow_down">
													</dd>
													<dd class="returnTime">
														回程时间
														<img src="../img/arrowUp0_icon.png" class="arrow_up">
														<img src="../img/arrowDown0_icon.png" class="arrow_down">
													</dd>
													<dd class="lockStatus">LOCK</dd>
													<dd class="finishStatus">FINISH</dd>
													<!--<dd class="number">关联</dd>-->
												</dl>
											</li>
											<li class="listDetail">
												<dl>
													<dd class="systemNum">123</dd>
													<dd class="invoice">tony12346</dd>
													<dd class="profit">
														200
													</dd>
													<dd class="debt">
														Y&nbsp;|&nbsp;100
													</dd>
													<dd class="receivable">
														CC
													</dd>
													<dd class="salePrice">100</dd>
													<dd class="createDate">2018-12-12</dd>
													<dd class="startTime">2018-12-12</dd>
													<dd class="returnTime">2018-12-12</dd>
													<dd class="lockStatus yesStatus"></dd>
													<dd class="finishStatus yesStatus"></dd>
													<!--<dd class="number">
														<a href="javascript:void(0);">124</a>
													</dd>-->
												</dl>
											</li>
											<li class="listDetail">
												<dl>
													<dd class="systemNum">212</dd>
													<dd class="invoice">tony12346</dd>
													<dd class="profit">
														200
													</dd>
													<dd class="debt">
														Y&nbsp;|&nbsp;100
													</dd>
													<dd class="receivable">
														CC
													</dd>
													<dd class="salePrice">100</dd>
													<dd class="createDate">2018-12-12</dd>
													<dd class="startTime">2018-12-12</dd>
													<dd class="returnTime">2018-12-12</dd>
													<dd class="lockStatus yesStatus"></dd>
													<dd class="finishStatus yesStatus"></dd>
													<!--<dd class="number">
														<a href="javascript:void(0);">124</a>
													</dd>-->
												</dl>
											</li>
										</ul>
										<!--tab e-->
										<div class="nav-box eg">
											<ul class="pagination m-style" id="clearPagination"></ul>
										</div>
									</div>
									<!--取消CLEAR  e-->
									<!--取消PAID   s-->
									<div class="cancelFloor cancelPaid" id="cancelPaid">
										<!--paid-->
										<label class="markMsg"><i></i>申请列表-取消PAID</label>
										<ul class="btnList">
											<li>
												<a href="javascript:void(0);" class="selectAllBtn nm-left">
													全选
												</a>
												<a href="javascript:void(0);" class="rejectBtn nm-right">
													驳回
												</a>
												<a href="javascript:void(0);" class="cancelPaidBtn nm-right">
													取消PAID
												</a>
											</li>
										</ul>
										<!--tab s-->
										<ul class="tabFloor">
											<li class="listTitle">
												<dl>
													<dd class="systemNum">系统编号</dd>
													<dd class="invoice">INVOICE</dd>
													<dd class="profit">
														<label>
															利润&#40;<span>12345</span>&#41;
														</label>
													</dd>
													<dd class="debt">
														<label>
															Debt&#40;<span>12345</span>&#41;
														</label>
													</dd>
													<dd class="receivable">
														<label>
															应收款&#40;<span>12345</span>&#41;
														</label>
													</dd>
													<dd class="salePrice">
														<label>
															卖价&#40;<span>12345</span>&#41;
														</label>
													</dd>
													<dd class="createDate">
														创建时间
														<img src="../img/arrowUp0_icon.png" class="arrow_up">
														<img src="../img/arrowDown0_icon.png" class="arrow_down">
													</dd>
													<dd class="startTime">
														出发时间
														<img src="../img/arrowUp0_icon.png" class="arrow_up">
														<img src="../img/arrowDown0_icon.png" class="arrow_down">
													</dd>
													<dd class="returnTime">
														回程时间
														<img src="../img/arrowUp0_icon.png" class="arrow_up">
														<img src="../img/arrowDown0_icon.png" class="arrow_down">
													</dd>
													<dd class="lockStatus">LOCK</dd>
													<dd class="finishStatus">FINISH</dd>
													<!--<dd class="number">关联</dd>-->
												</dl>
											</li>
											<li class="listDetail">
												<dl>
													<dd class="systemNum">012</dd>
													<dd class="invoice">tony1234</dd>
													<dd class="profit">
														200
													</dd>
													<dd class="debt">
														N&nbsp;|&nbsp;100
													</dd>
													<dd class="receivable">
														CC
													</dd>
													<dd class="salePrice">100</dd>
													<dd class="createDate">2018-12-12</dd>
													<dd class="startTime">2018-12-12</dd>
													<dd class="returnTime">2018-12-12</dd>
													<dd class="lockStatus noStatus"></dd>
													<dd class="finishStatus noStatus"></dd>
													<!--<dd class="number">
														<a href="javascript:void(0);">126</a>
													</dd>-->
												</dl>
											</li>
											<li class="listDetail">
												<dl>
													<dd class="systemNum">234</dd>
													<dd class="invoice">tony12346</dd>
													<dd class="profit">
														200
													</dd>
													<dd class="debt">
														N&nbsp;|&nbsp;100
													</dd>
													<dd class="receivable">
														CC
													</dd>
													<dd class="salePrice">100</dd>
													<dd class="createDate">2018-12-12</dd>
													<dd class="startTime">2018-12-12</dd>
													<dd class="returnTime">2018-12-12</dd>
													<dd class="lockStatus yesStatus"></dd>
													<dd class="finishStatus yesStatus"></dd>
													<!--<dd class="number">
														<a href="javascript:void(0);">124</a>
													</dd>-->
												</dl>
											</li>
											<li class="listDetail">
												<dl>
													<dd class="systemNum">234</dd>
													<dd class="invoice">tony12346</dd>
													<dd class="profit">
														200
													</dd>
													<dd class="debt">
														N&nbsp;|&nbsp;100
													</dd>
													<dd class="receivable">
														Y&nbsp;|&nbsp;100
													</dd>
													<dd class="salePrice">100</dd>
													<dd class="createDate">2018-12-12</dd>
													<dd class="startTime">2018-12-12</dd>
													<dd class="returnTime">2018-12-12</dd>
													<dd class="lockStatus yesStatus"></dd>
													<dd class="finishStatus yesStatus"></dd>
													<!--<dd class="number">
														<a href="javascript:void(0);">124</a>
													</dd>-->
												</dl>
											</li>
										</ul>
										<!--tab e-->
										<div class="nav-box eg">
											<ul class="pagination m-style" id="paidPagination"></ul>
										</div>
									</div>
									<!--取消PAID   e-->
									<!--取消FINISH s-->
									<div class="cancelFloor cancelFinish" id="cancelFinish">
										<!--finish-->
										<label class="markMsg"><i></i>申请列表-取消FINISH</label>
										<ul class="btnList">
											<li>
												<a href="javascript:void(0);" class="selectAllBtn nm-left">
													全选
												</a>
												<a href="javascript:void(0);" class="rejectBtn nm-right">
													驳回
												</a>
												<a href="javascript:void(0);" class="cancelFinishBtn nm-right">
													取消FINISH
												</a>
											</li>
										</ul>
										<!--tab s-->
										<ul class="tabFloor">
											<li class="listTitle">
												<dl>
													<dd class="systemNum">系统编号</dd>
													<dd class="invoice">INVOICE</dd>
													<dd class="profit">
														<label>
															利润&#40;<span>12345</span>&#41;
														</label>
													</dd>
													<dd class="debt">
														<label>
															Debt&#40;<span>12345</span>&#41;
														</label>
													</dd>
													<dd class="receivable">
														<label>
															应收款&#40;<span>12345</span>&#41;
														</label>
													</dd>
													<dd class="salePrice">
														<label>
															卖价&#40;<span>12345</span>&#41;
														</label>
													</dd>
													<dd class="createDate">
														创建时间
														<img src="../img/arrowUp0_icon.png" class="arrow_up">
														<img src="../img/arrowDown0_icon.png" class="arrow_down">
													</dd>
													<dd class="startTime">
														出发时间
														<img src="../img/arrowUp0_icon.png" class="arrow_up">
														<img src="../img/arrowDown0_icon.png" class="arrow_down">
													</dd>
													<dd class="returnTime">
														回程时间
														<img src="../img/arrowUp0_icon.png" class="arrow_up">
														<img src="../img/arrowDown0_icon.png" class="arrow_down">
													</dd>
													<dd class="lockStatus">LOCK</dd>
													<dd class="finishStatus">FINISH</dd>
													<!--<dd class="number">关联</dd>-->
												</dl>
											</li>
											<li class="listDetail">
												<dl>
													<dd class="systemNum">011</dd>
													<dd class="invoice">tony12</dd>
													<dd class="profit">
														400
													</dd>
													<dd class="debt">
														N&nbsp;|&nbsp;300
													</dd>
													<dd class="receivable">
														CC
													</dd>
													<dd class="salePrice">100</dd>
													<dd class="createDate">2018-12-12</dd>
													<dd class="startTime">2018-12-12</dd>
													<dd class="returnTime">2018-12-12</dd>
													<dd class="lockStatus noStatus"></dd>
													<dd class="finishStatus yesStatus"></dd>
													<!--<dd class="number">
														<a href="javascript:void(0);">122</a>
													</dd>-->
												</dl>
											</li>
											<li class="listDetail">
												<dl>
													<dd class="systemNum">143</dd>
													<dd class="invoice">tony12346</dd>
													<dd class="profit">
														200
													</dd>
													<dd class="debt">
														N&nbsp;|&nbsp;100
													</dd>
													<dd class="receivable">
														CC
													</dd>
													<dd class="salePrice">100</dd>
													<dd class="createDate">2018-12-12</dd>
													<dd class="startTime">2018-12-12</dd>
													<dd class="returnTime">2018-12-12</dd>
													<dd class="lockStatus yesStatus"></dd>
													<dd class="finishStatus yesStatus"></dd>
													<!--<dd class="number">
														<a href="javascript:void(0);">124</a>
													</dd>-->
												</dl>
											</li>
										</ul>
										<div class="nav-box eg">
											<ul class="pagination m-style" id="finishPagination"></ul>
										</div>
										<!--tab e-->
									</div>
									<!--取消FINISH e-->
									<a href="javascript:void(0);" class="backTop">
										<img src="../img/top_icon2.png">
									</a>
								</div>
								<!--提示框   s-->
								<div class="confirmNoticeInfo">
									<p class="confirmTitle">
										<img src="../img/confirmInfo.png">
									</p>
									<p class="confirmNotice">确认更改</p>
									<p class="actionBox">
										<button class="actionConfirm">确认</button>
										<button class="actionCancel">取消</button>
									</p>
								</div>
								<!--提示框   e-->
							</div>
						</div>
					</div>
				</div>
				<!--右侧内容     e-->
			</div>
			<!--content e-->
		</div>
		<script src="../js/jquery.min.js" type="text/javascript"></script>
		<script src="../js/homePage/public.js" type="text/javascript"></script>
		<script src="../js/jquery.pagination.js" type="text/javascript"></script>
		<script src="../js/Management/FinancialAudit.js" type="text/javascript"></script>
	</body>
</html>
