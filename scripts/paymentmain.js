(function (window) {
    'use strict';
    var PAYMENT_FORM_SELECTOR = '[data-payment="paymentform"]';
    var App = window.App;
    var PaymentFormHandler = App.PaymentFormHandler;
    var paymentFormHandler = new PaymentFormHandler(PAYMENT_FORM_SELECTOR);

    paymentFormHandler.addSubmitHandler();
    /*
    paymentFormHandler.addSubmitHandler(function (data) {
        paymentFormHandler.printModalMessage.call(paymentFormHandler, data);
    });
    */

    console.log(paymentFormHandler);
})(window);