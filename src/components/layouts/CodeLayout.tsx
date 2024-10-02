import React from "react";
import { Helmet } from "react-helmet-async";

type CodeLayoutProps = {
  title?: string;
  children1: React.ReactNode;
  children2: React.ReactNode;
};

function CodeLayout({ children1, children2, title }: CodeLayoutProps) {
  return (
    <div className="grid grid-cols-2 bg-gray-100 p-4 gap-4 overflow-hidden">
      <Helmet>
        <title className="capitalize">{title}</title>
        <meta
          name="description"
          content={
            "Welcome to bit master website, for dsa and codeing contests practice"
          }
        />
      </Helmet>
      <div className="overflow-y-auto h-[100vh] bg-white shadow-md p-4">
        {children1}
      </div>
      <div className="h-screen">{children2}</div>
    </div>
  );
}

export default CodeLayout;
