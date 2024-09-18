import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Interface für YouTube Video-Daten
interface VideoSnippet {
  title: string;
  thumbnails: {
    high: {
      url: string;
    };
  };
}

const YouTubeVideo = () => {
  const [url, setUrl] = useState<string>("");
  const [videoData, setVideoData] = useState<VideoSnippet | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Validierung des YouTube-Links und Extraktion der Video-ID
  const extractVideoId = (link: string) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = link.match(regex);
    return match ? match[1] : null;
  };

  const fetchYouTubeData = async () => {
    const videoId = extractVideoId(url);
    if (videoId) {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=YOUR_API_KEY&part=snippet`
        );
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          const videoInfo = data.items[0].snippet;
          setVideoData(videoInfo);
          setError(null);
        } else {
          setError("Keine Video-Daten gefunden!");
          setVideoData(null);
        }
      } catch (err) {
        setError("Fehler beim Abrufen der Video-Daten!");
      }
    } else {
      setError("Ungültiger YouTube-Link!");
    }
    // Fehler nach 3 Sekunden ausblenden
    setTimeout(() => setError(null), 3000);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchYouTubeData();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg flex flex-col items-center">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="YouTube-Link eingeben"
          className="border p-2 rounded w-full text-black"
        />
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded w-full">
          Lied hinzufügen
        </button>
      </form>

      {videoData && (
        <div className="mt-4 text-center">
          <h2 className="text-lg font-bold">{videoData.title}</h2>
          <Image
            src={videoData.thumbnails.high.url}
            alt={videoData.title}
            width={500}
            height={300}
            className="mx-auto"
          />
        </div>
      )}

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded shadow">
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default YouTubeVideo;
