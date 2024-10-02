import React from "react";
import { Helmet } from "react-helmet-async";

function AuthLayout({
  children,
  title,
}: Readonly<{ children: React.ReactNode; title: string }>) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta content="app authentication page" />
      </Helmet>
      <div className=" flex h-screen border-gray-300 text-center justify-center items-center">
        <div className="max-w-[460px] w-[460px] outline mx-2 outline-offset-1 p-4 rounded-md shadow-lg bg-white">
          {children}
        </div>
      </div>
    </>
  );
}

export default AuthLayout;
