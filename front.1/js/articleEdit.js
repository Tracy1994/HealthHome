$(function(){	
	$('#editor').summernote({		
	    	height: 400,                 // set editor height
	    	minHeight: null,             // set minimum height of editor
	    	maxHeight: null, 			// set maximum height of editor	
	    	lang: 'zh-CN' ,				// language: 'Chinese'
	    	onImageUpload: function(files, editor, welEditable) {
	    	    sendFile(files[0],editor,welEditable);
	    	}
	});
	$("#submit").click(function(){
		var articleText=$('#editor').summernote('code');
		console.log(articleText);
		$(".editor_input").val(articleText);
	});
});
function sendFile(file,editor,welEditable) {
   data = new FormData();
   data.append("file", file);
   $.ajax({
       data: data,
       type: "POST",
       url: "${base}/store/album/uploadImage/${goods.albumId?c}",
       cache: false,
       contentType: false,
       processData: false,
       success: function(data) {
           editor.insertImage(welEditable, data.url);
       }
   });
}
