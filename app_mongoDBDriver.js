//basic MongoDB driver

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert'); //assert is for testing if the data is correct

// Connection URL
const url = 'mongodb://0.0.0.0:27017/';

// Database Name
const dbName = 'fruitsDB';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    // insertDocuments(db, function() {
    //     client.close();
    // })

    findDocuments(db, function() {
        client.close();
    })
  
    }
);


const insertDocuments = function(db, callback) {
    // create a new collection called fruits
    const collection = db.collection('fruits');

    // insert some documents
    collection.insertMany([
        {name: 'Orange', score: 6},
        {name: 'Lemon', score: 9}
    ], function(err, result) {
        assert.equal(err, null);
        assert.equal(2, result.insertedCount);
        assert.equal(2, Object.keys(result.insertedIds).length);
        console.log("Inserted 2 documents into the collection");
        callback(result);
    }
    );
}

const findDocuments = function(db, callback) {
    // get the fruits collection
    const collection = db.collection('fruits');
    // find some documents
    collection.find({}).toArray(function(err, fruits) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(fruits)
        callback(fruits);
    }
    );
}