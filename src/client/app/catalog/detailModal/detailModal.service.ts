module serviceCatalog.catalog {
  'use strict';

  export interface IDetailModalService {
    open(serviceName: string, versions: Array<serviceCatalog.catalog.Version>): ng.IPromise<any>;
  }

  class DetailModalService implements IDetailModalService {

    /* @ngInject */
    constructor(private $modal: ng.ui.bootstrap.IModalService) { }

    open(serviceName: string, versions: Array<serviceCatalog.catalog.Version>): ng.IPromise<any> {
      let modalInstance = this.$modal.open({
        templateUrl: 'app/catalog/detailModal/detailModal.html',
        controller: 'DetailModalController as vm',
        resolve: {
          serviceName: () => serviceName,
          versions: () => versions
        }
      });

      return modalInstance.result;
    }
  }

  angular
    .module('serviceCatalog.catalog')
    .service('detailModalService', DetailModalService);
}
