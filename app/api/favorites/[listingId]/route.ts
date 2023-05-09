import prisma from "@/app/lib/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import next from "next/types";
import { Prisma } from "@prisma/client";

interface IParams {
  listingId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    console.log("no current user found in add fav request");
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    return new Error("Invalid lisitng id ");
  }

  let favIds = [...(currentUser.favouriteIds || [])];

  favIds.push(listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favouriteIds: favIds,
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    console.log("no current user found in delete request");
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid id lsiting");
  }

  let favouriteIds = [...(currentUser.favouriteIds || [])];

  favouriteIds = favouriteIds.filter((id) => id !== listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favouriteIds,
    },
  });

  return NextResponse.json(user);
}
