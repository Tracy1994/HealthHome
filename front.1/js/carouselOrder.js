$(function() {
	$( ".sortable" ).sortable({
		cursor: "move",
		items :"li",                        //只是li可以拖动
		opacity: 0.6,                       //拖动时，透明度为0.6
		revert: true,                       //释放时，增加动画
		update : function(event, ui){       //更新排序之后
		var order= $(this).sortable("toArray");
		console.log("order:"+order);
		   // alert();
		}
		});
	//点击发布

	$("#publish").click(function(){
		var idstr = "";
        $(".sortable li").each(function() {
            // 将选中的字段id拼成字符串
            idstr += $(this).attr("id") + "_";
        });
                    if (idstr.length > 0) {
            idstr = idstr.substring(0, idstr.length - 1)
        }
        console.log("idstr:"+idstr);
	    $.post("/carousel/publish", 
	    { 
	        carousel_ids:idstr
	        
	    }, 
	        function(data,status){
	        var data = JSON.parse(data);
	        var code=data.code;
	        console.log("status:"+status);
	         console.log("data:"+data);
	         console.log("code:"+code);

	        if (code==0) {
	        	alert("发布成功");
	        }
	        else{
	        	alert("系统繁忙，请稍后再试～～");
	        }
	    }); 
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
function addBtn(strItem){
	var itemdata = JSON.parse(strItem);
	var carouselItem=loadCarouselItem(itemdata);
	$("#carouselList").append(carouselItem);	
	alert("轮播已添加到列表中");
	return false;
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
	$("#carouselList").empty();
	for (var i = 0; i < carousels.length; i++) {
		var carousel = loadCarouselItem(carousels[i]);
		$("#carouselList").append(carousel);		
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
	li.setAttribute("class", "ui-state-default list-group-item ");
	li.setAttribute("id", carousel.id);

	var  img=document.createElement("img");
	img.setAttribute("src", carousel.img_url);
	img.setAttribute("class", "img-responsive col-xs-4");
	img.setAttribute("alt", "Image");

	var carousel_info=document.createElement("div");
	carousel_info.setAttribute("class","col-xs-4");

	var carouselId=document.createElement("p");
	var carouselId_id=document.createTextNode( "轮播id："+carousel.id);
	carouselId.appendChild(carouselId_id);

	var carouselTitle=document.createElement("p");
	var carouselTitle_text=document.createTextNode(carousel.title);
	carouselTitle.appendChild(carouselTitle_text);

	carousel_info.appendChild(carouselId);
	carousel_info.appendChild(carouselTitle);

	var btn=document.createElement("button");
	btn.setAttribute("class", "btn btn-sm btn-default remove");
	btn.setAttribute("onclick","deleteItem(this)");

	var span=document.createElement("span");
	span.setAttribute("class", "glyphicon glyphicon-trash");
	btn.appendChild(span);

	li.appendChild(img);
	li.appendChild(carousel_info);
	li.appendChild(btn);

	return li;

}

function deleteItem(obj){
	$(obj).parent().remove();
}
