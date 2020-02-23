/**  项目JS主入口
 *  以依赖Layui的layer和form模块为例
 **/
layui.define([], function (exports) {//此处不能为NULL
    var object = {
        win_setCookie: function(name, value) {
            var expdate = new Date();
            expdate.setTime(expdate.getTime() + (10000 * 24 * 3600 * 1000));
            document.cookie = name + "=" + escape(value) + ";expires=" + expdate.toGMTString() + ";path = /;";
        },
        win_getCookie: function(name) {
            var arr = [], reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            arr = document.cookie.match(reg);
            if (arr != null && arr.length > 0)
                return unescape(arr[2]);
            else
                return null;
        },
        win_delCookie: function(name) {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = null;
            var arr = [], reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            arr = document.cookie.match(reg);
            if (arr != null && arr.length > 0)
                cval = unescape(arr[2]);
            if (cval != null)
                document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString() + ";path = /;";
        }
    };

    exports('winCookie', object); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
});