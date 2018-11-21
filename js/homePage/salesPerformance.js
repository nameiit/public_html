
//移除元素:
function test(salesList, i) {
    //销售人员名字
    var salesBox = $("dd.sales").find("dl.salesDetail");
    var groupTourBox = $("dd.groupTour").find("dl.salesDetail");
    for (var m = 0; m < salesBox.find("dd.salesInfo").length; m++) {
        var textInfo = $.trim($(salesBox.find("dd.salesInfo")[m]).text());
        if (textInfo == $.trim(salesList)) {
            $(salesBox.find("dd.salesInfo")[m]).remove();
            $(groupTourBox.find("dd.groupInfo")[m].remove());
            var newHeight = $("dd.sales").height();
            $("dd.sales").siblings("dd").css("height", newHeight);
            heightRange();

        }

    }


    //		alert(1);
}
//选中一条信息的日期：
function selectDate() {
    var selectedNum = $(".rightInfo ul").find("li.salesName.selected").length;
    var timeList = $("ul.rankingList1").find("li.detailInfo").find("dd.time"); //日期
    var groupTourList = $("ul.rankingList1").find("li.detailInfo").find("dd.groupTour"); //独立团
    var individualTourList = $("ul.rankingList1").find("li.detailInfo").find("dd.individualTour"); //散拼团
    var airTicketList = $("ul.rankingList1").find("li.detailInfo").find("dd.airTicket"); //机票
    var sumList = $("ul.rankingList1").find("li.detailInfo").find("dd.sum");
    var selectBox = $(".leftInfo").find("li").find("select");
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


    $(".leftInfo").find("li").find("select").on("change", function() {
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
        //每月:显示销售人员信息:
        if ($.trim(selectBox.find("option:selected").text()) == "每月") {
            for (var i = 0; i < timeList.length; i++) {
                $(timeList[i]).text(" ");
                $(groupTourList[i]).text(" ");
                $(individualTourList[i]).text(" ");
                $(airTicketList[i]).text(" ");
                $(sumList[i]).text(" ");
            }

        }
        //每三个月:销售人员信息:
        if ($.trim(selectBox.find("option:selected").text()) == "每三个月") {
            for (var i = 0; i < timeList.length; i++) {
                $(timeList[i]).text(" ");
                $(groupTourList[i]).text(" ");
                $(individualTourList[i]).text(" ");
                $(airTicketList[i]).text(" ");
                $(sumList[i]).text(" ");
            }

        }
        //每半年:销售人员信息:
        if ($.trim(selectBox.find("option:selected").text()) == "每半年") {
            for (var i = 0; i < timeList.length; i++) {
                $(timeList[i]).text(" ");
                $(groupTourList[i]).text(" ");
                $(individualTourList[i]).text(" ");
                $(airTicketList[i]).text(" ");
                $(sumList[i]).text(" ");
            }

        }
    });
}
//箭头
function arrowAction() {
    $(".arrow").on("mousedown", function() {
        $(this).css({
            "background-color": "#e3853f",
            "color": "#ebe7e4"
        });
        $("body,html").animate({
            scrollTop: '0px'
        }, 1000);
    });
    $(".arrow").on("mouseup", function() {
        $(this).css({
            "background-color": "#ebe7e4",
            "color": "#e3853f"
        });
    });
    $(".arrow").on("click", function() {
        var sales = $.trim($(".selected").text());
        //		alert("展示"+sales+"图表");//右侧要展示的图表
    });



}
function autoCenter(el) {
    var bodyW = $("body").width();
    var bodyH = $("body").height();
    var elW = el.width();
    var elH = el.height();
    var space = bodyW - $(".navInfo ul").width() - $(".theamInfo").width();
    var diffWidth = ($(".navInfo ul").width() + space);
    $(".arrow").css({
        "right": (bodyW - elW - diffWidth) / 2 + 'px',
        "top": (bodyH - elH) / 2 + 'px'
    });
};
window.onload = function heightRanges() {
    var leftHeight = $(".navInfo ul").height();
    var rightHeight = $(".theamInfo").height();
    if (rightHeight > leftHeight) {
        $(".navInfo ul").css("height", rightHeight);
    }
    if (rightHeight < leftHeight) {
        $(".navInfo ul").css("height", rightHeight);
    }
}
function heightRange() {
    var leftHeight = $(".navInfo ul").height();
    var rightHeight = $(".theamInfo").height();
    if (rightHeight > leftHeight) {
        $(".navInfo ul").css("height", rightHeight);
    }
    if (rightHeight < leftHeight) {
        $(".navInfo ul").css("height", rightHeight);
    }
}
//总体业绩部分
function currentStates() {
    $(".selectInfoBox dd").on("click", function() {
        if ($(this).hasClass("current-item")) {
            $(this).removeClass("current-item");

        } else {
            $(this).addClass("current-item").siblings().removeClass("current-item");
            if ($.trim($(this).text()) == "独立团") {
                $(".detailInfo dd:last").removeClass("nm-hide");
                $(".detailInfo dd:first").addClass("nm-hide");
            } else if ($.trim($(this).text()) == "散拼团") {
                $(".detailInfo dd:first").removeClass("nm-hide");
                $(".detailInfo dd:last").addClass("nm-hide");
            } else if ($.trim($(this).text()) == "机票") {
                $(".detailInfo dd:first").addClass("nm-hide");
                $(".detailInfo dd:last").addClass("nm-hide");

            }

        }

    });
}
function ckdate(startTime, endTime) {
    endTime.on('change', function() {
        var endtime = endTime.val();
        var starttime = startTime.val();
        var start = new Date(starttime.replace("-", "/").replace("-", "/"));
        var end = new Date(endtime.replace("-", "/").replace("-", "/"));
        if (end < start) {
            alert('结束日期不能小于开始日期！');
            endtime = endTime.val(" ");
            return false;
        } else {
            return true;
        }
    });
}
