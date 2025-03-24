import React, { useEffect, useState } from "react";
import MainModal from "./MainModal";
import { Input } from "../UserInputs";
import { HiPlus, HiPlusCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategoryAction,
  getAllCategoriesAction,
  updateCategoryAction,
} from "../../Redux/Actions/CategoriesActions";
import toast from "react-hot-toast";

function CategoryModal({ modalOpen, setModalOpen, category }) {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  // console.log("check", modalOpen, category);
  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.categoryCreate
  );

  const {
    isLoading: upLoading,
    isError: upError,
    isSuccess: upSuccess,
  } = useSelector((state) => state.categoryCreate);

  //categort handler
  const submitHandler = (e) => {
    e.preventDefault();
    if (title) {
      //if category is not empty then update category else create category

      if (category) {
        dispatch(updateCategoryAction(category?._id, { title: title }));
        setModalOpen(!modalOpen);
      } else {
        dispatch(
          createCategoryAction({
            title: title,
          })
        );
        setTitle("");
        dispatch({ type: "CREATE_CATEGORY_RESET" });
        setModalOpen(false);
      }
    } else {
      toast.error("Please write a category name");
    }
  };
  useEffect(() => {
    // error
    if (upError || isError) {
      toast.error(upError || isError);

      dispatch({
        type: isError ? "CREATE_CATEGORY_RESET" : "UPDATE_CATEGORY_RESET",
      });
    }

    // success
    if (isSuccess || upSuccess) {
      modalOpen = false;
      dispatch({
        type: isError ? "CREATE_CATEGORY_RESET" : "UPDATE_CATEGORY_RESET",
      });
    }
    //if category is not null then set title to category title
    if (category) {
      setTitle(category?.title);
    }
    if (modalOpen === false) {
      setTitle("");
    }
  }, [isError, isSuccess, upSuccess, upError, category, modalOpen]);
  console.log(
    "check upSucces v isSuccess",
    category,
    isSuccess,
    upSuccess,
    isLoading,
    title
  );
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl">
        <h2 className="text-3xl font-bold">{category ? "Update" : "Create"}</h2>
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-6 text-left mt-6"
        >
          <Input
            label="Category Name"
            placeholder={category ? category.title : "Actions"}
            type="text"
            bg={false}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            disabled={isLoading || upLoading}
            type="submit"
            className="w-full flex-rows py-3 font-bold  hover:bg-transparent border-2 border-subMain rounded bg-subMain text-white"
          >
            {isLoading || upLoading
              ? "Loading..."
              : category
              ? "Update"
              : "Create"}
          </button>
        </form>
      </div>
    </MainModal>
  );
}

export default CategoryModal;
