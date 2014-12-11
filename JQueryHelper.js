//Ajax
function Ajax(url, type, parameter2server, successFun, beforeSendFun, completeFun, errorFun) {
    //如果请求成功，先触发success|error，依次触发complete
    //默认超时5分钟
    if (type == null || type == '' || type == undefined) { type = 'post'; }
    if (beforeSendFun == null || beforeSendFun == '' || beforeSendFun == undefined) { beforeSendFun = function () { } }
    if (completeFun == null || completeFun == '' || completeFun == undefined) { completeFun = function () { } }
    if (successFun == null || successFun == '' || successFun == undefined) { successFun = function () { } }
    if (errorFun == null || errorFun == '' || errorFun == undefined) { errorFun = function () { } }
    var options = {
        url: url,
        type: type,
        timeout: 300000,//单位毫秒
        data: parameter2server,
        beforeSend: beforeSendFun,
        complete: completeFun,
        success: successFun,
        error: errorFun,
	cache: false
    };
    $.ajax(options);
}

////全局Ajax提交前事件拦截
//$(document).ajaxSend(function (evt, request, settings) {
//    $.messager.progress({
//        title: '性能优化',
//        msg: '操作中，请等待...',
//        text: ''
//    });
//});
////全局ajax请求成功事件拦截
//$(document).ajaxSuccess(function (evt, request, settings) {
//    $.messager.progress('close');
//});
////全局ajax请求完成事件拦截
//$(document).ajaxComplete(function (evt, request, settings) {
//    $.messager.progress('close');
//    var a = getCookie("cgCookie");
//    if (a == '' || a == null || a == undefined || a != '1') {
//        var uri = settings.url;
//        if (uri.indexOf("NET/index.ashx") != -1) {//为主页请求
//            window.location = "/Error.htm?a=0";
//        } else { //为引用页请求
//            window.location = "/Error.htm?a=1";
//        }

//        return;
//    }
//});
////全局ajax请求错误事件拦截
//$(document).ajaxError(function (jqXHR, textStatus, errorThrown) {
//    $.messager.progress('close');
//    switch (jqXHR.status) {
//        case (500):
//            ShowMsg("警告", "服务器系统内部错误！");
//            break;
//        case (401):
//            ShowMsg("警告", "未找到页面！");
//            break;
//        case (403):
//            ShowMsg("警告", "无权限执行此操作！");
//            break;
//        case (408):
//            ShowMsg("警告", "请求超时！");
//            break;
//        default:
//            ShowMsg("警告", "操作异常！");
//            //window.location = "/Error.htm";
//    }
//});

//Cookie
//设置cookie
function SetCookie(name, value)//两个参数，一个是cookie的名子，一个是值
{
    var Days = 1; //此 cookie 将被保存 30 天
    var exp = new Date();    //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
//得到cookie
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
}

//Form
//Form表单Ajax提交，注意：首个参数为$("#form1")
function FormAjax(formJQObj, url, type, successFun, beforeSendFun, completeFun, errorFun) {
    var formdata = formJQObj.serialize();
    Ajax(url, type, formdata, successFun, beforeSendFun, completeFun, errorFun);
}

//加载表单，data为JSON或JS对象
function LoadForm(formIdStr, data) {
    $.each(data, function (i, da) {
        //得到form下name=da.id的元素
        var ipt = $("#" + formIdStr + " [name='" + da.id + "']");
        //得到其type属性
        var btnType = ipt.attr('type');
        //填充下拉
        //得到其class属性
        switch (btnType) {
            case 'radio':
                $("#" + formIdStr + " input:radio[value='" + da.text + "']").attr('checked', 'true');
                break;
            case 'checkbox':
                $("#" + formIdStr + " input:checkbox[value='" + da.text + "']").attr('checked', 'true');
                break;
            case 'hidden':
                var btnClass = ipt.attr('class');
                if (btnClass == 'select2-' + da.id) {
                    $("#" + da.id).val([da.text]).trigger("change");
                } else { ipt.val(da.text); }
                break;
            default:
                ipt.val(da.text);
                break;
        }
    });
}

//判断两个日期大小,结束时间大于开始时间返回1，小于返回0，等于返回2，有一个为空返回3
//时间格式必须为2014-01-01 01:01:01
function EqualsDate(st, et) {
    var st1, et1;
    if (st1 == '' || et1 == '') { return 3; }
    if (Object.prototype.toString.call(st) === "[object String]") {
        st1 = new Date(st.replace(/-/g, "/"));
    }
    st1 = st;
    if (Object.prototype.toString.call(et) === "[object String]") {
        et1 = new Date(et.replace(/-/g, "/"));
    }
    et1 = et;
    if (et > st) {
        return 1;
    } else if (et < st) {
        return 0;
    } else { return 2; }
}

//JSON

//字符串----》对象

//将JSON字符串转为JSON对象
//利用jquery
function Str2JSONWithJQuery(jsonstr) {
    return $.parseJSON(jsonstr);
}
//将JSON字符串转为JSON对象
//利用JS
function JSONStr2JSONWithJS(jsonstr) {
    return (new Function("", "return " + jsonstr))();
}
//将JS对象字符串解析为JS对象
function JSObjStr2JSObj(jsonstr) {
    return (new Function("", "return " + jsonstr))();
}
function YS(jsonString )
{
 return JSON.parse( jsonString );
}

//对象----》字符串

//将JSON对象转为字符串
function O2String(O) {
    var S = [];
    var J = "";
    if (Object.prototype.toString.apply(O) === '[object Array]') {
        for (var i = 0; i < O.length; i++)
            S.push(O2String(O[i]));
        J = '[' + S.join(',') + ']';
    }
    else if (Object.prototype.toString.apply(O) === '[object Date]') {
        J = "new Date(" + O.getTime() + ")";
    }
    else if (Object.prototype.toString.apply(O) === '[object RegExp]' || Object.prototype.toString.apply(O) === '[object Function]') {
        J = O.toString();
    }
    else if (Object.prototype.toString.apply(O) === '[object Object]') {
        for (var i in O) {
            O[i] = typeof (O[i]) == 'string' ? '"' + O[i] + '"' : (typeof (O[i]) === 'object' ? O2String(O[i]) : O[i]);
            S.push(i + ':' + O[i]);
        }
        J = '{' + S.join(',') + '}';
    }
    return J;
};

//序列化JS对象为JSON字符串
function JSObject2JSONStr(JSObject) {
    //传入使用$('form').serializeArray();序列化后的对象，返回可返回后台的字符串格式如：[{用户名：a123},{密码：a123}]
    var arr = new Array();
    for (var i = 0; i < JSObject.length; i++) {
        arr.push("{\"" + JSObject[i].name + "\":\"" + JSObject[i].value + "\"}");
    }
    return "[" + arr.join(',') + "]";
}
function YSD(JSONObj)
{
	JSON.stringify(JSONObj);
}
//


编码和解码
/*编码使用：escape（需要编码的字符串，一般是中文），解码使用：unescape（需要解码的字符串，一般是编码过的中文）*/

