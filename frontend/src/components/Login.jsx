import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addUser } from "../slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import * as authService from "../services/auth.service";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      emailId: "vinayak@gmail.com",
      password: "Vinayak@123",
    },
  });
  const [formError, setFormError] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      const response = await authService.login(formData);
      const userData = response.data;
      dispatch(addUser(userData.responseData));
      setFormError("");
      navigate("/");
    } catch (error) {
      setLoginMessage("");
      setFormError(error.response.data.message);
      console.error(error);
    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body ">
          <h2 className="card-title justify-center">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" text-red-500">{formError}</div>
            <div className=" text-green-500">{loginMessage}</div>
            <div className="flex flex-col">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Email ID</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Type here"
                  {...register("emailId", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // simple email regex
                      message: "Invalid email format",
                    },
                  })}
                />
                {errors.emailId && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.emailId.message}
                  </p>
                )}
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Password</legend>
                <input
                  type="password"
                  className="input"
                  placeholder="Type here"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Min 6 characters" },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </fieldset>
            </div>
            <div className="card-actions flex flex-col items-center items-baseline mt-[10px]">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
              <div className="flex flex-row">
                New User? &nbsp;
                <Link to={"/signup"} className=" underline">
                  Sign Up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
