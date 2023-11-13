import type { FieldValues, UseFormProps, UseFormReturn } from "react-hook-form";
import { useForm } from "react-hook-form";

const useDefaultForm = <FORM_TYPE extends FieldValues>(
  props: UseFormProps<FORM_TYPE> & {
    defaultValues: FORM_TYPE;
  },
): UseFormReturn<FORM_TYPE> => {
  return useForm(props);
};

export { useDefaultForm };
