$(function(){
	$("#search").attr("href","/front.1/html/search?keyWord=" + keyWord);
	$("#search_btn").click(function(){
	var	keyWord=$("#search").val();
	console.log("keyWord:" + keyWord);
	
	});
});
// $(function(){
// 	//发送请求，页面加载，默认开始加载分类为推荐的文章列表
// 	var keyWord=window.location.search;
// 	console.log(keyWord);
// 	$.getJSON("/article/search?key_word=" + keyWord + "&page=1&num="+5,function(jsondata){
// 		console.log(jsondata.code);
// 		if (jsondata.code!=0) {
// 			alert("系统繁忙，请稍后再试～～");
// 			return false;
// 		}
// 		if (jsondata.data.length==0) 
// 		{
// 			alert("系统没有找到相关内容，请重新输入关键字！");
// 			return false;
// 		}
// 		else{
// 			// refreshArticleList(jsondata.data);
// 			// console.log(jsondata.data);
// 		}

// 	});
	
// 	$("#search").click(function(){
// 		$("#articleList").empty();
// 		var keyWord=$("#search").val();
// 		console.log(keyWord);
// 		$.getJSON("/article/search?key_word="+keyWord,function(jsondata){
// 			if (jsondata.code!=0) {
// 				alert("系统繁忙，请稍后再试～～");
// 				return false;
// 			}
// 			if (jsondata.data.length==0) 
// 			{
// 				alert("系统没有找到相关内容，请重新输入关键字！");
// 				return false
// 			}
// 			else{
// 				// refreshArticleList(jsondata.data);
// 				// console.log(jsondata.data);
// 			}

// 		});
// 	});
// });


// $("#search_btn").click(function(){
// 	window.location.href="search.html"
// 	$("#articleList").empty();
// 	keyWord=$("#search").val();
// 	console.log("keyWord:" + keyWord);
// 	$.getJSON("/article/search?key_word=" + keyWord + "&page=1&num="+5,function(jsondata){
// 		console.log("jsondata.date.items"+ jsondata.data.items);
		
// 		console.log(jsondata);
// 		if (jsondata.code!=0) {
// 			alert("系统繁忙，请稍后再试～～");
// 		}
// 		else{

// 			onePageItems(jsondata.data);
			
// 		}
// 	});
// 	page=1;
// 	//根据第几页和每页的页数加载
// 	function getPageData(typeId){
// 		$.getJSON("/article/search?key_word=" + keyWord + "&page=" + page + "&num="+5,function(jsondata){
// 			console.log("jsondata.date.items"+ jsondata.data.items);				
// 			console.log(jsondata);
// 			if (jsondata.code!=0) {
// 				alert("系统繁忙，请稍后再试～～");
// 			}
// 			else{
				
// 				onePageItems(jsondata.data);
// 			}				
// 		});
// 	}
// });