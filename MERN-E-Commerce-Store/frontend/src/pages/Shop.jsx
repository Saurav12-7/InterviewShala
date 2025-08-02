import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Get category from URL parameters
  const urlParams = new URLSearchParams(location.search);
  const categoryFromUrl = urlParams.get('category');

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!filteredProductsQuery.isLoading) {
      setIsLoading(false);
      let filteredProducts = filteredProductsQuery.data || [];
      

      
             // Apply price filter
       if (priceFilter) {
         const priceValue = parseInt(priceFilter, 10);
         if (!isNaN(priceValue)) {
           // Filter products that are less than or equal to the entered price
           filteredProducts = filteredProducts.filter((product) => 
             product.price <= priceValue
           );
         } else {
           // If not a valid number, filter by string match
           filteredProducts = filteredProducts.filter((product) => 
             product.price.toString().includes(priceFilter)
           );
         }
       }

      // Apply brand filter
      if (selectedBrand) {
        filteredProducts = filteredProducts.filter((product) => 
          product.brand === selectedBrand
        );
      }

                      // Apply category filter from URL
        if (categoryFromUrl && categories) {
          const targetCategory = categories.find(cat => cat.name === categoryFromUrl);
          if (targetCategory) {
            filteredProducts = filteredProducts.filter((product) => 
              product.category === targetCategory._id
            );
            // Auto-check the category in the filter
            if (!checked.includes(targetCategory._id)) {
              dispatch(setChecked([targetCategory._id]));
            }
          }
        }
       dispatch(setProducts(filteredProducts));
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter, selectedBrand, categoryFromUrl, categories]);

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand === selectedBrand ? "" : brand);
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const handleReset = () => {
    setPriceFilter("");
    setSelectedBrand("");
    dispatch(setChecked([]));
    window.location.reload();
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Products</h1>
          <p className="text-gray-600">Discover our comprehensive interview preparation resources</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Filters</h2>
              
              {/* Categories Filter */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Categories
                </h3>
                <div className="space-y-3">
                  {categories?.map((c) => (
                    <div key={c._id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`category-${c._id}`}
                        onChange={(e) => handleCheck(e.target.checked, c._id)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <label
                        htmlFor={`category-${c._id}`}
                        className="ml-3 text-sm font-medium text-gray-700 hover:text-blue-600 cursor-pointer"
                      >
                        {c.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Brands Filter */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Brands
                </h3>
                <div className="space-y-3">
                  {uniqueBrands?.map((brand) => (
                    <div key={brand} className="flex items-center">
                      <input
                        type="radio"
                        id={`brand-${brand}`}
                        name="brand"
                        checked={selectedBrand === brand}
                        onChange={() => handleBrandClick(brand)}
                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 focus:ring-2"
                      />
                      <label
                        htmlFor={`brand-${brand}`}
                        className="ml-3 text-sm font-medium text-gray-700 hover:text-green-600 cursor-pointer"
                      >
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  Price Range
                </h3>
                <input
                  type="text"
                  placeholder="Enter price..."
                  value={priceFilter}
                  onChange={handlePriceChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {isLoading ? "Loading..." : `${products?.length || 0} Products`}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {isLoading ? "Please wait while we load the products..." : 
                     `Found ${products?.length || 0} products matching your criteria`}
                  </p>
                </div>
                                 <div className="flex items-center space-x-2">
                   {categoryFromUrl && (
                     <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                       Category: {categoryFromUrl}
                     </span>
                   )}
                   {selectedBrand && (
                     <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                       Brand: {selectedBrand}
                     </span>
                   )}
                   {priceFilter && (
                     <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                       Price: ₹{priceFilter}
                     </span>
                   )}
                 </div>
              </div>
            </div>

            {/* Products Display */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="text-center">
                    <Loader />
                    <p className="mt-4 text-gray-600">Loading products...</p>
                  </div>
                </div>
              ) : products?.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your filters or check back later for new products.</p>
                  <button
                    onClick={handleReset}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products?.map((p) => (
                    <div key={p._id} className="transform hover:scale-105 transition-transform duration-200">
                      <ProductCard p={p} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
