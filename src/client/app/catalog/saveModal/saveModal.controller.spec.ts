module serviceCatalog.catalog {
  'use strict';

  describe('save modal controller', () => {
    var vm, $q, $rootScope;
    var $modalInstanceSpy, catalogServiceSpy;

    beforeEach(angular.mock.module('serviceCatalog.catalog'));

    beforeEach(() => {
      $modalInstanceSpy = jasmine.createSpyObj('$modalInstanceSpy', ['close', 'dismiss']);
      catalogServiceSpy = jasmine.createSpyObj('catalogServiceSpy', ['addService', 'updateService']);

      inject((_$rootScope_: ng.IRootScopeService, $controller: ng.IControllerService, _$q_: ng.IQService) => {
        vm = $controller('SaveModalController', {
          $modalInstance: $modalInstanceSpy,
          catalogService: catalogServiceSpy
        });
        $q = _$q_;
        $rootScope = _$rootScope_;
      });
    });

    it('should not show confirm dialog when controller loads.', () => {
      // arrange

      // act

      // assert
      expect(vm.confirmOverwrite).toBe(false);
    });

    it('should dismiss the modal when the cancel button is clicked.', () => {
      // arrange

      // act
      vm.cancel();

      // assert
      expect($modalInstanceSpy.dismiss).toHaveBeenCalled();
    });

    it('should not save the service if the team name is empty.', () => {
      // arrange
      let teamName = '';
      let swagger = 'swagger';

      // act
      vm.save(teamName, swagger);

      // assert
      expect(catalogServiceSpy.addService).not.toHaveBeenCalled();
    });

    it('should not save the service if the swagger file is empty.', () => {
      // arrange
      let teamName = 'team name';
      let swagger = '';

      // act
      vm.save(teamName, swagger);

      // assert
      expect(catalogServiceSpy.addService).not.toHaveBeenCalled();
    });

    it('should save the service and close the modal if successful.', () => {
      // arrange
      let teamName = 'team name';
      let swagger = 'swagger';
      catalogServiceSpy.addService.and.returnValue($q.when());

      // act
      vm.save(teamName, swagger);
      $rootScope.$apply();

      // assert
      expect(catalogServiceSpy.addService).toHaveBeenCalledWith(teamName, swagger);
      expect($modalInstanceSpy.close).toHaveBeenCalled();
    });

    it('should show the confirm dialog if service/version already exists.', () => {
      // arrange
      let teamName = 'team name';
      let swagger = 'swagger';
      let response = { status: 422 };
      catalogServiceSpy.addService.and.returnValue($q.reject(response));

      // act
      vm.save(teamName, swagger);
      $rootScope.$apply();

      // assert
      expect(catalogServiceSpy.addService).toHaveBeenCalledWith(teamName, swagger);
      expect($modalInstanceSpy.close).not.toHaveBeenCalled();
      expect(vm.confirmOverwrite).toBe(true);
    });

    it('should not update the service if the team name is empty.', () => {
      // arrange
      let teamName = '';
      let swagger = 'swagger';

      // act
      vm.update(teamName, swagger);

      // assert
      expect(catalogServiceSpy.updateService).not.toHaveBeenCalled();
    });

    it('should not update the service if the swagger file is empty.', () => {
      // arrange
      let teamName = 'team name';
      let swagger = '';

      // act
      vm.update(teamName, swagger);

      // assert
      expect(catalogServiceSpy.updateService).not.toHaveBeenCalled();
    });

    it('should update the service and close the modal if successful.', () => {
      // arrange
      let teamName = 'team name';
      let swagger = 'swagger';
      catalogServiceSpy.updateService.and.returnValue($q.when());

      // act
      vm.update(teamName, swagger);
      $rootScope.$apply();

      // assert
      expect(catalogServiceSpy.updateService).toHaveBeenCalledWith(teamName, swagger);
      expect($modalInstanceSpy.close).toHaveBeenCalled();
    });

  });
}
