(function() {
	'use strict';
	angular.module('something.test').controller('PrintBigTable', PrintBigTable);

	/**@ngInject */
	function FundsOverviewController($scope, $state, $timeout, $window) {
		function init() {
			setTopScroll();
		}

		init();

		$window.onafterprint = function() {
			$($window).off('mousemove', $window.onafterprint);
			removeCondensedTable();
		};

		$scope.print = function() {
			addCondensedTable();
			$scope.$evalAsync(function() {
				LifeAnalyticsService.addEventFundsOverview('print', 'print funds list');
				$window.print();
			});
		};

		$timeout(function() {
			$($window).on('mousemove', $window.onafterprint);
		}, 1);

		function setTopScroll() {
			$('#wrapperTop').scroll(function() {
				$('#wrapperBottom').scrollLeft($('#wrapperTop').scrollLeft());
			});
			$('#wrapperBottom').scroll(function() {
				$('#wrapperTop').scrollLeft($('#wrapperBottom').scrollLeft());
			});
		}

		function addCondensedTable() {
			$('.table-sticky').addClass('table-condensed');
		}

		function removeCondensedTable() {
			$('.table-sticky').removeClass('table-condensed');
		}
	}
})();
