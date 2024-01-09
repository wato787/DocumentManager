import { File } from "@prisma/client";
import React, { ReactElement, useMemo } from "react";

import PdfContent from "~/components/molucules/PdfContent";
import { useSearchKeywordStore } from "~/zustand/store/searchKeywordStore";

interface Props {
  files?: File[];
}

const FileList = (props: Props): ReactElement => {
  const keyword = useSearchKeywordStore((state) => state.keyword);

  const sortedFiles = useMemo(() => {
    if (!keyword || !props.files) return props.files;
    return props.files.filter((file) => file.name.includes(keyword));
  }, [keyword, props.files]);

  return (
    <div className="flex w-full flex-wrap gap-4 pt-4">
      {sortedFiles?.map((file, index) => (
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
