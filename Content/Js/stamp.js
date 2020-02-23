/**
    * 受损变条件改变时清空结果内容
    * @param {状态1-营养需要程度，2-体重下降百分比，3-进食量减少，4-进食量正常，5-进食量百分比,6-白蛋白替代} t
    * @param {种类o=1计算bmi百分比，o=2计算体重百分比，o=3全部计算} o
    * @param {UI元素} els
    * @param {显示分数线} val
    * @returns {}
    */
function clearResult(t, els, headers, fm) {
    //状态为不能保存
    $(els.submit).val("false");
    //清空评分
    $(els.screeningScore).val('0');
    //清空评分保存结果
    $(els.ScreeningResult).val('');
    //保存按钮不可见
    $(els.action).hide();

    if (t == 1) {//疾病诊断
        Item1Score(els);
    }
    else if (t == 2) {//饮食情况
        Item2Score(els);
    }
    else if (t == 3) {//人体测量
        Item3Score(els, headers,fm);
    }
    ScreeningScore(els); //自动评分
}
/**
 * *疾病诊断
 * @param {} els 
 * @returns {} 
 */
function Item1Score(els) {
    var v = $(els.rdoScreeningItemA).find("input[type=radio]:checked").val();
    if (v.length > 0) {
        var val = v.substring(7);       
        $(els.screeningScoreA).val(val);
        $(els.tdscreeningScoreA).text(val + ' 分');
    } else {
        $(els.screeningScoreA).val(-1);
        $(els.tdscreeningScoreA).text(+ '000 分');
    } 
}
/**
 * 饮食情况
 * @param {} els 
 * @returns {} 
 */
function Item2Score(els) {
    var v = $(els.rdoScreeningItemB).find("input[type=radio]:checked").val();
    if (v.length > 0) {
        var val = v.substring(7);
        $(els.screeningScoreB).val(val);
        $(els.tdscreeningScoreB).text(val + ' 分');
    } else {
        $(els.screeningScoreB).val(-1);
        $(els.tdscreeningScoreB).text(+ '0 分');
    }
}
/**
 * 人体测量
 * @param {} els 
 * @returns {} 
 */
function Item3Score(els,hds,fm) {
    var wt = $.trim($(els.currentWeight).val());
    var ht = $.trim($(els.currentHeight).val());
    var height = ht == "" ? 0 : ht;
    var weight = wt == "" ? 0 : wt; 
    var z = 0, val = -1;
    var chk = $(els.rdoScreeningItemC).find("input[type=radio]:checked").size(); 
    if (chk > 0) {
        var v = $(els.rdoScreeningItemC).find("input[type=radio]:checked").val();
        val = v.substring(7); 
    } //else {
        if (height > 0 && weight > 0) {

            common.win_formAction('/TreatmentCenter/ShareManagement/ChildZval', 'GET', { weight: weight, height: height, age: els.age,sex:els.sex, physiology: els.physiology }, hds, function (data) {
                if (data.result) {

                    if (els.age > 19) {
                        if(parseFloat(data.resultValue) > 0){$(els.bmiSpan).text(data.resultValue) } else { $(els.bmiSpan).text('-');}
                        $(els.ageBtSpan).hide();
                        $(els.ageBbSpan).hide();
                        $(els.ageWBMI).val('0');
                        $(els.tdAgeBBMI).text('');
                        $(els.tdscreeningScoreC).text(0 + ' 分');
                        $(els.bmi).val(data.resultValue);
                    } else {
                        if (els.age < 5) {
                            $(els.ageBtSpan).show();
                            $(els.ageBbSpan).hide();
                        }else if (els.age >= 5 && els.age < 19) {
                            $(els.ageBtSpan).hide();
                            $(els.ageBbSpan).show();
                        }
                        $(els.bmiSpan).text(data.resultValue);
                        $(els.bmi).val(data.resultValue);
                        z = data.reVal;
                        if (z > -2) {
                            val = 0;
                        } else if (z <= -3) {
                            val = 2;
                        } else if (z > -3 && z <= -2) {
                            val = 1;
                        }
                        $(els.ageWBMI).val(z);
                        $(els.tdAgeBBMI).text(z);
                        $(els.screeningScoreC).val(val);
                        if(val > -1) $(els.tdscreeningScoreC).text(val + ' 分');
                        var chk = $(els.rdoScreeningItemC).find("input[type=radio]:checked").size();
                        if (chk == 0) {
                            $(els.rdoScreeningItemC).find("input[type=radio][value=It1401_" + val + "]").prop("checked", true);
                            fm.win_render('radio');
                        }
                    }
                }
            });

        } else {
            $(els.ageWBMI).val('-1');
            $(els.tdAgeBBMI).text('-');
            $(els.screeningScoreC).val(0);
            $(els.tdscreeningScoreC).text(+ '0 分');
        }
    //}
    $(els.screeningScoreC).val(val);
    if (val < 0) val = 0;
    $(els.tdscreeningScoreC).text(val + ' 分');
}

/**
* 评分结果
* @param {UI元素} els
* @returns {}
*/
function ScreeningResult(els) {
        var s1 = parseFloat($(els.screeningScoreA).val() || 0);
        var s2 = parseFloat($(els.screeningScoreB).val() || 0);
        var s3 = parseFloat($(els.screeningScoreC).val() || 0);
        var s4 = parseFloat($(els.screeningScore4).val() || 0);
        var score = s1 + s2 + s3;
        var apr = '';

    $(els.screeningScore).val(score);
    if (score >= els.fen2) {
        apr = score + els.result3Msg;
        $(els.resultMsg).css("color", "red");
        $(els.resultMsg).text(apr);
        $(els.screeningApprise).val(apr);
        $("#IsRisk").val(1);
        $("#" + els.col).val('red');
    } else if (score > els.fen1 && score < els.fen2) {
        apr = score + els.result2Msg;
        $(els.resultMsg).css("color", "orange");
        $(els.resultMsg).text(apr);
        $(els.screeningApprise).val(apr);
        $("#IsRisk").val(1);
        $("#" + els.col).val('orange');
    } else {
        apr = score + els.result1Msg;
        $(els.resultMsg).css("color", "green");
        $(els.resultMsg).text(apr);
        $(els.screeningApprise).val(apr);
        $("#IsRisk").val(0);
        $("#" + els.col).val('green');
    }
}

/**
* 评分验证
* @param {UI元素} els
* @returns {}
*/
function ScreeningScore(els) {
    var scoreA = $(els.screeningScoreA).val();
    var scoreB = $(els.screeningScoreB).val();
    var scoreC = $(els.screeningScoreC).val();
    if (scoreA < 0) {
        $(els.resultMsg).text("疾病诊断数据不完整，暂无法进行评分!");
        $(els.submit).val("false");
        ConfigoptionTr(els.actionTr, 0);
    } else if (scoreB < 0) {
        $(els.resultMsg).text("饮食情况数据不完整，暂无法进行评分!");
        $(els.submit).val("false");
        ConfigoptionTr(els.actionTr, 0);
    } else if (scoreC < 0) {
        $(els.resultMsg).text("人体测量数据不完整，暂无法进行评分!");
        $(els.submit).val("false");
        ConfigoptionTr(els.actionTr, 0);
    } else {
        ScreeningResult(els);
        $(els.submit).val("true");
        ConfigoptionTr(els.actionTr, 2);

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


/* 自动计算BMI值
* @param {UI元素} els
* @param {提交验证密钥} hds
* @param {BMI计算后需要执行函数} fun
* @returns {}
*/
function configBMI(els, hds, fun) {
    var bmi_sel = $(els.bmitd).find("input[type=radio][name=" + els.bmirdo + "]:checked").size();
    if (bmi_sel == 0) {
        var height = $(els.ht).val();
        var weight = $(els.wt).val();
        height = $.trim(height) == "" ? 0 : height;
        weight = $.trim(weight) == "" ? 0 : weight;
        if (height > 0 && weight > 0) {
            common.win_formAction('/TreatmentCenter/ShareManagement/BMI', 'GET', { weight: weight, height: height, patAge: els.age, physiology: els.physiology }, hds, function (data) {
                if (data.result) {
                    $(els.bmilbl).text(data.reVal);
                    var bmi = parseFloat(data.reVal);
                    //$(els.bmitd).find("input[type=radio]").removeClass("layui-disabled");
                    //$(els.bmitd).find("input[type=radio]").prop("disabled", false);
                    if (bmi <= 18.5 && bmi > 0) {
                        $(els.bmitd).find("input[type=radio][name=" + els.bmirdo + "][value=3]").prop("checked", true);

                        //$(els.bmitd).find("input[type=radio][name=" + els.bmirdo + "][value!=3]").addClass("layui-disabled");
                        //$(els.bmitd).find("input[type=radio][name=" + els.bmirdo + "][value!=3]").prop('disabled', true);
                        if (fun) fun(bmi, els);
                    } else if (bmi > 18.5 && (bmi <= 20.5)) {
                        $(els.bmitd).find("input[type=radio][name=" + els.bmirdo + "][value=2]").prop("checked", true);
                        //$(els.bmitd).find("input[type=radio][name=" + els.bmirdo + "][value!=2]").addClass("layui-disabled");
                        //$(els.bmitd).find("input[type=radio][name=" + els.bmirdo + "][value!=2]").prop('disabled', true);
                        if (fun) fun(bmi, els);
                    } else {
                        $(els.bmitd).find("input[type=radio][name=" + els.bmirdo + "][value=0]").prop("checked", true);
                        //$(els.bmitd).find("input[type=radio][name=" + els.bmirdo + "][value!=0]").addClass("layui-disabled");
                        //$(els.bmitd).find("input[type=radio][name=" + els.bmirdo + "][value!=0]").prop('disabled', true);
                        if (fun) fun(bmi, els);
                    }
                    //根据IBM默认选择初筛
                    if (bmi < 18.5 && bmi > 0) {
                        $("input[type=checkbox][name=ChkInitialScreenA]").prop("checked", true);
                        fm.win_render('checkbox');
                        SetInitialScreenClass(els, IsInitialScreen);
                    } else {
                        $("input[type=checkbox][name=ChkInitialScreenA]").prop("checked", false);
                        fm.win_render('checkbox');
                        SetInitialScreenClass(els, IsInitialScreen);
                    }

                    $(els.bmiSpan).text(bmi);
                    $(els.bmi).val(bmi);
                    fm.win_render('radio');
                } else {
                    $(els.bmiSpan).text("--");
                    $(els.bmi).val(bmi);
                }
            }, 'JSON');
        } else {
            //$(els.bmitd).find("input[type=radio][name=" + els.bmirdo + "]").prop("checked", false);
            //$(els.bmitd).find("input[type=radio][name=" + els.bmirdo + "]").addClass("layui-disabled");
            //$(els.bmitd).find("input[type=radio][name=" + els.bmirdo + "]").prop('disabled', true);
            $(els.bmi).val(0);
            $(els.bmiSpan).text("--");
            fm.win_render('radio');
            if (fun) fun(0, els);
        }
    }
}
