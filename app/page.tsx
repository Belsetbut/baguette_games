"use client";

import { createSong } from "@/actions/createSong";
import { UploadForm } from "@/components/UploadForm";

export default function Home() {
  return (
    <div className="w-200">
      <UploadForm />
    </div>
  );
}
