
$(function(){
	
	var articleId=window.location.search;
	console.log("articleId:"+articleId);
	$.getJSON("/article/get_info_detail"+articleId,function(jsondata){
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

	return content;
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
	btn_like.setAttribute("onclick","likeArticle(" + article.id +")");

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

	var btn_collection_txt=document.createTextNode("收藏" + article.collect_cnt + ")");

	btn_collection.appendChild(span2);
	btn_collection.appendChild(btn_collection_txt);

	read.appendChild(btn_like);
	read.appendChild(btn_collection);

	return read;
}

function likeArticle(articleId){
	$.get("/article/like?article_id"+articleId,function(data,status){
		
		if (data.code==-10003)
		{
			alert('请登录！');
			return false;
		}
		if (data.code==-10006)
		{
			alert('你已经赞过了哟～～');
			return false;
		}
		if (data.code!=0) {
			alert("系统繁忙，请稍后再试～～");
			return false;
		}
	});
}

var collection_click=0;
function collectArticle(articleId){
	collection_click=collection_click+1;
	var b = collection_click % 2 ; 
	if (b == 0) 
	{ 
		$.get("/collection/remove?article_id="+articleId,function(data,status){
			
			if (data.code==-10003)
			{
				alert('请登录！');
				return false;
			}
			if (data.code!=0) {
				alert("系统繁忙，请稍后再试～～");
				return false;
			}
		});
		
	} 
	if (b ==1) 
	{ 
		$.get("/collection/add?article_id="+articleId,function(){

		});
		$.getJSON("/collection/add?article_id="+articleId,function(jsondata){
				console.log("jsondata.date.items"+ jsondata.data);
				
				console.log(jsondata);
								
				if (jsondata.code==0) {
					
					$(".collection").attr("class","glyphicon glyphicon-star collection");
					alert("已加入收藏～～");
					return false;
				}
				if (data.code==-10003)
				{
					alert('请登录！');
					return false;
				}
				if (jsondata.code!=0) {
					alert("系统繁忙，请稍后再试～～");
					return false;
				}
		}); 
	}

	
}
// <div class="comment col-xs-12">
// 	<div class="col-xs-10">
// 		<textarea required="required" maxlength="200" placeholder="说说你的看法，不超过200字" ></textarea>
		
// 	</div>
// 	<div class="col-xs-2">
// 		<a class="btn btn-info " href="#" role="button">提交</a>
// 	</div>
	
// </div>
function buildComment(article){
	var comment=document.createElement("div");
	comment.setAttribute("class","col-xs-12");

	var col_10=document.createElement("div");
	col_10.setAttribute("class","col-xs-10");

	var textarea=document.createElement("textarea");
	textarea.setAttribute("class","comment");
	textarea.setAttribute("required","required");
	textarea.setAttribute("maxlength","200");
	textarea.setAttribute("placeholder","说说你的看法，不超过200字");

	col_10.appendChild(textarea);

	var col_2=document.createElement("div");
	col_2.setAttribute("class","col-xs-2");

	var link=document.createElement("a");
	link.setAttribute("class","btn btn-info");
	link.setAttribute("role","button");
	link.setAttribute("onclick","commentPublicFirst('" + JSON.stringify(article) + "')")

	var link_txt=document.createTextNode("提交");
	link.appendChild(link_txt);

	col_2.appendChild(link);

	comment.appendChild(col_10);
	comment.appendChild(col_2);

	return comment;

}
function commentPublicFirst(article){
	var article = JSON.parse(article);
	var textarea_txt=$(".comment").val();
	$.post("/comment/add", 
	{ 
	    article_id:article.id, 
	    content:textarea_txt
	}, 
	    function(data,status){ 
	    if (data.code==0) {
	    	buildReplayArticle(data);
	    	$(".comment").val("");
	    }
	    else{
	    	alert("系统繁忙，请稍后再试～～");
	    }
	});
}
// <div class="media col-xs-12">
// 	<img class="media-object pull-left" src="/front.1/resource/logo.jpg" alt="Image">
// 	<div class="media-body">
// 		<h4 class="media-heading">lala</h4>
// 		<p>这是我的评论巴拉拉这是我的评论巴拉拉这是我的评论巴拉拉这是我的评论巴拉拉这是我的评论巴拉拉这是我的评论巴拉拉</p>
// 		<div class="replay_box">
// 			<span>
// 				<a href="#" class="like">赞(1)</a>
// 				<a> | </a>
// 				<a data-toggle="collapse" data-target="#demo1" class="replay">回复</a>
// 			</span>
				
// 		</div>
// 		<div id="demo1"  class="collapse well well-lg replay_comment">
// 			<textarea name="" id="input" class="form-control " rows="3" required="required" maxlength="100" ></textarea>
// 			<button class="btn btn-default">提交</button>
// 		</div>
// 	</div>
// </div>
//对文章内容的评论
function buildReplayArticle(){

}
// <div class="replay_box">
// 	<span>
// 		<a href="#" class="like">赞(1)</a>
// 		<a> | </a>
// 		<a data-toggle="collapse" data-target="#demo1" class="replay">回复</a>
// 	</span>
		
// </div>
function buildReplayBox(comment){
	var replay=document.createElement("div");
	replay.setAttribute("class","replay_box");

	var span=document.createElement("span");

	var a1=document.createElement("a");
	a1.setAttribute("class","like");
	a1.setAttribute("onclick","replayLike(" + comment.id + ")");

	var a2=document.createElement("a");
	var a2_txt=document.createElement(" | ");

	var r
}
function replayLike(commentId){
	$.get("/comment/like?comment_id="+commentId,function(){
		if (jsondata.code==-10003)
		{
			alert('请登录！');
			return false;
		}
		if (jsondata.code==-10006)
		{
			alert('你已经赞过了哟～～');
			return false;
		}
		if (jsondata.code!=0) 
		{
			alert("系统繁忙，请稍后再试～～");
			return false;
		}
	});
	
}