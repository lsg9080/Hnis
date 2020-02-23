/**  项目JS主入口
 *  以依赖Layui的layer和form模块为例
 **/
layui.define( ['winDialog','jquery'], function (exports) {
    var dialog = layui.winDialog, $ = layui.jquery;
    var object = {
        //分页
        win_laypage: function(elem, u, headers, fun) {
            var scroll = $(elem);
            $.ajax({
                type: 'GET',
                cache: false,
                url: u,
                dataType: "html",
                headers: headers,
                beforeSend: LoadAjaxLayer,
                success: page_callback,
                error: function(e) {
                    dialog.win_alert(e.responseText, "返回消息内容", 3);
                }
            });

            function page_callback(res) {
                if (res) {
                    if (scroll) {
                        scroll.html(res);
                        //替换HTML后执行需要的函数
                        if (fun) fun();
                    } else {
                        dialog.win_alert(res, "返回消息内容", 3);
                    }

                } else {
                    dialog.win_alert(res, "返回消息内容", 3);
                }
            }

            function LoadAjaxLayer() {
                scroll.html('<div style="height:' + scroll.height() + 'px;background:url(/Content/images/loading.gif) no-repeat center">&nbsp;</div>');;
            }
        },
         win_layThispanel: function(elem, u, headers, fun) {
            var scroll = $(elem);
            $.ajax({
                type: 'GET',
                cache: false,
                url: u,
                headers: headers,
                beforeSend: LoadAjaxLayer,
                success: page_callback,
                error: function(e) {
                    dialog.win_alert(e.responseText, "返回消息内容", 3);
                }
            });

            function page_callback(res) {
                var re1 = new RegExp('<table\\sid="view-Panel"([\\s\\S]+?)</table><span></span>', 'img');
                if (re1.test(res)) {
                    var html = RegExp.$1;
                    if (scroll) {
                        scroll.html(html)
                        //替换HTML后执行需要的函数
                        if (fun) fun();
                    } else {
                        dialog.win_alert(res, "返回消息内容", 3);
                    }

                } else {
                    dialog.win_alert(res, "返回消息内容", 3);
                }
            }

            function LoadAjaxLayer() {
                scroll.html('<div style="height:' + scroll.height() + 'px;background:url(/Content/images/loading.gif) no-repeat center">&nbsp;</div>');;
            }
        },
        win_layThispage: function(elem, u, headers, fun) {
            var scroll = $(elem);
            $.ajax({
                type: 'GET',
                cache: false,
                url: u,
                headers: headers,
                beforeSend: LoadAjaxLayer,
                success: page_callback,
                error: function(e) {
                    dialog.win_alert(e.responseText, "返回消息内容", 3);
                }
            });

            function page_callback(res) {
                var re1 = new RegExp('<tbody\\sid="tablescroll">([\\s\\S]+?)</tbody>', 'img');
                if (re1.test(res)) {
                    var html = RegExp.$1;
                    if (scroll) {
                        scroll.html(html)
                        //替换HTML后执行需要的函数
                        if (fun) fun();
                    } else {
                        dialog.win_alert(res, "返回消息内容", 3);
                    }

                } else {
                    dialog.win_alert(res, "返回消息内容", 3);
                }
            }

            function LoadAjaxLayer() {
                scroll.html('<div style="height:' + scroll.height() + 'px;background:url(/Content/images/loading.gif) no-repeat center">&nbsp;</div>');;
            }
        },
        win_layThispageUrl: function (elem, u, headers, fun,elm,fun2) {
            var scroll = $(elem);
            $.ajax({
                type: 'GET',
                cache: false,
                url: u,
                headers: headers,
                beforeSend: LoadAjaxLayer,
                success: page_callback,
                error: function (e) {
                    dialog.win_alert(e.responseText, "返回消息内容", 3);
                }
            });

            function page_callback(res) {
                var re1 = new RegExp('<div\\sid="Listscroll">([\\s\\S]+?)</div><span id="List"></span>', 'img');
                if (re1.test(res)) {
                    var html = RegExp.$1;
                    if (scroll) {
                        scroll.html(html)
                        //替换HTML后执行需要的函数
                        if (fun) fun();
                    } else {
                        dialog.win_alert(res, "返回消息内容", 3);
                    }

                } else {
                    dialog.win_alert(res, "返回消息内容", 3);
                }
                if (elm) {
                    var sll = $(elm);
                    var re2 = new RegExp('<div\\sid="searchZM">([\\s\\S]+?)</div><span id="ZM"></span>', 'img');
                    if (re2.test(res)) {
                        var hl = RegExp.$1;
                        if (sll) {
                            sll.html(hl);
                            //替换HTML后执行需要的函数
                            if (fun2) fun2();
                        } else {
                            dialog.win_alert(res, "返回消息内容", 3);
                        }

                    } else {
                        dialog.win_alert(res, "返回消息内容", 3);
                    }
                }
            }

            function LoadAjaxLayer() {
                scroll.html('<div style="height:' + scroll.height() + 'px;background:url(/Content/images/loading.gif) no-repeat center">&nbsp;</div>');;
            }
        },
        win_Appendlaypage: function(elem, u, headers, fun, currentPage, pages, msg) {
            var scroll = $(elem);
            if (currentPage <= pages) {
                $.ajax({
                    type: 'GET',
                    cache: false,
                    url: u,
                    headers: headers,
                    beforeSend: LoadAjaxLayer,
                    success: page_callback,
                    error: function(e) {
                        dialog.win_alert(e.responseText, "返回消息内容", 3);
                    }
                });
            } else {
                dialog.win_msg("没有可加载的" + msg + "数据了...", 5);
            }

            function page_callback(res) {
                if (res) {
                    if (scroll) {
                        scroll.append(res);
                        //替换HTML后执行需要的函数
                        if (fun) fun();
                    } else {
                        dialog.win_alert(res, "返回消息内容", 3);
                    }

                } else {
                    dialog.win_alert(res, "返回消息内容", 3);
                }
            }

            function LoadAjaxLayer() {
                dialog.win_msg("正在努力加载" + msg + "数据...");
            }
        },
        win_del: function(headers, href, id, fun, isParent) {
            var idx;
            var dlog = isParent || dialog;
            dlog.win_confirm('确认要删除记录吗?', '删除提示',
                function() {
                    $.ajax({ type: 'POST', data: { id: id }, dataType:"JSON", cache: false, url: href, headers: headers, beforeSend: LoadAjaxLayer, success: page_callback, error: function(e) { dialog.win_alert(e.responseText, '错误提示', 5); } });

                    function page_callback(res) {
                        if (res.result) {
                            //删除后需要执行的函数
                            if (fun) fun();
                            dlog.win_close(idx);
                            dlog.win_msg(res.msg,res.script);
                        } else {
                            dlog.win_close(idx);
                            dlog.win_alert("记录删除失败，请与管理员联系!", '结果提示', 5);
                        }
                    }

                    function LoadAjaxLayer(request) {
                        idx = dlog.win_load(1);
                    }
                });
        },
        win_redirectToLocal: function(u) {
            window.location.href = u;
        }
    };

    exports('winPager', object); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
});