import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <>
             <div className="flex flex-col lg:flex-row justify-around gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-4 lg:px-8">
        <div className="hidden xl:block lg:w-1/2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.map((product) => (
              <div key={product._id}>
                <SmallProduct product={product} />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <ProductCarousel />
        </div>
      </div>
    </>
  );
};

export default Header;
