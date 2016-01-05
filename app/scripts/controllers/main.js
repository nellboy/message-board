'use strict';

/**
 * @ngdoc function
 * @name messageBoardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the messageBoardApp
 */
angular.module('messageBoardApp')
  .controller('MainCtrl', function ($scope) {
    this.newMessage = {'poster': '', 'message': '', 'errors': []};
    this.messages = [];

    this.collectMessages = function(){
      $.getJSON('messages.json', function(json) {
        this.messages = json.messages;
        $scope.$apply();
      }.bind(this));
    };

    this.addMessage = function(){
      this.newMessage.errors = [];
      if(!this.newMessage.poster.length){
        this.newMessage.errors.push('Your name is required');
      }
      if(this.newMessage.poster.length > 50){
        this.newMessage.errors.push('Your name is too long, 50 characters maximum is allowed.');
      }
      if(!this.newMessage.message.length){
        this.newMessage.errors.push('Your message is required');
      }
      if(this.newMessage.message.length > 200){
        this.newMessage.errors.push('Your message is too long, 200 characters maximum is allowed.');
      }
      if(!this.newMessage.errors.length){
        this.messages.push(this.newMessage);
        this.newMessage = {'poster': '', 'message': '', 'errors': []};
      }
    };
  })

  .directive('messages', function(){
    return {
      restrict: 'E',
      templateUrl: '/views/messages.html',
      link: function($scope){
        $scope.main.collectMessages();
      }
    };
  });