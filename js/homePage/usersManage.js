function cardToggle() {
	$(".usersManageNav").find("li").on("click", function() {
		var index = $(this).index();
		$(this).addClass("current-item").siblings("li").removeClass("current-item");
		$(".usersManageInfo").eq(index).css("display", "block").siblings(".usersManageInfo").css("display", "none");
		$(".changePassWord.usersManageInfo.salesPassWordBox").find("input[type='password']").val("");
		// $(".basicInfo.usersManageInfo").find("input[type='text']").val("");
		// $(".basicInfo.usersManageInfo").find("textarea").val("");
		$(".usersInfo ul").find("li").removeClass("selected");
		$(".userGroup ul").find("li").removeClass("selected");
	});
}
//确认修改(销售人员：修改密码部分)：
function confirmUserInfo() {
	$(".changePassWord").find("a.confirmAmendInfo").on("click", function() {
		userPassWord = $("#userPassWord").val();
		confirmUserPassWord = $("#confirmUserPassWord").val();
		if(userPassWord!== "" && confirmUserPassWord!== "") {
			if(userPassWord !== confirmUserPassWord) {
				$("#userPassWord").val("");
				$("#confirmUserPassWord").val("");
				alert("两次输入的密码信息需保持一致");
			} 
			else {
				//点击复制
				$(".confirmUsersInfo").css("display","block");
				var clipboard = new ClipboardJS('.actionConfirm', {
					text: function() {
						alert("复制成功!");
						return "新密码是：" + "\n" + confirmUserPassWord;
					}
				});
				//点击返回
				$(".actionCancel").unbind("click").on("click", function() {
					$(".confirmUsersInfo").css("display","none");
					clipboard.destroy();
				});
			}
		} else {
			alert("请确认密码已输入");
		}
	});
}
//确认修改(销售人员：清空密码部分)：
function clearUserPass() {
	//清空密码
	$(".changePassWord").find("a.confirmReset").on("click", function() {
		userPassWord = $("#userPassWord").val();
		confirmUserPassWord = $("#confirmUserPassWord").val();
		if(userPassWord !== "" && confirmUserPassWord !== "") {
			$("#userPassWord").val("");
			$("#confirmUserPassWord").val("");
			alert("密码已清空");
		}
	});
}
//确认修改(销售人员：基本信息部分)
function amendBasicInfo() {
	var lastName = $(".basicInfo ul").find("input.lastName");
	var firstName = $(".basicInfo ul").find("input.firstName");
	var codeInfo = $(".basicInfo ul").find("input.codeInfo");
	var genderInfo = $(".basicInfo ul").find("select.genderInfo");
	var phoneNum = $(".basicInfo ul").find("input.phoneNum");
	var divisionInfo = $(".basicInfo ul").find("select.divisionInfo");
	var mailInfo = $(".basicInfo ul").find("input.mailInfo");
	var detailInfo = $(".basicInfo ul").find("textarea");
	if(lastName.val() !== "" && firstName.val() !== "") {
		//未点击修改之前的重置
		localStorage.setItem("lastNameMsg", lastName.val());
		localStorage.setItem("firstNameMsg", firstName.val());
		localStorage.setItem("codeMsg", codeInfo.val());
		localStorage.setItem("genderMsg", genderInfo.find("option:selected").text());
		localStorage.setItem("phoneNumMsg", phoneNum.val());
		localStorage.setItem("divisionMsg", divisionInfo.find("option:selected").text());
		localStorage.setItem("mailMsg", mailInfo.val());
		localStorage.setItem("detail", detailInfo.val());

	}
	$(".basicInfo ul").find("li.actionFilerBox").find("a.confirmAddInfo").on("click", function() {
		//点击修改之后的重置信息
		if(lastName.val() !== "" && firstName.val() !== "") {
			localStorage.setItem("lastNameMsg", lastName.val());
			localStorage.setItem("firstNameMsg", firstName.val());
			localStorage.setItem("codeMsg", codeInfo.val());
			localStorage.setItem("genderMsg", genderInfo.find("option:selected").text());
			localStorage.setItem("phoneNumMsg", phoneNum.val());
			localStorage.setItem("divisionMsg", divisionInfo.find("option:selected").text());
			localStorage.setItem("mailMsg", mailInfo.val());
			localStorage.setItem("detail", detailInfo.val());
			alert("基本信息已修改");
		} else {
			alert("请确认姓名信息已经填写");
		}
	});
}
//确认重置(销售人员：基本信息部分)
function resetBasicInfo() {
	$(".basicInfo ul").find("li.actionFilerBox").find("a.confirmReset").on("click", function() {
		var lastName = $(".basicInfo ul").find("input.lastName");
		var firstName = $(".basicInfo ul").find("input.firstName");
		var codeInfo = $(".basicInfo ul").find("input.codeInfo");
		var genderInfo = $(".basicInfo ul").find("select.genderInfo");
		var phoneNum = $(".basicInfo ul").find("input.phoneNum");
		var divisionInfo = $(".basicInfo ul").find("select.divisionInfo");
		var mailInfo = $(".basicInfo ul").find("input.mailInfo");
		var detailInfo = $(".basicInfo ul").find("textarea");

		lastName.val(localStorage.getItem("lastNameMsg"));
		firstName.val(localStorage.getItem("firstNameMsg"));
		codeInfo.val(localStorage.getItem("codeMsg"));
		genderInfo.val(localStorage.getItem("genderMsg"));
		phoneNum.val(localStorage.getItem("phoneNumMsg"));
		divisionInfo.val(localStorage.getItem("divisionMsg"));
		mailInfo.val(localStorage.getItem("mailMsg"));
		detailInfo.val(localStorage.getItem("detail"));
		alert("信息已重置");
	});
}
//管理人员部分   s
function manageToggle() {
	//销售人员
	$(".userGroup").find("li.salesNav").on("click", function() {
		$(this).addClass("selected").siblings().removeClass("selected");
		$("input.userName").val(" ");
		$(".usersInfo ul").find("li").removeClass("selected");
		var userNameList = ["Sales.A", "Sales.B", "Sales.C", "Sales.D"];
		var userName = $(".usersInfo ul li dl").find("dd.userName");
		for(var i = 0; i < userNameList.length; i++) {
			$(userName[i]).text($.trim(userNameList[i]));
		}

	});
	//会计
	$(".userGroup").find("li.accountingNav").on("click", function() {
		$(this).addClass("selected").siblings().removeClass("selected");
		$("input.userName").val(" ");
		$(".usersInfo ul").find("li").removeClass("selected");
		var userNameList = ["Accountant.A", "Accountant.B", "Accountant.C", "Accountant.D"];
		var userName = $(".usersInfo ul li dl").find("dd.userName");
		for(var i = 0; i < userNameList.length; i++) {
			$(userName[i]).text($.trim(userNameList[i]));
		}

	});
	//管理员
	$(".userGroup").find("li.managerNav").on("click", function() {
		$(this).addClass("selected").siblings().removeClass("selected");
		$("input.userName").val(" ");
		$(".usersInfo ul").find("li").removeClass("selected");
		var userNameList = ["Manager.A", "Manager.B", "Manager.C", "Manager.D"];
		var userName = $(".usersInfo ul li dl").find("dd.userName");
		for(var i = 0; i < userNameList.length; i++) {
			$(userName[i]).text($.trim(userNameList[i]));
		}

	});
}

//管理人员部分  e
function fillTab() {
	$(".usersInfo ul").find("li").on("click", function() {
		$(this).addClass("selected").siblings().removeClass("selected");
		var userName = $.trim($(this).find("dd:first").text());
		$("input.userName").val(userName);
		confirmInfo(); //修改
	});
}
//确认修改：
function confirmInfo() {
	$("a.amend-tabInfo").on("click", function() {
		$(".confirmUsersInfo").find("p.confirmNotice").text("修改成功");
		userName = $("#userName").val();
		userPassWord = $("#userPass").val();
		if(userPassWord !== "" && userName !== "") {
			$(".confirmUsersInfo").fadeIn();
			//点击复制
			$('.actionConfirm').unbind("click").zclip({
				path: '../js/ZeroClipboard.swf',
				copy: function() { //复制内容
					return "用户：" + userName + "的新密码是：" + "\n" + userPassWord
				},
				afterCopy: function() {
					alert("复制成功!");
					$(this).blur();
				}
			});
			$(".actionCancel").on("click", function() {
				$(".confirmUsersInfo").fadeOut();
				$('.actionConfirm').unbind("click");
				$('.actionConfirm').unbind("click");
			});
		} else {
			alert("请确认密码已输入");
		}
	});
}

//用户管理（管理人员修改部分：重置）：
function resetTabInfo() {
	$("ul.manageDetail li.actionFilerBox").find("a.reset-tabInfo").on("click", function() {
		$("input.userName").val("");
		$("input#userPass").val("");
		$(".usersInfo ul").find("li").removeClass("selected");
	});
}
//用户管理（管理人员修改部分：确认添加）：
function confirmAddInfo() {
	$("a.add-userInfo").on("click", function() {
		$(".confirmUsersInfo").find("p.confirmNotice").text("添加成功");
		userName = $("#addUserName").val();
		userPassWord = $("#addPassWord").val();
		if(userPassWord !== "" && userName !== "") {
			$(".confirmUsersInfo").fadeIn();
			var clipboard = new ClipboardJS('.copyInfo', {
				text: function() {
					$(this).blur();
					alert("复制成功!");
					return "新用户：" + userName + "\n" + "密码:" + userPassWord
				}
			});
			$(".actionCancel").on("click", function() {
				$(".confirmUsersInfo").fadeOut();
				$('.actionConfirm').unbind("click");
				$('.copyInfo').unbind("click");
				clipboard.destroy();
			});
		} else {
			alert("请确认要添加的用户名和密码已输入");
		}
	});
}
//添加部分的重置:
function clearUserInfo() {
	$("ul.manageDetail").find("li.actionFilerBox").find("a.clear-userInfo").on("click", function() {
		$("input#addUserName").val("");
		$("#addPassWord").val("");
	});
}
