import { useParams } from "react-router-dom";
import { usePortal } from "../context/JobContext";

const JobDetails = () => {
  const { data } = usePortal();
  const { id } = useParams();
  const details = data.find((job) => job._id === id);
  return (
    <main className='container py-3'>
      <h3 className='display-3 mb-3'>{details?.title}</h3>
      <section>
        <div className='card shadow-lg border-0 p-2'>
          <div className='card-body'>
            <p>
              <b>Company Name:</b> {details?.companyName}
            </p>
            <p>
              <b>Location:</b> {details?.location}
            </p>
            <p>
              <b>Salary:</b> {details?.salary}
            </p>
            <p>
              <b>Job Type:</b> {details?.type}
            </p>
            <p>
              <b>Description:</b> {details?.description}
            </p>
            <div>
              <b>Qualification:</b>
              <ol>
                {details?.qualification.map((list) => (
                  <li key={list}>{list}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export { JobDetails };
