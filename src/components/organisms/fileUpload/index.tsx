import type { FileWithPath } from "file-selector";
import type { ReactElement } from "react";
import { useCallback, useState } from "react";

import UploadFileDialogPresenter from "./UploadFileDialogPresenter";

interface Props {
  open: boolean;
  onClose: () => void;
}

export interface AddFileRequest {
  name: string;
  path: string;
  categoryId: string;
}

const UploadFileDialog = (props: Props): ReactElement => {
  const [loading, setLoading] = useState(false);
  const [pdfFiles, setPdfFiles] = useState<FileWithPath[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

  const validate = useCallback((): boolean => {
    if (pdfFiles === undefined) {
      setIsError(true);

      return false;
    }

    return true;
  }, [pdfFiles]);

  const handleReset = useCallback(async () => {
    setPdfFiles([]);
  }, []);

  const onSubmit = useCallback(async () => {
    if (!validate()) {
      return;
    }
    setLoading(true);
    try {
      const cloudinaryUpload = async () => {};
      //TODO cloudinaryにアップロードしてurlと1枚目の画像を取得してdbに保存
      // await addFile.mutateAsync(req);
      handleReset();
      props.onClose();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [validate, props, handleReset]);

  const onFileAdded = useCallback((file: FileWithPath) => {
    setIsError(false);
    setPdfFiles((prev) => [...prev, file]);
  }, []);

  const onFileDeleted = useCallback(() => {
    setPdfFiles([]);
  }, []);

  return (
    <>
      <UploadFileDialogPresenter
        onClose={props.onClose}
        isError={isError}
        loading={loading}
        onFileAdded={onFileAdded}
        onFileDeleted={onFileDeleted}
        open={props.open}
        submit={onSubmit}
        pdfFiles={pdfFiles}
      />
    </>
  );
};

export default UploadFileDialog;
