$(document).ready(function(){

		
		$('#editor').summernote({
			
			height: 250,                 // set editor height
  			minHeight: null,             // set minimum height of editor
  			maxHeight: null, 			// set maximum height of editor
  			
		});
		$("#text_finish").click(function(){
			var markupStr = $('.summernote').eq(1).summernote('code');
			alert(markupStr.code);
			});
		
});
