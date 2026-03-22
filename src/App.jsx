import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import AudioVisualizer from "./components/AudioVisualizer";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Artistas from "./pages/Artistas";
import Estudio from "./pages/Estudio";
import Portafolio from "./pages/Portafolio";
import Contacto from "./pages/Contacto";

export default function App() {
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const sourceRef = useRef(null);

  const [analyser, setAnalyser] = useState(null);
  const [track, setTrack] = useState("/audio/track1.mp3");

  // audio global (no se reinicia al navegar)
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

  return (
    <BrowserRouter>
      <Navbar />

      <audio ref={audioRef} src={track} />

      {analyser && (
        <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
          <AudioVisualizer analyser={analyser} />
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artistas" element={<Artistas />} />
        <Route path="/estudio" element={<Estudio />} />
        <Route path="/portafolio" element={<Portafolio />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </BrowserRouter>
  );
}