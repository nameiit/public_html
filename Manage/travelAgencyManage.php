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
		<title>管理-旅行社管理</title>
		<link href="../css/manage.css" rel="stylesheet" type="text/css" />
		<link href="../css/style.css" type="text/css" rel="stylesheet" />
		<link href="../css/jquery.searchableSelect.css"  type="text/css" rel="stylesheet"/>
		<link href="../css/zebra_tooltips.css" type="text/css" rel="stylesheet" />
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
									<a href="javascript:void(0);" class="lab-active">
										<label></label> 人员管理
									</a>
								</dd>
								<dd>
									<a href="PerformanceManage.php">
										<label></label> 业绩管理
									</a>
								</dd>
								<dd>
									<a href="FinancialAudit.php">
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
								<!--管理导航   s-->
								<div class="manageNav">
									<ul>
										<li class="salesItem">
											<a href="SalesManage.php" id="goSalesManage">
												销<i style="visibility: hidden;font-style: normal;">隐</i>售
												<img src="../img/rightArrow.png">
											</a>
										</li>
										<li class="guideItem">
											<a href="TourGuideManage.php">
												导<i style="visibility: hidden;font-style: normal;">隐</i>游
												<img src="../img/rightArrow.png">
											</a>
										</li>
										<li class="providerItem">
											<a href="SupplierManage.php">
												批发商
												<img src="../img/rightArrow.png">
											</a>
										</li>
										<li class="travelAgencyItem">
											<a href="javascript:void(0);">
												旅行社
												<img src="../img/rightArrow.png" />
											</a>
										</li>
									</ul>
								</div>
								<!--管理导航   e-->
								<!--管理表s-->
								<div class="manageTab travelAgencyManageTab">
									<div class="tabCard">
										<label class="markManage travelMark">旅行社</label>
										<ul class="manageTabTitle salesTitle">
											<li class="tabId">#</li>
                                            <li class="tabName travelAgencyInfo">
												<select class="searchItem" id="travel-agency-name-filter">
													<option value="all">旅行社</option>
   											 	</select>
											</li>
											<li class="mailInfo">
												邮件
											</li>
											<li class="tabTelInfo">联系电话</li>
											<li class="createTimeInfo">
												创建时间
											</li>
											<li class="addressInfo">地址</li>
											<li class="tabDetailInfo">详情</li>
                                            <li class="tabGender statusInfo">
												<select class="searchItem" id="travel-agency-status-filter">
													<option value="all">状态</option>
													<option value="Y">注册</option>
													<option value="N">停用</option>
   											 	</select>
											</li>
										</ul>
										<ul class="manageTabDetail">
											<li>
												<dl>
													<dd class="tabId">
														1
													</dd>
													<dd class="travelAgencyInfo">
														纳美旅行社
													</dd>
													<dd class="mailInfo">
														namei@aotrip.net
													</dd>
													<dd class="tabTelInfo">
														(123)1234-123
													</dd>
													<dd class="createTimeInfo">
														2018-07-10
													</dd>
													<dd class="addressInfo">
														<a class="address-tips">查看</a>
													</dd>
													<dd class="tabDetailInfo">
														<a class="tabDetail-tips">查看</a>
													</dd>
													<dd class="statusInfo">
														Active
													</dd>
												</dl>
											</li>
											<li>
												<dl>
													<dd class="tabId">
														2
													</dd>
													<dd class="travelAgencyInfo">
														旅行社2
													</dd>
													<dd class="mailInfo">
														namei@aotrip.net
													</dd>
													<dd class="tabTelInfo">
														123445565
													</dd>
													<dd class="createTimeInfo">
														2018-07-12
													</dd>
													<dd class="addressInfo">
														<a class="address-tips">查看</a>
													</dd>
													<dd class="tabDetailInfo">
														<a class="tabDetail-tips">查看</a>
													</dd>
													<dd class="statusInfo">
														Active
													</dd>
												</dl>
											</li>
											<li>
												<dl>
													<dd class="tabId">
														3
													</dd>
													<dd class="travelAgencyInfo">
														旅行社3
													</dd>
													<dd class="mailInfo">
														xxx@aotrip.net
													</dd>
													<dd class="tabTelInfo">
														4823493
													</dd>
													<dd class="createTimeInfo">
														2018-07-12
													</dd>
													<dd class="addressInfo">
														<a class="address-tips">查看</a>
													</dd>
													<dd class="tabDetailInfo">
														<a class="tabDetail-tips">查看</a>
													</dd>
													<dd class="statusInfo">
														Active
													</dd>
												</dl>
											</li>
											<li>
												<dl>
													<dd class="tabId">
														4
													</dd>
													<dd class="travelAgencyInfo">
														旅行社3
													</dd>
													<dd class="mailInfo">
														Ac@aotrip.net
													</dd>
													<dd class="tabTelInfo">
														(123)1234-123
													</dd>
													<dd class="createTimeInfo">
														2018-07-12
													</dd>
													<dd class="addressInfo">
														<a class="address-tips">查看</a>
													</dd>
													<dd class="tabDetailInfo">
														<a class="tabDetail-tips">查看</a>
													</dd>
													<dd class="statusInfo">
														Active
													</dd>
												</dl>
											</li>
											<li>
												<dl>
													<dd class="tabId">
														5
													</dd>
													<dd class="travelAgencyInfo">
														纳美旅行社
													</dd>
													<dd class="mailInfo">
														At@aotrip.net
													</dd>
													<dd class="tabTelInfo">
														(123)1234-12323
													</dd>
													<dd class="createTimeInfo">
														2018-07-10
													</dd>
													<dd class="addressInfo">
														<a class="address-tips">查看</a>
													</dd>
													<dd class="tabDetailInfo">
														<a class="tabDetail-tips">查看</a>
													</dd>
													<dd class="statusInfo">
														Active
													</dd>
												</dl>
											</li>
											<li>
												<dl>
													<dd class="tabId">
														6
													</dd>
													<dd class="travelAgencyInfo">
														纳美旅行社
													</dd>
													<dd class="mailInfo">
														AA@aotrip.net
													</dd>
													<dd class="tabTelInfo">
														(123)1234-1123
													</dd>
													<dd class="createTimeInfo">
														2018-07-10
													</dd>
													<dd class="addressInfo">
														<a class="address-tips">查看</a>
													</dd>
													<dd class="tabDetailInfo">
														<a class="tabDetail-tips">查看</a>
													</dd>
													<dd class="statusInfo">
														Active
													</dd>
												</dl>
											</li>
											<li>
												<dl>
													<dd class="tabId">
														7
													</dd>
													<dd class="travelAgencyInfo">
														纳美旅行社
													</dd>
													<dd class="mailInfo">
														BB@aotrip.net
													</dd>
													<dd class="tabTelInfo">
														(123)1234-123
													</dd>
													<dd class="createTimeInfo">
														2018-07-07
													</dd>
													<dd class="addressInfo">
														<a class="address-tips">查看</a>
													</dd>
													<dd class="tabDetailInfo">
														<a class="tabDetail-tips">查看</a>
													</dd>
													<dd class="statusInfo">
														Active
													</dd>
												</dl>
											</li>
											<li>
												<dl>
													<dd class="tabId">
														8
													</dd>
													<dd class="travelAgencyInfo">
														旅行社7
													</dd>
													<dd class="mailInfo">
														AA@aotrip.net
													</dd>
													<dd class="tabTelInfo">
														1235464767
													</dd>
													<dd class="createTimeInfo">
														2018-07-01
													</dd>
													<dd class="addressInfo">
														<a class="address-tips">查看</a>
													</dd>
													<dd class="tabDetailInfo">
														<a class="tabDetail-tips">查看</a>
													</dd>
													<dd class="statusInfo">
														Active
													</dd>
												</dl>
											</li>
											<li>
												<dl>
													<dd class="tabId">
														9
													</dd>
													<dd class="travelAgencyInfo">
														旅行社8
													</dd>
													<dd class="mailInfo">
														23489239@qq.com
													</dd>
													<dd class="tabTelInfo">
														13598594234
													</dd>
													<dd class="createTimeInfo">
														2018-07-11
													</dd>
													<dd class="addressInfo">
														<a class="address-tips">查看</a>
													</dd>
													<dd class="tabDetailInfo">
														<a class="tabDetail-tips">查看</a>
													</dd>
													<dd class="statusInfo">
														Active
													</dd>
												</dl>
											</li>

										</ul>
										<a href="javascript:void(0);" class="order-unfold">
											<img src="../img/unfold.png">点击进入下一页
										</a>
									</div>
								</div>
								<!--管理表e-->
								<!--添加/修改   s-->
								<div class="manageTabAction">
									<ul class="manageTabActionNav">
										<li class="amendInfo">
											<a href="javascript:void(0);">修改</a>
										</li>
										<li class="manage-active addInfo">
											<a href="javascript:void(0);">添加</a>
										</li>
									</ul>
									<!--添加-->
									<ul class="filerDetail addTabMsg">
										<li class="filterTitle">旅行社:</li>
										<li>
											<label>旅行社</label>
											<input type="text" class="travelAgencyName" id="insert-travel-agency-name">
										</li>
										<li>
											<label>邮件</label>
											<input type="text" class="mail" id="insert-travel-agency-email">
										</li>
										<li>
											<label>联系电话</label>
											<input type="text" class="tel" id="insert-travel-agency-phone">
										</li>

										<li>
											<label>创建时间</label>
											<input type="date"  class="createTime" id="insert-travel-agency-createtime">
										</li>
										<li>
											<label>地址</label>
											<input type="text" class="address" id="insert-travel-agency-address">
										</li>
										<li>
											<label>邮编</label>
											<input type="text" class="zipCode" id="insert-travel-agency-zipcode">
										</li>
										<li>
											<label>国家/地区</label>
											<input type="text" class="area" id="insert-travel-agency-region">
										</li>
										<li>
											<label>详情</label>
											<textarea  rows="5" class="detail" id="insert-travel-agency-description"></textarea>
										</li>
										<li class="actionFilerBox">
											<a href="javascript:void(0);" class="confirmAddInfo" id="insert-confirm">添加</a>
											<a href="javascript:void(0);" class="confirmReset" id="insert-reset">清空</a>
										</li>
									</ul>
									<!--修改-->
									<ul class="filerDetail amendTabMsg nm-hide amendBox">
										<li class="filterTitle">旅行社:</li>
										<li>
											<label>旅行社</label>
											<input type="text" class="travelAgencyName" id="update-travel-agency-name">
										</li>
										<li>
											<label>邮件</label>
											<input type="text" class="mail" id="update-travel-agency-email">
										</li>
										<li>
											<label>联系电话</label>
											<input type="text" class="tel" id="update-travel-agency-phone">
										</li>

										<li>
											<label>创建时间</label>
											<input type="date"  class="createTime" id="update-travel-agency-createtime">
										</li>
										<li>
											<label>地址</label>
											<input type="text" class="address" id="update-travel-agency-address">
										</li>
										<li>
											<label>邮编</label>
											<input type="text" class="zipCode" id="update-travel-agency-zipcode">
										</li>
										<li>
											<label>国家/地区</label>
											<input type="text" class="area" id="update-travel-agency-region">
										</li>
										<li>
											<label>详情</label>
											<textarea  rows="5" class="detail" id="update-travel-agency-description"></textarea>
										</li>
										<li class="actionFilerBox">
											<a href="javascript:void(0);" class="confirmAmendInfo" id="update-confirm">确认修改</a>
											<a href="javascript:void(0);" class="deleteInfo" id="update-clear">停用</a>
											<a href="javascript:void(0);" class="confirmReset" id="update-reset">重置</a>
										</li>
									</ul>
								</div>
								<!--添加/修改   e-->
							</div>
						</div>

					</div>

				</div>
				<!--右侧内容     e-->
				<?php
					$confirmBoxClass = "updateConfirmBox";
			   		$confirmButtonClass = "updateActionConfirm";
			   		$cancelButtonClass = "updateActionCancel";
			   		include('../confirmInfo.php');

					$confirmBoxClass = "insertConfirmBox";
			   		$confirmButtonClass = "insertActionConfirm";
			   		$cancelButtonClass = "insertActionCancel";
			   		include('../confirmInfo.php');

					$confirmBoxClass = "deleteConfirmBox";
			   		$confirmButtonClass = "deleteActionConfirm";
			   		$cancelButtonClass = "deleteActionCancel";
			   		include('../confirmInfo.php');
				 ?>
			</div>
			<!--content e-->

		</div>
		<script src="../js/jquery.min.js" type="text/javascript"></script>
		<script src="../js/homePage/public.js" type="text/javascript"></script>
        <script src="../js/Management/manage.js" type="text/javascript"></script>
        <script src="../js/Management/travelAgency.js" type="text/javascript"></script>
		<script src="../js/jquery.searchableSelect.js" type="text/javascript"></script>
		<script src="../js/homePage/zebra_tooltips.js" type="text/javascript"></script>
        <script type="text/javascript">
			$(function(){
				$(document).scroll(function(){
					var winScrollTop = $(window).scrollTop();
					if(winScrollTop>150){
						$(".manageNav").css("top","0px");
                     	$(".manageTabAction").css("top","0px");
					}else{
						$(".manageNav").css("top","initial");
                     	$(".manageTabAction").css("top","initial");
					}
				});
				$("ul.manageTabActionNav").find("li").find("a").on("click",function(){
					$(".manageTabAction").find("ul.filerDetail").find("li").find("input").val("");
					$(".manageTabAction").find("ul.filerDetail").find("li").find("textarea").val("");
				});
			});
		</script>
	</body>
</html>
