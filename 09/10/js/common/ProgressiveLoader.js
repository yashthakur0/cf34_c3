/**
 * @author Manikandan. S
 */

var ProgressiveLoader = function() {
};

var eventManager = new EventManager();

ProgressiveLoader.timeInterval = null;

ProgressiveLoader.initializeLoader = function() {
	//-- Initializing Progressive Loader
	ProgressiveLoader.loaderCounter = 0;
	ProgressiveLoader.timeInterval = 0;
	ProgressiveLoader.totalAssetsCount = 0;
	ProgressiveLoader.loadedAssetCount = 0;
	ProgressiveLoader.timeInterval = setInterval(ProgressiveLoader.timeIntervalLoop, 50);
};
ProgressiveLoader.timeIntervalLoop = function() {
	//-- Timer which runs based on the interval set
	var localPercentage = 1;
	var assetLoadedPercentage = 0;
	var assetLoadedPercentageLess = -1;
	var rndPercentage = 0;

	rndPercentage = 10 + Math.round(Math.random() * 10);
	//-- This is expiry counter to Auto close the interval if user forgets to terminate
	ProgressiveLoader.expiryCounter++;

	localPercentage = ProgressiveLoader.loaderCounter;

	assetLoadedPercentage = Math.round(((ProgressiveLoader.loadedAssetCount / ProgressiveLoader.totalAssetsCount) * 100));

	// console.log(assetLoadedPercentage + " :: assetLoadedPercentage " + ProgressiveLoader.loadedAssetCount + " :: ProgressiveLoader.loadedAssetCount " + ProgressiveLoader.totalAssetsCount + " :: ProgressiveLoader.totalAssetsCount");
	// console.log('time update' + localPercentage);
	if (ProgressiveLoader.totalAssetsCount == 0) {
		if (Math.random() > .5) {
			localPercentage += Math.round(Math.random());
		}
		if (localPercentage < rndPercentage) {
			ProgressiveLoader.loaderCounter = localPercentage;
		}
	} else {
		//-- If counter is less than loaded assets counter(percentage)
		if (localPercentage <= assetLoadedPercentage) {
			localPercentage += 5;
		} else {
			if (ProgressiveLoader.loadedAssetCount == 0) {
				assetLoadedPercentageLess = ((100 / ProgressiveLoader.totalAssetsCount) - 10);
				if (localPercentage < assetLoadedPercentageLess) {
					localPercentage += Math.round(Math.random());
				}
			} else {
				// if(Math.random()>.9){
				localPercentage += Math.round(Math.random());
				// }
			}
		}
		//-- Stop percentage at 90 till last asset loads
		if (localPercentage < 90) {
			ProgressiveLoader.loaderCounter = localPercentage;
		}
		//-- This condition works after all assets are loaded and steps up the counter to 100
		if (ProgressiveLoader.loadedAssetCount >= ProgressiveLoader.totalAssetsCount) {
			// console.log('pgRedraw: progressive loader');
			// controller.pgRedraw();
			if (localPercentage > 100) {
				localPercentage = 100;
			}
			ProgressiveLoader.loaderCounter = localPercentage;
			if (localPercentage > 100) {
				clearInterval(ProgressiveLoader.timeInterval);
			}
		}
	}
	//
	eventManager.dispatchCustomEvent(ProgressiveLoader, "loaderUpdated", "", "");
	//-- Some lengthy counter to switchoff the interval Automatically
	if (ProgressiveLoader.expiryCounter > 10000) {
		clearInterval(ProgressiveLoader.timeInterval);
	}
	// console.log(ProgressiveLoader.loaderCounter +"  assetLoadedPercentage");
};

ProgressiveLoader.setLoadedAssetCount = function(p_loadedAssetCount) {
	ProgressiveLoader.loadedAssetCount = p_loadedAssetCount;
};

ProgressiveLoader.setTotalAssetsCount = function(p_totalAssetsCount) {
	ProgressiveLoader.totalAssetsCount = p_totalAssetsCount;
};

ProgressiveLoader.getLoaderPercentage = function() {
	// console.log(ProgressiveLoader.loaderCounter);
	return ProgressiveLoader.loaderCounter;
};

ProgressiveLoader.terminateLoader = function() {
	//-- Terminating Progressive Loader
	clearInterval(ProgressiveLoader.timeInterval);
};
