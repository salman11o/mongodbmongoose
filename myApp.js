require('dotenv').config();
//Setup mongoose
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// Create schema
const { Schema } = mongoose;
const personSchema = new Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});

//Create model from personSchema
let Person = mongoose.model('Person', personSchema);

//Create and save a new document
const createAndSavePerson = (done) => {
  let person = new Person({ name: "Jhon", age: 30, favoriteFoods: ["Apple", "Watermelon", "Orange"] });

  person.save(function(err, data) {
    if (err) return console.log(err);
    // saved!
    done(null, data);
  });

};

// Creating a schema with many peoples
const createManyPeople = (arrayOfPeople, done) => {
  // arrayOfPeople = [
  //   { name: "Jhon", age: 30, favoriteFoods: ["Apple", "Watermelon", "Orange"]},
  //   { name: "Jane", age: 25, favoriteFoods: ["Coconut", "Grapes", "Cherry"] },
  //   { name: "James", age: 20, favoriteFoods: ["Pear", "Kiwi", "Lemon"]}
  //   ];
  Person.create(arrayOfPeople, function(err, data) {
    if (err) return console.log(err);
    done(null, data);
  });

};

// Find a document by name
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function(err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

// Find document by specific parameter in this case, food.
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function(err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

// Find a document by ID
const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, function(err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

// Find a document edit then save
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({ _id: personId }, function(err, data) {
    if (err) return console.log(err);
    data.favoriteFoods.push(foodToAdd);
    data.save(function(err, newPerson) {
      if (err) return console.log(err);
      done(null, newPerson);
    });
  });

};

// Find a document then update
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true },
    function(err, data) {
      if (err) return console.log(err);
      done(null, data);
    });
};

// Remove a document by ID
const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id:personId}, function(err, data){
    if(err) return console.log(err);
    done(null , data);
  });
};

// Remove many documents 
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove}, function(err, data){
    if(err) return console.log(err);
    done(null , data);
  });

};

// Query a document in chain
const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods:foodToSearch})
  .sort({name: "asc"})// Sort name in ascendent order
  .limit(2)// Limit query to two results
  .select({name:1,favoriteFoods: 1}) // From query include only name and favriteFoods
  .exec(function(err, data){// Execute callback function
    if(err)return console.log(err);
    done(null , data);

  });


};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
