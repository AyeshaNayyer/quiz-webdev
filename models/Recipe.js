const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
    {
        name: {
            type: String,         
            required: true
        },
        description: {
            type: String,
            required: true,
           
        },
        createdAt: {
            type: Date,
            default: Date.now,
            required: true
        },
        ingredient: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ingredient' }],
            required: true,
            default: []
        },
      
        
    }
);

// Create the base model
const recipe = mongoose.model('recipe', recipeSchema); 

module.exports = recipe;
