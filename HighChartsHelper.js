$(function () {

});
//HighCharts初始化
function ChartInit(chartdivId) {
    //参数不带#，如：renderTo: 'container1'
    //返回hc对象
    return new Highcharts.Chart({ chart: { renderTo: chartdivId }, title: { text: '' }, credits: { enabled: false }, xAxis: { categories: [] }, series: [] });
}
function ChartInit(chartdivId,chartType) {
    //参数不带#，如：renderTo: 'container1'
    //参数2：  'line', 'column', 'spline', 'area', 'areaspline', 'scatter', 'pie'
    //返回hc对象
    return new Highcharts.Chart({ chart: { renderTo: chartdivId,type:chartType }, title: { text: '' }, credits: { enabled: false }, xAxis: { categories: [] }, series: [] });
}
function ChartInitWithOptions(options) {
    //参数为hc参数数组
    //返回hc对象
    return new Highcharts.Chart(options);
}
//HighCharts数据源
function AddSeries(hchart, jsondata) {
    //jsondata格式如：{ data: [1, 6]}
    hchart.addSeries(jsondata, false);
    hchart.redraw();
}
function DeleteSeries(hchart) {
    var series = hchart.series;
    while (series.length>0) {
    series[0].remove();
    }
    hchart.redraw();
}
function UpdateSeries(hchart, jsondataArr) {
    //此方法参数jsondata格式为：[{ data: [1, 6]}]
//此方法可以不用删除HCSeries数组
    DeleteSeries(hchart);
    if (typeof(jsondataArr) == "undefined") { return; }
    for (var i = 0; i < jsondataArr.length; i++) {
        AddSeries(hchart, jsondataArr[i]);
    }
    hchart.redraw();
    reflowChart(hchart);
}
//修改单个series
function SetData(hchart,seriesIndex,jsondata) {
    //jsondata格式为：[129.2, 144.0, 176.0]
    hchart.series[seriesIndex].setData(jsondata);
}
//HighCharts、X，Y轴
function UpdateXaxis(hchart, JsonData) {
    hchart.xAxis[0].setCategories(JsonData);
}
function UpdateXaxisAttr(hchart,attr) {
    //attr格式为{tickInterval: 5}
    hchart.xAxis[0].update(attr);
}
function UpdateYaxisTitle(hchart, yXaisIndex, yXaisTitle) {
    hchart.yAxis[yXaisIndex].setTitle({
        text: yXaisTitle
    });
}
function AddyAxis(hchart, id, text) {
    hchart.addAxis({ // Secondary yAxis
        id: id, //与series中yAxis对应
        title: {
            text: text
        },
        lineWidth: 2,
        opposite: true
    });
}
//HighCharts图表类型
function UpdateChartType(hchart, type) {
    //'line', 'column', 'spline', 'area', 'areaspline', 'scatter', 'pie'
    var series = hchart.series;
    for (var i = 0; i < series.length; i++) {
        hchart.series[i].update({
            type: type
        });
    }
}
//显示、隐藏加载
function showLoading(hchart, Msg) {
    hchart.showLoading(Msg);
}
function hideLoading(hchart) {
    hchart.hideLoading();
}
//打印
function printChart(hchart) { hchart.print(); }

//重新充满div
function reflowChart(hchart) { hchart.reflow(); }

function GetChartSVG(hchart) {
    return hchart.getSVG()
                .replace(/</g, '\n&lt;') // make it slightly more readable
                .replace(/>/g, '&gt;');
}

//--不成熟
function HideSeries() {
    var series = chart.series[0];
    series.show();
    series.hide();
 }
 //常用属性
 /*
 hc是否连接null点
 plotOptions: {
 series: {
 connectNulls: true // by default
 }
 }
 hc是否让数字显示在图标上

         chart.series[0].update({
            dataLabels: {
                enabled: enableDataLabels
            }
        });
        hc是否显示折点加黑
                chart.series[0].update({
            marker: {
                enabled: enableMarkers
            }
        });
 */

