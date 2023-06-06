/**
 * @author Shiyazudeen
 */
var audio;
var self;
var dummyAudioInterval;
var positionInterval;
var seeking = false;
var playerVar;
var MEPlayer;
var isMutedBeforeDestroy = false;
var firstTime = false;
var pauseTime;
var audioInitiallyPause = false;
var isAudio = true;
var audioCallBack;
var audioLoaded = false;
var audioLoadFirstTime = true;
var showAudioLoading = true;
var notMuted = false;
//-- Initial audio reset for interactivity pages
var initialAudioReset = false;
var intActivityAudioReset = false;
var allAssestsLoaded = false;
var scrubberBool = false;
var currMEObj = null;
var currPluginType = null;
var _path_mp3;
var currAudioFile;
var audioRefChanged = false;

$(document).ready(function() {
	$("#triggerBtn").click(function(e) {
		model.firstLaunchIpad=false
		$("#deviceLaunch").hide();
		callInitialAudio();
		$("#preloaderSpinner").css("display", "block");
	});
	
	$(document).on('input', '#volumeSlider', function() {
		model.volumeValue=$(this).val()
		MEPlayer.volume = model.volumeValue;
	});
	$('#replay_Icon').click(function(e) {
		if ($(this).hasClass("disabled") || $(this).hasClass("deactive")) {
			return;
		}
		replayPage()
			if (tll) {
				tll.restart();
			}
			if (!interActivityPage) {
				playAnimation('main');
			} else {
				playAnimation('interActivity');
			}
			if(model.videoFlg){
				var currVideo=$('#video').get(0)
				//if(!currVideo.paused){
					currVideo.currentTime = 0;
					currVideo.play()
					if(model.audioMuted){
						$('#video').prop('muted', true);
					}else{
						$('#video').prop('muted', false); 
					}
					$('.btnPlay').addClass('paused');
				//}
			}else{
				if (isAudio) {
					if (currPluginType == "flash") {
						currMEObj.play();
					} else {
						var currTime = 0;
						MEPlayer.setCurrentTime(currTime);
						MEPlayer.play();
					}
					if (currPluginType == "flash") {
						currMEObj.pause();
						currMEObj.play();
					}
				}
			}
			//$(".video-rt-text-scroll").mCustomScrollbar();
			$(".scrubber").css("pointer-events", "auto")
			return;
	});

	$('.footer-holder .scrubber').on('mouseup mouseout', function(e) {
		seeking = false;
	});
	$('.footer-holder .scrubber').on('mousedown', function(e) {
		seeking = true;
	});

	$('.footer-holder .scrubber').on('click mousemove', function(e) {
		if (e.type == 'mousemove' && !seeking || $(this).hasClass("deactive")) {
			return;
		}
		var relativeLeft = e.clientX - leftPos(this);
		var percPos = (relativeLeft / this.offsetWidth);
		percPos = percPos <= 0 ? 0 : percPos;
		if (!$('#gadgetsButn .play').hasClass('playing')) {
			if (isAudio) {
				if (MEPlayer.pluginType != 'flash') {
					MEPlayer.play();
				} else {
					currMEObj.play();
				}
			}
			$('#gadgetsButn .play').addClass('playing');
			if ($('#gadgetsButn .play').hasClass('replay')) {
				//$('#gadgetsButn .play').removeClass('replay');
			}
		} else {
			if (isAudio) {
				if (MEPlayer.pluginType != 'flash') {
					MEPlayer.play();
				} else {
					MEPlayer.pause();
				}
			}
			$('#gadgetsButn .play').addClass('playing');
			if ($('#gadgetsButn .play').hasClass('replay')) {
				//$('#gadgetsButn .play').removeClass('replay');
			}
		}
		if (isAudio) {
			var currTime = 0;
			if ($(".pageWrapper").hasClass("RTL") || $(".Arabic").hasClass("RTL")) {
				var tmpPercPos = -(percPos - 1);
				currTime = tmpPercPos * getDuration();
				playCJSAnimFrom(tmpPercPos);
			} else {
				currTime = percPos * getDuration();
				playCJSAnimFrom(percPos);
			}
			if (MEPlayer.pluginType == 'flash') {
				MEPlayer.pause();
			}
			if (currPluginType == "flash") {
				currMEObj.setCurrentTime(currTime);
			} else {
				MEPlayer.setCurrentTime(currTime);
			}
		}

		if (tll) {
			if ($(".pageWrapper").hasClass("RTL") || $(".Arabic").hasClass("RTL")) {
				tll.progress(tmpPercPos);
			} else {
				tll.progress(percPos);
			}
			tll.resume();
			//-- This dispatch event is used to initilize and reset
			$('.footer-holder .scrubber').trigger("RESET_SLIDER");
		}
	});
});

var AudioPlayer = function() {
	// console.log('[AP] AudioPlayer');
	audioCallBack = null;
	self = this;
};

AudioPlayer.prototype.loadAudioPath = function(_path, callBack) {
	// console.log('[AP] loadAudioPath: _path: ' + _path + '  interActivityPage: ' + interActivityPage);
	// iPadDebug('[AP] loadAudioPath: _path: ' + _path + '  interActivityPage: ' + interActivityPage);
	// console.log('[AP] load muted: ' + isMutedBeforeDestroy);
	//-- Function to be called at the end of audio

	audioCallBack = callBack;
	if (currPluginType != "flash") {
		self.destroyAudio();
	}
	audioLoaded = false;
	audioLoadFirstTime = true;
	initialAudioReset = false;

	_path = _path.split('.')[0];
	_path_mp3 = String(_path + '.mp3');
	var _path_ogg = String(_path + '.ogg');

	if (currAudioFile != _path_mp3) {
		audioRefChanged = true;
	}
	//-- mediaelement player stuff ------------------------------------------------//
	//-- Instantiate jPlayer
	$("#jquery_jplayer").html("");
	var audio = document.createElement("audio");
	audio.src = _path_mp3;
	
	$("#jquery_jplayer").append(audio);
	if (playerVar == undefined || playerVar == "undefined" || currPluginType != "flash") {
		playerVar = $(audio).mediaelementplayer({
			//-- mode: shim is to emulate or prefer Flash mode
			// mode : 'shim',
			pauseOtherPlayers : true,
			alwaysShowControls : false,
			enableKeyboard : false,
			enablePluginDebug : false,
			loop : false,
			success : function(player, node) {
				MEPlayer = player;
				MEPlayer.play();
				MEPlayer.volume = model.volumeValue;
				if (notMuted) {
					MEPlayer.setMuted(true);
				} else {
					MEPlayer.setMuted(false);
				}
				if (device.Android() || device.iOS()) {
					if (!interActivityPage) {
						if (device.iOSVersion() >= 8) {
						} else {
							MEPlayer.stop();
						}
					}
				}
				self.removeEventListeners(MEPlayer);
				self.addEventListeners(MEPlayer);
			}
		});
	} else {
		currMEObj.pause();
		if (audioRefChanged) {
			initialAudioReset = true;
		}
		currMEObj.setSrc(_path_mp3);
		currMEObj.load();

		self.removeEventListeners(currMEObj);
		self.addEventListeners(currMEObj);
		if (!interActivityPage) {
			if (device.Firefox()) {
				audioLoaded = true;
			}

			//-- Only for Interactivity pages - audio reset
			if (initialAudioReset) {
				initialAudioReset = false;
				$('#gadgetsButn .play').removeClass('playing').addClass('replay');
				$('.footer-holder .progress').css('width', '100%');
			}
		}
	}

	//-- Show preloader for audio
	if (showAudioLoading) {
		if (interActivityPage) {
			controller.gadgetsBtnDisable();
			intActivityAudioReset = false;
			$("#preloaderSpinner_int").css("display", "block");
		} else if (intActivityAudioReset) {
			$("#preloaderSpinner_int").css("display", "block");
		} else {
			if ($("#preloaderSpinner").css("display") == "none") {
				$("#preloaderSpinner").css("display", "block");
			}
		}
	}

};

AudioPlayer.prototype.handleCanPlayEvent = function(objEvent) {
	var objMEPlayer = MEPlayer;
	audioLoaded = true;
	currAudioFile = _path_mp3;
	if (!interActivityPage && audioLoadFirstTime && !allAssestsLoaded) {
		if (device.Android()) {
			objMEPlayer.setCurrentTime(0);
		} else {
			objMEPlayer.stop();
		}
		if ($("#preloaderSpinner_int").css("display") == "block") {
			$("#preloaderSpinner_int").css("display", "none");
		}
		loadedAssestsCnt++;
		// console.log("[AP] audio Load Success" + loadedAssestsCnt);
		ProgressiveLoader.setLoadedAssetCount(loadedAssestsCnt);
	} else if (!interActivityPage && audioLoadFirstTime && intActivityAudioReset) {
		// console.log("[AP] interactivity closed");
		if (objMEPlayer.pluginType != "flash") {
			objMEPlayer.stop();
		}
		var dur = objMEPlayer.duration;
		$('.time .played').html(getTime(dur * 1000, true));
		$('.time .duration').html(getTime(dur * 1000, true));
		$("#preloaderSpinner_int").css("display", "none");
	} else {
		if (interActivityPage && audioLoadFirstTime) {
			// console.log("[AP] canplay Success" + interActivityPage);
			if (device.IEVersion() != 9) {
				objMEPlayer.play();
			}
			allAssestsLoaded = true;
		}
		if (audioLoadFirstTime) {
			//$('#gadgetsButn .play').removeClass('replay').addClass('playing');
			$('.footer-holder .progress').css('width', '100%');
		}

	}
	currPluginType = objMEPlayer.pluginType;
};

AudioPlayer.prototype.handleProgressEvent = function(objEvent) {
};

AudioPlayer.prototype.handleTimeupdateEvent = function(objEvent) {
	var objMEPlayer = MEPlayer;
	if (navigationTour) {
		if (isAudio) {
			if (objMEPlayer != null) {
				var ct = objMEPlayer.currentTime;
				var dur = objMEPlayer.duration;
				updateDisplayTime(ct * 1000, dur * 1000);
				currMEObj = objMEPlayer;
			}
		}
	} else {
		if (isAudio) {
			var ct = objMEPlayer.currentTime;
			var dur = objMEPlayer.duration;
			updateDisplayTime(ct * 1000, dur * 1000);
			if (objMEPlayer.pluginType == 'flash') {
				// console.log('[AP] updt: ', objMEPlayer.id);
				currMEObj = objMEPlayer;
			}
		}
	}
};

AudioPlayer.prototype.handlePlayingEvent = function(objEvent) {
	// console.log('[AP] playing');
	var objMEPlayer = MEPlayer;
	if (audioInitiallyPause == true) {
		$('.footer-holder .progress').css('width', '100%');
		audioInitiallyPause = false;
	} else {
		if ($('#gadgetsButn .play').hasClass('replay')) {
			//$('#gadgetsButn .play').removeClass('replay');
			$('#gadgetsButn .play').addClass('playing');
		}
	}
};

AudioPlayer.prototype.handleEndedEvent = function(objEvent) {
	var objMEPlayer = MEPlayer;
	$('#gadgetsButn .play').removeClass('playing').addClass('replay');
	$('.footer-holder .progress').css('width', '100%');
	self.audioEnd();
};

AudioPlayer.prototype.handlePauseEvent = function(objEvent) {
	var objMEPlayer = MEPlayer;
	// console.log('[AP] pause listener ' + e.currentTime);
	// console.log('[AP] pause listener paused: ' + e.paused);
	// console.log('[AP] pause listener ended : ' + e.ended);
	if (objEvent.ended && objEvent.currentTime == 0) {
		// console.log('[AP] pause listener ended : ' + objEvent.ended);
		$('#gadgetsButn .play').removeClass('playing').addClass('replay');
		$('.footer-holder .progress').css('width', '100%');
	}
};

AudioPlayer.prototype.addEventListeners = function(objMEPlayer) {
	objMEPlayer.addEventListener('canplay', self.handleCanPlayEvent, false);
	objMEPlayer.addEventListener('progress', self.handleProgressEvent, false);
	objMEPlayer.addEventListener('timeupdate', self.handleTimeupdateEvent, false);
	objMEPlayer.addEventListener('playing', self.handlePlayingEvent, false);
	objMEPlayer.addEventListener('ended', self.handleEndedEvent, false);
	objMEPlayer.addEventListener('pause', self.handlePauseEvent, false);
};

AudioPlayer.prototype.removeEventListeners = function(objMEPlayer) {
	objMEPlayer.removeEventListener('canplay', self.handleCanPlayEvent);
	objMEPlayer.removeEventListener('progress', self.handleProgressEvent);
	objMEPlayer.removeEventListener('timeupdate', self.handleTimeupdateEvent);
	objMEPlayer.removeEventListener('playing', self.handlePlayingEvent);
	objMEPlayer.removeEventListener('ended', self.handleEndedEvent);
	objMEPlayer.removeEventListener('pause', self.handlePauseEvent);

};

AudioPlayer.prototype.StartAnimation = function() {
	 
	controller.pgRedraw();
	if (!isAudio) {
		self.destroyAudio();
		controller.hideAudioControls();
		controller.hidePreloader();
		controller.gadgetsBtnEnable();
		//
		audioLoadFirstTime = true;
		playAnimInit();
		playAnimation("main");
		//$(".video-rt-text-scroll").mCustomScrollbar();
		//
		allAssestsLoaded = true;
		$('#gadgetsButn .play').addClass('playing');
		setTimeout(function(){ audioFinish(); }, 500);
		
		return;
	}
	if (isAudio) {
		//MEPlayer.stop();
		MEPlayer.play();
		/*if(model.audioName=="mute.mp3"){
			MEPlayer.stop();
			//$("#preloaderSpinner").fadeOut("slow");
		}else{
			MEPlayer.play();
		}*/
	}
	allAssestsLoaded = true;
	controller.hideAudioControls();

	$('#gadgetsButn .play').removeClass('playing').addClass('replay');
	$('.footer-holder .progress').css('width', '100%');
};

AudioPlayer.prototype.StartNavAnimation = function() {
	if (!isAudio) {
		self.destroyAudio();
		controller.hidePreloader();
		return;
	}
	allAssestsLoaded = true;
	if (isAudio) {
		MEPlayer.play();
	}
	$('#gadgetsButn .play').removeClass('playing').addClass('replay');
};

var isCJSAnimLoaded = false;
var isSoundLoaded = false;

function cjsAnimLoadedHandler(isCJS) {
	//-- Can be used if CreateJS animations are present in page
	if (isCJS) {
		isCJSAnimLoaded = true;
	}
	// console.log('[AP] isCJSAnimLoaded: ' + isCJSAnimLoaded + ' :&& isSoundLoaded: ' + isSoundLoaded);
	if (isCJSAnimLoaded && isSoundLoaded) {
	}
}

AudioPlayer.prototype.pauseAudio = function() {
	// console.log('[AP] pauseAudio');
	if (isAudio) {
		try {
			MEPlayer.pause();
		} catch (err) {

		}
	}
	playCJSAnimFrom('pause');
	if (tll) {
		tll.pause();
	}
};

/*function injectStyles(rule, id) {
 removeStyle(id);
  var div = $("<div />", {
    html: '<style id="' + id +'">' + rule + '</style>'
  }).appendTo("body");    
}

function removeStyle(id) {
  $('#'+id).remove();
}*/

AudioPlayer.prototype.toggleMuteAudio = function() {
	if(model.videoFlg){
		if($('#video').prop('muted')){
			model.audioMuted=false
			notMuted=false
			$('#video').prop('muted', false); //unmute
			 // injectStyles(`video::-webkit-media-controls-mute-button{pointer-events:none !important},
			 // video::-webkit-media-controls-volume-slider{pointer-events:auto !important},
			 // video::-webkit-media-controls-volume-slider-container{pointer-events:auto !important}
			 // `, 'd');
		}else{
			$('#video').prop('muted', true); //mute
			model.audioMuted=true
			notMuted=true
			//injectStyles(`video::-webkit-media-controls-mute-button{pointer-events:none !important},
			 //video::-webkit-media-controls-volume-slider{pointer-events:none !important},
			 //video::-webkit-media-controls-volume-slider-container{pointer-events:none !important}`, 'd');
		}
	}else{
		if(model.AudioPresent){
			notMuted = MEPlayer.muted;
			// console.log('[AP] toggleMuteAudio notMuted: ' + notMuted);
			if (notMuted) {
				$(".audioTxt2").css("display", "inline");
				$(".audioTxt1").css("display", "none");
				model.audioMuted=false
				MEPlayer.setMuted(false);
				notMuted = MEPlayer.muted;
			} else {
				$(".audioTxt1").css("display", "inline");
				$(".audioTxt2").css("display", "none");
				model.audioMuted=true
				MEPlayer.setMuted(true);
				notMuted = MEPlayer.muted;
			}
		}
	}
	
	// console.log('[AP] muted: ' + my_jPlayer.data("jPlayer").options.muted);
};

AudioPlayer.prototype.resumeAudio = function() {
	// console.log('[AP] resumeAudio');
	if (isAudio) {
		MEPlayer.play();
	}
	
	playCJSAnimFrom('resume');
	if (tll) {
		tll.resume();
	}
};

AudioPlayer.prototype.audioEnd = function() {
	//console.log('[AP] audioEnd');
	if ( typeof audioFinish != 'undefined' && $.isFunction(audioFinish)) {
		audioFinish();
	}
};

AudioPlayer.prototype.destroyNavAudio = function() {
	// console.log('[AP] destroyNavAudio');
	if (MEPlayer) {
		MEPlayer.pause();
		allAssestsLoaded = false;
		if (MEPlayer.pluginType != 'flash') {
			window.MEPlayer = null;
		} else {
			window.MEPlayer = currMEObj;
		}
	}
};

AudioPlayer.prototype.destroyAudio = function() {
	// console.log('[AP] destroyAudio');
	//$('#gadgetsButn .play').removeClass('replay').removeClass('playing');
	$('.footer-holder .progress').css('width', '0px');
	$('.time .played, .time .duration').html('00:00');
	if (MEPlayer) {
		MEPlayer.pause();
		if (MEPlayer.pluginType != 'flash') {
			window.MEPlayer = null;
		} else {
			window.MEPlayer = currMEObj;
		}
	}
};

AudioPlayer.prototype.audioReset = function() {
	// console.log('[AP] audioReset');
	interActivityPage = false;
	intActivityAudioReset = true;
	showAudioLoading = true;
	audioPlayer.loadAudioPath(model.audioPath + popupAudios[0]);
	controller.assignTranscript(transcript[0]);
	if (device.iOSVersion() >= 8) {
	} else {
		if (MEPlayer) {
			MEPlayer.stop();
		}
	}
	audioInitiallyPause = true;
	initialAudioReset = true;
};

function updateDisplayTime(tt, dd) {
	// console.log("[AP] updateDisplayTime:::" + tt + "::::::::" + dd);
	if (tt > 0) {
		if (!firstTime) {
			firstTime = true;
			if (device.iPhone() || device.iPad()) {
				playAnimInit();
			}
		}
		$('.footer-holder .progress').css({
			width : (100 * tt / dd) + '%'
		});
		if (audioLoadFirstTime && allAssestsLoaded) {
			audioLoadFirstTime = false;
			if (!intActivityAudioReset) {
				if (!navigationTour) {
					playAnimInit();
				}
				if (model.currTopic == (model.tTopics-1) && model.currMod == (model.tModulesArr[model.tTopics-1]-1) && model.currPage == (model.tPagesArr[model.tTopics-1][model.tPagesArr[model.tTopics-1].length-1]-1)) {
				} else {
					//-- Preload Images and Audio for next page. Don't preload next page assets for the last page.
					backgroundLoader.loadNextPageAsssets();
				}
			} else {
				playAnimation("main");
			}
			if (interActivityPage) {
				controller.gadgetsBtnEnable();
				$("#preloaderSpinner_int").css("display", "none");
			} else {
				$("#preloaderSpinner").fadeOut("slow");
				if (!intActivityAudioReset) {
					controller.gadgetsBtnEnable();
				}
				if ($('#gadgetsButn .play').hasClass('replay')) {
					//$('#gadgetsButn .play').removeClass('replay');
					$('#gadgetsButn .play').addClass('playing');
				}
			}
		}
		$('.time .played').html(getTime(tt, true));
		$('.time .duration').html(getTime(dd, true));
		if (device.AndroidPhone()) {
			if (getTime(tt, true) == getTime(dd, true)) {
				$('#gadgetsButn .play').removeClass('playing').addClass('replay');
				$('.footer-holder .progress').css('width', '100%');
				self.audioEnd();
			}
		}
	} else {
		if (device.Firefox()) {
			audioLoaded = true;
		}

		//-- Only for Interactivity pages - audio reset
		if (initialAudioReset) {
			initialAudioReset = false;
			$('#gadgetsButn .play').removeClass('playing').addClass('replay');
			$('.footer-holder .progress').css('width', '100%');
		}
	}
}

this.getDuration = function() {
	if (MEPlayer) {
		return MEPlayer.duration;
	} else {
		return 0;
	}
};

this.getTime = function(nMSec, bAsString) {
	// convert milliseconds to mm:ss, return as object literal or string
	var nSec = Math.floor(nMSec / 1000), min = Math.floor(nSec / 60), sec = nSec - (min * 60);
	// console.log(nMSec + ' :: ' + nSec);
	// if (min === 0 && sec === 0) return null; // return 0:00 as null
	return ( bAsString ? ((min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec)) : {
		'min' : min,
		'sec' : sec
	});
};

this.leftPos = function(elem) {
	var curleft = 0;
	if (elem.offsetParent) {
		do {
			curleft += elem.offsetLeft;
		} while (elem = elem.offsetParent);
	}
	return curleft;
};

function iPadDebug(msg) {
	if ($('.page_title > p').hasClass('debug')) {
		$('.page_title > p').append('<br>' + msg);
	} else {
		$('.page_title').append('<p class="debug" style="color: #FF0000; text-align: left; text-shadow: 1px 1px 2px #000000; max-height: 470px; overflow-y: auto; position: absolute; top: 100px; width: 50%; z-index: 2000">Debug:<br>' + msg + '</p>');
	}
}