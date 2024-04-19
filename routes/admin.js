const bcrypt = require("bcrypt");
const Recipe = require("../models/Recipe");
const Ingredient = require("../models/Ingredient");
const Users = require("../models/User");
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const adminMiddleware = require('../middlewares/adminMiddleware');
const authenticate = require('../middlewares/authenticate');


// Get all users - TESTED
router.get("/user", async (req, res) => {
    try {
      const users = await Users.find();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
  });
router.get("/recipe", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});


router.use(authenticate); 



// POST endpoint to add a new venue
router.post('/recipe',authenticate,async (req, res) => {
  try {
    // Extract venue details from the request body
    const {name,description, ingredient } = req.body;

    // Create a new venue service instance
    const newVenue = new Recipe({
        name,
        description,
        ingredient,
       
    });

    // Save the new venue service to the database
    await newVenue.save();

    res.status(201).json({ msg: 'Recipe added successfully!', venue: newVenue });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
});

// POST endpoint to add a new venue
router.post('/ingredient',authenticate,async (req, res) => {
    try {
      // Extract venue details from the request body
      const {name,description } = req.body;
      // Create a new venue service instance
      const newingredient = new Ingredient({
          name,
          description,
      });
  
      // Save the new venue service to the database
      await newingredient.save();
  
      res.status(201).json({ msg: 'Ingredient added successfully!', ingredient: newingredient });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  });
  // Delete any service. -- TESTED
// Delete any recipe
router.post("/deleteby", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.body.id);
    if (!recipe) {
      console.log("Recipe not found.");
      return res.status(404).json({ msg: "Recipe not found" });
    }

    // Check if the user is an admin or the vendor associated with the service
    if (req.user.role === "admin") {
      await Recipe.deleteOne({ _id: req.body.id });
      console.log("Recipe deleted.");
      return res.json({ msg: "Recipe deleted" });
    } else {
      console.log("Unauthorized access.");
      return res.status(403).json({ msg: "Not authorized to delete this recipe" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

  // POST endpoint to add an existing ingredient to an existing recipe --works
router.post('/recipe/:recipeId/ingredient/:ingredientId', authenticate, async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const ingredientId = req.params.ingredientId;

    // Check if the recipe exists
    const existingRecipe = await Recipe.findById(recipeId);
    if (!existingRecipe) {
      return res.status(404).json({ msg: 'Recipe not found' });
    }

    // Check if the ingredient exists
    const existingIngredient = await Ingredient.findById(ingredientId);
    if (!existingIngredient) {
      return res.status(404).json({ msg: 'Ingredient not found' });
    }

    // Check if the ingredient is already added to the recipe
    if (existingRecipe.ingredient.includes(existingIngredient._id)) {
      return res.status(400).json({ msg: 'Ingredient already added to the recipe' });
    }

    // Add the ingredient to the recipe's ingredient array
    existingRecipe.ingredient.push(existingIngredient);
    await existingRecipe.save();

    res.status(201).json({ msg: 'Ingredient added to recipe successfully!', ingredient: existingIngredient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
});



  



module.exports = router;