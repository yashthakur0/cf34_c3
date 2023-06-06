$(document).ready(function() {
	$('#SkipButton').click(function() {
		$(".lines-button").removeClass("deactive");
		$(".Papa_indicator").removeClass("deactive");
		$(".Course_Exit").removeClass("deactive");
		$(".NavTour").css("display", "none");
		$('#splashContainer').css('display', 'block');
		audioPlayer.destroyNavAudio();
		ProgressiveLoader.terminateLoader();
	});
});
var navAudioDeskArr_en = [22.3, 24.9, 27.5, 33.1, 36.2, 39.8, 47, 55, 60, 70, 76, 77, 91, 99, 106.5];
var navAudioDeviceArr_en = [0.1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 48, 48, 48, 48, 48, 49.5];
var navAudioTabArr_en = [0.1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 69, 69.5];
var navAudioDeskArr_ar = [27.6, 32.2, 36.1, 43.2, 48.4, 53.2, 61.7, 72.4, 79.0, 90.0, 97.3, 98.3, 118.3, 129.9, 137.5];
var navAudioDeviceArr_ar = [0.1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 48, 48, 48, 48, 48, 49.5];
var navAudioTabArr_ar = [0.1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 69, 69.5];
var navAudioDeskArr_cn = [22, 26, 29, 35, 38, 42, 50, 58, 64, 74, 79, 80, 94, 103, 110.5];
var navAudioDeviceArr_cn = [0.1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 48, 48, 48, 48, 48, 49.5];
var navAudioTabArr_cn = [0.1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 69, 69.5];
var navAudioDeskArr_uk = [22, 25, 27, 33, 36, 40, 47, 54, 59, 69, 75, 75, 87, 95, 101.5];
var navAudioDeviceArr_uk = [0.1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 48, 48, 48, 48, 48, 49.5];
var navAudioTabArr_uk = [0.1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 49, 53, 57, 61, 65, 69.5];
var navAudioDeskArr_ar = [22, 25, 27, 33, 36, 40, 47, 54, 59, 69, 75, 75, 87, 95, 101.5];
var navAudioDeviceArr_ar = [0.1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 48, 48, 48, 48, 48, 49.5];
var navAudioTabArr_ar = [0.1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 49, 53, 57, 61, 65, 69.5];
var navAudioDeskArr_ru = [27.8, 31.5, 35.0, 40.7, 45.2, 49.7, 58.9, 66.5, 74.4, 85.1, 91.6, 92.6, 107.9, 119.2, 126.5];
var navAudioDeviceArr_ru = [0.1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 48, 48, 48, 48, 48, 49.5];
var navAudioTabArr_ru = [0.1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 69, 69.5];
var navAudioDeskArr_ko = [24.8, 27.9, 30.6, 37.1, 40.9, 44.9, 53.7, 61.4, 67.1, 77.5, 84.4, 85.4, 99.8, 109.0, 116.5];
var navAudioDeviceArr_ko = [0.1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 48, 48, 48, 48, 48, 49.5];
var navAudioTabArr_ko = [0.1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 69, 69.5];
var navAudioDeskArr_es = [22.3, 24.9, 27.5, 33.1, 36.2, 39.8, 47, 55, 60, 70, 76, 77, 91, 99, 106.5];
var navAudioDeviceArr_es = [0.1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 48, 48, 48, 48, 48, 49.5];
var navAudioTabArr_es = [0.1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 69, 69.5];
var tll;
function playAnimation() {
}

function playNavAnimation() {
	if (tll) {
		tll.totalProgress(1).kill();
		//$(".popups").css("display", "none");
	}
	tll = new TimelineLite({
		onUpdate : updateSlider,
		onComplete : animCompleted
	});
	controller.ShellBtnDisableforNavTour();
	$(".Shell_menu").css('display', 'block');
	if (device.iPhone() || device.iPad()) {
		$(".audioButton").css("display", "none");
	} else {
		$(".audioButton").css("display", "block");
	}
	var navLang = model.langName.split("/");

	//console.log(this["navAudioDeskArr_"+navLang[0]][0]+":::"+navAudioDeskArr_en[14]+"::::navAudioDeskArr_en:::"+navAudioDeskArr_en.length+"::::"+navLang[0]);
	//console.log(navAudioDeviceArr_en[15]+"::::navAudioDeskArr_en:::"+navAudioDeviceArr_en.length);
	if (!device.iPhone() && !device.iPad() && !device.Android()) {

		//--- Desktop----
		tll.add(animateIn($(".animNavEl_1")).play(), this["navAudioDeskArr_"+navLang[0]][0]);
		tll.add(animateOut($(".animNavEl_1")).play(), this["navAudioDeskArr_"+navLang[0]][1]);
		tll.add(animateIn($(".animNavEl_2")).play(), this["navAudioDeskArr_"+navLang[0]][1]);
		tll.add(animateOut($(".animNavEl_2")).play(), this["navAudioDeskArr_"+navLang[0]][2]);
		tll.add(animateIn($(".animNavEl_3")).play(), this["navAudioDeskArr_"+navLang[0]][2]);
		tll.add(animateOut($(".animNavEl_3")).play(), this["navAudioDeskArr_"+navLang[0]][3]);
		tll.add(animateIn($(".animNavEl_4")).play(), this["navAudioDeskArr_"+navLang[0]][3]);
		tll.add(animateOut($(".animNavEl_4")).play(), this["navAudioDeskArr_"+navLang[0]][4]);
		tll.add(animateIn($(".animNavEl_5")).play(), this["navAudioDeskArr_"+navLang[0]][4]);
		tll.add(animateOut($(".animNavEl_5")).play(), this["navAudioDeskArr_"+navLang[0]][5]);
		tll.add(animateIn($(".animNavEl_6")).play(), this["navAudioDeskArr_"+navLang[0]][5]);
		tll.add(animateOut($(".animNavEl_6")).play(), this["navAudioDeskArr_"+navLang[0]][6]);
		tll.add(animateIn($(".animNavEl_7")).play(), this["navAudioDeskArr_"+navLang[0]][6]);
		tll.add(animateOut($(".animNavEl_7")).play(), this["navAudioDeskArr_"+navLang[0]][7]);
		tll.add(animateIn($(".animNavEl_8")).play(), this["navAudioDeskArr_"+navLang[0]][7]);
		tll.add(animateOut($(".animNavEl_8")).play(), this["navAudioDeskArr_"+navLang[0]][8]);
		tll.add(animateIn($(".animNavEl_9")).play(), this["navAudioDeskArr_"+navLang[0]][8]);
		tll.add(animateOut($(".animNavEl_9")).play(), this["navAudioDeskArr_"+navLang[0]][9]);
		tll.add(animateIn($(".animNavEl_10")).play(), this["navAudioDeskArr_"+navLang[0]][9]);
		tll.add(animateOut($(".animNavEl_10")).play(), this["navAudioDeskArr_"+navLang[0]][10]);
		tll.add(animateIn($(".animNavEl_11")).play(), this["navAudioDeskArr_"+navLang[0]][11]);
		tll.add(animateOut($(".animNavEl_11")).play(), this["navAudioDeskArr_"+navLang[0]][12]);
		tll.add(animateIn($(".animNavEl_14")).play(), this["navAudioDeskArr_"+navLang[0]][11]);
		tll.add(animateOut($(".animNavEl_14")).play(), this["navAudioDeskArr_"+navLang[0]][12]);
		tll.add(animateIn($(".animNavEl_12")).play(), this["navAudioDeskArr_"+navLang[0]][12]);
		tll.add(animateOut($(".animNavEl_12")).play(), this["navAudioDeskArr_"+navLang[0]][13]);
		tll.add(animateIn($(".animNavEl_13")).play(), this["navAudioDeskArr_"+navLang[0]][13]);
		tll.add(animateIn($("#dummySynch")).play(), this["navAudioDeskArr_"+navLang[0]][14]);
	} else {

		//--- Device-----
		/*if (device.iPad() || device.AndroidTablet()) {
			tll.add(animateIn($(".animNavEl_1")).play(), this["navAudioTabArr_"+navLang[0]][0]);
			tll.add(animateOut($(".animNavEl_1")).play(), this["navAudioTabArr_"+navLang[0]][1]);
			tll.add(animateIn($(".animNavEl_2")).play(), this["navAudioTabArr_"+navLang[0]][1]);
			tll.add(animateOut($(".animNavEl_2")).play(), this["navAudioTabArr_"+navLang[0]][2]);
			tll.add(animateIn($(".animNavEl_3")).play(), this["navAudioTabArr_"+navLang[0]][2]);
			tll.add(animateOut($(".animNavEl_3")).play(), this["navAudioTabArr_"+navLang[0]][3]);
			tll.add(animateIn($(".animNavEl_4")).play(), this["navAudioTabArr_"+navLang[0]][3]);
			tll.add(animateOut($(".animNavEl_4")).play(), this["navAudioTabArr_"+navLang[0]][4]);
			tll.add(animateIn($(".animNavEl_5")).play(), this["navAudioTabArr_"+navLang[0]][4]);
			tll.add(animateOut($(".animNavEl_5")).play(), this["navAudioTabArr_"+navLang[0]][5]);
			tll.add(animateIn($(".animNavEl_6")).play(), this["navAudioTabArr_"+navLang[0]][5]);
			tll.add(animateOut($(".animNavEl_6")).play(), this["navAudioTabArr_"+navLang[0]][6]);

			tll.add(animateIn($(".animNavEl_9")).play(), this["navAudioTabArr_"+navLang[0]][6]);
			tll.add(animateOut($(".animNavEl_9")).play(), this["navAudioTabArr_"+navLang[0]][7]);
			tll.add(animateIn($(".animNavEl_10")).play(), this["navAudioTabArr_"+navLang[0]][7]);
			tll.add(animateOut($(".animNavEl_10")).play(), this["navAudioTabArr_"+navLang[0]][8]);
			tll.add(animateIn($(".animNavEl_11")).play(), this["navAudioTabArr_"+navLang[0]][8]);
			tll.add(animateOut($(".animNavEl_11")).play(), this["navAudioTabArr_"+navLang[0]][10]);

			tll.add(animateIn($(".animNavEl_14")).play(), this["navAudioTabArr_"+navLang[0]][8]);
			tll.add(animateOut($(".animNavEl_14")).play(), this["navAudioTabArr_"+navLang[0]][9]);

			tll.add(animateIn($(".animNavEl_12")).play(), this["navAudioTabArr_"+navLang[0]][9]);
			tll.add(animateOut($(".animNavEl_12")).play(), this["navAudioTabArr_"+navLang[0]][10]);
			tll.add(animateIn($(".animNavEl_13")).play(), this["navAudioTabArr_"+navLang[0]][10]);
			tll.add(animateOut($(".animNavEl_13")).play(), this["navAudioTabArr_"+navLang[0]][11]);

			tll.add(animateIn($(".animNavEl_7")).play(), this["navAudioTabArr_"+navLang[0]][11]);
			tll.add(animateOut($(".animNavEl_7")).play(), this["navAudioTabArr_"+navLang[0]][12]);
			tll.add(animateIn($(".animNavEl_8")).play(), this["navAudioTabArr_"+navLang[0]][13]);
			tll.add(animateOut($(".animNavEl_8")).play(), this["navAudioTabArr_"+navLang[0]][14]);
			tll.add(animateIn($("#dummySynch")).play(), this["navAudioTabArr_"+navLang[0]][15]);
		} else {*/
			tll.add(animateIn($(".animNavEl_1")).play(), this["navAudioDeviceArr_"+navLang[0]][0]);
			tll.add(animateOut($(".animNavEl_1")).play(), this["navAudioDeviceArr_"+navLang[0]][1]);
			tll.add(animateIn($(".animNavEl_2")).play(), this["navAudioDeviceArr_"+navLang[0]][1]);
			tll.add(animateOut($(".animNavEl_2")).play(), this["navAudioDeviceArr_"+navLang[0]][2]);
			tll.add(animateIn($(".animNavEl_3")).play(), this["navAudioDeviceArr_"+navLang[0]][2]);
			tll.add(animateOut($(".animNavEl_3")).play(), this["navAudioDeviceArr_"+navLang[0]][3]);
			tll.add(animateIn($(".animNavEl_4")).play(), this["navAudioDeviceArr_"+navLang[0]][3]);
			tll.add(animateOut($(".animNavEl_4")).play(), this["navAudioDeviceArr_"+navLang[0]][4]);
			tll.add(animateIn($(".animNavEl_5")).play(), this["navAudioDeviceArr_"+navLang[0]][4]);
			tll.add(animateOut($(".animNavEl_5")).play(), this["navAudioDeviceArr_"+navLang[0]][5]);
			tll.add(animateIn($(".animNavEl_6")).play(), this["navAudioDeviceArr_"+navLang[0]][5]);
			tll.add(animateOut($(".animNavEl_6")).play(), this["navAudioDeviceArr_"+navLang[0]][6]);

			tll.add(animateIn($(".animNavEl_9")).play(), this["navAudioDeviceArr_"+navLang[0]][6]);
			tll.add(animateOut($(".animNavEl_9")).play(), this["navAudioDeviceArr_"+navLang[0]][7]);
			tll.add(animateIn($(".animNavEl_10")).play(), this["navAudioDeviceArr_"+navLang[0]][7]);
			tll.add(animateOut($(".animNavEl_10")).play(), this["navAudioDeviceArr_"+navLang[0]][8]);
			tll.add(animateIn($(".animNavEl_11")).play(), this["navAudioDeviceArr_"+navLang[0]][8]);
			tll.add(animateOut($(".animNavEl_11")).play(), this["navAudioDeviceArr_"+navLang[0]][10]);

			tll.add(animateIn($(".animNavEl_14")).play(), this["navAudioDeviceArr_"+navLang[0]][8]);
			tll.add(animateOut($(".animNavEl_14")).play(), this["navAudioDeviceArr_"+navLang[0]][9]);

			tll.add(animateIn($(".animNavEl_12")).play(), this["navAudioDeviceArr_"+navLang[0]][9]);
			tll.add(animateOut($(".animNavEl_12")).play(), this["navAudioDeviceArr_"+navLang[0]][10]);
			tll.add(animateIn($(".animNavEl_13")).play(), this["navAudioDeviceArr_"+navLang[0]][10]);
			tll.add(animateOut($(".animNavEl_13")).play(), this["navAudioDeviceArr_"+navLang[0]][11]);

			tll.add(animateIn($(".animNavEl_7")).play(), this["navAudioDeviceArr_"+navLang[0]][11]);
			tll.add(animateOut($(".animNavEl_7")).play(), this["navAudioDeviceArr_"+navLang[0]][12]);
			tll.add(animateIn($(".animNavEl_8")).play(), this["navAudioDeviceArr_"+navLang[0]][13]);
			tll.add(animateOut($(".animNavEl_8")).play(), this["navAudioDeviceArr_"+navLang[0]][14]);
			tll.add(animateIn($("#dummySynch")).play(), this["navAudioDeviceArr_"+navLang[0]][15]);
		//}
	}
}