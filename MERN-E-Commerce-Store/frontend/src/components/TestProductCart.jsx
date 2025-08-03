import React from 'react';
import Offer from './Offer';
import Footer from './Footer';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from '../Utils/imageUtils';

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={i <= rating ? "text-yellow-400" : "text-gray-300"}>
        ★
      </span>
    );
  }
  return <div className="flex">{stars}</div>;
};

const ProductCard = ({ title, image, description, price }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    // Create a product object that matches the main e-commerce structure
    const product = {
      _id: `mock-test-${title.toLowerCase().replace(/\s+/g, '-')}`,
      name: title,
      image: image,
      price: price,
      description: description,
      countInStock: 100,
      category: "Mock Test",
      brand: "InterviewShala"
    };

    // Add to cart using the main e-commerce system
    dispatch(addToCart({
      ...product,
      qty: 1
    }));

    // Navigate to cart
    navigate('/cart');
  };

  return (
    <div className="container w-[400px] h-[450px] bg-blue-50 rounded-lg px-4 py-3 hover:scale-105 transition-all delay-0">
      <div className="container w-full h-full flex flex-col items-center rounded-md">
        <div className="w-[20rem] h-[12rem] my-2 hover:scale-95 transition-all delay-0 ease-in cursor-pointer border-4 rounded-md border-white">
          <img
            src={getImageUrl(image)}
            alt={`Product Image for ₹${title}`}
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
          <button
            className="bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-700 transition-colors"
            onClick={handleAddToCart}
          >
            Add to Cart ₹{price}
          </button>
        </div>
      </div>
    </div>
  );
};

const TestProductCart = () => {
  return (
    <div>
      <Offer/>
      <div className="product-list flex flex-col items-center gap-4 w-full min-h-screen px-4 py-10">
        <h1 className="text-6xl font-semibold m-10">Mock Test</h1>
        <div className="flex items-center gap-20 ml-[6rem] grid grid-cols-2">
          <ProductCard
            title="Mock Test for College Entrance"
            image="/images/Mock Test1.jpeg"
            description="Comprehensive mock test designed to prepare students for college entrance examinations with real exam-like questions and timing."
            price={99}
          />
          <ProductCard
            title="Mock Test for Job"
            image="/images/Mock Test2.jpeg"
            description="Professional mock test to help job seekers prepare for technical interviews and assessment tests."
            price={99}
          />
          <ProductCard
            title="Mock test for College Entrance"
            image="/images/mock test4.jpg"
            description="Practice test covering all major topics for college entrance exams with detailed explanations."
            price={99}
          />
          <ProductCard
            title="Mock test for PES University Entrance"
            image="/images/MockTest.png"
            description="Specialized mock test specifically designed for PES University entrance examination preparation."
            price={99}
          />
          <ProductCard
            title="Mock test for CUET Entrance"
            image="/images/InterviewproductCart111.png"
            description="CUET (Common University Entrance Test) mock test with comprehensive coverage of all subjects."
            price={99}
          />
          <ProductCard
            title="Mock interview for Job"
            image="/images/InterviewproductCart222.png"
            description="Professional mock interview session to help you prepare for job interviews and improve your skills."
            price={99}
          />
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default TestProductCart;