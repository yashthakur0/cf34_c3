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
var cPageObj = {};
cPageObj.scrubberBool = false;
cPageObj.disableButton = true;
cPageObj.id
cPageObj.btn_no

$(document).ready(function() {
   model.videoFlg=false
   $("#page_exit").off().on("click", function(){
		controller.ExitPopupFun()
	})
	//var zoomImageExtra = $('.imageZoom');
	//zoomImageExtra.imageZoom({zoom : 200});
	$('.imageZoom').blowup();

   $(".button, .buttons").off().on("click", function() {
	   //alert("Button clicked")
		resetPopupFun()
		cPageObj.id = this.id;
		cPageObj.btn_no = cPageObj.id.split("_")[1];
		$(".zoom_icon").hide();
		$("#clickTab_"+cPageObj.btn_no).css("pointer-events", "none").css("cursor","default")
		$("#clickTab_" + cPageObj.btn_no).addClass('active');
		$("#clickTab_" + cPageObj.btn_no).show();
		$("#clickPop_" + cPageObj.btn_no).show();
		$(".popup_overlay").show();
		showAudioLoading = true;
	});
	
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
