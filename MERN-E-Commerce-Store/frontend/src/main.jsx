import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";

// Auth
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import AdminRoute from "./pages/Admin/AdminRoute";
import Profile from "./pages/User/Profile";
import UserList from "./pages/Admin/UserList";

import CategoryList from "./pages/Admin/CategoryList";

import ProductList from "./pages/Admin/ProductList";
import AllProducts from "./pages/Admin/AllProducts";
import ProductUpdate from "./pages/Admin/ProductUpdate";

import Home from "./pages/Home.jsx";
import Favorites from "./pages/Products/Favorites.jsx";
import ProductDetails from "./pages/Products/ProductDetails.jsx";

import Cart from "./pages/Cart.jsx";
import Shop from "./pages/Shop.jsx";

import Shipping from "./pages/Orders/Shipping.jsx";
import PlaceOrder from "./pages/Orders/PlaceOrder.jsx";
import Order from "./pages/Orders/Order.jsx";
import OrderList from "./pages/Admin/OrderList.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import QuizManagement from "./pages/Admin/QuizManagement.jsx";
import VideoContaint from "./components/VideoContaint.jsx";
import Mocktestdiscriptions from "./pages/Mocktestdiscriptions.jsx";
import Mockdiscriptions from "./pages/Mockdiscriptions.jsx";
import CalendarBooking from "./pages/CalendarBooking.jsx";
import QuizRedirect from "./pages/QuizRedirect.jsx";
import DummyQuiz from "./pages/DummyQuiz.jsx";
import Ebook from "./pages/ebook.jsx";
import Aboutus from "./pages/Aboutus.jsx";
import InterviewProductCart from "./components/InterviewProductCart.jsx";
import TestProductCart from "./components/TestProductCart.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route index={true} path="/" element={<Home />} />
      <Route path="/video" element={<VideoContaint />} />
      <Route path="/favorite" element={<Favorites />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/shop" element={<Shop />} />
    

      {/* Registered users */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/mock-description" element={<Mockdiscriptions/>}/>
        <Route path="/calendar-booking" element={<CalendarBooking/>}/>
        <Route path="/quiz-redirect" element={<QuizRedirect/>}/>
        <Route path="/dummy-quiz" element={<DummyQuiz/>}/>
        <Route path="/mockinterview" element={<InterviewProductCart/>} />
        <Route path="/mockTestDescription" element={<Mocktestdiscriptions/>}/>
        <Route path="/mocktest" element={<TestProductCart/>}/>
        <Route path="/video-content" element={<VideoContaint/>}/>
        <Route path="/ebook" element={<Ebook/>}/>
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/order/:id" element={<Order />} />
        
      </Route>

      <Route path="/admin" element={<AdminRoute />}>
        <Route path="userlist" element={<UserList />} />
        <Route path="categorylist" element={<CategoryList />} />
        <Route path="productlist" element={<ProductList />} />
        <Route path="allproductslist" element={<AllProducts />} />
        <Route path="productlist/:pageNumber" element={<ProductList />} />
        <Route path="product/update/:_id" element={<ProductUpdate />} />
        <Route path="orderlist" element={<OrderList />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="quizmanagement" element={<QuizManagement />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PayPalScriptProvider>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  </Provider>
);
