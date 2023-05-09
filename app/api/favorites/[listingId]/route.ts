import prisma from "@/app/lib/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import next from "next/types";
import { Prisma } from "@prisma/client";