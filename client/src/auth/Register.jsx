import { useState } from "react";
import API from "../api/axios";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.value]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", form);
      alert("Registration successfull");
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };
  return (
    <div className='container col-md-4 mt-5'>
      <h3>Register</h3>
      <form onSubmit={submitHandler}>
        <input
          className='form-control mb-2'
          name='name'
          placeholder='Name'
          onChange={handleChange}
        />
        <input
          className='form-control mb-2'
          name='email'
          placeholder='Email'
          onChange={handleChange}
        />
        <input
          className='form-control mb-2'
          type='password'
          name='password'
          placeholder='Password'
          onChange={handleChange}
        />
        <button className='btn btn-primary w-100'>Register</button>
      </form>
    </div>
  );
};
export default Register;
