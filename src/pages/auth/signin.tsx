import { SignInResponse, signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";
import CommonButton from "~/components/atoms/CommonButton";

const Signin = () => {
  const handleSignin = async (): Promise<SignInResponse | undefined> => {
    return signIn("google", { callbackUrl: "/" });
  };
  return (
    <div className=" grid h-screen  items-center justify-center">
      <div className="flex flex-col items-center">
        <Image width={400} height={600} src="/logo.png" alt="Document Logo" />

        <CommonButton onClick={handleSignin}>ログイン</CommonButton>
      </div>
    </div>
  );
};

export default Signin;
