//修改文章内容
$(function(){
	var articleId=window.location.search.substring(11,1400);
	console.log("articleId:"+articleId);
	if (articleId=="") {
		return false;
	}
	else{
		$.getJSON("/article/get_info_detail?article_id="+articleId,function(jsondata){
				console.log("jsondata.date"+ jsondata.data);		
				console.log(jsondata);
				if (jsondata.code==-10007) {
					alert("抱歉，该文章已被作者删除～～");
					return false;
				}
				if (jsondata.code!=0) {
					alert("系统繁忙，请稍后再试～～");
					return false;
				}
				else{
					var article=jsondata.data;
					$("#article_edit").attr("action","/article/modify");
					$("#authou_name").val(article.author);
					$("#author_desp").val(article.author_desp);
					$("#title").val(article.title);
					$("#type_id").val(article.type_id);
					$("#submit").text("确定修改");
				}
		});
		
		$.get("/article/get_content?article_id=" + articleId,function(data,status){
			console.log(data);
			$('#editor').summernote('code', data);
		});
	}
	

});
// set carousel img preview
function headerImagePreview(avalue) {
	var docObj=document.getElementById("doc_header");	 
	var imgObjPreview=document.getElementById("preview_header");
	if(docObj.files &&docObj.files[0])
	{
	//火狐下，直接设img属性
	imgObjPreview.style.display = 'block';
	// imgObjPreview.style.width = '960px';
	// imgObjPreview.style.height = '250px'; 
	//imgObjPreview.src = docObj.files[0].getAsDataURL();
	 
	//火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
	imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);
	}
	else
	{
	//IE下，使用滤镜
	docObj.select();
	var imgSrc = document.selection.createRange().text;
	var localImagId = document.getElementById("localImag");
	//必须设置初始大小
	// localImagId.style.width = "960px";
	// localImagId.style.height = "250px";
	//图片异常的捕捉，防止用户修改后缀来伪造图片
	try{
	localImagId.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
	localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
	}
	catch(e)
	{
	alert("您上传的图片格式不正确，请重新选择!");
	return false;
	}
	imgObjPreview.style.display = 'none';
	document.selection.empty();
	}
	return true;
}
// set carousel img preview
function coverImagePreview(avalue) {
	var docObj=document.getElementById("doc_cover");	 
	var imgObjPreview=document.getElementById("preview_cover");
	if(docObj.files &&docObj.files[0])
	{
	//火狐下，直接设img属性
	imgObjPreview.style.display = 'block';
	// imgObjPreview.style.width = '960px';
	// imgObjPreview.style.height = '250px'; 
	//imgObjPreview.src = docObj.files[0].getAsDataURL();
	 
	//火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
	imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);
	}
	else
	{
	//IE下，使用滤镜
	docObj.select();
	var imgSrc = document.selection.createRange().text;
	var localImagId = document.getElementById("localImag");
	//必须设置初始大小
	// localImagId.style.width = "960px";
	// localImagId.style.height = "250px";
	//图片异常的捕捉，防止用户修改后缀来伪造图片
	try{
	localImagId.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
	localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
	}
	catch(e)
	{
	alert("您上传的图片格式不正确，请重新选择!");
	return false;
	}
	imgObjPreview.style.display = 'none';
	document.selection.empty();
	}
	return true;
}

function sendFile(file) {
   data = new FormData();
   data.append("files", file);
   $.ajax({
       data: data,
       type: "POST",
       url:"/article/upload_content_img",
       cache: false,
       contentType: false,
       processData: false,
       success: function(data) {
           var jsonData =  $.parseJSON(data);
           $('#editor').summernote('insertImage', jsonData.data.img_url, file);
       }
   });
}

$(function(){	
	$('#editor').summernote({		
	    	height: 400,                 // set editor height
	    	minHeight: null,             // set minimum height of editor
	    	maxHeight: null, 			// set maximum height of editor	
	    	lang: 'zh-CN' ,				// language: 'Chinese'
	    	// onImageUpload: function(files, editor, welEditable) {
	    	//     sendFile(files[0],editor,welEditable);
	    	// }

	    	callbacks: {
	    	    onImageUpload: function(files) {
	    	      	// upload image to server and create imgNode...
	    	    	sendFile(files[0]);
	    	    }
	    	}
	});

	// $("#submit").click(function(){
	// 	var articleText=$('#editor').summernote('code');
	// 	console.log(articleText);
	// 	$(".editor_input").val(articleText);
	// });
});

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
    $('#article_edit').submit(function() { 
        // inside event callbacks 'this' is the DOM element so we first 
        // wrap it in a jQuery object and then invoke ajaxSubmit

        var articleText=$('#editor').summernote('code');
        console.log(articleText);
        $(".editor_input").val(articleText);
        $(this).ajaxSubmit(option); 
 
        // !!! Important !!! 
        // always return false to prevent standard browser submit and page navigation 
        return false; 
    }); 
});
function showRequest(formData,jqForm,option){
	var title=document.forms["myForm"]["title"].value;
	var author=document.forms["myForm"]["author"].value;
	var author_desp=document.forms["myForm"]["author_desp"].value;
	var type_id=document.forms["myForm"]["type_id"].value;
	var content=document.forms["myForm"]["content"].value;
	var coverimg=document.forms["myForm"]["coverimg"].value;
	var headimg=document.forms["myForm"]["headimg"].value;
	if (title==null || title==""){
	  	alert("请填写标题文章！");
	  	return false;
		}
	
	if (author==null || author==""){
	  	alert("请填写作者名字！");
	  	return false;
		}
	if (author_desp==null || author_desp==""){
	  	alert("请填写作者背景！");
	  	return false;
		}
	
	if (type_id==null || type_id==""){
	  	alert("请选择文章类型！");
	  	return false;
		}
	if (content==null || content==""){
	  	alert("请编辑文章内容！");
	  	return false;
		}
	
	if (coverimg==null || coverimg==""){
	  	alert("请上传文章封面！");
	  	return false;
		}
	if (headimg==null || headimg==""){
	  	alert("请上传作者头像！");
	  	return false;
		}	
}
function showResponse(responseText, statusText){ 
        console.log(responseText);
        console.log(statusText);
        
        if (responseText.code==0) {
        	alert("提交成功！");
        	var r=confirm("是否要跳转到文章列表页？")
        	  if (r==true)	  	
        	    {
        	    window.location.href="/front.1/html/articleList.html";	        	    
        	    }
        	   else
        	   {
        	   	window.location.href="/front.1/html/articleEdit.html"
        	   }
        	return false;
        }
        else
        {
        	alert("提交不成功，请重试！");
        	
        	return false;
        }
        // window.location.href="/front/html/writer.html";

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


