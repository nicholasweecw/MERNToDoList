// Importing React
import { useState, useEffect } from "react";
// Importing Redux
// useSelector: get state
// useDispatch: get actions
import { useSelector, useDispatch } from "react-redux";
// To allow for redirect to other pages
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Register() {
  // Hook Up The Register Form using React and Redux (everything bef the return)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  // Destructure the form data
  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    // state.auth: The name of the initialState declared in the authSlice function in the authSlice.js
    (state) => state.auth
  );

  // useEffect: Used to watch for certain changes (in this case)
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
    // Dependencies/Changes to watch for bef calling useEffect
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  // Allows input fields to display text typed by user
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      // name: refers to name attribute of every form-group
      [e.target.name]: e.target.value,
    }));
  };

  // Function for sumbmitting forms
  const onSubmit = (e) => {
    e.preventDefault();

    // Ensure password and confirm password are the same
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      // Use the register function from authSlice.js
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Confirm password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
