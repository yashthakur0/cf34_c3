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
  initPage();
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
   $(".button, .buttons").off().on("click", function() {
	   //alert("Button clicked")
		resetPopupFun()
		id = this.className;;
		btn_no = id.split("_")[2];
		console.log(btn_no)
		$(".zoom_icon").hide();
		$("#clickTab_"+btn_no).css("pointer-events", "none").css("cursor","default")
		$("#clickTab_" + btn_no).addClass('active');
		$("#clickTab_" + btn_no).show();
		$("#clickPop_" + btn_no).show();
		//$(".popup_overlay").show();
		$(".popup-section").show();
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
	$(".close-pop").click(function() {
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

/*
 *
 * GIF functionality
 *
 */
var cPageObj = {};
var myTimer;
cPageObj.currIndex = 1;
cPageObj.gif_timer = []
cPageObj.elm_img = $(".my-gif");
for(var g = 0; g < cPageObj.elm_img.length; g++ ){
	cPageObj.gif_timer[g] = $(cPageObj.elm_img[g]).attr("data-duration")
}


cPageObj.startTimer = function(){
	$(cPageObj.elm_img).hide()
	replayGIF($(cPageObj.elm_img[cPageObj.currIndex-1])) 
	$(cPageObj.elm_img[cPageObj.currIndex-1]).show()
	myTimer = setTimeout(function(){
		if(cPageObj.currIndex < cPageObj.gif_timer.length ){
			cPageObj.currIndex++
			cPageObj.startTimer();
		}else{
			$(".btn_con").show();
		}
		console.log("Current Executed Loop is: "+cPageObj.currIndex)
	}, parseInt(cPageObj.gif_timer[cPageObj.currIndex-1]) )
}


function initPage(){
	console.log("ReplayPage Called ")
	clearTimeout(myTimer)
	//cPageObj.elm_img.setAttribute("src", cPageObj.gif_list[0])
	cPageObj.currIndex = 1;
	cPageObj.startTimer()
}
initPage()

function replayGIF($img) {
	if ($img.length === 1 && $img.prop('tagName').toLowerCase() == 'img') {
		$img.data('src', $img.attr('src'))
			.attr('src', '')
			.attr('src', $img.data('src'));
	}
  }

 








