//获取json对象
$.getJSON("/article/get_list?type_id=0",function(jsondata){
		console.log("jsondata.date"+ jsondata.data);
		
		console.log(jsondata);
		if (jsondata.code!=0) {
			alert("系统繁忙，请稍后再试～～");
		}
		else{
			refreshArticleList(jsondata.data);
		}
});
//页面加载每篇文章的信息
function refreshArticleList(articles){
	$("#articleList").empty();
	for (var i = 0; i < 3; i++) {
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
function loadArticle(article){
		var tr=document.createElement("tr");
		tr.setAttribute("class","js_tr");

		var td=document.createElement("td");		
		td.setAttribute("class","js_td");

		var link=document.createElement("a");
		link.setAttribute("href",'/front.1/html/article.html?article_id=' + article.id);

		var box_l=document.createElement("div");
		box_l.setAttribute("class","col-xs-4 article_cover");
		img=document.createElement("img");
		img.setAttribute("src",article.cover_url);
		img.setAttribute("alt","Image");
		img.setAttribute("class","img-responsive");
		var box_r=document.createElement("div");
		box_r.setAttribute("class","col-xs-8 article_brief");
		title=document.createElement("h3");
		title_text=document.createTextNode(article.title);
		summary=document.createElement("p");
		summary_txt=document.createTextNode(article.summary);
		read=document.createElement("span");
		read.setAttribute("class","read");
		span1=document.createElement("span");
		span1.setAttribute("class","glyphicon glyphicon-eye-open");
		span_r=document.createElement("span");
		span_r_txt=document.createTextNode('  阅读（ '+article.click_cnt+' )  ');
		span2=document.createElement("span");
		span2.setAttribute("class","glyphicon glyphicon-thumbs-up");
		span_l=document.createElement("span");
		span_l_txt=document.createTextNode('  点赞（ '+article.like_cnt+' )');

		tr.appendChild(td);
		td.appendChild(link);

		link.appendChild(box_l);		
		link.appendChild(box_r);
		link.appendChild(read);

		box_l.appendChild(img);
		box_r.appendChild(title);		
		box_r.appendChild(summary);
		title.appendChild(title_text);
		summary.appendChild(summary_txt);		
		read.appendChild(span1);
		read.appendChild(span_r);
		span_r.appendChild(span_r_txt);
		read.appendChild(span2);
		read.appendChild(span_l);
		span_l.appendChild(span_l_txt);

		return tr;
			
	}