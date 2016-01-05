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

    MainCtrl.collectMessages();
  }));

  it('should collect messages', function () {
    expect(MainCtrl.messages.length).toBe(2);
  });

  it('should allow visitors to add valid messages', function () {
    MainCtrl.newMessage = {"poster": "Paul Nelligan", "message": "Hello World, again!"};
    MainCtrl.addMessage();
    expect(MainCtrl.messages.length).toBe(3);
    expect(MainCtrl.newMessage.errors.length).toBe(0);
  });

  it('should prevent visitors from adding messages with no poster', function () {
    MainCtrl.newMessage = {"poster": "", "message": "Hello World, again!"};
    MainCtrl.addMessage();
    expect(MainCtrl.messages.length).toBe(2);
    expect(MainCtrl.newMessage.errors.length).toBe(1);
  });

  it('should prevent visitors from adding messages with no messages', function () {
    MainCtrl.newMessage = {"poster": "Paul Nelligan", "message": ""};
    MainCtrl.addMessage();
    expect(MainCtrl.messages.length).toBe(2);
    expect(MainCtrl.newMessage.errors.length).toBe(1);
  });

  it('should prevent visitors from adding messages with poster longer than 50 characters', function () {
    MainCtrl.newMessage = {"poster": "Paul Nelligan Paul Nelligan Paul Nelligan Paul Nelligan", "message": "Hello World, again!"};
    MainCtrl.addMessage();
    expect(MainCtrl.messages.length).toBe(2);
    expect(MainCtrl.newMessage.errors.length).toBe(1);
  });

  it('should prevent visitors from adding messages with message longer than 200 characters', function () {
    MainCtrl.newMessage = {"poster": "Paul Nelligan", "message": "Hello World, again! Hello World, again! Hello World, again! Hello World, again! Hello World, again! Hello World, again! Hello World, again! Hello World, again! Hello World, again! Hello World, again! Hello World, again! Hello World, again!"};
    MainCtrl.addMessage();
    expect(MainCtrl.messages.length).toBe(2);
    expect(MainCtrl.newMessage.errors.length).toBe(1);
  });

});