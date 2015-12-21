angular.module('myOAuth', [])

.factory("MyOAuth", ["$q", '$http', "$cordovaOauthUtility", "$log", function($q, $http, $cordovaOauthUtility, $log) {
	return {
		pinterest: function(clientId, clientSecret, appScope, options) {
			return $q(function(resolve, reject) {
				if(window.cordova) {					
					var cordovaMetadata = cordova.require("cordova/plugin_list").metadata;
					$log.log('$cordovaMetadata', cordovaMetadata);
					//if($cordovaOauthUtility.isInAppBrowserInstalled(cordovaMetadata) === true) {
					if($cordovaOauthUtility.isInAppBrowserInstalled()) {						
						var redirect_uri = "https://localhost/callback";
						if(options !== undefined) {
							if(options.hasOwnProperty("redirect_uri")) {
								redirect_uri = options.redirect_uri;
							}
						}
						var flowUrl = "https://api.pinterest.com/oauth/?response_type=code&client_id=" + clientId + "&state=isa&scope=" + appScope.join(",") + "&redirect_uri=" + redirect_uri;
						if(options !== undefined && options.hasOwnProperty("auth_type")) {
							flowUrl += "&auth_type=" + options.auth_type;
						}
						$log.log("flowUrl", flowUrl);
						var browserRef = window.open(flowUrl, '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
						browserRef.show();
						browserRef.addEventListener('loadstart', function(event) {
							$log.log("loadstart", event.url);
							browserRef.show();							
							if((event.url).indexOf(redirect_uri) === 0) {
								$log.log("in here");
								browserRef.removeEventListener("exit",function(event){});
								browserRef.close();
								var access_code = (event.url).split("code=")[1];
								var post_params = {
									grant_type: 'authorization_code',
									client_id: clientId,
									client_secret: clientSecret,
									code: access_code
								};
								resolve($http.post("https://api.pinterest.com/v1/oauth/token", post_params)); //.success(function(data){
							} else {
								$log.log("redirecting...", event.url);
							}
						});
						browserRef.addEventListener('loadstop', function(event) {
							$log.log("Load Stopped", event);
							//reject("Load Stopped");
						});						
						browserRef.addEventListener('exit', function(event) {
							$log.log("The sign in flow was canceled");
							reject("The sign in flow was canceled");
						});
					} else {
						$log.log("Could not find InAppBrowser plugin");
						reject("Could not find InAppBrowser plugin");
					}
				} else {
					$log.log("Cannot authenticate via a web browser");
					reject("Cannot authenticate via a web browser");
				}
			});
		}
	}
}])

;