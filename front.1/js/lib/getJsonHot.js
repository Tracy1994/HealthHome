//according to the popularity,get Json object of article list 
$.getJSON("/article/get_list?type_id=0",function(jsondata){
		console.log("jsondata.date.items"+ jsondata.data.items);
		
		console.log(jsondata);
		if (jsondata.code!=0) {
			alert("系统繁忙，请稍后再试～～");
		}
		else{
			getArticleList(jsondata.data);
		}
});

// //页面加载每页文章的信息
// function refreshArticlePage(articles){
	
// 	var pageNum= Math.ceil(articles.length/5);
// 	console.log("pageNum:"+pageNum);
// 	for (var i = 0; i < pageNum; i++) {
// 		$.getJSON("/article/get_list?type_id=0&page=" + i + "&num="+5,function(jsondata){
// 				console.log("jsondata.date.items"+ jsondata.data.items);
				
// 				console.log(jsondata);
// 				if (jsondata.code!=0) {
// 					alert("系统繁忙，请稍后再试～～");
// 				}
// 				else{
// 					onePageItems(jsondata.data.items);
// 				}
// 		});
// 	}
// }	
// 
	// $(".js_tr").hover(function(){
	// 	// $(".article_cover img").css("opacity","0.5");
	// 	$(this).find("img").css("opacity","0.7");
		
	// });	
	// $(".js_tr").mouseleave(function(){
	// 	$(this).find("img").css("opacity","1")
	// });

// function onePageItems(articles){
// 	for (var i = 0; i < articles.length; i++) {
// 		var one_page = loadArticle(articles[i]);
// 		$("#js_article_list").append(one_page);
// 	}
// }