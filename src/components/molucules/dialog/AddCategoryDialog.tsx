import {
  Dialog,
  Button,
  CircularProgress,
  TextField,
  DialogTitle,
} from "@mui/material";
import classNames from "classnames";
import { type ReactElement, useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const AddCategoryDialog = (props: Props): ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <Dialog onClose={props.onClose} open={props.open}>
        <div className="w-[400px]">
          <DialogTitle className="text-center font-sans">
            カテゴリー追加
          </DialogTitle>
          <div className="flex flex-col space-y-6 px-8 pb-5 pt-3">
            <TextField placeholder="カテゴリー名" />
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
              <Button
                disabled={isLoading}
                // onClick={async (): Promise<void> => await handleApply()}
                size="large"
                sx={{
                  flex: 1,
                  boxShadow: "none",
                  ":hover": { backgroundColor: "#ffc0cb" },
                }}
                variant="contained"
              >
                <span
                  className={classNames(isLoading && "opacity-0", "text-white")}
                >
                  追加
                </span>
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    <CircularProgress color="inherit" size="1.2rem" />
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default AddCategoryDialog;
