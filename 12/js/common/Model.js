var Model = function() {
	this.currTopic=0
	this.currMod = 0;
	this.currPage = 0;
	this.subcurrPage=-1
	this.subInnercurrPage=-1
	this.ModulePercentCalcArr=[]
	this.TopicPercentCalcArr=[]
	this.topicCompletionArr=[]
	this.moduleCompletionArr=[]
	this.pageCompletionArr=[]
	this.subPageCompletionArr=[]
	this.subInnerPageCompletionArr=[]
	this.modArr = [];
	this.AudioPresent=false
	this.totalPages=0
	this.TopicTitleArr=[]
	this.ModuleTitleArr=[]
	this.PageTitleArr=[]
	this.SubPageTitleLevel1Arr=[]
	this.SubPageTitleLevel2Arr=[]
	this.tTopics=0;
	this.tModulesArr=[]
	this.tPagesArr=[];
	this.subL1PagesArr=[];
	this.subL2PagesArr=[];
	this.ModuleCompArr=[];
	this.subPageL1=[]
	this.subInnerPageL2=[]
	this.customMenuFirstTrigger=false
	this.videoFlg=false;
	this.ContentVisibleFlg=false;
	this.videoPlayingStatus=false;
	this.menuOpenFlg=false
	this.assesmentPage=false
	this.prePostTestScorArr=[]
	this.prePostTestAttemptArr=[]
	this.completionPercentage=0
	this.wheelCompletionPercentage=0
	this.wheelpreviousPercentage=1
	this.percentageWheelIncrease=0
	this.totalTopicCompleted=0
	this.BookmarkFlg=false
	this.CourseComplete=false
	this.audioName=""
	this.volumeValue=1
	this.audioMuted=false
	this.firstLaunchIpad=false
	this.pageLoaded=false
	//13, 6, 2
	this.visitedArr = [];
	this.events_Obj = [];
	this.scormHandler = new SCORMHandler();
	this.allPageVisited=false
	//-- learningType: possible values: linear, non-linear;
	//this.learningType = "non-linear";
	//this.learningType = "linear";
	this.firstTimeVisited = false;
	this.totalScore;
	this.reatemptFirstTime=false;
	this.configdata = xmlParser.getXml("config/config.xml");
	this.assesmentTryCount=0;
	this.subPageFlg=false;
	this.subPageInnerFlg=false;
	this.tmpMenuClick=""
	this.tmpMenuClickFlg=false
	this.deployMode = this.configdata.getElementsByTagName("config")[0].getElementsByTagName("isDeploy")[0].getAttribute("val");
	if (this.deployMode == "@isDeploy@") {
		this.moduleName = this.configdata.getElementsByTagName("config")[0].getElementsByTagName("module")[0].getAttribute("val");
		this.langName = this.configdata.getElementsByTagName("config")[0].getElementsByTagName("lang")[0].getAttribute("val");
	} else {
		this.moduleName = this.configdata.getElementsByTagName("config")[0].getElementsByTagName("moduleDeploy")[0].getAttribute("val");
		this.langName = this.configdata.getElementsByTagName("config")[0].getElementsByTagName("langDeploy")[0].getAttribute("val");
	}

	this.menuData = xmlParser.getXml("config/" + this.moduleName + "course.xml");
	this.pagePath = this.menuData.getElementsByTagName("config")[0].getElementsByTagName("pagePath")[0].getAttribute("data") + this.moduleName;
	this.audioPath = this.menuData.getElementsByTagName("config")[0].getElementsByTagName("audioPath")[0].getAttribute("data") + this.moduleName + this.langName;
	this.commonaudioPath = this.menuData.getElementsByTagName("config")[0].getElementsByTagName("commonaudioPath")[0].getAttribute("data") + this.langName;
	this.CourseTitleText= this.menuData.getElementsByTagName("config")[0].getElementsByTagName("coureTitle")[0].getAttribute("data") ;
	try {
		this.imagePath = this.menuData.getElementsByTagName("config")[0].getElementsByTagName("imagePath")[0].getAttribute("data");
	} catch(err) {
		this.imagePath = "";
	}

	this.videoPath = this.menuData.getElementsByTagName("config")[0].getElementsByTagName("videoPath")[0].getAttribute("data") + this.moduleName + this.langName;
	this.dataPath = this.menuData.getElementsByTagName("config")[0].getElementsByTagName("dataPath")[0].getAttribute("data") + this.moduleName + this.langName;
	this.scriptPath = this.menuData.getElementsByTagName("config")[0].getElementsByTagName("scriptPath")[0].getAttribute("data") + this.moduleName + this.langName;
	this.CSSPath = this.menuData.getElementsByTagName("config")[0].getElementsByTagName("cssPath")[0].getAttribute("data") + this.moduleName + this.langName;
	this.commondataPath = this.menuData.getElementsByTagName("config")[0].getElementsByTagName("commonDataPath")[0].getAttribute("data") + this.langName;
	this.commonJsPath=this.menuData.getElementsByTagName("config")[0].getElementsByTagName("commonJsPath")[0].getAttribute("data");
	this.mainData = this.menuData.getElementsByTagName("config")[0].getElementsByTagName("maindata")[0].getAttribute("data");
	this.learningType = this.menuData.getElementsByTagName("config")[0].getElementsByTagName("learningType")[0].getAttribute("data");
	try {
		this.transcriptEnabled = this.menuData.getElementsByTagName("config")[0].getElementsByTagName("transcriptEnable")[0].getAttribute("data");
	} catch(err) {
		this.transcriptEnabled = false;
	}
	/*if(this.langName!="en/")
	{
	this.transcriptEnabled = false;
	}*/
	try {
		this.resourcesEnabled = this.menuData.getElementsByTagName("config")[0].getElementsByTagName("resourcesEnable")[0].getAttribute("data");
	} catch(err) {
		this.resourcesEnabled = false;
	}
	try {
		this.mainTheme = this.menuData.getElementsByTagName("config")[0].getElementsByTagName("mainTheme")[0].getAttribute("data");
	} catch(err) {
		// this.mainTheme = this.CSSPath + "themRed.css";
		//this.mainTheme = "css/common/theme/themRed.css";
	}
	// console.log('[Model]: cdp: ' + this.commondataPath + "  cap:" + this.commonaudioPath);
	//loadMainTheme(this.mainTheme, this.langName);
};

Model.prototype.init = function() {
	//Bookmark_location="1||0||0||-1||-1||2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0||75,0,0||1,0,0||1,0"
	//Bookmark_location="0||1||0||2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0||0,0,0||0,0,0||1,0"
	
	//Bookmark_location="0||0||0||-1||-1||2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0||75, 100, 100, 0,0,0,0,0||1,1,1,0,0,0,0||100, 100, 100, 100, 0, 0, 0"
	
	// Need to work on this for SCORM
	if (Bookmark_location != "" && Bookmark_location != undefined && Bookmark_location != "undefined" && Bookmark_location != "null" && Bookmark_location != null && Bookmark_location != "notSet") {
		var arr = Bookmark_location.split("||");
		this.currTopic = Number(arr[0]);
		this.currMod = Number(arr[1]);
		this.currPage = Number(arr[2]);
		this.subcurrPage= Number(arr[3]);
		this.subInnercurrPage= Number(arr[4]);
		
		if(this.subInnercurrPage!=-1){
			model.subPageInnerFlg=true
		}
		
		if(this.subcurrPage!=-1){
			model.subPageFlg=true
		}

		var tmpArr=arr[5].split(',')
		var tmpprePostTestScorArr=arr[6].split(',')
		var tmpprePostTestAttemptArr=arr[7].split(',')
		var tmpTopicPercentage=arr[8].split(',')
		var cnt=0
		var tmpTopicComplCnt=0
		for (var i = 0; i < model.tTopics; i++) {
			model.prePostTestScorArr[i]=tmpprePostTestScorArr[i]
			model.prePostTestAttemptArr[i]=tmpprePostTestAttemptArr[i]
			model.TopicPercentCalcArr[i]=tmpTopicPercentage[i]
			if(model.topicCompletionArr[i]=="1" ||model.topicCompletionArr[i]==1){
				tmpTopicComplCnt++
			}
			for (var j = 0; j < model.tModulesArr[i]; j++) {
				for (var k = 0; k < model.tPagesArr[i][j]; k++) {
					cnt2=0
					if((model.subPageL1[i][j][k]==0)||(model.subPageL1[i][j][k]=='0')||(model.subPageL1[i][j][k]=='undefined')||(model.subPageL1[i][j][k]==undefined)){
						model.visitedArr[i][j][k] = tmpArr[cnt];
						cnt++
						model.pageCompletionArr[i][j][k]=tmpArr[cnt]
					}else{
						var tmpSubPagTrack=0
						for (var l = 0; l < model.subL1PagesArr[i][j][k]; l++) {
							if((model.subInnerPageL2[i][j][k][l]==0)||(model.subInnerPageL2[i][j][k][l]=='0')||(model.subInnerPageL2[i][j][k][l]=='undefined')||(model.subInnerPageL2[i][j][k][l]==undefined)){
								model.visitedArr[i][j][k][l] = tmpArr[cnt];
								if ((model.visitedArr[i][j][k][l] == 2 || model.visitedArr[i][j][k][l] == '2')) {
									model.subPageCompletionArr[i][j][k][l]=tmpArr[cnt]
									 tmpSubPagTrack++
								 }else{
									
									 model.subPageCompletionArr[i][j][k][l]=tmpArr[cnt]
								 }
								cnt++
							}else{
								var tmpInnerPageComp=0
								for (var m = 0; m < model.subL2PagesArr[i][j][k][l]; m++) {
									model.visitedArr[i][j][k][l][m] = tmpArr[cnt];
									if ((model.visitedArr[i][j][k][l][m] == 2 || model.visitedArr[i][j][k][l][m] == '2')) {
										 tmpInnerPageComp++
									 }
									cnt++
								}
								if(tmpInnerPageComp==model.visitedArr[i][j][k][l].length){
									model.subPageCompletionArr[i][j][k][l]="2"
									tmpSubPagTrack++
								}else{
									model.subPageCompletionArr[i][j][k][l]="0"
								}
								
							}
								if(tmpSubPagTrack==model.subPageCompletionArr[i][j][k].length){
									model.pageCompletionArr[i][j][k]="2"
								}else{
									model.pageCompletionArr[i][j][k]="0"
								}
							
						}
					}
					
				}
			}
		}
		
		

				
	//menu.updateMenu(model.currTopic, model.currMod, model.currPage,model.subcurrPage,model.subInnercurrPage, model.visitedArr);	
		
	var tempTotalPage = 0;
	var tempCourseFinish = 0;
	//console.log(model.tModulesArr+" model.tModulesArr "+model.tPagesArr+" model.tPagesArr "+model.subL1PagesArr+" model.subL1PagesArr "+model.subL2PagesArr+" model.subL2PagesArr")
	/*for (var i = 0; i < model.tTopics; i++) {
			for (var j = 0; j < model.tModulesArr[i]; j++) {
				tempTotalPage += model.visitedArr[i][j].length;
				for (var k = 0; k < model.tPagesArr[i][j]; k++) {
					if (model.visitedArr[i][j][k] == 2 || model.visitedArr[i][j][k] == '2') {
						tempCourseFinish++;
					}
				}
			}
		}*/
		
			
	var tempPercentage = Math.round((tmpTopicComplCnt / model.tTopics) * 100);
	model.completionPercentage=tempPercentage;
	model.wheelCompletionPercentage=tempPercentage;
	
		if(model.CourseComplete){
			model.wheelCompletionPercentage=100;
		}
		model.customMenuFirstTrigger=true
		var TempTotalScore=0;
		for(var i=0; i<model.prePostTestScorArr.length; i++){
			TempTotalScore+=Number(model.prePostTestScorArr[i])
		}
		model.totalScore = Math.round(Number(TempTotalScore / model.prePostTestScorArr.length));
		$("#customMenu").css("display", "none");
		$("#preloaderSpinner").fadeOut("slow")
		controller.courcePercentageCalculator()
		percetageCircleCalculation()
		this.firstLaunchIpad=false
		this.BookmarkFlg=true
		//showFromBookMark()
		//this.dispatchCustomEvent("updateView");
		$(".resume").css("display", "block");
		$("#preloaderSpinner").css("display", "none");
		$(".yes_btn").on("click", showFromBookMark);
		$(".no_btn").on("click", beginCourseScrom);
		$("#topicDropDown").val(model.currTopic);
		$("#dd_menu_btn").text(model.TopicTitleArr[model.currTopic]);

	} else {
		//this.dispatchCustomEvent("updateView");
		if(device.iPad()){
			this.firstLaunchIpad=false
		}
		$("#topicDropDown").val(model.currTopic);
		$("#dd_menu_btn").text(model.TopicTitleArr[model.currTopic]);
		$("#preloaderSpinner").fadeOut("slow")
		$(".customMenuWrapperImage").css('display', 'block');
		$("#customMenu").css('display', 'block');
	}
	
};

Model.prototype.supports_html5_storage = function() {
	try {
		return 'localStorage' in window && window['localStorage'] !== null;
	} catch (e) {
		return false;
	}
};

Model.prototype.nextPage = function(_control) {
	if (model.currTopic == (model.tTopics-1) && model.currMod == (model.tModulesArr[model.tTopics-1]-1) && model.currPage == (model.tPagesArr[model.tTopics-1][model.tPagesArr[model.tTopics-1].length-1]-1)) {
		//-- Last page disable
		return;
	}
	
	if((model.currPage<(model.tPagesArr[model.currTopic][model.currMod]-1))&&(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage].getAttribute("subpagelevel")==null)){
		model.currPage++
	}else if((model.currPage==(model.tPagesArr[model.currTopic][model.currMod]-1))&&(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage].getAttribute("subpagelevel")==null)&&(model.currMod != (model.tModulesArr[model.currTopic]-1))){
		model.currPage = 0;
		model.currMod++
		menu.generateModule(model.currTopic);
	}else if(model.currMod == (model.tModulesArr[model.currTopic]-1)){
		model.currPage = 0;
		model.currMod = 0;
		model.currTopic++;
		menu.generateModule(model.currTopic);
	}
	
	if(model.currPage<=(model.tPagesArr[model.currTopic][model.currMod]-1)){
		if(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage].getAttribute("subpagelevel")=='1'){
			if((model.subcurrPage==(model.subL1PagesArr[model.currTopic][model.currMod][model.currPage]-1))&&(model.subInnercurrPage==(model.subL2PagesArr[model.currTopic][model.currMod][model.currPage][model.subcurrPage]-1))){
				model.subcurrPage=-1
				model.subInnercurrPage=-1
				model.subPageInnerFlg=false
				model.subPageFlg=false
				if(model.currPage<(model.tPagesArr[model.currTopic][model.currMod]-1)){
					model.currPage++
				}else if(model.currPage==(model.tPagesArr[model.currTopic][model.currMod]-1)){
					model.currPage = 0;
					model.currMod++
					menu.generateModule(model.currTopic);
				}
				if(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage].getAttribute("subpagelevel")=='1'){
						model.subcurrPage=0
						model.subPageFlg=true
					if(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage].getElementsByTagName("subpage")[(model.subcurrPage == -1) ? 0 : model.subcurrPage].getAttribute("subpagelevel")=='2'){
						model.subInnercurrPage=0
						model.subPageInnerFlg=true
					}
				}
			}else{
				model.subPageFlg=true
				if(model.subcurrPage!=(model.subL1PagesArr[model.currTopic][model.currMod][model.currPage]-1)){
					if(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage].getElementsByTagName("subpage")[(model.subcurrPage == -1) ? 0 : (model.subcurrPage+1)].getAttribute("subpagelevel")=='2'){
						if(model.subInnercurrPage==-1){
							model.subcurrPage++
						}
					}
				}
				if(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage].getElementsByTagName("subpage")[(model.subcurrPage == -1) ? 0 : model.subcurrPage].getAttribute("subpagelevel")=='2'){
					model.subPageInnerFlg=true
					if(model.subInnercurrPage==(model.subL2PagesArr[model.currTopic][model.currMod][model.currPage][model.subcurrPage]-1)){
						model.subcurrPage=(model.subcurrPage+1)
						model.subInnercurrPage=-1
						model.subPageInnerFlg=false
						if(model.subcurrPage<=(model.subL1PagesArr[model.currTopic][model.currMod][model.currPage]-1)){
							
						}else if(model.currPage<(model.tPagesArr[model.currTopic][model.currMod]-1)){
							model.currPage++
						}else if(model.currPage==(model.tPagesArr[model.currTopic][model.currMod]-1)){
							model.currPage = 0;
							model.currMod++
							menu.generateModule(model.currTopic);
						}
						
						if(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage].getAttribute("subpagelevel")=='1'){
								model.subPageFlg=true
							if(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage].getElementsByTagName("subpage")[(model.subcurrPage == -1) ? 0 : model.subcurrPage].getAttribute("subpagelevel")=='2'){
								model.subInnercurrPage=0
								model.subPageInnerFlg=true
							}
						}
					}else if(model.subInnercurrPage!=(model.subL2PagesArr[model.currTopic][model.currMod][model.currPage][model.subcurrPage]-1)){
						model.subInnercurrPage++
					}
				}else{
					model.subPageInnerFlg=false
					if(model.subcurrPage!=(model.subL1PagesArr[model.currTopic][model.currMod][model.currPage]-1)){
						model.subcurrPage++
					}
				}
			}
		}else{
		}	
	}else{
	}
	
	if (model.visitedArr[model.currTopic][model.currMod][model.currPage] == 0 && model.learningType != "non-linear") {
		return;
	}
	$("#topicDropDown").val(model.currTopic);
	$("#dd_menu_btn").text(model.TopicTitleArr[model.currTopic])
	//alert(ModuleTitleArr);
	controller.managePageClick(model.currTopic, model.currMod, model.currPage, model.subcurrPage, model.subInnercurrPage);	
};

Model.prototype.prevPage = function(_control) {
	//console.log(model.currTopic+" currTopic "+model.currPage+" currPage "+model.currMod+" currMod "+model.subcurrPage+" subcurrPage "+model.subInnercurrPage+" subInnercurrPage")
	if ((model.currTopic == 0) && (model.currMod == 0) && (model.currPage == 0)&&((model.subInnercurrPage==-1)||(model.subInnercurrPage==0))&&((model.subcurrPage==-1)||(model.subcurrPage==0))) {
		//-- First page disable
		return;
	}	
	
	if(((model.subcurrPage==0)||(model.subcurrPage==-1))&&((model.subInnercurrPage==0)||(model.subInnercurrPage==-1))){
		if((model.currPage==0)&&(model.currMod != 0)&&((model.subcurrPage==0)||(model.subcurrPage==-1))&&((model.subInnercurrPage==0)||(model.subInnercurrPage==-1))){
			model.subPageFlg=false
			model.subPageInnerFlg=false
			model.subcurrPage=-1
			model.subInnercurrPage=-1
			model.currMod--
			model.currPage = model.tPagesArr[model.currTopic][model.currMod]-1;
			menu.generateModule(model.currTopic);
			
		}else if((model.currPage>0)&&((model.subcurrPage==0)||(model.subcurrPage==-1))&&((model.subInnercurrPage==0)||(model.subInnercurrPage==-1))){
			model.subPageFlg=false
			model.subPageInnerFlg=false
			model.subcurrPage=-1
			model.subInnercurrPage=-1
			model.currPage--
		}else if((model.currMod == 0)&&(model.currPage==0)&&(model.currTopic!=0)){
			model.subPageFlg=false
			model.subPageInnerFlg=false
			model.subcurrPage=-1
			model.subInnercurrPage=-1
			model.currTopic--;
			model.currMod = model.tModulesArr[model.currTopic]-1;
			model.currPage = model.tPagesArr[model.currTopic][model.currMod]-1;;
			menu.generateModule(model.currTopic);
		}
	}
	
	if(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage].getAttribute("subpagelevel")=='1'){
			if((model.subcurrPage==-1)&&(model.subInnercurrPage==-1)){
				model.subcurrPage=-1
				model.subInnercurrPage=-1
				model.subPageInnerFlg=false
				model.subPageFlg=false
				if(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage].getAttribute("subpagelevel")=='1'){
						model.subcurrPage=(model.subL1PagesArr[model.currTopic][model.currMod][model.currPage]-1)
						model.subPageFlg=true
					if(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage].getElementsByTagName("subpage")[(model.subcurrPage == -1) ? 0 : model.subcurrPage].getAttribute("subpagelevel")=='2'){
						model.subInnercurrPage=(model.subL2PagesArr[model.currTopic][model.currMod][model.currPage][model.subcurrPage]-1)
						model.subPageInnerFlg=true
					}
				}
			}else{
				model.subPageFlg=true
				if(model.subcurrPage!=0){
					if(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage].getElementsByTagName("subpage")[(model.subcurrPage == -1) ? 0 : (model.subcurrPage-1)].getAttribute("subpagelevel")=='2'){
						if(model.subInnercurrPage==-1){
							model.subcurrPage--
							model.subInnercurrPage=(model.subL2PagesArr[model.currTopic][model.currMod][model.currPage][model.subcurrPage])
						}
					}
				}
				if(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage].getElementsByTagName("subpage")[(model.subcurrPage == -1) ? 0 : model.subcurrPage].getAttribute("subpagelevel")=='2'){
					model.subPageInnerFlg=true
					if(model.subInnercurrPage==0){
						model.subcurrPage=(model.subcurrPage-1)
						model.subInnercurrPage=-1
						model.subPageInnerFlg=false
						if(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage].getAttribute("subpagelevel")=='1'){
								model.subPageFlg=true
							if(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage].getElementsByTagName("subpage")[(model.subcurrPage == -1) ? 0 : model.subcurrPage].getAttribute("subpagelevel")=='2'){
								model.subInnercurrPage=(model.subL2PagesArr[model.currTopic][model.currMod][model.currPage][model.subcurrPage]-1)
								model.subPageInnerFlg=true
							}
						}
					}else if(model.subInnercurrPage!=0){
						model.subInnercurrPage--
					}
				}else{
					model.subPageInnerFlg=false
					if(model.subcurrPage!=0){
						model.subcurrPage--
					}
				}
			}
		}else{
		}
	
	$("#topicDropDown").val(model.currTopic);
	$("#dd_menu_btn").text(model.TopicTitleArr[model.currTopic])
	controller.managePageClick(model.currTopic, model.currMod, model.currPage, model.subcurrPage, model.subInnercurrPage);	
};

/*******************************/
Model.prototype.setModule = function(page, mod) {
	//if()
};

Model.prototype.setPageVisited = function(page, mod) {
	if(model.subPageInnerFlg){
		if (this.visitedArr[model.currTopic][model.currMod][model.currPage][model.subcurrPage][model.subInnercurrPage] == 0 || this.visitedArr[model.currTopic][model.currMod][model.currPage][model.subcurrPage][model.subInnercurrPage] == '0' || this.visitedArr[model.currTopic][model.currMod][model.currPage][model.subcurrPage][model.subInnercurrPage] == 1 || this.visitedArr[model.currTopic][model.currMod][model.currPage][model.subcurrPage][model.subInnercurrPage] == '1') {
			this.visitedArr[model.currTopic][this.currMod][this.currPage][model.subcurrPage][model.subInnercurrPage]  = "2";
		}
		
	}else if(model.subPageFlg){
		if (this.visitedArr[model.currTopic][model.currMod][model.currPage][model.subcurrPage] == 0 || this.visitedArr[model.currTopic][model.currMod][model.currPage][model.subcurrPage] == '0' || this.visitedArr[model.currTopic][model.currMod][model.currPage][model.subcurrPage]== 1 || this.visitedArr[model.currTopic][model.currMod][model.currPage][model.subcurrPage] == '1') {
			this.visitedArr[model.currTopic][model.currMod][model.currPage][model.subcurrPage]  = "2";
		}
		
	}else{
		if (this.visitedArr[model.currTopic][model.currMod][model.currPage] == 0 || this.visitedArr[model.currTopic][model.currMod][model.currPage] == '0' || this.visitedArr[model.currTopic][model.currMod][model.currPage]== 1 || this.visitedArr[model.currTopic][model.currMod][model.currPage] == '1') {
			this.visitedArr[model.currTopic][this.currMod][this.currPage] = "2";
		}
		
	}
	
};
Model.prototype.setPagePartiallyVisited = function(page, mod) {
		
	if(model.subPageInnerFlg){
		if (this.visitedArr[model.currTopic][model.currMod][model.currPage][model.subcurrPage][model.subInnercurrPage] == 0 || this.visitedArr[model.currTopic][model.currMod][model.currPage][model.subcurrPage][model.subInnercurrPage] == '0') {
			this.visitedArr[model.currTopic][model.currMod][model.currPage][model.subcurrPage][model.subInnercurrPage] = "1";
		}
		
	}else if(model.subPageFlg){
		if (this.visitedArr[model.currTopic][model.currMod][model.currPage][model.subcurrPage] == 0 || this.visitedArr[model.currTopic][model.currMod][model.currPage][model.subcurrPage] == '0' ) {
			this.visitedArr[model.currTopic][model.currMod][model.currPage][model.subcurrPage] = "1";
		}
		
	}else{
		if (this.visitedArr[model.currTopic][model.currMod][model.currPage] == 0 || this.visitedArr[model.currTopic][model.currMod][model.currPage] == '0') {
			this.visitedArr[model.currTopic][this.currMod][this.currPage] = "1";
		}
	}
	controller.setPageVisited()
};
Model.prototype.setCurrPage = function(Topic, Mod, Pag, SubPag, SubInnPag) {
	model.currTopic =parseInt(Topic);
	model.currMod = parseInt(Mod);
	model.currPage = parseInt(Pag);
	if((SubPag=="-1")||(SubPag==-1)){
		model.subPageFlg=false
		model.subcurrPage = -1;
	}else{
		model.subPageFlg=true
		model.subcurrPage =parseInt(SubPag);
	}
	if((SubInnPag=="-1")||(SubInnPag==-1)){
		model.subInnercurrPage = -1;
		model.subPageInnerFlg=false
	}else{
		model.subPageInnerFlg=true
		model.subInnercurrPage = parseInt(SubInnPag);
	}
	this.dispatchCustomEvent("updateView");
};

Model.prototype.setCurrModule = function(Topic, Mod, Pag, SubPag, SubInnPag) {
	model.currTopic =parseInt(Topic);
	model.currMod = parseInt(Mod);
	model.currPage = parseInt(Pag);
	if((SubPag=="-1")||(SubPag==-1)){
		model.subPageFlg=false
		model.subcurrPage = -1;
	}else{
		model.subPageFlg=true
		model.subcurrPage =parseInt(SubPag);
	}
	if((SubInnPag=="-1")||(SubInnPag==-1)){
		model.subInnercurrPage = -1;
		model.subPageInnerFlg=false
	}else{
		model.subPageInnerFlg=true
		model.subInnercurrPage = parseInt(SubInnPag);
	}
	menu.generateModule(model.currTopic);
	this.dispatchCustomEvent("updateView");
};

Model.prototype.addCustomEvent = function(evet, callback) {
	this.events_Obj.push({
		"eventName" : evet,
		"funcCallBack" : callback
	});
};

Model.prototype.dispatchCustomEvent = function(arg) {
	for (var i = 0; i < this.events_Obj.length; i++) {
		if (this.events_Obj[i].eventName == arg) {
			this.events_Obj[i].funcCallBack();
			break;
		}
	}
};

