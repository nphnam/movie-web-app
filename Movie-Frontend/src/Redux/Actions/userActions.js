import * as userConstants from "../Constants/userConstants";
import * as userApi from "../APIs/userServices";
import toast from "react-hot-toast";
import { ErrorsAction, tokenProtection } from "../Protection";

//login action
const loginAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_LOGIN_REQUEST });
    const response = await userApi.loginService(data);
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_LOGIN_FAIL);
  }
};

//register action
const registerAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST });
    const response = await userApi.registerService(data);
    
    dispatch({ type: userConstants.USER_REGISTER_SUCCESS, payload: response });
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_REGISTER_FAIL);
  }
};

//log out action
const logoutAction = () => (dispatch) => {
  userApi.logoutService();
  dispatch({ type: userConstants.USER_LOGOUT });
  dispatch({ type: userConstants.USER_LOGIN_RESET });
  dispatch({ type: userConstants.USER_REGISTER_RESET });
};

// update profile action
const updateProfileAction = (user) => async (dispatch, getState) => {
  // console.log("check token:", tokenProtection(getState));

  try {
    dispatch({ type: userConstants.USER_UPDATE_PROFILE_REQUEST });
    const response = await userApi.updateProfileService(
      user,
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.USER_UPDATE_PROFILE_SUCCESS,
      payload: response,
    });
    toast.success("Profile Updated");
    dispatch({
      type: userConstants.USER_UPDATE_PROFILE_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_UPDATE_PROFILE_FAIL);
  }
};

//delete profile action
const deleteProfileAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_DELETE_PROFILE_REQUEST });
    const response = await userApi.deleteProfileService(
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.USER_DELETE_PROFILE_SUCCESS,
    });
    toast.success("Profile Deleted");
    dispatch(logoutAction());
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_UPDATE_PROFILE_FAIL);
    dispatch({ type: userConstants.USER_DELETE_PROFILE_RESET });
  }
};

//change password action
const changePasswordAction = (passwords) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_CHANGE_PASSWORD_REQUEST });
    const response = await userApi.changePasswordService(
      passwords,
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.USER_CHANGE_PASSWORD_SUCCESS,
      payload: response,
    });
    toast.success("Password Changed");
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_CHANGE_PASSWORD_FAIL);
    // dispatch({ type: userConstants.USER_CHANGE_PASSWORD_RESET });
  }
};

// get all favorite movies action

const getFavoriteMoviesAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_GET_FAVORITE_MOVIES_REQUEST });
    const response = await userApi.getFavoriteMoviesService(
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.USER_GET_FAVORITE_MOVIES_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_GET_FAVORITE_MOVIES_FAIL);
    console.log("check error", error);
  }
};

// delete favorites movie action
const deleteFavoriteMoviesAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_DELETE_FAVORITE_MOVIES_REQUEST });
    await userApi.deleteFavoriteMoviesService(tokenProtection(getState));
    dispatch({
      type: userConstants.USER_DELETE_FAVORITE_MOVIES_SUCCESS,
    });
    toast.success("All Favorite Movies Deleted");
  } catch (error) {
    ErrorsAction(
      error,
      dispatch,
      userConstants.USER_DELETE_FAVORITE_MOVIES_FAIL
    );
    console.log("check error", error);
  }
};

const deleteFavoriteMovieByIdAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_DELETE_FAVORITE_MOVIES_BY_ID_REQUEST });
    await userApi.deleteFavoritesMovieService(id, tokenProtection(getState))
    dispatch({
      type: userConstants.USER_DELETE_FAVORITE_MOVIES_BY_ID_SUCCESS,
    });
    toast.success("Favorite Movie Delete")
    
  } catch (error) {
        ErrorsAction(
          error,
          dispatch,
          userConstants.USER_DELETE_FAVORITE_MOVIES_FAIL
        );
        console.log("check error", error);
  }
}

//admin get all users action
const getAllUsersAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.DELETE_USER_REQUEST });
    const response = await userApi.getAllUserService(tokenProtection(getState));
    dispatch({
      type: userConstants.GET_ALL_USERS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.GET_ALL_USERS_FAIL);
  }
};

//admin delete users action
const deleteUsersAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.DELETE_USER_REQUEST });
    const response = await userApi.deleteUserService(
      id,
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.DELETE_USER_SUCCESS,
      payload: response,
    });
    toast.success("User deleted");
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.GET_ALL_USERS_FAIL);
  }
};

//user like movie action
const likeMovieAction = (movieId) => async (dispatch, getState) => {
  console.log("check id", movieId);
  try {
    dispatch({ type: userConstants.LIKE_MOVIE_REQUEST });
    const response = await userApi.likedMovieService(
      movieId,
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.LIKE_MOVIE_SUCCESS,
      payload: response,
    });
    toast.success("Movie added to your favorites");
    dispatch(getFavoriteMoviesAction());
  } catch (error) {
    console.log("check error", error);
    ErrorsAction(error, dispatch, userConstants.LIKE_MOVIE_FAIL);
  }
};

export {
  loginAction,
  registerAction,
  logoutAction,
  updateProfileAction,
  deleteProfileAction,
  changePasswordAction,
  getFavoriteMoviesAction,
  deleteFavoriteMoviesAction,
  deleteFavoriteMovieByIdAction,
  getAllUsersAction,
  deleteUsersAction,
  likeMovieAction,
};
