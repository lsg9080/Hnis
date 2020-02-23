/** index.js By Beginner Emain:zheng_jinfan@126.com HomePage:http://www.zhengjinfan.cn */

layui.define(['navbar'], function (exports) {
    var navbar = layui.navbar(), $ = layui.jquery;

    var object = {
        //局部ID，数据，监听布局，切换FRAME
        win_createNavbar: function(elem, data, side, iframe) {
            //设置navbar
            navbar.set({
                //spreadOne: false,
                elem: elem,
                cached: true,
                data: data
                /*cached:true,
                url: 'datas/nav.json'*/
            });
            //渲染navbar
            navbar.render();
            //监听点击事件
            navbar.on('click(' + side + ')', function(data) {
                // tab.tabAdd(data.field);
                $(iframe).attr("src", data.field.href);
            });
        },
        win_resize: function(elem, fix) {
            var $content = $(window.document);
            $(elem).height($content.height() - fix);

        }
    };
    //iframe自适应
    $(window).on('resize', function () {
        var $content = $('.admin-nav-card .layui-tab-content');
        $content.height($(this).height() - 80);
        $content.find('iframe').each(function () {
            $(this).height($content.height());
        });
    }).resize();
    exports('winDiagnosis', object); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
});