//异步提交Form
function AjaxSubmitForm(form, url, successFun, beforeFun, returnType) {
    /*参数说明：
    formIdStr-Form的Id字符串不带#,
    url-Form提交的URL,
    successFun-提交完成的回调函数
    */
    if (typeof(beforeFun)=='undefined') {
    beforeFun=function(){};
    }
    if (typeof(successFun)=='undefined') {
        successFun=function(){};
    }
    if (typeof (returnType) == 'undefined') {
        returnType ="text";
    }
    $.ajax({
        url: url,
        data: $(form).serialize(),
        type: "POST",
        dataType:returnType,//可返回：xml、html、script、json、jsonp、text
        beforeSend:beforeFun
//        function () {
//            //此处返回false，可以阻止表单提交！
//            //return false;
//        }
        ,
        success: successFun
    });
}