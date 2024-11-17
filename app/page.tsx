"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ImagePlaceHolder from "../components/ui/imagePlaceHolder";
import {
  Mic,
  Video,
  PhoneOff,
  MoreVertical,
  ScreenShare,
  MessageSquare,
} from "lucide-react";
import { useGridLayout } from "../hooks/useGridLayout";

export default function Component() {
  const localVideoRef = useRef(null);
  const [onCam, setOnCam] = useState(true);
  const [onMic, setOnMic] = useState(true);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Tile 1",
      video: <ImagePlaceHolder />,
    },
  ]);

  const gridRef = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { layout } = useGridLayout(gridRef, users.length);

  useEffect(() => {
    const initializeMediaStream = async () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      const newStream = new MediaStream();

      if (onCam) {
        const videoTrack = (
          await navigator.mediaDevices.getUserMedia({ video: true })
        ).getVideoTracks()[0];
        newStream.addTrack(videoTrack);
      }
      if (onMic) {
        const audioTrack = (
          await navigator.mediaDevices.getUserMedia({ audio: true })
        ).getAudioTracks()[0];
        newStream.addTrack(audioTrack);
      }
      setStream(newStream);

      if (localVideoRef.current) {
        (localVideoRef.current as HTMLVideoElement).srcObject = newStream;
      }
    };

    initializeMediaStream();

    return () => {
      if (stream) {
        (stream as MediaStream)?.getTracks().forEach((track) => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onCam, onMic]);

  useEffect(() => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === 1
          ? {
              ...user,
              video: onCam ? (
                <video
                  ref={localVideoRef}
                  autoPlay
                  muted
                  className="w-full h-full"
                />
              ) : (
                <ImagePlaceHolder />
              ),
            }
          : user
      )
    );
  }, [onCam]);

  const addTile = () =>
    setUsers((prevUsers) => [
      ...prevUsers,
      {
        id: prevUsers.length + 1,
        name: `Tile ${prevUsers.length + 1}`,
        video: <ImagePlaceHolder />,
      },
    ]);

  return (
    <div className="flex flex-col items-center px-16 w-full h-screen">
      <div className="w-full p-1 max-h-[85%] min-h-[85%] mb-2">
        <div
          ref={gridRef}
          className="grid gap-4 h-full"
          style={{
            gridTemplateColumns: `repeat(var(--col-count), 1fr)`,
            gridTemplateRows: `repeat(var(--row-count), 1fr)`,
          }}
        >
          {users.map((tile) => (
            <div
              key={tile.id}
              className="flex items-center justify-center max-h-full bg-slate-50/5 rounded overflow-hidden relative"
            >
              {tile.video}
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 shadow-lg">
        <div className="flex w-full justify-between items-center gap-4">
          <Button
            onClick={() => setOnMic((prev) => !prev)}
            variant={onMic ? "rounded" : "destructive_rounded"}
            size="icon"
          >
            <Mic className="h-5 w-5 text-white" />
          </Button>
          <Button
            onClick={() => setOnCam((prev) => !prev)}
            variant={onCam ? "rounded" : "destructive_rounded"}
            size="icon"
          >
            <Video className="h-5 w-5 text-white" />
          </Button>
          <Button onClick={addTile} variant="rounded" size="icon">
            <ScreenShare className="h-5 w-5 text-white" />
          </Button>
          <Button variant="rounded" size="icon">
            <MoreVertical className="h-5 w-5 text-white" />
          </Button>
          <Button variant="rounded" size="icon">
            <MessageSquare className="h-5 w-5 text-white" />
          </Button>
          <Button variant="destructive" size="icon">
            <PhoneOff className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
}
