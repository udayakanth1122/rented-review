module serviceCatalog.catalog {
  'use strict';

  angular
    .module('serviceCatalog.catalog', [
    'bootstrap.fileField',
    'ngResource',
    'ngSanitize',
    'swaggerUi',
    'ui.bootstrap',
    'ui.router'
  ]);
}
