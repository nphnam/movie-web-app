import * as moviesAPIs from "../APIs/MoviesService";
import * as moviesConstants from "../Constants/MoviesContants";

import toast from "react-hot-toast";
import { ErrorsAction, tokenProtection } from "../Protection";
import { MOVIE_RANDOM_SUCCESS } from "./../Constants/MoviesContants";

//get all movies action
export const getAllMoviesAction =
  ({
    category = "",
    time = "",
    language = "",
    rate = "",
    year = "",
    search = "",
    pageNumber = "",
  }) =>
  async (dispatch) => {
    try {
      dispatch({ type: moviesConstants.MOVIES_LIST_REQUEST });
      const response = await moviesAPIs.getAllMoviesService(
        category,
        time,
        language,
        rate,
        year,
        search,
        pageNumber
      );
      console.log('check all', response);
      dispatch({
        type: moviesConstants.MOVIES_LIST_SUCCESS,
        payload: response,
      });

      // console.log("check data", response);
    } catch (error) {
      console.log(error);
      ErrorsAction(error, dispatch, moviesConstants.MOVIES_LIST_FAIL);
    }
  };

//get random movies action
export const getRandomMoviesAction = () => async (dispatch) => {
  try {
    dispatch({ type: moviesConstants.MOVIE_RANDOM_REQUEST });

    const res = await moviesAPIs.getRandomMoviesService();
    dispatch({ type: moviesConstants.MOVIE_RANDOM_SUCCESS, payload: res });
  } catch (err) {
    ErrorsAction(err, dispatch, moviesConstants.MOVIE_RANDOM_FAIL);
  }
};

//get  movie by id action
export const getMovieByIdAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: moviesConstants.MOVIE_DETAILS_REQUEST });
    let res = await moviesAPIs.getMovieByIdService(id);

    if (!res) {
      throw new Error("No Movie Found");
    }
    dispatch({ type: moviesConstants.MOVIE_DETAILS_SUCCESS, payload: res });
  } catch (e) {
    ErrorsAction(e, dispatch, moviesConstants.MOVIE_DETAILS_FAIL);
  }
};

//get top rated movie action

export const getTopRatedMovieAction = () => async (dispatch) => {
  try {
    dispatch({ type: moviesConstants.MOVIE_TOP_RATED_REQUEST });
    const response = await moviesAPIs.getTopRatedMoviesService();
    dispatch({
      type: moviesConstants.MOVIE_TOP_RATED_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, moviesConstants.MOVIE_TOP_RATED_FAIL);
  }
};

// create review movie action

export const createReviewAction =
  ({ id, review }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: moviesConstants.CREATE_REVIEW_REQUEST });
      const response = await moviesAPIs.reviewMovieService(
        tokenProtection(getState),
        id,
        review
      );
      dispatch({
        type: moviesConstants.CREATE_REVIEW_SUCCESS,
        payload: response,
      });
      toast.success("Your Review has been submitted successfully");
      dispatch({ type: moviesConstants.CREATE_REVIEW_RESET });
      dispatch(getMovieByIdAction(id));
    } catch (error) {
      ErrorsAction(error, dispatch, moviesConstants.CREATE_REVIEW_FAIL);
    }
  };

//delete movie action
export const deleteMovieAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: moviesConstants.DELETE_MOVIE_REQUEST });
    const response = await moviesAPIs.deleteMovieService(
      tokenProtection(getState),
      id
    );
    dispatch({ type: moviesConstants.DELETE_MOVIE_SUCCESS, payload: response });
    toast.success("Movie deleted successfully");
  } catch (error) {
    ErrorsAction(error, dispatch, moviesConstants.DELETE_MOVIE_FAIL);
  }
};

// delete all movies action
export const deleteAllMoviesAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: moviesConstants.DELETE_ALL_MOVIES_REQUEST });
    const response = await moviesAPIs.deleteAllMoviesService(
      tokenProtection(getState)
    );
    dispatch({
      type: moviesConstants.DELETE_ALL_MOVIES_SUCCESS,
      payload: response,
    });
    toast.success("All movie deleted successfully");
    dispatch(getAllMoviesAction({}));
  } catch (error) {
    ErrorsAction(error, dispatch, moviesConstants.DELETE_ALL_MOVIES_FAIL);
  }
};

// create movie action
export const createMovieAction = (movie) => async (dispatch, getState) => {
  try {
    dispatch({ type: moviesConstants.CREATE_MOVIE_REQUEST });
    const response = await moviesAPIs.createMovieService(
      tokenProtection(getState),
      movie
    );
    dispatch({ type: moviesConstants.CREATE_MOVIE_SUCCESS, payload: response });
    toast.success("Movie created successfully");
    dispatch(deleteAllCastAction({}));
  } catch (error) {
    ErrorsAction(error, dispatch, moviesConstants.CREATE_MOVIE_RESET);
  }
};

// ******** CAST *******

// add cast
export const addCastAction = (cast) => async (dispatch, getState) => {
  dispatch({ type: moviesConstants.ADD_CAST, payload: cast });
  localStorage.setItem("cast", JSON.stringify(getState().casts.casts));
};

// remove cast
export const removeCastAction = (id) => async (dispatch, getState) => {
  dispatch({ type: moviesConstants.DELETE_CAST, payload: id });
  localStorage.setItem("cast", JSON.stringify(getState().casts.casts));
};

// update cast
export const updateCastAction = (cast) => async (dispatch, getState) => {
  dispatch({ type: moviesConstants.EDIT_CAST, payload: cast });
  localStorage.setItem("cast", JSON.stringify(getState().casts.casts));
};

// delete all cast
export const deleteAllCastAction = () => async (dispatch, getState) => {
  dispatch({ type: moviesConstants.RESET_CAST });
  localStorage.removeItem("casts");
};

// update movie action
export const updateMovieAction = (id, movie) => async (dispatch, getState) => {
  try {
    dispatch({ type: moviesConstants.UPDATE_MOVIE_REQUEST });
    const response = await moviesAPIs.updateMovieService(
      tokenProtection(getState),
      id,
      movie
    );

    dispatch({ type: moviesConstants.UPDATE_MOVIE_SUCCESS, payload: response });
    toast.success("Movie updated successfully");
    dispatch(getMovieByIdAction(id));
  } catch (error) {
    ErrorsAction(error, dispatch, moviesConstants.UPDATE_MOVIE_FAIL);
  }
};
