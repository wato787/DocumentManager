import { Dialog, Button, TextField, DialogTitle } from "@mui/material";
import { type ReactElement, useState } from "react";
import CommonButton from "~/components/atoms/CommonButton";
import { useCategory } from "~/hooks/trpc/useCategory";

interface Props {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const AddCategoryDialog = (props: Props): ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>("");

  const { addCategory } = useCategory();

  const handleApply = async (): Promise<void> => {
    setIsLoading(true);
    await addCategory.mutateAsync({ name: categoryName });
    setIsLoading(false);
    props.onClose();
    props.onComplete();
  };

  return (
    <>
      <Dialog onClose={props.onClose} open={props.open}>
        <div className="w-[400px]">
          <DialogTitle className="text-center font-sans">
            カテゴリー追加
          </DialogTitle>
          <div className="flex flex-col space-y-6 px-8 pb-5 pt-3">
            <TextField
              placeholder="カテゴリー名"
              onChange={(e): void => setCategoryName(e.target.value)}
            />
            <div className="flex items-center justify-between">
              <Button
                className="!text-gray-500"
                color="info"
                onClick={props.onClose}
                size="large"
                sx={{ flex: 1, boxShadow: "none" }}
                variant="text"
              >
                キャンセル
              </Button>
              <CommonButton disabled={isLoading} onClick={handleApply}>
                追加
              </CommonButton>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default AddCategoryDialog;
