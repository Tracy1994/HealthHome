$(document).ready(function(){
	var articleId=window.location.search;
	console.log("articleId:"+articleId);
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
	$.getJSON("/article/get_info"+articleId,function(jsondata){

		if (jsondata.code!=0) {
			alert("系统繁忙，请稍后再试～～");
		}
		else{
			loadAuthor(jsondata.data);
			console.log(jsondata.data);
		}
	});
	$.get("/article/get_content"+articleId,function(strDate){
		console.log("strDate:"+strDate);
		if (strDate=="") {
			alert("系统繁忙，请稍后再试～～");
		}
		else{
			loadArticle(strDate);
			
		}
	});
	function loadArticle(articleDate){
		
		$("#article").empty();
		
		var articleDate=getArticle(articleDate);
		console.log(articleDate);
		
		$("#article").append(articleDate);
	}
	function loadAuthor(authorDate){
		$("#author").empty();
		var authorDate=getAuthor(authorDate);
		$("#author").append(authorDate);
	}
	function getAuthor(author){
		var up="<section><div class=\"center\"><div class=\"title\"><h2>"+author.title+
		"</h2><p><span id=\"left\"> 作者："+author.author+"</span><span id=\"right\"><span>"
		+author.create_time+"</span><span>阅读（"	+author.click_cnt+"）</span></span></p>"
		+"</div><img src=\""+author.click_cnt+"\">"
		return up;
	}
	function getArticle(article){
		var down="<div class=\"article\">"+article+"<button>赞</button></div>"
		return down;
	}
	$("button").click(function(){
		var url="/article/like"+articleId
		$.get("url",function(data,status){
			if (status==success) 
			{
				$("button").css("bacground-color","rgb(120,120,120)");
			}
		});

	});

});