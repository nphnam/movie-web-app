import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movies } from "../Data/MoviesData";
import Layout from "./../Layout/Layout";
import MovieInfo from "../Components/Single/MovieInfo";
import MovieCasts from "./../Components/Single/MovieCasts";
import MovieRates from "../Components/Single/MovieRates";
import { BsCollectionFill } from "react-icons/bs";
import Title from "./../Components/Title";
import Movie from "../Components/Movie";
import ShareMovieModal from "../Components/Modals/ShareModal";
import { useDispatch, useSelector } from "react-redux";
import { getMovieByIdAction } from "../Redux/Actions/MoviesActions";
import Loader from "../Components/Notifications/Loader";
import { RiMovie2Fill, RiMovie2Line } from "react-icons/ri";
import { SidebarContext } from "../Context/DrawerContext";
import { DownloadVideo } from "../Context/Functionalities";
import FileSaver from "file-saver";

export default function SingleMovie() {
  const [modalOpen, setModalOpen] = useState(false);
  const { progress, setProgress } = useContext(SidebarContext);

  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    isLoading,
    isError,
    movie: currentMovie,
  } = useSelector((state) => state.getMovieById);
  const { movies } = useSelector((state) => state.getRandomMovies);
  const sameClass = "w-full gap-6 flex-colo min-h-screen";

  //use Selector
  const RelatedMovies = movies?.filter((movie) => {
    // Loại bỏ movie hiện tại
    if (movie?._id === currentMovie?._id) {
      return false;
    }

    // Lọc theo cùng category
    return movie?.category === currentMovie?.category;
  });

  //download movie video
  const DownloadMovieVideo = async (videoUrl, name) => {
    await DownloadVideo(videoUrl, setProgress).then((data) => {
      setProgress(0);
      FileSaver.saveAs(data, name);
    });
  };

  useEffect(() => {
    //movie id
    dispatch(getMovieByIdAction(id));
  }, [dispatch, id]);
  // console.log("check id", id);

  return (
    <Layout>
      {isLoading ? (
        <div className={sameClass}>
          <Loader />
        </div>
      ) : isError ? (
        <div>
          <div className="flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-dry text">
            <RiMovie2Line />
          </div>
          <p className="text-border text-sm">Something went wrong </p>
        </div>
      ) : (
        <>
          <ShareMovieModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            movie={currentMovie}
          />
          <MovieInfo
            movie={currentMovie}
            setModalOpen={setModalOpen}
            DownloadVideo={DownloadMovieVideo}
            progress={progress}
          />
          <div className="container mx-auto min-h-screen px-2 my-6">
            <MovieCasts movie={currentMovie} />
            {/*Rate*/}
            <MovieRates movie={currentMovie} />
            {/*Related*/}

            {RelatedMovies.length > 0 && (
              <div className="my-16">
                <Title title="Related Movies" Icon={BsCollectionFill} />
                <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid:col-3 sm:grid-cols-2 gap-6">
                  {RelatedMovies.map((movie) => (
                    <Movie key={movie?._id} movie={movie} />
                  ))}
                  {}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </Layout>
  );
}
