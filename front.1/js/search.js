$(document).ready(function(){
	//发送请求，页面加载，默认开始加载分类为推荐的文章列表
	var keyWord=window.location.search;
	console.log(keyWord);
	$.getJSON("/article/search"+keyWord,function(jsondata){
		console.log(jsondata.code);
		if (jsondata.code!=0) {
			alert("系统繁忙，请稍后再试～～");
			return false;
		}
		if (jsondata.data.length==0) 
		{
			alert("系统没有找到相关内容，请重新输入关键字！");
			return false;
		}
		else{
			refreshArticleList(jsondata.data);
			console.log(jsondata.data);
		}

	});
	
	$("#search").click(function(){
		$("#articleList").empty();
		var keyWord=$("#keyWord").val();
		console.log(keyWord);
		$.getJSON("/article/search?key_word="+keyWord,function(jsondata){
			if (jsondata.code!=0) {
				alert("系统繁忙，请稍后再试～～");
				return false;
			}
			if (jsondata.data.length==0) 
			{
				alert("系统没有找到相关内容，请重新输入关键字！");
				return false
			}
			else{
				refreshArticleList(jsondata.data);
				console.log(jsondata.data);
			}

		});
	});
	//页面加载每篇文章的信息
	function refreshArticleList(articles){
		$("#articleList").empty();
		for (var i = 0; i < articles.length; i++) {
			var articleDiv = getArticleDiv(articles[i]);

			$("#articleList").append(articleDiv);
		}
	}
	//页面加载单篇文章的具体内容
	function getArticleDiv(article){
		
		var section= "<section>"+
			"<div class=\"l-top\">"+
			"<img src=\"" + article.author_head_url + "\">"+
			"<h5 class=\"l2\">" + article.like_cnt + "</h5>"+
			"<h4><a href=\"/front/html/article.html?article_id=" + article.id + "\".id +>" +article.title+"</a></h4>"+
			"<p><b>"+article.author+"</b><span>"+article.author_desp+"</span></p></div>"+
			"<div class=\"l-buttom\"><div class=\"summary\">"+
			"<img src=\""+article.cover_url+"\">"+
			"<span class=\"p\">"+article.summary+"</span></div><div class=\"bottom\">"+
			"<span class=\"r\" >阅读（"+article.click_cnt+"）</span>"+
			"<span class=\"c\">点赞（" + article.like_cnt + "）</span></div></div>"+
			"</section>"				
		return section;
	}
	window.onload = function(){
		//登录后改变html内容和退出登录
		function getCookieValue(cname) {
			var name = cname + "=";
			var ca = document.cookie.split(';');
			for(var i=0; i<ca.length; i++) 
		  	{
		  		var c = ca[i].trim();
		  		if (c.indexOf(name)==0)
		  		{
		  			return c.substring(name.length,c.length);
		  		}
		  	}
			return "";
		}

		function checkCookie() {
			var user_name=getCookieValue("user_name");
			var role=getCookieValue("role");
			console.log(user_name);
			if (user_name!="" && role==1) {
		  		console.log('add editer');
		  		$("#register").text("退出");
		  		$("#register").attr("href","/login/logout");
		  		$("#writer").text(user_name+"编辑");
		  		$("#writer").css("front-size","13px");
		  		$("#writer").attr("href","/front/html/writer.html");
		  		
		  	}
			else if (user_name!=""){
				
		  		$("#login").text(user_name);
		  		
		  		$("#register").text("退出");
		  		$("#register").attr("href","/login/logout");
		  	}		  	
		  	console.log("role:" + role);	  			  		
		}
		
		
		//导航条的点击变色和发送请求
		
		checkCookie();
	}
	

});