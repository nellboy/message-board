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
    this.messages = [];

    this.collectMessages = function(){
      $.getJSON('messages.json', function(json) {
        this.messages = json.messages;
        $scope.$apply();
      }.bind(this));
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