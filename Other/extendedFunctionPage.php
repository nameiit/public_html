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
		<title>扩展功能</title>
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
			<!--主内容区  s-->
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
						<li class="kuaiji">
							<a href="AccountingConfirm.php" class="bm-title">
								<img src="../img/kuaiji.png">
								财务
							</a>
							<dl class="detailMsg nm-hide">
								<!--<dd>
									<a href="../OrderHistory/OrderHistory.php" class="lab-active">
										<label></label> 历史订单
									</a>
								</dd>
								<dd>
									<a href="../AccountingService/GroupTourService.php">
										<label></label> 会计服务
									</a>
								</dd>-->
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
						<li class="qita title-active">
							<a href="../Other/NoticeManage.php" class="bm-title">
								<img src="../img/c_qita.png">
								其他
							</a>
							<dl class="detailMsg">
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
				<!--右侧导航   s-->
				<div class="theamInfo nm-right">
					<div class="showMsg otherManage">
						<div class="floor otherManageArea">
							<div class="groupMsg">
								<!--其他管理   s-->
								<label class="theamTitle"> <i></i> 其他管理 </label>
								<!--其他管理   e-->
								<div class="otherManageNav">
									<ul>
										<!--<li>
											<a href="OtherManage.php">
												折扣码
											</a>
										</li>-->
										<li>
											<a href="Other.php">
												其他
											</a>
										</li>
										<li class="current-item">
											<a href="extendedFunctionPage.php">
												扩展功能
											</a>
										</li>
									</ul>
								</div>
								<div class="extensionItem">
									<ul class="tab-nav">
										<li class="selected">
											<a href="javascript:void(0);">
												代理佣金
											</a>
										</li>
										<li>
											<a href="javascript:void(0);">
												折扣码
											</a>
										</li>
										<li>
											<a href="javascript:void(0);">
												订单关联
											</a>
										</li>
										<li>
											<a href="javascript:void(0);">
												旅行社
											</a>
										</li>
									</ul>
									<!--代理佣金-->
									<div class="tab-item  agencyCommission current">
										<ul>
											<li>
												<label class="switch">
												<input class="btn-switch large" type="checkbox">
												</label>
												<span class="status">未激活</span>
											</li>
											<li class="item-content expansionContent">
												<label class="markMsg"><i></i>扩展内容</label>
												<ul class="add-msg">
													<li class="list_currency">
														<label class="nm-left">代理佣金</label>
														<input type="text"  class="commission"/>
														<select>
															<option value="USD">$ 美元</option>
															<option value="RMB">￥ 人民币</option>
														</select>
													</li>
													<li>
														<label>代理人账号</label>
														<input type="text" placeholder="Search..." />
													</li>

												</ul>
											</li>
											<li class="item-content usetoPage">
												<label class="markMsg"><i></i>应用页面</label>
												<ul class="add-msg">
													<li class="use">
														<div class="checkbox checkbox-success">
															<input id="agency_groupTour" class="styled" type="checkbox">
															<label for="agency_groupTour">独立团</label>
														</div>
													</li>
													<li class="use">
														<div class="checkbox checkbox-success">
															<input id="agency_individualTour" class="styled" type="checkbox">
															<label for="agency_individualTour">散拼团</label>
														</div>
													</li>
													<li class="use">
														<div class="checkbox checkbox-success">
															<input id="agency_airTicket" class="styled" type="checkbox">
															<label for="agency_airTicket">机票</label>
														</div>
													</li>
												</ul>
											</li>
											<li class="item-content extraContent">
												<label class="markMsg"><i></i>额外内容</label>
												<ul class="add-msg">
													<li class="use">
														<div class="checkbox checkbox-success">
															<input id="agency_extraContent" class="styled" type="checkbox" checked="checked">
															<label for="agency_extraContent">激活代理人管理页面</label>
														</div>
													</li>
													<li class="goPage">
														<a href="javascript:void(0);">
															点击前往该页面
														</a>
													</li>
													<li class="use">
														<div class="checkbox checkbox-success">
															<input id="agency_orderHistory" class="styled" type="checkbox" checked="checked">
															<label for="agency_orderHistory">激活历史订单相应选项卡</label>
														</div>
													</li>
													<li class="use agencyInfo">
														<div class="checkbox checkbox-success checkbox1">
															<input id="agency_commission" class="styled" type="checkbox" checked="checked">
															<label for="agency_commission"></label>
														</div>
														<div class="selected">
															<div class="checkbox checkbox-success checkboxBtn">
																<input id="commissionInfo" class="styled" type="checkbox" checked="checked">
																<label for="commissionInfo">代理佣金<i></i> </label>
															</div>
														</div>
													</li>
													<li class="use agencyInfo">
														<div class="checkbox checkbox-success checkbox1">
															<input id="agency_account" class="styled" type="checkbox" checked="checked">
															<label for="agency_account"></label>
														</div>
														<div class="selected">
															<div class="checkbox checkbox-success checkboxBtn">
																<input id="account_info" class="styled" type="checkbox" checked="checked">
																<label for="account_info">代理人账号<i></i> </label>
															</div>
														</div>
													</li>

												</ul>
											</li>
										</ul>
									</div>
									<!--折扣码-->
									<div class="tab-item discountCode">
										<ul>
											<li>
												<label class="switch">
												<input class="btn-switch large" type="checkbox">
												</label>
												<span class="status">未激活</span>
											</li>
											<li class="item-content expansionContent">
												<label class="markMsg"><i></i>扩展内容</label>
												<ul class="add-msg">
													<li class="discountCard">
														<label class="nm-left">折扣</label>
														<dl class="discountOption" id="extensionDiscountOption">
															<dd class="option-active discount-code">
																<a href="javascript:void(0);">
																	折扣码
																</a>
															</dd>
															<dd class="coupon">
																<a href="javascript:void(0);">
																	折扣金额
																</a>
															</dd>
														</dl>
														<dl class="exchange">
															<dd class="discount-text">
																<input type="text" id="extensionDiscountText">
																<select id="coupon-currency">
																	<option value="USD">$ 美元</option>
																	<option value="RMB">￥ 人民币</option>
																</select>
															</dd>
															<dd class="discount-apply">
																<a href="javascript:void(0);" class="discountApply" id="extensionDiscountApply">
																	Apply
																</a>
															</dd>
														</dl>
														<dl class="discountNotice nm-hide" id="extensionDiscountNotice">
															<dd>
																<span id="extensionSubtractNum"></span>
															</dd>
														</dl>
													</li>
												</ul>
											</li>
											<li class="item-content usetoPage">
												<label class="markMsg"><i></i>应用页面</label>
												<ul class="add-msg">
													<li class="use">
														<div class="checkbox checkbox-success">
															<input id="groupTour" class="styled" type="checkbox">
															<label for="groupTour">独立团</label>
														</div>
													</li>
													<li class="use">
														<div class="checkbox checkbox-success">
															<input id="individualTour" class="styled" type="checkbox">
															<label for="individualTour">散拼团</label>
														</div>
													</li>
													<li class="use">
														<div class="checkbox checkbox-success">
															<input id="airTicket" class="styled" type="checkbox">
															<label for="airTicket">机票</label>
														</div>
													</li>
												</ul>
											</li>
											<li class="item-content extraContent">
												<label class="markMsg"><i></i>额外内容</label>
												<ul class="add-msg">
													<li class="use">
														<div class="checkbox checkbox-success">
															<input id="extraContent" class="styled" type="checkbox" checked="checked">
															<label for="extraContent">激活折扣码管理页面</label>
														</div>
													</li>
													<li class="goPage">
														<a href="javascript:void(0);">
															点击前往该页面
														</a>
													</li>
													<li class="use">
														<div class="checkbox checkbox-success">
															<input id="discount_orderHistory" class="styled" type="checkbox" checked="checked">
															<label for="discount_orderHistory">激活历史订单相应选项卡</label>
														</div>
													</li>
													<li class="use agencyInfo">
														<div class="checkbox checkbox-success checkbox1">
															<input id="discount_commission" class="styled" type="checkbox" checked="checked">
															<label for="discount_commission"></label>
														</div>
														<div class="selected">
															<div class="checkbox checkbox-success checkboxBtn">
																<input id="discount_commissionInfo" class="styled" type="checkbox" checked="checked">
																<label for="discount_commissionInfo">折扣<i></i></label>
															</div>
														</div>
													</li>
												</ul>
											</li>

										</ul>
									</div>

									<!--订单关联-->
									<div class="tab-item ordersAssociated">
										<ul>
											<li>
												<label class="switch">
												<input class="btn-switch large" type="checkbox">
												</label>
												<span class="status">未激活</span>
											</li>
											<!--扩展内容   s-->
											<li class="item-content expansionContent">
												<label class="markMsg"><i></i>扩展内容</label>
												<ul class="add-msg">
													<li class="list_currency systemNum">
														<label>系统编号</label>
														<input type="text" />
														<a href="javascript:void(0);">
															确认
														</a>
													</li>
													<div class="systemNumTab">
														<li class="tab_title">
															<dl>
																<dd class="selectInfo">

																</dd>
																<dd class="numberInfo">
																	系统编号
																</dd>
																<dd class="salesInfo">
																	销售人员
																</dd>
																<!--<dd class="typeInfo">
																	类型
																</dd>-->
																<dd class="number">
																	关联编号
																</dd>
															</dl>
														</li>
														<!--<li class="tab_content">
															<dl>
																<dd class="selectInfo">
																	<div class="checkbox checkbox-success">
																		<input id="numInfo1" class="styled" type="checkbox" checked="checked">
																		<label for="numInfo1"></label>
																	</div>
																</dd>
																<dd class="numberInfo">
																	4023
																</dd>
																<dd class="salesInfo">
																	MICHEAL_SHENG
																</dd>
																<dd class="typeInfo">
																	独立团
																</dd>
																<dd class="number">
																	<a>124,125,126,127</a>
																</dd>
															</dl>
														</li>-->

													</div>

												</ul>
											</li>
											<!--扩展内容   e-->
											<li class="item-content usetoPage">
												<label class="markMsg"><i></i>应用页面</label>
												<ul class="add-msg">
													<li class="use">
														<div class="checkbox checkbox-success">
															<input id="order_groupTour" class="styled" type="checkbox">
															<label for="order_groupTour">独立团</label>
														</div>
													</li>
													<li class="use">
														<div class="checkbox checkbox-success">
															<input id="order_individualTour" class="styled" type="checkbox">
															<label for="order_individualTour">散拼团</label>
														</div>
													</li>
													<li class="use">
														<div class="checkbox checkbox-success">
															<input id="order_airTicket" class="styled" type="checkbox">
															<label for="order_airTicket">机票</label>
														</div>
													</li>
												</ul>
											</li>
											<!--额外内容  s-->
											<li class="item-content extraContent">
												<label class="markMsg"><i></i>额外内容</label>
												<ul class="add-msg">
													<li class="use">
														<div class="checkbox checkbox-success">
															<input id="order_extraContent" class="styled" type="checkbox" checked="checked" onclick="return false;">
															<label for="order_extraContent">激活财务确认的订单关联功能</label>
														</div>
													</li>
													<li class="goPage">
														<a href="javascript:void(0);">
															点击前往该页面
														</a>
													</li>
												</ul>
											</li>
											<!--额外内容  e-->
										</ul>
									</div>
									<!--旅行社-->
									<div class="tab-item travelAgency">
										<ul>
											<li>
												<label class="switch">
												<input class="btn-switch large" type="checkbox">
												</label>
												<span class="status">未激活</span>
											</li>
											<li class="item-content expansionContent">
												<label class="markMsg"><i></i>扩展内容</label>
												<ul class="add-msg">
													<li>
														<label>旅行社来源</label>
														<input type="text" placeholder="Search..." />
													</li>
												</ul>
											</li>
											<li class="item-content usetoPage">
												<label class="markMsg"><i></i>应用页面</label>
												<ul class="add-msg">
													<li class="use">
														<div class="checkbox checkbox-success">
															<input id="travelAgency_airTicket" class="styled" type="checkbox">
															<label for="travelAgency_airTicket">机票</label>
														</div>
													</li>
												</ul>
											</li>
											<li class="item-content extraContent">
												<label class="markMsg"><i></i>额外内容</label>
												<ul class="add-msg">
													<li class="use">
														<div class="checkbox checkbox-success">
															<input id="travelAgency_extraContent" class="styled" type="checkbox" checked="checked">
															<label for="travelAgency_extraContent">激活旅行社管理页面</label>
														</div>
													</li>
													<li class="goPage">
														<a href="javascript:void(0);">
															点击前往该页面
														</a>
													</li>
													<li class="use">
														<div class="checkbox checkbox-success">
															<input id="travelAgency_orderHistory" class="styled" type="checkbox" checked="checked">
															<label for="travelAgency_orderHistory">激活历史订单相应选项卡</label>
														</div>
													</li>
													<li class="use agencyInfo">
														<div class="checkbox checkbox-success checkbox1">
															<input id="travelAgency_origin" class="styled" type="checkbox" checked="checked">
															<label for="travelAgency_origin"></label>
														</div>
														<div class="selected">
															<div class="checkbox checkbox-success checkboxBtn">
																<input id="sourceInfor" class="styled" type="checkbox" checked="checked">
																<label for="sourceInfor">旅行社来源<i></i></label>
															</div>
														</div>
													</li>
												</ul>
											</li>

										</ul>

									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!--右侧导航   e-->
			</div>
			<!--主内容区  e-->
		</div>
		<?php
		$status = $_SESSION["group_name"];
		echo "<script type='text/javascript'>localStorage.setItem('status', '$status');</script>";
		?>
		<script src="../js/jquery.min.js" type="text/javascript"></script>
		<script src="../js/homePage/public.js" type="text/javascript"></script>
		<script src="../js/Other/extendedFunctionPage.js" type="text/javascript"></script>
	</body>
</html>
