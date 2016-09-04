//右边导航栏
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
	$("#js_recomand").filter("#js_recomand a").remove();

	for (var i = 0; i < articles.length; i++) {
		
		var one_link = buildRecomand(articles[i]);

		if (i==0) {
			$("#js_recomand").append(one_link);
			$("#js_recomand a").attr("id","activeList");
			
		}
		else{
			$("#js_recomand").append(one_link);
			
		}
		
	}
	$("#js_recomand a").hover(function(){
		$("#js_recomand a").attr("id","");
		$(this).attr("id","activeList");
		
	});
	$("#js_recomand a").mouseleave(function(){
		$("#js_recomand a").attr("id","");
		$("#js_recomand a:first").attr("id","activeList");
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

	var span=document.createElement("span");
	span.setAttribute("class","glyphicon glyphicon-bell");

	var title=document.createElement("h5");
	var title_txt=document.createTextNode(article.title);
	title.appendChild(span);
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
