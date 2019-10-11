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
            this.initScroll();
            setInterval(function () {
                console.log("timer")
                thisContext.initData();
            }, 1000)
        }
    }
    StaffClass.prototype = {
        initVue: function () {
            vm = new Vue({
                el: '#container',
                data: {
                    // 出入统计
                    statisticsForInOrOut: {
                        in: 0,
                        out: 0
                    },
                    // 员工识别列表
                    scrollUlData: [],
                    // 最新员工统计
                    theLastStaffInfo: {
                        actionType: 1,
                        age: 0,
                        dateTime: "",
                        faceUrl: "",
                        frameUrl: "",
                        licensePlates: [],
                        mainFaceUrl: "",
                        maxScore: 0,
                        name: "",
                        position: "",
                        sex: 2,
                    },
                    // 按位置统计---echarts

                }
            })
        },
        initData: function () {
            // 员工出入统计
            UntilsModule.ajaxRequest({
                url: GlobalJsModule.BaseUrl + "/view/staff/accessStatistics",
                //contentType: "application/json;charset=UTF-8",
                dataType: "json",
                type: 'get',
                data: {
                    companyId: companyId
                },
                async: false,
                success: function (res) {
                    if (res.code === 0) {
                        vm.statisticsForInOrOut = res.data;
                    }
                }
            });
            // 最新员工列表
            UntilsModule.ajaxRequest({
                url: GlobalJsModule.BaseUrl + "/view/staff/lastStaffList",
                contentType: "application/x-www-form-urlencoded",
                dataType: "json",
                type: 'post',
                data: {
                    companyId: companyId,
                    size: 20
                },
                async: false,
                success: function (res) {
                    if (res.code === 0) {
                        console.log(res.data);
                        // vm.scrollUlData= Object.assign({}, res.data)
                        vm.scrollUlData = res.data;
                    }

                }
            });
            // 最新员工识别
            UntilsModule.ajaxRequest({
                url: GlobalJsModule.BaseUrl + "/view/staff/latestStaff",
                //contentType: "application/json;charset=UTF-8",
                dataType: "json",
                type: 'get',
                data: {
                    companyId: companyId
                },
                async: false,
                success: function (res) {
                    vm.theLastStaffInfo = res.data;
                }
            });
            // 按位置统计
            UntilsModule.ajaxRequest({
                url: GlobalJsModule.BaseUrl + "/view/staff/statisticsByLocation",
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
                    var locationArr = new Array();
                    res.data.forEach(function (v, k, arr) {
                        inArr.push(v.in);
                        outArr.push(v.out);
                        locationArr.push(v.locationName);
                    })
                    thisContext.initEcharts(inArr, outArr, locationArr)
                }
            });




        },
        initEcharts: function (inArr, outArr, locationArr) {

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
                    data: locationArr, // 只有type: 'category'生效
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
                        data: inArr,
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
                        data: outArr,
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
                var timeId = setInterval(play, 10000);

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
                    timeId = setInterval(play, 10000);
                });
            })
        },
        utils: {
            actionType: function (actionType) {
                if (actionType === 0) {
                    return "进入"
                } else {

                    return '离开'
                }
            }
        },
        constructor: StaffClass,

    };
    return new StaffClass();
})(jQuery, window, document, echarts);
$(StaffModule.init());