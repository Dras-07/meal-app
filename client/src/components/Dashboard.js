import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MealForm from './MealForm';
import ViewMeals from './ViewMeals';
import "./styles/dashboard.css";
import axios from 'react';
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Dashboard = () => {
  const [showMealForm, setShowMealForm] = useState(false);
  const [showViewMealsModal, setShowViewMealsModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [mealAdded, setMealAdded] = useState(false); // New state to track if meal was added
  const [sessionToken, setSessionToken] = useState('');
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve session token from localStorage
    const token = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');
    setUserId(userId);
    if (token) {
      setSessionToken(token);
    }
    else{
      navigate('/signin');
    }
  }, []); // Empty

  const handleAddMeal = (day) => {
    setShowMealForm(true);
    setSelectedDay(day);
  };

  const handleViewMeals = (day) => {
    setShowViewMealsModal(true);
    setSelectedDay(day);
  };

  const handleCloseMealForm = () => {
    setShowMealForm(false);
    setSelectedDay(null);
    setMealAdded(true); // Set mealAdded state to true after adding a meal
  };

  const handleCloseViewMealsModal = () => {
    setShowViewMealsModal(false);
    setSelectedDay(null);
  };

  const handleSignOut = async () => {
    // Clear local storage

    try {
      // Call the server-side signout endpoint
      // await axios.get('http://localhost:5000/signout');

      // Clear local storage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userId');

      // Redirect to the sign-in page
      navigate('/signin');
  } catch (error) {
      console.error('Error signing out:', error);
      // Handle error
  }
  };

  // return // Inside the return statement of Dashboard component
  return (
    <div className="dashboard">
      <div className="sign-out-button">
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
      <h1 className='headingm'>Weekly Meals</h1>
      <div className="day-cards">
        {daysOfWeek.map((day, index) => (
          <div key={day} className="day-card">
            <h2>{day}</h2>
            <button onClick={() => handleAddMeal(day)}>Add Meal</button>
            <button onClick={() => handleViewMeals(day)}>View Meals</button>
          </div>
        ))}
      </div>
      {showMealForm && <MealForm sessionToken={sessionToken} day={selectedDay} onClose={handleCloseMealForm} onMealAdded={() => setMealAdded(false)} />} {/* Pass a callback to reset mealAdded state */}
      {showViewMealsModal && <ViewMeals userId={userId} day={selectedDay} onClose={handleCloseViewMealsModal} mealAdded={mealAdded} />} {/* Pass mealAdded state to ViewMeals */}
    </div>
  );
        }
  
  

export default Dashboard;
