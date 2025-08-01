import React, { useEffect, useState } from 'react';
import './App.css';
import StripeCheckout from 'react-stripe-checkout';
import Offer from "./offer";
function App() {
  const [isPaid, setIsPaid] = useState(false)
  const [product] = useState({
    name: "react from FB",
    price: 99,
    productBy: "facebook",
  });
  useEffect(() => {
    setIsPaid(false)
  }, [])
  const makePayment = async (token) => {
    setIsPaid(true)
    const body = {
      token,
      product,
    };
    const headers = {
      "Content-Type": "application/json",
    };
   
    try {
      const response = await fetch(`http://localhost:8282/payment`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });
      

      console.log("RESPONSE", response);
      const { status } = response;
      console.log("success", status);
      setIsPaid(true)
    } catch (error) {
      console.error("Error:", error);
     
    }
  };
  const scheduleInteview =(e)=>{
    e.preventDefault();
    window.location.href = `http://localhost:3003/`;
  }

  return (
    <div><Offer/>
    <div className="App ">
      <header className="App-header">
        
        <StripeCheckout
          stripeKey={process.env.REACT_APP_KEY}
          token={makePayment}
          name="Buy Course"
          amount={product.price * 100}
        >
         {! isPaid  ? (
         <>
           <button className='btn-large blue'>buy Now {product.price} ₹</button>
         </>):<>
         <button className='btn-large green' onClick={scheduleInteview}>Take Your Mock Test</button>
         </>}
        </StripeCheckout>
        
      </header>
    </div>
    </div>
  );
}
export default App;

