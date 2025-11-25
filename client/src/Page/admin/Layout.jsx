import { Outlet } from "react-router-dom";
import Header from "../../component/admin/header";
import SideBar from "../../component/admin/SideBar";

const LayoutAdmin = () => {
  return (
    <>
      <Header />
      <SideBar />
      <main
        className="min-vh-100 bg-light"
        style={{ marginLeft: "280px", paddingTop: "80px" }}
      >
        <Outlet />
      </main>
    </>
  );
};

export default LayoutAdmin;
