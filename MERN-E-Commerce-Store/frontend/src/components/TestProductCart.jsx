import React, { useState, useRef } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import Footer from '../components/Footer';
import Offer from '../components/Offer';
import { useNavigate } from "react-router";

const StarRating = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) =>
    index + 1 <= rating ? (
      <span key={index} className="text-yellow-500">
        ★
      </span>
    ) : (
      <span key={index} className="text-gray-500">
        ☆
      </span>
    )
  );

  return <div className="flex">{stars}</div>;
};

const ProductCard = ({ title, image, description, price }) => {
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1);
  const payNowButtonRef = useRef(null);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handlePayNow = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/stripe/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: {
            name: title,
            price: price,
            description: description,
          },
          productType: "test",
        }),
      });
      
      const data = await response.json();
      
      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        console.error("No checkout URL received");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  const handlePayNowClick = () => {
    // This will be handled by the new payment function
  };

  return (
    <div className="container w-[500px] h-[500px] bg-blue-50 rounded-lg px-6 py-4 hover:scale-105  transition-all delay-0">
      <div className="container w-full h-full flex flex-col items-center rounded-md">
        <div className="w-[26rem] h-[15rem] my-2 hover:scale-95 transition-all delay-0 ease-in cursor-pointer border-4 rounded-md border-white ">
          <img
            src={image}
            alt={`Product Image for ₹{title}`}
            className="h-full w-full aspect-[3/4] object-cover rounded-md"
          />
        </div>
        <div className="flex flex-col text-center gap-1">
          <h2 className="text-lg font-bold text-center cursor-pointer">
            {title}
          </h2>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <div className="flex flex-col items-center my-3">
          <StarRating rating={4} />

          <p className="text-xl font-bold">₹{price}</p>
        </div>

        <div className="flex items-center gap-3">
          

          <button ref={payNowButtonRef} onClick={handlePayNow} className="bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-700 transition-colors">
            Pay Now ₹{price}
          </button>
        </div>
      </div>
    </div>
  );
};

const TestProductCart = () => {
  return (
    <div><Offer/>
    <div className="product-list flex flex-col items-center gap-4 w-full min-h-screen px-4 py-10">
      <h1 className="text-6xl font-semibold m-10">Mock Test</h1>
      <div className="flex items-center gap-20 ml-[6rem] grid grid-cols-2 ">
      <ProductCard
        title="Mock Test for College Entrance"
        image="../../public/images/Mock Test1.jpeg"
        description="Comprehensive mock test designed to prepare students for college entrance examinations with real exam-like questions and timing."
        price={99}
      />
       <ProductCard
        title="Mock Test for Job"
        image="../../public/images/Mock Test2.jpeg"
        description="Professional mock test to help job seekers prepare for technical interviews and assessment tests."
        price={99}
      />
      <ProductCard
        title="Mock test for College Entrance"
        image="../../public/images/Mock Test4.jpg"
        description="Practice test covering all major topics for college entrance exams with detailed explanations."
        price={99}
      />
      <ProductCard
        title="Mock test for PES University Entrance"
        image="../../public/images/MockTest.png"
        description="Specialized mock test specifically designed for PES University entrance examination preparation."
        price={99}
      />
      <ProductCard
        title="Mock test for CUET Entrance"
        image="../../public/images/InterviewProductCart111.png"
        description="CUET (Common University Entrance Test) mock test with comprehensive coverage of all subjects."
        price={99}
      />
      <ProductCard
        title="Mock interview for Job"
        image="../../public/images/InterviewProductCart222.png"
        description="Professional mock interview session to help you prepare for job interviews and improve your skills."
        price={99}
      />
     
      </div>
      <div className=' bottom-0 w-full'>
    <Footer/>
      </div>
      </div>
    </div>
    
  );
};

export default TestProductCart;