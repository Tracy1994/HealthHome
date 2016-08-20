$(function() {
	$( ".sortable" ).sortable({
		cursor: "move",
		items :"li",                        //只是li可以拖动
		opacity: 0.6,                       //拖动时，透明度为0.6
		revert: true,                       //释放时，增加动画
		update : function(event, ui){       //更新排序之后
			$(this).sortable("toArray");
		   // alert();
		}
		});
	$("#publish").click(function(){

	});
});
//为了得到总页数
$.getJSON("/carousel/get_list",function(jsondata){

	if (jsondata.code!=0) {
		alert("系统繁忙，请稍后再试～～");
	}
	else{
		getArticleList(jsondata.data);
	}
});
//according to the popularity,get Json object of article list 
// $.getJSON("/article/get_list?type_id=0",function(jsondata){
// 		console.log("jsondata.date.items"+ jsondata.data.items);
		
		// console.log(jsondata);
		// if (jsondata.code!=0) {
		// 	alert("系统繁忙，请稍后再试～～");
		// }
		// else{
		// 	getArticleList(jsondata.data);
		// }
// });
//首次加载文章内容
function getFirstPageData(){
	$.getJSON("/carousel/get_list?page=1" + "&num="+5,function(jsondata){
			console.log("jsondata.date.items"+ jsondata.data.items);				
			console.log(jsondata);
			if (jsondata.code!=0) {
				alert("系统繁忙，请稍后再试～～");
			}
			else{
				var items=jsondata.data.items;
				var articleIds;
				onePageItems(jsondata.data.items);
				for (var i = 0; i <items.length; i++) {
					if (i==0) {
						articleIds=items[i].article_id;
					}
					else{
						articleIds += "_"+items[i].article_id;
					}
									
				}
				console.log("articleIds:"+articleIds);
				$.getJSON("/article/get_info_list?article_ids=" + articleIds,function(jsondata){
					console.log("jsondata.date.items"+ jsondata.data.items);				
					console.log(jsondata);
					if (jsondata.code!=0) {
						alert("系统繁忙，请稍后再试～～");
					}
					else{
						onePageItems(jsondata.data.items);
					}				
				});
			}		

		});						
}
//根据第几页和每页的页数加载

function getPageData(page){
	$.getJSON("/carousel/get_list?page="+page+ "&num="+5,function(jsondata){
		console.log("jsondata.date.items"+ jsondata.data.items);				
		console.log(jsondata);
		if (jsondata.code!=0) {
			alert("系统繁忙，请稍后再试～～");
		}
		else{
			var items=jsondata.data.items;
			var articleIds;
			onePageItems(jsondata.data.items);
			for (var i = 0; i <items.length; i++) {
				if (i==0) {
					articleIds=items[i].article_id;
				}
				else{
					articleIds += "_"+items[i].article_id;
				}
								
			}
			console.log("articleIds:"+articleIds);
			$.getJSON("/article/get_info_list?article_ids=" + articleIds,function(jsondata){
				console.log("jsondata.date.items"+ jsondata.data.items);				
				console.log(jsondata);
				if (jsondata.code!=0) {
					alert("系统繁忙，请稍后再试～～");
				}
				else{
					onePageItems(jsondata.data.items);
				}				
			});
		}		

	});
	
}
//每页的每篇文章单篇加载
function onePageItems(articles){
	$("#js_articleList").empty();
	for (var i = 0; i < articles.length; i++) {
		var one_page = loadArticle(articles[i]);
		$("#js_articleList").append(one_page);
	}
}
