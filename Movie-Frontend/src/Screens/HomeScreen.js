import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import Banner from "../Components/Home/Banner";
import PoppularMovies from "../Components/Home/PoppularMovies";
import Promos from "./../Components/Home/Promos";
import TopRates from "../Components/Home/TopRates";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMoviesAction,
  getRandomMoviesAction,
  getTopRatedMovieAction,
} from "../Redux/Actions/MoviesActions";
import toast from "react-hot-toast";
function HomeScreen() {
  const dispatch = useDispatch();
  const {
    isLoading: randomLoading,
    isError: randomError,
    movies: randomMovies,
  } = useSelector((state) => state.getRandomMovies);

  const {
    isLoading: topLoading,
    isError: topError,
    movies: topMovies,
  } = useSelector((state) => state.getTopRatedMovies);
  const { isLoading, isError, movies } = useSelector(
    (state) => state.getAllMovies
  );

  // useEffect
  useEffect(() => {
    //get random movies
    dispatch(getRandomMoviesAction());
    //get all movies
    dispatch(getAllMoviesAction({}));
    //get top rated movies
    dispatch(getTopRatedMovieAction());
    if (isError || randomError || topError) {
      toast.error("Something went wrong");
    }
  }, []);
  // console.log("check top movie", topMovies);
  // console.log("check random movies", randomMovies);

  return (
    <Layout>
      <div className="container mx-auto min-h-scrren px-2 mb-6">
        <Banner movies={movies} isLoading={isLoading} />
        <PoppularMovies movies={randomMovies} isLoading={isLoading} />
        <Promos />
        <TopRates movies={topMovies} isLoading={topLoading} />
      </div>
    </Layout>
  );
}

export default HomeScreen;
