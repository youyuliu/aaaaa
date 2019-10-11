;
CarModule = (function ($, window, document, echarts) {
    var thisContext;
    var timeId;
    var CarClass = function () {
        thisContext = this;
        this.init = function () {
            thisContext.initEcharts();
            this.initScroll();
            this.initVue();
        }
    }
    CarClass.prototype = {
        // echarts
        initEcharts: function () {
            $(function () {
                window.carNumberOfIn = [130, 82, 92, 31, 14, 90, 10, 82, 93, 80, 92, 92, 31, 14, 12, 133, 80, 32, 01, 34, 29, 30, 14, 10, 33]
                window.carNumberOfOut = [80, 92, 92, 31, 14, 12, 133, 80, 32, 01, 34, 29, 130, 82, 92, 31, 14, 90, 10, 82, 93,
                    30,
                    14, 10, 130,
                ]
                var option1 = {
                    color: ['#16A0FF', '#b966f9'],
                    legend: {
                        // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
                        orient: 'horizontal',
                        // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
                        x: '300px',
                        // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
                        y: '30px',
                        data: ['进店车辆', '离店车辆'],
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
                            interval: 5 //设置X轴数据间隔几个显示一个，为0表示都显示
                        },
                        // boundaryGap值为false的时候，折线第一个点在y轴上
                        boundaryGap: false,
                        data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16',
                            '17', '18', '19', '20', '21', '22', '23', '24'
                        ]
                    },

                    yAxis: {
                        name: '辆',
                        type: 'value',
                        min: 0, // 设置y轴刻度的最小值
                        max: 200, // 设置y轴刻度的最大值
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
                            name: '进店车辆',
                            data: carNumberOfIn,
                            type: 'line',
                            // 设置小圆点消失
                            // 注意：设置symbol: 'none'以后，拐点不存在了，设置拐点上显示数值无效
                            symbol: 'none',
                            // 设置折线弧度，取值：0-1之间
                            smooth: 0.5,
                            areaStyle: {}
                        },
                        {
                            name: '离店车辆',
                            data: carNumberOfOut,
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

                var option2 = {
                    color: ['#00E4FE'],
                    legend: {
                        // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
                        orient: 'horizontal',
                        // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
                        x: '300px',
                        // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
                        y: '30px',
                        data: ['进店车辆', '离店车辆'],
                        textStyle: [{
                            color: "#8BD7FF",
                            fontSize: 14,
                            padding: [0, 0, 0, 0]
                        }, {
                            color: "#fff",
                            fontSize: 14,
                            padding: [0, 0, 0, 0]
                        }, ]
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
                            interval: 5 //设置X轴数据间隔几个显示一个，为0表示都显示
                        },
                        // boundaryGap值为false的时候，折线第一个点在y轴上
                        boundaryGap: false,
                        data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16',
                            '17', '18', '19', '20', '21', '22', '23', '24'
                        ]
                    },

                    yAxis: {
                        name: '辆',
                        type: 'value',
                        min: 0, // 设置y轴刻度的最小值
                        max: 200, // 设置y轴刻度的最大值
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
                        name: '店内车辆',
                        data: [130, 82, 92, 31, 14, 90, 10, 82, 93, 80, 92, 92, 31, 14, 12, 133, 80, 32, 01, 34, 29,
                            30,
                            14, 10, 130,
                        ],
                        type: 'line',
                        // 设置小圆点消失
                        // 注意：设置symbol: 'none'以后，拐点不存在了，设置拐点上显示数值无效
                        symbol: 'none',
                        // 设置折线弧度，取值：0-1之间
                        smooth: 0.5,
                        areaStyle: {}
                    }, ],

                };
                eChart1 = echarts.init(document.querySelector("#eChart1"));
                eChart1.setOption(option1);
                eChart2 = echarts.init(document.querySelector("#eChart2"));
                eChart2.setOption(option2);

            })
        },
        // 列表滚动
        initScroll: function () {
            $(function () {
                timeId = setInterval(play, 3000);
                $("#scrollul").hover(function () {
                    /* Stuff to do when the mouse enters the element */
                    clearInterval(timeId);
                }, function () {
                    /* Stuff to do when the mouse leaves the element */
                    timeId = setInterval(play, 3000);
                });
                function play() {
                    $("#scrollul").animate({
                            "marginTop": "-82px"
                        },
                        100,
                        function () {
                            /* stuff to do after animation is complete */

                            $(this).children("li:first").appendTo(this)
                            $(this).animate({
                                "marginTop": 0
                            }, 0);
                        });
                }
            })

    
        },
        initVue: function () {
            window.car = new Vue({
                el: '#container',
                data: {
                    message: '车辆进出信息看板',
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
                    }]
                }
            })
        },
        constructor: CarClass,
    };
    return new CarClass();
})(jQuery, window, document, echarts);
$(CarModule.init());

// ajax更新之后
// var changeOptions={
//     xAxis: {
//         type: 'category',
//         data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16',
//             '17', '18', '19', '20', '21', '22', '23', '24'
//         ]
//     },
//     series: [{
//         name: '店内车辆',
//         data: [111, 111, 111, 111, 111, 90, 10, 82, 93, 80, 92, 92, 31, 14, 12, 133, 80, 32, 01, 34, 29,
//             30,
//             14, 10, 130,
//         ],
//         type: 'line',
//         // 设置小圆点消失
//         // 注意：设置symbol: 'none'以后，拐点不存在了，设置拐点上显示数值无效
//         symbol: 'none',
//         // 设置折线弧度，取值：0-1之间
//         smooth: 0.5,
//         areaStyle: {}
//     }, ],
// }
// eChart2.setOption(changeOptions);