/**
* 
*"所属科室"在双击选择后删除前面的已经选择的内容
*
*/
function doubleClick() {
    document.getElementById("dept").value = "";
    $("#deptCode").val("");
}

/**
* 
*"饮食医嘱"在双击选择后删除前面的已经选择的内容
*
*/
function doubleClickDiet() {
    document.getElementById("advice").value = "";
    $("#adviceCode").val("");
}

function ClickClearValue(o, id) {
    document.getElementById(o).value = "";
    $("#" + id).val("");
}



