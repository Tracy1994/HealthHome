
//首次加载文章内容
$.getJSON("/carousel/get_list?page=1&num="+5,function(jsondata){
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
function getPageData(){
	$.getJSON("/carousel/get_list?page=" + page + "&num="+5,function(jsondata){
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


function buildItem(carousel){
	var tr=document.createElement("tr");
	var td=document.createElement("td");
	td.setAttribute("class","js_td");

	var left=carouselPic(carousel);
	var right=buidRight(carousel);
	
	tr.appendChild(td);
	td.appendChild(left);
	td.appendChild(right);

	return tr;
}


function buidRight(carousel){
	var right=document.createElement("div");
	right.setAttribute("class","col-xs-3 box2");

	var carousel_id=document.createElement("div");
	carousel_id.setAttribute("class","col-xs-12");
	carousel_id_txt=document.createTextNode("轮播id: "+carousel.id);
	carousel_id.appendChild(carousel_id_txt);

	var build_time=document.createElement("div");
	build_time.setAttribute("class","col-xs-12");
	var full_time=carousel.create_time;
	build_time_txt=document.createTextNode("创建时间："+ full_time.substring(0,4) + "/" +full_time.substring(5,7) + "/" +full_time.substring(8,10));
	build_time.appendChild(build_time_txt);

	right.appendChild(carousel_id);
	right.appendChild(build_time);

	return right;
}

// <tr>
// 	<td class="js_td">
// 		<a href="">									
// 			<div class="col-xs-7 col-xs-offset-2 carousel_pic">
// 				<img src="/front.1/resource/1.jpg" class="img-responsive" alt="Image">
// 				<div class="img_info visible-md visible-lg">
// 					<div class="writer_name">泥石流</div>
// 					<div class="writer_info visible-lg">泥石流</div>
// 					<h4>奥运会泥石流</h4>
// 					<div class="detile">泥石流女神泥石流，女神泥石流女神泥石流女，神泥石流女神泥石流女神泥石流女神泥石流女神。</div>
// 				</div>
// 			</div>
														
// 		</a>
// 		<div class="col-xs-3 box2">
// 			<div class="col-xs-12">轮播id: 1</div>
// 			<div class="col-xs-12">创建时间：2016/06/01</div>				
// 		</div>
	
// 	</td>
// </tr>
function carouselPic(carousel){
	var link=document.createElement("a");

	var carousel_pic=document.createElement("div");
	carousel_pic.setAttribute("class","col-xs-7 carousel_pic col-xs-offset-2");

	var img=document.createElement("img");
	img.setAttribute("src",carousel.img_url);
	img.setAttribute("class","img-responsive");
	img.setAttribute("alt","Image");

	var img_info=imgInfo(carousel);

	link.appendChild(carousel_pic);
	carousel_pic.appendChild(img);
	carousel_pic.appendChild(img_info);

	return link;
}
// 			<div class="col-xs-7 col-xs-offset-2 carousel_pic">
// 				<img src="/front.1/resource/1.jpg" class="img-responsive" alt="Image">
// 				<div class="img_info visible-md visible-lg">
// 					<div class="writer_name">泥石流</div>
// 					<div class="writer_info visible-lg">泥石流</div>
// 					<h4>奥运会泥石流</h4>
// 					<div class="detile">泥石流女神泥石流，女神泥石流女神泥石流女，神泥石流女神泥石流女神泥石流女神泥石流女神。</div>
// 				</div>
// 			</div>
function imgInfo(carousel){
	var img_info=document.createElement("div");
	img_info.setAttribute("class","img_info ");

	var writer_name=document.createElement("div");
	writer_name.setAttribute("class","writer_name");
	var writer_name_text=document.createTextNode(carousel.author);
	writer_name.appendChild(writer_name_text);

	var title=document.createElement("h4");
	title_text=document.createTextNode(carousel.title);
	title.appendChild(title_text);

	var detial=document.createElement("div");
	var detial_text=document.createTextNode(carousel.summary.substring(0,30) + "~ ~ ~");
	detial.appendChild(detial_text);

	img_info.appendChild(writer_name);
	img_info.appendChild(title);
	img_info.appendChild(detial);

	return img_info;
}
