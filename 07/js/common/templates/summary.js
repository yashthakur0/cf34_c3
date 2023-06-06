

$(function() {
    imageLoader.load($('.pageWrapper'), controller.loadStyles);

});


function preloadingDone() {
    pageLoad = true;
    initAnimStates();
    $('.content_blocker').hide();
}

function audioFinish() {
    controller.setPageVisited();
	$("#audio_Icon, #replay_Icon").addClass("deactive").addClass("disabled").css("cursor", "default").css("opacity", "0.5").css("pointer-events", "none");
	//console.log(model.tTopics+" == "+cPageObj.completedModule)
	if(model.tTopics==cPageObj.completedModule){
		$("#shell_next").removeClass("deactive").removeClass("disabled").css("pointer-events", "auto")
	}else{
		$("#shell_next").addClass("deactive").addClass("disabled").css("pointer-events", "none")
	}
}

/*---------------Variable declartions---------*/
var tll;
var cPageObj = {};
cPageObj.scrubberBool = false;
cPageObj.completedModule=0
cPageObj.disableButton = true;
$(document).ready(function() {
   model.videoFlg=false
   controller.setPageVisited();
   for (var i = 0; i < model.tTopics; i++) {
		$("#result"+i).removeAttr('class');
		$("#score"+i).html(model.prePostTestScorArr[i]+"%")
		$("#pagePer"+i).html(model.TopicPercentCalcArr[i]+"%")
		if((model.prePostTestAttemptArr[i]=="0") || (model.prePostTestAttemptArr[i]==0)){
			$("#result"+i).html("Not Attempted")
		}else{
			if(model.prePostTestScorArr[i] >=75){
				$("#result"+i).html("Pass").addClass("passlabel")
			}else{
				$("#result"+i).html("Fail").addClass("faillabel")
			}
		}
		
		//if((model.topicCompletionArr[i]=="1") && (model.prePostTestScorArr[i] >=75)){
		if((model.TopicPercentCalcArr[i]>=75) && (model.prePostTestScorArr[i] >=75)){
			cPageObj.completedModule++
			$("#Status"+i).html("Complete")
		}else{
			$("#Status"+i).html("Incomplete")
		}	
	}
	
	
	
	$(".ReviewButton").on("click", function(){
		var topicNo=this.id.split("_")[1]
		if(model.menuData.getElementsByTagName("topic")[topicNo].getElementsByTagName("module")[0].getElementsByTagName("page")[0].getAttribute("subpagelevel")==null){
			 controller.manageTopic(topicNo, 0, 0, -1, -1);
		}else if((model.menuData.getElementsByTagName("topic")[topicNo].getElementsByTagName("module")[0].getElementsByTagName("page")[0].getAttribute("subpagelevel")=="1")&&(model.menuData.getElementsByTagName("topic")[topicNo].getElementsByTagName("module")[0].getElementsByTagName("page")[0].getElementsByTagName("subpage")[0].getAttribute("subpagelevel")==null)){
			controller.manageTopic(topicNo, 0, 0, 0, -1);
		}else{
			controller.manageTopic(topicNo, 0, 0, 0,0);
		}
		//controller.manageTopic(topicNo, 0, 0, -1, -1)
	})
	$(".RetakeButton").on("click", function(){
		var topicNo=this.id.split("_")[1]
		controller.manageTopic(topicNo, model.tModulesArr[topicNo]-1, 0, -1,-1)
	})
	/*if(model.audioName=="mute.mp3"){
		$("#preloaderSpinner").fadeOut("slow");
	}*/
});



/*---------------------Functions---------------------*/
function playAnimation() {

    //audioPlayer.loadAudioPath(model.audioPath + Audios);
    if (tll) {
        tll.totalProgress(1).kill();
    }
    tll = new TimelineLite({
        onUpdate: updateSlider,
        onComplete: animCompleted
    });
  	 
   tll.add(animateIn($("#dummySynch")).play(), 4.5);

    
}


/*---------------------End---------------------*/