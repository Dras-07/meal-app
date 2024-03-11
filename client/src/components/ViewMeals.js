import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import EditForm from './EditForm'; 
import './styles/viewMeals.css';
const ViewMeals = ({ day, onClose , userId}) => { 
  const [meals, setMeals] = useState([]); 
  const [editingMeal, setEditingMeal] = useState(null); 
console.log(userId);
  useEffect(() => { 
    fetchMeals();
  }, [day]);

  const fetchMeals = async () => { 
    try {
      const response = await axios.get(`http://localhost:5000/meals/${day}/${userId}`); 
      setMeals(response.data); 
    } catch (error) {
      console.error('Error fetching meals:', error); 
    }
  };

  const handleDeleteMeal = async (mealId) => {
    try {
      await axios.delete(`http://localhost:5000/meals/${mealId}`);
      setMeals(meals.filter(meal => meal.id !== mealId)); 
    } catch (error) {
      console.error('Error deleting meal:', error); 
    }
  };

  const handleCloseEditForm = () => { 
    setEditingMeal(null);
  };

  const handleEditMeal = (mealId) => { 
    const mealToEdit = meals.find((meal) => meal.id === mealId); 
    setEditingMeal(mealToEdit);
  };

  const handleUpdateMeal = (updatedMeal) => { 
    console.log('Updated meal:', updatedMeal); 
    setMeals(meals.map((meal) => (meal.id === updatedMeal.id ? updatedMeal : meal))); 
  };

  return (
    <div className="modal">
      <div className="modal-content">
        
        <h2 className="headerday" style={{color: 'black'}}>Meals for {day}</h2>
        <button className="close-button" onClick={onClose}>CLOSE;</button>

        <ol>
          {meals.map((meal) => ( 
            <li key={meal.id}>
              <h3>{meal.name}</h3>
              <p>Description: {meal.description}</p>
              {meal.imageUrl && <img src={meal.imageUrl} alt={meal.name} />} 
              <h4>Ingredients:</h4>
              <ul>
                {meal.ingredients.map((ingredient, index) => ( 
                  <li key={index}>{ingredient.name}</li>
                ))}
              </ul>
              <button onClick={() => handleEditMeal(meal.id)}>Edit</button>
              <button onClick={() => handleDeleteMeal(meal.id)}>Delete</button>
            </li>
          ))}
        </ol>
      </div>
      {editingMeal && <EditForm meal={editingMeal} onClose={handleCloseEditForm} onUpdateMeal={handleUpdateMeal} />}
    </div>
  );
};

export default ViewMeals; 
