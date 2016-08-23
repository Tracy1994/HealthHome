
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

//加载轮播内容
//原html
// <div id="myCarousel" class="carousel slide ">
// 	<ol class="carousel-indicators">
// 	     <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
// 	     <li data-target="#myCarousel" data-slide-to="1"></li>
// 	     <li data-target="#myCarousel" data-slide-to="2"></li>
// 	     <li data-target="#myCarousel" data-slide-to="3"></li>
// 	</ol> 
// 	<div class="carousel-inner">
// 		<div class="item active">
//         	<img src="./resource/1.jpg" alt="First slide">	         
//     	</div>
//         <div class="item">
//          <img src="./resource/2.jpg" alt="Second slide">
//         </div>
//         <div class="item">
//          <img src="./resource/3.jpg" alt="Third slide">
//         </div>
//         <div class="item">
//          <img src="./resource/4.jpg" alt="Third slide">
//         </div>	        
// 	</div>
// 	<div class="img_info">
// 		<div class="writer_name">writer name</div>
// 		<div class="writer_info">writer_info</div>
// 		<h1>the title of this img</h1>
// 		<div class="detile">this is the detial infomation this picture</div>
// 	</div>
// 	<a class="carousel-control left" href="#myCarousel" 
//       data-slide="prev"><span class="glyphicon glyphicon-chevron-left"></span></a>
//  <a class="carousel-control right" href="#myCarousel" 
//       data-slide="next"><span class="glyphicon glyphicon-chevron-right"></span></a>
// </div>
//
$.getJSON("/carousel/get_effect_list",function(jsondata){
		console.log("jsondata.date.items"+ jsondata.data.items);
		
		console.log(jsondata);
		if (jsondata.code!=0) {
			alert("系统繁忙，请稍后再试～～");
		}
		else{
			
			carouselIndicators(jsondata.data.items);
			carouselInner(jsondata.data.items);
			// imgInfo(jsondata.data.items);

		}
});

function carouselIndicators(jsondata){
	var slideNum=jsondata.length;
	$(".carousel-indicators").empty();

	for (var i = 0; i <slideNum; i++) {

		var li=document.createElement("li");
		li.setAttribute("data-target","#myCarousel");
		li.setAttribute("data-slide-to",i);
		if (i==0) {
			li.setAttribute("class","active");
		}
		$(".carousel-indicators").append(li);		
	}
	
}
// <div class="item active">
// 	<img src="./resource/1.jpg" alt="First slide">	         
// </div>
function carouselInner(carousel){
	var slideNum=carousel.length;
	// debugger;
	$(".carousel-inner").empty();

	for (var i = 0; i < slideNum; i++) {
		
		var item=document.createElement("div");
		
		if (i==0) {
			item.setAttribute("class","active item");
		}
		else{
			item.setAttribute("class","item");
		}
		var img=document.createElement("img");
		img.setAttribute("src",carousel[i].img_url);
		console.log(carousel[i].img_url);		

		img_info=imgInfo(carousel[i]);

		item.appendChild(img);
		item.appendChild(img_info);
				

		$(".carousel-inner").append(item);
					
	}
	
}

function imgInfo(carousel){
	console.log(carousel);
	var img_info=document.createElement("div");
	img_info.setAttribute("class","img_info");

	var writer_name=document.createElement("div");
	writer_name.setAttribute("class","writer_name");
	var writer_name_text=document.createTextNode(carousel.author);
	writer_name.appendChild(writer_name_text);

	var writer_info=document.createElement("div");
	writer_info.setAttribute("class","writer_info");
	var writer_info_text=document.createTextNode(carousel.author_desp);
	writer_info.appendChild(writer_info_text);

	var h1=document.createElement("h1");
	title=document.createTextNode(carousel.title);
	h1.appendChild(title);

	var detial=document.createElement("div");
	detial.setAttribute("class","detial");
	var detial_text=document.createTextNode(carousel.summary);
	detial.appendChild(detial_text);

	
	img_info.appendChild(writer_name);
	img_info.appendChild(writer_info);
	img_info.appendChild(h1);
	img_info.appendChild(detial);
	return img_info;
}

//首次加载文章内容
$.getJSON("/article/get_list?type_id=0&page=1&num="+5,function(jsondata){
	console.log("jsondata.date.items"+ jsondata.data.items);
	
	console.log(jsondata);
	if (jsondata.code!=0) {
		alert("系统繁忙，请稍后再试～～");
	}
	else{

		onePageItems(jsondata.data);
		
	}
});

	
//根据第几页和每页的页数加载
function getPageData(page){
	$.getJSON("/article/get_list?type_id=0&page=" + page + "&num="+5,function(jsondata){
		console.log("jsondata.date.items"+ jsondata.data.items);				
		console.log(jsondata);
		if (jsondata.code!=0) {
			alert("系统繁忙，请稍后再试～～");
		}
		else{
			
			onePageItems(jsondata.data);
		}				
	});
}
// <button type="button" class="btn btn-lg btn-default">button</button>
var page=1;
function onePageItems(jsondata){
	$("#downBtn").remove();
	var articleNum=jsondata.count;
	var carousels=jsondata.items;		
	var pageNum=Math.ceil(articleNum/5);		
	for (var i = 0; i < carousels.length; i++) {
		var one_page = buildItem(carousels[i]);
		$("#js_article_list").append(one_page);
	}

	var btn=downBtn(articleNum);
	$("#js_article_list").append(btn);
	
	if (page >= pageNum)
	{
		$("#downBtn").empty();
		$("#downBtn").text("已经到达底部");
		$("#downBtn").addClass("disabled");
	}
}

function downBtn(articleNum){
	var downBtn=document.createElement("button");
	downBtn.setAttribute("class","btn btn-default ");
	downBtn.setAttribute("id","downBtn");
	downBtn.setAttribute("type","button");
	downBtn.setAttribute("onclick","loading(" + articleNum + ")");

	var span=document.createElement("span");
	span.setAttribute("class","glyphicon glyphicon-circle-arrow-down");

	downBtn.appendChild(span);

	return downBtn;
}

function loading(Num){
	var articleNum=Num;
	
	var pageNum=Math.ceil(articleNum/5);	
	console.log("pageNum:"+pageNum);
	
	if (page < pageNum) {
		page = page + 1;
		getPageData(page, pageNum);
	}
	
}



//加载文章列表
function buildItem(article){
		var tr=document.createElement("tr");
		tr.setAttribute("class","js_tr");

		var td=document.createElement("td");		
		td.setAttribute("class","js_td");

		var link=document.createElement("a");
		link.setAttribute("href",'/front.1/html/articleDetial.html?article_id=' + article.id);

		tr.appendChild(td);
		td.appendChild(link);

		var box_l= buildArticleCover(article,"col-xs-4");
		var box_r=buildArticleBrief(article,"col-xs-8");
		var read=buildRead(article);

		link.appendChild(box_l);		
		link.appendChild(box_r);
		box_r.appendChild(read);

		return tr;
			
	}



