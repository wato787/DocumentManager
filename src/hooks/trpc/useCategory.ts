import toast from "react-hot-toast";
import { api } from "~/utils/api";

export const useCategory = () => {
  const getAllCategories = api.categories.getAllCategories;
  const addCategory = api.categories.add.useMutation({
    onSuccess: () => {
      toast.success("カテゴリを追加しました");
    },
    onError: () => {
      toast.error("カテゴリの追加に失敗しました");
    },
  });

  return { getAllCategories, addCategory };
};
