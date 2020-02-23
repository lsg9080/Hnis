/**  项目JS主入口
 *  以依赖Layui的layer和form模块为例
 **/
var dialog, $, idx, cook;
layui.define(['winDialog', 'winCookie'], function (exports) {//此处不能为NULL
    dialog = layui.winDialog;
    $ = layui.jquery;
    cook = layui.winCookie;
    $(function () {
        document.onkeydown = function () {
            //if (event.ctrlKey && window.event.keyCode == 67) {
            //        var val = $("#copyMsg").text();
            //        cook.win_setCookie("BeInNo", val);              
            //        function handler(event) {
            //            event.clipboardData.setData('text/plain', val);
            //            document.removeEventListener('copy', handler, true);
            //            event.preventDefault();
            //            dialog.win_msg('住院号已复制!');
            //        }
            //        document.addEventListener('copy', handler, true);
            //        document.execCommand('copy');
            //}
        }

    });
    var object = {
        win_copy: function (elem) {
            var val = $(elem).text();
            cook.win_setCookie("BeInNo", val);
            function handler(event) {
                event.clipboardData.setData('text/plain', val);
                document.removeEventListener('copy', handler, true);
                event.preventDefault();
            }
            document.addEventListener('copy', handler, true);
            document.execCommand('copy');
            dialog.win_msg('住院号已复制!');

        },
        win_paste: function (elem) {
            var text = cook.win_getCookie('BeInNo');
            if (text) $(elem).val(text);
        },
        win_loadParamUrl: function (href, key, val) {
            var url = href.replace("#", "");
            if (window.win_getValueByUrl(href, key).length == 0 && val.length > 0) {
                if (url.indexOf("?") < 0)
                    url = href + "?" + key + "=" + val;
                else
                    url = href + "&" + key + "=" + val;
            } else {
                var v = window.win_getValueByUrl(href, key);
                url = href.replace(key + "=" + v, key + "=" + val);
            }
            return url;
        },
        win_getAction(u,headers,fun,dataType,patDialog) {
            
        },
        /**
         * AJAX请求
         * @param {请求地址} u 
         * @param {请求类型} p 
         * @param {参数} data 
         * @param {成功后执行方法} fun 
         * @returns {json} 
         * @patDialog {当前弹的对象或父窗体弹的对象}
         */
        win_formAction: function (u, p, data, headers, fun, dataType, patDialog) {
            var tempDialog = patDialog || parent;
            $.ajax({
                url: u,
                type: p,
                dataType: dataType || 'JSON',
                data: data,
                cache: false,
                timeout: 1000 * 10,
                headers: headers,
                beforeSend: function (request) {
                    //加载层
                    //idx = tempDialog.dialog.win_load(1); //0代表加载的风格，支持0-2

                },
                success: function (json) {
                    //tempDialog.dialog.win_close(idx);
                    if (fun) fun(json);
                },
                error: function (error) {
                    //tempDialog.dialog.win_close(idx);
                    if (error.responseText != undefined && error.responseText.length > 0) {//bg.zhaojm
                        tempDialog.dialog.win_alert(error.responseText, "错误提示", 5);
                    }
                }
            });
        },
        /**
        * AJAX请求
        * @param {请求地址} u 
        * @param {请求类型} p 
        * @param {参数} data 
        * @param {成功后执行方法} fun 
        * @returns {json} 
        * @patDialog {当前弹的对象或父窗体弹的对象}
        */
        win_formActionNoAsync: function (u, p, data, headers, fun, dataType, patDialog) {
            var tempDialog = patDialog || parent;
            $.ajax({
                url: u,
                type: p,
                dataType: dataType || 'JSON',
                data: data,
                cache: false,
                timeout: 1000 * 10,
                headers: headers,
                async: false,
                beforeSend: function (request) {
                    //加载层
                    idx = tempDialog.dialog.win_load(1); //0代表加载的风格，支持0-2

                },
                success: function (json) {
                    tempDialog.dialog.win_close(idx);
                    if (fun) fun(json);
                },
                error: function (error) {
                    tempDialog.dialog.win_close(idx);
                    tempDialog.dialog.win_alert(error.responseText, "错误提示", 5);
                }
            });
        },
        win_del: function (msg,headers, href, data, fun, isParent) {
            var idx;
            var dlog = isParent || dialog;
            dlog.win_confirm(msg, '删除提示',
                function () {
                    $.ajax({ type: 'POST', data: data, dataType: "JSON", cache: false, url: href, headers: headers, beforeSend: LoadAjaxLayer, success: page_callback, error: function (e) { dialog.win_alert(e.responseText, '错误提示', 5); } });

                    function page_callback(res) {
                        if (res.result) {
                            //删除后需要执行的函数
                            if (fun) fun();
                            dlog.win_close(idx);
                            dlog.win_msg(res.msg, res.script);
                        } else {
                            dlog.win_close(idx);
                            dlog.win_alert("记录删除失败，请与管理员联系!", '结果提示', 5);
                        }
                    }

                    function LoadAjaxLayer(request) {
                        idx = dlog.win_load(1);
                    }
                });
        },
        win_clearhidden: function (o, elem) {
            if ($.trim($(o).val()).length == 0) {
                $(elem).val("");
            }
        },
        win_clearInput: function (elem) {
            $(elem).css({ "border": "1px solid #e6e6e6" });
        }
    };

    exports('winCommon', object); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
});
///取URL参数
function win_getValueByUrl(url, key) {
    var rval = "";
    var strQus = "?";
    var strAmp = "&";
    var strEq = "=";
    var iPos;
    iPos = url.indexOf(strQus);
    var strQuery = url.substr(iPos, url.length - iPos);
    var strLCQuery = strQuery.toLowerCase();
    var LCKey = key.toLowerCase();
    iPos = strLCQuery.indexOf(strQus + LCKey + strEq);
    if (iPos == -1) {
        iPos = strLCQuery.indexOf(strAmp + LCKey + strEq);
        if (iPos == -1) {
            return rval;
        }
    }
    rval = strQuery.substr(iPos + key.length + 2, strQuery.length - (iPos + key.length + 2));
    var iPosAMP = rval.indexOf(strAmp);
    if (iPosAMP == -1) {
        return rval;
    } else {
        rval = rval.substr(0, iPosAMP);
    }
    return rval;
}
///取URL参数
function win_getValueFromUrl(key) {
    var url = String(window.document.location);
    var rval = "";
    var strQus = "?";
    var strAmp = "&";
    var strEq = "=";
    var iPos;
    iPos = url.indexOf(strQus);
    var strQuery = url.substr(iPos, url.length - iPos);
    var strLCQuery = strQuery.toLowerCase();
    var LCKey = key.toLowerCase();
    iPos = strLCQuery.indexOf(strQus + LCKey + strEq);
    if (iPos == -1) {
        iPos = strLCQuery.indexOf(strAmp + LCKey + strEq);
        if (iPos == -1) {
            return rval;
        }
    }
    rval = strQuery.substr(iPos + key.length + 2, strQuery.length - (iPos + key.length + 2));
    var iPosAMP = rval.indexOf(strAmp);
    if (iPosAMP == -1) {
        return rval;
    } else {
        rval = rval.substr(0, iPosAMP);
    }
    return rval;
}


// 日期月份/天的显示，如果是1位数，则在前面加上'0'
function getFormatDate(arg) {
    if (arg == undefined || arg == '') {
        return '';
    }

    var re = arg + '';
    if (re.length < 2) {
        re = '0' + re;
    }

    return re;
}

function openMonitorCenter(patCode, dlg, area, show) {
    var a = area;
    var dialog = dlg || parent.dialog;
    var sh = show || 0;
    if (sh == 0) {
        dlg.win_open('/TreatmentCenter/MonitorManagement/Nutrition/' + patCode, '监测中心', a);
    }else if (sh == 1) {
        dlg.win_open('/TreatmentCenter/MonitorManagement/screening/' + patCode, '监测中心', a);
    } else if (sh == 2) {
        dlg.win_open('/TreatmentCenter/MonitorManagement/PatientBasicInfo/' + patCode + "?type=2", '病人基本信息', a);
    } else if (sh == 3) {
        dlg.win_open('/TreatmentCenter/ConsultationManagement/ConsultionInstructions/' + patCode + "?type=3", '新增会诊指令', a);
    }
}

//js计算天数差的函数，通用  
function dateDiff(sDate1, sDate2) {
    //sDate1和sDate2是2006-12-18格式  
    var aDate;
    aDate = sDate1.split("-");
    //调用Date的构造函数，转换为12-18-2006格式
    var oDate1 = new Date(aDate[0], aDate[1] - 1, aDate[2]);
    aDate = sDate2.split("-");

    var oDate2 = new Date(aDate[0], aDate[1] - 1, aDate[2]);
    //把相差的毫秒数转换为天数
    var iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24);
    return iDays;
}
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function exsitBeInNo(beInNo, type, headers, fun, patDialog) {
    var tempDialog = patDialog || parent;
    $.ajax({
        url: '/TreatmentCenter/PatientManagement/ExsitBeInNo',
        type: 'POST',
        dataType: 'JSON',
        data: { bno: beInNo, type: type },
        cache: false,
        timeout: 1000 * 10,
        headers: headers,
        beforeSend: function (request) {
            //加载层
            idx = tempDialog.dialog.win_load(1); //0代表加载的风格，支持0-2

        },
        success: function (json) {
            tempDialog.dialog.win_close(idx);
            if (fun) fun(json);
        },
        error: function (error) {
            tempDialog.dialog.win_close(idx);
            if (error.responseText.length > 0) {
                tempDialog.dialog.win_alert(error.responseText, "错误提示", 5);
            }
        }
    });
}
// 日期，在原有日期基础上，增加days天数，默认增加1天
function dateAddDay(dt, days) {
    if (days == undefined || days == '') {
        days = 1;
    }
    var date = new Date(dt);
    if (date.toString().indexOf('Invalid') > -1) {
        return "";
    }
    date.setDate(date.getDate() + days);
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return date.getFullYear() + '-' + getFormatDate(month) + '-' + getFormatDate(day);
}
// 日期，在原有日期基础上，增加days天数，默认增加1天
function dateAddMonth(dt, mons) {
    if (mons == undefined || mons == '') {
        mons = 1;
    }
    var date = new Date(dt);
    date.setMonth(date.getMonth() + mons);
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return date.getFullYear() + '-' + getFormatDate(month);// + '-' + getFormatDate(day);
}
/**************************************时间格式化处理************************************/
function dateFtt(fmt, date) { //author: meizz   
    var o = {
        "M+": date.getMonth() + 1,                 //月份   
        "d+": date.getDate(),                    //日   
        "h+": date.getHours(),                   //小时   
        "m+": date.getMinutes(),                 //分   
        "s+": date.getSeconds(),                 //秒   
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
        "S": date.getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
//正数(包括小数、0）
function positiveNumber(val) {
    if ($.trim(val).length > 0) {
        var reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
        if (reg.test(val)) {
            return true;
        }
    }
    return false;
}
//正整数（包括0）
function positiveInteger(val) {
    if ($.trim(val).length > 0) {
        var reg = /^[+]{0,1}(\d+)$/;
        if (reg.test(val)) {
            return true;
        }
    }
    return false;
}
//有0~1位小数的正数（包括整数）
function oneFaction(val) {
    if ($.trim(val).length > 0) {
        var reg = /^[0-9]+(.[0-9]{0,1})?$/;
        if (reg.test(val)) {
            return true;
        }
    }
    return false;
}
//有0~2位小数的正数（包括整数）
function twoFaction(val) {
    if ($.trim(val).length > 0) {
        var reg = /^[0-9]+(.[0-9]{0,2})?$/;
        if (reg.test(val)) {
            return true;
        }
    }
    return false;
}
/*
num 天数
date 日期
l 第一个还是第二个
t 向前还是向后
xDate 限制日期
*/
function dateChange(num, date, l, t, xDate, cDate) {
    var dt = cDate;

    if (!date) {
        date = new Date();//没有传入值时,默认是当前日期
        date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }

    date += " 00:00:00";//设置为当天凌晨12点
    date = Date.parse(new Date(date)) / 1000;//转换为时间戳
    date += (86400) * num;//修改后的时间戳
    var newDate = new Date(parseInt(date) * 1000);//转换为时间
    var tDate = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();

    if (t == "n" && new Date(tDate) > new Date(xDate)) {
        if (l == "s") {
            tDate = dt;
        } else {
            date = new Date(xDate); //限制日期
            tDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        }
    }
    if (t == "p" && new Date(tDate) < new Date(xDate)) {
        if (l == "e") {
            tDate = dt;
        } else {
            date = new Date(xDate); //限制日期
            tDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        }
    }
    return tDate;
}
