//用按钮分页
var page=1;
function onePageItems(jsondata){
	$("#downBtn").remove();
	var articleNum=jsondata.count;
	if (articleNum==0) {
		$("#js_article_list").text("小编暂时没有发布文章，敬请期待！");
		return false;
	}
	var articles=jsondata.items;		
	var pageNum=Math.ceil(articleNum/5);		
	for (var i = 0; i < articles.length; i++) {
		var one_page = buildItem(articles[i]);
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
		getPageData();
	}
	
}