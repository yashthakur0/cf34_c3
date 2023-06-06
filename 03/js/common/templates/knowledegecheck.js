var score = 0;
var passingQuestions = 5
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
var PartialIncorrFeedback = new Array();
var ImageArray = new Array();
var userAns = new Array();
var currQnCnt = 0;
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
var displayedQuestArr=[];
var noOfTries=2
var countTries=0
var ShuffleArr=[]
var tmpOptArr=[]
var pageNo=""
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
    currentQuestNo = 0;
    if (currentExtDataPath != "") {
        $.each(ExternalData, function(key, value) {
			if (key == lessonLabel + "_" + curKC) {
				$.each(ExternalData[lessonLabel + "_" + curKC].questionsData["questions_"+QuestioNo], function(key, qusData) {
					quesType[currentQuestNo] = ExternalData[lessonLabel + "_" + curKC].questionsData["questions_"+QuestioNo].qusType;
					pageNo= ExternalData[lessonLabel + "_" + curKC].questionsData["questions_"+QuestioNo].pageNo;
					quesArr[currentQuestNo] = ExternalData[lessonLabel + "_" + curKC].questionsData["questions_"+QuestioNo].question;
					optionArr[currentQuestNo] = ExternalData[lessonLabel + "_" + curKC].questionsData["questions_"+QuestioNo].Options;
					corrAnsArr[currentQuestNo] = ExternalData[lessonLabel + "_" + curKC].questionsData["questions_"+QuestioNo].correctAnswer;
					corrFeedback[currentQuestNo] = ExternalData[lessonLabel + "_" + curKC].questionsData["questions_"+QuestioNo].correctFeedback;
					IncorrFeedback[currentQuestNo] = ExternalData[lessonLabel + "_" + curKC].questionsData["questions_"+QuestioNo].InCorrectFeedback;
					FirstIncorrFeedback[currentQuestNo] = ExternalData[lessonLabel + "_" + curKC].questionsData["questions_"+QuestioNo].FirstInCorrectFeedback;
					LastIncorrFeedback[currentQuestNo] = ExternalData[lessonLabel + "_" + curKC].questionsData["questions_"+QuestioNo].LastInCorrectFeedback;
					PartialIncorrFeedback[currentQuestNo] = ExternalData[lessonLabel + "_" + curKC].questionsData["questions_"+QuestioNo].partialFeedback;
					ImageArray[currentQuestNo] = ExternalData[lessonLabel + "_" + curKC].questionsData["questions_"+QuestioNo].imagePath;
					ShuffleArr[currentQuestNo] = ExternalData[lessonLabel + "_" + curKC].questionsData["questions_"+QuestioNo].Shuffle;
					reviewFeedUserAns[currentQuestNo] = ""
					checkRandomNo[currentQuestNo] = 0;
					reviewFeedback[currentQuestNo] = 0;
					reviewQus[currentQuestNo] = 0;
					TempoptionArr[currentQuestNo] = 0;
					
				});
			}
        });
    }
	if(ImageArray[currentQuestNo]!= ""){
		$(".pageWrapper").css("background-image", "url()");		
		$("#ImgContainer img").attr("src", ImageArray[currentQuestNo])
	}
    //generateRandomNo();
    $(".insText_1").css("display", "none")
    $(".insText_2").css("display", "none")
    loadQuestion();
   controller.assignTranscript(transcript[0]);
    audioPlayer.StartAnimation();

};

function audioFinish() {
    $("#btn_1").css("pointer-events", "auto").css("opacity", "1");
    $('.content_blocker').hide();
    //$('.shell_all_audio').hide();
}

function playAnimation(pageType) {
    $("#btn_1").css("pointer-events", "none").css("opacity", "0.5");;

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
	$("#audio_Icon, #replay_Icon").addClass("deactive").addClass("disabled").css("cursor", "default").css("opacity", "0.5").css("pointer-events", "none");
    $(".Next_Button").css("cursor", "default");
});

function resetVar() {
    currentQuestNo = 0;
    currQnCnt = 0;
	countTries = 0;
	displayedQuestArr=[]
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
	
	countTries = 0;
    $(".feedback_content").css("display", "none");
    $(".Next_Button").addClass("submitBtnDeactive").css("pointer-events", "none");
    checkRandomNo[currentQuestNo] = 1;
    var quesTxt = quesArr[currentQuestNo];
    reviewQus[currentQuestNo] = quesTxt;
    NoOfOptions = Number(optionArr[currentQuestNo].length);
    corrAns = corrAnsArr[currentQuestNo];
    var optionStr = '';
	ShuffleOptArr = []
	tmpOptArr=[]
    for (var j = 0; j < NoOfOptions; j++) {
        ShuffleOptArr[j] = j
		tmpOptArr[j] = "0"
    }
    if (quesType[currentQuestNo] != "true-false") {
		if(ShuffleArr[currentQuestNo] == "true"){
			shuffleArrayFun(ShuffleOptArr)
		}
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
			$(".pageWrapper").css("background-image", "url()");
		}
    } else {
        $(".insText_2").css("display", "block")
        for (var i = 1; i <= NoOfOptions; i++) {
            optionStr += '<div class="RadioTag" id="Radio_' + (ShuffleOptArr[i - 1] + 1)+ '"><small class="rightWrong" style="display:none"></small><span class="MCQCheck" id="option_' + (ShuffleOptArr[i - 1] + 1) + '"></span><div class="opt">' + optionArr[currentQuestNo][ShuffleOptArr[i - 1]] + '</div></div>';
        }
		if(ImageArray[currentQuestNo]!= ""){
			$("#ImgContainer img").attr("src", ImageArray[currentQuestNo])
			$(".pageWrapper").css("background-image", "url()");
		}
    }
    currQnCnt++;
   $(".question_no").html(pageNo)
    $('.question').html(quesTxt);
    $('.options').html(optionStr);
    for (var k = 1; k <= NoOfOptions; k++) {
        userAns[k] = 0;
        //$('option_' + k).removeClass("MCQCheckSelect");
    }
    $('.question_icon').html(currQnCnt);
	
	/*if(model.audioName=="mute.mp3"){
		$("#preloaderSpinner").fadeOut("slow");
	}*/
    KCCheck(NoOfOptions);

}

function KCCheck(noOfOpt) {
    $(".RadioTag").css("cursor", "pointer").css("pointer-events", "auto");
    $(".RadioTag").bind("click", function() {
        no = $(this).attr("id").split("_")[1];
        $(".Next_Button").removeClass("submitBtnDeactive").css("pointer-events", "auto");
        if (quesType[currentQuestNo] == "MCSS") {
            for (var i = 1; i <= noOfOpt; i++) {
                $("#option_" + i).removeClass("MCQRadioSelect").addClass("MCQRadio").parent().removeClass("selected");;
            }
            userSelection = no;
            $("#option_" + no).removeClass("MCQRadio").addClass("MCQRadioSelect").parent().addClass("selected");;
            $(".Next_Button").css("display", "block");
            if ($(".Next_Button").css("cursor") == "default") {
                nextEnable();
            }
        } else {
            if (userAns[no] == no) {
                userAns[no] = 0;
                $("#option_" + no).removeClass("MCQCheckSelect").addClass("MCQCheck").parent().removeClass("selected");;

            } else if (userAns[no] == 0) {
                $("#option_" + no).removeClass("MCQCheck").addClass("MCQCheckSelect").parent().addClass("selected");;
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
        $(".Next_Button").addClass("submitBtnDeactive").css("pointer-events", "none");
    } else {
        if ($(".Next_Button").css("cursor") == "default") {
            nextEnable();
        }
        $(".Next_Button").removeClass("submitBtnDeactive").css("pointer-events", "auto");
    }
}

$('.Continue_Button').click(function() {
    //alert(currQnCnt+":::"+totQuestCount)
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

$('.shell_pop_close').click(function() {
	if (quesType[currentQuestNo] == "MCSS") {
		
		fnTryagainClick();
	} else {
		
		fnTryagainClick();
	}

})

function fnTryagainClick() {
	$("#IncorrectFB").css("display", "none");
	$("#CorrectFB").css("display", "none");
	for (var k = 1; k <= optionArr[currentQuestNo].length; k++) {
		$("#Radio_" +  k).find(".rightWrong").css("display", "none").removeClass("right").removeClass("wrong")
		if (quesType[currentQuestNo] == "MCSS") {
			$("#option_" + k).removeClass("MCQRadioSelect").addClass("MCQRadio").parent().removeClass("selected");
		} else {
			$("#option_" + k).removeClass("MCQCheckSelect").addClass("MCQCheck").parent().removeClass("selected");
			userAns[k] = 0;
		}
		$("#option_" + k).css("cursor", "pointer");
	}
	
	tmpOptArr=[]
    for (var j = 0; j < NoOfOptions; j++) {
		tmpOptArr[j] = "0"
    }
	KCCheck(optionArr[currentQuestNo].length);
	$('.Next_Button').unbind("click");
	$(".Next_Button").addClass("submitBtnDeactive").css("pointer-events", "none");

}

function nextEnable() {
    $('.Next_Button').css("cursor", "pointer");
    $('.Next_Button').click(function() {
		$(".Next_Button").addClass("submitBtnDeactive").css("pointer-events", "auto");
		radioBtnDisable();
        validation();
        nextDisable();
    });

}

function nextDisable() {
    $('.Next_Button').css("cursor", "default");
    $('.Next_Button').unbind();
}

function radioBtnDisable() {
    $(".RadioTag").css("cursor", "default").css("pointer-events", "none");
    $(".RadioTag").unbind();
}

function validation() {
    //userAns[currentQuestNo ]=userSelection;
	countTries++;
	controller.setPageVisited();
    if (quesType[currentQuestNo] == "MCSS") {
        if (userSelection == corrAns) {
            score++;
			//if(countTries>1){
				$("#Radio_" + corrAns).find(".rightWrong").css("display", "block").removeClass("wrong").addClass("right");
			//}
            reviewFeedback[currentQuestNo] = "Correct";
            reviewFeedUserAns[currentQuestNo] = userSelection
			$("#CorrectFB").css("display", "block")
            $(".corFeedbackDiv").html(corrFeedback[currentQuestNo]);
			controller.setPageVisited();
        } else {
			//if(countTries>1){
				$("#Radio_" + userSelection).find(".rightWrong").css("display", "block").removeClass("right").addClass("wrong");
			//}
            reviewFeedback[currentQuestNo] = "Wrong";
            reviewFeedUserAns[currentQuestNo] = userSelection
                $("#IncorrectFB").css("display", "block")
				if(countTries>=noOfTries){
					$(".incorFeedbackDiv").html(IncorrFeedback[currentQuestNo]);
				}else{
					$(".incorFeedbackDiv").html(FirstIncorrFeedback[currentQuestNo]);
				}
            
        }
    } else {
        var corrCnt = 0;
        var userAnsCnt = 0;
        var correctAnsArr = corrAns.split(",");
		var wrongCnt=0
        $(".Next_Button").addClass("submitBtnDeactive").css("pointer-events", "none");
		 $(".RadioTag").find(".rightWrong").css("display", "block");
        var userAnswer = []
        for (var i = 1; i < userAns.length; i++) {
            if (userAns[i] != 0) {
                userAnsCnt++;
				if(countTries>1){
					$("#Radio_" + userAns[i]).find(".rightWrong").css("display", "block").addClass("wrong");
				}
                userAnswer.push(userAns[i])
            }
            for (var j = 0; j < correctAnsArr.length; j++) {
                if (userAns[i] == correctAnsArr[j] && userAns[i] != 0) {
					if(countTries>1){
						$("#Radio_" + correctAnsArr[j]).find(".rightWrong").css("display", "block").removeClass("wrong").addClass("right");
					}
					 tmpOptArr[i-1]="0"
                    corrCnt++;
					break;
                }	else{
					if (userAns[i] != 0) {				
						tmpOptArr[i-1]="1"					
					}
				}
            }	
        }
		
        reviewFeedUserAns[currentQuestNo] = userAnswer
        userAnswer = []
		//console.log(corrCnt+" == "+correctAnsArr.length+" && "+correctAnsArr.length +" == "+ userAnsCnt+" && "+(tmpOptArr.indexOf("1")!== 1))
      if (corrCnt == correctAnsArr.length && correctAnsArr.length == userAnsCnt && tmpOptArr.indexOf("1")!== 1){
			score++;
            reviewFeedback[currentQuestNo] = "Correct";;
			$("#CorrectFB").css("display", "block")
            $(".corFeedbackDiv").html(corrFeedback[currentQuestNo]);
			for (var i = 0; i < userAns.length; i++) {
				$("#Radio_" + correctAnsArr[i]).find(".rightWrong").css("display", "block").removeClass("wrong").addClass("right");
            }
			controller.setPageVisited();
		}else if ((tmpOptArr.indexOf("1") == 1) && (corrCnt >0)){
            reviewFeedback[currentQuestNo] = "Correct";;
			$("#CorrectFB").css("display", "block")
            //$(".corFeedbackDiv").html(PartialIncorrFeedback[currentQuestNo]);
			if(countTries>=noOfTries){
					$(".corFeedbackDiv").html(PartialIncorrFeedback[currentQuestNo]);
				}else{
					$(".corFeedbackDiv").html(FirstIncorrFeedback[currentQuestNo]);
				}
			controller.setPageVisited();
        } else {
            reviewFeedback[currentQuestNo] = "Wrong";
             $("#IncorrectFB").css("display", "block")
			 if(countTries>=noOfTries){
					$(".incorFeedbackDiv").html(IncorrFeedback[currentQuestNo]);
				}else{
					$(".incorFeedbackDiv").html(FirstIncorrFeedback[currentQuestNo]);
				}
           // $(".incorFeedbackDiv").html(IncorrFeedback[currentQuestNo]);
        }
    }
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
   var randoamNumber = Math.floor(Math.random() * totQuest);
    currentQuestNo = randoamNumber;
    if (checkRandomNo[currentQuestNo] == 1) {
        generateRandomNo();
        return;
    }
	displayedQuestArr.push(currentQuestNo)
	$(".assessmentBox").fadeOut("slow", function(){
		loadQuestion();
		$(".assessmentBox").fadeIn("slow");
	});
    
};


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