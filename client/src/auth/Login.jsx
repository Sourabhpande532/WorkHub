import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signin", { email, password });
      navigate("/");
      toast.success("Login Successfully");
    } catch (error) {
      toast.error("Invalid Credentials");
    }
  };
  const guestLoginHandler = async () => {
    try {
      const guestEmail = "bob@gmail.com";
      const guestPassword = "5321";
      setEmail(guestEmail);
      setPassword(guestPassword);
      await API.post("/auth/signin", {
        email: guestEmail,
        password: guestPassword,
      });
      navigate("/");
      toast.success("Login Successfully");
    } catch (error) {
      toast.error("Guest login failed");
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
      <button
        className='btn btn-outline-primary w-100 mt-2'
        type='button'
        onClick={guestLoginHandler}>
        Login as Guest
      </button>
    </div>
  );
};
export default Login;
