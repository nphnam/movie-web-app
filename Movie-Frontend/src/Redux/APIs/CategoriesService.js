import Axios from "./Axios";

//Get all Categories API function
const getCategoriesService = async () => {
  const { data } = await Axios.get("/categories");
  // console.log("check data", data);
  return data;
};

// create new category API Function
const createCategoryService = async (title, token) => {
  const { data } = await Axios.post("/categories", title, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// ********************** ADMIN APIS
//delete category API function
const deleteCategoryService = async (id, token) => {
  const { data } = await Axios.delete(`/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

//update category API function
const updateCategoryService = async (id, title, token) => {
  const { data } = await Axios.put(`/categories/${id}`, title, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export {
  getCategoriesService,
  createCategoryService,
  updateCategoryService,
  deleteCategoryService,
};
