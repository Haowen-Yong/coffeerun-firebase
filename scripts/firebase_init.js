(function (window) {
    'use strict';

    var App = window.App || {};

    class firebaseInit {
        constructor() {
            console.log("initializing firebase...");
            
            // Your web app's Firebase configuration
            // For Firebase JS SDK v7.20.0 and later, measurementId is optional
            var firebaseConfig = {
                apiKey: "AIzaSyA5ABxzFrzOnNthGvmO5Gxj9blR2Ftpk7Q",
                authDomain: "coffeerun-c5be5.firebaseapp.com",
                databaseURL: "https://coffeerun-c5be5.firebaseio.com",
                projectId: "coffeerun-c5be5",
                storageBucket: "coffeerun-c5be5.appspot.com",
                messagingSenderId: "280961865484",
                appId: "1:280961865484:web:50b17f761f46c4a3cddb29",
                measurementId: "G-ME8NSBH8Z7"
            };
            // Initialize Firebase
            var firebaseObject = firebase.initializeApp(firebaseConfig);
            //console.log(firebaseObject.name);
            return firebaseObject;
            // firebase.analytics();
        }
    }

    /*
<script src="https://requirejs.org/docs/release/2.3.5/minified/require.js"></script> // for requirejs?

    const admin = require('firebase-admin');

    admin.initializeApp({
        credential: admin.credential.applicationDefault()
    });

    const db = admin.firestore();

    const docRef = db.collection('users').doc('alovelace');

    await docRef.set({
        first: 'Ada',
        last: 'Lovelace',
        born: 1815
    });

    const aTuringRef = db.collection('users').doc('aturing');

    await aTuringRef.set({
        'first': 'Alan',
        'middle': 'Mathison',
        'last': 'Turing',
        'born': 1912
    });
    */

    App.firebaseInit = firebaseInit;
    window.App = App;
})(window);