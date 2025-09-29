import { Outlet } from "react-router-dom";

const MainContentAdmin = () => {
  return (
    <div className="p-5" id="main-content-page-admin">
      <Outlet />
    </div>
  );
};

export default MainContentAdmin;
