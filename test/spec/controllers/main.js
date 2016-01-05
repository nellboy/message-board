'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('messageBoardApp'));

  // load the BootstrapUI module
  beforeEach(module('ui.bootstrap'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {

    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
      // place here mocked dependencies
    });

    spyOn(MainCtrl, 'collectMessages').and.callFake(function () {
      this.messages = [
        {
          "poster": "Paul Nelligan",
          "message": "Hello World"
        },
        {
          "poster": "Paul Nelligan",
          "message": "Goodbye Cruel World!"
        }
      ];
    });

  }));

  it('should collect messages', function () {
    MainCtrl.collectMessages();
    expect(MainCtrl.messages.length).toBe(2);
  });

});