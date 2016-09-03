var articleId=window.location.search.substring(12,1400);
console.log("articleId:"+articleId);
var user_name=getCookieValue("user_name");
console.log("user_name:"+user_name);
//加载文章内容
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
			$.get("/article/get_content?article_id=" + articleId,function(data,status){
				console.log(data);
				$("content").text(data);
			});
			buildArticle(jsondata.data);
		}
	});
});
//加载文章内容
function buildArticle(article){
	// like_cnt=parseInt(article.like_cnt);
	var like_cnt=article.like_cnt;
	var collect_cnt=article.collect_cnt;
	$(".js_article_title").text(article.title);
	$(".author").text(article.author);
	// var createTimeAll=article.create_time;
	// var createTime_txt=document.createTextNode(createTimeAll.substring(1,10));
	$(".time").text(article.create_time);
	$(".article_cover").attr("src",article.cover_url);
	$(".glyphicon-thumbs-up").text("点赞(" + like_cnt +")");
	$(".collection").text("收藏(" + collect_cnt + ")");
	$(".writer_name").text("作者："+ article.author);
	$(".writer_bg").text(article.author_desp);
	$(".writer_header").attr("src",article.author_head_url);
}
//用户给文章点赞
function likeArticle(){
	$.post("/article/like?article_id="+articleId,
		{
			article_id:articleId
		},function(data,status){
			var objData=JSON.parse(data);
			if (objData.code==0) {
				var like_cnt=$(".glyphicon-thumbs-up").text();
				console.log("like_cnt:"+like_cnt.replace(/[^0-9]+/g, ''));
				var like_cnt=like_cnt.replace(/[^0-9]+/g, '');
				var like_cnt=Number(like_cnt)+1;
				$(".glyphicon-thumbs-up").text("点赞(" + like_cnt + ")");
				return false;
			}
			if (objData.code==-10003)
			{
				alert('请登录！');
				return false;
			}
			if (objData.code==-10006)
			{
				alert('你已经赞过了哟～～');
				return false;
			}
			if (objData.code!=0) {
				alert("系统繁忙，请稍后再试～～");
				return false;
			}
	});
	
}
var collection_click=0;
//点击收藏
function collectArticle(){
	collection_click=collection_click+1;
	var b = collection_click % 2 ;
	//读者取消收藏 
	if (b == 0) 
	{ 
		$.post("/collection/remove?article_id="+articleId,
			{
				article_id:articleId
			},
			function(data,status){
				var objData=JSON.parse(data);
				if (objData.code==0) {
					var collect_cnt=$(".collection").text();
					var collect_cnt=collect_cnt.replace(/[^0-9]+/g, '');
					var collect_cnt=Number(collect_cnt)-1;
					$(".collection").text("收藏(" + collect_cnt + ")");
					$(".collection").attr("class","glyphicon glyphicon-star-empty collection");
					return false;
				}
				if (objData.code==-10003)
				{
					alert('请登录！');
					return false;
				}
				if (objData.code!=0) {
					alert("系统繁忙，请稍后再试～～");
					return false;
				}
		});
	} 
	//读者收藏文章
	if (b ==1) 
	{ 
		$.post("/collection/add?article_id="+articleId,
			{
				article_id:articleId
			},
			function(data,status){
				var objData=JSON.parse(data);
				if (objData.code==0) {
					var collect_cnt=$(".collection").text();
					var collect_cnt=collect_cnt.replace(/[^0-9]+/g, '');
					var collect_cnt=Number(collect_cnt)+1;
					$(".collection").text("收藏(" + collect_cnt + ")");
					$(".collection").attr("class","glyphicon glyphicon-star collection");
					return false;
				}
				if (objData.code==-10003)
				{
					alert('请登录！');
					return false;
				}
				if (objData.code!=0) {
					alert("系统繁忙，请稍后再试～～");
					return false;
				}
		});
		
	}
}
//首次加载文章内容的第一页评论
$.getJSON("/comment/get_article_comments?article_id=" +articleId  + "page=1&num="+5,function(jsondata){
		console.log("jsondata.date.items"+ jsondata.data.items);
		
		console.log(jsondata);
		if (jsondata.code!=0) {
			alert("系统繁忙，请稍后再试～～");
		}
		else{				
			onePageItems(jsondata.data.items);
		}
});


//根据第几页和每页的页数加载文章评论
function getPageData(page){
	$.getJSON("/comment/get_article_comments?article_id=" + articleId + "&page=" + page + "&num="+5,function(jsondata){
		console.log("jsondata.date.items"+ jsondata.data.items);				
		console.log(jsondata);
		if (jsondata.code!=0) {
			alert("系统繁忙，请稍后再试～～");
		}
		else{
			onePageItems(jsondata.data.user_name , jsondata.data.content , jsondata.data.id);
		}				
	});
}
//每页的一页评论中的单条评论
function onePageItems(comment){	
	$("#reply").empty();
	for (var i = 0; i < comment.length; i++) {
		var one_page = buildItem(comment[i]);
		$("#reply").append(one_page);		
	}
	
}
// <div class="media col-xs-12">
// 	<img class="media-object pull-left" src="/front.1/resource/logo.jpg" alt="Image">
// 	<div class="media-body">
// 		<h4 class="media-heading">lala</h4>
// 		<p>这是我的评论巴拉拉这是我的评论巴拉拉这是我的评论巴拉拉这是我的评论巴拉拉这是我的评论巴拉拉这是我的评论巴拉拉</p>


// 	</div>
// </div>
//加载文章单条评论
function buildItem(comment){
	console.log("comment:"+comment);
	var col12=document.createElement("div");
	col12.setAttribute("class","col-xs-12 media");

	var img=document.createElement("img");
	img.setAttribute("class","media-object pull-left");
	img.setAttribute("src","/front.1/resource/User.jpg");

	var media_body=document.createElement("div");
	media_body.setAttribute("class","media-body");

	var h4=document.createElement("h4");
	h4.setAttribute("class","media-heading");
	h4_txt=document.createTextNode(comment.user_name);
	h4.appendChild(h4_txt);

	var p=document.createElement("p");
	p_txt=document.createTextNode(comment.content);
	p.appendChild(p_txt);

	var reply_box=buildreplyBox(comment);
	var collapse=buildCollapse(comment.id);

	media_body.appendChild(h4);
	media_body.appendChild(p);
	media_body.appendChild(reply_box);
	

	col12.appendChild(img);
	col12.appendChild(media_body);
	col12.appendChild(collapse);

	return col12;

}
// 		<div class="reply_box">
// 			<span>
// 				<a href="#" class="like">赞(1)</a>
// 				<a data-toggle="collapse" data-target="#demo1" class="reply">回复</a>
// 			</span>
				
// 		</div>
function buildreplyBox(comment){
	var reply=document.createElement("div");
	reply.setAttribute("class","reply_box");

	var span=document.createElement("span");

	var a1=document.createElement("a");
	a1.setAttribute("class","like");
	a1.setAttribute("id",comment.id);
	a1.setAttribute("onclick","likeComment('" + comment.id + "')");
	a1_txt=document.createTextNode("赞(" + comment.like_cnt + ")");
	a1.appendChild(a1_txt);



	var a3=document.createElement("a");
	a3.setAttribute("data-toggle","collapse");
	a3.setAttribute("data-target","#" + comment.id);
	a3.setAttribute("class","reply");

	var a3_txt=document.createTextNode( " 回复");
	a3.appendChild(a3_txt);

	reply.appendChild(a1);
	reply.appendChild(a3);

	return reply
}
//评论点赞
function likeComment(commentId){
	$.post("/comment/like?comment_id="+commentId,
		{
			comment_id:commentId
		},
		function(data,status){
			var objData=JSON.parse(data);
			if (objData.code==0) {
				var comment_cnt=$("#"+commentId).text();
				console.log(comment_cnt);
				var comment_cnt=comment_cnt.replace(/[^0-9]+/g, '');
				var comment_cnt=Number(comment_cnt)+1;
				$("#"+commentId).text("赞(" + comment_cnt + ")");
				return false;
			}
			if (objData.code==-10003)
			{
				alert('请登录！');
				return false;
			}
			if (objData.code==-10006)
			{
				alert('你已经赞过了哟～～');
				return false;
			}
			if (objData.code!=0) {
				alert("系统繁忙，请稍后再试～～");
				return false;
			}
	});
}
// 		<div id="demo1"  class="collapse well well-lg reply_comment">
// 			<textarea class="form-control " required="required" maxlength="100" ></textarea>
// 			<button class="btn btn-default">提交</button>
// 		</div>
function buildCollapse(commentId){
	var demo=document.createElement("div");
	demo.setAttribute("id",commentId);
	demo.setAttribute("class","collapse well well-lg reply_comment");

	var textarea=document.createElement("textarea");
	textarea.setAttribute("class","form-control");
	textarea.setAttribute("required","required");
	textarea.setAttribute("maxlength","100");

	var btn=document.createElement("button");
	btn.setAttribute("class","btn btn-default");
	btn.setAttribute("onclick","buildUserReply('" + commentId + "')")
	var btn_txt=document.createTextNode("提交");
	btn.appendChild(btn_txt);

	demo.appendChild(textarea);
	demo.appendChild(btn);

	return demo;

}
//发表文章评论
// function replyArticle(){
// 	var user_name=getCookieValue("user_name");
// 	var textarea_txt=$("#js_reply_article").val();
// 	console.log(articleId);
// 	console.log(textarea_txt);
// 	$.post("/comment/add", 
// 	{ 
// 	    article_id: articleId, 
// 	    content: textarea_txt
// 	}, 
// 	    function(data,status){
// 	    var objData=JSON.parse(data);
// 	    console.log(objData.code); 
// 	    if (objData.code==0) {
// 	    	$("#js_reply_article").val("");
// 	    	var id=objData.id;
// 	    	var newItem= buildItem(user_name,textarea_txt,id);
// 	    	$(".reply").append(one_page);
// 	    	return false;
// 	    }
// 	    else{
// 	    	alert("系统繁忙，请稍后再试～～");
// 	    	return false;
// 	    }
// 	});
// }

//回复评论
// function buildItem(user_name,content,id){
// 	var col12=document.createElement("div");
// 	col12.setAttribute("class","col-xs-12");

// 	var img=document.createElement("img");
// 	img.setAttribute("class","media-object pull-left");
// 	img.setAttribute("src","/front.1/resource/User.jpg");

// 	var media_body=document.createElement("div");
// 	media_body.setAttribute("class","media-body");

// 	var h4=document.createElement("h4");
// 	h4.setAttribute("class","media-heading");
// 	h4_txt=document.createTextNode(user_name);
// 	h4.appendChild(h4_txt);

// 	var p=document.createElement("p");
// 	p_txt=document.createTextNode(content);
// 	p.appendChild(p_txt);

// 	var reply_box=buildreplyBox("#demo1",id);
// 	var demo=buildDemo("demo1",id);

// 	media_body.appendChild(h4);
// 	media_body.appendChild(p);
// 	media_body.appendChild(reply_box);
// 	media_body.appendChild(demo);

// 	col12.appendChild(img);
// 	col12.appendChild(media_body);

// 	return col12;

// }