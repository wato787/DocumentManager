import { api } from "~/utils/api";

export const useFile = () => {
  const addFile = api.files.add.useMutation({
    onSuccess: (res) => {
      alert("File added successfully");
    },
  });

  return { addFile };
};
