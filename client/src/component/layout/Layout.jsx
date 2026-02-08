import { Outlet } from "react-router-dom";
import { Header } from "./navbar/Header";
import { Footer } from "./footer/Footer";
import { usePortal } from "../../context/JobContext";
import Loading from "../loading/Loading";

const Layout = () => {
  const { loading } = usePortal();
  return (
    <div>
      <Header />
      {loading ? <Loading /> : <Outlet />}
      <Footer />
    </div>
  );
};
export default Layout;
