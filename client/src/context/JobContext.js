import API from "../api/axios";

const { createContext, useContext, useState, useEffect } = require("react");

const JobContext = createContext();
const JobProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  console.log(data);
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

  return (
    <JobContext.Provider value={{ loading, data, isLoggedIn }}>
      {children}
    </JobContext.Provider>
  );
};
const usePortal = () => useContext(JobContext);
export { JobProvider, JobContext, usePortal };
