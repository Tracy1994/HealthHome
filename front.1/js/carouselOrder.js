$(function () { $("[data-toggle='tooltip']").tooltip(); });
$(function() {
	$( ".sortable" ).sortable({
		cursor: "move",
		items :"li",                        //只是li可以拖动
		opacity: 0.6,                       //拖动时，透明度为0.6
		revert: true,                       //释放时，增加动画
		update : function(event, ui){       //更新排序之后
		   alert($(this).sortable("toArray"));
		}
		});
	$("#public").click(function(){

	});
})