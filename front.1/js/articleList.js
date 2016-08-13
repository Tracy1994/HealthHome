	// <button type="button" class="btn btn-default btn-sm ">
 //  	<a href="#" class="tooltip-hide control" data-toggle="tooltip" data-placement="top" title="删除">
 //  	    <span class="glyphicon glyphicon-remove"></span>
 //  	</a>
	// </button>
function buildBtn(event,func,glyphicon,title){
	debugger;
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
	    debugger;	    	
	    	$.getJSON("/article/remove?article_id=" + article.id , function(jsondata){

	    		if (jsondata.code==0) {
	    			alert("已删除");
	    			window.location.href="/front.1/html/articleList.html";
	    			return false;
	    		}
	    	});
	    
	    }
}


function loadArticle(article){
		var tr=document.createElement("tr");
		tr.setAttribute("class","js_tr");

		var td=document.createElement("td");		
		td.setAttribute("class","js_td");

		var btn_group=buildBtnGroup(article);

		tr.appendChild(td);
		
		var link=document.createElement("a");
		link.setAttribute("href",'/front.1/html/article.html?article_id=' + article.id);
		
		var box_l= buildArticleCover(article,"col-xs-3");
		var box_r=buildArticleBrief(article,"col-xs-7");
		var read=buildRead(article);

		td.appendChild(link);
		td.appendChild(btn_group);

		link.appendChild(box_l);		
		link.appendChild(box_r);
		box_r.appendChild(read);

		return tr;			
}
$(function (){ $("[data-toggle='tooltip']").tooltip(); });
$(function(){$('.tooltip-hide').tooltip('hide');});
	// <tr>
	// 	<td class="js_td">
	// 		<a href="">
	// 			<div class="col-xs-3 article_cover">
	// 				<img src="/front.1/resource/test.jpg" class="img-responsive" alt="Image">
	// 			</div>
	// 			<div class="col-xs-7 article_brief">
	// 				<h3>
	// 				this is is the title of this article
	// 				</h3>
	// 				<p>
	// 				this is is the detail infomation of this article.this is is the detail infomation of this article.this is is the detail infomation of this article.
	// 				</p>
	// 				<span class="read">
	// 					<span class="glyphicon glyphicon-eye-open">阅读（1024）</span>
	// 					<span class="glyphicon glyphicon-thumbs-up">点赞（1024）</span>
	// 				</span>
	// 			</div>			
	// 		</a>
	// 		<div class="col-xs-2 control">
	// 			<div class="box2"></div>
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
			
	// 	</td>
	// </tr>