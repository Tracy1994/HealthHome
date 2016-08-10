//点击登录或注册实现页面跳转
		$(document).ready(function(){

			$(".a1").click(function(){
				$(".a1").css({"font-weight":"bold","color":"rgb(0,179,138)","text-decoration":"underline"});
				$(".register").hide();
				$(".a2").css({"font-weight":"normal","color":"gray","text-decoration":"none"});
				$(".login").show();
			});
			$(".a2").click(function(){
				$(".a2").css({"font-weight":"bold","color":"rgb(0,179,138)","text-decoration":"underline"});
				$(".login").hide();
				$(".a1").css({"font-weight":"normal","color":"gray","text-decoration":"none"});
				$(".register").show();
			});
//点击注册页，完成注册并提交数据到后台
			$("#btn_register").click(function(){ 
				var re= /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
				if ($("#r_user_name").val()=="" ) {
					alert("用户名不能为空");
					return;
				}
				if ($("#r_email").val()=="" ) {
					alert("邮箱不能为空");
					return;
				}
				if ($("#r_password").val().length<=8 ) {
					alert("密码长度不能小于8位");
					return;
				}
				console.log('test[' + $("#r_email").val() + '] ret: ' + re.test($("#r_email").val()));				
				if(!re.test($("#r_email").val())){
					alert("邮箱格式不正确");
					return;
				}
				if ($("#r_c_password").val()!=$("#r_password").val() ) {
					alert("确认密码不一致");
					return;
				}
								
				var xmlhttp;
				if (window.XMLHttpRequest)
				{
					// code for IE7+, Firefox, Chrome, Opera, Safari
					xmlhttp=new XMLHttpRequest();
				}
				else
				{
					// code for IE6, IE5
					xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
				}
				
				xmlhttp.onreadystatechange=function(){
					var resp = xmlhttp.responseText;
					console.log(resp);
					console.log(xmlhttp.readyState);
					if (xmlhttp.readyState == 4 && xmlhttp.status==200) {
						var code = eval("(" + resp + ")").code;
						console.log(code);
						if (code == 0) {
							alert("请30分钟内到邮箱点击链接，激活账号，完成注册！");
						}
						else{
							alert("注册不成功，请重试！");
						}
					}
				}
			var url = "/register/index?user_name=" + $("#r_user_name").val() + "&email=" + $("#r_email").val() + "&passwd=" + $("#r_password").val();				
			xmlhttp.open("POST", url, true);
			xmlhttp.send();	
				
			});
//点击登录，把数据传到后台
			$("#btn_login").click(function(){
				
				
				console.log('btn_login on click');
				var url="/login/index?user_name="+$("#l_user_name").val()+"&passwd=" + $("#l_password").val();
				var xmlhttp;
				if (window.XMLHttpRequest)
				{
					// code for IE7+, Firefox, Chrome, Opera, Safari
					xmlhttp=new XMLHttpRequest();
				}
				else
				{
					// code for IE6, IE5
					xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
				}
				
				xmlhttp.onreadystatechange=function(){
					var resp = xmlhttp.responseText;
					console.log(resp);										
					if (xmlhttp.readyState==4 && xmlhttp.status==200) {
						var code=eval("(" + resp + ")").code;
						console.log(code);
						if (code == 0){
							debugger;
							window.location.href='/front.1/index.html';													
						}
						else {
							alert("登录不成功，请重试！");
						}
					}
					
				}
				xmlhttp.open("POST", url, true);
				xmlhttp.send();
			});
			
		});
	