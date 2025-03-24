import React, { Profiler, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import AboutUs from "./Screens/AboutUs";
import NotFound from "./Screens/NotFound";
import ContactUs from "./Screens/ContactUs";
import MoviesPage from "./Screens/Movies";
import SingleMovie from "./Screens/SingleMovie";
import WatchPage from "./Screens/WatchPage";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import Profile from "./Screens/Dashboard/Profile";
import AOS from "aos";
import "aos/dist/aos.css";
import Password from "./Screens/Dashboard/Password";
import FavoritiesMovies from "./Screens/Dashboard/FavoritiesMovies";
import MovieList from "./Screens/Dashboard/Admin/MovieList";
import Dashboard from "./Screens/Dashboard/Admin/Dashboard";
import Categories from "./Screens/Dashboard/Admin/Categories";
import Users from "./Screens/Dashboard/Admin/Users";
import AddMovie from "./Screens/Dashboard/Admin/AddMovie";
import Test from "./Screens/Test";
import ScrollOnTop from "./ScrollOnTop";
import SidebarContext from "./Context/DrawerContext";
import ToastContainer from "./Components/Notifications/ToastContainer";
import DrawerContext from "./Context/DrawerContext";
import { AdminProtectedRouter, ProtectedRouter } from "./ProtectedRouter";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoriesAction } from "./Redux/Actions/CategoriesActions";
import { getAllMoviesAction } from "./Redux/Actions/MoviesActions";
import { getFavoriteMoviesAction } from "./Redux/Actions/userActions";
import toast from "react-hot-toast";
import EditMovie from "./Screens/Dashboard/Admin/EditMovie";
function App() {
  AOS.init();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { isError, isSuccess } = useSelector((state) => state.userLikeMovie);

  const { isError: catError } = useSelector((state) => state.categoryGetAll);

  useEffect(() => {
    dispatch(getAllCategoriesAction());
    dispatch(getAllMoviesAction({}));
    if (userInfo) {
      dispatch(getFavoriteMoviesAction());
    }
    if (isError || catError) {
      toast.error(isError || catError);
      dispatch({ type: "LIKE_MOVIE_RESET" });
    }
    if (isSuccess) {
      dispatch({ type: "LIKE_MOVIE_RESET" });
    }
  }, []);

  return (
    <>
      <DrawerContext>
        <ToastContainer />
        <ScrollOnTop>
          <Routes>
            {/**********PUBLIC ROUTERS*********/}
            <Route path="/" element={<HomeScreen />}></Route>
            <Route path="/about-us" element={<AboutUs />}></Route>
            <Route path="/contact-us" element={<ContactUs />}></Route>
            <Route path="/movies" element={<MoviesPage />}></Route>
            <Route path="/movies/:search" element={<MoviesPage />}></Route>

            <Route path="/movie/:id" element={<SingleMovie />}></Route>
            <Route path="/watch/:id" element={<WatchPage />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="*" element={<NotFound />}></Route>

            {/**********PRIVATE ROUTERS*********/}

            <Route element={<ProtectedRouter />}>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/password" element={<Password />}></Route>
              <Route path="/favorites" element={<FavoritiesMovies />}></Route>
            </Route>

            {/**********ADMIN ROUTERS*********/}
            <Route element={<AdminProtectedRouter />}>
              <Route path="/movieslist" element={<MovieList />}></Route>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/categories" element={<Categories />}></Route>
              <Route path="/users" element={<Users />}></Route>
              <Route path="/addmovie" element={<AddMovie />}></Route>
              <Route path="/edit/:id" element={<EditMovie />}></Route>

              <Route path="/test" element={<Test />}></Route>
            </Route>
          </Routes>
        </ScrollOnTop>
      </DrawerContext>
    </>
  );
}

export default App;
