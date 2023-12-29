import Image from "next/image";
import React, { ReactElement } from "react";

interface Props {
  pdfUrl: string;
  jpgUrl: string;
  title: string;
}

const PdfContent = (props: Props): ReactElement => {
  return (
    <a href={props.pdfUrl} target="_blank">
      <div className="group relative flex cursor-pointer flex-col items-center gap-y-2 p-1">
        <Image
          src={props.jpgUrl}
          alt="Picture of the author"
          width={250}
          height={400}
        />
        <div className="absolute inset-0 flex items-center justify-center rounded-sm bg-pink opacity-0 transition duration-300 ease-in-out group-hover:opacity-30">
          <span className="text-white">{props.title}</span>
        </div>
        <span className="w-[250px] text-center text-gray-500">
          {props.title}
        </span>
      </div>
    </a>
  );
};

export default PdfContent;
