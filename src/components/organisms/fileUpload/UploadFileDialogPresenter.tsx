import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
} from "@mui/material";
import Box from "@mui/material/Box";
import classNames from "classnames";
import type { FileWithPath } from "file-selector";
import type { ReactElement } from "react";
import CommonButton from "~/components/atoms/CommonButton";
import FileUploadArea from "~/components/molucules/FileUploadArea";

interface Props {
  // productId: string;
  open: boolean;
  // isError: boolean;
  loading: boolean;
  pdfFile: FileWithPath | undefined;
  onClose: () => void;
  // onTenkaizuAdded: (newTenkaizu: FileWithPath) => void;
  // onTenkaizuDeleted: () => void;
  // submit: () => void;
}

const UploadFileDialogPresenter = (props: Props): ReactElement => {
  return (
    <>
      <Dialog
        onClose={props.onClose}
        open={props.open}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "700px",
            },
          },
        }}
      >
        <DialogTitle id="scroll-dialog-title">ファイルを添付</DialogTitle>
        <DialogContent dividers={true} id="scroll-dialog-content">
          <FileUploadArea
            defaultFile={props.pdfFile}
            onDelete={props.onClose}
            onDrop={props.onClose}
          />

          {/* {props.isError && (
            <FormHelperText error>ファイルを添付してください。</FormHelperText>
          )} */}
        </DialogContent>
        <DialogActions sx={{ padding: 0 }}>
          <Box sx={{ width: "100%" }}>
            <div className={classNames(!props.loading && "opacity-0")}>
              <LinearProgress />
            </div>
            <div className="flex justify-end space-x-3 p-4 pt-3">
              <Button color="inherit" onClick={props.onClose}>
                キャンセル
              </Button>
              <CommonButton
                small
                disabled={props.loading}
                onClick={props.onClose}
              >
                追加
              </CommonButton>
            </div>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UploadFileDialogPresenter;
