$(function(){
	//顶部导航栏
	var navlists=$(".nav_ul li");
	for (var i = 0; i < navlists.length; i++) {
		navlists.eq(i).attr("class",i);
		if (i==0) {
			navlists.eq(i).attr("class", "active "+i);
		}
	}
	$(".nav_ul li").click(function(){
		page=1;
		$(".nav_ul li").removeClass("active");
		$("#js_article_list").empty();
		type_id=$(this).attr("class");
		$(this).addClass("active");
		getPageData(type_id);
		console.log("type_id:"+type_id);
	});
	// 鼠标滑动，控制左右两侧导航栏出现和隐藏
	window.onscroll= function (){
		var top=$(document).scrollTop();
		// var top=$("body").scrollTop();
		console.log(top);			
		if (top>=340) {
			
			$("#js_recomand").css("top","0px");
			
		}
		else{
			
			$("#js_recomand").css("top","700px");
		}
	}

});