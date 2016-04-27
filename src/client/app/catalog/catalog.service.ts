module serviceCatalog.catalog {
  'use strict';

  // typescript compiler needs to know about update method we added to $resource
  interface ICatalogResource extends ng.resource.IResourceClass<any> {
    update(arg: any): any;
  }

  export interface ICatalogService {
    addService(teamName: string, swagger: string): ng.IPromise<any>;
    getServices(): ng.IPromise<Array<serviceCatalog.catalog.Service>>;
    deleteService(serviceName: string, versions: string): ng.IPromise<any>;
    activeService(serviceName: string, version: string, active: boolean): ng.IPromise<any>;
    updateService(teamName: string, swagger: string): ng.IPromise<any>;
    downloadService(serviceName: string, versions: string): ng.IPromise<any>;
  }

  class CatalogService implements ICatalogService {
    serviceResource: ICatalogResource;

    /* @ngInject */
    constructor(private $resource: ng.resource.IResourceService, private catalogApiUrl: string) {
      this.createServiceResource();
    }

    formDataObject(data: Array<any>): any {
      let fd = new FormData();
      angular.forEach(data, (value: any, key: string) => {
        fd.append(key, value);
      });
      return fd;
    }

    createServiceResource(): void {
      let saveAction: ng.resource.IActionDescriptor = {
        method: 'POST',
        transformRequest: this.formDataObject,
        headers: { 'Content-Type': undefined }
      };

      let updateAction: ng.resource.IActionDescriptor = {
        method: 'PUT',
        isArray: false,
        transformRequest: this.formDataObject,
        headers: { 'Content-Type': undefined }
      };

      this.serviceResource = <ICatalogResource> this.$resource(this.catalogApiUrl + '/services/:title/:version',
        null,
        {
          save: saveAction,
          update: updateAction
        });
    }

    addService(teamName: string, swagger: string): ng.IPromise<any> {
      return this.serviceResource.save({ owner: teamName, swagger: swagger }).$promise;
    }

    deleteService(serviceName: string, version: string): ng.IPromise<any> {
      return this.serviceResource.delete({ title: serviceName, version: version }).$promise;
    }

    getServices(): ng.IPromise<Array<serviceCatalog.catalog.Service>> {
      return this.serviceResource.query().$promise;
    }

    updateService(teamName: string, swagger: string): ng.IPromise<any> {
      return this.serviceResource.update({ owner: teamName, swagger: swagger }).$promise;
    }

    activeService(serviceName: string, version: string, active: boolean): ng.IPromise<any> {
      return this.serviceResource.update({ title: serviceName, version: version, active: active }).$promise;
    }

    downloadService(serviceName: string, version: string): ng.IPromise<any> {
      return this.serviceResource.get({ title: serviceName, version: version }).$promise;
    }
  }

  angular
    .module('serviceCatalog.catalog')
    .service('catalogService', CatalogService);
}
