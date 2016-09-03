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

function creatButton(text){
	// 按钮部分	
	var link=document.createElement("a");
	link.setAttribute("class","btn dropdown-toggle");
	link.setAttribute("id","dropdownMenu1");
	link.setAttribute("data-toggle","dropdown");	
	var link_span_text=document.createTextNode(text);
				
	var	span1=document.createElement("span");
	span1.setAttribute("class","glyphicon glyphicon-user");
	var span2=document.createElement("span");
	span2.setAttribute("class","caret");
		
	link.appendChild(link_span_text);
	link.appendChild(span1);	
	link.appendChild(span2);

	return link;
}
function dropdownList(event,url,text){

	var li=document.createElement("li");
	li.setAttribute("role","presentation");
	var a=document.createElement("a");
	a.setAttribute("role","menuiteme");
	a.setAttribute("tabindex","-1");
	a.setAttribute(event,url);
	a_text=document.createTextNode(text);
	li.appendChild(a);
	a.appendChild(a_text);

	return li;
}

function logInLink(){
	var li=document.createElement("li");
	var link=document.createElement("a");
	link.setAttribute("class","btn")		
	link.setAttribute("href","/front.1/html/login.html");
	var link_span_text=document.createTextNode("请登录");

	var	span1=document.createElement("span");
	span1.setAttribute("class","glyphicon glyphicon-user");
	var span2=document.createElement("span");
	span2.setAttribute("class","caret");
			
	li.appendChild(link);
	link.appendChild(link_span_text);
	link.appendChild(span1);	
	link.appendChild(span2);

	return li;
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

function buildDropdownMeum(dropdown){
	console.log("role:" + role);
	var user_name=getCookieValue("user_name");
	console.log(user_name);
	var role=getCookieValue("role");
	console.log("user_name is "+user_name);
	if (user_name=="") {
		//当用户未登录时
		var li=logInLink();
		$("#js_register").after(li);			
	}
	//当用户为编辑时
	if (user_name!="" && role==1) {
		$("#js_register").css("display","none");
		var li=document.createElement("li");
		li.setAttribute("class","dropdown");
		var ul=document.createElement("ul");
		ul.setAttribute("class","dropdown-menu");
		ul.setAttribute("role","menu");
		ul.setAttribute("aria-labelledby","dropdownMenu1");

		var button=creatButton(user_name);
		var collection=dropdownList("href","/front.1/html/collection.html","我的收藏");
		var articleList=dropdownList("href","/front.1/html/articleList.html","发布文章");
		var carousePreview=dropdownList("href","/front.1/html/carouselPreview.html","发布轮播");
		var logOut=dropdownList("onclick","logOut()","退出登录");
		
		$("#js_index").after(li);
		li.appendChild(button);
		li.appendChild(ul);
		ul.appendChild(collection);
		ul.appendChild(articleList);
		ul.appendChild(carousePreview);
		ul.appendChild(logOut);	
		
	}
	//当用户已登录，用户为非编辑时
	if (user_name!="" && role!=1) {
		
		$("#js_register").css("display","none");		
		var button=creatButton(user_name);
		var collection=dropdownList("href","/front.1/html/collection.html","我的收藏");
		var logOut=dropdownList("onclick","logOut()","退出登录");

		var li=document.createElement("li");
		li.setAttribute("class","dropdown");
		var ul=document.createElement("ul");
		ul.setAttribute("class","dropdown-menu");
		ul.setAttribute("role","menu");
		ul.setAttribute("aria-labelledby","dropdownMenu1");

		
		$("#js_index").after(li);
		li.appendChild(button);
		li.appendChild(ul);
		ul.appendChild(collection);
		ul.appendChild(logOut);		
	} 	
}

addLoadEvent(buildDropdownMeum);

	


