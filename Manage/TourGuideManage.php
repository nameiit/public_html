<?php
session_start();
if (!isset($_SESSION['login']) || $_SESSION['login'] != true) {
	header('location: ../login.php');
}

//function alert($msg) {
//		echo "<script type='text/javascript'>alert('$msg');</script>";
//}
//
//if ($_SESSION["group_name"] == 'normal' ||
//		$_SESSION["group_name"] == 'accounting' ||
//		$_SESSION["group_name"] == 'finance') {
//	alert("权限不足");
//	
//	if(isset($_SERVER['HTTP_REFERER'])) {
//  $previous = $_SERVER['HTTP_REFERER'];
//	}
//	echo "<script type='text/javascript'>window.location.href = '$previous';</script>";
//}
if ($_SESSION["group_name"] == 'normal' ||
		$_SESSION["group_name"] == 'accounting' ||
		$_SESSION["group_name"] == 'finance') {
//	alert("权限不足");
		permission();
	if(isset($_SERVER['HTTP_REFERER'])) {
    $previous = $_SERVER['HTTP_REFERER'];
	}
	echo "<script type='text/javascript'>window.location.href = '$previous';</script>";
}
function permission(){
	echo "<script type='text/javascript'>window.location.href='../permission.html';</script>";
}

 ?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<title>管理-导游管理</title>
		<link href="../css/manage.css" rel="stylesheet" type="text/css" />
		<link href="../css/style.css" type="text/css" rel="stylesheet" />
		<link href="../css/jquery.searchableSelect.css"  type="text/css" rel="stylesheet"/>
		<link href="../css/zebra_tooltips.css" type="text/css" rel="stylesheet"/>
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
						<li class="guanli title-active">
							<a href="javascript:void(0);" class="bm-title">
								<img src="../img/c_guanli.png"> 管理
							</a>
							<dl class="detailMsg">
								<dd>
									<a href="javascript:void(0);" class="lab-active">
										<label></label>人员管理
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
												员<i style="visibility: hidden;font-style: normal;">隐</i>工
												<img src="../img/rightArrow.png">
											</a>
										</li>
										<li class="guideItem">
											<a href="javascript:void(0);">
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
										<label class="markManage guideMark">导&nbsp;&nbsp;&nbsp;&nbsp;游</label>
										<ul class="manageTabTitle tourGuideTabTitle">
											<li class="tabId">
												#
											</li>
											<li class="tabName nameInfo">
												<select class="searchItem" id="tourist-guide-name-filter">
													<option value="all">姓名</option>
   											 	</select>
											</li>
											<li class="tabGender genderInfo">
												<select class="searchItem" id="tourist-guide-gender-filter">
													<option value="all">性别</option>
													<option value="M">男</option>
													<option value="F">女</option>
													<option value="UNKNOWN">未知</option>
   											 	</select>
											</li>
											<li class="tabAge">
												年龄
											</li>
											<li class="tabTel">
												移动电话
											</li>
											<li class="tabEmail">
												邮件
											</li>
											<li class="tabOtherContact">
												其他联系方式
											</li>
											<li class="tabDetail">
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
										<li class="filterTitle">导游:</li>
										<li>
											<label>姓</label>
											<input type="text" class="lastName" id="insert-tourist-guide-lname">
										</li>
										<li>
											<label>名</label>
											<input type="text" class="firstName" id="insert-tourist-guide-fname">
										</li>
										<li>
											<label>性别</label>
											<select class="gender" id="insert-tourist-guide-gender">
												<option value="UNKNOWN">UNKNOWN</option>
												<option value="M">男</option>
												<option value="F">女</option>
											</select>
										</li>
										<li>
											<label>年龄</label>
											<input type="text" class="age" id="insert-tourist-guide-age">
										</li>
										<li class="infoDistrict">
											<label>移动电话</label>
											<input type="text" class="cellphone" id="insert-tourist-guide-phone">
										</li>
										<li>
											<label>邮件</label>
											<input type="text" class="email" id="insert-tourist-guide-email">
										</li>
										<li>
											<label>其他联系方式</label>
											<select class="manage_otherContact" id="insert-tourist-guide-other-contact">
												<option value="wechat" selected>WeChat</option>
												<option value="QQ">QQ</option>
												<option value="facebook">Facebook</option>
											</select>
										</li>
										<li>
											<label class="manage_otherContactLab" id="insert-tourist-guide-other-contact-label">WeChat账号</label>
											<input type="text" class="otherContactNum" id="insert-tourist-guide-other-contact-number">
										</li>
										<li>
											<label>详情</label>
											<textarea rows="5" class="detailInfo" id="insert-tourist-guide-description"></textarea>
										</li>
										<li class="actionFilerBox">
											<a href="javascript:void(0);" class="confirmAddInfo" id="insert-confirm">确认添加</a>
											<a href="javascript:void(0);" class="confirmReset" id="insert-reset">重置</a>
										</li>
									</ul>
									<!--修改-->
									<ul class="filerDetail amendTabMsg nm-hide">
										<li class="filterTitle">导游:</li>
										<li>
											<label>姓</label>
											<input type="text" class="lastName" id="update-tourist-guide-lname">
										</li>
										<li>
											<label>名</label>
											<input type="text" class="firstName" id="update-tourist-guide-fname">
										</li>
										<li>
											<label>性别</label>
											<select class="gender" id="update-tourist-guide-gender">
												<option value="UNKNOWN">UNKNOWN</option>
												<option value="M">男</option>
												<option value="F">女</option>
											</select>
										</li>
										<li>
											<label>年龄</label>
											<input type="text" class="age" id="update-tourist-guide-age">
										</li>
										<li class="infoDistrict">
											<label>移动电话</label>
											<input type="text" class="cellphone" id="update-tourist-guide-phone">
										</li>
										<li>
											<label>邮件</label>
											<input type="text" class="email" id="update-tourist-guide-email">
										</li>
										<li>
											<label>其他联系方式</label>
											<select class="manage_otherContact" id="update-tourist-guide-other-contact">
												<option value="wechat">WeChat</option>
												<option value="QQ">QQ</option>
												<option value="facebook">Facebook</option>
											</select>
										</li>
										<li>
											<label class="manage_otherContactLab" id="update-tourist-guide-other-contact-label">WeChat账号</label>
											<input type="text" class="otherContactNum" id="update-tourist-guide-other-contact-number">
										</li>
										<li>
											<label>详情</label>
											<textarea rows="5" class="detailInfo" id="update-tourist-guide-description"></textarea>
										</li>
										<li class="actionFilerBox">
											<a href="javascript:void(0);" class="confirmAmendInfo" id="update-confirm">确认修改</a>
											<a href="javascript:void(0);" class="confirmReset" id="update-reset">重置</a>
										</li>
									</ul>
								</div>
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
		<script src="../js/Management/touristguide.js"></script>
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
				/*06/27 s*/
				$("ul.manageTabActionNav").find("li").find("a").on("click",function(){
					$(".manageTabAction").find("ul.filerDetail").find("li").find("input").val("");
					$(".manageTabAction").find("ul.filerDetail").find("li").find("textarea").val("");
				});
			});
		</script>
	</body>
</html>
