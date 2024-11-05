"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

export default function Home() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);

  useEffect(() => {
    const initMedia = async () => {
      // const stream = await navigator.mediaDevices.getUserMedia({
      //   video: true,
      //   audio: true,
      // });
      // if (localVideoRef.current) {
      //   localVideoRef.current.srcObject = stream;
      // }
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

  const colSpan = Math.min(1, 4);

  return (
    <div className="h-screen flex flex-col bg-[#1A202C]">
      <header className="bg-[#1A202C] px-6 py-2 mb-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-5 h-5 bg-slate-50 rounded-sm"></div>
        </div>
        <div className="flex items-center">
          <a
            href="#"
            className="text-[#F7FAFC] hover:text-[#F7FAFC] hover:underline hover:underline-offset-2"
          >
            Sign in
          </a>
        </div>
      </header>

      <div className="h-[75%] w-full px-6 flex">
        <div className={`grid h-full grid-cols-${colSpan} gap-2 mb-6 flex-1`}>
          <div className="rounded border border-white h-full">
            <video
              ref={localVideoRef}
              autoPlay
              muted
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      {/* controll */}
      <div className="w-full flex-1 gap-2 flex justify-center">
        <Button variant="outline">Mutted</Button>
        <Button variant="outline">Camera</Button>
        <Button variant="destructive">Close</Button>
      </div>
    </div>
  );
}
