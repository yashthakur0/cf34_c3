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
   // controller.setPageVisited();
}

function replayPage(){
	resetPopupFun()
}

/*---------------Variable declartions---------*/
var tll;
var cPageObj = {};
cPageObj.scrubberBool = false;
cPageObj.disableButton = true;
cPageObj.clickedArr = [];
cPageObj.totalItems;
cPageObj.id;
cPageObj.btn_no;

function init() {
	for (var i = 0; i < cPageObj.totalItems; i++) {
		cPageObj.clickedArr[i] = 0;
	}
	$(".close-pop").css("cursor", "pointer");
}

$(document).ready(function() {
	cPageObj.totalItems=$(".button").length
   model.videoFlg=false
   init();
   $("#page_exit").off().on("click", function(){
		controller.ExitPopupFun()
	})
   $(".button").off().on("click", function() {
		resetPopupFun()
		cPageObj.id = this.id;
		//alert(id)
		cPageObj.btn_no = cPageObj.id.split("_")[1];
		$("#clickPop_" + cPageObj.btn_no).show();
		//$(".popup_overlay").show();
		cPageObj.clickedArr[cPageObj.btn_no - 1] = 1;
		showAudioLoading = true;
		setPageCompletion();
	});
	
	 //Pagelevel content Hide/Show functionality
	controller.PageContentVisiblityFun()
	$("#txt_open_close").off().on("click", function(){
		model.ContentVisibleFlg = !model.ContentVisibleFlg;
		controller.PageContentVisiblityFun();
	})
	$(".close-pop").click(function() {
		resetPopupFun()
	});
	$(".back-pop").click(function() {
		//$(".inner-pops").hide()
		$("#clickTab_1").trigger("click")
	});

});

function setPageCompletion() {
	for (var i = 0; i < cPageObj.totalItems; i++) {
		if (cPageObj.clickedArr[i] == 0) {
			return;
		}
	}
	controller.setPageVisited();
}

  function resetPopupFun(){
	$(".popup_overlay").hide();
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
