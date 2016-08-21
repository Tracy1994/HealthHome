$(function() {
	$( ".sortable" ).sortable({
		cursor: "move",
		items :"li",                        //只是li可以拖动
		opacity: 0.6,                       //拖动时，透明度为0.6
		revert: true,                       //释放时，增加动画
		update : function(event, ui){       //更新排序之后
			$(this).sortable("toArray");
		   // alert();
		}
		});
	$("#publish").click(function(){

	});
});


//每页的每篇文章单篇加载
function onePageItems(articles){	
	
	$("#js_articleList").empty();	
	for (var i = 0; i < articles.length; i++) {
		var one_page = buildItem(articles[i]);

		$("#js_articleList").append(one_page);
	}
}

//首次加载文章内容
$.getJSON("/carousel/get_list?page=1&num="+5,function(jsondata){
	console.log("jsondata.date.items"+ jsondata.data.items);
	
	console.log(jsondata);
	if (jsondata.code!=0) {
		alert("系统繁忙，请稍后再试～～");
	}
	else{
		
		onePageItems(jsondata.data.items);
		loadPageBtnGroup(jsondata.data);
	}
});

	
//根据第几页和每页的页数加载
function getPageData(page){
	$.getJSON("/carousel/get_list?page=" + page + "&num="+5,function(jsondata){
		console.log("jsondata.date.items"+ jsondata.data.items);				
		console.log(jsondata);
		if (jsondata.code!=0) {
			alert("系统繁忙，请稍后再试～～");
		}
		else{
			onePageItems(jsondata.data.items);
		}				
	});
}

//添加轮播里面的每一项
function buildItem(itemdata){
	
	var li=document.createElement("li");
	li.setAttribute("class","list-group-item");

	var row=document.createElement("div");
	row.setAttribute("class","row");

	var title=document.createElement("div");
	title.setAttribute("class","col-xs-9");
	var title_text=document.createTextNode(itemdata.title);
	title.appendChild(title_text);

	var btn_group=buildBtnGroup(itemdata);
	var collapse=buildCollapse(itemdata);

	li.appendChild(row);
	li.appendChild(collapse);

	row.appendChild(title);
	row.appendChild(btn_group);

	return li;

}


//按添加按钮
function addlItem(strCarousel){
	var carousel = JSON.parse(strCarousel);
	var addCarouselItem=loadCarouselItem(article,carousel);
	$("#carouselList").append(addCarouselItem);	
}


//获取当前生效的轮播
$.getJSON("/carousel/get_effect_list",function(jsondata){

	if (jsondata.code!=0) {
		alert("系统繁忙，请稍后再试～～");
	}
	else{
		bulidCarouselList(jsondata.data.items);
	}
});
function bulidCarouselList(carousels){
	$(".sortable li").empty();
	for (var i = 0; i < carousels.length; i++) {
		var carousel = loadCarouselItem(carousels[i]);
		$("#carouselListHeader").after(carousel);
	}
}
// <li class="ui-state-default list-group-item"  id="1">
// 	<img src="/front.1/resource/1.jpg" class="img-responsive col-xs-4" alt="Image">
// 	轮播id 文章的标题
// 	<button type="button" class="btn btn-sm btn-default remove">
// 		<span class="glyphicon glyphicon-trash"></span>
// 	</button>							
// </li>
function loadCarouselItem(carousel){
	var li=document.createElement("li");
	li.setAttribute("class", "ui-state-default list-group-item");
	li.setAttribute("id", carousel.id);

	var  img=document.createElement("img");
	img.setAttribute("src", carousel.img_url);
	img.setAttribute("class", "img-responsive col-xs-4");
	img.setAttribute("alt", "Image");

	var li_text=document.createTextNode( carousel.title +"轮播id："+carousel.id );

	var btn=document.createElement("button");
	btn.setAttribute("class", "btn btn-sm btn-default remove");
	var span=document.createElement("span");
	span.setAttribute("class", "glyphicon glyphicon-trash");
	btn.appendChild(span);

	li.appendChild(img);
	li.appendChild(li_text);
	li.appendChild(btn);

	return li;

}

