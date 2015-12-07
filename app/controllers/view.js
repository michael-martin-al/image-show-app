angular.module('view-view', [])

.controller("ViewCtrl", function($scope, MyOAuth, Auth, Pinterest, $log, User, Device, $timeout, $ionicPlatform, $interval) {
	var cancelInterval = null;
	$scope.activeIndex = 0;

	$ionicPlatform.ready(function() {
		screen.lockOrientation('landscape');
	});

	if (!Pinterest.ready()) {	
		MyOAuth.pinterest(pinterestAppId, pinterestSecret, ['read_public', 'read_private']).then(function(result) {
			Auth.saveToken('pinterest', result.data.access_token);
			fetchShow();
		}, function(error) {

		});
	} else {
		fetchShow();
	}

	function fetchShow() {
		User.getShowForDevice(Device.id()).then(function(show) {
			$scope.slideShow = show;
			show.$loaded().then(function() {
				Pinterest.fetchPins($scope.slideShow.board.id).then(function(data) {
					$scope.pins = data.data.data;
					$interval(function() {
						if ($scope.activeIndex < ($scope.pins.length - 1)) {
							$scope.activeIndex++;
						} else {
							$scope.activeIndex = 0;
						}
					}, 5000);

				}, function(error) {

				});			
			});			
		});
	}
})

;