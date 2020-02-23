
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
    var itemA = $(els.itemContainer).find("input[type=checkbox][name=" + els.lowrisk + "]:checked").size() > 0 ? 1 : 0;
    var itemB = $(els.itemContainer).find("input[type=checkbox][name=" + els.mediumrisk + "]:checked").size() > 0 ? 2 : 0;
    var itemC = $(els.itemContainer).find("input[type=checkbox][name=" + els.highrisk + "]:checked").size() > 0 ? 3 : 0;
    var apr = '';
    if (itemA > 0 || itemB > 0 || itemC > 0) {
        var score = "";
        if (itemA > itemB && itemB >= itemC) {
            score = "A";
        }
        if (itemB > itemA && itemB >= itemC) {
            score = "B";
        }
        if (itemC > itemA && itemC >= itemB) {
            score = "C";
        }

        $(els.screeningScore).val(score);
        if (score == els.fen1) {
            apr = score + els.result0Msg;
            $(els.resultMsg).css("color", "blue");
            $(els.resultMsg).text(apr);
            $(els.result).val(apr);
            $("#IsRisk").val(0);
            $("#" + els.col).val('blue');
        } else {
            var color = 'red';
            if (score == els.fen2) {
                apr = score + els.result1Msg;
                color = 'orange';
            } else {
                apr = score + els.result2Msg;
            }
            $(els.resultMsg).css("color", color);
            $(els.resultMsg).text(apr);
            $(els.result).val(apr);
            $("#IsRisk").val(1);
            $("#" + els.col).val(color);
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


function CheckedCount(els) {
    var itemA = $(els.itemContainer).find("input[type=checkbox][name=" + els.lowrisk + "]:checked").size();
    var itemB = $(els.itemContainer).find("input[type=checkbox][name=" + els.mediumrisk + "]:checked").size();
    var itemC = $(els.itemContainer).find("input[type=checkbox][name=" + els.highrisk + "]:checked").size();

    if (itemA > 0 || itemB > 0 || itemC > 0) {
        return false;
    }
    return true;
}
