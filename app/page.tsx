"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Mic,
  Video,
  PhoneOff,
  MoreVertical,
  ScreenShare,
  MessageSquare,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Component() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);

  useEffect(() => {
    // Set initial window width
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsLargeScreen(width >= 1024); // lg breakpoint
    };

    handleResize(); // set initial size
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const initMedia = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      // peerConnectionRef?.current = new RTCPeerConnection();
      // stream.getTracks().forEach((track) => {
      //   peerConnectionRef?.current.addTrack(track, stream);
      // });
      // peerConnectionRef?.current?.onicecandidate = (event) => {
      //   if (event.candidate) {
      //     socket.emit('ice-candidate', event.candidate);
      //   }
      // };
      // peerConnectionRef.current.ontrack = (event) => {
      //   remoteVideoRef.current.srcObject = event.streams[0];
      // };
      // socket.on('offer', async (offer) => {
      //   await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer));
      //   const answer = await peerConnectionRef.current.createAnswer();
      //   await peerConnectionRef.current.setLocalDescription(answer);
      //   socket.emit('answer', answer);
      // });
      // socket.on('answer', async (answer) => {
      //   await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
      // });
      // socket.on('ice-candidate', async (candidate) => {
      //   await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
      // });
    };

    initMedia();

    return () => {
      // Cleanup
      // if (peerConnectionRef.current) {
      //   peerConnectionRef.current.close();
      // }
    };
  }, []);

  const participants = [
    {
      id: 1,
      name: "You",
      video: (
        <video
          ref={localVideoRef}
          autoPlay
          muted
          className="w-full h-full object-cover"
        />
      ),
    },
    { id: 2, name: "John Doe" },
    { id: 3, name: "Jane Smith" },
    { id: 4, name: "Alice Johnson" },
    { id: 5, name: "Bob Williams" },
    { id: 6, name: "Eva Brown" },
    { id: 7, name: "Charlie Davis" },
    { id: 8, name: "Diana Miller" },
    { id: 9, name: "Frank Wilson" },
    { id: 10, name: "Grace Taylor" },
    { id: 9, name: "Frank Wilson" },
    { id: 10, name: "Grace Taylor" },
  ];

  const maxParticipants = isLargeScreen ? 16 : 4;
  const useSlider = participants.length > maxParticipants;

  const gridClass = isLargeScreen
    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
    : "grid-cols-1 sm:grid-cols-2";

  const renderParticipant = (participant) => (
    <Card
      key={participant.id}
      className="flex items-center justify-center relative overflow-hidden aspect-video"
    >
      {participant.video && participant.video}
      {!participant.video && (
        <img
          src={`https://g-whfswolv3mx.vusercontent.net/placeholder.svg?height=300&width=400`}
          alt={participant.name}
          className="w-full h-full object-cover"
        />
      )}

      <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
        {participant.name}
      </div>
      {participant.id === 1 && (
        <div className="absolute top-2 right-2">
          <Button variant="ghost" size="icon" className="text-white">
            <PinIcon className="h-4 w-4" />
          </Button>
        </div>
      )}
    </Card>
  );

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 p-4 overflow-hidden">
        {useSlider ? (
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent className="-ml-4">
              {participants.map((participant) => (
                <CarouselItem
                  key={participant.id}
                  className="pl-4 md:basis-1/2 lg:basis-1/4"
                >
                  <div className="p-1">{renderParticipant(participant)}</div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <div className={`grid ${gridClass} gap-2 h-full mx-auto`}>
            {participants.slice(0, maxParticipants).map((participant) => (
              <div key={participant.id} className="aspect-video">
                {renderParticipant(participant)}
              </div>
            ))}
          </div>
        )}
      </main>
      <footer className="p-4 shadow-lg mt-4">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon">
              <Mic className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon">
              <ScreenShare className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MessageSquare className="h-5 w-5" />
            </Button>
          </div>
          <Button variant="destructive" size="icon">
            <PhoneOff className="h-5 w-5" />
          </Button>
        </div>
      </footer>
    </div>
  );
}

function PinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="17" x2="12" y2="22" />
      <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z" />
    </svg>
  );
}
