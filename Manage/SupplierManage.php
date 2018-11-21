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
		<title>管理-批发商管理</title>
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
											<a href="javascript:void(0);" id="goSalesManage">
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
											<a href="javascript:void(0);">
												批发商
												<img src="../img/rightArrow.png">
											</a>
										</li>
										<li class="travelAgencyItem">
											<a href="travelAgencyManage.php">
												旅行社
												<img src="../img/rightArrow.png" />
											</a>
										</li>
									</ul>
								</div>
								<!--管理导航   e-->
								<!--管理表s-->
								<div class="manageTab">
									<div class="tabCard">
										<label class="markManage supplierMark">批发商</label>
										<ul class="manageTabTitle supplierTabTitle">
											<li class="tabId">
												#
											</li>
											<li class="codeInfo">
												<select class="searchItem" id="wholesaler-code-filter">
													<option value="all">Code</option>
												</select>
											</li>
											<li class="supplierNameTab supplierNameInfo">
												<!--名称-->
												<select class="searchItem" id="wholesaler-name-filter">
													<option value="all">名称</option>
												</select>
											</li>
											<li class="supplierEmailTab">邮件</li>
											<li class="linkManNameTab supplierLinkManInfo">
												<!--联系人-->
												<select class="searchItem" id="wholesaler-contact-person-filter">
													<option value="all">联系人</option>
												</select>
											</li>
											<li class="areaInfoTab supplierAreaInfo">
												<!--地区-->
												<select class="searchItem" id="wholesaler-region-filter">
													<option value="all">地区</option>
													<option value="Beijing">北京</option>
													<option value="Xian">西安</option>
													<option value="Chengdu">成都</option>
													<option value="Manhattan">曼哈顿</option>
													<option value="Flushing">法拉盛</option>
												</select>
											</li>
											<li class="businessTypeTab supplierBusinessInfo">
												<!--业务-->
												<select class="searchItem" id="wholesaler-business-type-filter">
													<option value="all">业务</option>
													<option value="A">A</option>
													<option value="B">B</option>
												</select>
											</li>
											<li class="tabDetailTab">
												详情
											</li>
										</ul>
										<ul class="manageTabDetail">
											<!--test s-->
											<!--<li></li>
											<li></li>
											<li></li>
											<li></li>
											<li></li>
											<li></li>
											<li></li>
											<li></li>
											<li></li>
											<li></li>
											<li></li>
											<li></li>
											<li></li>
											<li></li>
											<li></li>
											<li></li>
											<li></li>
											<li></li>
											<li></li>
											<li></li>-->
											<!--test e-->
										</ul>
										<a href="javascript:void(0);" class="order-unfold">
											<img src="../img/unfold.png">点击进入下一页
										</a>
									</div>

								</div>
								<!--管理表e-->
								<!--添加/修改   s-->
								<div class="manageTabAction supplierManageAction">
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
										<li class="filterTitle">批发商:</li>
										<li>
											<label>Code</label>
											<input type="text" class="code" id="insert-wholesaler-code">
										</li>
										<li>
											<label>批发商名称</label>
											<input type="text"  class="supplierName" id="insert-wholesaler-name">
										</li>
										<li>
											<label>批发商电话</label>
											<input type="text"  class="supplierPhone" id="insert-wholesaler-phone">
										</li>
										<li>
											<label>批发商邮件</label>
											<input type="text" class="supplierEmail" id="insert-wholesaler-email">
										</li>
										<li>
											<label>联系人姓名</label>
											<input type="text" class="linkManName" id="insert-wholesaler-contact-person">
										</li>
										<li>
											<label>联系人电话</label>
											<input type="text"  class="linkManTel" id="insert-wholesaler-contact-person-phone">
										</li>
										<li>
											<label>地区</label>
											<input type="text" class="area" id="insert-wholesaler-region">
										</li>
										<li>
											<label>业务类型</label>
											<input type="text" class="businessType" id="insert-wholesaler-business-type">
										</li>
										<li>
											<label>详情</label>
											<textarea  rows="5" class="detailInfo" id="insert-wholesaler-description"></textarea>
										</li>
										<li class="actionFilerBox">
											<a href="javascript:void(0);" class="confirmAddInfo" id="insert-confirm">确认添加</a>
											<a href="javascript:void(0);" class="confirmReset" id="insert-reset">重置</a>
										</li>
									</ul>
									<!--修改-->
									<ul class="filerDetail amendTabMsg nm-hide">
										<li class="filterTitle">批发商:</li>
										<li>
											<label>Code</label>
											<input type="text" class="code" id="update-wholesaler-code">
										</li>
										<li>
											<label>批发商名称</label>
											<input type="text"  class="supplierName" id="update-wholesaler-name">
										</li>
										<li>
											<label>批发商邮件</label>
											<input type="text" class="supplierEmail" id="update-wholesaler-email">
										</li>
										<li>
											<label>联系人姓名</label>
											<input type="text" class="linkManName" id="update-wholesaler-contact-person">
										</li>
										<li>
											<label>联系人电话</label>
											<input type="text"  class="linkManTel" id="update-wholesaler-contact-person-phone">
										</li>
										<li>
											<label>地区</label>
											<input type="text" class="area" id="update-wholesaler-region">
										</li>
										<li>
											<label>业务类型</label>
											<input type="text" class="businessType" id="update-wholesaler-business-type">
										</li>
										<li>
											<label>详情</label>
											<textarea  rows="5" class="detailInfo" id="update-wholesaler-description"></textarea>
										</li>
										<li class="actionFilerBox">
											<a href="javascript:void(0);" class="confirmAmendInfo" id="update-confirm">确认修改</a>
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

					// $confirmBoxClass = "deleteConfirmBox";
			   		// $confirmButtonClass = "deleteActionConfirm";
			   		// $cancelButtonClass = "deleteActionCancel";
			   		// include('../confirmInfo.php');
				 ?>
			</div>
			<!--content e-->

		</div>
		<script src="../js/jquery.min.js" type="text/javascript"></script>
		<script src="../js/homePage/public.js" type="text/javascript"></script>
		<script src="../js/Management/manage.js"></script>
		<script src="../js/Management/wholesaler.js"></script>
		<script src="../js/jquery.searchableSelect.js" type="text/javascript"></script>
		<script src="../js/homePage/zebra_tooltips.js" type="text/javascript"></script>
		<script type="text/javascript">
			$(function() {
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
			});
		</script>
	</body>

</html>
