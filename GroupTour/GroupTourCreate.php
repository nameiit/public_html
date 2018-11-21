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
		<title>后台管理系统（独立团添加页面）</title>
		<link href="../css/bootstrap.min.css" type="text/css" rel="stylesheet" />
		<link href="../css/bootstrap-submenu.min.css" type="text/css" rel="stylesheet" />
		<link href="../css/groupTour.css" type="text/css" rel="stylesheet" />
		<link href="../css/style.css" type="text/css" rel="stylesheet" />
		<link href="../css/font-awesome.css" type="text/css" rel="stylesheet" />
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
				<!--左侧导航 s-->
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
									<a href="../IndividualTour/IndividualTourCreate.php" >
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
				<!--左侧导航 e-->
				<div class="theamInfo nm-right">
					<div class="showMsg yewuMsg">
						<div class="floor teamIndie">
							<div class="navGroup">
								<ul>
									<li class="addItem card-active">
										<a href="javascript:void(0)" class="ms-active createOrderButton">
											<img src="../img/add.png" />
											添<i>隐藏</i>加
										</a>
									</li>
									<li class="updateItem">
										<a href="GroupTourUpdate.php" class="updateOrderButton">
											<img src="../img/c_refresh.png">
											更<i>隐藏</i>新
										</a>
									</li>
								</ul>
							</div>
							<div class="groupMsg addInfo">
								<form class="addlist" id="createGroupTourForm">
									<div class="cardLeft groupLeftInfo">
									<div class="cardLeft nm-left">
										<label class="markMsg"><i></i>出团信息</label>
										<ul class="add-msg">
											<li>
												<!--<label class="nm-left">团号</label>-->
												<label class="nm-left">公司内部团号</label>
												<input type="text" id="groupNum">
											</li>
											<!--<li class="requiredItem">
												<label class="nm-left">INVOICE</label>
												<input type="text" id="invoice">
											</li>-->
											<li>
												<!--<label class="nm-left">航班号</label>
												<input type="text" id="flightNum">-->
												<label class="nm-left">旅客航班信息</label>
												<div class="flightInfor" contenteditable="true">
													
												</div>	
											</li>
											<!--<li>
												<label class="nm-left">巴士公司</label>
												<input type="text" id="busCompany">
											</li>-->
											<li class="requiredItem">
												<label class="nm-left">销售人员</label>
												<input id="salespersonInput" type="text" placeholder="Search..." <?php if ($_SESSION["group_name"] == 'normal') { echo "value='" . $_SESSION['username'] . "'"; } ?>>
											</li>
											<li>
												<label class="nm-left">顾客来源</label>
												<input type="text" id="groupTourSource" placeholder="Search...">
											</li>
											<li class="requiredItem">
												<label class="nm-left ">领队人数</label>
												<input type="text" class="leadnum numFormat" id="leadNum">
											</li>
											<li class="requiredItem">
												<label class="nm-left ">游客人数</label>
												<input type="text" class="visitorNum numFormat" id="visitorNum">
											</li>
											<li>
												<label class="nm-left">备注</label>
												<!--<textarea id="note" rows="5"></textarea>-->
												<div class="notesInfor" contenteditable="true" id="note"></div>
											</li>
										</ul>
									</div>
									<!--订单关联    s-->
									<div class="cardLeft ordersAssociated">
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
									
									
									
									</div>
									<!--价格信息   s-->
									<div class="cardRight groupRightInfo">
										<div class="cardRight nm-right info-date">
											<label class="markMsg"><i></i>行程安排</label>
											<ul class="add-msg">
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
												<li class="requiredItem">
													<label class="nm-left">出发日期</label>
													<input type="date" id="startTime" value="">
												</li>
												<li class="requiredItem">
													<label class="nm-left">结束日期</label>
													<input type="date" id="endTime" value="">
												</li>
												<li class="requiredItem">
													<label class="nm-left">天数</label>
													<input type="text" id="dateCount" value="" class="numFormat">
												</li>
											</ul>
										</div>
										<!--其他信息   s-->
										<div class="cardRight nm-right otherInfo payService payServiceInfor">
											<label class="markMsg"><i></i>支付信息</label>
											<ul class="add-msg">
												<!--汇率    s-->
												<li class="exchangeRate">
													<label class="nm-left">成交汇率</label>
													<span>1&nbsp;&nbsp;美元&nbsp;&nbsp;=&nbsp;&nbsp; <input type="text" id="group_exchange_rate" class="numFormat">&nbsp;&nbsp;人民币</span>
												</li>
												<!--汇率     e-->
												<li class="requiredItem payment-type areaInfo">
													<label class="nm-left">支付地点</label>
													<div class="payment">
														<div class="dropdown area areaFloor">
															<button class="btn btn-default" type="button" data-toggle="dropdown">
																<span class="txt">美国</span>
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
												<!--已知花费   s-->
												<li class="list_currency list_account knownCost">
													<label class="nm-left">已知花费</label>
													<input type="text" class="numFormat" disabled>
													<span>美元</span>
												</li>
												<!--已知花费   e-->
												<!--其他花费   s-->
												<li class="list_currency">
													<label class="nm-left">其他花费</label>
													<input type="text" id="other-cost" class="numFormat">
													<!--<select id="other-cost-currency">
														<option value="USD">$ 美元</option>
														<option value="RMB">￥ 人民币</option>
													</select>-->
													<div class="payment currency_type">
														<div class="dropdown currency">
															<button class="btn btn-default" type="button" data-toggle="dropdown" aria-expanded="false">
																<span class="txt currency_txt otherCost_currency">美元</span>
																<span class="caret"></span>
															</button>
															<ul class="dropdown-menu currency_box otherCost_currencyBox" role="menu">
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
												<!--其他花费   e-->
												<!--总花费       s-->
												<li class="list_currency list_account totalCost">
													<label class="nm-left">总花费</label>
													<input type="text" id="totalCost" class="numFormat">
													<span>美元</span>
												</li>
												<!--总花费       e-->
												<!--总收入   s-->
												<li class="list_currency list_account totalIncome">
													<label class="nm-left">总收入</label>
													<input type="text" disabled>
													<span>美元</span>
												</li>
												<!--总收入    e-->
												<!--折扣模块   s-->
												<!--<li class="discountCard">
													<label class="nm-left">折扣</label>
													<dl class="discountOption" id="groupDiscountOption">
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
															<input type="text" id="groupDiscountText">
															<select id="groupDiscountSelect">
																<option value="USD">$ 美元</option>
																<option value="RMB">￥ 人民币</option>
															</select>
														</dd>
														<dd class="discount-apply">
															<a href="javascript:void(0);" class="discountApply" id="groupDiscountApply">
																Apply
															</a>
														</dd>
													</dl>
													<dl class="discountNotice nm-hide" id="groupDiscountNotice">
														<dd>
															<span id="groupSubtractNum"></span>
														</dd>
													</dl>
												</li>-->
												<!--折扣模块   e-->
												<!--利润           s-->
												<li class="list_account calculateProfit">
													<label class="nm-left">利润</label>
													<input type="text" disabled="disabled" id="groupProfit">
													<span></span>
													<!--<a href="javascript:void(0);" id="group_calculateBtn">确认</a>-->
												</li>
												<!--利润           e-->
											</ul>
										</div>
										<!--其他信息    e-->
									</div>
									<!--价格信息  e-->
									<div class="split split1">
											<hr>
									</div>
									<!--导游信息表   s-->
									<div class="addInforTab">
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
															<dd>TITLE</dd>
															<dd>支付方式</dd>
															<dd>支付金额</dd>
															<dd>MCO信息</dd>
														</dl>
													</li>
													<div class="collection_info">
														<!--未填写  s-->
														<div class="notFilled">
															<img src="../img/nofill.png" />
															<span>未填写</span>
														</div>
														<!--未填写  e-->
													</div>
												</ul>
											</div>
										</div>
									</div>
									<!--收款信息表        e-->	
									<div class="guidesInforTab">
										<div class="split split1">
											<!--<hr>-->
										</div>
										<div class="tabContent">
											<div class="updateInfo">
												<ul class="reportInfo">
													<li class="reportTitle">
														<dl>
															<dd>导游</dd>
															<dd>导游电话</dd>
															<dd>准备金+报账</dd>
														</dl>
													</li>
													<div class="guides_info">
														<!--未填写  s-->
														<div class="notFilled">
															<img src="../img/nofill.png" />
															<span>未填写</span>
														</div>
														<!--未填写 e-->
													</div>
												</ul>
											</div>
										</div>
									</div>
									<!--导游信息表  e-->
									<!--供应商信息表    s-->
									<div class="wholesalerInfoTab">
										<div class="split">
											<!--<hr>-->
										</div>
										<div class="tabContent">
											<div class="updateInfo">
												<ul class="reportInfo">
													<li class="reportTitle">
														<dl>
															<!--<dd>批发商</dd>-->
															<dd>供应商</dd>
															<dd>类型</dd>
															<dd>金额</dd>
														</dl>
													</li>
													<div class="wholesaler_info">
														<!--未填写  s-->
														<div class="notFilled">
															<img src="../img/nofill.png" />
															<span>未填写</span>
														</div>
														<!--未填写  e-->
													</div>
												</ul>
											</div>
										</div>
									</div>
									<!--供应商信息表    e-->
									</div>
									<!--导游信息      s-->
									<!--<div class="split split2">
									</div>-->
									<div class="addInforContent">
									<!--收款            s-->
									<div class="cardRight info-price collectionInfor collectionContent payService">
										<label class="markMsg"><i></i>收款</label>
										<ul class="add-msg">
											<li>
												<label class="nm-left">TITLE</label>
												<input type="text" class="title"/>
											</li>
											<li class="list_currency">
												<label class="nm-left">支付金额</label>
												<input type="text"  class="paymentAmount"/>
												<!--<select class="price_currency">
													<option value="USD">$ 美元</option>
													<option value="RMB">￥ 人民币</option>
												</select>-->
												<div class="payment currency_type">
													<div class="dropdown currency">
														<button class="btn btn-default" type="button" data-toggle="dropdown">
															<span class="txt currency_txt paymentAmount_currency">美元</span>
															<span class="caret"></span>
														</button>
														<ul class="dropdown-menu currency_box paymentAmount_currencyBox" role="menu">
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
											<li class="requiredItem payment-type paymentMethodInfo">
												<label class="nm-left">支付方式</label>
												<div class="payment">
														<div class="dropdown paymentMethod">
															<button class="btn btn-default" type="button" data-toggle="dropdown">
																<span class="txt">支付方式</span>
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
											<div class="mcoList">
													<li class="requiredItem payment-type companyInfor">
														<label class="nm-left">刷卡公司</label>
														<div class="payment">
															<div class="dropdown creditCardCompanies">
																<button class="btn btn-default" type="button" data-toggle="dropdown">
																	<span class="txt">NAMEI</span>
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
													<li class="list_currency">
														<label class="nm-left">票面</label>
														<input type="text"  class="numFormat groupTour_faceValue"/>
														<div class="payment currency_type">
															<div class="dropdown currency">
																<button class="btn btn-default" type="button" data-toggle="dropdown">
																	<span class="txt currency_txt faceValue_currency">美元</span>
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
													<li class="list_currency">
														<label class="nm-left">MCO&nbsp;金额</label>
														<input type="text"  class="numFormat groupTour_mcoAmount"/>
														<div class="payment currency_type">
															<div class="dropdown currency">
																<button class="btn btn-default" type="button" data-toggle="dropdown">
																	<span class="txt currency_txt mcoAmount_currency">美元</span>
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
													<li class="list_currency">
														<label class="nm-left">MCO&nbsp;Credit</label>
														<input type="text"  class="numFormat mcoCreditInfo"/>
														<div class="payment currency_type">
															<div class="dropdown currency">
																<button class="btn btn-default" type="button" data-toggle="dropdown">
																	<span class="txt currency_txt mcoCredit_currency">美元</span>
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
														<input type="text" class="rateInfo" >
													</li>
												</div>
												<li class="addCollection">
													<a href="javascript:void(0);">
														添加下一笔收款
													</a>
												</li>
										</ul>
									</div>
									<!--收款            e-->
									<!--导游信息   s-->
									<div class="guidesInforContent payService">
										<label class="markMsg"><i></i>导游</label>
											<ul class="add-msg">
												<div class="newGuide">
													<li>
														<label>导游</label>
														<input type="text" id="tourGuide" placeholder="Search..." class="guideName"/>
													</li>
													<li>
														<label>导游电话</label>
														<input type="text" id="guideTel" class="guideTel">
													</li>
													<li class="list-currency list_currency">
														<label>准备金</label>
														<input type="text" id="reserve" disabled="disabled"/>
														<label class="switch">
		  													<input class="btn-switch large" type="checkbox">
		  												</label>
													</li>
													<li class="list-currency list_currency">
														<label>报账</label>
														<input type="text" class="accountingInfo numFormat" id="guideWriteOff">
														<div class="payment currency_type">
															<div class="dropdown currency">
																<button class="btn btn-default" type="button" data-toggle="dropdown">
																	<span class="txt currency_txt guideWriteOff_currency">美元</span>
																	<span class="caret"></span>
																</button>
																<ul class="dropdown-menu currency_box guideWriteOff_currencyBox" role="menu">
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
												</div>
												<li class="addNewGuide">
													<a href="javascript:void(0);">
														添加下一位导游
													</a>
												</li>
											</ul>
									</div>
									<!--导游信息    e-->
									<!--供应商        s-->
									<div class="wholesalerInfoContent payService">
										<label class="markMsg" style="text-align: center;"><i></i>供应商</label>
										<ul class="add-msg">
											<li class="supplierType">
												<label class="nm-left">类型</label>
												<select>
													<option></option>
													<option>车款</option>
													<option>酒店</option>
												</select>
											</li>
											<li>
												<label class="nm-left">供应商</label>
												<input type="text" class="wholesaler" id="agent" type="text" placeholder="Search...">
											</li>
											<li>
												<label class="nm-left">INVOICE</label>
												<input type="text"  class="wholesalerInvoice"/>
											</li>
											<li class="list-currency list_currency">
												<label class="nm-left">金额</label>
												<input type="text" class="amountInfo numFormat" />
												<!--<select id="wholesaler-currency">
													<option value="USD">$ 美元</option>
													<option value="RMB">￥ 人民币</option>
												</select>-->
												<div class="payment currency_type">
													<div class="dropdown currency">
														<button class="btn btn-default" type="button" data-toggle="dropdown">
															<span class="txt currency_txt supplier_currency">美元</span>
															<span class="caret"></span>
														</button>
														<ul class="dropdown-menu currency_box supplier_currencyBox" role="menu">
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
											<li class="addNewWholesaler">
												<a href="javascript:void(0);">
													添加下一位供应商
												</a>
											</li>
										</ul>
									</div>
									<!--供应商        e-->
									</div>
									<div class="split split3 nm-hide">
										<!--<hr>-->
									</div>
								<div class="toPrintPage">
									<label class="markMsg"><i></i>准备金</label>
									<ul class="reserveTab">
										<!--<li class="createPrintPage nm-left"><a href="javascript:void(0);">生成打印页</a></li>-->
										<li class="close nm-right">
											<a href="javascript:void(0);">
												<img src="../img/close.png">
											</a>
										</li>
									</ul>
									<div class="reserveContent" >
										<div class="reserveFundInfo">
											<ul class="add-msg">
												<li class="list_split">
													<label>餐标</label>
													<input type="text"  id="lunch" placeholder="午餐">
													<input type="text"  id="dinner" placeholder="晚餐">	
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
													<input type="text" class="dayNum"/>
												</li>
												<li>
													<label>总人数</label>
													<input type="text"  id="peopleCount">
												</li>
												<li class="list_split ">
													<a href="javascript:void(0);" id="proTab" class="proTab">确认</a>
													<a href="javascript:void(0);" class="createPrintPage">生成打印页</a>
												</li>
												
											</ul>
											
										</div>
										</div>
										<!-- 准备金 -->
										<div class="userTab nm-hide">
											<ul class="userTabTitle">
												<li class="date">日期</li>
												<li>人数</li>
												<li>午餐</li>
												<li>晚餐</li>
											</ul>
											<ul class="userTab1"></ul>
											<ul class="dtip driverTip">
												<li class="driverTipItem"></li>
											</ul>
										</div>
									</div>
								</div>
									<ul class="submitInfo">
										<li>
											<a href="javascript:void(0);" id="groupTourSubmit">
												提交
											</a>
										</li>
										<li>
											<a href="javascript:void(0);" id="groupTourCancel">
												重置
											</a>
										</li>
									</ul>
								</form>
								<!-- Confirm Box -->
								<?php
									$confirmBoxClass = "grouptourCreateConfirmBox";
									$confirmButtonClass = "groupTourCreateActionConfirm";
									$cancelButtonClass = "groupTourCreateActionCancel";
									include('../confirmInfo.php');
								 ?>

								 <?php
 									$confirmBoxClass = "grouptourCreateSuccessBox";
 									$confirmButtonClass = "grouptourCreateSuccessConfirm";
 									$cancelButtonClass = "grouptourCreateSuccessCancel";
 									include('../confirmInfo.php');
 								 ?>

								 <?php
 									$confirmBoxClass = "grouptourDownloadBox";
 									$confirmButtonClass = "groupTourDownloadActionConfirm";
 									$cancelButtonClass = "groupTourDownloadActionCancel";
 									include('../confirmInfo.php');
 								 ?>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<script src="../js/jquery-1.11.0.min.js" type="text/javascript"></script>
		<script src="../js/bootstrap.min.js" type="text/javascript"></script>
		<script src="../js/bootstrap-submenu.min.js" type="text/javascript"></script>
	    <script type="text/javascript">
	        var tourist_guide_name = [];
	        var tourist_guide_phone = [];
					var tourist_guide_reserve = [];
	        var tourist_guide_write_off = [];
					var tourist_guide_write_off_currency = [];

	        var group_tour_price = [];
					var group_tour_price_currency = [];
					var group_tour_payment_type = [];
					var group_tour_transaction_fee = [];
					var group_tour_actual_received = [];
					var group_tour_price_note = [];
	        var sum = 0;

					var wholesalerIndex = 0;
					var wholesalerList = [];
					var wholesalerNote = [];
					var wholesalerPrice = [];
					var wholesalerCurrency = [];
	    </script>
		<script src="../js/homePage/public.js" type="text/javascript"></script>
		<script src="../js/Business/GroupTour/groupTour.js" type="text/javascript"></script>
		<script src="../layui/layui.js" type="text/javascript"></script>
		<script type="text/javascript">
			$(function(){
				groupTourDiscount($("#groupDiscountText"), $("#groupDiscountNotice"), $("#groupDiscountApply"), $("#groupSubtractNum"), $("#groupDiscountOption"),$("select#groupDiscountSelect"));
			});
		</script>
	</body>
</html>
