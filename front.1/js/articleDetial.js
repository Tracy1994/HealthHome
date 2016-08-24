
$(function(){
	var articleId=window.location.search;
	$.getJSON("/article/get_info_detail?article_id="+articleId,function(jsondata){
		console.log("jsondata.date.items"+ jsondata.data.items);
		
		console.log(jsondata);
		if (jsondata.code==-10007) {
			alert("抱歉，该文章已被作者删除～～");
			return false;
		}
		if (jsondata.code!=0) {
			alert("系统繁忙，请稍后再试～～");
			return false;
		}
		else{

			buildPage(jsondata.data);
			
		}
	});
});
// <header>
// 	<h3>爱人生气了？知道这些，你就能更好地哄TA 开心</h3>
// 	<p><span>作者： 梁家铭</span><span>2016-08-16</span></p>
// </header>
function buildHeader(article){
	var header=document.createElement("header");

	var title=document.createElement("h3");
	var title_txt=document.createTextNode(article.title);
	title.appendChild(title_txt);

	var p=document.createElement("p");

	var author=document.createElement("span");
	var author_txt=document.createTextNode("作者：" + article.author);

	var createTime=document.createElement("span");
	var createTimeAll=document.createElement(article.create_time);
	var createTime_txt=document.createTextNode(createTimeAll.substring(1,10));
	createTime.appendChild(createTime_txt);

	p.appendChild(author);
	p.appendChild(createTime);

	header.appendChild(title);
	header.appendChild(p);

	return header;

}
// <img src="/front.1/resource/articleCover.png" class="img-responsive article_cover" alt="Image">
function buildCover(article){
	var cover=document.createElement("img");
	cover.setAttribute("src",article.cover_url);
	cover.setAttribute("class","img-responsive article_cover");
	cover.setAttribute("alt","Image");

	return cover;
}

// <content  col-xs-12>
// 	以下内容来自「丁香医生」www.dxy.com
	
// </content>
function buildContent(article){
	var content=document.createElement("content");
	content.setAttribute("class","col-xs-12");
	var content_txt=document.createTextNode(article.detial);
	content.appendChild(content_txt);
}
// <div class="read col-xs-12">
// 	<button type="button" class="btn btn-default btn-sm">
// 	  <span class="glyphicon glyphicon-thumbs-up"></span> 
//		点赞(2)
// 	</button>
// 	<button type="button" class="btn btn-default btn-sm">
// 	  <span class="glyphicon glyphicon-star-empty"></span> 收藏
// 	  <!-- <span class="glyphicon glyphicon-star"></span> -->
// 	</button>
// </div>
function buildRead(article){
	var read=document.createElement("div");
	read.setAttribute("class","read col-xs-12");

	var btn_like=document.createElement("button");
	btn_like.setAttribute("type","button");
	btn_like.setAttribute("class","btn btn-default btn-sm");

	var span1=document.createElement("span");
	span1.setAttribute("class","glyphicon glyphicon-thumbs-up");

	var like_txt=document.createTextNode("点赞( " + article.like_cnt + ")");

	btn_like.appendChild(span1);
	btn_like.appendChild(like_txt);

	var btn_collection=document.createElement("button");
	btn_collection.setAttribute("type","button");
	btn_collection.setAttribute("class","btn btn-default btn-sm ");
	btn_collection.setAttribute("onclick","collectArticle(" + article.id + ")")

	var span2=document.createElement("span");
	span2.setAttribute("class","glyphicon glyphicon-star-empty collection");

	var btn_collection_txt.document.createTextNode("收藏" + article.collect_cnt + ")");

	btn_collection.appendChild(span2);
	btn_collection.appendChild(btn_collection_txt);

	read.appendChild(btn_like);
	read.appendChild(btn_collection);

	return read;
}

var collection_click=0;
function collectArticle(articleId){
	collection_click=collection_click+1;
	var b = collection_click % 2 ; 
	if (b == 0) 
	{ 
		alert("该整数是偶数！");
		$.getJSON("/collection/remove?article_id="+articleId,function(jsondata){
				console.log("jsondata.date.items"+ jsondata.data);
				
				console.log(jsondata);
				
				if (jsondata.code!=0) {
					alert("系统繁忙，请稍后再试～～");
					return false;
				}
				if (jsondata.code==0) {
					alert("已取消收藏");
					$(".collection").attr("class","glyphicon glyphicon-star-empty collection");
				}
			});

	} 
	if (b ==1) 
	{ 
		$.getJSON("/collection/add?article_id="+articleId,function(jsondata){
				console.log("jsondata.date.items"+ jsondata.data);
				
				console.log(jsondata);
				
				if (jsondata.code!=0) {
					alert("系统繁忙，请稍后再试～～");
					return false;
				}
				if (jsondata.code==0) {
					alert("已加入收藏～～")
					$(".collection").attr("class","glyphicon glyphicon-star collection");
				}
		}); 
	}

	
}