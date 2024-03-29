import toast from "react-hot-toast";
import { api } from "~/utils/api";

export const useFile = () => {
  const getFiles = api.files.get;
  const { refetch } = getFiles.useQuery();

  const addFiles = api.files.add.useMutation({
    onSuccess: () => {
      toast.success("ファイルを追加しました");
      refetch();
    },
    onError: () => {
      toast.error("ファイルの追加に失敗しました");
    },
  });

  return { addFiles, getFiles };
};
