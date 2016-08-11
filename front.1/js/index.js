$(function(){
	$("#myCarousel").carousel("cycle");
	$("#js_nav2").css("display","none");
	$("#js_recomand").css("display","none");
});
//获取json对象
$.getJSON("/article/get_list?type_id=0",function(jsondata){
		console.log("jsondata.date"+ jsondata.data);
		
		console.log(jsondata);
		if (jsondata.code!=0) {
			alert("系统繁忙，请稍后再试～～");
		}
		else{
			refreshArticleList(jsondata.data);
		}
});

//加载一篇文章
function loadArticle(article){
	var tr=document.createElement("tr");
	tr.setAttribute("class","js_tr");
	var td=document.createElement("td");
		
	td.setAttribute("class","js_td");
	var link=document.createElement("a");
	// ;
	link.setAttribute("href",'/front.1/html/article.html?article_id=' + article.id);
	var box_l=document.createElement("div");
	box_l.setAttribute("class","col-xs-4 article_cover");
	img=document.createElement("img");
	img.setAttribute("src",article.cover_url);
	img.setAttribute("alt","Image");
	img.setAttribute("class","img-responsive");
	var box_r=document.createElement("div");
	box_r.setAttribute("class","col-xs-8 article_brief");
	title=document.createElement("h3");
	title_text=document.createTextNode(article.title);
	summary=document.createElement("p");
	summary_txt=document.createTextNode(article.summary);
	read=document.createElement("span");
	read.setAttribute("class","read");
	span1=document.createElement("span");
	span1.setAttribute("class","glyphicon glyphicon-eye-open");
	span_r=document.createElement("span");
	span_r_txt=document.createTextNode('  阅读（ '+article.click_cnt+' )  ');
	span2=document.createElement("span");
	span2.setAttribute("class","glyphicon glyphicon-thumbs-up");
	span_l=document.createElement("span");
	span_l_txt=document.createTextNode('  点赞（ '+article.like_cnt+' )');

	tr.appendChild(td);
	td.appendChild(link);

	link.appendChild(box_l);		
	link.appendChild(box_r);
	link.appendChild(read);

	box_l.appendChild(img);
	box_r.appendChild(title);		
	box_r.appendChild(summary);
	title.appendChild(title_text);
	summary.appendChild(summary_txt);		
	read.appendChild(span1);
	read.appendChild(span_r);
	span_r.appendChild(span_r_txt);
	read.appendChild(span2);
	read.appendChild(span_l);
	span_l.appendChild(span_l_txt);


	return tr;
		
}
//页面加载每篇文章的信息
function refreshArticleList(articles){
	$("#articleList").empty();
	for (var i = 0; i < 3; i++) {
		var articleDiv = loadArticle(articles[i]);
		$("#js_article_list").append(articleDiv);
	}

	$(".js_tr").hover(function(){

		// $(".article_cover img").css("opacity","0.5");
		$(this).find("img").css("opacity","0.7");
		
	});	
	$(".js_tr").mouseleave(function(){
		$(this).find("img").css("opacity","1")
	});

	// for (var i = 2; i < articles.length; i++) {
	// 	window.onscroll=function(){
	// 		var height=document.getElementById("js_tr").offsetHeight;
	// 		console.log(height);
	// 	// 	if () {}
	// 	// }
	// }
}
function addLoadEvent(func){
	var oldonload =window.onload
	if (typeof window.onload!="function") {
			window.onload=func;
	}
	else{
		window.onload=function(){
			oldonload();
			func();
		}
	}
}
	//登录后改变顶部内容和退出登录
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

function buildDropdownMeum() {
	console.log("role:" + role);
	var user_name=getCookieValue("user_name");
	console.log(user_name);
	var role=getCookieValue("role");
	console.log("user_name is "+user_name);
	
	if (user_name=="") {
		//当用户未登录时
		var li=document.createElement("li");
		var link=document.createElement("a");
		link.setAttribute("href","/front.1/html/login.html");	
		var link_span=document.createElement("span");
		link_span.setAttribute("class","glyphicon glyphicon-user");
		link_span_text=document.createTextNode("请登录");
		link_span.appendChild(link_span_text);
		link.appendChild(link_span);
		li.appendChild(link);
		$("#js_register").after(li);
	}
	//当用户为编辑时
	if (user_name!="" && role==1) {
		$("#js_register").css("display","none");
		// 按钮部分
		var li=document.createElement("li");
		var link=document.createElement("a");
		link.setAttribute("class","btn dropdown-toggle");
		link.setAttribute("id","dropdownMenu1");
		link.setAttribute("data-toggle","dropdown");
		var	link_txt=document.createTextNode(user_name);			
		var	span1=document.createElement("span");
		span1.setAttribute("class","glyphicon glyphicon-user");
		var span2=document.createElement("span");
		span2.setAttribute("class","caret");
		
		$("#js_index").after(li);
		li.appendChild(link);
		link.appendChild(span1);
		link.appendChild(link_txt);
		link.appendChild(span2);

		// 下拉菜单部分
		var ul=document.createElement("ul");
		ul.setAttribute("class","dropdown-menu");
		ul.setAttribute("role","menu");
		ul.setAttribute("aria-labelledby","dropdownMenu1");

		var li_collection=document.createElement("li");
		li_collection.setAttribute("role","presentation");

		var a_collection=document.createElement("a");
		a_collection.setAttribute("role","menuiteme");
		a_collection.setAttribute("tabindex","-1");
		a_collection.setAttribute("href","./html/collection.html");
		a_collection_text=document.createTextNode("我的收藏");
		li_collection.appendChild(a_collection);
		a_collection.appendChild(a_collection_text);

		var li_article=document.createElement("li");
		li_article.setAttribute("role","presentation");

		var a_article=document.createElement("a");
		a_article.setAttribute("role","menuiteme");
		a_article.setAttribute("tabindex","-1");
		a_article.setAttribute("href","./html/edit.html");
		a_article_text=document.createTextNode("发布文章");
		li_article.appendChild(a_article);
		a_article.appendChild(a_article_text);

		var li_edit_c=document.createElement("li");
		li_edit_c.setAttribute("role","presentation");

		var a_edit_c=document.createElement("a");
		a_edit_c.setAttribute("role","menuiteme");
		a_edit_c.setAttribute("tabindex","-1");
		a_edit_c.setAttribute("href","./html/carousel.html");
		a_edit_c_text=document.createTextNode("发布轮播");
		li_edit_c.appendChild(a_edit_c);
		a_edit_c.appendChild(a_edit_c_text);

		var li_logout=document.createElement("li");
		li_logout.setAttribute("role","presentation");

		var a_logout=document.createElement("a");
		a_logout.setAttribute("role","menuiteme");
		a_logout.setAttribute("tabindex","-1");
		a_logout.setAttribute("onclick","logOut()");
		a_logout_text=document.createTextNode("退出登录");

		li_logout.appendChild(a_logout);
		a_logout.appendChild(a_logout_text);
		ul.appendChild(li_collection);
		ul.appendChild(li_article);		
		ul.appendChild(li_edit_c);
		ul.appendChild(li_logout);
		$("#dropdownMenu1").after(ul);
	}
	//当用户已登录，用户为非编辑时
	if (user_name!="" && role!=1) {
		//按钮部分
		$("#js_register").css("display","none");
		var li=document.createElement("li");
		var link=document.createElement("a");
		link.setAttribute("class","btn dropdown-toggle");
		link.setAttribute("id","dropdownMenu1");
		link.setAttribute("data-toggle","dropdown");			
		var	link_txt=document.createTextNode(user_name);			
		var	span1=document.createElement("span");
		span1.setAttribute("class","glyphicon glyphicon-user");
		var span2=document.createElement("span");
		span2.setAttribute("class","caret");
		$("#js_index").after(li);
		li.appendChild(link);
		link.appendChild(span1);
		link.appendChild(link_txt);
		link.appendChild(span2);
		// 下拉菜单部分
		var ul=document.createElement("ul");
		ul.setAttribute("class","dropdown-menu");
		ul.setAttribute("role","menu");
		ul.setAttribute("aria-labelledby","dropdownMenu1");
		var li_collection=document.createElement("li");
		li_collection.setAttribute("role","presentation");
		var a_collection=document.createElement("a");
		a_collection.setAttribute("role","menuiteme");
		a_collection.setAttribute("tabindex","-1");
		a_collection.setAttribute("href","./html/collection.html");
		a_collection_text=document.createTextNode("我的收藏");
		li_collection.appendChild(a_collection);
		a_collection.appendChild(a_collection_text);

		var li_logout=document.createElement("li");
			li_logout.setAttribute("role","presentation");

		var a_logout=document.createElement("a");
			a_logout.setAttribute("role","menuiteme");
			a_logout.setAttribute("tabindex","-1");
			a_logout.setAttribute("onclick","logOut()");			
			a_logout_text=document.createTextNode("退出登录");

		li_logout.appendChild(a_logout);
		a_logout.appendChild(a_logout_text);
		ul.appendChild(li_collection);
		ul.appendChild(li_logout);
		$("#dropdownMenu1").after(ul);
	} 		  		  			  		
}
//点击退出登录，实现退出登录
function logOut(){
	var r=confirm("是否确认退出登录？")
	  if (r==true)
	    {
	    	$.getJSON("/login/logout",function(jsondata){
	    		if (jsondata.code==0) {
	    			window.location.href="/front.1/index.html";
	    		}
	    	});
	    
	    }
}
// 鼠标滑动，控制左右两侧导航栏出现和隐藏
window.onscroll= function (){
	var top=$("body").scrollTop();
	console.log(top);			
	if (top>=400) {
		$("#js_nav2").show();
		$("#js_recomand").show();
	}
	else{
		$("#js_nav2").hide();
		$("#js_recomand").hide();
	}
}

addLoadEvent(getCookieValue);
addLoadEvent(buildDropdownMeum);


