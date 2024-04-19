const bcrypt = require("bcrypt");
const Recipe = require("../models/Recipe");
const Ingredient = require("../models/Ingredient");
const Users = require("../models/User");
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const userMiddleware = require('../middlewares/userMiddleware');
const authenticate = require('../middlewares/authenticate');



router.use(authenticate); 
router.get("/recipe", async (req, res) => {
    try {
      const recipes = await Recipe.find();
      res.json(recipes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
  });
  // GET request to retrieve a specific recipe with details
router.get("/recipe/:recipeId", async (req, res) => {
    try {
      const recipeId = req.params.recipeId;
  
      // Find the recipe by ID and populate the 'ingredient' field with actual ingredient documents
      const recipe = await Recipe.findById(recipeId).populate('ingredient');
  
      if (!recipe) {
        return res.status(404).json({ msg: "Recipe not found" });
      }
  
      // Extract relevant information from the recipe
      const { name, description, createdAt, ingredient } = recipe;
  
      // Extract ingredient details including name and description
      const ingredientDetails = ingredient.map(({ name, description }) => ({ name, description }));
  
      // Send the response with recipe and ingredient details
      res.json({ 
        name,
        description,
        createdAt,
        ingredient: ingredientDetails 
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  });
  


  module.exports = router;