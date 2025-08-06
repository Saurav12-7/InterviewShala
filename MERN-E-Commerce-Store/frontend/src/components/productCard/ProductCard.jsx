import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { getImageUrl } from '../../Utils/imageUtils';

function ProductCard({product}) {
  const [isHover, setIsHover] = useState(false);
  // console.log("i am in cards");

  const hoverHandler =(e) =>{
      e.preventDefault()
      setIsHover(true)
     
      // console.log(`on hover ${isHover}`);
  }

  const afterHoverHandler =(e)=>{
    e.preventDefault()
      setIsHover(false)
      // console.log(`not hover ${isHover}`);
  }
  const navigate = useNavigate()
  const enrollHandler = (e) => {
    e.preventDefault()
   
    const category = product.category;
    console.log(category);
    
    // Navigate to appropriate pages based on category
    if (category === "interview") {
      navigate("/mockinterview")
    } else if (category === "test") {
      navigate("/mocktest")
    } else if (category === "video") {
      navigate("/video-content")
    } else if (category === "eBook") {
      navigate("/ebook")
    } else {
      // Default to homepage
      navigate("/")
    }
  }

  return (
    <>
    
    <div onMouseEnter={hoverHandler} onMouseLeave={afterHoverHandler} className="relative card w-full max-w-[280px] sm:max-w-[300px] mx-auto">
                  {!isHover ? <div></div> : <div className="absolute top-0 left-0 w-full bg-black h-full z-10 opacity-50 cursor-pointer rounded-md"></div>}
                  <div className="relative w-full h-full cursor-pointer rounded-md border-2 border-blue-600 overflow-hidden">
                    <div className='h-[120px] sm:h-[150px] lg:h-[170px]'>
                    <img
                      src={getImageUrl(product.img)}
                      className="w-full h-full object-cover"
                      alt="Mock Interview"
                    />
                    </div>
                    <h1 className="text-center my-2 sm:my-3 lg:my-4 px-2 text-xs sm:text-sm lg:text-base font-semibold">{product.title}</h1>
                    
                    <div className={`${isHover ? "absolute" : "hidden"} top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center justify-center gap-2`}>
                      <button className="cursor-pointer bg-blue-600 hover:bg-blue-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-white text-xs sm:text-sm transition duration-300" onClick={enrollHandler}>
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
                
           
    
    </>
  )
}

export default ProductCard