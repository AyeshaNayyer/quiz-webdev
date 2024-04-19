const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            enum: ['admin', 'user'],
            required: true
        },
        email: {
            type: String,
            required: true,
            match: /\S+@\S+\.\S+/,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 8
        },
        firstName: {
            type: String,
            required: true,
            minlength: 3
        },
        lastName: {
            type: String,
            required: true,
            minlength: 3
        },
       
        createdAt: {
            type: Date,
            default: Date.now,
            required: true
        },
        recipe: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'recipe' }],
            default: []
        },
      
        
    }
);

// Create the base model
const User = mongoose.model('Users', UserSchema); // Corrected from 'Users' to 'User'

module.exports = User;
