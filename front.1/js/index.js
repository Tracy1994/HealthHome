function showAlert(){
	alert("注意：本站内容为学习使用，不作任何商业用途，所有数据均为测试数据。" +"\n" + "本站暂时只支持内核为webKit的谷歌浏览器，360浏览器极速模式。" + "\n" + "请点击确认继续加载本站内容。");
};
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
		var top=$("body").scrollTop();
		console.log(top);			
		if (top>=340) {
			
			$("#js_recomand").css("top","0px");
			
		}
		else{
			
			$("#js_recomand").css("top","700px");
		}
	}

});

//加载轮播内容
$.getJSON("/carousel/get_effect_list",function(jsondata){
		console.log("jsondata.date.items"+ jsondata.data.items);
		
		console.log(jsondata);
		if (jsondata=="") {
			alert("网站出现一点小bug了，抢修中。。。");
			return false;
		}
		if (jsondata.code!=0) {
			alert("系统繁忙，请稍后再试～～");
			return false;
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
		var link=document.createElement("a");
		link.setAttribute("href",'/front.1/html/articleDetial.html?article_id=' + carousel[i].article_id );
	
		var img=document.createElement("img");
		img.setAttribute("src",carousel[i].img_url);
		console.log(carousel[i].img_url);		

		var img_info=imgInfo(carousel[i]);

		item.appendChild(link);
		link.appendChild(img);
		link.appendChild(img_info);
				

		$(".carousel-inner").append(item);
					
	}
	
}

function imgInfo(carousel){
	// $(".writer_name").text(carousel.author);
	// $(".writer_info").text(carousel.author_desp);
	// $("h1").text(carousel.title);
	// $(".detile").text(carousel.summary);
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
	var detial_text=document.createTextNode(carousel.summary.substring(0,60) + "~ ~ ~");
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
	if (jsondata=="") {
		alert("网站出现一点小bug了，抢修中。。。");
		return false;
	}
	if (jsondata.code!=0) {
		alert("系统繁忙，请稍后再试～～");
		return false;
	}
	else{

		onePageItems(jsondata.data);		
	}
});

var type_id=0;
//根据第几页和每页的页数加载
function getPageData(typeId){
	$.getJSON("/article/get_list?type_id=" + type_id + "&page=" + page + "&num="+5,function(jsondata){
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


//加载文章列表
function buildItem(article){
	var tr=document.createElement("tr");
	tr.setAttribute("class","js_tr");

	var td=document.createElement("td");		
	td.setAttribute("class","js_td");

	var link=document.createElement("a");
	link.setAttribute("href",'/front.1/html/articleDetial.html?article_id=' + article.id);
	link.setAttribute("target","_blank")

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

