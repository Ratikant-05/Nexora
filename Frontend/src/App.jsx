import "./App.css";
import GetProducts from "./Components/GetProducts";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <GetProducts />
      <ToastContainer/>
    </>
  );
}

export default App;
