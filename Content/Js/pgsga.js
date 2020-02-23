/**
    * 受损变条件改变时清空结果内容
    * @param {状态1-营养需要程度，2-体重下降百分比，3-进食量减少，4-进食量正常，5-进食量百分比,6-白蛋白替代} t
    * @param {种类o=1计算bmi百分比，o=2计算体重百分比，o=3全部计算} o
    * @param {UI元素} els
    * @param {显示分数线} val
    * @returns {}
    */

function calculationResult(t, els, fm) {
   
    //状态为不能保存
    $(els.submit).val("false");
    //清空评分
    $(els.screeningScore).val('0');
    //清空评分保存结果
    $(els.ScreeningResult).val('');
    //保存按钮不可见
    $(els.action).hide();

    if (t == 1 || t == 10 || t == 100) {//体重
        clear(t, els);
        calculationWeight(els);
    }
    else if (t == 2) {//进食状况
        calculationJSZK(els);
    }
    else if (t == 3) {//症状
        calculationZZ(els);
    }
    else if (t == 4) {//活动和身体功能
        calculationHD(els);
    }
    else if (t == 5) { //合并疾病
        calculationHBJB(els);
    }
    else if (t == 6) { //应激
        calculationYJ(els);
    }
    else if (t == 7) { // 体格检查 
        calculationTGJC(els, fm);
    }
    ScreeningScore(els); //自动评分
}

function clear(obj,els) {
    if (obj == 1) {
        //$("#sp_PS_ItemA").find("input[type=radio]").each(function () {
        //    $(this).removeAttr("checked");
        //});
        $("#sp_PS_ItemA1").find("input[type=radio]").each(function () {
            $(this).removeAttr("checked");
        });
        fm.win_render('radio');
    }
    //else if (obj == 10) {
    //    $(els.oneOldWeight).val('');
    //    $(els.sixOldWeight).val('');
    //    $("#sp_PS_ItemA1").find("input[type=radio]").each(function () {
    //        $(this).removeAttr("checked");
    //    });
    //    fm.win_render('radio');
    //}
    else if (obj == 100) {
        $(els.oneOldWeight).val('');
        $(els.sixOldWeight).val('');
        //$("#sp_PS_ItemA").find("input[type=radio]").each(function () {
        //    $(this).removeAttr("checked");
        //});
        fm.win_render('radio');
    }
}

/**
 * 体重评分
 * @param {} els 
 * @returns {} 
 */
function calculationWeight(els) {
    var one = $.trim($(els.oneOldWeight).val());
    var six = $.trim($(els.sixOldWeight).val());
    var wt = $.trim($(els.weight).val());

    var psItemA = $("input[type=radio][name=" + els.pS_ItemA + "]:checked").size();

    var o = 0, s = 0, w = 0, per = 0, score = -1, score1 = -1, score2 = -1, score3 = -1, score4 = -1;
    if (one.length > 0) o = parseFloat(one);
    if (six.length > 0) s = parseFloat(six);
    if (wt.length > 0) w = parseFloat(wt);
    if (w > 0 && o > 0) {
        per = (o - w) / o * 100;
        if (per > 0) {
            per = per.toFixed(1);
            $(els.oneLosspercTd).text("-" + per + "%");
            $(els.oneLossperc).val(per);
            if (per >= 2 && per < 3) {
                score1 = 1;
            } else if (per >= 3 && per < 5) {
                score1 = 2;
            } else if (per >= 5 && per < 10) {
                score1 = 3;
            } else if (per >= 10) {
                score1 = 4;
            } else {
                score1 = 0;
            }
        } else if (per < 0) {
            $(els.oneLosspercTd).text("+" + Math.abs(per).toFixed(1) + "%");
            score1 = 0;
            $(els.oneLossperc).val(per.toFixed(1));
        } else {
            score1 = 0;
            $(els.oneLosspercTd).text("0%");
            $(els.oneLossperc).val('0');
        }
    } else {
        score1 = 0;
        $(els.oneLosspercTd).text("--");
        $(els.oneLossperc).val('');
    }

    if (w > 0 && s > 0) {
        per = (s - w) / s * 100;
        if (per > 0) {
            per = per.toFixed(1);
            $(els.sixLosspercTd).text("-" + per + "%");
            $(els.sixLossperc).val(per);
            if (per >= 2 && per < 6 && o == 0) {
                score2 = 1;
            } else if (per >= 6 && per < 10 && o == 0) {
                score2 = 2;
            } else if (per >= 10 && per < 20 && o == 0) {
                score2 = 3;
            } else if (per >= 20 && o == 0) {
                score2 = 4;
            } else {
                score2 = 0;
            }
        } else if (per < 0) {
            $(els.sixLosspercTd).text("+" + Math.abs(per).toFixed(1) + "%");
            score2 = 0;
            $(els.sixLossperc).val(per.toFixed(1));
        } else {
            score2 = 0;
            $(els.sixLosspercTd).text("0%");
            $(els.sixLossperc).val('0');
        }
    } else {
        score2 = 0;
        $(els.sixLosspercTd).text("--");
        $(els.sixLossperc).val('');
    }

    var ps = $("input[type=radio][name=" + els.pS_ItemA + "]:checked");
    if (ps.length > 0) {
        var psc = $(ps).val().substring(7);
        score3 = parseFloat(psc);
    }
    //if (o > 0 || s > 0 || psItemA > 0) {
    //    $("#sp_PS_ItemA1").attr("disabled", "disabled");
    //    $("#sp_PS_ItemA1").find("input").attr("disabled", "disabled");
    //    $("#sp_PS_ItemA1").find("div").css('background', '#FAFAFA');

    //    //$("input[type=radio][name=" + els.pS_ItemA1 + "][value$=_0]").attr({ "checked": "checked" });
    //    //$("input[type=radio][name=" + els.pS_ItemA1 + "][value$=_-1]").prop("checked", true);
    //    //$("#sp_PS_ItemA1").find("input[name*=PS_ItemA1]").attr({ "checked": "" });

    //    //$("#sp_PS_ItemA1").find("input[name*=PS_ItemA1]").attr({ "checked": "" });

    //    $("#sp_PS_ItemA1").find("input[type=radio]").each(function () {
    //        $(this).removeAttr("checked");
    //    });
    //    fm.win_render('radio');
    //} else {
    //    $("#sp_PS_ItemA1").removeAttr("disabled");
    //    $("#sp_PS_ItemA1").find("input").removeAttr("disabled");
    //    $("#sp_PS_ItemA1").find("div").css('background', '');
    //    fm.win_render('radio');
    //}

    //var psItemA1 = $("input[type=radio][name=" + els.pS_ItemA1 + "]:checked").size();
    //if (psItemA1 > 0) {
    //    $("#sp_PS_ItemA").attr("disabled", "disabled");
    //    $("#sp_PS_ItemA").find("input").attr("disabled", "disabled");
    //    $("#sp_PS_ItemA").find("div").css('background', '#FAFAFA');
    //    $("#sp_PS_ItemA").find("input[type=radio]").each(function () {
    //        $(this).removeAttr("checked");
    //    });
    //    fm.win_render('radio');
    //} else {
    //    $("#sp_PS_ItemA").removeAttr("disabled");
    //    $("#sp_PS_ItemA").find("input").removeAttr("disabled");
    //    $("#sp_PS_ItemA").find("div").css('background', '');
    //    fm.win_render('radio');
    //}


    var ps1 = $("input[type=radio][name=" + els.pS_ItemA1 + "]:checked");
    if (ps1.length > 0) {
        var psc1 = $(ps1).val().substring(7);
        score4 = parseFloat(psc1);
    }
    score = score1 + score2;
    if (score3 > -1) {
        score = score + score3;
    }
    if (score4 > -1) {
        score = score + score4;
    }

    $(els.screeningScoreATd).text("(" + score + " 分)");
    $(els.screeningScoreA).val(score);
}

/**
 * 进食状况
 * @param {} els 
 * @returns {} 
 */
function calculationJSZK(els) {
    var score = 0, score1 = 0, score2 = 0;
    var b = $("input[type=radio][name=" + els.pS_ItemB + "]:checked");
    var c = $("input[type=checkbox][name=" + els.pS_ItemCC + "]:checked");
    if (b.length > 0) {
        var psc = $(b).val().substring(7);
        score1 = parseFloat(psc);
    }
    if (c.length > 0) {
        var itemc = '';
        $(c).each(function (i, n) {
            itemc = itemc + '€' + n.value;
            var s2 = parseFloat(n.value.substring(7));
            if (score2 < s2) {
                score2 = s2;
            }
        });
        if (itemc.length > 0) { $(els.pS_ItemC).val(itemc.substring(1)); }
    }
    if (score1 > score2) {
        score = score1;
    } else {
        score = score2;
    }

    $(els.screeningScoreBTd).text("(" + score + " 分)");
    $(els.screeningScoreB).val(score);

}

/**
 * 症状
 * @param {} els 
 * @returns {} 
 */
function calculationZZ(els) {
    var score = 0;
    var d = $("input[type=checkbox][name=" + els.pS_ItemDD + "]:checked");
    if (d.length > 0) {
        var itemd = '';
        $(d).each(function (i, n) {
            itemd = itemd + '€' + n.value;
            var psc = n.value.substring(7);
            score += parseFloat(psc);
        });
        if (itemd.length > 0) { $(els.pS_ItemD).val(itemd.substring(1)); }
    }
    if (d.length > 0) {
        $(els.screeningScoreCTd).text("(" + score + " 分)");
        $(els.screeningScoreC).val(score);
    } else {
        $(els.pS_Itemd).val("");
        $(els.screeningScoreCTd).text("(" + 0 + " 分)");
        $(els.screeningScoreC).val(0);
    }
}
/**
 * 活动和身体功能 
 * @param {} els 
 * @returns {} 
 */
function calculationHD(els) {
    var score = 0;
    var e = $("input[type=radio][name=" + els.pS_ItemE + "]:checked");
    if (e.length > 0) {
        score = $(e).val().substring(7);
    }
    if (e.length > 0) {
        $(els.screeningScoreDTd).text("(" + score + " 分)");
        $(els.screeningScoreD).val(score);
    } else {
        $(els.screeningScoreDTd).text("(" + 0 + " 分)");
        $(els.screeningScoreD).val(0);
    }
}
/**
 *  合并疾病
 * @param {} els 
 * @returns {} 
 */
function calculationHBJB(els) {
    var score = 0;
    var f = $("input[type=checkbox][name=" + els.pS_ItemFF + "]:checked");
    var h = $.trim($(els.pS_ItemH).val());
    var itemf = '';
    if (f.length > 0) {
        $(f).each(function (i, n) {
            itemf = itemf + '€' + n.value;
            var psc = n.value.substring(7);
            score += parseFloat(psc);
        });
        if (itemf.length > 0) {
            $(els.pS_ItemF).val(itemf.substring(1));
        }
    }
    var f1 = $("input[type=checkbox][name=" + els.pS_ItemF1 + "]:checked");
    if (f1.length > 0) {
        score = parseFloat(score) + 1;
    }
    $(els.screeningScoreETd).text("(" + score + " 分)");
    $(els.screeningScoreE).val(score);
}

/**
 *  应激
 * @param {} els 
 * @returns {} 
 */
function calculationYJ(els) {
    calculationJS(els);
    var score = 0, score1 = 0, score2 = 0, score3 = 0;
    var i = $("input[type=radio][name=" + els.pS_ItemI + "]:checked");
    var j = $("input[type=radio][name=" + els.pS_ItemJ + "]:checked");
    var k = $("input[type=radio][name=" + els.pS_ItemK + "]:checked");
    if (i.length > 0) {
        score1 = parseFloat($(i).val().substring(7));
    }
    if (j.length > 0) {
        score2 = parseFloat($(j).val().substring(7));
    }
    if (k.length > 0) {
        score3 = parseFloat($(k).val().substring(7));
    }
    else {
        var v = $("input[type=text][name=PS_ItemL2]").val();
        if (v.length > 0) {
            if (parseFloat(v) < 10) {
                score3 = 1;
            } else if (parseFloat(v) >= 10 && parseFloat(v) <= 30) {
                score3 = 2;
            } else if (parseFloat(v) > 30) {
                score3 = 3;
            }
        }
    }
    score = score1 + score2 + score3;
    $(els.screeningScoreFTd).text("(" + score + " 分)");
    $(els.screeningScoreF).val(score);

}
/**
 *  应激 激素
 * @param {} els 
 * @returns {} 
 */
function calculationJS(els) {
    var v = $("input[type=text][name=PS_ItemL2]").val();
    if (v.length > 0) {
        if (parseFloat(v) < 10) {
            $("input[type=radio][name=" + els.pS_ItemK + "][value$=_1]").prop("checked", true);
        } else if (parseFloat(v) >= 10 && parseFloat(v) <= 30) {
            $("input[type=radio][name=" + els.pS_ItemK + "][value$=_2]").prop("checked", true);
        } else if (parseFloat(v) > 30) {
            $("input[type=radio][name=" + els.pS_ItemK + "][value$=_3]").prop("checked", true);
        }
    }
    //温度为无的时候，发热时间选项为无
    var i = $("input[type=radio][name=" + els.pS_ItemI + "]:checked").val();
    var j = $("input[type=radio][name=" + els.pS_ItemJ + "]:checked").val();
    var score = -1;
    if (i.length > 0) {
        score = parseFloat(i.substring(7));
    }
    if (score == 0 && j == undefined) {
        $("input[type=radio][name=" + elems.pS_ItemJ + "][value$=_0]").prop("checked", true);
    }
    fm.win_render('radio');
}

/**
 *  体格检查 
 * @param {} els 
 * @returns {} 
 */
function calculationTGJC(els, fm) {
    var score = 0;
    var tr = $(els.jrqkPanel).find("tr[lang=jrqk]");
    var rdo = $(tr).find("input[type=radio]:checked").length;
    if (rdo == 7) {
        var v = 0;
        var n = $(tr).find("input[type=radio][value$=_0]:checked").length;
        var l = $(tr).find("input[type=radio][value$=_1]:checked").length;
        var z = $(tr).find("input[type=radio][value$=_2]:checked").length;
        var h = $(tr).find("input[type=radio][value$=_3]:checked").length;
        if (n >= l && n >= z && n >= h) {
            if (n == l) v = 1;
            if (n == z) v = 2;
            if (n == h) v = 3;
        }
        if (l >= n && l >= z && l >= h) {
            v = 1;
            if (l == z) v = 2;
            if (l == h) v = 3;
        }
        if (z >= n && z >= l && z >= h) {
            v = 2;
            if (z == h) v = 3;
        }
        if (h >= n && h >= l && h >= z) {
            v = 3;
        }
        $("input[type=radio][name=" + els.pS_ItemT + "]").removeClass("layui-disabled");
        $("input[type=radio][name=" + els.pS_ItemT + "]").prop('disabled', false);
        $("input[type=radio][name=" + els.pS_ItemT + "][value$=_" + v + "]").prop("checked", true);
        $("input[type=radio][name=" + els.pS_ItemT + "]").not(":checked").addClass("layui-disabled");
        $("input[type=radio][name=" + els.pS_ItemT + "]").not(":checked").prop('disabled', true);
        fm.win_render('radio');
        score = v;
        $(els.screeningScoreGTd).text("(" + score + " 分)");
        $(els.screeningScoreG).val(score);
    } else {
        $(els.screeningScoreGTd).text("(" + 0 + " 分)");
        $(els.screeningScoreG).val(0);
    }
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
    var s4 = parseFloat($(els.screeningScoreD).val() || 0);
    var s5 = parseFloat($(els.screeningScoreE).val() || 0);
    var s6 = parseFloat($(els.screeningScoreF).val() || 0);
    var s7 = parseFloat($(els.screeningScoreG).val() || 0);
    var score = s1 + s2 + s3 + s4 + s5 + s6 + s7;
    var apr = '';
    $(els.screeningScore).val(score);
    if (score < els.fen1) {
        apr = score + els.result1Msg;
        $(els.resultMsg).css("color", "green");
        $(els.resultMsg).text(apr);
        $(els.screeningApprise).val(apr);
        $("#IsRisk").val(0);
        $("#" + els.col).val('green');
    } else {
        var color = 'red';
        if (score >= els.fen1 && score < els.fen2) {
            color = 'blue';
            apr = score + els.result2Msg;
            $(els.resultMsg).text(apr);
            $(els.screeningApprise).val(apr);
        }
        else if (score >= els.fen2 && score <= els.fen3) {
            color = 'orange';
            apr = score + els.result3Msg;
            $(els.resultMsg).text(apr);
            $(els.screeningApprise).val(apr);
        }
        else if (score >= els.fen4) {
            apr = score + els.result4Msg;
            $(els.resultMsg).text(apr);
            $(els.screeningApprise).val(apr);
        }
        $(els.resultMsg).css("color", color);
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
    //var error1 = $.trim($(els.oneOldWeight).val());
    //var error11 = $.trim($(els.sixOldWeight).val());
    var error111 = $("input[type=radio][name=" + els.pS_ItemA + "]:checked").size();
    var error112 = $("input[type=radio][name=" + els.pS_ItemA1 + "]:checked").size();
    var error2 = $("input[type=radio][name=" + els.pS_ItemB + "]:checked").size();
    var error22 = $("input[type=checkbox][name=" + els.pS_ItemCC + "]:checked").size();
    var error3 = $("input[type=checkbox][name=" + els.pS_ItemDD + "]:checked").size();
    var error4 = $("input[type=radio][name=" + els.pS_ItemE + "]:checked").size();
    var error5 = $("input[type=checkbox][name=" + els.pS_ItemFF + "]:checked").size();
    var error55 = $.trim($(els.pS_ItemH).val());
    var error6 = $("input[type=radio][name=" + els.pS_ItemI + "]:checked").size();
    var error66 = $("input[type=radio][name=" + els.pS_ItemJ + "]:checked").size();
    var error666 = $("input[type=radio][name=" + els.pS_ItemK + "]:checked").size();
    var error6666 = $("input[type=checkbox][name=" + els.pS_ItemL + "]:checked").size();//单选有没有选
    var error66666 = $.trim($("input[type=text][name=PS_ItemL2]").val()).length;//文本有没有填
    var error7 = $("input[type=radio][name=" + els.pS_ItemT + "]:checked").size();

    if (error111 == 0 && error112 == 0) {
        $(els.resultMsg).text("体重数据不完整，暂无法进行评分!");
        $(els.submit).val("false");
        ConfigoptionTr(els.actionTr, 0);
    } else if (error2 == 0 || error22 == 0) {
        $(els.resultMsg).text("进食状况数据不完整，暂无法进行评分!");
        $(els.submit).val("false");
        ConfigoptionTr(els.actionTr, 0);
    } else if (error3 == 0) {
        $(els.resultMsg).text("症状数据不完整，暂无法进行评分!");
        $(els.submit).val("false");
        ConfigoptionTr(els.actionTr, 0);
    } else if (error4 == 0) {
        $(els.resultMsg).text("活动和身体功能数据不完整，暂无法进行评分!");
        $(els.submit).val("false");
        ConfigoptionTr(els.actionTr, 0);
    }
        //else if ((error5 > 0 && error55.length == 0) || (error5 == 0 && error55.length > 0)) {
        //        $(els.resultMsg).text("合并疾病数据不完整，暂无法进行评分!");
        //        $(els.submit).val("false");
        //        ConfigoptionTr(els.actionTr, 0);
        //}
    else if (error6 == 0 || error66 == 0 || ((error666 == 0 && error66666 == 0) && error6666 > 0)) {
        $(els.resultMsg).text("应激数据不完整，暂无法进行评分!");
        $(els.submit).val("false");
        ConfigoptionTr(els.actionTr, 0);
    }
    else if (error7 == 0) {
        $(els.resultMsg).text("体格检查数据不完整，暂无法进行评分!");
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
function ConfigoptionTr(actionTr, i, isSave) {
    if (i == 0) {  //取消数据后全部不可操作
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

//住院号后页面跳转
function reloadContent(elem) {
    var beInNo = $.trim($(elem).val());
    if (beInNo.length > 0) {
        exsitBeInNo(beInNo,1, headers, function (data) {
            if (data.result) {
                window.document.location.href = parent.screen + "?beInNo=" + beInNo;
               // parent.reloadPritentList(beInNo);
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
//选择时间
function refContent(patCde, dt) {
    //window.document.location.href = parent.screen + "/"+patCde+"?dt=" + dt;
}


function SetItemSelected(t, o) {
    if (CheckOnlyAbsDouble(o)) {
        var value = $.trim($(o).val());
        if (t == 1) {//发热
            var checkedValue = "_0";
            if (value > 37.2 && value <= 38.3) {
                checkedValue = "_1";
            } else if (value > 38.3 && value <= 38.8) {
                checkedValue = "_2";
            } else if (value > 38.8) {
                checkedValue = "_3";
            }
            $("input[type=radio][name=" + elems.pS_ItemI + "][value$=" + checkedValue + "]").prop("checked", true);
            fm.win_render('radio');
        } else if (t == 2) {//发热持续时间
            var checkedValue = "";
            if (value < 72) {
                checkedValue = "_1";
            } else if (value == 72) {
                checkedValue = "_2";
            } else if (value > 72) {
                checkedValue = "_3";
            }
            $("input[type=radio][name=" + elems.pS_ItemJ + "][value$=" + checkedValue + "]").prop("checked", true);
            fm.win_render('radio');
        }
        calculationYJ(elems);
    }
}


//检查输入是否为正浮点数
function CheckOnlyAbsDouble(e) {
    var exp = new RegExp(/^\d+(\.\d{0,2})?$/);
    var val = GetValue(e);
    if (val.length == 0) return true;
    if (exp.test(val)) {
        return true;
    }
    else {
        $(e).select();
        parent.dialog.win_alert('只能输入整数或小数点后最多保留两位', '提示', 5);
        $(e).val("");
        return false;
    };

}

function GetValue(o) {
    return $.trim($(o).val());
}


