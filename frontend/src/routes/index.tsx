import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { message } from "antd";

const Index = () => {
  const { pathname } = useLocation();
  const [hasShownMessage, setHasShownMessage] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const isLoggedIn = () => {
    return !!localStorage.getItem("token");
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<></>}>
          <Route
            index
            element={<Navigate to="thong-tin-tai-khoan" replace />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default Index;
