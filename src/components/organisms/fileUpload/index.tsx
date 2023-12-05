import type { FileWithPath } from "file-selector";
import type { ReactElement } from "react";
import { useCallback, useState } from "react";

import UploadFileDialogPresenter from "./UploadFileDialogPresenter";
import { useCategory } from "~/hooks/trpc/useCategory";
import { useFile } from "~/hooks/trpc/useFile";

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
  const [nextStep, setNextStep] = useState<boolean>(false);
  const [pdfFiles, setPdfFiles] = useState<FileWithPath[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [selectCategory, setSelectCategory] = useState<string>("All");
  const [addFileRequest, setAddFileRequest] = useState<AddFileRequest[]>([]);

  const { getAllCategories } = useCategory();
  const { addFile } = useFile();

  const getCategories = useCallback(() => {
    const res = getAllCategories.useQuery().data;
    if (!Array.isArray(res)) return [];
    const newData = [...res];

    return newData;
  }, [getAllCategories]);

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

  const handleNext = useCallback(() => {
    if (pdfFiles.length === 0) return;
    setNextStep(true);
  }, [pdfFiles]);

  const handleBack = useCallback(() => {
    setNextStep(false);
    handleReset();
  }, [handleReset]);

  const handleSelectCategory = useCallback(
    (categoryId: string, name: string) => {
      const req = pdfFiles.map((file) => {
        return {
          name: file.name,
          path: file.path as string,
          categoryId: file.name === name ? categoryId : "All",
        };
      });
      setAddFileRequest(req);
    },
    [pdfFiles],
  );
  console.log(addFileRequest);

  const onSubmit = useCallback(async () => {
    if (!validate()) {
      return;
    }
    setLoading(true);
    try {
      const req = addFileRequest.map((file) => {
        return {
          name: file.name,
          path: file.path,
          categoryId: file.categoryId,
        };
      });
      //TODO cloudinaryにアップロードしてurlと1枚目の画像を取得してdbに保存
      await addFile.mutateAsync(req);
      handleReset();
      props.onClose();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [handleReset, props, validate, addFileRequest, addFile]);

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
        handleNext={handleNext}
        handleBack={handleBack}
        nextStep={nextStep}
        categories={getCategories()}
        selectCategory={selectCategory}
        setSelectCategory={setSelectCategory}
        handleSelectCategory={handleSelectCategory}
      />
    </>
  );
};

export default UploadFileDialog;
