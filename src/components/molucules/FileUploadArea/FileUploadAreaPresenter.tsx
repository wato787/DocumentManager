import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { Button } from "@mui/material";
import classNames from "classnames";
import type { ReactElement } from "react";
import type {
  DropzoneInputProps,
  DropzoneRootProps,
  FileWithPath,
} from "react-dropzone";

interface Props {
  files: FileWithPath[];
  isDragActive: boolean;
  getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
  onDelete: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    name: string,
  ) => void;
}

const FileUploadAreaPresenter = (props: Props): ReactElement => {
  return (
    <div
      className={classNames([
        "rounded  border-4 border-gray-100 hover:cursor-pointer",
        (props.files.length === 0 || props.isDragActive) && "border-dashed",
        props.isDragActive && "!border-primary-500 bg-primary-50",
      ])}
    >
      <div {...props.getRootProps()}>
        <input {...props.getInputProps()} />
        {props.files.length === 0 || props.isDragActive ? (
          <div className="flex h-[250px] flex-col items-center justify-center space-y-4 p-10">
            {props.isDragActive ? (
              <>
                <span className="text-primary-500 text-7xl">
                  <DriveFolderUploadIcon fontSize="inherit" />
                </span>
                <div className="flex flex-col items-center space-y-1">
                  <div className="text-primary-500 flex space-x-1 text-sm md:text-base">
                    <span>Drop the file here...</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    サイズ：15MBまで ｜ 形式：JPG, PNG, PDF
                  </div>
                </div>
              </>
            ) : (
              <>
                <span className="text-7xl text-gray-300">
                  <DriveFolderUploadIcon fontSize="inherit" />
                </span>
                <div className="flex flex-col items-center space-y-1">
                  <div className="flex space-x-1 text-sm text-gray-400 md:text-base">
                    <span className=" text-pink">Upload a file </span>
                    <span> or drag and drop</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    サイズ：15MBまで ｜ 形式：JPG, PNG, PDF
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <aside className="flex h-[250px] flex-col">
            <div className="flex flex-grow items-center justify-center space-x-4">
              <span className="text-7xl  text-gray-300">
                <InsertDriveFileIcon fontSize="inherit" />
              </span>
            </div>
            <div className="flex flex-wrap items-center   bg-gray-100 p-5 text-gray-400">
              {props.files.map((file, index) => (
                <div
                  className="flex w-1/2 items-center justify-between gap-x-2 p-2"
                  key={`${file.name}_${index}`}
                >
                  <span className="text-sm sm:text-base">{file.name}</span>
                  <Button
                    className="flex-shrink-0"
                    onClick={(e) => props.onDelete(e, file.name)}
                    size="small"
                    variant="outlined"
                  >
                    <div className="flex items-center space-x-1">
                      <DeleteOutlineIcon fontSize="small" />
                      <span>削除</span>
                    </div>
                  </Button>
                </div>
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default FileUploadAreaPresenter;
