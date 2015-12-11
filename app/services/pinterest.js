angular.module('pinterest', [])

.factory('Pinterest', function(Auth, $http, $log) {
	var _rootUrl = "https://api.pinterest.com/v1";

	function getUrl(path) {
		return _rootUrl + path + "/?access_token=" + Auth.getToken('pinterest');	
	}

	return {
		ready: function() {
			$log.log("Pinterest ready?");
			return Auth.getToken('pinterest') != null;
		},

		fetchBoards: function() {
			var _url = getUrl("/me/boards");
			return $http.get(_url);
		},

		fetchPins: function(boardId) {
			var _url = getUrl("/boards/" + boardId + "/pins") + "&fields=id,image(original,medium),media";
			return $http.get(_url);
		},

		fetchPin: function(pinId) {
			var _url = getUrl("/pins/" + pinId);
			return $http.get(_url);
		}
	};
})

;