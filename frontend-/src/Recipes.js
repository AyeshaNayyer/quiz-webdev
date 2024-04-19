import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

const defaultTheme = createTheme();

const AdminPanel = () => {
  const [ingredientData, setIngredientData] = useState({
    name: '',
    description: ''
  });

  const [recipeData, setRecipeData] = useState({
    name: '',
    description: ''
  });

  const handleIngredientSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5600/admin/ingredient', ingredientData);
      alert('Ingredient added successfully!');
      setIngredientData({ name: '', description: '' });
    } catch (error) {
      console.error(error);
      alert('Error adding ingredient. Please try again.');
    }
  };

  const handleRecipeSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5600/admin/recipe', recipeData);
      alert('Recipe added successfully!');
      setRecipeData({ name: '', description: '' });
    } catch (error) {
      console.error(error);
      alert('Error adding recipe. Please try again.');
    }
  };

  const handleIngredientChange = (e) => {
    const { name, value } = e.target;
    setIngredientData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleRecipeChange = (e) => {
    const { name, value } = e.target;
    setRecipeData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Typography variant="h4" align="center">Admin Panel</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="ingredient-label">Ingredient Name</InputLabel>
              <Select
                labelId="ingredient-label"
                id="ingredient"
                name="name"
                value={ingredientData.name}
                onChange={handleIngredientChange}
              >
                <MenuItem value="Flour">Flour</MenuItem>
                <MenuItem value="Sugar">Sugar</MenuItem>
                <MenuItem value="Salt">Salt</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="ingredient-description"
              label="Ingredient Description"
              name="description"
              value={ingredientData.description}
              onChange={handleIngredientChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleIngredientSubmit}
            >
              Add Ingredient
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="recipe-name"
              label="Recipe Name"
              name="name"
              value={recipeData.name}
              onChange={handleRecipeChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="recipe-description"
              label="Recipe Description"
              name="description"
              value={recipeData.description}
              onChange={handleRecipeChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleRecipeSubmit}
            >
              Add Recipe
            </Button>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default AdminPanel;
