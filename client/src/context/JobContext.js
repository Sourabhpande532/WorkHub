import API from "../api/axios";

const { createContext, useContext, useState, useEffect } = require("react");

const JobContext = createContext();
const JobProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  console.log(data);

  const fetchJobs = async () => {
    try {
      const response = await API.get("/posted/job");
      setData(response.data.data.jobs);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchJobs();
    setLoading(false);
  }, []);
  return (
    <JobContext.Provider value={{ loading, data }}>
      {children}
    </JobContext.Provider>
  );
};
const usePortal = () => useContext(JobContext);
export { JobProvider, JobContext, usePortal };
