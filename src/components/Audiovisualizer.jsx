import React, { useEffect, useRef } from "react";

export default function AudioVisualizer({ analyser }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!analyser) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    analyser.fftSize = 128;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const draw = () => {
      requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = "#F5F2E9";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      let x = 0;
      const barWidth = canvas.width / dataArray.length;

      for (let i = 0; i < dataArray.length; i++) {
        const h = dataArray[i];
        ctx.fillStyle = "#D4A017";
        ctx.fillRect(x, canvas.height - h, barWidth, h);
        x += barWidth;
      }
    };

    draw();
  }, [analyser]);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={150}
      className="fixed bottom-0 w-full"
    />
  );
}