import Image from "next/image";
import React, { ReactElement } from "react";

interface Props {
  src: string;
  title: string;
}

const PdfContent = (props: Props): ReactElement => {
  return (
    <div className="group relative">
      <button className="relative">
        <Image
          src={props.src}
          alt="Picture of the author"
          width={200}
          height={400}
        />
        <div className="bg-pink absolute inset-0 flex items-center justify-center rounded-sm opacity-0 transition duration-300 ease-in-out group-hover:opacity-30">
          <span className="text-white">{props.title}</span>
        </div>
        <span className="">{props.title}</span>
      </button>
    </div>
  );
};

export default PdfContent;
