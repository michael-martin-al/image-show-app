angular.module('home-view', [])

.controller("HomeCtrl", function($scope, MyOAuth, Device, User, $ionicPlatform) {
	$ionicPlatform.ready(function() {
		screen.unlockOrientation();
	});	
	$scope.device = User.getDevice(Device.id());
})

;