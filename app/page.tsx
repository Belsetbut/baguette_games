"use client";

import { createSong } from "@/actions/createSong";
import YouTubeVideo from "../components/ui/Youtube";

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
      <div>
        <p className="mt-14 flex justify-center mb-5">
          Geb hier den Link des Liedes ein(am besten youtube link).
        </p>
        <YouTubeVideo />
      </div>
      <div className="mt-24 flex justify-center">
        <button
          className="border border-black px-4 mx-2 rounded-full text-2xl"
          onClick={handleClick}>
          Lied hochladen
        </button>
      </div>
      <div className="mt-96"></div>
    </div>
  );
}
