/**  项目JS主入口
 *  以依赖Layui的layer和form模块为例
 **/
var aCity = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: " 安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" }
function cidInfo(sId) {
    var iSum = 0
    if (!/^\d{17}(\d|x)$/i.test(sId)) return "格式不正确";
    sId = sId.replace(/x$/i, "a");
    if (aCity[parseInt(sId.substr(0, 2))] == null) return "非法地区";
    var sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
    var d = new Date(sBirthday.replace(/-/g, "/"))
    if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) return "非法生日";
    for (var i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11)
    if (iSum % 11 != 1) return "非法证号";
    return ""; //aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女") 
}


var verifyData = {
    //required（必填项）
    //phone（手机号）
    //email（邮箱）
    //url（网址）
    //number（数字）
    //date（日期）
    //identity（身份证）
    empty: function (value) {
        if (trimStr(value).length == 0) {
            return "请先完善患者信息(*)，再点击保存";
        }
        return "";
    },
    time: function (value) {
        if (trimStr(value).length > 0) {
            if (!new RegExp("/^(0\d{1}|1\d{1}|2[0-3]):([0-5]\d{1})$/").test(value)) {
                return "时间格式不对,正确如(23:59)";
            }
        }
        return "";
    },
    pwd: function (value) {
        var reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
        if (!reg.test(value)) {
            return "密码必须包含数字和字母";
        }
        if (trimStr(value).length > 0) {
            var apw = $.trim($("#ConfirmPassword").val());
            if (apw.length > 0) {
                if (apw != value) {
                    return "新密码两次输入不一致";
                }
            }
        }
        return "";
    },
    againPwd: function (value) {
        if (trimStr(value).length > 0) {
            var pw = $.trim($("#UserPwd").val());
            if (pw.length > 0) {
                if (pw != value) {
                    return "新密码两次输入不一致";
                }
            }
        }
        return "";
    },
    contact: function (value) {
        if (trimStr(value).length > 0) {
            return '编辑框内容至少输入十个字符';
        }
        return "";
    },
    title: function (value) {
        if (trimStr(value).length > 0) {
            if (!new RegExp("^[0-9a-zA-Z_\u4e00-\u9fa5]*$").test(value)) {
                return '只能输入字母、数字、下划线、汉字';
            }

        }
        return "";
    },
    //身份认证
    winIdentity: function (value) {
        if (trimStr(value).length > 0) {
            return cidInfo(value);
        }
        return "";
    },
    winEmail: function (value) {
        if (trimStr(value).length > 0) {
            if (!new RegExp("^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$").test(value)) {
                return "邮箱格式不正确";
            }
        }
        return "";
    },
    //字符长度-OK
    length4: function (value) {
        if (trimStr(value).length > 0) {
            if (!new RegExp("^.{4,18}$").test(value)) {
                return '只能输入长度4-18个之间';
            }
        }
        return "";
    },
    //字符长度-OK
    length6: function (value) {
        if (trimStr(value).length > 0) {
            if (!new RegExp("^.{6,18}$").test(value)) {
                return '只能输入长度6-18个之间';
            }
        }
        return "";
    },
    len15: function (value) {
        if (trimStr(value).length > 0) {
            if (!new RegExp("^.{0,15}$").test(value)) {
                return '长度最多只能输入15个字符';
            }
        }
        return "";
    },
    len10: function (value) {
        if (trimStr(value).length > 0) {
            if (!new RegExp("^.{0,10}$").test(value)) {
                return '长度最多只能输入10个字符';
            }
        }
        return "";
    },
    len20: function (value) {
        if (trimStr(value).length > 0) {
            if (!new RegExp("^.{0,20}$").test(value)) {
                return '长度最多只能输入20个字符';
            }
        }
        return "";
    },
    len50: function (value) {
        if (trimStr(value).length > 0) {
            if (!new RegExp("^.{0,50}$").test(value)) {
                return '长度最多只能输入50个字符';
            }
        }
        return "";
    },
    len100: function (value) {
        if (trimStr(value).length > 0) {
            if (!new RegExp("^.{0,100}$").test(value)) {
                return '长度最多只能输入100个字符';
            }
        }
        return "";
    },
    len250: function (value) {
        if (trimStr(value).length > 0) {
            if (value.length > 250) {
                return '长度最多只能输入250个字符';
            }
        }
        return "";
    },
    len400: function (value) {
        if (trimStr(value).length > 0) {
            if (value.length > 400) {
                return '长度最多只能输入400个字符';
            }
        }
        return "";
    },
    len450: function (value) {
        if (trimStr(value).length > 0) {
            if (value.length > 450) {
                return '长度最多只能输入450个字符';
            }
        }
        return "";
    },
    len2000: function (value) {
        if (trimStr(value).length > 0) {
            if (value.length > 2000) {
                return '长度最多只能输入2000个字符';
            }
        }
        return "";
    },
    //字线或数字，或混搭-OK
    namelpn: function (value) {
        if (trimStr(value).length > 0) {
            if (!new RegExp("^[0-9a-zA-Z_]*$").test(value)) {
                return '只能输入字母、数字、下划线';
            }

        }
        return "";
    },
    //字线或数字，或混搭或减号-OK
    nameshd: function (value) {
        if (trimStr(value).length > 0) {
            if (!new RegExp("^[0-9a-zA-Z_-]*$").test(value)) {
                return '只能输入字母、数字、下划线、减号';
            }

        }
        return "";
    },
    //整数或小数据点一位-OK
    float1: function (value) {
        if (trimStr(value).length > 0) {
            if (!new RegExp("^[0-9]+(.[0-9]{1})?$").test(value)) {
                return "只能输入整数或小数点后最多保留一位";
            }
        }
        return "";
    },
    //整数或小数据点一位-OK
    float01: function (value) {
        if (trimStr(value).length > 0) {
            if (!new RegExp("^[0-9]+(.[0-9]{1})?$").test(value)) {
                return "只能输入整数或小数点后最多保留一位";
            }
            var val = parseFloat(trimStr(value));
            if (val == 0) {
                return "不能为零!";
            }
        }
        return "";
    },
    //整数或小数据点二位-OK
    float2: function (value) {
        if (trimStr(value).length > 0) {
            if (!new RegExp("^[0-9]+(.[0-9]{1,2})?$").test(value)) {
                return "只能输入整数或小数点后最多保留二位";
            }
        }
        return "";
    },
    //整数或小数据点三位-OK
    float3: function (value) {
        if (trimStr(value).length > 0) {
            if (!new RegExp("^[0-9]+(.[0-9]{1,3})?$").test(value)) {
                return "只能输入整数或小数点后最多保留三位";
            }
        }
        return "";
    },
    //电话不是手机-OK
    tel: function (value) {
        if (trimStr(value).length > 0) {
            var isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
            var isMob = /^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|15[012356789][0-9]{8}|17[0123456789][0-9]{8}|18[0123456789][0-9]{8}|19[0123456789][0-9]{8}|147[0-9]{8}|1349[0-9]{7}|166[0-9]{8})$/;
            if (!isMob.test(value) && !isPhone.test(value)) {
                return "电话号码格式错误";
            }
            //if (!new RegExp("[0-9-()（）]{7,18}").test(value)) {
            //    return "电话号码格式错误";
            //}
        }
        return "";
    },
    //汉字-OK
    chinese: function (value) {
        if (trimStr(value).length > 0) {
            if (!new RegExp("[\u4e00-\u9fa5]").test(value)) {
                return "只能输入汉字";
            }
        }
        return "";
    },
    //只能输入字母、汉字、数字和下划线-OK
    chineseHz: function (value) {
        if (trimStr(value).length > 0) {
            if (!new RegExp("^[\u4e00-\u9fa5_a-zA-Z0-9]+$").test(value)) {
                return "只能输入字母、汉字、数字和下划线";
            }
        }
        return "";
    },
    //只能输入字母、汉字、数字和下划线以及英文名称-OK
    chineseHzEn: function (value) {
        if (trimStr(value).length > 0) {
            if (!new RegExp("^[a-zA-Z0-9\u4e00-\u9fa5_ ]*$").test(value)) {//不符合1
                return "只能输入字母、汉字、数字和下划线以及英文名称";
            }
        }
        return "";
    },
    //只能输入字母、汉字、数字和下划线、-等
    chineseHzAll: function (value) {
        if (trimStr(value).length > 0) {
            if (!new RegExp("^[\u4e00-\u9fa5_a-zA-Z0-9-（）()]+$").test(value)) {
                return "只能输入字母、汉字、数字、下划线和-";
            }
        }
        return "";
    },
    //只能输入字母、汉字、数字和下划线等
    chineseHzPart: function (value) {
        if (trimStr(value).length > 0) {
            if (!new RegExp("^[\u4e00-\u9fa5_a-zA-Z0-9（）()%αβγωⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅪⅫ:.]+$").test(value)) {
                return "只能输入字母、汉字、数字、下划线和-:.";
            }
        }
        return "";
    },
    preparatrionVerify: function (value) {
        if (trimStr(value).length > 0) {
            if (!new RegExp("^[\u4e00-\u9fa5_a-zA-Z0-9()（）/αωβγδεζηθικλμνξοπρστυφχψωⅠⅡⅢ ⅣⅤⅥⅦⅧⅨⅩⅪⅫ；:_—*#@^+. ]+$").test(value)) {
                return "只能输入字母、汉字、数字、以下特殊字符()（）/αωβγδεζηθικλμνξοπρστυφχψωⅠⅡⅢ ⅣⅤⅥⅦⅧⅨⅩⅪⅫ；:_—*#@^+.";
            }
        }
        return "";
    },
    //特殊字符-OK
    sqlstr: function (value) {
        if (trimStr(value).length > 0) {
            if (new RegExp("[@'#\$%\^&\*]+").test(value)) {
                return "不能包含[@'#$%&*]特殊字符";
            }
        }
        return "";
    },
    //
    sqlstr2: function (value) {
        if (trimStr(value).length > 0) {
            if (new RegExp("[@'#\$\^&\*]+").test(value)) {
                return "不能包含[@'#$&*]特殊字符";
            }
        }
        return "";
    },
    //正整数-OK
    int: function (value) {
        if (trimStr(value).length > 0) {
            if (!new RegExp("[1-9]\d*").test(value)) {
                return "只能输入正整数";
            }
        }
        return "";
    },
    //QQ-OK
    qq: function (value) {
        if (trimStr(value).length > 0) {
            if (!new RegExp("[1-9]([0-9]{5,11})").test(value)) {
                return "QQ号格式不正确";
            }
        }
        return "";
    },
    //IP-OK
    ip: function (value) {
        if (trimStr(value).length > 0) {
            if (!new RegExp("([0-9]{1,3}\.{1}){3}[0-9]{1,3}").test(value)) {
                return "IP地址格式不正确";
            }
        }
        return "";
    },
    //邮编-OK
    zcode: function (value) {
        if (trimStr(value).length > 0) {
            if (!new RegExp("^[1-9][0-9]{5}$").test(value)) {
                return "邮编格式不正确";
            }
        }
        return "";
    },
    order: function (value) {
        if (trimStr(value).length > 0) {
            if (!new RegExp("^[0-9]+$").test(value)) {
                return "必须为正整数";
            }
        }
        return "";
    },
    select: function (value) {
        if (trimStr(value).length > 0) {
            if (value == "-1") {
                return "下拉框需要选择项";
            }
        }
        return "";
    },
    digital: function (value) {
        if (trimStr(value).length > 0) {
            if (!new RegExp("^[0-9]{3}$").test(value)) {
                return "只能输入3位数的数字";
            }
        }
        return "";
    },
    wordNumber: function (value) {
        if (trimStr(value).length > 0) {
            if (!new RegExp("^[0-9A-Z]{2}$").test(value)) {
                return "只能输入2位数字或大写字母组成的数";
            }
        }
        return "";
    },
    specialWord: function (value) {
        if (trimStr(value).length > 0) {
            if (new RegExp("[<?>]+").test(value)) {
                return "不能包含[<>?]特殊字符";
            }
        }
        return "";
    }
}
layui.define(['form', 'layedit', 'element', 'laydate', 'winDialog'], function (exports) {

    var form = layui.form(),
        $ = layui.jquery,
        dialog = layui.dialog,
        layedit = layui.layedit,
        laydate = layui.laydate;
    var element = layui.element(); //导航的hover效果、二级菜单等功能，需要依赖element模块
    form.verify(verifyData);
    var object = {
        //设置元素高度最大自适应
        win_setConfigWH: function (id, fix, tab1, tab2, tab3, tab4, tab5) {
            var fixHeight = 0;
            var t1 = $("#" + tab1).outerHeight() || 0;
            var t2 = $("#" + tab2).outerHeight() || 0;
            var t3 = $("#" + tab3).outerHeight() || 0;
            var t4 = $("#" + tab4).outerHeight() || 0;
            var t5 = $("#" + tab5).outerHeight() || 0;
            var f = fix || 0;
            fixHeight = t1 + t2 + t3 + t4 + t5 + f;
            var d = window.top.document.documentElement.clientHeight;
            $("#" + id).height(d - fixHeight);
        },
        //设置日期i=0正常前后操作，i=1相反后前操作
        win_setDateArea: function (date, date2) {
            var end = '';
            var start = {
                min: laydate.now(),
                max: '2099-06-16 23:59:59',
                istoday: false,
                choose: function (datas) {
                    end.min = datas; //开始日选好后，重置结束日的最小日期
                    end.start = datas; //将结束日的初始值设定为开始日
                }
            };

            end = {
                min: laydate.now(),
                max: '2099-06-16 23:59:59',
                istoday: false,
                choose: function (datas) {
                    start.max = datas; //结束日选好后，重置开始日的最大日期
                }
            };

            document.getElementById(date).onclick = function () {
                start.elem = this;
                laydate(start);
            }
            document.getElementById(date2).onclick = function () {
                end.elem = this;
                laydate(end);
            }
        },
        win_getEditContent: function (edit) { return layedit.getContent(edit); },
        win_bulid: function (edit, ht) {
            layedit.set({
                uploadImage: {
                    url: '/Home/WebUpload?fPathName=imgs' //接口url
                    ,
                    type: 'POST' //默认post
                }
            });
            //注意：layedit.set 一定要放在 build 前面，否则配置全局接口将无效。
            //创建一个编辑器
            var editIndex = layedit.build(edit, {
                tool: [],
                //'strong' //加粗
                //, 'italic' //斜体
                //, 'underline' //下划线
                //, 'del' //删除线 
                //, '|' //分割线
                //, 'left' //左对齐
                //, 'center' //居中对齐
                //, 'right' //右对齐
                //, 'link' //超链接
                //, 'unlink' //清除链接
                //, 'face' //表情
                //, 'image' //插入图片
                //, 'help' //帮助           
                height: ht || 180 //设置编辑器高度
            });
            return editIndex;
        },
        //自定义验证规则
        win_verify: function (data) {
            form.verify(data);
        },
        //复选框事件监听
        win_checkbox: function (filter, tureFun, falseFun) {
            form.on('checkbox(' + filter + ')', function (data) {
                if (this.checked) {
                    if (tureFun) tureFun(data);
                } else {
                    if (falseFun) falseFun(data);
                }
            });
        },
        //刷新渲染  
        win_render: function (type) {
            if (type) form.render(type);
            else form.render();
        },
        //监听导航点击
        win_nav: function (filter, fun) {
            element.on('nav(' + filter + ')', function (elem) {
                if (fun) fun(elem.text());
            });
        },
        //单选框事件监听
        win_radio: function (filter, fun) {
            form.on('radio(' + filter + ')', function (data) {
                if (fun) fun(data);
            });
        },
        //下拉框事件监听
        win_select: function (filter, fun) {
            form.on('select(' + filter + ')', function (data) {
                if (fun) fun(data);
            });
        },
        //监听指定开关
        win_switch: function (filter, tureFun, falseFun) {

            form.on('switch(' + filter + ')', function (data) {
                if (this.checked) {
                    if (tureFun) tureFun(data);
                } else {
                    if (falseFun) falseFun(data);
                }
            });
        },
        //提交验证
        win_submit: function (filter, configVal) {

            //监听提交
            form.on('submit(' + filter + ')', function (data) {
                //layer.alert(JSON.stringify(data.field), {
                //    title: '最终的提交信息'
                //})
                return configVal(data.field); //配置下提交表前的数据
            });
        },
        //tree自适应
        win_resize: function (elem, fix) {
            var $content = $(window.parent.document);
            $(elem).height($content.height() - fix);
        },
        win_selfresize: function (elem, fix) {
            var $content = $(window.document);
            $(elem).height($content.height() - fix);
        },
        win_redirectToLocal: function (u) {
            window.location.href = u;
        },
        win_defaultDate: function (o, e) {
            if ($.trim(o.value).length == 0)
                o.value = e;
        },
        win_zmszxhx: function (o, dag) {
            var dlg = dag || dialog;
            var v = $.trim(o.value);
            var flag = false;
            if (v.length > 0) {
                if (!new RegExp("^[0-9a-zA-Z_-]*$").test(v)) {
                    dlg.win_msg('只能输入字母、数字、下划线、减号', 5);
                    flag = true;
                }
            }
            if (flag) { //有问题改变样式
                $(o).addClass("errorInput");
                o.accessKey = "error";
            } else {
                $(o).removeClass("errorInput");
                o.accessKey = "normal";
            }
        },
        win_zwzmszxhx: function (o, dag) {
            var dlg = dag || dialog;
            var v = $.trim(o.value);
            var flag = false;
            if (v.length > 0) {
                if (!new RegExp("[0-9a-zA-Z_\u4e00-\u9fa5]").test(v)) {
                    dlg.win_msg("只能输入字母、汉字、数字和下划线", 5);
                    flag = true;
                }
            }
            if (flag) { //有问题改变样式
                $(o).addClass("errorInput");
                o.accessKey = "error";
            } else {
                $(o).removeClass("errorInput");
                o.accessKey = "normal";
            }
        },
        win_chkFloat1: function (o, maxlen, dag) { //len最多几位
            var dlg = dag || dialog;
            var v = $.trim(o.value);
            var flag = false;
            if (v.length > 0) {
                if (!new RegExp("^[0-9]+(.[0-9]{1})?$").test(v)) {
                    dlg.win_msg("只能输入整数或小数点后最多保留一位!", 5);
                    flag = true;
                } else {
                    var len = v.length;
                    if (len > maxlen) {
                        var index = v.indexOf(".");
                        var str = v.substring(0, index);
                        var s = str.length - maxlen;
                        if (s > 0) {
                            o.value = v.substr(s);
                        } else {
                            o.value = v;
                        }
                    }
                }

            }
            if (flag) { //有问题改变样式
                $(o).addClass("errorInput");
                o.accessKey = "error";
            } else {
                $(o).removeClass("errorInput");
                o.accessKey = "normal";
            }
        },
        win_chkFloat2: function (o, maxlen, dag) { //len最多几位
            var dlg = dag || dialog;
            var v = $.trim(o.value);
            var flag = false;
            if (v.length > 0) {
                if (!new RegExp("^[0-9]+(.[0-9]{1,2})?$").test(v)) {
                    dlg.win_msg("只能输入整数或小数点后最多保留两位!", 5);
                    flag = true;
                } else {
                    var len = v.length;
                    if (len > maxlen) {
                        var index = v.indexOf(".");
                        var str = v.substring(0, index);
                        var s = str.length - maxlen;
                        if (s > 0) {
                            o.value = v.substr(s);
                        } else {
                            o.value = v;
                        }
                    }
                }

            }
            if (flag) { //有问题改变样式
                $(o).addClass("errorInput");
                o.accessKey = "error";
            } else {
                $(o).removeClass("errorInput");
                o.accessKey = "normal";
            }
        }, win_chkInt: function (o, maxlen, dag) { //len最多几位
            var dlg = dag || dialog;
            var v = $.trim(o.value);
            var flag = false;
            if (v.length > 0) {
                if (!new RegExp("^[0-9]+$").test(v)) {
                    dlg.win_msg("只能输入整数!", 5);
                    flag = true;
                } else {
                    var len = v.length;
                    if (len > maxlen) {
                        //var index = v.indexOf(".");
                        //var str = v.substring(0, index);
                        var s = v.substring(0, maxlen);
                        o.value = s;
                    }
                }
            }
            if (flag) { //有问题改变样式
                $(o).addClass("errorInput");
                o.accessKey = "error";
            } else {
                $(o).removeClass("errorInput");
                o.accessKey = "normal";
            }/**验证时间段
              * selem=起始时间
              * eelem=截止时间
              * i=（0-起始时间调，1-截止时间调）
              * dag=弹窗对象
              * d=限制相差几天
              * isLong=（是否判断不能相差多少天）
              ***/
        }, win_DiffDateStr: function (selem, eelem, i, dag, d, isLong) {
            var sd = $.trim($(selem).val());
            var ed = $.trim($(eelem).val());
            if (i == 0) {
                if (sd.length > 0 && ed.length > 0) {
                    if (sd > ed) {
                        dag.win_alert('开始日期不能大于截止日期！', "操作提示", 5);
                        ed = d > 0 ? dateAddDay(sd, d) : sd;
                        $(eelem).val(ed);
                    } else if (isLong) {
                        var day = DateDiff(ed, sd);
                        if (Math.abs(day) > d) {
                            dag.win_alert("日期间隔不能大于" + d + "天!", "操作提示", 5);
                            ed = dateAddDay(sd, d);
                            $(eelem).val(ed);
                            return false;
                        }
                    }
                }
            } else {
                if (sd.length > 0 && ed.length > 0) {
                    if (sd > ed) {
                        dag.win_alert('截止期不能小于开始日期！', "操作提示", 5);
                        sd = d > 0 ? dateAddDay(ed, -d) : ed;
                        $(selem).val(sd);
                    } else if (isLong) {
                        var day2 = DateDiff(ed, sd);
                        if (Math.abs(day2) > d) {
                            dag.win_alert("日期间隔不能大于" + d + "天!", "操作提示", 5);
                            sd = dateAddDay(ed, -d);
                            $(selem).val(sd);
                            return false;
                        }
                    }
                }
            }
        }
    };
    exports('winForm', object); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
});

function trimStr(str) { return str.replace(/(^\s*)|(\s*$)/g, ""); }

//var body = layer.getChildFrame('body', idx);
//var iframeWin = window[layero.find('iframe')[0]['name']];
////得到iframe页的窗口对象，执行iframe页的方法：
//iframeWin.method();  //得到iframe页的body内容
//body.find('input').val('Hi，我是从父页来的')
//form对象，布局ID,验证的属性，弹消息对象
function CheckInputFloatVal(fm, elem, accept, dialog) {
    $(elem).find("td").find("input[type=text][accept=" + accept + "]").blur(function () {
        //布局，当前元素，长度，当前弹像
        fm.win_chkFloat2(this, 5, dialog);
    });
}
//form对象，布局ID,验证的属性，弹消息对象
function CheckInputVal(fm, elem) {
    $(elem).find("*").focus(function () {
        var l = $(elem).find("input[accessKey=error]").size();
        if (l > 0) {
            $(elem).find("select").addClass("layui-disabled");
            $(elem).find("input[accessKey=error]").select();
            $(elem).find("input[accessKey=error]").focus();
            fm.win_render("select");
        }
    });
}
//计算天数差的函数
function DateDiff(sDate1, sDate2) {  //sDate1和sDate2是2002-12-18格式
    var aDate;
    aDate = sDate1.split("-");
    var oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);  //转换为12-18-2002格式
    aDate = sDate2.split("-");
    var oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);
    var iDays = parseInt((oDate1 - oDate2) / 1000 / 60 / 60 / 24);  //把相差的毫秒数转换为天数
    return iDays;
}
// 日期，在原有日期基础上，增加days天数，默认增加1天
function dateAddDay(dt, days) {
    if (days == undefined || days == '') {
        days = 1;
    }
    var date = new Date(dt);
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

/**
 * 膳食营养素计算
 * @param {均值OR天值} t 
 * @param {调用接口} url 
 * @param {参数} data 
 * @param {页头验证} headers 
 * @returns {} 
 */
//计算营养素
function CalculationDietNutrition(t, url, data, headers) {
    $.ajax({
        type: 'POST',
        url: url,
        cache: false,
        headers: headers,
        data: data,
        success: function (data) {
            var proRate = "--";
            var fatRate = "--";
            var carRate = "--";
            if (data.nutrientRatio.length > 0) {
                proRate = data.nutrientRatio[0].nrRate > 0 ? data.nutrientRatio[0].nrName : "--";
                fatRate = data.nutrientRatio[1].nrRate > 0 ? data.nutrientRatio[1].nrName : "--";
                carRate = data.nutrientRatio[2].nrRate > 0 ? data.nutrientRatio[2].nrName : "--";
            }
            $(data.list).each(function (i, n) {
                var txtVal = "--";
                var color = "";
                if (n.levl == 1 && n.nrVal > 0) {
                    color = "red";
                } //高
                if (n.levl > 1 && n.nrVal > 0) {
                    color = "green";
                } //低
                if (i > 0 && i < 4) {
                    if (n.nrVal > 0) {
                        if (i == 1) {
                            txtVal = n.nrVal + n.nrUnit + "/" + proRate;
                        }
                        if (i == 2) {
                            txtVal = n.nrVal + n.nrUnit + "/" + fatRate;
                        }
                        if (i == 3) {
                            txtVal = n.nrVal + n.nrUnit + "/" + carRate;
                        }
                    }
                } else {
                    if (n.nrVal > 0) {
                        txtVal = n.nrVal + n.nrUnit;
                    }
                }
                var elem = "#s_" + n.nrCode;
                var elemr = "#t_" + n.nrCode;

                if (t > 0 && i < 4) {//取日均需改名称
                    elem = "#js_" + n.nrCode;
                    elemr = "#jt_" + n.nrCode;
                }

                if (n.nrVal > 0) {

                    $(elem).text(txtVal);
                    $(elem).css({ "color": color });
                } else {
                    $(elem).text("--");
                    $(elem).css({ "color": "" });//正常或者没值的情况，颜色回归
                }

                $(elemr).text(n.nrRange);


            });
            //if (t == 0 && data.threeMealsEnergyRatio.length > 0) {
            if (data.threeMealsEnergyRatio.length > 0) {
                //早中晚实际摄入 start
                if (data.threeMealsEnergyRatio[0].nrRate > 0) {
                    $("#zao").text(data.threeMealsEnergyRatio[0].nrName);
                } else {
                    $("#zao").text('--');
                }
                if (data.threeMealsEnergyRatio[1].nrRate > 0) {
                    $("#zaodian").text(data.threeMealsEnergyRatio[1].nrName);
                } else {
                    $("#zaodian").text('--');
                }
                if (data.threeMealsEnergyRatio[2].nrRate > 0) {
                    $("#zhu").text(data.threeMealsEnergyRatio[2].nrName);
                } else {
                    $("#zhu").text('--');
                }
                if (data.threeMealsEnergyRatio[3].nrRate > 0) {
                    $("#wudian").text(data.threeMealsEnergyRatio[3].nrName);
                } else {
                    $("#wudian").text('--');
                }
                if (data.threeMealsEnergyRatio[4].nrRate > 0) {
                    $("#wan").text(data.threeMealsEnergyRatio[4].nrName);
                } else {
                    $("#wan").text('--');
                }
                if (data.threeMealsEnergyRatio[5].nrRate > 0) {
                    $("#wandian").text(data.threeMealsEnergyRatio[5].nrName);
                } else {
                    $("#wandian").text('--');
                }
            }

        },
        error: function (data) {
            //alert("Error");
        }
    });
}

function SetCalculationCNWNutrition(url, data, headers) {
    $.ajax({
        type: 'POST',
        url: url,
        cache: false,
        headers: headers,
        data: data,
        success: function (data) {
            $(data.jsResult).each(function (i, n) {
                var range = n.nrRange + n.nrUnit;
                if (n.nrRange == 0 || n.nrRange == "0:0") {
                    range = "--";
                }
                $("#" + n.nrCode).val(n.nrRange);
                $("#txt_" + n.nrCode).text(range);
            });
            var proRate = "--";
            var fatRate = "--";
            var carRate = "--";
            if (data.nutrientRatio.length > 0) {
                proRate = data.nutrientRatio[0].nrRate > 0 ? data.nutrientRatio[0].nrName : "--";
                fatRate = data.nutrientRatio[1].nrRate > 0 ? data.nutrientRatio[1].nrName : "--";
                carRate = data.nutrientRatio[2].nrRate > 0 ? data.nutrientRatio[2].nrName : "--";
            }
            $(data.list).each(function (i, n) {
                var txtVal = "--";
                var color = "";
                if (n.levl == 1 && n.nrVal > 0) {
                    color = "red";
                } //高
                if (n.levl > 1 && n.nrVal > 0) {
                    color = "green";
                } //低
                if (i > 1 && i < 5) {
                    if (n.nrVal > 0) {
                        if (i == 2) {
                            txtVal = n.nrVal + n.nrUnit + "/" + proRate;
                        }
                        if (i == 3) {
                            txtVal = n.nrVal + n.nrUnit + "/" + fatRate;
                        }
                        if (i == 4) {
                            txtVal = n.nrVal + n.nrUnit + "/" + carRate;
                        }
                    }
                } else {
                    if (n.nrVal > 0) {
                        txtVal = n.nrVal + n.nrUnit;
                    }

                }
                //肠内
                var elem = "#ns_" + n.nrCode;
                var elemr = "#nt_" + n.nrCode;
                //肠外
                var elemcw = "#ws_" + n.nrCode;
                var elemrcw = "#wt_" + n.nrCode;

                if (n.nrVal > 0) {
                    $(elem).text(txtVal);
                    $(elem).css({ "color": color });
                    $(elemcw).text(txtVal);
                    $(elemcw).css({ "color": color });
                } else {
                    $(elem).text("--");
                    $(elemcw).text("--");
                }
                $(elemr).text(n.nrRange);
                $(elemrcw).text(n.nrRange);
            });
            var elemWarn = '#warning';
            var elemWarnCW = "#warningCW";

            $("#lblCWPrice").text('--');
            $("#lblPrice").text('--');

            var warningStr = data.warning.length > 0 ? data.warning.split('|')[0] : "";
            if (warningStr.length > 0) {
                $(elemWarn).html(warningStr);
                $(elemWarn).css({ "color": "red" });
                $(elemWarnCW).html(warningStr);
                $(elemWarnCW).css({ "color": "red" });
            } else {
                $(elemWarn).html('<img src="/Content/images/yj.png" style="width: 80px; height: 80px;" />');
                $(elemWarnCW).html('<img src="/Content/images/yj.png" style="width: 80px; height: 80px;" />');
            }
        },
        error: function () {
            //alert("Error");
        }
    });
}


/**
 * 肠内外营养素计算
 * @param {均值OR天值} t 
 * @param {调用接口} url 
 * @param {参数} data 
 * @param {页头验证} headers 
 * @returns {} 
 */
//计算营养素
function CalculationCNWNutrition(t, url, data, headers, tj, fun) {
    $.ajax({
        type: 'POST',
        url: url,
        cache: false,
        headers: headers,
        data: data,
        success: function (data) {
            if (t == 0) { //肠内需要绑定浓度
                if (data.concentration > 0) {
                    $("#sp_concentration").text(data.concentration + " %");
                    $("#EN_concentration").val(data.concentration);
                    if (tj && tj == 'true') {
                        if (data.isfirst == false) { //第一天使用
                            if (data.concentration > 5)
                                $("#sp_concentration").css({ color: "red" });
                            else {
                                $("#sp_concentration").css({ color: "black" });
                            }
                        } else { //非第一天使用
                            if (data.concentration >= 25)
                                $("#sp_concentration").css({ color: "red" });
                            else {
                                $("#sp_concentration").css({ color: "black" });
                            }
                        }
                    } else {
                        $("#sp_concentration").css({ color: "black" });
                    }
                } else {
                    $("#sp_concentration").text("--");
                    $("#EN_concentration").val(0);
                }
            } else {
                $(data.jsResult).each(function (i, n) {
                    var range = n.nrRange + n.nrUnit;
                    if (n.nrRange == 0 || n.nrRange == "0:0") {
                        range = "--";
                    }
                    $("#" + n.nrCode).val(n.nrRange);
                    $("#txt_" + n.nrCode).text(range);
                });
            }
            var proRate = "--";
            var fatRate = "--";
            var carRate = "--";
            if (data.nutrientRatio.length > 0) {
                proRate = data.nutrientRatio[0].nrRate > 0 ? data.nutrientRatio[0].nrName : "--";
                fatRate = data.nutrientRatio[1].nrRate > 0 ? data.nutrientRatio[1].nrName : "--";
                carRate = data.nutrientRatio[2].nrRate > 0 ? data.nutrientRatio[2].nrName : "--";
            }
            $(data.list).each(function (i, n) {
                var txtVal = "--";
                var color = "";
                if (n.levl == 1 && n.nrVal > 0) {
                    color = "red";
                } //高
                if (n.levl > 1 && n.nrVal > 0) {
                    color = "green";
                } //低
                if (i > 1 && i < 5) {
                    if (n.nrVal > 0) {
                        if (i == 2) {
                            txtVal = n.nrVal + n.nrUnit + "/" + proRate;
                        }
                        if (i == 3) {
                            txtVal = n.nrVal + n.nrUnit + "/" + fatRate;
                        }
                        if (i == 4) {
                            txtVal = n.nrVal + n.nrUnit + "/" + carRate;
                        }
                    }
                } else {
                    if (n.nrVal > 0) {
                        txtVal = n.nrVal + n.nrUnit;
                    }

                }
                var elem = "#ns_" + n.nrCode;
                var elemr = "#nt_" + n.nrCode;

                if (t > 0) { //肠外需改名称
                    elem = "#ws_" + n.nrCode;
                    elemr = "#wt_" + n.nrCode;
                }

                if (n.nrVal > 0) {
                    $(elem).text(txtVal);
                    $(elem).css({ "color": color });
                } else {
                    $(elem).text("--");
                }
                $(elemr).text(n.nrRange);


            });
            var elemWarn = '#warning';
            if (t > 0) { //肠外需改名称
                if (data.price && data.price > 0) {
                    $("#lblCWPrice").text(data.price);
                    $("#CWPrice").val(data.price);
                } else {
                    $("#lblCWPrice").text('--');
                }
                elemWarn = "#warningCW";
            } else {
                if (data.price && data.price > 0) {
                    $("#lblPrice").text(data.price);
                    $("#Price").val(data.price);
                } else {
                    $("#lblPrice").text('--');
                }
            }
            var warningStr = data.warning.length > 0 ? data.warning.split('|')[0] : "";
            if (warningStr.length > 0) {
                $(elemWarn).html(warningStr);
                $(elemWarn).css({ "color": "red" });
            } else {
                $(elemWarn).html('<img src="/Content/images/yj.png" style="width: 80px; height: 80px;" />');
            }

            if (fun) fun();
        },
        error: function () {
            //alert("Error");
        }
    });
}
/**
 * @param {} table COM对象
 * @returns {} 
 */
function makeSortable(table) {
    var headers = table.getElementsByTagName("th");
    for (var i = 0; i < 1; i++) {
        (function (n) {

            var flag = false;
            headers[n].onclick = function () {
                var txt = $(headers[n]).find("span[lang=viewState]")[0].innerHTML;
                if (txt == "(||)") {
                    txt = "(↑)";
                }
                else if (txt == "(↑)") {
                    txt = "(↓)";
                }
                else if (txt == "(↓)") {
                    txt = "(↑)";
                }
                $(headers[n]).find("span[lang=viewState]")[0].innerHTML = txt;
                // sortrows(table,n);
                var tbody = table.tBodies[0];//第一个<tbody>
                var rows = tbody.getElementsByTagName("tr");//tbody中的所有行
                rows = Array.prototype.slice.call(rows, 0);//真实数组中的快照

                //基于第n个<td>元素的值对行排序
                rows.sort(function (row1, row2) {
                    var cell1 = row1.getElementsByTagName("td")[n];//获得第n个单元格
                    var cell2 = row2.getElementsByTagName("td")[n];
                    var val1 = cell1.textContent || cell1.innerText;//获得文本内容
                    var val2 = cell2.textContent || cell2.innerText;

                    if (val1 < val2) {
                        return -1;
                    } else if (val1 > val2) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                if (flag) {
                    rows.reverse();
                }
                //在tbody中按它们的顺序把行添加到最后
                //这将自动把它们从当前位置移走，故没必要预先删除它们
                //如果<tbody>还包含了除了<tr>的任何其他元素，这些节点将会悬浮到顶部位置
                for (var i = 0; i < rows.length; i++) {
                    tbody.appendChild(rows[i]);
                }

                flag = !flag;
            }
        }(i));
    }
}
function bindMovelClick(o, t, patCode, isPC) {
    $(o).parent().parent().parent().parent().find("th:first").find("span[lang=viewState]").text('(||)');
    if (t == 0) //上移
    {
        var ptr = $(o).parent().parent();
        var pvtr = $(o).parent().parent().prev("tr");
        if (pvtr.size() > 0) {
            var v = $(ptr).find("td").eq(3).find("input[type=text]").val();
            var v2 = $(pvtr).find("td").eq(3).find("input[type=text]").val();

            var phtml = $(ptr).html();
            var pvhtml = $(pvtr).html();
            var pt = $.trim($(ptr).find("td:first").text());
            var pvt = $.trim($(pvtr).find("td:first").text());
            //$(ptr).html(pvhtml);
            //$(pvtr).html(phtml);
            if (pt == pvt) { //如果是同一餐次           
                $(ptr).html(pvhtml);
                $(pvtr).html(phtml);
                $(ptr).find("td").eq(3).find("input[type=text]").val(v2);
                $(pvtr).find("td").eq(3).find("input[type=text]").val(v);

                $(".txt_num").change(function () {
                    var v = $(this).val();
                    if (v.length <= 0) {
                        $(this).val(1);
                    }
                    CalculationNutrition(0, patCode, isPC);
                });
            }
            else {
                dialog.win_msg("已经到该段同餐次的第一项!");
            }

        } else {
            dialog.win_msg("已经到第一项!");
        }
    } else {//下移
        var ptr2 = $(o).parent().parent();
        var pvtr2 = $(o).parent().parent().next("tr");
        if (pvtr2.size() > 0) {
            var v3 = $(ptr2).find("td").eq(3).find("input[type=text]").val();
            var v4 = $(pvtr2).find("td").eq(3).find("input[type=text]").val();

            var phtml2 = $(ptr2).html();
            var pvhtml2 = $(pvtr2).html();

            var pt2 = $.trim($(ptr2).find("td:first").text());
            var pvt2 = $.trim($(pvtr2).find("td:first").text());
            //$(ptr2).html(pvhtml2);
            //$(pvtr2).html(phtml2);
            if (pt2 == pvt2) { //如果是同一餐次
                $(ptr2).html(pvhtml2);
                $(pvtr2).html(phtml2);
                $(ptr2).find("td").eq(3).find("input[type=text]").val(v4);
                $(pvtr2).find("td").eq(3).find("input[type=text]").val(v3);

                $(".txt_num").change(function () {
                    var v = $(this).val();
                    if (v.length <= 0) {
                        $(this).val(1);
                    }
                    CalculationNutrition(day, patCode, isPC);
                });
            }
            else {
                dialog.win_msg("已经到该段同餐次的最后一项!");
            }

        } else {
            dialog.win_msg("已经到最后一项!");
        }
    }
}

function findIndex(str, cha, num) {
    var x = str.indexOf(cha);
    for (var i = 0; i < num; i++) {
        x = str.indexOf(cha, x + 1);
    }
    return x;
}