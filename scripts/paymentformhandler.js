(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    var title;
    var name;

    class PaymentFormHandler {
        constructor(selector) {
            if (!selector) {
                throw new Error('No selecor provided');
            }
            this.$formElement = $(selector);
            if (this.$formElement.length === 0) {
                throw new Error('Could not find element with selector: ' + selector);
            }
        }
        addSubmitHandler() {
            console.log('Setting submit handler for payment form');
            this.$formElement.on('submit', function (event) {
                event.preventDefault();

                var data = {};
                $(this).serializeArray().forEach(function (item) {
                    data[item.name] = item.value;
                    if (item.name === "title") {
                        title = item.value;
                    }
                    if (item.name === "username") {
                        name = item.value;
                    }
                    console.log(item.name + ' is ' + item.value);
                });
                console.log(data);
                console.log('Thank you for purchasing, ' + title + ' ' + name + '!');
                //fn(data);
                this.reset();
                this.elements[0].focus();
            });
        }
        printModalMessage() {
            var popupElement = new popup();
            this.$element.append(popupElement.$element);
        }
    }

    class popup {
        constructor() {
            var $div = $('<div></div>', {
                'id': 'ex1',
                'class': 'modal'
            });

            var $p = $('<p></p>');

            var thankyou = 'Thank you for you purchase, ';
            thankyou += title + ' ';
            thankyou += name + '!';

            var $a = $('<a></a>', {
                'href': '#',
                'rel': 'modal:close'
            });

            var close = 'Close';

            $a.append(close);
            $p.append(thankyou);
            $div.append($p);
            $div.append($a);

            this.$element = $div;

            /*
            var BUTTON_SELECTOR = '[class="submitbutton"';
            var btn = document.querySelector(BUTTON_SELECTOR);

            var $mopen = $('<a></a>', {
                'href': '#ex1',
                'rel': 'modal:close'
            });

            btn.append($mopen);
            */
        }
    }

    App.PaymentFormHandler = PaymentFormHandler;
    window.App = App;
//initialize(window);
})(window);