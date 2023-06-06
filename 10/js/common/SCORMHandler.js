
	/**
 * @author Shiyazudeen
 */

//-- Shortcut for Pipwerks SCORM API Obj
var scorm = pipwerks.SCORM;
var timecnt = 0;
var timeValue = "";
var isScormVersion = false;
var studId = "0";

var SCORMHandler = function() {
	this.timerID = null;
	this.courseCompliance = "1.2";
	this.scormVersion = "1.2";
};

SCORMHandler.prototype.initSCORM = function(scorm_version) {
	this.courseCompliance = scorm_version;
	this.scormVersion = scorm_version != 'local' ? scorm_version : '2004';
	//
	scorm.version = this.scormVersion;
	this.show("Initializing course.");
	var callSucceeded = scorm.init();
	this.show("Call succeeded? " + callSucceeded);
	isScormVersion = callSucceeded;

	if (callSucceeded) {
		//-- If LMS tracks time, this can be commented. This is usefule to trigger any custom alert messages.
		this.startClock();
		//
		var complStr = (this.courseCompliance == "2004") ? "completion_status" : "core.lesson_status";
		if(this.courseCompliance == "2004"){
			var status = this.get('cmi.completion_status');
			if (status == "unknown" || status == "not attempted") {
				//-- Student's first attempt, set value if already not incomplete
				this.set('cmi.completion_status', 'incomplete');
			}
		}else{
			var status = this.get('cmi.core.lesson_status');
			if (status == "unknown" || status == "not attempted") {
				//-- Student's first attempt, set value if already not incomplete
				this.set('cmi.core.lesson_status', 'incomplete');
			}
			
			if (status == "completed"){
				model.CourseComplete=true
			}
		}
		
		Bookmark_location = this.get('cmi.suspend_data');
		studId = this.get('cmi.core.student_id');
	} else {
		Bookmark_location = undefined;
	}
	model.init();
	return callSucceeded;
};

SCORMHandler.prototype.saveBookmark = function() {
	Bookmark_location = model.currTopic + "||"+model.currMod + "||" + model.currPage+ "||" + model.subcurrPage+ "||" + model.subInnercurrPage + "||" + model.visitedArr+"||"+model.prePostTestScorArr+"||"+model.prePostTestAttemptArr+"||"+model.TopicPercentCalcArr;
	this.show("Saving Bookmark");
	this.set('cmi.suspend_data', Bookmark_location);
};

SCORMHandler.prototype.saveScore = function(rawScore) {
	var scoreStr = (this.courseCompliance == "2004") ? "score" : "core.score";
	if(this.courseCompliance == "2004"){
		this.set('cmi.score.raw', rawScore);
		this.set('cmi.score.min', 0);
		this.set('cmi.score.max', 100);
		this.set('cmi.score.scaled', rawScore / 100);
	}else{
		this.set('cmi.core.score.raw', rawScore);
		this.set('cmi.core.score.min', 0);
		this.set('cmi.core.score.max', 100);
		this.set('cmi.core.score.scaled', rawScore / 100);
		
	}
	
};

SCORMHandler.prototype.setSuccessStatus = function(passStatus) {
	if (this.courseCompliance == "2004") {
		if (passStatus == "ASSESSMENT_PASSED") {
			this.set('cmi.success_status', 'passed');
		} else {
			this.set('cmi.success_status', 'failed');
		}
	}
};

SCORMHandler.prototype.complete = function() {
	this.show("Setting course status to 'completed'.");
	/***************
	 * Possible values:
	 * SCORM 1.2:
	 * 		cmi.core.lesson_status (completed, incomplete, passed, failed)
	 * SCORM 2004:
	 *		cmi.completion_status (completed, incomplete, or unknown)
	 *		cmi.success_status (passed, failed, unknown)
	 ***************/
	var complStr = (this.courseCompliance == "2004") ? "completion_status" : "core.lesson_status";
	var callSucceeded
	if(this.courseCompliance == "2004"){
		callSucceeded = this.set('cmi.completion_status', 'completed');
	}else{
		callSucceeded = this.set('cmi.core.lesson_status', 'completed');
	}
	
	this.show("Call succeeded? " + callSucceeded);
	return callSucceeded;
};

SCORMHandler.prototype.set = function(param, value) {
	this.show("Sending: '" + value + "'");
	var callSucceeded = scorm.set(param, value);
	this.show("Call succeeded? " + callSucceeded);
	//-- Commit to forcefully update data to the LMS
	scorm.save();
};

SCORMHandler.prototype.saveId = function(pos, value) {
	this.set('cmi.interactions.' + pos + '.id', value);
};

SCORMHandler.prototype.saveType = function(pos, type) {
	this.set('cmi.interactions.' + pos + '.type', type);
};

SCORMHandler.prototype.UserResponse = function(pos, value) {
	this.set('cmi.interactions.' + pos + '.learner_response', value);
};

SCORMHandler.prototype.saveCorResponse = function(pos, pos1, Question) {
	this.set('cmi.interactions.' + pos + '.correct_responses.' + pos1 + ".pattern", Question);
};

SCORMHandler.prototype.Answerstatus = function(pos, status) {
	this.set('cmi.interactions.' + pos + '.result', status);
};

SCORMHandler.prototype.saveweighting = function(pos, status) {
	this.set('cmi.interactions.' + pos + '.weighting', status);
};

SCORMHandler.prototype.savelatency = function(pos, status) {
	this.set('cmi.interactions.' + pos + '.latency', status);
};

SCORMHandler.prototype.savetimestamp = function(pos, status) {
	this.set('cmi.interactions.' + pos + '.timestamp', status);
};

SCORMHandler.prototype.savedescription = function(pos, status) {
	this.set('cmi.interactions.' + pos + '.description', status);
};

SCORMHandler.prototype.saveobjectives = function(pos, pos1, Question) {
	this.set('cmi.interactions.' + pos + '.objectives.' + pos1 + ".id", Question);
};


SCORMHandler.prototype.getCommentsFromLMS = function() {
	//--DEBUG: Dummy Value -------------------------------------------//
	var dummyLMSData = {
		
	};
	//return dummyLMSData;
	//----------------------------------------------------------------//
	/*return this.get('cmi.comments_from_lms');*/

	if (isScormVersion) {
		return this.get('cmi.comments_from_lms');
	} else {
		return dummyLMSData;
	}
};

SCORMHandler.prototype.setlearnerName = function(name) {

	this.set('cmi.core.student_name', name);
};

SCORMHandler.prototype.get = function(param) {
	var value = scorm.get(param);
	this.show("Received: '" + value + "'");
	return value;
};

SCORMHandler.prototype.end = function() {
	this.show("Terminating connection...");
	this.set('cmi.suspend_data', Bookmark_location);
	this.set('cmi.core.session_time', this.stopClock());
	//-- Commit before terminating
	scorm.save();
	var callSucceeded = scorm.quit();
	this.show("Call succeeded? " + callSucceeded);
};

SCORMHandler.prototype.show = function(msg) {
	//--Debug: To display all SCORM communications
	//console.log('[pip msg]:.... ', msg);
};
SCORMHandler.prototype.startClock = function() {
	calculateTimeSCO();
};
SCORMHandler.prototype.stopClock = function() {
	clearTimeout(this.timerID);
	return String(timeValue);
};

calculateTimeSCO = function() {
	//-- Don't change this function to prototype - it will result in too much recursion in LMS
	timecnt++;
	var newElapsedTime;
	var hours = Math.floor(timecnt / 3600);
	newElapsedTime = timecnt - (hours * 3600);

	var minutes = Math.floor(newElapsedTime / 60);
	newElapsedTime = newElapsedTime - (minutes * 60);

	var seconds = newElapsedTime;

	timeValue = "" + hours;
	if (hours < 10) {
		timeValue = "0" + hours;
	}
	timeValue += ((minutes < 10) ? ":0" : ":") + minutes;
	timeValue += ((seconds < 10) ? ":0" : ":") + seconds;
	//-- Update display

	this.timerID = setTimeout("calculateTimeSCO()", 1000);
};

function finish() {
	//-- This fn is added only for specific. so as not to disturb index.html
	//-- Directly call this where needed
	model.scormHandler.end();
	console.log("LMS called......")
}


 window.onbeforeunload = function() {
	finish(); //please call here lms finish methode...
    return null;
};
