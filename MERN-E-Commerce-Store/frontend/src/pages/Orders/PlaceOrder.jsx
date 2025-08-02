import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import { clearCartItems } from "../../redux/features/cart/cartSlice";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();



  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      // Check if cart has items
      if (!cart.cartItems || cart.cartItems.length === 0) {
        toast.error("Your cart is empty. Please add items before placing an order.");
        return;
      }

      // If Stripe is selected, redirect to Stripe checkout
      if (cart.paymentMethod === "Stripe") {
        // Create Stripe checkout session for each cart item
        for (const item of cart.cartItems) {
          const response = await fetch("http://localhost:8000/api/stripe/create-checkout-session", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              product: {
                name: item.name,
                price: item.price,
                description: item.description || "InterviewShala Course"
              },
              productType: item.category === "Mock Interview" ? "interview" : "test"
            }),
          });
          
          const data = await response.json();
          if (data.url) {
            window.location.href = data.url;
            return;
          }
        }
      } else {
        // For PayPal, use the existing order creation
        const res = await createOrder({
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        }).unwrap();
        dispatch(clearCartItems());
        navigate(`/order/${res._id}`);
      }
    } catch (error) {
      toast.error(error?.data?.message || error.message || "Failed to place order");
    }
  };

  return (
    <>
      <ProgressSteps step1 step2 step3 />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {cart.cartItems.length === 0 ? (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <Message>Your cart is empty</Message>
            <Link 
              to="/" 
              className="inline-block mt-4 bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Items Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Items</h2>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-full">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Image</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Product</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Quantity</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Unit Price</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Total</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                      {cart.cartItems.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          </td>

                          <td className="px-4 py-4">
                            <Link 
                              to={`/product/${item.product}`}
                              className="text-blue-600 hover:text-blue-800 font-medium break-words"
                            >
                              {item.name}
                            </Link>
                          </td>

                          <td className="px-4 py-4 text-center font-medium">{item.qty}</td>
                          <td className="px-4 py-4 text-center font-medium">${item.price.toFixed(2)}</td>
                          <td className="px-4 py-4 text-center font-bold text-green-600">
                            ${(item.qty * item.price).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
                {/* Order Summary */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Items</span>
                      <span className="font-medium">${cart.itemsPrice}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">${cart.shippingPrice}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">${cart.taxPrice}</span>
                    </div>
                    <div className="flex justify-between items-center border-t pt-3">
                      <span className="text-lg font-bold text-gray-800">Total</span>
                      <span className="text-lg font-bold text-green-600">${cart.totalPrice}</span>
                    </div>
                  </div>
                </div>

                {/* Shipping Information */}
                <div className="border-t pt-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Shipping Information</h2>
                  <div className="space-y-3">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-600">Payment Method</span>
                      <span className="text-sm text-gray-800">{cart.paymentMethod}</span>
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-600">Shipping Address</span>
                      <span className="text-sm text-gray-800 break-words">
                        {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Error Display */}
                {error && (
                  <div className="border-t pt-6">
                    <Message variant="danger">{error.data.message}</Message>
                  </div>
                )}

                {/* Place Order Button */}
                <div className="border-t pt-6">
                  <button
                    type="button"
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={cart.cartItems.length === 0 || isLoading}
                    onClick={placeOrderHandler}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      cart.paymentMethod === "Stripe" ? "Proceed to Stripe Checkout" : "Place Order"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PlaceOrder;
