//using mongoose

const mongoose = require('mongoose');


// Connect to the server with fruitsDB. If fruitsDB does not exist, it will be created.
mongoose.connect('mongodb://0.0.0.0:27017/fruitsDB', { useNewUrlParser: true }); 

const fruitsSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Name field is required']}, //schema with validator
    score: {type: Number, min: 1, max: 10} //schema with a validator min and max
});

// Create a model based on the schema
const Fruit = mongoose.model('Fruit', fruitsSchema); 

// Create a new fruit document
const fruit = new Fruit({
    name: 'Apple',
    score: 10
})

fruit.save(function(err) {
    if (err) throw err;
    console.log('Fruit saved successfully!');
}
);



//Create a group of fruits
const fruit1 = new Fruit({
    name: 'Orange',
    score: 6
})
const fruit2 = new Fruit({
    name: 'Lemon',
    score: 9
})
const fruit3 = new Fruit({
    name: 'Pear',
    score: 7
})
const fruit4 = new Fruit({
    name: 'Grape',
    score: 8
})

Fruit.insertMany([fruit1, fruit2, fruit3, fruit4], function(err, result) {
    if (err) throw err;
    console.log('Group of Fruits saved successfully!');
}
);



// create a new schema for Person
const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitsSchema //embedding the fruits schema inside the property favouriteFruit
});

const Person = mongoose.model('Person', personSchema);


const pine = new Fruit({
    name: 'Pine',
    score: 10
})

pine.save();


const amy = new Person({
    name: 'Amy',
    age: 25,
    favouriteFruit: pine
})

amy.save();


const person = new Person({
    name: 'John',
    age: 30
})

person.save(function(err) {
    if (err) throw err;
    console.log('Person saved successfully!');
})


// Now there should be 2 collections in the fruitsDB: fruits and persons.


// Find all fruits in the fruitsDB
Fruit.find(function(err, fruits) {
    if (err) throw err;

    console.log('Fruits found successfully!');
    // console.log(fruits);

    fruits.forEach(function(fruit) {
        console.log(fruit.name);
    })

  

});

//update record of 'Orange' to 'Peach'
Fruit.updateOne({name: 'Orange'}, {name: "Peach"}, function(err) {
    if (err) throw err;
    console.log('Fruit updated successfully!');

})

//delete record of 'Pear'
Fruit.deleteOne({name: 'Apple'}, function(err) {
    if (err) throw err;
    console.log('Fruit deleted successfully!');
})

Fruit.deleteMany({}, function(err) {
    if (err) throw err;
    console.log('All fruits deleted successfully!');
}
);


// Find all persons in the fruitsDB
Person.find(function(err, persons) {
    if (err) throw err;
    console.log('Persons found successfully!');
    console.log(persons);
});


//delete all persons named 'John' in the fruitsDB
Person.deleteMany({name: 'John'}, function(err) {
    if (err) throw err;
    console.log('Persons deleted successfully!');
      // Close the connection
    mongoose.connection.close(() => {
        console.log('----Force to close the MongoDB conection----')
        process.exit(0)
       })
});
