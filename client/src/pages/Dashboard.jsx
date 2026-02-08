import { useState } from "react";
import { usePortal } from "../context/JobContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { data, deleteJob } = usePortal();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const filterJobList = data.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <main className='container py-4'>
      <section className='mb-3'>
        <input
          placeholder='search by job title'
          className='form-control'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>
      {filterJobList.length === 0 && (
        <p className='text-center fs-4'> No data found.</p>
      )}
      <section>
        <div className='row g-3'>
          {filterJobList.length > 0 &&
            filterJobList.map((job) => (
              <div key={job._id} className='col-md-4'>
                <div className='card shadow-lg p-2 m-2 border-none'>
                  <div className='card-body'>
                    <h3>
                      <b>{job.title}</b>
                    </h3>
                    <p>
                      <b>Company name:</b> {job.companyName}
                    </p>
                    <p>
                      <b>Location:</b> {job.location}
                    </p>
                    <p>
                      <b>Job Type:</b> {job.type}
                    </p>
                    <div className='d-flex gap-4'>
                      <button
                        onClick={() =>
                          navigate(`/details/${job._id}`, { replace: true })
                        }
                        className='btn btn-primary'>
                        See Details
                      </button>
                      <button
                        onClick={() => deleteJob(job._id)}
                        className='btn btn-danger'>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </main>
  );
};
export default Dashboard;
