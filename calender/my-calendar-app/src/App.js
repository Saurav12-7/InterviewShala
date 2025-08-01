import React from "react";
import { PopupWidget } from "react-calendly";
// import "./App.css"
import Offer from './offer';

const App = () => {
  return (
    <div> <Offer />
    <div className="App">
        
      <PopupWidget
        url="https://calendly.com/interviewshala/30min?month=2024-01"
      
        rootElement={document.getElementById("root")}
        text="Click here to schedule!"
        textColor="#ffffff"
        color="#00a2ff"
      />
    
    </div>
    </div>
  );
};

export default App;