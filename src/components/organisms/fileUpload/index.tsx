import type { FileWithPath } from "file-selector";
import type { ReactElement } from "react";
import { useCallback, useState } from "react";

import UploadFileDialogPresenter from "./UploadFileDialogPresenter";

interface Props {
  open: boolean;
  onClose: () => void;
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
      console.log(pdfFiles);
      handleReset();
      props.onClose();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [handleReset, pdfFiles, validate, props]);

  const onFileAdded = useCallback((file: FileWithPath) => {
    setIsError(false);
    setPdfFiles((prev) => [...prev, file]);
  }, []);

  const onFileDeleted = useCallback(() => {
    setPdfFiles([]);
  }, []);

  return (
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
  );
};

export default UploadFileDialog;
