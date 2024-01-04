import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import type { ReactElement } from "react";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";

type Inputs = {
  keyword: string;
};

const SearchInput = (): ReactElement => {
  const { control } = useForm<Inputs>({
    defaultValues: { keyword: "" },
  });

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
