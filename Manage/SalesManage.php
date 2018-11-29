<?php
session_start();
if (!isset($_SESSION['login']) || $_SESSION['login'] != true) {
	header('location: ../login.php');
}

function alert($msg) {
		echo "<script type='text/javascript'>alert('$msg');</script>";
}

if ($_SESSION["group_name"] == 'normal' ||
		$_SESSION["group_name"] == 'accounting' ||
		$_SESSION["group_name"] == 'finance') {
	alert("权限不足");
	if(isset($_SERVER['HTTP_REFERER'])) {
    $previous = $_SERVER['HTTP_REFERER'];
	}
	echo "<script type='text/javascript'>window.location.href = '$previous';</script>";
}
 ?>
<!DOCTYPE html>
<html>

	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<title>管理-销售管理</title>
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
												员<i style="visibility: hidden;font-style: normal;">隐</i>工
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
											<a href="travelAgencyManage.php">
												旅行社
												<img src="../img/rightArrow.png" />
											</a>
										</li>
									</ul>
								</div>
								<!--管理导航   e-->
								<!--管理表s-->
								<div class="manageTab salesManageTab">
									<div class="tabCard">
										<label class="markManage salesMark">员&nbsp;&nbsp;&nbsp;&nbsp;工</label>
										<ul class="manageTabTitle salesTitle">
											<li class="tabId">#</li>
											<li class="codeInfo">
												<select class="searchItem" id="salesperson-code-filter">
													<option value="all">Code</option>
												</select>
											</li>
											<li class="tabName nameInfo">
												<select class="searchItem" id="salesperson-name-filter">
													<option value="all">姓名</option>
												</select>
											</li>
											<li class="tabGender genderInfo">
												<!--性别-->
												<select class="searchItem" id="salesperson-gender-filter">
													<option value="all">性别</option>
													<option value="M">男</option>
													<option value="F">女</option>
													<option value="UNKNOWN">未知</option>
												</select>
											</li>
											<li class="tabTel">移动电话</li>
											<li class="divisionInfo">
												<select class="searchItem" id="salesperson-department-filter">
													<option value="all">分部</option>
													<option value="Beijing">北京</option>
													<option value="Xian">西安</option>
													<option value="Chengdu">成都</option>
													<option value="Manhattan">曼哈顿</option>
													<option value="Flushing">法拉盛</option>
   											 	</select>
   											 	<!--分部-->
											</li>
											<li class="tabEmail">邮件</li>
											<li class="tabDetail">详情</li>
											<li class="tabOffice">
												<select class="searchItem" id="salesperson-status-filter">
													<option value="all">状态</option>
													<option value="Y">就职</option>
													<option value="N">离职</option>
												</select>
											</li>
										</ul>
										<ul class="manageTabDetail">

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
										<li class="filterTitle">员工:</li>
										<li>
											<label>姓</label>
											<input type="text" class="lastName" id="insert-salesperson-lname">
										</li>
										<li>
											<label>名</label>
											<input type="text" class="firstName" id="insert-salesperson-fname">
										</li>
										<li>
											<label>绑定用户名</label>
											<input type="text" class="code" id="insert-salesperson-code">
										</li>

										<li>
											<label>性别</label>
											<select class="gender" id="insert-salesperson-gender">
												<option value="UNKNOWN">UNKNOWN</option>
												<option value="M">男</option>
												<option value="F">女</option>
											</select>
										</li>
										<li class="infoDistrict">
											<label>移动电话</label>
											<input type="text" class="cellphone" id="insert-salesperson-phone">
										</li>
										<li>
											<label>分部</label>
											<select class="division" id="insert-salesperson-department">
												<option value="Beijing">北京</option>
												<option value="Xian">西安</option>
												<option value="Chengdu">成都</option>
												<option value="Manhattan">曼哈顿</option>
												<option value="Flushing">法拉盛</option>
											</select>
										</li>
										<li>
											<label>邮件</label>
											<input type="text" class="email" id="insert-salesperson-email">
										</li>
										<li>
											<label>详情</label>
											<textarea  rows="5" class="detailInfo" id="insert-salesperson-description"></textarea>
										</li>
										<li class="actionFilerBox">
											<a href="javascript:void(0);" class="confirmAddInfo" id="insert-confirm">确认添加</a>
											<a href="javascript:void(0);" class="confirmReset" id="insert-reset">重置</a>
										</li>
									</ul>
									<!--修改-->
									<ul class="filerDetail amendTabMsg nm-hide amendBox">
										<li class="filterTitle">员工:</li>
										<li>
											<label>姓</label>
											<input type="text" class="lastName" id="update-salesperson-lname">
										</li>
										<li>
											<label>名</label>
											<input type="text" class="firstName" id="update-salesperson-fname">
										</li>
										<li>
											<label>Code</label>
											<input type="text" class="code" id="update-salesperson-code">
										</li>

										<li>
											<label>性别</label>
											<select class="gender" id="update-salesperson-gender">
												<option value="UNKNOWN">UNKNOWN</option>
												<option value="M">男</option>
												<option value="F">女</option>
											</select>
										</li>
										<li class="infoDistrict">
											<label>移动电话</label>
											<input type="text" class="cellphone" id="update-salesperson-phone">
										</li>
										<li>
											<label>分部</label>
											<select class="division" id="update-salesperson-department">
												<option value="Beijing">北京</option>
												<option value="Xian">西安</option>
												<option value="Chengdu">成都</option>
												<option value="Manhattan">曼哈顿</option>
												<option value="Flushing">法拉盛</option>
											</select>
										</li>
										<li>
											<label>邮件</label>
											<input type="text" class="email" id="update-salesperson-email">
										</li>
										<li>
											<label>详情</label>
											<textarea  rows="5" class="detailInfo" id="update-salesperson-description"></textarea>
										</li>
										<li class="actionFilerBox">
											<a href="javascript:void(0);" class="confirmAmendInfo" id="update-confirm">确认修改</a>
											<a href="javascript:void(0);" class="deleteInfo" id="delete-confirm">离职</a>
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
		<script src="../js/Management/manage.js"></script>
		<script src="../js/Management/salesperson.js"></script>
		<script src="../js/jquery.searchableSelect.js" type="text/javascript"></script>
		<script src="../js/homePage/zebra_tooltips.js" type="text/javascript"></script>
		<script type="text/javascript">
			 		var dWidth=$("ul.salesTitle").outerWidth();
			 		var cellWidth=$("li.tabId").outerWidth()+$("li.codeInfo").outerWidth()
			 			+$("li.tabName").outerWidth()+$("li.tabGender").outerWidth()+$("li.tabTel").outerWidth()+$("li.divisionInfo").outerWidth()+$("li.tabEmail").outerWidth()+$("li.tabDetail").outerWidth();
			 			$("ul.salesTitle").find(".tabOffice").css("width",dWidth-cellWidth);
			 			$("ul.salesTitle").find(".tabOffice").css("width",dWidth-cellWidth);
			 			//左右两侧的悬浮
				 	$(function(){
				 		$(document).scroll(function(){
							winScrollTop = $(window).scrollTop();
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
