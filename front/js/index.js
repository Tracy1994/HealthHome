

$(document).ready(function(){
		
	$("#n1").click(function(){
		$(".l-top img").load("/front/img/ghw.jpg");
		$("h5").load("http://img.ugirls.com/uploads/cooperate/baidu/20160519maipingguo.jpg");
		$(".l-top #tag").load("http://jquery.com/download/");
		$(".l-top h4").load("http://jquery.com/download/");
		$(".l-top p span").load("http://jquery.com/download/");
	});
	
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
		//页面加载
		$.get("/article/get_list?type_id=0",function(data){
			console.log(data);
			
			var id=eval("(" + date + ")").id;
			console.log(id);
			
		});
		//导航条的点击变色
		function MyTab(){
			var spans = document.getElementsByTagName('li');
			
			// alert(spans.length)
			console.log(spans)
			
			for(var i=0; i<spans.length;i++){
				spans[i].index = i;
				spans[i].onclick = function(){
					
					for(var i=0; i<spans.length;i++){
						spans[i].className = '';
					}
					this.className = 'current';				
				}
			}
		}		
		MyTab();
		checkCookie();
		

}

});
