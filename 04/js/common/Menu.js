var Menu = function(data) {
	//public
	this.visitedArr = [];	
	//private
	xmlData = data;
	cMode = 0;
	this.pageCounter = 1;
	eventsObj = [];
	this.prevMod_mod = null;
	this.prevPage_page = "blank";
	this.prevPage_mod = "";
	this.totaltitles = '';
	this.openedMenu = '0';
	preModClick = '';
	preModL1Click = '';
	prePagL1Click = '';
	preSubPageL2Click = '';
	preInnerpaeL2Click = '';
	pgRunningCount = 0;
};

Menu.prototype.createMenu = function() {
	var structureTag = xmlData.getElementsByTagName("structure")[0];
	model.tTopics = structureTag.getElementsByTagName("topic").length;
	for (var i = 0; i < model.tTopics; i++) {
		model.ModuleTitleArr[i]=[];
		model.SubPageTitleLevel1Arr[i]=[]
		model.SubPageTitleLevel2Arr[i]=[]
		model.PageTitleArr[i]=[]
		model.tPagesArr[i]=[]
		model.subL1PagesArr[i]=[]
		model.subL2PagesArr[i]=[]
		model.subPageL1[i]=[]
		model.subInnerPageL2[i]=[]
		model.modArr[i]=[]
		model.visitedArr[i]=[]
		model.ModuleCompArr[i]=[]
		model.pageCompletionArr[i]=[]
		model.subPageCompletionArr[i]=[]
		model.subInnerPageCompletionArr[i]=[]
		model.ModulePercentCalcArr[i]=[]
		model.TopicPercentCalcArr.push("0")
		model.topicCompletionArr.push("0")
		model.prePostTestScorArr.push("0")
		model.prePostTestAttemptArr.push("0")
		model.TopicTitleArr[i]=structureTag.getElementsByTagName("topic")[i].getAttribute("title")
		model.tModulesArr[i]=structureTag.getElementsByTagName("topic")[i].getElementsByTagName("module").length
		$("#topicDropDown").append( '<option value='+ i+'>' +  model.TopicTitleArr[i] + '</option>' )
		//id="topicDropDown"
		$("#menuDropDown").append( '<a href="#" id="topMenu_'+i+'">' + model.TopicTitleArr[i] +'</a>') //'<option value='+ i+'>' +  model.TopicTitleArr[i] + '</option>' )
		//
		$("#topMenu_"+i).off().on("click", function(e){
			var item = e.target.id.split("_")[1]
			//console.log("which item", item)
			changeMenu( item)
		})
		model.totalPages=0
		for (var j = 0; j < model.tModulesArr[i]; j++) {
			model.subL2PagesArr[i][j]=[]
			model.subL1PagesArr[i][j]=[]
			model.SubPageTitleLevel1Arr[i][j]=[]
			model.SubPageTitleLevel2Arr[i][j]=[]
			model.PageTitleArr[i][j]=[]
			model.modArr[i][j]=[]
			model.visitedArr[i][j]=[]
			model.subPageL1[i][j]=[]
			model.subInnerPageL2[i][j]=[]
			model.pageCompletionArr[i][j]=[]
			model.subPageCompletionArr[i][j]=[]
			model.subInnerPageCompletionArr[i][j]=[]
			model.ModuleCompArr[i].push("0")
			model.ModulePercentCalcArr[i].push("0")
			model.tPagesArr[i][j]=structureTag.getElementsByTagName("topic")[i].getElementsByTagName("module")[j].getElementsByTagName("page").length
			model.ModuleTitleArr[i][j]=structureTag.getElementsByTagName("topic")[i].getElementsByTagName("module")[j].getAttribute("title")
			for (var k = 0; k < model.tPagesArr[i][j]; k++) {
				model.SubPageTitleLevel2Arr[i][j][k]=[]
				model.SubPageTitleLevel1Arr[i][j][k]=[]
				model.subL2PagesArr[i][j][k]=[]
				model.subL1PagesArr[i][j][k]=structureTag.getElementsByTagName("topic")[i].getElementsByTagName("module")[j].getElementsByTagName("page")[k].getElementsByTagName("subpage").length
				var hasSubpageLevel1=structureTag.getElementsByTagName("topic")[i].getElementsByTagName("module")[j].getElementsByTagName("page")[k].getAttribute("subpagelevel")
				
				model.subInnerPageL2[i][j][k]=[]
				model.PageTitleArr[i][j][k]=structureTag.getElementsByTagName("topic")[i].getElementsByTagName("module")[j].getElementsByTagName("page")[k].getAttribute("title")
				model.pageCompletionArr[i][j][k] = "0";
				
				if((hasSubpageLevel1 == "undefined") || (hasSubpageLevel1 == undefined)|| (hasSubpageLevel1 == "null") || (hasSubpageLevel1 == null)){
					var pTag = structureTag.getElementsByTagName("topic")[i].getElementsByTagName("module")[j].getElementsByTagName("page")[k]
					model.totalPages++
					model.modArr[i][j][k]={
						"path" : pTag.getAttribute("path"),
						"audio" : pTag.getAttribute("audio"),
						"data" : pTag.getAttribute("data"),
						"styles" : pTag.getAttribute("styles"),
						"scripts" : model.commonJsPath+pTag.getAttribute("scripts"),
						"titles" : pTag.getAttribute("title"),
						"types" : pTag.getAttribute("type"),
						"pageNo": model.totalPages
					}
					model.visitedArr[i][j][k] = "0";
				}else{
					model.modArr[i][j][k]=[]
					model.subPageCompletionArr[i][j][k]=[]
					model.subInnerPageCompletionArr[i][j][k]=[]
					model.visitedArr[i][j][k] =[]
					model.subInnerPageL2[i][j][k] =[]
					model.subPageL1[i][j][k]=hasSubpageLevel1
					for (var l = 0; l < model.subL1PagesArr[i][j][k]; l++) {
						model.SubPageTitleLevel2Arr[i][j][k][l] =[]
						model.subL2PagesArr[i][j][k][l]=structureTag.getElementsByTagName("topic")[i].getElementsByTagName("module")[j].getElementsByTagName("page")[k].getElementsByTagName("subpage")[l].getElementsByTagName("innersubpage").length
						var hasSubpageLevel2=structureTag.getElementsByTagName("topic")[i].getElementsByTagName("module")[j].getElementsByTagName("page")[k].getElementsByTagName("subpage")[l].getAttribute("subpagelevel")
						model.SubPageTitleLevel1Arr[i][j][k][l]=structureTag.getElementsByTagName("topic")[i].getElementsByTagName("module")[j].getElementsByTagName("page")[k].getElementsByTagName("subpage")[l].getAttribute("title")
						model.subPageCompletionArr[i][j][k][l] = "0";
						if((hasSubpageLevel2 == "undefined") || (hasSubpageLevel2 == undefined)|| (hasSubpageLevel2 == "null") || (hasSubpageLevel2 == null)){
							var pTag = structureTag.getElementsByTagName("topic")[i].getElementsByTagName("module")[j].getElementsByTagName("page")[k].getElementsByTagName("subpage")[l]
							model.totalPages++
							model.modArr[i][j][k][l]={
								"path" : pTag.getAttribute("path"),
								"audio" : pTag.getAttribute("audio"),
								"data" : pTag.getAttribute("data"),
								"styles" : pTag.getAttribute("styles"),
								"scripts" : model.commonJsPath+pTag.getAttribute("scripts"),
								"titles" : pTag.getAttribute("title"),
								"types" : pTag.getAttribute("type"),
								"pageNo": model.totalPages
							}	
							model.visitedArr[i][j][k][l] = "0";
						}else{
							model.modArr[i][j][k][l]=[]
							model.visitedArr[i][j][k][l] =[]
							model.subInnerPageL2[i][j][k][l]=hasSubpageLevel2
							model.subInnerPageCompletionArr[i][j][k][l]=[]
							for (var m = 0; m < model.subL2PagesArr[i][j][k][l]; m++) {
								model.SubPageTitleLevel2Arr[i][j][k][l][m]= structureTag.getElementsByTagName("topic")[i].getElementsByTagName("module")[j].getElementsByTagName("page")[k].getElementsByTagName("subpage")[l].getElementsByTagName("innersubpage")[m].getAttribute("title")
								var pTag = structureTag.getElementsByTagName("topic")[i].getElementsByTagName("module")[j].getElementsByTagName("page")[k].getElementsByTagName("subpage")[l].getElementsByTagName("innersubpage")[m]
								
								model.subInnerPageCompletionArr[i][j][k][l][m]= "0";
								model.totalPages++
								model.modArr[i][j][k][l][m]={
									"path" : pTag.getAttribute("path"),
									"audio" : pTag.getAttribute("audio"),
									"data" : pTag.getAttribute("data"),
									"styles" : pTag.getAttribute("styles"),
									"scripts" : model.commonJsPath+pTag.getAttribute("scripts"),
									"titles" : pTag.getAttribute("title"),
									"types" : pTag.getAttribute("type"),
									"pageNo": model.totalPages
								}
								model.visitedArr[i][j][k][l][m] = "0";
							}
						}
					}
					
				}
			}
		}
		//this.createModule($("#Menudrp"), structureTag.getElementsByTagName("module")[i], i);
	}
	  
	beginCourse();
	$("#menuDropDown").mCustomScrollbar();
	function changeMenu( mid){
		//console.log(mid+" From change Menu  model.currTopic "+model.currTopic);
		if(model.currTopic!=mid){
			model.currTopic = mid;
			menu.generateModule(model.currTopic);
			$("#menuDropDown a").removeClass("selected")
			$("#topMenu_"+model.currTopic).addClass("selected")		
			menu.ReassignCurrentPageNofun()
			$("#dd_menu_btn").text(model.TopicTitleArr[model.currTopic]);
			if(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[0].getElementsByTagName("page")[0].getAttribute("subpagelevel")=="1"){
				if((model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[0].getElementsByTagName("page")[0].getAttribute("subpagelevel")=="1")&&(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[0].getElementsByTagName("page")[0].getElementsByTagName("subpage")[0].getAttribute("subpagelevel")==null)){
					controller.managePageClick(model.currTopic, 0, 0, 0, -1);	
				}else if((model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[0].getElementsByTagName("page")[0].getAttribute("subpagelevel")=="1")&&(model.menuData.getElementsByTagName("topic")[model.currTopic].getElementsByTagName("module")[0].getElementsByTagName("page")[0].getElementsByTagName("subpage")[0].getAttribute("subpagelevel")=="2")){
					controller.managePageClick(model.currTopic, 0, 0, 0, 0);
				}
			}else{
				controller.managePageClick(model.currTopic, 0, 0, -1, -1);	
			}
			$("#Menudrp").slideToggle();
		}
	}
};

Menu.prototype.generateModule = function(currTopicNo) {
	var structureTag = xmlData.getElementsByTagName("structure")[0];
	model.totalPages=0
	//$("#parentMenu").mCustomScrollbar("destroy");
	//$("#parentMenu").children().empty();
	for (var t = 0; t < model.tTopics; t++) {
		for (var u = 0; u < model.tModulesArr[t]; u++) {
			var moduleGen = "shell_mod_"+u;
			$("#shell_mod_" + u +"_title").removeClass("icon-partialcompleted").removeClass("icon-fullyCompleted").removeClass("icon-notcompleted");
			$("#" + moduleGen).remove();
			$("#" + moduleGen + "_pages").remove()
		}
		
	}
		for (var i = 0; i < model.ModuleTitleArr[currTopicNo].length; i++) {
			var id = "shell_mod_"+i;
			var mCon = $("#parentMenu").append("<li id = '" + id + "' class='rootmod l1closed'></li>");
			$("#" + id).css("cursor", "pointer")
			
			$("#ModuleTitle").html(model.ModuleTitleArr[model.currTopic][model.currMod])
			//$("#" + id).append("<ul id='" + id + "_pages' class='collapse list-group-submenu shell_menu_page_container_style'></ul>");
			//Modules Added
			
			if(((model.tPagesArr[currTopicNo][model.tModulesArr[model.currTopic]-1]==1)||(model.tPagesArr[currTopicNo][model.tModulesArr[model.currTopic]-1]==3))&&((model.modArr[model.currTopic].length-1)==(i))){
				$("#" + id ).append("<a href='#'  id='" + id + "_title' data-mod='" + i + "' class='Module' data-toggle='false' data-parent='#" + id + "_pages'>" + model.ModuleTitleArr[currTopicNo][i] + "<i class=''></i></a>");
			}else{
				$("#" + id ).append("<a href='#'  id='" + id + "_title' data-mod='" + i + "' class='Module' data-toggle='false' data-parent='#" + id + "_pages'>" + model.ModuleTitleArr[currTopicNo][i] + "<i class=''></i></a>");
			
				$("#" + id).append("<ul id='Mod_" + i + "_pages' class=''></ul>");
			
				for(var j = 0; j < model.PageTitleArr[currTopicNo][i].length; j++){
					var pageID = "Mod_" + i + "_page_" + j;
					//Pages Added
					if(structureTag.getElementsByTagName("topic")[currTopicNo].getElementsByTagName("module")[i].getElementsByTagName("page")[j].getAttribute("subpagelevel")!="1"){
						model.totalPages++
					}
					$("#Mod_" + i + "_pages").append("<li id='subPage_"+i+"_"+j+"' class='subLevel l2closed'><a href='#'  id='" + pageID + "'role='button' data-pagNo='"+model.totalPages+"'  data-page='" + i + "' data-mod='" + i+"_"+j + "' class='' data-parent='#" + id + "_pages'><span class='menu-pgnum'> </span><span class='menu-pgtxt'>" +  model.PageTitleArr[currTopicNo][i][j]+ "</span></a></li>");

					// SubPages adding
					var subPageLevel1= structureTag.getElementsByTagName("topic")[currTopicNo].getElementsByTagName("module")[i].getElementsByTagName("page")[j].getAttribute("subpagelevel")
					
					if(structureTag.getElementsByTagName("topic")[currTopicNo].getElementsByTagName("module")[i].getElementsByTagName("page")[j].getAttribute("subpagelevel")=="1"){
						//$("#Mod_" + i + "_pages").append("<ul id='Mod_" + i + "_pages_"+j+"_SubPage' class='collapse list-group-submenu shell_menu_page_container_style'></ul>");
						$("#subPage_" + i + "_"+j).append("<ul id='Mod_" + i + "_pages_"+j+"_SubPage' class=''></ul>");
						for(var k = 0; k < model.subL1PagesArr[currTopicNo][i][j]; k++){
							var pageID = "Mod_" + i + "_page_" + j+"_Spage_"+k;
							if(structureTag.getElementsByTagName("topic")[currTopicNo].getElementsByTagName("module")[i].getElementsByTagName("page")[j].getElementsByTagName("subpage")[k].getAttribute("subpagelevel")!="2"){
								model.totalPages++
							}
							$("#Mod_" + i + "_pages_"+j+"_SubPage").append("<li id='subPage_"+i+"_"+j+"_"+k+"' class='subInnerLevel l3closed'><a href='#'  id='" + pageID + "'role='button'  data-pagNo='"+model.totalPages+"' data-page='" + i + "'data-mod='" + i +"_"+j+"_"+k + "' class='' data-parent='#" + id + "_pages'><span class='menu-pgnum'> </span><span class='menu-pgtxt'>" +  model.SubPageTitleLevel1Arr[currTopicNo][i][j][k]+ "</span></a></li>");
							
							//Inner Subpages adding
							var subPageLevel2= structureTag.getElementsByTagName("topic")[currTopicNo].getElementsByTagName("module")[i].getElementsByTagName("page")[j].getElementsByTagName("subpage")[k].getAttribute("subpagelevel")
					
							if(structureTag.getElementsByTagName("topic")[currTopicNo].getElementsByTagName("module")[i].getElementsByTagName("page")[j].getElementsByTagName("subpage")[k].getAttribute("subpagelevel")=="2"){
								//$("#Mod_" + i + "_pages_"+j+"_SubPage").append("<ul id='Mod_" + i + "_pages_"+j+"_SubPage_"+k+"_InnerPage' class='collapse list-group-submenu shell_menu_page_container_style'></ul>");
								$("#subPage_"+i+"_"+j+"_"+k).append("<ul id='Mod_" + i + "_pages_"+j+"_SubPage_"+k+"_InnerPage' class=''></ul>");
								for(var l = 0; l < model.subL2PagesArr[currTopicNo][i][j][k];l++){
									var pageID = "Mod_" + i + "_page_" + j+"_Spage_"+k+"_ISpage_"+l;
									model.totalPages++
									$("#Mod_" + i + "_pages_"+j+"_SubPage_"+k+"_InnerPage").append("<li><a href='#'  id='" + pageID + "'role='button'  data-pagNo='"+model.totalPages+"' data-page='" + i + "'data-mod='" + i+"_"+j+"_"+k+"_"+l + "' href='#' class='Subpageinner' data-parent='#" + id + "_pages'><span class='menu-pgnum'> </span><span class='menu-pgtxt'>" +  model.SubPageTitleLevel2Arr[currTopicNo][i][j][k][l]+ "</span></a></li>");
							
								}
							}
					
						}
					}
				}
			}	
	}
	$("#dd_menu_btn").text(model.TopicTitleArr[model.currTopic])
	this.OpenCloseMenuFun(currTopicNo)
	$('#parentMenu').mgaccordion();
	$(".menuScrollWrapper").mCustomScrollbar("destroy");
	$(".menuScrollWrapper").mCustomScrollbar();
}

Menu.prototype.ReassignCurrentPageNofun = function() {
	// To reassign the current topic, module, page values to the menu
	preModClick=model.currMod
	preModL1Click=model.currMod
	prePagL1Click=model.currPage
	preSubPageL2Click=model.currPage
	preInnerpaeL2Click=model.subcurrPage
}


Menu.prototype.OpenCloseMenuFun = function(currTopicNo) {
	var structureTag = xmlData.getElementsByTagName("structure")[0];
	for (var i = 0; i < model.ModuleTitleArr[currTopicNo].length; i++) {
		//Modules Added
		var id = "shell_mod_"+i+"_title";
		$("#" + id).off().on("click", function() {
			var curid = $(this).data("mod");
			//if(model.currMod)
				//	console.log($("#shell_mod_"+curid).hasClass("l1closed")+" $(#shell_mod+curid).hasClass(l1closed")
				//if((model.tmpMenuClick!=curid)||(curid==(model.modArr[model.currTopic].length-1))){
					$(".rootmod").addClass('l1closed');
					$(".subLevel").addClass('l2closed');
					$(".subInnerLevel").addClass('l3closed');
					$(".Module").removeClass('openItem');
					if(model.subInnercurrPage!=-1){
						if($("#Mod_"+model.currMod+"_page_"+model.currPage+"_Spage_"+model.subcurrPage).hasClass("openItem")){
							$("#subPage_"+model.currMod+"_"+model.currPage+"_"+model.subcurrPage).removeClass('l3closed');
						}else{
							$("#subPage_"+model.currMod+"_"+model.currPage+"_"+model.subcurrPage).addClass('l3closed');
						}
					}
					if(model.subcurrPage!=-1){
						if($("#Mod_"+model.currMod+"_page_"+model.currPage).hasClass("openItem")){
							$("#subPage_"+model.currMod+"_"+model.currPage).removeClass('l2closed');
						}else{
							$("#subPage_"+model.currMod+"_"+model.currPage).addClass('l2closed');
						}
						
					}
					if($("#Mod_"+curid+"_pages").is(':visible')){
						$("#shell_mod_"+curid).addClass('l1closed');
					}else{
						$("#shell_mod_"+curid).removeClass('l1closed');
					}
				/*	model.tmpMenuClick=curid
					model.tmpMenuClickFlg=true
				}else{
					model.tmpMenuClickFlg=false
				}*/
					
				/*if($("#shell_mod_"+curid).hasClass("l1closed")){
					
				}*/
				
			if((curid==(model.modArr[model.currTopic].length-1))&&(model.currPage==0)&&(model.currMod==curid)){
				$("#closeMenuPopup").trigger("click", this.fnClick);
				return
			}
			if((curid==(model.modArr[model.currTopic].length-1))){
				controller.managePageClick(currTopicNo, curid, 0, -1, -1);
				$("#Menudrp").slideToggle();
			}
		})
		
		for(var j = 0; j < model.PageTitleArr[currTopicNo][i].length; j++){
			//Pages Added
			var pageID = "Mod_" + i + "_page_" + j;
			
			$("#" + pageID).off().on("click", function() {
				var curmod = $(this).data("mod").split("_")[0];
				var curpage = $(this).data("mod").split("_")[1];
					$(".subLevel").addClass('l2closed');
					$(".subInnerLevel").addClass('l3closed');
					if(model.subInnercurrPage!=-1){
						if($("#Mod_"+model.currMod+"_page_"+model.currPage+"_Spage_"+model.subcurrPage).hasClass("openItem")){
							$("#subPage_"+model.currMod+"_"+model.currPage+"_"+model.subcurrPage).removeClass('l3closed');
						}else{
							$("#subPage_"+model.currMod+"_"+model.currPage+"_"+model.subcurrPage).addClass('l3closed');
						}
					}
					if(model.currMod==curmod){
						$("#shell_mod_"+model.currMod).removeClass('l1closed');
					}
					if($("#Mod_"+curmod+"_pages_"+curpage+"_SubPage").is(':visible')){
						$("#subPage_"+curmod+"_"+curpage).addClass('l2closed');
					}else{
						$("#subPage_"+curmod+"_"+curpage).removeClass('l2closed');
					}
					if((curmod==model.currMod)&&(model.currPage==curpage)){
							
					}else{
						// SubPages adding
						var subPageLevel1= structureTag.getElementsByTagName("topic")[currTopicNo].getElementsByTagName("module")[curmod].getElementsByTagName("page")[curpage].getAttribute("subpagelevel")
						if(subPageLevel1=="1"){
							
						}else{
							controller.managePageClick(currTopicNo, curmod, curpage, -1, -1);
							$("#Menudrp").slideToggle()
						}
					}
				
			})
			for(var k = 0; k < model.subL1PagesArr[currTopicNo][i][j]; k++){
				var pageID = "Mod_" + i + "_page_" + j+"_Spage_"+k;			
				$("#" + pageID).off().on("click", function() {
					var curmod = $(this).data("mod").split("_")[0];
					var curPage = $(this).data("mod").split("_")[1];
					var cursubpage = $(this).data("mod").split("_")[2];
					$(".subInnerLevel").addClass('l3closed');
					if($("#Mod_"+curmod+"_pages_"+curPage+"_SubPage_"+cursubpage+"_InnerPage").is(':visible')){
						$("#subPage_"+curmod+"_"+curPage+"_"+cursubpage).addClass('l3closed');
					}else{
						$("#subPage_"+curmod+"_"+curPage+"_"+cursubpage).removeClass('l3closed');
					}
					if((curmod==model.currMod)&&(model.currPage==curPage)&&(model.subcurrPage==cursubpage)){
						
					}else{
						//Inner Subpages adding
						if(structureTag.getElementsByTagName("topic")[currTopicNo].getElementsByTagName("module")[curmod].getElementsByTagName("page")[curPage].getElementsByTagName("subpage")[cursubpage].getAttribute("subpagelevel")=="2"){
							
						}	else{
							controller.managePageClick(currTopicNo, curmod, curPage, cursubpage, -1);
							$("#Menudrp").slideToggle()
						}
					}
				})
				
				for(var l = 0; l < model.subL2PagesArr[currTopicNo][i][j][k];l++){
					var pageID = "Mod_" + i + "_page_" + j+"_Spage_"+k+"_ISpage_"+l;
					$("#" + pageID).off().on("click", function() {
						var curmod = $(this).data("mod").split("_")[0];
						var curPage = $(this).data("mod").split("_")[1];
						var cursubpage = $(this).data("mod").split("_")[2];
						var cursubInnerpage = $(this).data("mod").split("_")[3];
						if((curmod==model.currMod)&&(model.currPage==curPage)&&(model.subcurrPage==cursubpage)&&(model.subInnercurrPage==cursubInnerpage)){
							
						}else{
							controller.managePageClick(currTopicNo, curmod, curPage, cursubpage, cursubInnerpage);
							$("#Menudrp").slideToggle();
						}
						
					})
					
				}
				
			}	
		}
	}	
			
};

Menu.prototype.updateMenu = function(topic, mod, pag, supPag, innerpag, visitedArr) {	
	
	if(model.subPageInnerFlg){
		var tmpInnerPagCnt=0
		var node_3 = $("#Mod_" +mod+"_page_"+pag+"_Spage_"+supPag+"_ISpage_"+innerpag)
		node_3.removeClass(node_3.attr("class"));
		
		if ((model.visitedArr[topic][mod][pag][supPag][innerpag] == 1 || model.visitedArr[topic][mod][pag][supPag][innerpag]  == '1')) {
			node_3.addClass("icon-partialcompleted").css("cursor", "pointer");
			model.subPageCompletionArr[topic][mod][pag][supPag]="1"
		}else if ((model.visitedArr[topic][mod][pag][supPag][innerpag] == 2 || model.visitedArr[topic][mod][pag][supPag][innerpag] == '2')) {
			node_3.addClass("icon-fullyCompleted").css("cursor", "pointer");
			for (var i = 0; i < model.visitedArr[topic][mod][pag][supPag].length; i++) {
				 if ((model.visitedArr[topic][mod][pag][supPag][i] == 2 || model.visitedArr[topic][mod][pag][supPag][i] == '2')) {
					 tmpInnerPagCnt++
				 }
			}
			if(tmpInnerPagCnt==model.visitedArr[topic][mod][pag][supPag].length){
				model.subPageCompletionArr[topic][mod][pag][supPag]="2"
				var node_2 =$("#Mod_" + topic +"_page_"+mod+"_Spage_"+pag)
				node_2.removeClass("icon-partialcompleted").removeClass("icon-fullyCompleted").removeClass("icon-notcompleted");
				node_2.addClass("icon-fullyCompleted").css("cursor", "pointer");
			}
			var tmpSubPagTrack=0
			for (var i = 0; i < model.visitedArr[topic][mod][pag].length; i++) {
				 if ((model.subPageCompletionArr[topic][mod][pag][i] == 2 || model.subPageCompletionArr[topic][mod][pag][i] == '2')) {
					 tmpSubPagTrack++
				 }
			}
			if(tmpSubPagTrack==model.subPageCompletionArr[topic][mod][pag].length){
				model.pageCompletionArr[topic][mod][pag]="2"
				var node_4 =$("#Mod_" + topic +"_page_"+mod)
				node_4.removeClass("icon-partialcompleted").removeClass("icon-fullyCompleted").removeClass("icon-notcompleted");
				node_4.addClass("icon-fullyCompleted").css("cursor", "pointer");
			}
		}else if ((model.visitedArr[topic][mod][pag][supPag][innerpag]  == 0 || model.visitedArr[topic][mod][pag][supPag][innerpag] == '0')) {
			node_3.addClass("icon-notcompleted").css("cursor", "pointer");
		} 
		//add click state to current page
		node_3.addClass("Active ");
		//node_3.css("cursor", "default")
		
	}else if(model.subPageFlg){
		var node_1 = $("#Mod_" + mod +"_page_"+pag+"_Spage_"+supPag)
		node_1.removeClass(node_1.attr("class"));
		//node_1.removeClass("Active").removeClass("icon-partialcompleted").removeClass("icon-fullyCompleted").removeClass("icon-notcompleted");
		if ((model.visitedArr[topic][mod][pag][supPag] == 1 || model.visitedArr[topic][mod][pag][supPag]  == '1')) {
			node_1.addClass("icon-partialcompleted").css("cursor", "pointer");
			model.subPageCompletionArr[topic][mod][pag][supPag]="1"
			model.pageCompletionArr[topic][mod][pag]="1"
		}else if ((model.visitedArr[topic][mod][pag][supPag] == 2 || model.visitedArr[topic][mod][pag][supPag] == '2')) {
			node_1.addClass("icon-fullyCompleted").css("cursor", "pointer");
			model.subPageCompletionArr[topic][mod][pag][supPag]="2"
			var tmpSubPagTrack=0
			for (var i = 0; i < model.visitedArr[topic][mod][pag].length; i++) {
				 if ((model.subPageCompletionArr[topic][mod][pag][i] == 2 || model.subPageCompletionArr[topic][mod][pag][i] == '2')) {
					 tmpSubPagTrack++
				 }
			}
			if(tmpSubPagTrack==model.subPageCompletionArr[topic][mod][pag].length){
				model.pageCompletionArr[topic][mod][pag]="2"
				var node_4 =$("#Mod_" + topic +"_page_"+mod)
				node_4.removeClass("icon-partialcompleted").removeClass("icon-fullyCompleted").removeClass("icon-notcompleted");
				node_4.addClass("icon-fullyCompleted").css("cursor", "pointer");
			}
		}else if ((model.visitedArr[topic][mod][pag][supPag]  == 0 || model.visitedArr[topic][mod][pag][supPag] == '0')) {
			node_1.addClass("icon-notcompleted").css("cursor", "pointer");
		}
		//add click state to current page
		node_1.addClass("Active ");
		//node_1.css("cursor", "default")
		
	}else{
		var node_6 = $("#Mod_" + mod +"_page_"+pag)
		node_6.removeClass(node_6.attr("class"));
		//node_6.removeClass("Active").removeClass("icon-partialcompleted").removeClass("icon-fullyCompleted").removeClass("icon-notcompleted");
		if ((model.visitedArr[topic][mod][pag]== 1 || model.visitedArr[topic][mod][pag]  == '1')) {
			node_6.addClass("icon-partialcompleted").css("cursor", "pointer");
			model.pageCompletionArr[topic][mod][pag]="1"
		}else if ((model.visitedArr[topic][mod][pag] == 2 || model.visitedArr[topic][mod][pag] == '2')) {
			node_6.addClass("icon-fullyCompleted").css("cursor", "pointer");
			model.pageCompletionArr[topic][mod][pag]="2"
		}else if ((model.visitedArr[topic][mod][pag]  == 0 || model.visitedArr[topic][mod][pag]== '0')) {
			node_6.addClass("icon-notcompleted").css("cursor", "pointer");
		}
		//add click state to current page
		node_6.addClass("Active ");
		//node_6.css("cursor", "default")
	}
	//chec for active buttons
	for (var i = 0; i < model.ModuleTitleArr[topic].length; i++) {
		for(var j = 0; j < model.pageCompletionArr[topic][i].length; j++){
			var tmp=0
			var node_7 = $("#Mod_" + i +"_page_"+j)
			node_7.removeClass(node_7.attr("class"));
			//node_7.removeClass("icon-partialcompleted").removeClass("icon-fullyCompleted").removeClass("icon-notcompleted");
			$("#shell_mod_" + i +"_title").removeClass("icon-partialcompleted").removeClass("icon-fullyCompleted").removeClass("icon-notcompleted");
			if (model.pageCompletionArr[topic][i][j] == '1') {
				node_7.addClass("icon-partialcompleted").css("cursor", "pointer");
			}else if(model.pageCompletionArr[topic][i][j] == '2'){
				node_7.addClass("icon-fullyCompleted").css("cursor", "pointer");
				tmp++
			}else if (model.pageCompletionArr[topic][i][j]== '0') {
				node_7.addClass("icon-notcompleted").css("cursor", "pointer");
			}
			
			if(tmp==model.pageCompletionArr[topic][i].length){
				var nodeTopic=$("#shell_mod_" + i +"_title")
				nodeTopic.removeClass(nodeTopic.attr("class"));
				nodeTopic.addClass("icon-fullyCompleted")
			}else{
				$("#shell_mod_" + i +"_title").addClass("icon-notcompleted")
			}
			//$("#Mod_" + mod +"_page_"+pag).addClass("Active ").css("cursor", "default");
			$("#Mod_" + mod +"_page_"+pag).addClass("Active ");
			if((model.subPageCompletionArr[topic][i][j]=="undefined")||(model.subPageCompletionArr[topic][i][j]==undefined)){
				
			}else{
				for(var k = 0; k < model.subPageCompletionArr[topic][i][j].length; k++){
					var node_8 = $("#Mod_" + i +"_page_"+j+"_Spage_"+k)
					//node_8.removeClass("icon-partialcompleted").removeClass("icon-fullyCompleted").removeClass("icon-notcompleted");
					node_8.removeClass(node_8.attr("class"));
					if(model.subPageCompletionArr[topic][i][j][k] == '1'){
						node_8.addClass("icon-partialcompleted").css("cursor", "pointer");
					}else if(model.subPageCompletionArr[topic][i][j][k] == '2'){
						node_8.addClass("icon-fullyCompleted").css("cursor", "pointer");
					}else if (model.subPageCompletionArr[topic][i][j][k]== '0') {
						node_8.addClass("icon-notcompleted").css("cursor", "pointer");
					}
				//	$("#Mod_" + mod +"_page_"+pag+"_Spage_"+supPag).addClass("subpagActive ").css("cursor", "default");
				$("#Mod_" + mod +"_page_"+pag+"_Spage_"+supPag).addClass("subpagActive ");
					if(model.subL2PagesArr[topic][i][j][k]!=0){
						for (var m = 0; m < model.subL2PagesArr[topic][i][j][k]; m++) {
							var node_9 = $("#Mod_" + i +"_page_"+j+"_Spage_"+k+"_ISpage_"+m)
							//node_9.removeClass("icon-partialcompleted").removeClass("icon-fullyCompleted").removeClass("icon-notcompleted");
							node_9.removeClass(node_9.attr("class"));
							if(model.visitedArr[topic][i][j][k][m] == '1'){
								node_9.addClass("icon-partialcompleted").css("cursor", "pointer");
							}else if(model.visitedArr[topic][i][j][k][m] == '2'){
								node_9.addClass("icon-fullyCompleted").css("cursor", "pointer");
							}else if (model.visitedArr[topic][i][j][k][m]== '0') {
								node_9.addClass("icon-notcompleted").css("cursor", "pointer");
							}
							//$("#Mod_" + mod +"_page_"+pag+"_Spage_"+supPag+"_ISpage_"+innerpag).addClass("innerpagActive Active").css("cursor", "default");
							$("#Mod_" + mod +"_page_"+pag+"_Spage_"+supPag+"_ISpage_"+innerpag).addClass("innerpagActive Active");
						}
					}
					
				}
			}
		}
	}
	
	for (var t = 0; t < model.tTopics; t++) {
		for (var s = 0; s < model.tModulesArr[topic]; s++) {
			//$("#shell_mod_"+s).removeClass("openMenu2")
			//$("#Mod_"+s+"_pages").removeClass("openMenu2")
			cnt4=0
			for (var g = 0; g < model.tPagesArr[topic][s]; g++) {
				if(model.pageCompletionArr[topic][s][g]=="2"){
					cnt4++
				}
			}
			if(cnt4==model.pageCompletionArr[topic][s].length){
				var nodeTopic=$("#shell_mod_" + s +"_title")
				nodeTopic.removeClass(nodeTopic.attr("class"));
				nodeTopic.addClass("icon-fullyCompleted")
			}else{
				//$("#shell_mod_" + s +"_title").addClass("icon-notcompleted")
			}
		}
	}
	
	if(innerpag!=-1){
		$("#Mod_" + mod +"_page_"+pag+"_Spage_"+supPag+"_ISpage_"+innerpag).css("cursor", "default");
	}else if(supPag!=-1){
		$("#Mod_" + mod +"_page_"+pag+"_Spage_"+supPag).css("cursor", "default");
	}else{
		$("#Mod_" + mod +"_page_"+pag).css("cursor", "default");
	}
	$("#shell_mod_"+(model.ModuleTitleArr[model.currTopic].length-1)).addClass("dropdown")
	//$("#Mod_"+mod+"_pages").addClass("openMenu2")
		
};



Menu.prototype.addCustomEvent = function(evet, callback) {
	eventsObj.push({
		"eventName" : evet,
		"funcCallBack" : callback
	});
};

Menu.prototype.dispatchCustomEvent = function(arg) {
	for (var i = 0; i < eventsObj.length; i++) {
		if (eventsObj[i].eventName == arg) {
			eventsObj[i].funcCallBack();
			break;
		}
	}
};

