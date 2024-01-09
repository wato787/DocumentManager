import classNames from "classnames";
import type { ReactElement } from "react";
import * as React from "react";

import SearchInput from "../molucules/SearchInput";
import SortToggleChip from "../molucules/SortToggleChip";

const SearchBar = (): ReactElement => {
  return (
    <>
      <div
        className={classNames(
          " mb-3 flex items-center  pb-3",
          "border-b-2 border-gray-200",
        )}
      >
        <div className=" flex space-x-3  pb-3">
          <SearchInput />
          <SortToggleChip />

          <div className={classNames("text-gray-300 opacity-80")}></div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
