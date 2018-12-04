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
							<a href="IndividualTourCreate.php" class="bm-title ">
								<img src="../img/c_yewu.png">
								业务
							</a>
							<dl class="detailMsg">
								<!--<dd>
									<a href="../GroupTour/GroupTourCreate.php">
										<label></label> 独立团
									</a>
								</dd>-->
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
																<input id="cash" class="styled" type="checkbox" checked="checked">
																<label for="cash">
																	<i>现金</i>
																</label>
															</div>
															<div class="checkbox checkbox-success">
																<input id="check" class="styled" type="checkbox" checked="checked">
																<label for="check">
																	<i>支票</i>
																</label>
															</div>
															<div class="checkbox checkbox-success">
																<input id="alipay" class="styled" type="checkbox" checked="checked">
																<label for="alipay">
																	<i>支付宝</i>
																</label>
															</div>
															<div class="checkbox checkbox-success">
																<input id="wechat" class="styled" type="checkbox" checked="checked">
																<label for="wechat">
																	<i>微信支付</i>
																</label>
															</div>
															<div class="checkbox checkbox-success">
																<input id="remit" class="styled" type="checkbox" checked="checked">
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
												<a href="javascript:void(0);">
													<label>
														利润(<span id="sum_profit"></span>)
													</label>
												</a>
											</li>
											<li class="debt">
												<a href="javascript:void(0);">
													<label>
														Debt(<span id="sum_debt"></span>)
													</label>
												</a>
											</li>
											<li class="receivable">
												<a href="javascript:void(0);">
													<label>
														应收款(<span id="sum_received"></span>)
													</label>
												</a>
											</li>
											<!--<li class="mco">
												<a href="javascript:void(0);">
													MCO
												</a>
											</li>-->
											<li class="salePrice">
												<a href="javascript:void(0);">
													<label>
														卖价(<span id="sum_selling_price"></span>)
													</label>
												</a>
											</li>
											<li class="createDate">
												<a href="javascript:void(0);" id="create-time-sort">
													创建时间
													<img src="../img/arrowUp0_icon.png" class="arrow_up">
													<img src="../img/arrowDown0_icon.png" class="arrow_down">
												</a>
											</li>
											<li class="customerName">
												<a href="javascript:void(0);">顾客</a>
											</li>
											<li class="startTime">
												<a href="javascript:void(0);" id="leave-time-sort">
													出团日期
													<img src="../img/arrowUp0_icon.png" class="arrow_up">
													<img src="../img/arrowDown0_icon.png" class="arrow_down">
												</a>
											</li>
											<li class="returnTime">
												<a href="javascript:void(0);" id="return-time-sort">
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
													<!--<dd class="mco">
														<a href="javascript:void(0);">
															mco
														</a>
													</dd>-->
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
													<!--<dd class="mco">
														<a href="javascript:void(0);">
															mco
														</a>
													</dd>-->
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
											<div class="cardLeft indivLeftInfo indivUpdateLeftInfo">
												<div class="cardLeft nm-left">
													<label class="markMsg"><i></i>基本信息</label>
													<ul class="add-msg">
														<li>
															<label class="nm-left">产品编号</label>
															<input type="text" id="indiv_tour_id">
														</li>
														<li class="requiredItem salesperson">
															<label class="nm-left">销售人员</label>
															<input id="indiv_salesperson" type="text" placeholder="Search...">
														</li>
														<li>
															<label class="nm-left">地接商团名</label>
															<input type="text" id="indiv_tour_name">
														</li>
														<li class="requiredItem indivWholesaler">
															<label class="nm-left">地接商</label>
															<input id="indiv_wholesaler" type="text" placeholder="Search...">
														</li>
														<li>
															<label class="nm-left">INVOICE</label>
															<input type="text" id="invoice">
														</li>
														<li class="indivSource">
															<label class="nm-left">顾客来源</label>
															<input id="indiv_source" type="text" placeholder="Search...">
														</li>
														<li>
															<label class="nm-left">备注</label>
															<textarea rows="5" id="indiv_note"></textarea>
															<!-- <div class="notesInfor" contenteditable="true" id="indiv_note"></div> -->
														</li>
													</ul>
												</div>
												<!--订单关联    s-->
												<div class="cardLeft ordersAssociated nm-left">
													<label class="markMsg"><i></i>收款关联</label>
														<ul class="add-msg">
															<li class="list_currency systemNum">
																<label class="nm-left">系统编号</label>
																<input type="text" >
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
																		<!-- <dd class="salesInfo">
																			销售人员
																		</dd> -->
																		<dd class="number">
																			关联编号
																		</dd>
																	</dl>
																</li>
															</div>
														</ul>
												</div>
												<!--订单关联    e-->
												<!--信用卡信息  s-->
												<div class="creditCardInfo cardLeft nm-left">
													<label class="markMsg"><i></i>信用卡信息</label>
													<ul class="add-msg">
														<li class="creditCardItem">
															<div class="checkbox checkbox-success">
																<input id="creditCard" class="styled" type="checkbox">
																<label for="creditCard">添加以下信用卡</label>
															</div>
														</li>
														<li>
															<label class="nm-left">卡号</label>
															<input type="text" id="card-number" class="notRequired">
														</li>
														<li class="expDate">
															<label class="nm-left">过期日</label>
															<div class="expireDate">
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
															</div>
															<div class="cardholder">
																<label class="nm-left">持卡人</label>
																<input type="text" id="card-holder" class="notRequired">
															</div>
														</li>
														<li class="mcoReceiver">
															<label class="nm-left">MCO负责人</label>
															<input type="text" placeholder="Search..."  id="mco-receiver" class="mco_input"/>
														</li>
													</ul>
												</div>
												<!--信用卡信息  e-->
											</div>
											<div class="cardRight indivRightInfo indivUpdateRightInfo">
												<!--行程安排   s-->
												<div class="cardRight nm-left info-date">
													<label class="markMsg"><i></i>行程安排</label>
													<ul class="add-msg">
														<!--目的地    s-->
														<li class="destination">
															<label class="nm-left">目的地</label>
															<div>
																<select class="selectItem usItem" id="us-class">
																	<option value="">US分类</option>
																	<option value="organized-tour">跟团游</option>
																	<option value="self-guided-tour">自助游</option>
																</select>
																<select class="selectItem firstItem" id="first-class">
																	<option value="" class="firstOption">一级分类</option>
																	<option value="international-tour">出境游</option>
																	<option value="domestic-tour">国内游</option>
																</select>
																<select id="second-class" class="secondItem">
																	<option value="" class="firstOption">二级分类</option>
																	<option class="outboundTravel">马代</option>
																	<option value="southeast-asia" class="outboundTravel">东南亚</option>
																	<option value="europe" class="outboundTravel">欧洲</option>
																	<option value="japan-and-korea" class="outboundTravel">日韩</option>
																	<option value="america" class="outboundTravel">美洲</option>
																	<option value="australia" class="outboundTravel">澳洲</option>
																	<option value="mid-east-africa" class="outboundTravel">中东非</option>
																	<option value="sea-island" class="outboundTravel">海岛</option>
																	<option value="cruises" class="outboundTravel">游轮</option>
																	<option value="hk-macao-tw" class="domesticTourism">港澳台</option>
																	<option value="short-distance" class="domesticTourism">周边</option>
																	<option value="long-distance" class="domesticTourism">国内长线</option>
																</select>
																<select class="thirdItem" id="third-class">
																	<option value="" class="firstOption">三级分类</option>
																	<option value="maldives" class="maldives">马代</option>
																	<option value="philippines" class="southeastAsia">菲律宾</option>
																	<option value="boracay" class="southeastAsia">长滩岛</option>
																	<option value="thailand" class="southeastAsia">泰国</option>
																	<option value="phuket" class="southeastAsia">普吉岛</option>
																	<option value="singapore" class="southeastAsia">新加坡</option>
																	<option value="vietnam" class="southeastAsia">越南</option>
																	<option value="malaysia" class="southeastAsia">马来西亚</option>
																	<option value="indonesia" class="southeastAsia">印尼</option>
																	<option value="shabab-brunei" class="southeastAsia">沙巴文莱</option>
																	<option value="cambodia" class="southeastAsia">柬埔寨</option>
																	<option value="singapore-malaysia-thailand" class="southeastAsia">新马泰</option>
																	<option value="vietnam-cambodia" class="southeastAsia">越柬</option>
																	<option value="northern-europe" class="europe">北欧</option>
																	<option value="eastern-europe" class="europe">东欧</option>
																	<option value="southern-europe" class="europe">南欧</option>
																	<option value="western-europe" class="europe">西欧</option>
																	<option value="russia" class="europe">俄罗斯</option>
																	<option value="uk-ireland" class="europe">英爱</option>
																	<option value="germany-france-switzerland-italy" class="europe">德法瑞意</option>
																	<option value="turkey" class="europe">土耳其</option>
																	<option value="japan" class="japan_korea">日本</option>
																	<option value="korea" class="japan_korea">韩国</option>
																	<option value="japan-korea" class="japan_korea">日韩连线</option>
																	<option value="canada" class="america">加拿大</option>
																	<option value="us" class="america">美国</option>
																	<option value="south-america" class="america">南美</option>
																	<option value="austrilia" class="australia">澳大利亚</option>
																	<option value="new-zealand" class="australia">新西兰</option>
																	<option value="egypt" class="middleEastAfrica">埃及</option>
																	<option value="egypt-dubai" class="middleEastAfrica">埃及迪拜</option>
																	<option value="kenya" class="middleEastAfrica">肯尼亚</option>
																	<option value="morocco" class="middleEastAfrica">摩洛哥</option>
																	<option value="south-africa" class="middleEastAfrica">南非</option>
																	<option value="iran" class="middleEastAfrica">伊朗</option>
																	<option value="israel" class="middleEastAfrica">以色列</option>
																	<option value="bali" class="island">巴厘岛</option>
																	<option value="fiji" class="island">斐济</option>
																	<option value="krabi" class="island">甲米</option>
																	<option value="mauritius" class="island">毛里求斯</option>
																	<option value="saipan" class="island">塞班</option>
																	<option value="seychelles" class="island">塞舌尔</option>
																	<option value="sumy" class="island">苏梅</option>
																	<option value="palau" class="island">帕劳</option>
																	<option value="japan-korea-cruise" class="tanker">日韩邮轮</option>
																	<option value="europe-cruise" class="tanker">欧洲邮轮</option>
																	<option value="southeast-asia-cruise" class="tanker">东南亚邮轮</option>
																	<option value="america-cruise" class="tanker">美洲邮轮</option>
																	<option value="austrilia-new-zealand-cruise" class="tanker">澳新邮轮</option>
																	<option value="polar-region-cruise" class="tanker">极地邮轮</option>
																	<option value="hong-kong" class="hongKongMacaoTaiwan">香港</option>
																	<option value="macao" class="hongKongMacaoTaiwan">澳门</option>
																	<option value="taiwan" class="hongKongMacaoTaiwan">台湾</option>
																	<option value="hk-macao" class="hongKongMacaoTaiwan">港澳连线</option>
																	<option value="northeast-china-around" class="periphery">东北周边</option>
																	<option value="fujian-around" class="periphery">福建周边</option>
																	<option value="yunnan-guizhou-sichuan-around" class="periphery">云贵川周边</option>
																	<option value="hainan-around" class="periphery">海南周边</option>
																	<option value="north-china-around" class="periphery">华北周边</option>
																	<option value="east-china-around" class="periphery">华东周边</option>
																	<option value="south-china-around" class="periphery">华南周边</option>
																	<option value="central-china-around" class="periphery">华中周边</option>
																	<option value="northwest-china-around" class="periphery">西北周边</option>
																	<option value="northeast-china" class="domesticLongLine">东北</option>
																	<option value="fujian" class="domesticLongLine">福建</option>
																	<option value="yunnan-guizhou-sichuan" class="domesticLongLine">云贵川</option>
																	<option value="hainan" class="domesticLongLine">海南</option>
																	<option value="north-china" class="domesticLongLine">华北</option>
																	<option value="east-china" class="domesticLongLine">华东</option>
																	<option value="south-china" class="domesticLongLine">华南</option>
																	<option value="central-china" class="domesticLongLine">华中</option>
																	<option value="northwest-china" class="domesticLongLine">西北</option>
																	<option value="other" class="southeastAsia europe japan_korea america australia middleEastAfrica island tanker hongKongMacaoTaiwan
																		periphery domesticLongLine">
																		其他
																	</option>
																</select>
															</div>
														</li>
														<!--目的地    e-->
														<li class="requiredItem">
															<label class="nm-left">出发日期</label>
															<input type="date" id="indiv_startTime">
														</li>
														<li class="requiredItem">
															<label class="nm-left">结束日期</label>
															<input type="date" id="indiv_endTime">
														</li>
														<li class="requiredItem">
															<label class="nm-left">天数</label>
															<input type="text" id="indiv_num_days">
														</li>
													</ul>
												</div>
												<!--行程安排   e-->
												<div class="cardRight nm-left info-price info-price-individual payService">
													<label class="markMsg"><i></i>支付信息</label>
													<ul class="add-msg">
														<li class="exchangeRate">
															<label class="nm-left">成交汇率</label>
															<span>1&nbsp;&nbsp;美元&nbsp;&nbsp;=&nbsp;&nbsp; <input type="text" id="indiv_exchange_rate" disabled>&nbsp;&nbsp;人民币</span>
														</li>
														<li>
															<label class="nm-left">确认收入时间</label>
															<input type="date"  disabled="disabled" id="confirm_payment_time">
														</li>
														<!--支付地点 -->
														<li class="requiredItem payment-type areaInfo">
															<label class="nm-left">收款账号国家</label>
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
														<!--底价-->
														<li class="requiredItem list_currency">
															<label class="nm-left">底价</label>
															<input type="text" id="indiv_base_price"  class="numFormat"/>
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
														<!--卖价-->
														<li class="requiredItem list_currency">
															<label class="nm-left">卖价</label>
															<input type="text"  id="indiv_sale_price" class="numFormat indiv_sellPrice"/>
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
																					<a tabindex="0" id="wholesalermco">
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
														<div class="partCreditCard">
															<!--<li class="list_currency">
																<label class="nm-left">供应商刷卡金额</label>
																<input type="text" class="creditCardAmount"  id="wholesaler-charge-amount"/>
																<span class="currency">美元</span>
															</li>
															<li class="list_currency">
																<label class="nm-left">非刷卡金额</label>
																<input type="text"  class="non-creditCardAmount" id="mco-charge-amount"/>
																<span class="currency">美元</span>
															</li>-->
														</div>
														<!--mcoList  s-->
														<div class="mcoList">
															<li class="requiredItem payment-type companyInfor">
																<label class="nm-left">MCO刷卡公司</label>
																<div class="payment">
																	<div class="dropdown creditCardCompanies">
																		<button class="btn btn-default" type="button" data-toggle="dropdown">
																			<span id="mco-party" class="txt">NAMEI</span>
																			<span class="caret"></span>
																		</button>
																		<ul class="dropdown-menu companyMenu" role="menu">
																			<?php
																				include('../database/dbConnection.php');
																				$query = "SELECT party_title FROM McoParty";
																				$result = $conn->query($query);
																				$rows = array();
																				if ($result->num_rows > 0) {
																						while($row = $result->fetch_assoc()) {
																								echo '<li><a tabindex="0">' . $row['party_title'] . '</a></li>';
																						}
																				}
																			?>
																		</ul>
																	</div>
																</div>
															</li>
															<li>
																<label class="nm-left">MCO&nbsp;INVOICE</label>
																<input type="text"  class="mco_invoice mco_input"/>
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
															<li class="rate list_account">
																<label class="nm-left">费率</label>
																<input type="text" class="rateInfo" id="fee-ratio">
																<a href="javascript:void(0);">以4%计算</a>
															</li>

														</div>
														<!--mcoList  e-->
														<!--支付方式  e-->
														<li class="list_account calculateProfit profitInfor">
															<label class="nm-left">利润</label>
															<input type="text" id="indiv-profit" disabled>
															<span id="profit-currency">美元</span>
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
																<input type="text" id="indivClientTel">
															</dd>
															<dd>
																<label>其他联系方式</label>
																<select id="indivOtherContact">
																	<option value="WeChat">WeChat</option>
																	<option value="QQ">QQ</option>
																	<option value="Facebook">Facebook</option>
																</select>
															</dd>
															<dd>
																<label id="indivOtherContactLabel">WeChat账号</label>
																<input type="text" id="indivOtherContactNumber">
															</dd>
														</dl>
													</li>
													<li class="last-info">
														<dl>
															<dd class="birthday">
																<label>生日</label>
																<input type="date" id="indivBirthday">
															</dd>
															<dd class="gender">
																<label>性别</label>
																<select id="indivGender">
																	<option value="UNKNOWN">Unknown</option>
																	<option value="M">男</option>
																	<option value="F">女</option>
																</select>
															</dd>
															<dd>
																<label>邮箱</label>
																<input type="text" id="indivClientEmail">
															</dd>
															<dd class="zipCode">
																<label>邮政编码</label>
																<input type="text" id="indivZipCode">
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
