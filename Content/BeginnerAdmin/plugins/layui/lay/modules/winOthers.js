/**  项目JS主入口
 *  以依赖Layui的layer和form模块为例
 **/
layui.define( ['dialog', 'upload','jquery'], function (exports) {
    var $ = layui.jquery,
        dialog = layui.dialog;
    var object = {
        //上传文件
        win_upload: function(u, imgId) {
            layui.upload({
                url: u,
                ext: 'jpg|png|gif|pjpg|doc|docx|xls|clsx',
                before: function(input) {
                    dialog.win_msg("上传中.......")
                },
                success: function(res) {
                    dialog.win_msg("上传成功");
                    $("#" + imgId).attr("src", res.data.src)
                }
            });
        }
    };

    exports('winOthers', object); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
});



//var body = layer.getChildFrame('body', idx);
//var iframeWin = window[layero.find('iframe')[0]['name']];
////得到iframe页的窗口对象，执行iframe页的方法：
//iframeWin.method();  //得到iframe页的body内容
//body.find('input').val('Hi，我是从父页来的')