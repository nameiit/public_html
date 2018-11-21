$(document).ready(function() {
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

    var loadSalesPerformance = function () {
        $("li.detailInfo").empty();
        var dates = [];
        var time_filter = $("#performance-time-filter").val();

        var salesperson = $("#performance-filter-salesperson").val();
        var end_date = formatDate(new Date());
        var start_date = getTime(new Date(), time_filter, 11);

        var url = location.protocol.concat("//").concat(location.host).concat('/database/Management/Performance/getSalesPerformance.php');
        $.ajax({
            url: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: 'GET',
            data: {
                time_filter: time_filter,
                start_date: start_date,
                end_date: end_date,
                salesperson: salesperson
            },
            success: function(response) {
                console.log(response);
                response = JSON.parse(response);
                for (var i = 0; i < 12; i++) {
                    $html = `<dl>
                        <dd class="time">` + response[0][i] + `</dd>
                        <dd class="groupTour">` + response[1][i] + `</dd>
                        <dd class="individualTour">` + response[2][i] + `</dd>
                        <dd class="airTicket">` + response[3][i] + `</dd>
                        <dd class="sum">` + response[4][i] + `</dd>
                    </dl>`;
                    $("li.detailInfo").append($html);
                }
                heightRange();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    }
    loadSalesPerformance();

    $("#sales-performance-filter").on('click', function () {
        loadSalesPerformance();
    });


    /*
    *  过去半年的业绩增长趋势图以及本月的业绩占比图
    */
    var getReportDate = function(currentDate, monthDiff) {
        var year = currentDate.getFullYear();
        var month = currentDate.getMonth() - monthDiff;

        var date = new Date();
        date.setYear(year);
        date.setDate(1);
        date.setMonth(month);

        return formatDate(date);
    };
    var firstDays = [];
    var months = [];
    var dict = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    for (var i = 5; i >= -1; i--) {
        firstDays.push(getReportDate(new Date(), i));
    }
    for (var i = 0; i < 6; i++) {
        months[i] = dict[firstDays[i].split("-")[1] - 1];
    }

    var end_date = formatDate(new Date());
    var start_date = new Date();
    var year = start_date.getFullYear();
    var month = start_date.getMonth() - 5;
    start_date.setYear(year);
    start_date.setDate(1);
    start_date.setMonth(month);
    start_date = formatDate(start_date);

    var url = location.protocol.concat("//").concat(location.host).concat('/database/Management/Performance/getPerformanceReport.php');
    $.ajax({
        url: url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        type: 'GET',
        data: {
            start_date: start_date,
            end_date: end_date
        },
        success: function(response) {
            console.log(response);
            response = JSON.parse(response);
            response[0].reverse();
            response[1].reverse();
            response[2].reverse();
            response[3].reverse();
            response[4].reverse();
            // console.log(response);

            var ctx = document.getElementById("line-chart").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: months,
                    datasets: [{
                        data: response[1],
                        label: "独立团",
                        borderColor: "#3e95cd",
                        fill: false
                    }, {
                        data: response[2],
                        label: "散拼团",
                        borderColor: "#8e5ea2",
                        fill: false
                    }, {
                        data: response[3],
                        label: "机票",
                        borderColor: "#3cba9f",
                        fill: false
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: '过去半年业绩'
                    }
                }
            });

            var pie_ctx = document.getElementById("pie-chart").getContext('2d');
            var pieChart = new Chart(pie_ctx, {
                type: 'pie',
                data: {
                    labels: ["独立团", "散拼团", "机票"],
                    datasets: [{
                        backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f"],
                        data: [response[1][5], response[2][5], response[3][5]]
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: '本月业绩'
                    }
                }
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
});
