import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import React, { ReactElement } from "react";
import {
  SortToggleType,
  useSortToggleStore,
} from "~/zustand/store/sortToggleStore";

const SortToggleChip = (): ReactElement => {
  const { sortToggle, setSortToggle } = useSortToggleStore((state) => state);

  const handleChange = (event: SelectChangeEvent<SortToggleType>) => {
    setSortToggle(event.target.value as SortToggleType);
  };

  return (
    <FormControl sx={{ width: 100 }}>
      <Select
        sx={{ height: 48 }}
        value={sortToggle}
        onChange={(e) => handleChange(e)}
      >
        <MenuItem value={SortToggleType.ASC}>昇順</MenuItem>
        <MenuItem value={SortToggleType.DESC}>降順</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortToggleChip;
