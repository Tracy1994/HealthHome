
function sideBtnLeft(){
	var left=document.createElement("a");
	left.setAttribute("class","carousel-control left");
	left.setAttribute("href","#myCarousel");
	left.setAttribute("data-slide","prev");

	var span_l=document.createElement("span");
	span_l.setAttribute("class","glyphicon glyphicon-chevron-left");

	left.appdenChild(span_l);

	return left

}
function sideBtnRight(){
	var right=document.createElement("a");
	right.setAttribute("class","carousel-control right");
	right.setAttribute("href","#myCarousel");
	right.setAttribute("data-slide","next");

	var span_r=document.createElement("span");
	span_r.setAttribute("class","glyphicon glyphicon-chevron-right");

	right.appdenChild(span_r);

	return right;
}
function imgInfo(){
	var img_info=document.createElement("div");
	img_info.setAttribute("class","img_info");

	var writer_name=document.createElement("div");
	writer_name.setAttribute("class","writer_name");
	var writer_name_text=document.createTextNode(writer_name);
	writer_name.appdenChild(writer_name_text);

	var writer_info=document.createElement("div");
	writer_info.setAttribute("class","writer_info");
	var writer_info_text=document.createTextNode(writer_info);
	writer_info.appdenChild(writer_info_text);

	var h1=document.createElement("h1");
	title=document.createTextNode(title);
	h1.appdenChild(title);

	var detial=document.createElement("div");
	detial.setAttribute("class","detial");
	var detial_text=document.createTextNode(detial_text);
	detile.appdenChild(detial_text);

	img_info.appdenChild(writer_name);
	img_info.appdenChild(writer_info);
	img_info.appdenChild(h1);
	img_info.appdenChild(detile);

	return img_info;
}
function carouselInner(){
	var carousel_inner=document.createElement("div");
	carousel_inner.setAttribute("class","carousel-inner");
	for (var i = 0; i < 4; i++) {
		var item=document.createElement("div");
		item.setAttribute("class","item");
		var img=document.createElement("img");
		img.setAttribute("href",url);
		img.setAttribute("alt","slide img");
		item.appdenChild(img);

		carousel_inner.appdenChild(item);
	}
	return carousel_inner;

}

function carouselIndicators(){
	var ol=document.createElement("ol");
	ol.setAttribute("class","carousel-indicators");
	for (var i = 0; i <4; i++) {
		var li=document.createElement("li");
		li.setAttribute("data-target","#myCarousel");
		li.setAttribute("data-slide-to","i");

		ol.appdenChild(li);
	}
	return ol;
}


function builtCarousel(){
	var myCarousel=document.createElement("div");
	myCarousel.setAttribute("id","myCarousel");
	myCarousel.setAttribute("class","carousel slide");

	var carousel_indicators=carouselIndicators();
	var carousel_inner=carouselInner();
	var img_info=imgInfo();
	var btn_l=sideBtnLeft();
	var btn_r=sideBtnRight();

	myCarousel.appdenChild(carousel_indicators);
	myCarousel.appdenChild(carousel_inner);
	myCarousel.appdenChild(img_info);
	myCarousel.appdenChild(btn_l);
	myCarousel.appdenChild(btn_r);
}
addLoadEvent(builtCarousel);

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