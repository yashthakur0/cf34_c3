var createActivity = false;
var pageLoad = false;
var StartPage = true;
var ExternalData;
var currentExtDataPath;
var ExternalDataLoad = false;
var PreAssests = "";
var interActivityPage = false;
var transcript = [];
var titlesArr = [];
var ModPagetitlesArr = [];
var mobTitlesArr = [];
var canvas = false;
var totalScripts;
var preMenu = "";
preMenuID = "";
var loadedAssestsCnt = 0;
var assestCnt = 0;
var modCompleted = false;
var nxtBakDisable = false;
var moduleTitle = false;
var pageTitle = false;
var modTitleTimer;
var pageTitleTimer;
var pageTitleTxt;
var moduleTitleTxt;
var titleDuration = 1000;
var FFData;
var FFDataArr = [];
var FFRandomArr = [];
var videoBack = false;
var FFDataCnt = 0;
var FFVideo;
var resourceTitlesArr = [];
var resourceIconArr = [];
var resourceDataArr = [];
var pageLoadingAnim = false;
var UITxtData;
var audTiming = [];
var txtLen = 500;
var txtTotalLength = 500;
var directionSide = "right";
var tmpTxtLen = 500;
var ruscousreText;
var ruspageText;
var rusTxtlen = 20;
var device_orientation;
var percetageFirstTimeCall=0

// var langCodesArr = ['lang-en', 'lang-uk', 'lang-cn', 'lang-es', 'lang-ko', 'lang-ru', 'lang-ar', 'lang-tw', 'lang-hi', 'lang-tl', 'lang-ms', 'lang-fr', 'lang-pt'];

var Controller = function() {
	this.buttonState = {
		"next" : true,
		"back" : true,
		"menu" : true,
		"glossary" : true,
		"resources" : true,
		"exit" : true
	};

	/*****buttons****/
	
	nextBtn = this.assignControls($("#shell_next"));
	backBtn = this.assignControls($("#shell_back"));
	gadgetsBtn = this.assignControls($("#gadgetsButn"));
	modTitleBtn = this.assignHOver($("#modTitle"));
	pageTitleBtn = this.assignHOver($("#shell_mod_title_bar"));
	//-- Fun Fact updates
	/*if (isFunFacts) {
		funFactsBtn = this.assignControls($("#funFactBtn"));
		funFactMBtn = this.assignControls($("#FFMBtn"));
		BackBtn = this.assignControls($("#FFBackBtn"));
	}*/
	//-- END: Fun Fact updates
	replay_btn = this.assignControls($("#replay_btn"));
	glossaryBtn = this.assignControls($("#glossarybtn"));
	closeglossPopup= this.assignControls($("#closeglossPopup"));
	closeResouPopup= this.assignControls($("#closeResouPopup"));
	Resourcebtn = this.assignControls($("#Resourcesbtn"));
	helpBtn = this.assignControls($("#helpbtn"));
	noteBtn = this.assignControls($("#shell_note"));
	muteBtn = this.assignControls($("#shell_mute"));
	moreBtn = this.assignControls($("#shell_more"));
	audioBtn = this.assignControls($("#audio_Icon"));
	ReplayBtn = this.assignControls($("#replay_Icon"));
	transcriptBtn = this.assignControls($("#shell_transcript"));
	glossaryBtn_phone = this.assignControls($("#shell_glossary_phone"));
	resourcesBtn_phone = this.assignControls($("#Resourcesbtn_phone"));
	helpBtn_phone = this.assignControls($("#helpbtn_phone"));
	noteBtn_phone = this.assignControls($("#shell_note_phone"));
	transcript_phone = this.assignControls($("#shell_transcript_phone"));
	menuBtn = this.assignControls($("#menubtn"));
	menuBtn_pop = this.assignControls($("#shell_hot_menu_pop"));
	exitBtn = this.assignControls($("#shell_exit"));
	powerExitBtn = this.assignControls($("#power_exit"));
	mobExitBtn = this.assignControls($("#Mob_shell_exit"));
	yesBtn = this.assignControls($("#shell_yes_btn"));
	noBtn = this.assignControls($("#shell_no_btn"));
	closeHelpPopupBtn = this.assignControls($("#closeHelpPopup"));
	closeMenuPopup = this.assignControls($("#closeMenuPopup"));
	closeGlossaryPopup = this.assignControls($("#closeGlossaryPopup"));
	HomeBtn = this.assignControls($("#HomeBtn"));
	/*****buttons popup****/
	glossaryPop = this.assignControls($("#shell_g_ppopup"));
	resourcesPop = this.assignControls($("#shell_r_ppopup"));
	helpPop = this.assignControls($("#shell_h_ppopup"));
	notePop = this.assignControls($("#shell_n_ppopup"));
	popup_disable_bg = this.assignControls($("#shell_popup_bg"));
	menupop = this.assignControls($("#shell_menu_pop"));
	exitPop = this.assignControls($("#shell_e_ppopup"));
	/*****popup close button****/
	popG_Close = this.assignControls($("#shell_g_close"));
	popR_Close = this.assignControls($("#shell_r_close"));
	popH_Close = this.assignControls($("#shell_h_close"));
	popN_Close = this.assignControls($("#shell_n_close"));
	popE_Close = this.assignControls($("#shell_e_close"));
	popM_Close = this.assignControls($("#shell_m_close"));
	pageContiner = $("#shell_pageLoader");
	menuCourseTitle = $("#shell_mod_title_bar");
	$('#shell_n_popup_content').on('input paste focus', this.saveNoteData);
	audioControls = $("#shell_audio_pd");
	videoObject = null;
	VideoControls = null;
	defaultVideo = null;
	videoPauseState = false;
	videoObject_JQ = null;
	isDisableTranscript = false;
	this.menuUpdateBy = "system";
	//used when menu needs to updated, when user press next back and menu is open;
	if (!device.Android() && !device.iPhone() && !device.iPad()) {
		$(".shell_exit").show();
		$(".shell_exit_icon").show();
	} else {
		$(".shell_exit").hide();
		$(".shell_exit_icon").hide();
	}

	function gcd(a, b) {
		return (b == 0) ? a : gcd(b, a % b);
	}

	var w = screen.width;
	var h = screen.height;
	var r = gcd(w, h);
	var aspectratio = w / r + "/" + h / r;

	//===============
	model = new Model();
	model.addCustomEvent("updateView", this.updateViewNow);
	menu = new Menu(model.menuData);
	//menu.addCustomEvent("menuReady", this.updateModel);
	// model.init();
	this.getLocalStorage();
	if (model.langName == "ru/") {
		txtTotalLength = 47;
		tmpTxtLen = 31;

	}
	$("#MenuOverlayClose").off().on("click", function(){
		menuCommonCloseFun()
	})
	//percetageCircleCalculation()
	$("#summaryBtn, #summarypageBtn").off().on("click", function(){
		model.subPageFlg=false
		model.subPageInnerFlg=false
		model.subcurrPage=-1
		model.subInnercurrPage=-1
		model.currTopic=(model.tTopics-1)
		model.currMod=model.tPagesArr[model.currTopic].length-1;
		//$("#dd_menu_btn").text(model.TopicTitleArr[model.currTopic]);
		controller.manageTopic(model.currTopic, model.currMod, 1, -1, -1)
		$("#customMenu").css('display', 'none');
		$(".customMenuWrapperImage").css('display', 'none');
		nextBtn.addClass("deactive").addClass("disabled").css("pointer-events", "none")
	})
};


Controller.prototype.PageContentVisiblityFun = function() {
	if(model.pageLoaded){
		$(".breadcrumbs").css("display", "block")
		$("#tpcTitle").attr("style", "display: none !important");
		if(model.subPageInnerFlg){
			$("#moduleTitle").attr("style", "display: inline-block !important");
			$("#moduleTitle").html(model.PageTitleArr[model.currTopic][model.currMod][model.currPage])
			$("#pagTitle").html(model.SubPageTitleLevel1Arr[model.currTopic][model.currMod][model.currPage][model.subcurrPage])
		}else if(model.subPageFlg){
			$("#moduleTitle").attr("style", "display: none !important");
			$("#pagTitle").html(model.PageTitleArr[model.currTopic][model.currMod][model.currPage])
		}else{
			$(".breadcrumbs").css("display", "none")
		}
		//$("#tpcTitle").html(model.TopicTitleArr[model.currTopic])
		//$("#moduleTitle").html(model.ModuleTitleArr[model.currTopic][model.currMod])
		//if($('#pagTitle').length){
			//$("#pagTitle").html(model.PageTitleArr[model.currTopic][model.currMod][model.currPage])
		//}
		//if($('#subTitle').length){
			//$("#subTitle").html(model.SubPageTitleLevel1Arr[model.currTopic][model.currMod][model.currPage][model.subcurrPage])
		//}
		model.pageLoaded=false
	}
	$(".content_scrol_box").mCustomScrollbar();
	$(".content_scrol_box").mCustomScrollbar("update");
	$(".content_scrol_box").scrollTop(0);
	if(!model.ContentVisibleFlg){
		$("#txt_open_close").removeClass("txt_open")
		 setTimeout(function(){ $("#txt_open_close").addClass("txt_close"); }, 1000);
		 $("#cbtCia").removeClass("ciaOpen")
		$(".pageWrapper").removeClass("content_hide").addClass("content_show")
	}else{
		$("#txt_open_close").removeClass("txt_close").addClass("txt_open")
		$(".pageWrapper").removeClass("content_show").addClass("content_hide")
		$("#cbtCia").addClass("ciaOpen")
	}
}

// Glossary word links from page level ------

Controller.prototype.Glossarypopuptooltip = function() {
    $(".tooltip-pin").off("click").on("click", function() {
        var classNames = this.className.split(" ")[1]
		var classNamesNum = this.className.split(" ")[2]
		var wordNo=""
        if ((classNames == "") || (classNames == undefined) || (classNames == "undefined")) {
            var alphabetLetter = $(this).text()[0]
            var wordToUse = $(this).text().toLowerCase()
        } else {
            var alphabetLetter = classNames[0]
            var wordToUse = classNames.toLowerCase()
			wordNo=classNamesNum
        }
        var alphabetPos = alphabetPosition(alphabetLetter) - 1
        var glossaryWordLength = Glossary.data.getElementsByTagName("alphabet")[alphabetPos].getElementsByTagName("word").length

        for (var i = 0; i < glossaryWordLength; i++) {
            var wordToCompare = Glossary.data.getElementsByTagName("alphabet")[alphabetPos].getElementsByTagName("word")[i].childNodes[0].nodeValue.toLowerCase()
            //console.log(String(wordToUse)+" === "+String(wordToCompare) +" wordNo "+wordNo )
            if ((String(wordToUse) === String(wordToCompare)) ||((wordNo == i)&&(wordNo!=""))) {
                var glossaryBtn = $("#glossarybtn")
                if (!glossaryBtn.hasClass("active")) {
                  //  console.log(String(wordToUse) + " === " + String(wordToCompare))
                    $('#shell_alph_' + alphabetPos).trigger("click", Glossary.generateWords)
                    $('#shell_alph_' + alphabetPos).addClass("shell_g_letterSelected");
                    $(".shell_g_name").removeClass("shell_g_wordSelected");
                   // $("#shell_word_" + alphabetPos + "_0").removeClass("shell_g_wordSelected");
                    $("#shell_word_" + alphabetPos + "_" + i).addClass("shell_g_wordSelected");
                    var description = Glossary.data.getElementsByTagName("alphabet")[alphabetPos].getElementsByTagName("description")[i].childNodes[0].nodeValue;
                    var currentWord = Glossary.data.getElementsByTagName("alphabet")[alphabetPos].getElementsByTagName("word")[i].childNodes[0].nodeValue;
                    $('#shell_GlossaryDescription').html("<b>" + currentWord + "</b>" + "<br/>" + description);
                    glossaryBtn.trigger("click", this.fnClick);
                    $("#shell_GlossaryWords").mCustomScrollbar("destroy");
                    $("#shell_GlossaryWords").mCustomScrollbar();
                    $("#shell_GlossaryWords").mCustomScrollbar("update");
                    $("#shell_GlossaryWords").mCustomScrollbar("scrollTo", ".shell_g_wordSelected")
                }
            }
        }
    })
	
    function alphabetPosition(text) {
        var result = "";
        for (var i = 0; i < text.length; i++) {
            var code = text.toUpperCase().charCodeAt(i)
            if (code > 64 && code < 91) result += (code - 64) + " ";
        }
        return result.slice(0, result.length - 1);
    }

}

Controller.prototype.setLangImagePath = function() {
	controller.Glossarypopuptooltip()
	if (model.langName == "en/") {
		//-- Use original path for en
		return;
	}
	$('.pageWrapper img[class*="lang-"]').each(function(index) {
		var langNm = model.langName.slice(0, -1);
		// console.log('[Controller]setLangImagePath: hasClass >>>>> lang-' + langNm + ' ??? ' + $(this).hasClass('lang-' + langNm));
		if (!$(this).hasClass('lang-' + langNm)) {
			//-- The required lang-xx Class is not found in the image
			return;
		}
		// console.log('[Controller]setLangImagePath: orig : ' + $(this).attr('src'));
		if ($(this).attr('src').indexOf('_' + langNm + '.') != -1) {
			//-- Already replaced
			return;
		}
		var tmpath = $(this).attr('src').split('.');
		if (tmpath[1] != undefined) {
			//-- Suffix lang code to image name
			$(this).attr('src', tmpath[0] + '_' + langNm + '.' + tmpath[1]);
			// console.log('[Controller]setLangImagePath: lang : ' + $(this).attr('src'));
		}
	});
};
Controller.prototype.assignControls = function(_btn) {
	// console.log('[Controller] assignControls _btn: ' + _btn.attr('id'));

	_btn.on("click", this.fnClick);
	return _btn;
};
Controller.prototype.assignHOver = function(_btn) {
	if (device.iPhone() || device.Android() || device.iPad()) {
		_btn.on("touchstart", this.fnMouseOver);
	} else {
		_btn.on("mouseover", this.fnMouseOver);
		_btn.on("mouseout", this.fnMouseOut);
	}
	return _btn;
};
Controller.prototype.saveNoteData = function() {
	var noteText = $('#shell_n_popup_content').val();
	if (noteText.indexOf("Type your notes here.") != -1) {
		$('#shell_n_popup_content').html("");
		noteText = "";
	}
	localStorage.setItem('notes', noteText);
};
Controller.prototype.getLocalStorage = function() {
	if (model.supports_html5_storage()) {
		if (localStorage.getItem('notes') == null || localStorage.getItem('notes') == "") {
			return;
		}

		$('#shell_n_popup_content').text(localStorage.getItem('notes'));
	}
};
Controller.prototype.setVideoObject = function(_vidObj, _vidObj_JQ) {
	videoObject = _vidObj;
	videoObject_JQ = _vidObj_JQ;
};
Controller.prototype.hideAudio = function() {
	if (device.Android()) {
		$("#audioAndroid").hide();
	} else {
		if (device.iPhone()) {
			$("#shell_audio_pd").hide();
		} else if (device.Firefox()) {
			$(".shell_audio_controls").css("z-index", -999);
		} else {
			$(".shell_audio_controls").hide();
		}
	}
};

Controller.prototype.VideoFileInitFun=function(){
	vid=$('#video')
	vid.attr('disablePictureInPicture', 'true')
	$("#audio_Icon").removeClass("deactive").removeClass("disabled").css("cursor", "pointer").css("opacity", "1").css("pointer-events", "auto");
	if(model.audioMuted){
		vid.prop('muted', true);
	}else{
		vid.prop('muted', false); 
	}
}

Controller.prototype.VideoMuteTrackingFun=function(){
	vid=$('#video')
	if(model.audioMuted){
		vid.prop('muted', true);
		model.audioMuted=true
			notMuted=true
	}else{
		model.audioMuted=false
			notMuted=false
		vid.prop('muted', false); 
	}
}

Controller.prototype.updateViewNow = function() {
	//for checking purpose
	//model.visitedArr=[[2, 2, 2],[2, 2, 2],[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],[2, 2, 2, 2, 2, 2, 2, 2, 2, 2],[2, 2]]
	model.videoFlg=false
	model.menuOpenFlg=false
	$("#shell_assessNext").css("display", "none")
	$(".Footer").css("display", "block") 
	$("#customMenu").css("display", "none");
	$("#shell_mod_0_pages").css("display", "block");
	$( "#imoduletextGlobal" ).css("display", "none");
	$( "#itextGlobal, #itextGlobal2" ).css("display", "none");
	$( "#exitItextGlobal" ).css("display", "none");	
	$(".pageWrapper").mCustomScrollbar()
	$(".scrubber").css("pointer-events", "auto").css('display', 'block').css('cursor', 'pointer')
	$("#shell_transcript, #replay_Icon").removeClass("deactive").removeClass("disabled").css("cursor", "pointer").css("opacity", "1").css("pointer-events", "auto");;
	if(model.AudioPresent){
		$("#audio_Icon").addClass("deactive").addClass("disabled").css("cursor", "none").css("opacity", "0.5").css("pointer-events", "none");
	}else{
		$("#audio_Icon").removeClass("deactive").removeClass("disabled").css("cursor", "pointer").css("opacity", "1").css("pointer-events", "auto");
	}
	
	MenuOpenCloseFun();
	$("#menuDropDown a").removeClass("selected")
	$("#topMenu_"+model.currTopic).addClass("selected")	
	$("#menubtn").removeClass("active")
	$(".menuovrlay").css("display", "none");
	//backgroundLoader.loadMute();
	controller.morButtonResetFun();
	//$("#preloaderSpinner").show();
	$("#itextGlobal").removeClass("itext_anim")
	$(".progressWheel").css("cursor", "default").css("pointer-events", "none")
	audioPlayer.destroyAudio();
	$(".NavTour").css("display", "none");
	
	//$(".icon-pdf a").attr("href","assets/docs/"+model.moduleName+"/"+model.langName+"/program_recap_document.pdf");
	$("#preloaderSpinner").css("display", "block");
	if((model.currTopic == (model.tTopics-1)) && (model.currMod== model.tModulesArr[model.tTopics-1]-1)&&(model.currPage==1)){
		$(".summaryBtn").css("cursor", "default").css("pointer-events", "none")
	}else{
		$(".summaryBtn").css("cursor", "pointer").css("pointer-events", "auto")
	}
	model.assesmentPage=false
	nxtBakDisable = false;
	controller.gadgetsBtnDisable();
	pageLoad = false;
	pageLoadingAnim = false;
	interActivityPage = false;
	intActivityAudioReset = false;
	showAudioLoading = true;
	if (createActivity) {
		clearCanvas();
	}
	if (model.currPage != 0) {
		$('.click_next_Continue').hide();
	}
	
	if (canvas) {
		for (var i = 1; i <= 5; i++) {
			canvas = false;
			//canvObjArry[i].clearRect(0, 0, 1000, 700);
			$("#myCanvas" + i).remove();
		}
	}

	if ($("#transText").hasClass("mCustomScrollbar")) {
		$('#transText').mCustomScrollbar("destroy");
	}
	//scrubberBool=true;
	markerArr = new Array;
	if (device.Android()) {
		$("#audioAndroid").show();
	} else {
		if (device.iPhone()) {
			$("#shell_audio_pd").show();
		} else if (device.Firefox()) {
			$(".shell_audio_controls").css("z-index", 1);
		} else {
			$(".shell_audio_controls").show();
		}
	}
	transcriptBtn.css("opacity", "1");
	transcriptBtn.removeClass(transcriptBtn.attr("class"));
	isDisableTranscript = false;
	showBuffer(true);

	videoObject = null;
	orientationChange = undefined;
	//function defined in pages if page needed orientationChange event
	//====================Course title in menu==================
	//______________________________for em dash isssue__________________________
	//var tempText = model.menuData.getElementsByTagName("page")[model.currPage].getAttribute("title");
	//var tempText = titlesArr[model.currPage];
	//var tempText = model.modArr[model.currMod][model.currPage].titles;
	var tempText = "<span>"+model.TopicTitleArr[model.currTopic]+"</span> <span>"+model.ModuleTitleArr[model.currTopic][model.currMod]+"</span>";
	if (device.MobileDevice()) {
		if (mobTitlesArr[model.currPage] != "") {
			var tempText = mobTitlesArr[model.currPage];
		}
	}
	var titleText = tempText.replace("@emdash", "<span class='emdash'>&mdash;</span>");
	titleText = titleText.replace("@endash", "<span class='endash'>&ndash;</span>");
	//menuCourseTitle.text(model.menuData.getElementsByTagName("page")[model.currPage].getAttribute("title"));
	$(".CourseTitle-TT").css("display", "none");
	$(".PageTitle-TT").css("display", "none");
	$(".PageTitle-TT").html(titleText.trim());
	//pageTitleTxt = titleText;
	pageTitleTxt = "<span>"+model.TopicTitleArr[model.currTopic]+"</span> <span>"+model.ModuleTitleArr[model.currTopic][model.currMod]+"</span>";
	var totalTextLen = Number($(".course_title").text().length) + Number(titleText.length);
	// console.log(totalTextLen + "::titleText.length::" + titleText.length);
	if (device.MobileDevice()) {
		if (window.orientation == 90) {

			if (titleText.length > tmpTxtLen) {
				pageTitle = true;
				var titleTextLen = titleText.split(" ");
				titleText = addtitle(titleTextLen);
			} else {
				pageTitle = false;

			}
		}
	} else {

		if (totalTextLen > txtTotalLength) {
			pageTitle = true;
			var titleTextLen = titleText.split(" ");
			titleText = addtitle(titleTextLen);

		} else {

			pageTitle = false;
		}
	}
	
	 try {
        var videoEle = $('#video');
        if (videoEle != null) {
            //videoEle.pause();
            //videoEle.removeAttribute('src');
			videoEle.stop();
			videoEle.attr('src', '')
			//console.log("Old video removed")
			videoEle.remove()
        }
    } catch (err) {

    }

	menuCourseTitle.html(titleText.trim());
	//function defined in pages if page needed orientationChange event
	//====================Course title in menu==================
	//menuCourseTitle.text(model.menuData.getElementsByTagName("page")[model.currPage].getAttribute("title"));
	//$("#shell_mod_title_bar").text(model.menuData.getElementsByTagName("structure")[0].getElementsByTagName("module")[model.currMod].getAttribute("title"));
	//====================Page Load=============================
	pageContiner.find("div").remove();
	pageContiner.html("");
	$('.footer-holder .scrubber').unbind("RESET_SLIDER");
	
	var FileToLoad
	var pageNoToDisplay
	if(model.subPageInnerFlg){
		FileToLoad=model.modArr[model.currTopic][model.currMod][model.currPage][model.subcurrPage][model.subInnercurrPage].path
		//updateMenuSlides(model.currTopic, model.currMod, model.currPage, model.subcurrPage)
		pageNoToDisplay=model.modArr[model.currTopic][model.currMod][model.currPage][model.subcurrPage][model.subInnercurrPage].pageNo
	}else if(model.subPageFlg){
		FileToLoad=model.modArr[model.currTopic][model.currMod][model.currPage][model.subcurrPage].path
		//updateMenuSlides(model.currTopic, model.currMod, model.currPage,  "")
		pageNoToDisplay=model.modArr[model.currTopic][model.currMod][model.currPage][model.subcurrPage].pageNo
	}else{
		FileToLoad=model.modArr[model.currTopic][model.currMod][model.currPage].path
		//updateMenuSlides(model.currTopic, model.currMod, "",  "")
		pageNoToDisplay=model.modArr[model.currTopic][model.currMod][model.currPage].pageNo
	}
	pageContiner.load(model.pagePath + FileToLoad, function() {
		swipeHeaderFooter();
		$('.courseTitle').css('border', '0px solid white');
		if (model.langName == "ar/") {
			$(".pageWrapper").addClass("RTL");
			directionSide = "right";
		}
	});
	model.pageLoaded=true
	//=============================================================
	menu.updateMenu(model.currTopic, model.currMod, model.currPage,model.subcurrPage,model.subInnercurrPage, model.visitedArr);
	controller.setPageVisitedInitial();
	controller.pageVisitedCalcFun()
	controller.courcePercentageCalculator()
	if(percetageFirstTimeCall==0){
		percetageFirstTimeCall=1
		percetageCircleCalculation()
	}
	//============Displaying current page of total page====
	var tempTotalPage = 0;
	var tempCurrPage = 0;
	
	tempCurrPage=pageNoToDisplay
	tempTotalPage = model.totalPages+1
	tempCurrPage = tempCurrPage > 9 ? tempCurrPage : ('0' + tempCurrPage);
	tempTotalPage = tempTotalPage > 9 ? tempTotalPage : ('0' + tempTotalPage);
	// $("#shell_menu").text("Page " + tempCurrPage + "/" + tempTotalPage);
	if ($("body").hasClass("RTL")) {
		$(".page-no").text((tempTotalPage) + "/" + (tempCurrPage));
	} else {
		$(".page-no").text((tempCurrPage) + "/" + (tempTotalPage));
	}
	//=====================================================
	var tempTotalPage = 0;
	var tempCourseFinish = 0;
	// for (var i = 0; i < model.modArr.length; i++) {
	// tempTotalPage += model.modArr[i].length;
	// tempCourseFinish += model.visitedArr[i];
	// }
	for (var i = 0; i < model.visitedArr.length; i++) {
		tempTotalPage += model.visitedArr[i].length;
		for (var j = 0; j < model.visitedArr[i].length; j++) {
			if (model.visitedArr[i][j] == 2 || model.visitedArr[i][j] == '2') {
				tempCourseFinish++;
			}
		}
	}
	
	
	var tempPercentage = Math.round((tempCourseFinish / tempTotalPage) * 100);
	if (tempPercentage == 100) {
		modCompleted = true;
		model.allPageVisited = true;
		//callInitialAudio();
	}
	
	$("#shell_progressBar_lineTwo").css("width", tempPercentage + "%");
	$("#shell_progressBar_text").text(tempPercentage + "% course completed");
	//====================Enable disable next back button=========
	//if (((model.currTopic == 0) && (model.currPage == 0) && (model.currMod == 0) && (!model.subPageInnerFlg)&&(!model.subPageFlg))||((model.currTopic == 0) && (model.currPage == 0) && (model.currMod == 0) && (model.subcurrPage==0)&&(model.subInnercurrPage==0))) {
	if ((model.currTopic == 0) && (model.currPage == 0) && (model.currMod == 0)){
		if(((model.subInnercurrPage==-1)||(model.subInnercurrPage==0))&&((model.subcurrPage==-1)||(model.subcurrPage==0))){
			backBtn.addClass("deactive").addClass("disabled").css("pointer-events", "none");;
		}else{
			backBtn.removeClass("deactive").removeClass('disabled').css("pointer-events", "auto");
		}
		
	} else {
		backBtn.removeClass("deactive").removeClass('disabled').css("pointer-events", "auto");
	}
	
	//To Hide Page No in posttest pages
	if (model.currMod==(model.tModulesArr[model.currTopic]-1)) {
		$(".page_count").css("display", "none")
	}else{
		$(".page_count").css("display", "block")
	}
	
	/**Next button***/
	if (model.currTopic == (model.tTopics-1) && model.currMod == (model.tModulesArr[model.tTopics-1]-1) && model.currPage == (model.tPagesArr[model.tTopics-1][model.tPagesArr[model.tTopics-1].length-1]-1)) {
		nextBtn.addClass("deactive").addClass('disabled').css("pointer-events", "none").removeClass('blink');
	} else if ((model.visitedArr[model.currTopic][model.currMod][model.currPage] == 0 || model.visitedArr[model.currTopic][model.currMod][model.currPage] == 1)&& model.learningType == "linear") {
		nextBtn.addClass("deactive").addClass('disabled').css("pointer-events", "none").removeClass('blink');
	} else {
		nextBtn.removeClass("deactive").removeClass('disabled').css("pointer-events", "auto").removeClass('blink');
		// console.log('[Controller] updateViewNow ================ C enabled');
	}

	//======================================================
	//Bookmark_location = model.currPage + "||" + model.currMod + "||" + model.visitedArr;
	if (isSCORM) {
		// console.log("[Controller] bookmark: " + Bookmark_location);
		//model.scormHandler.getValue();
	}
	if (device.iPad()) {
		$(window).on("orientationchange", function(event) {
			$(".transcript").css("top", "300px");
			$(".transcript").css("left", "50px");
		});
	}
	function gcd(a, b) {
		return (b == 0) ? a : gcd(b, a % b);
	}

	var w = screen.width;
	var h = screen.height;
	var r = gcd(w, h);
	var aspectratio = w / r + "/" + h / r;

	if (w == 1366 && h == 768 && aspectratio == "683/384") {
		$(window).on("orientationchange", function(event) {
			$(".transcript").css("top", "300px");
			$(".transcript").css("left", "50px");
		});

	}

	if (w == 768 && h == 1366 && aspectratio == "384/683") {
		$(window).on("orientationchange", function(event) {
			$(".transcript").css("top", "300px");
			$(".transcript").css("left", "50px");
		});

	}
	if (device.MobileDevice()) {

		$(window).on("orientationchange", function(event) {

			var titleText = pageTitleTxt;
			var moduleTitleText = pageTitleTxt;

			if (window.orientation == 0) {
				if (titleText.length > tmpTxtLen) {
					pageTitle = true;
					var titleTextLen = titleText.split(" ");
					titleText = addtitle(titleTextLen);
					//console.log(" titleText 1 ", titleText )
				} else {
					pageTitle = false;
				}
				//console.log(moduleTitleText.length+"::titleTe23xt.length::"+titleText.length);
				if (model.langName == "ru/") {
					txtLen = 21;
				} else {
					txtLen = 29;
				}
				if (moduleTitleText.length > txtLen) {
					moduleTitle = true;
					var moduleTitleTxtLen = moduleTitleText.split(" ");
					moduleTitleText = addtitle(moduleTitleTxtLen);
				} else {
					moduleTitle = false;
				}

			} else {
				if (titleText.length > txtTotalLength) {
					pageTitle = true;
					var titleTextLen = titleText.split(" ");
					titleText = addtitle(titleTextLen);
				} else {
					pageTitle = false;
					moduleTitle = false;
					$(".PageTitle-TT").css("display", "none");
					$(".CourseTitle-TT").css("display", "none");
				}
				if (model.langName == "ru/") {
					txtLen = 45;
					if (moduleTitleText.length > txtLen) {
						moduleTitle = true;
						var moduleTitleTxtLen = moduleTitleText.split(" ");
						moduleTitleText = addtitle(moduleTitleTxtLen);
					} else {
						moduleTitle = false;
					}
				} else if (model.langName == "es/") {
					txtLen = 30;
					if (moduleTitleText.length > txtLen) {
						moduleTitle = true;
						var moduleTitleTxtLen = moduleTitleText.split(" ");
						moduleTitleText = addtitle(moduleTitleTxtLen);
					} else {
						moduleTitle = false;
					}
				}
			}
			menuCourseTitle.html(titleText.trim());
			$(".course_title").html(moduleTitleText.trim());
		});

	}

	if (StartPage) {
		if((model.BookmarkFlg) &&(device.iPad())){
			model.BookmarkFlg=false
			$("#deviceLaunch").show();
			controller.calculateAssests();
		}else{
			callInitialAudio();
		}
		//StartPage = false;
		/*if (!device.iPhone() && !device.iPad() && !device.Android()) {
			callInitialAudio();
		} else {
			$("#deviceLaunch").show();
			controller.calculateAssests();
		}*/
		
	}

	if (device.AndroidTablet()) {
		if (window.orientation == 90 || window.orientation == -90) {

			titleissue();
		} else {
			$(".course_title").html(moduleTitleTxt);
			$("#shell_mod_title_bar").html(pageTitleTxt);
		}
	} else if (device.MobileDevice() || device.iPad()) {

		if (window.orientation == 0 || window.orientation == 180) {

			titleissue();
		} else if (window.orientation == 90 || window.orientation == -90 && device.MobileDevice()) {
			if (model.langName == "ru/") {
				if (pageTitleTxt.length > 50) {
					var tempPageTitle = pageTitleTxt.substr(0, 50);
					pageTitle = true;
					$("#shell_mod_title_bar").html(tempPageTitle + "..");
				}
			}

		} else {
			$(".course_title").html(moduleTitleTxt);
			$("#shell_mod_title_bar").html(pageTitleTxt);
		}

	}

	$(window).on("orientationchange", function(event) {

		if (device.AndroidTablet()) {
			if (window.orientation == 90 || window.orientation == -90) {
				titleissue();
			}
		} else if (device.MobileDevice() || device.iPad()) {

			if (window.orientation == 0 || window.orientation == 180) {
				titleissue();
			} else if (window.orientation == 90 || window.orientation == -90 && device.MobileDevice()) {
				if (model.langName == "ru/") {
					if (pageTitleTxt.length > 50) {
						var tempPageTitle = pageTitleTxt.substr(0, 50);
						pageTitle = true;
						$("#shell_mod_title_bar").html(tempPageTitle + "..");
					}
				}

			} else {
				//alert("orientationchange");
				$(".course_title").html(moduleTitleTxt);
				$("#shell_mod_title_bar").html(pageTitleTxt);
			}
		}
	});
	// console.log('pgRedraw: controller update pgView');
	controller.pgRedraw();
};

function titleissue() {

	ruscousreText = moduleTitleTxt;
	ruspageText = pageTitleTxt;

	if (model.langName == "ru/" || model.langName == "es/") {

		if (ruscousreText.length > rusTxtlen) {
			var tempMainTitle = ruscousreText.substr(0, 5);
			moduleTitle = true;
			$(".course_title").html(tempMainTitle + "..");
		} else {
			moduleTitle = false;

		}

		if (ruspageText.length > rusTxtlen) {
			var tempPageTitle = ruspageText.substr(0, 8);
			pageTitle = true;
			$("#shell_mod_title_bar").html(tempPageTitle + "..");

		} else {
			pageTitle = false;
		}

	} else if (model.langName == "en/") {

		if (ruspageText.length > 50) {

			var tempPageTitle = ruspageText.substr(0, 60);
			pageTitle = true;
			$("#shell_mod_title_bar").html(tempPageTitle + "..");
		}

	} else if (model.langName == "uk/") {

		if (ruscousreText.length > 20) {
			var tempMainTitle = ruscousreText.substr(0, 15);
			moduleTitle = true;
			$(".course_title").html(tempMainTitle + "..");
		} else {
			moduleTitle = false;

		}

	}

}





function countWords(str) {
	str = str.replace(/(^\s*)|(\s*$)/gi, "");
	str = str.replace(/[ ]{2,}/gi, " ");
	str = str.replace(/\n /, "\n");
	return str.split(' ').length;
}

function addtitle(str) {
	var tempStr = "";
	var finalStr = "";
	var emptyStr = " ";
	if (moduleTitle) {
		var limitedLen = 60;
		var titleTextLen = 0;
	}
	if (pageTitle) {
		if (!device.MobileDevice()) {
			var limitedLen = txtTotalLength;
			var titleTextLen = Number($(".course_title").text().length);
		} else {
			var limitedLen = 60;
			var titleTextLen = 0;
		}
	}

	for (var i = 0; i < str.length; i++) {
		tempStr += emptyStr + str[i];
		var tempStrLength = titleTextLen + tempStr.length;
		if (tempStrLength < limitedLen) {
			finalStr = tempStr;
		}

	}
	if (finalStr != tempStr) {
		finalStr = finalStr + "...";
	}
	return finalStr;
}

Controller.prototype.pgRedraw = function() {
	/* Fixes the issue with some iOS devices not
	* updating the viewpor while delivering content
	* from an iFrame.  Removes need to change orientation.
	*/
	// console.log('[C] pgRedraw');
	$.fn.redraw = function() {
		return this.hide(0, function() {
			$(this).show();
		});
	};
	// $('body').redraw();
	try {
		// This could be smarter to fix all windows and nested frames,
		// but I'd really hope a major LMS vendor doesn't do that.
		$(window.parent.document.body).redraw();
	} catch(e) {
		/*Not in an iframe or cross domain */
	}
};

Controller.prototype.assignTranscript = function(myPage) {
	if ($("#transText").hasClass("mCustomScrollbar")) {
		$('#transText').mCustomScrollbar("destroy");
	}
	$('#transText').html(myPage);
	$("#transText").scrollTop(0);
	$('#transText').mCustomScrollbar();
	$('#transText').mCustomScrollbar("update");

};
//function for close transcript popup
//Controller.prototype.hidetranscript= function() {
function hidetranscript() {
	toggleTranscript();
}

Controller.prototype.hidetranscriptPage = function() {
	$("#transcript").css("display", "none");
	transOpened = false;
	$('.transcript_btn').removeClass('GadgetDisable');
	if ($("#transText").hasClass("mCustomScrollbar")) {
		$('#transText').mCustomScrollbar("destroy");
	}
};

Controller.prototype.TranscriptDisableFn = function() {
	//function assignTranscript(myPage) {
	//$(".transcript_btn").css("opacity","0.5")
	muteBtn.css("opacity", "0.7");
	muteBtn.removeClass(transcriptBtn.attr("class"));
	muteBtn.addClass("GadgetDisable");
	transcriptBtn.css("opacity", "0.7");
	transcriptBtn.removeClass(transcriptBtn.attr("class"));
	transcriptBtn.addClass("GadgetDisable");
	$("#transcript").css("display", "none");
	isDisableTranscript = true;
	if ($("#transText").hasClass("mCustomScrollbar")) {
		$('#transText').mCustomScrollbar("destroy");
	}
};

function toggleTranscript() {
	// console.log("[Controller] isDisableTranscript: " + isDisableTranscript);
	$('.transcript_btn').addClass('transcript_btn_disable');
	if (isDisableTranscript) {
		return;
	}
	if ($("#transcript").css("display") == "block") {
		$('#transText').mCustomScrollbar("destroy");
		$("#transcript").css("display", "none");
	} else {
		$("#transText").scrollTop(0);
		$('#transText').mCustomScrollbar();
		$('#transText').mCustomScrollbar("update");
		$("#transcript").css("display", "block");
	}

}

function hideResource() {
	document.getElementById("transcript").style.visibility = "visible";
}

//==========Aligns the page in vertically middle of parent div, does not work for phone devices
Controller.prototype.setPosition = function() {
	// if (!device.iPhone() && !device.AndroidPhone()) {
	// var topMargin = ((parseInt($(".shell_rightCon").css("height")) - parseInt(pageContiner.css("height"))) / 2) - 20;
	// pageContiner.css("margin-top", topMargin + "px");
	// }
};
Controller.prototype.audioFinish = function() {
	//do nothing
};
Controller.prototype.manageModClick = function(id) {
	menu.manageModClick(id);
};
//Controller.prototype.NexDisable= function() {
function NexDisable() {
	//alert(model.compleTeArr[model.currPage]);
	// nextBtn.removeClass(nextBtn.attr("class"));
	// nextBtn.addClass("shell_next_icon_dsbl");
	nextBtn.addClass('disabled').css("pointer-events", "none");
	model.NextDisable = true;
}

Controller.prototype.NexDisableAssment = function() {
	//alert(model.compleTeArr[model.currPage]);
	// nextBtn.removeClass(nextBtn.attr("class"));
	// nextBtn.addClass("shell_next_icon_dsbl");
	nextBtn.addClass('disabled').css("pointer-events", "none");
	model.NextDisable = true;
};
Controller.prototype.setPageVisited = function(isDontAnimate) {
	if (isDontAnimate == null || isDontAnimate == undefined) {
		isDontAnimate = false;
		model.setPageVisited();
	} else {
		isDontAnimate = true;
	}
	
	if (model.currTopic == (model.tTopics-1) && model.currMod == (model.tModulesArr[model.tTopics-1]-1) && model.currPage == (model.tPagesArr[model.tTopics-1][model.tPagesArr[model.tTopics-1].length-1]-1)) {
		// console.log('[Controller] setPageVisited ================ A disabled');
		nextBtn.addClass('disabled').css("pointer-events", "none");
	} else if (model.visitedArr[model.currTopic][model.currMod][model.currPage] == 0 && model.learningType != "non-linear") {
		// console.log('[Controller] setPageVisited ================ B disabled');
		nextBtn.addClass('disabled').css("pointer-events", "none");
		if (!isDontAnimate) {
			animateIText();
		}
	} else {
		// console.log('[Controller] setPageVisited ================ C enabled');
		nextBtn.removeClass('disabled').addClass('blink').css("pointer-events", "auto");
		if (!isDontAnimate) {
			animateIText();
		}
		if (isSCORM) {
			//model.scormHandler.getValue();
		}
	}
	menu.updateMenu(model.currTopic, model.currMod, model.currPage,model.subcurrPage,model.subInnercurrPage, model.visitedArr);
	
	//================
	model.wheelpreviousPercentage=model.wheelCompletionPercentage;
	var tempTotalPage = 0;
	var tempCourseFinish = 0;

	for (var i = 0; i < model.tTopics; i++) {
		for (var j = 0; j < model.tModulesArr[i]; j++) {
			tempTotalPage += model.visitedArr[i][j].length;
			for (var k = 0; k < model.tPagesArr[i][j]; k++) {
				if (model.visitedArr[i][j][k] == 2 || model.visitedArr[i][j][k] == '2') {
					tempCourseFinish++;
				}
			}
		}
	}
		
	var tempPercentage = Math.round((tempCourseFinish / tempTotalPage) * 100);
	$("#shell_progressBar_lineTwo").css("width", tempPercentage + "%");
	$("#shell_progressBar_text").text(tempPercentage + "% course completed");
	model.completionPercentage=tempPercentage;
	
	if (isSCORM) {
		model.scormHandler.saveBookmark();
	}
	controller.pageVisitedCalcFun()
};

Controller.prototype.pageVisitedCalcFun=function(){
	
	var assessmentComplete=false
	var AllTopicComplete=false
	var asessmentCompleteCnt=0
	var topicCompleteCnt=0
	var percentageTopicCompleted=0
	
	for (var i = 0; i < model.tTopics; i++) {
		if (model.prePostTestScorArr[i]>=75) {
			asessmentCompleteCnt++;
		}
		if(model.TopicPercentCalcArr[i]>=75){
			topicCompleteCnt++
		}
		
		if((model.prePostTestScorArr[i]>=75)&&(model.TopicPercentCalcArr[i]>=75)){
			percentageTopicCompleted++
			model.topicCompletionArr[i]='1'
			$("#topMenu_"+ i).addClass("topicVisited")
		}
	}
	var tempWheelPercentage = Math.round((percentageTopicCompleted / model.tTopics) * 100);
	model.wheelCompletionPercentage=tempWheelPercentage;
	
	//console.log(tempWheelPercentage+" tempWheelPercentage "+model.totalScore)
	if(asessmentCompleteCnt==model.tTopics){
		assessmentComplete=true
	}
	if(topicCompleteCnt==model.tTopics){
		AllTopicComplete=true
	}
	//if ((tempPercentage >= 75)&&(model.totalScore>=75)) {
	if ((AllTopicComplete)&&(assessmentComplete)) {
		if (isSCORM) {
			model.scormHandler.complete();
			//model.scormHandler.setSuccessStatus("ASSESSMENT_PASSED")
			model.scormHandler.saveBookmark();
		}
		//console.log("Course Completed.................... ")
		model.wheelCompletionPercentage=100;
		if(model.wheelpreviousPercentage!=model.wheelCompletionPercentage){
			percetageCircleCalculation()
		}
	}else if(model.wheelpreviousPercentage!=model.wheelCompletionPercentage){
		percetageCircleCalculation()
	}
}

function percetageCircleCalculation() {
	var canvas
	var curPerc
	if($("#customMenu").css("display") == "block"){
		canvas = document.getElementById('myMenuCanvas');
		curPerc = 0
	}else{
		canvas = document.getElementById('myCanvas');
		curPerc = model.wheelpreviousPercentage;
	}
	var context = canvas.getContext('2d');
	var start=4.72;
	var cw=context.canvas.width/2;
	var ch=context.canvas.height/2;
	var diff;
	 
	function progressBar(){
		diff=(curPerc/100)*Math.PI*2;
		context.clearRect(0,0, canvas.width, canvas.height);
		context.beginPath();
		//20 to ajust the circle radius
		context.arc(cw,ch,20,0,2*Math.PI,false);
		context.fillStyle='#FFF';
		context.fill();
		//outer circle Colour
		context.strokeStyle='#dfdfdf';
		context.stroke();
		context.fillStyle='#000';
		//Inner circle Colour
		context.strokeStyle='#01b5e2';
		context.textAlign='center';
		//Line stroke
		context.lineWidth=3;
		context.font = '15pt';
		context.beginPath();
		//20 to ajust the circle radius
		context.arc(cw,ch,20,start,diff+start,false);
		context.stroke();
		//context.fillText(curPerc+'%',cw+2,ch+6);
		if(curPerc>=model.wheelCompletionPercentage){
			clearTimeout(bar);
		}
		curPerc++;
	}
	 if(model.wheelCompletionPercentage==0){
		 model.wheelCompletionPercentage=1
	 }
	var bar=setInterval(progressBar,30);
	
	if(model.wheelCompletionPercentage==100){
		 $(".percentageTxt").html("100%")
	 }else{
		 if(model.wheelCompletionPercentage==1){
			$(".percentageTxt").html("0%")
		 }else{
			 $(".percentageTxt").html(model.wheelCompletionPercentage+"%")
		 }
	 }
}


Controller.prototype.courcePercentageCalculator=function(){
	var tempModuleFinish=0
	var tempTopicFinish=0
	var totalTopicPages=0
	var TotalTopicPagesArr=[]
	var tempModTotalPercentage=0
	
	//for (var i = 0; i < model.tTopics; i++) {
		totalTopicPages=0
		tempModuleFinish=0
		var tmpTotaMod=model.tModulesArr[model.currTopic]-1
		for (var j = 0; j < tmpTotaMod; j++) {
			totalTopicPages += model.visitedArr[model.currTopic][j].length;
			//console.log(model.visitedArr[i][j].length+" model.visitedArr[i][j].length "+totalTopicPages)
			for (var k = 0; k < model.tPagesArr[model.currTopic][j]; k++) {
				if(model.subL1PagesArr[model.currTopic][j][k]>0){
					totalTopicPages += (model.subL1PagesArr[model.currTopic][j][k]-1);
					for (var l = 0; l < model.subL1PagesArr[model.currTopic][j][k]; l++) {
						if(model.subL2PagesArr[model.currTopic][j][k][l]>0){
							totalTopicPages += (model.subL2PagesArr[model.currTopic][j][k][l]-1);
							for (var m = 0; m < model.subL2PagesArr[model.currTopic][j][k][l]; m++) {
								if (model.visitedArr[model.currTopic][j][k][l][m] == 2 || model.visitedArr[model.currTopic][j][k][l][m] == '2') {
									tempModuleFinish++;
								}
							}
						}else{
							if (model.visitedArr[model.currTopic][j][k][l] == 2 || model.visitedArr[model.currTopic][j][k][l] == '2') {
								tempModuleFinish++;
							}
						}
					}
				}else{
					if (model.visitedArr[model.currTopic][j][k] == 2 || model.visitedArr[model.currTopic][j][k] == '2') {
						tempModuleFinish++;
					}
				}
			}
			
		}
	//}
	console.log(tempModuleFinish+" tempModuleFinish")
	tempModTotalPercentage = Math.round((tempModuleFinish / (totalTopicPages)) * 100);
	model.TopicPercentCalcArr[model.currTopic]=tempModTotalPercentage
	
	//console.log(model.TopicPercentCalcArr+" tempModTotalPercentage "+totalTopicPages+" tempModuleFinish "+tempModuleFinish)
}

Controller.prototype.percetageCircle = function() {
	percetageCircleCalculation()
}
	
Controller.prototype.setPageVisitedInitial = function() {

	model.setPagePartiallyVisited();
	if (isSCORM) {
		model.scormHandler.saveBookmark();
	}
	menu.updateMenu(model.currTopic, model.currMod, model.currPage,model.subcurrPage,model.subInnercurrPage, model.visitedArr);
	//setPageVisited(true);
};
Controller.prototype.updateModel = function() {
	//model.modArr = menu.modArr;
	for (var i = 0; i < model.modArr.length; i++) {
		//model.visitedArr[i] = 0;
		model.visitedArr[i] = new Array();
		for (var j = 0; j < model.modArr[i].length; j++) {
			model.visitedArr[i][j] = 0;
		}
	}
};
Controller.prototype.calculateAssests = function() {
	allAssestsLoaded = false;
	$(".loader").css('width', 0 + '%');
	ProgressiveLoader.terminateLoader();
	ProgressiveLoader.initializeLoader();
	assestCnt = 0;
	loadedAssestsCnt = 0;
	var currentAudio
	var currentExtDataPath
	var FileToLoad
	//console.log(model.subPageInnerFlg+" model.subPageInnerFlg "+model.subPageFlg)
	if(model.subPageInnerFlg){
		FileToLoad=model.modArr[model.currTopic][model.currMod][model.currPage][model.subcurrPage][model.subInnercurrPage]
		currentAudio = model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage].getElementsByTagName("subpage")[model.subcurrPage].getElementsByTagName("innersubpage")[model.subInnercurrPage].getAttribute("audio");
		currentExtDataPath = model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage].getElementsByTagName("subpage")[model.subcurrPage].getElementsByTagName("innersubpage")[model.subInnercurrPage].getAttribute("data");
	}else if(model.subPageFlg){
		FileToLoad=model.modArr[model.currTopic][model.currMod][model.currPage][model.subcurrPage]
		currentAudio = model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage].getElementsByTagName("subpage")[model.subcurrPage].getAttribute("audio");
		currentExtDataPath = model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage].getElementsByTagName("subpage")[model.subcurrPage].getAttribute("data");
	}else{
		FileToLoad=model.modArr[model.currTopic][model.currMod][model.currPage]
		currentAudio = model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage].getAttribute("audio");
		currentExtDataPath = model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage].getAttribute("data");
	}
	var totalScripts = (FileToLoad.scripts).split(",");
	var totalStyles = (FileToLoad.styles).split(",");
	if (currentAudio != "") {
		assestCnt++;
	}
	if (currentExtDataPath != "") {
		assestCnt++;
	}
	if (totalScripts != "") {
		assestCnt += totalScripts.length;
	}
	if (totalStyles != "") {
		assestCnt += totalStyles.length;
	}

	/*for Image loading*/
	assestCnt++;
	eventManager.addControlEventListener(ProgressiveLoader, "loaderUpdated", controller.processComplete);
	//ProgressiveLoader.setLoadedAssetCount(imageLoader.counter);
	ProgressiveLoader.setTotalAssetsCount(assestCnt);
};
Controller.prototype.processComplete = function() {
	$(".loader").css('width', ProgressiveLoader.getLoaderPercentage() + '%');
	// console.log('[Controller] processComplete: ' + ProgressiveLoader.getLoaderPercentage());
	$(".percentageLoader").html(ProgressiveLoader.getLoaderPercentage()+"%")
	if (ProgressiveLoader.getLoaderPercentage() == 100) {
		ProgressiveLoader.terminateLoader();
		pageLoadingAnim = true;
		/*if (isFunFacts) {
			$("#funFactBtn").removeClass("funfactdisabled").addClass("funfactenabled");
		}*/
		audioPlayer.StartAnimation();
		eventManager.removeControlEventListener(ProgressiveLoader, "loaderUpdated", controller.processComplete);
	} else {
	}
};
Controller.prototype.popupAudioPreload = function() {
	$(".loader").css('width', 0 + '%');
	ProgressiveLoader.terminateLoader();
	ProgressiveLoader.initializeLoader();
	assestCnt = 0;
	loadedAssestsCnt = 0;
	/*for Image loading*/
	assestCnt++;
	/*if (isFunFacts) {
		$("#funFactBtn").removeClass("funfactenabled").addClass("funfactdisabled");
	}*/
	eventManager.addControlEventListener(ProgressiveLoader, "loaderUpdated", controller.popupAudioComplete);
	//ProgressiveLoader.setLoadedAssetCount(imageLoader.counter);
	ProgressiveLoader.setTotalAssetsCount(assestCnt);
};
Controller.prototype.popupAudioComplete = function() {
	
	$(".loader").css('width', ProgressiveLoader.getLoaderPercentage() + '%');
	if (ProgressiveLoader.getLoaderPercentage() == 100) {
		//alert("processComplete");
		ProgressiveLoader.terminateLoader();
		/*if (isFunFacts) {
			$("#funFactBtn").removeClass("funfactdisabled").addClass("funfactenabled");
		}*/
		//audioPlayer.StartAnimation();
		eventManager.removeControlEventListener(ProgressiveLoader, "loaderUpdated", controller.popupAudioComplete);
	}
};
Controller.prototype.loadAudio = function(src) {
};

Controller.prototype.NavigatioTourComplete = function() {
	$(".loader").css('width', ProgressiveLoader.getLoaderPercentage() + '%');

	if (ProgressiveLoader.getLoaderPercentage() == 100) {
		navigationTour = true;
		ProgressiveLoader.terminateLoader();
		$(".NavTour").css("display", "block");
		$("#preloaderSpinner").fadeOut("slow")
		audioPlayer.StartNavAnimation();
		playNavAnimation();
		eventManager.removeControlEventListener(ProgressiveLoader, "loaderUpdated", controller.NavigatioTourComplete);
	}

};
Controller.prototype.loadAudio = function(src) {
};
var currentNavAudio = "";
function callNavigationTourAudio() {

	//--  Audio change with respect to device or desktop
	if (!device.iPhone() && !device.iPad() && !device.Android()) {
		//--------"Desktiop Audio"--------------
		currentNavAudio = "assets/audio/common/" + model.langName + "navTour.mp3";
	} else {
		// if (device.iPad() || device.AndroidTablet()) {
		// currentNavAudio = "assets/audio/common/" + model.langName + "navTour_tab.mp3";
		// } else {
		// currentNavAudio = "assets/audio/common/" + model.langName + "navTour_mob.mp3";
		// }
		currentNavAudio = "assets/audio/common/" + model.langName + "navTour_mob.mp3";
	}
	//--  Audio change with respect to device or desktop
	audioPlayer.loadAudioPath(currentNavAudio);
	$(".loader").css('width', 0 + '%');
	$(".progress").css('width', 0 + '%');
	$("#preloaderSpinner").css("display", "block");
	ProgressiveLoader.terminateLoader();
	ProgressiveLoader.initializeLoader();
	assestCnt = 0;
	loadedAssestsCnt = 0;
	assestCnt++;
	eventManager.addControlEventListener(ProgressiveLoader, "loaderUpdated", controller.NavigatioTourComplete);
	ProgressiveLoader.setTotalAssetsCount(assestCnt);
	/*} else {
	 //var currentAudio = currentAudios[0]
	 }*/
}

function callInitialAudio() {
	// console.log('[Controller] callInitialAudio: ');
	if (!device.iPhone() && !device.iPad() && !device.Android()) {
		controller.calculateAssests();
		if (StartPage) {
			StartPage = false;
		}
	} else {
		if (!StartPage) {
			controller.calculateAssests();
		} else if (StartPage) {
			StartPage = false;
		}
	}
	var currentAudio 
	
	if(model.subPageInnerFlg){
		currentAudio = model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage].getElementsByTagName("subpage")[model.subcurrPage].getElementsByTagName("innersubpage")[model.subInnercurrPage].getAttribute("audio");
	}else if(model.subPageFlg){
		currentAudio = model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage].getElementsByTagName("subpage")[model.subcurrPage].getAttribute("audio");
	}else{
		currentAudio = model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage].getAttribute("audio");
	}
	model.audioName=currentAudio
	controller.loadExternalData();
	if (currentAudio != "") {
		$("#volumeSlider, #gadgetsButn").css("display", "block")
		isAudio = true;
		audioPlayer.loadAudioPath(model.audioPath + currentAudio);
		model.AudioPresent=true
		$("#audio_Icon").removeClass("deactive").removeClass("disabled").css("cursor", "pointer").css("opacity", "1").css("pointer-events", "auto");
		//-- Debug: Delete this after rolling out changes to all files and uncomment above lines --//
		//audioPlayer.loadAudioPath(model.audioPath + currentAudio);
		//-----------------------------------------------------------------------------------------//
		//audioLoadPath();
	} else {
		model.AudioPresent=false
		$("#volumeSlider, #gadgetsButn").css("display", "none")
		isAudio = false;
		audioLoaded = true;
		$("#audio_Icon").addClass("deactive").addClass("disabled").css("cursor", "none").css("opacity", "0.5").css("pointer-events", "none");
		//audioPlayer.loadAudioPath(model.audioPath + "m01_l01_p02.mp3");
		//audioPlayer.loadAudioPath("");
		//audioLoadPath();
	}

}

function audioLoadPath() {
	// console.log('[Controller] audioLoadPath: ' + pageLoad + "::::" + ExternalDataLoad + "::::" + audioLoaded + ":::" + currentExtDataPath);
	if (pageLoad && ExternalDataLoad && audioLoaded) {
		//audioPlayer.StartAnimation();
		if ( typeof assignExternalData != 'undefined' && $.isFunction(assignExternalData)&&(model.assesmentPage)) {
			assignExternalData();
			pageLoadingAnim = true;
		} else {
			controller.assignExternalData();
		}
	} else {
		setTimeout('audioLoadPath()', 1000);
	}

};
Controller.prototype.loadExternalData = function() {
	/*if (isFunFacts) {
		$("#funFactBtn").removeClass("funfactenabled").addClass("funfactdisabled");
	}*/
	ExternalDataLoad = false;
	// console.log("[Controller] loadExternalData model.currPage: ", model.currPage);
	//currentExtDataPath = model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage].getAttribute("data");
	if(model.subPageInnerFlg){
		currentExtDataPath = model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage].getElementsByTagName("subpage")[model.subcurrPage].getElementsByTagName("innersubpage")[model.subInnercurrPage].getAttribute("data");
	}else if(model.subPageFlg){
		currentExtDataPath = model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage].getElementsByTagName("subpage")[model.subcurrPage].getAttribute("data");
	}else{
		currentExtDataPath = model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage].getAttribute("data");
	}
	// console.log("[Controller] loadExternalData currentExtDataPath: ", currentExtDataPath);
	if (currentExtDataPath == "") {
		ExternalDataLoad = true;
	} else {
		//-- Conclusion page data
		var path = "";
		/*if (model.currMod == (model.modArr.length - 1) && model.currPage == (model.modArr[model.currMod].length - 1)) {
			if (model.menuData.getElementsByTagName("page")[model.currPage].getAttribute("data-audioTime")) {
				path = model.commondataPath + currentExtDataPath;
			} else {
				path = model.dataPath + currentExtDataPath;
			}
		} else {
			path = model.dataPath + currentExtDataPath;
		}*/
		//-- Debug: Delete this after rolling out changes to all files --//
		path = model.dataPath + currentExtDataPath;
		//---------------------------------------------------------------//
		$.getJSON(path, function() {
		}).done(function(json) {
			ExternalData = json.ExternalData[0];
			ExternalDataLoad = true;
		}).fail(function() {
			console.log("[Controller] loadExternalData error");
		}).always(function() {
			// console.log("[Controller] loadExternalData complete");
		});
	}
};
Controller.prototype.mainLoadData = function() {
	var path = model.dataPath + model.mainData;
	$.getJSON(path, function() {
	}).done(function(json) {
		mainData = json.ExternalData[0];
		controller.funFactData();
	}).fail(function() {
		console.log("[Controller] loadMainData error");
	});

};
Controller.prototype.funFactData = function() {
	var path = model.commondataPath + "tmp.json";
	$.getJSON(path, function() {
	}).done(function(json) {
		FFData = json.ExternalData[0];
		controller.assignFFData();
		controller.assignMainData();
		menu.createMenu();
		controller.createResourcesList();
		$("#preloaderSpinner_int").css("display", "none");
		$("#startCourse").on("click", function(){
			//model.currTopic=0
			//model.currMod=0
			menu.generateModule(model.currTopic);
			if((model.firstLaunchIpad) &&(device.iPad())){
				controller.calculateAssests();
				//controller.managePageClick(model.currTopic, model.currMod, model.currPage, model.subcurrPage, model.subInnercurrPage);
				if(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[0].getElementsByTagName("page")[0].getAttribute("subpagelevel")==null){
					 controller.managePageClick(model.currTopic, 0, 0, -1, -1);
				}else if((model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[0].getElementsByTagName("page")[0].getAttribute("subpagelevel")=="1")&&(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[0].getElementsByTagName("page")[0].getElementsByTagName("subpage")[0].getAttribute("subpagelevel")==null)){
					controller.managePageClick(model.currTopic, 0, 0, 0, -1);
				}else{
					controller.managePageClick(model.currTopic, 0, 0, 0,0);
				}
				//callInitialAudio();
			}else{
				if(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[0].getElementsByTagName("page")[0].getAttribute("subpagelevel")==null){
					 controller.managePageClick(model.currTopic, 0, 0, -1, -1);
				}else if((model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[0].getElementsByTagName("page")[0].getAttribute("subpagelevel")=="1")&&(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[0].getElementsByTagName("page")[0].getElementsByTagName("subpage")[0].getAttribute("subpagelevel")==null)){
					controller.managePageClick(model.currTopic, 0, 0, 0, -1);
				}else{
					controller.managePageClick(model.currTopic, 0, 0, 0,0);
				}
				//model.dispatchCustomEvent("updateView");
				//callInitialAudio();
				//controller.managePageClick(model.currTopic, model.currMod, model.currPage, model.subcurrPage, model.subInnercurrPage);
				
			}
			$("#customMenu").css('display', 'none');
			$(".customMenuWrapperImage").css('display', 'none');
		})
		//beginCourse();
	}).fail(function() {
		console.log("[Controller] loadFunFactData error");
	});

};
Controller.prototype.assignFFData = function() {
	var rNo = 0;
	$.each(FFData, function(key, value) {
		FFDataArr.push(value.text);
		FFRandomArr.push(rNo);
		rNo++;
		// console.log(key + "::::" + value.text);
	});
	FFRandomArr = FFShuffle(FFRandomArr);
	// console.log("::::" + FFRandomArr);
};

Controller.prototype.assignMainData = function() {
	$.each(mainData, function(key, value) {
		if (key == "MenuData") {
			$.each(mainData.MenuData[0], function(key, value) {
				if(value.moduleTitle!=""){
					var tmptxt=value.moduleTitle+" - "+value.text
					ModPagetitlesArr.push(tmptxt)
				}else{
					ModPagetitlesArr.push(value.text)
				}
				titlesArr.push(value.text);
				mobTitlesArr.push(value.mob_Text);
			});

		} else if (key == "ResourcesData") {
			$.each(mainData.ResourcesData[0], function(key, value) {
				resourceTitlesArr.push(value.title);
				resourceIconArr.push(value.icon);
				resourceDataArr.push(value.documentPath);
			});
		} else if (key == "course_title") {
			moduleTitleTxt = value.text;
			if (device.MobileDevice()) {
				var moduleTitleText = moduleTitleTxt;
				//alert("moduleTitleTxt"+moduleTitleTxt+"::"+moduleTitleTxt.length);
				$(".CourseTitle-TT").html(moduleTitleTxt);
				if (window.orientation == 0) {
					if (model.langName == "ru/") {
						txtLen = 21;
					} else {
						txtLen = 29;
					}

					if (moduleTitleText.length > txtLen) {
						moduleTitle = true;
						var moduleTitleTxtLen = moduleTitleText.split(" ");
						moduleTitleText = addtitle(moduleTitleTxtLen);
					} else {
						moduleTitle = false;
					}
				} else {
					if (model.langName == "ru/") {
						txtLen = 30;
						if (moduleTitleText.length > txtLen) {
							moduleTitle = true;
							var moduleTitleTxtLen = moduleTitleText.split(" ");
							moduleTitleText = addtitle(moduleTitleTxtLen);
						} else {
							moduleTitle = false;
						}
					} else if (model.langName == "es/") {

						txtLen = 30;
						if (moduleTitleText.length > txtLen) {
							moduleTitle = true;
							var moduleTitleTxtLen = moduleTitleText.split(" ");
							moduleTitleText = addtitle(moduleTitleTxtLen);
						} else {
							moduleTitle = false;
						}
					}
				}
				$("." + key).html(moduleTitleText.trim());
				/*
				 if (value.mob_Text != "") {
				 $("." + key).html(value.mob_Text);
				 } else {
				 $("." + key).html(value.text);
				 }*/
			} else {

				if (model.langName == "ru/") {
					var moduleTitleText = moduleTitleTxt;
					$(".CourseTitle-TT").html(moduleTitleTxt);
					txtLen = 30;
					if (moduleTitleText.length > txtLen) {
						moduleTitle = true;
						var moduleTitleTxtLen = moduleTitleText.split(" ");
						moduleTitleText = addtitle(moduleTitleTxtLen);
					} else {
						moduleTitle = false;
					}
					$("." + key).html(moduleTitleText.trim());
				} else {
					$("." + key).html(value.text);
				}
			}
		} else {
			$("." + key).html(value.text);
		}
	});

};
function FFShuffle(array) {
	var tmp, current, top = array.length;
	if (top)
		while (--top) {
			current = Math.floor(Math.random() * (top + 1));
			tmp = array[current];
			array[current] = array[top];
			array[top] = tmp;
		}
	return array;
}

Controller.prototype.assignExternalData = function() {
	if (currentExtDataPath != "") {
		$.each(ExternalData, function(key, value) {
			if (key == "transcript") {
				transcript = value.text;
			} else {
				$("." + key).html(value.text);
				var htmlType = $("." + key).prop('tagName');
				if (htmlType == "text") {
					$("." + key).text(value.text);
				} else {
					$("." + key).html(value.text);
				}
			}
		});
	}
	loadedAssestsCnt++;
	ProgressiveLoader.setLoadedAssetCount(loadedAssestsCnt);
		controller.assignTranscript(transcript[0]);
};

Controller.prototype.managePageClick = function(T, M, P, S, I) {
	audioPlayer.destroyAudio();
	gadgetsBtn.trigger("click", this.fnClick);
	model.setCurrPage(T, M, P, S, I);
	callInitialAudio();
	
};

Controller.prototype.manageTopic = function(T, M, P, S, I) {
	audioPlayer.destroyAudio();
	gadgetsBtn.trigger("click", this.fnClick);
	model.setCurrModule(T, M, P, S, I);
	callInitialAudio();
	// menuBtn.trigger("click", this.fnClick);
};
Controller.prototype.audioPause = function() {
	audioPlayer.pauseAudio();
	if (videoObject != null) {
		if (device.iPhone()) {
			videoObject_JQ.hide();
		} else {
			videoPauseState = videoObject.paused;
			videoObject.pause();
			videoObject.controls = false;
		}
	}
};
Controller.prototype.audioResume = function() {
	audioPlayer.resumeAudio();
	if (videoObject != null) {
		if (device.iPhone()) {
			videoObject_JQ.show();
		} else {
			videoObject.controls = true;
			if (!videoPauseState) {
				videoObject.play();
			}
		}
	}
};

Controller.prototype.navBtnsControlEnable = function() {

	if (!nxtBakDisable) {
		var shellButtons = [$("#menubtn"), $("#shell_next"), $("#shell_back"), $(".play"), $(".scrubber"), $("#transcript"), $("#shell_more"), $("#shell_exit")];
	} else {
		var shellButtons = [$(".play"), $(".scrubber"), $("#transcript")];
	}
	$(".scrubber").css("cursor", "pointer")

	for (var i = 0; i < shellButtons.length; i++) {
		shellButtons[i].removeClass("deactive").removeClass("disabled").css("pointer-events", "auto");;
	}
	//if (!device.MobileDevice() && !device.Android()) {
	if (!device.MobileDevice()) {

		//$("#transcript").draggable('enable');
		if (!device.AndroidPhone() && !device.AndroidTablet()) {
			$("#transcript").draggable({
				disabled : false
			});
		}
	}
};

Controller.prototype.morButtonResetFun= function(){
		if($("#shell_more").hasClass("open")){
			$("#shell_more").removeClass("open")
			$('#extraBtns').toggle('slide', {
				direction : "right"
			}, 500);
		}
	
}

Controller.prototype.navBtnsControlDisable = function() {
	controller.morButtonResetFun();
	if (!nxtBakDisable) {
		var shellButtons = [$("#menubtn"), $("#shell_next"), $("#shell_back"), $(".play"), $(".scrubber"), $("#transcript"), $("#shell_more")];
	} else {
		var shellButtons = [$(".play"), $(".scrubber"), $("#transcript")];
	}
	$(".scrubber").css("cursor", "default")
	for (var i = 0; i < shellButtons.length; i++) {
		shellButtons[i].addClass("deactive").addClass("disabled").css("pointer-events", "none");;
	}
	//if (!device.MobileDevice() && !device.Android()) {
	if (!device.MobileDevice()) {

		//$("#transcript").draggable('enable');
		if (!device.AndroidPhone() && !device.AndroidTablet()) {
			$("#transcript").draggable({
				disabled : false
			});
		}
	}
};


Controller.prototype.menuBtnsControlEnable = function() {

	if (!nxtBakDisable) {
		var shellButtons = [$("#shell_next"), $("#shell_back"), $(".play"), $(".scrubber"), $("#transcript")];
	} else {
		var shellButtons = [$(".play"), $(".scrubber"), $("#transcript")];
	}

	for (var i = 0; i < shellButtons.length; i++) {
		if (shellButtons[i].hasClass("deactive")) {
			shellButtons[i].removeClass("deactive").css("pointer-events", "auto");;
		}
	}
	if (!nxtBakDisable) {
		controller.nextBackEnable();
	}
	//if (!device.MobileDevice() && !device.Android()) {
	if (!device.MobileDevice()) {
		if ($("#transcript").hasClass("deactive")) {
			//$("#transcript").draggable('disable');
			$("#transcript").draggable({
				disabled : true
			});

		}
	};
};
Controller.prototype.menuBtnsControlDisable = function() {

	if (!nxtBakDisable) {
		var shellButtons = [$("#shell_next"), $("#shell_back"), $(".play"), $(".scrubber"), $("#transcript")];
	} else {
		var shellButtons = [$(".play"), $(".scrubber"), $("#transcript")];
	}

	for (var i = 0; i < shellButtons.length; i++) {
		shellButtons[i].addClass("deactive").css("pointer-events", "none");;
	}
	//if (!device.MobileDevice() && !device.Android()) {
	if (!device.MobileDevice()) {

		//$("#transcript").draggable('enable');
		if (!device.AndroidPhone() && !device.AndroidTablet()) {
			$("#transcript").draggable({
				disabled : false
			});
		}
	}
};
Controller.prototype.ShellBtnDisableforNavTour = function() {
	var shellButtons = [$("#shell_next"), $("#shell_back"), $("#transcript"), $(".audioButton")];
	for (var i = 0; i < shellButtons.length; i++) {
		shellButtons[i].addClass("deactive").css("pointer-events", "none");
	}
	//$(".scrubber"),
	//$(".Papa_indicator").addClass("funfactdisabled");
	$(".lines-button").css("cursor", "default");
	$(".Course_Exit").css("cursor", "default");
	//$(".scrubber").css("cursor","default");
	$(".Shell_menu_nav li a").css("cursor", "default");
	$(".Shell_menu_nav li a").css("color", "#6b514b");

};
Controller.prototype.audioMuteToggle = function() {
	audioPlayer.toggleMuteAudio();
};
Controller.prototype.gadgetsBtnDisable = function() {
	if (!$("#gadgetsButn").hasClass("disabled")) {
		$("#gadgetsButn").addClass("disabled");
		$("#gadgetsButn").css("cursor", "default");
		$("#funFactBtn").css("cursor", "default");
	}
	if (!$("#shell_exit").hasClass("disabled")) {
		//$("#shell_exit").addClass("disabled");
		//$("#shell_exit").css("cursor", "default");
	}
	controller.menuBtnsControlDisable();
};
Controller.prototype.gadgetsBtnEnable = function() {
	if ($("#gadgetsButn").hasClass("disabled")) {
		$("#gadgetsButn").removeClass("disabled");
		$("#gadgetsButn").css("cursor", "pointer");
		$("#funFactBtn").css("cursor", "pointer");
	}
	if ($("#shell_exit").hasClass("disabled")) {
		$("#shell_exit").removeClass("disabled");
		$("#shell_exit").css("cursor", "pointer");
	}
	controller.menuBtnsControlEnable();
	if ((model.currTopic == 0) && (model.currPage == 0) && (model.currMod == 0)){
		if(((model.subInnercurrPage==-1)||(model.subInnercurrPage==0))&&((model.subcurrPage==-1)||(model.subcurrPage==0))){
			backBtn.addClass("deactive").addClass("disabled").css("pointer-events", "none");;
		}else{
			backBtn.removeClass("deactive").removeClass('disabled').css("pointer-events", "auto");
		}
		
	} else {
		backBtn.removeClass("deactive").removeClass('disabled').css("pointer-events", "auto");
	}
	
	if (model.currTopic == (model.tTopics-1) && model.currMod == (model.tModulesArr[model.tTopics-1]-1) && model.currPage == (model.tPagesArr[model.tTopics-1][model.tPagesArr[model.tTopics-1].length-1]-1)) {
		nextBtn.addClass("deactive").addClass('disabled').css("pointer-events", "none").removeClass('blink');
	}
};
Controller.prototype.hidePreloader = function() {
	this.setPosition();
	// pagePreloader.hide();
	showBuffer(false);
};
Controller.prototype.hideAudioControls = function() {
	if (isAudio) {
		//$('.f3').css('display', 'block');
		$(".scrubber").css('display', 'block');
		$(".played").css('display', 'inline');
		$(".duration").css('display', 'inline');
		$(".time_seperator").css('display', 'inline');
		$("#divider").css('display', 'inline');

		if ($('#gadgetsButn .play').hasClass("disabled")) {
			$('#gadgetsButn .play').removeClass("disabled");
		}
		if ($(".time").hasClass("noneScrub_event")) {
			$(".time").removeClass("noneScrub_event");
		}
		//$('#gadgetsButn .play').css('display', 'block');
	} else {
		//$('.f3').css('display', 'none');
		controller.TranscriptDisableFn();
		//$(".scrubber").css('display', 'none');
		$(".played").css('display', 'none');
		$(".duration").css('display', 'none');
		$(".time_seperator").css('display', 'none');
		$("#divider").css('display', 'none');
		if (!$('#gadgetsButn .play').hasClass("disabled")) {
			$('#gadgetsButn .play').addClass("disabled");
		}
		if (!$(".time").hasClass("noneScrub_event")) {
			$(".time").addClass("noneScrub_event");
		}

		//$('#gadgetsButn .play').css('display', 'none');
	}
};
Controller.prototype.removePreAssests = function(filename, filetype) {
	if (PreAssests == "") {
		return;
	}
	var filetype = "css";
	var filename = PreAssests;
	var targetelement = (filetype == "js") ? "script" : (filetype == "css") ? "link" : "none";
	var targetattr = (filetype == "js") ? "src" : (filetype == "css") ? "href" : "none";
	var allsuspects = document.getElementsByTagName(targetelement);
	for (var i = allsuspects.length; i >= 0; i--) {
		if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1)
			allsuspects[i].parentNode.removeChild(allsuspects[i]);
	}
	//this.removePreAssestsJS();
};
Controller.prototype.removePreAssestsJS = function(filename, filetype) {
	if (PreAssests == "") {
		return;
	}
	var filetype = "js";
	var filename = PreAssests.split(".")[0] + "." + filetype;
	var targetelement = (filetype == "js") ? "script" : (filetype == "css") ? "link" : "none";
	var targetattr = (filetype == "js") ? "src" : (filetype == "css") ? "href" : "none";
	var allsuspects = document.getElementsByTagName(targetelement);
	for (var i = allsuspects.length; i >= 0; i--) {
		if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1)
			allsuspects[i].parentNode.removeChild(allsuspects[i]);
	}
};
Controller.prototype.loadAssests = function() {
	//-- Triggered from HTML pg script
	controller.setLangImagePath();
	if (audioLoaded) {
		var loadfiles = 0;
		var FileToLoad
		if(model.subPageInnerFlg){
			FileToLoad=model.modArr[model.currTopic][model.currMod][model.currPage][model.subcurrPage][model.subInnercurrPage]
		}else if(model.subPageFlg){
			FileToLoad=model.modArr[model.currTopic][model.currMod][model.currPage][model.subcurrPage]
		}else{
			FileToLoad=model.modArr[model.currTopic][model.currMod][model.currPage]
		}
		totalScripts = (FileToLoad.scripts).split(",");
		// console.log("[Controller] loadAssests complete" + totalScripts);
		if (totalScripts.length == 1) {
			if (searchPath(totalScripts[0]) == -1) {
				var scriptPath = model.scriptPath + totalScripts[0].trim();
			} else {
				var scriptPath = totalScripts[0].trim();
			}
			// console.log("[Controller] loadAssests scriptPath" + scriptPath);
			$.getScript("" + scriptPath).done(function(script, textStatus) {
				loadfiles++;
				loadedAssestsCnt++;
				//alert('script Loaded' + scriptPath);
				ProgressiveLoader.setLoadedAssetCount(loadedAssestsCnt);
				// console.log("[Controller]  script Load Success" + loadedAssestsCnt);
			});

		} else {
			controller.loadAdditionalAssests();
		}
		audioLoadPath();
	} else {
		setTimeout('controller.loadAssests()', 1000);
	}

};
Controller.prototype.loadAdditionalAssests = function() {
	
	var scriptPath = "";
	var loadfiles = 0;
	var FileToLoad
		if(model.subPageInnerFlg){
			FileToLoad=model.modArr[model.currTopic][model.currMod][model.currPage][model.subcurrPage][model.subInnercurrPage]
		}else if(model.subPageFlg){
			FileToLoad=model.modArr[model.currTopic][model.currMod][model.currPage][model.subcurrPage]
		}else{
			FileToLoad=model.modArr[model.currTopic][model.currMod][model.currPage]
		}
	var totalScripts = (FileToLoad.scripts).split(",");
	for (var i = 0; i < totalScripts.length; i++) {
		if (searchPath(totalScripts[i]) == -1) {
			//var scriptPath = model.scriptPath + totalScripts[i].trim();
		} else {
			scriptPath = totalScripts[i].trim();
		}
		if (scriptPath != "") {
			$.getScript("" + scriptPath).done(function(script, textStatus) {
				loadfiles++;
				if (loadfiles == (totalScripts.length - 1)) {
					controller.loadMainAssests();
				}
				loadedAssestsCnt++;
				// console.log("[Controller]  css Load Success" + loadedAssestsCnt);
				ProgressiveLoader.setLoadedAssetCount(loadedAssestsCnt);
			});
		}
	}

};
Controller.prototype.loadMainAssests = function() {
	var scriptPath = "";
	var FileToLoad
		if(model.subPageInnerFlg){
			FileToLoad=model.modArr[model.currTopic][model.currMod][model.currPage][model.subcurrPage][model.subInnercurrPage]
		}else if(model.subPageFlg){
			FileToLoad=model.modArr[model.currTopic][model.currMod][model.currPage][model.subcurrPage]
		}else{
			FileToLoad=model.modArr[model.currTopic][model.currMod][model.currPage]
		}
	var totalScripts = (FileToLoad.scripts).split(",");
	if (searchPath(totalScripts[totalScripts.length - 1]) == -1) {
		scriptPath = model.scriptPath + totalScripts[totalScripts.length - 1].trim();
	}
	if (scriptPath != "") {
		$.getScript("" + scriptPath).done(function(script, textStatus) {
			// console.log(textStatus + ":::::::::" + script);
		});
	}
};

Controller.prototype.loadStyles = function() {
	var totalPreAssests = PreAssests.split(".css");
	for (var i = 0; i < totalPreAssests.length; i++) {
		if (totalPreAssests[i] != "") {
			PreAssests = totalPreAssests[i] + ".css";
			controller.removePreAssests();
		}
	}
	PreAssests = "";
	styleLoading(0);
};

function styleLoading(loadCnt) {
	var totalStyles
		if(model.subPageInnerFlg){
			totalStyles=(model.modArr[model.currTopic][model.currMod][model.currPage][model.subcurrPage][model.subInnercurrPage].styles).split(",");
		}else if(model.subPageFlg){
			totalStyles=(model.modArr[model.currTopic][model.currMod][model.currPage][model.subcurrPage].styles).split(",");
		}else{
			totalStyles=(model.modArr[model.currTopic][model.currMod][model.currPage].styles).split(",");
		}
	//var totalStyles = (model.modArr[model.currTopic][model.currMod][model.currPage].styles).split(",");
	var loadfiles = loadCnt;
	var stylePath = "";
	if (searchPath(totalStyles[loadfiles]) == -1) {
		stylePath = model.CSSPath + totalStyles[loadfiles].trim();
	} else {
		stylePath = totalStyles[loadfiles].trim();
	}
	stylePath += '?style=' + Math.random();
	var assestPreload = $.ajax(stylePath).done(function() {
		// $('<link rel="stylesheet" type="text/css" href=' + stylePath + '>').appendTo("head");
		// $('head').append('<link rel="stylesheet" type="text/css" href=' + stylePath + '>');
		//-- Append first and then add href attr - so it works fine on IE9
		$('<link>').appendTo('head').attr({
			type : 'text/css',
			rel : 'stylesheet'
		}).attr('href', stylePath);

		loadfiles++;
		if (loadfiles == (totalStyles.length)) {
			loadedAssestsCnt++;
			// console.log("[Controller] css Load Success" + loadedAssestsCnt);
			ProgressiveLoader.setLoadedAssetCount(loadedAssestsCnt);
			setTimeout('preloadingDone()', 50);
		} else {
			// console.log(loadfiles + ":else:" + totalStyles.length);
			loadedAssestsCnt++;
			// alert('css Loaded' + stylePath);
			// console.log("[Controller] css Load Success" + loadedAssestsCnt);
			ProgressiveLoader.setLoadedAssetCount(loadedAssestsCnt);
			styleLoading(loadfiles);
		}
	});
	PreAssests += totalStyles[loadfiles].trim();
}

function searchPath(path) {
	var str = "/";
	var index = path.search(str);
	return index;
}

Controller.prototype.fnMouseOver = function(e) {
	e.stopPropagation();
	// console.log('[Controller fnMouseOver] @ ' + e.currentTarget.id);
	switch(e.currentTarget.id) {
	case "shell_mod_title_bar":
		if (!pageTitle) {
			return;
		}
		if (pageTitleTimer) {
			clearTimeout(pageTitleTimer);
		}
		$(".CourseTitle-TT").fadeOut();
		$(".PageTitle-TT").fadeIn();
		if (device.iPhone() || device.Android() || device.iPad()) {
			pageTitleTimer = setTimeout(function() {
				$(".PageTitle-TT").fadeOut();
			}, titleDuration);
		}
		break;
	case "modTitle":
		if (!moduleTitle) {
			return;
		}
		if (modTitleTimer) {
			clearTimeout(modTitleTimer);
		}
		$(".PageTitle-TT").fadeOut();
		$(".CourseTitle-TT").html(moduleTitleTxt);
		$(".CourseTitle-TT").fadeIn();
		if (device.iPhone() || device.Android() || device.iPad()) {
			modTitleTimer = setTimeout(function() {
				$(".CourseTitle-TT").fadeOut();
			}, titleDuration);
		}
		break;
	default:
	}
};

Controller.prototype.fnMouseOut = function(e) {
	e.stopPropagation();
	// console.log('[Controller fnMouseOut] @ ' + e.currentTarget.id);
	switch(e.currentTarget.id) {
	case "shell_mod_title_bar":
		if (!pageTitle) {
			return;
		}
		pageTitleTimer = setTimeout(function() {
			$(".PageTitle-TT").fadeOut();
		}, titleDuration);
		break;
	case "modTitle":
		if (!moduleTitle) {
			return;
		}
		modTitleTimer = setTimeout(function() {
			$(".CourseTitle-TT").fadeOut();
		}, titleDuration);
		break;
	default:
	}
};

Controller.prototype.ExitPopupFun = function(e) {
	if (!modCompleted) {
		$(".exitInsTxt").html(UITxtData.exitInsTxt.alt_text);
		$(".yesTxt").html(UITxtData.yesTxt.alt_text);
		$(".noTxt").html(UITxtData.noTxt.alt_text);
	} else {
		$(".exitInsTxt").html(UITxtData.exitInsTxt.text);
		$(".yesTxt").html(UITxtData.yesTxt.text);
		$(".noTxt").html(UITxtData.noTxt.text);
	}
		exitPop.show();
		popup_disable_bg.show();

		controller.audioPause();
		popupsOpenCheck()
};
Controller.prototype.fnClick = function(e) {
	e.stopPropagation();
	if ($(this).hasClass("GadgetDisable")) {
		return;
	}
	if ($(this).hasClass("disabled") || $(this).hasClass("deactive")) {
		return;
	}
	if ($(this).hasClass("funfactdisabled")) {
		return;
	}
	// console.log('[Controller] @ ' + e.currentTarget.id);
	switch(e.currentTarget.id) {
	case "shell_next":
		model.nextPage();
		callInitialAudio();
		break;
	case "shell_back":
		model.prevPage();
		callInitialAudio();
		break;
	case "shell_more":
		if($("#shell_more").hasClass("open")){
			$("#shell_more").removeClass("open")
		}else{
			$("#shell_more").addClass("open")
		}	
		$('#extraBtns').toggle('slide', {
				direction : "right"
		}, 500);
		break;
	
	case "closeglossPopup":
	
		$("#glossarybtn").removeClass("active");
		
		if (!device.MobileDevice()) {
			$("#glossaryDrp").slideToggle();
		}else{
			$("#glossaryDrp").toggle('slide', {
				direction : directionSide
			}, 500);			
		}
		model.menuOpenFlg=false
		popupsCloseCheck()
	break;
	case "glossarybtn":
	  $(".menuovrlay").css("display", "block");
            
            $(".menuovrlay").css("display", "block");
            $('#extraBtns').toggle('slide', {
                direction: "right"
            }, 500);
            menuControl(glossaryBtn, $("#glossarybtn"));
            if (!device.MobileDevice()) {
                $("#glossaryDrp").slideToggle();
            } else {
                $("#glossaryDrp").toggle('slide', {
                    direction: directionSide
                }, 500);
            }
            if (!$("#glossarybtn").hasClass("active")) {
                $("#glossarybtn").addClass("active");

                $("#alphbet_wraper").scrollTop(0);
                $('#alphbet_wraper').mCustomScrollbar();
                $(".glossList").scrollTop(0);
                $('.glossList').mCustomScrollbar();

            } else {
                $("#glossarybtn").removeClass("active");
                if ($("#alphbet_wraper").hasClass("mCustomScrollbar")) {
                    $('#alphbet_wraper').mCustomScrollbar("destroy");
                }
                if ($(".glossList").hasClass("mCustomScrollbar")) {
                    $('.glossList').mCustomScrollbar("destroy");
                }

            }
			
			if(!model.menuOpenFlg){
				popupsOpenCheck()
			}
		break;
	case "closeResouPopup":
	
		$("#Resourcesbtn").removeClass("active");
		
		if (!device.MobileDevice()) {
			$("#RsourcesDrp").slideToggle();
		}else{
			$("#RsourcesDrp").toggle('slide', {
				direction : directionSide
			}, 500);			
		}
		popupsCloseCheck()
	break;
	case "Resourcesbtn":
	popupsOpenCheck()
	$(".menuovrlay").css("display", "block");
		menuControl(Resourcebtn, $("#Resourcesbtn"));
		if (!device.MobileDevice()) {
			//$("#RsourcesDrp").slideToggle();
			$("#RsourcesDrp").slideToggle("slow", function() {
				if (preMenu == "" || preMenuID == "") {
					$("#Shell_menu").slideToggle("slow", function() {
						//iPadDebug1("::Here5::");
						controller.gadgetsBtnEnable();
					});
				}
			});
		} else {
			$("#RsourcesDrp").toggle('slide', {
				direction : directionSide
			}, 500);
		}
		if (!$("#Resourcesbtn").hasClass("active")) {
			$("#Resourcesbtn").addClass("active");
		} else {
			$("#Resourcesbtn").removeClass("active");
		}

		break;
	case "closeHelpPopup":
		$("#helpbtn").removeClass("active");
		
		if (!device.MobileDevice()) {
			$("#helpDrp").slideToggle();
		}else{
			$("#helpDrp").toggle('slide', {
				direction : directionSide
			}, 500);			
		}
		popupsCloseCheck()
		break;
	case "helpbtn":
		popupsOpenCheck()
		$(".menuovrlay").css("display", "block");
		$("#shell_more").removeClass("open")
		menuControl(helpBtn, $("#helpbtn"));
		$('#extraBtns').toggle('slide', {
				direction : "right"
		}, 500);
		if (!device.MobileDevice()) {
			//$("#helpDrp").slideToggle();
			/*$("#helpDrp").slideToggle("slow", function() {
				if (preMenu == "" || preMenuID == "") {
					$("#helpDrp").slideToggle("slow", function() {
						//iPadDebug1("::Here6::");
						controller.gadgetsBtnEnable();
					});
				}
			});*/
			$("#helpDrp").slideToggle();
		} else {
			$("#helpDrp").toggle('slide', {
				direction : directionSide
			}, 500);
		}
		if (!$("#helpbtn").hasClass("active")) {
			$("#helpbtn").addClass("active");
			$(".Shellhelp").mCustomScrollbar();
			$(".Shellhelp").mCustomScrollbar("update");
		} else {
			$("#helpbtn").removeClass("active");
			if ($("#helpDrp").hasClass("mCustomScrollbar")) {
				$('.Shellhelp').mCustomScrollbar("destroy");
			}
		}
		break;
	case "shell_mute":
		//alert("::here::" + $("#shell_mute").hasClass("active"));
		controller.audioMuteToggle();
		if (!$("#shell_mute").hasClass("active")) {
			$("#shell_mute").addClass("active");
			if ($("#audio_Icon").hasClass("icon-audio_on")) {
				$("#audio_Icon").removeClass("icon-audio_on").addClass("icon-audio_off");
			}
			$("#audio_Icon").addClass("icon-audio_off");
		} else {
			$("#shell_mute").removeClass("active");
			if ($("#audio_Icon").hasClass("icon-audio_off")) {
				$("#audio_Icon").removeClass("icon-audio_off").addClass("icon-audio_on");
			}
		}
		gadgetsBtn.trigger("click", this.fnClick);

		break;
	case "audio_Icon":
		controller.audioMuteToggle();
		//alert($("#shell_mute").hasClass("active"));
		if (!$("#audio_Icon").hasClass("active")) {
			$("#audio_Icon").addClass("active");
			if ($("#audio_Icon").hasClass("icon-audio_on")) {
				$("#audio_Icon").removeClass("icon-audio_on").addClass("icon-audio_off");
			}
			$("#audio_Icon").addClass("icon-audio_off");
			
		} else {
			$("#audio_Icon").removeClass("active");
			if ($("#audio_Icon").hasClass("icon-audio_off")) {
				$("#audio_Icon").removeClass("icon-audio_off").addClass("icon-audio_on");
			}
		}
		//gadgetsBtn.trigger("click", this.fnClick);

		break;
	case "shell_transcript":
		$("#shell_more").removeClass("open")
		$('#extraBtns').toggle('slide', {
				direction : "right"
		}, 500);
		gadgetsBtn.trigger("click", this.fnClick);
		toggleTranscript();
		break;

	case "shell_glossary_phone":
		glossaryBtn.trigger("click", this.fnClick);
		break;
	case "Resourcesbtn_phone":
		resourcesBtn.trigger("click", this.fnClick);
		break;
	case "helpbtn_phone":
		helpBtn.trigger("click", this.fnClick);
		break;
	case "shell_note_phone":
		noteBtn.trigger("click", this.fnClick);
		break;
	case "shell_transcript_phone":
		transcriptBtn.trigger("click", this.fnClick);
		break;
	case "shell_exit":
		controller.ExitPopupFun()
	break;
	case "power_exit":
		controller.ExitPopupFun()
	break;
	case "Mob_shell_exit":
		if (!modCompleted) {
			$(".exitInsTxt").html(UITxtData.exitInsTxt.alt_text);
			$(".yesTxt").html(UITxtData.yesTxt.alt_text);
			$(".noTxt").html(UITxtData.noTxt.alt_text);
		} else {
			$(".exitInsTxt").html(UITxtData.exitInsTxt.text);
			$(".yesTxt").html(UITxtData.yesTxt.text);
			$(".noTxt").html(UITxtData.noTxt.text);
		}
		exitPop.show();
		popup_disable_bg.show();
		controller.audioPause();
		popupsOpenCheck()
		break;
	case "shell_yes_btn":
		finish();
		window.top.close();
		// 	window.location.reload();
		window.close() ;
		popup_disable_bg.show();
		break;
	case "shell_no_btn":
		exitPop.hide();
		popup_disable_bg.hide();
		if ($('#gadgetsButn .play').hasClass("playing")) {
			controller.audioResume();
		}
		popupsCloseCheck()
		break;
	case "shell_g_close":
		glossaryPop.hide();
		popup_disable_bg.hide();
		model.menuOpenFlg=false
		//$("#shell_GlossaryAlphabets").scrollTop(0);
		if ($("#transText").hasClass("mCustomScrollbar")) {
			$('#shell_GlossaryAlphabets').mCustomScrollbar("destroy");
		}
		if ($(".gadeget_item").css("left") == "0px") {
		} else if ($('.navigator .play').hasClass('playing')) {// || pg_snd.position == null) {
			controller.audioResume();
		}
		controller.gadgetsBtnEnable();
		break;
	case "shell_r_close":
		resourcesPop.hide();
		popup_disable_bg.hide();
		if ($(".gadeget_item").css("left") == "0px") {
		} else if ($('.navigator .play').hasClass('playing')) {// || pg_snd.position == null) {
			controller.audioResume();
		}
		controller.gadgetsBtnEnable();
		break;
	case "shell_h_close":
		helpPop.hide();
		popup_disable_bg.hide();
		if ($('.navigator .play').hasClass('playing')) {// || pg_snd.position == null) {
			controller.audioResume();
		}
		break;
	case "shell_n_close":
		notePop.hide();
		popup_disable_bg.hide();
		controller.audioResume();
		break;
	case "shell_e_close":
		exitPop.hide();
		popup_disable_bg.hide();
		controller.audioResume();
		break;
	case "shell_m_close":
		// gadgetsBtn.trigger("click", this.fnClick);
		hotBtn.trigger("click", this.fnClick);
		if ($(".gadeget_item").css("left") == "0px") {
		} else if ($('.navigator .play').hasClass('playing')) {
			controller.audioResume();
		}
		controller.gadgetsBtnEnable();
		break;
	case "contnuBtn":
		$(".NV_tour_overlay").css("display", "none");
		controller.audioResume();
		break;
	
	case "FFBackBtn":
		if (device.MobileDevice() || device.Android()) {
			$(".FunFactWapr").css("display", "none");
			$(".FunFactcontntWapr").css("display", "none");
			if ($("#gadgetsButn").hasClass("close")) {

			} else {
				if ($('#gadgetsButn .play').hasClass("playing")) {
					controller.audioResume();
				}
			}
			/*if (isFunFacts) {
				$("#funFactBtn").removeClass("funfactdisabled").addClass("funfactenabled");
			}*/
		} else {
			videoBack = true;
			FFVideo.currentTime = 8.7;
			FFVideo.play();
		}
		controller.gadgetsBtnEnable();
		break;
	case "FFMBtn":
		gadgetsBtn.trigger("click", this.fnClick);
		controller.gadgetsBtnDisable();
		if ($('#gadgetsButn .play').hasClass("playing")) {
			audioPlayer.pauseAudio();
		}
		$(".FunFactcontntWapr").css("display", "none");
		$(".FunFactWapr").css("display", "block");
		$(".FunFactcontntWapr").css("display", "block");
		$(".FunFactQuoteInner p").html(FFDataArr[FFRandomArr[FFDataCnt]]);
		$(".FunFactQuoteInner").mCustomScrollbar();
		$(".FunFactQuoteInner").mCustomScrollbar("update");
		FFDataCnt++;
		if (FFDataCnt == FFRandomArr.length) {
			FFDataCnt = 0;
		}
	/*	if (isFunFacts) {
			$("#funFactBtn").removeClass("funfactdisabled").addClass("funfactenabled");
		}*/
		break;
	case "HomeBtn":
		model.currPage=0
		$(".Footer").css("display", "none")
		$(".menuovrlay").css("display", "none");
		/*$("#menubtn").removeClass("active");
		$("#Menudrp").toggle('slide', {
				direction : directionSide
			}, 500);*/
			$(".customMenuWrapperImage").css('display', 'block');
		$("#customMenu").css("display", "block")
		popupsOpenCheck()
		model.menuOpenFlg=false
		percetageCircleCalculation()
		pageContiner.html("");
	break;	
		
	case "closeMenuPopup":
		menuCommonCloseFun()
	break;
	case "menubtn":
		if(!model.menuOpenFlg){
			popupsOpenCheck();
			model.menuOpenFlg=true
		}
		if (!device.MobileDevice()) {
			$("#shell_mod_0_pages").mCustomScrollbar();
			$("#shell_mod_0_pages").mCustomScrollbar("update");
			if($('#Shell_menu').css("display") == "none"){
				$('#Shell_menu').css("display", "block");
			}else{
				for (var i = 0; i < 20; i++) {
					if(model.currMod!=i){
						//$("#shell_mod_" + i + "_pages").slideUp('slow');
					}
				}
					
			}
			
			$("#Menudrp").toggle("slide", {
						direction : directionSide
					}, 500, function() {
				if (preMenu == "" || preMenuID == "") {
					$("#Shell_menu").toggle("slide",{
						direction : directionSide
					}, 500, function() {						
						if (pageLoadingAnim) {
							controller.gadgetsBtnEnable();
						}
						fnLoadMenu();
						/*if(pageLoad)
						 {
						 controller.gadgetsBtnEnable();
						 }*/
					});
					//iPadDebug1("::Here2::");
				} 
				
				$("#parentMenu").css("display", "block");
				$("#parentMenu").mCustomScrollbar();
				$("#parentMenu").mCustomScrollbar("update");
				if(model.subPageInnerFlg){
					$("#parentMenu").mCustomScrollbar("scrollTo",".innerpagActive");
				}else if(model.subPageFlg){
					$("#parentMenu").mCustomScrollbar("scrollTo",".subpagActive");
				}else{
					$("#parentMenu").mCustomScrollbar("scrollTo",".Active");
				}
				$(".nav_help_pop_wrap").mCustomScrollbar("scrollTo",".Active");
			});
		} else {
			$("#Menudrp").toggle('slide', {
				direction : directionSide
			}, 500, function(){
				$(".nav_help_pop_wrap").mCustomScrollbar("scrollTo",".Active");
			});
		}
		menuControl(menuBtn, $("#menubtn"));
		if (!$("#menubtn").hasClass("active")) {
			$("#menubtn").addClass("active");
			$("#ShellMenu").mCustomScrollbar("destroy");
			$("#ShellMenu").mCustomScrollbar("disable");
			$("#shell_mod_0_pages").scrollTop(0);
			$("#ShellMenu").mCustomScrollbar();
			$("#ShellMenu").mCustomScrollbar("update");
			if ($('#gadgetsButn .play').hasClass("playing")) {
				controller.audioPause();
			}

		} else {
			if ($("#ShellMenu").hasClass("mCustomScrollbar")) {
				$("#ShellMenu").mCustomScrollbar("destroy");
			}
			$("#menubtn").removeClass("active");
			if ($('#gadgetsButn .play').hasClass("playing")) {
				//iPadDebug1("::HereA::");
				controller.audioResume();
			}

		}
		if($("#menubtn").hasClass("active")){
			$(".menuovrlay").css("display", "block");
		}
		 if($("#shell_more").hasClass("open")){
			 $('#extraBtns').toggle('slide', {
						direction : "right"
				}, 500);
			$("#shell_more").removeClass("open")
		}
		
		$(".dropdown .submenu ").css("display", "none")
		$(".dropdown").find('a').removeClass('openItem');
		$(".submenu").removeClass('closed');
		$("#shell_mod_"+model.currMod+"_title").addClass('openItem');
		
		for (var i = 0; i < model.ModuleTitleArr[model.currTopic].length; i++) {
			$("#shell_mod_"+i).addClass('l1closed');
		}
		$(".subLevel").addClass('l2closed');
		$(".subInnerLevel").addClass('l3closed');
		model.tmpMenuClick=model.currMod
		$("#shell_mod_"+model.currMod).removeClass('l1closed');
		
		if(model.subPageInnerFlg){
			$("#Mod_"+model.currMod+"_page_"+model.currPage+"_Spage_"+model.subcurrPage).addClass('openItem');
			$("#Mod_"+model.currMod+"_pages_"+model.currPage+"_SubPage").addClass('closed').css("display", "block");
			$("#Mod_"+model.currMod+"_pages_"+model.currPage+"_SubPage_"+model.subcurrPage+"_InnerPage").addClass('closed').css("display", "block");
			$("#subPage_"+model.currMod+"_"+model.currPage+"_"+model.subcurrPage).removeClass('l3closed');
		}
		
		if(model.subPageFlg){
			$("#Mod_"+model.currMod+"_pages").addClass('closed').css("display", "block");
			$("#Mod_"+model.currMod+"_page_"+model.currPage).addClass('openItem');
			$("#Mod_"+model.currMod+"_pages_"+model.currPage+"_SubPage").addClass('closed').css("display", "block");
			$("#subPage_"+model.currMod+"_"+model.currPage).removeClass('l2closed');
		}
		
		if(!model.subPageInnerFlg && !model.subPageFlg){
			$("#Mod_"+model.currMod+"_pages").addClass('closed').css("display", "block");
		}
		break;
	default:
	//code to be executed if n is different from case 1 and 2
	}
};

function MenuOpenCloseFun(){
	if(model.subPageInnerFlg){
			//updateMenuSlides(model.currTopic, model.currMod, model.currPage, model.subcurrPage)
		}else if(model.subPageFlg){
			//updateMenuSlides(model.currTopic, model.currMod, model.currPage,  "")
		}else{
			//updateMenuSlides(model.currTopic, model.currMod, "",  "")
		}
	$("#shell_mod_0_pages").css("display", "block")
}

var FFIpadEvent = 0;
var watchBuffer = 0;

function menuCommonCloseFun(){
	model.menuOpenFlg=false
	$(".menuovrlay").css("display", "none");
	$("#menubtn").removeClass("active");
	if (!device.MobileDevice()) {
		$("#Menudrp").toggle('slide', {
			direction : directionSide
		}, 500);	
	}else{
		$("#Menudrp").toggle('slide', {
			direction : directionSide
		}, 500);			
	}
	menu.ReassignCurrentPageNofun()
	MenuOpenCloseFun();
	popupsCloseCheck()
}

function popupsOpenCheck(){
	//$('#Shell_menu').css("display", "block");
	try {
        if(model.videoFlg){
			video = $('#video');
			if(video[0].paused){
				model.videoPlayingStatus=false
			}else{
				model.videoPlayingStatus=true
			}
			$('.btnPlay').removeClass('paused');
			video[0].pause();	
		}else{
			if ($('#gadgetsButn .play').hasClass("playing")) {
				controller.audioPause();
			}
		}
    } catch (err) {

    }
	if (device.MobileDevice()) {
		controller.menuBtnsControlDisable();
		//$(".menuovrlay").css("display", "block");
	} else {
		//$(".menuovrlay").css("display", "block");
	}
	
	$("#gadgetsButn").addClass("close");
	if (device.iPhone()) {
		fnVideoControlsDisable();
	}
}

function popupsCloseCheck(){
	$("#gadgetsButn").removeClass("close");
	$(".menuovrlay").css("display", "none");
	//resetMenu();
	try {
        if(model.videoFlg){
			video = $('#video');
			if(video[0].paused && !video[0].ended &&(model.videoPlayingStatus)){
				$('.btnPlay').addClass('paused');
				video[0].play();
			}else{
				$('.btnPlay').removeClass('paused');
				video[0].pause();				
			}
		}else{
			if ($('#gadgetsButn .play').hasClass("playing")) {
				//iPadDebug1("::HereA::");
				controller.audioResume();
			}
		}
    } catch (err) {

    }
	
	
	
	if (device.MobileDevice()) {
		if (pageLoadingAnim) {
			controller.menuBtnsControlEnable();
		}
		//$(".menuovrlay").css("display", "none");
	} else {

		//$(".menuovrlay").css("display", "none");
	}
	if (device.iPhone()) {
		fnVideoControlsEnable();
	}
}
function fnLoadMenu() {
	$("#Menudrp").slideToggle("slow", function() {
		if (preMenu == "" || preMenuID == "") {
			//$("#Shell_menu").slideToggle();
		}
		controller.gadgetsBtnEnable();
	});
	menuControl(menuBtn, $("#menubtn"));
	if (!$("#menubtn").hasClass("active")) {
		$("#menubtn").addClass("active");
		$("#shell_mod_0_pages").scrollTop(0);
		$("#ShellMenu").mCustomScrollbar();
		$("#ShellMenu").mCustomScrollbar("update");

	} else {
		if ($("#ShellMenu").hasClass("mCustomScrollbar")) {
			$("#ShellMenu").mCustomScrollbar("destroy");
		}
		$("#menubtn").removeClass("active");

	}
}

function updateFFCT() {
	//iPadDebug('[FF]' + FFVideo.readyState);
	if (FFVideo.readyState == 4) {
		ffVidLoop(false);
	}
}

function FFVideoControl() {
	watchBuffer = setInterval(updateProgressBar, 500);
	FFVideo.ontimeupdate = function() {
		ffVidLoop(true);
	};
}

function ffVidLoop(isDesktop) {
	var videoDuration = FFVideo.duration;
	var buffered = FFVideo.buffered.end(0);
	//FFVideo.currentTime = 0.1;
	var percent = 100 * buffered / videoDuration;
	if (FFVideo.currentTime > 8.1 && !videoBack) {
		//-- Anim Loop
		FFVideo.currentTime = 2;
		if (isDesktop) {
			FFVideo.play();
		}
	} else if (FFVideo.currentTime > 0.85 && !videoBack) {
		//-- Show Text
		$(".FunFactcontntWapr").css("display", "block");
	} else if (FFVideo.currentTime >= 8.2) {
		//-- Hide Text
		$(".FunFactcontntWapr").css("display", "none");
	}
	// console.log(FFVideo.currentTime + " :: " + FFVideo.duration);
	if (FFVideo.currentTime >= FFVideo.duration) {
		$(".FunFactcontntWapr").css("display", "none");
		$(".FunFactWapr").css("display", "none");
		if (!isDesktop) {
			clearInterval(FFIpadEvent);
		}
		//controller.gadgetsBtnEnable();
		/*if (isFunFacts) {
			$("#funFactBtn").removeClass("funfactdisabled").addClass("funfactenabled");
		}*/
		$(".FunFactWapr").css("display", "none");
		if ($(".FunFactQuoteInner").hasClass("mCustomScrollbar")) {
			$(".FunFactQuoteInner").mCustomScrollbar("destroy");
		}
		if ($("#gadgetsButn").hasClass("close")) {

		} else {
			if ($('#gadgetsButn .play').hasClass("playing")) {
				controller.audioResume();
			}
		}
	}
}

var updateProgressBar = function() {
	var videoDuration = FFVideo.duration;
	//alert("updateProgressBar::" + videoDuration+"::"+FFVideo.readyState);
	if (FFVideo.readyState) {
		var buffered = FFVideo.buffered.end(0);
		var percent = 100 * buffered / videoDuration;
		// console.log(buffered + "::videoDuration::" + videoDuration);
		//-- If finished buffering buffering quit calling it
		if (buffered >= videoDuration) {
			//alert("videoLoaded");
			clearInterval(watchBuffer);
		}
	}
};

function menuControl(currEventID, currID) {
	if (preMenu == currEventID || preMenu == "") {
		//return;
	} else {
		if (preMenuID.hasClass("active")) {
			preMenu.trigger("click", this.fnClick);
		}
	}
	preMenu = currEventID;
	preMenuID = currID;
}

function resetMenu() {
	if (preMenu == "" || preMenuID == "") {
		return;
	} else {
		if (preMenuID.hasClass("active")) {
			preMenu.trigger("click", this.fnClick);
		}
	}
	preMenu = "";
	preMenuID = "";
}

Controller.prototype.menuBtnsControlToggle = function() {
	if (!nxtBakDisable) {
		var shellButtons = [$("#shell_next"), $("#shell_back"), $(".play"), $(".scrubber"), $("#transcript")];
	} else {
		var shellButtons = [$(".play"), $(".scrubber"), $("#transcript")];
	}
	for (var i = 0; i < shellButtons.length; i++) {
		if (shellButtons[i].hasClass("deactive")) {
			shellButtons[i].removeClass("deactive").css("pointer-events", "auto");;
		} else {
			shellButtons[i].addClass("deactive").css("pointer-events", "none");;
		}
	}
	if (!device.MobileDevice()) {
		if ($("#transcript").hasClass("deactive")) {
			$("#transcript").draggable({
				disabled : true
			});

		} else {
			if (!device.AndroidPhone() && !device.AndroidTablet()) {
				$("#transcript").draggable({
					disabled : false
				});
			}
		}
	};
};

Controller.prototype.nextBackDisable = function() {
	nxtBakDisable = true;
	var shellButtons = [$("#shell_next"), $("#shell_back")];
	for (var i = 0; i < shellButtons.length; i++) {
		if (!shellButtons[i].hasClass("deactive")) {
			shellButtons[i].addClass("deactive").addClass("disabled").css("pointer-events", "none");;
			
		}
	}

};
Controller.prototype.nextBackEnable = function() {
	nxtBakDisable = false;
	var shellButtons = [$("#shell_next"), $("#shell_back")];
	for (var i = 0; i < shellButtons.length; i++) {
		if (shellButtons[i].hasClass("deactive")) {
			shellButtons[i].removeClass("deactive").removeClass("disabled").css("pointer-events", "auto");;
		}
	}
};

Controller.prototype.assesnavBtnsControlDisable = function() {
	controller.morButtonResetFun();
		var shellButtons = [$(".summaryBtn"),$("#summarypageBtn"), $("#shell_next"), $("#shell_back"), $("#menubtn"), $("#glossarybtn"), $("#Resourcesbtn"), $("#helpbtn"), $(".replay"), $("#shell_transcript"), $("#HomeBtn"), $("#replay_Icon")];
	
	$(".scrubber").css("cursor", "default").css("pointer-events", "none")
	for (var i = 0; i < shellButtons.length; i++) {
		shellButtons[i].addClass("deactive").addClass("disabled").css("pointer-events", "none");;
	}
	//if (!device.MobileDevice() && !device.Android()) {
	if (!device.MobileDevice()) {

		//$("#transcript").draggable('enable');
		if (!device.AndroidPhone() && !device.AndroidTablet()) {
			$("#transcript").draggable({
				disabled : false
			});
		}
	}
};
Controller.prototype.assesNavBtnsControlEnable = function() {
	if (!nxtBakDisable) {
		var shellButtons = [$(".summaryBtn"), $("#summarypageBtn"), $("#shell_next"), $("#shell_back"), $("#menubtn"), $("#glossarybtn"), $("#Resourcesbtn"), $("#helpbtn"),$("#HomeBtn"), $("#replay_Icon")];
	} else {
		var shellButtons = [$(".play"), $(".scrubber"), $("#transcript")];
	}

	for (var i = 0; i < shellButtons.length; i++) {
		shellButtons[i].removeClass("deactive").removeClass("disabled").css("pointer-events", "auto");;
	}
	if ((model.currTopic == 0) && (model.currPage == 0) && (model.currMod == 0)){
		if(((model.subInnercurrPage==-1)||(model.subInnercurrPage==0))&&((model.subcurrPage==-1)||(model.subcurrPage==0))){
			backBtn.addClass("deactive").addClass("disabled").css("pointer-events", "none");;
		}else{
			backBtn.removeClass("deactive").removeClass('disabled').css("pointer-events", "auto");
		}
		
	} else {
		backBtn.removeClass("deactive").removeClass('disabled').css("pointer-events", "auto");
	}
	
	if (model.currTopic == (model.tTopics-1) && model.currMod == (model.tModulesArr[model.tTopics-1]-1) && model.currPage == (model.tPagesArr[model.tTopics-1][model.tPagesArr[model.tTopics-1].length-1]-1)) {
		$("#shell_next").addClass("deactive").addClass("disabled").css("pointer-events", "none");;
	}
	//if (!device.MobileDevice() && !device.Android()) {
	if (!device.MobileDevice()) {

		//$("#transcript").draggable('enable');
		if (!device.AndroidPhone() && !device.AndroidTablet()) {
			$("#transcript").draggable({
				disabled : false
			});
		}
	}
};



function hideIText(el) {
	TweenLite.set(el, {
		clearProps : 'all'
	});
	el.hide();
}

function animateIText() {
	if (!device.Android() && !device.iPhone() && !device.iPad()) {
		$("#clickText").html("Click");
	} else {
		$("#clickText").html("Tap");
	}
}

function naturalSize() {
	var myContent = document.getElementById('iVideoWrap');
	myVideo.height = FFVideo.videoHeight;
	myVideo.width = FFVideo.videoWidth;
	//if the video is bigger than the container it'll fit
	ratio = FFVideo.videoWidth / FFVideo.videoHeight;
	if (parseInt(myContent.offsetWidth, 10) < FFVideo.videoWidth) {
		FFVideo.height = FFVideo.videoHeight * parseInt(myContent.offsetWidth, 10) / FFVideo.videoWidth;
		FFVideo.width = parseInt(myContent.offsetWidth, 10);
	}
}

// register listener function on metadata load
function ffVidListener() {
	var ffVid = document.getElementById('bgvid_ipad');
	ffVid.addEventListener('loadedmetadata', naturalSize, false);
}

function fnVideoControlsDisable() {

	if ($('.videoContainer video source').attr('src')) {
		$('.videoContainer').css('display', 'none');
	}
}

function fnVideoControlsEnable() {
	$('.videoContainer').css('display', 'block');
}

Controller.prototype.createResourcesList = function() {
	if (isResources == "true" || isResources == true) {
		$('#RsourcesDrp .resoCol ul').html("");
		var menu1=""
		var menu2=""
		var menu3=""
		for (var i = 0; i < resourceTitlesArr.length; i++) {
			if(i==0){
				
				 menu1+='<li class="' + resourceIconArr[i] + ' menu1">' + resourceTitlesArr[i] + '</li>'
			}else if(i<=6){
				menu2+= '<li class="' + resourceIconArr[i] + '"><a href="' + resourceDataArr[i] + '" target="_blank">' + resourceTitlesArr[i] + '</a></li>';	
			} else if(i>6){
				 menu3+= '<li class="' + resourceIconArr[i] + '"><a href="' + resourceDataArr[i] + '" target="_blank">' + resourceTitlesArr[i] + '</a></li>';
			}
			
		}
		
		var menu4="<ul>"+ menu2+ "</ul>"
		$("#RsourcesDrp ul").append(menu1)
		$("#RsourcesDrp .menu1").append(menu4)
		$("#RsourcesDrp #maincontent").append(menu3)
		
		//$("#RsourcesDrp ul").append('<li class="' + resourceIconArr[i] + '"><a href="' + resourceDataArr[i] + '" target="_blank">' + resourceTitlesArr[i] + '</a></li>');
	}
};
function iPadDebug1(msg) {
	if ($('.pageTitle > p').hasClass('debug')) {
		$('.pageTitle > p').append('<br>' + msg);
	} else {
		$('.pageTitle').append('<p class="debug" style="color: #FF0000; text-align: left; text-shadow: 1px 1px 2px #000000; max-height: 470px; overflow-y: auto; position: absolute; top: 0px; width: 50%; z-index: 2000">Debug:<br>' + msg + '</p>');
	}
}

