import { useEffect, useRef } from "react";
import * as THREE from "three";

type PlexusSphereProps = {
  color?: string;

  // Shape
  shape?: "sphere" | "lock";

  // Sphere
  radius?: number;

  // Particles
  particleCount?: number;
  particleSize?: number;
  connectionDistance?: number;

  // Cursor
  cursorRadius?: number;
  cursorPull?: number;
  returnSpeed?: number;

  // Initial animation
  animation?: boolean;
  animationSpeed?: number;

  // Shape morph
  morphSpeed?: number;

  // Lock
  lockWidth?: number;
  lockHeight?: number;
  lockDepth?: number;

  // Rotation
  rotate?: boolean;
  rotateSpeedX?: number;
  rotateSpeedY?: number;
};

type ParticleData = {
  target: THREE.Vector3;
  velocity: THREE.Vector3;
};

export default function PlexusSphere({
  color = "#ffffff",

  shape = "sphere",

  radius = 6,

  particleCount = 220,
  particleSize = 0.13,
  connectionDistance = 2,

  cursorRadius = 5,
  cursorPull = 0.06,
  returnSpeed = 0.012,

  animation = true,
  animationSpeed = 0.015,

  morphSpeed = 0.035,

  lockWidth = 10,
  lockHeight = 11,
  lockDepth = 2,

  rotate = true,
  rotateSpeedX = 0.0002,
  rotateSpeedY = 0.0015,
}: PlexusSphereProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    // =========================================================
    // SCENE
    // =========================================================

    const scene = new THREE.Scene();

    // =========================================================
    // CAMERA
    // =========================================================

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );

    camera.position.set(0, 0, 22);

    // =========================================================
    // RENDERER
    // =========================================================

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

    // =========================================================
    // GROUP
    // =========================================================

    const group = new THREE.Group();

    scene.add(group);

    // =========================================================
    // PARTICLES
    // =========================================================

    const particleGeometry = new THREE.BufferGeometry();

    const particleMaterial = new THREE.PointsMaterial({
      color: new THREE.Color(color),

      size: particleSize,

      transparent: true,

      opacity: 0.95,

      sizeAttenuation: true,
    });

    const pointCloud = new THREE.Points(
      particleGeometry,
      particleMaterial
    );

    group.add(pointCloud);

    // =========================================================
    // LINES
    // =========================================================

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

    // =========================================================
    // SHAPE TARGETS
    // =========================================================

    const sphereTargets: THREE.Vector3[] = [];
    const lockTargets: THREE.Vector3[] = [];

    const particles: ParticleData[] = [];

    // =========================================================
    // CREATE SPHERE TARGETS
    // Fibonacci sphere
    // =========================================================

    const createSphereTargets = () => {
      sphereTargets.length = 0;

      for (let i = 0; i < particleCount; i++) {
        const y =
          1 -
          (i /
            Math.max(
              particleCount - 1,
              1
            )) *
            2;

        const radiusAtY = Math.sqrt(
          Math.max(
            0,
            1 - y * y
          )
        );

        const theta =
          Math.PI *
          (3 - Math.sqrt(5)) *
          i;

        const x =
          Math.cos(theta) *
          radiusAtY;

        const z =
          Math.sin(theta) *
          radiusAtY;

        sphereTargets.push(
          new THREE.Vector3(
            x * radius,
            y * radius,
            z * radius
          )
        );
      }
    };

    // =========================================================
    // CREATE LOCK TARGETS
    // =========================================================

    const createLockTargets = () => {
      lockTargets.length = 0;

      const maskCanvas =
        document.createElement("canvas");

      const size = 600;

      maskCanvas.width = size;
      maskCanvas.height = size;

      const ctx =
        maskCanvas.getContext("2d");

      if (!ctx) return;

      ctx.clearRect(
        0,
        0,
        size,
        size
      );

      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = "#ffffff";

      // =====================================================
      // LOCK SHACKLE
      // =====================================================

      ctx.lineWidth = 55;

      ctx.lineCap = "round";

      ctx.beginPath();

      ctx.arc(
        size / 2,
        235,
        115,
        Math.PI,
        Math.PI * 2
      );

      ctx.stroke();

      // Left shackle side
      ctx.fillRect(
        158,
        225,
        55,
        110
      );

      // Right shackle side
      ctx.fillRect(
        387,
        225,
        55,
        110
      );

      // =====================================================
      // LOCK BODY
      // =====================================================

      const bodyX = 100;
      const bodyY = 310;
      const bodyWidth = 400;
      const bodyHeight = 220;

      ctx.beginPath();

      ctx.roundRect(
        bodyX,
        bodyY,
        bodyWidth,
        bodyHeight,
        35
      );

      ctx.fill();

      // =====================================================
      // REMOVE KEYHOLE
      // =====================================================

      ctx.globalCompositeOperation =
        "destination-out";

      // Keyhole circle
      ctx.beginPath();

      ctx.arc(
        size / 2,
        405,
        25,
        0,
        Math.PI * 2
      );

      ctx.fill();

      // Keyhole bottom
      ctx.fillRect(
        size / 2 - 11,
        405,
        22,
        70
      );

      ctx.globalCompositeOperation =
        "source-over";

      // =====================================================
      // GET PIXELS
      // =====================================================

      const imageData =
        ctx.getImageData(
          0,
          0,
          size,
          size
        );

      const pixels: {
        x: number;
        y: number;
      }[] = [];

      const gap = 10;

      for (
        let y = 0;
        y < size;
        y += gap
      ) {
        for (
          let x = 0;
          x < size;
          x += gap
        ) {
          const index =
            (y * size + x) * 4;

          const alpha =
            imageData.data[
              index + 3
            ];

          if (alpha > 100) {
            pixels.push({
              x,
              y,
            });
          }
        }
      }

      if (pixels.length === 0) {
        return;
      }

      // =====================================================
      // MATCH LOCK POINTS TO PARTICLE COUNT
      // =====================================================

      for (
        let i = 0;
        i < particleCount;
        i++
      ) {
        const percentage =
          i /
          Math.max(
            particleCount - 1,
            1
          );

        const pixelIndex =
          Math.floor(
            percentage *
              (pixels.length - 1)
          );

        const pixel =
          pixels[pixelIndex];

        const normalizedX =
          pixel.x / size - 0.5;

        const normalizedY =
          pixel.y / size - 0.5;

        const x =
          normalizedX *
          lockWidth;

        const y =
          -normalizedY *
          lockHeight;

        // Give the flat mask actual Z thickness
        const z =
          (Math.random() - 0.5) *
          lockDepth;

        lockTargets.push(
          new THREE.Vector3(
            x,
            y,
            z
          )
        );
      }
    };

    // =========================================================
    // CREATE TARGETS
    // =========================================================

    createSphereTargets();
    createLockTargets();

    // =========================================================
    // INITIAL PARTICLE POSITIONS
    // =========================================================

    const positions =
      new Float32Array(
        particleCount * 3
      );

    for (
      let i = 0;
      i < particleCount;
      i++
    ) {
      const startTarget =
        shape === "lock"
          ? lockTargets[i]
          : sphereTargets[i];

      const fallbackTarget =
        sphereTargets[i];

      const target =
        startTarget ??
        fallbackTarget;

      particles.push({
        target:
          target.clone(),

        velocity:
          new THREE.Vector3(),
      });

      if (animation) {
        positions[i * 3] =
          (Math.random() - 0.5) *
          radius *
          4;

        positions[
          i * 3 + 1
        ] =
          (Math.random() - 0.5) *
          radius *
          4;

        positions[
          i * 3 + 2
        ] =
          (Math.random() - 0.5) *
          radius *
          4;
      } else {
        positions[i * 3] =
          target.x;

        positions[
          i * 3 + 1
        ] =
          target.y;

        positions[
          i * 3 + 2
        ] =
          target.z;
      }
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        positions,
        3
      )
    );

    // =========================================================
    // CURSOR
    // =========================================================

    const mouse =
      new THREE.Vector2();

    const mouseWorld =
      new THREE.Vector3(
        1000,
        1000,
        0
      );

    const mouseLocal =
      new THREE.Vector3(
        1000,
        1000,
        0
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

    let mouseActive = false;

    let activeParticleIndex = -1;

    // =========================================================
    // POINTER MOVE
    // =========================================================

    const handlePointerMove = (
      event: PointerEvent
    ) => {
      const rect =
        renderer.domElement.getBoundingClientRect();

      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!inside) {
        mouseActive = false;

        activeParticleIndex = -1;

        mouseWorld.set(
          1000,
          1000,
          0
        );

        return;
      }

      mouseActive = true;

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

      const hit =
        raycaster.ray.intersectPlane(
          interactionPlane,
          mouseWorld
        );

      if (!hit) {
        mouseActive = false;
      }
    };

    const handlePointerLeave =
      () => {
        mouseActive = false;

        activeParticleIndex = -1;

        mouseWorld.set(
          1000,
          1000,
          0
        );
      };

    window.addEventListener(
      "pointermove",
      handlePointerMove
    );

    window.addEventListener(
      "pointerleave",
      handlePointerLeave
    );

    // =========================================================
    // UPDATE MOUSE LOCAL POSITION
    // =========================================================

    const updateMouseLocal = () => {
      if (!mouseActive) {
        mouseLocal.set(
          1000,
          1000,
          0
        );

        return;
      }

      mouseLocal.copy(
        mouseWorld
      );

      group.worldToLocal(
        mouseLocal
      );
    };

    // =========================================================
    // MORPH TARGETS
    // =========================================================

    const updateMorph = () => {
      for (
        let i = 0;
        i < particleCount;
        i++
      ) {
        const wantedTarget =
          shape === "lock"
            ? lockTargets[i]
            : sphereTargets[i];

        if (!wantedTarget) {
          continue;
        }

        particles[
          i
        ].target.lerp(
          wantedTarget,
          morphSpeed
        );
      }
    };

    // =========================================================
    // FIND NEAREST PARTICLE
    // =========================================================

    const findActiveParticle =
      () => {
        if (!mouseActive) {
          activeParticleIndex =
            -1;

          return;
        }

        const position =
          particleGeometry.getAttribute(
            "position"
          ) as THREE.BufferAttribute;

        if (!position) return;

        let nearestIndex =
          -1;

        let nearestDistance =
          cursorRadius;

        for (
          let i = 0;
          i < particleCount;
          i++
        ) {
          const x =
            position.getX(i);

          const y =
            position.getY(i);

          const dx =
            x - mouseLocal.x;

          const dy =
            y - mouseLocal.y;

          const distance =
            Math.sqrt(
              dx * dx +
                dy * dy
            );

          if (
            distance <
            nearestDistance
          ) {
            nearestDistance =
              distance;

            nearestIndex = i;
          }
        }

        activeParticleIndex =
          nearestIndex;
      };

    // =========================================================
    // UPDATE PARTICLES
    // =========================================================

    const updateParticles =
      () => {
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

          const target =
            particle.target;

          const velocity =
            particle.velocity;

          let x =
            position.getX(i);

          let y =
            position.getY(i);

          let z =
            position.getZ(i);

          // ===================================================
          // CURSOR PARTICLE
          // ===================================================

          if (
            i ===
              activeParticleIndex &&
            mouseActive
          ) {
            const dx =
              mouseLocal.x - x;

            const dy =
              mouseLocal.y - y;

            const dz =
              mouseLocal.z - z;

            velocity.x +=
              dx * cursorPull;

            velocity.y +=
              dy * cursorPull;

            velocity.z +=
              dz * cursorPull;
          }

          // ===================================================
          // RETURN / MORPH TO SHAPE
          // ===================================================

          else {
            const dx =
              target.x - x;

            const dy =
              target.y - y;

            const dz =
              target.z - z;

            const speed =
              animation
                ? animationSpeed
                : returnSpeed;

            velocity.x +=
              dx * speed;

            velocity.y +=
              dy * speed;

            velocity.z +=
              dz * speed;
          }

          // Friction
          velocity.multiplyScalar(
            0.88
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

    // =========================================================
    // UPDATE CONNECTIONS
    // =========================================================

    const updateConnections =
      () => {
        const position =
          particleGeometry.getAttribute(
            "position"
          ) as THREE.BufferAttribute;

        if (!position) return;

        const linePositions:
          number[] = [];

        const maxDistanceSquared =
          connectionDistance *
          connectionDistance;

        for (
          let i = 0;
          i < particleCount;
          i++
        ) {
          // Active cursor particle disconnects
          if (
            i ===
            activeParticleIndex
          ) {
            continue;
          }

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
            if (
              j ===
              activeParticleIndex
            ) {
              continue;
            }

            const bx =
              position.getX(j);

            const by =
              position.getY(j);

            const bz =
              position.getZ(j);

            const dx =
              ax - bx;

            const dy =
              ay - by;

            const dz =
              az - bz;

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

        // =====================================================
        // ACTIVE PARTICLE -> CURSOR
        // =====================================================

        if (
          activeParticleIndex !==
            -1 &&
          mouseActive
        ) {
          const px =
            position.getX(
              activeParticleIndex
            );

          const py =
            position.getY(
              activeParticleIndex
            );

          const pz =
            position.getZ(
              activeParticleIndex
            );

          linePositions.push(
            px,
            py,
            pz,

            mouseLocal.x,
            mouseLocal.y,
            mouseLocal.z
          );
        }

        lineGeometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(
            linePositions,
            3
          )
        );
      };

    // =========================================================
    // ANIMATION
    // =========================================================

    let animationFrame = 0;

    const animate = () => {
      animationFrame =
        requestAnimationFrame(
          animate
        );

      // =======================================================
      // ROTATION
      // =======================================================

      if (
        rotate &&
        shape === "sphere"
      ) {
        group.rotation.x +=
          rotateSpeedX;

        group.rotation.y +=
          rotateSpeedY;
      }

      // When transforming to lock,
      // slowly face the camera again.
      if (shape === "lock") {
        group.rotation.x =
          THREE.MathUtils.lerp(
            group.rotation.x,
            0,
            0.05
          );

        group.rotation.y =
          THREE.MathUtils.lerp(
            group.rotation.y,
            0,
            0.05
          );

        group.rotation.z =
          THREE.MathUtils.lerp(
            group.rotation.z,
            0,
            0.05
          );
      }

      group.updateMatrixWorld(
        true
      );

      // Morph between shapes
      updateMorph();

      // Cursor
      updateMouseLocal();

      findActiveParticle();

      // Physics
      updateParticles();

      // Plexus lines
      updateConnections();

      renderer.render(
        scene,
        camera
      );
    };

    animate();

    // =========================================================
    // RESIZE
    // =========================================================

    const handleResize = () => {
      const width =
        container.clientWidth;

      const height =
        container.clientHeight;

      if (
        !width ||
        !height
      ) {
        return;
      }

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
    };

    const resizeObserver =
      new ResizeObserver(
        handleResize
      );

    resizeObserver.observe(
      container
    );

    // =========================================================
    // CLEANUP
    // =========================================================

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      resizeObserver.disconnect();

      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      window.removeEventListener(
        "pointerleave",
        handlePointerLeave
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
    color,
    shape,

    radius,

    particleCount,
    particleSize,
    connectionDistance,

    cursorRadius,
    cursorPull,
    returnSpeed,

    animation,
    animationSpeed,

    morphSpeed,

    lockWidth,
    lockHeight,
    lockDepth,

    rotate,
    rotateSpeedX,
    rotateSpeedY,
  ]);

  return (
    <div
      ref={containerRef}
      className="h-full w-full"
    />
  );
}