import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  // Payment
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <ProgressSteps step1 step2 />
        
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Shipping Information</h1>
              <p className="text-gray-600">Please provide your shipping details and select a payment method</p>
            </div>

            <form onSubmit={submitHandler} className="space-y-6">
              {/* Shipping Address Section */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Shipping Address
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                      placeholder="Enter your street address"
                      value={address}
                      required
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                      placeholder="Enter city"
                      value={city}
                      required
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                      placeholder="Enter postal code"
                      value={postalCode}
                      required
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                      placeholder="Enter country"
                      value={country}
                      required
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Section */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Payment Method
                </h2>
                
                <div className="space-y-4">
                  <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition duration-200">
                    <input
                      type="radio"
                      className="w-4 h-4 text-pink-500 border-gray-300 focus:ring-pink-500"
                      name="paymentMethod"
                      value="PayPal"
                      checked={paymentMethod === "PayPal"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <div className="ml-4">
                      <div className="flex items-center">
                        <svg className="w-6 h-6 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.067 8.478c.492.315.844.825.844 1.422 0 .597-.352 1.107-.844 1.422l-3.5 2.25c-.492.315-1.156.315-1.648 0l-3.5-2.25c-.492-.315-.844-.825-.844-1.422 0-.597.352-1.107.844-1.422l3.5-2.25c.492-.315 1.156-.315 1.648 0l3.5 2.25z"/>
                        </svg>
                        <span className="font-medium text-gray-800">PayPal or Credit Card</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Pay securely with PayPal or your credit card</p>
                    </div>
                  </label>
                  
                  <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition duration-200">
                    <input
                      type="radio"
                      className="w-4 h-4 text-pink-500 border-gray-300 focus:ring-pink-500"
                      name="paymentMethod"
                      value="Stripe"
                      checked={paymentMethod === "Stripe"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <div className="ml-4">
                      <div className="flex items-center">
                        <svg className="w-6 h-6 text-purple-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        <span className="font-medium text-gray-800">Stripe (Credit/Debit Card)</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Direct payment with your credit or debit card</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-lg text-lg transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                  type="submit"
                >
                  Continue to Order Summary
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
