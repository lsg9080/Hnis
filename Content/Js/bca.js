/* 自动计算BMI值
* @param {UI元素} els
* @param {提交验证密钥} hds
* @param {BMI计算后需要执行函数} fun
* @returns {}
*/

function configBMI(els, hds) {
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
                fm.win_render('radio');
            } else {
                $(els.bmilbl).text("");
            }

        }, 'JSON');
    } else {

        $(els.bmilbl).text("--");

    }
}

function ScreeningScore(els) {

    var error1 = $("input[type=radio][name='" + els.bca1 + "']:checked").size();
    var error2 = $("input[type=radio][name=" + els.bca2 + "]:checked").size();
    var error3 = $("input[type=radio][name=" + els.bca3 + "]:checked").size();
    var error4 = $("input[type=radio][name=" + els.bca4 + "]:checked").size();
    var error5 = $("input[type=radio][name=" + els.bca5 + "]:checked").size();
    var error6 = $("input[type=radio][name=" + els.bca6 + "]:checked").size();
    var error7 = $("input[type=radio][name=" + els.bca7 + "]:checked").size();
    var error8 = $("input[type=radio][name=" + els.bca8 + "]:checked").size();
    var error9 = $("input[type=radio][name=" + els.bca9 + "]:checked").size();
    var error10 = $("input[type=radio][name=" + els.bca10 + "]:checked").size();

    if (error1 > 0 && error2 > 0 && error3 > 0 && error4 > 0 && error5 > 0 && error6 > 0 && error7 > 0 && error8 > 0 && error9 > 0 && error10) {
        var score = parseFloat($("input[type=radio][name=" + els.bca10 + "]:checked").val());

        var msg = "";
        if (score < 1) {

            msg = score + els.result1Msg;
            $(els.resultMsg).css("color", "#009900");
            $("#IsRisk").val(0);
            $("#" + els.col).val('green');
        }
        else if (score >= 1) {
            var color = 'red';
            if (score == 1) {
                color = 'blue';
                msg = score + els.result2Msg;
            }
            else if (score == 2) {
                color = 'orange';
                msg = score + els.result3Msg;
            }
            else if (score == 3) {
                msg = score + els.result4Msg;
            }
            $(els.resultMsg).css("color", color);
            $("#IsRisk").val(1);
            $("#" + els.col).val(color);
        }
        $(els.resultMsg).text(msg);
        $(els.result).val(msg);
        $(els.screeningScore).val(score);
        $(els.submit).val("true");
        ConfigoptionTr(els.actionTr, 2);
    } else {
        $(els.submit).val("false");
        ConfigoptionTr(els.actionTr, 0);
    }

}



function ConfigoptionTr(actionTr, i) {
    if (i == 0) {  //改变数据后全部不可操作
        $(actionTr).find("input").addClass("layui-disabled");
        $(actionTr).find("input[type=submit]").removeClass("layui-btn");
        $(actionTr).find("input[type=button]").removeClass("layui-btn");
        $(actionTr).find("input").prop("disabled", true);
    }
    else if (i == 1) { //保存后全部可以操作
            $(actionTr).find("input").removeClass("layui-disabled");
            $(actionTr).find("input").prop("disabled", false);
            $(actionTr).find("input[type=submit]").addClass("layui-btn");
            $(actionTr).find("input[type=button]").addClass("layui-btn");
            $(actionTr).find("input[type=button]").css({ 'background-color': '#E64545' });
    }
    else if (i == 2) { //数据调整后作除了打印其它都可以操作
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

function CalculateBMIAndIBW(els, hds) {
    var height = $(els.ht).val();
    var weight = $(els.wt).val();
    height = $.trim(height) == "" ? 0 : height;
    weight = $.trim(weight) == "" ? 0 : weight;
    if (height > 0 && weight > 0) {
        common.win_formAction('/TreatmentCenter/NutritionalAssessmentManagement/GetBMI', 'POST', { weight: weight, height: height }, headers, function (json) {
            if (json.result) {
                $(els.bmilbl).text(json.resultValue);
                var bmi = parseFloat(json.resultValue);

                $("input[type=radio][name=" + els.bca4 + "]").removeClass("layui-disabled");
                $("input[type=radio][name=" + els.bca4 + "]").prop("disabled", false);
                if (bmi > 18.5) {

                    $("input[type=radio][name=" + els.bca4 + "][value=0]").prop("checked", true);

                }
                else if (bmi >= 17 && bmi <= 18.5) {
                    $("input[type=radio][name='" + els.bca4 + "'][value='1']").prop("checked", true);
                }

                else if (bmi >= 16 && bmi < 17) {
                    $("input[type=radio][name='" + els.bca4 + "'][value='2']").prop("checked", true);
                }
                else if (bmi < 16) {
                    $("input[type=radio][name='" + els.bca4 + "'][value='3']").prop("checked", true);
                }
                $("#BMI").val(json.resultValue);
                $("input[type=radio][name=" + els.bca4 + "]").not(":checked").addClass("layui-disabled");
                $("input[type=radio][name=" + els.bca4 + "]").not(":checked").prop('disabled', true);
                fm.win_render('radio');

            } else {
                $("#BMI").val("-1");
            }
        }, 'JSON');
    } else {
        $("#BMI").val("-1");
    }


    var age = $.trim($("#hidPatientAge").val());
    var sex = $.trim($("#hidPatientSex").val());
    var maternalInfo = $.trim($("#hidMaternalInfo").val());

    var pregnantWeek = $.trim($("#hidPregnantWeek").val());

    var pregnantWeight = $.trim($("#hidPregnantWeight").val());

    if (height > 0 && weight > 0) {
        common.win_formAction('/TreatmentCenter/NutritionalAssessmentManagement/GetIBW', 'POST', { height: height, age: age, weight: weight, physiology: maternalInfo, weeks: pregnantWeek, preWeight: pregnantWeight, sex: sex }, headers, function (json) {
            if (json.result) {
                $(els.ibwlbl).text(json.resultValue);
                var ibw = parseFloat(json.resultValue);
                var ibwRate = (weight / ibw) * 100;
                $("input[type=radio][name=" + els.bca1 + "]").removeClass("layui-disabled");
                $("input[type=radio][name=" + els.bca1 + "]").prop("disabled", false);
                if (ibwRate > 90) {

                    $("input[type=radio][name=" + els.bca1 + "][value=0]").prop("checked", true);

                }
                else if (ibwRate >= 80 && ibwRate < 90) {
                    $("input[type=radio][name='" + els.bca1 + "'][value='1']").prop("checked", true);
                }

                else if (ibwRate >= 60 && ibwRate < 80) {
                    $("input[type=radio][name='" + els.bca1 + "'][value='2']").prop("checked", true);
                }
                else if (ibwRate < 60) {
                    $("input[type=radio][name='" + els.bca1 + "'][value='3']").prop("checked", true);
                }
                $("input[type=radio][name=" + els.bca1 + "]").not(":checked").addClass("layui-disabled");
                $("input[type=radio][name=" + els.bca1 + "]").not(":checked").prop('disabled', true);
                $("#IBW").val(json.resultValue);
                fm.win_render('radio');
            }
        }, 'JSON');
        return false;
    } else {
        $("#IBW").val("-1");
    }
}
function refContent() {

}

