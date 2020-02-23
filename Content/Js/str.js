

function ScreeningScore(els) {
    
    var error1 = $("input[type=radio][name='" + els.str1 + "']:checked").size();
    var error2 = $("input[type=radio][name=" + els.str2 + "]:checked").size();

    var error3 = $("input[type=radio][name=" + els.str3 + "]:checked").size();
    var error4 = $("input[type=radio][name=" + els.str4 + "]:checked").size();
    
    if (error1 > 0 && error2 > 0 && error3 > 0 && error4 > 0) {
        var score1 = parseFloat($("input[type=radio][name=" + els.str1 + "]:checked").val());
        var score2 = parseFloat($("input[type=radio][name=" + els.str2 + "]:checked").val());
        var score3 = parseFloat($("input[type=radio][name=" + els.str3 + "]:checked").val())
        var score4 = parseFloat($("input[type=radio][name=" + els.str4+ "]:checked").val());
        var msg = "";
        var score = score1 + score2 + score3 + score4; 
        if (score < 1) {

            msg = score + els.result1Msg;
            $(els.resultMsg).css("color", "#009900");
            $("#IsRisk").val(0);
            $("#" + els.col).val('green');
        }
        else if (score >= 1) {
            var color = 'red';
            if (score >= 1 && score <= 3) {
                msg = score + els.result2Msg;
                color = 'orange';
            } else if (score > 3) {
                msg = score + els.result3Msg;
            }
            $(els.resultMsg).css("color", color);
            $("#IsRisk").val(1);
            $("#" + els.col).val(color);
            $(els.resultMsg).css("color", color);
            $("#IsRisk").val(1);
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

