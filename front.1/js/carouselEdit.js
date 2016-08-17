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

	title=document.createElement("div");
	title.setAttribute("class","col-xs-9");
	var title_text=document.createTextNode(article.title);
	title.appendChild(title_text);

	var btn_group=buildBtnGroup(article);
	var collapse=buildCollapse(article);

	li.appendChild(row);
	li.appendChild(collapse);

	row.appendChild(title);
	row.appendChild(btn_group);

	document.getElementById("js_articleList").appendChild(li);
}
// <li class="list-group-item">
// 	<div class="row">
// 		<div class="col-xs-9">
// 			这是文章的标题
// 		</div>
// 		
// 			<div class="btn-group col-xs-3">
// 				<button type="button" class="btn btn-default btn-sm control" data-toggle="collapse"  data-target="#demo"  title="详情">
// 					<span class="glyphicon glyphicon-list"></span>
// 				</button>
// 				<button type="button" class="btn btn-default btn-sm control">
// 					<span class="glyphicon glyphicon-check"  title="添加"></span>
// 				</button>
// 			</div>	
// 		
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
function validateForm(){
	function validateForm(){
	var img=document.forms["myForm"]["carouselimg"].value;
	var articleId=document.forms["myForm"]["article_id"].value;
	if (img==null || img==""){
	  	alert("请上传封面！");
	  	return false;
		}
	
	if (articleId==null || articleId==""){
	  	alert("请上传文章！");
	  	return false;
		}
	}
}

