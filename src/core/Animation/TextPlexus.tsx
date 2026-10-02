import { useEffect, useRef } from "react";

type TextPlexusProps = {
  text?: string;
  color?: string;
  particleGap?: number;
  particleSize?: number;
  connectionDistance?: number;

  mouseRadius?: number;
  mouseForce?: number;
};

type Particle = {
  x: number;
  y: number;

  targetX: number;
  targetY: number;

  vx: number;
  vy: number;
};

export default function TextPlexus({
  text = "C++",
  color = "#ffffff",
  particleGap = 7,
  particleSize = 1.8,
  connectionDistance = 22,

  mouseRadius = 100,
  mouseForce = 5,
}: TextPlexusProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationId = 0;

    const mouse = {
      x: -1000,
      y: -1000,
    };

    // ==============================
    // Resize
    // ==============================

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    // ==============================
    // Create text particles
    // ==============================

    const createTextParticles = () => {
      particles = [];

      const textCanvas =
        document.createElement("canvas");

      textCanvas.width = canvas.width;
      textCanvas.height = canvas.height;

      const textCtx =
        textCanvas.getContext("2d");

      if (!textCtx) return;

      const maxWidth =
        canvas.width * 0.8;

      const maxHeight =
        canvas.height * 0.7;

      const testFontSize = 100;

      textCtx.font =
        `900 ${testFontSize}px Arial`;

      const measurement =
        textCtx.measureText(text);

      const widthScale =
        maxWidth /
        measurement.width;

      const heightScale =
        maxHeight /
        testFontSize;

      const scale = Math.min(
        widthScale,
        heightScale
      );

      const fontSize =
        testFontSize * scale;

      textCtx.font =
        `900 ${fontSize}px Arial`;

      textCtx.textAlign = "center";
      textCtx.textBaseline = "middle";

      textCtx.fillStyle = "#ffffff";

      textCtx.fillText(
        text,
        canvas.width / 2,
        canvas.height / 2
      );

      const imageData =
        textCtx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );

      const data = imageData.data;

      for (
        let y = 0;
        y < canvas.height;
        y += particleGap
      ) {
        for (
          let x = 0;
          x < canvas.width;
          x += particleGap
        ) {
          const index =
            (y * canvas.width + x) * 4;

          const alpha =
            data[index + 3];

          if (alpha > 100) {
            particles.push({
              x:
                Math.random() *
                canvas.width,

              y:
                Math.random() *
                canvas.height,

              targetX: x,
              targetY: y,

              vx: 0,
              vy: 0,
            });
          }
        }
      }
    };

    // ==============================
    // Mouse
    // ==============================

    const handleMouseMove = (
      event: MouseEvent
    ) => {
      const rect =
        canvas.getBoundingClientRect();

      mouse.x =
        event.clientX -
        rect.left;

      mouse.y =
        event.clientY -
        rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    canvas.addEventListener(
      "mousemove",
      handleMouseMove
    );

    canvas.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    // ==============================
    // Update particles
    // ==============================

    const updateParticles = () => {
      particles.forEach(
        (particle) => {
          // --------------------------
          // Return to text shape
          // --------------------------

          const targetDx =
            particle.targetX -
            particle.x;

          const targetDy =
            particle.targetY -
            particle.y;

          particle.vx +=
            targetDx * 0.01;

          particle.vy +=
            targetDy * 0.01;

          // --------------------------
          // Mouse repulsion
          // --------------------------

          const dx =
            particle.x -
            mouse.x;

          const dy =
            particle.y -
            mouse.y;

          const distance =
            Math.sqrt(
              dx * dx +
                dy * dy
            );

          if (
            distance <
              mouseRadius &&
            distance > 0
          ) {
            // Stronger when cursor is closer
            const strength =
              1 -
              distance /
                mouseRadius;

            const angle =
              Math.atan2(
                dy,
                dx
              );

            const force =
              strength *
              mouseForce;

            particle.vx +=
              Math.cos(angle) *
              force;

            particle.vy +=
              Math.sin(angle) *
              force;
          }

          // --------------------------
          // Friction
          // --------------------------

          particle.vx *= 0.88;
          particle.vy *= 0.88;

          particle.x +=
            particle.vx;

          particle.y +=
            particle.vy;
        }
      );
    };

    // ==============================
    // Draw particles
    // ==============================

    const drawParticles = () => {
      particles.forEach(
        (particle) => {
          ctx.beginPath();

          ctx.arc(
            particle.x,
            particle.y,
            particleSize,
            0,
            Math.PI * 2
          );

          ctx.fillStyle = color;

          ctx.fill();
        }
      );
    };

    // ==============================
    // Draw connections
    // ==============================

    const drawConnections = () => {
      for (
        let i = 0;
        i < particles.length;
        i++
      ) {
        for (
          let j = i + 1;
          j < particles.length;
          j++
        ) {
          const p1 =
            particles[i];

          const p2 =
            particles[j];

          const dx =
            p1.x - p2.x;

          const dy =
            p1.y - p2.y;

          const distance =
            Math.sqrt(
              dx * dx +
                dy * dy
            );

          if (
            distance <
            connectionDistance
          ) {
            const opacity =
              1 -
              distance /
                connectionDistance;

            ctx.beginPath();

            ctx.moveTo(
              p1.x,
              p1.y
            );

            ctx.lineTo(
              p2.x,
              p2.y
            );

            ctx.strokeStyle =
              color;

            ctx.globalAlpha =
              opacity * 0.3;

            ctx.lineWidth =
              0.8;

            ctx.stroke();

            ctx.globalAlpha =
              1;
          }
        }
      }
    };

    // ==============================
    // Draw cursor radius
    // Optional
    // ==============================

    const drawCursor = () => {
      ctx.beginPath();

      ctx.arc(
        mouse.x,
        mouse.y,
        mouseRadius,
        0,
        Math.PI * 2
      );

      ctx.strokeStyle =
        color;

      ctx.globalAlpha =
        0.05;

      ctx.stroke();

      ctx.globalAlpha =
        1;
    };

    // ==============================
    // Animation
    // ==============================

    const animate = () => {
      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      updateParticles();

      drawConnections();

      drawParticles();

      // remove this if you
      // don't want cursor circle
      drawCursor();

      animationId =
        requestAnimationFrame(
          animate
        );
    };

    // ==============================
    // Start
    // ==============================

    resizeCanvas();

    createTextParticles();

    animate();

    // ==============================
    // Responsive container
    // ==============================

    const resizeObserver =
      new ResizeObserver(() => {
        resizeCanvas();
        createTextParticles();
      });

    resizeObserver.observe(
      canvas
    );

    // ==============================
    // Cleanup
    // ==============================

    return () => {
      cancelAnimationFrame(
        animationId
      );

      resizeObserver.disconnect();

      canvas.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      canvas.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
    };
  }, [
    text,
    color,
    particleGap,
    particleSize,
    connectionDistance,
    mouseRadius,
    mouseForce,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
    />
  );
}