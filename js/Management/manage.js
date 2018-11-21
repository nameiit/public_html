function manageTabAction() {
	$(".manageTabActionNav").find("li").on("click", function() {
		if(!$(this).hasClass("manage-active")) {
			$(this).addClass("manage-active");
			$(this).siblings().removeClass("manage-active");
		}
		//添加
		if($(".addInfo").hasClass("manage-active")) {
			$(".addTabMsg").css("display", "block");
			$(".amendTabMsg").css("display", "none");
			$(".amendTabMsg").addClass("nm-hide");
		}
		//修改
		if($(".amendInfo").hasClass("manage-active")) {
			$(".amendTabMsg").css("display", "block");
			$(".amendTabMsg").removeClass("nm-hide");
			$(".addTabMsg").addClass("nm-hide");
			$(".addTabMsg").css("display", "none");
		}
	});
}
//下拉搜索
function searchTab(selectItem, getFilterData, loadData) {
    selectItem.searchableSelect({
        afterSelectItem: function() {
            if (this.holder.text() !== this.element[0][0].text) {
                $("li.detail-active").css({
                    "overflow": "initial",
                    "background-color": "#fe6345"
                });
            } else {
                $("li.detail-active").css({
                    "overflow": "initial",
                    "background-color": "#9295ff"
                });
            }
            $("selectItem option:contains(" + this.holder.text() + ")").attr('selected', 'selected');
            var data = getFilterData();
            loadData(data);
        }
    });
}
//对销售人员的不可见:
function toSalesManagePage() {
    var flag = false;
    $("a#goSalesManage").on("click", function() {
        //销售人员
        if (flag == true) {
            $(this).attr("href", "javascript:void(0);");
            alert("无法访问");
        }
        //非销售人员
        if (flag == false) {
            $(this).attr("href", "SalesManage.php");
        }
    });
}
