import { api } from "~/utils/api";

export const useFile = () => {
  const getFiles = api.files.get;
  const addFiles = api.files.add.useMutation({
    onSuccess: (res) => {
      alert("File added successfully");
    },
  });

  return { addFiles, getFiles };
};
