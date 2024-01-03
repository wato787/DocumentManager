import toast from "react-hot-toast";
import { api } from "~/utils/api";

export const useFile = () => {
  const getFiles = api.files.get;
  const addFiles = api.files.add.useMutation({
    onSuccess: () => {
      toast.success("ファイルを追加しました");
    },
  });

  return { addFiles, getFiles };
};
