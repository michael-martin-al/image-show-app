angular.module('myOAuth', [])

.factory("MyOAuth", ["$q", '$http', "$cordovaOauthUtility", function($q, $http, $cordovaOauthUtility) {
	return {
		pinterest: function(clientId, clientSecret, appScope, options) {
			return $q(function(resolve, reject) {
				if(window.cordova) {
					var cordovaMetadata = cordova.require("cordova/plugin_list").metadata;
					if($cordovaOauthUtility.isInAppBrowserInstalled(cordovaMetadata) === true) {
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
						var browserRef = window.open(flowUrl, '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
						browserRef.addEventListener('loadstart', function(event) {
							if((event.url).indexOf(redirect_uri) === 0) {
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
							}
						});
						browserRef.addEventListener('exit', function(event) {
							reject("The sign in flow was canceled");
						});
					} else {
						reject("Could not find InAppBrowser plugin");
					}
				} else {
					reject("Cannot authenticate via a web browser");
				}
			});
		}
	}
}])

;