/**
 * 封装Ajax</br> 参数说明：</br> opts: {'可选参数'}</br> type:
 * 请求方式:GET/POST,默认值:'GET';</br> url: 发送请求的地址, 默认值: 当前页地址;</br> data:
 * 请求参数;</br> data: string,json;</br> async: 是否异步:true/false,默认值:true;</br>
 * cache: 是否缓存：true/false,默认值:true;</br> contentType:
 * HTTP头信息，默认值：'application/x-www-form-urlencoded';</br> success:
 * 请求成功后的回调函数;</br> error: 请求失败后的回调函数;</br>
 */
var UntilsModule = (function ($, window, document) {
	return {
		ajaxRequest: function (opts) {
			// 一.设置默认参数
			var defaults = {
				url: '',
				type: '',
				data: '',
				cache: true,
				async: false,
				dataType: 'json',
				contentType: "application/json;charset=UTF-8",
				success: function () {},
				error: function () {}
			};

			// 二.用户参数覆盖默认参数
			for (var key in opts) {
				defaults[key] = opts[key];
			}
			// 三.开始组装ajax
			$.ajax({
				url: defaults.url,
				type: defaults.type,
				data: defaults.data,
				async: defaults.async,
				cache: defaults.cache,
				dataType: defaults.dataType,
				contentType: defaults.contentType,
				beforeSend: function (XHR) {},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					console.log("错误信息" + errorThrown.toString());
				},
				success: defaults.success
			});
		},
	}
})(jQuery, window, document);