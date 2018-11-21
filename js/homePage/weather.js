/*
 * 天气
 */
function weather() {
	$.ajax({
		type: "post",
		url: "https://free-api.heweather.com/s6/weather/now?location=auto_ip&key=925b767a1d834c66bd48b642a78f8550",
		success: function(result) {
			var weather = JSON.stringify(result);
			var now = result.HeWeather6[0].now; //现在的天气
			var basic = result.HeWeather6[0].basic; //基本信息
			var weather_code = now.cond_code; //天气代码
			var weather_txt = now.cond_txt;
			var weather_tmp = now.tmp; //温度
			var wind_sc = now.wind_sc; //风力
			var wind_dir = now.wind_dir; //风向
			//当前城市
			var current_city = basic.location;
			var e = '<ul>' +
								'<li class="tmp">' + weather_tmp + '&deg;' + '</li>' +
								'<li class="otherInfo">' +
									'<dl>' +
										'<dd class="currentCity">' + current_city + '</dd>' +
									'</dl>' +
									'<dl class="otherInfo">' +
										'<dd class="condTxt layui-col-md4">' + weather_txt + '</dd>' +
										'<dd class="windDir layui-col-md4">' + wind_dir + '</dd>' +
										'<dd class="windSc  layui-col-md4">' + wind_sc + "级" + '</dd>' +
									'</dl>' +
								'</li>' +
							'</ul>' +
							'<img src="img/cond-icon-heweather/' + weather_code + '.png" />';
			$("#weather").append(e);
		},
		error: function() {
			console.log('fail');
		}
	});
}
