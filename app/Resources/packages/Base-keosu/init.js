var app = angular.module('keosuApp', ['angularSpinner','angular-carousel','ngSanitize', 'ngTouch', 'ngRoute','angular-inview','LocalStorageModule','CacheManagerModule','ui.bootstrap']);

app.controller('main_Controller', function($http, $rootScope, $scope) {
	$http.get('data/globalParam.json').success(function(data) {
		if (typeof variStatusBar !== 'undefined') {
			StatusBar.hide();
		}
		if (typeof navigator !== 'undefined' && typeof navigator.splashscreen !== 'undefined') {
			setTimeout(function() {
				navigator.splashscreen.hide();
			}, 3000);
		}

		$rootScope.appName = data.name;

		 // $rootScope;previousButton : used to display a return button in the header
		 // to show the button you should set the value true to the boolean
		 // when you click on the button, the method $rootScope.prev is called
		$rootScope.previousButton = false;
	});
	//alert("Connection :"+navigator.connection.type);
	$rootScope.offline = false;
	document.addEventListener("offline", function() {
		$rootScope.offline = true;
		alert("Network unreachable. The page will be reload soon as possible.");
		document.addEventListener("online", function() {
			$rootScope.offline = false;
			alert("Reconnection !");
			document.removeEventListener("online", function(){}, false);
			location.reload();
		}, false);
	}, false);

	$scope.alert = function(title, message) {
		if (typeof navigator.notification === 'undefined') {
			alert(message);
		} else {
			navigator.notification.alert(
				message,
				function(){},
				title,
				'OK'
			);
		}
	};
});

