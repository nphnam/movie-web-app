import React from "react";
import Movie from "../Movie";
import { Movies } from "./../../Data/MoviesData";
import { BsCollectionFill } from "react-icons/bs";
import Title from "../Title";
import { Empty } from "../Notifications/Empty";
import Loader from "../Notifications/Loader";
function PoppularMovies({ isLoading, movies }) {
  return (
    <div className="my-16">
      <Title title="Popular Movies" Icon={BsCollectionFill} />
      {isLoading ? (
        <Loader />
      ) : movies?.length > 0 ? (
        <div className="grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
          {movies.slice(0, 8).map((movie, index) => (
            <Movie key={index} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="mt-6">
          <Empty message="It seem's like we don't have any movie" />
        </div>
      )}
    </div>
  );
}

export default PoppularMovies;
