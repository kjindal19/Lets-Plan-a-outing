import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [step, setStep] = useState(1);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  return (
    <div className="App">
      {step === 1 && <Step1 setStep={setStep} />}
      {step === 2 && <Step2 setStep={setStep} setSelectedPlace={setSelectedPlace} />}
      {step === 3 && <Step3 setStep={setStep} setSelectedFood={setSelectedFood} />}
      {step === 4 && <Step4 setStep={setStep} setSelectedTime={setSelectedTime} />}
      {step === 5 && <Summary place={selectedPlace} food={selectedFood} time={selectedTime} />}
    </div>
  );
}

const Step1 = ({ setStep }) => {
  const runAway = (e) => {
    e.target.style.position = 'absolute';
    e.target.style.top = Math.random() * window.innerHeight + 'px';
    e.target.style.left = Math.random() * window.innerWidth + 'px';
  };

  return (
    <div>
      <h1>Are you free this Tuesday?</h1>
      <button onClick={() => setStep(2)}>Yes</button>
      <button onMouseEnter={runAway}>No</button>
    </div>
  );
};


const Step2 = ({ setStep, setSelectedPlace }) => {
  const places = ["Park", "Cafe", "Museum"];
  const [shuffledPlaces, setShuffledPlaces] = useState(places);
  const [showOptions, setShowOptions] = useState(true);
  const [timer, setTimer] = useState(5);
  const [isSelectable, setIsSelectable] = useState(false); // Disable selection initially

  // Countdown and shuffle after 5 seconds
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    if (timer === 0) {
      setShuffledPlaces([...places].sort(() => 0.5 - Math.random())); // Shuffle cards
      setShowOptions(false); // Hide options
      setIsSelectable(true); // Enable card selection
      clearInterval(countdown); // Stop the timer
    }

    return () => clearInterval(countdown); // Cleanup interval
  }, [timer, places]);

  const handleSelect = (place) => {
    if (isSelectable) {
      setSelectedPlace(place);
      setStep(3);
    }
  };

  return (
    <div>
      <h1>Pick a Place</h1>
      <p>Shuffling in {timer} seconds...</p>
      {shuffledPlaces.map((place, index) => (
        <div
          key={index}
          className={`card ${isSelectable ? "selectable" : "disabled"}`}
          onClick={() => handleSelect(place)}
        >
          {showOptions ? place : "?"}
        </div>
      ))}
    </div>
  );
};





const Step3 = ({ setStep, setSelectedFood }) => {
  const foods = ["Pizza", "Burger", "Sushi"];
  const [shuffledFoods, setShuffledFoods] = useState(foods);
  const [showOptions, setShowOptions] = useState(true);
  const [timer, setTimer] = useState(5);
  const [isSelectable, setIsSelectable] = useState(false); // Disable selection initially

  // Countdown and shuffle after 5 seconds
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    if (timer === 0) {
      setShuffledFoods([...foods].sort(() => 0.5 - Math.random())); // Shuffle cards
      setShowOptions(false); // Hide options
      setIsSelectable(true); // Enable card selection
      clearInterval(countdown); // Stop the timer
    }

    return () => clearInterval(countdown); // Cleanup interval
  }, [timer, foods]);

  const handleSelect = (food) => {
    if (isSelectable) {
      setSelectedFood(food);
      setStep(4);
    }
  };

  return (
    <div>
      <h1>What do you wanna eat?</h1>
      <p>Shuffling in {timer} seconds...</p>
      {shuffledFoods.map((food, index) => (
        <div
          key={index}
          className={`card ${isSelectable ? "selectable" : "disabled"}`}
          onClick={() => handleSelect(food)}
        >
          {showOptions ? food : "?"}
        </div>
      ))}
    </div>
  );
};



const Step4 = ({ setStep, setSelectedTime }) => {
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setStep(5);
  };

  return (
    <div>
      <h1>What time do you wanna leave?</h1>
      <button onClick={() => handleTimeSelect("Morning")}>Morning</button>
      <button onClick={() => handleTimeSelect("Afternoon")}>Afternoon</button>
    </div>
  );
};

const Summary = ({ place, food, time }) => {
  return (
    <div>
      <h1>It's a plan!</h1>
      <p>Place: {place}</p>
      <p>Food: {food}</p>
      <p>Time: {time}</p>
    </div>
  );
};


export default App;
