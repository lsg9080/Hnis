

function ScreeningScore(els) {

    var error1 = $("input[type=radio][name='" + els.screeningitem1 + "']:checked").size();
    var error2 = $("input[type=radio][name=" + els.screeningitem2 + "]:checked").size();

    var error3= $("input[type=radio][name=" + els.screeningitem3 + "]:checked").size();
    if (error1 > 0 && error2 > 0&&error3>0) {
        var score1 = parseFloat($("input[type=radio][name=" + els.screeningitem1 + "]:checked").val());
        var score2 = parseFloat($("input[type=radio][name=" + els.screeningitem2 + "]:checked").val());
        var score3 = parseFloat($("input[type=radio][name=" + els.screeningitem3 + "]:checked").val());
        var msg = "";
        var score = score1 + score2 + score3;
        if (score < 1) {

            msg = score + els.result1Msg;
            $(els.resultMsg).css("color", "#009900");
            $("#IsRisk").val(0);
            $("#" + els.col).val('green');
        }
        else if (score >= 1) {
            var color = 'red';
            if (score >= 1 && score <= 2) {
                msg = score + els.result2Msg;
                color = 'orange';
            }
            else if (score > 2) {
                msg = score + els.result3Msg;
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
//选择时间
function refContent(patCde, dt) {
}
//住院号后页面跳转
function reloadContent(elem) {
    var beInNo = $.trim($(elem).val());
    if (beInNo.length > 0) {
        exsitBeInNo(beInNo,1, headers, function (data) {
            if (data.result) {
               window.document.location.href = parent.screen + "?beInNo=" + beInNo;
                 //parent.reloadPritentList(beInNo);
            } else {
                parent.dialog.win_alert("住院号不存在或该患者不在你的管辖范围内!", "系统提示", 5);
                $("#screenPanel").hide();
                $("#monitorPanel").hide();
                $("#patientInfo").hide();
            }
        });
    } else {
        parent.dialog.win_alert("住院号不能为空!", "系统提示", 5);
    }
}
function refContent() {
    
}
