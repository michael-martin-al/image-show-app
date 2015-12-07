angular.module('login-view', [])

.controller("LoginCtrl", function($scope, $state, $rootScope, $firebaseAuth, $cordovaOauth, Auth, User, Device, $ionicPlatform) {
	$ionicPlatform.ready(function() {
		screen.unlockOrientation();
	});	 
	var token = Auth.getToken("facebook");

	function _loginWithToken(token) {
		Auth.login("facebook", token).then(function(authData) {
			console.log("Saving Profile", authData.facebook.cachedUserProfile);
			User.saveProfile(authData.facebook.cachedUserProfile);
			$rootScope.profile = User.getProfile();
			$rootScope.device = User.getDevice(Device.id());
		}, function() {

		});
	}

	$scope.login = function() {
		$cordovaOauth.facebook(facebookAppId, ["email"]).then(function(result) {
			_loginWithToken(result.access_token);
		}, function(error) {

		});
	};

	if (token) {
		console.log("Auto-login with Facebook token.");
		_loginWithToken(token);
	}
})

;