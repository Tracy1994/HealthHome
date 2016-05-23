$(document).ready(function(){

		
		$('#editor').summernote({
			
			height: 250,                 // set editor height
  			minHeight: null,             // set minimum height of editor
  			maxHeight: null, 			// set maximum height of editor
  			
		});
		$("#text_finish").click(function(){
			var markupStr = $('#editor').summernote('code');
			alert(markupStr.code);
			console.log(markupStr);
			console.log(markupStr.code);
			});
		
});
