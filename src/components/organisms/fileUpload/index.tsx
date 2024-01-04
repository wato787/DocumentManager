import type { FileWithPath } from "file-selector";
import type { ReactElement } from "react";
import { useCallback, useState } from "react";

import UploadFileDialogPresenter from "./UploadFileDialogPresenter";
import { Urls, useCloudinaryUpload } from "~/hooks/useCloudinaryUpload";
import { useFile } from "~/hooks/trpc/useFile";

interface Props {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
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
  const { addFiles, getFiles } = useFile();
  const { refetch } = getFiles.useQuery();

  const validate = useCallback((): boolean => {
    if (pdfFiles === undefined) {
      setIsError(true);

      return false;
    }

    return true;
  }, [pdfFiles]);

  const handleReset = useCallback(() => {
    setPdfFiles([]);
  }, []);

  const onSubmit = useCallback(async () => {
    if (!validate()) {
      return;
    }
    setLoading(true);
    try {
      const urls: Urls = await uploadFiles(pdfFiles);

      const req: AddFilesRequest[] = pdfFiles.map((file) => {
        return {
          name: file.name,
          path: file.path as string,
          pdfUrl:
            urls.pdfUrls.find((url) => url.name.includes(file.name))?.pdfUrl ||
            "",
          jpgUrl:
            urls.jpgUrls.find((url) => url.name.includes(file.name))?.jpgUrl ||
            "",
        };
      });

      await addFiles.mutateAsync(req).then(() => refetch());

      handleReset();
      props.onClose();
      props.onComplete();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [pdfFiles, props, validate, uploadFiles, handleReset, addFiles, refetch]);

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
