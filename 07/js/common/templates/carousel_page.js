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
  slideIndex = 1;
  showSlides(slideIndex);
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
   $(".button").on("click", function() {
		resetPopupFun()
		id = this.id;
		btn_no = id.split("_")[1];
		$(".zoom_icon").hide();
		$("#clickTab_"+btn_no).css("pointer-events", "none").css("cursor","default")
		$("#clickTab_" + btn_no).addClass('active');
		$(".clickPop" + btn_no).show();
		$(".popup_overlay").show();
		showAudioLoading = true;
	});
	
	 controller.setPageVisited();
	 //Pagelevel content Hide/Show functionality
  controller.PageContentVisiblityFun()
  
  //
	$("#txt_open_close").off().on("click", function(){
		model.ContentVisibleFlg = !model.ContentVisibleFlg;
		controller.PageContentVisiblityFun();
  })
  /////////////////////////////////////////////////////////////
  $(".iconCamera").off().on("click", function(e){
    clickedID = e.target.id;
    openModel(clickedID)
  })
  $(".close-model").off().on("click", function(){
    closeModel();
  })
  
  function openModel(bid){
    $(".popup_overlay").show();
    var pid = "#model_"+bid.split("_")[1]
    $(pid).show();
  }
  function closeModel(){
    $(".popup_overlay").hide();
    $(".model").hide();
  }
  ////////////////////////////////////////////////////////////
	$(".close-click-popup").click(function() {
		resetPopupFun()
  });
  $(".buttonleft").click(function(){
    plusSlides(-1)
  })

  $(".buttonright").click(function(){
    plusSlides(1)
  })

});

  function resetPopupFun(){
	$(".popup_overlay").hide();
	$(".zoom_icon").show();
	$(".popup-section").css("display", "none");
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


//////////////////////////////////////////////////

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("slide");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }
  /////////////////////////////////////////////////////////
  $(".buttonright").removeClass("disabledBtn");
  $(".buttonleft").removeClass("disabledBtn");
  if(slideIndex == 1){
    $(".buttonleft").addClass("disabledBtn");
  }else if(slideIndex == slides.length){
    $(".buttonright").addClass("disabledBtn");
  }
  ////////////////////////////////////////////////////////
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
     dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  replayGIF($(".gifAnim"));
  dots[slideIndex-1].className += " active";
}

function replayGIF($img) {
  if ($img.length === 1 && $img.prop('tagName').toLowerCase() == 'img') {
      $img.data('src', $img.attr('src'))
          .attr('src', '')
          .attr('src', $img.data('src'));
  }
}