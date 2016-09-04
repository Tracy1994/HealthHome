//分页加载文章及按钮
function loadPageBtnGroup(jsondata){
	var articleNum=jsondata.count;
	console.log("articleNum:"+articleNum);
	if (articleNum==0) {
		$(".page").hide();
	}
	var pageNum= Math.ceil(articleNum/5);	
	console.log("pageNum:"+pageNum);
	console.log("articleNum:"+articleNum);
	if (pageNum==1) {
		$("#js_btn2").hide();
		$("#js_btn3").hide();
		
	}
	if (pageNum==2 ||pageNum==3) {
		
		if (pageNum==2) {
			$("#js_btn3").hide();	
		}
				
		$("#js_btn1").click(function(){

			$("#js_btn1").addClass("active");
			$("#js_btn2").removeClass("active");
			$("#js_btn3").removeClass("active");
			var page=parseInt($("#js_btn1").text());
			getPageData(page);
			
		});
		$("#js_btn2").click(function(){
			
			$("#js_btn3").removeClass("active");
			$("#js_btn2").addClass("active");
			$("#js_btn1").removeClass("active");
			var page=parseInt($("#js_btn2").text());
			getPageData(page);
		});
		$("#js_btn3").click(function(){
			
			$("#js_btn2").removeClass("active");
			$("#js_btn3").addClass("active");
			$("#js_btn1").removeClass("active");
			var page=parseInt($("#js_btn3").text());
			getPageData(page);
		});
	}

	if (pageNum>3) 
	{
		
		$("#js_btn1").click(function(){
			var page=parseInt($("#js_btn1").text());
			getPageData(page);
			if (page==1) {
				
				$("#js_btn1").addClass("active");
				$("#js_btn2").removeClass("active");
				$("#js_btn3").removeClass("active");
				return false;
			}
			else{

				$("#js_btn2").removeClass("active");
				$("#js_btn3").removeClass("active");
				$("#js_btn1").removeClass("disabled");
				$("#js_btn3").removeClass("disabled");
				$("#js_btn1").addClass("active");
				var btn1Num=parseInt($("#js_btn1").text());					
				var btn2Num=btn1Num;
				var btn3Num=eval( btn1Num+1);
				var btn1Num=eval( btn1Num-1);				
				$("#js_btn1").text(btn1Num);
				$("#js_btn2").text(btn2Num);
				$("#js_btn3").text(btn3Num);
			}
			

		});
		$("#js_btn2").click(function(){
			
			var page=parseInt($("#js_btn2").text());
			$("#js_btn1").removeClass("disabled");
			$("#js_btn3").removeClass("disabled");
			$("#js_btn1").removeClass("active");
			$("#js_btn3").removeClass("active");
			$("#js_btn2").addClass("active");
			getPageData(page);
		});
		$("#js_btn3").click(function(){
			var page=parseInt($("#js_btn3").text());				
			getPageData(page);
			if (page==pageNum) 
			{
				$("#js_btn1").removeClass("active");
				$("#js_btn2").removeClass("active");				
				$("#js_btn3").text( pageNum+"(最后一页)");					
			}
			else{
				var btn3Num=parseInt($("#js_btn3").text()) ;
				$("#js_btn1").removeClass("disabled");
				$("#js_btn3").removeClass("disabled");
				$("#js_btn1").removeClass("active");
				$("#js_btn2").removeClass("active");
				$("#js_btn3").addClass("active");
				var btn3Num=parseInt($("#js_btn3").text()) ;
				var btn2Num=btn3Num;
				var btn1Num=eval( btn3Num-1);		
				var btn3Num=eval( btn3Num+1);
				$("#js_btn1").text(btn1Num);
				$("#js_btn2").text(btn2Num);
				$("#js_btn3").text(btn3Num);
			}
		});
	}	
}