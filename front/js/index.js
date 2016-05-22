function checkCookie(){
	var username=getCookie("user_name");
	if (username!=""){

  		$("#login").text(username);
  		$("#login").attr("href","#");
  		$("#register").text("退出");
  		$("#register").text("href","#");
  	}	
}
window.onload = function(){
		function MyTab(){
			var spans = document.getElementsByTagName('li');
			
			// alert(spans.length)
			console.log('spans.length: ' + spans.length)
			
			for(var i=0; i<spans.length;i++){
				spans[i].index = i;
				spans[i].onclick = function(){
					
					for(var i=0; i<spans.length;i++){
						spans[i].className = '';
					}
					this.className = 'current';				
				}
			}	
		}		
		MyTab();
		var x=document.cookie;
		console.log(x);

}
