angular.module('routes', [])

.config(function($stateProvider, $provide) {

	$stateProvider
	
		.state('home', {
			url: '/',
			templateUrl: 'home.tpl.html',
			controller: 'HomeCtrl'
		})

		.state('login', {
			url: '/login',
			templateUrl: 'login.tpl.html',
			controller: 'LoginCtrl'
		})

		.state('control', {
			url: '/control',
			templateUrl: 'control.tpl.html',
			controller: 'ControlCtrl'
		})

		.state('create', {
			url: '/create',
			templateUrl: 'create.tpl.html',
			controller: 'CreateCtrl'
		})	

		.state('view', {
			url: '/view',
			templateUrl: 'view.tpl.html',
			controller: 'ViewCtrl'
		})

		.state('name', {
			url: '/name',
			templateUrl: 'name.tpl.html',
			controller: 'NameCtrl'
		})	

		.state('assign', {
			url: '/assign',
			templateUrl: 'assign.tpl.html',
			controller: 'AssignCtrl'
		})			

	;
})