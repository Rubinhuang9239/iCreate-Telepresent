var animate = {};

animate.settingOn = false;

animate.speedDisplay = null;

animate.init = function(){

	BLEStatus = document.getElementById("BLEStatus");
	BLEStatus.addEventListener("click",function(){

		if(WebRTCDataMethold.connected){
			logMessage("BLE", "Start BLE Scan");
			this.attributes.class.value = "BLEBlinking bnt";

			var BLEMacro = {
				type : "BLE",
				message : "conn"
			}

			WebRTCDataMethold.sendData( BLEMacro );
		}else{

			logMessage("Error", "Can't Start BLE Scan before WebRTC is ready!");

		}

	});

	settingBnt = document.getElementById("setting");
	settingBnt.addEventListener("click",function(){
		animate.settingPanelStatus();
	});

	var mainFrame = document.getElementById("mainFrame");

	window.addEventListener("resize",function(){
		mainFrame.style.transitionProperty = "transform";
		mainFrame.style.transitionDuration ="transition-duration: 0.3s";
		if( document.getElementById("Body").offsetWidth >= 768){
			mainFrame.style.transform = "translateY(0%)";
			mainFrame.style.height = "144%";
			mainFrame.style.width = "134%";
		}
		else{
			mainFrame.style.height = "100%";
			mainFrame.style.width = "100%";
		}
		animate.settingOn = false;
	});

	var settingClose = document.getElementById("settingClose");
	settingClose.addEventListener("click",function(){
		animate.settingPanelStatus("close");
	});

	var settingDetailClose = document.getElementById("settingDetailClose");
	settingDetailClose.addEventListener("click",function(){
		animate.removeSettingDetail();
	});


	var rebootPhone = document.getElementById("rebootPhone");
	rebootPhone.addEventListener("click",function(){
		if (confirm('Are You sure to reboot the Phone?')) {
	    	// Save it!
		} else {
		    // Do nothing!
		}
	});

	var rebootPhone = document.getElementById("rebootBluno");
	rebootPhone.addEventListener("click",function(){
		if (confirm('Are You sure to reboot the Bluno?')) {
	    	// Save it!
		} else {
		    // Do nothing!
		}
	});
	
	var cameraHeight = document.getElementById("cameraHeight");
	cameraHeight.addEventListener("click",function(){
		animate.loadSettingDetail("PersSettingBox");
	});

	var aboutTele = document.getElementById("aboutTeleroomba");
	aboutTele.addEventListener("click",function(){
		animate.loadSettingDetail("aboutContent");
	});

	animate.speedDisplay = document.getElementById("speedVal");
}

animate.settingPanelStatus = function(status){

	var mainFrame = document.getElementById("mainFrame");
	mainFrame.style.transitionProperty = "width, height, transform";
	mainFrame.style.transitionDuration ="transition-duration: 0.6s";

	if(status == "close"){
		animate.settingOn == true;
	}
	else if(status == "open"){
		animate.settingOn == false;
	}

	if( document.getElementById("Body").offsetWidth >= 768){
		if(animate.settingOn == false){
			mainFrame.style.height = "100%";
			mainFrame.style.width = "100%";
		}
		else if(animate.settingOn == true){
			mainFrame.style.height = "144%";
			mainFrame.style.width = "134%";
		}
	}else{
		if(animate.settingOn == false){
			mainFrame.style.transform = "translateY(-100%)";
		}
		else if(animate.settingOn == true){
			mainFrame.style.transform = "translateY(0%)";
		}
	}

	animate.settingOn = !animate.settingOn;

}

animate.loadSettingDetail = function(content){

	var settingDetail = document.getElementById("settingDetail");
	settingDetail.style.transform = "translateX(0%)";

	animate.clearSettingDetail();

	var source = document.getElementById(content);
	source.style.display = "block";


}

animate.clearSettingDetail = function(){
	var dynamicContentList = document.getElementsByClassName("dynamicContent");
	for(i=0; i < dynamicContentList.length; i++){
		dynamicContentList[i].style.display = "none";
	}

}

animate.removeSettingDetail = function(){
	animate.clearSettingDetail();
	var settingDetail = document.getElementById("settingDetail");
	settingDetail.style.transform = "translateX(103%)";
}

animate.speedCalcu = function(speedInputL,speedInputR,offLine){

	if( offLine > 0 ){
		if(offLine == 1){
			animate.speedDisplay.innerHTML = "<span style='font-size:24px'>X WebRTC</span>";
		}
		else if( offLine == 2){
			animate.speedDisplay.innerHTML = "<span style='font-size:24px'>X BLE</span>";
		}

		return false;
	}

	speedInput = (speedInputL+speedInputR) * 0.5;
	animate.speedDisplay.innerHTML = ((speedInput / 50) * 1.125).toPrecision(3);
}
