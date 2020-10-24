const { backedUpFiles } = require('./fresh');
const db = require('diskdb');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({
    origin: '*'
}));

// lowercaseOrder function will make all the orders in lowercase for the database for easier matching.
function lowercaseOrder(obj) {
    return {
        coffee: obj.coffee.toLowerCase(),
        emailAddress: obj.emailAddress.toLowerCase(),
        flavor: obj.flavor.toLowerCase(),
        strength: parseInt(obj.strength),
        size: obj.flavor.toLowerCase(),
        _id: obj._id
    };
}

// all orders
app.get('/coffeeorders', (req, res) => {
    db.connect('./data', ['coffeeorders']);
    res.json(db.coffeeorders.find());
});

app.post('/coffeeorders', (req, res) => {
    db.connect('./data', ['coffeeorders']);
    try {
        console.log(req.body);
        db.coffeeorders.save(lowercaseOrder(req.body));
        res.sendStatus(201);
    } catch (e) {
        console.log(`API error: ${e}`);
        res.sendStatus(500);
    }
});

app.delete('/coffeeorders', (req, res) => {
    db.connect('./data', ['coffeeorders']);
    backedUpFiles()
        .then(() => {
            res.sendStatus(200);
        });
});

// email routes.
app.get('/coffeeorders/:emailAddress', (req, res) => {
    const emailAddress = req.params.emailAddress ? req.params.emailAddress.toLowerCase() : undefined;
    console.log(`looking for: ${emailAddress}`);
    db.connect('./data', ['coffeeorders']);
    let record = db.coffeeorders.find( { emailAddress: emailAddress } );
    if (record) res.status(200).json(record);
    else res.sendStatus(404);
});

app.put('/coffeeorders/:emailAddress', (req, res) => {
    const emailAddress = req.params.emailAddress ? req.params.emailAddress.toLowerCase() : undefined ;
    console.log(`looking for: ${emailAddress}`);
    db.connect('./data', ['coffeeorders']);
    let record = db.coffeeorders.findOne( { emailAddress: emailAddress } );
    console.log(`PUT: ${JSON.stringify(record,null,2)}`);
    if (record) {
        try {
            req.body._id = record._id;
            db.coffeeorders.remove({ _id: record._id });
            setTimeout(() => {
                db.coffeeorders.save(req.body);
                res.status(200).json(req.body);
            }, 200);
        } catch (e) {
            res.status(500).json({"error": `${e}`});
        }
    }
    else res.sendStatus(404);
});

app.delete('/coffeeorders/:emailAddress', (req, res) => {
    const emailAddress = req.params.emailAddress.toLowerCase();
    console.log(`looking for: ${emailAddress}`);
    db.connect('./data', ['coffeeorders']);
    let record = db.coffeeorders.findOne( { emailAddress: emailAddress } );
    if (record) {
        db.coffeeorders.remove( { _id: record._id }, false );
        res.sendStatus(200);
    }
    else res.sendStatus(404);
});

// coffee type orders
app.get('/coffeeorders/coffee/:coffee', (req, res) => {
    const coffee = req.params.coffee.toLowerCase();                 // put the coffee type in lower case
    console.log(`looking for: ${coffee}`);                          // print out a message in browser console that says "looing for (coffee)"
    db.connect('./data', ['coffeeorders']);                         // connect to the database and the coffeeorders file
    let record = db.coffeeorders.find( { coffee: coffee } );        // look for the coffee orders with the specified coffee type
    if (record) res.status(200).json(record);                       // if found, then set HTTP status to 200
    else res.sendStatus(404);                                       // if not found, then send response message 404
});

app.delete('/coffeeorders/coffee/:coffee', (req, res) => {
    const coffee = req.params.coffee.toLowerCase();                 // put the coffee type in lower case
    console.log(`looking for: ${coffee}`);                          // print out a message in browser console that says "looking for (coffee)"
    db.connect('./data', ['coffeeorders']);                         // connect to the database and the coffeeorders file
    let record = db.coffeeorders.find( { coffee: coffee } );        // look for coffee orders with the specified coffee type
    console.log(`record: ${JSON.stringify(record)}`);               // convert the found record into strings and print it out in browser console
    if (record) {
        db.coffeeorders.remove( { _id: order._id }, false );        // if found, then remove the found record
        res.sendStatus(200);                                        // send response message 200
    }
    else res.sendStatus(404);                                       // if not found, then send response message 404
});

// flavor orders
app.get('/coffeeorders/flavor/:flavor', (req, res) => {
    const flavor = req.params.flavor.toLowerCase();                 // put flavor type in lower case
    console.log(`looking for: ${flavor}`);                          // print out a message in browser console that says "looking for (flavor)"
    db.connect('./data', ['coffeeorders']);                         // connect to the databse and the coffeeorders file
    let record = db.coffeeorders.find( { flavor: flavor } );        // look for coffee orders with the specified flavor
    if (record) res.status(200).json(record);                       // if found, then set HTTP status to 200
    else res.sendStatus(404);                                       // if not found, then send response message 404
});

app.delete('/coffeeorders/flavor/:flavor', (req, res) => {
    const flavor = req.params.flavor.toLowerCase();                 // set flavor type in lower case
    console.log(`looking for: ${flavor}`);                          // pring out a message in browser console that says "looking fo (flavor)"
    db.connect('./data', ['coffeeorders']);                         // connect to the database and the coffeeorders file
    let record = db.coffeeorders.find( { flavor: flavor } );        // look for coffee orders with the specified flavor
    console.log(`deleting flavors: ${JSON.stringify(record)}`);     // convert the found record into strings and pring it out in browser console saying it will be deleted
    if (record) {
        db.coffeeorders.remove( { flavor: flavor }, true );         // if found, then remove the found record
        res.sendStatus(200);                                        // send response message 200
    }
    else res.sendStatus(404);                                       // if not found, then send response message 404
});

// strength orders
app.get('/coffeeorders/strength/:strength', (req, res) => {
    const strength = parseInt(req.params.strength);                 // parse the strenth value and get its integer value
    if(!strength) {
        res.sendStatus(404);                                        // if strength can't be found, then send response message 404
    }
    console.log(`looking for: ${strength}`);                        // print a message in browser console that says "looking for (strength)"
    db.connect('./data', ['coffeeorders']);                         // connect to databse and coffeeorders file
    let record = db.coffeeorders.find( { strength: strength } );    // look for specified strength in coffeeorders file
    if (record) res.status(200).json(record);                       // if found, then set HTTP status to 200
    else res.sendStatus(404);                                       // if not found, then send response message 404
});

app.delete('/coffeeorders/strength/:strength', (req, res) => {
    const strength = parseInt(req.params.strength);                 // parse the strength value and get its integer value
    if(!strength) {
        res.sendStatus(404);                                        // if strength can't be found, then send response message 404
    }
    console.log(`looking for: ${strength}`);                        // pring a message in browser console that says "looking for strength"
    db.connect('./data', ['coffeeorders']);                         // connect to database and coffeeorders files
    let record = db.coffeeorders.find( { strength: strength } );    // look for specified strength in coffeeorders file
    console.log(`record: ${JSON.stringify(record)}`);               // convert the found record into a string and print it out in browser console
    if (record) {
        db.coffeeorders.remove( { _id: order._id }, true );         // if found, remove the record from coffeeorders
        
        res.sendStatus(200);                                        // send response message 200
    }
    else res.sendStatus(404);                                       // send response message 404
});

// size orders
app.get('/coffeeorders/size/:size', (req, res) => {
    const size = req.params.size.toLowerCase();                     // put size in lower case
    console.log(`looking for: ${size}`);                            // print out a message in browser console that says "looking for (size)"
    db.connect('./data', ['coffeeorders']);                         // connect to databse and coffeeorders file
    let record = db.coffeeorders.find( { size: size } );            // look for specified size in coffeeorders
    if (record) res.status(200).json(record);                       // if found, set HTTP status to 200
    else res.sendStatus(404);                                       // if not found, send response message 404
});

app.delete('/coffeeorders/size/:size', (req, res) => {
    const size = req.params.size.toLowerCase();                     // put size in loswer case
    console.log(`looking for: ${size}`);                            // print out a message in browser console that says "looking for (size)"
    db.connect('./data', ['coffeeorders']);                         // connect to database and coffeeorders file
    let record = db.coffeeorders.find( { size: size } );            // look for specified size
    console.log(`deleting flavors: ${JSON.stringify(record)}`);     // convert the found record into a string and print it out in browser console
    if (record) {
        db.coffeeorders.remove( { size: size }, true );             // if found, remove record from coffeeorders
        res.sendStatus(200);                                        // send response message 200
    }
    else res.sendStatus(404);                                       // send response message 404
});
 
app.listen(3000);