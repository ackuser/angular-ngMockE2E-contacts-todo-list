angular.module('appMock', ['ngMockE2E'])

.run(function($httpBackend) {
  
  var contacts = [{
    id: 0,
    name: 'name 0',
    email: 'test0@test.com'
  }, {
    id: 1,
    name: 'name 1',
    email: 'test1@test.com'
  }, {
    id: 2,
    name: 'name 2',
    email: 'test2@test.com'
  }];



  /**
   * @url GET /contacts 
   */
  $httpBackend.whenGET('/api/contacts').respond(function() {
    console.log('Retrieving contacts ' + contacts);
    return [200, contacts];
  });

  /**
   * @url GET /contact?name=
   */
  $httpBackend.whenGET(/^\/api\/contact\?name=.*/)
    .respond(function(method, url, data, headers, params) {
      console.log('Received these url:' + url);
      console.log('Received these params:' + params.name);
      var results = contacts.filter(function(item, index, array) {
        return item.name.indexOf(params.name)!== -1;
      });
      console.log("RESULTS " + results);
      return [200, results];
    });
 
  /**
   * @url GET /contact?email=
   * You may process email in a different way
   */
  $httpBackend.whenGET(/^\/api\/contact\?email=.*/)
    .respond(function(method, url, data, headers, params) {
      console.log('Received these url:' + url);
      console.log('Received these params:' + params.email);
      var results = contacts.filter(function(item, index, array) {
        return item.email.indexOf(params.email)!== -1;
      });
      console.log("RESULTS " + results);
      return [200, results];
    });
    
   /**
   * @url POST /contact=
   */
  $httpBackend.whenPOST('/api/contacts')
  .respond(function(method, url, data, headers) {
      console.log("POST " + data);
      var newContact = JSON.parse(data);
      newContact.id = contacts.length;
      console.log(newContact)
      contacts.push(newContact);
      return [201, contacts];
    });

  /**
   * @url DELETE /contacts/:id
   */
   $httpBackend.whenRoute('DELETE', '/api/contacts/:id')
  .respond(function(method, url, data, headers, params) {
    console.log("Deleting the contact with id: " + params.id);
     var results = contacts.filter(function(item, index, array) {
        return item.id !=  params.id;
      });
      contacts = results;
    return [204, contacts];
  });
  

});