import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { addUser } from "../slices/userSlice";
import ShowToast from "../common/ShowToast";
import { useState } from "react";
import * as profileService from "../services/profile.service";

const EditProfile = ({ user }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    isSuccess: true,
  });

  const dispatch = useDispatch();

  const onSubmit = async (formData) => {
    try {
      const res = await profileService.editProfile(formData);
      dispatch(addUser(formData));
      setToast({
        visible: true,
        message: "Profile updated successfully!",
        isSuccess: true,
      });
    } catch (error) {
      console.error(error);
      setToast({
        visible: true,
        message: "Failed to update profile.",
        isSuccess: false,
      });
    }
  };

  useEffect(() => {
    if (user) {
      const userData = structuredClone(user);
      delete userData._id;
      delete userData.age;
      reset(userData);
    }
  }, [user]);

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body ">
          <h2 className="card-title justify-center">Edit Profile</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Type here"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Type here"
                  {...register("lastName", {
                    required: "lastName is required",
                    minLength: { value: 6, message: "Min 6 characters" },
                  })}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender</legend>
                <select
                  className="select"
                  {...register("gender", {
                    required: "gender is required",
                  })}
                >
                  <option value={"male"}>Male</option>
                  <option value={"female"}>Female</option>
                  <option value={"others"}>Others</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.gender.message}
                  </p>
                )}
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Photo Url</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Type here"
                  {...register("photoUrl", {
                    required: "photoUrl is required",
                    minLength: { value: 6, message: "Min 6 characters" },
                  })}
                />
                {errors.photoUrl && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.photoUrl.message}
                  </p>
                )}
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">About</legend>
                <textarea
                  type="text"
                  className="textarea"
                  placeholder="Type here"
                  {...register("about", {
                    required: "About is required",
                    maxLength: { value: 50, message: "Max 50 characters" },
                  })}
                />
                {errors.about && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.about.message}
                  </p>
                )}
              </fieldset>
            </div>
            <div className="card-actions justify-center mt-[10px]">
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
      {toast.visible && (
        <ShowToast
          message={toast.message}
          isSuccess={toast.isSuccess}
          duration={3000}
          onClose={() => setToast({ ...toast, visible: false })}
        />
      )}
    </div>
  );
};

export default EditProfile;
