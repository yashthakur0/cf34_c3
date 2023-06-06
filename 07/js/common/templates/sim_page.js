/*---------------Page Init Functions---------*/
/*---------------Page Init Functions---------*/
$(function() {
    imageLoader.load($('.pageWrapper'), controller.loadStyles);
});

function preloadingDone() {
    pageLoad = true;
    initAnimStates();
	assignExternalData_1();
}

function audioFinish() {
    controller.setPageVisited();
}

function replayPage(){
  resetPopupFun()
  slideIndex = 1;
  showSlides(slideIndex);
  
}


function assignExternalData_1() {
	if(ExternalData.audio_sim){
	  audio_sim =  ExternalData.audio_sim;
	}
	if(ExternalData.simAudios){
	  simAudios = ExternalData.simAudios
	}else{
	  simAudios = [];
	}

}


/*---------------Variable declartions---------*/
var tll;
var scrubberBool = false;
var disableButton = true;
var audio_sim =  false;
var simAudios;

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
	if(this.getAttribute("reset")=="bounceBack"){
		//var step_num=this.getAttribute("reset").split("_")[1]
		setTimeout(function(){
		  plusSlides(1)
		},2000)
	}
  })

  $(".buttonright").click(function(){
    plusSlides(1)
  })

  $(".buttonright_auto").click(function(){
    var step_num = parseInt(this.getAttribute("jump_time"))
    //console.log("step_num: "+step_num);
    //console.log("!step_num > 0: "+ (!step_num > 0))
    if (!(step_num > 0 )){
      step_num = 2000
    }

    plusSlides(1)
    setTimeout(function(){
      plusSlides(1)
    },step_num)
  })

  $(".buttonStep").click(function(){
    var step_num = parseInt(this.getAttribute("step")) 
    currentSlide(step_num)
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
  
  if (n > slides.length) {
    slideIndex = 1
    controller.setPageVisited();
  }
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
  ////////////////////////////////////////////////////////////
	//console.log("audio_sim: "+ audio_sim)
	//console.log("simAudios: ", simAudios)
  if(audio_sim){
    var current_audio = simAudios[slideIndex-1]
    if(current_audio){
      audioPlayer.loadAudioPath(model.audioPath + current_audio);
      $("#preloaderSpinner").hide();
     // console.log("current_audio: "+ current_audio);
    }else{
      //console.log("No Audio identified")
    }
  }
}