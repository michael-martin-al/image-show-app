angular.module('auth', [])

.factory('Auth', function($rootScope, $firebaseAuth, $state, $q, $log) {
	var _key 		= "OAuthTokens";
	var _tokens 	= JSON.parse(localStorage.getItem(_key)) || {};
	var _isLoggedIn = false;
	var _authData 	= {};
	var _auth 		= $firebaseAuth(fb);
	var _this;

	function _saveTokens() {
		localStorage.setItem(_key, JSON.stringify(_tokens));
	}

	function _saveToken(provider, token) {
		_tokens[provider] = token;
		_saveTokens();
	}

	function _deleteToken(provider) {
		delete _tokens[provider];
		_saveTokens();			
	}

	_this = {
		getToken: function(provider) {
			$log.log("Get token", provider, _tokens[provider], _tokens);
			return _tokens[provider];
		},
		deleteToken: function(provider) {
			_deleteToken(provider);
		},
		saveToken: function(provider, token) {
			console.log("Saving Token", provider, token);
			_saveToken(provider, token);
		},
		listenForAuthEvents: function(homeState, loginState) {
			_auth.$onAuth(function(authData) {
				if (!authData) {
					_isLoggedIn = false;
					$state.go(loginState);
				} else {
					_authData = authData;
					_isLoggedIn = true;			
					$state.go(homeState);
				}
			});					
		},
		waitForReady: function() {
			return $q(function(resolve, reject) {
				resolve(_auth.$getAuth());
			});
		},
		isLoggedIn: function() {
			return _isLoggedIn;
		},
		login: function(provider, token) {
			return $q(function(resolve, reject) {
				_auth.$authWithOAuthToken(provider, token).then(function(authData) {
					_authData = authData;
					_isLoggedIn = true;
					_saveToken(provider, token);
					resolve(_authData);
				}, function(error) {
					reject(error);
				});
			});	
		},
		logout: function(provider) {
			_deleteToken(provider);
			_auth.$unauth();
		},
		uid: function() {
			if (_auth.$getAuth()) {
				return _auth.$getAuth().uid;
			}
		}
	};

	return _this;
})

;