import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      console.log(res);
      dispatch(setCredentials({ ...res }));
      sessionStorage.setItem('userEmail', email);
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center px-6 sm:px-8 lg:px-16 xl:px-20 py-10 lg:py-0">
          <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
            {/* Logo/Brand */}
            <div className="text-center lg:text-left mb-8 lg:mb-10">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-gray-600 mt-4 text-base lg:text-lg">Sign in to your InterviewShala account</p>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 lg:p-12 border border-gray-100">
                             <form onSubmit={submitHandler} className="space-y-6 lg:space-y-7">
                 <div>
                   <label
                     htmlFor="email"
                     className="block text-sm font-semibold text-gray-700 mb-3 lg:mb-4"
                   >
                     Email Address
                   </label>
                   <div className="relative">
                     <input
                       type="email"
                       id="email"
                       className="w-full px-5 py-4 lg:py-5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-base"
                       placeholder="Enter your email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       required
                     />
                     <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                       <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                       </svg>
                     </div>
                   </div>
                 </div>

                 <div>
                   <label
                     htmlFor="password"
                     className="block text-sm font-semibold text-gray-700 mb-3 lg:mb-4"
                   >
                     Password
                   </label>
                   <div className="relative">
                     <input
                       type="password"
                       id="password"
                       className="w-full px-5 py-4 lg:py-5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-base"
                       placeholder="Enter your password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       required
                     />
                     <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                       <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                       </svg>
                     </div>
                   </div>
                   <div className="text-right mt-4">
                     <Link
                       to="/forgot-password"
                       className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
                     >
                       Forgot Password?
                     </Link>
                   </div>
                 </div>

                 <button
                   disabled={isLoading}
                   type="submit"
                   className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 lg:py-5 px-6 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl text-base"
                 >
                   {isLoading ? (
                     <div className="flex items-center justify-center">
                       <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                       Signing In...
                     </div>
                   ) : (
                     "Sign In"
                   )}
                 </button>

                 {isLoading && <Loader />}
               </form>

               <div className="mt-8 lg:mt-10 text-center">
                 <p className="text-gray-600 text-base">
                   Don't have an account?{" "}
                   <Link
                     to={redirect ? `/register?redirect=${redirect}` : "/register"}
                     className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
                   >
                     Create Account
                   </Link>
                 </p>
               </div>
            </div>
          </div>
        </div>
        
        {/* Right Side - Image */}
        <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
            alt="Team collaboration and learning"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-20"></div>
          
          {/* Overlay Content */}
          <div className="absolute bottom-0 left-0 right-0 p-12 z-30 text-white">
            <h2 className="text-4xl font-bold mb-4">Unlock Your Potential</h2>
            <p className="text-xl text-gray-200 leading-relaxed">
              Join thousands of students preparing for their dream careers with InterviewShala's comprehensive learning platform.
            </p>
          </div>
        </div>
      </div>
    </div>

   
  );
};

export default Login;
