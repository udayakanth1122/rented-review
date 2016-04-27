module serviceCatalog.catalog {
  'use strict';

  describe('detail modal controller', () => {
    var vm, $q, $rootScope;
    var $modalInstanceSpy, catalogServiceSpy, versionsSpy, serviceNameSpy;

    beforeEach(angular.mock.module('serviceCatalog.catalog'));

    beforeEach(() => {
      $modalInstanceSpy = jasmine.createSpyObj('$modalInstanceSpy', ['close']);
      catalogServiceSpy = jasmine.createSpyObj('catalogServiceSpy', ['downloadService', 'deleteService', 'activeService']);
      versionsSpy = jasmine.createSpyObj('versionsSpy', ['versions']);
      serviceNameSpy = jasmine.createSpyObj('serviceNameSpy', ['serviceName']);

      inject((_$rootScope_: ng.IRootScopeService, $controller: ng.IControllerService, _$q_: ng.IQService) => {
        vm = $controller('DetailModalController', {
          $modalInstance: $modalInstanceSpy,
          catalogService: catalogServiceSpy,
          versions: versionsSpy,
          serviceName: serviceNameSpy
        });
        $q = _$q_;
        $rootScope = _$rootScope_;
      });
    });

    it('should not show confirm dialog when controller loads.', () => {
      // arrange

      // act

      // assert
      expect(vm.confirmDelete).toBe(false);
    });

    it('should dismiss the modal when the cancel button is clicked.', () => {
      // arrange

      // act
      vm.close();

      // assert
      expect($modalInstanceSpy.close).toHaveBeenCalled();
    });

    it('should not delete the service if the service name is empty.', () => {
      // arrange
      let serviceName = '';
      let version = 'version';

      // act
      vm.delete(serviceName, version);

      // assert
      expect(catalogServiceSpy.deleteService).not.toHaveBeenCalled();
    });

    it('should not delete the service if the version is empty.', () => {
      // arrange
      let serviceName = 'service name';
      let version = '';

      // act
      vm.delete(serviceName, version);

      // assert
      expect(catalogServiceSpy.deleteService).not.toHaveBeenCalled();
    });

    it('should delete the service if the version and service name are present.', () => {
      // arrange
      let serviceName = 'service name';
      let version = 'version';
      catalogServiceSpy.deleteService.and.returnValue($q.when());

      // act
      vm.delete(serviceName, version);
      $rootScope.$apply();

      // assert
      expect(catalogServiceSpy.deleteService).toHaveBeenCalledWith(serviceName, version);
    });

    it('should not download the service if the version is empty.', () => {
      // arrange
      let serviceName = 'service name';
      let version = '';

      // act
      vm.download(serviceName, version);

      // assert
      expect(catalogServiceSpy.downloadService).not.toHaveBeenCalled();
    });

    it('should not download the service if the service name is empty.', () => {
      // arrange
      let serviceName = '';
      let version = 'verison';

      // act
      vm.download(serviceName, version);

      // assert
      expect(catalogServiceSpy.downloadService).not.toHaveBeenCalled();
    });

    it('should not download the service if the service name and version are empty.', () => {
      // arrange
      let serviceName = '';
      let version = '';

      // act
      vm.download(serviceName, version);

      // assert
      expect(catalogServiceSpy.downloadService).not.toHaveBeenCalled();
    });

    it('should show the confirm dialog if service/version already exists.', () => {
      // arrange
      let version = 'version';

      // act
      vm.confirm(version);
      $rootScope.$apply();

      // assert
      expect($modalInstanceSpy.close).not.toHaveBeenCalled();
      expect(vm.confirmDelete).toBe(true);
    });

    it('should disable version if active is false.', () => {
      // arrange
      let serviceName = 'service name';
      let version = 'version';
      let active = 'false';
      catalogServiceSpy.activeService.and.returnValue($q.when());

      // act
      vm.update(serviceName, version, active);
      $rootScope.$apply();

      // assert
      expect(catalogServiceSpy.activeService).toHaveBeenCalledWith(serviceName, version, active);
    });

    it('should enable version if active is true.', () => {
      // arrange
      let serviceName = 'service name';
      let version = 'version';
      let active = 'true';
      catalogServiceSpy.activeService.and.returnValue($q.when());

      // act
      vm.update(serviceName, version, active);
      $rootScope.$apply();

      // assert
      expect(catalogServiceSpy.activeService).toHaveBeenCalledWith(serviceName, version, active);
    });

    it('should not update active checkbox if service name is empty.', () => {
      // arrange
      let serviceName = '';
      let version = 'version';
      let active = 'true';

      // act
      vm.update(serviceName, version, active);

      // assert
      expect(catalogServiceSpy.activeService).not.toHaveBeenCalledWith();
    });

    it('should not update active checkbox if version is empty.', () => {
      // arrange
      let serviceName = 'service name';
      let version = '';
      let active = 'true';

      // act
      vm.update(serviceName, version, active);

      // assert
      expect(catalogServiceSpy.activeService).not.toHaveBeenCalledWith();
    });

    it('should not update active checkbox if active is empty.', () => {
      // arrange
      let serviceName = 'service name';
      let version = 'version';
      let active = '';

      // act
      vm.update(serviceName, version, active);

      // assert
      expect(catalogServiceSpy.activeService).not.toHaveBeenCalledWith();
    });

    it('should not update active checkbox if service name, version and active are empty.', () => {
      // arrange
      let serviceName = '';
      let version = '';
      let active = '';

      // act
      vm.update(serviceName, version, active);

      // assert
      expect(catalogServiceSpy.activeService).not.toHaveBeenCalledWith();
    });

  });
}
