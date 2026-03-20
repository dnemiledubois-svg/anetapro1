import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AudioVisualizer from "./components/AudioVisualizer";

export default function App() {
  const ref = useRef(null);
  const audioRef = useRef(null);

  const audioContextRef = useRef(null);
  const sourceRef = useRef(null);

  const [analyser, setAnalyser] = useState(null);
  const [track, setTrack] = useState("/audio/track1.mp3");

  const { scrollYProgress } = useScroll({ target: ref });

  // 🎬 Cinematic transforms
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 0.6, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  // 🎧 Audio setup (estable)
  useEffect(() => {
    const audio = audioRef.current;

    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    const ctx = audioContextRef.current;

    if (!sourceRef.current) {
      const analyserNode = ctx.createAnalyser();
      const source = ctx.createMediaElementSource(audio);

      source.connect(analyserNode);
      analyserNode.connect(ctx.destination);

      sourceRef.current = source;
      setAnalyser(analyserNode);
    }
  }, []);

  // 🎵 Cambio dinámico de track
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      if (v < 0.33) setTrack("/audio/track1.mp3");
      else if (v < 0.66) setTrack("/audio/track2.mp3");
      else setTrack("/audio/track3.mp3");
    });

    return () => unsub();
  }, [scrollYProgress]);

  return (
    <div ref={ref} className="bg-bg text-dark relative overflow-x-hidden">

      {/* 🎧 Audio oculto (más limpio visualmente) */}
      <audio ref={audioRef} src={track} />

      {/* 🎵 Visualizer como capa */}
      {analyser && (
        <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
          <AudioVisualizer analyser={analyser} />
        </div>
      )}

      {/* 🎬 Hero cinematográfico */}
      <motion.section
  style={{ opacity, scale }}
  className="h-screen flex items-center justify-center bg-wood text-center relative z-10"
>
  <motion.img
    src="/images/logo1.png"
    alt="Áneta Logo"
    className="w-[80vw] max-w-[900px] object-contain"
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1.2, ease: "easeOut" }}
  />
</motion.section>

      {/* ✍️ Contenido */}
      <section className="px-6 md:px-20 py-40 relative z-10 flex items-center justify-center">
  <p className="text-3xl md:text-5xl lg:text-6xl max-w-4xl text-center leading-[1.15] tracking-tight font-light font-serif">
    Producción musical desde lo humano.
  </p>
</section>

      {/* 🎥 Video */}
      <section className="px-6 md:px-20 py-32 bg-dark text-bg relative z-10">
        <iframe
          className="w-full aspect-video rounded-xl shadow-2xl"
          src="https://www.youtube.com/embed/ysz5S6PUM-U"
          title="YouTube video"
          allowFullScreen
        />
      </section>

    </div>
  );
}