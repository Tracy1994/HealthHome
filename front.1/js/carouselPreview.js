// <tr>
// 	<td class="js_td">
//		<a href="">
// 			<div class="col-xs-7 carousel_pic">
// 				<img src="/front.1/resource/1.jpg" class="img-responsive" alt="Image">
// 				<div class="img_info">
// 					<div class="writer_name">泥石流</div>
// 					<div class="writer_info">泥石流</div>
// 					<h4>奥运会泥石流</h4>
// 					<div class="detile">泥石流女神泥石流，女神泥石流女神泥石流女，神泥石流女神泥石流女神泥石流女神泥石流女神。</div>
// 				</div>
// 			</div>
														
// 		</a>
// 		<div class="col-xs-4 control">
// 			<div class="box2">
// 				<div class="col-xs-12">投放时间：2016/06/01</div>
// 				<div class="col-xs-12">开始时间：2016/06/01</div>
// 				<div class="col-xs-12">结束时间：2016/06/01</div>
// 			</div>
// 			<div class="btn-group ">
// 				<button type="button" class="btn btn-default btn-sm ">
// 			  	<a href="#" class="tooltip-hide control" data-toggle="tooltip" data-placement="top" title="删除">
// 			  	    <span class="glyphicon glyphicon-remove"></span>
// 			  	</a>
// 				</button>
// 				<button type="button" class="btn btn-default btn-sm ">
// 				  	<a href="#" class="tooltip-hide control" data-toggle="tooltip" data-placement="top" title="修改">
// 				  	    <span class="glyphicon glyphicon-pencil"></span>
// 				  	</a>
// 				</button>
// 			</div>							
// 		</div>
// 		
// 	</td>
// </tr>






function buildCarousel(){
	var tr=document.createElement("tr");
	var td=document.createElement("td");
	td.setAttribute("class","js_td");

	var left=carouselPic();
	var right=document.createElement("div");
	right.setAttribute("class","col-xs-4 control");

	var box2=carouselTime();
	var btn_group=buildBtnGroup();

	right.appendChild(box2);
	right.appendChild(btn-group);

	tr.appendChild(td);
	td.appendChild(left);
	td.appendChild(right);
}

function carouselPic(){
	var link=document.createElement("a");

	var carousel_pic=document.createElement("div");
	carousel_pic.setAttribute("class","col-xs-7 carousel_pic");

	var img=document.createElement("img");
	img.setAttribute("src","/front.1/resource/1.jpg");
	img.setAttribute("class","img-responsive");
	img.setAttribute("alt","Image");

	var img_info=imgInfo();

	link.appendChild(carousel_pic);
	carousel_pic.appendChild(img);
	carousel_pic.appendChild(img_info);

	return link;
}

function imgInfo(){
	var img_info=document.createElement("div");
	img_info.setAttribute("class","img_info");

	var writer_name=document.createElement("div");
	var writer_name_text=document.createTextNode(writer_name);
	writer_name.appendChild(writer_name_text);

	var writer_info=document.createElement("div");
	var writer_info_text=document.createTextNode(writer_info);
	writer_info.appendChild(writer_info_text);

	var title=document.createElement("h4");
	title_text=document.createTextNode(title_text);
	title.appendChild(title_text);

	var detial=document.createElement("div");
	var detial_text=document.createTextNode(detial_text);
	detile.appendChild(detial_text);

	img_info.appendChild(writer_name);
	img_info.appendChild(writer_info);
	img_info.appendChild(title);
	img_info.appendChild(detile);

	return img_info;
}


function carouselTime(){
	var box2=document.createElement("div");
	box2.setAttribute("class","box2");

	var publish_time=document.createElement("div");
	publish_time.setAttribute("class","col-xs-12");
	var publish_time_text=document.createTextNode("发布时间:"+time);
	publish_time.appendChild(publish_time_text);

	var begin_time=document.createElement("div");
	begin_time.setAttribute("class","col-xs-12");
	var begin_time_text=document.createTextNode("开始时间:"+time);
	begin_time.appendChild(begin_time_text);
	
	var end_time=document.createElement("div");
	end_time.setAttribute("class","col-xs-12");
	var end_time_text=document.createTextNode("结束时间:"+time);
	end_time.appendChild(end_time_text);

	box2.appendChild(publish_time);
	box2.appendChild(begin_time);
	box2.appendChild(end_time);

	return box2;
	
}

function buildBtn(event,func,glyphicon,title){
	//debuger;
	var btn=document.createElement("button");
	btn.setAttribute("type","button");
	btn.setAttribute("class","btn btn-default btn-sm");
	
	var link=document.createElement("a");
	link.setAttribute("onMouseOver","$(this).tooltip('show')");		
	link.setAttribute("class","tooltip-hide control");	
	link.setAttribute("data-toggle","tooltip");
	link.setAttribute("data-placement","top");
	link.setAttribute("title",title);
	link.setAttribute(event,func);

	var span=document.createElement("span");
	span.setAttribute("class","glyphicon "+glyphicon);

	
	link.appendChild(span);
	btn.appendChild(link);
	return btn;
}

function buildBtnGroup(article){
	
	var btn_box=document.createElement("div");
	btn_box.setAttribute("class","col-xs-2 control");

	var box2=document.createElement("div");
	box2.setAttribute("class","box2");

	var btn_group=document.createElement("div");
	btn_group.setAttribute("class","btn-group");

	var btn_remove=buildBtn("onclick", "removeArticle( '" + JSON.stringify(article) + "')", "glyphicon-remove", "删除");
	// console.log("removeArticle('" + JSON.stringify(article) + "')");
	// console.log('removeArticle(' + JSON.stringify(article) + ')');
	var btn_pencil=buildBtn("href","#","glyphicon-pencil","修改");

	btn_box.appendChild(box2);
	btn_box.appendChild(btn_group);

	btn_group.appendChild(btn_remove);
	btn_group.appendChild(btn_pencil);

	return btn_box;
}

function removeArticle(strArticle){
	var article = JSON.parse(strArticle);
	var r=confirm("是否确认删除该篇文章？")
	  if (r==true)	  	
	    {
	    //debuger;	    	
	    	$.getJSON("/article/remove?article_id=" + article.id , function(jsondata){

	    		if (jsondata.code==0) {
	    			alert("已删除");
	    			window.location.href="/front.1/html/articleList.html";
	    			return false;
	    		}
	    	});
	    
	    }
}
$(function (){ $("[data-toggle='tooltip']").tooltip(); });
$(function(){$('.tooltip-hide').tooltip('hide');});