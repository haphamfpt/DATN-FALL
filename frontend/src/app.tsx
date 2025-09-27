import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Index from "./routes";
function App() {
  return (
    <>
      <Index />
      <ToastContainer />
    </>
  );
}

export default App;
