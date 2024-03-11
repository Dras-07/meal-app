import React, { useState } from 'react';
import axios from 'axios';
import "./styles/editForm.css";
const EditForm = ({ meal, onClose, onUpdateMeal }) => {
  // Initialize state for form fields
  const [name, setName] = useState(meal.name);
  const [description, setDescription] = useState(meal.description);
  const [imageUrl, setImageUrl] = useState(meal.imageUrl);
  const [ingredients, setIngredients] = useState(meal.ingredients.map(ingredient => ingredient.name));

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedMeal = {
        id: meal.id, // Include the meal ID in the updated meal object
        name,
        description,
        imageUrl,
        ingredients: ingredients.map(name => ({ name }))
      };
      await axios.put(`http://localhost:5000/meals/${meal.id}`, updatedMeal);
      console.log('Meal updated successfully');
      // Pass the updated meal to the parent component
      onUpdateMeal(updatedMeal);
      // Close the form after submission
      onClose();
    } catch (error) {
      console.error('Error updating meal:', error);
    }
  };

  // Handle ingredient input change
  const handleIngredientChange = (e, index) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = e.target.value;
    setIngredients(newIngredients);
  };

  // Handle adding a new ingredient field
  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  // Handle removing an ingredient field
  const handleRemoveIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  return (
    <div className="edit-form">
      <h2>Edit Meal</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields for editing meal details */}
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        <label>Image URL:</label>
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        <h4>Ingredients:</h4>
        {/* Input fields for editing ingredients */}
        {ingredients.map((ingredient, index) => (
          <div key={index}>
            <input
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(e, index)}
            />
            <button type="button" onClick={() => handleRemoveIngredient(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={handleAddIngredient}>Add Ingredient</button>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditForm;
