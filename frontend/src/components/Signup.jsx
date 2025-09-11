import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as authService from "../services/auth.service";
import FormField from "../common/FormField";
import SelectField from "../common/SelectField";
import SkillsInput from "../common//SkillsInput";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({ defaultValues: { skills: [] } });

  const [formError, setFormError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      const response = await authService.signup(formData);
      setFormError("");
      navigate("/login");
    } catch (error) {
      setFormError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body ">
          <h2 className="card-title justify-center">Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {formError && <div className="text-red-500">{formError}</div>}

            <FormField
              label="First Name"
              name="firstName"
              register={register}
              validation={{ required: "First name is required" }}
              errors={errors}
            />

            <FormField
              label="Last Name"
              name="lastName"
              register={register}
              validation={{
                required: "Last name is required",
                minLength: { value: 6, message: "Min 6 characters" },
              }}
              errors={errors}
            />

            <FormField
              label="Email ID"
              name="emailId"
              register={register}
              validation={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              }}
              errors={errors}
            />

            <FormField
              label="Password"
              type="password"
              name="password"
              register={register}
              validation={{
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 characters" },
              }}
              errors={errors}
            />

            <FormField
              label="Age"
              type="number"
              name="age"
              register={register}
              validation={{ required: "Age is required" }}
              errors={errors}
            />

            <SelectField
              label="Gender"
              name="gender"
              register={register}
              validation={{ required: "Gender is required" }}
              errors={errors}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "others", label: "Others" },
              ]}
            />

            <FormField
              label="Photo Url"
              name="photoUrl"
              register={register}
              errors={errors}
            />

            <FormField
              label="About"
              type="textarea"
              name="about"
              register={register}
              validation={{
                required: "About is required",
                maxLength: { value: 50, message: "Max 50 characters" },
              }}
              errors={errors}
            />

            <SkillsInput
              register={register}
              setValue={setValue}
              getValues={getValues}
              errors={errors}
            />

            <div className="card-actions justify-center mt-[10px]">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
