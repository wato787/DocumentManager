import type { FileWithPath } from "file-selector";
import type { ReactElement } from "react";
import { useCallback, useState } from "react";

import UploadFileDialogPresenter from "./UploadFileDialogPresenter";
import { useCloudinaryUpload } from "~/hooks/useCloudinaryUpload";
import { useFile } from "~/hooks/trpc/useFile";

interface Props {
  open: boolean;
  onClose: () => void;
}

export interface AddFilesRequest {
  name: string;
  path: string;
  pdfUrl: string;
  jpgUrl: string;
}

const UploadFileDialog = (props: Props): ReactElement => {
  const [loading, setLoading] = useState(false);
  const [pdfFiles, setPdfFiles] = useState<FileWithPath[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

  const { uploadFiles } = useCloudinaryUpload();
  const { addFiles } = useFile();

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
      const urls = await uploadFiles(pdfFiles);
      const req: AddFilesRequest[] = pdfFiles.map((file, index) => {
        return {
          name: file.name,
          path: file.path as string,
          pdfUrl: urls.pdfUrls[index] as string,
          jpgUrl: urls.jpgUrls[index] as string,
        };
      });

      await addFiles.mutateAsync(req);

      handleReset();
      props.onClose();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [pdfFiles, props, validate, uploadFiles, handleReset, addFiles]);

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
