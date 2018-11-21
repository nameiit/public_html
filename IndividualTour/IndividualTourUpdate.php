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
		<title>散拼团更新界面</title>
		<link href="../css/bootstrap.min.css" type="text/css" rel="stylesheet" />
		<link href="../css/bootstrap-submenu.min.css" type="text/css" rel="stylesheet" />
		<link href="../css/individualTour.css" type="text/css" rel="stylesheet" />
		<link href="../css/style.css" type="text/css" rel="stylesheet" />
		<link rel="stylesheet" type="text/css" href="../css/pagination.css"/>
		<link rel="stylesheet" type="text/css" href="../css/businessUpdate.css" />
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
			<!--主内容区    s-->
			<div class="msContent">
				<!--左侧导航    s-->
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
									<a href="../GroupTour/GroupTourCreate.php">
										<label></label> 独立团
									</a>
								</dd>
								<dd>
									<a href="javascript:void(0);" class="lab-active">
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
				<!--左侧导航    e-->
				<!--右侧内容    s-->
				<div class="theamInfo nm-right">
					<div class="showMsg yewuMsg">
						<div class="floor">
							<!--右侧导航   s-->
							<div class="navGroup">
								<ul>
									<li class="addItem">
										<a href="IndividualTourCreate.php" class="createOrderButton">
											<img src="../img/c_add.png">
											添<i>隐藏</i>加
										</a>
									</li>
									<li class="updateItem card-active">
										<a href="javascript:void(0);" class="updateOrderButton ms-active">
											<img src="../img/refresh.png">
											更<i>隐藏</i>新
										</a>
									</li>
								</ul>
							</div>
							<!--右侧导航   e-->
							<!--散拼团更新   s-->
							<div class="groupMsg updateInfo indiv_updateInfo">
								<label class="theamTitle">
									<i></i>
									筛选条件
								</label>
								<form>
									<div class="filterBox systematicSearch">
										<label class="markMsg"><i></i>系统搜索</label>
										<ul class="searchFloor">
											<li>
												<div class="leftFloor">
													<label>系统编号</label>
													<input type="text" id="transaction-id">
												</div>
												<div class="rightFloor">
													<div class="rightContent">
														<label>产品编号</label>
														<input type="text" id="product-code">
													</div>
													<!--成交时间   s-->
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
														<span>~</span>
														<input type="date" id="to-date">
													</div>
													<!--成交时间   e-->
												</div>
											</li>
											<li>
												<div class="leftFloor customerName">
													<label>顾客姓名</label>
													<input type="text" placeholder="Last Name" class="name" id="lname">
													<input type="text" placeholder="First Name" class="name" id="fname">
												</div>
												<div class="rightFloor invoiceInfo">
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
											</li>
											<li>
												<div class="leftFloor wholesalerInfo">
													<label>地接商</label>
													<input type="text" id="wholesaler" placeholder="Search...">
												</div>
												<div class="rightFloor">
													<div class="rightContent">
														<label>支付方式</label>
														<select class="payment" id="payment-type">
															<option value="all">全部</option>
															<option value="cc">CC</option>
															<option value="non-cc">NON-CC</option>
															<option value="mco">MCO</option>
														</select>
													</div>
													<!--成交地点   s-->
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
																<label for="cash">
																	<i>现金</i>
																</label>
															</div>
															<div class="checkbox checkbox-success">
																<input id="check" class="styled" type="checkbox">
																<label for="check">
																	<i>支票</i>
																</label>
															</div>
															<div class="checkbox checkbox-success">
																<input id="alipay" class="styled" type="checkbox">
																<label for="alipay">
																	<i>支付宝</i>
																</label>
															</div>
															<div class="checkbox checkbox-success">
																<input id="wechat" class="styled" type="checkbox">
																<label for="wechat">
																	<i>微信支付</i>
																</label>
															</div>
															<div class="checkbox checkbox-success">
																<input id="remit" class="styled" type="checkbox">
																<label for="remit">
																	<i>汇款</i>
																</label>
															</div>
														</div>
													</div>
													<!--成交地点   e-->
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
													<a href="javascript:void(0);" id="filter-confirm">查找</a>
													<a href="javascript:void(0);" class="resetBtn" id="filter-reset">重置</a>
												</div>
											</li>
										</ul>
									</div>
									<!--tab  s-->
									<div class="updateTab individualUpdateTab indivUpdateTab">
										<ul class="tabList tabListTitle">
											<li class="systemNum">
												<a href="javascript:void(0);">系统编号</a>
											</li>
											<li class="invoice">
												<a href="javascript:void(0);">INVOICE</a>
											</li>
											<li class="profit">
												<a href="javascript:void(0);">利润</a>
											</li>
											<li class="debt">
												<a href="javascript:void(0);">
													<label>
														Debt(<span>123456.78</span>)
													</label>
												</a>
											</li>
											<li class="receivable">
												<a href="javascript:void(0);">
													<label>
														应收款(<span>123456.78</span>)
													</label>
												</a>
											</li>
											<li class="mco">
												<a href="javascript:void(0);">
													MCO
												</a>
											</li>
											<li class="salePrice">
												<a href="javascript:void(0);">
													<label>
														卖价(<span>123456.78</span>)
													</label>
												</a>
											</li>
											<li class="createDate">
												<a href="javascript:void(0);">
													创建时间
													<img src="../img/arrowUp0_icon.png" class="arrow_up">
													<img src="../img/arrowDown0_icon.png" class="arrow_down">
												</a>
											</li>
											<li class="customerName">
												<a href="javascript:void(0);">顾客</a>
											</li>
											<li class="startTime">
												<a href="javascript:void(0);">
													出团日期
													<img src="../img/arrowUp0_icon.png" class="arrow_up">
													<img src="../img/arrowDown0_icon.png" class="arrow_down">
												</a>
											</li>
											<li class="returnTime">
												<a href="javascript:void(0);">
													回团日期
													<img src="../img/arrowUp0_icon.png" class="arrow_up">
													<img src="../img/arrowDown0_icon.png" class="arrow_down">
												</a>
											</li>
											<li class="lockStatus">
												<a href="javascript:void(0);">
													LOCK
												</a>
											</li>
											<li class="finishStatus">
												<a href="javascript:void(0);">
													FINISH
												</a>
											</li>
											<li class="number">
												<a href="javascript:void(0);">
													关联
												</a>
											</li>

										</ul>
										<ul class="tabList tabListDetail">
											<li>
												<dl class="callout_button">
													<label class="confirmedStatus"></label>
													<dd class="systemNum">
														<a href="javascript:void(0);">12345</a>
													</dd>
													<dd class="invoice">
														<a href="javascript:void(0);">12345678</a>
													</dd>
													<dd class="profit">
														<a href="javascript:void(0);">12345.99</a>
													</dd>
													<dd class="debt">
														<a href="javascript:void(0);">
															Y&nbsp;|&nbsp;12345.99
														</a>
													</dd>
													<dd class="receivable">
														<a href="javascript:void(0);">
															Y&nbsp;|&nbsp;12345.99
														</a>
													</dd>
													<dd class="mco">
														<a href="javascript:void(0);">
															mco
														</a>
													</dd>
													<dd class="salePrice">
														<a href="javascript:void(0);">
															12345.99
														</a>
													</dd>
													<dd class="createDate">
														<a href="javascript:void(0);">
															2018-01-01
														</a>
													</dd>
													<dd class="customerName">
														<a href="javascript:void(0);">张三</a>
													</dd>
													<dd class="startTime">
														<a href="javascript:void(0);">
															2018-01-01
														</a>
													</dd>
													<dd class="returnTime">
														<a href="javascript:void(0);">
															2018-01-01
														</a>
													</dd>
													<dd class="lockStatus yesStatus">
													</dd>
													<dd class="finishStatus yesStatus">
													</dd>
													<dd class="number">
														<a href="javascript:void(0);">
														</a>
													</dd>
												</dl>
											</li>
											<li>
												<dl class="callout_button">
													<label class="otherStatus"></label>
													<dd class="systemNum">
														<a href="javascript:void(0);">12346</a>
													</dd>
													<dd class="invoice">
														<a href="javascript:void(0);">12345678</a>
													</dd>
													<dd class="profit">
														<a href="javascript:void(0);">12345.99</a>
													</dd>
													<dd class="debt">
														<a href="javascript:void(0);">
															Y&nbsp;|&nbsp;12345.99
														</a>
													</dd>
													<dd class="receivable">
														<a href="javascript:void(0);">
															Y&nbsp;|&nbsp;12345.99
														</a>
													</dd>
													<dd class="mco">
														<a href="javascript:void(0);">
															mco
														</a>
													</dd>
													<dd class="salePrice">
														<a href="javascript:void(0);">
															12345.99
														</a>
													</dd>
													<dd class="createDate">
														<a href="javascript:void(0);">
															2018-01-01
														</a>
													</dd>
													<dd class="customerName">
														<a href="javascript:void(0);">张三</a>
													</dd>
													<dd class="startTime">
														<a href="javascript:void(0);">
															2018-01-01
														</a>
													</dd>
													<dd class="returnTime">
														<a href="javascript:void(0);">
															2018-01-01
														</a>
													</dd>
													<dd class="lockStatus yesStatus">
													</dd>
													<dd class="finishStatus yesStatus">
													</dd>
													<dd class="number">
														<a href="javascript:void(0);">
														</a>
													</dd>
												</dl>
											</li>
										</ul>
									</div>
									<!--tab  e-->
									<div class="nav-box eg">
										<ul class="pagination m-style" id="p4"></ul>
									</div>
								</form>
								<!--弹出的表单    s-->
								<div class="dialog_content">
									<div class="groupMsg addInfo updateDialog dialog move_part" id="dialog2">
										<ul class="formAction">
											<li class="amendOrder amend-tabInfo">
												<a href="javascript:void(0);" id="updateConfirm">
													确认修改
												</a>
											</li>
											<li class="deleteOrder delete-tabInfo">
												<a href="javascript:void(0);" id="deleteConfirm">
													删除订单
												</a>
											</li>
											<!--<li class="nm-right requestReceive">
												<a href="javascript:void(0);">
													<img src="../img/request_icon.png"/>
													<span>销售已收款，请求财务确认接收</span>
												</a>
											</li>-->
										</ul>
										<form class="addlist updateForm" id="updateForm">
											<div class="cardLeft indivLeftInfo">
												<div class="cardLeft nm-left">
													<label class="markMsg"><i></i>基本信息</label>
													<ul class="add-msg">
														<li>
															<label class="nm-left">产品编号</label>
															<input type="text">
														</li>
														<li class="requiredItem">
															<label class="nm-left">销售人员</label>
															<input id="update-salesperson" type="text" placeholder="Search...">
														</li>
														<li>
															<label class="nm-left">地接商团名</label>
															<input type="text" id="update-tour-name">
														</li>
														<li class="requiredItem">
															<label class="nm-left">地接商</label>
															<input id="update-wholesaler" type="text" placeholder="Search...">
														</li>
														<li>
															<label class="nm-left">INVOICE</label>
															<input type="text" id="update-tour-invoice">
														</li>
														<li>
															<label class="nm-left">顾客来源</label>
															<input id="update-source" type="text" placeholder="Search...">
														</li>
														<li>
															<label class="nm-left">备注</label>
															<!--<textarea rows="5" id="update-note"></textarea>-->
															<div class="notesInfor" contenteditable="true" id="update-note"></div>
														</li>
													</ul>
												</div>
												<!--订单关联    s-->
												<div class="cardLeft ordersAssociated nm-left">
													<label class="markMsg"><i></i>收款关联</label>
														<ul class="add-msg">
															<li class="list_currency systemNum">
																<label class="nm-left">系统编号</label>
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
																		<dd class="number">
																			关联编号
																		</dd>
																	</dl>
																</li>
															</div>
														</ul>
												</div>
												<!--订单关联    e-->
											</div>
											<div class="cardRight indivRightInfo">
												<!--行程安排   s-->
												<div class="cardRight nm-left info-date">
													<label class="markMsg"><i></i>行程安排</label>
													<ul class="add-msg">
														<li class="requiredItem">
															<label class="nm-left">出发日期</label>
															<input type="date" id="update-start-date">
														</li>
														<li class="requiredItem">
															<label class="nm-left">结束日期</label>
															<input type="date" id="update-end-date">
														</li>
														<li class="requiredItem">
															<label class="nm-left">天数</label>
															<input type="text" id="update-day-count">
														</li>
													</ul>
												</div>
												<!--行程安排   e-->
												<div class="cardRight nm-left info-price info-price-individual payService">
													<label class="markMsg"><i></i>支付信息</label>
													<ul class="add-msg">
														<li class="exchangeRate">
															<label class="nm-left">成交汇率</label>
															<span>1&nbsp;&nbsp;美元&nbsp;&nbsp;=&nbsp;&nbsp; <input type="text" id="update-exchange-rate" disabled value="6.6">&nbsp;&nbsp;人民币</span>
														</li>
														<!--支付地点 -->
														<li class="requiredItem payment-type areaInfo">
															<label class="nm-left">支付地点</label>
															<div class="payment">
																<div class="dropdown area areaFloor">
																	<button class="btn btn-default" type="button" data-toggle="dropdown">
																		<span id="payment-area" class="txt">请选择</span>
																		<span class="caret"></span>
																	</button>
																	<ul class="dropdown-menu" role="menu">
																		<li>
																			<a tabindex="0">
																				中国
																			</a>
																		</li>
																		<li>
																			<a tabindex="0">
																				美国
																			</a>
																		</li>
																	</ul>
																</div>
															</div>
														</li>
														<!--卖价-->
														<li class="requiredItem list_currency">
															<label class="nm-left">卖价</label>
															<input type="text"  id="update_sale_price" class="numFormat indiv_sellPrice"/>
															<div class="payment currency_type">
																<div class="dropdown currency">
																	<button class="btn btn-default" type="button" data-toggle="dropdown">
																		<span id="sell-price-currency" class="txt currency_txt salePrice_currency">货币</span>
																		<span class="caret"></span>
																	</button>
																	<ul class="dropdown-menu currency_box salePrice_currencyBox" role="menu">
																		<li>
																			<a tabindex="0">
																				美元
																			</a>
																		</li>
																		<li>
																			<a tabindex="0">
																				人民币
																			</a>
																		</li>
																	</ul>
																</div>
															</div>
														</li>
														<!--底价-->
														<li class="requiredItem list_currency">
															<label class="nm-left">底价</label>
															<input type="text" id="update_base_price"  class="numFormat"/>
															<div class="payment currency_type">
																<div class="dropdown currency">
																	<button class="btn btn-default" type="button" data-toggle="dropdown">
																		<span id="base-price-currency" class="txt currency_txt basePrice_currency">货币</span>
																		<span class="caret"></span>
																	</button>
																	<ul class="dropdown-menu currency_box basePrice_currencyBox" role="menu">
																		<li>
																			<a tabindex="0">
																				美元
																			</a>
																		</li>
																		<li>
																			<a tabindex="0">
																				人民币
																			</a>
																		</li>
																	</ul>
																</div>
															</div>
														</li>
														<!--支付方式  s-->
														<li class="requiredItem payment-type paymentMethodInfo">
															<label class="nm-left">支付方式</label>
															<div class="payment">
																<div class="dropdown paymentMethod">
																	<button class="btn btn-default" type="button" data-toggle="dropdown">
																		<span id="indiv-tour-payment-type" class="txt">支付方式</span>
																		<span class="caret"></span>
																	</button>
																	<ul class="dropdown-menu methodList" role="menu">
																		<li class="dropdown-submenu">
																			<a tabindex="0" data-toggle="dropdown">
																				刷卡支付
																			</a>
																			<ul class="dropdown-menu creditCardPayment">
																				<li>
																					<a tabindex="0">
																						供应商全额刷卡
																					</a>
																				</li>
																				<li class="dropdown-submenu">
																					<a tabindex="0">
																						供应商部分刷卡+非刷卡支付
																					</a>
																					<ul class="dropdown-menu drop3Menu">
																						<li>
																							<a tabindex="0">
																								支票
																							</a>
																							<a tabindex="0">
																								现金
																							</a>
																							<a tabindex="0">
																								支付宝
																							</a>
																							<a tabindex="0">
																								微信支付
																							</a>
																							<a tabindex="0">
																								REMIT
																							</a>
																						</li>
																					</ul>
																				</li>
																				<li>
																					<a tabindex="0">
																						供应商部分刷卡+额外MCO
																					</a>
																				</li>
																				<li>
																					<a tabindex="0">
																						全额MCO
																					</a>
																				</li>
																			</ul>
																		</li>
																		<li class="dropdown-submenu">
																			<a tabindex="0">
																				非刷卡支付
																			</a>
																			<ul class="dropdown-menu no-creditCardPayment" data-toggle="dropdown">
																				<li>
																					<a tabindex="0">
																						支票
																					</a>
																				</li>
																				<li>
																					<a tabindex="0">
																						现金
																					</a>
																				</li>
																				<li>
																					<a tabindex="0">
																						支付宝
																					</a>
																				</li>
																				<li>
																					<a tabindex="0">
																						微信支付
																					</a>
																				</li>
																				<li>
																					<a tabindex="0">
																						REMIT
																					</a>
																				</li>
																			</ul>
																		</li>
																	</ul>
																</div>
															</div>
														</li>
														<!--mcoList  s-->
														<div class="mcoList">
															<li class="requiredItem payment-type companyInfor">
																<label class="nm-left">刷卡公司</label>
																<div class="payment">
																	<div class="dropdown creditCardCompanies">
																		<button class="btn btn-default" type="button" data-toggle="dropdown">
																			<span id="mco-party" class="txt">NAMEI</span>
																			<span class="caret"></span>
																		</button>
																		<ul class="dropdown-menu companyMenu" role="menu">
																			<li>
																				<a tabindex="0">
																					NAMEI
																				</a>
																			</li>
																			<li>
																				<a tabindex="0">
																					GTT
																				</a>
																			</li>
																		</ul>
																	</div>
																</div>
															</li>
															<li class="requiredItem list_currency">
																<label class="nm-left">票面</label>
																<input type="text" id="face-value" class="numFormat indiv_faceValue notRequired"/>
																<div class="payment currency_type">
																	<div class="dropdown currency">
																		<button class="btn btn-default" type="button" data-toggle="dropdown">
																			<span id="face-currency" class="txt currency_txt faceValue_currency">货币</span>
																			<span class="caret"></span>
																		</button>
																		<ul class="dropdown-menu currency_box faceValue_currencyBox" role="menu">
																			<li>
																				<a tabindex="0">
																					美元
																				</a>
																			</li>
																			<li>
																				<a tabindex="0">
																					人民币
																				</a>
																			</li>
																		</ul>
																	</div>
																</div>
															</li>
															<li class="requiredItem list_currency">
																<label class="nm-left">MCO&nbsp;金额</label>
																<input type="text" id="mco-value" class="numFormat indiv_mcoAmount notRequired"/>
																<div class="payment currency_type">
																	<div class="dropdown currency">
																		<button class="btn btn-default" type="button" data-toggle="dropdown">
																			<span id="mco-currency" class="txt currency_txt mcoAmount_currency">货币</span>
																			<span class="caret"></span>
																		</button>
																		<ul class="dropdown-menu currency_box mcoAmount_currencyBox" role="menu">
																			<li>
																				<a tabindex="0">
																					美元
																				</a>
																			</li>
																			<li>
																				<a tabindex="0">
																					人民币
																				</a>
																			</li>
																		</ul>
																	</div>
																</div>
															</li>
															<li class="requiredItem list_currency">
																<label class="nm-left">MCO&nbsp;Credit</label>
																<input type="text" id="mco-credit" class="numFormat mcoCreditInfo notRequired"/>
																<div class="payment currency_type">
																	<div class="dropdown currency">
																		<button class="btn btn-default" type="button" data-toggle="dropdown">
																			<span id="mco-credit-currency" class="txt currency_txt mcoCredit_currency">货币</span>
																			<span class="caret"></span>
																		</button>
																		<ul class="dropdown-menu currency_box mcoCredit_currencyBox" role="menu">
																			<li>
																				<a tabindex="0">
																					美元
																				</a>
																			</li>
																			<li>
																				<a tabindex="0">
																					人民币
																				</a>
																			</li>
																		</ul>
																	</div>
																</div>
															</li>
															<li class="rate">
																<label class="nm-left">费率</label>
																<input type="text" class="rateInfo" id="fee-ratio">
															</li>

														</div>
														<!--mcoList  e-->
														<!--支付方式  e-->
														<li class="list_account calculateProfit profitInfor">
															<label class="nm-left">利润</label>
															<input type="text" id="indiv-profit" disabled>
															<span>美元</span>
														</li>
													</ul>
												</div>
											</div>

											<!--更新界面的客户信息    s-->
											<div class="split" id="customerInfoAreaDivider">
												<hr />
											</div>
											<div class="addClients customerInfo">
												<ul class="clients-title">
													<li><a>基本信息</a></li>
													<li><a>客户信息</a></li>
													<!--<li><a>旅游信息</a></li>-->
												</ul>
												<ul class="clients-info indiviClientInfo">
													<li>
														<dl>
															<!--<dd class="pname">
																<label>姓</label>
																<input type="text" id="add-customer-lname">
															</dd>
															<dd class="pname">
																<label>名</label>
																<input type="text" id="add-customer-fname">
															</dd>-->
															<dd class="requiredItem list_infor">
																<label>姓名</label>
																<input type="text" placeholder="姓 Last Name" id="indivLastName">
																<input type="text" placeholder="名 First Name" id="indivFirstName">
															</dd>
															<dd>
																<label>联系方式</label>
																<input type="text" id="add-customer-phone">
															</dd>
															<dd>
																<label>其他联系方式</label>
																<select id="add-customer-other-contact">
																	<option value="WeChat">WeChat</option>
																	<option value="QQ">QQ</option>
																	<option value="Facebook">Facebook</option>
																</select>
															</dd>
															<dd>
																<label id="add-customer-other-contact-label">WeChat账号</label>
																<input type="text" id="add-customer-other-contact-number">
															</dd>
														</dl>
													</li>
													<li class="last-info">
														<dl>
															<dd class="birthday">
																<label>生日</label>
																<input type="date" id="add-customer-birthday">
															</dd>
															<dd class="gender">
																<label>性别</label>
																<select id="add-customer-gender">
																	<option value="UNKNOWN">Unknown</option>
																	<option value="M">男</option>
																	<option value="F">女</option>
																</select>
															</dd>
															<dd>
																<label>邮箱</label>
																<input type="text" id="add-customer-email">
															</dd>
															<dd class="zipCode">
																<label>邮政编码</label>
																<input type="text" id="add-customer-zipcode">
															</dd>
														</dl>
													</li>
													<!--<li class="last-info">
														<dl>
															<dd class="joinDate">
																<label>参团日期</label>
																<input type="date" id="add-customer-join-date">
															</dd>
															<dd class="joinLocation">
																<label>参团地点</label>
																<input type="text" id="add-customer-join-location">
															</dd>
															<dd class="leaveDate">
																<label>离团日期</label>
																<input type="date" id="add-customer-leave-date">
															</dd>
															<dd class="leaveLocation">
																<label>离团地点</label>
																<input type="text" id="add-customer-leave-location">
															</dd>
														</dl>
													</li>-->
												</ul>
											</div>
											<!--更新界面的客户信息   e-->
										</form>
								<!--确认框       s-->
								<!--<div class="confirmRequest">
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
								</div>-->
								<!--确认框       e-->
										<div class="button close_button close_button2" id="close">
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

									$confirmBoxClass = 'updateDeleteConfirmBox';
									$confirmButtonClass = 'updateDeleteActionConfirm';
									$cancelButtonClass = 'updateDeleteActionCancel';
									include('../confirmInfo.php');
								 	?>
							</div>
							<!--散拼团更新   e-->
						</div>
					</div>
				</div>
				<!--右侧内容    e-->
			</div>
			<!--主内容区    e-->
		</div>
		<script src="../js/jquery-1.11.0.min.js" type="text/javascript"></script>
		<script src="../js/bootstrap.min.js" type="text/javascript"></script>
		<script src="../js/bootstrap-submenu.min.js" type="text/javascript"></script>
		<script src="../js/homePage/public.js" type="text/javascript"></script>
		<script src="../js/Business/IndividualTour/individualTourUpdate.js" type="text/javascript"></script>
		<script src="../js/jquery.pagination.js" type="text/javascript"></script>
	</body>
</html>
