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
    else if (t >= 4) {
        ScreeningScore(els,t); //自动评分
    }
}

/**
* 评分结果
* @param {UI元素} els
* @returns {}
*/
function ScreeningResult(els, t) {
    var apr = '', score = 0, score1 = 0, score2 = 0, score3 = 0, score4 = 0;
    if (t == 4) {
        var s1 = parseInt($(els.selectItem1).find("input[type=radio][name=" + els.MIS1 + "]:checked").val().substring(7));
        var s2 = parseInt($(els.selectItem1).find("input[type=radio][name=" + els.MIS2 + "]:checked").val().substring(7));
        var s3 = parseInt($(els.selectItem1).find("input[type=radio][name=" + els.MIS3 + "]:checked").val().substring(7));
        var s4 = parseInt($(els.selectItem1).find("input[type=radio][name=" + els.MIS4 + "]:checked").val().substring(7));
        var s5 = parseInt($(els.selectItem1).find("input[type=radio][name=" + els.MIS5 + "]:checked").val().substring(7));
        score1 = s1 + s2 + s3 + s4 + s5;
        $(els.screeningScore1).val(score1);
        $(els.score1).text(score1);
    }
    else if (t == 5) {
        var s6 = parseInt($(els.selectItem2).find("input[type=radio][name=" + els.MIS6 + "]:checked").val().substring(7));
        var s7 = parseInt($(els.selectItem2).find("input[type=radio][name=" + els.MIS7 + "]:checked").val().substring(7));
        score2 =  s6 + s7;
        $(els.screeningScore2).val(score2);
        $(els.score2).text(score2);
    }
    else if (t == 6) {
        var s8 = parseInt($(els.selectItem3).find("input[type=radio][name=" + els.MIS8 + "]:checked").val().substring(7));
        score3 = s8;
        $(els.screeningScore3).val(score3);
        $(els.score3).text(score3);
    }
    else if (t == 7) {
        var s9 = parseInt($(els.selectItem4).find("input[type=radio][name=" + els.MIS9 + "]:checked").val().substring(7));
        var s10 = parseInt($(els.selectItem4).find("input[type=radio][name=" + els.MIS10 + "]:checked").val().substring(7));
        score4 = s9 + s10;
        $(els.screeningScore4).val(score4);
        $(els.score4).text(score4);
    }
    var sco1 = parseFloat($(els.screeningScore1).val());
    var sco2 = parseFloat($(els.screeningScore2).val());
    var sco3 = parseFloat($(els.screeningScore3).val());
    var sco4 = parseFloat($(els.screeningScore4).val());  
    if (sco1 >= 0 && sco2 >= 0 && sco3 >= 0 && sco4 >= 0) {
        score = sco1 + sco2 + sco3 + sco4;
        $(els.screeningScore).val(score);
        if (score < els.fen) {
            apr = score + els.result0Msg;
            $(els.resultMsg).css("color", "green");
            $(els.resultMsg).text(apr);
            $(els.result).val(apr);
            $("#IsRisk").val(0);
            $("#" + els.col).val('green');
        } else {
            var color = 'red';
            if (score >= els.fen && score <= els.fen1) { //3<=?＜=5 分
                color = 'blue';
                apr = score + els.result1Msg;
            } else if (score > els.fen1 && score <= els.fen2) {//5<?＜=8 分
                color = 'orange';
                apr = score + els.result2Msg;
            } else {
                apr = score + els.result3Msg;
            }
            $(els.resultMsg).css("color", color);
            $(els.resultMsg).text(apr);
            $(els.result).val(apr);
            $("#IsRisk").val(1);
            $("#" + els.col).val(color);
        }
    }
}

/**
* 评分验证
* @param {bmi分值} bmi
* @param {UI元素} els
* @param {} lossperstxt
* @returns {}
*/
function ScreeningScore(els, t) {
    var error1 = 0, error2 = 0, error3 = 0, error4 = 0, error5 = 0;
    var error6 = 0, error7 = 0, error8 = 0, error9 = 0, error10 = 0,error11 =0;
    if (t == 4) {
         error1 = $(els.selectItem1).find("input[type=radio][name=" + els.MIS1 + "]:checked").size();
         error2 = $(els.selectItem1).find("input[type=radio][name=" + els.MIS2 + "]:checked").size();
         error3 = $(els.selectItem1).find("input[type=radio][name=" + els.MIS3 + "]:checked").size();
         error4 = $(els.selectItem1).find("input[type=radio][name=" + els.MIS4 + "]:checked").size();
         error5 = $(els.selectItem1).find("input[type=radio][name=" + els.MIS5 + "]:checked").size();
         if (error1 > 0 && error2 > 0 && error3 > 0 && error4 > 0 && error5 > 0) {
             ScreeningResult(els, t);
         } 
    }
    else if (t == 5) {
        error6 = $(els.selectItem2).find("input[type=radio][name=" + els.MIS6 + "]:checked").size();
        error7 = $(els.selectItem2).find("input[type=radio][name=" + els.MIS7 + "]:checked").size();
        if (error6> 0 && error7 > 0) {
            ScreeningResult(els, t);
        }
    }
    else if (t == 6) {
        error11 = $(els.selectItem3).find("input[type=radio][name=" + els.MIS8 + "]:checked").size();
        if (error11 > 0) {
            ScreeningResult(els, t);
        }
    }
    else if (t == 7) {
        error9 = $(els.selectItem4).find("input[type=radio][name=" + els.MIS9 + "]:checked").size();
        error10 = $(els.selectItem4).find("input[type=radio][name=" + els.MIS10 + "]:checked").size();
        if (error9 > 0 && error10 > 0) {
            ScreeningResult(els, t);       
        }
    }
    var score1 = parseFloat($(els.screeningScore1).val());
    var score2 = parseFloat($(els.screeningScore2).val());
    var score3 = parseFloat($(els.screeningScore3).val());
    var score4 = parseFloat($(els.screeningScore4).val());

    if (score1 >= 0 && score2 >=0 && score3 >= 0 && score4 >= 0) {
        $(els.submit).val("true");
        ConfigoptionTr(els.actionTr, 2);
    } else {
        if (score1 < 0) {
            $(els.resultMsg).text("病史数据不完整，暂无法进行评分!");
            $(els.submit).val("false");
            ConfigoptionTr(els.actionTr, 0);
        }
        else if (score2 < 0) {
            $(els.resultMsg).text("体格检查数据不完整，暂无法进行评分!");
            $(els.submit).val("false");
            ConfigoptionTr(els.actionTr, 0);
        }
        else if (score3 < 0) {
            $(els.resultMsg).text("体质指数数据不完整，暂无法进行评分!");
            $(els.submit).val("false");
            ConfigoptionTr(els.actionTr, 0);
        }
        else if (score4 < 0) {
            $(els.resultMsg).text("实验室检查数据不完整，暂无法进行评分!");
            $(els.submit).val("false");
            ConfigoptionTr(els.actionTr, 0);
        }else if (error11 < 0) {
            $(els.resultMsg).text("体质指数(BMI)数据不完整，暂无法进行评分!");
            $(els.submit).val("false");
            ConfigoptionTr(els.actionTr, 0);
        }
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
        var per = (oldWeight - weight) / oldWeight * 100;
        var pr = parseFloat(per);
        var p = oldWeight - weight;
        if (pr > 0) { //减少百分之一才算体重下降         
            $(els.wttr).show();
            $(els.wtlbl).text("-" + per.toFixed(1));
            $(els.wttxt).text(oldWeight - weight);
            $(els.dwtxt).val(oldWeight - weight);
            $(els.lossperstxt).val(per.toFixed(1));
            if (p < 0.5) {
                $(els.wttd).find("input[type=radio][name=" + els.wtrdo + "][value=Item93_0]").prop("checked", true);
            }
            else if (p >= 0.5 && p < 1) {
                $(els.wttd).find("input[type=radio][name=" + els.wtrdo + "][value=Item93_1]").prop("checked", true);
            }
            else if (p >= 1 && pr < 5) {
                $(els.wttd).find("input[type=radio][name=" + els.wtrdo + "][value=Item93_2]").prop("checked", true);
            }else if (pr >= 5) {
                $(els.wttd).find("input[type=radio][name=" + els.wtrdo + "][value=Item93_3]").prop("checked", true);
            }
        } else {
            $(els.wttd).find("input[type=radio][name=" + els.wtrdo + "][value=Item93_0]").prop("checked", true);
            $(els.wttr).hide();
            $(els.wtlbl).text("+" + Math.abs(per.toFixed(1)));
            $(els.wttxt).text("--");
            $(els.dwtxt).val(oldWeight - weight);
            $(els.lossperstxt).val(per.toFixed(1));
            $(els.wttd).find("input[type=radio][name=" + els.wtrdo + "][value=0]").prop("checked", true);
        }
        var wt = oldWeight - weight;
        $(els.dwtxt).val(wt);
        $(els.lossperc).val(pr);
        fm.win_render('radio');
        if (fun) fun(els, 4);
    } else {
        if (oldWeight == 0) {
            $(els.screeningScore1).val(-1);
            $(els.score1).text(0);
        } else {
            $(els.screeningScore3).val(-1);
            $(els.score3).text(0);
        }
        $(els.wttr).hide();
        $(els.wtlbl).text("--");
        $(els.wttxt).text("--");
        $(els.dwtxt).val(0);
        $(els.lossperstxt).val(0);
        $(els.wttd).find("input[type=radio][name=" + els.wtrdo + "]").prop('checked', false);
        fm.win_render('radio');
        if (fun) fun(els, 4);
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
        common.win_formAction('/TreatmentCenter/ShareManagement/BMI', 'GET', { weight: weight, height: height, patAge: els.age, physiology: els.physiology }, hds, function (data) {
            if (data.result) {
                $(els.bmilbl).text(data.reVal);
                var bmi = parseFloat(data.reVal);
                if (bmi >=20) {
                    $(els.bmitd).find("input[type=radio][name=" + els.bmirdo + "][value=Item99_0]").prop("checked", true);
                    $(els.score3).text(0);
                    $(els.screeningScore3).val(0);
                } else if (18 <= bmi && bmi <= 20) {
                    $(els.bmitd).find("input[type=radio][name=" + els.bmirdo + "][value=Item99_1]").prop("checked", true);
                    $(els.score3).text(1);
                    $(els.screeningScore3).val(1);
                } else if (16 <= bmi && bmi < 18) {
                    $(els.bmitd).find("input[type=radio][name=" + els.bmirdo + "][value=Item99_2]").prop("checked", true);
                    $(els.score3).text(2);
                    $(els.screeningScore3).val(2);
                }
                else if (bmi < 16)
                {
                    $(els.bmitd).find("input[type=radio][name=" + els.bmirdo + "][value=Item99_3]").prop("checked", true);
                    $(els.score3).text(3);
                    $(els.screeningScore3).val(3);
                }
                $(els.bmitxt).val(bmi);
                $(els.BMI).val(bmi);
                fm.win_render('radio');
            } else {
                $(els.BMI).val("0");
                $(els.bmilbl).text("");
            }
            if (fun) fun(els, 6);
            if (fun) fun(els, 4);
        }, 'JSON');
    } else {
        $(els.screeningScore3).val(-1);
        $(els.score3).text(0);
        $(els.bmitd).find("input[type=radio][name=" + els.bmirdo + "]").prop('checked', false);
        $(els.bmilbl).text("--");
        $(els.BMI).val("0");
        fm.win_render('radio');
        if (fun) fun(els, 6);
        if (fun) fun(els, 4);
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
    fm.win_render('radio');
}
function yaoRadio(o, els) {
    var val = $.trim($(o).val());
    if (val.length > 0) {
        var v = "0";
        var yao = parseFloat(val);
        if (els.sex == "1") {
            if (yao <= 90) {
                v = "1";
            }
            $("input[type=radio][value=Ite102_" + v + "]").prop("checked", true);
        }
        else {
            if (yao <= 80) {
                v = "1";
            }
            $("input[type=radio][value=Ite103_" + v + "]").prop("checked", true);
        }
    } else {
        $("input[type=radio][value^=Ite102]").prop("checked", false);
        $("input[type=radio][value^=Ite103]").prop("checked", false);
    }
    fm.win_render('radio');
}
function refContent() {

}
