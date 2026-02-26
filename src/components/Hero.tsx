'use client';

const HERO_VIDEO_SRC =
  'https://zvnpoq8yksvcawvt.public.blob.vercel-storage.com/ALEHOUSE%20AMBIENCE%20REEL_V2.mp4';

const Hero = () => {
  return (
    <section
      id="home"
      className="relative w-full h-screen m-0 p-0 overflow-hidden"
    >
      <video
        className="w-full h-full object-cover"
        src={HERO_VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/hero-poster-placeholder.svg"
      />
    </section>
  );
};

export default Hero;