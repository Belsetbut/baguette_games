// api > hello > route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import axios from "axios";
import cheerio from "cheerio";
import { validateFormData } from "@/schema";

async function getYouTubeVideoTitle(url: string) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    return $('meta[name="title"]').attr("content") || $("title").text() || null;
  } catch (error) {
    console.error("Error fetching YouTube video title:", error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  const { username, link } = request.body;

  const schema = validateFormData({ username, link });

  console.log(schema);

  if (!schema) {
    return NextResponse.json({ status: 400 });
  }

  const title = await getYouTubeVideoTitle(link);

  if (!title) {
    return NextResponse.json({ status: 422 });
  }

  const song = await prisma.song.create({
    data: {
      username,
      title,
      link,
    },
  });

  console.log(song);

  return NextResponse.json(song);
}
