// set carousel img preview
function setImagePreview(doc,preview) {
	var docObj=document.getElementById("doc");	 
	var imgObjPreview=document.getElementById("preview");
	if(docObj.files && docObj.files[0])
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

//表单验证
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
    $('#carousel').submit(function() { 
    	
        // inside event callbacks 'this' is the DOM element so we first 
        // wrap it in a jQuery object and then invoke ajaxSubmit

        $(this).ajaxSubmit(option); 
 
        // !!! Important !!! 
        // always return false to prevent standard browser submit and page navigation 
        return false; 
    }); 
});
function showRequest(formData,jqForm,option){
	var img=document.forms["myForm"]["carouselimg"].value;
	var articleId=document.forms["myForm"]["article_id"].value;
	if (img==null || img==""){
	  	alert("请上传封面！");
	  	return false;
		}
	
	if (articleId==null || articleId==""){
	  	alert("请选择文章！");
	  	return false;
		}
	
}
function showResponse(responseText, statusText){ 
	debugger;
        console.log(responseText);
        console.log(statusText);
        
        if (responseText.code==0) {
        	alert("提交成功！");
        	var r=confirm("是否要跳转到轮播列表页？")
        	  if (r==true)	  	
        	    {
        	    window.location.href="/front.1/html/carouselPreview.html";	        	    
        	    }
        	   else
        	   {
        	   	window.location.href="/front.1/html/carouselEdit.html"
        	   }
        	return false;
        }
        else
        {
        	alert("提交不成功，请重试！");
        	window.location.href="/front.1/html/carouselEdit.html"
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





//每页的每篇文章单篇加载
function onePageItems(articles){	
	
	$("#js_articleList").empty();	
	for (var i = 0; i < articles.length; i++) {
		var one_page = buildItem(articles[i]);

		$("#js_articleList").append(one_page);
	}
}

//首次加载文章内容
$.getJSON("/article/get_latest_list?detail=1&page=1&num="+5,function(jsondata){
	console.log("jsondata.date.items"+ jsondata.data.items);
	
	console.log(jsondata);
	if (jsondata.code!=0) {
		alert("系统繁忙，请稍后再试～～");
	}
	else{
		
		onePageItems(jsondata.data.items);
		loadPageBtnGroup(jsondata.data);
	}
});

	
//根据第几页和每页的页数加载
function getPageData(page){
	$.getJSON("/article/get_latest_list?detail=1&page=" + page + "&num="+5,function(jsondata){
		console.log("jsondata.date.items"+ jsondata.data.items);				
		console.log(jsondata);
		if (jsondata.code!=0) {
			alert("系统繁忙，请稍后再试～～");
		}
		else{
			onePageItems(jsondata.data.items);
		}				
	});
}
function addBtn(strItem){
	var itemdata = JSON.parse(strItem);
	$(".articleId").val(itemdata.id);
	$(".article").text(itemdata.title);
	alert("已选择文章");
	return false;
}

// <li class="list-group-item">
// 	<div class="row">
// 		<div class="col-xs-9">
// 			这是文章的标题
// 		</div>
		
// 			<div class="btn-group col-xs-3">
// 				<button type="button" class="btn btn-default btn-sm control" data-toggle="collapse"  data-target="#demo"  title="详情">
// 					<span class="glyphicon glyphicon-list"></span>
// 				</button>
// 				<button type="button" class="btn btn-default btn-sm control">
// 					<span class="glyphicon glyphicon-check"  title="添加"></span>
// 				</button>
// 			</div>	
		
// 	</div>
// 	<div id="demo" class="collapse">					
// 		<p>
// 			这是段落内容这是段落内容这是段落内容这是段落内容这是段落内容这是段落内容这是段落内容这是段落内容这是段落内容这是段落内容	
// 		</p>											 
// 	 	<span class="read">
// 	 		<span class="glyphicon glyphicon-eye-open">阅读（1024）</span>
// 	 		<span class="glyphicon glyphicon-thumbs-up">点赞（1024）</span>
// 	 	</span>
// 	</div>
// </li>

