import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import type { ReactElement } from "react";
import * as React from "react";
import { useSearchKeywordStore } from "~/zustand/store/searchKeywordStore";

const SearchInput = (): ReactElement => {
  const setKeyword = useSearchKeywordStore((state) => state.setKeyword);

  const handleKeyWordChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setKeyword(e.target.value);

  return (
    <form>
      <TextField
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        autoComplete="off"
        onChange={handleKeyWordChange}
        className="rounded-sm bg-gray-200"
        fullWidth
        placeholder="検索"
        sx={{ padding: 1, width: 600 }}
        type="text"
        variant="standard"
      />
    </form>
  );
};

export default SearchInput;
