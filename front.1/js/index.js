
$(function(){
	$("#myCarousel").carousel("cycle");	
		


	// 鼠标滑动，控制左右两侧导航栏出现和隐藏
	window.onscroll= function (){
		var top=$("body").scrollTop();
		console.log(top);			
		if (top>=400) {
			
			$("#js_nav2").css("top","100px");
			$("#js_recomand").css("top","53px");
			
		}
		else{
			$("#js_nav2").css("top","700px");
			$("#js_recomand").css("top","700px");
		}
	}

});

//加载轮播内容

$.getJSON("/carousel/get_effect_list",function(jsondata){
		console.log("jsondata.date.items"+ jsondata.data.items);
		
		console.log(jsondata);
		if (jsondata.code!=0) {
			alert("系统繁忙，请稍后再试～～");
		}
		else{
			
			carouselIndicators(jsondata.data.items);
			carouselInner(jsondata.data.items);
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


function carouselInner(carousel){
	var slideNum=carousel.length;
	// debugger;
	$(".carousel-inner").empty();
	if (slideNum==0) {
		$(".glyphicon-chevron-left").hide();
		$(".glyphicon-chevron-right").hide();
		return false;
	}
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

		var img_info=imgInfo(carousel[i]);

		item.appendChild(img);
		item.appendChild(img_info);
				

		$(".carousel-inner").append(item);
					
	}
	
}

function imgInfo(carousel){
	$(".writer_name").text(carousel.author);
	$(".writer_info").text(carousel.author_desp);
	$("h1").text(carousel.title);
	$(".detile").text(carousel.summary);
	// console.log(carousel);
	// var img_info=document.createElement("div");
	// img_info.setAttribute("class","img_info");

	// var writer_name=document.createElement("div");
	// writer_name.setAttribute("class","writer_name");
	// var writer_name_text=document.createTextNode(carousel.author);
	// writer_name.appendChild(writer_name_text);

	// var writer_info=document.createElement("div");
	// writer_info.setAttribute("class","writer_info");
	// var writer_info_text=document.createTextNode(carousel.author_desp);
	// writer_info.appendChild(writer_info_text);

	// var h1=document.createElement("h1");
	// title=document.createTextNode(carousel.title);
	// h1.appendChild(title);

	// var detial=document.createElement("div");
	// detial.setAttribute("class","detial");
	// var detial_text=document.createTextNode(carousel.summary);
	// detial.appendChild(detial_text);

	
	// img_info.appendChild(writer_name);
	// img_info.appendChild(writer_info);
	// img_info.appendChild(h1);
	// img_info.appendChild(detial);
	// return img_info;
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

var page=1;
function onePageItems(jsondata){
	$("#downBtn").remove();
	var articleNum=jsondata.count;
	if (articleNum==0) {
		$("#js_article_list").text("小编暂时没有发布文章，敬请期待！");
		return false;
	}
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

$.getJSON("/article/get_latest_list?detail=1&page=1&num=8",function(jsondata){
	console.log("jsondata.date.items"+ jsondata.data.items);
	
	console.log(jsondata);
	if (jsondata.code!=0) {
		alert("系统繁忙，请稍后再试～～");
	}
	else{

		oneItem(jsondata.data.items);
		
	}
});
function oneItem(articles){		
	$("#js_recomand").empty();	
	for (var i = 0; i < articles.length; i++) {
		var one_link = buildRecomand(articles[i]);
		if (i==0) {
			$("#js_recomand").append(one_link);
			$(".list-group-item").attr("id","activeList");
		}
		else{
			$("#js_recomand").append(one_link);
		}
		
	}
	$(".list-group-item").hover(function(){
		$(".list-group-item").attr("id","");
		$(this).attr("id","activeList");
		
	});
	$(".list-group-item").mouseleave(function(){
		$(".list-group-item").attr("id","");
		$(".list-group-item:first").attr("id","activeList");
	});
}
//右边推荐栏
// <a href="#" class="list-group-item">
// 	<!-- <h4>免费域名注册</h4> -->
// 	<div class="img">
// 		<img src="/front.1/resource/articleCover.png" class="img-responsive" alt="Image">
// 		<div class="header">免费域名注册</div>
// 	</div>
	
// </a>

function buildRecomand(article){
	var link=document.createElement("a");
	link.setAttribute("class","list-group-item");
	link.setAttribute("href",'/front.1/html/articleDetial.html?article_id=' + article.id)

	var title=document.createElement("h5");
	var title_txt=document.createTextNode(article.title);
	title.appendChild(title_txt);

	var img=document.createElement("div");
	img.setAttribute("class","img");

	pic=document.createElement("img");
	pic.setAttribute("src",article.cover_url);
	pic.setAttribute("class","img-responsive");
	pic.setAttribute("alt","Image");

	var header=document.createElement("div");
	header.setAttribute("class","header");
	var header_txt=document.createTextNode(article.title);
	header.appendChild(header_txt);

	img.appendChild(pic);
	img.appendChild(header);

	link.appendChild(title);
	link.appendChild(img);

	return link;


}
$('body').on('click' , '.list-group-item' , function(){ 
	debugger;
	$(this).hide();
	$(".list-group-item .img").show();
});
$("#js_recomand").on("click",".list-group-item",function(){
	debugger;
	$(this).hide();
	$(".list-group-item .img").show();
});


