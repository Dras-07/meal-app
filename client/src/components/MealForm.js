import React, { useState } from 'react'; // Import React and useState hook
import axios from 'axios'; // Import axios for making HTTP requests
import "./styles/mealForm.css";
const MealForm = ({ day, onClose, onMealAdded, sessionToken }) => { // Add sessionToken prop
  const [name, setName] = useState(''); // Initialize state for meal name
  const [description, setDescription] = useState(''); // Initialize state for meal description
  const [imageUrl, setImageUrl] = useState(''); // Initialize state for meal image URL
  const [ingredients, setIngredients] = useState([]); // Initialize state for meal ingredients
  const [ingredientInput, setIngredientInput] = useState(''); // Initialize state for ingredient input field
  
  const handleSubmit = async (e) => { // Define function to handle form submission
    e.preventDefault(); // Prevent default form submission behavior
    console.log(sessionToken); 
const x=Math.floor(Math.random() * (100000000 - 0 + 1)) + 0;
    try {
      const response = await axios.post('http://localhost:5000/meals', { // Send POST request to create a new meal
        id: x,
        name,
        description,
        imageUrl,
        day,
        ingredients: ingredients.map(ingredient => ({ name: ingredient })) // Map ingredients to required format
      }, {
        headers: {
          'Authorization': `Bearer ${sessionToken}` // Include session token in request headers
        }
      });

      console.log(response.data.name); // Log the name of the created meal
console.log("XXXX");
      setName(''); // Clear meal name state
      setDescription(''); // Clear meal description state
      setImageUrl(''); // Clear meal image URL state
      setIngredients([]); // Clear meal ingredients state
      setIngredientInput(''); // Clear ingredient input field state
      onClose(); // Close the meal form modal
      onMealAdded(); // Callback to indicate that a meal has been added
    } catch (error) {
      console.error('Error creating meal:', error); // Log error if meal creation fails
    }
  };

  const handleAddIngredient = () => { // Define function to handle adding a new ingredient
    if (ingredientInput.trim() !== '') { // Check if ingredient input field is not empty
      setIngredients([...ingredients, ingredientInput]); // Add new ingredient to the list of ingredients
      setIngredientInput(''); // Clear the ingredient input field
    }
  };

  const handleRemoveIngredient = (index) => { // Define function to handle removing an ingredient
    const updatedIngredients = [...ingredients]; // Create a copy of the ingredients array
    updatedIngredients.splice(index, 1); // Remove the ingredient at the specified index
    setIngredients(updatedIngredients); // Update the ingredients state
  };

  return ( // Return the JSX for the MealForm component
    <div className="meal-form">
      <h2>Add Meal</h2>
      <form onSubmit={handleSubmit}> {/* Form to submit new meal */}
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} // Handle changes to meal name
            required // Make meal name field required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)} // Handle changes to meal description
          ></textarea>
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)} // Handle changes to meal image URL
          />
        </div>
        <div>
          <label>Ingredients:</label>
          <div>
            <input
              type="text"
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)} // Handle changes to ingredient input field
            />
            <button type="button" onClick={handleAddIngredient}> {/* Button to add new ingredient */}
              Add Ingredient
            </button>
          </div>
          <ul>
            {ingredients.map((ingredient, index) => ( // Map over ingredients to display them
              <li key={index}>
                {ingredient}
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(index)} // Button to remove ingredient
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button type="submit">Submit</button> {/* Submit button to add new meal */}
        <button type="button" onClick={onClose}> {/* Button to close the meal form */}
          Close
        </button>
      </form>
    </div>
  );
};

export default MealForm; // Export MealForm component
