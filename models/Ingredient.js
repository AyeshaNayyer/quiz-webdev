const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
    name: {
        type: String,
        required: true,
       
    },
    description: {
        type: String,
        
    },
  
});

module.exports = mongoose.model('ingredient', ingredientSchema);

