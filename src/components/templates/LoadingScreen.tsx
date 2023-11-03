import { LinearProgress } from "@mui/material";
import Image from "next/image";
import React, { memo } from "react";

const LoadingScreen = () => {
  return (
    <div className=" fixed z-10 -mt-20 flex h-screen  w-full flex-col items-center justify-center">
      <Image src="/logo.png" width={540} height={500} alt="loading" />
      <div className="-mt-24 w-1/4">
        <LinearProgress color="primary" />
      </div>
    </div>
  );
};

export default memo(LoadingScreen);
