/** index.js By Beginner Emain:zheng_jinfan@126.com HomePage:http://www.zhengjinfan.cn */

layui.define(['layer', 'navbar', 'tab'], function (exports) {
    var $ = layui.jquery,
        layer = layui.layer,
        navbar = layui.navbar();
    var object = {
        win_createTab: function(elem) {
            return layui.tab({
                elem: '.admin-nav-card' //设置选项卡容器
                ,
                maxSetting: {
                    max: 4,
                    tipMsg: '只能同时开4个操作窗口，不能再开了。真的。'
                },
                contextMenu: true,
                onSwitch: function(data) {
                    //console.log(data.id); //当前Tab的Id
                    //console.log(data.index); //得到当前Tab的所在下标
                    //console.log(data.elem); //得到当前的Tab大容器

                    //console.log(tab.getCurrentTabId())
                },
                closeBefore: function(obj) { //tab 关闭之前触发的事件
                    //console.log(obj);
                    //obj.title  -- 标题
                    //obj.url    -- 链接地址
                    //obj.id     -- id
                    //obj.tabId  -- lay-id
                    if (obj.title === 'BTable') {
                        layer.confirm('确定要关闭' + obj.title + '吗?', { icon: 3, title: '系统提示' }, function(index) {
                            //因为confirm是非阻塞的，所以这里关闭当前tab需要调用一下deleteTab方法
                            tab.deleteTab(obj.tabId);
                            layer.close(index);
                        });
                        //返回true会直接关闭当前tab
                        return false;
                    } else if (obj.title === '表单') {
                        layer.confirm('未保存的数据可能会丢失哦，确定要关闭吗?', { icon: 3, title: '系统提示' }, function(index) {
                            tab.deleteTab(obj.tabId);
                            layer.close(index);
                        });
                        return false;
                    }
                    return true;
                }
            });
        },
        win_createNavbar: function(elem, data, side, tab) {
            //设置navbar
            navbar.set({
                spreadOne: true,
                elem: '#admin-navbar-side',
                cached: true,
                data: window.navData
                /*cached:true,
                url: 'datas/nav.json'*/
            });
            //渲染navbar
            navbar.render();
            //监听点击事件
            navbar.on('click(' + side + ')', function(data) {
                tab.tabAdd(data.field);
            });
        },
        win_resize: function(elem, fix) {
            //iframe自适应
            $(window).on('resize', function() {
                var $content = $(elem);
                $content.height($(this).height() - fix);
                $content.find('iframe').each(function() {
                    $(this).height($content.height());
                });
            }).resize();
        }
    };

    exports('winSystem', object); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
});
