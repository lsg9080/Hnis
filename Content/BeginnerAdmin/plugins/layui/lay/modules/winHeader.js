/** index.js By Beginner Emain:zheng_jinfan@126.com HomePage:http://www.zhengjinfan.cn */
var cook;
layui.define(['layer','winCookie'], function (exports) {
    var $ = layui.jquery,
        layer = layui.layer;
         cook = layui.winCookie;
    var object = {
        win_configHeader: function(dut) {
            $("#headerNav").find("a[lang=nav]").each(function(i, n) {
                $(n).click(function() {
                    cook.win_setCookie("navId", n.id);
                    setNavStyle();
                });
            });
           
            var navid = cook.win_getCookie("navId"); 
            if (navid == null || navid == "undefined")navid = $("#headerNav").find("a:first").attr("id");
            $("#" + navid).click();

            var l = $('#admin-side').text().length;
            if (l > 0) {
                $('.admin-side-toggle').show();
                $('.admin-side-toggle').on('click', function() {
                    var sideWidth = $('#admin-side').width();
                    if (parseInt(sideWidth) == 200) {
                        $('#admin-body').animate({
                            left: '0'
                        }); //admin-footer
                        $('#admin-footer').animate({
                            left: '0'
                        });
                        $('#admin-side').animate({
                            width: '0'
                        });
                        $('#admin-navbar-side').animate({
                            width: '0'
                        });

                    } else {
                        $('#admin-body').animate({
                            left: '200px'
                        });
                        $('#admin-footer').animate({
                            left: '200px'
                        });
                        $('#admin-side').animate({
                            width: '200px'
                        });
                        $('#admin-navbar-side').animate({
                            width: '200px'
                        });
                    }
                });
            }
            $('.admin-side-full').on('click', function() {
                var docElm = dut.documentElement;
                //W3C  
                if (docElm.requestFullscreen) {
                    docElm.requestFullscreen();
                    layer.msg('按Esc即可退出全屏');
                }
                //FireFox  
                else if (docElm.mozRequestFullScreen) {
                    docElm.mozRequestFullScreen();
                    layer.msg('按Esc即可退出全屏');
                }
                //Chrome等  
                else if (docElm.webkitRequestFullScreen) {
                    docElm.webkitRequestFullScreen();
                    layer.msg('按Esc即可退出全屏');
                }
                //IE11
                else if (docElm.msRequestFullscreen) {
                    docElm.msRequestFullscreen();
                    layer.msg('按Esc即可退出全屏');
                } else {
                    //IE7、8
                    var shell = new ActiveXObject("WScript.Shell");
                    shell.SendKeys("{F11}");
                    layer.msg('按F11即可退出全屏');
                }

            });

            //锁屏
            //$(document).on('keydown', function() {
            //    var e = window.event;
            //    if (e.keyCode === 76 && e.altKey) {
            //        //alert("你按下了alt+l");
            //        lock($, layer);
            //    }
            //});
            $('#lock').on('click', function () {
                configNavStyle();
                lock($, layer);
            });
            if (cook.win_getCookie('lock') || isShowLock) {
                var lk = cook.win_getCookie('lock');
                if (lk == 'locked') $('#lock').click();
            }
        },
        win_resize: function(elem, fix) {
            var $content = $(window.document);
            $(elem).height($content.height() - fix);

        }
    };
    exports('winHeader', object); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
});

var isShowLock = false;
function lock($, layer) {
    cook.win_setCookie('lock','locked');
    if (isShowLock)
        return;
    //自定页
    layer.open({
        title: false,
        type: 1,
        closeBtn: 0,
        anim: 6,
        content: $('#lock-temp').html(),
        shade: [0.9, '#393D49'],
        success: function (layero, lockIndex) {
            isShowLock = true;
            //给显示用户名赋值
            //layero.find('div#lockUserName').text('admin');
            //layero.find('input[name=username]').val('admin');
            layero.find('input[name=lockPwd]').on('focus', function () {
                var $this = $(this);
                if ($this.val() == '输入密码解锁..') {
                    $this.attr('type', 'password');
                    $this.val('');
                }
            })
                .on('blur', function () {
                    var $this = $(this);
                    if ($this.val() == '' || $this.length == 0) {
                        $this.attr('type', 'text');
                        $this.val('输入密码解锁..');
                    }
                });
            //在此处可以写一个请求到服务端删除相关身份认证，因为考虑到如果浏览器被强制刷新的时候，身份验证还存在的情况			
            //do something...
            //e.g. 

            //$.getJSON('/Account/Logout', null, function (res) {
            //    if (!res.rel) {
            //        layer.msg(res.msg);
            //    }
            //}, 'json');

           
			/**
			 * 解锁操作方法
			 * @param {String} 用户名
			 * @param {String} 密码
			 */
            var unlock = function(pwd) {
                //console.log(un, pwd);
                //这里可以使用ajax方法解锁
                $.ajax({
                    type: 'POST',
                    url: '/ConfigCenter/UserManagement/UnLock',
                    headers:window.headers, 
                    data:{ password: pwd }, 
                    success: function(res) {
                        //验证成功
                        if (res.result) {
                            //关闭锁屏层
                            cook.win_delCookie('lock');
                            layer.close(lockIndex);
                            isShowLock = false;
                            setNavStyle();
                        } else {
                            layer.msg(res.msg, { icon: 2, time: 1000 });
                        }
                    },
                    dataType: 'json'
            });
                //isShowLock = false;
                //演示：默认输入密码都算成功
                //关闭锁屏层
                //cook.win_delCookie('lock');
                //layer.close(lockIndex);
            };
            //绑定解锁按钮的点击事件
            layero.find('button#unlock').on('click', function () {
                var $lockBox = $('div#lock-box');
                var pwd = $lockBox.find('input[id=lockPwd]').val();
                if (pwd === '输入密码解锁..' || pwd.length === 0) {
                    layer.msg('请输入密码..', {
                        icon: 2,
                        time: 1000
                    });
                    return;
                }
                unlock(pwd);
            });
        }
    });
}
function setNavStyle() {
    var o = cook.win_getCookie("navId"); 
    $("#" + o).addClass("layui-this");
    $("#" + o).css({ "color": "#000" });
}
function configNavStyle() {
    var o = cook.win_getCookie("navId");
    $("#" + o).css({ "color": "#fff" });
}