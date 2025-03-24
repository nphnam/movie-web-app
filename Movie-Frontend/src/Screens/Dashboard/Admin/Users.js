import React from "react";
import SideBar from "./../SideBar";
import { Movies } from "./../../../Data/MoviesData";
import Table from "./../../../Components/Table";
import { HiPlus, HiPlusCircle } from "react-icons/hi";
import Table2 from "../../../Components/Table2";
import { CategoriesData } from "../../../Data/CategoriesData";
import { UsersData } from "./../../../Data/UsersData";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFavoriteMoviesAction,
  deleteUsersAction,
  getAllUsersAction,
} from "../../../Redux/Actions/userActions";
import Loader from "../../../Components/Notifications/Loader";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Empty } from "../../../Components/Notifications/Empty";

export default function Users() {
  const dispatch = useDispatch();

  const { isLoading, isError, users } = useSelector(
    (state) => state.adminGetAllUsers
  );
  //delete

  const {
    isLoading: deletingLoading,
    isError: deleteError,
    isSuccess,
  } = useSelector((state) => state.adminDeleteUser);

  //delete user handler
  const deleteMoviesHandler = (id) => {
    console.log("check id", id);
    if (window.confirm("are you sure you want to delete all movies")) {
      dispatch(deleteUsersAction(id));
    }
  };

  //useEFfect
  useEffect(() => {
    dispatch(getAllUsersAction());
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({
        type: isError ? "GET_ALL_USERS_RESET" : "DELETE_USER_RESET",
      });
    }
  }, [isSuccess, isError, deleteError, dispatch]);

  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">User</h2>
        {isLoading ? (
          <Loader />
        ) : users?.length > 0 ? (
          <Table2
            data={users}
            users={true}
            OnDeleteFunction={deleteMoviesHandler}
          />
        ) : (
          <Empty message="You no have favorites movies" />
        )}
      </div>
    </SideBar>
  );
}
