

$(function () {
    /**
     * input 在IE下placeholder兼容性处理
     */
    $('[placeholder]').each(
        function () {
            var self = $(this);
            var val = self.attr("placeholder");
            input(self, val);
        }
    );

alert(1)
    /**
     *  对password框的特殊处理
     * 1.创建一个text框 
     * 2.获取焦点和失去焦点的时候切换
     */
    $('input[type="password"]').each(
        function () {
            var pwdField = $(this);
            var pwdVal = pwdField.attr('placeholder');
            var pwdId = pwdField.attr('id');
            // 重命名该input的id为原id后跟1
            pwdField.after('<input id="' + pwdId + '1" type="text" value=' + pwdVal + ' autocomplete="off" />');
            var pwdPlaceholder = $('#' + pwdId + '1');
            pwdPlaceholder.show();
            pwdField.hide();

            pwdPlaceholder.focus(function () {
                pwdPlaceholder.hide();
                pwdField.show();
                pwdField.focus();
            });

            pwdField.blur(function () {
                if (pwdField.val() == '') {
                    pwdPlaceholder.show();
                    pwdField.hide();
                }
            });
        }
    );

});



/**
 * input 在IE下placeholder兼容性处理
 */
function input(obj, val) {
    var $input = obj;
    var val = val;
    // 初始化
    if ($input.val() == ""||$input.val() == val) {
        $input.attr({ value: val }).addClass('placeholder');
    }
    //替换placeholder
    $input.focus(function () {
        if ($input.val() != val) {
            $(this).val('').removeClass('placeholder');
        }
    }).blur(function () {
        if ($input.val() == ""||$input.val() == val) {
            $(this).val(val).addClass('placeholder');
        }
    })
}
/*
$('[placeholder]').focus(function () {
    var input = $(this);
    if (input.val() == input.attr('placeholder')) {
        input.val('');
        input.removeClass('placeholder');
    }
}).blur(function () {
    var input = $(this);
    if (input.val() == '' || input.val() == input.attr('placeholder')) {
        input.addClass('placeholder');
    }
}).blur().parents('form').submit(function () {  //刚开始尚未获取焦点
    $(this).find('[placeholder]').each(function () {
        alert(1)
        var input = $(this);
        if (input.val() == input.attr('placeholder')) {
            input.val('');
        }
    })
});*/