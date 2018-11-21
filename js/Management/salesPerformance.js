

$(document).ready(function() {
    salesAction();

    /*
     *   销售人员的搜索列表
     */
    $("#performance-filter-salesperson").on('focus', function() {
        var current_id = $(this).attr('id');
        var url = location.protocol.concat("//").concat(location.host).concat('/database/autoComplete.php');
        $.ajax({
            url: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: 'post',
            data: {
                target: "salesperson"
            },
            success: function(response) {
                autocomplete(document.getElementById(current_id), JSON.parse(response));
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });

        // autocomplete(document.getElementById(current_id), ['abc', '123']);
    });


    // function loadDisplayInfo() {
    //     var time_filter = $("#time_filter").val();
    //     var startTime = ($("#startTime").val() == "") ? getTime(new Date(), time_filter, 11) : $("#startTime").val();
    //     var endTime = ($("#endTime").val() == "") ? formatDate(new Date()) : $("#endTime").val();
    //
    //     $("ul.rankingList1 li.detailInfo").remove();
    //
    //     var url = location.protocol.concat("//").concat(location.host).concat('/database/Management/SalesPerformance.php');
    //     $.ajax({
    //         url: url,
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded'
    //         },
    //         type: 'POST',
    //         data: {
    //             action: 'getGeneralPerformance',
    //             time_filter: time_filter,
    //             start_date: startTime,
    //             end_date: endTime
    //         },
    //         success: function(response) {
    //             console.log(response);
    //             response = JSON.parse(response);
    //             for (var i = 0; i < response[0].length; i++) {
    //                 var $html = `
    //                     <li class="detailInfo">
    //                         <dl>
    //                             <dd class="time">` + response[0][i] + `</dd>
    //                             <dd class="groupTour">` + response[1][i] + `</dd>
    //                             <dd class="individualTour">` + response[2][i] + `</dd>
    //                             <dd class="airTicket">` + response[3][i] + `</dd>
    //                             <dd class="sum">` + response[4][i] + `</dd>
    //                         </dl>
    //                     </li>
    //                 `
    //                 $("ul.rankingList1").append($html);
    //             }
    //
    //             //------------------------------0713mw start
    //
    //             initialgraph(response);
    //
    //
    //
    //             //------------------------------------------- end
    //
    //
		// 		heightRange();
    //
    //         },
    //         error: function(jqXHR, textStatus, errorThrown) {
    //             console.log(textStatus, errorThrown);
    //         }
    //     });
    // }

    // loadDisplayInfo();
    loadSalesPerformance(localStorage.getItem('sales_code'));
    $("#time_filter, #startTime, #endTime").on('change', function() {
        // loadDisplayInfo();
        loadSalesPerformance(localStorage.getItem('sales_code'));
    });
});



/*
 *   Retuan date in 'YYYY-MM-DD' format
 */
function formatDate(date) {
    var month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function getTime(date, time_filter, diff) {
    var month = "";
    if (time_filter == 'daily') {
        date.setDate(date.getDate() - diff);
    } else if (time_filter == 'monthly') {
        month = date.getMonth() - diff;
        date.setDate(1);
        date.setMonth(month);
    } else if (time_filter == 'seasonly') {
        month = date.getMonth() - diff * 3 - 2;
        date.setDate(1);
        date.setMonth(month);
    } else if (time_filter == 'hyearly') {
        month = date.getMonth() - diff * 6 - 5;
        date.setDate(1);
        date.setMonth(month);
    } else if (time_filter == 'yearly') {
        var year = date.getFullYear() - diff;
        date.setYear(year);
        date.setDate(1);
        date.setMonth(0);
    }
    return formatDate(date);
}

function loadSalesPerformance(salesperson) {
    var startTime = ($("#startTime").val() == "") ? getTime(new Date(), $("#time_filter").val(), 11) : $("#startTime").val();
    var endTime = ($("#endTime").val() == "") ? formatDate(new Date()) : $("#endTime").val();
    var data = {
        action: 'getGeneralPerformance',
        salesperson: salesperson,
        time_filter: $("#time_filter").val(),
        start_date: startTime,
        end_date: endTime
    }

    $("ul.rankingList1 li.detailInfo").remove();

    var url = location.protocol.concat("//").concat(location.host).concat('/database/Management/SalesPerformance.php');
    $.ajax({
        url: url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        type: 'POST',
        data: data,
        success: function(response) {
            response = JSON.parse(response);
            for (var i = 0; i < response[0].length; i++) {
                var $html = `
                    <li class="detailInfo">
                        <dl>
                            <dd class="time">` + response[0][i] + `</dd>
                            <dd class="groupTour">` + response[1][i] + `</dd>
                            <dd class="individualTour">` + response[2][i] + `</dd>
                            <dd class="airTicket">` + response[3][i] + `</dd>
                            <dd class="sum">` + response[4][i] + `</dd>
                        </dl>
                    </li>
                `
                $("ul.rankingList1").append($html);
            }

            //----------------------------------- 0713mw

            initialgraph(response);



            //---------------------------------------end
			heightRange();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }






    });
}

//加/减
function salesAction() {
    $(".optionItem").on("mousedown", function() {
        $(this).addClass("option-active");
    });
    $(".optionItem").on("mouseup", function() {
        $(this).removeClass("option-active");
    });
    $("ul.salesNav").find("li").find("a.confirmBtn").on("mousedown", function() {
        $(this).addClass("selected");
    });
    $("ul.salesNav").find("li").find("a.confirmBtn").on("mouseup", function() {
        $(this).removeClass("selected");
    });


    //添加
    $(".plusItem").on("click", function() {
        $("li.salesFilter").css("visibility", "visible");
        // $("li.salesFilter").find("input").on("keydown", function() {
        //     if (event.keyCode == 13) {
        //         var salesNameTxt = $.trim($("li.salesFilter").find("input").val())
        //         var salesInfo = $.trim($(".salesName").text());
        //         if ($(".salesName").length < 6) {
        //             if (salesInfo.indexOf(salesNameTxt) !== -1) {
        //                 // alert("输入的销售人员信息不能一致");
        //                 $("li.salesFilter").find("input").val("");
        //             } else {
        //                 var e = `<li class="salesName">` + salesNameTxt + `</li>`;
        //                 $(".rightInfo ul").append(e);
        //                 //当前为背景为灰色
        //                 $("li.salesName:last").addClass("selected").siblings("li.salesName").removeClass("selected");
        //                 salesNameState(); //选中状态
        //                 $("#performance-filter-salesperson").val("");
        //                 loadSalesPerformance(salesNameTxt);
        //             }
        //         } else {
        //             alert("最多添加6人");
        //         }
        //     }
        // });
        minusAction();
        //确认添加:
        $("ul.salesNav").find("li").find("a.confirmBtn").on("click", function() {
            var salesNameTxt = $.trim($("li.salesFilter").find("input").val());
            var salesInfo = $.trim($(".salesName").text());
            if (salesInfo.indexOf(salesNameTxt) !== -1) {
                alert("输入的销售人员信息不能一致");
                $("li.salesFilter").find("input").val("");
            } else {
                var e = `<li class="salesName">` + salesNameTxt + `</li>`;
                $(".rightInfo ul").append(e);
                //当前为背景为灰色
                $("li.salesName:last").addClass("selected").siblings("li.salesName").removeClass("selected");
                salesNameState(); //选中状态
                $("#performance-filter-salesperson").val("");
                loadSalesPerformance(salesNameTxt);
            }
        });
    });
}

//移除
function minusAction() {
    $(".minusItem").on("click", function() {
        //移除当前选中的元素
        $(".rightInfo ul").find("li.salesName.selected").remove("");
        $("li.salesFilter").find("input").val("");
        //移除至只剩下一个
        if ($(".rightInfo ul").find("li.salesName").length == 1) {
            $("ul.rankingList1").fadeIn("slow");
            $("ul.rankingList2").css("display", "none");
        }
        if ($(".rightInfo ul").find("li.salesName").length > 1) {
            $(".salesDetail").empty();
        }
        //全部移除
        if ($(".rightInfo ul").find("li.salesName").length < 1) {
            $("ul.rankingList1").fadeIn("slow");
            $("ul.rankingList2").css("display", "none");
        }
        salesAction();
    });
}

function selectSales() {
    var startTime = ($("#startTime").val() == "") ? getTime(new Date(), $("#time_filter").val(), 11) : $("#startTime").val();
    var endTime = ($("#endTime").val() == "") ? formatDate(new Date()) : $("#endTime").val();
    var data = {
        action: 'getSpecificPerformance',
        time_filter: $("#time_filter").val(),
        start_date: startTime,
        end_date: endTime
    }
    var salespersons = [];
    for (var i = 0; i < $("li.salesName.selected").length; i++) {
        salespersons.push($($("li.salesName.selected")[i]).text());
    }
    Object.assign(data, {
        salespersons: JSON.stringify(salespersons)
    });
    multipleSalespersonChose(data);

    document.getElementById("type_filter").style.visibility = "visible";



    //--------------0713mw
    bargraph(data);
    //--------------end
}


//销售人员的选中状态
function salesNameState() {
    $(".rightInfo").find("ul").find("li.salesName").unbind("click").on("click", function() {
        if (!$(this).hasClass("selected")) {
            $(this).addClass("selected");
            salesChart(); //表1和表2的切换
            heightRange();

            $("ul.rankingList2 li.detailInfo").remove();

            if ($("li.salesName.selected").length >= 2) {
                selectSales();
            } else {
                var salesperson = $("li.salesName.selected")[0].innerHTML;
                loadSalesPerformance(salesperson);
            }
        } else {
            $(this).removeClass("selected");

            $("ul.rankingList2 li.detailInfo").remove();

            if ($("li.salesName.selected").length >= 2) {
                selectSales();
            } else if ($("li.salesName.selected").length == 1) {
                //当前选中只剩下一个元素时
                $("ul.rankingList1").fadeIn("slow");
                $("ul.rankingList2").css("display", "none");
                var salesperson = $("li.salesName.selected")[0].innerHTML;
                loadSalesPerformance(salesperson);
            } else {
                loadSalesPerformance();
            }
        }
    });
}

//销售人员业绩信息表
function salesChart() {
    var selectedNum = $(".rightInfo ul").find("li.salesName.selected").length;
    var timeList = $("ul.rankingList1").find("li.detailInfo").find("dd.time"); //日期
    var groupTourList = $("ul.rankingList1").find("li.detailInfo").find("dd.groupTour"); //独立团
    var individualTourList = $("ul.rankingList1").find("li.detailInfo").find("dd.individualTour"); //散拼团
    var airTicketList = $("ul.rankingList1").find("li.detailInfo").find("dd.airTicket"); //机票
    var sumList = $("ul.rankingList1").find("li.detailInfo").find("dd.sum");
    var selectBox = $(".leftInfo").find("li").find("select");
    //当前销售人员为1条时：
    if (selectedNum == 1) {
        $("ul.rankingList1").fadeIn("slow");
        $("ul.rankingList2").css("display", "none");
        //默认按天显示
        if ($.trim(selectBox.find("option:selected").text()) == "每日") {
            for (var i = 0; i < timeList.length; i++) {
                var dataInfo = "2018-03-" + (i + 1); //日期
                var groupTourInfo = parseInt("463" + i); //独立团
                var individualTourInfo = parseInt("449" + i); //散拼团
                var airTicketInfo = parseInt("522" + i); //机票
                var sumInfo = parseInt(groupTourInfo + individualTourInfo + airTicketInfo); //总和
                $(timeList[i]).text(dataInfo);
                $(groupTourList[i]).text(groupTourInfo);
                $(individualTourList[i]).text(individualTourInfo);
                $(airTicketList[i]).text(airTicketInfo);
                $(sumList[i]).text(sumInfo);
            }
        }
        selectDate(); //日期选择
    }
    //销售人员表中的销售人员为多条时:
    else if (selectedNum > 1) {
        $("ul.rankingList2").fadeIn("slow");
        $("ul.rankingList1").css("display", "none");
    }
}
//销售人员表中的销售人员为多条时:
function moreSalesInfo(salesList, i) {
    //销售人员名字
    var salesBox = $("dd.sales").find("dl.salesDetail");
    var salesBoxInfo = `
					<dd class="salesInfo">` + salesList + `
					</dd>
							`;
    salesBox.append(salesBoxInfo);

    //独立团部分
    var groupTourBox = $("dd.groupTour").find("dl.salesDetail");
    var data = [140, 155, 133];
    var maxItem = Math.max.apply(null, data);
    var groupTourInfo = salesBoxInfo = `
					<dd class="groupInfo">` + data[i] + `
					</dd>
							`;
    groupTourBox.append(groupTourInfo);
    if (data[i] == maxItem) {
        $(groupTourBox.find("dd")[i]).addClass("max"); //最大值标记为红色
    }
    var newHeight = $("dd.sales").height();
    $("dd.sales").siblings("dd").css("height", newHeight);
    heightRange();
}


function autoWrap() {
    var detailCell = $(".performanceTheam").find("ul.rankingList2").find("li.detailInfo").find("dd.cellBox");
    for (var i = 0; i < detailCell.length; i++) {
        if ($(detailCell[i]).height() >= 32) {
            var currentHeight = $(".performanceTheam").find("ul.rankingList2").find("li.detailInfo").eq(i).height();
            $(".performanceTheam").find("ul.rankingList2").find("li.detailInfo").eq(i).find("dd.cellBox").css({
                "height": currentHeight,
                "line-height": currentHeight + "px"
            });
            $(".performanceTheam").find("ul.rankingList2").find("li.detailInfo").eq(i).find("dd.time.cellBox").find("dl").find("dd")
                .css("cssText", "height:" + currentHeight + "px" + "!important ;" + "line-height:" + currentHeight + "px" + "!important");
        }
    }
}


function multipleSalespersonChose(data) {
    var salespersons = JSON.parse(data['salespersons']);
    $("ul.rankingList2 li.detailInfo").remove();

    var url = location.protocol.concat("//").concat(location.host).concat('/database/Management/SalesPerformance.php');
    $.ajax({
        url: url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        type: 'POST',
        data: data,
        success: function(response) {
            response = JSON.parse(response);

            var dateInfo = [];
            var salespersonInfo = [];
            var groupSum = [];
            var indivSum = [];
            var airTicketSum = [];
            var totalSum = [];

            for (var i = 0; i < response[0][0].length; i++) {
                dateInfo.push(response[0][0][i]);
            }

            for (var i = 0; i < response.length; i++) {
                salespersonInfo.push(salespersons[i]);
                groupSum.push(response[i][1]);
                indivSum.push(response[i][2]);
                airTicketSum.push(response[i][3]);
                totalSum.push(response[i][4]);
            }

            console.log("groupSum: ");

            console.log(groupSum);


            for (var i = 0; i < dateInfo.length; i++) {
                $("ul.rankingList2").append(
                    `
                    <li class="detailInfo">
                        <dl>
                            <dd class="time cellBox">
                                <dl class="salesDetail">
                                    <dd>` + dateInfo[i] + `</dd>
                                </dl>
                            </dd>
                            <dd class="sales cellBox">
                                <dl class="salesDetail"></dl>
                            </dd>
                            <dd class="groupTour cellBox">
                                <dl class="salesDetail"></dl>
                            </dd>
                            <dd class="individualTour cellBox">
                                <dl class="salesDetail"></dl>
                            </dd>
                            <dd class="airTicket cellBox">
                                <dl class="salesDetail"></dl>
                            </dd>
                            <dd class="sum cellBox">
                                <dl class="salesDetail"></dl>
                            </dd>
                        </dl>
                    </li>
                    `
                );
            }

            for (var i = 0; i < dateInfo.length; i++) {
                for (var j = 0; j < groupSum.length; j++) {
                    if (j != 0) {
                        $("ul.rankingList2 li.detailInfo dd.time:eq(" + i + ") dl.salesDetail").append(`<dd></dd>`);
                    }
                    $("ul.rankingList2 li.detailInfo dd.sales:eq(" + i + ") dl.salesDetail").append(`<dd class="groupInfo" >` + salespersonInfo[j] + `</dd>`);
                    $("ul.rankingList2 li.detailInfo dd.groupTour:eq(" + i + ") dl.salesDetail").append(`<dd class="groupInfo" id ="groupsum` + i + `` + j + `">` + groupSum[j][i] + `</dd>`);
                    $("ul.rankingList2 li.detailInfo dd.individualTour:eq(" + i + ") dl.salesDetail").append(`<dd class="indivInfo" id ="indivsum` + i + `` + j + `">` + indivSum[j][i] + `</dd>`);
                    $("ul.rankingList2 li.detailInfo dd.airTicket:eq(" + i + ") dl.salesDetail").append(`<dd class="airInfo" id ="airsum` + i + `` + j + `">` + airTicketSum[j][i] + `</dd>`);
                    $("ul.rankingList2 li.detailInfo dd.sum:eq(" + i + ") dl.salesDetail").append(`<dd class="totalInfo" id ="totalsum` + i + `` + j + `">` + totalSum[j][i] + `</dd>`);
                }
            }
            heightRange();


            var groupid = [];
            var individ = [];
            var airid = [];
            var totalid = [];


            for (var i = 0; i < dateInfo.length; i++) {
              var groupmax =0;
              var indivmax =0;
              var airmax =0;
              var totalmax =0;
              var groupind =0;
              var indivind =0;
              var airind =0;
              var totalind =0;
              for (var j = 0; j < groupSum.length; j++) {
                if (groupmax<parseFloat(groupSum[j][i])){
                  groupmax = parseFloat(groupSum[j][i]);
                  groupind = j;

                }
              }

              for (var j = 0; j < indivSum.length; j++) {
                if (indivmax<parseFloat(indivSum[j][i])){
                  indivmax = parseFloat(indivSum[j][i]);
                  indivind = j;

                }
              }

              for (var j = 0; j < airTicketSum.length; j++) {
                if (airmax<parseFloat(airTicketSum[j][i])){
                  airmax = parseFloat(airTicketSum[j][i]);
                  airind = j;

                }
              }

              for (var j = 0; j < totalSum.length; j++) {
                if (totalmax<parseFloat(totalSum[j][i])){
                  totalmax = parseFloat(totalSum[j][i]);
                  totalind = j;

                }
              }
              groupid.push(groupind);
              individ.push(indivind);
              airid.push(airind);
              totalid.push(totalind);
            }
            //console.log(groupid);

            for (var jie = 0; jie < groupid.length; jie++) {

              var gid = "groupsum"+jie+groupid[jie];
              var did = "indivsum"+jie+individ[jie];
              var aid = "airsum"+jie+airid[jie];
              var tid = "totalsum"+jie+totalid[jie];

              document.getElementById(gid).style.color="red";
              document.getElementById(did).style.color="red";
              document.getElementById(aid).style.color="red";
              document.getElementById(tid).style.color="red";

            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}



//---------------------------------------------------------0713 mw


function linegraph(datar){

  var ctx = document.getElementById("total-chart").getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: datar[0],
          datasets: [{
              data: datar[1],
              label: "独立团",
              borderColor: "#3e95cd",
              fill: false
          }, {
              data: datar[2],
              label: "散拼团",
              borderColor: "#8e5ea2",
              fill: false
          }, {
              data: datar[3],
              label: "机票",
              borderColor: "#3cba9f",
              fill: false
          }, {
              data: datar[4],
              label: "总体",
              borderColor: "#000080",
              fill: false
          }]
      },
      options: {
          title: {
              display: true
          }
      }
  });


}



function initialgraph(vardata){

  document.getElementById("type_filter").style.visibility = "hidden";

  response = vardata;

  response[0].reverse();
  response[1].reverse();
  response[2].reverse();
  response[3].reverse();
  response[4].reverse();

  var dateInfo = [];
  var salespersonInfo = [];
  var groupSum = [];
  var indivSum = [];
  var airTicketSum = [];
  var totalSum = [];

  for (var i = 0; i < response[0].length; i++) {
      dateInfo.push(response[0][i]);

  }
  //console.log(response);

  for (var i = 0; i < response[0].length; i++) {
      //salespersonInfo.push(salespersons[i]);

      groupSum.push(response[1][i]);
      indivSum.push(response[2][i]);
      airTicketSum.push(response[3][i]);
      totalSum.push(response[4][i]);
  }

  var dataarr = [];

  dataarr.push(dateInfo);
  dataarr.push(groupSum);
  dataarr.push(indivSum);
  dataarr.push(airTicketSum);
  dataarr.push(totalSum);

  linegraph(dataarr);


  var datasum = [];

  var sum1 = 0;
  var sum2 =0;
  var sum3 = 0;
  var sum4 = 0;

  for(var sind = 0; sind<groupSum.length;sind++){


      sum1 += Number(groupSum[sind]);
      sum2 += Number(indivSum[sind])
      sum3 += Number(airTicketSum[sind])
      sum4 += Number(totalSum[sind]);

  }

  var sumst = [];

  for(var sind = 0; sind<groupSum.length;sind++){


      var psum1 = Number(groupSum[sind])+Number(indivSum[sind])+Number(airTicketSum[sind]);
      sumst.push(psum1);
  }

  var percent1 = [];
  var percent2 = [];
  var percent3= [];
  var percent4 = [];

  for (var j = 0; j<groupSum.length;j++){


    if(sum1!=0){
      percent1.push(Number(groupSum[j])/sumst[j]);

    }else{
      percent1.push(0);
    }
    if(sum2!=0){
      percent2.push(Number(indivSum[j])/sumst[j]);

    }else{
      percent2.push(0);
    }
    if(sum3!=0){
      percent3.push(Number(airTicketSum[j])/sumst[j]);

    }else{
      percent3.push(0);
    }

  }

  var datatemp = [];

  //dateInfo.push("sum");
  //percent1.push((sum1/sum4));
  //percent2.push((sum2/sum4));
  //percent3.push((sum3/sum4));

  var dousumdata = [];
  dousumdata.push(sum1);
  dousumdata.push(sum2);
  dousumdata.push(sum3);

  var bcolor = ["#3e95cd", "#FF6347", "#3cba9f"];


  DoughnutChartgraph(dousumdata,bcolor);
  datasum.push(dateInfo);
  datatemp.push(percent1);
  datatemp.push(percent2);
  datatemp.push(percent3);
  //console.log(datatemp);
  var predata =[];
  var lab = ["独立团","散拼团","机票"];





  for (var jie =0;jie<datatemp.length;jie++){

    predata.push({

      data: datatemp[jie],
      label: lab[jie],
      backgroundColor: bcolor[jie],
      fill: false


    });

  }
  datasum.push(predata);

  hbargraph(datasum);

}

function DoughnutChartgraph(datava,color){

  var dou_ctx = document.getElementById("dou-chart").getContext('2d');
  var douChart = new Chart(dou_ctx, {
    type: 'doughnut',
    data: {
      labels: ["独立团", "散拼团", "机票"],
      datasets: [{
          backgroundColor: color,
          data: [datava[0], datava[1], datava[2]]
      }]
    },
      options: {
          title: {
              display: true,
              //text: '本月业绩'
          }
      }
  });


}


function piegraph(datava){

  var pie_ctx = document.getElementById("bar-chart").getContext('2d');
  var pieChart = new Chart(pie_ctx, {
    type: 'pie',
    data: {
      labels: ["独立团", "散拼团", "机票"],
      datasets: [{
          backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f"],
          data: [datava[0], datava[1], datava[2]]
      }]
    },
      options: {
          title: {
              display: true,
              //text: '本月业绩'
          }
      }
  });


}

function hbargraph(datavar){
  var pie_ctx = document.getElementById("bar-chart").getContext('2d');
  var pieChart = new Chart(pie_ctx, {
    type: 'horizontalBar',
    data: {
        labels: datavar[0],
        datasets: datavar[1]
    },
      options: {
          title: {
              display: true,
              //text: '本月业绩'
          },

          scales: {
            xAxes: [{
              stacked: true

            }],
            yAxes: [{
              stacked: true
            }]
          }
      }
  });




}


function bargraph(data){

  var salespersons = JSON.parse(data['salespersons']);
  var url = location.protocol.concat("//").concat(location.host).concat('/database/Management/SalesPerformance.php');
  $.ajax({
      url: url,
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      type: 'POST',
      data: data,
      success: function(response) {
          response = JSON.parse(response);

          var dateInfo = [];
          var salespersonInfo = [];
          var groupSum = [];
          var indivSum = [];
          var airTicketSum = [];
          var totalSum = [];


          for (var i = 0; i < response[0][0].length; i++) {
              dateInfo.push(response[0][0][i]);
          }

          for (var i = 0; i < response.length; i++) {
              salespersonInfo.push(salespersons[i]);

              groupSum.push(response[i][1]);
              indivSum.push(response[i][2]);
              airTicketSum.push(response[i][3]);
              totalSum.push(response[i][4]);
          }

          //console.log(salespersonInfo.length);

          var dougroup = [];
          var douindiv = [];
          var douair = [];
          var doutotal = [];



          for(var j = 0; j<salespersonInfo.length; j++){

            var totalsum1 = 0;
            var totalsum2 =0;
            var totalsum3 = 0;
            var totalsum4 = 0;


            for (var m = 0; m<groupSum[j].length;m++){


              totalsum1 += Number(groupSum[j][m]);
              totalsum2 += Number(indivSum[j][m]);
              totalsum3 += Number(airTicketSum[j][m]);
              totalsum4 += Number(totalSum[j][m]);



            }
            dougroup.push(totalsum1);
            douindiv.push(totalsum2);
            douair.push(totalsum3);
            doutotal.push(totalsum4);

            groupSum[j].push(totalsum1);
            indivSum[j].push(totalsum2);
            airTicketSum[j].push(totalsum3);
            totalSum[j].push(totalsum4);

          }
          var doudictsum = {};
          doudictsum["group"]=dougroup;
          doudictsum["indivi"]=douindiv;
          doudictsum["airTicket"]=douair;
          doudictsum["sum"]=doutotal;


          console.log(doudictsum["group"]);




        //var ctx = document.getElementById("total-chart").getContext('2d');
        //var myChart = new Chart(ctx, {

        var predata = []
        var colorlist = ["#3e95cd",
        "#9400D3",
        "#000080",
        "#3e45cd",
        "#2E8B57",
        "#B8860B",
        "#FFDEAD",
        "#FF6347",
        "#800000"]

        var Sumofgroup = [];
        var Sumofindiv = [];
        var SumofairTicket = [];
        var SumofSum = [];
        // calculate sum

        for(var sind = 0; sind<groupSum[0].length;sind++){

          var sum1 = 0;
          var sum2 =0;
          var sum3 = 0;
          var sum4 = 0;

          for (var j = 0; j<groupSum.length;j++){
            sum1 += Number(groupSum[j][sind]);
            sum2 += Number(indivSum[j][sind]);
            sum3 += Number(airTicketSum[j][sind]);
            sum4 += Number(totalSum[j][sind]);


          }
          Sumofgroup.push(sum1);
          Sumofindiv.push(sum2);
          SumofairTicket.push(sum3);
          SumofSum.push(sum4);

        }

        //console.log(Sumofgroup);

        //calculate percent

        var Perofgroup = [];
        var Perofindiv = [];
        var PerofairTicket = [];
        var PerofSum = [];

        for(var sind = 0; sind<groupSum.length;sind++){
          var percent1 = [];
          var percent2 = [];
          var percent3= [];
          var percent4 = [];

          //-1-1-1-1--1--1-1-1-1-1-1--1-1-1-

          for (var j = 0; j<groupSum[0].length-1;j++){

            if(Sumofgroup[j]!=0){
              percent1.push(Number(groupSum[sind][j])/Sumofgroup[j]);

            }else{
              percent1.push(0);
            }
            if(Sumofindiv[j]!=0){
              percent2.push(Number(indivSum[sind][j])/Sumofindiv[j]);

            }else{
              percent2.push(0);
            }
            if(SumofairTicket[j]!=0){
              percent3.push(Number(airTicketSum[sind][j])/SumofairTicket[j]);

            }else{
              percent3.push(0);
            }
            if(SumofSum[j]!=0){
              percent4.push(Number(totalSum[sind][j])/SumofSum[j]);

            }else{
              percent4.push(0);
            }
          }
          Perofgroup.push(percent1);
          Perofindiv.push(percent2);
          PerofairTicket.push(percent3);
          PerofSum.push(percent4);

        }


        var typedisplay = document.getElementById("type_filter").value;
      //  console.log(typedisplay);
       DoughnutChartgraph(doudictsum[typedisplay],colorlist.slice(0,salespersonInfo.length));


        for(var ind = 0; ind<salespersonInfo.length;ind++){

          if (typedisplay=="group"){

            predata.push({

              data: Perofgroup[ind],
              label: salespersonInfo[ind],
              backgroundColor: colorlist[ind],
              fill: false


            });

          }

          if (typedisplay=="indivi"){

            predata.push({

              data: Perofindiv[ind],
              label: salespersonInfo[ind],
              backgroundColor: colorlist[ind],
              fill: false


            });

          }

          if (typedisplay=="airTicket"){

            predata.push({

              data: PerofairTicket[ind],
              label: salespersonInfo[ind],
              backgroundColor: colorlist[ind],
              fill: false


            });

          }

          if (typedisplay=="sum"){

            predata.push({

              data: PerofSum[ind],
              label: salespersonInfo[ind],
              backgroundColor: colorlist[ind],
              fill: false


            });

          }

        }

        var datalen = dateInfo.length;

        var ctx = document.getElementById("total-chart").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dateInfo.slice(0,datalen-1),
                datasets: [{
                    data: Sumofgroup.slice(0,datalen-1),
                    label: "独立团",
                    borderColor: "#3e95cd",
                    fill: false
                }, {
                    data: Sumofindiv.slice(0,datalen-1),
                    label: "散拼团",
                    borderColor: "#8e5ea2",
                    fill: false
                }, {
                    data: SumofairTicket.slice(0,datalen-1),
                    label: "机票",
                    borderColor: "#3cba9f",
                    fill: false
                }, {
                    data: SumofSum.slice(0,datalen-1),
                    label: "总体",
                    borderColor: "#000080",
                    fill: false
                }]
            },
            options: {
                title: {
                    display: true
                }
            }
        });

        prelength = predata.length;

        var pie_ctx = document.getElementById("bar-chart").getContext('2d');
        var pieChart = new Chart(pie_ctx, {
          type: 'horizontalBar',
          data: {
              labels: dateInfo,
              datasets: predata
          },
            options: {
                title: {
                    display: true,
                    //text: '本月业绩'
                },

                scales: {
                  xAxes: [{
                    stacked: true

                  }],
                  yAxes: [{
                    stacked: true
                  }]
                }
            }
        });
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
    }
});
}
