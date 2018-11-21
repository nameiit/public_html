window.onload = function heightRanges() {
	var leftHeight = $(".navInfo ul").height();
	var rightHeight = $(".theamInfo").height();
	if(rightHeight > leftHeight) {
		$(".navInfo ul").css("height", rightHeight);
	}
	if(rightHeight < leftHeight) {
		$(".navInfo ul").css("height", rightHeight);
	}
}

function heightRange() {
	var leftHeight = $(".navInfo ul").height();
	var rightHeight = $(".theamInfo").height();
	if(rightHeight > leftHeight) {
		$(".navInfo ul").css("height", rightHeight);
	}
	if(rightHeight < leftHeight) {
		$(".navInfo ul").css("height", rightHeight);
	}
}
//test  s
function performanceChart1() {
	var dom = document.getElementById("container"); //chart1
	var myChart = echarts.init(dom);
	var app = {};
	option = null;
	option = {
		xAxis: {
			type: 'category',
			data: ['January', 'February', 'March', 'April']
		},
		yAxis: {
			type: 'value'
		},
		series: [{
			data: [2.3, 2.8, 4, 5],
			type: 'line',
			color: '#033675'
		}],

	};

	if(option && typeof option === "object") {
		myChart.setOption(option, true);
	}
}
function performanceChart2() {
	var dom = document.getElementById("container2"); //chart2
	var myChart = echarts.init(dom);
	var app = {};
	option = null;
	option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
//		legend: {
//			data: ['机票', '散拼团','独立团']
//		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: {
			type: 'value',
			boundaryGap: [0, 0.1]
		},
		yAxis: {
			type: 'category',
			data: ['独立团', '散拼团', '机票'],

		},
		series: [
			{
				type: 'bar',
				data: [4.2,2.3,3.3],
				color: '#033675'
			},
			//width
			{
				type: 'bar',
				data: [],
				color: ''
			}
		]
	};;
	if(option && typeof option === "object") {
		myChart.setOption(option, true);
	}

}
//test  e
//点击进入下一页,加载更多
function loadMore(){
	$(".order-unfold").on("click", function() {
		var e = `
			<li>
				<dl>
					<dd class="time"></dd>
					<dd class="groupTour"></dd>
					<dd class="individualTour"></dd>
					<dd class="airTicket"></dd>
					<dd class="sum"></dd>
				</dl>
			</li>
			`;
		$(".rankingList").append(e);
		heightRange();
	});
}
function loadPerformanceInfo(){
	var timeList=$(".performanceTheam ul.rankingList").find("li.detailInfo").find("dd.time");//日期
	var groupTourList=$(".performanceTheam ul.rankingList").find("li.detailInfo").find("dd.groupTour");//独立团
	var individualTourList=$(".performanceTheam ul.rankingList").find("li.detailInfo").find("dd.individualTour");//散拼团
	var airTicketList=$(".performanceTheam ul.rankingList").find("li.detailInfo").find("dd.airTicket");//机票
	var sumList=$(".performanceTheam ul.rankingList").find("li.detailInfo").find("dd.sum");
	var selectBox=$(".performanceTheam .filterBox").find("li.dateItem").find("select");
	//默认显示：最近30天
	if(selectBox.find("option:selected").text()=="最近30天"){
		for(var i=0;i<timeList.length;i++){
				var dataInfo="2018-03-"+(i+1);//日期
				var groupTourInfo=parseInt("463"+i);//独立团
				var individualTourInfo=parseInt("449"+i);//散拼团
				var airTicketInfo=parseInt("522"+i);//机票
				var sumInfo=parseInt(groupTourInfo+individualTourInfo+airTicketInfo);//总和
				$(timeList[i]).text(dataInfo);
				$(groupTourList[i]).text(groupTourInfo);
				$(individualTourList[i]).text(individualTourInfo);
				$(airTicketList[i]).text(airTicketInfo);
				$(sumList[i]).text(sumInfo);
		}
	}
	$(".performanceTheam .filterBox li.actionItem").find("a").on("click",function(){
		if($(".performanceTheam .filterBox li.salesItem").find("input").val()!==""){
			//最近30天
			if(selectBox.find("option:selected").text()=="最近30天"){
				for(var i=0;i<timeList.length;i++){
				var dataInfo="2018-03-"+(i+1);//日期
				var groupTourInfo=parseInt("463"+i);//独立团
				var individualTourInfo=parseInt("449"+i);//散拼团
				var airTicketInfo=parseInt("522"+i);//机票
				var sumInfo=parseInt(groupTourInfo+individualTourInfo+airTicketInfo);//总和
				$(timeList[i]).text(dataInfo);
				$(groupTourList[i]).text(groupTourInfo);
				$(individualTourList[i]).text(individualTourInfo);
				$(airTicketList[i]).text(airTicketInfo);
				$(sumList[i]).text(sumInfo);
		}
			}
			//Last 3 days
			if(selectBox.find("option:selected").text()=="Last 3 days"){
				for(var i=0;i<timeList.length;i++){
					$(timeList[i]).text(" ");
					$(groupTourList[i]).text(" ");
					$(individualTourList[i]).text(" ");
					$(airTicketList[i]).text(" ");
					$(sumList[i]).text(" ");
				}

			}
			//Last Month
			if(selectBox.find("option:selected").text()=="Last Month"){
				for(var i=0;i<timeList.length;i++){
					$(timeList[i]).text(" ");$(timeList[i]).text(" ");
					$(groupTourList[i]).text(" ");
					$(individualTourList[i]).text(" ");
					$(airTicketList[i]).text(" ");
					$(sumList[i]).text(" ");
				}
			}
			//Last Year
			if(selectBox.find("option:selected").text()=="Last Year"){
				for(var i=0;i<timeList.length;i++){
					$(timeList[i]).text(" ");
					$(groupTourList[i]).text(" ");
					$(individualTourList[i]).text(" ");
					$(airTicketList[i]).text(" ");
					$(sumList[i]).text(" ");
				}
			}
			$(".performanceTheam ul.rankingList").find("li.detailInfo").removeClass("tab-active");
		}
		else{
//			alert('请确认"销售人员"信息已经输入');
		}

	});


	//查看
	$(".performanceTheam .filterBox li.actionItem").find("a").on("mousedown",function(){
		var Li=$(this).parent("li.actionItem");
			Li.addClass("actionItem-active");
			$("p.tips").css("visibility","visible");
			$("p.tips").find("label").text($(".salesItem").find("input").val());
	});
	$(".performanceTheam .filterBox li.actionItem").find("a").on("mouseup",function(){
		var Li=$(this).parent("li.actionItem");
			Li.removeClass("actionItem-active");
			setTimeout(function() {
				$(".actionItem-active").removeClass("actionItem-active");
			}, 70);
	});


}
//选中状态
/*function tabState(){
	$(".performanceTheam ul.rankingList").find("li.detailInfo").on("click",function() {
		if($(this).hasClass("tab-active")){
			$(this).removeClass("tab-active");
		}else{
			$(this).addClass("tab-active");
		}
	
	});
}*/
