(function (window) {
    'use strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    //var SERVER_URL = 'https://co.audstanley.com/coffeeorders';        // running on shared server
    var SERVER_URL = 'http://localhost:3000/coffeeorders';      // running locally
    var App = window.App;
    var firebaseInit = App.firebaseInit;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var RemoteDataStore = App.RemoteDataStore;
    var FormHandler = App.FormHandler;
    var Validation = App.Validation;
    var CheckList = App.CheckList;
    var firebaseObject = new firebaseInit();
    //console.log(firebaseObject.name);
    //var remoteDS = new RemoteDataStore(SERVER_URL);
    var firebaseDS = new RemoteDataStore(firebaseObject);
    //var myTruck = new Truck('ncc-1701', new DataStore());
    //var myTruck = new Truck('ncc-1701', remoteDS);
    var myTruck = new Truck('ncc-1701', firebaseDS); // for firebase
    window.myTruck = myTruck;
    var checkList = new CheckList(CHECKLIST_SELECTOR);
    checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
    var formHandler = new FormHandler(FORM_SELECTOR);

    formHandler.addSubmitHandler(function (data) {
        myTruck.createOrder.call(myTruck, data);
        checkList.addRow.call(checkList, data);
    });

    formHandler.addInputHandler(Validation.isCompanyEmail);

    console.log(formHandler);
})(window);