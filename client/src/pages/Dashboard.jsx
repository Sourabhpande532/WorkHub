import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const logout = async () => {
    await API.get("/auth/logout");
    navigate("/");
  };
  return (
    <div className='container mt-4'>
      <h2>Welcome to Dashboard 🎉</h2>
      <button className='btn btn-danger' onClick={logout}>
        Logout
      </button>
    </div>
  );
};
export default Dashboard;
