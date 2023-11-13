import { api } from "~/utils/api";

export const useCategory = () => {
  const getAllCategories = api.categories.getAllCategories;
  const addCategory = api.categories.add.useMutation({
    onSuccess: (res) => {
      alert("Category added successfully");
    },
  });

  return { getAllCategories, addCategory };
};
