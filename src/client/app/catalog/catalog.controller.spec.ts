(function() {
  'use strict';

  describe('catalog controller', () => {
    var vm, $q, $rootScope;
    var catalogServiceSpy, detailModalServiceSpy, saveModalServiceSpy, $stateSpy;
    var services = [{}];

    beforeEach(angular.mock.module('serviceCatalog.catalog'));

    beforeEach(() => {
      catalogServiceSpy = jasmine.createSpyObj('catalogService', ['getServices']);
      detailModalServiceSpy = jasmine.createSpyObj('detailModalService', ['open']);
      saveModalServiceSpy = jasmine.createSpyObj('saveModalServiceSpy', ['open']);
      $stateSpy = jasmine.createSpyObj('$stateSpy', ['go']);

      inject(function(_$rootScope_: ng.IRootScopeService, $controller: ng.IControllerService, _$q_: ng.IQService) {
        $rootScope = _$rootScope_;
        $q = _$q_;

        catalogServiceSpy.getServices.and.returnValue($q.when(services));
        detailModalServiceSpy.open.and.returnValue($q.when(''));
        saveModalServiceSpy.open.and.returnValue($q.when(''));

        vm = $controller('CatalogController', {
          catalogService: catalogServiceSpy,
          detailModalService: detailModalServiceSpy,
          saveModalService: saveModalServiceSpy,
          $state: $stateSpy
        });
      });
    });

    it('should load the services when the controller loads.', () => {
      // arrange

      // act
      $rootScope.$apply();

      // assert
      expect(catalogServiceSpy.getServices).toHaveBeenCalled();
      expect(vm.services).toBe(services);
    });

    it('should open service detail modal when view details is called.', () => {
      // arrange
      let serviceName: string = 'test service name';
      let versions: Array<serviceCatalog.catalog.Version> = [{ number: '1.0.0', active: true }];

      // act
      vm.viewDetails(serviceName, versions);

      // assert
      expect(detailModalServiceSpy.open).toHaveBeenCalledWith(serviceName, versions);
    });

    it('should reload the services and change state when view details modal is closed.', () => {
      // arrange
      let serviceName: string = 'test service name';
      let versions: Array<serviceCatalog.catalog.Version> = [{ number: '1.0.0', active: true }];

      // act
      vm.viewDetails(serviceName, versions);
      $rootScope.$apply();

      // assert
      expect(detailModalServiceSpy.open).toHaveBeenCalledWith(serviceName, versions);
      expect(catalogServiceSpy.getServices).toHaveBeenCalled();
      expect($stateSpy.go).toHaveBeenCalledWith('catalog');
    });

    it('should open save service modal when save catalog is called.', () => {
      // arrange

      // act
      vm.saveCatalog();

      // assert
      expect(saveModalServiceSpy.open).toHaveBeenCalled();
    });

    it('should reload the services when save service modal is closed.', () => {
      // arrange

      // act
      vm.saveCatalog();
      $rootScope.$apply();

      // assert
      expect(saveModalServiceSpy.open).toHaveBeenCalled();
      expect(catalogServiceSpy.getServices).toHaveBeenCalled();
    });

    it('should clear filter when clear button is clicked.', () => {
      // arrange
      vm.filter = '';

      // act
      vm.clearFilter();

      // assert
      expect(vm.filter).toEqual('');
    });

  });
})();
