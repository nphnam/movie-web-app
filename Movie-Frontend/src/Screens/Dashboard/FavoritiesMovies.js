import React, { useContext, useEffect } from "react";
import SideBar from "./SideBar";
import Table from "../../Components/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFavoriteMovieByIdAction,
  deleteFavoriteMoviesAction,
  getFavoriteMoviesAction,
} from "../../Redux/Actions/userActions";
import toast from "react-hot-toast";
import Loader from "../../Components/Notifications/Loader";
import { Empty } from "./../../Components/Notifications/Empty";
import FileSaver from "file-saver";
import { SidebarContext } from "../../Context/DrawerContext";
import { DownloadVideo } from "../../Context/Functionalities";

export default function FavoritiesMovies() {
  const dispatch = useDispatch();
  const { progress, setProgress } = useContext(SidebarContext);

  const { isLoading, isError, likedMovies } = useSelector(
    (state) => state.userGetFavoriteMovies
  );

  const {
    isLoading: deleteLoading,
    isError: deleteError,
    reset,
    isSuccess: deleteSuccess,
  } = useSelector((state) => state.userDeleteFavoriteMovies);

  const {
    isLoading: deleteLikedMovieLoading,
    isError: deleteLikedMovieError,
    isSuccess: deleteLikedMovieSuccess,
  } = useSelector((state) => state.deleteLikedMovie);



  //delete movies handler
  const deleteMoviesHandler = () => {
    window.confirm("Are you sure you want to delete all movies") &&
      dispatch(deleteFavoriteMoviesAction());
  };
  const DeleteHandler =(id) => {
    window.confirm("Are you sure you want to delete all movies") &&
          dispatch(deleteFavoriteMovieByIdAction(id));
    if (deleteLikedMovieSuccess) {
      toast.success("Delete Favorite Movie Success!");
    } else {
      toast.error("Error when delete!");
    }

    

  };
  //download movie video
  const DownloadMovieVideo = async (videoUrl, name) => {
    await DownloadVideo(videoUrl, setProgress).then((data) => {
      setProgress(0);
      FileSaver.saveAs(data, name);
    });
  };
  useEffect(() => {
    dispatch(getFavoriteMoviesAction());
    if (isError || deleteError) {
      toast.error(isError || deleteError || deleteLikedMovieError);
      dispatch({
        type: isError
          ? "USER_GET_FAVORITE_MOVIES_RESET"
          : "DELETE_FAVORITE_MOVIES_RESET",
      });
    }
    // if (isSuccess) {
    //   reset();
    // }
  }, [dispatch, isError, deleteError, deleteSuccess, deleteLikedMovieError,deleteLikedMovieLoading,deleteLikedMovieSuccess]);

  // console.log("check like movie ", deleteSuccess);
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Favorites Movies</h2>
          {likedMovies?.length > 0 && (
            <button
              disabled={deleteLoading}
              onClick={deleteMoviesHandler}
              className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
            >
              {deleteLoading ? "Deleting..." : "Delete All"}
            </button>
          )}
        </div>
        {isLoading ? (
          <Loader />
        ) : likedMovies?.length > 0 ? (
          <Table
            data={likedMovies}
            admin={false}
            onDeleteHandler={DeleteHandler}
            downloadVideo={DownloadMovieVideo}
            progress={progress}
          />
        ) : (
          <Empty message="No Movies found" />
        )}
      </div>
    </SideBar>
  );
}
