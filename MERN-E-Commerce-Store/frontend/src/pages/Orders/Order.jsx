import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Messsage from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../../redux/api/orderApiSlice";

const Order = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPaPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPaPal && paypal.clientId) {
      const loadingPaPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadingPaPalScript();
        }
      }
    }
  }, [errorPayPal, loadingPaPal, order, paypal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Order is paid");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: order.totalPrice } }],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onError(err) {
    toast.error(err.message);
  }

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Messsage variant="danger">{error.data.message}</Messsage>
  ) : (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Items Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Items</h2>
            {order.orderItems.length === 0 ? (
              <Messsage>Order is empty</Messsage>
            ) : (
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
                    {order.orderItems.map((item, index) => (
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
                        <td className="px-4 py-4 text-center font-medium">${item.price}</td>
                        <td className="px-4 py-4 text-center font-bold text-green-600">
                          ${(item.qty * item.price).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
            {/* Order Information */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Information</h2>
              <div className="space-y-3">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-600">Order ID</span>
                  <span className="text-sm text-gray-800 break-all">{order._id}</span>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-600">Customer</span>
                  <span className="text-sm text-gray-800">{order.user.username}</span>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-600">Email</span>
                  <span className="text-sm text-gray-800 break-all">{order.user.email}</span>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-600">Shipping Address</span>
                  <span className="text-sm text-gray-800 break-words">
                    {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                  </span>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-600">Payment Method</span>
                  <span className="text-sm text-gray-800">{order.paymentMethod}</span>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-600">Payment Status</span>
                  {order.isPaid ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Paid on {new Date(order.paidAt).toLocaleDateString()}
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Not paid
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t pt-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Items</span>
                  <span className="font-medium">${order.itemsPrice}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">${order.shippingPrice}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${order.taxPrice}</span>
                </div>
                <div className="flex justify-between items-center border-t pt-3">
                  <span className="text-lg font-bold text-gray-800">Total</span>
                  <span className="text-lg font-bold text-green-600">${order.totalPrice}</span>
                </div>
              </div>
            </div>

            {/* Payment Section */}
            {!order.isPaid && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Complete Payment</h3>
                {loadingPay && <Loader />}
                {isPending ? (
                  <Loader />
                ) : (
                  <div className="space-y-4">
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Admin Actions */}
            {loadingDeliver && <Loader />}
            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
              <div className="border-t pt-6">
                <button
                  type="button"
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
                  onClick={deliverHandler}
                >
                  Mark As Delivered
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
