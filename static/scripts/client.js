;
ClientModule = (function ($, window, document, echarts) {
    var thisContext;
    var timeId;
    var vm;
    var companyId = GlobalJsModule.companyId;
    var ClientClass = function () {
        thisContext = this;
        this.init = function () {
            this.initVue();
            thisContext.initData();
            this.initScroll();

            setInterval(function () {
                console.log("timer")
                thisContext.initData();
            }, 1000)
        }
    }
    ClientClass.prototype = {
        initVue: function () {
            vm = new Vue({
                el: '#container',
                data: {
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
                    // 
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
            // 最新客户识别列表
            UntilsModule.ajaxRequest({
                url: GlobalJsModule.BaseUrl + "/view/customer/latestPersonList",
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
                    vm.scrollUlData = res.data.results;
                }
            });
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
                    var inArr = new Array();
                    var outArr = new Array();
                    var timeArray = new Array();
                    res.data.in.forEach(function (v, k, arr) {
                        inArr.push(Number(v.count));
                        
                    })
                    res.data.out.forEach(function (v, k, arr) {
                        outArr.push(Number(v.count));
                        timeArray.push(v.id);
                    })
                    debugger;
                    thisContext.initEcharts(inArr, outArr, timeArray)
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
                success: function (res) {
                    vm.lastedArrive = res.data;
         
                }
            });
        },
        initEcharts: function (inArr, outArr, timeArray) {
            var option = {
                color: ['#16A0FF', '#b966f9'],
                legend: {
                    // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
                    orient: 'horizontal',
                    // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
                    x: '300px',
                    // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
                    y: '30px',
                    data: ['进店人数', '出店人数'],
                    textStyle: {
                        color: "#8BD7FF",
                        fontSize: 14,
                        padding: [0, 0, 0, 0]
                    },
                },

                //  图表距边框的距离,可选值：'百分比'¦ {number}（单位px）
                grid: {
                    top: '65px', // 等价于 y: '16%'
                    left: "50px",
                    right: '60px',
                    bottom: '30px',
                    containLabel: true
                },

                // 提示框
                tooltip: {
                    trigger: 'axis'
                },

                //工具框，可以选择
                // toolbox: {
                //     feature: {
                //         saveAsImage: {} //下载工具
                //     }
                // },
                xAxis: {
                    type: 'category',
                    axisLine: {
                        show: false,
                        lineStyle: {
                            width: 1,
                            type: "solid",
                            color: '#fff'
                        },
                    },
                    axisTick: {
                        show: false,
                        alignWithLabel: false
                    },
                    // 分隔线
                    splitLine: {
                        lineStyle: {
                            color: ['#fff'],
                            opacity: 0.2
                        }
                    },
                    // 设置X轴数据旋转倾斜
                    axisLabel: {
                        interval: 0 //设置X轴数据间隔几个显示一个，为0表示都显示
                    },
                    // boundaryGap值为false的时候，折线第一个点在y轴上
                    boundaryGap: false,
                    data: timeArray
                },

                yAxis: {
                    name: '人',
                    type: 'value',
                    min: 0, // 设置y轴刻度的最小值
                    splitNumber: 4, // 设置y轴刻度间隔个数
                    axisLine: {
                        show: false,
                        lineStyle: {
                            // 设置y轴颜色
                            color: '#fff'
                        }
                    },
                    axisTick: {
                        show: false,
                        alignWithLabel: false
                    },
                    // 分隔线
                    splitLine: {
                        lineStyle: {
                            color: ['#fff'],
                            opacity: 0.2
                        }
                    },
                },

                series: [{
                        name: '进店人数',
                        data: inArr,
                        type: 'line',
                        // 设置小圆点消失
                        // 注意：设置symbol: 'none'以后，拐点不存在了，设置拐点上显示数值无效
                        symbol: 'none',
                        // 设置折线弧度，取值：0-1之间
                        smooth: 0.5,
                        areaStyle: {}
                    },
                    {
                        name: '出店人数',
                        data: outArr,
                        type: 'line',
                        // 设置小圆点消失
                        // 注意：设置symbol: 'none'以后，拐点不存在了，设置拐点上显示数值无效
                        symbol: 'none',
                        // 设置折线弧度，取值：0-1之间
                        smooth: 0.5,
                        areaStyle: {}
                    },
                ],

            };
            var eChart = echarts.init(document.querySelector("#eCharts"));
            eChart.setOption(option);



            // var changeOptions = {
            //     series: [{
            //             data: [222, 222, 222, 31, 14, 90, 10, 82, 93, 80, 92, 92, 31, 14, 12, 133, 80, 32, 01, 34, 29,
            //                 30,
            //                 14, 10, 130,
            //             ],
            //         },
            //         {
            //             data: [222, 222, 222, 31, 14, 12, 133, 80, 32, 01, 34, 29, 130, 82, 92, 31, 14, 90, 10, 82, 93,
            //                 30,
            //                 14, 10, 130,
            //             ],
            //         },
            //     ],
            // }
            // eChart.setOption(changeOptions)
        },
        initScroll: function () {
            $(function () {
                var timeId = setInterval(play, 10000);

                function play() {
                    $("#scrollul").animate({
                            "marginTop": "-82px"
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
        constructor: ClientClass,

    };
    return new ClientClass();
})(jQuery, window, document, echarts);
$(ClientModule.init());