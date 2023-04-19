"use client";

import React from "react";
// work with app foler, everything will be server component by default
// with ithis one , this is client compnent

interface ContainerProps {
  children: React.ReactNode;
}
const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
      {children}
    </div>
  );
};

export default Container;
    