module serviceCatalog.catalog {
  'use strict';

  interface ISaveModalVM {
    confirmOverwrite: boolean;
    cancel(): void;
    save(teamName: string, swaggerFile: string): void;
    update(teamName: string, swaggerFile: string): void;
  }

  class SaveModalController implements ISaveModalVM {
    confirmOverwrite: boolean;

    /* @ngInject */
    constructor(private $modalInstance: ng.ui.bootstrap.IModalServiceInstance,
      private catalogService: serviceCatalog.catalog.ICatalogService) {
      this.confirmOverwrite = false;
    }

    cancel(): void {
      this.$modalInstance.dismiss();
    }

    save(teamName: string, swagger: string): void {
      if (teamName && swagger) {
        this.catalogService.addService(teamName, swagger)
          .then(() => {
          this.$modalInstance.close();
        })
          .catch((response: any) => {
          if (response.status === 422) {
            this.confirmOverwrite = true;
          }
        });
      }
    }

    update(teamName: string, swaggerFile: string): void {
      if (teamName && swaggerFile) {
        this.catalogService.updateService(teamName, swaggerFile)
          .then(() => {
          this.$modalInstance.close();
        });
      }
    }
  }

  angular
    .module('serviceCatalog.catalog')
    .controller('SaveModalController', SaveModalController);
}
