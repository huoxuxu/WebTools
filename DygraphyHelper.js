function DygraphyInit(g, ChartIdStr, labelsDivIdStr, SeriesData, LabelsData) {
    /*SeriesData数据格式：
    时间格式：[[new Date("2009/07/12 01:04:01"), 100], [new Date("2009/07/19 01:05:20"), 150]]//必须是/不能是-
    */
    var dyoptions = {
        labelsDiv: document.getElementById(labelsDivIdStr),
    legend: 'always',
    animatedZooms: true,//放大缩小
    xlabel: '距离开始时间(秒)',
    ylabel: '值',
    labels: LabelsData, //["x", "A"]
    connectSeparatedPoints: true,//连接Null点
    drawCallback: function () {
        $("#graph").css("background-image", "");
    } 
     };
g = new Dygraph(document.getElementById(ChartIdStr), SeriesData, dyoptions);
}

function Destroy(g) {
    g.destroy();
}
//更新属性
//g.updateOptions({ 'labels': ['','1','2','3']});
//g.updateOptions({ 'file': [[0,0]]});//更新数据源/*Dygraphy从多y轴到少Y轴会出现无法加载，低到高的话没问题，解决方案：销毁dygraphy，重新实例化即可*/