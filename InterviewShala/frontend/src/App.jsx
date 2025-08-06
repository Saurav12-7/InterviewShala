import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Navigation />
             <main className="py-2 sm:py-3 px-2 sm:px-4 lg:px-8 xl:mt-0 lg:mt-0 md:mt-24 sm:mt-24">
         <Outlet />
       </main>
    </>
  );
};

export default App;
