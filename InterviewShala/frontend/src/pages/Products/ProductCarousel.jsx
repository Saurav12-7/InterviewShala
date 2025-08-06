import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import { getImageUrl } from "../../Utils/imageUtils";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4 lg:block xl:block md:block">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="w-full max-w-4xl mx-auto"
        >
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id}>
                                 <img
                   src={getImageUrl(image)}
                   alt={name}
                   className="w-full rounded-lg object-cover h-[15rem] sm:h-[20rem] lg:h-[25rem] xl:h-[30rem]"
                 />

                 <div className="mt-3 sm:mt-4 flex flex-col lg:flex-row justify-between gap-3 sm:gap-4">
                   <div className="one">
                     <h2 className="text-base sm:text-lg lg:text-xl font-bold">{name}</h2>
                     <p className="text-base sm:text-lg font-semibold text-green-600"> $ {price}</p>
                     <p className="text-xs sm:text-sm lg:text-base text-gray-600 mt-1 sm:mt-2 max-w-full lg:max-w-[25rem]">
                       {description.substring(0, 120)} ...
                     </p>
                   </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col justify-between gap-4 w-full lg:w-[20rem]">
                    <div className="one">
                      <h1 className="flex items-center mb-6">
                        <FaStore className="mr-2 text-white" /> Brand: {brand}
                      </h1>
                      <h1 className="flex items-center mb-6">
                        <FaClock className="mr-2 text-white" /> Added:{" "}
                        {moment(createdAt).fromNow()}
                      </h1>
                      <h1 className="flex items-center mb-6">
                        <FaStar className="mr-2 text-white" /> Reviews:
                        {numReviews}
                      </h1>
                    </div>

                    <div className="two">
                      <h1 className="flex items-center mb-6">
                        <FaStar className="mr-2 text-white" /> Ratings:{" "}
                        {Math.round(rating)}
                      </h1>
                      <h1 className="flex items-center mb-6">
                        <FaShoppingCart className="mr-2 text-white" /> Quantity:{" "}
                        {quantity}
                      </h1>
                      <h1 className="flex items-center mb-6">
                        <FaBox className="mr-2 text-white" /> In Stock:{" "}
                        {countInStock}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
