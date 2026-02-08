import { useState } from "react";
import { usePortal } from "../context/JobContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const { addPost } = usePortal();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    companyName: "",
    location: "",
    salary: "",
    type: "",
    description: "",
    qualification: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handlerForm = async (e) => {
    e.preventDefault();
    if (
      !form.title ||
      !form.companyName ||
      !form.location ||
      !form.salary ||
      !form.type ||
      !form.description ||
      !form.qualification
    ) {
      toast.error("All fields are required");
      return;
    }
    // BACKEND MATCH FORMATE
    const payload = {
      ...form,
      salary: Number(form.salary),
      qualification: form.qualification.split(",").map((q) => q.trim()),
    };
    await addPost(payload);
    navigate("/", { replace: true });
  };

  return (
    <div className='container py-3'>
      <h2 className='display-3 mb-2'>Post a Job</h2>

      <form onSubmit={handlerForm}>
        <label className='mb-1'>Job Title:</label>
        <input
          className='form-control mb-3'
          name='title'
          placeholder='Job Title'
          value={form.title}
          onChange={handleChange}
        />
        <label className='mb-1'>Company Name:</label>
        <input
          className='form-control mb-3'
          name='companyName'
          placeholder='Company Name'
          value={form.companyName}
          onChange={handleChange}
        />
        <label className='mb-1'>Location:</label>
        <input
          className='form-control mb-3'
          name='location'
          placeholder='Location'
          value={form.location}
          onChange={handleChange}
        />
        <label className='mb-1'>Salary:</label>
        <input
          className='form-control mb-3'
          type='number'
          name='salary'
          placeholder='Salary'
          value={form.salary}
          onChange={handleChange}
        />
        <label className='mb-1'>Job Type:</label>
        <select
          className='form-control mb-3'
          name='type'
          value={form.type}
          onChange={handleChange}>
          <option value=''>Select Job Type</option>
          <option value='Full-time (On-site)'>Full-time (On-site)</option>
          <option value='Part-time (On-site)'>Part-time (On-site)</option>
          <option value='Full-time (Remote)'>Full-time (Remote)</option>
          <option value='Part-time (Remote)'>Part-time (Remote)</option>
        </select>
        <label className='mb-1'>Job Description:</label>
        <textarea
          className='form-control mb-3'
          name='description'
          placeholder='Job Description'
          rows='4'
          value={form.description}
          onChange={handleChange}
        />
        <label className='mb-1'>Job Qualification:</label>
        <input
          className='form-control mb-3'
          name='qualification'
          placeholder='Qualification (comma separated)'
          value={form.qualification}
          onChange={handleChange}
        />
        <button type='submit' className='btn btn-primary w-100'>
          Post Job
        </button>
      </form>
    </div>
  );
};
export { Post };
