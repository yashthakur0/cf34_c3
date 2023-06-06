/*---------------Page Init Functions---------*/
$(function() {
	imageLoader.load($('.pageWrapper'), controller.loadStyles);
});
function preloadingDone() {
	pageLoad = true;
	initAnimStates();
}

function audioFinish() {
	cPageObj.scrubberBool = true;
	$(".button, .buttons").css("pointer-events", "auto").css("cursor","pointer")
	$(".page_overlay").css("display", "none");
}
function replayPage(){
	//init();
	$(".button, .buttons").removeClass('visited')
  resetPopupFun()
}

/*---------------Variable declartions---------*/
var tll;
var mainSlideImagePath;
var cPageObj = {};
cPageObj.scrubberBool = false;
cPageObj.id;
cPageObj.btn_no;
cPageObj.totalItems;
cPageObj.prevcount;
cPageObj.clickedArr = [];
cPageObj.popupAudios = [];
cPageObj.disableButton = true;
$(document).ready(function() {
	mainSlideImagePath = document.querySelector('.MainSlide img').src;
	cPageObj.totalItems=$(".button, .buttons").length
	model.videoFlg=false
	$(".button, .buttons").on("click", function() {
		resetPopupFun()
		cPageObj.id = this.id;
		cPageObj.btn_no = cPageObj.id.split("_")[1];
		$(".slidePopup").css("display", "block");
		$("#clickTab_"+cPageObj.btn_no).css("pointer-events", "none").css("cursor","default")
		cPageObj.clickedArr[cPageObj.btn_no - 1] = 1;
		fnShowPopup(cPageObj.btn_no);
	});
	
	$(".close-click-popup").click(function() {
		resetPopupFun()
	});
	init();
	/*if(model.audioName=="mute.mp3"){
		$("#preloaderSpinner").fadeOut("slow");
	}*/
	cPageObj.scrubberBool = true;
	$(".button, .buttons").css("pointer-events", "auto").css("cursor","pointer")
	$(".page_overlay").css("display", "none");
	//Pagelevel content Hide/Show functionality
	controller.PageContentVisiblityFun()
	$("#txt_open_close").off().on("click", function(){
		model.ContentVisibleFlg = !model.ContentVisibleFlg;
		controller.PageContentVisiblityFun();
	})
});

function resetPopupFun(){
	reloadGIFs();
	$(".slidePopup, .popupSection").css("display", "none");
	$(".popup_overlay").hide();
	$(".popup-section").css("display", "none");
	$(".button, .buttons").css("pointer-events", "auto").css("cursor", "pointer").removeClass('active')
}

/*---------------------Functions---------------------*/
function reloadGIFs() {
	if (mainSlideImagePath.includes('.gif')) {
		// The image has an extension of GIF, so let's reload it
		let newPath = mainSlideImagePath + '?v=' + Math.random();
		document.querySelector('.hotspot_box img').src = newPath;
	}
}
function playAnimation(pageType) {
	//$(".video-rt-text-scroll").mCustomScrollbar();
	//$(".button, .buttons").css("pointer-events", "none").css("cursor","default")
	if (tll) {
		tll.totalProgress(1).kill();
	}
	tll = new TimelineLite({
		onUpdate : updateSlider,
		onComplete : animCompleted
	});
	if (pageType == "main") {
		cPageObj.scrubberBool = false;
		$(".page_overlay").css("display", "block"); 
		tll.add(animateIn($("#dummySynch")).play(), 2);

	}
}

function init() {
	for (var i = 0; i < cPageObj.totalItems; i++) {
		cPageObj.clickedArr[i] = 0;
	}
	$(".close-click-popup").css("cursor", "pointer");

}

function fnShowPopup(aNum) {
		$("#clickTab_" + aNum).addClass('active').addClass("visited");
		$(".clickPop" + aNum).show();
		$(".popup_overlay").show();
		showAudioLoading = true;
		setPageCompletion();
}

function setPageCompletion() {
	for (var i = 0; i < cPageObj.totalItems; i++) {
		if (cPageObj.clickedArr[i] == 0) {
			return;
		}
	}
	controller.setPageVisited();
}
