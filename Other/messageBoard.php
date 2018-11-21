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
		<title>其他管理-留言查询</title>
		<link href="../css/otherInfo.css" type="text/css" rel="stylesheet" />
		<link href="../css/style.css" type="text/css" rel="stylesheet" />
		<link href="../css/messageBoard.css" type="text/css" rel="stylesheet" />
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
			<!--主内容区s-->
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
								<!--<dd>
									<a href="BusinessManage.php" >
										<label></label>业务管理
									</a>
								</dd>-->
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
									<a href="messageBoard.php" class="lab-active">
										<label></label>留言查询
									</a>
								</dd>
								<dd>
									<a href="Other.php">
										<label></label> 其他管理
									</a>
								</dd>
							</dl>
						</li>
					</ul>
				</div>
				<!--左侧导航   e-->
				<div class="theamInfo nm-right">
					<div class="showMsg otherManage">
						<div class="floor otherManageArea">
							<div class="groupMsg">
								<!--留言板   s-->
								<label class="theamTitle"> <i></i> 留言查询 </label>
								<!--留言板   e-->
								<!--Nav s-->
								<div class="filterMessage">
									<ul>
										<li>
											<input id="travel_agency" type="text" placeholder="搜索旅行社">
										</li>
										<li>
											<a href="javasript:void(0);" id="travel-agency-search">
												确认
											</a>
										</li>
									</ul>
								</div>
								<!--Nav e-->
								<!--message s-->
								<div class="messageBoard">
									<div class="leftMessageTab">
										<ul class="problemMsg">
											<li>
												<div class="checkbox checkbox-success" style="padding-left: 0px;">
													<input id="checkbox9" class="styled" type="checkbox" checked="checked">
													<label for="checkbox9">只查看未解决问题</label>
		             				</div>
											</li>
											<li><i></i><label>已解决</label></li>
										</ul>

										<ul class="messageCard">
											<li class="messageTitle">
												<dl>
													<dd class="askItem">提问</dd>
													<dd class="askTime">时间</dd>
													<dd class="problemContent">标题</dd>
													<dd class="moreInfo">提问内容</dd>
													<dd class="answerInfo">留言解答</dd>
												</dl>
											</li>
										</ul>
									</div>
									<div class="rightMeaaageTab">
										<!--申请机票行程   s-->
										<div class="applyTicketContent"  id="applyTicketContent"  hidden>
											<a href="javascript:void(0);" class="back">
												<img src="../img/back_icon.png" />
												返回订单列表
											</a>
											<p>
												<img src="../img/close.png"  class="close"/>
											</p>
											<div class="tab-content">
											<ul class="nav">
												<li class="selected"><a href="javascript:void(0);">单程</a></li>
												<li><a href="javascript:void(0);">往返</a></li>
												<li><a href="javascript:void(0);">多程</a></li>
											</ul>
											<!--单程   s-->
											<div class="tab-item selected">
												<form>
													<div class="departureInfo">
														<ul>
															<li>
																<dl>
																	<dd>
																	<span class="mark">
																		<img src="../img/required.png" />
																	</span>
																	<span class="title titleOffset">启程日期</span></dd>
																	<dd><input type="date" class="departureDate_single"/></dd>
																</dl>
															</li>
															<li>
																<dl>
																	<dd><span class="mark">
																		<img src="../img/required.png" />
																	</span><span class="title titleOffset">出发地</span></dd>
																	<dd><input type="text"  placeholder="请输入城市或者机场名称" class="departurePlace_single"/></dd>
																</dl>
															</li>
															<li>
																<dl>
																	<dd><span class="mark">
																		<img src="../img/required.png" />
																	</span><span class="title titleOffset">抵达地</span></dd>
																	<dd><input type="text"  placeholder="请输入城市或者机场名称" class="destination_single"/></dd>
																</dl>
															</li>
														</ul>
													</div>
													<div class="otherInfo">
														<ul>
															<li>
																<dl>
																	<dd><span class="title">指定出发时间</span></dd>
																	<dd><input type="time"  placeholder="如：12:30"  class="departureTime_single"/></dd>
																</dl>
															</li>
															<li>
																<dl>
																	<dd><span class="title">指定抵达时间</span></dd>
																	<dd><input type="time"  placeholder="如：12:30" class="arrivalTime_single"/></dd>
																</dl>
															</li>
															<li class="shippingSpace">
																<dl>
																	<dd><span class="title">舱位</span></dd>
																	<dd>
																		<select class="shippingSpaceInfo">
																			<option>经济舱</option>
																			<option>商务舱</option>
																			<option>头等舱</option>
																		</select>
																	</dd>
																</dl>
																<dl>
																	<dd><span class="title">人数</span></dd>
																	<dd>
																		<input type="text"  placeholder="1" class="peopleNum_single"/>
																	</dd>
																</dl>
															</li>
														</ul>
														<ul>
															<li class="otherRequest">
																<dl>
																	<dd>
																		<span class="title">其他需求</span>
																	</dd>
																	<dd>
																		<input type="text"  class="otherDemand_single"/>
																	</dd>
																</dl>
															</li>
															<li>
																<a href="javascript:void(0);" class="submit">提交</a>
															</li>
														</ul>
													</div>
												</form>
											</div>
											<!--单程    e-->
											<!--往返    s-->
											<div class="tab-item">
												<form>
													<div class="departureInfo">
														<ul>
															<li>
																<dl>
																	<dd><span class="mark">
																		<img src="../img/required.png" />
																	</span><span class="title titleOffset">启程日期</span></dd>
																	<dd><input type="date"  class="departureDate_round" /></dd>
																</dl>
															</li>
															<li>
																<dl>
																	<dd><span class="mark">
																		<img src="../img/required.png" />
																	</span><span class="title titleOffset">出发地</span></dd>
																	<dd class="roundTrip"><input type="text"  placeholder="请输入城市或者机场名称" class="departurePlace_round"/></dd>
																</dl>
															</li>
															<li>
																<dl>
																	<dd><span class="mark">
																		<img src="../img/required.png" />
																	</span><span class="title titleOffset" >返程日期</span></dd>
																	<dd><input type="date" class="returnDate_round"/></dd>
																</dl>
															</li>
															<li>
																<dl>
																	<dd><span class="mark">
																		<img src="../img/required.png" />
																	</span><span class="title titleOffset">抵达地</span></dd>
																	<dd class="roundTrip"><input type="text"  placeholder="请输入城市或者机场名称" class="destination_round"/></dd>
																</dl>
															</li>
														</ul>
													</div>
													<div class="otherInfo">
														<ul>
															<li>
																<dl>
																	<dd><span class="title">指定出发时间</span></dd>
																	<dd><input type="time"  placeholder="如：12:30" class="departureTime_round"/></dd>
																</dl>
															</li>
															<li>
																<dl>
																	<dd><span class="title">指定抵达时间</span></dd>
																	<dd><input type="time"  placeholder="如：12:30" class="arrivalTime_round"/></dd>
																</dl>
															</li>
															<li class="shippingSpace">
																<dl>
																	<dd><span class="title">舱位</span></dd>
																	<dd>
																		<select class="shippingSpaceInfo_round">
																			<option>经济舱</option>
																			<option>商务舱</option>
																			<option>头等舱</option>
																		</select>
																	</dd>
																</dl>
																<dl>
																	<dd><span class="title">人数</span></dd>
																	<dd>
																		<input type="text"  placeholder="1" class="peopleNum_round"/>
																	</dd>
																</dl>
															</li>
														</ul>
														<ul>
															<li class="otherRequest">
																<dl>
																	<dd>
																		<span class="title">其他需求</span>
																	</dd>
																	<dd>
																		<input type="text" class="otherDemand_round"/>
																	</dd>
																</dl>
															</li>
															<li>
																<a href="javascript:void(0);" class="submit">提交</a>
															</li>
														</ul>
													</div>
												</form>
											</div>
											<!--多程      s-->
											<div class="tab-item multipleJourney">
												<form>
													<div class="departureInfo">
														<ul>
															<li>
																<dl>
																	<dd><span class="mark">
																		<img src="../img/required.png" />
																	</span><span class="title titleOffset">启程日期</span></dd>
																	<dd><input type="date"  class="departureDate_multiple"/></dd>
																</dl>
															</li>
															<li>
																<dl>
																	<dd><span class="mark">
																		<img src="../img/required.png" />
																	</span><span class="title titleOffset">出发地</span></dd>
																	<dd><input type="text"  placeholder="请输入城市或者机场名称" class="departurePlace_multiple"/></dd>
																</dl>
															</li>
															<li>
																<dl>
																	<dd><span class="mark">
																		<img src="../img/required.png" />
																	</span><span class="title titleOffset">抵达地</span></dd>
																	<dd><input type="text"  placeholder="请输入城市或者机场名称" class="destination_multiple"/></dd>
																</dl>
															</li>
														</ul>
														<ul>
															<li>
																<dl>
																	<dd><span class="mark">
																		<img src="../img/required.png" />
																	</span><span class="title titleOffset">启程日期</span></dd>
																	<dd><input type="date"  class="departureDate_multiple"/></dd>
																</dl>
															</li>
															<li>
																<dl>
																	<dd><span class="mark">
																		<img src="../img/required.png" />
																	</span><span class="title titleOffset">出发地</span></dd>
																	<dd><input type="text"  placeholder="请输入城市或者机场名称" class="departurePlace_multiple"/></dd>
																</dl>
															</li>
															<li>
																<dl>
																	<dd><span class="mark">
																		<img src="../img/required.png" />
																	</span><span class="title titleOffset">抵达地</span></dd>
																	<dd><input type="text"  placeholder="请输入城市或者机场名称" class="destination_multiple"/></dd>
																</dl>
															</li>
														</ul>
													</div>
													<!---->
													<a href="javascript:void(0);" class="addJourney">+ 添加行程</a>
													<div class="otherInfo">
														<ul>
															<li>
																<dl>
																	<dd><span class="title">指定出发时间</span></dd>
																	<dd><input type="time"  placeholder="如：12:30" class="departureTime_multiple" /></dd>
																</dl>
															</li>
															<li>
																<dl>
																	<dd><span class="title">指定抵达时间</span></dd>
																	<dd><input type="time"  placeholder="如：12:30" class="arrivalTime_multiple"/></dd>
																</dl>
															</li>
															<li class="shippingSpace">
																<dl>
																	<dd><span class="title">舱位</span></dd>
																	<dd>
																		<select class="shippingSpaceInfo_multiple">
																			<option>经济舱</option>
																			<option>商务舱</option>
																			<option>头等舱</option>
																		</select>
																	</dd>
																</dl>
																<dl>
																	<dd><span class="title">人数</span></dd>
																	<dd>
																		<input type="text"  placeholder="1" class="peopleNum_multiple"/>
																	</dd>
																</dl>
															</li>
														</ul>
														<ul>
															<li class="otherRequest">
																<dl>
																	<dd>
																		<span class="title">其他需求</span>
																	</dd>
																	<dd>
																		<input type="text" class="otherDemand_multiple"/>
																	</dd>
																</dl>
															</li>
															<li>
																<a href="javascript:void(0);" class="submit">提交</a>
															</li>
														</ul>
													</div>
												</form>
											</div>
											<!--多程       e-->
											</div>
										</div>
										<!--申请机票行程   e-->
										<ul class="answerAndAdd">
											<li class="answerItem">解答</li>
											<li class="addItem selected">添加</li>
										</ul>
										<!--添加-->
										<div class="detailMsg addCard">
											<ul>
												<li class="questionInfoTxt">
													<label>标题</label>
													<a href="javascript:void(0);" class="applyTicket">
														申请机票行程
													</a>
													<!-- <ul class="titleCard">
														<li class="titleItem">
															<a href="javascript:void(0);">
																麻烦看看
																<img src="../img/close_icon.png" class="removeTitle"/>
															</a>
														</li>
														<li class="addBox">
															<input type="text" />
														</li>
														<li class="addTitle">
															<a href="javascript:void(0);">
																<img src="../img/add_icon.png" />
															</a>
														</li>
														<li class="remove">
															<a href="javascript:void(0);">
																<img src="../img/remove_icon.png" />
															</a>
														</li>

													</ul> -->
													<textarea class="titleInfo" id="question-title"></textarea>
												</li>
												<li class="moreInfoTxt">
													<label>提问内容</label>
													<!--<textarea></textarea>-->
													<div class="moreInfo_content" contenteditable="true" id="question-content"><br /></div>
												</li>
												<li class="actionFilerBox">
													<a href="javascript:void(0);" class="filterInfo" id="create-question">发&nbsp;&nbsp;&nbsp;&nbsp;布</a>
													<a href="javascript:void(0);" class="resetInfo">清&nbsp;&nbsp;&nbsp;&nbsp;空</a>
												</li>
											</ul>

										</div>
										<!--解答-->
										<div class="detailMsg answerCard">
											<ul>
												<li>
													<p class="answerTxt"></p>
													<p class="answerMoreInfo"></p>
												</li>
												<li>
													<label>回复</label>
													<textarea></textarea>
												</li>
												<li class="actionFilerBox">
													<a href="javascript:void(0);" class="replyInfo">回&nbsp;&nbsp;&nbsp;&nbsp;复</a>
													<a href="javascript:void(0);" class="resetInfo">清&nbsp;&nbsp;&nbsp;&nbsp;空</a>
												</li>
											</ul>

										</div>
										<!--已解决问题    展示-->
										<div class="detailMsg resolvedCard">
											<ul>
												<li>
													<p class="answerTxt"></p>
													<p class="answerMoreInfo"></p>
													<p class="answer"></p>
												</li>
												<li class="actionFilerBox">
													<a href="javascript:void(0);" class="replyInfo">确&nbsp;&nbsp;&nbsp;&nbsp;认</a>
													<a href="javascript:void(0);" class="resetInfo">清&nbsp;&nbsp;&nbsp;&nbsp;空</a>
												</li>
											</ul>

										</div>
									</div>

								</div>
								<!--message e-->
								<!--确认发布       s-->
								<div class="confirmUsersInfo">
										<p class="confirmTitle">
											<img src="../img/confirmInfo.png">
										</p>
										<p class="confirmNotice">确认是否发布?</p>
										<p class="actionBox">
											<button class="actionConfirm">确认</button>
											<button class="actionCancel">取消</button>
										</p>
								</div>
								<!--确认发布       e-->
							</div>

						</div>
					</div>
				</div>
			<!--主内容区e-->
		</div>
		<script src="../js/jquery.min.js" type="text/javascript"></script>
		<script src="../js/homePage/public.js" type="text/javascript"></script>
		<script src="../js/Other/messageBoard.js" type="text/javascript"></script>
		<script type="text/javascript">
			$(function(){
				var questions_list = [];
				messageBoard();
				/*
			     *销售人员的搜索列表
			     */
			    $("#travel_agency").on('focus', function() {
			        var current_id = $(this).attr('id');
			        var target = "travelAgency";
			        var url = location.protocol.concat("//").concat(location.host).concat('/database/autoComplete.php');
			        $.ajax({
			            url: url,
			            headers: {
			                'Content-Type': 'application/x-www-form-urlencoded'
			            },
			            type: 'post',
			            data: {
			                target: target
			            },
			            success: function(response) {
			                autocomplete(document.getElementById(current_id), JSON.parse(response));
			            },
			            error: function(jqXHR, textStatus, errorThrown) {
			                console.log(textStatus, errorThrown);
			            }
			        });
			        // 模拟数据
//			         autocomplete(document.getElementById(current_id), ['alex', 'terry']);
			    });
			});
		</script>
	</body>
</html>
