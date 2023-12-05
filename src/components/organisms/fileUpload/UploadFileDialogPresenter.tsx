import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  LinearProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Box from "@mui/material/Box";
import classNames from "classnames";
import type { FileWithPath } from "file-selector";
import { type ReactElement } from "react";
import CommonButton from "~/components/atoms/CommonButton";
import FileUploadArea from "~/components/molucules/FileUploadArea";
import { Category } from "@prisma/client";

interface Props {
  open: boolean;
  isError: boolean;
  loading: boolean;
  pdfFiles: FileWithPath[];
  onClose: () => void;
  onFileAdded: (file: FileWithPath) => void;
  onFileDeleted: () => void;
  submit: () => void;
  handleNext: () => void;
  handleBack: () => void;
  nextStep: boolean;
  handleSelectCategory: (categoryId: string, name: string) => void;
  categories: Category[];
  selectCategory: string;
  setSelectCategory: (value: string) => void;
}

const UploadFileDialogPresenter = (props: Props): ReactElement => {
  return (
    <>
      {!props.nextStep ? (
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
              onDelete={props.onFileDeleted}
              onDrop={props.onFileAdded}
            />

            {props.isError && (
              <FormHelperText error>
                ファイルを添付してください。
              </FormHelperText>
            )}
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
                  onClick={props.handleNext}
                >
                  次へ
                </CommonButton>
              </div>
            </Box>
          </DialogActions>
        </Dialog>
      ) : (
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
          <DialogTitle id="scroll-dialog-title">カテゴリ選択</DialogTitle>
          <DialogContent dividers={true} id="scroll-dialog-content">
            <div className="space-y-4">
              {props.pdfFiles.map((file) => {
                return (
                  <div key={file.path}>
                    <div className="flex items-center justify-center gap-x-4">
                      <p className="w-1/3">{file.name}</p>
                      <FormControl sx={{ width: 200 }}>
                        <Select
                          size="medium"
                          value={props.selectCategory}
                          onChange={(event: SelectChangeEvent): void =>
                            props.setSelectCategory(
                              event.target.value as string,
                            )
                          }
                        >
                          {props.categories.map((category) => (
                            <MenuItem
                              key={category.id}
                              value={category.name}
                              onClick={() =>
                                props.handleSelectCategory(
                                  category.id,
                                  file.name,
                                )
                              }
                            >
                              {category.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                );
              })}
            </div>
          </DialogContent>
          <DialogActions sx={{ padding: 0 }}>
            <Box sx={{ width: "100%" }}>
              <div className={classNames(!props.loading && "opacity-0")}>
                <LinearProgress />
              </div>
              <div className="flex justify-end space-x-3 p-4 pt-3">
                <Button color="inherit" onClick={props.handleBack}>
                  戻る
                </Button>
                <CommonButton
                  small
                  disabled={props.loading}
                  onClick={props.submit}
                >
                  送信
                </CommonButton>
              </div>
            </Box>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default UploadFileDialogPresenter;
