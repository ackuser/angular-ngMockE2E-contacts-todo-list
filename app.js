angular.module('app', ['appMock']).controller('MainController',
  function($scope, APIService) {
    $scope.contact = $scope.contacts = null;

    $scope.selectedOption = 'byName';

    APIService.findAll().then(function(list) {
      console.log(list);
      $scope.contacts = list.data;
      $scope.contact = true;
    });


    $scope.deleteContact = function(id) {
      console.log("Deleting contact with id: " + id);
      APIService.deleteIt(id).then(function(list) {
        console.log("A contact was deleted: " + list.data);
        $scope.contacts = list.data;
      });
    }


    $scope.addContact = function() {
      console.log("Adding contact");
      APIService.addContact($scope.newuser).then(function(list) {
        console.log("A contact was added: " + list.data);
        $scope.contacts = list.data;
      });
    }
    
    $scope.searchContact = function() {
      APIService.find($scope.info, $scope.selectedOption).then(function(list) {
        console.log(list);
        $scope.contact = true;
        $scope.searchResult = list.data;
        //$scope.contacts = list.data;
      });
    }
  });