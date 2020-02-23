/** index.js By Beginner Emain:zheng_jinfan@126.com HomePage:http://www.zhengjinfan.cn */
var dialog, $, idx;
layui.define(['tree','winDialog'], function (exports) {
    $ = layui.jquery;
    dialog = layui.winDialog;
    var object = {
        win_createTree: function(elem, check, nodes, fun) {
            layui.tree({
                elem: elem, //指定元素
                check: check, //勾选风格
                skin: 'as', //设定皮肤
                drag: true, //点击每一项时是否生成提示信息
                checkboxName: 'aa[]', //复选框的name属性值
                checkboxStyle: "display: none", //设置复选框的样式，必须为字符串，css样式怎么写就怎么写
                click: function(item,o) { //点击节点回调
                    // console.log("item")
                    if (fun) fun(item,o);
                },
                data: {
                    //为元素添加额外数据，即在元素上添加data-xxx="yyy"，可选
                    id: "xxx44545",
                    nodeName: "常用文件夹",
                    alias: "changyong"
                },
                nodes: nodes
            });
        },
        win_treeCheckedValues: function(elem) {
            var datas = '';
            $(elem).find("input[type=checkbox]:checked").each(function() {
                datas = datas + '€' + this.value;
            });
            if (datas.length > 0) datas = datas.substring(1);
            return datas;
        },
        win_treeNoCheckedValues:function(elem) {
            var datas = '';
            $(elem).find("input[type=checkbox]").not(":checked").each(function () {
                datas = datas + '€' + this.value;
            });
            if (datas.length > 0) datas = datas.substring(1);
            return datas;
        },
        //tree自适应
        win_resize: function(elem, fix) {
            var $content = $(window.parent.document);
            $(elem).height($content.height() - fix);
        }
    };
    exports('winTree', object); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
});

function del_Action(du,ru,id,headers) {
        dialog.win_confirm("确定要删除该节点吗", '提示消息', function () {
            $.ajax({ type: 'POST', data: { id: id }, cache: false, url: du, headers: headers, success: page_callback, error: function (e) { dialog.win_alert(e.responseText, '消息提示', 5); } });
            function page_callback(res) {
                if (res.result) {
                    window.document.location.href = ru + "?script=6";
                } else
                    dialog.win_alert("删除失败，请与管理员联系！", '消息提示', 5);
            }
        });
}

function closeOpen() {
    dialog.win_close(idx);
}