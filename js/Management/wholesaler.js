$(document).ready(function() {
    manageTabAction();
    
 
    
    
    
    
    
    

    function loadFilter() {
        var url = location.protocol.concat("//").concat(location.host).concat('/database/autoComplete.php');
        $.ajax({
            url: url,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            type: 'post',
            data: { target: 'wholesaler' },
            success: function(response) {
                response = JSON.parse(response);
                for (var i = 0; i < response.length; i++) {
                    $("#wholesaler-code-filter").append("<option value='" + response[i] + "'>" + response[i] + "</option>");
                }

                $.ajax({
                    url: url,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    type: 'post',
                    data: { target: 'wholesaler_name' },
                    success: function(response) {
                        response = JSON.parse(response);
                        for (var i = 0; i < response.length; i++) {
                            $("#wholesaler-name-filter").append("<option value='" + response[i] + "'>" + response[i] + "</option>");
                        }

                        $.ajax({
                            url: url,
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            type: 'post',
                            data: { target: 'wholesaler_contact_person' },
                            success: function(response) {
                                response = JSON.parse(response);
                                for (var i = 0; i < response.length; i++) {
                                    $("#wholesaler-contact-person-filter").append("<option value='" + response[i] + "'>" + response[i] + "</option>");
                                }

                                searchTab($("#wholesaler-code-filter, #wholesaler-name-filter, #wholesaler-contact-person-filter, #wholesaler-region-filter, #wholesaler-business-type-filter"),
                                            getFilterData, loadData);
                            },
                            error: function(jqXHR, textStatus, errorThrown) {
                                console.log(textStatus, errorThrown);
                            }
                        });
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.log(textStatus, errorThrown);
                    }
                });
                heightRange();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    }
    loadFilter();

    var filterData = { wholesaler_code: "all", wholesaler_name: "all", contact_person: "all", region: "all", business_type: "all" };

    function getFilterData() {
        filterData.wholesaler_code = $("#wholesaler-code-filter").val();
        filterData.wholesaler_name = $("#wholesaler-name-filter").val();
        filterData.contact_person = $("#wholesaler-contact-person-filter").val();
        filterData.region = $("#wholesaler-region-filter").val();
        filterData.business_type = $("#wholesaler-business-type-filter").val();
        return filterData;
    }

    var limit = 10;
    function loadData(inputData) {
        var data = inputData;
        Object.assign(data, {
            action: 'getWholesalerList',
            limit: limit
        });
        var url = location.protocol.concat("//").concat(location.host).concat('/database/Management/Wholesaler.php');
        $.ajax({
            url: url,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            type: 'GET',
            data: data,
            success: function(response) {
                $("ul.manageTabDetail").empty();
                response = JSON.parse(response);
                console.log(response);
                for (var i = 0; i < response.length; i++) {
                    $html = `
                    <li><dl><dd class="tabId">` + response[i]['wholesaler_id'] + `</dd>
                            <dd class="codeInfo"> ` + response[i]['wholesaler_code'] + `</dd>
                            <dd class="supplierNameTab"> ` + response[i]['name'] + `</dd>
                            <dd class="supplierEmailTab">` + response[i]['email'] + `</dd>
                            <dd class="linkManNameTab">` + response[i]['contact_person'] + `</dd>
                            <dd class="areaInfoTab">` + response[i]['region'] + `</dd>
                            <dd class="businessTypeTab">` + response[i]['business_type'] + `</dd>
                            <dd class="tabDetailTab zebra_tips" title="" ><p></p></dd>
                    </dl></li>
                    `;
                    $("ul.manageTabDetail").append($html);

                    var len = $("dd.tabDetailTab").length;

                    if (response[i]['description'] != "") {
                        $($("dd.tabDetailTab")[len - 1]).attr("title", response[i]['description']);
                        $($("dd.tabDetailTab")[len - 1]).text("详情");
					}
                }
                new $.Zebra_Tooltips($('.zebra_tips'), {
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

    function getWholesalerInfo(wholesaler_id) {
        var url = location.protocol.concat("//").concat(location.host).concat('/database/Management/Wholesaler.php');
        $.ajax({
            url: url,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            type: 'GET',
            data: {
                action: 'getWholesalerInfo',
                wholesaler_id: wholesaler_id
            },
            success: function(response) {
                response = JSON.parse(response);
                $("#update-wholesaler-code").val(response['wholesaler_code']);
                $("#update-wholesaler-name").val(response['name']);
                $("#update-wholesaler-email").val(response['email']);
                $("#update-wholesaler-contact-person").val(response['contact_person']);
                $("#update-wholesaler-region").val(response['region']);
                $("#update-wholesaler-contact-person-phone").val(response['contact_person_phone']);
                $("#update-wholesaler-business-type").val(response['business_type']);
                $("#update-wholesaler-description").val(response['description']);
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

        var wholesaler_id = $(this).find(".tabId").text();

        getWholesalerInfo(wholesaler_id);
    });
    $(document).on('click', ".manageTab .tabCard ul.manageTabTitle li", function() {
        $(this).addClass("detail-active");
        $(this).siblings().removeClass("detail-active");
    });

    $("#update-confirm").on('click', function() {
        $(".updateConfirmBox").css("display", "block");
    });
    $("#updateActionConfirm").on('click', function() {
        var wholesaler_id = $(document).find(".detail-active .tabId")[0].innerHTML;
        var url = location.protocol.concat("//").concat(location.host).concat('/database/Management/Wholesaler.php');
        $.ajax({
            url: url,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            type: 'POST',
            data: {
                action: 'updateWholesaler',
                wholesaler_id: wholesaler_id,
                wholesaler_code: $("#update-wholesaler-code").val(),
                wholesaler_name: $("#update-wholesaler-name").val(),
                wholesaler_email: $("#update-wholesaler-email").val(),
                contact_person: $("#update-wholesaler-contact-person").val(),
                region: $("#update-wholesaler-region").val(),
                contact_person_phone: $("#update-wholesaler-contact-person-phone").val(),
                business_type: $("#update-wholesaler-business-type").val(),
                description: $("#update-wholesaler-description").val()
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
            var wholesaler_id = $(document).find(".detail-active .tabId")[0].innerHTML;
            getWholesalerInfo(wholesaler_id);
        } else {
            resetUpdateTable();
        }
    });

    $("#insert-confirm").on('click', function() {
    	var regs=/^[a-z|A-Z|0-9]+\._+\/$/;
		if($("input#insert-wholesaler-code").val()==""||$("input#insert-wholesaler-name").val()==""){
			alert("请确认必填信息已输入");
		}
		else{
			if(regs.test($("input#insert-wholesaler-code").val())){
				$(".insertConfirmBox").css("display", "block");
				$(".insertConfirmBox p.confirmNotice").text("确认添加");
				$(".insertConfirmBox").find("p.actionBox").find("button.actionConfirm").css("display", "inline-block");
 				$(".insertConfirmBox").find("p.actionBox").find("button.actionCancel").css("width", "50%");
 				$(".insertConfirmBox").find("p.actionBox").find("button.actionCancel").text("取消");
			}
			else{
				$(".insertConfirmBox").css("display", "block");
				$(".insertConfirmBox p.confirmNotice").text("只能输入格式ABcd123._/");
				$(".insertConfirmBox").find("p.actionBox").find("button.actionConfirm").css("display", "none");
 				$(".insertConfirmBox").find("p.actionBox").find("button.actionCancel").css("width", "100%");
 				$(".insertConfirmBox").find("p.actionBox").find("button.actionCancel").text("返回");
			}
		}
//      $(".insertConfirmBox").css("display", "block");
    });
   
   
   $("#insertActionConfirm").on('click', function() {
        var url = location.protocol.concat("//").concat(location.host).concat('/database/Management/Wholesaler.php');
        $.ajax({
            url: url,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            type: 'POST',
            data: {
                action: 'insertWholesaler',
                wholesaler_code: $("#insert-wholesaler-code").val(),
                wholesaler_name: $("#insert-wholesaler-name").val(),
                wholesaler_phone: $("#insert-wholesaler-phone").val(),
                wholesaler_email: $("#insert-wholesaler-email").val(),
                contact_person: $("#insert-wholesaler-contact-person").val(),
                region: $("#insert-wholesaler-region").val(),
                contact_person_phone: $("#insert-wholesaler-contact-person-phone").val(),
                business_type: $("#insert-wholesaler-business-type").val(),
                description: $("#insert-wholesaler-description").val()
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
        var wholesaler_id = $(document).find(".detail-active .tabId")[0].innerHTML;
        var url = location.protocol.concat("//").concat(location.host).concat('/database/Management/Wholesaler.php');
        $.ajax({
            url: url,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            type: 'POST',
            data: {
                action: 'deleteWholesaler',
                wholesaler_id: wholesaler_id
            },
            success: function(response) {
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
        $("#insert-wholesaler-code").val("");
        $("#insert-wholesaler-name").val("");
        $("#insert-wholesaler-phone").val("");
        $("#insert-wholesaler-email").val("");
        $("#insert-wholesaler-contact-person").val("");
        $("#insert-wholesaler-region").val("");
        $("#insert-wholesaler-contact-person-phone").val("");
        $("#insert-wholesaler-business-type").val("");
        $("#insert-wholesaler-description").val("");
    }
    function resetUpdateTable() {
        $("#update-wholesaler-code").val("");
        $("#update-wholesaler-name").val("");
        $("#update-wholesaler-email").val("");
        $("#update-wholesaler-contact-person").val("");
        $("#update-wholesaler-region").val("");
        $("#update-wholesaler-contact-person-phone").val("");
        $("#update-wholesaler-business-type").val("");
        $("#update-wholesaler-description").val("");
    }

    toSalesManagePage();//跳转到销售人员页面
});
