module serviceCatalog.catalog {
  'use strict';

  /* @ngInject */
  function configureStates($stateProvider: ng.ui.IStateProvider) {
    var states = getStates();
    states.forEach(function(state) {
      $stateProvider.state(state.state, state.config);
    });
  }

  function getStates() {
    return [{
      state: 'catalog',
      config: {
        url: '/catalog',
        templateUrl: 'app/catalog/catalog.html',
        controller: 'CatalogController',
        controllerAs: 'vm'
      }
    }, {
        state: 'catalog.swagger',
        config: {
          url: '/:title/:version',
          templateUrl: 'app/catalog/swagger/swagger.html',
          controller: 'SwaggerController',
          controllerAs: 'vm'
        }
      }];
  }

  angular
    .module('serviceCatalog.catalog')
    .config(configureStates);
}
