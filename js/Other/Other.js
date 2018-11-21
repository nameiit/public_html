function checkedState() {
    $(".otherManageNav ul").find("li").on("click", function() {
        if (!$(this).hasClass("current-item")) {
            $(this).addClass("current-item").siblings().removeClass("current-item");
        }
    });

    $(".filterBox ul").find("li").on("mousedown", function() {
        $(this).addClass("selected");
    });
    $(".filterBox ul ").find("li").on("mouseup", function() {
        $(this).removeClass("selected");
    });
}

//查询
function filterCodeInfo() {
    $("li.searchInfo.action-item").on("click", function() {
        var discountCode = $("li.discountCode").find("input[type='text']").val();
        var discountAmount = $("li.discountAmount").find("input[type='text']").val();
        var discountCodeMsg = $("ul.listInfo").find("li").find("dd.discountCodeMsg"); //折扣码
        var discountAmountMsg = $("ul.listInfo").find("li").find("dd.discountAmountMsg"); //折扣金额
        var salesMsg = $("ul.listInfo").find("li").find(".salesMsg"); //销售人员
        var detailMsg = $("ul.listInfo").find("li").find(".detailMsg"); //详情
        if (discountCode == "" || discountAmount == "") {}
        if (discountCode !== "" || discountAmount !== "") {
            //alert(discountCode+"+"+discountAmount);
            discountCodeMsg.text($.trim(discountCode));
            discountAmountMsg.text($.trim(discountAmount));
        }

    });
}
function salesAction() {
    $(".optionItem").on("mousedown", function() {
        $(this).addClass("option-active");
    });
    $(".optionItem").on("mouseup", function() {
        $(this).removeClass("option-active");
    });
    //添加
    $(".plusItem").on("click", function() {
        $("li.salesFilter").css("visibility", "visible");
        $("li.salesFilter").find("input").on("keydown", function() {
            if (event.keyCode == 13) {
                var salesNameTxt = $.trim($("li.salesFilter").find("input").val()); //当前输入框的值
                var salesInfo = $.trim($(".salesName").text()); //销售人员信息
                console.log(salesNameTxt);
                if ($(".salesName").length < 1000) {
                    if (salesInfo.indexOf(salesNameTxt) !== -1) {
                        alert("输入的销售人员信息不能一致");
                        $("li.salesFilter").find("input").val(" ");
                    } else {
                        var e = `
							<li class="salesName">` + salesNameTxt + `
							</li>
							`;
                        $(".rightInfo ul").append(e);
                        //当前为背景为灰色
                        $("li.salesName:last").addClass("selected").siblings("li.salesName").removeClass("selected");
                        $("li.salesFilter").find("input").val(" "); //清空输入框的值
                        salesNameState();
                    }
                } else {
                    alert("最多添加7人");
                }
            }
        });
        minusAction();

    });

}
//移除
function minusAction() {
    $(".minusItem").on("click", function() {
        //移除当前选中的元素
        $(".rightInfo ul").find("li.salesName.selected").remove("");
        $("li.salesFilter").find("input").val("");
    });
}
//销售人员的选中状态
function salesNameState() {
    $(".rightInfo").find("ul").find("li.salesName").unbind("click").on("click", function() {
        if (!$(this).hasClass("selected")) {
            $(this).addClass("selected");
        } else {
            $(this).removeClass("selected");
        }
    });
}

function resetInfo() {
    $(".resetInfo").on("click", function() {
        $("ul.addInfo").find("input").val(" ");
    });
}

//跳转到用户管理页面
function toUsersManagePage() {
    var isSales = true;
    $("a#toUsersManagePage").on("click", function() {
        //对于销售人员:
        if (isSales == true) {
            $(this).attr("href", "UsersManageToSales.php");
        }
        //对于管理人员:
        if (isSales == false) {
            $(this).attr("href", "UsersManageToAdmin.php");
        }
    });
}

function detailText() {
    //"折扣码"详情修改(未过期部分)：
    var detailBox = $("ul.listInfo.defaultList").find("li").find("dl").find("dd.detailMsg");
    for (var j = 0; j < detailBox.length; j++) {
        if ($(detailBox[j]).height() >= 32) {
            $("ul.listInfo.defaultList").find("li.listDetail").eq(j).find("dl").find("dd").css({
                "height": $(detailBox[j]).height(),
                "line-height": $(detailBox[j]).height() + "px"
            });
        }
    }
    //"折扣码","过期"部分详情：
    /*var detailBox2=$("ul.listInfo.disabledListInfo").find("li").find("dl").find("dd.detailMsg");
    for(var j=0;j<detailBox.length;j++){
    	if($(detailBox2[j]).height()>=32){
    		$("ul.listInfo.disabledListInfo").find("li.listDetail").eq(j).find("dl").find("dd").css({
    			"height": $(detailBox2[j]).height(),
    			"line-height": $(detailBox2[j]).height() + "px"
    		});
    	}
    }*/
    //折扣码
    var discountCodeBox = $("ul.listInfo.disabledListInfo").find("li.listDetail");
    for (var j = 0; j < discountCodeBox.length; j++) {
        console.log($(discountCodeBox[j]).outerHeight());
        if ($(discountCodeBox[j]).height() >= 32) {
            $("ul.listInfo.disabledListInfo").find("li.listDetail").eq(j).find("dl").find("dd").css({
                "height": $(discountCodeBox[j]).outerHeight(),
            });
        }
    }
    //"分部"详情
    var detailCell = $(".divisionRightInfo").find("ul.divisionMsg").find("li").find("dl").find("dd.divisionDetail");
    for (var i = 0; i < detailCell.length; i++) {
        if ($(detailCell[i]).height() >= 32) {
            $(".divisionRightInfo").find("ul.divisionMsg").find("li").eq(i).find("dl").find("dd.divisionName").css({
                "height": $(detailCell[i]).height(),
                "line-height": $(detailCell[i]).height() + "px"
            });
        }
    }
}
