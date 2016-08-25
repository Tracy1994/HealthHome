var articleId=window.location.search.substring(12,1400);
console.log("articleId:"+articleId);
$(function(){	
	$.getJSON("/article/get_info_detail?article_id="+articleId,function(jsondata){
		console.log("jsondata.date"+ jsondata.data);		
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

			buildArticle(jsondata.data);
		}
	});
});
function buildContent(){
	$.get("/article/get_content?article_id=" + articleId,function(data,status){
		console.log(data);
		if (jsondata.code!=0) {
			alert("系统繁忙，请稍后再试～～");
			return false;
		}
		else{
			$("content").text(data);
			
		}
	});
	
}

// <div class="article">
// 	<header>
// 		<h3>爱人生气了？知道这些，你就能更好地哄TA 开心</h3>
// 		<p><span class="author">作者： 梁家铭</span><span class="time">2016-08-16</span></p>
// 	</header>
	
// 	<img src="/front.1/resource/articleCover.png" class="img-responsive article_cover" alt="Image">
// 	<content  col-xs-12>
// 		以下内容来自「丁香医生」www.dxy.com
// 		如何评价一段恋爱关系的质量呢？

// 		最准确的评价标准其实只有一个：

// 		两个人都说好，才是真的好。

// 		在婚恋关系的心理咨询中，很多伴侣间产生感情问题的原因，都归咎于一种叫做“一致性错觉”的东西。

// 		什么是一致性错觉？

// 		简单来说，就是伴侣双方都会认为某些行为和事件，对两个人具有同样的情感意义。沉浸在爱情中的恋侣总是自信地认为，双方的三观是完全一致的，根本不可能出现任何分歧。

// 		然而，老司机们都知道，这是荷尔蒙战胜理性后
// 	</content>						
// 	<div class="read col-xs-12">
// 		<button type="button" class="btn btn-default btn-sm">
// 		  <span class="glyphicon glyphicon-thumbs-up"></span> 点赞(2)
// 		</button>
// 		<button type="button" class="btn btn-default btn-sm">
// 		  <span class="glyphicon glyphicon-star-empty"></span> 收藏
// 		  <!-- <span class="glyphicon glyphicon-star"></span> -->
// 		</button>
// 	</div>
// </div>
function buildArticle(article){


	// $(".article").empty();
	// var header=buildHeader(article);
	// var img=buildCover(article);
	// var content=buildContent();
	// var read=buildRead(article);

	// $(".article").append(header);
	// $(".article").append(img);
	
	// $(".article").append(read);

}
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
	var createTimeAll=article.create_time;
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
	$.get("/article/like?article_id="+articleId,function(data,status){
		
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

function replyArticle(){
	
	var textarea_txt=$("#js_reply_article").val();
	console.log(articleId);
	console.log(textarea_txt);
	$.post("/comment/add", 
	{ 
	    article_id: articleId, 
	    content: textarea_txt
	}, 
	    function(data,status){
	    	var objData=JSON.parse(data);
	    console.log(objData.code); 
	    if (objData.code==0) {

	    	buildreplyArticle(objData);
	    	debugger;
	    	$("#js_reply_article").val("");
	    	return false;
	    }
	    else{
	    	alert("系统繁忙，请稍后再试～～");
	    	return false;
	    }
	});
}

//首次加载文章内容的所有评论
function buildContents(articleId){
	$.getJSON("/comment/get_article_comments?article_id=" +articleId  + "page=1&num="+5,function(jsondata){
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


//根据第几页和每页的页数加载
function getPageData(page){
	$.getJSON("/comment/get_article_comments?article_id=" + articleId + "&page=" + page + "&num="+5,function(jsondata){
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
	var comments=jsondata.items;
	$(".reply").empty();
	for (var i = 0; i < comments.length; i++) {
		var one_page = buildreplyArticle(comments[i]);
		$(".reply").append(one_page);
	}
}

	
// </div>
// <div class="media col-xs-12">
// 	<img class="media-object pull-left" src="/front.1/resource/logo.jpg" alt="Image">
// 	<div class="media-body">
// 		<h4 class="media-heading">lala</h4>
// 		<p>这是我的评论巴拉拉这是我的评论巴拉拉这是我的评论巴拉拉这是我的评论巴拉拉这是我的评论巴拉拉这是我的评论巴拉拉</p>
// 		<div class="reply_box">
// 			<span>
// 				<a href="#" class="like">赞(1)</a>
// 				<a> | </a>
// 				<a data-toggle="collapse" data-target="#demo1" class="reply">回复</a>
// 			</span>
				
// 		</div>
// 		<div id="demo1"  class="collapse well well-lg reply_comment">
// 			<textarea name="" id="input" class="form-control " rows="3" required="required" maxlength="100" ></textarea>
// 			<button class="btn btn-default">提交</button>
// 		</div>
// 	</div>
// </div>


//对文章内容的评论
function buildreplyArticle(replyArticle){
	var col12=document.createElement("div");
	col12.setAttribute("class","col-xs-12");

	var img=document.createElement("img");
	img.setAttribute("class","media-object pull-left");
	img.setAttribute("src","/front.1/resource/User.jpg");

	var media_body=document.createElement("div");
	media_body.setAttribute("class","media-body");

	var h4=document.createElement("h4");
	h4.setAttribute("class","media-heading");
	h4_txt=document.createTextNode(replyArticle.user_name);
	h4.appendChild(h4_txt);

	var p=document.createElement("p");
	p_txt=document.createTextNode(replyArticle.content);
	p.appendChild(p_txt);

	var reply_box=buildreplyBox(replyArticle,"#demo1");
	var demo=buildDemo("demo1");

	media_body.appendChild(h4);
	media_body.appendChild(p);
	media_body.appendChild(reply_box);
	media_body.appendChild(demo);

	col12.appendChild(img);
	col12.appendChild(media_body);

	return col12;

}
// <div class="reply_box">
// 	<span>
// 		<a href="#" class="like">赞(1)</a>
// 		<a> | </a>
// 		<a data-toggle="collapse" data-target="#demo1" class="reply">回复</a>
// 	</span>
		
// </div>
function replyLike(commentId){
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
// <div id="demo1"  class="collapse well well-lg reply_comment">
// 	<textarea  class="form-control "  required="required" maxlength="100" ></textarea>
// 	<button class="btn btn-default">提交</button>
// </div>
function buildreplyBox(comment,demo){
	var reply=document.createElement("div");
	reply.setAttribute("class","reply_box");

	var span=document.createElement("span");

	var a1=document.createElement("a");
	a1.setAttribute("class","like");
	a1.setAttribute("onclick","replyLike(" + comment.id + ")");

	var a3=document.createElement("a");
	a3.setAttribute("data-toggle","collapse");
	a3.setAttribute("data-target",demo);
	a3.setAttribute("class","reply");

	var a3_txt=document.createTextNode("回复");
	a3.appendChild(a3_txt);

	reply.appendChild(a1);
	reply.appendChild(a3);

	return reply
}

function buildDemo(demo){
	var demo=document.createElement("div");
	demo.setAttribute("id",demo);
	demo.setAttribute("class","collapse well well-lg reply_comment");

	var textarea=document.createElement("textarea");
	textarea.setAttribute("class","form-control");
	textarea.setAttribute("required","required");
	textarea.setAttribute("maxlength","100");

	var btn=document.createElement("button");
	btn.setAttribute("class","btn btn-default");
	var btn_txt=document.createTextNode("提交");
	btn.appendChild(btn_txt);

	demo.appendChild(textarea);
	demo.appendChild(btn);

	return demo;

}