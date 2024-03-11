import React, { useState } from 'react';
import axios from 'axios'; 
import "./styles/mealForm.css";
const MealForm = ({ day, onClose, onMealAdded, sessionToken }) => { 
  const [name, setName] = useState(''); 
  const [description, setDescription] = useState(''); 
  const [imageUrl, setImageUrl] = useState(''); 
  const [ingredients, setIngredients] = useState([]); 
  const [ingredientInput, setIngredientInput] = useState(''); 
  
  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    try {
      const response = await axios.post('http://localhost:5000/meals', { 
        name,
        description,
        imageUrl,
        day,
        ingredients: ingredients.map(ingredient => ({ name: ingredient }))
      }, {
        headers: {
          'Authorization': `Bearer ${sessionToken}` 
        }
      });

    
      setName(''); 
      setDescription(''); 
      setImageUrl('');
      setIngredients([]); 
      setIngredientInput(''); 
      onClose(); 
      onMealAdded(); 
    } catch (error) {
      console.error('Error creating meal:', error); 
    }
  };

  const handleAddIngredient = () => { 
    if (ingredientInput.trim() !== '') { 
      setIngredients([...ingredients, ingredientInput]); 
      setIngredientInput(''); 
    }
  };

  const handleRemoveIngredient = (index) => { 
    const updatedIngredients = [...ingredients]; 
    updatedIngredients.splice(index, 1); 
    setIngredients(updatedIngredients); 
  };

  return ( 
    <div className="meal-form">
      <h2>Add Meal</h2>
      <form onSubmit={handleSubmit}> 
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)} 
          ></textarea>
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)} 
          />
        </div>
        <div>
          <label>Ingredients:</label>
          <div>
            <input
              type="text"
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)} 
            />
            <button type="button" onClick={handleAddIngredient}> 
              Add Ingredient
            </button>
          </div>
          <ul>
            {ingredients.map((ingredient, index) => ( 
              <li key={index}>
                {ingredient}
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(index)} 
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button type="submit">Submit</button> 
        <button type="button" onClick={onClose}> 
          Close
        </button>
      </form>
    </div>
  );
};

export default MealForm; 
