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

    if (t == 1) {//营养需要程度
        Item1Score(els);
    }
    else if (t == 11) {
        GetBMIValue(els);
    }
    else {//营养受损
        Item2Score(t, els);
    }
}
/**
 * *疾病营养需要程度评分
 * @param {} els 
 * @returns {} 
 */
function Item1Score(els) {
    var obj = $("input[type=radio][name=" + els.yyyycdrdo + "]:checked");
    if (obj.length > 0) {
        var val = obj.val();
        //清除营养需要程度显示分数结果
        $(els.screeningScore1).val(val);
        $(els.yyyycdTd).text(val + ' 分');
    } else {
        $(els.screeningScore1).val(0);
        $(els.yyyycdTd).text(+ '0 分');
    }
    ScreeningScore(els); //自动评分
}
/**
 * 营养受损评分
 * @param {} els 
 * @returns {} 
 */
function Item2Score(t, els) {
    $(els.screeningScore2).val(0);
    if (t == 2) { //原体重
        CalculationPerc(els, CalculationScore);//体重变化
    } else if (t == 3) { //体重
        CalculationPerc(els);//体重变化
        configBMI(els, headers, CalculationScore, t);//BMI
    } else if (t == 4) { //身高
        configBMI(els, headers, CalculationScore, t); //BMI
    } else if (t == 5) {
        var sljx = $("input[type=radio][name=" + els.jschk + "][value=true]").is(":checked");
        if (sljx) {
            $(els.jstr).show();
        } else {
            $(els.jstr).hide();
            $("input[type=radio][name=" + els.jsrdo + "]").prop("checked", false);
            CalculationScore(0, els);
        }
    }
    else {
        CalculationScore(0, els);
    }
}
/**
* 评分结果
* @param {UI元素} els
* @returns {}
*/
function ScreeningResult(els) {
    var score = -100;
    if ($("#NeedSecondaryScreen").val() == "true" || IsInitialScreen == "0") {
        var s1 = parseFloat($(els.screeningScore1).val() || 0);
        var s2 = parseFloat($(els.screeningScore2).val() || 0);
        var s3 = parseFloat($(els.screeningScore3).val() || 0);
        var s4 = parseFloat($(els.screeningScore4).val() || 0);
        var s5 = parseFloat($(els.screeningScore5).val() || 0);
        var s6 = parseFloat($(els.screeningScore6).val() || 0);
        var s7 = parseFloat($(els.screeningScore7).val() || 0);
        var s8 = parseFloat($(els.screeningScore8).val() || 0);
        var s9 = parseFloat($(els.screeningScore9).val() || 0);
        score = s1 + s2 + s3 + s4 + s5 + s6 + s7 + s8 + s9;
        
    } else {
        score = 0;
    }
    var apr = '';
    $(els.screeningScore).val(score);
    if (score >= els.fen) {
        apr = score + els.result2Msg;
        $(els.resultMsg).css("color", "red");
        $(els.resultMsg).text(apr);
        $(els.result).val(apr);
        $("#IsRisk").val(1);
        $("#" + els.col).val('red');
    } else {
        if ($("#NeedSecondaryScreen").val() == "true" || IsInitialScreen == "0") {
            apr = score + els.result1Msg;
        } else {
            apr = els.result3Msg;
        }
        $(els.resultMsg).css("color", "green");
        $(els.resultMsg).text(apr);
        $(els.result).val(apr);
        $("#IsRisk").val(0);
        $("#" + els.col).val('green');
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
    var error1 = $("input[type=radio][name=" + els.yyyycdrdo + "]:checked").size();
    var error11 = $("input[type=radio][name=" + els.xjrado + "]:checked").size();
    var error22 = $("input[type=radio][name=" + els.jsrdo + "]:checked").size();
    var errorr3 = $("input[type=radio][name=" + els.bmirdo + "]:checked").size();
    var errorr4 = $("input[type=radio][name=" + els.agerdo + "]:checked").size();

    if ($("#NeedSecondaryScreen").val() == "true" || IsInitialScreen == "0") {
        if (error1 == 0) {
            $(els.resultMsg).text("营养需要程度数据不完整，暂无法进行评分!");
            $(els.submit).val("false");
            ConfigoptionTr(els.actionTr, 0);
        } else if (errorr3 == 0) {
            $(els.resultMsg).text("BMI数据不完整，暂无法进行评分!");
            $(els.submit).val("false");
            ConfigoptionTr(els.actionTr, 0);
        }
        else if (error11 == 0 && $("input[type=radio][name=" + els.wtchk + "][value=true]").is(":checked")) {
            $(els.resultMsg).text("体重下降数据不完整，暂无法进行评分!");
            $(els.submit).val("false");
            ConfigoptionTr(els.actionTr, 0);
        } else if (error22 == 0 && $("input[type=radio][name=" + els.jschk + "][value=true]").is(":checked")) {
            $(els.resultMsg).text("进食量减少数据不完整，暂无法进行评分!");
            $(els.submit).val("false");
            ConfigoptionTr(els.actionTr, 0);
        }
        else if (errorr4 == 0) {
            $(els.resultMsg).text("年龄小于十八岁暂无法进行评分!");
            $(els.resultMsg).css("color", "red");
            $(els.submit).val("false");
            ConfigoptionTr(els.actionTr, 0);
        }
        else {
            ScreeningResult(els);
            $(els.submit).val("true");
            if ($("#ScreeningID").val() == "0") {
                ConfigoptionTr(els.actionTr, 2);
            } else {
                ConfigoptionTr(els.actionTr, 1);
            }
        }
    } else {
        ScreeningResult(els);
        $(els.submit).val("true");
        if ($("#ScreeningID").val() == "0") {
            ConfigoptionTr(els.actionTr, 2);
        } else {
            ConfigoptionTr(els.actionTr, 1);
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
    if (i == 1) { //保存后全部可以操作
        $(actionTr).find("input").removeClass("layui-disabled");
        $(actionTr).find("input").prop("disabled", false);
        $(actionTr).find("input[type=submit]").addClass("layui-btn");
        $(actionTr).find("input[type=button]").addClass("layui-btn");

    }
    if (i == 2) { //数据调整后作除了打印其它都可以操作
        $(actionTr).find("input[type=submit]").removeClass("layui-disabled");
        $(actionTr).find("input[type=submit]").addClass("layui-btn");
        $(actionTr).find("input[type=submit]").prop("disabled", false);
        $(actionTr).find("input[type=button]").removeClass("layui-btn");
        $(actionTr).find("input[type=button]").addClass("layui-disabled");
        $(actionTr).find("input[type=button]").prop("disabled", true);
        $(actionTr).find("input[type=text]").removeClass("layui-disabled");
        $(actionTr).find("input[type=text]").prop("disabled", false);

    }
}
/**
* 营养受损评分
* @param {bmi分值} bmi
* @param {UI元素} els
* @param {} lossperstxt
* @returns {}
*/
function CalculationScore(bmi, els) {
    var s1 = 0, s2 = 0, s3 = 0;
    if ($(els.bmitd).find("input[type=radio][name=" + els.bmirdo + "]:checked").size() > 0) {
        s1 = $(els.bmitd).find("input[type=radio][name=" + els.bmirdo + "]:checked").val();
    }
    if ($("input[type=radio][name=" + els.wtchk + "][value=true]").is(":checked")) { //如果体重有下降取分
        s2 = $(els.wttr).find("input[type=radio][name=" + els.xjrado + "]:checked").val() || 0;
    }
    if ($("input[type=radio][name=" + els.jschk + "][value=true]").is(":checked")) { //如果进食量有减少取分
        s3 = $(els.jstr).find("input[type=radio][name=" + els.jsrdo + "]:checked").val() || 0;
    }
    s1 = parseFloat(s1);
    s2 = parseFloat(s2);
    s3 = parseFloat(s3);
    var r = 0, rt = '';
    if (s1 >= s2 && s1 >= s3) {
        r = s1;
    }
    if (s2 >= s1 && s2 >= s3) {
        r = s2;
    }
    if (s3 >= s1 && s3 >= s2) {
        r = s3;
    }
    if (r == 0) {
        rt = "无";
    }
    if (r == 1) {
        rt = "轻度";
    }
    if (r == 2) {
        rt = "中度";
    }
    if (r == 3) {
        rt = "重度";
    }
    //$(els.yyssTd).text(r + " 分" + "(" + rt + ")");
    $(els.yyssTd).text(r + " 分");
    $(els.screeningScore2).val(r);
    ScreeningScore(els); //自动评分
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
        if (pr > 0) {
            if (pr >= 5) { //减少百分之一才算体重下降
                $("input[type=radio][name=" + els.wtchk + "][value=true]").prop("checked", true);
                //$("input[type=checkbox][name=" + els.wtchk + "]").addClass("layui-disabled");
                //$("input[type=checkbox][name=" + els.wtchk + "]").prop('disabled', true);
                $(els.wttr).show();
                $(els.wtlbl).text("-" + pr.toFixed(1));
                $(els.wttxt).text(oldWeight - weight);
                $(els.dwtxt).val(oldWeight - weight);
                $(els.lossperstxt).val(pr.toFixed(1));
                var ago = $(els.monthAgo).val();
                if (ago == 1) {
                    $(els.wttr).find("input[type=radio][name=" + els.xjrado + "][value=3]").prop("checked", true);
                    //fm.win_render('radio');
                } else if (ago == 2) {
                    $(els.wttr).find("input[type=radio][name=" + els.xjrado + "][value=2]").prop("checked", true);
                    //fm.win_render('radio');
                } else if (ago == 3) {
                    if (pr > 15) {
                        $(els.wttr).find("input[type=radio][name=" + els.xjrado + "][value=3]").prop("checked", true);
                    } else {
                        $(els.wttr).find("input[type=radio][name=" + els.xjrado + "][value=1]").prop("checked", true);
                    }
                    //fm.win_render('radio');
                }
            } else {
                $("input[type=radio][name=" + els.wtchk + "][value=false]").prop("checked", true);
                $("input[type=radio][name=" + els.wtchk + "]").addClass("layui-disabled");
                $("input[type=radio][name=" + els.wtchk + "]").prop('disabled', true);
                $(els.wttr).find("input[type=radio][name=" + els.xjrado + "]:checked").prop("checked", false);
                //fm.win_render('radio');
                $(els.wttr).hide();
                
                $(els.wtlbl).text("-" + Math.abs(pr.toFixed(1)));
                $(els.wttxt).text("--");
                $(els.dwtxt).val(oldWeight - weight);
                $(els.lossperstxt).val(pr.toFixed(1));
            }
        } else {
            $("input[type=radio][name=" + els.wtchk + "][value=false]").prop("checked", true);
            $("input[type=radio][name=" + els.wtchk + "]").addClass("layui-disabled");
            $("input[type=radio][name=" + els.wtchk + "]").prop('disabled', true);
            $(els.wttr).find("input[type=radio][name=" + els.xjrado + "]:checked").prop("checked", false);
            //fm.win_render('radio');
            $(els.wttr).hide();
            $(els.wtlbl).text("+" + Math.abs(per.toFixed(1)));
            //$(els.wttxt).text("--");
            //$(els.wtlbl).text("--");
            $(els.dwtxt).val(oldWeight - weight);
            $(els.lossperstxt).val(per.toFixed(1));
            //$("#ScreeningItemD").val('false');
        }
        //fm.win_render('checkbox');
        var bi = parseFloat($(els.bmitxt).val());
        if (fun) fun(bi, els);
    } else {
        $("input[type=radio][name=" + els.wtchk + "][value=false]").prop("checked", true);
        $("input[type=radio][name=" + els.wtchk + "]").addClass("layui-disabled");
        $("input[type=radio][name=" + els.wtchk + "]").prop('disabled', true);
        $(els.wttr).find("input[type=radio][name=" + els.xjrado + "]:checked").prop("checked", false);
        //fm.win_render('radio');
        //fm.win_render('checkbox');
        $(els.wttr).hide();
        $(els.wtlbl).text("--");
        $(els.wttxt).text("--");
        $(els.dwtxt).val(0);
        $(els.lossperstxt).val("--");
        $("#ScreeningItemD").val('false');
        var bmi = $(els.bmitd).find("input[type=radio][name=" + els.bmirdo + "]");
        bmi = parseFloat(bmi.val());
        if (fun) fun(bmi, els);
    }
}
//bmi可以选择
function GetBMIValue(els) {
    var s1 = $(els.bmitd).find("input[type=radio][name=" + els.bmirdo + "]:checked").val(), s2 = 0, s3 = 0;

    if ($("input[type=radio][name=" + els.wtchk + "]").is(":checked")) { //如果体重有下降取分
        s2 = $(els.wttr).find("input[type=radio][name=" + els.xjrado + "]:checked").val() || 0;
    }
    if ($("input[type=radio][name=" + els.jschk + "]").is(":checked")) { //如果进食量有减少取分
        s3 = $(els.jstr).find("input[type=radio][name=" + els.jsrdo + "]:checked").val() || 0;
    }
    s1 = parseFloat(s1);
    s2 = parseFloat(s2);
    s3 = parseFloat(s3);
    var r = 0, rt = '';
    if (s1 >= s2 && s1 >= s3) {
        r = s1;
    }
    if (s2 >= s1 && s2 >= s3) {
        r = s2;
    }
    if (s3 >= s1 && s3 >= s2) {
        r = s3;
    }
    if (r == 0) {
        rt = "无";
    }
    if (r == 1) {
        rt = "轻度";
    }
    if (r == 2) {
        rt = "中度";
    }
    if (r == 3) {
        rt = "重度";
    }
    $(els.yyssTd).text(r + " 分" + "(" + rt + ")");
    $(els.ssssScoretxt).val(r);
    ScreeningScore(els); //自动评分
}

/* 自动计算BMI值
* @param {UI元素} els
* @param {提交验证密钥} hds
* @param {BMI计算后需要执行函数} fun
* @returns {}
*/
function configBMI(els, hds, fun, t) {
    var bmi_sel = $(els.bmitd).find("input[type=radio][name=" + els.bmirdo + "]:checked").size();
    if (bmi_sel == 0 || t > 0) {
        var height = $(els.ht).val();
        var weight = $(els.wt).val();
        height = $.trim(height) == "" ? 0 : height;
        weight = $.trim(weight) == "" ? 0 : weight;
        if (height > 0 && weight > 0) {
            $.ajax({
                url: '/TreatmentCenter/ShareManagement/BMI',
                type: 'get',
                data: { weight: weight, height: height, patAge: els.age, physiology: els.physiology },
                success: function (data) {
                    if (data.result) {
                        $(els.bmilbl).text(data.reVal);
                        var bmi = parseFloat(data.reVal);
                        if (fun) fun(bmi, els);
                        //根据IBM默认选择初筛
                        if (bmi < 18.5 && bmi > 0) {
                            $("input[type=checkbox][name=ChkInitialScreenA]").prop("checked", true);
                            //fm.win_render('checkbox');
                            SetInitialScreenClass(els, IsInitialScreen);
                        } else {
                            $("input[type=checkbox][name=ChkInitialScreenA]").prop("checked", false);
                            //fm.win_render('checkbox');
                            SetInitialScreenClass(els, IsInitialScreen);
                        }

                        $(els.bmitxt).val(bmi);
                        //fm.win_render('radio');
                    } else {
                        $(els.bmilbl).text("--");
                    }
                }
            })
            //common.win_formActionNoAsync('/TreatmentCenter/ShareManagement/BMI', 'GET', { weight: weight, height: height, patAge: els.age, physiology: els.physiology }, hds, function (data) {
            //    if (data.result) {
            //        $(els.bmilbl).text(data.reVal);
            //        var bmi = parseFloat(data.reVal);
            //        if (fun) fun(bmi, els);
            //        //根据IBM默认选择初筛
            //        if (bmi < 18.5 && bmi > 0) {
            //            $("input[type=checkbox][name=ChkInitialScreenA]").prop("checked", true);
            //            //fm.win_render('checkbox');
            //            SetInitialScreenClass(els, IsInitialScreen);
            //        } else {
            //            $("input[type=checkbox][name=ChkInitialScreenA]").prop("checked", false);
            //            //fm.win_render('checkbox');
            //            SetInitialScreenClass(els, IsInitialScreen);
            //        }

            //        $(els.bmitxt).val(bmi);
            //        //fm.win_render('radio');
            //    } else {
            //        $(els.bmilbl).text("--");
            //    }
            //}, 'JSON');
        } else {
            $(els.bmitxt).val(0);
            $(els.bmilbl).text("--");
            //fm.win_render('radio');
            if (fun) fun(0, els);
        }
    }
}

function InitializePageForIsInitialScreen(els, isInitialScreen) {
    if (isInitialScreen == "1") {
        $("#divInitialScreen").show();
        $("#FollowDate").val("7");
        SetInitialScreenClass(els, isInitialScreen);
    } else {
        $("#divInitialScreen").hide();
    }
}

function SetInitialScreenClass(els, isInitialScreen) {
    if (isInitialScreen == "1") {
        var checkNum = 0;
        $("#divInitialScreen input[type=checkbox]").each(function () {
            if ($("input[type=checkbox][name=" + $(this).attr("name") + "]").is(":checked")) {
                checkNum++;
                if ($(this).attr("name") == "ChkInitialScreenA") { $(els.InitialScreenA).val(true) }
                else if ($(this).attr("name") == "ChkInitialScreenB") { $(els.InitialScreenB).val(true) }
                else if ($(this).attr("name") == "ChkInitialScreenC") { $(els.InitialScreenC).val(true) }
                else if ($(this).attr("name") == "ChkInitialScreenD") { $(els.InitialScreenD).val(true) }
            } else {
                if ($(this).attr("name") == "ChkInitialScreenA") { $(els.InitialScreenA).val(false) }
                else if ($(this).attr("name") == "ChkInitialScreenB") { $(els.InitialScreenB).val(false) }
                else if ($(this).attr("name") == "ChkInitialScreenC") { $(els.InitialScreenC).val(false) }
                else if ($(this).attr("name") == "ChkInitialScreenD") { $(els.InitialScreenD).val(false) }
            }
        });
        if (checkNum > 0) {
            $("#NeedSecondaryScreen").val(true);
            $("#divInitialScreen").next("div").show();
            $("#divInitialScreen table").eq(1).show();
            $(els.resultMsg).css("color", "#000");
            ScreeningScore(els);
        } else {
            $("#NeedSecondaryScreen").val(false);
            $("#divInitialScreen").next("div").hide();
            $("#divInitialScreen table").eq(1).hide();
            if ($("#ScreeningID").val() == "0") {
                ConfigoptionTr(els.actionTr, 2);
            } else {
                ConfigoptionTr(els.actionTr, 1);
            }
            $(els.resultMsg).text(els.result3Msg);
            $(els.resultMsg).css("color", "green");
        }
    } else {
        $("#divInitialScreen").hide();
    }
}