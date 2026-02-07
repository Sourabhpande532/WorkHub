import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signin", { email, password });
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid Credentials");
    }
  };
  return (
    <div className='container col-md-4 mt-5'>
      <h3>Login</h3>
      <form onSubmit={submitHandler}>
        <input
          className='form-control mb-2'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className='form-control mb-2'
          type='password'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='btn btn-success w-100'>Login</button>
      </form>
    </div>
  );
};
export default Login;
