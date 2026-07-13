import React, { useEffect, useState } from "react";
import "./reset-password.css";
import BIG_LOGO_IMG from "../../assets/new-logo.png";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  // forgotPassword,
  resetPassword,
  verifyResetToken,
} from "../../redux/auth/authAction";

const ResetPassword = () => {
  const { token } = useParams();
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, tokenValid, message, error } = useSelector((s) => s.auth);
  console.log(tokenValid);
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(verifyResetToken(token));
  }, [dispatch, token]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!password) return;
    dispatch(resetPassword(token, password));
    // optional redirect after success
    // .then(() => navigate("/login"));
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
              {loading && <p>Loading…</p>}
              {/* {!loading && tokenValid === false && (
                <p style={{ color: "crimson" }}>
                  Token is invalid or expired. Please request a new reset link.
                </p>
              )} */}
              {/* {!loading && tokenValid && ( */}
              <form onSubmit={onSubmit}>
                <div className="row">
                  <div className="col-lg-12">
                    <label>
                      New Password
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="••••••••"
                        required
                      />
                    </label>
                  </div>

                  <div className="col-lg-12">
                    <button type="submit">
                      {loading ? "Updating..." : "Update Password"}
                    </button>
                  </div>
                </div>
              </form>
              {/* )} */}

              {message && <p style={{ color: "green" }}>{message}</p>}
              {error && <p style={{ color: "crimson" }}>{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
