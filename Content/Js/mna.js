/**
    * 受损变条件改变时清空结果内容
    * @param {状态1-营养需要程度，2-体重下降百分比，3-进食量减少，4-进食量正常，5-进食量百分比,6-白蛋白替代} t
    * @param {种类o=1计算bmi百分比，o=2计算体重百分比，o=3全部计算} o
    * @param {UI元素} els
    * @param {显示分数线} val
    * @returns {}
    */

function clearResult(t, els) {
   
    //状态为不能保存
    $(els.submit).val("false");
    //清空评分
    $(els.screeningScore).val('0');
    //清空评分保存结果
    $(els.ScreeningResult).val('');
    //保存按钮不可见
    $(els.action).hide();

    if (t == 1) {//三个月前体重变化
        CalculationPerc(els, ScreeningScore);//体重变化
    }
    else if (t == 2) {//体重变化
        CalculationPerc(els);//体重变化
        configBMI(els, headers, ScreeningScore);//BMI
    }
    else if (t == 3) {//身高变化
        configBMI(els, headers, ScreeningScore);
    }
    else if (t == 4) {
        ScreeningScore(els); //初筛自动评分
    }
    else if (t == 5) {
        ScreeningScore(els); //评估自动评分
    }
}

/**
* 评分结果
* @param {UI元素} els
* @returns {}
*/
function ScreeningResult(els, t) {
    var apr = '',score1 = 0, score2 = 0 ;
    if (t == 1) {
        var s1 = parseInt($("input[type=radio][name=" + els.MNA1 + "]:checked").val().substring(7));
        var s2 = parseInt($("input[type=radio][name=" + els.MNA2 + "]:checked").val().substring(7));
        var s3 = parseInt($("input[type=radio][name=" + els.MNA3 + "]:checked").val().substring(7));
        var s4 = parseInt($("input[type=radio][name=" + els.MNA4 + "]:checked").val().substring(7));
        var s5 = parseInt($("input[type=radio][name=" + els.MNA5 + "]:checked").val().substring(7));
        var s6 = parseInt($("input[type=radio][name=" + els.MNA6 + "]:checked").val().substring(7));

        score1 = s1 + s2 + s3 + s4 + s5 + s6;
        $(els.screeningScore1).val(score1);
        $(els.chuS).text(score1);
    }
    else if (t == 2) {
        score1 = parseFloat($(els.screeningScore1).val());
        var s7 = parseInt($("input[type=radio][name=" + els.MNA7 + "]:checked").val().substring(7));
        var s8 = parseInt($("input[type=radio][name=" + els.MNA8 + "]:checked").val().substring(7));
        var s9 = parseInt($("input[type=radio][name=" + els.MNA9 + "]:checked").val().substring(7));
        var s10 = parseInt($("input[type=radio][name=" + els.MNA10 + "]:checked").val().substring(7));
        var s11 = parseInt($("input[type=radio][name=" + els.MNA11 + "]:checked").val().substring(7));
        var s12 = parseInt($("input[type=radio][name=" + els.MNA12 + "]:checked").val().substring(7));
        var s13 = parseInt($("input[type=radio][name=" + els.MNA13 + "]:checked").val().substring(7));
        var s14 = parseInt($("input[type=radio][name=" + els.MNA14 + "]:checked").val().substring(7));
        var s15 = parseInt($("input[type=radio][name=" + els.MNA15 + "]:checked").val().substring(7));
        var s16 = parseInt($("input[type=radio][name=" + els.MNA16 + "]:checked").val().substring(7));
        var s17 = parseInt($("input[type=radio][name=" + els.MNA17 + "]:checked").val().substring(7));
        var s18 = parseInt($("input[type=radio][name=" + els.MNA18 + "]:checked").val().substring(7));
        var s19 = parseInt($("input[type=radio][name=" + els.MNA19 + "]:checked").val().substring(7));
        var s20 = parseInt($("input[type=radio][name=" + els.MNA20 + "]:checked").val().substring(7));
        s13 = s13 > 10 ? s13 / 100 : s13;
        s16 = s16 > 10 ? s16 / 100 : s16;
        score2 = s7 + s8 + s9 + s10 + s11 + s12 + s13 + s14 + s15 + s16 + s17 + s18 + s19 + s20;
        $(els.screeningScore2).val(score2);
        $(els.pingG).text(score2);
    }
    var add = parseFloat(els.age) >= 70 ? 1 : 0;
    var score = score1 + score2 + add;
    $(els.screeningScore).val(score);
    if (score1 >= els.chuSfen && score1 <= els.chuSfen2) { //无营养不良风险，无需评估；
        apr = score1 + els.chuMsg1;
        $(els.resultMsg).css("color", "green");
        $(els.resultMsg).text(apr);
        $(els.result).val(apr);
        $("#IsRisk").val(0);
        $("#" + els.col).val('green');
    }
    else {//有营养不良风险，继续评估；
        var color = 'red';
        if (score < els.fen1 && score2 >= 0 && score1 >= 0) { // 0<?＜24 分
            if (score > els.fen2) {
                var bmi = parseFloat($(els.BMI).val());
                var sss20 = $("input[type=radio][name=" + els.MNA20 + "]:checked").size();
                var ss20 = 0;
                if (sss20 > 0) ss20 = parseInt($("input[type=radio][name=" + els.MNA20 + "]:checked").val().substring(7));
                if (bmi >= 24 || (els.sex == "1" && ss20 == 0) || (els.sex == "0" && ss20 == 0)) {
                    apr = score + els.result2Msg;
                    color = 'orange';
                } else {
                    color = 'orange';
                    apr = score + els.result1Msg;
                }
            }else {
                apr = score + els.result0Msg;
            }
            $(els.resultMsg).css("color", color);
            $(els.resultMsg).text(apr);
            $(els.result).val(apr);
            $("#IsRisk").val(1);
        }
        else if (score >= els.fen1 && score2 >= 0 && score1 >= 0) {
            color = 'green';
            apr = score + els.result3Msg;
            $(els.resultMsg).css("color", color);
            $(els.resultMsg).text(apr);
            $(els.result).val(apr);
            $("#IsRisk").val(0);
        }
        else {
            apr = "初筛：" + score1 + els.chuMsg2;
            $(els.resultMsg).css("color", color);
            $(els.resultMsg).text(apr);
            $(els.result).val(apr);
            $("#IsRisk").val(1);
        }
        $("#" + els.col).val(color);
    }
}

/**
* 评分验证
* @param {bmi分值} bmi
* @param {UI元素} els
* @param {} lossperstxt
* @returns {}
*/
function ScreeningScore(els) {
    var error1 = $("input[type=radio][name=" + els.MNA1 + "]:checked").size();
    var error2 = $("input[type=radio][name=" + els.MNA2 + "]:checked").size();
    var error3 = $("input[type=radio][name=" + els.MNA3 + "]:checked").size();
    var error4 = $("input[type=radio][name=" + els.MNA4 + "]:checked").size();
    var error5 = $("input[type=radio][name=" + els.MNA5 + "]:checked").size();
    var error6 = $("input[type=radio][name=" + els.MNA6 + "]:checked").size();

    var error7 = $("input[type=radio][name=" + els.MNA7 + "]:checked").size();
    var error8 = $("input[type=radio][name=" + els.MNA8 + "]:checked").size();
    var error9 = $("input[type=radio][name=" + els.MNA9 + "]:checked").size();
    var error10 = $("input[type=radio][name=" + els.MNA10 + "]:checked").size();
    var error11 = $("input[type=radio][name=" + els.MNA11 + "]:checked").size();
    var error12 = $("input[type=radio][name=" + els.MNA12+ "]:checked").size();
    var error13 = $("input[type=radio][name=" + els.MNA13 + "]:checked").size();
    var error14 = $("input[type=radio][name=" + els.MNA14 + "]:checked").size();
    var error15 = $("input[type=radio][name=" + els.MNA15 + "]:checked").size();
    var error16 = $("input[type=radio][name=" + els.MNA16 + "]:checked").size();
    var error17 = $("input[type=radio][name=" + els.MNA17 + "]:checked").size();
    var error18 = $("input[type=radio][name=" + els.MNA18 + "]:checked").size();
    var error19 = $("input[type=radio][name=" + els.MNA19 + "]:checked").size();
    var error20 = $("input[type=radio][name=" + els.MNA20 + "]:checked").size();
    
    if (error1 > 0 && error2 > 0 && error3 > 0 && error4 > 0 && error5 > 0 && error6 > 0) {
        ScreeningResult(els, 1);
        var score1 = parseFloat($(els.screeningScore1).val());
        if (score1 < 12) {
            $(els.pingGTb).show();
            if (error7 == 0 || error8 == 0 || error9 == 0 || error10 == 0 || error11 == 0 || error12 == 0 || error13 == 0 || error14 == 0 || error15 == 0 || error16 == 0 || error17 == 0 || error18 == 0 || error19 == 0 || error20 == 0) {
                var par =  score1 + els.chuMsg2;
                $(els.resultMsg).text( par + "评估数据不完整，暂无法进行总评分!");
                $(els.submit).val("false");
                ConfigoptionTr(els.actionTr, 0);
            } else {
                ScreeningResult(els, 2);
                $(els.submit).val("true");
                ConfigoptionTr(els.actionTr, 2);
            }
        } else {
            $(els.pingGTb).hide();
            $(els.pingG).text("0");
            $(els.pingGTb).find("input[type=radio]").prop("checked", false);
            window.fm.win_render('radio');
            $("input[type=text][lang=valW]").val("");
            $(els.submit).val("true");
            ConfigoptionTr(els.actionTr, 2);
        }
    } else {
        $(els.resultMsg).text("初筛数据不完整，暂无法进行评分!");
        $(els.submit).val("false");
        ConfigoptionTr(els.actionTr, 0);
    }

}
/**
 * 配置操作功能
 * @param {} actionTr 
 * @param {} i 
 * @returns {} 
 */
function ConfigoptionTr(actionTr, i) {
    if (i == 0) {  //改变数据后全部不可操作
        $(actionTr).find("input").addClass("layui-disabled");
        $(actionTr).find("input[type=submit]").removeClass("layui-btn");
        $(actionTr).find("input[type=button]").removeClass("layui-btn");
        $(actionTr).find("input").prop("disabled", true);
    }
    else if (i == 1) {
        $(actionTr).find("input").removeClass("layui-disabled");
        $(actionTr).find("input").prop("disabled", false);
        $(actionTr).find("input[type=submit]").addClass("layui-btn");
        $(actionTr).find("input[type=button]").addClass("layui-btn");
        $(actionTr).find("input[type=button]").css({ 'background-color': '#E64545' });
    } else if (i == 2) { //数据调整后作除了打印其它都可以操作
        $(actionTr).find("input[type=submit]").removeClass("layui-disabled");
        $(actionTr).find("input[type=submit]").addClass("layui-btn");
        $(actionTr).find("input[type=submit]").prop("disabled", false);
        $(actionTr).find("input[type=button]").removeClass("layui-btn");
        $(actionTr).find("input[type=button]").addClass("layui-disabled");
        $(actionTr).find("input[type=button]").prop("disabled", true);
        $(actionTr).find("input[type=text]").removeClass("layui-disabled");
        $(actionTr).find("input[type=text]").prop("disabled", false);
        $(actionTr).find("input[type=button]").css({ 'background-color': '' });
    }
}

/**
* 计算体重百分比
* @param {UI元素} els
* @param {BMI计算后需要执行函数} fun
* @returns {}
*/

function CalculationPerc(els, fun) {
    var oldWeight = $(els.owt).val();
    var weight = $(els.wt).val();
    weight = $.trim(weight) == "" ? 0 : weight;
    oldWeight = $.trim(oldWeight) == "" ? 0 : oldWeight;
    if (oldWeight > 0 && weight > 0) {
        $(els.wttd).find("input[type=radio][name=" + els.wtrdo + "]").removeClass("layui-disabled");
        $(els.wttd).find("input[type=radio][name=" + els.wtrdo + "]").prop("disabled", false);
        var per = (oldWeight - weight) / oldWeight * 100;
        var pr = parseFloat(per);
        if (pr > 0) { //减少百分之一才算体重下降         
            $(els.wttr).show();
            $(els.wtlbl).text("-" + per.toFixed(1));
            $(els.wttxt).text(oldWeight - weight);
            $(els.dwtxt).val(oldWeight - weight);
            $(els.lossperstxt).val(per.toFixed(1));

        } else {
            $(els.wttr).hide();
            $(els.wtlbl).text("+" + Math.abs(per.toFixed(1)));
            $(els.wttxt).text("--");
            $(els.dwtxt).val(oldWeight - weight);
            $(els.lossperstxt).val(per.toFixed(1));

        }
        var wt = oldWeight - weight;
        $(els.dwtxt).val(wt);
        $(els.lossperc).val(pr);
        var v = '';
        if (Math.abs(wt) > 3) {
            v = "0";
        } else if (1 <= Math.abs(wt) <= 3) {
            v = "2";
        } else if (0 < Math.abs(wt) < 1) {
            v = "3";
        }
        else {
            v = "1";
        }
        $(els.wttd).find("input[type=radio][name=" + els.MNA2 + "][value=Item78_" + v + "]").prop("checked", true);
        fm.win_render('radio');
        if (fun) fun(els,1);
    } else {
        $(els.wttd).find("input[type=radio][name=" + els.MNA2 + "][value=Item78_1]").prop("checked", true);
        $(els.wttr).hide();
        $(els.wtlbl).text("--");
        $(els.wttxt).text("--");
        $(els.dwtxt).val(0);
        $(els.lossperstxt).val(0);
        $(els.wttd).find("input[type=radio][name=" + els.wtrdo + "]").prop('checked', false);
        $(els.wttd).find("input[type=radio][name=" + els.wtrdo + "]").addClass("layui-disabled");
        $(els.wttd).find("input[type=radio][name=" + els.wtrdo + "]").prop('disabled', true);
        fm.win_render('radio');
        if (fun) fun(els,1);
    }
}

/* 自动计算BMI值
* @param {UI元素} els
* @param {提交验证密钥} hds
* @param {BMI计算后需要执行函数} fun
* @returns {}
*/
function configBMI(els, hds, fun) {
    var height = $(els.ht).val();
    var weight = $(els.wt).val();
    height = $.trim(height) == "" ? 0 : height;
    weight = $.trim(weight) == "" ? 0 : weight;
    if (height > 0 && weight > 0) {
        common.win_formAction('/TreatmentCenter/ShareManagement/BMI', 'GET', { weight: weight, height: height, patAge: els.age, physiology: els.physiology }, hds, function(data) {
            if (data.result) {
                $(els.bmilbl).text(data.reVal);
                var bmi = parseFloat(data.reVal); 
                $(els.bmitd).find("input[type=radio][name=" + els.bmirdo + "]").removeClass("layui-disabled");
                $(els.bmitd).find("input[type=radio][name=" + els.bmirdo + "]").prop("disabled", false);
                if (bmi < 18.5 && bmi > 0) {
                    $(els.bmitd).find("input[type=radio][name=" + els.bmirdo + "][value=2]").prop("checked", true);
                } else if (bmi >= 18.5 && (bmi <= 20)) {
                    $(els.bmitd).find("input[type=radio][name=" + els.bmirdo + "][value=1]").prop("checked", true);                   
                } else {
                    $(els.bmitd).find("input[type=radio][name=" + els.bmirdo + "][value=0]").prop("checked", true);
                }
                $(els.bmitd).find("input[type=radio][name=" + els.bmirdo + "]").not(":checked").addClass("layui-disabled");
                $(els.bmitd).find("input[type=radio][name=" + els.bmirdo + "]").not(":checked").prop('disabled', true);
                $(els.bmitxt).val(bmi);
                $(els.BMI).val(bmi);
                var v = '';
                if (bmi <19 || bmi >28) {
                    v = "0";
                }else if (19 < bmi < 21 || 26 < bmi <= 28) {
                    v = "1";
                }else if (21 < bmi < 23 || 24 < bmi <= 26) {
                    v = "2";
                }
                else if (23 <= bmi <= 224) {
                    v = "3";
                }
                $(els.bmitd).find("input[type=radio][name=" + els.MNA1 + "][value=Item77_" + v + "]").prop("checked", true);
                fm.win_render('radio');
            } else {
                $(els.BMI).val("0");
                $(els.bmilbl).text("");
            }
            if (fun) fun(els,1);
        }, 'JSON');
    } else {
        $(els.bmitd).find("input[type=radio][name=" + els.MNA1 + "]").prop("checked", false);
        $(els.bmilbl).text("--");
        $(els.BMI).val("0");
        fm.win_render('radio');
        if (fun) fun(els,1);
    }
}
function tuiRadio(o) {
    var val = $.trim($(o).val());
    if (val.length > 0) {
        var v = "0";
        var yao = parseFloat(val);
        if (yao >= 31) {
            v = "1";
        }
        $("input[type=radio][value=Item92_" + v + "]").prop("checked", true);
    } else {
        $("input[type=radio][value^=Item92]").prop("checked", false);
    }
    clearResult(5, elems);
    fm.win_render('radio');
}
function yaoRadio(o,els) {
    var val = $.trim($(o).val());
    if (val.length > 0) {
        var v = "0";
        var yao = parseFloat(val);
        if (els.sex == "1") {
            if (yao <= 90) {
                v = "1";
            }
            $("#divYaoW").find("input[type=radio][value=Ite102_" + v + "]").prop("checked", true);
        }
        else {
            if (yao <= 80) {
                v = "1";
            }
            $("#divYaoW").find("input[type=radio][value=Ite103_" + v + "]").prop("checked", true);
        }
    } else {
        $("#divYaoW").find("input[type=radio][value^=Ite102]").prop("checked", false);
        $("#divYaoW").find("input[type=radio][value^=Ite103]").prop("checked", false);
    }
    clearResult(5, elems);
    fm.win_render('radio');
}
function refContent() {

}
