angular.module('control-view', [])

.controller("ControlCtrl", function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		screen.unlockOrientation();
	});	
})

;