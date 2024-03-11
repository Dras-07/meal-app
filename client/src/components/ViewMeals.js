import React, { useState, useEffect } from 'react'; // Import React, useState, and useEffect hooks
import axios from 'axios'; // Import axios for making HTTP requests
import EditForm from './EditForm'; // Import the EditForm component
import './styles/viewMeals.css';
const ViewMeals = ({ day, onClose , userId}) => { // Define ViewMeals component with props
  const [meals, setMeals] = useState([]); // State to store meals data
  const [editingMeal, setEditingMeal] = useState(null); // State to manage editing meal
console.log(userId);
  useEffect(() => { // Fetch meals data on component mount or when 'day' prop changes
    fetchMeals();
  }, [day]);

  const fetchMeals = async () => { // Function to fetch meals data from server
    try {
      const response = await axios.get(`http://localhost:5000/meals/${day}/${userId}`); // Fetch meals for the specified day
      setMeals(response.data); // Update meals state with fetched data
    } catch (error) {
      console.error('Error fetching meals:', error); // Log error if fetching meals fails
    }
  };

  const handleDeleteMeal = async (mealId) => { // Function to handle deleting a meal
    try {
      await axios.delete(`http://localhost:5000/meals/${mealId}`); // Send request to delete meal
      setMeals(meals.filter(meal => meal.id !== mealId)); // Update meals state to remove the deleted meal
    } catch (error) {
      console.error('Error deleting meal:', error); // Log error if deleting meal fails
    }
  };

  const handleCloseEditForm = () => { // Function to handle closing edit form
    setEditingMeal(null); // Reset editing meal state
  };

  const handleEditMeal = (mealId) => { // Function to handle editing a meal
    const mealToEdit = meals.find((meal) => meal.id === mealId); // Find the meal to edit
    setEditingMeal(mealToEdit); // Set the editing meal state
  };

  const handleUpdateMeal = (updatedMeal) => { // Function to handle updating a meal
    console.log('Updated meal:', updatedMeal); // Log the updated meal object
    setMeals(meals.map((meal) => (meal.id === updatedMeal.id ? updatedMeal : meal))); // Update meals state with the updated meal
  };

  return (
    <div className="modal">
      <div className="modal-content">
        
        <h2 className="headerday" style={{color: 'black'}}>Meals for {day}</h2>
        <button className="close-button" onClick={onClose}>CLOSE;</button>

        <ol>
          {meals.map((meal) => ( // Map over meals to display each meal
            <li key={meal.id}>
              <h3>{meal.name}</h3>
              <p>Description: {meal.description}</p>
              {meal.imageUrl && <img src={meal.imageUrl} alt={meal.name} />} {/* Display meal image if available */}
              <h4>Ingredients:</h4>
              <ul>
                {meal.ingredients.map((ingredient, index) => ( // Map over ingredients to display each ingredient
                  <li key={index}>{ingredient.name}</li>
                ))}
              </ul>
              <button onClick={() => handleEditMeal(meal.id)}>Edit</button> {/* Button to edit meal */}
              <button onClick={() => handleDeleteMeal(meal.id)}>Delete</button> {/* Button to delete meal */}
            </li>
          ))}
        </ol>
      </div>
      {editingMeal && <EditForm meal={editingMeal} onClose={handleCloseEditForm} onUpdateMeal={handleUpdateMeal} />} {/* Render EditForm if editingMeal is not null */}
    </div>
  );
};

export default ViewMeals; // Export ViewMeals component
