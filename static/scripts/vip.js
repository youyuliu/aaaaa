;
VipModule = (function ($, window, document, echarts) {
    var thisContext;
    var timeId;
    var vm;
    var companyId = GlobalJsModule.companyId;
    var VipClass = function () {
        thisContext = this;
        this.init = function () {
            this.initVue();
            this.initData();
            this.initScroll();
            setInterval(function () {
                console.log("timer")
                thisContext.initData();
            }, 1000)
        }
    }
    VipClass.prototype = {
        initVue: function () {
            vm = new Vue({
                el: '#container',
                data: {
                    scrollUlData: [{
                        number: 1,
                        name: '2',
                        appointment: "flajfal",
                        inOut: '3dfa',
                        time: "2019:12:11"
                    }, {
                        number: 2,
                        name: '2',
                        appointment: "flajfal",
                        inOut: '3dfa',
                        time: "2019:12:11"
                    }, {
                        number: 3,
                        name: '2',
                        appointment: "flajfal",
                        inOut: '3dfa',
                        time: "2019:12:11"
                    }, {
                        number: 4,
                        name: '2',
                        appointment: "flajfal",
                        inOut: '3dfa',
                        time: "2019:12:11"
                    }, {
                        number: 5,
                        name: '2',
                        appointment: "flajfal",
                        inOut: '3dfa',
                        time: "2019:12:11"
                    }, {
                        number: 6,
                        name: '2',
                        appointment: "flajfal",
                        inOut: '3dfa',
                        time: "2019:12:11"
                    }],
                    // vip客户对比
                    vipUserInfo: {}

                }
            })
        },
        initData: function () {
            // vip识别列表
            UntilsModule.ajaxRequest({
                url: GlobalJsModule.BaseUrl + "/view/vip/latestVipList",
                //contentType: "application/json;charset=UTF-8",
                dataType: "json",
                type: 'get',
                data: {
                    companyId: companyId,
                    currentPage: 1,
                    pageNum: 20
                },
                async: false,
                success: function (res) {
                    if (res.code === 0) {
                        vm.scrollUlData = res.data.results;

                        console.log(vm.scrollUlData);
                    }
                }
            });
            // 最新客户识别
            UntilsModule.ajaxRequest({
                url: GlobalJsModule.BaseUrl + "/view/vip/latestVip",
                //contentType: "application/json;charset=UTF-8",
                dataType: "json",
                type: 'get',
                data: {
                    companyId: companyId
                },
                async: false,
                success: function (res) {
                    if (res.code === 0) {
                        res.data.licensePlates = res.data.licensePlates.map(function (v, k, arr) {
                            v = JSON.parse(v)
                            return v;
                        })
                        vm.vipUserInfo = res.data;
                        thisContext.initEcharts(Number(res.data.maxScore * 100).toFixed(0));

                    }
                }
            });



        },
        initEcharts: function (echartsData) {

            var faultPieEchart = echarts.init(document.getElementById('comparecircle')); //初始化echarts实例
            var faultPieOption = {
                series: {
                    type: 'pie',
                    clockWise: false,
                    hoverAnimation: false,
                    silent: true,
                    radius: ['100%', '93%'],
                    center: ['50%', '50%'],
                    data: [{
                        value: 75,
                        name: 'invisible',
                        itemStyle: {
                            normal: {
                                color: '#00e4fe',
                                borderWidth: 1,
                                borderColor: '#073A66',
                                opacity: 0.2
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                    }, {
                        value: echartsData,
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        label: {
                            normal: {
                                rich: {
                                    a: {
                                        color: '#fff',
                                        align: 'center',
                                        fontSize: 29,
                                        fontFamily: 'Microsoft YaHei',
                                        fontWeight: "bold",
                                    },
                                    c: {
                                        color: '#fff',
                                        fontSize: 29,
                                        fontFamily: 'Microsoft YaHei',
                                        fontWeight: "bold"
                                    }
                                },
                                formatter: function (params) {
                                    return "{a|" + params.value + "}" + " {c|%}";
                                },
                                position: 'center',
                                show: true,
                                textStyle: {
                                    fontSize: '14',
                                    fontWeight: 'normal',
                                    color: '#fff'
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#00e4fe',
                            }
                        }
                    }]
                }
            }
            faultPieEchart.setOption(faultPieOption)
        },
        initScroll: function () {

            $(function () {
                var timeId = setInterval(play, 10000);

                function play() {
                    $("#scrollul").animate({
                            "marginTop": "-102px"
                        },
                        100,
                        function () {
                            /* stuff to do after animation is complete */
                            $(this).css({
                                "marginTop": 0
                            }).children("li:first").appendTo(this);
                        });
                }
                $("#scrollul").hover(function () {
                    /* Stuff to do when the mouse enters the element */
                    clearInterval(timeId);
                }, function () {
                    /* Stuff to do when the mouse leaves the element */
                    timeId = setInterval(play, 10000);
                });
            })

        },

        parseScore: function (num) {
            var percent = Number(num * 100).toFixed(0) + "%";
            return percent;
        },
        constructor: VipClass,

    };
    return new VipClass();
})(jQuery, window, document, echarts);
$(VipModule.init());