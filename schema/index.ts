import { z } from "zod";

// Regular expression to match YouTube URLs
const youtubeUrlRegex =
  /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[^\s]+$/;

const linkSchema = z.string().refine((url) => youtubeUrlRegex.test(url), {
  message: "Invalid YouTube link",
});

export const schema = z.object({
  username: z.string().nonempty("Username is required"),
  link: linkSchema,
});

export const validateFormData = (data: { username: string; link: string }) => {
  try {
    schema.parse(data);
    return true;
  } catch (e) {
    if (e instanceof z.ZodError) {
     return false;
    }
  }
};
