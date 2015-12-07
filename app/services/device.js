angular.module('device', [])

.factory('Device', function(uuid) {
	var _key = "DeviceID";
	var _uuid = localStorage.getItem(_key) || null;

	function _saveUUID() {
		localStorage.setItem(_key, _uuid);
	}

	return {
		id: function() {
			if (_uuid == null) {
				_uuid = uuid.v4();
				_saveUUID(_uuid);
			}
			return _uuid;
		}
	};
})

;