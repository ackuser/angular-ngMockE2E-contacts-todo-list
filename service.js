/**
 * Contant API Service
 */
angular.module('app').service('APIService', function($http) {


/**
 * Get all the contacts
 */
  function findAll() {
    return $http.get('/api/contacts')
    .then(function(data) {
        return data;
      });
  }
  
/**
 * Find a contacts
 */
  function find(details, byName) {
    param = byName == "byName"? "name":"email";
    return $http.get('/api/contact?' + param + '=' +  details)
    .then(function(data) {
        return data;
      });
  }

/**
 * Insert a contacts
 */
  function addContact(user) {
    return $http.post('/api/contacts',user)
    .then(function(data) {
        return data;
      });
  }

  
/**
 * Delete a contacts
 */
  function deleteIt(id) {
    return $http.delete('/api/contacts/' + id)
    .then(function(data) {
        return data;
      });
  }
  
  return { 
    findAll: findAll,
    find: find,
    deleteIt:deleteIt,
    addContact:addContact
  };
});
