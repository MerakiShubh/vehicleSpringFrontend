import React from "react";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

export const ShinyButton = ({ className, children, ...props }) => {
  return (
    <button
      {...props}
      className={clsx(
        `group relative flex transform items-center justify-around overflow-hidden whitespace-normal rounded-md border-white bg-blue-500 
    px-8 text-base/7 font-medium text-white transition-all duration-300 hover:ring-2 hover:ring-blue-700 hover:ring-offset-2 
    focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer`,
        className
      )}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <ArrowRight className="size-4 shrink-0 text-white transition-transform duration-300 ease-in-out group-hover:translate-x-[2px]" />
      </span>
      <div
        className="ease-[cubic-bezier(0.19, 1, 0.22, 1)] absolute -left-[75px] -top[50px] -z-10 h-[155px] w-8 rotate-[35deg] 
      bg-white opacity-20 transition-all duration-500 group-hover:left-[120%]"
      />
    </button>
  );
};
