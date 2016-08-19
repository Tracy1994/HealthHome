$(function () { $("[data-toggle='tooltip']").tooltip(); });
$(function() {
	$( ".sortable" ).sortable({
		cursor: "move",
		items :"li",                        //只是li可以拖动
		opacity: 0.6,                       //拖动时，透明度为0.6
		revert: true,                       //释放时，增加动画
		update : function(event, ui){       //更新排序之后
			$(this).sortable("toArray");
		   // alert();
		}
		});
	$("#publish").click(function(){

	});
})
// <li class="ui-state-default list-group-item"  id="1">
// 	<img src="/front.1/resource/1.jpg" class="img-responsive col-xs-4" alt="Image">
// 	轮播id 文章的标题
// 	<button type="button" class="btn btn-sm btn-default">
// 		<span class="glyphicon glyphicon-trash"></span>
// 	</button>							
// </li>
// $(function(){
// 	var page;
// 	$("#btn").onclick(){
// 		var 
// 	}
// });
$.getJSON("/carousel/get_list",function(jsondata){
		console.log("jsondata.date.items"+ jsondata.data.items);
		
		console.log(jsondata);
		if (jsondata.code!=0) {
			alert("系统繁忙，请稍后再试～～");
		}
		else{
			refreshCarouselList(jsondata.data.items);
		}
});
//页面加载每篇文章的信息
function refreshCarouselList(carousels){	
	for (var i = 0; i < carousels.length; i++) {
		var carousel = loadCarousel(carousels[i]);		
	}
	
}
function loadCarousel(carousel){
	var articleId=carousel.article_id;
	var carouselId=carousel.id;
	$.getJSON("/article/get_info_list?article_id=" + carouselId,function(jsondata){
			// if (jsondata.code!=0) {
			// 	alert("系统繁忙，请稍后再试～～");
			// }
			// else{
			// 	loadCarousel(jsondata.data);
			// }
	});
}
