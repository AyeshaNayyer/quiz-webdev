import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

const defaultTheme = createTheme();

const AdminRecipePage = ({ user }) => {
  const [ingredientData, setIngredientData] = useState([]);
  const [recipeData, setRecipeData] = useState({
    name: '',
    description: '',
    ingredients: [],
  });
  const [ingredientInput, setIngredientInput] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    try {
      const res = await axios.get('http://localhost:5600/admin/ingredient', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setIngredientData(res.data);
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    }
  };

  const handleIngredientInput = (e) =>
    setIngredientInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleRecipeInput = (e) =>
    setRecipeData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleAddIngredient = async () => {
    try {
      const res = await axios.post('http://localhost:5600/admin/ingredient', ingredientInput, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      window.alert(res.data.msg);
      setIngredientInput({ name: '', description: '' });
      fetchIngredients();
    } catch (error) {
      window.alert('Error adding ingredient');
      console.error('Error adding ingredient:', error);
    }
  };

  const handleAddRecipe = async () => {
    try {
      const res = await axios.post('http://localhost:5600/admin/recipe', recipeData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      window.alert(res.data.msg);
      setRecipeData({ name: '', description: '', ingredients: [] });
    } catch (error) {
      window.alert('Error adding recipe');
      console.error('Error adding recipe:', error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Admin Recipe Page
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="ingredientName"
                  label="Ingredient Name"
                  name="name"
                  value={ingredientInput.name}
                  onChange={handleIngredientInput}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="ingredientDescription"
                  label="Ingredient Description"
                  name="description"
                  value={ingredientInput.description}
                  onChange={handleIngredientInput}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleAddIngredient}
                >
                  Add Ingredient
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="recipeName"
                  label="Recipe Name"
                  name="name"
                  value={recipeData.name}
                  onChange={handleRecipeInput}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="recipeDescription"
                  label="Recipe Description"
                  name="description"
                  value={recipeData.description}
                  onChange={handleRecipeInput}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="ingredient-select-label">Ingredients</InputLabel>
                  <Select
                    labelId="ingredient-select-label"
                    id="ingredients"
                    multiple
                    value={recipeData.ingredients}
                    onChange={(e) =>
                      setRecipeData((prev) => ({
                        ...prev,
                        ingredients: e.target.value,
                      }))
                    }
                  >
                    {ingredientData.map((ingredient) => (
                      <MenuItem key={ingredient._id} value={ingredient._id}>
                        {ingredient.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              onClick={handleAddRecipe}
              sx={{ mt: 3 }}
            >
              Add Recipe
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/admin" variant="body2">
                  Back to Admin Dashboard
                </Link>
              </Grid>
            </Grid>
          </Box>
          </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AdminRecipePage;
