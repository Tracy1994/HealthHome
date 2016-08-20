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
			$("#js_btn3").removeClass("active");
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
			var page=parseInt($("#js_btn3").text());
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