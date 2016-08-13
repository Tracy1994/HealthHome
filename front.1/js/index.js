
$(function(){
	$("#myCarousel").carousel("cycle");
	$("#js_nav2").css("display","none");
	$("#js_recomand").css("display","none");

	
	
		// for (var i = 2; i < articles.length; i++) {
		// 	window.onscroll=function(){
		// 		var height=document.getElementById("js_tr").offsetHeight;
		// 		console.log(height);
		// 	// 	if () {}
		// 	// }
		// }
	

		//登录后改变顶部内容和退出登录


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

});
function loadArticle(article){
		var tr=document.createElement("tr");
		tr.setAttribute("class","js_tr");

		var td=document.createElement("td");		
		td.setAttribute("class","js_td");

		var link=document.createElement("a");
		link.setAttribute("href",'/front.1/html/article.html?article_id=' + article);

		tr.appendChild(td);
		td.appendChild(link);

		var box_l= buildArticleCover(article,"col-xs-4");
		var box_r=buildArticleBrief(article,"col-xs-8");
		var read=buildRead(article);

		link.appendChild(box_l);		
		link.appendChild(box_r);
		link.appendChild(read);

		return tr;
			
	}



