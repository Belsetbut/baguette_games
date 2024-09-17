"use client";

import { createSong } from "@/actions/createSong";

export default function Home() {
  const handleClick = async () => {
    try {
      await createSong("tim", "titel", "Link");
      // Optionally handle success, e.g., show a notification
      console.log("Song created successfully!");
    } catch (error) {
      // Handle any errors that occur
      console.error("Error creating song:", error);
    }
  };

  return (
    <div className="">
      <p className="text-3xl flex justify-center mt-5">
        Welcome to the Baguette Games
      </p>
      <p className="font-bold flex justify-center mt-3">
        Hier kannst du alle Lieder hochladen
      </p>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}
