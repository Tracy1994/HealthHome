function buildDetialBtn(article){
	var detial_btn=document.createElement("button");
	detial_btn.setAttribute("type","button");
	detial_btn.setAttribute("class","btn btn-default btn-sm control");
	detial_btn.setAttribute("data-toggle","collapse");
	detial_btn.setAttribute("data-target","#demo"+ article.id);
	detial_btn.setAttribute("title","详情");

	var span=document.createElement("span");
	span.setAttribute("class","glyphicon glyphicon-list");

	detial_btn.appendChild(span);

	return detial_btn;
}
function buildAddBtn(article){
	var add_btn=document.createElement("button");
	add_btn.setAttribute("type","button");
	add_btn.setAttribute("class","btn btn-default btn-sm control");
	add_btn.setAttribute("title","添加");	
	add_btn.setAttribute("data-dismiss","modal");
	var span=document.createElement("span");
	span.setAttribute("class","glyphicon glyphicon-check");

	add_btn.appendChild(span);

	return add_btn;
}
function buildRead(article){
	var read=document.createElement("span");
	read.setAttribute("class","read");

	var span1=document.createElement("span");
	span1.setAttribute("class","glyphicon glyphicon-eye-open");
	var span_r=document.createElement("span");
	var span_r_txt=document.createTextNode(' 阅读('+article.click_cnt+') ');

	var span2=document.createElement("span");
	span2.setAttribute("class","glyphicon glyphicon-thumbs-up");
	var span_l=document.createElement("span");
	var span_l_txt=document.createTextNode(' 点赞('+article.like_cnt+') ');

	read.appendChild(span1);
	read.appendChild(span_r);
	span_r.appendChild(span_r_txt);
	read.appendChild(span2);
	read.appendChild(span_l);
	span_l.appendChild(span_l_txt);

	return read;
}