/*---------------Page Init Functions---------*/
$(function() {
	imageLoader.load($('.pageWrapper'), controller.loadStyles);
});
function preloadingDone() {
	pageLoad = true;
	initAnimStates();
}

function audioFinish() {
	scrubberBool = true;

	$(".page_overlay").css("display", "none");
}
function replayPage(){
	//init();
	$(".buttons").removeClass('visited')
	$(".btn").css("display", "none")
  resetPopupFun()
  myStopFunction()
  myTimerFunction()
  replayGIF($(".gifAnim"));
}

/*---------------Variable declartions---------*/
var tll;
var scrubberBool = false;
var id;
var btn_no;
var totalItems;
var prevcount;
var clickedArr = [];
var popupAudios = [];
var disableButton = true;
var totalMilliSec
var myVar;

$(document).ready(function() {
	/*if(ExternalData.giftimer){
		totalMilliSec=(ExternalData.giftimer*1000)
	}*/
	
	totalMilliSec=($(".gifAnim").attr("gif_Time")*1000);

	totalItems=$(".buttons").length
	model.videoFlg=false
	$(".btn").css("display", "none")
	init()
	replayPage()
	$(".buttons").on("click", function() {
		resetPopupFun()
		id = this.id;
		$(".btn").css("display", "none")
		btn_no = id.split("_")[1];
		if(btn_no=="1"){
			$("#btn_2").css("display", "block")
		}else{
			$("#btn_1").css("display", "block")
		}
		clickedArr[btn_no - 1] = 1;
		fnShowPopup(btn_no);
	});
	
	$(".refreshbtn").on("click", function() {
		replayPage()
	})
	
	
	$(".close-click-popup").click(function() {
		resetPopupFun()
	});
	init();
	scrubberBool = true;
	$(".buttons").css("pointer-events", "auto").css("cursor","pointer")
	$(".page_overlay").css("display", "none");
	//Pagelevel content Hide/Show functionality
	controller.PageContentVisiblityFun()
	$("#txt_open_close").off().on("click", function(){
		model.ContentVisibleFlg = !model.ContentVisibleFlg;
		controller.PageContentVisiblityFun();
	})
});

function fnShowPopup(aNum) {
		$(".clickPop" + aNum).addClass('active').addClass("visited").show();
		showAudioLoading = true;
		$("#btn_3").css("display", "block")
		setPageCompletion();
}

function resetPopupFun(){
	$(".popupSection").hide();
	$(".popup-section").css("display", "none");
	$(".buttons").css("pointer-events", "auto").css("cursor", "pointer").removeClass('active')
}

function myTimerFunction() {
  myVar = setTimeout(function(){ 
	$("#btn_1, #btn_3").css("display", "block")
	$(".buttons").css("pointer-events", "auto").css("cursor","pointer")
	setPageCompletion();
	myStopFunction()
  },totalMilliSec );
}

function myStopFunction() {
  clearTimeout(myVar);
}

/*---------------------Functions---------------------*/
function playAnimation(pageType) {
	//$(".video-rt-text-scroll").mCustomScrollbar();
	$(".buttons").css("pointer-events", "none").css("cursor","default")
	if (tll) {
		tll.totalProgress(1).kill();
	}
	tll = new TimelineLite({
		onUpdate : updateSlider,
		onComplete : animCompleted
	});
	if (pageType == "main") {
		scrubberBool = false;
		$(".page_overlay").css("display", "block"); 
		tll.add(animateIn($("#dummySynch")).play(), 2);
	}
}

function init() {
	for (var i = 0; i < totalItems; i++) {
		clickedArr[i] = 0;
	}
	$(".close-click-popup").css("cursor", "pointer");

}



function setPageCompletion() {
	for (var i = 0; i < totalItems; i++) {
		if (clickedArr[i] == 0) {
			return;
		}
	}
	controller.setPageVisited();
}


function replayGIF($img) {

  if ($img.length === 1 && $img.prop('tagName').toLowerCase() == 'img') {

      $img.data('src', $img.attr('src'))
          .attr('src', '')
          .attr('src', $img.data('src'));

  }

}