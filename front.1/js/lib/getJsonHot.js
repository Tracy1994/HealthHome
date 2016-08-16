//according to the popularity,get Json object of article list 
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