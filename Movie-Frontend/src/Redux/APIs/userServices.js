import Password from "../../Screens/Dashboard/Password";
import Axios from "./Axios";

//register new user API call

const registerService = async (user) => {
  const { data } = await Axios.post("/users", user);
  
  if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data));
    console.log('check error', data);
  }
  return data;
};

//log out user Function
const logoutService = () => {
  localStorage.removeItem("userInfo");
  return null;
};

//log in user API call
const loginService = async (user) => {
  const { data } = await Axios.post("/users/login", user);
  if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data));
  }
  return data;
};

// update profile API call
const updateProfileService = async (user, token) => {
  console.log("check user:", user);
  const { data } = await Axios.put("/users", user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data));
  }
  return data;
};

// delete profile API call
const deleteProfileService = async (token) => {
  const { data } = await Axios.delete("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (data) {
    localStorage.removeItem("userInfo");
    return data;
  }
};

//change password API call
const changePasswordService = async (password, token) => {
  const { data } = await Axios.put("users/password", password, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log("check data", data);
  return data;
};

//get all favorite movies
const getFavoriteMoviesService = async (token) => {
  // console.log("check token", token);
  const { data } = await Axios.get("/users/favorities", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log("check error data", data);
  return data;
};
//delete all favorite movies
const deleteFavoriteMoviesService = async (token) => {
  const { data } = await Axios.delete("/users/favorities", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

//admin get all users

const getAllUserService = async (token) => {
  const { data } = await Axios.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

//admin delete user
const deleteUserService = async (id, token) => {
  console.log("check id service: ", id);
  const { data } = await Axios.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// like movie API call

const likedMovieService = async (movieId, token) => {
  // console.log("check movieId: ", movieId);
  const { data } = await Axios.post(`/users/favorities`, movieId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const deleteFavoritesMovieService = async (movieId,token) => {
  console.log("token", token);
    const { data } = await Axios.delete(`/users/favoritesMovie/${movieId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  console.log('check data', data);
  return data;
}
export {
  registerService,
  loginService,
  logoutService,
  updateProfileService,
  deleteProfileService,
  changePasswordService,
  getFavoriteMoviesService,
  deleteFavoriteMoviesService,
  deleteFavoritesMovieService,
  getAllUserService,
  deleteUserService,
  likedMovieService,
};
