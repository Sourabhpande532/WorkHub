import { Navigate } from "react-router-dom";
import { usePortal } from "../context/JobContext";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = usePortal();
  if (isLoggedIn === null) return <p className='text-center'>Loading...</p>;

  return isLoggedIn ? children : <Navigate to='/login' replace />;
};
export default PrivateRoute;
