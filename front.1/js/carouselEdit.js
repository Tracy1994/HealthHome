function setImagePreview(avalue) {
	var docObj=document.getElementById("doc");	 
	var imgObjPreview=document.getElementById("preview");
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


$(function (){ $("[data-toggle='tooltip']").tooltip(); });
$(function(){$('.tooltip-hide').tooltip('hide');});
$(".js_detail").click(function(){
	debugger;
	$('.tooltip-hide').tooltip('hide');
});
// <li class="list-group-item">
// 	<div class="row">
// 		<div class="col-xs-9">
// 			这是文章的标题
// 		</div>
// 		<div class="col-xs-3">
// 			<div class="btn-group ">
// 				<button type="button" class="btn btn-default btn-sm js_dail" data-toggle="collapse"  data-target="#demo">
// 			  	<a href="#" class="tooltip-hide control" data-toggle="tooltip" data-placement="top" title="详情">
// 			  	    <span class="glyphicon glyphicon-list"></span>
// 			  	</a>
// 				</button>
// 				<button type="button" class="btn btn-default btn-sm ">
// 				  	<a href="#" class="tooltip-hide control" data-toggle="tooltip" data-placement="top" title="发布">
// 				  	    <span class="glyphicon glyphicon-check"></span>
// 				  	</a>
// 				</button>
// 			</div>	
// 		</div>
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