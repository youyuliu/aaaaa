;
StaffModule = (function ($, window, document, echarts) {
    var thisContext;
    var timeId;
    var vm;
    var companyId = GlobalJsModule.companyId;
    var StaffClass = function () {
        thisContext = this;
        this.init = function () {
            this.initVue();
            this.initData();

            
            thisContext.initEcharts();
            this.initScroll();

        }
    }
    StaffClass.prototype = {
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
                    // 客户识别列表

                    scrollUlData: [{
                        "actionType": '0',
                        "appointment": true,
                        "dateTime": "2019.12.09",
                        "faceUrl": "../static/imgs/employee/datouxiang.png",
                        "frameUrl": "",
                        "maxScore": 0,
                        "more": true,
                        "name": "fafafa",
                        "sex": 0,
                        "todayCount": 0
                    }, {
                        "actionType": '0',
                        "appointment": true,
                        "dateTime": "2019.12.09",
                        "faceUrl": "../static/imgs/employee/datouxiang.png",
                        "frameUrl": "",
                        "maxScore": 0,
                        "more": true,
                        "name": "fafafa",
                        "sex": 0,
                        "todayCount": 0
                    }, ],
                    // 到店统计
                    arriveStore: {
                        "appointmentCount": 1,
                        "moreCount": 1,
                        "totalCount": 1
                    },
                    lastedArrive: {
                        "actionType": '0',
                        "appointment": true,
                        "dateTime": "2019.12.09",
                        "faceUrl": "../static/imgs/employee/datouxiang.png",
                        "frameUrl": "",
                        "maxScore": 0,
                        "more": true,
                        "name": "fafafa",
                        "sex": 2, //1男2女
                        "todayCount": 0
                    }

                }
            })
        },
        initData: function () {
            // 到店统计
            UntilsModule.ajaxRequest({
                url: GlobalJsModule.BaseUrl + "/view/customer/toStoreStatistics",
                //contentType: "application/json;charset=UTF-8",
                dataType: "json",
                type: 'get',
                data: {
                    companyId: companyId
                },
                async: false,
                success: function (res) {
                    if (res.code === 0) {
                        vm.arriveStore = res.data;
                    }
                }
            });
            // 客流统计
            UntilsModule.ajaxRequest({
                url: GlobalJsModule.BaseUrl + "/view/customer/passengerFlowStatistics",
                //contentType: "application/json;charset=UTF-8",
                dataType: "json",
                type: 'get',
                data: {
                    companyId: companyId
                },
                async: false,
                success: function (res) {


                    res.results = [{
                        "actionType": '0',
                        "appointment": true,
                        "dateTime": "",
                        "faceUrl": "",
                        "frameUrl": "",
                        "maxScore": 0,
                        "more": true,
                        "name": "",
                        "sex": 0,
                        "todayCount": 0
                    }]

                }
            });
            // 最新客户识别列表
            UntilsModule.ajaxRequest({
                url: GlobalJsModule.BaseUrl + "/view/customer/latestPersonList",
                //contentType: "application/json;charset=UTF-8",
                dataType: "json",
                type: 'get',
                data: {
                    companyId: companyId
                },
                async: false,
                success: function (data) {

                }
            });
            // 最新客户识别
            UntilsModule.ajaxRequest({
                url: GlobalJsModule.BaseUrl + "/view/customer/latestPerson",
                //contentType: "application/json;charset=UTF-8",
                dataType: "json",
                type: 'get',
                data: {
                    companyId: companyId
                },
                async: false,
                success: function (data) {

                }
            });




        },
        initEcharts: function () {

            var option = {
                title: {
                    show: true,
                    text: '人',
                    textStyle: {
                        fontSize: 12,
                        color: '#fff',
                    },
                    // top: "14",
                    left: "60px"
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    right: 30,
                    // top: 10,
                    show: true,
                    padding: [0, 0, 0, 0],
                    // 单独设置每一项为圆形
                    data: [{
                        name: '入店人次',
                        // 强制设置图形为圆。
                        icon: 'circle',

                    }, {
                        name: '出店人次',
                        // 强制设置图形为圆。
                        icon: 'circle',

                    }],
                    itemWidth: 10,
                    itemHeight: 10,
                    borderRadius: 5,
                    textStyle: {
                        color: "#00E4FE",
                        fontSize: 14,
                        padding: [0, 10, 0, 0]
                    },
                },
                grid: {
                    left: "39px",
                    right: "30px",
                    bottom: "20px",
                    top: "25px",
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: ['一号门',
                        '二号门',
                        '三号门',
                    ], // 只有type: 'category'生效
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "#fff",
                            width: 1,
                            type: "solid"
                        },
                    },
                    axisTick: {
                        show: false,
                        alignWithLabel: true
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: "#fff",
                        }
                    },
                }],
                yAxis: [{
                    type: 'value',
                    splitNumber: 4, // type: 'category'不生效
                    axisLabel: {
                        formatter: '{value} '
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "#fff",
                            width: 1,
                            type: "solid"
                        },
                    },
                    axisTick: {
                        show: false,
                        alignWithLabel: true
                    },
                    splitLine: {
                        lineStyle: {
                            color: "rgba(128, 128, 128, 0.25)",
                        }
                    },
                    // min: function(value) {
                    //     return value.min - 10;
                    // }
                }],
                series: [{
                        name: "入店人次",
                        type: 'bar',
                        data: [20, 250, 80],
                        barWidth: 40, //柱子宽度
                        //barGap: 1, //柱子之间间距
                        itemStyle: {
                            normal: {
                                color: "#F88CF8",
                            }
                        }
                    },
                    {
                        name: "出店人次",
                        type: 'bar',
                        data: [120, 502, 802],
                        barWidth: 40, //柱子宽度
                        //barGap: 1, //柱子之间间距
                        itemStyle: {
                            normal: {
                                color: "#86D0FF",
                            }
                        }
                    },
                ]
            };
            var echart = echarts.init(document.querySelector("#echartsContainer"));
            echart.setOption(option);

        },
        initScroll: function () {

            $(function () {
                var timeId = setInterval(play, 3000);

                function play() {
                    $("#scrollul").animate({
                            "marginLeft": "-300px"
                        },
                        100,
                        function () {
                            /* stuff to do after animation is complete */
                            $(this).css({
                                "marginLeft": 0
                            }).children("li:first").appendTo(this);
                        });
                }
                $("#scrollul").hover(function () {
                    /* Stuff to do when the mouse enters the element */
                    clearInterval(timeId);
                }, function () {
                    /* Stuff to do when the mouse leaves the element */
                    timeId = setInterval(play, 3000);
                });
            })
        },
        constructor: StaffClass,

    };
    return new StaffClass();
})(jQuery, window, document, echarts);
$(StaffModule.init());