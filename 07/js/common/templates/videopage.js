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
	cPageObj.audioEnd=true
	video[0].play();
	$("#VideoPlayBtn").off().on('click', function(){
		$("#VideoPlayBtn").hide();
		video[0].play();
	})
	videocanplay=false
}
/*---------------Variable declartions---------*/
function replayPage(){
  
}

var tll;
var cPageObj = {};
var video;
cPageObj.audioEnd=false;
cPageObj.completeloaded = false;
$(document).ready(function() {
	
	model.videoFlg=true
	model.videoPlayingStatus=false
	
	video = $('#video');
	//video[0].removeAttribute("controls");
	playAnimation();
	initClickEvents();
	controller.VideoFileInitFun()
	videoLoad();
	//Pagelevel content Hide/Show functionality
	controller.PageContentVisiblityFun()
	$("#txt_open_close").off().on("click", function(){
		model.ContentVisibleFlg = !model.ContentVisibleFlg;
		controller.PageContentVisiblityFun();
	})
    $('.video_inner').css("pointer-events", "none").css("cursor", "default");
	
});
/*---------------------Functions---------------------*/
function playAnimation() {

	$('.dis_btn1').css('display', 'block');
	$('.time2').hide();

	if (tll) {
		tll.totalProgress(1).kill();
	}
	tll = new TimelineLite({
		onUpdate : updateSlider,
		onComplete : animCompleted
	});
	tll.add(animateIn($("#dummySynch")).play(), 4.5);
	myVid = document.getElementById("video");
}
function videoLoad() {
	//video[0].play();
	video[0].load();
	video[0].pause();
	video.bind('loadedmetadata', function() {
		/*$('.caption').animate({
			'top' : -45
		}, 300);*/
		//set video properties
		$('.current1').text(timeFormat(0));
		//updateVolume(0, 0.9);
		//start to get video buffering data
		//setTimeout(startBuffer, 150);
		//bind video events
		//$('.videoContainer').append('<div id="init"></div>').hover(function() {
	});
	
	video.on('timeupdate', function() {
		var currentPos = video[0].currentTime;
		var maxduration = video[0].duration;
		var perc = 100 * currentPos / maxduration;
		$('.timeBar').css('width', perc + '%');
		$('.duration1').css('display', 'block');
		$('.current1').text(timeFormat(currentPos));
		controller.VideoMuteTrackingFun()
	});
	video.on('click', function() {
		//playpause();
	});
	video.on('canplay', function() {
		$('.loading').fadeOut(100);
		videocanplay=true;
		if(cPageObj.audioEnd){
			video[0].play();
		}
		cPageObj.audioEnd=false
	});
	video.on('canplaythrough', function() {
		cPageObj.completeloaded = true;
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
		if (!cPageObj.completeloaded) {
			$('.loading').fadeIn(200);
		}
	});

	//video seeked event
	video.on('seeked', function() {
	});

	//video waiting for more data event
	video.on('waiting', function() {
		$('.loading').fadeIn(200);
	});
	myVid.onplaying = function() {
		controller.VideoMuteTrackingFun()
	};
}

function initClickEvents() {
	//video screen and play button clicked
	$('.btnPlay').off().on('click', function() {
		playpause();
		$('.duration1').css("display", "block");
	});
	//speed text clicked
	$('.btnx1').on('click', function() {
		fastfowrd(this, 1);
	});
	$('.btnx3').on('click', function() {
		fastfowrd(this, 3);
	});
	//stop button clicked
	$('.btnStop').on('click', function() {
		$('.btnPlay').removeClass('paused');
		updatebar($('#progress').offset().left);
		video[0].pause();
	});
	//fullscreen button clicked
	$('.btnFS').on('click', function() {
		if ($.isFunction(video[0].webkitEnterFullscreen)) {
			//video[0].webkitEnterFullscreen();
			video[0].webkitEnterFullscreen();
		} else if ($.isFunction(video[0].mozRequestFullScreen)) {
			video[0].mozRequestFullScreen();
		} else {
			alert('Your browsers doesn\'t support fullscreen');
		}
	});
	
	//sound button clicked
	$('.sound').click(function() {
		video[0].muted = !video[0].muted;
		$(this).toggleClass('muted');
		if (video[0].muted) {
			$('.volumeBar').css('width', 0);
		} else {
			$('.volumeBar').css('width', video[0].volume * 100 + '%');
		}
	});
	/* check for drag event */
	$('#progress').on('mousedown', function(e) {
		timeDrag = true;
		updatebar(e.pageX);
	});
	
	$('.volume').on('mousedown', function(e) {
		volumeDrag = true;
		video[0].muted = false;
		$('.sound').removeClass('muted');
		updateVolume(e.pageX);
	});
}


//display current video play time
//CONTROLS EVENTS
var playpause = function() {
	$('.time2').show();
	$('.duration1').text(timeFormat(video[0].duration));
	$('.duration1').css("display", "block");
	$('#init').hide();
	if (video[0].paused || video[0].ended) {
		$('.btnPlay').addClass('paused');
		model.videoPlayingStatus=true
		video[0].play();
	} else {
		$('.btnPlay').removeClass('paused');
		model.videoPlayingStatus=false
		video[0].pause();
	}
};
var fastfowrd = function(obj, spd) {
	$('.text').removeClass('selected');
	$(obj).addClass('selected');
	video[0].playbackRate = spd;
	video[0].play();
};
var timeDrag = false;
var updatebar = function(x) {
	var progress = $('#progress');

	//calculate drag position
	//and update video currenttime
	//as well as progress bar
	var maxduration = video[0].duration;
	var position = x - progress.offset().left;
	var percentage = 100 * position / progress.width();
	if (percentage > 100) {
		percentage = 100;
	}
	if (percentage < 0) {
		percentage = 0;
	}
	$('.timeBar').css('width', percentage + '%');
	video[0].currentTime = maxduration * percentage / 100;
	
};
var volumeDrag = false;
var updateVolume = function(x, vol) {
	var volume = $('.volume');
	var percentage;
	//if only volume have specificed
	//then direct update volume
	if (vol) {
		percentage = vol * 100;
	} else {
		var position = x - volume.offset().left;
		percentage = 100 * position / volume.width();
	}

	if (percentage > 100) {
		percentage = 100;
	}
	if (percentage < 0) {
		percentage = 0;
	}

	//update volume bar and video volume
	$('.volumeBar').css('width', percentage + '%');
	video[0].volume = percentage / 100;

	//change sound icon based on volume
	if (video[0].volume == 0) {
		$('.sound').removeClass('sound2').addClass('muted');
	} else if (video[0].volume > 0.5) {
		$('.sound').removeClass('muted').addClass('sound2');
	} else {
		$('.sound').removeClass('muted').removeClass('sound2');
	}

};
//Time format converter - 00:00
function timeFormat(seconds) {
	 var m = Math.floor(seconds / 60) < 10 ? "0" + Math.floor(seconds / 60) : Math.floor(seconds / 60);
	 var s = Math.floor(seconds - (m * 60)) < 10 ? "0" + Math.floor(seconds - (m * 60)) : Math.floor(seconds - (m * 60));
	 return m + ":" + s;

};
function timeFormat1(seconds) {
	 var m = Math.round(seconds / 60) < 10 ? "0" + Math.round(seconds / 60) : Math.round(seconds / 60);
	 var s = Math.round(seconds - (m * 60)) < 10 ? "0" + Math.round(seconds - (m * 60)) : Math.round(seconds - (m * 60));
	 return m + ":" + s;

};


function animCompleted() {

}
/*---------------------End---------------------*/