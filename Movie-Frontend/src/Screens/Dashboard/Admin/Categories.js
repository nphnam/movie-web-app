import React, { useEffect, useState } from "react";
import SideBar from "./../SideBar";
import { Movies } from "./../../../Data/MoviesData";
import Table from "./../../../Components/Table";
import { HiPlus, HiPlusCircle } from "react-icons/hi";
import Table2 from "../../../Components/Table2";
import { CategoriesData } from "../../../Data/CategoriesData";
import CategoryModal from "../../../Components/Modals/CategoryModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategoryAction,
  getAllCategoriesAction,
} from "../../../Redux/Actions/CategoriesActions";
import Loader from "../../../Components/Notifications/Loader";
import { Empty } from "../../../Components/Notifications/Empty";
import { toast } from "react-hot-toast";

export default function Categories() {
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState();
  const dispatch = useDispatch();

  //get all categories
  const { categories, isLoading } = useSelector(
    (state) => state.categoryGetAll
  );

  //delete category
  const { isSuccess, isError } = useSelector((state) => state.categoryDelete);
  const adminDeleteCategory = (id) => {
    if (window.confirm("Are you sure you want to delete this category")) {
      dispatch(deleteCategoryAction(id));
    }
  };

  const onEditFunction = (id) => {
    setCategory(id);
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    dispatch(getAllCategoriesAction());
    if (isError) {
      toast.error(isError);
      dispatch({
        type: "DELETE_CATEGORY_RESET",
      });
    }

    if (modalOpen === false) {
      setCategory();
    }
  }, [modalOpen, isError, isSuccess]);
  return (
    <SideBar>
      <CategoryModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        category={category}
      />
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Movies List</h2>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-subMain flex-rows gap-4 font-medium transitions hover:bg-main border border-subMain text-white py-2 px-4 rounded w-full sm:w-auto"
          >
            <HiPlusCircle />
            Create
          </button>
        </div>
        {isLoading ? (
          <Loader />
        ) : categories?.length > 0 ? (
          <Table2
            data={categories}
            users={false}
            OnEditFunction={onEditFunction}
            OnDeleteFunction={adminDeleteCategory}
          />
        ) : (
          <Empty message="You have no category" />
        )}
      </div>
    </SideBar>
  );
}
