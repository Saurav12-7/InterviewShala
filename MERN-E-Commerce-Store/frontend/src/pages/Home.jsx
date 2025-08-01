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
      img: "../../public/images/First.jpg",
      // isInterview: true,
      category : "interview"
    },
    {
      title: "Mock Test",
      img: "../../public/images/MockTest.png",
      category : "test"
      // isTest:true
    },
    {
      title: "Video/Content",
      img: "../../public/images/video-content.jpg",
      category : "video"
      // isVideo : true,
    },
    {
      title: "E-books",
      img: "../../public/images/Modern-Education.png",
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
          <div className="container mx-auto ml-40 mt-10">
            <div className="container flex w-[1200px] justify-between items-center">
              <div className="flex flex-col gap-2 items-start w-[40rem]">
                <div className="logo w-[18rem]">
                  <img src="/images/logo.png" alt="InterviewShala Logo" />
                </div>
                <h1 className="text-[3rem] "><b>Welcome to InterviewShala</b></h1>
                <p className="text-xl w-[39rem]">
                  InterviewShala is a Best remote Mock Interview Platform where
                  you kickstart your future, and we give you the best mock
                  interview in India.
                </p>

                <Link
                  to="/register"
                  className="bg-blue-600 font-bold rounded-full py-2 px-10 mt-3 ml-[28rem] text-white"
                >
                  Start Now
                </Link>
              </div>
              <div>
                <img src="/images/headerImg.png" alt="Header Image" />
              </div>
            </div>
            <div className="w-[1200px]" >
              <div  className="container mx-auto w-full flex flex-col items-center">
                <h1 className="text-5xl font-bold text-center">
                  Our Featured Courses
                </h1>
                {/* Card */}
                <div className="grid grid-cols-2 gap-32 mt-10" id="#course">

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

