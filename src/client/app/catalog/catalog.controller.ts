module serviceCatalog.catalog {
  'use strict';

  interface ICatalogModel {
    filter: string;
    services: Array<serviceCatalog.catalog.Service>;
    viewDetails(serviceName: string, versions: Array<serviceCatalog.catalog.Version>): void;
    saveCatalog(serviceName: string): void;
    clearFilter(): void;
  }

  class CatalogController implements ICatalogModel {
    filter: string;
    services: Array<serviceCatalog.catalog.Service>;

    /* @ngInject */
    constructor(private catalogService: serviceCatalog.catalog.ICatalogService, private detailModalService: IDetailModalService,
      private saveModalService: ISaveModalService, private $state: ng.ui.IStateService) {
      this.loadServices();
    }

    loadServices(): void {
      this.catalogService.getServices().then((services: Array<serviceCatalog.catalog.Service>) => {
        this.services = services;
      });
    }

    viewDetails(serviceName: string, versions: Array<serviceCatalog.catalog.Version>): void {
      this.detailModalService.open(serviceName, versions).then(() => {
        this.loadServices();
        this.$state.go('catalog');
      });
    }

    saveCatalog(): void {
      this.saveModalService.open().then(() => {
        this.loadServices();
      });
    }

    clearFilter(): void {
      this.filter = '';
    }
  }

  angular
    .module('serviceCatalog.catalog')
    .controller('CatalogController', CatalogController);
}
