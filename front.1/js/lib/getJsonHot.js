//according to the popularity,get Json object of article list 
// $.getJSON("/article/get_list?type_id=0",function(jsondata){
// 		console.log("jsondata.date.items"+ jsondata.data.items);
		
// 		console.log(jsondata);
// 		if (jsondata.code!=0) {
// 			alert("系统繁忙，请稍后再试～～");
// 		}
// 		else{
// 			getArticleList(jsondata.data);
// 		}
// });
//首次加载文章内容

	$.getJSON("/article/get_list?type_id=0&page=1&num="+5,function(jsondata){
			console.log("jsondata.date.items"+ jsondata.data.items);
			
			console.log(jsondata);
			if (jsondata.code!=0) {
				alert("系统繁忙，请稍后再试～～");
			}
			else{
				
				onePageItems(jsondata.data);
			}
	});


//根据第几页和每页的页数加载
function getPageData(page){
	$.getJSON("/article/get_list?type_id=0&page=" + page + "&num="+5,function(jsondata){
		console.log("jsondata.date.items"+ jsondata.data.items);				
		console.log(jsondata);
		if (jsondata.code!=0) {
			alert("系统繁忙，请稍后再试～～");
		}
		else{
			onePageItems(jsondata.data);
		}				
	});
}
//每页的每篇文章单篇加载
function onePageItems(jsondata){	
	var articles=jsondata.items;
	$("#js_articleList").empty();
	for (var i = 0; i < articles.length; i++) {
		var one_page = buildItem(articles[i]);
		$("#js_articleList").append(one_page);
	}
}
//当鼠标滑过tr时，图片朦胧
// $(".js_tr").hover(function(){
// 	// $(".article_cover img").css("opacity","0.5");
// 	$(this).find("img").css("opacity","0.7");
	
// });	
// $(".js_tr").mouseleave(function(){
// 	$(this).find("img").css("opacity","1")
// });

