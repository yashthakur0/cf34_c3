var backgroundLoader = new Object();
backgroundLoader.isDesktop = false;
/** For image loading **/
backgroundLoader.imageArr = [];
backgroundLoader.totalImageCount = 0;
backgroundLoader.loadedImageCount = 0;
objImage = new Image();
/** For audio loading **/
backgroundLoader.audioArr = [];
backgroundLoader.nextPageAudio = "";
backgroundLoader.nextPageVideo = "";

/** Detect if running on tablet or desktop **/
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) || (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.platform))) {
	backgroundLoader.isDesktop = false;
} else {
	backgroundLoader.isDesktop = true;
}

/** Function that initiates loading of next page assets **/
backgroundLoader.loadNextPageAsssets = function() {
	var subcurrPageImage=model.subcurrPage
	var subcurrInnerPageAudio=model.subInnercurrPage
	var pageNo=model.currPage
	
	if(model.currPage<(model.tPagesArr[model.currTopic][model.currMod]-1)){
		if(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage+1].getAttribute("subpagelevel")=='1'){
			if(subcurrPageImage==-1){
				pageNo=Number(model.currPage)+1
			}
		}
		if(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[pageNo].getAttribute("subpagelevel")=='1'){
			if(subcurrPageImage==(model.subL1PagesArr[model.currTopic][model.currMod][pageNo]-1)){
				nextPageImageLoadingFun()
			}else{
				if(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[pageNo].getElementsByTagName("subpage")[(subcurrPageImage == -1) ? 0 : (subcurrPageImage+1)].getAttribute("subpagelevel")=='2'){
					if(subcurrInnerPageAudio==-1){
						subcurrPageImage=Number(subcurrPageImage)+1
						backgroundLoader.imageArr = String(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[pageNo].getElementsByTagName("subpage")[(subcurrPageImage == -1) ? 0 : subcurrPageImage].getElementsByTagName("innersubpage")[(subcurrInnerPageAudio == -1) ? 0 : subcurrInnerPageAudio].getAttribute("data-en")).split(",");
					}
				}else{
					if(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[pageNo].getElementsByTagName("subpage")[(subcurrPageImage == -1) ? 0 : subcurrPageImage].getAttribute("subpagelevel")=='2'){
						if(subcurrInnerPageAudio==(model.subL2PagesArr[model.currTopic][model.currMod][pageNo][subcurrPageImage]-1)){
							subcurrPageImage=(subcurrPageImage+1)
							subcurrInnerPageAudio=-1
							backgroundLoader.imageArr = String(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[pageNo].getElementsByTagName("subpage")[(subcurrPageImage == -1) ? 0 : subcurrPageImage].getAttribute("data-en")).split(",");
						}else if(subcurrInnerPageAudio!=(model.subL2PagesArr[model.currTopic][model.currMod][pageNo][subcurrPageImage]-1)){
							subcurrInnerPageAudio++
							backgroundLoader.imageArr = String(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[pageNo].getElementsByTagName("subpage")[(subcurrPageImage == -1) ? 0 : subcurrPageImage].getElementsByTagName("innersubpage")[(subcurrInnerPageAudio == -1) ? 0 : subcurrInnerPageAudio].getAttribute("data-en")).split(",");
						}
					}else{
						if(subcurrPageImage!=(model.subL1PagesArr[model.currTopic][model.currMod][pageNo]-1)){
							subcurrPageImage++
							backgroundLoader.imageArr = String(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[pageNo].getElementsByTagName("subpage")[(subcurrPageImage == -1) ? 0 : subcurrPageImage].getAttribute("data-en")).split(",");
						}
					}
					
				}
				
			}
		}else{
			nextPageImageLoadingFun()
		}	
	}else{
		nextPageImageLoadingFun()
	}
	

	//console.log(backgroundLoader.imageArr+" backgroundLoader.imageArr")
	for (var a in backgroundLoader.imageArr) {
		backgroundLoader.imageArr[a] = String(backgroundLoader.imageArr[a]).trim();
		if (backgroundLoader.imageArr[a].indexOf('common/') == -1) {
			backgroundLoader.imageArr[a] = model.moduleName +'' + backgroundLoader.imageArr[a];
		}
	//console.log(model.moduleName + ' : ' + model.langName + ' : ' + a + ' : ' + backgroundLoader.imageArr[a]);
	}

	//backgroundLoader.appendLangImages(model.langName);
	backgroundLoader.appendLangImages("en/");

	backgroundLoader.totalImageCount = backgroundLoader.imageArr.length;
	backgroundLoader.loadedImageCount = 0;
	if (backgroundLoader.totalImageCount > 0 && backgroundLoader.imageArr[0].length > 2) {
		//-- If there are images to be loaded
		backgroundLoader.loadImageInBg();
	} else {
		//-- If there are no images to be loaded, go for audio loading directly
		backgroundLoader.loadNextPageAudio();
	}
	//backgroundLoader.loadNextPageVideo()
};


function nextPageImageLoadingFun(){
	if(model.currPage!=model.tPagesArr[model.currTopic][model.currMod]-1){
		var pageNo=Number(model.currPage)+1
		backgroundLoader.imageArr = String(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[pageNo].getAttribute("data-en")).split(",");
	}else if(model.currMod != (model.tModulesArr[model.currTopic]-1)){
		backgroundLoader.imageArr = String(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage].getAttribute("data-en")).split(",");
	}else if(model.currMod == (model.tModulesArr[model.currTopic]-1)){
		var topicNo=Number(model.currTopic)+1
		backgroundLoader.imageArr = String(model.menuData.getElementsByTagName("topic")[topicNo].getElementsByTagName("module")[0].getElementsByTagName("page")[0].getAttribute("data-en")).split(",");
	}	
}
/** Function to load image **/
backgroundLoader.loadImageInBg = function() {
	var imgConfPath = backgroundLoader.imageArr[backgroundLoader.loadedImageCount];
	var imgConfENPath = "";
	if (imgConfPath.indexOf('lang/') != -1) {
		var plainImgPath = imgConfPath.split('lang/')[1];
		//imgConfPath = model.moduleName + model.langName + plainImgPath;
		imgConfPath = model.moduleName + "en/" + plainImgPath;
		imgConfENPath = model.moduleName + "en/" + plainImgPath;
		 //console.log("[aP]:BLAH ==== " + imgConfPath);
		backgroundLoader.imageArr[backgroundLoader.loadedImageCount] = imgConfPath;
		 //console.log("[aP]:blEh ==== " + imgConfENPath);
		 backgroundLoader.imageArr.push(imgConfENPath);
		backgroundLoader.totalImageCount = backgroundLoader.imageArr.length;
	}
	if (imgConfPath.indexOf('null') != -1) {
		//-- If there is no image to be pre-loaded
		if (backgroundLoader.isDesktop) {
			//-- Only for desktop/laptops do background loading of audio
			backgroundLoader.loadNextPageAudio();
		} else {
			//-- No background loading of audio since the target device is a tablet/mobile
			//alert("no bg audio loading since tablet/mobile");
		}
		return;
	}
	objImage.src = model.imagePath + imgConfPath;
	 //console.log(model.imagePath+" model.imagePath "+ imgConfPath +"[assetPreloader]:Loading :: " + objImage.src);

	objImage.onload = function() {
		// console.log("[assetPreloader]:Loaded==:: " + objImage.src);
		backgroundLoader.imageLoadPost();
	};
	objImage.onerror = function() {
		// console.log("[assetPreloader]:Error   :: " + objImage.src);
		backgroundLoader.imageLoadPost();
	};
};
/** This function is called when an image gets loaded **/
backgroundLoader.imageLoadPost = function() {
	backgroundLoader.loadedImageCount++;
	// console.log(backgroundLoader.loadedImageCount + " == " + backgroundLoader.totalImageCount + " : " + backgroundLoader.imageArr.length);
	if (backgroundLoader.loadedImageCount == backgroundLoader.totalImageCount) {
		//-- All images loaded
		// console.log("[assetPreloader]:All images loaded.");
		if (backgroundLoader.isDesktop) {
			//-- Only for desktop/laptops do background loading of audio
			backgroundLoader.loadNextPageAudio();
		} else {
			//-- No background loading of audio since the target device is a tablet/mobile
			//alert("no bg audio loading since tablet/mobile");
		}
	} else {
		//-- Not all images loaded
		// console.log("[assetPreloader]:Not all images loaded. Loading next image.");
		backgroundLoader.loadImageInBg();
	}
};



/** Function to load next page video **/
backgroundLoader.loadNextPageVideo = function() {
	 var videoFile=""
	/*if (model.currTopic == (model.tTopics-1) && model.currMod == (model.tModulesArr[model.tTopics-1]-1) && model.currPage == (model.tPagesArr[model.tTopics-1][model.tPagesArr[model.tTopics-1].length-1]-1)) {
		
	}else if(model.currTopic != (model.tTopics-1) ){
		if(model.currMod != (model.tModulesArr[model.currTopic]-1)){
			videoFile = String(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage].getAttribute("path")).split(".")[0];
			
		}else if(model.currMod == (model.tModulesArr[model.currTopic]-1)){
			var topicNo=Number(model.currTopic)+1
			videoFile = String(model.menuData.getElementsByTagName("topic")[topicNo].getElementsByTagName("module")[0].getElementsByTagName("page")[0].getAttribute("path")).split(".")[0];
		}	
	}*/
	
	
	
	backgroundLoader.nextPageVideo=model.videoPath + videoFile+".mp4";
	console.log(videoFile+" [assetPreloader]:Loading video now. "+backgroundLoader.nextPageVideo);
		var videoElement = $('#preVideo');
		$('#preVideoSrc').attr("src", backgroundLoader.nextPageVideo);
		videoElement.load();
		videoElement.volume = 0.0;
		videoElement.on('canplaythrough', function() {
			console.log("Loaded......")
			$('#preVideoSrc').attr("src", "");
		});
};

/** Function to load next page audio **/
backgroundLoader.loadNextPageAudio = function() {
	var subcurrPageAudio=model.subcurrPage
	var subcurrInnerPageAudio=model.subInnercurrPage
	var pageNoAudio=model.currPage
	
	if(model.currPage<(model.tPagesArr[model.currTopic][model.currMod]-1)){
		if(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage+1].getAttribute("subpagelevel")=='1'){
			if(subcurrPageAudio==-1){
				pageNoAudio=Number(model.currPage)+1
			}
		}
		if(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[pageNoAudio].getAttribute("subpagelevel")=='1'){
			if(subcurrPageAudio==(model.subL1PagesArr[model.currTopic][model.currMod][pageNoAudio]-1)){
				nextPageAudioLoadingFun()
			}else{
				if(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[pageNoAudio].getElementsByTagName("subpage")[(subcurrPageAudio == -1) ? 0 : (subcurrPageAudio+1)].getAttribute("subpagelevel")=='2'){
					if(subcurrInnerPageAudio==-1){
						subcurrPageAudio=Number(subcurrPageAudio)+1
						backgroundLoader.audioArr = String(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[pageNoAudio].getElementsByTagName("subpage")[(subcurrPageAudio == -1) ? 0 : subcurrPageAudio].getElementsByTagName("innersubpage")[(subcurrInnerPageAudio == -1) ? 0 : subcurrInnerPageAudio].getAttribute("audio")).split(",");
					}
				}else{
					if(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[pageNoAudio].getElementsByTagName("subpage")[(subcurrPageAudio == -1) ? 0 : subcurrPageAudio].getAttribute("subpagelevel")=='2'){
						if(subcurrInnerPageAudio==(model.subL2PagesArr[model.currTopic][model.currMod][pageNoAudio][subcurrPageAudio]-1)){
							subcurrPageAudio=(subcurrPageAudio+1)
							subcurrInnerPageAudio=-1
							backgroundLoader.audioArr = String(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[pageNoAudio].getElementsByTagName("subpage")[(subcurrPageAudio == -1) ? 0 : subcurrPageAudio].getAttribute("audio")).split(",");
						}else if(subcurrInnerPageAudio!=(model.subL2PagesArr[model.currTopic][model.currMod][pageNoAudio][subcurrPageAudio]-1)){
							subcurrInnerPageAudio++
							backgroundLoader.audioArr = String(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[pageNoAudio].getElementsByTagName("subpage")[(subcurrPageAudio == -1) ? 0 : subcurrPageAudio].getElementsByTagName("innersubpage")[(subcurrInnerPageAudio == -1) ? 0 : subcurrInnerPageAudio].getAttribute("audio")).split(",");
						}
					}else{
						if(subcurrPageAudio!=(model.subL1PagesArr[model.currTopic][model.currMod][pageNoAudio]-1)){
							subcurrPageAudio++
							backgroundLoader.audioArr = String(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[pageNoAudio].getElementsByTagName("subpage")[(subcurrPageAudio == -1) ? 0 : subcurrPageAudio].getAttribute("audio")).split(",");
						}
					}
					
				}
				
			}
		}else{
			nextPageAudioLoadingFun()
		}	
	}else{
		nextPageAudioLoadingFun()
	}
	
	
	//console.log(backgroundLoader.audioArr+" backgroundLoader.audioArr")
	
	
	
	if (backgroundLoader.audioArr.length > 0 && backgroundLoader.audioArr[0].length > 2) {
		//-- Next page has audio. Load it.
		/*if (model.currPage == (model.modArr[model.currMod].length - 2)) {
			//-- Setting preload for last page audio, one page before that
			if (model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage + 1].getAttribute("data-audioTime")) {
				backgroundLoader.nextPageAudio = model.commonaudioPath + backgroundLoader.audioArr[0];
			} else {
				backgroundLoader.nextPageAudio = model.audioPath + backgroundLoader.audioArr[0];
			}
		} else {
			backgroundLoader.nextPageAudio = model.audioPath + backgroundLoader.audioArr[0];
		}*/
		backgroundLoader.nextPageAudio = model.audioPath + backgroundLoader.audioArr[0];
		// console.log("[assetPreloader]:Loading....   :: " + backgroundLoader.nextPageAudio);
		if ($('#bg_audio').attr('id') == undefined) {
			$("#bgAudioHolder").append('<audio id="bg_audio" controls><source id="mp3_src" src="assets/audio/common/en/mute.mp3" type="audio/mp3">Your browser does not support the audio element.</audio>');
		}
		var audioElement = $('#bg_audio');
		audioElement.attr("src", backgroundLoader.nextPageAudio);
		$("#tracer").html(backgroundLoader.nextPageAudio);
		audioElement.load();

		audioElement.volume = 0.0;

		setTimeout(function() {
			//$('#bg_audio')[0].play();
			$('#bg_audio')[0].muted = true;
			$('#bg_audio')[0].pause();
		}, 2000);

	} else {
		//-- Next page does not have audio.
		// console.log("[assetPreloader]:No audio to load.");
		//backgroundLoader.loadMute();
	}
};

function nextPageAudioLoadingFun(){
	if(model.currPage!=model.tPagesArr[model.currTopic][model.currMod]-1){
		var pageNo=Number(model.currPage)+1
		backgroundLoader.audioArr = String(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[pageNo].getAttribute("audio")).split(",");
	}else if(model.currMod != (model.tModulesArr[model.currTopic]-1)){
		backgroundLoader.audioArr = String(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage].getAttribute("audio")).split(",");
	}else if(model.currMod == (model.tModulesArr[model.currTopic]-1)){
		var topicNo=Number(model.currTopic)+1
		backgroundLoader.audioArr = String(model.menuData.getElementsByTagName("topic")[topicNo].getElementsByTagName("module")[0].getElementsByTagName("page")[0].getAttribute("audio")).split(",");
	}	
}


/** Function to load mute.mp3 **/
/** This is implemented to give priority to the page user wants to view. In this case bg loading is stopped by loading mute.mp3  in audio control **/
backgroundLoader.loadMute = function() {
	if (backgroundLoader.isDesktop) {
		//-- Only for desktop/laptops
		var audioElement = $('#bg_audio');
		audioElement.attr("src", model.commonaudioPath + "mute.mp3");
		$("#tracer").html("mute.mp3");
		audioElement.load();
	}
};

backgroundLoader.appendLangImages = function(par_lang) {
	par_lang = par_lang.slice(0, -1);
	// console.log('appendLangImages ::::' + par_lang);
	if (par_lang == 'en') {
		return;
	}
	var langArr = String(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage + 1].getAttribute("data-" + par_lang)).split(",");
	if (langArr != "null") {
		for (var a in langArr) {
			langArr[a] = String(langArr[a]).trim();
			if (langArr[a] != "") {
				backgroundLoader.imageArr.push(model.moduleName + 'en/' + langArr[a]);
				// console.log(model.moduleName + ' : ' + model.langName + ' : ' + a + ' : ' + langArr[a]);
			}
		}
	}
};
