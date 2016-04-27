module serviceCatalog.catalog {
  'use strict';

  interface ISwaggerVM {
    url: string;
  }

  class SwaggerController implements ISwaggerVM {
    url: string;

    /* @ngInject */
    constructor(private catalogApiUrl: string, private $stateParams: ng.ui.IStateParamsService) {
      this.url = catalogApiUrl + '/services/' + $stateParams.title + '/' + $stateParams.version;
    }
  }

  angular
    .module('serviceCatalog.catalog')
    .controller('SwaggerController', SwaggerController);
}
