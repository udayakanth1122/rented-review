module serviceCatalog.catalog {
  'use strict';

  interface IDetailModalVM {
    confirmDelete: boolean;
    version: string;
    close(): void;
    confirm(version: string): void;
    delete(serviceName: string, version: string): void;
    download(serviceName: string, version: string): void;
    update(serviceName: string, version: string, active: boolean): void;
  }

  class DetailModalController implements IDetailModalVM {
    confirmDelete: boolean;
    version: string;
    /* @ngInject */

    constructor(private catalogService: serviceCatalog.catalog.ICatalogService, private versions: Array<serviceCatalog.catalog.Version>,
      private serviceName: string, private $modalInstance: ng.ui.bootstrap.IModalServiceInstance) {
      this.confirmDelete = false;
      this.version = null;
    }

    close(): void {
      this.$modalInstance.close();
    }

    confirm(version: string): void {
      this.confirmDelete = true;
      this.version = version;
    }

    download(serviceName: string, version: string): void {
      if (serviceName && version) {
        this.catalogService.downloadService(serviceName, version).then((result: any) => {
          let blob = new Blob([JSON.stringify(result)], { type: 'application/json;charset=utf-8;' });
          let downloadLink = angular.element('<a></a>');
          downloadLink.attr('href', window.URL.createObjectURL(blob));
          downloadLink.attr('download', serviceName + '_' + version + '.json');
          downloadLink[0].click();
        });
      }
    }

    delete(serviceName: string, version: string): void {
      if (serviceName && version) {
        this.catalogService.deleteService(serviceName, version).then(() => {
          this.$modalInstance.close();
        });
      }
    }

    update(serviceName: string, version: string, active: boolean): void {
      if (serviceName && version && active) {
        this.catalogService.activeService(serviceName, version, active).then(() => {
          //this.$modalInstance.close();
        });
      }
    }
  }

  angular
    .module('serviceCatalog.catalog')
    .controller('DetailModalController', DetailModalController);
}
