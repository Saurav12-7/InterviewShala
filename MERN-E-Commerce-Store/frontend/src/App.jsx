import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className="py-3 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </>
  );
};

export default App;
