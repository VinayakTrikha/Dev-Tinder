import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser } from "../slices/userSlice";
import * as profileService from "../services/profile.service";

const Layout = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUserInfo = async () => {
    try {
      const response = await profileService.fetchUserInfo();
      const userData = response.data;
      dispatch(addUser(userData.responseData));
    } catch (error) {
      navigate("login");
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUserInfo();
    }
  }, []);

  return (
    <>
      <NavBar />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
