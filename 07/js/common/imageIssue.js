//this user define variable is used to hide the image from the assessment question up to second que
var noScreenImgHide=[1,1];
//its custom event, this is used to trigger the question count in the loadQuestion method, which is send a "data" from the Knowledgecheck.js
jQuery('.assessmentContent img').bind('DISPATCHEVENT', initateFn);

function initateFn(event, data){
	var no = Number(data);
	$(".images").css("display","none");
	if(noScreenImgHide[no]==0){
		jQuery('.assessmentBox').removeClass('with_img');
	}else{
		jQuery('.assessmentBox').addClass('with_img');
		$("#img_0"+(no+1)).css("display","block");
	}
	
}

 