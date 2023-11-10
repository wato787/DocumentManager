import { SignInResponse, signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";

const Signin = () => {
  return (
    <div className=" grid h-screen  items-center justify-center">
      <div className="">
        <Image width={400} height={600} src="/logo.png" alt="Document Logo" />
        <div className="">
          <div className=" justify-end">
            <button
              onClick={(): Promise<SignInResponse | undefined> =>
                signIn("google", { callbackUrl: "/" })
              }
              className="btn btn-primary"
            >
              ログイン
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
