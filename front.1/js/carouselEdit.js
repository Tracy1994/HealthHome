// set carousel img preview
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


function buildDetialBtn(article){
	var detial_btn=document.createElement("button");
	detial_btn.setAttribute("type","button");
	detial_btn.setAttribute("class","btn btn-default btn-sm control");
	detial_btn.setAttribute("data-toggle","collapse");
	detial_btn.setAttribute("data-target","#demo"+ article.id);
	detial_btn.setAttribute("title","详情");

	var span=document.createElement("span");
	span.setAttribute("class","glyphicon glyphicon-list");

	detial_btn.appendChild(span);

	return detial_btn;
}
function buildAddBtn(article){
	var add_btn=document.createElement("button");
	add_btn.setAttribute("type","button");
	add_btn.setAttribute("class","btn btn-default btn-sm control");
	add_btn.setAttribute("title","添加");
	add_btn.setAttribute("onclick", "getArticle( '" + JSON.stringify(article) + "')");
	add_btn.setAttribute("data-dismiss","modal");

	var span=document.createElement("span");
	span.setAttribute("class","glyphicon glyphicon-check");

	add_btn.appendChild(span);

	return add_btn;
}
function getArticle(strArticle){
	var article = JSON.parse(strArticle);
	$(".articleId").val(article.id);
	$(".article").text(article.title);
	alert("已选择文章");
	return false;
}
function buildBtnGroup(article){
	var btn_group=document.createElement("div");
	btn_group.setAttribute("class","col-xs-3 btn-group");

	var detial_btn=buildDetialBtn(article);
	var add_btn=buildAddBtn(article);

	btn_group.appendChild(detial_btn);
	btn_group.appendChild(add_btn);

	return btn_group;
}
function buildRead(article){
	var read=document.createElement("span");
	read.setAttribute("class","read");

	var span1=document.createElement("span");
	span1.setAttribute("class","glyphicon glyphicon-eye-open");
	var span_r=document.createElement("span");
	var span_r_txt=document.createTextNode(' 阅读('+article.click_cnt+') ');

	var span2=document.createElement("span");
	span2.setAttribute("class","glyphicon glyphicon-thumbs-up");
	var span_l=document.createElement("span");
	var span_l_txt=document.createTextNode(' 点赞('+article.like_cnt+') ');

	read.appendChild(span1);
	read.appendChild(span_r);
	span_r.appendChild(span_r_txt);
	read.appendChild(span2);
	read.appendChild(span_l);
	span_l.appendChild(span_l_txt);

	return read;
}
function buildCollapse(article){
	var collapse=document.createElement("div");
	collapse.setAttribute("id","demo"+article.id);
	collapse.setAttribute("class","collapse");

	var p=document.createElement("p");
	var p_text=document.createTextNode(article.summary);
	p.appendChild(p_text);

	var read=buildRead(article);

	collapse.appendChild(p);
	collapse.appendChild(read);

	return collapse;

}

function loadArticle(article){
	
	var li=document.createElement("li");
	li.setAttribute("class","list-group-item");

	var row=document.createElement("div");
	row.setAttribute("class","row");

	var title=document.createElement("div");
	title.setAttribute("class","col-xs-9");
	var title_text=document.createTextNode(article.title);
	title.appendChild(title_text);

	var btn_group=buildBtnGroup(article);
	var collapse=buildCollapse(article);

	li.appendChild(row);
	li.appendChild(collapse);

	row.appendChild(title);
	row.appendChild(btn_group);

	return li;

}

//分页加载文章
function getArticleList(articles){
	var articleNum=articles.count;
	var pageNum= Math.ceil(articleNum/5);	
	console.log("pageNum:"+pageNum);
	console.log("articleNum:"+articleNum);
	if (pageNum==1) {
		$("#js_btn2").hide();
		$("#js_btn3").hide();
		getFirstPageData();
	}
	if (pageNum==2 ||pageNum==3) {
		getFirstPageData();
		if (pageNum==2) {
			$("#js_btn3").hide();	
		}
				
		$("#js_btn1").click(function(){

			$("#js_btn1").addClass("active");
			$("#js_btn2").removeClass("active");
			$("#js_btn3").removeClass("active");On
			var page=parseInt($("#js_btn1").text());
			getPageData(page);
			
		});
		$("#js_btn2").click(function(){
			
			$("#js_btn3").removeClass("active");
			$("#js_btn2").addClass("active");
			$("#js_btn1").removeClass("active");
			var page=parseInt($("#js_btn2").text());
			getPageData(page);
		});
		$("#js_btn3").click(function(){
			
			$("#js_btn2").removeClass("active");
			$("#js_btn3").addClass("active");
			$("#js_btn1").removeClass("active");
			var page=parseInt($("#js_btn2").text());
			getPageData(page);
		});
	}

	if (pageNum>3) 
	{
		getFirstPageData();
		$("#js_btn1").click(function(){
			var page=parseInt($("#js_btn1").text());
			getPageData(page);
			if (page==1) {
				$("#js_btn1").addClass("disabled");
				return false;
			}
			else{

				$("#js_btn2").removeClass("active");
				$("#js_btn3").removeClass("active");
				$("#js_btn1").removeClass("disabled");
				$("#js_btn3").removeClass("disabled");
				$("#js_btn1").addClass("active");
				var btn1Num=parseInt($("#js_btn1").text());					
				var btn2Num=btn1Num;
				var btn3Num=eval( btn1Num+1);
				var btn1Num=eval( btn1Num-1);				
				$("#js_btn1").text(btn1Num);
				$("#js_btn2").text(btn2Num);
				$("#js_btn3").text(btn3Num);
			}
			

		});
		$("#js_btn2").click(function(){
			
			var page=parseInt($("#js_btn2").text());
			$("#js_btn1").removeClass("disabled");
			$("#js_btn3").removeClass("disabled");
			$("#js_btn1").removeClass("active");
			$("#js_btn3").removeClass("active");
			$("#js_btn2").addClass("active");
			getPageData(page);
		});
		$("#js_btn3").click(function(){
			var page=parseInt($("#js_btn3").text());				
			getPageData(page);
			if (page==pageNum) 
			{
				$("#js_btn1").removeClass("active");
				$("#js_btn2").removeClass("active");
				$("#js_btn3").addClass("disabled");
				
				// var btn3Num=parseInt($("#js_btn3").text()) ;
				// var btn2Num=btn3Num;
				// var btn1Num=eval( btn3Num-1);		
				// $("#js_btn1").text(btn1Num);
				// $("#js_btn2").text(btn2Num);
				$("#js_btn3").text( pageNum+"(最后一页)");	
				
			}
			else{
				var btn3Num=parseInt($("#js_btn3").text()) ;
				$("#js_btn1").removeClass("disabled");
				$("#js_btn3").removeClass("disabled");
				$("#js_btn1").removeClass("active");
				$("#js_btn2").removeClass("active");
				$("#js_btn3").addClass("active");
				var btn3Num=parseInt($("#js_btn3").text()) ;
				var btn2Num=btn3Num;
				var btn1Num=eval( btn3Num-1);		
				var btn3Num=eval( btn3Num+1);
				$("#js_btn1").text(btn1Num);
				$("#js_btn2").text(btn2Num);
				$("#js_btn3").text(btn3Num);
			}
		});
	}	
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


