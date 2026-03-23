import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  const ref = useRef(null);

  // 🔧 FIX: usar scroll global para evitar warning
  const { scrollYProgress } = useScroll();

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 0.6, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <div ref={ref} className="bg-bg text-dark relative overflow-x-hidden">

      <motion.section
        style={{ opacity, scale }}
        className="h-screen flex items-center justify-center bg-wood text-center relative z-10"
      >
        <motion.img
          src="/images/logo1.png"
          alt="Áneta Logo"
          className="w-[40vw] max-w-[450px] object-contain"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </motion.section>

      <section className="px-6 md:px-20 py-20 relative z-10 flex items-center justify-center">
        <p className="text-3xl md:text-5xl lg:text-6xl max-w-4xl text-center leading-[1.15] tracking-tight font-light font-serif">
          Sonido cálido para historias reales
        </p>
      </section>

      <section className="px-6 md:px-20 py-20 relative z-10 flex items-center justify-center">
        <p className="text-3xl md:text-5xl lg:text-6xl max-w-4xl text-center leading-[1.15] tracking-tight font-light font-serif">
          @aneta.mundo
        </p>
      </section>


<section className="px-6 md:px-20 py-20 bg-dark text-bg relative z-10 flex flex-col items-center gap-6">

  <p className="text-xl md:text-2xl font-light text-center">
    Sumérgete en nuestro mundo 
    <br />
    Batum Türküsü - Cris Áneta - Lovely Trip
  </p>

  <audio
  controls
  controlsList="nodownload"
  onContextMenu={(e) => e.preventDefault()}
  preload="none"
  className="w-full max-w-md"
>
    <source src="/audio/audio1.mp3" type="audio/mpeg" />
    Tu navegador no soporta audio.
  </audio>

</section>


    
<section className="px-6 md:px-20 py-32 bg-dark text-bg relative z-10">
  <video
    className="w-full aspect-video rounded-xl shadow-2xl object-cover"
    src="/videos/video1.mp4"
    autoPlay
    loop
    muted
    playsInline
    preload="metadata"
  />
</section>
```

```

    </div>
  );
}