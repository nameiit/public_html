function confirmMsg() {
    $(".updateInfo ul.filterBox  li  dl.confirmMsg dd ").find("a").on("mousedown", function() {
        $(this).addClass("confirm-active");
    });
    $(".updateInfo ul.filterBox  li  dl.confirmMsg dd ").find("a").on("mouseup", function() {
        $(this).removeClass("confirm-active");
    })
}

function updateListState() {
    $(".updateTab ul.tabListDetail").find("li").on("click", function() {
        if ($(this).hasClass("selected")) {
            $(this).removeClass("selected");
        } else {
            $(this).addClass("selected").siblings().removeClass("selected");
        }
    });
    
}
