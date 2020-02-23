
function clearResult(els) {

    //状态为不能保存
    $(els.submit).val("false");
    //清空评分
    $(els.screeningScore).val('0');
    //清空评分保存结果
    $(els.ScreeningResult).val('');
    //保存按钮不可见
    $(els.action).hide();

    ScreeningScore(els); //自动评分

}


function ScreeningScore(els) {
    var itemA = $(els.itemContainer).find("input[type=radio][name=" + els.screeningItemA + "]:checked");
    var itemB = $(els.itemContainer).find("input[type=radio][name=" + els.screeningItemB + "]:checked");
    var itemC = $(els.itemContainer).find("input[type=radio][name=" + els.screeningItemC + "]:checked");
    var itemD = $(els.itemContainer).find("input[type=radio][name=" + els.screeningItemD + "]:checked");
    var itemE = $(els.itemContainer).find("input[type=radio][name=" + els.screeningItemE + "]:checked");
    var apr = '';
    if (itemA.size() > 0 && itemB.size() > 0 && itemC.size() > 0 && itemD.size() > 0 && itemE.size() > 0) {
        var score = parseInt(itemA.val()) + parseInt(itemB.val()) + parseInt(itemC.val()) + parseInt(itemD.val()) + parseInt(itemE.val());
        $(els.screeningScore).val(score);
        if (score < els.fen) {
            apr = score + els.result0Msg;
            $(els.resultMsg).css("color", "blue");
            $(els.resultMsg).text(apr);
            $(els.result).val(apr);
            $("#IsRisk").val(0);
            $("#" + els.col).val('blue');
        } else {
            apr = score + els.result1Msg;
            $(els.resultMsg).css("color", "red");
            $(els.resultMsg).text(apr);
            $(els.result).val(apr);
            $("#IsRisk").val(1);
            $("#" + els.col).val('red');
        }

        $(els.submit).val("true");
        ConfigoptionTr(els.actionTr, 2);
    } else {
        $(els.resultMsg).text("风险数据不完整，暂无法进行评分!");
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
    else if (i == 1) {

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


