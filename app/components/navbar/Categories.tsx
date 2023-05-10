"use client";
import React from "react";
import Container from "../Container";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { IoDiamond } from "react-icons/io5";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description:
      "Live the ultimate coastal lifestyle in our prime properties just steps away from the beach!",
  },
  {
    label: "Windmill",
    icon: GiWindmill,
    description:
      "Experience the charm of traditional living with a modern twist in our properties featuring stunning windmill architecture.",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description:
      "Experience sleek and stylish modern living at its finest in our properties that offer the perfect blend of luxury and functionality",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description:
      "Escape the hustle and bustle of the city and embrace the tranquility of nature with our countryside properties that offer breathtaking views and serene surroundings.",
  },
  {
    label: "Pools",
    icon: TbPool,
    description:
      "Experience the ultimate in luxury living with our properties featuring stunning pools that offer the perfect escape from the hustle and bustle of everyday life.",
  },
  {
    label: "Island",
    icon: GiIsland,
    description:
      "Live the dream island lifestyle with our properties that offer breathtaking views, crystal-clear waters and a sense of peaceful seclusion.",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description:
      "Experience the serenity and natural beauty of lakeside living with our properties that offer stunning waterfront views and endless recreational opportunities.",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description:
      "Embrace the thrill of winter sports and discover the ultimate in mountain living with our properties located just steps away from world-class skiing and snowboarding destinations.",
  },
  {
    label: "Castle",
    icon: GiCastle,
    description:
      "Experience the grandeur and prestige of aristocratic living with our properties that offer stunning castle architecture, rich history, and modern amenities.",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description:
      "Experience the best of outdoor living with our properties that offer a unique blend of luxury and camping activities, allowing you to immerse yourself in nature without sacrificing comfort.",
  },
  {
    label: "Artic",
    icon: BsSnow,
    description:
      "Explore the wonders of the Arctic and experience the magic of the Northern Lights from the comfort of your own home with our properties located in the heart of this stunning wilderness.",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description:
      "Experience the ultimate in unique living with our properties located in stunning cave formations, offering a one-of-a-kind combination of history, adventure and luxury.",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description:
      "Experience the majesty and tranquility of desert living with our properties located in stunning desert landscapes, offering a unique combination of natural beauty and modern amenities.",
  },
  {
    label: "Barn",
    icon: GiBarn,
    description:
      "Experience the charm and rustic beauty of countryside living with our properties that feature stunning barn conversions, offering the perfect blend of traditional architecture and modern amenities.",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description:
      "Experience unparalleled luxury and sophistication with our properties that are fit for royalty, offering the ultimate in exclusivity, privacy, and opulence.",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathName = usePathname();
  const isMainPage = pathName === "/";
  if (!isMainPage) {
    return null;
  }
  return (
    <Container>
      <div className="pt-4 flex flex-rows items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            description={item.description}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
