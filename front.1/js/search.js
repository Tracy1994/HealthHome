
// $(function(){
	var keyWord=window.location.search;
	console.log(keyWord);
	//首次加载文章内容
	$.getJSON("/article/search" + keyWord + "&page=1&num="+5,function(jsondata){
		console.log("jsondata.date.items"+ jsondata.data.items);
		
		console.log(jsondata);
		if (jsondata==="") {
			alert("网站出现一点小bug了，抢修中。。。");
			return false;
		}
		if (jsondata.data.length==0) 
		{
			alert("系统没有找到相关内容，请重新输入关键字！");
			return false;
		}
		if (jsondata.code!=0) {
			alert("系统繁忙，请稍后再试～～");
			return false;
		}
		else{

			onePageItems(jsondata.data);		
		}
	});

	//根据第几页和每页的页数加载
	function getPageData(typeId){
		$.getJSON("/article/search" + keyWord + "&page=" + page + "&num="+5,function(jsondata){
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


	//加载文章列表
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
	$(function(){

		$("#search_btn").click(function(){

			keyWord= "?key_word=" + $("#search").val();
			
			console.log("keyWord:" +keyWord);
			var val=$("#search").val();
			
			if (val==="") {
				alert("请输入关键字!");
				return false;
			}
			else{
				$.getJSON("/article/search" + keyWord + "&page=1&num="+5,function(jsondata){
					console.log("jsondata.date.items"+ jsondata.data.items);
					
					console.log(jsondata);
					if (jsondata=="") {
						alert("网站出现一点小bug了，抢修中。。。");
						return false;
					}
					if (jsondata.data.length==0) 
					{
						alert("系统没有找到相关内容，请重新输入关键字！");
						return false;
					}
					if (jsondata.code!=0) {
						alert("系统繁忙，请稍后再试～～");
						return false;
					}
					else{

						$("#js_article_list").empty();
						onePageItems(jsondata.data);		
					}
				});
			}
		});
	});
	

