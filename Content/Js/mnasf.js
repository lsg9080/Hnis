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
        CalculationPerc(els,function (){});//体重变化
        configBMI(els, headers, ScreeningScore);//BMI
    }
    else if (t == 3) {//身高变化
        configBMI(els, headers, ScreeningScore);
    }
    else if (t == 4) {
        ScreeningScore(els); //自动评分
    }
}

/**
* 评分结果
* @param {UI元素} els
* @returns {}
*/
function ScreeningResult(els, t) {
    var apr = '', score = 0,s6 = 0, s7 = 0;
    var ss6 = $(els.selectItem).find("input[type=radio][name=" + els.MNASF6 + "]:checked").size();
    var ss7 = $(els.selectItem).find("input[type=radio][name=" + els.MNASF7 + "]:checked").size();
    var s1 = parseInt($(els.selectItem).find("input[type=radio][name=" + els.MNASF1 + "]:checked").val().substring(7));
    var s2 = parseInt($(els.selectItem).find("input[type=radio][name=" + els.MNASF2 + "]:checked").val().substring(7));
    var s3 = parseInt($(els.selectItem).find("input[type=radio][name=" + els.MNASF3 + "]:checked").val().substring(7));
    var s4 = parseInt($(els.selectItem).find("input[type=radio][name=" + els.MNASF4 + "]:checked").val().substring(7));
    var s5 = parseInt($(els.selectItem).find("input[type=radio][name=" + els.MNASF5 + "]:checked").val().substring(7));
    if (ss6 > 0) {
        s6 = parseInt($(els.selectItem).find("input[type=radio][name=" + els.MNASF6 + "]:checked").val().substring(7));
        s7 = 0;
    } else {
        if (ss7 > 0) s7 = parseInt($(els.selectItem).find("input[type=radio][name=" + els.MNASF7 + "]:checked").val().substring(7));
        s6 = 0;
    }

    score = s1 + s2 + s3 + s4 + s5 + s6 + s7;
    $(els.screeningScore).val(score);

    $(els.screeningScore).val(score);
    if (score >= els.fen1) {
        apr = score + els.result0Msg;
        $(els.resultMsg).css("color", "green");
        $(els.resultMsg).text(apr);
        $(els.result).val(apr);
        $("#IsRisk").val(0);
        $("#" + els.col).val('green');
    } else if (score >= 0) {
        var color = 'red';
        if (score >= els.fen2 && score < els.fen1) { //8<?＜12 分
            color = 'orange';
            apr = score + els.result1Msg;
        } else {
            apr = score + els.result2Msg;
        }
        $(els.resultMsg).css("color", color);
        $(els.resultMsg).text(apr);
        $(els.result).val(apr);
        $("#IsRisk").val(1);
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
    var error1 = $(els.selectItem).find("input[type=radio][name=" + els.MNASF1 + "]:checked").size();
    var error2 = $(els.selectItem).find("input[type=radio][name=" + els.MNASF2 + "]:checked").size();
    var error3 = $(els.selectItem).find("input[type=radio][name=" + els.MNASF3 + "]:checked").size();
    var error4 = $(els.selectItem).find("input[type=radio][name=" + els.MNASF4 + "]:checked").size();
    var error5 = $(els.selectItem).find("input[type=radio][name=" + els.MNASF5 + "]:checked").size();
    var error6 = $(els.selectItem).find("input[type=radio][name=" + els.MNASF6 + "]:checked").size();
    var error7 = $(els.selectItem).find("input[type=radio][name=" + els.MNASF7 + "]:checked").size();

    if (error1 > 0 && error2 > 0 && error3 > 0 && error4 > 0 && error5 > 0 && (error6 > 0 || error7 > 0)) {
        ScreeningResult(els);
        $(els.submit).val("true");
        ConfigoptionTr(els.actionTr, 2);
    } else {
        $(els.resultMsg).text("风险数据不完整，暂无法进行评分!");
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
        if(oldWeight ==0 || weight == 0) {
                v = "1";
        }else if (wt > 3) {
            v = "0";
        } else if ( wt >=1 && wt <= 3) {
            v = "2";
        } else if (wt <= 0) {
            v = "3";
        }
        $(els.wttd).find("input[type=radio][name=" + els.MNASF2 + "][value=Item71_" + v + "]").prop("checked", true);
        $(els.wttd).find("input[type=radio][name=" + els.MNASF2 + "]").addClass("layui-disabled");
        $(els.wttd).find("input[type=radio][name=" + els.MNASF2 + "]").prop("disabled",true);
        $(els.wttd).find("input[type=radio][name=" + els.MNASF2 + "][value=Item71_" + v + "]").removeClass("layui-disabled");
        $(els.wttd).find("input[type=radio][name=" + els.MNASF2 + "][value=Item71_" + v + "]").prop('disabled', false);
        fm.win_render('radio');
        if (fun) fun(els, 1);
    } else {
        $(els.wttd).find("input[type=radio][name=" + els.MNASF2 + "]").removeClass("layui-disabled");
        $(els.wttd).find("input[type=radio][name=" + els.MNASF2 + "]").prop('disabled', false);
        $(els.wttr).hide();
        $(els.wtlbl).text("--");
        $(els.wttxt).text("--");
        $(els.dwtxt).val(0);
        $(els.lossperstxt).val(0);
        if ($(els.wttd).find("input[type=radio][name=" + els.MNASF2 + "]:checked").size() == 0 )
        { $(els.wttd).find("input[type=radio][name=" + els.MNASF2 + "][value=Item71_1]").prop("checked", true); }
        //$(els.wttd).find("input[type=radio][name=" + els.wtrdo + "]").prop('checked', false);
        //$(els.wttd).find("input[type=radio][name=" + els.wtrdo + "]").addClass("layui-disabled");
        //$(els.wttd).find("input[type=radio][name=" + els.wtrdo + "]").prop('disabled', true);
        if ($(els.wttd).find("input[type=radio][name=" + els.MNASF2 + "]:checked").size() == 0) { $(els.wttd).find("input[type=radio][name=" + els.MNASF2 + "][value=Item71_1]").prop("checked", true); }
        if ($(els.wttd).find("input[type=radio][name=" + els.MNASF2 + "]:checked").size() == 0) { $(els.wttd).find("input[type=radio][name=" + els.MNASF2 + "][value=Item71_1]").prop("checked", true); }
        fm.win_render('radio');
        if (fun) fun(els, 1);
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
                $(els.bmitxt).val(bmi);
                $(els.BMI).val(bmi);
                var v = '';
                if (bmi < 19) {
                    v = "0";
                } else if ( bmi >= 19 && bmi < 21) {
                    v = "1";
                } else if (bmi >= 21 && bmi < 23) {
                    v = "2";
                }
                else if (bmi >= 23) {
                    v = "3";
                }
                $(els.bmitd).find("input[type=radio][name=" + els.MNASF6 + "][value=Item75_" + v + "]").prop("checked", true);
                $(els.bmitd).find("input[type=radio][name=" + els.MNASF6 + "]").addClass("layui-disabled");
                $(els.bmitd).find("input[type=radio][name=" + els.MNASF6 + "]").prop("disabled", true);
                $(els.bmitd).find("input[type=radio][name=" + els.MNASF6 + "][value=Item75_" + v + "]").removeClass("layui-disabled");
                $(els.bmitd).find("input[type=radio][name=" + els.MNASF6 + "][value=Item75_" + v + "]").prop('disabled', false);
                fm.win_render('radio');
            } else {
                $(els.BMI).val("0");
                $(els.bmilbl).text("");
            }
            if (fun) fun(els, 1);
        }, 'JSON');
    } else {
        $(els.bmitd).find("input[type=radio][name=" + els.MNASF6 + "]").removeClass("layui-disabled");
        $(els.bmitd).find("input[type=radio][name=" + els.MNASF6 + "]").prop('disabled', false);
        $(els.bmilbl).text("--");
        $(els.BMI).val("0");
        fm.win_render('radio');
        if (fun) fun(els, 1);
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

