(function (window) {
    'use strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';     // CHOOSE ONLY ONE...
    // var SERVER_URL = 'https://co.audstanley.com/coffeeorders';    // if running on the shared server
    // var SERVER_URL = 'http://localhost:3000/coffeeorders';          // if running locally

    var App = window.App;
    var Truck = App.Truck;
    //var DataStore = new App.DataStore;
    //var RemoteDataStore = App.RemoteDataStore;
    var FireBaseDataStore = App.FireBaseDataStore;
    var FormHandler = App.FormHandler;
    var Validation = App.Validation;
    var CheckList = App.CheckList;
    // var remoteDS = new RemoteDataStore(SERVER_URL);

    // do NOT create an anonymous FireBaseDataStore() -- google will not allow it
    //    make a variable named remoteFireBase, and use that to create the new Truck
    var remoteFireBase = new FireBaseDataStore();

    // var truck = new Truck('ncc-1701', new DataStore());
    // var truck = new Truck('ncc-1701', remoteFireBase);
    var truck = new Truck('ncc-1701', remoteFireBase);
    window.truck = truck;
    var checkList = new CheckList(CHECKLIST_SELECTOR);
    checkList.addClickHandler(truck.deliverOrder.bind(truck));
    var formHandler = new FormHandler(FORM_SELECTOR);

    formHandler.addSubmitHandler(function(data) {
        truck.createOrder.call(truck, data);
        checkList.addRow.call(checkList, data);
        /*
        return truck.createOrder.call(truck, data)
            .then(() => {
                checkList.addRow.call(checkList, data);
            }); 
            */
    });
    console.log(formHandler);

    formHandler.addInputHandler(Validation.isCompanyEmail);
    truck.printOrders(checkList.addRow.bind(checkList));

})(window);

/*
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
*/