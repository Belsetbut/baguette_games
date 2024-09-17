import prisma from "@/lib/db";

export const createSong = async (
  username: string,
  title: string,
  link: string
) => {
  try {
    const song = await prisma.song.create({
      data: {
        username: username,
        title,
        link,
      },
    });

    console.log(song);

    return song;
  } catch (err) {
    console.log(err);
  }
};
