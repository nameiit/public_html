$(document).ready(function() {
    manageTabAction();

    $("#insert-tourist-guide-other-contact").on('change', function() {
		$("#insert-tourist-guide-other-contact-label").text($("#insert-tourist-guide-other-contact").val() + "帐号");
	});
    $("#update-tourist-guide-other-contact").on('change', function() {
		$("#update-tourist-guide-other-contact-label").text($("#update-tourist-guide-other-contact").val() + "帐号");
	});

    function loadFilter() {
        var url = location.protocol.concat("//").concat(location.host).concat('/database/autoComplete.php');
        $.ajax({
            url: url,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            type: 'post',
            data: { target: 'touristGuide' },
            success: function(response) {
                response = JSON.parse(response);
                // 中文姓名搜索
                var reg = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/;
                for (var i = 0; i < response.length; i++) {
                    var name = response[i].split(" ");
                    if (name[1] != null && (reg.test(name[0]) || reg.test(name[1]))) {
                        response[i] = name[1] + name[0];
                    }
                    $("#tourist-guide-name-filter").append("<option value='" + response[i] + "'>" + response[i] + "</option>");
                }

                searchTab($("#tourist-guide-name-filter, #tourist-guide-gender-filter"), getFilterData, loadData);
                heightRange();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });

    }
    loadFilter();

    var filterData = { tourist_guide_name: "all", gender: "all" };

    function getFilterData() {
        filterData.tourist_guide_name = $("#tourist-guide-name-filter").val();
        filterData.gender = $("#tourist-guide-gender-filter").val();
        return filterData;
    }

    var limit = 10;
    function loadData(inputData) {
        var data = inputData;
        Object.assign(data, {
            action: 'getTouristGuideList',
            limit: limit
        });
        var url = location.protocol.concat("//").concat(location.host).concat('/database/Management/TouristGuide.php');
        $.ajax({
            url: url,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            type: 'GET',
            data: data,
            success: function(response) {
                console.log(response);
                $("ul.manageTabDetail").empty();
                response = JSON.parse(response);
                for (var i = 0; i < response.length; i++) {

                    var gender = response[i]['gender'];
                    if (gender == 'M') { gender = '男'; }
                    else if (gender == 'F') { gender = '女' }
                    else { gender = '未知'; }

                    // 中文姓名检测
                    var reg = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/;
                    var displayName = "";
                    var name = response[i]['name'].split(" ");
                    if (reg.test(name[0]) || reg.test(name[1])) {
                        displayName = name[1] + name[0];
                    } else {
                        displayName = name[0] + ' ' + name[1];
                    }

                    var age = response[i]['age'];
                    if (age == null) {
                        age = "";
                    }

                    var other_contact = response[i]['other_contact'];
                    if (other_contact == null) {
                        other_contact = "";
                    }
                    $html = `
                    <li><dl><dd class="tabId">` + response[i]['guide_id'] + `</dd>
                            <dd class="tabName"> ` + displayName + `</dd>
                            <dd class="tabGender">` + gender + `</dd>
                            <dd class="tabAge"> ` + age + `</dd>
                            <dd class="tabTel">` + response[i]['phone'] + `</dd>
                            <dd class="tabEmail">` + response[i]['email'] + `</dd>
                            <dd class="tabOtherContact">` + other_contact + `</dd>
                            <dd class="tabDetail zebra_tips2" title="" ><p></p></dd>
                    </dl></li>
                    `;
                    $("ul.manageTabDetail").append($html);

                    var len = $("dd.tabDetail").length;

                    if (response[i]['descriptions'] != "") {
                        $($("dd.tabDetail")[len - 1]).attr("title", response[i]['descriptions']);
                        $($("dd.tabDetail")[len - 1]).text("详情");
					}
                }
                new $.Zebra_Tooltips($('.zebra_tips2'), {
                    'background_color': '#000000',
                    'color': '#FFF'
                });
                
                heightRange();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    }

    // 载入更多
    $(".order-unfold").on("click", function() {
        limit += 10;
		loadData(filterData);
        resetUpdateTable();
	});

    function getTouristGuideInfo(tourist_guide_id) {
        var url = location.protocol.concat("//").concat(location.host).concat('/database/Management/TouristGuide.php');
        $.ajax({
            url: url,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            type: 'GET',
            data: {
                action: 'getTouristGuideInfo',
                tourist_guide_id: tourist_guide_id
            },
            success: function(response) {
                response = JSON.parse(response);
                $("#update-tourist-guide-lname").val(response['lname']);
                $("#update-tourist-guide-fname").val(response['fname']);
                $("#update-tourist-guide-gender").val(response['gender']);
                $("#update-tourist-guide-age").val(response['age']);
                $("#update-tourist-guide-phone").val(response['phone']);
                $("#update-tourist-guide-email").val(response['email']);
                $("#update-tourist-guide-other-contact").val(response['other_contact_type']);
                if (response['other_contact_type'] == null) {
                    $("#update-tourist-guide-other-contact-label").text('WeChat帐号');
                } else {
                    $("#update-tourist-guide-other-contact-label").text(response['other_contact_type'] + '帐号');
                }
                $("#update-tourist-guide-other-contact-number").val(response['other_contact_number']);
                $("#update-tourist-guide-description").val(response['descriptions']);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    }

    $(document).on('click', ".manageTab .tabCard ul.manageTabDetail li", function() {
        $(this).addClass("detail-active");
        $(this).siblings().removeClass("detail-active");
        $(".amendTabMsg").css("display", "block");
        $(".amendTabMsg").removeClass("nm-hide");
        $(".addTabMsg").addClass("nm-hide");
        $(".addTabMsg").css("display", "none");
        $(".amendInfo").addClass("manage-active");
        $(".amendInfo").siblings().removeClass("manage-active");
        var tourist_guide_id = $(this).find(".tabId").text();
        getTouristGuideInfo(tourist_guide_id);
    });
    $(document).on('click', ".manageTab .tabCard ul.manageTabTitle li", function() {
        $(this).addClass("detail-active");
        $(this).siblings().removeClass("detail-active");
    });


    $("#update-confirm").on('click', function() {
        $(".updateConfirmBox").css("display", "block");
    });
    $("#updateActionConfirm").on('click', function() {
        var tourist_guide_id = $(document).find(".detail-active .tabId")[0].innerHTML;
        var url = location.protocol.concat("//").concat(location.host).concat('/database/Management/TouristGuide.php');
        $.ajax({
            url: url,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            type: 'POST',
            data: {
                action: 'updateTouristGuide',
                tourist_guide_id: tourist_guide_id,
                lname: $("#update-tourist-guide-lname").val(),
                fname: $("#update-tourist-guide-fname").val(),
                gender: $("#update-tourist-guide-gender").val(),
                age: $("#update-tourist-guide-age").val(),
                phone: $("#update-tourist-guide-phone").val(),
                email: $("#update-tourist-guide-email").val(),
                other_contact_type: $("#update-tourist-guide-other-contact").val(),
                other_contact_number: $("#update-tourist-guide-other-contact-number").val(),
                descriptions: $("#update-tourist-guide-description").val()
            },
            success: function(response) {
                $(".updateConfirmBox").css("display", "none");
                loadData(filterData);
                resetUpdateTable();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    });
    $("#updateActionCancel").on('click', function() {
        $(".updateConfirmBox").css("display", "none");
    });
    $("#update-reset").on('click', function() {
        if ($(document).find(".detail-active .tabId").length == 1) {
            var tourist_guide_id = $(document).find(".detail-active .tabId")[0].innerHTML;
            getTouristGuideInfo(tourist_guide_id);
        } else {
            resetUpdateTable();
        }
    });

    $("#insert-confirm").on('click', function() {
        $(".insertConfirmBox").css("display", "block");
    });
    $("#insertActionConfirm").on('click', function() {
        var url = location.protocol.concat("//").concat(location.host).concat('/database/Management/TouristGuide.php');
        $.ajax({
            url: url,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            type: 'POST',
            data: {
                action: 'insertTouristGuide',
                lname: $("#insert-tourist-guide-lname").val(),
                fname: $("#insert-tourist-guide-fname").val(),
                gender: $("#insert-tourist-guide-gender").val(),
                age: $("#insert-tourist-guide-age").val(),
                phone: $("#insert-tourist-guide-phone").val(),
                email: $("#insert-tourist-guide-email").val(),
                other_contact_type: $("#insert-tourist-guide-other-contact").val(),
                other_contact_number: $("#insert-tourist-guide-other-contact-number").val(),
                descriptions: $("#insert-tourist-guide-description").val()
            },
            success: function(response) {
                $(".insertConfirmBox").css("display", "none");
                loadData(filterData);
                resetInsertTable();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    });
    $("#insertActionCancel").on('click', function() {
        $(".insertConfirmBox").css("display", "none");
    });
    $("#insert-reset").on('click', function() {
        resetInsertTable();
    });
    $("#delete-confirm").on('click', function() {
        $(".deleteConfirmBox").css("display", "block");
    });
    $("#deleteActionConfirm").on('click', function() {
        var tourist_guide_id = $(document).find(".detail-active .tabId")[0].innerHTML;
        var url = location.protocol.concat("//").concat(location.host).concat('/database/Management/TouristGuide.php');
        $.ajax({
            url: url,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            type: 'POST',
            data: {
                action: 'deleteTouristGuide',
                tourist_guide_id: tourist_guide_id
            },
            success: function(response) {
                console.log(response);
                $(".deleteConfirmBox").css("display", "none");
                loadData(filterData);
                resetUpdateTable();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    });
    $("#deleteActionCancel").on('click', function() {
        $(".deleteConfirmBox").css("display", "none");
    });

    function resetInsertTable() {
        $("#insert-tourist-guide-lname").val("");
        $("#insert-tourist-guide-fname").val("");
        $("#insert-tourist-guide-gender").val("");
        $("#insert-tourist-guide-age").val("");
        $("#insert-tourist-guide-phone").val("");
        $("#insert-tourist-guide-email").val("");
        $("#insert-tourist-guide-other-contact").val("");
        $("#insert-tourist-guide-other-contact-label").text("WeChat帐号");
        $("#insert-tourist-guide-other-contact-number").val("");
        $("#insert-tourist-guide-description").val("");
    }
    function resetUpdateTable() {
        $("#update-tourist-guide-lname").val("");
        $("#update-tourist-guide-fname").val("");
        $("#update-tourist-guide-gender").val("");
        $("#update-tourist-guide-age").val("");
        $("#update-tourist-guide-phone").val("");
        $("#update-tourist-guide-email").val("");
        $("#update-tourist-guide-other-contact").val("");
        $("#update-tourist-guide-other-contact-label").text("WeChat帐号");
        $("#update-tourist-guide-other-contact-number").val("");
        $("#update-tourist-guide-description").val("");
    }

    toSalesManagePage();//跳转到销售人员页面
});
