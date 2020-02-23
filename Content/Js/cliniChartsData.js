/**
    * 门诊患者自定义看板
    * @returns {}
    */

//儿童体格评估（WHO）
function ShowChartWHOData(type) {
    var x = '', y = '';
    var data = {
        caType: type
    };//获取x,y轴显示名称
    common.win_formAction("/TreatmentCenter/NutritionalAssessmentManagement/GetWHOChartXY", "POST", data, headers, call_back);
    function call_back(json) {
        x = json.resultValue;
        y = json.resultValue2;
        //初始化
        var myChart = echarts.init(document.getElementById('WHOChart'));
        var option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                data: ['-3', '-2', '-1', '0', '1', '2', '3']
            },
            grid: {
                top: '13%',
                left: '1%',
                right: '5.5%',
                bottom: '4.5%',
                containLabel: true
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    splitLine: { show: true },
                    name: x,
                    nameRotate: 90,
                    axisLabel: {
                        interval: 0,
                        rotate: 40

                    },
                    data: []
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: y,
                    nameRotate: 0.01,
                    position: 'left',
                    min: 0,
                    maxInterval: 5,
                    splitLine: { show: true },
                    axisLabel: {
                        formatter: '{value}'
                    }
                }
            ],
            series: [
                {
                    name: '-3',
                    type: 'line',
                    symbol: 'circle',
                    symbolSize: 0,
                    yAxis: 1,
                    itemStyle: { normal: { color: '#2b7db7' } },
                    data: []
                }, {
                    name: '-2',
                    type: 'line',
                    symbol: 'circle',
                    symbolSize: 0,
                    yAxis: 1,
                    itemStyle: { normal: { color: '#e64545' } },// FFA500
                    data: []
                }
                , {
                    name: '-1',
                    type: 'line',
                    symbol: 'circle',
                    symbolSize: 0,
                    yAxis: 1,
                    itemStyle: { normal: { color: '#FFA500' } },
                    data: []
                }, {
                    name: '0',
                    type: 'line',
                    symbol: 'circle',
                    symbolSize: 0,
                    yAxis: 1,
                    itemStyle: { normal: { color: '#008000' } },
                    data: []
                }
                , {
                    name: '1',
                    type: 'line',
                    symbol: 'circle',
                    symbolSize: 0,
                    yAxis: 1,
                    itemStyle: { normal: { color: '#FFA500' } },
                    data: []
                }
                , {
                    name: '2',
                    type: 'line',
                    symbol: 'circle',
                    symbolSize: 0,
                    yAxis: 1,
                    itemStyle: { normal: { color: '#e64545' } },
                    data: []
                }
                , {
                    name: '3',
                    type: 'line',
                    symbol: 'circle',
                    symbolSize: 0,
                    yAxis: 1,
                    itemStyle: { normal: { color: '#2b7db7' } },
                    data: []
                }
                , {
                    name: '实际值',
                    type: 'scatter',
                    tooltip: {
                        trigger: 'item',
                        axisPointer: {
                            show: true
                        }
                    },
                    itemStyle: { normal: { color: '#0000FF', label: { show: true, position: 'right' } } },
                    symbolSize: 7,
                    data: []
                }
            ]
        };


        myChart.setOption(option, true);   //参数设置方法
        getChartWHOData(myChart, type);
    }
}
//获取数据
function getChartWHOData(c, type) {
    //获得图表的options对象
    var options = c.getOption();
    var data = {
        patientCode: patientCode,
        beInNo: beInNo,
        caType: type
    };
    //通过Ajax获取数据
    common.win_formAction("/TreatmentCenter/NutritionalAssessmentManagement/GetCustomWHOChartData", "POST", data, headers, call_back);
    function call_back(json) {
        options.yAxis[0].min = parseInt(json.ymin - 4 <= 2 ? 0 : json.ymin - 4);
        options.xAxis[0].data = json.months;
        options.series[0].data = json.getZValue1;
        options.series[1].data = json.getZValue2;
        options.series[2].data = json.getZValue3;
        options.series[3].data = json.getZValue4;
        options.series[4].data = json.getZValue5;
        options.series[5].data = json.getZValue6;
        options.series[6].data = json.getZValue7;
        options.series[7].data = json.getChildActValue;
        c.hideLoading();
        c.setOption(options);
    }

}

//儿童体格评估（上海市）
function ShowChartSHSData(type) {
    //初始化
    var myChart = echarts.init(document.getElementById('SHSChart'));
    var option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            data: ['-2', '-1', '0', '1', '2']
        },
        grid: {
            top: '13%',
            left: '1%',
            right: '6.5%',
            bottom: '5.5%',
            containLabel: true
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                splitLine: { show: true },
                name: "Months",
                nameRotate: 90,
                axisLabel: {
                    interval: 0
                },
                data: []
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: type == 1 ? "Length/Height(cm)" : "Weight(kg)",
                nameRotate: 0.01,
                position: 'left',
                min: 0,
                maxInterval: 5,
                splitLine: { show: true },
                axisLabel: {
                    formatter: '{value}'
                }
            }
        ],
        series: [
            {
                name: '-2',
                type: 'line',
                symbol: 'circle',
                symbolSize: 0,
                yAxis: 1,
                itemStyle: { normal: { color: '#e64545' } },// FFA500
                data: []
            }
            , {
                name: '-1',
                type: 'line',
                symbol: 'circle',
                symbolSize: 0,
                yAxis: 1,
                itemStyle: { normal: { color: '#FFA500' } },
                data: []
            }, {
                name: '0',
                type: 'line',
                symbol: 'circle',
                symbolSize: 0,
                yAxis: 1,
                itemStyle: { normal: { color: '#008000' } },
                data: []
            }
            , {
                name: '1',
                type: 'line',
                symbol: 'circle',
                symbolSize: 0,
                yAxis: 1,
                itemStyle: { normal: { color: '#FFA500' } },
                data: []
            }
            , {
                name: '2',
                type: 'line',
                symbol: 'circle',
                symbolSize: 0,
                yAxis: 1,
                itemStyle: { normal: { color: '#e64545' } },
                data: []
            }
            , {
                name: '实际值',
                type: 'scatter',
                tooltip: {
                    trigger: 'item',
                    axisPointer: {
                        show: true
                    }
                },
                itemStyle: { normal: { color: '#0000FF', label: { show: true, position: 'right' } } },
                symbolSize: 7,
                data: []
            }
        ]
    };


    myChart.setOption(option, true);   //参数设置方法
    getChartSHSData(myChart, type);

}

function getChartSHSData(c, type) {

    //获得图表的options对象
    var options = c.getOption();
    var data = {
        patientCode: patientCode,
        beInNo: beInNo,
        caType: type
    };
    //通过Ajax获取数据
    common.win_formAction("/TreatmentCenter/NutritionalAssessmentManagement/GetCustomChartSHSData", "POST", data, headers, call_back);

    function call_back(json) {
        options.yAxis[0].min = parseInt(json.ymin - 4 <= 2 ? 0 : json.ymin - 4);
        options.xAxis[0].data = json.months;
        options.series[0].data = json.getZValue1;
        options.series[1].data = json.getZValue2;
        options.series[2].data = json.getZValue3;
        options.series[3].data = json.getZValue4;
        options.series[4].data = json.getZValue5;
        options.series[5].data = json.getChildActValue;
        c.hideLoading();
        c.setOption(options);
    }

}


//指标项或九城市体重及BMI图
function ShowIndicatorItemsChartData(title, id, type, code, reference, unit) {
    //初始化
    var myChart = echarts.init(document.getElementById(id));
    option = {
        title: {
            text: type > 2 ? title : "体格评估",
            x: "center"
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['实际值']
        },
        grid: {
            top: '12%',
            left: '1%',
            right: '8%',
            bottom: '6%',
            containLabel: true
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                boundaryGap: true,
                data: [],
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#ccc'],
                        width: 1,
                        type: 'line'
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                symbol: 'circle',
                name: '数值',
                symbolSize: 8,
                min: 8,
                axisLabel: {
                    formatter: '{value}'
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#ccc'],
                        width: 1,
                        type: 'line'
                    }
                }
            }
        ],
        series: [
            {
                name: '',
                type: 'line',
                itemStyle: { normal: { color: '#0099FF' } },
                data: [],
                markLine: {
                    symbol: ['circle', 'arrow'],
                    symbolSize: [4, 6],
                    itemStyle: {
                        normal: {
                            color: '#008000 ',
                            borderWidth: 2,          // 标线symbol边框线宽，单位px，默认为2
                            lineStyle: {
                                type: 'solid',
                                shadowColor: 'rgba(0,0,0,0)', //默认透明
                                shadowBlur: 5,
                                shadowOffsetX: 3,
                                shadowOffsetY: 3
                            }
                        },
                        emphasis: {
                            // color: 各异
                            label: {
                                show: false
                            },
                            lineStyle: {}
                        }
                    },
                    data: [
                        { itemStyle: { normal: { color: '#00CC00' } }, name: '正常', yAxis: -10 },
                        { itemStyle: { normal: { color: '#FF0000' } }, name: '正常', yAxis: -10 },
                    ]
                },
                yAxis: 1,
                itemStyle: { normal: { color: '#0099FF', label: { show: true } } },
                tooltip: { formatter: "{b}<br/>{a}：{c}" }
            }
        ]
    };

    myChart.setOption(option);   //参数设置方法
    if (type == 1 || type == 2) {
        getWeightOrBMIChartData(myChart, type);
    } else {//指标曲线
        getItemChartData(myChart, code, reference, unit);
    }
}

function getWeightOrBMIChartData(c, type) {
    //获得图表的options对象
    var options = c.getOption();

    //通过Ajax获取数据
    common.win_formAction("/TreatmentCenter/NutritionalAssessmentManagement/GetCustomChartJCSData", "POST", { patientCode: patientCode, beInNo: beInNo, type: type, caType: caType }, headers, call_back);

    function call_back(json) {
        var minValue = json.minValue;
        var maxValue = json.maxValue;
        var yminValue = json.yminValue;
        var ymaxValue = json.ymaxValue;
        options.xAxis[0].data = json.date;
        options.series[0].data = json.list;
        if (type == 1) {
            options.series[0].markLine.data[0].yAxis = minValue;
        }
        options.yAxis[0].max = ymaxValue;
        options.yAxis[0].min = yminValue;
        c.hideLoading();
        c.setOption(options);
    }
}

function getItemChartData(c, code, reference, unit) {
    //获得图表的options对象
    var options = c.getOption();

    //通过Ajax获取数据
    common.win_formAction("/TreatmentCenter/MonitorManagement/GetCustomBiochemistryLISChartData", "POST", { beInNo: beInNo, code: code, reference: reference, unit: unit }, headers, call_back);

    function call_back(json) {
        var minValue = json.minValue == 999999 || json.minValue == -999999 ? 0 : json.minValue;
        var maxValue = json.maxValue == 999999 || json.maxValue == -999999 ? 0 : json.maxValue;
        var yminValue = json.yminValue == 999999 ? -1 : json.yminValue;
        var ymaxValue = json.ymaxValue == 999999 ? -1 : json.ymaxValue;
        options.xAxis[0].data = json.date;
        options.series[0].data = json.list;
        options.series[0].markLine.data[0].yAxis = minValue;
        options.series[0].markLine.data[1].yAxis = maxValue;
        options.yAxis[0].max = ymaxValue < maxValue ? maxValue : ymaxValue;
        options.yAxis[0].min = yminValue > minValue ? minValue : yminValue;
        c.hideLoading();
        c.setOption(options);
    }
}

//孕妇体重增长图
function ShowPregnantChartData() {
    //初始化
    var myChart = echarts.init(document.getElementById('PregnantChart'));
    var option = {
        title: {
            left: 'center',
            text: '孕期体重增长图'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            data: ['体重(kg)']
        },
        grid: {
            top: '10%',
            left: '1%',
            right: '8%',
            bottom: '6%',
            containLabel: true
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                splitLine: { show: true },
                name: '孕周',
                nameRotate: 25,
                axisLabel: {
                    interval: 0,
                    rotate: 40
                },
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '体重',
                position: 'left',
                min: minVal_yf,//最小体重
                maxInterval: 2,
                splitLine: { show: true },
                axisLabel: {
                    formatter: '{value} (kg)'
                }
            }
        ],
        series: [
            {
                name: '最大值(kg)',
                type: 'line',
                symbol: 'circle',
                symbolSize: 0,
                yAxis: 1,
                itemStyle: { normal: { color: '#2b7db7' } },
                data: []
            }, {
                name: '最小值(kg)',
                type: 'line',
                symbol: 'circle',
                symbolSize: 0,
                yAxis: 1,
                itemStyle: { normal: { color: '#2b7db7' } },
                data: []
            }
            , {
                name: '平均值(kg)',
                type: 'line',
                symbol: 'circle',
                symbolSize: 0,
                yAxis: 1,
                itemStyle: { normal: { color: '#e64545' } },
                data: []
            }, {
                name: '实际值',
                type: 'scatter',
                tooltip: {
                    trigger: 'item',
                    axisPointer: {
                        show: true
                    }
                },
                itemStyle: { normal: { color: '#006400', label: { show: true, position: 'right' } } },
                axisLabel: {
                    formatter: '{value} (kg)'
                },
                symbolSize: 7,
                data: []
            }
        ]
    };

    myChart.setOption(option);   //参数设置方法
    getPregnantChartData(myChart);
}

function getPregnantChartData(c) {
    //获得图表的options对象
    var options = c.getOption();
    //通过Ajax获取数据
    common.win_formAction("/TreatmentCenter/NutritionalAssessmentManagement/GetCustomBasicChartData", "POST", { fetalType: fetalType, patientCode: patientCode, beInNo: beInNo }, headers, call_back);

    function call_back(json) {
        options.series[0].data = json.getMaxValue;
        options.series[2].data = json.getAvgValue;
        options.series[1].data = json.getMinValue;
        options.series[3].data = json.getChildActValue;
        c.hideLoading();
        c.setOption(options);
    }
}

//成人体格评估
function ShowOrdinaryAdultsChartData() {
    //初始化
    var myChart = echarts.init(document.getElementById('OrdinaryAdultsChart'));
    var option = {
        title: {
            text: '体重&BMI曲线图'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            data: ['体重(kg)', 'BMI(kg/m²)']
        },
        grid: {
            left: '1%',
            right: '1%',
            bottom: '3%',
            containLabel: true
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                boundaryGap: true,
                data: []
            }
        ],
        yAxis: [
             {
                 type: 'value',
                 name: 'BMI',
                 position: 'right',
                 min: 10,
                 max: 50,
                 axisLabel: {
                     formatter: '{value} (kg/m²)'
                 },
                 splitLine: {
                     show: true,
                     lineStyle: {
                         color: ['#ccc'],
                         width: 1,
                         type: 'line'
                     }
                 }
                 //minInterval: 5
             },
            {
                type: 'value',
                name: '体重',
                position: 'left',
                min: 10,
                max: 100,
                axisLabel: {
                    formatter: '{value} (kg)'
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#ccc'],
                        width: 1,
                        type: 'line'
                    }
                }
            }
        ],
        series: [
            {
                name: 'BMI(kg/m²)',
                type: 'line',
                data: [],
                symbol: 'circle',
                symbolSize: 8,
                markPoint: {
                    data: [
                    ]
                },
                markLine: {
                    symbol: ['circle', 'arrow'],
                    symbolSize: [2, 4],
                    itemStyle: {
                        normal: {
                            color: '#008000',
                            borderWidth: 2,          // 标线symbol边框线宽，单位px，默认为2  
                            lineStyle: {
                                type: 'solid',
                                shadowColor: 'rgba(0,0,0,0)', //默认透明  
                                shadowBlur: 5,
                                shadowOffsetX: 3,
                                shadowOffsetY: 3
                            }
                        },
                        emphasis: {
                            // color: 各异  
                            label: {
                                show: false
                            },
                            lineStyle: {}
                        }
                    },
                    data: [
                        { itemStyle: { normal: { color: '#00CC00', label: { show: true } } }, name: '最小正常', yAxis: 18.5 },
                        { itemStyle: { normal: { color: '#FF0000' } }, name: '最大正常', yAxis: 23.9 },
                    ]
                },
                yAxis: 1,
                itemStyle: { normal: { color: '#4B0082', label: { show: true, position: 'right' } } },
                tooltip: { formatter: "{b}<br/>{a}：{c}" }
            },
            {
                name: '体重(kg)',
                type: 'line',
                symbol: 'circle',
                symbolSize: 8,
                yAxisIndex: 1,
                itemStyle: { normal: { color: '#2b7db7', label: { show: true } } },
                tooltip: { formatter: "{b}<br/>{a}：{c}" },
                data: []
            }
        ]
    };

    myChart.setOption(option);   //参数设置方法

    getOrdinaryAdultsChartData(myChart);
}

function getOrdinaryAdultsChartData(c) {
    //获得图表的options对象
    var options = c.getOption();

    //通过Ajax获取数据
    common.win_formAction("/TreatmentCenter/NutritionalAssessmentManagement/GetOrdinaryAdultsList", "POST", { beInNo: beInNo, caType: caType }, headers, call_back);

    function call_back(json) {
        options.xAxis[0].data = json.categoryList;
        options.series[0].data = json.getBMI;
        options.series[1].data = json.getWeight;
        options.yAxis[0].max = json.maxValue + 15;
        options.yAxis[1].max = json.maxValue2 + 10;
        c.hideLoading();
        c.setOption(options);
    }
}


//筛查图表
function ShowScreenScoreChartData(id, title, screenLevel) {
    //初始化
    var myChart = echarts.init(document.getElementById(id));
    option = {
        title: {
            text: title,
            x: "center"
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['实际值']
        },
        grid: {
            left: '1%',
            right: '1%',
            bottom: '3%',
            containLabel: true
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                boundaryGap: true,
                data: [],
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#ccc'],
                        width: 1,
                        type: 'line'
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '分数',
                symbol: 'circle',
                symbolSize: 8,
                minInterval: 1,
                axisLabel: {
                    formatter: '{value}'
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#ccc'],
                        width: 1,
                        type: 'line'
                    }
                }
            }
        ],
        series: [
            {
                name: '',
                type: 'line',
                itemStyle: { normal: { color: '#0099FF' } },
                data: [],
                markLine: {
                    symbol: ['circle', 'arrow'],
                    symbolSize: [4, 6],
                    itemStyle: {
                        normal: {
                            color: '#008000 ',
                            borderWidth: 2,          // 标线symbol边框线宽，单位px，默认为2
                            lineStyle: {
                                type: 'solid',
                                shadowColor: 'rgba(0,0,0,0)', //默认透明
                                shadowBlur: 5,
                                shadowOffsetX: 3,
                                shadowOffsetY: 3
                            }
                        },
                        emphasis: {
                            // color: 各异
                            label: {
                                show: false
                            },
                            lineStyle: {}
                        }
                    },
                },
                yAxis: 1,
                itemStyle: { normal: { color: '#0099FF', label: { show: true } } },
                tooltip: { formatter: "{b}<br/>{a}：{c}" }
            }
        ]
    };
    
    myChart.setOption(option);   //参数设置方法
    getScreenScoreChartData(myChart, screenLevel);
}

function getScreenScoreChartData(c, screenLevel) {
    //获得图表的options对象
    var options = c.getOption();

    //通过Ajax获取数据
    common.win_formAction("/TreatmentCenter/ScreeningManagement/GetCustomScreenScoreData", "POST", { screenLevel: screenLevel, beInNo: beInNo }, headers, call_back);

    function call_back(json) {
        options.xAxis[0].data = json.categoryList;
        options.series[0].data = json.actualValue;
        options.yAxis[0].min = json.minValue;
        options.yAxis[0].max = json.maxValue;
        c.hideLoading();
        c.setOption(options);
    }
}

//手动录入生化
function ShowCustomLaboratoryEntryChart(title, id, code) {
    //初始化
    var myChart = echarts.init(document.getElementById(id));
    option = {
        title: {
            text: title,
            x: "center"
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['实际值']
        },
        grid: {
            left: '3%',
            right: '7%',
            bottom: '3%',
            containLabel: true
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                boundaryGap: true,
                data: []
            }
        ],
        yAxis: [
            {
                type: 'value',
                symbol: 'circle',
                name: '数值',
                symbolSize: 8,
                min: 0,
                axisLabel: {
                    formatter: '{value}'
                }
            }
        ],
        series: [
            {
                name: '',
                type: 'line',
                itemStyle: { normal: { color: '#0099FF' } },
                data: [],
                markLine: {
                    symbol: ['circle', 'arrow'],
                    symbolSize: [4, 6],
                    itemStyle: {
                        normal: {
                            color: '#008000 ',
                            borderWidth: 2,          // 标线symbol边框线宽，单位px，默认为2
                            lineStyle: {
                                type: 'solid',
                                shadowColor: 'rgba(0,0,0,0)', //默认透明
                                shadowBlur: 5,
                                shadowOffsetX: 3,
                                shadowOffsetY: 3
                            }
                        },
                        emphasis: {
                            // color: 各异
                            label: {
                                show: false
                            },
                            lineStyle: {}
                        }
                    },
                    data: [
                        { itemStyle: { normal: { color: '#00CC00' } }, name: '正常', yAxis: 12 },
                        { itemStyle: { normal: { color: '#FF0000' } }, name: '正常', yAxis: 16 },
                    ]
                },
                yAxis: 1,
                itemStyle: { normal: { color: '#0099FF', label: { show: true } } },
                tooltip: { formatter: "{b}<br/>{a}：{c}" }
            }
        ]
    };

    myChart.setOption(option);   //参数设置方法

    getCustomLaboratoryEntryChartData(myChart, code);
}

function getCustomLaboratoryEntryChartData(c, code) {
    //获得图表的options对象
    var options = c.getOption();
  
    //通过Ajax获取数据
    common.win_formAction("/TreatmentCenter/MonitorManagement/GetCustomLaboratoryEntryChartData", "POST", { beInNo: beInNo, code: code }, headers, call_back);

    function call_back(json) {
        var minValue = json.minValue;
        var maxValue = json.maxValue;
        var yminValue = json.yminValue;
        var ymaxValue = json.ymaxValue;
        options.xAxis[0].data = json.date;
        options.series[0].data = json.list;
        options.series[0].markLine.data[0].yAxis = minValue;
        options.series[0].markLine.data[1].yAxis = maxValue;
        options.yAxis[0].max = ymaxValue < maxValue ? maxValue : ymaxValue;
        options.yAxis[0].min = yminValue > minValue ? minValue : yminValue;
        c.hideLoading();
        c.setOption(options);
    }
}




















