import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import prisma from "@/app/lib/prismadb";
import getCurrentUser from "./getCurrentUser";


export default async function getFaveListings() {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return []
        }

        const favorites = await prisma.listing.findMany({
            where: {
                id: {
                    in: [...(currentUser.favouriteIds || [])]
                }
            }
        })

        const safeFav = favorites.map((fav) => ({
            ...fav, 
            createdAt: fav.createdAt.toISOString()
        }))

        return safeFav
    } catch (error:any) {
        console.log("something wrong fetching fave")
        throw new Error(error)
    }
}