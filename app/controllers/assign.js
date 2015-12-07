angular.module('assign-view', [])

.controller('AssignCtrl', function(User, $state, $scope, $ionicPlatform) {
	$ionicPlatform.ready(function() {
		screen.unlockOrientation();
	});	


	$scope.selectedDevice = null;

	$scope.devices = User.getDevices();
	$scope.slideshows = User.getSlideshows();

	$scope.devices.$loaded(function() {
		$scope.devices.forEach(function(device) {
			User.getShowForDevice(device.$id).then(function(show) {
				device.$slideshow = show;
			})
		});
	});

	$scope.selectDevice = function(device) {
		$scope.selectedDevice = device;
	};

	$scope.assignSlideshowToDevice = function(show, device) {
		User.assignSlideshowToDevice(show.$id, device.$id);
		$state.go('control');
	};

})

;