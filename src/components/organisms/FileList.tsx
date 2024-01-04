import { File } from "@prisma/client";
import React, { ReactElement } from "react";

import PdfContent from "~/components/molucules/PdfContent";

interface Props {
  files?: File[];
}

const FileList = (props: Props): ReactElement => {
  return (
    <div className="flex w-full flex-wrap gap-4 pt-4">
      {props.files && (
        <>
          {props.files.map((file, index) => (
            <PdfContent
              jpgUrl={file.jpgUrl}
              pdfUrl={file.pdfUrl}
              title={file.name}
              key={index}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default FileList;
