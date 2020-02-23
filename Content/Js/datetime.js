﻿$('#datetimepicker').datetimepicker({
    value: ''                   // 设置当前datetimepicker的值
    rtl: false,                    // false   默认显示方式   true timepicker和datepicker位置变换
format:    'Y/m/d H:i',     // 设置时间年月日时分的格式 如: 2016/11/15 18:00
formatTime:    'H:i',       // 设置时间时分的格式
formatDate:    'Y/m/d',     // 设置时间年月日的格式
startDate: false,         // new Date(), '1986/12/08', '-1970/01/05','-1970/01/05',
step: 10,                    // 设置时间时分的间隔
closeOnDateSelect: false,      // true 设置datepicker可点击   false 设置datepicker不可点击 实际上可以双击
closeOnTimeSelect: true,       // true 设置timepicker可点击   false 设置timepicker不可点击 
closeOnWithoutClick: true,     // true 设置点击input可以隐藏datetimepicker   false 设置点击input不可以隐藏datetimepicker  
closeOnInputClick: true,      // true 设置点击input可以隐藏datetimepicker   false 设置点击input不可以隐藏datetimepicker  (会有闪动 先隐藏 再显示)
timepicker: true,            // true 显示timepicker   false 隐藏timepicker
datepicker: true,            // true 显示datepicker   false 隐藏datepicker
weeks: false,                // true 显示周数   false 隐藏周数
defaultTime: false,            // 如果输入值为空 可用来设置默认显示时间 use formatTime format (ex. '10:00' for formatTime:   'H:i') 
defaultDate: false,            // 如果输入值为空 可用来设置默认显示日期 use formatDate format (ex new Date() or '1986/12/08' or '-1970/01/05' or '-1970/01/05')
minDate: false,                // 设置datepicker最小的限制日期   如：2016/08/15
maxDate: false,                // 设置datepicker最大的限制日期   如：2016/11/15
minTime: false,                // 设置timepicker最小的限制时间   如：08:00
maxTime: false,              // 设置timepicker最大的限制时间   如：18:00
allowTimes: [],                // 设置timepicker显示的时间   如：allowTimes:['09:00','11:00','12:00','21:00']
opened: false,              // false默认打开datetimepicker可关闭  true打开datetimepicker后不可关闭
initTime: true,                // 设置timepicker默认时间   如：08:00
inline: false,             // ture设置datetimepicker一直显示
theme: '',                  // ture设置datetimepicker显示样式 如: 'dark'
withoutCopyright: true,        // ture默认隐藏左下角'xdsoft.net'链接  false 显示左下角'xdsoft.net'链接 
inverseButton: false,          // false 默认   true datepicker的上一月和下一月功能互换  timepicker的上下可点击按钮功能互换
hours12: false,                // true设置12小时格式  false设置24小时格式
next: 'xdsoft_next',           // 设置datepicker上一月按钮的样式
prev : 'xdsoft_prev',        // 设置datepicker下一月按钮的样式
dayOfWeekStart: 0,            // 设置默认第-列为周几 如：0 周日  1 周一
parentID: 'body',            // 设置父级选择器
timeHeightInTimePicker: 25,    // 设置timepicker的行高
timepickerScrollbar: true,  // ture设置timepicker显示滑动条  false设置timepicker不显示滑动条
todayButton: true,            // ture显示今天按钮  false不显示今天按钮   位置在datepicker左上角
prevButton: true,              // ture显示上一月按钮  false不显示上一月按钮   位置在datepicker左上角
nextButton: true,          // ture显示下一月按钮  false不显示下一月按钮   位置在datepicker又上角
scrollMonth: true,             // ture 设置datepicker的月份可以滑动  false设置datepicker的月份不可以滑动
lazyInit: false,              // 翻译： 初始化插件发生只有当用户交互。大大加速插件与大量的领域的工作
mask: false,                  // 使用输入掩码。真正的-自动生成一个字段的“格式”的面具，从0到9的数字，设置为值的最高可能的数字。例如：第一个小时的数字不能大于2，而第一位数字不能大于5  如：{mask:'9999/19/39 29:59',format:'Y/m/d H:i'}
validateOnBlur: true,        // 失去焦点时验证datetime值输入,。如果值是无效的datetime,然后插入当前日期时间值
yearStart: 1950,              // 设置最小的年份   
yearEnd: 2050,              // 设置最大的年份
monthStart: 0,              // 设置最小的月份
monthEnd: 11,                // 设置最大的月份
roundTime: 'round',          // 设置timepicker的计算方式  round四舍五入 ceil向上取整 floor向下取整
allowDateRe : null,            // 设置正则表达式检查日期 如：{format:'Y-m-d',allowDateRe:'\d{4}-(03-31|06-30|09-30|12-31)' }
disabledDates : [],            // 设置不可点击的日期  如：disabledDates: ['21.11.2016','22.11.2016','23.11.2016','24.11.2016','25.11.2016','26.11.2016']
disabledWeekDays: [],          // 设置不可点击的星期  如：disabledWeekDays:[0,3,4]
yearOffset: 0,              // 设置偏移年份  如：2 代表当前年份加2  -2  代表当前年份减2
beforeShowDay: null,          // 显示datetimepicker之前可调用的方法  {beforeShowDay:function(d) {console.log("bsd"); } }
enterLikeTab: true,            // tab按键均可使datetimepicker关闭  true点击回车键可使datetimepicker关闭 false点击回车键不可使datetimepicker关闭 
showApplyButton: false      // 相当于确定按钮  true显示  false隐藏
});

作者：SimonLike
链接：https://www.jianshu.com/p/663f2a86dd22
    來源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。