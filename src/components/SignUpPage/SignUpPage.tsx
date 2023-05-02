import { useNavigate } from "react-router-dom";
import "./SignUpPage.scss";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createUserAsync } from "../Actions/AuthAction";
interface FormData {
  name: string;
  email: string;
  password: string;
}
const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const onSubmit = async (data: FormData) => {
    try {
      await dispatch(createUserAsync({
        name: data.name,
        email: data.email,
        password: data.password,
        id: 0
      }));
      navigate("/login-page");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="signup-page-div">
      <div className="signup-container">
        <div className="card">
          <div className="card-image">
            <h2 className="card-heading">
              Get started
              <small>Let us create your account</small>
            </h2>
          </div>
          <form className="card-form" onSubmit={handleSubmit(onSubmit)}>
            {errors.name && <div className="error">Full Name is required</div>}
            <div className="input">
              <input
                type="text"
                className="input-field"
                {...register("name", { required: true })}
              />
              <label className="input-label">Full Name</label>
            </div>
            {errors.email && <div className="error">Email is required</div>}
            <div className="input">
              <input
                type="email"
                className="input-field"
                {...register("email", { required: true })}
              />
              <label className="input-label">Email</label>
            </div>
            {errors.password && <div className="error">Password is required</div>}
            <div className="input">
              <input
                type="password"
                className="input-field"
                {...register("password", { required: true })}
              />
              <label className="input-label">Password</label>
            </div>
            <br />
            <p>
              If you are already a Member &nbsp;
              <span
                className="signin-span"
                onClick={() => navigate("/login-page")}
              >
                Sign In
              </span>
            </p>
            <div className="action">
              <button type="submit" className="action-button">
                Get started
              </button>
            </div>
          </form>
          <div className="card-info"></div>
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;
