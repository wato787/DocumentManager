import type { FileWithPath } from "file-selector";
import type { ReactElement } from "react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import FileUploadAreaPresenter from "./FileUploadAreaPresenter";

interface Props {
  onDrop: (file: FileWithPath) => void;
  onDelete: () => void;
}

const FileUploadArea = (props: Props): ReactElement => {
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const onDrop = useCallback(
    async (files: FileWithPath[]) => {
      setFiles((prev) => [...prev, ...files]);
      files.forEach(props.onDrop);
    },
    [props.onDrop],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    maxSize: 15 * 1000000, // 15MB
    accept: {
      "image/*": [".jpeg", ".png"],
      "application/pdf": [".pdf"],
    },
  });

  const handleOnDelete = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>, name: string) => {
      props.onDelete();
      setFiles((prev) => prev.filter((file) => file.name !== name));
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
    },
    [props],
  );

  return (
    <FileUploadAreaPresenter
      files={files}
      getInputProps={getInputProps}
      getRootProps={getRootProps}
      isDragActive={isDragActive}
      onDelete={handleOnDelete}
    />
  );
};

export default FileUploadArea;
