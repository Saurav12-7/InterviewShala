
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash, FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";
import { getImageUrl } from "../Utils/imageUtils";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link 
                to="/" 
                className="flex items-center text-gray-600 hover:text-pink-500 transition duration-200 mr-4"
              >
                <FaArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <FaShoppingCart className="w-8 h-8 mr-3 text-pink-500" />
              Shopping Cart
            </h1>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="mb-6">
              <FaShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
            </div>
            <Link 
              to="/" 
              className="inline-flex items-center bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 transform hover:scale-105"
            >
              <FaArrowLeft className="w-4 h-4 mr-2" />
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
            {/* Cart Items Section */}
            <div className="xl:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <FaShoppingCart className="w-5 h-5 mr-2 text-pink-500" />
                  Cart Items ({totalItems})
                </h2>

                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item._id} className="flex flex-col sm:flex-row items-start sm:items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200 gap-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 flex-shrink-0">
                        <img
                          src={getImageUrl(item.image)}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <Link 
                          to={`/product/${item._id}`} 
                          className="text-base sm:text-lg font-medium text-blue-600 hover:text-blue-800 transition duration-200 break-words"
                        >
                          {item.name}
                        </Link>
                        {item.brand && (
                          <div className="text-sm text-gray-600 mt-1">{item.brand}</div>
                        )}
                        <div className="text-base sm:text-lg font-bold text-green-600 mt-2">
                          ${item.price.toFixed(2)}
                        </div>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                        <div className="flex flex-col items-center">
                          <label className="text-sm font-medium text-gray-700 mb-2">Quantity</label>
                          <select
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                            value={item.qty}
                            onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                          >
                            {[...Array(item.countInStock || 10).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Item Total */}
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Total</div>
                          <div className="text-lg font-bold text-green-600">
                            ${(item.qty * item.price).toFixed(2)}
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition duration-200"
                          onClick={() => removeFromCartHandler(item._id)}
                          title="Remove item"
                        >
                          <FaTrash className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="xl:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 lg:sticky lg:top-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  {/* Items Count */}
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-600">Items ({totalItems})</span>
                    <span className="font-medium">{totalItems}</span>
                  </div>

                  {/* Subtotal */}
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${totalPrice}</span>
                  </div>

                  {/* Shipping */}
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center py-4 border-t-2 border-gray-300">
                    <span className="text-lg font-bold text-gray-800">Total</span>
                    <span className="text-2xl font-bold text-green-600">${totalPrice}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <div className="mt-6">
                  <button
                    className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-lg text-lg transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed To Checkout
                  </button>
                </div>

                {/* Continue Shopping Link */}
                <div className="mt-4 text-center">
                  <Link 
                    to="/" 
                    className="text-pink-500 hover:text-pink-700 font-medium transition duration-200"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
