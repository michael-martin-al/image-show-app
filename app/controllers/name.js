angular.module('name-view', [])

.controller('NameCtrl', function(User, Device, $scope, $state,$ionicPlatform) {
	$ionicPlatform.ready(function() {
		screen.unlockOrientation();
	});	
	$scope.device = User.getDevice(Device.id());

	$scope.setDeviceName = function(name) {
		User.setDeviceName(Device.id(), name);
		$state.go('home');
	};
})

;