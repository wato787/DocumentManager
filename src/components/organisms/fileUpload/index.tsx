import type { FileWithPath } from "file-selector";
import type { ReactElement } from "react";
import { useCallback, useState } from "react";
import { type SubmitHandler } from "react-hook-form";

import UploadFileDialogPresenter from "./UploadFileDialogPresenter";

export type UploadFormValues = {
  fileName: string;
};

export type UploadFormState = {
  values: UploadFormValues;
};

interface Props {
  open: boolean;
  onClose: () => void;
}

const UploadFileDialog = (props: Props): ReactElement => {
  const [loading, setLoading] = useState(false);

  const [pdfFile, setPdfFile] = useState<FileWithPath | undefined>();
  const [isError, setIsError] = useState<boolean>(false);

  // const validateTenkaizu = useCallback((): boolean => {
  //   if (tenkaizu === undefined) {
  //     setIsError(true);

  //     return false;
  //   }

  //   return true;
  // }, [tenkaizu]);

  const onSubmit = useCallback<SubmitHandler<UploadFormValues>>(
    async (data) => {
      setLoading(true);
      try {
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    },
    [],
  );

  // const submit = (): void => {
  //   validateTenkaizu();
  //   handleSubmit(onSubmit)();
  // };

  // const onTenkaizuAdded = useCallback((newTenkaizu: FileWithPath) => {
  //   setIsError(false);
  //   setTenkaizu(newTenkaizu);
  // }, []);

  return (
    <UploadFileDialogPresenter
      onClose={props.onClose}
      // isError={isError}
      loading={loading}
      // onTenkaizuAdded={onTenkaizuAdded}
      // onTenkaizuDeleted={onTenkaizuDeleted}
      open={props.open}
      // productId={props.id}
      // submit={submit}
      pdfFile={pdfFile}
    />
  );
};

export default UploadFileDialog;
