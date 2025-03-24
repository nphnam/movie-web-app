import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Uploder from "../../Components/Uploder";
import { Input } from "../../Components/UserInputs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { ProfileValidation } from "../../Components/Validation/UserValidation";
import { InlineError } from "../../Components/Notifications/Error";
import { ImagePreview } from "./../../Components/ImagePreview";
import {
  deleteProfileAction,
  updateProfileAction,
} from "../../Redux/Actions/userActions";
import toast from "react-hot-toast";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);
  const [imageUrl, setImageUrl] = useState(userInfo ? userInfo.images : "");
  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.userUpdateProfile
  );

  const { isLoading: deleteLoading, isError: deleteError } = useSelector(
    (state) => state.userDeleteProfile
  );
  //validate user
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ProfileValidation),
  });

  //on Submit
  const updateUser = (data) => {
    // console.log("check data:", { ...data, image: imageUrl });
    dispatch(updateProfileAction({ ...data, images: imageUrl }));
  };

  //delete Submit
  const deleteProfile = () => {
    window.confirm("Are you sure you want to delete your profile!") &&
      dispatch(deleteProfileAction());
  };

  //useEFfect
  useEffect(() => {
    if (userInfo) {
      setValue("fullName", userInfo?.fullName);
      setValue("email", userInfo?.email);
    }
    if (isSuccess) {
      dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
    }
    if (isError || deleteError) {
      toast.error(isError);
    }
  }, [userInfo, setValue, isError, dispatch, isSuccess, deleteError]);

  return (
    <SideBar>
      <form onSubmit={handleSubmit(updateUser)} className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Profile</h2>
        <div className="w-full grid lg:grid-cols-12 gap-6">
          <div className="col-span-10">
            <Uploder setImageUrl={setImageUrl} />
          </div>
          <div className="col-span-2">
            <ImagePreview
              image={imageUrl}
              name={userInfo ? userInfo.fullName : "netflixo react tailwind"}
            />
          </div>
        </div>
        <div className="w-full">
          <Input
            label="FullName"
            placeholder="Netflixo react tailwind"
            type="text"
            name="fullName"
            register={register("fullName")}
            bg={true}
          />
          {errors.fullName && <InlineError text={errors.fullName.message} />}
        </div>
        <div className="w-full">
          <Input
            label="Email"
            placeholder="netflixo@gmail.com"
            type="email"
            name="email"
            register={register("email")}
            bg={true}
          />
          {errors.email && <InlineError text={errors.email.message} />}
        </div>
        <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
          <button
            onClick={deleteProfile}
            disabled={deleteLoading || isLoading}
            className="bg-subMain font-medium transitions hover:bg-main border border-subMain flex-rows gap-4 text-white py-3 px-6 rounded w-full sm:w-auto "
          >
            {isLoading ? "Deleting..." : "Delete Account"}
          </button>
          <button className="bg-main font-medium transitions hover:bg-subMain text-white py-3 px-6 rounded w-full sm:w-auto ">
            {isLoading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </SideBar>
  );
}
