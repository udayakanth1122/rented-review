module serviceCatalog.catalog {
  'use strict';

  describe('save modal service', () => {
    var saveModalService, $modalSpy;
    var modalInstanceResult = {};

    beforeEach(angular.mock.module('serviceCatalog.catalog'));

    beforeEach(() => {
      $modalSpy = jasmine.createSpyObj('$modalSpy', ['open']);
      $modalSpy.open.and.returnValue({ result: modalInstanceResult });

      angular.mock.module(($provide) => {
        $provide.value('$modal', $modalSpy);
      });
    });

    beforeEach(inject((_saveModalService_) => {
      saveModalService = _saveModalService_;
    }));

    it('should open a save modal dialog.', () => {
      // arrange

      // act
      let result = saveModalService.open();

      // assert
      expect($modalSpy.open).toHaveBeenCalledWith({
        templateUrl: 'app/catalog/saveModal/saveModal.html',
        controller: 'SaveModalController as vm'
      });
      expect(result).toBe(modalInstanceResult);
    });

  });
}
