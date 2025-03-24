import React, { useContext, useEffect, useState } from "react";
import Layout from "./../Layout/Layout";
import { Link, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { FaCloudDownloadAlt, FaHeart, FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getMovieByIdAction } from "../Redux/Actions/MoviesActions";
import Loader from "../Components/Notifications/Loader";
import { RiMovie2Line } from "react-icons/ri";
import {
  DownloadVideo,
  IfMovieLiked,
  LikeMovie,
} from "../Context/Functionalities";
import FileSaver from "file-saver";
import { SidebarContext } from "../Context/DrawerContext";

export default function WatchPage() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const { progress, setProgress } = useContext(SidebarContext);

  const [play, setPlay] = useState(false);
  const sameClass = "w-full gap-6 flex-colo min-h-screen";
  // use selector
  const { isLoading, isError, movie } = useSelector(
    (state) => state.getMovieById
  );

  const { isLoading: likeLoading } = useSelector(
    (state) => state.userLikeMovie
  );
  const { userInfo } = useSelector((state) => state.userLogin);
  // if liked function
  const isLiked = (movie) => IfMovieLiked(movie);
  //download movie video
  const DownloadMovieVideo = async (videoUrl, name) => {
    await DownloadVideo(videoUrl, setProgress).then((data) => {
      setProgress(0);
      FileSaver.saveAs(data, name);
    });
  };
  //use Effect
  useEffect(() => {
    //movie id
    dispatch(getMovieByIdAction(id));
  }, [dispatch, id]);
  console.log("check error", movie?.video);
  return (
    <Layout>
      <div className="container mx-auto bg-dry p-6 mb-12">
        {!isError && (
          <div className="flex-btn flex-wrap mb-6 gap-2 bg-main rounded border border-gray-8">
            <Link
              to={`/movie/${movie?._id}`}
              className="md:text-xl text-sm flex gap-3 items-center font-bold text-dryGray "
            >
              <BiArrowBack /> {movie?.name}
            </Link>
            <div className="flex-btn sm:w-auto w-full gap-5 ">
              <button
                onClick={() => LikeMovie(movie, dispatch, userInfo)}
                disabled={isLiked(movie) || isLoading}
                className={` hover:text-subMain transitions   rounded px-4 py-3 text-sm
              ${
                isLiked(movie)
                  ? "text-subMain bg-white bg-opacity-90 "
                  : "text-white bg-white bg-opacity-30"
              }
              
              `}
              >
                <FaHeart />
              </button>

              <button
                disabled={progress > 0 && progress < 100}
                onClick={() => DownloadMovieVideo(movie?.video, movie?.name)}
                className="bg-subMain hover:text-main flex-rows transitions text-white rounded px-8 font-medium py-3 text-sm"
              >
                <FaCloudDownloadAlt /> Download
              </button>
            </div>
          </div>
        )}

        {/*watch video*/}
        {play ? (
          <video
            src={movie?.video}
            controls
            autoPlay={play}
            className="w-full h-[40rem] rounded-lg overflow-hidden relative"
          >
            <source src={movie?.video} type="video/mp4" title={movie?.name} />
          </video>
        ) : (
          <div className="w-full h-screen rounded-lg overflow-hidden relative">
            {isLoading ? (
              <div className={sameClass}>
                <Loader />
              </div>
            ) : isError ? (
              <div className={sameClass}>
                <div className="flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMain text-4xl">
                  <RiMovie2Line />
                </div>
                <p className="text-border text-sm">{isError}</p>
              </div>
            ) : (
              <>
                <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-main bg-opacity-30 flex-colo">
                  <button
                    onClick={() => setPlay(true)}
                    className="bg-white text-subMain flex-colo border border-subMain rounded-full w-20 h-20 font-medium text-xl"
                  >
                    <FaPlay />
                  </button>
                </div>
                <img
                  src={
                    movie?.image
                      ? `/images/movies/${movie.image}`
                      : "images/user.png"
                  }
                  alt={movie?.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
