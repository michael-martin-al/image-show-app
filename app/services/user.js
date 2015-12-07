angular.module('user', [])

.factory('User', function($firebaseObject, $firebaseArray, Auth, $q) {
	function _getDeviceRef(uuid) {
		return fb.child("users").child(Auth.uid()).child("devices").child(uuid);		
	}

	function _getDevice(uuid) {		
		return $firebaseObject(_getDeviceRef(uuid));
	}

	function _getSlideshow(id) {
		return $firebaseObject(fb.child("users").child(Auth.uid()).child("slideshows").child(id));
	}

	return {
		saveProfile: function(profile) {
			fb.child("users").child(Auth.uid()).child("profile").set(profile);
		},
		saveSlideshow: function(name, board) {
			fb.child("users").child(Auth.uid()).child("slideshows").push({created: Firebase.ServerValue.TIMESTAMP, board: { id: board.id, url: board.url, name: board.name }, name: name });
			//fb.child("slideshows").child(device.$id).set({id: newRef.key(), owner: Auth.uid(), created: Firebase.ServerValue.TIMESTAMP, board: { id: board.id, url: board.url, name: board.name } });
		},
		assignSlideshowToDevice: function(showId, deviceId) {
			_getDeviceRef(deviceId).child('slideshow').set(showId);
		},
		getProfile: function() {
			return $firebaseObject(fb.child("users").child(Auth.uid()).child("profile"));
		},
		getDevices: function() {
			return $firebaseArray(fb.child("users").child(Auth.uid()).child("devices"));
		},
		getSlideshows: function() {
			return $firebaseArray(fb.child("users").child(Auth.uid()).child("slideshows"));
		},
		getShowForDevice: function(deviceId) {
			return $q(function(resolve, reject) {
				_getDeviceRef(deviceId).child('slideshow').once('value', function(snap) {
					resolve(_getSlideshow(snap.val()));
				});
			});
		},	
		getDevice: function(uuid) {
			var device = _getDevice(uuid);
			var deviceRef = device.$ref();
			device.$loaded(function(data) {
				deviceRef.child("lastAccessed").set(Firebase.ServerValue.TIMESTAMP);
			}, function(error) {

			});
			return device;
		},
		setDeviceName: function(uuid, name) {
			_getDeviceRef(uuid).child("name").set(name);
		}
	};
})

;