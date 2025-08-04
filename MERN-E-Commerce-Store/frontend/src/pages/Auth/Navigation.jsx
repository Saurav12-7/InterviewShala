// Navigation.jsx
import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { PiAddressBook } from "react-icons/pi";
import { FaHeart, FaBook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";

// import About from "../../pages/Aboutus";
import Aboutus from "../../pages/Aboutus";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
             {/* Desktop Sidebar - Completely hidden on mobile */}
       <div
         style={{ zIndex: 9999 }}
         className={`${
           showSidebar ? "hidden" : "hidden"
         } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-2 sm:p-4 text-white bg-[#000] w-[4%] hover:w-[15%] h-[100vh] fixed transition-all duration-300`}
         id="navigation-container"
       >
      <div className="flex flex-col justify-center space-y-4">
        <Link
          to="/"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">HOME</span>{" "}
        </Link>
        
        <Link
          to="/video-content"
          className="flex items-center transition-transform transform hover:translate-x-2">
          <FaBook className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">COURSES</span>{" "}
        </Link>


        {/* <Link to="/cart" className="flex relative">
          <div className="flex items-center transition-transform transform hover:translate-x-2">
            <AiOutlineShoppingCart className="mt-[3rem] mr-2" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">CART</span>{" "}
          </div>
          <div className="absolute top-9">
            {cartItems.length > 0 && (
              <span>
                <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              </span>
            )}
          </div>
        </Link>
         */}
        
        <Link to="/aboutus" className="flex items-center transition-transform transform hover:translate-x-2">
          <PiAddressBook className="mr-2 mt-[3rem]" size={26}  />
         <span className="hidden nav-item-name mt-[3rem]">ABOUT US</span>{" "}
          </Link>

        
        
      </div>

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center text-gray-800 focus:outline-none"
        >
          {userInfo ? (
            <span className="text-white">{userInfo.username}</span>
          ) : (
            <></>
          )}
          {userInfo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${
                dropdownOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>

        {dropdownOpen && userInfo && (
          <ul
            className={`absolute right-0 mt-2 mr-14 space-y-2 bg-white text-gray-600 ${
              !userInfo.isAdmin ? "-top-20" : "-top-80"
            } `}
          >
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Category
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
        {!userInfo && (
          <ul>
            <li>
              <Link
                to="/login"
                className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
              >
                <AiOutlineLogin className="mr-2 mt-[4px]" size={26} />
                <span className="hidden nav-item-name">LOGIN</span>
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
              >
                <AiOutlineUserAdd size={26} />
                <span className="hidden nav-item-name">REGISTER</span>
              </Link>
            </li>
          </ul>
                 )}
       </div>
     </div>

                    {/* Mobile Header - Visible on mobile */}
       <div className="xl:hidden lg:hidden md:flex sm:flex flex-col bg-white shadow-md fixed top-0 left-0 right-0 z-50">
         <div className="flex items-center justify-between p-4 border-b">
           {/* Hamburger Menu Button */}
           <button
             onClick={toggleMobileMenu}
             className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
           >
             {mobileMenuOpen ? (
               <AiOutlineClose className="h-6 w-6" />
             ) : (
               <AiOutlineMenu className="h-6 w-6" />
             )}
           </button>

           {/* Logo and Title */}
           <div className="flex items-center">
             <img src="/images/logo.png" alt="InterviewShala" className="h-6 sm:h-8 w-auto" />
             <span className="ml-2 text-sm sm:text-lg font-bold text-gray-800 truncate">InterviewShala</span>
           </div>
           
           {/* User Menu */}
           <div className="flex items-center space-x-4">
             {userInfo ? (
               <div className="relative">
                 <button
                   onClick={toggleDropdown}
                   className="flex items-center text-gray-700 focus:outline-none"
                 >
                   <span className="text-sm font-medium">{userInfo.username}</span>
                   <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className={`h-4 w-4 ml-1 ${
                       dropdownOpen ? "transform rotate-180" : ""
                     }`}
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                   >
                     <path
                       strokeLinecap="round"
                       strokeLinejoin="round"
                       strokeWidth="2"
                       d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                     />
                   </svg>
                 </button>

                 {dropdownOpen && (
                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                     {userInfo.isAdmin && (
                       <>
                         <Link to="/admin/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</Link>
                         <Link to="/admin/productlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Products</Link>
                         <Link to="/admin/categorylist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Category</Link>
                         <Link to="/admin/orderlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Orders</Link>
                         <Link to="/admin/userlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Users</Link>
                       </>
                     )}
                     <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                     <button onClick={logoutHandler} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                   </div>
                 )}
               </div>
             ) : (
               <div className="flex space-x-2">
                 <Link to="/login" className="text-sm font-medium text-blue-600 hover:text-blue-800">Login</Link>
                 <Link to="/register" className="text-sm font-medium text-blue-600 hover:text-blue-800">Register</Link>
               </div>
             )}
           </div>
         </div>

         {/* Mobile Hamburger Menu - Slide down from top */}
         {mobileMenuOpen && (
           <div className="bg-white border-t border-gray-200 shadow-lg">
             <div className="px-2 pt-2 pb-3 space-y-1">
               <Link
                 to="/"
                 onClick={() => setMobileMenuOpen(false)}
                 className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
               >
                 <AiOutlineHome className="mr-3 h-5 w-5" />
                 Home
               </Link>
               <Link
                 to="/video-content"
                 onClick={() => setMobileMenuOpen(false)}
                 className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
               >
                 <FaBook className="mr-3 h-5 w-5" />
                 Courses
               </Link>
               <Link
                 to="/aboutus"
                 onClick={() => setMobileMenuOpen(false)}
                 className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
               >
                 <PiAddressBook className="mr-3 h-5 w-5" />
                 About
               </Link>
               {!userInfo && (
                 <>
                   <Link
                     to="/login"
                     onClick={() => setMobileMenuOpen(false)}
                     className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                   >
                     <AiOutlineLogin className="mr-3 h-5 w-5" />
                     Login
                   </Link>
                   <Link
                     to="/register"
                     onClick={() => setMobileMenuOpen(false)}
                     className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                   >
                     <AiOutlineUserAdd className="mr-3 h-5 w-5" />
                     Register
                   </Link>
                 </>
               )}
             </div>
           </div>
         )}
       </div>
    </>
   );
};

export default Navigation;
