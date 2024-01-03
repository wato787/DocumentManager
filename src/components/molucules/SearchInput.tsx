import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import type { ReactElement } from "react";
import { useState } from "react";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";

// import { useSearch } from "@/hooks/useSearch";
// import { useAppDispatch } from "@/store";

type Inputs = {
  keyword: string;
};

interface Props {
  isSearchInitialized: boolean;
}

const SearchInput = (props: Props): ReactElement => {
  // const { applySearch } = useSearch();
  // const dispatch = useAppDispatch();
  // const keyword = useAppSelector((state) => state.app.search.filter.keyword);
  const [runSubmit, setRunSubmit] = useState(false);

  const { control, handleSubmit, setValue, getValues } = useForm<Inputs>({
    defaultValues: { keyword: "" },
  });

  // const onBlur = useCallback(
  //   (event: React.FocusEvent<HTMLInputElement>) => {
  //     dispatch(keywordChanged(event.target.value));
  //   },
  //   [dispatch],
  // );

  // const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
  //   dispatch(keywordChanged(data.keyword));
  //   setRunSubmit(true);
  // };

  // useEffect(() => {
  //   if (!runSubmit) {
  //     return;
  //   }

  //   (async (): Promise<void> => {
  //     await applySearch();
  //     setRunSubmit(false);
  //   })();
  // }, [runSubmit, applySearch]);

  // useEffect(() => {
  //   if (!props.isSearchInitialized) {
  //     return;
  //   }

  // if (getValues("keyword") === keyword) {
  //   return;
  // }

  // setValue("keyword", keyword || "");
  // }, [props.isSearchInitialized, getValues, setValue]);

  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    <form>
      <Controller
        control={control}
        name="keyword"
        render={({ field }): ReactElement => (
          <TextField
            {...field}
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            autoComplete="off"
            className="rounded-sm bg-gray-200"
            fullWidth
            // onBlur={onBlur}
            placeholder="検索"
            sx={{ padding: 1, width: 600 }}
            type="text"
            variant="standard"
          />
        )}
      />
    </form>
  );
};

export default SearchInput;
