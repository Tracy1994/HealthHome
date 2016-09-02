$(function(){
	$("#search_btn").click(function(){
		var keyWord=$("#search").val();
		console.log("keyWord:" +keyWord);
		if (keyWord=="") {
			alert("请输入关键字!");
			return false;
		}
		else{
			window.open('/front.1/html/search.html?key_word='+keyWord);
		}
		
	});

});