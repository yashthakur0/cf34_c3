/*---------------Page Init Functions---------*/
$(function() {
    imageLoader.load($('.pageWrapper'), controller.loadStyles);
});

function preloadingDone() {
    pageLoad = true;
    initAnimStates();
}

function audioFinish() {
    $(".video_inner").css("pointer-events", "auto");
   // controller.setPageVisited();
    $('.btnPlay').css("pointer-events", "auto").css("cursor", "pointer");
    //$('.video_inner').css("pointer-events", "auto").css("cursor", "pointer");
	audioEnd=true
	/*if(!device.iPad()){
		if(videocanplay){
			video[0].play();
		}
	}*/
	$("#VideoPlayBtn").on('click', function(){
		$("#VideoPlayBtn").hide();
		video[0].play();
	})
	videocanplay=false
}
/*---------------Variable declartions---------*/
var tll;
var video;
var completeloaded = false;
var audioEnd=false;
var videocanplay=false;

$(document).ready(function() {
	model.videoFlg=true
	model.videoPlayingStatus=false	
	$("#VideoPlayBtn").hide()	
	//if(device.iPad()){	
		//$("#VideoPlayBtn").show()	
	//}else{	
		//$("#VideoPlayBtn").hide()	
	//}
    video = $('#video');
    videoLoad();
	controller.VideoFileInitFun()
	//Pagelevel content Hide/Show functionality
	controller.PageContentVisiblityFun()
	$("#txt_open_close").off().on("click", function(){
		model.ContentVisibleFlg = !model.ContentVisibleFlg;
		controller.PageContentVisiblityFun();
	})
    $('.video_inner').css("pointer-events", "none").css("cursor", "default");
});


function videoLoad() {
    video[0].pause();
   video[0].volume = 0.4;
   /* video.on('click', function() {
        playpause();
    });*/
	video.on('timeupdate', function() {	
		if(video[0].currentTime>0){	
			$("#VideoPlayBtn").hide();	
		} 		
	});
    video.on('canplay', function() {
        //console.log("canPlay called");
        $('.loading').fadeOut(100);
		videocanplay=true;
		//if(!device.iPad()){
			if(audioEnd){
				video[0].play();
			}
		//}
		audioEnd=false
    });
    video.on('canplaythrough', function() {
        completeloaded = true;
    });

    //video ended event
    video.on('ended', function() {
        $('.btnPlay').removeClass('paused');
        video[0].pause();
		controller.setPageVisited();
    });

    //video seeking event
    video.on('seeking', function() {
        //if video fully loaded, ignore loading screen
        if (!completeloaded) {
          //  $('.loading').fadeIn(200);
        }
    });
	
	/*video.on('pause', function() {
		if(model.videoPausedByUser){
			model.videoPausedByUser=true
			console.log(model.videoPausedByUser+" Pause model.videoPausedByUser 3");
		}
	});
	
	video.on('play', function() {
		if(model.videoPausedByUser){
			model.videoPausedByUser=false
			console.log(model.videoPausedByUser+" Play model.videoPausedByUser 4");
		}
	});*/

    //video seeked event
    video.on('seeked', function() {});

    //video waiting for more data event
    video.on('waiting', function() {
        //$('.loading').fadeIn(200);
    });
}


//display current video play time
//CONTROLS EVENTS
var playpause = function() {
    $('.time2').show();
    $('.duration1').text(timeFormat(video[0].duration));
    $('.duration1').css("display", "block");
    if (video[0].paused || video[0].ended) {
        $('.btnPlay').addClass('paused');
        video[0].play();
    } else {
        $('.btnPlay').removeClass('paused');
        video[0].pause();
    }
};




/*---------------------Functions---------------------*/
function playAnimation(pageType) {
	$('.dis_btn1').css('display', 'block');
    $('.time2').hide();
	//$(".video-rt-text-scroll").mCustomScrollbar();
	try {
		video[0].currentTime = 0;
		//video[0].load();
		video[0].pause();
	}catch (err) {

    }
    $('.timeBar').css('width', 0 + '%');
    $('.btnPlay').removeClass('paused').css("pointer-events", "none").css("cursor", "default");
    $('.video_inner').css("pointer-events", "none").css("cursor", "default");
    if (tll) {
        tll.totalProgress(1).kill();
    }
    tll = new TimelineLite({
        onUpdate: updateSlider,
        onComplete: animCompleted
    });
	
    $(".navPPicon").css("pointer-events", "none").css('cursor', 'default').removeClass("Clicked")
  
    tll.add(animateIn_show($(".slide02")).play(),0);
    tll.add(animateIn($("#dummySynch")).play(), 28.5);


}
/*---------------------End---------------------*/