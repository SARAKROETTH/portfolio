import { useEffect, useRef } from "react";

type PlexusProps = {
  color?: string;
  particleCount?: number;
  connectionDistance?: number;
  particleSize?: number;
  speed?: number;

  width?: string;
  height?: string;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export default function Plexus2D({
  color = "#ffffff",
  particleCount = 70,
  connectionDistance = 200,
  particleSize = 2,
  speed = 0.4,

  width = "100%",
  height = "100vh",
}: PlexusProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const particles: Particle[] = [];

    let animationId: number;

    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };

    const createParticles = () => {
      particles.length = 0;

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,

          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      // Draw particles
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce horizontally
        if (
          particle.x <= 0 ||
          particle.x >= canvas.width
        ) {
          particle.vx *= -1;
        }

        // Bounce vertically
        if (
          particle.y <= 0 ||
          particle.y >= canvas.height
        ) {
          particle.vy *= -1;
        }

        ctx.beginPath();

        ctx.arc(
          particle.x,
          particle.y,
          particleSize,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = color;
        ctx.globalAlpha = 0.8;

        ctx.fill();

        ctx.globalAlpha = 1;
      });

      // Connections
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
          const p1 = particles[i];
          const p2 = particles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;

          const distance = Math.sqrt(
            dx * dx + dy * dy
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

            ctx.strokeStyle = color;

            ctx.globalAlpha =
              opacity * 0.25;

            ctx.lineWidth = 1;

            ctx.stroke();

            ctx.globalAlpha = 1;
          }
        }
      }

      animationId =
        requestAnimationFrame(draw);
    };

    resize();
    createParticles();
    draw();

    const handleResize = () => {
      resize();
      createParticles();
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      cancelAnimationFrame(
        animationId
      );

      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, [
    color,
    particleCount,
    connectionDistance,
    particleSize,
    speed,
    width,
    height,
  ]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width,
        height,
        display: "block",
      }}
    />
  );
}