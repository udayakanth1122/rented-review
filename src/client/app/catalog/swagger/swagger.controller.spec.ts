module serviceCatalog.catalog {
  'use strict';

  describe('swagger controller', () => {
    var vm;
    var catalogApiUrl = 'catalogApiUrl';
    var $stateParams = { title: 'title', version: '1.0.0' };

    beforeEach(angular.mock.module('serviceCatalog.catalog'));

    beforeEach(() => {

      inject(($controller: ng.IControllerService) => {
        vm = $controller('SwaggerController', {
          catalogApiUrl: catalogApiUrl,
          $stateParams: $stateParams
        });
      });
    });

    it('should should generate url based on the apps current state parameters.', () => {
      // arrange

      // act

      // assert
      expect(vm.url).toEqual('catalogApiUrl/services/title/1.0.0');
    });

  });
}
