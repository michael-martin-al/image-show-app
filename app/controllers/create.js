angular.module('create-view', [])

.controller("CreateCtrl", function($scope, MyOAuth, Auth, Pinterest, $log, User, $state, $ionicPlatform) {
	$ionicPlatform.ready(function() {
		screen.unlockOrientation();
	});	

	$scope.boards = [];
	$scope.pinterestReady = Pinterest.ready();

	$scope.authWithPinterest = function() {
		$log.log("authWithPinterest", pinterestAppId, pinterestSecret);
		MyOAuth.pinterest(pinterestAppId, pinterestSecret, ['read_public', 'read_private']).then(function(result) {
			Auth.saveToken('pinterest', result.data.access_token);
			$scope.pinterestReady = Pinterest.ready();	
			$scope.fetchBoards();
		}, function(error) {
			$log.log("Error Auth with Pinterest", error);
		});
	};

	$scope.fetchBoards = function() {
		Pinterest.fetchBoards().then(function(data) {
			$scope.boards = data.data.data;
		}, function(error) {

		});
	};

	$scope.selectBoard = function(board) {
		Pinterest.fetchPins(board.id).then(function(data) {
			$scope.pins = data.data.data;
			$scope.selectedBoard = board;
		}, function(error) {

		});
	};

	$scope.createShow = function(name, board) {
		User.saveSlideshow(name, board);
		$scope.selectedBoard = null;
		$state.go('control');
	};

	if (!Pinterest.ready()) {
		$scope.authWithPinterest();
	} else {
		$scope.fetchBoards();
	}
})

;