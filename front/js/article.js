$(document).ready(function(){
	var articleId=window.location.search;
	console.log(articleId);
	$.getJSON("/article/get_info"+articleId,function(jsondata){

		if (jsondata.code!=0) {
			alert("系统繁忙，请稍后再试～～");
		}
		else{
			getAuthor(jsondata.data);
			console.log(jsondata.data);
		}
	});
	$.get("/article/get_content"+articleId,function(strDate){
		console.log("strDate:"+strDate);
		if (strDate=="") {
			alert("系统繁忙，请稍后再试～～");
		}
		else{
			getArticle(strDate);
			
		}
	});
	function loadArticle(authorDate,articleDate){
		$("#author").empty();
		$("#article").empty();
		var authorDate=getAuthor(authorDate);
		var articleDate=getArticle(articleDate);
		console.log(authorDate);
		console.log(articleDate);
		$("#author").append(authorDate);
		$("#article").append(articleDate);
	}
	function getAuthor(author){
		var up="<section><div class=\"center\"><div class=\"title\"><h2>"+author.title+
		"</h2><p><span id=\"left\"> 作者："+author.author+"</span><span id=\"right\"><span>"
		+author.create_time+"</span><span>阅读（"	+author.click_cnt+"）</span></span></p>"
		+"</div><img src=\""+author.click_cnt+"\">"
		return up;
	}
	function getArticle(article){
		var down="<div class=\"article\">"+article+"</div>"
		return down;
	}

});