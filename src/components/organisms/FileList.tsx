import { File } from "@prisma/client";
import React, { ReactElement, useMemo } from "react";

import PdfContent from "~/components/molucules/PdfContent";
import { useSearchKeywordStore } from "~/zustand/store/searchKeywordStore";
import {
  SortToggleType,
  useSortToggleStore,
} from "~/zustand/store/sortToggleStore";

interface Props {
  files?: File[];
}

const FileList = (props: Props): ReactElement => {
  const keyword = useSearchKeywordStore((state) => state.keyword);
  const toggleType = useSortToggleStore((state) => state.sortToggle);

  const filteredAndSortedFiles = useMemo(() => {
    if (!keyword && toggleType) {
      if (toggleType === SortToggleType.ASC) {
        return props.files
          ?.slice()
          .sort((a, b) => a.name.localeCompare(b.name));
      } else if (toggleType === SortToggleType.DESC) {
        return props.files
          ?.slice()
          .sort((a, b) => b.name.localeCompare(a.name));
      }
    } else if (keyword && props.files) {
      return props.files.filter((file) => file.name.includes(keyword));
    }
    return props.files;
  }, [keyword, props.files, toggleType]);

  return (
    <div className="flex w-full flex-wrap gap-4 pt-4">
      {filteredAndSortedFiles?.map((file, index) => (
        <PdfContent
          jpgUrl={file.jpgUrl}
          pdfUrl={file.pdfUrl}
          title={file.name}
          key={index}
        />
      ))}
    </div>
  );
};

export default FileList;
