import React, { useState } from "react";
import "./ForgotPassword.css";
import BIG_LOGO_IMG from "../../assets/new-logo.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../redux/auth/authAction";
import * as T from "../../redux/auth/authType";

const Login = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { loading, message, status } = useSelector((s) => s.auth);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    dispatch(forgotPassword(email.trim()));
    if (message) {
      dispatch({ type: T.AUTH_CLEAR_MESSAGE });
    }
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
              {status === "success" && message && (
                <div
                  role="alert"
                  className="text-success border border-success p-2 rounded mb-3"
                >
                  {message}
                </div>
              )}
              <form onSubmit={onSubmit} noValidate>
                <div className="row">
                  <div className="col-lg-12">
                    <label>
                      Email Address
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        name="email"
                        autoComplete="email"
                        placeholder="Enter your email address"
                        required
                      />
                    </label>
                  </div>

                  <div className="col-lg-12">
                    <button type="submit">
                      {loading ? "Sending..." : "Forgot Password"}
                    </button>
                  </div>

                  <div className="col-lg-12">
                    <span>Back to </span>{" "}
                    <Link to="/" style={{ textDecoration: "underline" }}>
                      Sign In?
                    </Link>
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
