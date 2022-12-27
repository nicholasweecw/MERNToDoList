// Importing React
import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
// Importing Redux
// useSelector: get state
// useDispatch: get actions
import { useSelector, useDispatch } from "react-redux";
// To allow for redirect to other pages
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

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

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start setting tasks</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
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
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
