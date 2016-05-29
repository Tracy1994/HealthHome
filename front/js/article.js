$(document).ready(function(){
	var articleId=window.location.search
	console.log(window.location.search);
	$.get("/article/get_detail"+articleId,function(jsondata){
		if (jsondata.code!=0) {
			alert("系统繁忙，请稍后再试～～");
		}
		else{
			getArticle(jsondata.data);
			console.log(jsondata.data);
		}
	});
	function getArticle(article){
		var section="<section><div class=\"center\"><div class=\"title\"><h2>"+article.title+
		"</h2><p><span id=\"left\"> 作者："+article.author+"</span><span id=\"right\"><span>"
		+article.create_time+"</span><span>阅读（"	+article.click_cnt+"）</span></span></p>"
		+"</div><img src=\""+article.click_cnt+"\"><div class=\"article\">"	+article.content+
		"</div></div></section>"
	}
	function loadArticle(loadDate){
		$("#article").empty();
		var articleContent=getArticle(article);
		$("#article").append(articleContent);
	}
});