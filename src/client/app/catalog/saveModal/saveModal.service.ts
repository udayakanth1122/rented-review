module serviceCatalog.catalog {
  'use strict';

  export interface ISaveModalService {
    open(): ng.IPromise<any>;
  }

  class SaveModalService implements ISaveModalService {

    /* @ngInject */
    constructor(private $modal: ng.ui.bootstrap.IModalService) { }

    open(): ng.IPromise<any> {
      let modalInstance = this.$modal.open({
        templateUrl: 'app/catalog/saveModal/saveModal.html',
        controller: 'SaveModalController as vm'
      });

      return modalInstance.result;
    }
  }

  angular
    .module('serviceCatalog.catalog')
    .service('saveModalService', SaveModalService);
}
