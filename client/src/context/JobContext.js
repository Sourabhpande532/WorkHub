import toast from "react-hot-toast";
import API from "../api/axios";

const { createContext, useContext, useState, useEffect } = require("react");

const JobContext = createContext();
const JobProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await API.get("/posted/job");
      setData(response.data.data.jobs);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        await API.get("/auth/me");
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchJobs();
    }
  }, [isLoggedIn]);

  const deleteJob = async (id) => {
    try {
      await API.delete(`/posted/job/${id}`);
      toast.success("Deleted Successfully");
      await fetchJobs();
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to delete");
    }
  };

  const addPost = async (data) => {
    try {
      await API.post("/posted/job", data);
      toast.success("Post Added successfully");
      await fetchJobs();
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to create post");
    }
  };

  return (
    <JobContext.Provider
      value={{ loading, data, isLoggedIn, deleteJob, addPost }}>
      {children}
    </JobContext.Provider>
  );
};
const usePortal = () => useContext(JobContext);
export { JobProvider, JobContext, usePortal };
