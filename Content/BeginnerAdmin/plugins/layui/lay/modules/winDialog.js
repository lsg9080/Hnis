/**  项目JS主入口
 *  以依赖Layui的layer和form模块为例
 **/
layui.define(['layer', 'jquery'], function (exports) {
    var $ = layui.jquery;
    $(function () {
        $("input[type=text]").each(function () {
            $(this).keypress(function (e) {
                var key = window.event ? e.keyCode : e.which;
                if (key.toString() == "13") {
                    return false;
                }
            });
            $(this).attr("autocomplete", "off");
        });

        if (window.history && window.history.pushState) {
            $(window).on('popstate', function () {
                /// 当点击浏览器的 后退和前进按钮 时才会被触发， 
                window.history.pushState('forward', null, '');
                window.history.forward(1);
            });
        }
        //
        window.history.pushState('forward', null, '');  //在IE中必须得有这两行
        window.history.forward(1);

    });
    var layer = layui.layer;
    layer.config({
        closeBtn: 1,  //可通过配置1和2来展示，如果不显示，则closeBtn: 0 默认：1
        shade: 0.5,  //默认是0.3透明度的黑色背景（'#000'）。如果你想定义别的颜色，可以shade: [0.8, '#393D49']；如果你不想显示遮罩，可以shade: 0
        shadeClose: false,  //设定shadeClose来控制点击弹层外区域关闭
        time: 0,  //默认不会自动关闭。当你想自动关闭时，可以time: 5000，即代表5秒后自动关闭，注意单位是毫秒（1秒=1000毫秒）
        id: "",     //设置该值后，不管是什么类型的层，都只允许同时弹出一个。一般用于页面层和iframe层模式
        anim: -1, // 目前anim可支持的动画类型有0-6 如果不想显示动画，设置 anim: -1 即可。另外需要注意的是，3.0之前的版本用的是 shift 参数
        isOutAnim: true, // 默认情况下，关闭层时会有一个过度动画。如果你不想开启，设置 isOutAnim: false 即可
        fixed: true,   //即鼠标滚动时，层是否固定在可视区域。如果不想，设置fixed: false即可
        maxmin: false, //该参数值对type:1和type:2有效。默认不显示最大小化按钮。需要显示配置maxmin: true即可
        resize: false, //默认情况下，你可以在弹层右下角拖动来拉伸尺寸。如果对指定的弹层屏蔽该功能，设置 false即可。该参数对loading、tips层无效
        scrollbar: false, //默认：true 默认允许浏览器滚动，如果设定scrollbar: false，则屏蔽
        resizing: null,   //默认：null 当你拖拽弹层右下角对窗体进行尺寸调整时，如果你设定了该回调，则会执行。回调返回一个参数：当前层的DOM对象
        maxWidth: 360,    //请注意：只有当area: 'auto'时，maxWidth的设定才有效。
        zIndex: 19891014,     //默认：19891014（贤心生日 0.0） 一般用于解决和其它组件的层叠冲突
        move: false,   //  默认：'.layui-layer-title' 默认是触发标题区域拖拽。如果你想单独定义，指向元素的选择器或者DOM即可。如move: '.mine-move'。你还配置设定move: false来禁止拖拽
        moveOut: false, // 默认只能在窗口内拖拽，如果你想让拖到窗外，那么设定moveOut: true即可
        moveEnd: null,       //默认不会触发moveEnd，如果你需要，设定moveEnd: function(layero){}即可。其中layero为当前层的DOM对象
        tips: 2,       //tips层的私有参数。支持上右下左四个方向，通过1-4进行方向设定。如tips: 3则表示在元素的下面出现。有时你还可能会定义一些颜色，可以设定tips: [1, '#c00']
        tipsMore: false, //允许多个意味着不会销毁之前的tips层。通过tipsMore: true开启
        success: null,     //当你需要在层创建完毕时即执行一些语句，可以通过该回调。success会携带两个参数，分别是当前层DOM当前层索引
        yes: null,   //该回调携带两个参数，分别为当前层索引、当前层DOM对象。
        cancel: null,    //该回调携带两个参数，分别为：当前层索引参数（index）、当前层的DOM对象（layero），默认会自动触发关闭。如果不想关闭，return false即可
        end: null    //无论是确认还是取消，只要层被销毁了，end都会执行，不携带任何参数。
    });
    var object = {
        //弹消息自动关闭
        win_msg: function(m, icon) {
            layer.msg(m, {
                icon: icon || 6,
                time: 2000
            });
        },
        //提示消息框
        win_alert: function(msg, tit, icon, area) {
            layer.alert(msg, {
                skin: 'layui-layer-molv',
                area: area || ['400px', '160px'],
                title: tit,
                icon: icon
            }); //这时如果你也还想执行yes回调，可以放在第三个参数中。
        },
        //提示消息框
        win_alert_confirm: function (msg, tit, trunFun) {
            layer.confirm(msg, {
                skin: 'layui-layer-molv',
                area: ['400px', '160px'],
                title: tit,
                icon: 6,
                btn: ['确定'], //可以无限个按钮
                yes: function (index, layero) {
                    //如果设定了yes回调，需进行手工关闭
                    if (trunFun) trunFun();
                    layer.close(index);
                }
            }); //这时如果你也还想执行yes回调，可以放在第三个参数中。
        },
        win_prompt: function(title, fun) {
            var index = layer.prompt({
                formType: 1,
                title: title || '这是啥',
                area: ['300px', '200px'] //自定义文本域宽高
        },function(val, index){
            layer.close(index);
            if(fun) fun(val);     
        });
            layui.jquery('#layui-layer' + index + " .layui-layer-input").css({'margin-bottom':'40px'});
        },
        //确认消息框
        win_confirm: function(msg, title, trunFun, falseFun,cancelFun) {
            layer.confirm(msg, {
                skin: 'layui-layer-molv',
                area: ['400px', '160px'],
                title: title,
                icon: 3,
                btn: ['确定', '取消'], //可以无限个按钮
                yes: function(index, layero) {
                    //如果设定了yes回调，需进行手工关闭
                    if (trunFun) trunFun();
                    layer.close(index);
                },
                btn2: function(index, layero) {
                    if (falseFun) falseFun();
                    layer.close(index);
                },
                cancel:function(){
                    if (cancelFun) cancelFun();
                }
            });
        },
         //提示消息框
        win_reform_alert: function (msg, tit, icon, area) {
            layer.alert(msg, {
                skin: 'layui-layer-molv',
                area: area || ['400px', '160px'],
                title: tit,
                btn: ['知道了！'], //可以无限个按钮
                icon: icon
            }); //这时如果你也还想执行yes回调，可以放在第三个参数中。
        },
        //弹出IFRAME屋
        win_open: function(url, title, area, fun) {
            /*iframe层 */
            return layer.open({
                //skin: 'layui-layer-molv',             
                title: title,
                area: area || ['85%', '85%'],
                type: 2,
                content: [url, 'no'],
                closeBtn: 1,
                end : function() {
                   if(fun) fun();
                }
            });
        },
        //弹出IFRAME屋
        win_reform_open: function (url, title, area, fun) {
            /*iframe层 */
            return layer.open({
                skin: 'layui-layer-molv',             
                title: title,
                area: area || ['85%', '85%'],
                btn: ['知道了！'],
                type: 2,
                content: [url, 'no'],
                closeBtn: 1,
                end: function () {
                    if (fun) fun();
                }
            });
        },
        //弹出IFRAME屋
        win_openLayer: function (url, area) {
            /*iframe层 */
            return layer.open({
                title: '',
                area: area || ['10%', '10%'],
                type: 2,
                content: [url, 'no'],
                closeBtn: 0
            });
        },
        //关闭弹出层
        win_close: function (idx) {
            layer.close(idx);
        }, //1在上边；2在右边；3在下边；4在左边；
        win_tips: function(elem, content, tips, tm, area) {

            var tp = tips || 4;
            var time = tm || 0;
            var ara = area || ['auto', 'auto'];
            //tips层
            return layer.tips(content, elem, { tips: tp, area: ara, time: time });
        }, //加载loading
        win_load: function (s) {
            return layer.load(s || 0,            
               {
                   shade: [0.6, '#000'] //0.1透明度的白色背景
               });
        },
        win_print: function (url,title,area) {
            /*iframe层 */
            return layer.open({
                //skin: 'layui-layer-molv',
                title: title,
                area: area || ['860px', '600px'],
                type: 2,
                moveType: 1,
                content: [url, 'no']
            });
        }
    };

    exports('winDialog', object); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致


});
function sleep(delay) {
    var start = (new Date()).getTime();
    while ((new Date()).getTime() - start < delay) {
        continue;
    }
}

