'use client';

import { RefObject } from 'react';

const HERO_VIDEO_SRC =
  'https://zvnpoq8yksvcawvt.public.blob.vercel-storage.com/ALEHOUSE%20FEB%20REEL%205%20.mov';

interface HeroProps {
  videoRef?: RefObject<HTMLVideoElement | null>;
  muted?: boolean;
}

const Hero = ({ videoRef, muted = true }: HeroProps) => {
  return (
    <section
      id="home"
      className="relative w-full h-screen m-0 p-0 overflow-hidden"
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={HERO_VIDEO_SRC}
        autoPlay
        muted={muted}
        loop
        playsInline
        preload="metadata"
        poster="/hero-poster-placeholder.svg"
      />
    </section>
  );
};

export default Hero;