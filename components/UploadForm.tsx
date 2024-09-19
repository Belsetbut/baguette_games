"use client";
import { useState } from "react"; // Import useState for handling form state
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Dummy createSong function - replace with your actual implementation
const createSong = async ({ title, link }: { title: string; link: string }) => {
  // Replace with actual API call
  return fetch("/api/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, link }),
  }).then((response) => response.json());
};

export function UploadForm() {
  // State to manage form inputs
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const handleClick = async () => {
    try {
      // Call createSong with form data
      const response = await createSong({
        title: name, // Use form data
        link, // Use form data
      });

      console.log("Song created:", response);
    } catch (error) {
      // Handle error
      console.error("Error creating song:", error);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Baguet Games</CardTitle>
        <CardDescription>Test </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="link">Youtube Link</Label>
          <Input
            id="link"
            type="text"
            placeholder="youtube.com/watch/?v=rickroll"
            required
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleClick}>
          Song einreichen
        </Button>
      </CardFooter>
    </Card>
  );
}
