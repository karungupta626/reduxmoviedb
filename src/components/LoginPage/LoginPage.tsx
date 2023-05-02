import "./LoginPage.scss";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { loginUserAsync } from "../Actions/AuthAction";
interface FormData {
  username: string;
  password: string;
}
const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const onSubmit = async (data: FormData) => {
    try {
      await dispatch(loginUserAsync({
        username: data.username,
        password: data.password
      }));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div className="signin-container">
        <div className="card">
          <div className="card-image">
            <h2 className="card-heading">
              Welcome back!
              <small>Log Into Your Account</small>
            </h2>
          </div>
          <form className="card-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="input">
              <input
                type="text"
                className="input-field"
                {...register("username", { required: true })}
              />
              <label className="input-label">Username</label>
            </div>
            {errors.username && <div className="error">Username is required</div>}
            <div className="input">
              <input
                type="password"
                className="input-field"
                {...register("password", { required: true })}
              />
              <label className="input-label">Password</label>
            </div>
            {errors.password && <div className="error">Password is required</div>}
            <br />
            <p>
              If you are not a member yet, &nbsp;
              <span
                className="signin-span"
                onClick={() => navigate("/signup-page")}
              >
                Sign Up
              </span>
            </p>
            <div className="action">
              <button type="submit" className="action-button">
                Login
              </button>
            </div>
          </form>
          <div className="card-info"></div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
