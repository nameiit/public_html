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
		<title>后台管理系统（机票添加页面）</title>
		<link href="../css/bootstrap.min.css" type="text/css" rel="stylesheet" />
		<link href="../css/bootstrap-submenu.min.css" type="text/css" rel="stylesheet" />
		<link href="../css/airTicket.css" type="text/css" rel="stylesheet" />
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
			<!--content s-->
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
								<!--<dd>
									<a href="../GroupTour/GroupTourCreate.php">
										<label></label> 独立团
									</a>
								</dd>-->
								<dd>
									<a href="../IndividualTour/IndividualTourCreate.php" >
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
						<div class="floor planeTickets">
							<!--右侧导航     s-->
							<div class="navGroup">
								<ul>
									<li class="addItem card-active">
										<a href="javascript:void(0)" class="ms-active createOrderButton">
											<img src="../img/add.png">
											添<i>隐藏</i>加
										</a>
									</li>
									<li class="updateItem">
										<a href="AirTicketUpdate.php" class="updateOrderButton">
											<img src="../img/c_refresh.png">
											更<i>隐藏</i>新
										</a>
									</li>
								</ul>
							</div>
							<!--右侧导航     e-->
							<!--机票添加     s-->
							<div class="groupMsg addInfo airticketMsg airticketAddTab">
								<form class="addlist" id="createAirTicketForm">
									<!--06-14修改 s-->
									<div class="cardLeft itineraryInfo">
										<label class="markMsg"><i></i>Itinerary</label>
										<div class="airticketInfo">
											<textarea id="airticket-itinerary"></textarea>
											<div class="btnArea">
												<a href="javascript:void(0);" id="itinerary-confirm">确定</a>
												<a href="javascript:void(0);">清空</a>
											</div>
										</div>
									</div>
									<!--06-14修改 e-->
									<div class="cardLeft nm-left cardLeft-individual">
										<label class="markMsg"><i></i>基本信息</label>
										<ul class="add-msg add-msg-individual-left">
											<li class="requiredItem">
												<label class="nm-left">销售人员</label>
												<input id="airticket_salesperson" type="text" placeholder="Search..." <?php if ($_SESSION["group_name"] == 'normal') { echo "value='" . $_SESSION['username'] . "'"; } ?>>
											</li>
											<li class="requiredItem">
												<label class="nm-left">机票定位</label>
												<input type="text" id="air-ticket-create-locator"/>
											</li>
											<li>
												<label class="nm-left">航司大编码</label>
												<input type="text" id="air-ticket-create-air-company-code">
											</li>
											<li class="ticket-theam requiredItem">
												<label class="nm-left">往返</label>
												<dl class="ticket-option flightCodeNav">
													<dd class="option-active  roundTripItem" id="air-ticket-create-round-trip">往返</dd>
													<dd class="singleTripItem">单程</dd>
												</dl>
											</li>
											<li class="ticket-theam requiredItem">
												<label class="nm-left">团散</label>
												<dl class="ticket-option">
													<dd id="air-ticket-create-ticket-type">团票</dd>
													<dd class="option-active">散票</dd>
												</dl>
											</li>
											<!--<li>
												<label class="nm-left">乘客姓名</label>
												<input type="text" id="air-ticket-create-passenger-list">
											</li>
											<li class="ticket-theam requiredIte">
												<label class="nm-left">人数</label>
												<dl class="people-count">
													<dd>成人<input type="text" value="0" id="air-ticket-create-adult-number" class="nm-right numFormat"/></dd>
													<dd class="item">青年<input type="text" value="0" id="air-ticket-create-youth-number" class="nm-right numFormat"/></dd>
													<dd class="item">儿童<input type="text" value="0" id="air-ticket-create-children-number" class="nm-right numFormat"/></dd>
													<dd class="item">婴儿<input type="text" value="0" id="air-ticket-create-baby-number" class="nm-right numFormat"/></dd>
												</dl>
											</li>-->
											<li class="requiredItem">
												<label class="nm-left">总人数</label>
												<input type="text" value="0" id="air-ticket-create-total-number" disabled="disabled"/>
											</li>
											<li>
												<label class="nm-left">开票商</label>
												<input type="text" id="wholesaler" placeholder="Search..."/>
											</li>
											<li class="requiredItem">
												<label class="nm-left">出票时间</label>
												<input type="date" id="ticketed_time"/>
											</li>
											<li class="requiredItem">
												<label class="nm-left">INVOICE</label>
												<input type="text" id="air-ticket-create-invoice"/>
											</li>
											<!-- <li>
												<label class="nm-left">旅行社来源</label>
												<input type="text" id="travel-agency-source" placeholder="Search..."/>
											</li> -->
											<li>
												<label class="nm-left">顾客来源</label>
												<input type="text" id="airticket_source" placeholder="Search..." />
											</li>
											<li>
												<label class="nm-left">备注</label>
												<!--<textarea rows="5" id="air-ticket-create-note"></textarea>-->
												<div class="notesInfor" contenteditable="true" id="air-ticket-create-note"></div>
											</li>
										</ul>
									</div>
									<div class="cardRight nm-left info-date">
										<label class="markMsg"><i></i>行程安排</label>
										<ul class="add-msg" id="air-ticket-schedule">
											<!--<li class="departure_arrival requiredItem">
												<label class="nm-left">出发/抵达</label>
												<input type="text" class="arrival" placeholder="出发地"/>
												<input type="text" class="departure" placeholder="目的地"/>
											</li>-->
											<li class="requiredItem">
												<label class="nm-left">旅途</label>
												<div class="tour nm-left">
													<input type="text" placeholder="航班号" class="flightNum"  value=""/>
													<input type="date" placeholder="出发时间" class="startTime"/>
													<input type="text" placeholder="机场" class="airport" maxlength="7"/>
												</div>
												<img src="../img/addIcon.png" class="addInfo">
												<img src="../img/deleteIcon.png" class="deleteInfo"/>
											</li>
										</ul>
									</div>
									<div class="cardRight nm-right info-price info-price-individual payService">
										<label class="markMsg"><i></i>支付信息</label>
										<ul class="add-msg">
											<li class="exchangeRate">
												<label class="nm-left">成交汇率</label>
												<span>1&nbsp;&nbsp;美元&nbsp;&nbsp;=&nbsp;&nbsp; <input type="text" id="exchange_rate" class="numFormat">&nbsp;&nbsp;人民币</span>
											</li>
											<li class="requiredItem payment-type areaInfo">
												<label class="nm-left">支付地点</label>
												<div class="payment">
													<div class="dropdown area areaFloor">
														<button class="btn btn-default" type="button" data-toggle="dropdown">
														    <span id="payment-area" class="txt">美国</span>
														    <span class="caret"></span>
														</button>
														<ul class="dropdown-menu" role="menu">
															<li><a tabindex="0">中国</a></li>
															<li><a tabindex="0">美国</a></li>
														</ul>
													</div>
												</div>
											</li>
											<li class="requiredItem list_currency">
												<label class="nm-left">底价</label>
												<input type="text" id="air-ticket-base-price" class="numFormat"/>
												<div class="payment currency_type">
													<div class="dropdown currency">
														<button class="btn btn-default" type="button" data-toggle="dropdown">
														    <span id="base-price-currency" class="txt currency_txt basePrice_currency">美元</span>
														    <span class="caret"></span>
														</button>
														<ul class="dropdown-menu currency_box basePrice_currencyBox" role="menu">
															<li><a tabindex="0">美元</a></li>
															<li><a tabindex="0">人民币</a></li>
														</ul>
													</div>
												</div>
											</li>
											<li class="requiredItem list_currency">
												<label class="nm-left">卖价</label>
												<input type="text" id="air_amountDue" class="numFormat airTicket_sellPrice"/>
												<div class="payment currency_type">
													<div class="dropdown currency">
														<button class="btn btn-default" type="button" data-toggle="dropdown">
														    <span id="sell-price-currency" class="txt currency_txt salePrice_currency">美元</span>
														    <span class="caret"></span>
														</button>
														<ul class="dropdown-menu currency_box salePrice_currencyBox" role="menu">
															<li><a tabindex="0">美元</a></li>
															<li><a tabindex="0">人民币</a></li>
														</ul>
													</div>
												</div>
											</li>
											<li class="requiredItem payment-type paymentMethodInfo">
												<label class="nm-left">支付方式</label>
												<div class="payment">
													<div class="dropdown paymentMethod">
														<button class="btn btn-default" type="button" data-toggle="dropdown">
														   	<span id="air-ticket-create-payment-type" class="txt">支付方式</span>
														    <span class="caret"></span>
														</button>
														<ul class="dropdown-menu methodList" role="menu">
															<li class="dropdown-submenu">
																<a tabindex="0" data-toggle="dropdown">航司刷卡支付</a>
																	<ul class="dropdown-menu creditCardPayment">
																      <li><a tabindex="0">航司全额刷卡</a></li>
																      <li><a tabindex="0">航司刷卡+MCO</a></li>
																	</ul>
															</li>
															<li class="dropdown-submenu">
																  	<a tabindex="0">非航司刷卡支付</a>
																  	 <ul class="dropdown-menu no-creditCardPayment" data-toggle="dropdown">
																	      <li><a tabindex="0">现金</a></li>
																	      <li><a tabindex="0">支票</a></li>
																	      <li><a tabindex="0">支付宝</a></li>
																	      <li><a tabindex="0">微信支付</a></li>
																	      <li><a tabindex="0">REMIT</a></li>
																    </ul>
																</li>
														</ul>
													</div>
												</div>
											</li>
											<div class="mcoList">
												<li class="requiredItem payment-type companyInfor">
													<label class="nm-left">刷卡公司</label>
													<div class="payment">
														<div class="dropdown creditCardCompanies">
															<button class="btn btn-default" type="button" data-toggle="dropdown">
															    <span id="mco-party" class="txt"></span>
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
												<li class="requiredItem list_currency">
													<label class="nm-left">票面</label>
													<input type="text" id="face-value" class="numFormat airTicket_faceValue notRequired"/>
													<div class="payment currency_type">
														<div class="dropdown currency">
															<button class="btn btn-default" type="button" data-toggle="dropdown">
															    <span id="face-currency" class="txt currency_txt faceValue_currency">美元</span>
															    <span class="caret"></span>
															</button>
															<ul class="dropdown-menu currency_box faceValue_currencyBox" role="menu">
																<li><a tabindex="0">美元</a></li>
																<li><a tabindex="0">人民币</a></li>
															</ul>
														</div>
													</div>
												</li>
												<li class="requiredItem list_currency">
													<label class="nm-left">MCO&nbsp;金额</label>
													<input type="text" id="mco-value" class="numFormat airTicket_mcoAmount notRequired"/>
													<div class="payment currency_type">
														<div class="dropdown currency">
															<button class="btn btn-default" type="button" data-toggle="dropdown">
															    <span id="mco-currency" class="txt currency_txt mcoAmount_currency">美元</span>
															    <span class="caret"></span>
															</button>
															<ul class="dropdown-menu currency_box mcoAmount_currencyBox" role="menu">
																<li><a tabindex="0">美元</a></li>
																<li><a tabindex="0">人民币</a></li>
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
																<span id="mco-credit-currency" class="txt currency_txt mcoCredit_currency">美元</span>
																<span class="caret"></span>
															</button>
															<ul class="dropdown-menu currency_box mcoCredit_currencyBox" role="menu">
																<li><a tabindex="0">美元</a></li>
																<li><a tabindex="0">人民币</a></li>
															</ul>
														</div>
													</div>
												</li>
												<li class="list_account rate">
													<label class="nm-left">费率</label>
													<input id="fee-ratio" type="text" class="rateInfo" >
													<!--<span></span>-->
													<a href="javascript:void(0);">以4%计算</a>
												</li>
											</div>
											<li class="list_account profitInfor">
												<label class="nm-left">利润</label>
												<input type="text" disabled="disabled" id="airTicketProfit">
												<span id="profit-currency">美元</span>
												<!--<a href="javascript:void(0);">输入信用卡</a>-->
											</li>
											<div class="creditCardInfo">
												<hr>
												<li class="requiredItem">
													<label class="nm-left">卡号</label>
													<input type="text" id="card-number" class="notRequired">
												</li>
												<li class="requiredItem expDate">
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
													<!--持卡人  s-->
													<div class="cardholder">
														<label class="nm-left">持卡人</label>
														<input type="text" id="card-holder"  class="notRequired"/>
													</div>
													<!--持卡人  e-->
												</li>
												<li>
													<label class="nm-left">MCO负责人</label>
													<input type="text" placeholder="Search..." />
												</li>
											</div>
										</ul>

									</div>
									<!--订单关联    s-->
									<div class="cardRight ordersAssociated nm-right">
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
									</div>
									<!--订单关联    e-->
									<div class="split">
										<hr />
									</div>
								</form>
								<form>
									<!--04/13  添加客户信息s-->
									<div class="addClients customerInfo air-customer">
										<ul class="clients-title">
											<li><a>基本信息</a></li>
											<li><a>客户信息</a></li>
										</ul>
										<ul class="clients-info">
											<li>
												<dl>
													<!--<dd class="requiredItem">
														<label>人数</label>
														<dl class="people-count">
															<dd>成人<input type="text" value="0" id="air-ticket-create-adult-number" class="nm-right numFormat"/></dd>
															<dd class="item">青年<input type="text" value="0" id="air-ticket-create-youth-number" class="nm-right numFormat"/></dd>
															<dd class="item">儿童<input type="text" value="0" id="air-ticket-create-children-number" class="nm-right numFormat"/></dd>
															<dd class="item">婴儿<input type="text" value="0" id="air-ticket-create-baby-number" class="nm-right numFormat"/></dd>
														</dl>
													</dd>-->
													<!--乘客 s-->
													<dd class="requiredItem passenger">
														<label>乘客</label>
														<div id="passenger-list">
															<span>
																<select class="passenger-info">
																	<option value="adult">成人</option>
																	<option value="youth">青年</option>
																	<option value="children">儿童</option>
																	<option value="infant">婴儿</option>
																</select>
																<input type="text" placeholder="姓/名" class="passenger-name">
																<input type="text" placeholder="票号" class='passenger-ticket-number'>
															</span>
														</div>
														<img src="../img/addIcon.png" class="addInfo">
														<img src="../img/deleteIcon.png" class="deleteInfo">
													</dd>
													<dd class="requiredItem">
														<label>电话</label>
														<input type="text" id="ticket-create-customer-phone"/>
													</dd>
													<dd class="requiredItem">
														<label>邮箱</label>
														<input type="text" id="ticket-create-customer-email"/>
													</dd>
												</dl>
											</li>
											<li class="last-info">
												<dl>
													<dd class="birthday">
														<label>生日</label>
														<input type="date" id="ticket-create-customer-birthday"/>
													</dd>
													<dd  class="gender">
														<label>性别</label>
														<select id="ticket-create-customer-gender">
															<option value="UNKNOWN">Unknown</option>
															<option value="M">男</option>
															<option value="F">女</option>
														</select>
													</dd>
													<dd>
														<label>其他联系方式</label>
														<select id="ticket-create-customer-otherContact">
															<option value="WeChat">WeChat</option>
															<option value="QQ">QQ</option>
															<option value="Facebook">Facebook</option>
														</select>
													</dd>
													<dd>
														<label id="ticket-create-customer-otherContactLabel">WeChat账号</label>
														<input type="text" id="ticket-create-customer-otherContactNumber"/>
													</dd>
													<dd class="zipCode">
														<label>邮政编码</label>
														<input type="text" id="ticket-create-customer-zipcode"/>
													</dd>
												</dl>
											</li>
										</ul>
									</div>
									<div class="addClients customerInfo editcustomerInfo nm-hide air-customer">
										<a href="#" class="close-customer nm-right" id="plane-close-customer">
											<img src="../img/close.png">
										</a>
										<ul class="clients-title">
											<li><a>基本信息</a></li>
											<li><a>客户信息</a></li>
										</ul>
										<ul class="clients-info">
											<li>
												<dl>
													<dd class="pname">
														<label>姓</label>
														<input type="text" id="ticket-edit-customer-lastName"/>
													</dd>
													<dd class="pname">
														<label>名</label>
														<input type="text" id="ticket-edit-customer-firstName"/>
													</dd>
													<dd>
														<label>电话</label>
														<input type="text" id="ticket-edit-customer-phone"/>
													</dd>
													<dd>
														<label>其他联系方式</label>
														<select id="ticket-edit-customer-otherContack">
															<option value="WeChat">WeChat</option>
															<option value="QQ">QQ</option>
															<option value="Facebook">Facebook</option>
														</select>
													</dd>
													<dd>
														<label id="ticket-edit-customer-otherContactLabel">WeChat账号</label>
														<input type="text" id="ticket-edit-customer-otherContackNumber"/>
													</dd>
												</dl>
											</li>
											<li class="last-info">
												<dl>
													<dd class="birthday">
														<label>生日</label>
														<input type="date" id="ticket-edit-customer-birthday"/>
													</dd>
													<dd  class="gender">
														<label>性别</label>
														<select name="" id="ticket-edit-customer-gender">
															<option value="M">男</option>
															<option value="F">女</option>
														</select>
													</dd>
													<dd>
														<label>邮箱</label>
														<input type="text" id="ticket-edit-customer-email"/>
													</dd>
													<dd class="zipCode">
														<label style="letter-spacing: 9px;">邮政编码</label>
														<input type="text" id="ticket-edit-customer-zipCode"/>
													</dd>
													<dd class="otherMsg">
														<label>其他注意事项</label>
														<input type="text" id="ticket-edit-customer-otherMsg"/>
													</dd>
												</dl>
											</li>
										</ul>
										<p>
											<a href="javascript:void(0);" id="plane-CustomerInfo">确认修改</a>
										</p>
									</div>
									<!--04/13  添加客户信息e-->
									<ul class="submitInfo">
										<li><a href="javascript:void(0);" id="airTicketSubmit">提交</a></li>
										<li><a href="javascript:void(0);" id="indivTourCancel">重置</a></li>
									</ul>
								</form>
								<?php
									$confirmBoxClass = "airticketCreateConfirmBox";
									$confirmButtonClass = "airticketCreateActionConfirm";
									$cancelButtonClass = "airticketCreateActionCancel";
									include('../confirmInfo.php');

									$confirmBoxClass = "airticketCreateSuccessBox";
									$confirmButtonClass = "airticketCreateSuccessConfirm";
									$cancelButtonClass = "airticketCreateSuccessCancel";
									include('../confirmInfo.php');
								?>
							</div>
							<!--机票添加     e-->
						</div>
					</div>
				</div>
				<!--右侧内容    e-->
			</div>
			<!--content e-->
		</div>
		<script src="../js/jquery-1.11.0.min.js" type="text/javascript"></script>
		<script src="../js/bootstrap.min.js" type="text/javascript"></script>
		<script src="../js/bootstrap-submenu.min.js" type="text/javascript"></script>
		<script src="../js/homePage/public.js" type="text/javascript"></script>
		<script src="../js/Business/AirTicket/airTicket.js" type="text/javascript"></script>
		<script src="../js/Business/AirTicket/itineraryExtract.js" type="text/javascript"></script>
		<script src="../layui/layui.js" type="text/javascript"></script>
		<script type="text/javascript">
		$(function() {
			dateRange();
			//机票折扣
			airTicketTourDiscount($("#airTicketDiscountText"), $("#airTicketDiscountNotice"), $("#airTicketDiscountApply"), $("#airTicketSubtractNum"), $("#airTicketDiscountOption"), $("#coupon-currency"));
			//机票-总人数
			headCount();
			airTicketOption();//单程往返
			//客户信息验证
			/*checkClientInfo($("#ticket-create-customer-lastName"));
			checkClientInfo($("#ticket-create-customer-firstName"));
			checkClientInfo($("#ticket-create-customer-phone"));
			checkClientInfo($("#ticket-create-customer-birthday"));
			checkClientInfo($("#ticket-create-customer-email"));*/
			$(".airticketInfo").find("a").on("mousedown",function(){
				$(this).addClass("selected");
			});
			$(".airticketInfo").find("a").on("mouseup",function(){
				$(this).removeClass("selected");
			});
			$(".airticketInfo .btnArea").find("a:last").on("click",function(){
				$(this).parent().parent().find("textarea").val("");
			});
		});
		</script>
	</body>
</html>
