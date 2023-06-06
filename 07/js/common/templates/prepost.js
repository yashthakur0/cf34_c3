var score = 0;
var corrAns;
var userSelection;
var totQuestCount = 0;
var currentQuestNo = 0;
var checkRandomNo = [];
var reviewFeedback = new Array();
var reviewFeedUserAns = new Array();
var reviewQus = new Array();
var quesType = new Array();
var quesArr = new Array();
var optionArr = new Array();
var noOptionArr = new Array();
var corrAnsArr = new Array();
var corrFeedback = new Array();
var IncorrFeedback = new Array();
var FirstIncorrFeedback = new Array();
var LastIncorrFeedback = new Array();
var ImageArray = new Array();
var userAns = new Array();
var currQnCnt = 0;
var assesStart=false
var corrText = "";
var wrgText = "";
var congratesTxt = "";
var tryTxt = "";
var tll;
var totQuest = 0;
var ranNums = [];
var nums = [];
var ShuffleOptArr = new Array();
var TempoptionArr = [];
var displayedQuestArr=[]
var executed = false;
var retakeAssess=false
var testLabel="post"
var randomiseQuest=true
var displayAllQuestions=false
var runOneTime=false
var randomFunRunsOnce=false

$(function() {
    imageLoader.load($('.pageWrapper'), controller.loadStyles);

});


function preloadingDone() {
    //controller.hidePreloader();
    //audioPlayer.loadAudioPath("", audioFinish);
    pageLoad = true;
    initAnimStates();
    //parseData();
    $('.content_blocker').hide();
}

function assignExternalData() {
	if(!runOneTime){
		runOneTime=true
		currQnCnt = 0;
		totQuest = 0;
		if (currentExtDataPath != "") {
			$.each(ExternalData, function(key, value) {
				if (key == "Lesson" + "_" + model.currTopic) {
					$.each(ExternalData["Lesson_" + model.currTopic].questionsData, function(key, qusData) {
						quesType[totQuest] = qusData.qusType;
						quesArr[totQuest] = qusData.question;
						optionArr[totQuest] = qusData.Options;
						corrAnsArr[totQuest] = qusData.correctAnswer;
						corrFeedback[totQuest] = qusData.correctFeedback;
						IncorrFeedback[totQuest] = qusData.InCorrectFeedback;
						FirstIncorrFeedback[totQuest] = qusData.FirstInCorrectFeedback;
						LastIncorrFeedback[totQuest] = qusData.LastInCorrectFeedback;
						ImageArray[totQuest] = qusData.imagePath;
						reviewFeedUserAns[totQuest] = ""
						checkRandomNo[totQuest] = 0;
						reviewFeedback[totQuest] = 0;
						reviewQus[totQuest] = 0;
						TempoptionArr[totQuest] = 0;
						totQuest++;
					});
				}
			});
		}
		var structureTag = xmlData.getElementsByTagName("structure")[0];
		if((structureTag.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage].getAttribute("randomize")!=null) || (structureTag.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage].getAttribute("randomize")!="") || (structureTag.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage].getAttribute("randomize")!=undefined)){
			randomiseQuest=structureTag.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage].getAttribute("randomize")
		}
		
		if((structureTag.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage].getAttribute("displayAllQuestions")!="") || (structureTag.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage].getAttribute("displayAllQuestions")!=undefined)){
			if(structureTag.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage].getAttribute("displayAllQuestions")=="true"){
				totQuestCount=totQuest
			}else{
				totQuestCount=structureTag.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage].getAttribute("totalQuestToLoad")
			}
		}else{
			totQuestCount=structureTag.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage].getAttribute("totalQuestToLoad")
		}	//totQuestCount=structureTag.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[model.currMod].getElementsByTagName("page")[model.currPage].getAttribute("totalQuestToLoad")
		//console.log(randomiseQuest+" randomiseQuest "+ totQuestCount+" totQuestCount")
		generateRandomNo();
		$(".insText_1").css("display", "none")
		$(".insText_2").css("display", "none")
		//loadQuestion();
	   controller.assignTranscript(transcript[0]);
		audioPlayer.StartAnimation();
	}
};

function audioFinish() {
    $("#btn_1").css("pointer-events", "auto").css("opacity", "1");
    $('.content_blocker').hide();
    //$('.shell_all_audio').hide();
}

function playAnimation(pageType) {
    $("#btn_1").css("pointer-events", "none").css("opacity", "0.5");;
	

    if ($(".assessment_disp00").css("display") == "block") {
        $('.shell_all_audio').show();
    }
    if (tll) {
        tll.totalProgress(1).kill();
    }
    tll = new TimelineLite({
        onUpdate: updateSlider,
        onComplete: animCompleted
    });
	tll.add(animateIn($(".anim_1")).play(), 0);
	tll.add(animateIn($(".initialText_1")).play(), 0);
	tll.add(animateIn($(".initialText_2")).play(), 0);
	tll.add(animateIn($(".initialText_3")).play(), 0);
	tll.add(animateIn($(".initialText_4,#btn_1")).play(), 0);
	
	tll.add(animateIn($("#dummySynch")).play(), 0);


}


$(document).ready(function() {
	model.assesmentPage=true
	$(".assessment_disp001, .assessment_disp01, .assessment_disp02").css("display", "none");
    $(".Next_Button").css("cursor", "default").css("pointer-events", "none");
	$("#audio_Icon, #replay_Icon").addClass("deactive").addClass("disabled").css("cursor", "default").css("opacity", "0.5").css("pointer-events", "none");
	if(testLabel=="post"){
		if(model.prePostTestScorArr[model.currTopic]>= 75){
			$(".assessment_disp001").css("display", "none");
			$(".assessment_disp00").css("display", "block");
			$(".completedContent").css("display", "block")
		}else{
			$(".assessment_disp00").css("display", "block");
			$(".assessment_disp001").css("display", "none");
			$(".completedContent").css("display", "none")
		}
	}
	
    $("#btn_1, #btn_2").off().on("click", function(){
        $(".assessment_disp00, .assessment_disp001").css("display", "none");
        $(".assessment_disp01").css("display", "block");
        controller.assesnavBtnsControlDisable()
		if(testLabel=="pre"){
			var shellButtons = [ ];
			$("#menubtn, #glossarybt, #helpbtn").removeClass("deactive").removeClass("disabled").css("pointer-events", "auto");;
		}
        $("#shell_transcript").addClass("deactive").addClass("disabled").css("cursor", "default").css("opacity", "0.5").css("pointer-events", "none");
        $("#audio_Icon, #replay_Icon").addClass("deactive").addClass("disabled").css("cursor", "default").css("opacity", "0.5").css("pointer-events", "none");
        if ($("#transcript").css("display") == "block") {
            $('#transText').mCustomScrollbar("destroy");
            $("#transcript").css("display", "none");
        }
		if(ImageArray[currentQuestNo]!= ""){
			$("#ImgContainer img").attr("src", ImageArray[currentQuestNo])
			$("#recap").removeClass("pageWrapper")
			//$(".pageWrapper").css("background-image", "url()");
		}else{
			$("#ImgContainer img").attr("src", ImageArray[currentQuestNo])
			//$(".pageWrapper").css("background-image", "url(../../../assets/image/common/m001_assessment.png) no-repeat");
			$("#recap").addClass("pageWrapper")
		}
		assesStart=true
        //loadQuestion();
        //rotateAnimations();
    });
    $(".retakeBtn").off().on("click", function(){
        resetVar();
        $(".assessment_disp02").css("display", "none");
        $(".assessment_disp03").css("display", "none");
        $(".assessment_disp01").css("display", "block");
        controller.assesnavBtnsControlDisable()
		retakeAssess=true
		//$(".assessmentBox").fadeOut("slow");
        generateRandomNo();
        //loadQuestion();
    });
    $(".nextModuleBtn").off().on("click", function(){
		controller.assesNavBtnsControlEnable()
		$(".scrubber").css("pointer-events", "block").css("cursor", "pointer")
        $("#shell_transcript").removeClass("deactive").removeClass("disabled").css("cursor", "cursor").css("opacity", "1").css("pointer-events", "auto");
        $("#audio_Icon,#replay_Icon").removeClass("deactive").removeClass("disabled").css("cursor", "cursor").css("opacity", "1").css("pointer-events", "auto");
		var tmpModInc=Number(model.currTopic)+1
		if(model.menuData.getElementsByTagName("topic")[tmpModInc].getElementsByTagName("module")[0].getElementsByTagName("page")[0].getAttribute("subpagelevel")==null){
			 controller.manageTopic(tmpModInc, 0, 0, -1, -1);
		}else if((model.menuData.getElementsByTagName("topic")[tmpModInc].getElementsByTagName("module")[0].getElementsByTagName("page")[0].getAttribute("subpagelevel")=="1")&&(model.menuData.getElementsByTagName("topic")[tmpModInc].getElementsByTagName("module")[0].getElementsByTagName("page")[0].getElementsByTagName("subpage")[0].getAttribute("subpagelevel")==null)){
			controller.manageTopic(tmpModInc, 0, 0, 0, -1);
		}else{
			controller.manageTopic(tmpModInc, 0, 0, 0,0);
		}
        //controller.manageTopic(tmpModInc, 0, 0)
    });
	
    $(".reviewCourseBtn").off().on("click", function(){
        controller.assesNavBtnsControlEnable()
		$(".scrubber").css("pointer-events", "block").css("cursor", "pointer")
        $("#shell_transcript").removeClass("deactive").removeClass("disabled").css("cursor", "cursor").css("opacity", "1").css("pointer-events", "auto");
        $("#audio_Icon, #replay_Icon").removeClass("deactive").removeClass("disabled").css("cursor", "cursor").css("opacity", "1").css("pointer-events", "auto");
		if(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[0].getElementsByTagName("page")[0].getAttribute("subpagelevel")==null){
			 controller.managePageClick(model.currTopic, 0, 0, -1, -1);
		}else if((model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[0].getElementsByTagName("page")[0].getAttribute("subpagelevel")=="1")&&(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[0].getElementsByTagName("page")[0].getElementsByTagName("subpage")[0].getAttribute("subpagelevel")==null)){
			controller.managePageClick(model.currTopic, 0, 0, 0, -1);
		}else{
			controller.managePageClick(model.currTopic, 0, 0, 0,0);
		}
       
    })

});

function resetVar() {
    score = 0;
    currentQuestNo = 0;
    currQnCnt = 0;
	displayedQuestArr=[]
	executed=false
    for (var i = 0; i < checkRandomNo.length; i++) {
        checkRandomNo[i] = 0;
        userAns[i] = 0;
        reviewFeedback[i] = 0;
        reviewQus[i] = 0;
		TempoptionArr[i]=0
		
    }
}

var NoOfOptions;

function loadQuestion() {
    $(".feedback_content").css("display", "none");
	/*if(model.audioName=="mute.mp3"){
		$("#preloaderSpinner").fadeOut("slow");
	}*/
    $(".Next_Button").addClass("submitBtnDeactive").css("pointer-events", "none");
    checkRandomNo[currentQuestNo] = 1;
    var quesTxt = quesArr[currentQuestNo];
    reviewQus[currentQuestNo] = quesTxt;
    NoOfOptions = Number(optionArr[currentQuestNo].length);
    corrAns = corrAnsArr[currentQuestNo];
    var optionStr = '';
	ShuffleOptArr = []
    for (var j = 0; j < NoOfOptions; j++) {
        ShuffleOptArr[j] = j
    }
    if (quesType[currentQuestNo] != "true-false") {
        shuffleArrayFun(ShuffleOptArr)
    }
	TempoptionArr[currentQuestNo]=ShuffleOptArr
    $(".insText_1, .insText_2").css("display", "none")
    if (quesType[currentQuestNo] == "MCSS") {
        $(".insText_1").css("display", "block")
        for (var i = 1; i <= NoOfOptions; i++) {
            optionStr += '<div class="RadioTag" id="Radio_' + (ShuffleOptArr[i - 1] + 1) + '"><small class="rightWrong" style="display:none"></small><span class="MCQRadio" id="option_' + (ShuffleOptArr[i - 1] + 1) + '"></span><div class="opt">' + optionArr[currentQuestNo][ShuffleOptArr[i - 1]] + '</div></div>';	
        }
		if(ImageArray[currentQuestNo]!= ""){
			$("#ImgContainer img").attr("src", ImageArray[currentQuestNo])
			$("#recap").removeClass("pageWrapper")
			//$(".pageWrapper").css("background-image", "url()");
			
		}else{
			$("#ImgContainer img").attr("src", ImageArray[currentQuestNo])
			//$(".pageWrapper").css("background-image", "url(../../../assets/image/common/m001_assessment.png) no-repeat");
			$("#recap").addClass("pageWrapper")
		}
    } else {
        $(".insText_2").css("display", "block")
        for (var i = 1; i <= NoOfOptions; i++) {
            optionStr += '<div class="RadioTag" id="Radio_' + (ShuffleOptArr[i - 1] + 1)+ '"><small class="rightWrong" style="display:none"></small><span class="MCQCheck" id="option_' + (ShuffleOptArr[i - 1] + 1) + '"></span><div class="opt">' + optionArr[currentQuestNo][ShuffleOptArr[i - 1]] + '</div></div>';
        }
		if(ImageArray[currentQuestNo]!= ""){
			$("#ImgContainer img").attr("src", ImageArray[currentQuestNo])
			//$(".pageWrapper").css("background-image", "url()");
			$("#recap").removeClass("pageWrapper")
		}else{
			$("#ImgContainer img").attr("src", ImageArray[currentQuestNo])
			//$(".pageWrapper").css("background-image", "url(../../../assets/image/common/m001_assessment.png) no-repeat");
			$("#recap").addClass("pageWrapper")
		}
    }
	if(!assesStart){
		$("#recap").addClass("pageWrapper")
	}
	
	var tmpCnt
	var tmptotQuestCount
	if(currQnCnt<=9){
		tmpCnt="0"+currQnCnt
	}else{
		tmpCnt=currQnCnt
	}
	if(totQuestCount<=9){
		tmptotQuestCount="0"+totQuestCount
	}else{
		tmptotQuestCount=totQuestCount
	}
    $(".question_no").html(tmpCnt+"/"+tmptotQuestCount)
    $('.question').html(quesTxt);
    $('.options').html(optionStr);
    for (var k = 1; k <= NoOfOptions; k++) {
        userAns[k] = 0;
        //$('option_' + k).removeClass("MCQCheckSelect");
    }
    $('.question_icon').html(currQnCnt);

    KCCheck(NoOfOptions);

}

function KCCheck(noOfOpt) {
    $(".RadioTag").css("cursor", "pointer").css("pointer-events", "auto");
    $(".RadioTag").bind("click", function() {
        no = $(this).attr("id").split("_")[1];
        $(".Next_Button").removeClass("submitBtnDeactive");
        if (quesType[currentQuestNo] == "MCSS") {
            for (var i = 1; i <= noOfOpt; i++) {
                $("#option_" + i).removeClass("MCQRadioSelect").addClass("MCQRadio").parent().removeClass("selected");
            }
            userSelection = no;
            $("#option_" + no).removeClass("MCQRadio").addClass("MCQRadioSelect").parent().addClass("selected");
            $(".Next_Button").css("display", "block");
            if ($(".Next_Button").css("cursor") == "default") {
                nextEnable();
            }
        } else {
            if (userAns[no] == no) {
                userAns[no] = 0;
                $("#option_" + no).removeClass("MCQCheckSelect ").addClass("MCQCheck").parent().removeClass("selected");

            } else if (userAns[no] == 0) {
                $("#option_" + no).removeClass("MCQCheck").addClass("MCQCheckSelect ").parent().addClass("selected");
                userAns[no] = no;

            }
            $(".Next_Button").css("display", "block");
            fnCheckAns();
        }

        /*-$(".Next_Button").css("display", "block");
        if($(".Next_Button").css("cursor")== "default"){
        	nextEnable();
        }*/

    });

}

function fnCheckAns() {
    var cntUnchecked = 0;

    for (var j = 1; j <= NoOfOptions; j++) {
        if (userAns[j] == 0) {
            cntUnchecked++;
        }
    }

    if (cntUnchecked >= NoOfOptions) {
        nextDisable();
        $(".Next_Button").addClass("submitBtnDeactive");
    } else {
        if ($(".Next_Button").css("cursor") == "default") {
            nextEnable();
        }
        $(".Next_Button").removeClass("submitBtnDeactive");
    }
}

$('.Continue_Button').click(function() {
    if (currQnCnt != totQuestCount) {
        var str = "";
        var tll = new TimelineLite();
        // tll.add(animateOpacity($(".wheel_box")).play(), 2.3);
        tll.add(animateLeftIn($(".wheel_box"), 0).play(), 2);
        tll.add(animateOpacity($(".Color_wrapper")).play(), 2);
        tll.add(animateLeftIn($(".KnowledgeCheck"), 1020).play(), 0.5);
        tll.add(animateWheelRotateOut($(".wheel"), 0, 0).play(), 2);
    } else {
        //model.nextPage();
    }
});

$("#proceed_btn").click(function() {
	var tmpModNum=Number(model.currMod+1)
	controller.manageTopic(model.currTopic, tmpModNum, 0)
})

$('.shell_pop_close').click(function() {
	if(!randomFunRunsOnce){
		$("#ImgContainer img").attr("src", "")
		$("#shell_assessNext").css("display", "none")
		randomFunRunsOnce=true
		 if (currQnCnt != totQuestCount) {
				if((randomiseQuest==false) || (randomiseQuest=="false") ){
					currentQuestNo++
				}
				generateRandomNo();
				//loadQuestion();
			} else {
				$("#shell_assessNext").css("display", "none")
				var scorePer = Math.round(Number((score / totQuestCount) * 100));
				var testStore
				model.prePostTestAttemptArr[model.currTopic]="1"
				if(testLabel=="pre"){
					testStore=0
				}else{
					testStore=1
				}
				if(testLabel=="post"){
					if(model.prePostTestScorArr[model.currTopic] <scorePer){
						model.prePostTestScorArr[model.currTopic]=scorePer
					}
				}
				$(".assessment_disp01").css("display", "none");
				$(".assessment_disp02").css("display", "block");
				
				$("#feedbackImg").removeClass("Fb_SCoreCard_pass").removeClass("Fb_SCoreCard_fail")
				$("#RightResult").css("display", "none")
				$("#WrongResult").css("display", "none")
				$("#TryAgainResult").css("display", "none")
				//model.totalScore=score;
				 controller.assesNavBtnsControlEnable()
				 if(testLabel=="pre"){
					$("#shell_next").addClass("deactive").addClass('disabled').css("pointer-events", "none").removeClass('blink');
				 }
				if (scorePer>=75) {
					$("#RightResult").css("display", "block")
					$("#WrongResult").css("display", "none")
					$("#TryAgainResult").css("display", "none")
					$("#feedbackImg").addClass("Fb_SCoreCard_pass")
					$(".FB_right h3").html(congratesTxt);
					controller.setPageVisited();
					//model.scormHandler.complete();
				}  else {
					$("#TryAgainResult").css("display", "none")
					$("#RightResult").css("display", "none")
					$("#WrongResult").css("display", "block")
					$("#feedbackImg").addClass("Fb_SCoreCard_fail")
					$(".FB_right h3").html(tryTxt);
				}
				if (model.currTopic == (model.tTopics-1) && model.currMod == (model.tModulesArr[model.tTopics-1]-1) && model.currPage == 0) {
					$(".nextModuleBtn").css("display", "none")
				}
				$(".userScore").html(scorePer);
				if(testLabel=="post"){
					calculateTotalScore()
				}
				
			}
	}
})

function calculateTotalScore(){
	var TempTotalScore=0;
	$("#recap").addClass("pageWrapper")
	for(var i=0; i<model.prePostTestScorArr.length; i++){
		TempTotalScore+=Number(model.prePostTestScorArr[i])
	}
	model.totalScore = Math.round(Number(TempTotalScore / model.prePostTestScorArr.length));
	model.scormHandler.saveScore(model.totalScore)
	var AssessMentCompletes=0
	for (var i = 0; i < model.tTopics; i++) {
		var moduleNo=model.tModulesArr[i]-1
		if ((model.visitedArr[i][moduleNo][0] == 2) || (model.visitedArr[i][moduleNo][0] == '2')) {
			AssessMentCompletes++;
		}
	}
	
	var TopicCompleted=0
	for (var i = 0; i < model.tTopics; i++) {	
		if((model.prePostTestScorArr[i]>=75)&&(model.TopicPercentCalcArr[i]>=75)){
			TopicCompleted++
		}
	}
	
	if(TopicCompleted==model.tTopics){
		$(".CourseCompleted").css("display", "block")
	}else{
		$(".CourseCompleted").css("display", "none")
	}
	
	/*if((model.completionPercentage>=75)&&(AssessMentCompletes==model.tTopics)){
		 $(".CourseCompleted").css("display", "block")
	}else{
		$(".CourseCompleted").css("display", "none")
	}*/
	
	/*if(model.totalScore>=75){
		model.scormHandler.setSuccessStatus("ASSESSMENT_PASSED")
	}else{
		model.scormHandler.setSuccessStatus("ASSESSMENT_FAILED")
	}*/
	model.scormHandler.saveBookmark();
}

function nextEnable() {
    $('.Next_Button').css("cursor", "pointer").css("pointer-events", "auto");
    $('.Next_Button').click(function() {
		$(".Next_Button").addClass("submitBtnDeactive");
		radioBtnDisable();
        validation();
        nextDisable();
    });

}

function nextDisable() {
    $('.Next_Button').css("cursor", "default").css("pointer-events", "none");
    $('.Next_Button').unbind();
}

function radioBtnDisable() {
    $(".RadioTag").css("cursor", "default").css("pointer-events", "none");;
    $(".RadioTag").unbind();
}

function validation() {
    //userAns[currentQuestNo ]=userSelection;
	executed=false
	randomFunRunsOnce=false
    if (quesType[currentQuestNo] == "MCSS") {
		 $(".RadioTag").find(".rightWrong").css("display", "block");
        $(".RadioTag").find(".rightWrong").addClass("wrong");
        $("#Radio_" + corrAns).find(".rightWrong").removeClass("wrong").addClass("right");
        if (userSelection == corrAns) {
            score++;
            reviewFeedback[currentQuestNo] = "Correct";
            reviewFeedUserAns[currentQuestNo] = userSelection
			$("#CorrectFB").css("display", "block")
            $(".corFeedbackDiv").html(corrFeedback[currentQuestNo]);
        } else {
            reviewFeedback[currentQuestNo] = "Wrong";
            reviewFeedUserAns[currentQuestNo] = userSelection
                $("#IncorrectFB").css("display", "block")
            $(".incorFeedbackDiv").html(IncorrFeedback[currentQuestNo]);
        }
    } else {
        var corrCnt = 0;
        var userAnsCnt = 0;
        var correctAnsArr = corrAns.split(",");
        $(".Next_Button").addClass("submitBtnDeactive");
		 $(".RadioTag").find(".rightWrong").css("display", "block");
        $(".RadioTag").find(".rightWrong").addClass("wrong");
        var userAnswer = []
        for (var i = 1; i < userAns.length; i++) {
            if (userAns[i] != 0) {
                userAnsCnt++;
                userAnswer.push(userAns[i])
            }
            for (var j = 0; j < correctAnsArr.length; j++) {
				 $("#Radio_" + correctAnsArr[j]).find(".rightWrong").removeClass("wrong").addClass("right");
                if (userAns[i] == correctAnsArr[j]) {
                    corrCnt++;
                }
            }

        }
        reviewFeedUserAns[currentQuestNo] = userAnswer
        userAnswer = []
		//console.log(corrCnt+" == "+correctAnsArr.length+" && "+correctAnsArr.length+" == "+userAnsCnt)
        if (corrCnt == correctAnsArr.length && correctAnsArr.length == userAnsCnt) {
            score++;
            reviewFeedback[currentQuestNo] = "Correct";;
			$("#CorrectFB").css("display", "block")
            $(".corFeedbackDiv").html(corrFeedback[currentQuestNo]);
        } else {
            reviewFeedback[currentQuestNo] = "Wrong";
             $("#IncorrectFB").css("display", "block")
            $(".incorFeedbackDiv").html(IncorrFeedback[currentQuestNo]);
        }
    }
	$("#shell_assessNext").css("display", "block")
	
    //$(".feedback_content").css("display","block");
    // $(".Next_Button").css("display", "block");
}

function shuffleArrayFun(arra1) {
    var ctr = arra1.length,
        temp, index;

    // While there are elements in the array
    while (ctr > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * ctr);
        // Decrease ctr by 1
        ctr--;
        // And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}

function generateRandomNo() {
	if((randomiseQuest==true) || (randomiseQuest=="true") ){
		var randoamNumber = Math.floor(Math.random() * totQuest);
		currentQuestNo = randoamNumber;	
		//console.log(randoamNumber +" randoamNumber "+totQuest+" checkRandomNo "+checkRandomNo[currentQuestNo])
		if (checkRandomNo[currentQuestNo] == 1) {
			generateRandomNo();
			return;
		}
		CallQuestionLoadFun()
	}else{
		CallQuestionLoadFun()
	}
};

function CallQuestionLoadFun(){
	displayedQuestArr.push(currentQuestNo)
		if(retakeAssess){
			retakeAssess=false
			$(".assessmentBox").css("display", "none")
				if(!executed){
					currQnCnt++;
					executed = true;
				}
				loadQuestion();
				$(".assessmentBox").fadeIn("slow");
		}else{
			$(".assessmentBox").fadeOut("slow", function(){
				if(!executed){
					currQnCnt++;
					executed = true;
				}
				loadQuestion();
				$(".assessmentBox").fadeIn("slow");
			})  
		}
}


function setReviewPage() {
    var reviewTxt = "";
    for (var i = 1; i <= displayedQuestArr.length; i++) {
        var tmpString = ""
        for (var j = 0; j < optionArr[displayedQuestArr[i-1]].length; j++) {
			 tmpString += "<li>" + optionArr[displayedQuestArr[i-1]][TempoptionArr[displayedQuestArr[i-1]][j]]+"</li>" 
        }
		
			reviewTxt += "<tr><td align='center'>" + i + "</td><td>" + reviewQus[displayedQuestArr[i-1]] + "</td><td><ol>" + tmpString + "</ol></td><td>" + corrAnsArr[i - 1] + "</td><td>" + reviewFeedUserAns[displayedQuestArr[i-1]] + "</td><td>" + reviewFeedback[displayedQuestArr[i-1]] + "</td></tr>";
    }
     $(".reviewFeedback").html(reviewTxt);
	$(".table_holedr").mCustomScrollbar();
}