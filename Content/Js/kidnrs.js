/**
    * 受损变条件改变时清空结果内容
    * @param {状态1-营养需要程度，2-体重下降百分比，3-进食量减少，4-进食量正常，5-进食量百分比,6-白蛋白替代} t
    * @param {种类o=1计算bmi百分比，o=2计算体重百分比，o=3全部计算} o
    * @param {UI元素} els
    * @param {显示分数线} val
    * @returns {}
    */
function clearResult(t, els, val) {
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
        configBMI(els, headers);//BMI
    }
    else if (t == 3) {//身高变化
        configBMI(els, headers);//BMI
    }
    else if (t == 4) {
        ScreeningScore(els); //自动评分
    }
}


/**
* 计算体重百分比
* @param {UI元素} els
* @param {BMI计算后需要执行函数} fun
* @returns {}
*/

function CalculationPerc(els) {
    var oldWeight = $(els.owt).val();
    var weight = $(els.wt).val();
    weight = $.trim(weight) == "" ? 0 : weight;
    oldWeight = $.trim(oldWeight) == "" ? 0 : oldWeight;
    if (oldWeight > 0 && weight > 0) {
        var per = (oldWeight - weight) / oldWeight * 100; 
        var pr = parseFloat(per); 
        if (pr > 0) { //减少百分之一才算体重下降         
            $(els.dwtxt).val(oldWeight - weight);
            $(els.lossperstxt).val(per.toFixed(1));
            $(els.wtlbl).text("-" + per.toFixed(1));
        } else {
            $(els.dwtxt).val(oldWeight - weight); 
            $(els.lossperstxt).val(per.toFixed(1));
            $(els.wtlbl).text("+" + Math.abs(per.toFixed(1)));
        }
        fm.win_render('radio');
    } else {
        $(els.dwtxt).val(0);
        $(els.lossperstxt).val(0);
        fm.win_render('radio');
    }
}

/**
 * 配置操作功能
 * @param {} actionTr 
 * @param {} i 
 * @returns {} 
 */
function ConfigoptionTr(actionTr, i) {
    if (i == 0) { //改变数据后全部不可操作
        $(actionTr).find("input").addClass("layui-disabled");
        $(actionTr).find("input[type=submit]").removeClass("layui-btn");
        $(actionTr).find("input[type=button]").removeClass("layui-btn");
        $(actionTr).find("input").prop("disabled", true);
    } else if (i == 1) {
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
* 评分验证
* @param {bmi分值} bmi
* @param {UI元素} els
* @param {} lossperstxt
* @returns {}
*/
function ScreeningScore(els) {
    var error1 = $("input[type=radio][name=" + els.jbfxrdo + "]:checked").size();
    var error11 = $("input[type=radio][name=" + els.ysqkrdo + "]:checked").size();
    var error22 = $("input[type=radio][name=" + els.tzrdo + "]:checked").size();
    var error33 = $("input[type=radio][name=" + els.rtclrdo + "]:checked").size();
    if (error1 == 0) {
        $(els.resultMsg).text("疾病风险数据不完整，暂无法进行评分!!", 5);
        $(els.submit).val("false");
        ConfigoptionTr(els.actionTr, 0);
    } else if (error11 == 0) {
        $(els.resultMsg).text("饮食情况数据不完整，暂无法进行评分!!", 5);
        $(els.submit).val("false");
        ConfigoptionTr(els.actionTr, 0);
    } else if (error22 == 0) {
        $(els.resultMsg).text("体重变化数据不完整，暂无法进行评分!!", 5);
        $(els.submit).val("false");
        ConfigoptionTr(els.actionTr, 0);
    } else if (error33 == 0) {
        $(els.resultMsg).text("人体测量数据不完整，暂无法进行评分!!", 5);
        $(els.submit).val("false");
        ConfigoptionTr(els.actionTr, 0);
    } else {
        ScreeningResult(els);
        $(els.submit).val("true");
        ConfigoptionTr(els.actionTr, 2);
    }
}


/**
* 评分结果
* @param {UI元素} els
* @returns {}
*/
function ScreeningResult(els) {
    var s1 = $("input[type=radio][name=" + els.jbfxrdo + "]:checked").val();
    var s2 = $("input[type=radio][name=" + els.ysqkrdo + "]:checked").val();
    var s3 = $("input[type=radio][name=" + els.tzrdo + "]:checked").val();
    var s4 = $("input[type=radio][name=" + els.rtclrdo + "]:checked").val();
    var score = parseInt(s1) + parseInt(s2) + parseInt(s3) + parseInt(s4);
    var apr = '';
    $(els.screeningScore).val(score);
    if (score >= 3) {
        apr = score + els.result1Msg; 
        if (score >= els.fen) { apr = score + els.result1Msg; }
        $(els.resultMsg).css("color", "red");
        $(els.resultMsg).text(apr);
        $(els.result).val(apr);
        $("#IsRisk").val(1);
        $("#" + els.col).val('red');
    } else {
        apr = score + els.result0Msg;
        $(els.resultMsg).css("color", "green");
        $(els.resultMsg).text(apr);
        $(els.result).val(apr);
        $("#IsRisk").val(0);
        $("#" + els.col).val('green');
    }
}
//获取BMI，保存表（病人表及量表）中
function configBMI(els, hds) {
    var height = $(els.ht).val();
    var weight = $(els.wt).val();
    height = $.trim(height) == "" ? 0 : height;
    weight = $.trim(weight) == "" ? 0 : weight;
    if (height > 0 && weight > 0) {
        common.win_formAction('/TreatmentCenter/ShareManagement/BMI', 'GET', { weight: weight, height: height, patAge: els.age, physiology: els.physiology }, hds, function (data) {
            if (data.result) {
                var bmi = parseFloat(data.reVal);
                $(els.bmitxt).val(bmi);
            } else {
                $(els.bmitxt).val("0");
            }
        });
    } else {
        $(els.bmitxt).val("0");
    }
}

function refContent() {

}

