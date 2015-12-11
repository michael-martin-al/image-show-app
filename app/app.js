var fb = new Firebase("https://torrid-inferno-342.firebaseio.com"),
		facebookAppId = "923013671112573",
		pinterestAppId = "4800690924141160495",
		pinterestSecret = "3e830c5e3ebaa0844f498f8f37662e080b7d132b3606d421fc8bfb929e818738";

angular.module('starter', [
	'ionic', 
	'firebase', 
	'ngCordovaOauth', 
	'angular-uuid', 
	'myOAuth', 
	'pinterest', 
	'user', 
	'device', 
	'auth', 
	'routes', 
	'view-templates',
	'view-view',
	'home-view',
	'control-view',
	'create-view',
	'login-view',
	'name-view',
	'assign-view'
])

.config(function($stateProvider, $provide) {
	'use strict';

	// $provide.decorator('$browser', ['$delegate', '$window', function($delegate, $window) {

	// 	if (isIOS9UIWebView($window.navigator.userAgent)) {
	// 		return applyIOS9Shim($delegate);
	// 	}

	// 	return $delegate;

	// 	function isIOS9UIWebView(userAgent) {
	// 		return /(iPhone|iPad|iPod).* OS 9_\d/.test(userAgent) && !/Version\/9\./.test(userAgent);
	// 	}

	// 	function applyIOS9Shim(browser) {
	// 		var pendingLocationUrl = null;
	// 		var originalUrlFn= browser.url;

	// 		browser.url = function() {
	// 			if (arguments.length) {
	// 				pendingLocationUrl = arguments[0];
	// 				return originalUrlFn.apply(browser, arguments);
	// 			}

	// 			return pendingLocationUrl || originalUrlFn.apply(browser, arguments);
	// 		};

	// 		window.addEventListener('popstate', clearPendingLocationUrl, false);
	// 		window.addEventListener('hashchange', clearPendingLocationUrl, false);

	// 		function clearPendingLocationUrl() {
	// 			pendingLocationUrl = null;
	// 		}

	// 		return browser;
	// 	}
	// }]);	
})


.run(function($ionicPlatform, Auth, $rootScope, User, Device) {
	$ionicPlatform.ready(function() {

		if(window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}

		if(window.StatusBar) {
			StatusBar.styleDefault();
		}

		Auth.listenForAuthEvents('home', 'login');

		$rootScope.isLoggedIn = function() {
			return Auth.isLoggedIn();
		};

		$rootScope.logout = function() {
			Auth.logout("facebook");
			Auth.logout("pinterest");
			$rootScope.profile.$destroy();
			$rootScope.device.$destroy();
		};

		if (Auth.uid()) {
			$rootScope.profile = User.getProfile();
			$rootScope.device = User.getDevice(Device.id());
		}
	});
})

;