function homePage() {
	weather(); //天气
	getThingsToDo();
	getNotice();
	getOrderAmount();
	getCalendarToDo();
	getSaleList();

	$(".homePage").find(".otherUserInfo.pendingItem").find("a.addNewItem").on("mousedown", function() {
		$(this).addClass("selected");
	});
	$(".homePage").find(".otherUserInfo.pendingItem").find("a.addNewItem").on("mouseup", function() {
		$(this).removeClass("selected");
	});
	var layer;
	layui.use('layer', function() {
		layer = layui.layer;
	});
}

function getSaleList() {
	var url = location.protocol.concat("//").concat(location.host).concat('/database/indexDB.php');
	$.ajax({
		url: url,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		type: 'POST',
		data: {
			action: 'getSaleList'
		},
		success: function(response) {
//			console.log(response);
			response = JSON.parse(response);
			if(response[0].length < 3) {
				response[0].push("暂无数据");
				response[0].push("暂无数据");
				response[0].push("暂无数据");
			}
			var $html = `
					<li>
						<a href="javascript:void(0);">
							<img src="img/top1_icon.png" />
							<label>` + response[0][0] + `</label>
						</a>
					</li>
					<li >
						<a href="javascript:void(0);">
							<img src="img/top3_icon.png" />
							<label>` + response[0][1] + `</label>
						</a>
					</li>
					<li >
						<a href="javascript:void(0);">
							<img src="img/top2_icon.png" />
							<label>` + response[0][2] + `</label>
						</a>
					</li>
					`;
			$("ul.cgrowth").append($html);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(textStatus, errorThrown);
		}
	});
}

function getOrderAmount() {
	var url = location.protocol.concat("//").concat(location.host).concat('/database/indexDB.php');
	$.ajax({
		url: url,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		type: 'POST',
		data: {
			action: 'getOrderAmount'
		},
		success: function(response) {
//			console.log(response);
			response = JSON.parse(response);
			totalorder = response[2];
			if(response[0] != null && response[1] != null) {
				totalamount = parseFloat(response[0]) + parseFloat(response[1]);
			} else if(response[0] != null) {
				totalamount = parseFloat(response[0]);
			} else if(response[1] != null) {
				totalamount = parseFloat(response[1]);
			} else {
				totalamount = 0;
			}

			grouporder = response[5];
			if(response[3] != null && response[4] != null) {
				groupamount = parseFloat(response[3]) + parseFloat(response[4]);
			} else if(response[3] != null) {
				groupamount = parseFloat(response[3]);
			} else if(response[4] != null) {
				groupamount = parseFloat(response[4]);
			} else {
				groupamount = 0;
			}

			individualorder = response[8];
			if(response[6] != null && response[7] != null) {
				individualamount = parseFloat(response[6]) + parseFloat(response[7]);
			} else if(response[6] != null) {
				individualamount = parseFloat(response[6]);
			} else if(response[7] != null) {
				individualamount = parseFloat(response[7]);
			} else {
				individualamount = 0;
			}

			airticketorder = response[11];
			if(response[9] != null && response[10] != null) {
				airticketamount = parseFloat(response[9]) + parseFloat(response[10]);
			} else if(response[9] != null) {
				airticketamount = parseFloat(response[9]);
			} else if(response[10] != null) {
				airticketamount = parseFloat(response[10]);
			} else {
				airticketamount = 0;
			}

			var $html = `
				<li>
					<label class="all">
						<i>全部</i>
					</label>
					<div class="order-txt">
						<p>
							订单：<span>` + totalorder + `</span>
						</p>
						<p>
							利润：<span>` + totalamount + `</span>
						</p>
					</div>
				</li>
				<li>
					<label class="groupTour"><i>独立团</i></label>
					<div class="order-txt">
						<p>
							订单：<span>` + grouporder + `</span>
						</p>
						<p>
							利润：<span>` + groupamount + `</span>
						</p>
					</div>
				</li>
				<li>
					<label class="individualTour"><i>散拼团</i></label>
					<div class="order-txt">
						<p>
							订单：<span>` + individualorder + `</span>
						</p>
						<p>
							利润：<span>` + individualamount + `</span>
						</p>
					</div>
				</li>
				<li>
					<label class="airTicket"><i>机票</i></label>
					<div class="order-txt">
						<p>
							订单：<span>` + airticketorder + `</span>
						</p>
						<p>
							利润：<span>` + airticketamount + `</span>
						</p>
					</div>
				</li>
				`
			$("ul.getorder").append($html);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(textStatus, errorThrown);
		}
	});
}
