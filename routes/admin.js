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
router.post("/deleteby", async (req, res) => {
    try {
      const service = await Service.findById(req.body.id);
      if (!service) {
        console.log("Ingredient not found.");
        return res.status(404).json({ msg: "Ingredient not found" });
      }
  
      // Check if the user is an admin or the vendor associated with the service
      if (req.user.role === "admin") {
        await Service.deleteOne({ _id: req.body.id });
        console.log("Ingredient deleted.");
        return res.json({ msg: "Service deleted" });
      } else {
        console.log("Unauthorized access.");
        return res.status(403).json({ msg: "Not authorized to delete this service" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  });
  



module.exports = router;