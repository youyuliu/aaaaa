;
var GlobalJsModule = (function ($, window, document, echarts) {
    var thisContext;
    var timeId;
    var GlobalJsClass = function () {}
    GlobalJsClass.prototype = {

        BaseUrl: "http://test-look-identify-api.yunshicloud.com", // 后台接口服务路径
        companyId: "test", //默认是test


        constructor: GlobalJsClass,
    };
    return new GlobalJsClass();
})(jQuery, window, document, echarts);