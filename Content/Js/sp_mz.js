function BindingMenu(id, patCode, currentPage, isPC) {
    $.get("/TreatmentCenter/NutritionRecipeManagement/GetMeunList", { id: id, currentPage: currentPage }, function (dt) {
        var html = []; 
        $.each(dt, function (index, it) {
            var fname = "";
            var tit = it.menuName;
            if (tit.length > 18) {
                fname = tit.substring(0, 17) + "...";
            } else {
                fname = tit;
                tit = '';
            }
            html.push('<div  class="trr layui-row"><span class="layui-col-xs12" style="text-align:left;" >'
            + '<a herf="javascript(0);" title="' + tit + '" data-type="1" data-source=\'' + JSON.stringify(it) + '\' data-code="' + it.menuCode + '" class="code" style="margin-left:10px;text-decoration: none;font-weight:normal; cursor:pointer;  display:block; width:100%;" data-code="' + it.menuCode + '">' + fname + '</a>'
            +'</span>'
            +'<span class="layui-col-xs4" style="text-align:right; display:none;" >'
            +'<a herf="javascript(0);" data-type="1" data-source=\'' + JSON.stringify(it) + '\' class="code" style="margin-right:10px;text-decoration: none;font-weight:normal; cursor:pointer;" data-code="' + it.menuCode + '">+</a>'
            + '</span></div>');
        });
        $("#d2").append(html.join('')); 
        bindCodeClick(patCode, isPC);
    });
}
function BindingCN(id, patCode, currentPage, isPC) {
    $.get("/TreatmentCenter/ShareManagement/GetPreparationList", { id: id, currentPage: currentPage }, function (dt) {
        var html = "";
        $.each(dt, function (index, it) {
            var tit = it.fullName + '【' + it.guiGe + it.guiGeUnit + '/' + it.guiGeName + '】';
            var fname = "";
            if (tit.length > 18) {
                fname = tit.substring(0, 17) + "...";
            } else {
                fname = tit;
                tit = '';
            }
            html += '<div  class="trr layui-row"><span class="layui-col-xs12" style="text-align:left;margin-left:10px; " >';

            html += '<a herf="javascript(0);" title="' + tit +'" data-type="2" data-source=\'' + JSON.stringify(it) + '\' data-code="' + it.preparationCode + '" class="code" style="text-decoration: none;font-weight:normal; cursor:pointer;  display:block; width:100%;" data-code="' + it.preparationCode + '">' + fname + '</a>';
            html += '</span>';
            html += '<span class="layui-col-xs4" style="text-align:right; display:none;" >';

            html += '<a herf="javascript(0);" data-type="2" data-source=\'' + JSON.stringify(it) + '\' class="code" style="text-decoration: none;font-weight:normal; cursor:pointer;" data-code="' + it.preparationCode + '">+</a>';
            html += '</span></div>';

        });
        $("#d2").append(html);
        bindCodeClick(patCode, isPC);
    });
}
function BindingFood(id, patCode, currentPage, isPC) {
    $.get("/TreatmentCenter/NutritionRecipeManagement/GetFoodList", { id: id, currentPage: currentPage }, function (dt) {
        var html = "";
        $.each(dt, function (index, it) {
            var fname = "";
            var tit = it.foodName;
            if (it.foodName.length > 18) {
                fname = tit.substring(0, 17) + "...";
            } else {
                fname = tit;
                tit = '';
            }

            html += '<div  class="trr layui-row"><span class="layui-col-xs12" style="text-align:left;margin-left:10px; " >';

            html += '<a herf="javascript(0);" title="' + tit + '" data-type="3" data-source=\'' + JSON.stringify(it) + '\' data-code="' + it.foodCode + '" class="code" style="text-decoration: none;font-weight:normal; cursor:pointer;  display:block; width:100%;" data-code="' + it.foodCode + '">' + fname + '</a>';
            html += '</span>';
            html += '<span class="layui-col-xs4" style="text-align:right; display:none;" >';

            html += '<a herf="javascript(0);" data-type="3" data-source=\'' + JSON.stringify(it) + '\' class="code" style="text-decoration: none;font-weight:normal; cursor:pointer;" data-code="' + it.foodCode + '">+</a>';
            html += '</span></div>';

        });
        $("#d2").append(html);
        bindCodeClick(patCode, isPC);
    });
}

function bindCodeClick(patCode, isPC) {
    $(".code").bind("dblclick", function () {
        var html = "";
        var meal = $("select[name='sel_meal']").find("option:selected").text();;//$("#sel_meal").val();
        var mealid = $("select[name='sel_meal']").find("option:selected").val();;//$("#sel_meal").val();
        var daynum = $("#DayNum").val();
        var data = $(this).data("source");
        var istrue = true;
        var type = parseInt($(this).data("type"));
        $("#td" + daynum).parent().find("th:first").find("span[lang=viewState]").text('(||)');

        if (type == 3) {
            //var t= $("#td"+daynum).find('input[name="t_num'+data.foodCode+'"]').val();
            //if (t!=undefined) {
            //    $("#td"+daynum).find('input[name="t_num'+data.foodCode+'"]').val(parseInt( t)+1);

            //}
            $("#td" + daynum).find('input[name="t_num' + daynum + mealid + data.foodCode + '"]').each(function () {

                var mealval = $("#td" + daynum).find($(this)).parent().find('input[name="t_mealid' + daynum + '"]').val();
                if (mealval == mealid) {
                    $(this).val($(this).val());
                    istrue = false;
                }
            });
            if (istrue) {
                html += ' <tr lang=' + mealid + ' accesskey="10000"><td width="7%"><label style="display:none;">' + mealid + '</label>' + meal + '</td></td>';
                html += '<td width="20%">' + data.foodName + '</td>';
                html += '<td width="33%">' + data.foodName + '</td>';
                html += '<td width="20%"><input type="text"  style="width:78%;" class="txt_num" name="t_num' + daynum + mealid + data.foodCode + '"  onkeypress="return isnumber(event);" autocomplete="off"  value=""/><span> g</span>';
                html += '<input type="hidden" class="txt_num" name="t_type' + daynum + '" value="' + type + '" />';
                html += '<input type="hidden" name="t_name' + daynum + '" value="' + data.foodName + '" />';
                html += '<input type="hidden" name="t_code' + daynum + '" value="' + data.foodCode + '" />';
                html += '<input type="hidden" name="t_meal' + daynum + '" value="' + meal + '" />';
                html += '<input type="hidden" name="t_mealid' + daynum + '" value="' + mealid + '" />';
                html += '<input type="hidden" name="t_unit' + daynum + '" value="" />';
                html += '<input type="hidden" name="t_foodcode' + daynum + mealid + data.foodCode + '" value="" />';
                html += '<input type="hidden" name="t_foodname' + daynum + mealid + data.foodCode + '" value="" />';
                html += '<input type="hidden" name="t_foodid' + daynum + '" value="0" />';
                html += '</td>';
                //html+='<td ><input type="checkbox" value="1"  onkeypress="return isnumber(event);" name="iscity'+data.foodCode+'" style="display:block"/></td>';
                html += '<td width="10%"><div class="layui-col-xs12" style="text-align: center;">';
                html += '<input name="iscity' + daynum + mealid + data.foodCode + '" value="1" lay-skin="primary" id=' + daynum + ' lay-filter="iscity' + daynum + mealid + data.foodCode + '" onclick="GetDayanalysis(this,1);" type="checkbox" lang="selBox">';
                html += '<div class="layui-unselect layui-form-checkbox" onclick="clickCheckbox(this);" lay-skin="primary"><i class="layui-icon" style="color:#fff;padding:0; margin:0;">';
                html += '</i></div></div></td>';
                // html+='<td><div class="layui-col-xs12" style="display:block" style="text-align: center;"><input type="checkbox" name="iscity'+data.foodCode+'" value="1" lang="selBox" lay-skin="primary" lay-filter="iscity'+data.foodCode+'"></div></td>';
                html += '<td><a herf="javascript(0);" data-id="' + daynum + '" class="fooddel" style="text-decoration: none;font-weight:normal; cursor:pointer; border: 1px solid #ccc; padding: 0 3px; padding-bottom: 3px;" " onclick=\"bindDelClick(this);\">×</a>&nbsp;';
                html += '<a herf="javascript(0);" class="foodMove" style="text-decoration: none; font-weight: normal; cursor: pointer; border: 1px solid #ccc; padding: 0 3px; padding-bottom: 3px;" onclick="bindMovelClick(this,0,\'' + patCode + '\',' + isPC + ');">↑</a>&nbsp;';
                html += '<a herf="javascript(0);" class="foodMove" style="text-decoration: none; font-weight: normal; cursor: pointer; border: 1px solid #ccc; padding: 0 3px; padding-bottom: 3px;" onclick="bindMovelClick(this,1.\'' + patCode + '\',' + isPC + ');">↓</a>';
                html += '</td></tr>';
            }

        } else if (type == 2) {

            $("#td" + daynum).find('input[name="t_num' + daynum + mealid + data.preparationCode + '"]').each(function () {

                var mealval = $("#td" + daynum).find($(this)).parent().find('input[name="t_mealid' + daynum + '"]').val();
                if (mealval == mealid) {
                    $(this).val(parseInt($(this).val()) + parseInt(data.guiGe));
                    istrue = false;
                }
            });
            if (istrue) {

                var tempfullname = data.fullName;
                html += ' <tr lang=' + mealid + ' accesskey="10000"><td width="7%"><label style="display:none;">' + mealid + '</label>' + meal + '</td></td>';
                html += '<td width="20%">' + tempfullname + '</td>';
                html += '<td width="33%">' + tempfullname + '</td>';
                html += '<td width="20%"><input type="text" style="width:78%;" class="txt_num" name="t_num' + daynum + mealid + data.preparationCode + '" onkeypress="return isnumber(event);" value="' + data.guiGe + '"/><span> ' + data.guiGeUnit + '</span>';
                html += '<input type="hidden" class="txt_num" name="t_type' + daynum + '" value="' + type + '" />';
                html += '<input type="hidden" name="t_name' + daynum + '" value="' + data.fullName + '" />';
                html += '<input type="hidden" name="t_code' + daynum + '" value="' + data.preparationCode + '" />';
                html += '<input type="hidden" name="t_meal' + daynum + '" value="' + meal + '" />';
                html += '<input type="hidden" name="t_mealid' + daynum + '" value="' + mealid + '" />';
                html += '<input type="hidden" name="t_unit' + daynum + '" value="' + data.guiGeUnit + '" />';
                html += '<input type="hidden" name="t_foodcode' + daynum + mealid + data.preparationCode + '" value="" />';
                html += '<input type="hidden" name="t_foodname' + daynum + mealid + data.preparationCode + '" value="" />';
                html += '<input type="hidden" name="t_foodid' + daynum + '" value="0" />';
                html += '</td>';
                // html += '<td width="10%"><input type="checkbox" value="0" name="iscity' + daynum + mealid + data.preparationCode + '" style=""/></td>';
                html += '<td width="10%"><span>--</span></td>';
                html += '<td><a herf="javascript(0);" data-id="' + daynum + '" class="fooddel" style="text-decoration: none;font-weight:normal; cursor:pointer; border: 1px solid #ccc; padding: 0 3px; padding-bottom: 3px;" onclick=\"bindDelClick(this);\">×</a>&nbsp;';
                html += '<a herf="javascript(0);" class="foodMove" style="text-decoration: none; font-weight: normal; cursor: pointer; border: 1px solid #ccc; padding: 0 3px; padding-bottom: 3px;" onclick="bindMovelClick(this,0,\'' + patCode + '\',' + isPC + ');">↑</a>&nbsp;';
                html += '<a herf="javascript(0);" class="foodMove" style="text-decoration: none; font-weight: normal; cursor: pointer; border: 1px solid #ccc; padding: 0 3px; padding-bottom: 3px;" onclick="bindMovelClick(this,1,\'' + patCode + '\',' + isPC + ');">↓</a>';
                html += '</td></tr>';
            }


        } else if (type == 1) {
            var foodname = "";
            var foodnum = "";
            var foodcode = "";
            var foodnames = "";
            var foodnums = "";
            var foodcodes = "";
            $.ajaxSetup({
                async: false
            });
            $.get("/TreatmentCenter/NutritionRecipeManagement/MenuDetailSet", { id: data.menuCode }, function (dt) {
                $.each(dt, function (index, it) {
                    foodname += it.foodName + ",";
                    foodnum += it.quantity + ',';
                    foodcode += it.foodCode + ',';


                });
                if (foodname.length > 0) {
                    foodname = foodname.substring(0, foodname.length - 1);
                    foodnum = foodnum.substring(0, foodnum.length - 1);
                    foodcode = foodcode.substring(0, foodcode.length - 1);
                }

            }, "json");
            //var t= $("#td"+daynum).find('input[name="t_num'+data.menuCode+'"]').val();

            //if (t!=undefined) {
            //    var numlist=t.split(",");

            //    var txtnumlist=foodnum.split(",");
            //    var tempstr="";
            //    for (var i = 0; i < numlist.length; i++) {

            //        tempstr+=(parseInt(numlist[i])+parseInt(txtnumlist[i]))+",";

            //    }
            //    if(tempstr.length>0)
            //        tempstr=tempstr.substring(0,tempstr.length-1);
            //    $("#td"+daynum).find('input[name="t_num'+data.menuCode+'"]').val(tempstr);

            //}

            $("#td" + daynum).find('input[name="t_num' + daynum + mealid + data.menuCode + '"]').each(function () {
                var mealval = $("#td" + daynum).find($(this)).parent().find('input[name="t_mealid' + daynum + '"]').val();
                if (mealval == mealid) {
                    var numlist = $(this).val().split(",");

                    var txtnumlist = foodnum.split(",");
                    var tempstr = "";
                    for (var i = 0; i < numlist.length; i++) {

                        tempstr += (parseInt(numlist[i]) + parseInt(txtnumlist[i])) + ",";

                    }
                    if (tempstr.length > 0)
                        tempstr = tempstr.substring(0, tempstr.length - 1);
                    $(this).val(tempstr);
                    istrue = false;
                }
            });
            if (istrue) {
                html += ' <tr lang=' + mealid + ' accesskey="10000"><td width="7%"><label style="display:none;">' + mealid + '</label>' + meal + '</td></td>';
                html += '<td width="20%">' + data.menuName + '</td>';
                html += '<td width="33%">' + foodname + '</td>';
                html += '<td width="20%"><input type="text"  style="width:78%;" onkeypress="return isnumber(event);" class="txt_num" name="t_num' + daynum + mealid + data.menuCode + '" value="' + foodnum + '"/><span> g</span>';
                html += '<input type="hidden" name="t_type' + daynum + '" value="' + type + '" />';
                html += '<input type="hidden" name="t_code' + daynum + '" value="' + data.menuCode + '" />';
                html += '<input type="hidden" name="t_name' + daynum + '" value="' + data.menuName + '" />';
                html += '<input type="hidden" name="t_foodcode' + daynum + mealid + data.menuCode + '" value="' + foodcode + '" />';
                html += '<input type="hidden" name="t_foodname' + daynum + mealid + data.menuCode + '" value="' + foodname + '" />';
                html += '<input type="hidden" name="t_meal' + daynum + '" value="' + meal + '" />';
                html += '<input type="hidden" name="t_mealid' + daynum + '" value="' + mealid + '" />';
                html += '<input type="hidden" name="t_unit' + daynum + '" value="" />';
                html += '<input type="hidden" name="t_foodid' + daynum + '" value="0" />';
                html += '</td>';
                //html += '<td width="10%"><input type="checkbox" value="0" name="iscity' + daynum + mealid + data.menuCode + '" style=""/></td>';
                html += '<td width="10%"><span>--</span></td>';
                html += '<td><a herf="javascript(0);" data-id="' + daynum + '" class="fooddel" style="text-decoration: none;font-weight:normal; cursor:pointer; border: 1px solid #ccc; padding: 0 3px; padding-bottom: 3px;" onclick=\"bindDelClick(this);\">×</a>&nbsp;';
                html += '<a herf="javascript(0);" class="foodMove" style="text-decoration: none; font-weight: normal; cursor: pointer; border: 1px solid #ccc; padding: 0 3px; padding-bottom: 3px;" onclick="bindMovelClick(this,0,\'' + patCode + '\',' + isPC + ');">↑</a>&nbsp;';
                html += '<a herf="javascript(0);" class="foodMove" style="text-decoration: none; font-weight: normal; cursor: pointer; border: 1px solid #ccc; padding: 0 3px; padding-bottom: 3px;" onclick="bindMovelClick(this,1,\'' + patCode + '\',' + isPC + ');">↓</a>';
                html += '</td></tr>';
            }

        }

        var s1 = $("div[lang=tabContent]").find("#td" + daynum).find("tr[accesskey=10000][lang=1]").size();
        var s2 = $("div[lang=tabContent]").find("#td" + daynum).find("tr[accesskey=10000][lang=2]").size();
        var s3 = $("div[lang=tabContent]").find("#td" + daynum).find("tr[accesskey=10000][lang=3]").size();
        var s4 = $("div[lang=tabContent]").find("#td" + daynum).find("tr[accesskey=10000][lang=4]").size();
        var s5 = $("div[lang=tabContent]").find("#td" + daynum).find("tr[accesskey=10000][lang=5]").size();
        var s6 = $("div[lang=tabContent]").find("#td" + daynum).find("tr[accesskey=10000][lang=6]").size();
        var r1 = s1 > 0 ? 1 : s1;
        var r2 = s2 > 0 ? 1 : s2;
        var r3 = s3 > 0 ? 1 : s3;
        var r4 = s4 > 0 ? 1 : s4;
        var r5 = s5 > 0 ? 1 : s5;
        var r6 = s6 > 0 ? 1 : s6;

        if ($("#td" + daynum).find('tr[accesskey=10000][lang=' + mealid + ']').size() > 0) {//该餐次已有配餐
            $("#td" + daynum).find('tr[accesskey=10000][lang=' + mealid + ']:last').after(html);
        } else {//没有配餐
            if (mealid == "1") {
                if (r2 > 0) {
                    $("#td" + daynum).find('tr[accesskey=10000][lang=2]:first').before(html);
                } else if (r3 > 0) {
                    $("#td" + daynum).find('tr[accesskey=10000][lang=3]:first').before(html);
                } else if (r4 > 0) {
                    $("#td" + daynum).find('tr[accesskey=10000][lang=4]:first').before(html);
                } else if (r5 > 0) {
                    $("#td" + daynum).find('tr[accesskey=10000][lang=5]:first').before(html);
                } else if (r6 > 0) {
                    $("#td" + daynum).find('tr[accesskey=10000][lang=6]:first').before(html);
                } else {
                    if ($("#td" + daynum).append(html));
                }
            } else if (mealid == "2") {
                if (r3 > 0) {
                    $("#td" + daynum).find('tr[accesskey=10000][lang=3]:first').before(html);
                } else if (r4 > 0) {
                    $("#td" + daynum).find('tr[accesskey=10000][lang=4]:first').before(html);
                } else if (r5 > 0) {
                    $("#td" + daynum).find('tr[accesskey=10000][lang=5]:first').before(html);
                } else if (r6 > 0) {
                    $("#td" + daynum).find('tr[accesskey=10000][lang=6]:first').before(html);
                } else {
                    if ($("#td" + daynum).append(html));
                }
            } else if (mealid == "3") {
                if (r4 > 0) {
                    $("#td" + daynum).find('tr[accesskey=10000][lang=4]:first').before(html);
                } else if (r5 > 0) {
                    $("#td" + daynum).find('tr[accesskey=10000][lang=5]:first').before(html);
                } else if (r6 > 0) {
                    $("#td" + daynum).find('tr[accesskey=10000][lang=6]:first').before(html);
                } else {
                    if ($("#td" + daynum).append(html));
                }
            }
            else if (mealid == "4") {
                if (r5 > 0) {
                    $("#td" + daynum).find('tr[accesskey=10000][lang=5]:first').before(html);
                } else if (r6 > 0) {
                    $("#td" + daynum).find('tr[accesskey=10000][lang=6]:first').before(html);
                } else {
                    if ($("#td" + daynum).append(html));
                }
            }
            else if (mealid == "5") {
                if (r6 > 0) {
                    $("#td" + daynum).find('tr[accesskey=10000][lang=6]:first').before(html);
                } else {
                    if ($("#td" + daynum).append(html));
                }
            } else if (mealid == 6) {
                if (r5 > 0) {
                    $("#td" + daynum).find('tr[accesskey=10000][lang=5]:last').after(html);
                } else if (r4 > 0) {
                    $("#td" + daynum).find('tr[accesskey=10000][lang=4]:last').after(html);
                } else if (r3 > 0) {
                    $("#td" + daynum).find('tr[accesskey=10000][lang=3]:last').after(html);
                } else if (r2 > 0) {
                    $("#td" + daynum).find('tr[accesskey=10000][lang=2]:last').after(html);
                } else if (r1 > 0) {
                    $("#td" + daynum).find('tr[accesskey=10000][lang=1]:last').after(html);
                } else {
                    if ($("#td" + daynum).append(html));
                }
            }
        }
        $("div[lang=tabContent]").find("tr[accesskey=10000]").each(function () {
            var col = getColor(this.lang);
            $(this).css({ 'background-color': col });
        });
        //bindDelClick();
        CalculationNutrition(0, patCode, isPC);
        bindBlur(patCode, isPC);

    });
}

function bindBlur(patCode, isPC) {
    $(".txt_num").change(function () {
        var v = $(this).val();
        if (v.length <= 0) {
            $(this).val();
        } else {
            var reg = /[\u4e00-\u9fa5]/g;
            var vl = v.replace(reg, "");
            $(this).val(vl);
        }
        CalculationNutrition(0, patCode, isPC);
    });
}
//计算营养素
function CalculationNutrition(day, patCode, isPC) {
    var daynum = day;
    if (daynum <= 0) {
        daynum = $("#DayNum").val();
    } 
    var source = "";
    if ($("#td" + daynum).find("tr").length > 0) {
        $("#td" + daynum).find("tr").each(function () {
            var meal = $(this).find("input[name='t_mealid" + daynum + "']").val(); //餐次
            var type = $(this).find("input[name='t_type" + daynum + "']").val(); //类型
            var code = $(this).find("input[name='t_code" + daynum + "']").val(); //编号
            var num = $(this).find("input[name='t_num" + daynum + meal + code + "']").val(); //数量
            var iscity = $(this).find("input[name='iscity" + daynum + meal + code + "']:checked").val(); //是否非市品
            var isNonCity = iscity == undefined ? 0 : iscity;
            var t = ""; 
            if (type == '2' || type == "3") {
                if (type == "2")
                    t = 1;
                else t = 2;
                source += t + "," + code + "," + num + "," + isNonCity + "," + meal + "|"; 
            } else {
                t = 2;
                var codes = $(this).find("input[name='t_foodcode" + daynum + meal + code + "']").val(); //食谱食材
                var nums = $(this).find("input[name='t_num" + daynum + meal + code + "']").val(); //数量
                var codelist = codes.split(',');
                var numlist = nums.split(','); 
                for (var i = 0; i < codelist.length; i++) {
                    source += t + "," + codelist[i] + "," + numlist[i] + "," + isNonCity + "," + meal + "|";
                }
            }

        });
    }
    if (source.length > 0) {
        source = source.substring(0, source.length - 1);
    }
    var url = '/TreatmentCenter/ShareManagement/GetAccommodationNutrientData'; 
    var data = { type: 0, days: daynum, contentStr: source, patCode: patCode, isPC: isPC };
    CalculationDietNutrition(0, url, data, headers);
}

function InitCalculationNutrition(patCode, isPC) {
    var url = '/TreatmentCenter/ShareManagement/GetInitAccommodationNutrientData';
    var data = {patCode: patCode, isPC: isPC };
    CalculationDietNutrition(0, url, data, headers);
}

function sel_librarytype(type, cpSelData,cnSelData, scSelData,fm,patCode,isPC) {
    if (type==2) {//肠内
        //搜索框绑定肠内数据
    /*var cnData = @Html.Raw(selStrcs);
        $("#searchSD").autocomplete(cnData, {
            minChars: 0,
            width: 240,
            matchContains: true,
            autoFill: false,
            formatItem: function(row, i, max) {
                return row.name;
            },
            formatMatch: function(row, i, max) {
                return row.name + "" + row.helpCode;
            },
            formatResult: function(row) {
                return row.name;
            }
        }).result(function(event, row, formatted) {
            var code = row.code;
            //if ($("#d1").find("div[id=" + code + "]").size() == 0) {
            var name = row.name;
            var tname = row.name;
            if (tname.length > 12) {
                tname = tname.substring(0, 12) + "...";
            } else {
                name = "";
            }
            var fl_html = '';
            var dt = { preparationCode: row.code, fullName: row.name, guiGeUnit: row.guiGeUnit, guiGe: row.guiGe, guiGeName: row.guiGeName };

            fl_html += '<span class="layui-col-xs8" style="text-align:left;padding-top:10px;padding-left:10px;" >';

            fl_html += '<a href="javascript:void(0);" title="' + row.name + '" class="code" style="text-decoration: none;font-weight:normal; cursor:pointer;" data-code="' + code + '">' + tname + '</a>';
            fl_html += '</span>';
            html += '<span class="layui-col-xs4" style="text-align:right;padding-top:10px;padding-right:10px;" >';

            fl_html += '<a href="javascript:void(0);" data-type="2" data-source=\'' + JSON.stringify(dt) + '\'   class="code" style="text-decoration: none;font-weight:normal; cursor:pointer;" data-code="' + code + '">+</a>';
            fl_html += '</span>';
            $("#d2").html(fl_html);
            bindCodeClick('',isPC);
            //}
        });*/

        //绑定类别下拉框并注册选择事件
        $('select[name=sel_type]').html(cnSelData);
        fm.win_render('select');
        //绑定选择列表数据
        BindingCN(0, patCode,1, isPC);
    }
    else if (type==3) {
          /*var foodData = @Html.Raw(selStr);
        $("#searchSD").autocomplete(foodData, {
            minChars: 0,
            width: 240,
            matchContains: true,
            autoFill: false,
            formatItem: function(row, i, max) {
                return row.name;
            },
            formatMatch: function(row, i, max) {
                return row.name + "" + row.helpCode;
            },
            formatResult: function(row) {
                return row.name;
            }
        }).result(function(event, row, formatted) {
            var code = row.code;
            //if ($("#d1").find("div[id=" + code + "]").size() == 0) {
            var name = row.name;
            var tname = row.name;
            if (tname.length > 12) {
                tname = tname.substring(0, 12) + "...";
            } else {
                name = "";
            }
            var fl_html='';
            var dt={foodCode:code,foodName:tname};

            fl_html+='<span class="layui-col-xs8" style="text-align:left;padding-top:10px;padding-left:10px;" >';

            fl_html+='<a href="javascript:void(0);" title="'+row.name+'" class="code" style="text-decoration: none;font-weight:normal; cursor:pointer;" data-code="'+code+'">'+tname+'</a>';
            fl_html+='</span>';
            fl_html+='<span class="layui-col-xs4" style="text-align:right;padding-top:10px;padding-right:10px;" >';

            fl_html+='<a herf="javascript(0);" data-type="3" data-source=\''+JSON.stringify(dt)+'\'   class="code" style="text-decoration: none;font-weight:normal; cursor:pointer;" data-code="'+code+'">+</a>';
            fl_html+='</span>';
            $("#d2").html(fl_html);
            bindCodeClick('',isPC);
            //}
        });*/
        //绑定类别下拉框并注册选择事件
        $('select[name=sel_type]').html(scSelData);
        fm.win_render('select');
        //绑定选择列表数据
        BindingFood(0, patCode, isPC);
    }
    else if (type==1) {
        /*var meunData = @Html.Raw(selStrmeun);
        $("#searchSD").autocomplete(meunData, {
            minChars: 0,
            width: 240,
            matchContains: true,
            autoFill: false,
            formatItem: function(row, i, max) {
                return row.name;
            },
            formatMatch: function(row, i, max) {
                return row.name + "" + row.helpCode;
            },
            formatResult: function(row) {
                return row.name;
            }
        }).result(function(event, row, formatted) {
            var code = row.code;
            //if ($("#d1").find("div[id=" + code + "]").size() == 0) {
            var name = row.name;
            var tname = row.name;
            if (tname.length > 12) {
                tname = tname.substring(0, 12) + "...";
            } else {
                name = "";
            }
            var fl_html='';
            var dt={menuCode:code,menuName:tname};
            //fl_html+='<div class="trr" id="'+code+'">';
            //fl_html+='<span class="layui-col-xs9" style="text-align:left;padding-left:10px;">'+tname+'</span>';
            //fl_html+='<span class="layui-col-xs2" style="text-align:left;padding-left:10px;"><input type="text" maxlength="6" class="layui-input" id="txt_'+code+'" lang="'+tname+'" style="height: 30px; margin-top: 2px;" lay-verify="order" onchange="CheckInputValue(this);" value="" /></span>';
            //fl_html+='<span class="layui-col-xs1" style="text-align:center;"><a style=\"text-decoration:none;cursor:pointer;\" onclick=\"RemoveFood(this);\">×</a></span>';
            //fl_html+='</div>';


            fl_html+='<span class="layui-col-xs8" style="text-align:left;padding-top:10px;padding-left:10px;" >';

            fl_html+='<a href="javascript:void(0);" title="'+row.name+'" class="code" style="text-decoration: none;font-weight:normal; cursor:pointer;" data-code="'+code+'">'+tname+'</a>';
            fl_html+='</span>';
            fl_html+='<span class="layui-col-xs4" style="text-align:right;padding-top:10px;padding-right:10px;" >';

            fl_html+='<a href="javascript:void(0);" data-type="1" data-source=\''+JSON.stringify(dt)+'\'   class="code" style="text-decoration: none;font-weight:normal; cursor:pointer;" data-code="'+code+'">+</a>';
            fl_html+='</span>';

            $("#d2").html(fl_html);
            bindCodeClick('',isPC);
            //}
        });*/
        //绑定类别下拉框并注册选择事件
        $('select[name=sel_type]').html(cpSelData);  
        fm.win_render('select');
        //绑定选择列表数据
        BindingMenu(0, patCode, isPC);
    } 
}

function getColor(l) {
    var color = '';
    var s1 = $("div[lang=tabContent]").find("tr[accesskey=10000][lang=1]").size();
    var s2 = $("div[lang=tabContent]").find("tr[accesskey=10000][lang=2]").size();
    var s3 = $("div[lang=tabContent]").find("tr[accesskey=10000][lang=3]").size();
    var s4 = $("div[lang=tabContent]").find("tr[accesskey=10000][lang=4]").size();
    var s5 = $("div[lang=tabContent]").find("tr[accesskey=10000][lang=5]").size();
    var s6 = $("div[lang=tabContent]").find("tr[accesskey=10000][lang=6]").size();
    var r1 = s1 > 0 ? 1 : s1;
    var r2 = s2 > 0 ? 1 : s2;
    var r3 = s3 > 0 ? 1 : s3;
    var r4 = s4 > 0 ? 1 : s4;
    var r5 = s5 > 0 ? 1 : s5;
    var r6 = s6 > 0 ? 1 : s6;
    if (l == "1") {
        color = '';
    }
    else if (l == "2") {
        if (r1 > 0) {
            color = '#F4F8FB';
        } else {
            color = '';
        }
    }
    else if (l == "3") {
        if ((r1 + r2) % 2 == 0) {
            color = '';
        } else {
            color = '#F4F8FB';
        }
    }
    else if (l == "4") {
        if ((r1 + r2 + r3) % 2 == 0) {
            color = '';
        } else {
            color = '#F4F8FB';
        }
    }
    else if (l == "5") {
        if ((r1 + r2 + r3 + r4) % 2 == 0) {
            color = '';
        } else {
            color = '#F4F8FB';
        }
    }
    else if (l == "6") {
        if ((r1 + r2 + r3 + r4 + r5) % 2 == 0) {
            color = '';
        } else {
            color = '#F4F8FB';
        }
    }
    return color;
}