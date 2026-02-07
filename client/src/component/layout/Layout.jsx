import { Outlet } from "react-router-dom";
import { Header } from "./navbar/Header";
import { Footer } from "./footer/Footer";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
export default Layout;
