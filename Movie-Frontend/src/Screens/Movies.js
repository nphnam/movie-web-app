import React, { useEffect, useMemo, useState } from "react";
import Layout from "../Layout/Layout";
import Filter from "../Components/Filter";
import Movie from "../Components/Movie";
import { Movies } from "../Data/MoviesData";
import { CgSpinner } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loader from "../Components/Notifications/Loader";
import { TbPlayerTrackPrev, TbPlayerTrackNext } from "react-icons/tb";
import { RiMovie2Line } from "react-icons/ri";
import { getAllMoviesAction } from "../Redux/Actions/MoviesActions";
import {
  LanguagesData,
  RatesData,
  TimesData,
  YearData,
} from "../Data/FilterData";
import { useParams } from "react-router-dom";
export default function MoviesPage() {
  const { search } = useParams();
  const dispatch = useDispatch();
  const [category, setCategory] = useState({ title: "All Categories" });
  const [year, setYear] = useState(YearData[0]);
  const [times, setTimes] = useState(TimesData[0]);
  const [rates, setRates] = useState(RatesData[0]);
  const [language, setLanguage] = useState(LanguagesData[0]);
  // dispatch(getAllMoviesAction());
  // all movies
  const { isLoading, isError, movies, pages, page } = useSelector(
    (state) => state.getAllMovies
  );
  console.log(' check all movie:', movies);
  // get all categories
  const { categories } = useSelector((state) => state.categoryGetAll);
  const sameClass =
    "text-white p-2 rounded font-semibold border-2 border-subMain hover:bg-subMain";

  const queries = useMemo(() => {
    const query = {
      category: category?.title === "All Categories" ? "" : category?.title,
      times: times?.title.replace(/\D/g, ""),
      language: language?.title === "Sort by Language" ? "" : language?.title,
      rate: rates?.title.replace(/\D/g, ""),
      year: year?.title.replace(/\D/g, ""),
      search: search ? search : "",
    };
    return query;
  }, [category, times, language, rates, year, search]);

  //useEffect
  useEffect(() => {
    // errors
    if (isError) {
      toast.error(isError);
    }
    //get all movie
    dispatch(getAllMoviesAction(queries));
  }, [dispatch, isError, queries]);

  const nextpage = () => {
    dispatch(
      getAllMoviesAction({
        ...queries,
        pageNumber: page + 1,
      })
    );
  };

  const prevpage = () => {
    dispatch(
      getAllMoviesAction({
        ...queries,

        pageNumber: page - 1,
      })
    );
  };
  const datas = {
    categories: categories,
    category: category,
    setCategory: setCategory,
    language: language,
    setLanguage: setLanguage,
    rates: rates,
    setRates: setRates,
    times: times,
    setTimes: setTimes,
    year: year,
    setYear: setYear,
  };
  // console.log("check search: ", search);
  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Filter data={datas} />
        <p className="text-lg font-medium my-6">
          Total
          <span className="font-bold text-subMain ">
            {" "}
            {movies ? movies?.length : "0"}{" "}
          </span>
          Item Found {search && `for "${search}"`}
        </p>
        {isLoading ? (
          <div className={sameClass}>
            <Loader />
          </div>
        ) : movies?.length > 0 ? (
          <>
            <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid:col-3 sm:grid-cols-2 gap-6">
              {movies.map((movie, index) => (
                <Movie key={index} movie={movie} />
              ))}
            </div>
            <div className="w-full flex-rows gap-6 md:my-20 my-10">
              <button
                onClick={prevpage}
                disabled={page === 1}
                className={sameClass}
              >
                <TbPlayerTrackPrev className="text-xl" />
              </button>
              <button
                onClick={nextpage}
                disabled={page === pages}
                className={sameClass}
              >
                <TbPlayerTrackNext className="text-xl" />
              </button>
            </div>
          </>
        ) : (
          <div className="w-full gap-6 flex-colo min-h-screen">
            <div className="w-24 h-24 p-5 rounded-full mb-4 bg-main text-subMain text-4xl flex-colo">
              <RiMovie2Line />
            </div>
            <p className="text-border text-sm">
              It seem's like wwe don't any have movies
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
