import { useEffect, useRef } from "react";
import * as THREE from "three";

type PlexusText3DProps = {
  text?: string;
  color?: string;

  particleSize?: number;
  particleGap?: number;
  connectionDistance?: number;

  letterGap?: number;
  depth?: number;

  animation?: boolean;
  animationSpeed?: number;

  mouseRadius?: number;
  mouseForce?: number;

  maxParticlesPerLetter?: number;
};

type ParticleData = {
  target: THREE.Vector3;
  velocity: THREE.Vector3;
  letterId: number;
};

export default function PlexusText3D({
  text = "JAVA",
  color = "#ffffff",

  particleSize = 0.13,
  particleGap = 8,
  connectionDistance = 1.8,

  letterGap = 1.5,
  depth = 2,

  animation = true,
  animationSpeed = 0.012,

  mouseRadius = 3,
  mouseForce = 0.15,

  maxParticlesPerLetter = 120,
}: PlexusText3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // =====================================
    // Scene
    // =====================================

    const scene = new THREE.Scene();

    // =====================================
    // Camera
    // =====================================

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );

    camera.position.set(0, 0, 32);

    // =====================================
    // Renderer
    // =====================================

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setSize(
      container.clientWidth,
      container.clientHeight
    );

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 2)
    );

    container.appendChild(renderer.domElement);

    // =====================================
    // Group
    // =====================================

    const group = new THREE.Group();

    scene.add(group);

    // =====================================
    // Particle geometry
    // =====================================

    const particleGeometry = new THREE.BufferGeometry();

    const particleMaterial = new THREE.PointsMaterial({
      color: new THREE.Color(color),
      size: particleSize,
      transparent: true,
      opacity: 0.95,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(
      particleGeometry,
      particleMaterial
    );

    group.add(points);

    // =====================================
    // Line geometry
    // =====================================

    const lineGeometry = new THREE.BufferGeometry();

    const lineMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.25,
    });

    const lines = new THREE.LineSegments(
      lineGeometry,
      lineMaterial
    );

    group.add(lines);

    // =====================================
    // Particle data
    // =====================================

    let particles: ParticleData[] = [];
    let particleCount = 0;

    // =====================================
    // Create text particles
    // =====================================

    const createParticles = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      if (!width || !height) return;

      particles = [];

      const letters = text.split("");

      const positions: number[] = [];

      // Overall width used by text
      const totalWorldWidth = 22;

      const baseLetterWidth =
        totalWorldWidth /
        Math.max(letters.length, 1);

      // Control spacing here
      const letterSpacing =
        baseLetterWidth + letterGap;

      const startX =
        -(
          (letters.length - 1) *
          letterSpacing
        ) / 2;

      letters.forEach(
        (letter, letterIndex) => {
          // =================================
          // Hidden canvas for letter mask
          // =================================

          const maskCanvas =
            document.createElement("canvas");

          const maskSize = 500;

          maskCanvas.width = maskSize;
          maskCanvas.height = maskSize;

          const ctx =
            maskCanvas.getContext("2d");

          if (!ctx) return;

          ctx.clearRect(
            0,
            0,
            maskSize,
            maskSize
          );

          // =================================
          // Draw letter
          // =================================

          const fontSize = 400;

          ctx.font =
            `900 ${fontSize}px Arial`;

          ctx.textAlign = "center";

          ctx.textBaseline = "middle";

          ctx.fillStyle = "#ffffff";

          ctx.fillText(
            letter,
            maskSize / 2,
            maskSize / 2
          );

          // =================================
          // Read pixels
          // =================================

          const imageData =
            ctx.getImageData(
              0,
              0,
              maskSize,
              maskSize
            );

          const data = imageData.data;

          const sampledPixels: {
            x: number;
            y: number;
          }[] = [];

          for (
            let y = 0;
            y < maskSize;
            y += particleGap
          ) {
            for (
              let x = 0;
              x < maskSize;
              x += particleGap
            ) {
              const index =
                (y * maskSize + x) * 4;

              const alpha =
                data[index + 3];

              if (alpha > 100) {
                sampledPixels.push({
                  x,
                  y,
                });
              }
            }
          }

          // =================================
          // Limit particle count
          // =================================

          const step = Math.max(
            1,
            Math.ceil(
              sampledPixels.length /
                maxParticlesPerLetter
            )
          );

          const filteredPixels =
            sampledPixels.filter(
              (_, index) =>
                index % step === 0
            );

          // =================================
          // Letter position
          // =================================

          const letterCenterX =
            startX +
            letterIndex *
              letterSpacing;

          const worldLetterWidth =
            baseLetterWidth * 0.75;

          const worldLetterHeight = 9;

          // =================================
          // Create particles
          // =================================

          filteredPixels.forEach(
            (pixel) => {
              const normalizedX =
                pixel.x / maskSize -
                0.5;

              const normalizedY =
                pixel.y / maskSize -
                0.5;

              const targetX =
                letterCenterX +
                normalizedX *
                  worldLetterWidth;

              const targetY =
                -normalizedY *
                worldLetterHeight;

              const targetZ =
                (Math.random() - 0.5) *
                depth;

              // If animation is enabled,
              // particles start scattered.
              // Otherwise they start
              // directly at their targets.

              const startXPosition =
                animation
                  ? targetX +
                    (Math.random() - 0.5) *
                      12
                  : targetX;

              const startYPosition =
                animation
                  ? targetY +
                    (Math.random() - 0.5) *
                      12
                  : targetY;

              const startZPosition =
                animation
                  ? (Math.random() - 0.5) *
                    15
                  : targetZ;

              positions.push(
                startXPosition,
                startYPosition,
                startZPosition
              );

              particles.push({
                target:
                  new THREE.Vector3(
                    targetX,
                    targetY,
                    targetZ
                  ),

                velocity:
                  new THREE.Vector3(),

                // Each letter has its own ID
                letterId: letterIndex,
              });
            }
          );
        }
      );

      particleCount =
        particles.length;

      particleGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(
          positions,
          3
        )
      );
    };

    // =====================================
    // Mouse
    // =====================================

    const mouse =
      new THREE.Vector2(
        100,
        100
      );

    const mouseWorld =
      new THREE.Vector3(
        1000,
        1000,
        1000
      );

    const raycaster =
      new THREE.Raycaster();

    const interactionPlane =
      new THREE.Plane(
        new THREE.Vector3(
          0,
          0,
          1
        ),
        0
      );

    const handleMouseMove = (
      event: MouseEvent
    ) => {
      const rect =
        renderer.domElement.getBoundingClientRect();

      mouse.x =
        ((event.clientX -
          rect.left) /
          rect.width) *
          2 -
        1;

      mouse.y =
        -(
          (event.clientY -
            rect.top) /
          rect.height
        ) *
          2 +
        1;

      raycaster.setFromCamera(
        mouse,
        camera
      );

      raycaster.ray.intersectPlane(
        interactionPlane,
        mouseWorld
      );
    };

    const handleMouseLeave = () => {
      mouseWorld.set(
        1000,
        1000,
        1000
      );
    };

    renderer.domElement.addEventListener(
      "mousemove",
      handleMouseMove
    );

    renderer.domElement.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    // =====================================
    // Update particles
    // =====================================

    const updateParticles = () => {
      const position =
        particleGeometry.getAttribute(
          "position"
        ) as THREE.BufferAttribute;

      if (!position) return;

      for (
        let i = 0;
        i < particleCount;
        i++
      ) {
        const particle =
          particles[i];

        let x = position.getX(i);
        let y = position.getY(i);
        let z = position.getZ(i);

        const target =
          particle.target;

        const velocity =
          particle.velocity;

        // =================================
        // Return to letter target
        // =================================

        const dx =
          target.x - x;

        const dy =
          target.y - y;

        const dz =
          target.z - z;

        velocity.x +=
          dx * animationSpeed;

        velocity.y +=
          dy * animationSpeed;

        velocity.z +=
          dz * animationSpeed;

        // =================================
        // Mouse push
        // =================================

        const mouseDx =
          x - mouseWorld.x;

        const mouseDy =
          y - mouseWorld.y;

        const mouseDz =
          z - mouseWorld.z;

        const distance =
          Math.sqrt(
            mouseDx * mouseDx +
              mouseDy * mouseDy +
              mouseDz * mouseDz
          );

        if (
          distance < mouseRadius &&
          distance > 0
        ) {
          const strength =
            1 -
            distance /
              mouseRadius;

          const force =
            strength *
            mouseForce;

          velocity.x +=
            (mouseDx / distance) *
            force;

          velocity.y +=
            (mouseDy / distance) *
            force;

          velocity.z +=
            (mouseDz / distance) *
            force *
            2;
        }

        // =================================
        // Friction
        // =================================

        velocity.multiplyScalar(
          0.9
        );

        x += velocity.x;
        y += velocity.y;
        z += velocity.z;

        position.setXYZ(
          i,
          x,
          y,
          z
        );
      }

      position.needsUpdate =
        true;
    };

    // =====================================
    // Update connection lines
    // =====================================

    const updateConnections = () => {
      const position =
        particleGeometry.getAttribute(
          "position"
        ) as THREE.BufferAttribute;

      if (!position) return;

      const linePositions: number[] =
        [];

      const maxDistanceSquared =
        connectionDistance *
        connectionDistance;

      for (
        let i = 0;
        i < particleCount;
        i++
      ) {
        const particleA =
          particles[i];

        const ax =
          position.getX(i);

        const ay =
          position.getY(i);

        const az =
          position.getZ(i);

        for (
          let j = i + 1;
          j < particleCount;
          j++
        ) {
          const particleB =
            particles[j];

          // =================================
          // DON'T CONNECT DIFFERENT LETTERS
          // =================================

          if (
            particleA.letterId !==
            particleB.letterId
          ) {
            continue;
          }

          const bx =
            position.getX(j);

          const by =
            position.getY(j);

          const bz =
            position.getZ(j);

          const dx = ax - bx;
          const dy = ay - by;
          const dz = az - bz;

          const distanceSquared =
            dx * dx +
            dy * dy +
            dz * dz;

          if (
            distanceSquared <
            maxDistanceSquared
          ) {
            linePositions.push(
              ax,
              ay,
              az,

              bx,
              by,
              bz
            );
          }
        }
      }

      lineGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(
          linePositions,
          3
        )
      );
    };

    // =====================================
    // Animation loop
    // NO ROTATION
    // =====================================

    let animationId = 0;

    const animateScene = () => {
      animationId =
        requestAnimationFrame(
          animateScene
        );

      updateParticles();

      updateConnections();

      // No group.rotation here

      renderer.render(
        scene,
        camera
      );
    };

    // =====================================
    // Resize
    // =====================================

    const handleResize = () => {
      const width =
        container.clientWidth;

      const height =
        container.clientHeight;

      if (!width || !height) return;

      camera.aspect =
        width / height;

      camera.updateProjectionMatrix();

      renderer.setSize(
        width,
        height
      );

      renderer.setPixelRatio(
        Math.min(
          window.devicePixelRatio,
          2
        )
      );

      createParticles();
    };

    const resizeObserver =
      new ResizeObserver(
        handleResize
      );

    resizeObserver.observe(
      container
    );

    // =====================================
    // Start
    // =====================================

    createParticles();

    animateScene();

    // =====================================
    // Cleanup
    // =====================================

    return () => {
      cancelAnimationFrame(
        animationId
      );

      resizeObserver.disconnect();

      renderer.domElement.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      renderer.domElement.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );

      particleGeometry.dispose();

      particleMaterial.dispose();

      lineGeometry.dispose();

      lineMaterial.dispose();

      renderer.dispose();

      if (
        renderer.domElement
          .parentElement ===
        container
      ) {
        container.removeChild(
          renderer.domElement
        );
      }
    };
  }, [
    text,
    color,
    particleSize,
    particleGap,
    connectionDistance,
    letterGap,
    depth,
    animation,
    animationSpeed,
    mouseRadius,
    mouseForce,
    maxParticlesPerLetter,
  ]);

  return (
    <div
      ref={containerRef}
      className="h-full w-full"
    />
  );
}