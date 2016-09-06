/**
 * Created by yanfeng-mac on 16/9/2.
 */
(function(){
    //页面载入完毕后默认选项
    $("#inputK").prop("checked",true);
    $("#must").prop("checked",true);
    $("#text").prop("checked",true);

    if($("#inputK").prop("checked")){
        $("#selection").css("display","none");
        $("#setLength").css("display","none");
    }
    //根据类型设置需要的配置选项
    $("#inputK").click(function(){
        $("#config").css("display","block");
        $("#rule").css("display","block");
        $("#selection").css("display","none");
        $("#setLength").css("display","none");
    });
    $("#radioK,#checkboxK,#selectK").click(function(){
        $("#config").css("display","block");
        $("#rule").css("display","none");
        $("#selection").css("display","block");
        $("#setLength").css("display","none");
    });
    $("#textareaK").click(function(){
        $("#config").css("display","block");
        $("#rule").css("display","none");
        $("#selection").css("display","none");
        $("#setLength").css("display","block");
    });
    $("#rule .radio").on("click","input",function(){
        if($(this).is("#password")){
            $("#setLength").css("display","block");
        }
        else
            $("#setLength").css("display","none");
    })

    //生成选项操作
    var valueArr = [];
    $("#setSelect").keyup(function(e){
        if(e.keyCode == 13){
            var selectValue = $("#setSelect").val().trim();
            var arr = selectValue.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);
            valueArr = valueArr.concat(arr);
            console.log(valueArr);
            render();
        }
    });
    function render(){
        var innerhtml =  valueArr.map(function(e,index){
            if(valueArr.length > 0){
                return "<button value="+index+" class='btn btn-default' " + "name = " + e + ">" + e + "</button>";
            }
        }).join('');
        $("#selectHolder").html(innerhtml);

    }
    $("#selectHolder").delegate("button","click",function(){
        $(this).remove();
        valueArr.splice($(this).value,1);
        console.log(valueArr);
    });
    $("#selectHolder").delegate("button","mouseover",function(){
        $(this).attr("class","btn btn-danger");
        $(this).text("删除");
    });
    $("#selectHolder").delegate("button","mouseleave",function(){
        $(this).attr("class","btn btn-default");
        $(this).text($(this).attr("name"));
    });

    //生成表单

    function setForm(){
        var inputName = $("#form-name").val();
        var form = $("#view-container form");
        if($("#form-name-input").val() != ""){
            form.append("<h2>"+ $("#form-name-input").val() +"</h2>");
        }
        if($("#inputK").prop("checked")){
            //$("#view-container form").html("<div class='form-group'><label for='inputEmail3' class='col-sm-2 control-label'>" + $("#form-name").val() + "</label><div class='col-sm-6'><input type='text' class='form-control' id='inputEmail3'></div></div>");
            form.append("<div class='form-group'></div>");
            var formGroup = $("#view-container form .form-group:last");
            formGroup.append("<lable class='control-label col-md-4'>"+inputName+"</lable>");
            formGroup.append("<div class='col-md-6'>" + "<input type=" + $("#rule input:checked").attr("alt") + " class='form-control' >" + "</div>");
            //formGroup.append();
            //var inputNode = $("#view-container form .form-group input");
            var inputNode = $("#view-container form .form-group:last input");
            //inputNode.val("创建了一个输入框");
            delegateEvent(inputNode);
        }
        else if($("#radioK").prop("checked")){
            form.append("<div class='radio-div'></div>");
            var radioDiv = $("form .radio-div:last");
            radioDiv.append("<lable class='control-label col-md-4'>"+inputName+"</lable>");
            for(var i = 0;i < valueArr.length;i++)
            {
                radioDiv.append("<label class='radio-inline'></label>");
                var radio = $("form .radio-inline:last");
                radio.append("<input type='radio' name=" + inputName + " value=" + valueArr[i] + ">" + valueArr[i]);
            }
        }
        else if($("#checkboxK").prop("checked")){
            form.append("<div class='checkbox-div'></div>");
            var checkBoxDiv = $("form .checkbox-div:last");
            checkBoxDiv.append("<lable class='control-label col-md-4'>"+inputName+"</lable>");
            for(var i = 0;i < valueArr.length;i++)
            {
                checkBoxDiv.append("<label class='checkbox-inline'></label>");
                var check = $("form .checkbox-inline:last");
                check.append("<input type='checkbox' name=" + inputName + " value=" + valueArr[i] + ">" + valueArr[i]);
            }
        }
        else if($("#selectK").prop("checked")){
            form.append("<div class='select-div'></div>");
            var selectDiv = $("form .select-div:last");
            selectDiv.append("<lable class='control-label col-md-4'>"+inputName+"</lable>");
            selectDiv.append("<div class='col-md-6'><select class='form-control'></select></div>");
            var select = $("form select:last");
            for(var i = 0;i < valueArr.length;i++)
            {
                select.append("<option value="+ valueArr[i] +">" + valueArr[i] +"</option>");
            }
        }
        else if($("#textareaK").prop("checked")){
            form.append("<div class='textarea-div'></div>");
            var textareaDiv = $("form .textarea-div:last");
            textareaDiv.append("<lable class='control-label col-md-4'>"+inputName+"</lable>");
            textareaDiv.append("<div class='col-md-6'><textarea class='form-control' rows='3'></textarea></div>")
            var textarea = $("form .textarea-div:last textarea");
            var min = $("#areaMin").val();
            var max = $("#areaMax").val();
            if(min == "" || max == ""){
                console.log("the password is not selected!");
            }
            else {
                textarea.blur(function(){
                    if(textarea.val().length < min || textarea.val().length > max){
                        textarea.after("<span class='help-block' style='color: #a94442'>长度需要在"+ min +"和"+ max +"之间!"+"</span>");
                    }
                });
                textarea.focus(function(){
                    textarea.next("span").remove();
                });
            }
        }
        $("#form-name-input").val("");
        $("#view-container form .form-group,#view-container form .radio-div,#view-container form .checkbox-div,#view-container form .select-div,#view-container form .textarea-div").mouseenter(function(){
            $(this).css("backgroundColor","#eee");
            $(this).css("cursor","pointer");
            $(this).append("<span class='glyphicon glyphicon-remove'></span>");
        });
        $("#view-container form .form-group,#view-container form .radio-div,#view-container form .checkbox-div,#view-container form .select-div,#view-container form .textarea-div").mouseleave(function(){
            $(this).css("backgroundColor","#fff");
            $(this).css("cursor","default");
            $(this).children(".glyphicon-remove:last").remove();
        });
    }

    function isNecessary(){
        if($("#must").prop("checked")){
            return true;
        }
        else
            return false;
    }
    //function delegateEvent(node){
    //    if(isNecessary()){
    //       showNecessary(node);
    //    }
    //
    //}
    function delegateEvent(node){


        if($("#cellphone").prop("checked")) {
            //console.log("用户开启了检查手机号功能");
            checkCellPhoneNumber(node);
        }

        else if($("#mailbox").prop("checked")){
            //console.log("用户开启了邮箱验证");
            //showSuccess(node);
            checkMail(node);

        }
        else if($("#password").prop("checked")){
            checkLength(node);
            //showSuccess(node);


        }
        if(isNecessary()){
            // console.log("用户选择了必填按钮");
            showNecessary(node);



        }



        node.on("focus",function(){
            clearSpace(node);
        });
    }
    function clearSpace(node){

            node.parent().parent().attr("class","form-group");
            node.parent().children("span").remove();

    }
    function showSuccess(node){
        node.parent().parent().attr("class","form-group has-success has-feedback");
        node.after("<span class='sr-only'>(success)</span>").after("<span class='glyphicon glyphicon-ok form-control-feedback' ></span>");


    }
    function showNecessary(node){
        //console.log(node.nodeName);
        node.on("blur",function(){
          if(node.val() == ""){
              node.parent().parent().attr("class","form-group has-error has-feedback");
              node.after("<span class='help-block'>该项不能为空,请重新输入!</span>").after("<span class='sr-only'>(warning)</span>").after("<span class='glyphicon glyphicon-warning-sign form-control-feedback' ></span>");

          }


        });
    }
    function checkLength(node){
        var min = $("#areaMin").val();
        var max = $("#areaMax").val();
        //console.log("用户开启了长度验证");
        node.blur(function(){

            if(node.val() != ""){
                if(node.val().length > max || node.val().length < min){
                    node.parent().parent().attr("class","form-group has-error has-feedback");
                    node.after("<span class='help-block'>长度区间需在"+min+"到"+max+"之间!"+"</span>").after("<span class='sr-only'>(warning)</span>").after("<span class='glyphicon glyphicon-warning-sign form-control-feedback' ></span>");

                }
                else {
                    showSuccess(node);
                }
            }

        });



    }
    function checkCellPhoneNumber(node){
        var regCellNum = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        node.blur(function(){

           if(node.val() != ""){
               if(!regCellNum.test(node.val())){
                   node.parent().parent().attr("class","form-group has-error has-feedback");
                   node.after("<span class='help-block'>请输入正确的手机号!</span>").after("<span class='sr-only'>(warning)</span>").after("<span class='glyphicon glyphicon-warning-sign form-control-feedback' ></span>");

               }
               else {
                   showSuccess(node);
               }
           }
        });




    }
    function checkMail(node){
        var regMail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        node.blur(function(){

            if(node.val() != ""){
                if(node.val() == ""){
                    node.parent().parent().attr("class","form-group has-error has-feedback");
                    node.after("<span class='help-block'>该项不能为空,请重新输入!</span>").after("<span class='sr-only'>(warning)</span>").after("<span class='glyphicon glyphicon-warning-sign form-control-feedback' ></span>");

                }
                else if(!regMail.test(node.val())){
                    //console.log("验证邮箱成功");
                    node.parent().parent().attr("class","form-group has-error has-feedback");
                    node.after("<span class='help-block'>请输入正确的邮箱格式!</span>").after("<span class='sr-only'>(warning)</span>").after("<span class='glyphicon glyphicon-warning-sign form-control-feedback' ></span>");

                }
                else {
                    showSuccess(node);
                }
            }

        });



    }
    $("#add").click(function(){
        setForm();
    });
    $("#finished").click(function(){
        $(".modal-body").text($("#view-container .container").html());
        $("#view-container .container").append("<div class='col-md-4 col-md-offset-4'><button class='btn btn-success' id='createFormCode' data-toggle='modal' data-target='#dialog'>一键生成表单代码</button></div>");
    });
    //$("#createFormCode").click(function(){
    //    console.log("hello");
    //   // console.log($("#view-container .container").html());
    //});
    //$("#view-container .container").delegate("#createFormCode","click",function(){
    //    //console.log("hello");
    //    console.log($("#view-container .container").html());
    //})
    $(".modal-footer button:last").click(function(){
        copyCode();
    });
    function copyCode(){
        var obj = document.querySelector('.modal-body');
        var range = document.createRange();
        range.selectNode(obj);
        window.getSelection().addRange(range);
        try {
            // Now that we've selected the anchor text, execute the copy command
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copy email command was ' + msg);
        } catch(err) {
            console.log('Oops, unable to copy');
        }
        window.getSelection().removeAllRanges();
    }

})();