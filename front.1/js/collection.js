//首次加载文章内容 
$.getJSON("/collection/get_my_collection?page=1&num="+5,function(jsondata){
		console.log("jsondata.date.items"+ jsondata.data.items);
		
		console.log(jsondata);
		if (jsondata.code!=0) {
			alert("系统繁忙，请稍后再试～～");
			return false;
		}
		else{
			
			onePageItems(jsondata.data);
		}
});


//根据第几页和每页的页数加载
function getPageData(){
	$.getJSON("/collection/get_my_collection?page=" + page + "&num="+5,function(jsondata){
		console.log("jsondata.date.items"+ jsondata.data.items);				
		console.log(jsondata);
		if (jsondata.code!=0) {
			alert("系统繁忙，请稍后再试～～");
			return false;
		}
		else{
			onePageItems(jsondata.data);
		}				
	});
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

	var btn_remove=buildBtn("onclick", "removeArticle(" + article.id + ")", "glyphicon-remove", "删除");
	

	btn_box.appendChild(box2);
	btn_box.appendChild(btn_group);

	btn_group.appendChild(btn_remove);


	return btn_box;
}

function removeArticle(articleId){
	console.log("articleId:" +articleId);
	
	var r=confirm("是否确认删除该篇文章？")
	if (r==true)	  	
	{	    	
		$.getJSON("/collection/remove?article_id=" + articleId , function(jsondata){

			if (jsondata.code==0) {		
				window.location.href="/front.1/html/collection.html";
				alert("已删除");
				return false;
			}
			else{
				return false;
			}
		});
	}
	
}
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


function buildItem(article){
		var tr=document.createElement("tr");
		tr.setAttribute("class","js_tr");

		var td=document.createElement("td");		
		td.setAttribute("class","js_td");
		
		var link=document.createElement("a");
		link.setAttribute("href",'/front.1/html/article.html?article_id=' + article.id);
				
		td.appendChild(link);

		var box_l= buildArticleCover(article,"col-xs-3");
		var box_r=buildArticleBrief(article,"col-xs-7");
		var read=buildRead(article);

		link.appendChild(box_l);		
		link.appendChild(box_r);
		box_r.appendChild(read);

		var btn_group=buildBtnGroup(article);

		tr.appendChild(td);
		td.appendChild(link);
		td.appendChild(btn_group);

		return tr;			
}
$(function (){ $("[data-toggle='tooltip']").tooltip(); });
$(function(){$('.tooltip-hide').tooltip('hide');});