import React from "react";
import { SafeUser } from "../types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
  currentUser?: SafeUser | null;
  listingId: string;
}
const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const hasFavorite = false;
  const tooglefavourite = () => {};
  return (
    <div
      className="relative hover:opacity-80 transition cursor-pointer"
      onClick={tooglefavourite}
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={hasFavorite ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default HeartButton;
