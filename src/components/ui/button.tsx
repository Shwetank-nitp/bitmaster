import React from "react";

type ButtonProps = {
  children?: React.ReactNode;
  styles?: string;
  onClick?: (e?: any) => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ children, styles, onClick, ...rest }: ButtonProps) {
  return (
    <button
      className={`py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white focus:outline focus:outline-gray-400 focus:outline-2 rounded-md ${styles}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
