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
		<title>独立团更新</title>
		<link href="../css/groupTour.css" type="text/css" rel="stylesheet" />
		<link href="../css/style.css" type="text/css" rel="stylesheet" />
		<link rel="stylesheet" type="text/css" href="../css/pagination.css"/>
		<link rel="stylesheet" type="text/css" href="../css/businessUpdate.css" />
	</head>
	<body>
		<div class="msWidth">
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
			<div class="msContent">
				<div class="navInfo nm-left">
					<ul>
						<li class="shouye">
							<a href="../index.php" class="bm-title">
								<img src="../img/shouye.png">
								首页
							</a>
						</li>
						<li class="yewu title-active">
							<a href="javascript:void(0);" class="bm-title ">
								<img src="../img/c_yewu.png">
								业务
							</a>
							<dl class="detailMsg">
								<dd>
									<a href="javascript:void(0);" class="lab-active">
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
								<img src="../img/kuaiji.png">
								财务
							</a>
							<dl class="detailMsg nm-hide">
								<!--<dd>
									<a href="javascript:void(0);" class="lab-active">
										<label></label> 历史订单
									</a>
								</dd>
								<dd>
									<a href="javascript:void(0);"><label></label> 会计服务</a>
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
										<label></label> 批发商
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
				<div class="theamInfo nm-right">
					<div class="showMsg yewu">
						<div class="floor teamIndie">
							<div class="navGroup">
								<ul>
									<li class="addItem">
										<a href="GroupTourCreate.php" class="btn  createOrderButton">
											<img src="../img/c_add.png" />
											添<i>隐藏</i>加
										</a>
									</li>
									<li class="updateItem card-active">
										<a href="javascript:void(0);" class="btn updateOrderButton ms-active">
											<img src="../img/refresh.png">
											更<i>隐藏</i>新
										</a>
									</li>
								</ul>
							</div>
							<!--独立团更新      s-->
							<div class="groupMsg updateInfo">
								<label class="theamTitle">
									<i></i>筛选条件
								</label>
								<form>
									<ul class="filterBox">
										<li class="datePicker">
											<label>订单创建时间</label>
											<select id="group-update-date-filter">
												<option value="customized">Customized</option>
												<option value="1">本日</option>
												<option value="30" selected>最近30天</option>
												<option value="90">最近3个月</option>
												<option value="180">最近半年</option>
											</select>
											<dl class="selectRange nm-hide">
												<dd>
													<i>From</i>
													<input type="date" id="group-update-from-date" />
												</dd>
												<dd>
													<i>To</i>
													<input type="date" id="group-update-to-date" />
												</dd>
											</dl>
										</li>
										<li class="optionItem">
											<label>订单号</label>
											<input type="text" id="group-update-transaction-id-filter" />
										</li>
										<li class="optionItem">
											<label>团号</label>
											<input type="text" id="group-update-group-code-filter" />
											<dl class="confirmMsg">
												<dd><a href="javascript:void(0);" id="group-tour-update-filter">确认</a></dd>
												<dd><a href="javascript:void(0);" id="group-tour-update-reset">重置</a></dd>
											</dl>
										</li>
									</ul>
									<!--tab   s-->
									<div class="updateTab groupTourUpdateTab">
										<ul class="tabList tabListTitle">
											<li class="listNum"><a href="javascript:void(0);">#</a></li>
											<li class="listCreatTime"><a href="javascript:void(0);">创建时间</a></li>
											<li class="listGroupNum"><a href="javascript:void(0);">团号</a></li>
											<li class="listJourney"><a href="javascript:void(0);">行程</a></li>
											<li class="listPayment"><a href="javascript:void(0);">支付方式</a></li>
											<li class="listCurrency"><a href="javascript:void(0);">货币</a></li>
											<li class="listProfit"><a href="javascript:void(0);">利润</a></li>
											<li class="listPrice"><a href="javascript:void(0);">收款</a></li>
											<li class="listCost"><a href="javascript:void(0);">成本(准备金/报账)</a></li>
											<li class="listDiscount "><a href="javascript:void(0);">折扣</a></li>
										</ul>
										<ul class="tabList tabListDetail">
										</ul>
									</div>
									<!--tab   e-->
									<!--end-->
									<div class="nav-box eg">
										<ul class="pagination m-style" id="p3"></ul>
									</div>
								</form>
								<!--弹出的表单    s-->
								<div class="dialog_content">
									<div class="groupMsg addInfo updateDialog dialog move_part" id="dialog">
										<ul class="formAction">
												<li class="amendOrder amend-tabInfo">
													<a href="javascript:void(0);" id="updateConfirm">
														确认修改
													</a>
												</li>
												<li class="amendOrder confirm-tabInfo">
													<a href="javascript:void(0);" id="updateAndDownloadConfirm">
														确认并下载
													</a>
												</li>
												<li class="deleteOrder delete-tabInfo">
													<a href="javascript:void(0);" id="deleteConfirm">
														删除订单
													</a>
												</li>
												<!--请求接收-->
												<li class="nm-right requestReceive">
													<a href="javascript:void(0);">
														<img src="../img/request_icon.png"/>
														<span>销售已收款，请求财务确认接收</span>
													</a>
												</li>
											</ul>
										<form class="addlist updateForm" id="updateForm">
											<div class="cardLeft groupLeftInfo">
											<div class="cardLeft nm-left">
												<label class="markMsg"><i></i>出团信息</label>
												<ul class="add-msg">
													<li class="requiredItem">
														<label class="nm-left">团号</label>
														<input type="text" id="updateGroupNum">
													</li>
													<li>
														<label class="nm-left">INVOICE</label>
														<input type="text" id="invoice">
													</li>
													<li>
														<label class="nm-left">航班号</label>
														<input type="text" id="updateFlightNumber">
													</li>
													<li>
														<label class="nm-left">巴士公司</label>
														<input type="text" id="updateBusCompany">
													</li>
													<li class="requiredItem">
														<label class="nm-left">销售人员</label>
														<input id="updateSalesperson" type="text" placeholder="Search...">
													</li>
													<li class="source">
														<label class="nm-left">顾客来源</label>
														<input id="updateSource" type="text" placeholder="Search...">
													</li>
													<li class="requiredItem">
														<label class="nm-left ">领队人数</label>
														<input type="text" class="updateLeaderNum" id="upadteLeaderNum">
													</li>
													<li class="requiredItem">
														<label class="nm-left ">游客人数</label>
														<input type="text" class="updateVisitorNum" id="updateVisitorNum">
													</li>
													<!--<li>
														<label class="nm-left">出发日期</label>
														<input type="date" id="updateStartTime">
													</li>
													<li>
														<label class="nm-left">结束日期</label>
														<input type="date" id="updateEndTime">
													</li>
													<li>
														<label class="nm-left">天数</label>
														<input type="text" id="updateDayCount">
													</li>-->
													
													
													<li>
														<label class="nm-left">备注</label>
														<textarea rows="5" id="updateNote"></textarea>
													</li>
												</ul>
											</div>
											<!--<div class="cardLeft nm-left info-date">
												<label class="markMsg"><i></i>日期信息</label>
												<ul class="add-msg">
													<li>
														<label class="nm-left">出发日期</label>
														<input type="date" id="updateStartTime">
													</li>
													<li>
														<label class="nm-left">结束日期</label>
														<input type="date" id="updateEndTime">
													</li>
													<li>
														<label class="nm-left">天数</label>
														<input type="text" id="updateDayCount">
													</li>
												</ul>
											</div>-->
											</div>
											<div class="cardRight groupRightInfo">
												<div class="cardRight nm-right info-date">
													<label class="markMsg"><i></i>行程安排</label>
													<ul class="add-msg">
														<li>
															<label class="nm-left">出发日期</label>
															<input type="date" id="updateStartTime">
														</li>
														<li>
															<label class="nm-left">结束日期</label>
															<input type="date" id="updateEndTime">
														</li>
														<li>
															<label class="nm-left">天数</label>
															<input type="text" id="updateDayCount">
														</li>
													</ul>
												</div>
												<!--其他信息      s-->
												<div class="cardRight nm-right otherInfo">
													<label class="markMsg"><i></i>其他信息</label>
													<ul class="add-msg">
														<li><label class="nm-left tips">请先输入汇率:</label></li>
														<li class="exchangeRate requiredItem">
															<label class="nm-left">成交汇率</label>
															<span>1&nbsp;&nbsp;美元&nbsp;&nbsp;=&nbsp;&nbsp; <input type="text" id="indiv_exchange_rate"    disabled>&nbsp;&nbsp;人民币</span>
														</li>
														<li class="list_account  list_currency">
															<label class="nm-left">总收入</label>
															<input type="text" />
															<!--<select>
																<option value="USD">$ 美元</option>
																<option value="RMB">￥ 人民币</option>
															</select>-->
															<span>美元</span>
														</li>
														<!--总收入    e-->
														<!--已知花费   s-->
														<li class="list_account  list_currency">
															<label class="nm-left">已知花费</label>
															<input type="text" />
															<!--<select>
																<option value="USD">$ 美元</option>
																<option value="RMB">￥ 人民币</option>
															</select>-->
															<span>美元</span>
														</li>
														<!--已知花费   e-->
														<!--其他花费   s-->
														<li class="list_currency">
															<label class="nm-left">其他花费</label>
															<input type="text" />
															<select>
																<option value="USD">$ 美元</option>
																<option value="RMB">￥ 人民币</option>
															</select>
														</li>
														<!--其他花费   e-->
														<!--总花费       s-->
														<li class="list_account  list_currency">
															<label class="nm-left">总花费</label>
															<input type="text" id="updateTotalCost">
															<!--<select id="total_cost_currency">
																<option value="USD">$ 美元</option>
																<option value="RMB">￥ 人民币</option>
															</select>-->
															<span>美元</span>
														</li>
														<!--折扣模块   s-->
														<li class="discountCard">
															<label class="nm-left">折扣</label>
															<dl class="discountOption" id="groupDiscountOption_update">
																<dd class="discount-code">
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
																	<input type="text" id="groupDiscountText_update">
																	<select id="groupDiscountCurrency_update">
																		<option value="USD">$ 美元</option>
																		<option value="RMB">￥ 人民币</option>
																	</select>
																</dd>
																<dd class="discount-apply">
																	<a href="javascript:void(0);" class="discountApply" id="groupDiscountApply_update">
																		Apply
																	</a>
																</dd>
															</dl>
															<dl class="discountNotice nm-hide" id="groupDiscountNotice_update">
																<dd>
																	<span id="groupSubtractNum_update"></span>
																</dd>
															</dl>
														</li>
														<!--折扣模块   e-->
														<!--利润           s-->
														<li class="list_account calculateProfit">
															<label class="nm-left">利润</label>
															<input type="text" disabled="disabled" id="total_profit">
															<span id="total_profit_currency"></span>
															<a href="javascript:void(0);" id="update_group_calculateBtn">确认</a>
														</li>
														<!--利润           e-->	
														<!--准备金       s-->
														<!--<li class="list_currency">
															<label class="nm-left">准备金</label>
															<input type="text" id="updateReserve">
															<select id="reserve_currency">
																<option value="USD">$ 美元</option>
																<option value="RMB">￥ 人民币</option>
															</select>
														</li>-->
														<!--准备金        e-->													
													</ul>
												</div>
												<!--其他信息      e-->
											<!--<div class="cardRight nm-right info-price exchangeRateAndPayment">
												<label class="markMsg"><i></i>汇率</label>
												<ul class="add-msg">
													<li><label class="nm-left tips">请先输入汇率:</label></li>
													<li class="exchangeRate requiredItem">
														<label class="nm-left">当前汇率</label>
														<span>1&nbsp;&nbsp;美元&nbsp;&nbsp;=&nbsp;&nbsp; <input type="text" id="indiv_exchange_rate"    disabled>&nbsp;&nbsp;人民币</span>
													</li>
												</ul>
											</div>-->
											<!--<div class="cardRight nm-right info-price collectionInfor">
												<label class="markMsg"><i></i>收款</label>
												<ul class="add-msg">
													<li>
														<label class="nm-left">应收金额</label>
														<div class="amountReceivable">
															<select class="updatePaymentType" disabled>
																<option value="creditcard">Credit Card</option>
																<option value="mco">MCO</option>
																<option value="alipay">Alipay</option>
																<option value="wechat">WeChat</option>
																<option value="cash">Cash</option>
																<option value="check">Check</option>
																<option value="other">Other</option>
																<option value="remit">REMIT</option>
															</select>
															<input type="text" class="updatePrice">
															<select class="price_currency">
																<option value="USD">$ 美元</option>
																<option value="RMB">￥ 人民币</option>
															</select>
														</div>
													</li>
													<li class="list_cost">
														<label class="nm-left">手续费</label>
														<input type="text" class="transaction_fee">
														<a href="javascript:void(0);" class="calculateCharge">以4%计算</a>
													</li>
													<li class="actualAmount list_cost">
														<label class="nm-left">净收款</label>
														<input type="text" class="actual_received">
														<span>(货币同应收金额)</span>
													</li>
													<li class="addCollection">
														<a href="javascript:void(0);">
															添加下一笔收款
														</a>
													</li>
												</ul>
											</div>-->
											<!--<div class="cardRight nm-right info-price costInfo">
												<label class="markMsg"><i></i>花费</label>
												<ul class="add-msg">
													<li class="list_account">
														<label class="nm-left">总报账</label>
														<input type="text" class="bill" id="updateTotalAccount" disabled="disabled">
														<span id="total_write_off_currency"></span>
													</li>
													<li class="list_currency">
														<label class="nm-left">准备金</label>
														<input type="text" id="updateReserve">
														<select id="reserve_currency">
															<option value="USD">$ 美元</option>
															<option value="RMB">￥ 人民币</option>
														</select>
													</li>
													<li class="list_currency">
														<label class="nm-left">总花费</label>
														<input type="text" id="updateTotalCost">
														<select id="total_cost_currency">
															<option value="USD">$ 美元</option>
															<option value="RMB">￥ 人民币</option>
														</select>
													</li>
												</ul>
											</div>-->
											<!--<div class="cardRight nm-right info-price discountInfo">
												<label class="markMsg"><i></i>折扣</label>
												<ul class="add-msg">
													<li class="discountCard">
														<label class="nm-left">折扣</label>
														<dl class="discountOption" id="groupDiscountOption_update">
															<dd class="discount-code">
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
																<input type="text" id="groupDiscountText_update">
																<select id="groupDiscountCurrency_update">
																	<option value="USD">$ 美元</option>
																	<option value="RMB">￥ 人民币</option>
																</select>
															</dd>
															<dd class="discount-apply">
																<a href="javascript:void(0);" class="discountApply" id="groupDiscountApply_update">
																	Apply
																</a>
															</dd>
														</dl>
														<dl class="discountNotice nm-hide" id="groupDiscountNotice_update">
															<dd>
																<span id="groupSubtractNum_update"></span>
															</dd>
														</dl>
													</li>
												</ul>
											</div>-->
											<!--<div class="cardRight nm-right info-price profitInfo">
												<label class="markMsg"><i></i>利润</label>
												<ul class="add-msg">
													<li class="list_account calculateProfit">
														<label class="nm-left">利润</label>
														<input type="text" disabled="disabled" id="total_profit">
														<span id="total_profit_currency"></span>
														<a href="javascript:void(0);" id="update_group_calculateBtn">确认</a>
													</li>
												</ul>
											</div>-->
											</div>
											
											<div class="split split1">
												<hr>
											</div>
											
											<!--导游信息表    s-->
											<div class="addInforTab">
											<div class="guidesInforTab">
												<div class="split">
													<!--<hr>-->
												</div>
												<div class="tabContent">
													<div class="updateInfo">
														<ul class="reportInfo">
															<li class="reportTitle">
																<dl>
																	<dd>导游</dd>
																	<dd>导游电话</dd>
																	<dd>报账</dd>
																</dl>
															</li>
															<div class="guides_info">
																
															</div>
														</ul>
													</div>
												</div>
											</div>
											<!--导游信息表    e-->
											<!--批发商信息表    s-->
											<div class="wholesalerInfoTab">
												<div class="split">
													<!--<hr>-->
												</div>
												<div class="tabContent">
													<div class="updateInfo">
														<ul class="reportInfo">
															<li class="reportTitle">
																<dl>
																	<dd>批发商</dd>
																	<dd>备注</dd>
																	<dd>金额</dd>
																</dl>
															</li>
															<div class="wholesaler_info">
																
															</div>
														</ul>
													</div>
												</div>
											</div>
											<!--批发商信息表    e-->
											<!--收款信息表        s-->
											<div class="collectionInfoTab">
												<div class="split">
													<!--<hr>-->
												</div>
												<div class="tabContent">
													<div class="updateInfo">
														<ul class="reportInfo">
															<li class="reportTitle">
																<dl>
																	<dd>备注</dd>
																	<dd>支付方式</dd>
																	<dd>金额</dd>
																	<dd>手续费</dd>
																	<dd>最终收款</dd>
																</dl>
															</li>
															<div class="collection_info">
																
															</div>
														</ul>
													</div>
												</div>
											</div>
											</div>
											<!--收款信息表        e-->
											
											
											
											
											<!--导游信息        s-->
											<!--<div class="split">
											</div>-->
											<div class="addInforContent">
											<div class="guidesInforContent">
												<label class="markMsg"><i></i>导游</label>
												<ul>
													<div class="newGuide">
														<li>
															<label class="nm-left">导游</label>
															<input id="updateTouristGuide" type="text" placeholder="Search..." class="guideName">
														</li>
														<li>
															<label class="nm-left">导游电话</label>
															<input type="text" id="updateGuideTel"  class="guideTel">
														</li>
														<li>
															<label>人数</label>
															<input type="text"   class="peopleNum"/>
														</li>
														<li>
															<label>起始日期</label>
															<input type="date" class="startDate">
														</li>
														<li>
															<label>结束日期</label>
															<input type="date" class="endDate">
														</li>
														<li>
															<label>天数</label>
															<input type="text" class="dayNum" />
														</li>
														<li class="list-currency">
															<label class="printReserve">打印准备金</label>
															<input type="text"  id="updateReserve" disabled="disabled"/>
			  												<label class="switch">
			  													<input class="btn-switch large" type="checkbox">
			  												</label>
														</li>
														<li class="list-currency">
															<label>报账</label>
															<input type="text" class="accountingInfo"  id="updateGuideWriteOff">
															<select id="guide_write_off_currency">
																<option value="USD">$ 美元</option>
																<option value="RMB">￥ 人民币</option>
															</select>
														</li>
													</div>
													<li class="addNewGuide">
														<a href="javascript:void(0);">
															添加下一位导游
														</a>
													</li>
												</ul>
											</div>
											<!--导游信息        e-->
											<!--批发商        s-->
											<div class="wholesalerInfoContent">
												<label class="markMsg" style="text-align: center;"><i></i>批发商</label>
												<ul>
													<li>
														<label class="nm-left">批发商</label>
														<input type="text" class="wholesaler" id="agent-0" type="text" placeholder="Search...">
														<!--<input type="text" class="other_info"/>-->	
													</li>
													<li>
														<label class="nm-left">INVOICE</label>
														<input type="text" class="wholesalerInvoice" />
													</li>
													<li class="list-currency">
														<label class="nm-left">金额</label>
														<input type="text" class="amountInfo" />
														<select>
															<option value="USD">$ 美元</option>
															<option value="RMB">￥ 人民币</option>
														</select>
													</li>
													<li>
														<label class="nm-left">备注</label>
														<input type="text" class="wholesalerNotes" />
													</li>
													<li class="addNewWholesaler">
														<a href="javascript:void(0);">
															添加下一位批发商
														</a>
													</li>
												</ul>
											</div>
											<!--批发商        e-->
											<!--收款            s-->
											<div class="cardRight info-price collectionInfor collectionContent">
												<label class="markMsg"><i></i>收款</label>
												<ul class="add-msg">
													<li>
														<label class="nm-left">备注</label>
														<input type="text"  class="collectionNotes"/>
													</li>
													<li>
														<label class="nm-left">应收金额</label>
														<div class="amountReceivable">
															<select class="updatePaymentType" disabled>
																<option value="creditcard">Credit Card</option>
																<option value="mco">MCO</option>
																<option value="alipay">Alipay</option>
																<option value="wechat">WeChat</option>
																<option value="cash">Cash</option>
																<option value="check">Check</option>
																<option value="other">Other</option>
																<option value="remit">REMIT</option>
															</select>
															<input type="text" class="updatePrice">
															<select class="price_currency">
																<option value="USD">$ 美元</option>
																<option value="RMB">￥ 人民币</option>
															</select>
														</div>
													</li>
													<li class="list_cost">
														<label class="nm-left">手续费</label>
														<input type="text" class="transaction_fee">
														<a href="javascript:void(0);" class="calculateCharge">以4%计算</a>
													</li>
													<li class="actualAmount list_cost">
														<label class="nm-left">净收款</label>
														<input type="text" class="actual_received">
														<span>(货币同应收金额)</span>
													</li>
													<li class="addCollection">
														<a href="javascript:void(0);">
															添加下一笔收款
														</a>
													</li>
												</ul>
											</div>
										</div>
											<!--收款            e-->
											<div class="split nm-hide">
												<!--<hr>-->
											</div>
											<div class="toPrintPage">
												<label class="markMsg"><i></i>打印页</label>
												<ul class="reserveTab">
													<li class="createPrintPage nm-left"><a href="javascript:void(0);">生成打印页</a></li>
													<li class="close nm-right">
														<a href="javascript:void(0);">
															<img src="../img/close.png">
														</a>
													</li>
												</ul>
												<div class="reserveContent">
													<div class="fundMsg updateFundMsg nm-hide">
														<ul>
															<li>
																<label>午餐</label>
																<input type="text" value="6" id="updateLunch" />
															</li>
															<li>
																<label>晚餐</label>
																<input type="text" value="10" id="updateDinner" />
															</li>
															<li>
																<label>天数</label>
																<input type="text" class="msgDayNum" disabled="disabled" />
															</li>
															<li>
																<label>出发日期</label>
																<input type="text" class="msgStartTime" />
															</li>
															<li>
																<label>总人数</label>
																<input type="text" placeholder="6" id="msgPeopleCount" disabled="disabled" />
															</li>
															<li style="height: 34px;">
																<a class="proTab" id="updateProTab">
																	生成报表
																</a>
															</li>
														</ul>
													</div>
													<!-- 准备金 -->
													<div class="updateUserCard nm-hide userTab">
														<ul class="userTabTitle">
															<li class="date">日期</li>
															<li>人数</li>
															<li>午餐</li>
															<li>晚餐</li>
														</ul>
														<ul class="updateUserTab" id="updateUserTab"></ul>
														<ul class="dtip driverTip">
															<li class="updateDriverTipItem"></li>
														</ul>
													</div>
												</div>
											</div>
										</form>
										<!--确认接收框       s-->
										<div class="confirmRequest">
											<p class="confirmTitle">
												<img src="../img/confirmInfo.png" />
											</p>
											<p class="confirmNotice">指定接收的财务ID</p>
											<p class="notice_content">
												<select>
													<option>收款确认</option>
													<option>退款确认</option>
													<option>其他</option>
												</select>
												<input type="text" id="accounting-received">
											</p>
											<p class="actionBox">
												<button class="actionConfirm">确认</button>
												<button	class="actionCancel">取消</button>
											</p>
										</div>
										<!--确认接收框       e-->
										<div class="button close_button" id="close">
											<a href="#">
												<img src="../img/close.png" />
											</a>
										</div>
									</div>
								</div>
								<!--弹出的表单    e-->
								<?php
									include('../noResultBox.php');
									$confirmBoxClass = 'updateEditConfirmBox';
									$confirmButtonClass = 'updateEditActionConfirm';
									$cancelButtonClass = 'updateEditActionCancel';
									include('../confirmInfo.php');
									$confirmBoxClass = 'updateAndDownloadConfirmBox';
									$confirmButtonClass = 'updateAndDownloadActionConfirm';
									$cancelButtonClass = 'updateAndDownloadActionCancel';
									include('../confirmInfo.php');
									$confirmBoxClass = 'updateDeleteConfirmBox';
									$confirmButtonClass = 'updateDeleteActionConfirm';
									$cancelButtonClass = 'updateDeleteActionCancel';
									include('../confirmInfo.php');
								 ?>
							</div>
							<!--更新      e-->
						</div>
					</div>
				</div>
			</div>
		</div>
		<script type="text/javascript">
			var tourist_guide_name = [];
			var tourist_guide_phone = [];

			var tourist_guide_write_off = [];
			var tourist_guide_write_off_currency = [];

			var group_tour_price = [];
			var group_tour_price_currency = [];
			var group_tour_payment_type = [];
			var group_tour_transaction_fee = [];
			var group_tour_actual_received = [];
			var sum = 0;

			var wholesalerIndex = 0;
			var wholesalerList = [];
		</script>
		<script src="../js/jquery.min.js" type="text/javascript"></script>
		<script src="../js/jquery.pagination.js" type="text/javascript"></script>
		<script src="../js/homePage/public.js" type="text/javascript"></script>
		<script src="../js/Business/GroupTour/groupTourUpdate.js" type="text/javascript"></script>
		<script src="../js/homePage/businessUpdate.js" type="text/javascript"></script>
		<script type="text/javascript">
			dateRange();
			dragForm();
			dateTimeCalculate($("#updateStartTime"),$("#updateEndTime"),$("#updateDayCount"));
			//独立团更新点击准备金生成报表
			updateCashReport($("#updateReserve"),$(".updateLeaderNum"),$(".updateVisitorNum"),$(".updateFundMsg"),$(".msgDayNum"),$(".msgStartTime"),$("#msgPeopleCount"), $("#updateStartTime"),$("#updateEndTime"),$("#updateDayCount"));
			actionForm($(".clearInfo"),$(".deleteOrder"),$(".amendOrder"),$("#dialog"));
			updateGroupTourDiscount($("#groupDiscountText_update"), $("#groupDiscountNotice_update"), $("#groupDiscountApply_update"), $("#groupSubtractNum_update"), $("#groupDiscountOption_update"),$("#groupDiscountCurrency_update"));
		</script>
	</body>
</html>
