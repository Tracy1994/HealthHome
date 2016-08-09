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
		checkCookie();

	}	
	$.getJSON("/article/get_info"+articleId,function(jsondata){

		if (jsondata.code!=0) {
			alert("系统繁忙，请稍后再试～～");
		}

		else{
			console.log(jsondata.data);
			loadAuthor(jsondata.data);
			
		}
	});
	$.get("/article/get_content"+articleId,function(strDate){

		console.log("strDate:"+strDate);
		loadArticle(strDate);
		
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
		+"</div><img src=\""+author.cover_url+"\">"
		console.log(author.has_like);
		if (author.has_like==0) {
			$('#love').attr('disable','false');
			$('#love').css("background-color","rgb(0,179,138)");
		}
		else{
			$("#love").attr('disable',"true");
			$("#love").css("background-color","rgb(120,120,120)");
		}
		return up;

	}
	function getArticle(article){
		var down="<div class=\"article\">"+article+"</div>"
		return down;
	}
	//点赞
	$("#love").click(function(){
		var url="/article/like"+articleId
		console.log(url);
		$.getJSON(url,function(jsondata){
			console.log(jsondata);
			console.log(jsondata.code);
			if (jsondata.code==-10003)
			 {
			 	alert('请登录！');
			 }
			 if (jsondata.code==-10006)
			  {
			  	alert('你已经赞过了哟～～');
			  }
			if (jsondata.code==0)

			 {
			 	$("#love").attr('disable',"true");
			 	$("#love").css("background-color","rgb(120,120,120)");
			 }
		});

	});

});