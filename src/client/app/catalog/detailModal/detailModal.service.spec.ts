module serviceCatalog.catalog {
  'use strict';

  describe('detail modal service', () => {
    var detailModalService, $modalSpy;
    var modalInstanceResult = {};

    beforeEach(angular.mock.module('serviceCatalog.catalog'));

    beforeEach(() => {
      $modalSpy = jasmine.createSpyObj('$modalSpy', ['open']);
      $modalSpy.open.and.returnValue({ result: modalInstanceResult });

      angular.mock.module(($provide) => {
        $provide.value('$modal', $modalSpy);
      });
    });

    beforeEach(inject((_detailModalService_) => {
      detailModalService = _detailModalService_;
    }));

    it('should open a detail modal dialog.', () => {
      // arrange
      let serviceName = 'service name';
      let versions = ['versions'];

      // act
      let result = detailModalService.open(serviceName, versions);
      let args = $modalSpy.open.calls.argsFor(0)[0];

      // assert
      expect(args.templateUrl).toEqual('app/catalog/detailModal/detailModal.html');
      expect(args.controller).toEqual('DetailModalController as vm');
      expect(args.resolve.serviceName()).toEqual(serviceName);
      expect(args.resolve.versions()).toEqual(versions);
      expect(result).toBe(modalInstanceResult);
    });

  });
}
