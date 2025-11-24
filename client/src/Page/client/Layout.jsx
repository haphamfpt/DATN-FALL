import { Outlet } from "react-router-dom";
import Header from "../../component/client/header";
import Footer from "../../component/client/footer";
import { Container } from "react-bootstrap";

const Layout = () => {
  return (
    <>
      <Header />
        <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
