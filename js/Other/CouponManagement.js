$(document).ready(function () {
    checkedState();
    listStatus();
    // resetInfo();
    toUsersManagePage();
    // detailText();//"详情"部分的换行

    var offset = 10;

    var getFilterData = function () {
        var code = $("#coupon-code-filter").val();
        var value = $("#coupon-value-filter").val();
        var status = "";
        if ($(".checkbox-success input[type='checkbox']").attr("checked") == 'checked') {
            status = 'N';
        }
        return {
            code: code,
            value: value,
            status: status
        };
    }

    var loadData = function (offset) {
        $("li.listDetail").remove();
        heightRange();
        var data = getFilterData();
        Object.assign(data, {
            offset: offset,
            action: 'getCouponList'
        });

        var url = location.protocol.concat("//").concat(location.host).concat('/database/Other/CouponManagement.php');
        $.ajax({
            url: url,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            type: 'GET',
            data: data,
            success: function(response) {
                response = JSON.parse(response);
                for (var i = 0; i < response.length; i++) {
                    var description = "";
                    if (response[i]['description'] != null) {
                        description = response[i]['description'];
                    }
                    if ($(".checkbox-success input[type='checkbox']").attr("checked") == 'checked') {
                        $html = `
                            <li class="listDetail">
                                <dl>
                                    <dd class="discountCodeMsg">` + response[i]['code'] + `</dd>
                                    <dd class="discountAmountMsg">` + response[i]['discount'] + `</dd>
                                    <dd class="salesMsg">` + response[i]['salesperson_code'] + `</dd>
                                    <dd class="detailMsg">` + description + `</dd>
                                </dl>
                            </li>
                        `;
                        $("ul.defaultList").append($html);
                        detailText();
                    } else {
                        $html = `
                        <li class="listDetail">
                            <dl>
                                <dd class="discountCodeMsg">` + response[i]['code'] + `</dd>
                                <dd class="discountAmountMsg">` + response[i]['discount'] + `</dd>
                                <dd class="salesMsg">` + response[i]['salesperson_code'] + `</dd>
                                <dd class="detailMsg">` + description + `</dd>
                                <dd class="status">` + response[i]['code_expired'] + `</dd>
                            </dl>
                        </li>
                        `;
                        $("ul.disabledListInfo").append($html);
                        detailText();
                    }
                }
                heightRange();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    }

    loadData(offset);

    $(".order-unfold").on('click', function () {
        offset += 5;
        loadData(offset);
    });

    $("#coupon-filter-confirm").on('click', function () {
        offset = 10;
        loadData(offset);
    });

    $(".checkbox-success input[type='checkbox']").on("change", function() {
        if ($(this).attr("checked") !== "checked") {
            $(".defaultList").hide();
            $(".disabledListInfo").show();
        } else {
            $(".defaultList").show();
            $(".disabledListInfo").hide();
        }
        offset = 10;
        loadData(offset);
    });

    $("#insert-coupon-salesperson").on('focus', function() {
        var current_id = $(this).attr('id');
        var url = location.protocol.concat("//").concat(location.host).concat('/database/autoComplete.php');
        $.ajax({
            url: url,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            type: 'POST',
            data: { target: "salesperson" },
            success: function(response) { autocomplete(document.getElementById(current_id), JSON.parse(response)); },
            error: function(jqXHR, textStatus, errorThrown) { console.log(textStatus, errorThrown); }
        });
    });

    $("#insert-cuopon").on('click', function () {
        var data = {
            code: $("#insert-coupon-code").val(),
            value: $("#insert-coupon-value").val(),
            salesperson: $("#insert-coupon-salesperson").val(),
            description: $("#insert-coupon-description").val(),
            action: 'addCoupon'
        }

        var url = location.protocol.concat("//").concat(location.host).concat('/database/Other/CouponManagement.php');
        $.ajax({
            url: url,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            type: 'POST',
            data: data,
            success: function(response) {
                offset = 10;
                loadData(offset);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    });

    $("#coupon-disable-confirm").on('click', function () {
        for (var i = 0; i < $(".selected").length; i++) {
            var coupon_code = $($(".selected")[i])[0]['innerText'].split(" ")[0];
            var url = location.protocol.concat("//").concat(location.host).concat('/database/Other/CouponManagement.php');
            $.ajax({
                url: url,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                type: 'POST',
                data: {
                    action: 'disabledCoupon',
                    code: coupon_code
                },
                success: function(response) {
                    loadData(offset);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }
            });
        }
    });

    $("#insert-reset").on('click', function () {
        $("ul.addInfo").find("input").val("");
        $("#insert-coupon-description").val("");
    });
});

function listStatus() {
    $(document).on('click', 'ul.listInfo li.listDetail dl', function () {
		if($(this).hasClass("selected")) {
			$(this).removeClass("selected");
		} else {
			$(this).addClass("selected");
		}
	});
}
