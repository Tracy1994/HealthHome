function buildDetialBtn(itemdata){
	var detial_btn=document.createElement("button");
	detial_btn.setAttribute("type","button");
	detial_btn.setAttribute("class","btn btn-default btn-sm control");
	detial_btn.setAttribute("data-toggle","collapse");
	detial_btn.setAttribute("data-target","#demo"+ itemdata.id);
	detial_btn.setAttribute("title","详情");

	var span=document.createElement("span");
	span.setAttribute("class","glyphicon glyphicon-list");

	detial_btn.appendChild(span);

	return detial_btn;
}
function buildAddBtn(itemdata){
	var add_btn=document.createElement("button");
	add_btn.setAttribute("type","button");
	add_btn.setAttribute("class","btn btn-default btn-sm control");
	add_btn.setAttribute("title","添加");
	add_btn.setAttribute("onclick", "addBtn( '" + JSON.stringify(itemdata) + "')");
	add_btn.setAttribute("data-dismiss","modal");

	var span=document.createElement("span");
	span.setAttribute("class","glyphicon glyphicon-check");

	add_btn.appendChild(span);

	return add_btn;
}

function buildBtnGroup(itemdata){
	var btn_group=document.createElement("div");
	btn_group.setAttribute("class","col-xs-3 btn-group");

	var detial_btn=buildDetialBtn(itemdata);
	var add_btn=buildAddBtn(itemdata);

	btn_group.appendChild(detial_btn);
	btn_group.appendChild(add_btn);

	return btn_group;
}
function buildRead(itemdata){
	var read=document.createElement("span");
	read.setAttribute("class","read");

	var span1=document.createElement("span");
	span1.setAttribute("class","glyphicon glyphicon-eye-open");
	var span_r=document.createElement("span");
	var span_r_txt=document.createTextNode(' 阅读('+itemdata.click_cnt+') ');

	var span2=document.createElement("span");
	span2.setAttribute("class","glyphicon glyphicon-thumbs-up");
	var span_l=document.createElement("span");
	var span_l_txt=document.createTextNode(' 点赞('+itemdata.like_cnt+') ');

	read.appendChild(span1);
	read.appendChild(span_r);
	span_r.appendChild(span_r_txt);
	read.appendChild(span2);
	read.appendChild(span_l);
	span_l.appendChild(span_l_txt);

	return read;
}
function buildCollapse(itemdata){
	var collapse=document.createElement("div");
	collapse.setAttribute("id","demo"+itemdata.id);
	collapse.setAttribute("class","collapse");

	var p=document.createElement("p");
	var p_text=document.createTextNode(itemdata.summary);
	p.appendChild(p_text);

	var read=buildRead(itemdata);

	collapse.appendChild(p);
	collapse.appendChild(read);

	return collapse;

}

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

//分页加载文章及按钮，仅当页数为单数是适用
// function loadPageBtnGroup(jsondata){
// 	var articleNum=jsondata.count;
// 	var pageNum= Math.ceil(articleNum/5);
//     var btns = $("#page .btn");
//     for (var i = 0; i < btns.length; i++) {
//     	btns.eq(i).removeClass("active");
//     }

//     if (btns.length==0) {
//     	btns.eq(1).hide();
//     	btns.eq(2).hide();
//     }
//     if (btns.length==1) {
//     	btns.eq(2).hide;
//     }
//     $("#page .btn").click(function(){
//     	debugger;
//     	var btns = $(".btn-group .btn");
//     	console.log(btns.length);
//     	var page=parseInt( $(this).text());
//     	getPageData(page);
//     	console.log('btns[0].txt = ' + btns.eq(0).text());
//     	var firstPage=parseInt( btns.eq(0).text());
//     	var lastPage=parseInt(btns.eq(btns.length-1).text());
//     	var centerPage=(firstPage + lastPage)/2;
//     	var difference=eval(page - centerPage);
//     	if (difference==0) {
//     		$(this).addClass("active");
//     		return false;
//     	}
//     	if (difference== -1) {
//     		if (firstPage==1 ||lastPage==pageNum) {
//     			$(this).addClass("active");
//     			return false;
//     		}
//     		if (firstPage!=1 && lastPage!=pageNum) {}{
//     			firstPage=firstPage-1;
//     			lastPage=lastPage+1;
//     			btns.eq(0).text(firstPage);
//     			btns.eq(btns.length-1).text(lastPage);
//     			btns.eq(centerPage).text(page);
//     			btns.eq(centerPage).addClass("active");
//     		}
//     	}
//     	if (difference==1) {

//     		if (firstPage==1 ||lastPage==pageNum) {
//     			$(this).addClass("active");
//     			return false;
//     		}
//     		if (firstPage!=1 && lastPage!=pageNum) {
//     			firstPage=firstPage+1;
//     			lastPage=lastPage+2;
//     			btns.eq(0).text(firstPage);
//     			btns.eq(btns.length-1).text(lastPage);
//     			btns.eq(centerPage).text(page);
//     			btns.eq(centerPage).addClass("active");
//     		}
//     	}
//     });
			
// }
// function clickloadPageBtnGroup(jsondata){
	
	
// }