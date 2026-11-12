"use client";

import { Hourglass } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type ThreeHourglassProps = {
  flipSignal: number;
};

function seededRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function createSandCloud(
  count: number,
  yMin: number,
  yMax: number,
  radiusAtY: (y: number) => number,
) {
  const positions = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const y = yMin + seededRandom(index + 11) * (yMax - yMin);
    const radius = radiusAtY(y) * Math.sqrt(seededRandom(index + 29));
    const angle = seededRandom(index + 47) * Math.PI * 2;

    positions[index * 3] = Math.cos(angle) * radius;
    positions[index * 3 + 1] = y;
    positions[index * 3 + 2] = Math.sin(angle) * radius;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  return geometry;
}

export default function ThreeHourglass({ flipSignal }: ThreeHourglassProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const flipSignalRef = useRef(flipSignal);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    flipSignalRef.current = flipSignal;
  }, [flipSignal]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.15, 9);

    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    const hourglass = new THREE.Group();
    hourglass.rotation.x = -0.08;
    scene.add(hourglass);

    const glassProfile = [
      new THREE.Vector2(1.16, -1.9),
      new THREE.Vector2(1.08, -1.72),
      new THREE.Vector2(0.82, -1.25),
      new THREE.Vector2(0.26, -0.25),
      new THREE.Vector2(0.12, -0.06),
      new THREE.Vector2(0.12, 0.06),
      new THREE.Vector2(0.26, 0.25),
      new THREE.Vector2(0.82, 1.25),
      new THREE.Vector2(1.08, 1.72),
      new THREE.Vector2(1.16, 1.9),
    ];
    const glassGeometry = new THREE.LatheGeometry(glassProfile, 64);
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xdce7ee,
      metalness: 0,
      roughness: 0.08,
      transmission: 0.96,
      transparent: true,
      opacity: 0.34,
      thickness: 0.24,
      ior: 1.46,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const glass = new THREE.Mesh(glassGeometry, glassMaterial);
    glass.renderOrder = 2;
    hourglass.add(glass);

    const metalMaterial = new THREE.MeshStandardMaterial({
      color: 0x525761,
      metalness: 0.92,
      roughness: 0.24,
    });
    const darkMetalMaterial = new THREE.MeshStandardMaterial({
      color: 0x17191e,
      metalness: 0.85,
      roughness: 0.3,
    });

    for (const y of [-2.05, 2.05]) {
      const rim = new THREE.Mesh(
        new THREE.TorusGeometry(1.3, 0.085, 18, 64),
        metalMaterial,
      );
      rim.rotation.x = Math.PI / 2;
      rim.position.y = y;
      hourglass.add(rim);

      const plate = new THREE.Mesh(
        new THREE.CylinderGeometry(1.24, 1.24, 0.12, 64),
        darkMetalMaterial,
      );
      plate.position.y = y + (y > 0 ? 0.08 : -0.08);
      hourglass.add(plate);
    }

    for (let index = 0; index < 4; index += 1) {
      const angle = Math.PI / 4 + index * (Math.PI / 2);
      const support = new THREE.Mesh(
        new THREE.CylinderGeometry(0.055, 0.055, 4.08, 16),
        metalMaterial,
      );
      support.position.set(Math.cos(angle) * 1.18, 0, Math.sin(angle) * 1.18);
      hourglass.add(support);
    }

    const sandMaterial = new THREE.PointsMaterial({
      color: 0xc9a56a,
      size: 0.045,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
    });

    const upperSand = new THREE.Points(
      createSandCloud(650, 0.2, 1.55, (y) => 0.14 + (y - 0.2) * 0.48),
      sandMaterial,
    );
    const lowerSand = new THREE.Points(
      createSandCloud(850, -1.64, -0.94, (y) => 0.92 - (y + 1.64) * 0.92),
      sandMaterial,
    );
    hourglass.add(upperSand, lowerSand);

    const streamCount = 140;
    const streamPositions = new Float32Array(streamCount * 3);
    const streamGeometry = new THREE.BufferGeometry();
    streamGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(streamPositions, 3),
    );
    const stream = new THREE.Points(streamGeometry, sandMaterial);
    hourglass.add(stream);

    scene.add(new THREE.HemisphereLight(0xd9e8ff, 0x080808, 1.2));
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.5);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);
    const edgeLight = new THREE.PointLight(0x79bfff, 12, 14);
    edgeLight.position.set(-4, 0.5, 3);
    scene.add(edgeLight);
    const warmLight = new THREE.PointLight(0xd6a25c, 7, 10);
    warmLight.position.set(2, -3, 2);
    scene.add(warmLight);

    const pointer = new THREE.Vector2();
    const targetPointer = new THREE.Vector2();
    const onPointerMove = (event: PointerEvent) => {
      const bounds = container.getBoundingClientRect();
      targetPointer.set(
        ((event.clientX - bounds.left) / bounds.width - 0.5) * 2,
        ((event.clientY - bounds.top) / bounds.height - 0.5) * 2,
      );
    };
    const onPointerLeave = () => targetPointer.set(0, 0);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerLeave);

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    const clock = new THREE.Clock();
    let animationFrame = 0;

    const render = () => {
      const delta = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.elapsedTime;

      if (!reduceMotion) {
        pointer.lerp(targetPointer, 0.045);
        hourglass.rotation.y = elapsed * 0.12 + pointer.x * 0.16;
        hourglass.rotation.x = -0.08 + pointer.y * 0.1;
      }

      const targetFlip = flipSignalRef.current * Math.PI;
      hourglass.rotation.z = THREE.MathUtils.damp(
        hourglass.rotation.z,
        targetFlip,
        reduceMotion ? 20 : 3.8,
        delta,
      );

      const positions = streamGeometry.attributes.position.array as Float32Array;
      for (let index = 0; index < streamCount; index += 1) {
        const progress = (elapsed * 0.48 + index / streamCount) % 1;
        positions[index * 3] = Math.sin(index * 4.7) * 0.018;
        positions[index * 3 + 1] = 0.14 - progress * 1.08;
        positions[index * 3 + 2] = Math.cos(index * 3.9) * 0.018;
      }
      streamGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(render);
    };

    setReady(true);
    render();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-label="Animated glass hourglass with flowing sand"
      role="img"
      className="relative h-64 w-64 touch-none overflow-hidden sm:h-72 sm:w-72"
    >
      <div
        className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      >
        <Hourglass strokeWidth={1} className="h-52 w-52 text-zinc-300" />
      </div>
    </div>
  );
}
