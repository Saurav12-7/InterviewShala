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
      _id: `mock-interview-${title.toLowerCase().replace(/\s+/g, '-')}`,
      name: title,
      image: image,
      price: price,
      description: description,
      countInStock: 100,
      category: "Mock Interview",
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
    <div className="w-full max-w-[500px] h-auto min-h-[500px] bg-blue-50 rounded-lg px-4 sm:px-6 py-4 hover:scale-105 transition-all delay-0">
      <div className="w-full h-full flex flex-col items-center rounded-md">
        <div className="w-full max-w-[26rem] h-[12rem] sm:h-[15rem] my-2 hover:scale-95 transition-all delay-0 ease-in cursor-pointer border-4 rounded-md border-white">
          <img
            src={getImageUrl(image)}
            alt={`Product Image for ₹${title}`}
            className="h-full w-full object-cover rounded-md"
          />
        </div>
        <div className="flex flex-col text-center gap-1 px-2">
          <h2 className="text-base sm:text-lg font-bold text-center cursor-pointer">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">{description}</p>
        </div>
        <div className="flex flex-col items-center my-3">
          <StarRating rating={4} />
          <p className="text-lg sm:text-xl font-bold">₹{price}</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="bg-pink-600 text-white px-3 sm:px-4 py-2 rounded-full hover:bg-pink-700 transition-colors text-sm sm:text-base"
            onClick={handleAddToCart}
          >
            Add to Cart ₹{price}
          </button>
        </div>
      </div>
    </div>
  );
};

const InterviewProductCart = () => {
  return (
    <div>
      <Offer/>
      <div className="product-list flex flex-col items-center justify-center gap-8 w-full min-h-screen px-4 py-8 container mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-center mb-4">Mock Interview</h1>
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-14 w-full max-w-6xl">
          <ProductCard
            title="Mock Interview for College Entrance"
            image="/images/InterviewproductCart111.png"
            description="Many colleges and universities require applicants to participate in an interview as part of the admissions process."
            price={99}
          />
          <ProductCard
            title="Mock interview for Job"
            image="/images/InterviewproductCart222.png"
            description="Job interviews are a standard part of the hiring process."
            price={99}
          />
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default InterviewProductCart;
