import React from "react";
import { InlineWidget } from "react-calendly";
import { CalendlyEvent } from "react-calendly/typings/calendly";

const App = () => {
  return (
    <div className="App">
      <InlineWidget url="https://calendly.com/your_scheduling_page" />
    </div>
    
  );
};

export default App;