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
	$(".button").css("pointer-events", "auto").css("cursor","pointer")
	$(".page_overlay").css("display", "none");
}

function replayPage(){
	$(".button").removeClass('visited')
  resetPopupFun()
}


/*---------------Variable declartions---------*/
var tll;
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
	cPageObj.totalItems=$(".button").length
	model.videoFlg=false
	$(".button").on("click", function() {
		resetPopupFun()
		cPageObj.id = this.id;
		cPageObj.btn_no = cPageObj.id.split("_")[1];
		$("#clickTab_"+cPageObj.btn_no).css("pointer-events", "none").css("cursor","default")
		cPageObj.clickedArr[cPageObj.btn_no - 1] = 1;
		fnShowPopup(cPageObj.btn_no);
		if($(".clickPop" + cPageObj.btn_no).children('.zoom_div').length > 0){
			$(".zoom_icon").css("display", "block")
			$(".clickPop" + cPageObj.btn_no).find("img:eq(0)").css("display", "inline-block")
			$(".clickPop" + cPageObj.btn_no).find("img:eq(1)").css("display", "none")
			$(".zoom_icon").on("click", function() {
				$(".zoom_icon").css("display", "none")
				$(".clickPop" + cPageObj.btn_no).find("img:eq(0)").css("display", "none")
				$(".clickPop" + cPageObj.btn_no).find("img:eq(1)").css("display", "inline-block")
			})
		}
	});
	
	/*if(model.audioName=="mute.mp3"){
		$("#preloaderSpinner").fadeOut("slow");
	}*/
	cPageObj.scrubberBool = true;
	$(".button").css("pointer-events", "auto").css("cursor","pointer")
	$(".page_overlay").css("display", "none");
	$(".close-click-popup").click(function() {
		resetPopupFun()
	});
	init();
	//Pagelevel content Hide/Show functionality
	controller.PageContentVisiblityFun()
	$("#txt_open_close").off().on("click", function(){
		model.ContentVisibleFlg = !model.ContentVisibleFlg;
		controller.PageContentVisiblityFun();
	})
});

function resetPopupFun(){
	$(".popup_overlay").hide();
	$(".popup-section").css("display", "none");
	$(".button").css("pointer-events", "auto").css("cursor", "pointer").removeClass('active')
}

/*---------------------Functions---------------------*/
function playAnimation(pageType) {
$(".video-rt-text-scroll").mCustomScrollbar();
	$(".button").css("pointer-events", "none").css("cursor","default")
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
		$("#clickTab_" + aNum).addClass('active').addClass("visited");;
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
