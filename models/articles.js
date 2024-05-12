/*
The ArticleSchema variable is an instance of the Schema class from the mongoose module. A schema defines the structure of a document in a MongoDB collection.
The ArticleSchema is used to create a model, which is a class that represents a collection of documents in a MongoDB database. The model() function takes three arguments:
- The name of the model
- The schema for the model
- The name of the collection that the model will represent

The model() function returns a constructor function that can be used to create new documents.
*/
const { Schema, model } = require('mongoose');
const { type } = require('os');

const ArticleSchema = new Schema({
    title: { type: String, required: true }, // Set required to true directly
    content: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    image: { type: String, required: true, default: 'default.png' },
})

module.exports = model('Article', ArticleSchema, 'articles');



