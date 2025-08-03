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
    
    <div  onMouseEnter={hoverHandler} onMouseLeave={afterHoverHandler}  className="relative card container w-[300px]">
                  {!isHover ? <div></div> : <div className="absolute top-0 left-0 w-full bg-black h-full z-10 opacity-50 cursor-pointer"></div>}
                  <div className="relative w-full h-full cursor-pointer rounded-md border-2 border-blue-600">
                    <div className='h-[170px]'>
                    <img
                      src={getImageUrl(product.img)}
                      className="w-full h-full"
                      alt="Mock Interview"
                    />
                    </div>
                    <h1 className="text-center my-4">{product.title}</h1>
                    
                   
                    
                    <div className={`${isHover ? "absolute" : "hidden"} top-52 left-24 z-30 hover:flex flex-col items-center justify-center gap-1`}>
                    {/* <Link to={isVideo? "video" : "/"}> */}
                      <button className="cursor-pointer bg-blue-600 px-3 py-1 rounded-full text-white" onClick={enrollHandler}>
                        Enroll Now
                      </button>
                      {/* </Link> */}
                    </div>
                  </div>
                </div>
                
           
    
    </>
  )
}

export default ProductCard