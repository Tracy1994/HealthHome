//获取json对象
$.getJSON("/article/get_list?type_id=0",function(jsondata){
		console.log("jsondata.date.items"+ jsondata.data.items);
		
		console.log(jsondata);
		if (jsondata.code!=0) {
			alert("系统繁忙，请稍后再试～～");
		}
		else{
			refreshArticleList(jsondata.data.items);
		}
});
//页面加载每篇文章的信息
function refreshArticleList(articles){
	$("#articleList").empty();
	for (var i = 0; i < articles.length; i++) {
		var articleDiv = loadArticle(articles[i]);
		$("#js_article_list").append(articleDiv);
	}

	$(".js_tr").hover(function(){
		// $(".article_cover img").css("opacity","0.5");
		$(this).find("img").css("opacity","0.7");
		
	});	
	$(".js_tr").mouseleave(function(){
		$(this).find("img").css("opacity","1")
	});
}
function buildArticleCover(article, strCol){
	var box_l=document.createElement("div");
	box_l.setAttribute("class",strCol + " article_cover");
	var img=document.createElement("img");
	img.setAttribute("src",article.cover_url);
	img.setAttribute("alt","Image");
	img.setAttribute("class","img-responsive");

	box_l.appendChild(img);

	return box_l;
}
function buildArticleBrief(article,strCol){
	var box_r=document.createElement("div");
	box_r.setAttribute("class", strCol + " article_brief");

	var title=document.createElement("h3");
	var title_text=document.createTextNode(article.title);

	var summary=document.createElement("p");
	var summary_txt=document.createTextNode(article.summary);

	box_r.appendChild(title);		
	box_r.appendChild(summary);
	title.appendChild(title_text);
	summary.appendChild(summary_txt);

	return box_r;
}
function buildRead(article){
	var read=document.createElement("span");
	read.setAttribute("class","read");

	var span1=document.createElement("span");
	span1.setAttribute("class","glyphicon glyphicon-eye-open");
	var span_r=document.createElement("span");
	var span_r_txt=document.createTextNode('  阅读（ '+article.click_cnt+' )  ');

	var span2=document.createElement("span");
	span2.setAttribute("class","glyphicon glyphicon-thumbs-up");
	var span_l=document.createElement("span");
	var span_l_txt=document.createTextNode('  点赞（ '+article.like_cnt+' )');

	read.appendChild(span1);
	read.appendChild(span_r);
	span_r.appendChild(span_r_txt);
	read.appendChild(span2);
	read.appendChild(span_l);
	span_l.appendChild(span_l_txt);

	return read;
}

