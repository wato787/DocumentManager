import type { FileWithPath } from "file-selector";
import type { ReactElement } from "react";
import { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import FileUploadAreaPresenter from "./FileUploadAreaPresenter";

interface Props {
  defaultFile?: FileWithPath | undefined;
  onDrop: (file: FileWithPath) => void;
  onDelete: () => void;
}

const FileUploadArea = (props: Props): ReactElement => {
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const onDrop = useCallback(
    async (files: FileWithPath[]) => {
      setFiles([...files, ...files]);
      files.forEach(props.onDrop);
    },
    [props.onDrop],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 15 * 1000000, // 15MB
    accept: {
      "image/*": [".jpeg", ".png"],
      "application/pdf": [".pdf"],
    },
  });

  const fileList = useMemo(
    (): JSX.Element[] =>
      (props.defaultFile ? [props.defaultFile] : files).map((file, index) => (
        <li className="text-sm sm:text-base" key={`${file.name}_${index}`}>
          {file.name}
        </li>
      )),
    [files, props.defaultFile],
  );

  const handleOnDelete = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      props.onDelete();
      setFiles([]);
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
    },
    [props],
  );

  return (
    <FileUploadAreaPresenter
      files={fileList}
      getInputProps={getInputProps}
      getRootProps={getRootProps}
      isDragActive={isDragActive}
      onDelete={handleOnDelete}
    />
  );
};

export default FileUploadArea;
