$(document).ready(function(){
    var authorList = null;
    $('#editor').summernote({		
    	height: 480,                 // set editor height
    	minHeight: null,             // set minimum height of editor
    	maxHeight: null, 			// set maximum height of editor			
	});
	$.getJSON("/author/get_all_authors",function(jsondata){
        console.log(jsondata.code);
        if (jsondata.code!=0) 
        {
            alert("加载失败，请重试！");
        }
        else
        {
            var informations = jsondata.data;
            $("#w_name").empty();
            for (var i = 0; i < informations.length; i++) {
                
                var authorDiv = getAuthor(informations[i]);

                $("#w_name").append(authorDiv);
            }
            
        }
    });

    function getAuthor(authorInfo){
        var name="<option value=\""+authorInfo.author+"\"></option>"
        return name;
        
    }
	$(function(){   
        var option = { 
       // target:        '#output',   // target element(s) to be updated with server response 
        beforeSubmit:  showRequest,  // pre-submit callback 
        success:       showResponse,  // post-submit callback
        resetForm: true, 
        dataType:  'json' 
        
        // other available options: 
        //url:       url         // override for form's 'action' attribute 
        //type:      type        // 'get' or 'post', override for form's 'method' attribute 
        //dataType:  null        // 'xml', 'script', or 'json' (expected server response type) 
        //clearForm: true        // clear all form fields after successful submit 
        //resetForm: true        // reset the form after successful submit 
 
        // $.ajax options can be used here too, for example: 
        //tim(eout:   3000 
        }; 
 
        // bind to the form's submit event 
        $('#my_form').submit(function() { 
            // inside event callbacks 'this' is the DOM element so we first 
            // wrap it in a jQuery object and then invoke ajaxSubmit 
            $(this).ajaxSubmit(optionArticle); 
     
            // !!! Important !!! 
            // always return false to prevent standard browser submit and page navigation 
            return false; 
        }); 
    });
  
    // pre-submit callback 
    function showRequest(formData,jqForm,option){
        $("option").mounsedown(function(){
            console.log("index"+options.index)
        });
        var name = $("#name").val();
        if(name==""){
           alert("作者名字不能为空");
            return false;
        }
        var head = $("#head").val();
        if(head==""){
           alert("作者头像不能为空");
            return false;
        }
        var bg = $("#bg").val();
        if(bg==""){
           alert("作者名字不能为空");
            return false;
        }
        var classifly = $("#classifly").val();
        if(classifly==""){
           alert("文章分类不能为空");
            return false;
        }

        var title = $("#title").val();
        if(title==""){
            alert("文章标题不能为空");
            return false;
        }
        var articleText = $('#editor').summernote('code');
        if(articleText==""){
                alert("文章内容不能为空");
                return false;
        }
        var corver = $("#corver").val();
        if(corver==""){
            alert("文章封面不能为空");
            return false;
        }
        $('#articleText').val($('#editor').summernote('code').code());
        console.log("articleText: " + $('#articleText').val());
    }
    
        
        // post-submit callback 
        function showResponse(responseText, statusText){ 
          window.location.href="/front/html/writer.html";  
          alert("提交成功！");

        // for normal html responses, the first argument to the success callback 
        // is the XMLHttpRequest object's responseText property 

        // if the ajaxSubmit method was passed an Options Object with the dataType 
        // property set to 'xml' then the first argument to the success callback 
        // is the XMLHttpRequest object's responseXML property 

        // if the ajaxSubmit method was passed an Options Object with the dataType 
        // property set to 'json' then the first argument to the success callback 
        // is the json data object returned by the server 

        //alert('status: ' + statusText + '\n\nresponseText: \n' + responseText + 
        //    '\n\nThe output div should have already been updated with the responseText.'); 
        } 
        
});
 
