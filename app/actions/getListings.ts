import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import prisma from "@/app/lib/prismadb";

export default async function getListings() {
    try {
        const listing = await prisma.listing.findMany({
            orderBy:{
                createdAt: 'desc'
            }
        })

        const safeListing = listing.map((listingItem) => ({
            ...listingItem, 
            createdAt: listingItem.createdAt.toISOString(),
        }))
        return safeListing
    } catch (error:any) {
        console.log("Bug when return lsiting")
        throw new Error(error)
    }
}