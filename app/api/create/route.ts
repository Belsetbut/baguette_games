// api > hello > route.ts
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { username, title, link } = request.body;

  if(!username || !title || !link) {
    return NextResponse.error()
  }

  const song = await prisma.song.create({
    data: {
      username,
      title,
      link,
    },
  });

  return NextResponse.json(song);
}
