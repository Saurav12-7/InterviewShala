import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faDiscord,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Offer from "../components/Offer";
import ProductCard from "../components/productCard/ProductCard";
import Footer from "../components/Footer";
// import NewPage from "../components/VideoContaint";
import { AiOutlineBgColors } from "react-icons/ai";


const Home = () => {
  const { keyword } = useParams();
const { data, isLoading, isError, error } = useGetProductsQuery({ keyword });

  const products = [
    {
      title: "Mock Interview",
      img: "/images/First.jpg",
      // isInterview: true,
      category : "interview"
    },
    {
      title: "Mock Test",
      img: "/images/MockTest.png",
      category : "test"
      // isTest:true
    },
    {
      title: "Video/Content",
      img: "/images/video-content.jpg",
      category : "video"
      // isVideo : true,
    },
    {
      title: "E-books",
      img: "/images/Modern-Education.png",
      category : "eBook"
      // isEBook: true,
    }
  ]





  // const [isHover, setIsHover] = useState(false);

  // const hoverHandler =(e) =>{
  //     e.preventDefault()
  //     setIsHover(true)
     
  //     // console.log(`on hover ${isHover}`);
  // }

  // const afterHoverHandler =(e)=>{
  //   e.preventDefault()
  //     setIsHover(false)
  //     // console.log(`not hover ${isHover}`);
  // }
  // useEffect(() => {
  //   console.log(`isHover: ${isHover}`);
  // }, [isHover]);
  return (
    <>

      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
  <Message variant="danger">
    {error?.data?.message || error?.error || "Something went wrong"}
  </Message>
) : (
        <>
          <Offer />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-10">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-12">
              <div className="flex flex-col gap-4 items-start w-full lg:w-1/2">
                <div className="logo w-full max-w-[18rem]">
                  <img src="/images/logo.png" alt="InterviewShala Logo" className="w-full h-auto" />
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                  Welcome to InterviewShala
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
                  InterviewShala is a Best remote Mock Interview Platform where
                  you kickstart your future, and we give you the best mock
                  interview in India.
                </p>

                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 font-bold rounded-full py-3 px-8 sm:px-10 mt-4 text-white transition duration-300 transform hover:scale-105"
                >
                  Start Now
                </Link>
              </div>
              <div className="w-full lg:w-1/2 flex justify-center">
                <img src="/images/headerImg.png" alt="Header Image" className="w-full max-w-md lg:max-w-lg xl:max-w-xl h-auto" />
              </div>
            </div>
            <div className="w-full mt-16 sm:mt-20">
              <div className="flex flex-col items-center">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12">
                  Our Featured Courses
                </h1>
                {/* Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 w-full max-w-6xl" id="#course">

                {products.map((product)=>(
                 <ProductCard key={product.title} product={product}/>
                ))}
                </div>
                
                
                
              </div>
            </div>
          </div>
          <Footer/>

          {/* MockInterview Section */}

          {/* View All Products Button */}
          {/* <div className="flex justify-center mt-4">
            <Link
              to="/view-all-products"  // Replace with the appropriate link
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full"
            >
              View All Products
            </Link>
          </div> */}

          {/* Footer */}
        </>
      )}
    </>
  );
};

export default Home;

