"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Heading from "./Heading";
import Button from "./Button";

interface EmptyStateProps {
  title?: string;
  subTitle?: string;
  showReset?: boolean;
}
const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No exact matches",
  subTitle = "Try changing your filter, we are working on it.",
  showReset,
}) => {
  const router = useRouter();
  return (
    <div
     className="h-[60vh] flex flex-col gap-2 justify-center items-center"
    >
        <Heading title={title} subTitle={subTitle }/>
        <div className="w-48 mt-4">
            {showReset && (
                <Button 
                    outline
                    label="Remove all filter"
                    onClick={() =>router.push('/')}
                />
            )}
        </div>
    </div>


  );
};

export default EmptyState;
