import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import Register from "./auth/Register";
import Login from "./auth/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import Layout from "./component/layout/Layout";
import { Error } from "./pages/Error";
import { Post } from "./pages/Post";
import { JobDetails } from "./pages/JobDetails";
function App() {
  return (
    <BrowserRouter>
      <Toaster
        position='top-right'
        toastOptions={{
          style: {
            fontSize: "1.4rem",
          },
        }}
      />
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        {/* PRIVATE ROUTES */}
        <Route
          path='/'
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }>
          <Route index element={<Dashboard />} />
          <Route path='post-job' element={<Post />} />
          <Route path='/details/:id' element={<JobDetails />} />
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
