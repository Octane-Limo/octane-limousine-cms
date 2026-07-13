import React, { useState } from "react";
import "./Login.css";
import BIG_LOGO_IMG from "../../assets/new-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/auth/authAction";
import * as T from "../../redux/auth/authType";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (error) {
      dispatch({ type: T.AUTH_CLEAR_ERROR });
    }
  };

  const navigateAfterLogin = () => {
    navigate("/dashboard");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form, navigateAfterLogin));
  };

  return (
    <section className="login-page">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="text-center">
              <img src={BIG_LOGO_IMG} alt="BIG_LOGO_IMG" />
            </div>
          </div>

          <div className="col-lg-6">
            <div className="login-form-content">
              {error && (
                <div
                  role="alert"
                  className="text-danger border border-danger p-2 rounded mb-3"
                >
                  {error?.message}
                </div>
              )}
              <form onSubmit={handleSubmit} noValidate>
                <div className="row">
                  <div className="col-lg-12">
                    <label>
                      Email Address
                      <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        placeholder="Enter your email address"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </label>
                  </div>

                  <div className="col-lg-12">
                    <label>
                      Password
                      <input
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={handleChange}
                        required
                      />
                    </label>
                  </div>

                  <div className="col-lg-12">
                    <button>Sign in</button>
                  </div>

                  <div className="col-lg-12">
                    <Link to="/forgot-password">Forgot Password?</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
