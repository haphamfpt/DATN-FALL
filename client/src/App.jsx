import { Routes, Route } from "react-router-dom";

import Layout from "./Page/client/Layout";

import Home from "./Page/client/Home/Home.jsx"

import AuthPage from "./Page/auth/AuthPage";
import NotFound from "./Page/client/NotFound"; 

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>

        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<AuthPage />} />      
        <Route path="/register" element={<AuthPage />} />   

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;