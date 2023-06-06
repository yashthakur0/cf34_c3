/*---------------Page Init Functions---------*/
/*---------------Page Init Functions---------*/
$(function() {
    imageLoader.load($('.pageWrapper'), controller.loadStyles);
});

function preloadingDone() {
    pageLoad = true;
    initAnimStates();
}

function audioFinish() {
    controller.setPageVisited();
}

function replayPage(){
  resetPopupFun()
}


/*---------------Variable declartions---------*/
var tll;
var scrubberBool = false;

var disableButton = true;
$(document).ready(function() {
   model.videoFlg=false
   $("#page_exit").off().on("click", function(){
		controller.ExitPopupFun()
	})
	if((model.currTopic == (model.tTopics-1))&&(model.currPage==2)){
		$("#audio_Icon, #replay_Icon").addClass("deactive").addClass("disabled").css("cursor", "default").css("opacity", "0.5").css("pointer-events", "none");
	}
   $(".button, .buttons").off().on("click", function() {
	   //alert("Button clicked")
		resetPopupFun()
		id = this.id;
		btn_no = id.split("_")[1];
		$(".zoom_icon").hide();
		$("#clickTab_"+btn_no).css("pointer-events", "none").css("cursor","default")
		$("#clickTab_" + btn_no).addClass('active');
		$("#clickTab_" + btn_no).show();
		$("#clickPop_" + btn_no).show();
		$(".popup_overlay").show();
		showAudioLoading = true;
	});
	
	/*if(model.audioName=="mute.mp3"){
		$("#preloaderSpinner").fadeOut("slow");
	}*/
	 controller.setPageVisited();
	 //Pagelevel content Hide/Show functionality
	controller.PageContentVisiblityFun()
	$("#txt_open_close").off().on("click", function(){
		model.ContentVisibleFlg = !model.ContentVisibleFlg;
		controller.PageContentVisiblityFun();
	})
	$(".close-click-popup").click(function() {
		resetPopupFun()
	});

});

  function resetPopupFun(){
	$(".popup_overlay").hide();
	$(".zoom_icon").show();
	$(".popup-section").css("display", "none");
	$(".popupSection").hide();
	$(".button").css("pointer-events", "auto").css("cursor", "pointer").removeClass('active')
}

/*---------------------Functions---------------------*/
function playAnimation(pageType) {

    //audioPlayer.loadAudioPath(model.audioPath + Audios);
    //console.log("pageType::" + pageType);
    if (tll) {
        tll.totalProgress(1).kill();
    }
    tll = new TimelineLite({
        onUpdate: updateSlider,
        onComplete: animCompleted
    });
  	 
   tll.add(animateIn($("#dummySynch")).play(), 1);
}
/*---------------------End---------------------*/
