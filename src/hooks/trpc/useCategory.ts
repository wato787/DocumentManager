import { api } from "~/utils/api";

export const useCategory = () => {
  const getAllCategories = api.categories.getAllCategories;

  return { getAllCategories };
};
