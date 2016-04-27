module serviceCatalog {
  'use strict';

  /* @ngInject */
  function configureStates($stateProvider: ng.ui.IStateProvider, $locationProvider: ng.ILocationProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {
    var states = getStates();
    states.forEach(function(state) {
      $stateProvider.state(state.state, state.config);
    });

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/catalog');
  }

  function getStates() {
    return [];
  }

  angular
    .module('serviceCatalog')
    .config(configureStates);
}
