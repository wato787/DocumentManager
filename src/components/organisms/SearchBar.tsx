import classNames from "classnames";
import type { ReactElement } from "react";
import * as React from "react";

import SearchInput from "../molucules/SearchInput";

const SearchBar = (): ReactElement => {
  return (
    <>
      <div
        className={classNames(
          " mb-3 flex flex-col  pb-3",
          "border-b-2 border-gray-200",
        )}
      >
        <div className=" flex space-x-3  pb-3">
          <SearchInput />
          <div className={classNames("text-gray-300 opacity-80")}></div>
        </div>
        {/* <SearchFilterChipsBar /> */}
      </div>
    </>
  );
};

export default SearchBar;
