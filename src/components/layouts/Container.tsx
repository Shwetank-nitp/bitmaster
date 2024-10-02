import React from "react";

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto mt-4 p-4 max-w-[720px]">{children}</div>;
}

export default Container;
