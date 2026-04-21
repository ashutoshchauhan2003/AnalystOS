"use client";

import { memo, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import { labStations, type LabStation, type LabStationId } from "@/content/learner-lab";
import type { LabQualityMode } from "@/components/learner-lab/analyst-lab-experience";

type SceneStationId = Exclude<LabStationId, "hub">;
type SceneStation = LabStation & { id: SceneStationId };

const sceneStationNodes = labStations.filter(
  (station): station is SceneStation => station.id !== "hub",
);
const stationMap = new Map(labStations.map((station) => [station.id, station]));
const wallPlanes: Array<{ position: [number, number, number]; rotation: [number, number, number]; size: [number, number] }> = [
  { position: [0, 4.1, -15], rotation: [0, 0, 0], size: [30, 9] },
  { position: [-15, 4.1, 0], rotation: [0, Math.PI / 2, 0], size: [30, 9] },
  { position: [15, 4.1, 0], rotation: [0, -Math.PI / 2, 0], size: [30, 9] },
];
const stationSilhouettes: Record<
  Exclude<LabStationId, "hub">,
  {
    height: number;
    baseRadius: number;
    topRadius: number;
    panelWidth: number;
    panelHeight: number;
    lift: number;
    yScale: number;
  }
> = {
  "kpi-wall": {
    height: 1.95,
    baseRadius: 1.58,
    topRadius: 1.4,
    panelWidth: 2.15,
    panelHeight: 1.05,
    lift: 0.08,
    yScale: 1.06,
  },
  "path-station": {
    height: 1.58,
    baseRadius: 1.28,
    topRadius: 1.1,
    panelWidth: 1.58,
    panelHeight: 0.72,
    lift: 0.14,
    yScale: 0.98,
  },
  "project-lab": {
    height: 2.05,
    baseRadius: 1.52,
    topRadius: 1.3,
    panelWidth: 2.05,
    panelHeight: 0.88,
    lift: 0.18,
    yScale: 1.08,
  },
  "activity-terminal": {
    height: 1.72,
    baseRadius: 1.22,
    topRadius: 1.02,
    panelWidth: 1.48,
    panelHeight: 0.92,
    lift: 0.04,
    yScale: 0.94,
  },
  "recommendation-console": {
    height: 1.78,
    baseRadius: 1.36,
    topRadius: 1.12,
    panelWidth: 1.72,
    panelHeight: 0.8,
    lift: 0.1,
    yScale: 1.02,
  },
  "progress-station": {
    height: 1.9,
    baseRadius: 1.42,
    topRadius: 1.22,
    panelWidth: 1.82,
    panelHeight: 0.76,
    lift: 0.12,
    yScale: 1.04,
  },
};

type AnalystLabCanvasProps = {
  activeStationId: LabStationId;
  onSelectStation: (stationId: LabStationId) => void;
  qualityMode: LabQualityMode;
};

type QualityProfile = {
  dpr: [number, number];
  floorSegments: number;
  ringSegments: number;
  gridSteps: number;
  showLabels: boolean;
  cameraSmoothTime: number;
  draggingSmoothTime: number;
  ambientIntensity: number;
  directionalIntensity: number;
  activeLightIntensity: number;
  activeLightDistance: number;
  fogNear: number;
  fogFar: number;
  wallGlowOpacity: number;
  floorRingOpacity: number;
  activeRingOpacity: number;
};

const STANDARD_PROFILE: QualityProfile = {
  dpr: [1, 1.05],
  floorSegments: 28,
  ringSegments: 20,
  gridSteps: 8,
  showLabels: false,
  cameraSmoothTime: 0.42,
  draggingSmoothTime: 0.1,
  ambientIntensity: 0.5,
  directionalIntensity: 0.92,
  activeLightIntensity: 3.2,
  activeLightDistance: 5.2,
  fogNear: 14,
  fogFar: 28,
  wallGlowOpacity: 0.035,
  floorRingOpacity: 0.11,
  activeRingOpacity: 0.34,
};

const LOW_PROFILE: QualityProfile = {
  dpr: [1, 1],
  floorSegments: 18,
  ringSegments: 14,
  gridSteps: 6,
  showLabels: false,
  cameraSmoothTime: 0.32,
  draggingSmoothTime: 0.06,
  ambientIntensity: 0.44,
  directionalIntensity: 0.82,
  activeLightIntensity: 2.4,
  activeLightDistance: 4.2,
  fogNear: 15,
  fogFar: 26,
  wallGlowOpacity: 0.022,
  floorRingOpacity: 0.08,
  activeRingOpacity: 0.26,
};

export function AnalystLabCanvas({
  activeStationId,
  onSelectStation,
  qualityMode,
}: AnalystLabCanvasProps) {
  const activeStation = useMemo(
    () => stationMap.get(activeStationId) ?? labStations[0],
    [activeStationId],
  );
  const quality = qualityMode === "low" ? LOW_PROFILE : STANDARD_PROFILE;

  return (
    <Canvas
      frameloop="demand"
      camera={{ position: [0, 4.2, 13.5], fov: 42 }}
      dpr={quality.dpr}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#050913"]} />
      <fog attach="fog" args={["#050913", quality.fogNear, quality.fogFar]} />
      <Suspense fallback={null}>
        <LabLights activeStation={activeStation} quality={quality} />
        <CameraRail activeStation={activeStation} quality={quality} />
        <MemoSimpleRoom quality={quality} activeStation={activeStation} />
        {sceneStationNodes.map((station) => (
          <MemoLabStationMarker
            key={station.id}
            station={station}
            isActive={station.id === activeStationId}
            onSelect={onSelectStation}
            ringSegments={quality.ringSegments}
          />
        ))}
      </Suspense>
    </Canvas>
  );
}

function CameraRail({
  activeStation,
  quality,
}: {
  activeStation: LabStation;
  quality: QualityProfile;
}) {
  const controlsRef = useRef<CameraControls | null>(null);

  useEffect(() => {
    if (!controlsRef.current) return;

    controlsRef.current.smoothTime = quality.cameraSmoothTime;
    controlsRef.current.draggingSmoothTime = quality.draggingSmoothTime;
    controlsRef.current.dollyToCursor = false;
    controlsRef.current.infinityDolly = false;

    const focusLift = activeStation.id === "hub" ? 0.16 : 0.34;
    const cinematicLift =
      activeStation.id === "hub"
        ? [0, 0, 0]
        : [activeStation.position[0] * 0.055, 0, activeStation.position[2] * 0.04];
    const cameraY = activeStation.camera[1] + focusLift;
    const cameraX = activeStation.camera[0] + cinematicLift[0];
    const cameraZ = activeStation.camera[2] + cinematicLift[2];
    const targetY = activeStation.target[1] + (activeStation.id === "hub" ? 0.15 : 0.28);

    void controlsRef.current.setLookAt(
      cameraX,
      cameraY,
      cameraZ,
      activeStation.target[0],
      targetY,
      activeStation.target[2],
      true,
    );
  }, [activeStation, quality]);

  return (
    <CameraControls
      ref={controlsRef}
      makeDefault
      minDistance={4.8}
      maxDistance={14}
      minPolarAngle={0.86}
      maxPolarAngle={1.3}
      azimuthRotateSpeed={0.22}
      polarRotateSpeed={0.18}
      truckSpeed={0}
      dollySpeed={0.14}
    />
  );
}

function LabLights({
  activeStation,
  quality,
}: {
  activeStation: LabStation;
  quality: QualityProfile;
}) {
  const activeColor = activeStation.accent === "cyan" ? "#67e8f9" : "#8b9bff";

  return (
    <>
      <ambientLight intensity={quality.ambientIntensity} color="#99b9ff" />
      <directionalLight position={[8, 12, 6]} intensity={quality.directionalIntensity} color="#b0d9ff" />
      <pointLight
        position={[activeStation.position[0], 2.8, activeStation.position[2]]}
        intensity={quality.activeLightIntensity}
        distance={quality.activeLightDistance}
        color={activeColor}
      />
    </>
  );
}

const MemoSimpleRoom = memo(function SimpleRoom({
  quality,
  activeStation,
}: {
  quality: QualityProfile;
  activeStation: LabStation;
}) {
  const activeColor = activeStation.accent === "cyan" ? "#67e8f9" : "#8b9bff";

  return (
    <group>
      <mesh position={[0, -0.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[15.5, quality.floorSegments]} />
        <meshStandardMaterial color="#07111d" metalness={0.45} roughness={0.82} />
      </mesh>

      <mesh position={[0, -0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[5.8, 6.1, quality.ringSegments]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={quality.floorRingOpacity} />
      </mesh>

      <mesh position={[0, -0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[8.2, 8.34, quality.ringSegments]} />
        <meshBasicMaterial color="#8b9bff" transparent opacity={quality.floorRingOpacity * 0.7} />
      </mesh>

      <mesh position={[0, -0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[11.9, 12.02, quality.ringSegments]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={quality.floorRingOpacity * 0.5} />
      </mesh>

      <RadialGrid steps={quality.gridSteps} ringSegments={quality.ringSegments} />
      <CentralHub ringSegments={quality.ringSegments} />

      {wallPlanes.map((wall, index) => (
        <group key={`wall-${index}`} position={wall.position} rotation={wall.rotation}>
          <mesh>
            <planeGeometry args={wall.size} />
            <meshStandardMaterial color="#0a1422" metalness={0.2} roughness={0.95} />
          </mesh>
          <mesh position={[0, 0.1, 0.02]}>
            <planeGeometry args={[wall.size[0] * 0.7, wall.size[1] * 0.42]} />
            <meshBasicMaterial color="#67e8f9" transparent opacity={quality.wallGlowOpacity} />
          </mesh>
          <mesh position={[0, 1.8, 0.03]}>
            <planeGeometry args={[wall.size[0] * 0.58, 0.08]} />
            <meshBasicMaterial color="#67e8f9" transparent opacity={quality.wallGlowOpacity * 1.35} />
          </mesh>
        </group>
      ))}

      <mesh
        position={[activeStation.position[0], 0.01, activeStation.position[2]]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[2.05, 2.28, quality.ringSegments]} />
        <meshBasicMaterial color={activeColor} transparent opacity={quality.activeRingOpacity} />
      </mesh>

      <mesh
        position={[activeStation.position[0], 0.03, activeStation.position[2]]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[2.52, 2.62, quality.ringSegments]} />
        <meshBasicMaterial color={activeColor} transparent opacity={quality.activeRingOpacity * 0.48} />
      </mesh>
    </group>
  );
});

function CentralHub({ ringSegments }: { ringSegments: number }) {
  return (
    <group position={[0, 0.02, 0]}>
      <mesh position={[0, 0.14, 0]}>
        <cylinderGeometry args={[1.88, 2.22, 0.26, 18]} />
        <meshStandardMaterial color="#0b1825" metalness={0.48} roughness={0.7} />
      </mesh>

      <mesh position={[0, 0.33, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.76, 2.34, ringSegments]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.18} />
      </mesh>

      <mesh position={[0, 0.66, 0]}>
        <cylinderGeometry args={[0.54, 0.82, 0.36, 12]} />
        <meshStandardMaterial color="#102031" metalness={0.42} roughness={0.46} />
      </mesh>

      <mesh position={[0, 1.05, 0]}>
        <sphereGeometry args={[0.17, 8, 8]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.94} />
      </mesh>
    </group>
  );
}

function LabStationMarker({
  station,
  isActive,
  onSelect,
  ringSegments,
}: {
  station: SceneStation;
  isActive: boolean;
  onSelect: (stationId: LabStationId) => void;
  ringSegments: number;
}) {
  const [hovered, setHovered] = useState(false);
  const accent = station.accent === "cyan" ? "#67e8f9" : "#8b9bff";
  const base = station.accent === "cyan" ? "#10202d" : "#151b2a";
  const silhouette = stationSilhouettes[station.id];
  const baseOpacity = isActive ? 0.18 : hovered ? 0.11 : 0.05;
  const ringOpacity = isActive ? 0.56 : hovered ? 0.34 : 0.12;
  const topOpacity = isActive ? 1 : hovered ? 0.88 : 0.5;
  const scale = isActive ? 1.06 : hovered ? 1.02 : 0.96;

  return (
    <group position={[station.position[0], silhouette.lift, station.position[2]]} scale={[scale, scale * silhouette.yScale, scale]}>
      <group
        onClick={() => onSelect(station.id)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <mesh position={[0, 0.24, 0]}>
          <cylinderGeometry args={[silhouette.topRadius, silhouette.baseRadius, 0.36, 10]} />
          <meshStandardMaterial
            color={base}
            metalness={0.55}
            roughness={0.42}
            emissive={accent}
            emissiveIntensity={isActive ? 0.06 : hovered ? 0.03 : 0}
          />
        </mesh>

        <mesh position={[0, 0.54, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[silhouette.topRadius * 0.78, silhouette.baseRadius * 0.98, ringSegments]} />
          <meshBasicMaterial
            color={accent}
            transparent
            opacity={ringOpacity}
          />
        </mesh>

        <mesh position={[0, silhouette.height * 0.62, 0]}>
          <boxGeometry args={[silhouette.panelWidth, silhouette.panelHeight, 0.06]} />
          <meshBasicMaterial
            color={accent}
            transparent
            opacity={baseOpacity}
          />
        </mesh>

        <mesh position={[0, silhouette.height * 0.8, 0]}>
          <boxGeometry args={[silhouette.panelWidth * 0.68, 0.06, 0.05]} />
          <meshBasicMaterial color={accent} transparent opacity={ringOpacity * 0.5} />
        </mesh>

        <mesh position={[0, silhouette.height, 0]}>
          <sphereGeometry args={[0.12, 6, 6]} />
          <meshBasicMaterial color={accent} transparent opacity={topOpacity} />
        </mesh>

        <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[silhouette.baseRadius * 1.16, silhouette.baseRadius * 1.26, ringSegments]} />
          <meshBasicMaterial color={accent} transparent opacity={isActive ? 0.32 : hovered ? 0.16 : 0.05} />
        </mesh>
      </group>
    </group>
  );
}

function RadialGrid({ steps, ringSegments }: { steps: number; ringSegments: number }) {
  const elements = [];

  for (let i = 1; i <= 4; i += 1) {
    elements.push(
      <mesh key={`ring-${i}`} position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[i * 2.8, i * 2.8 + 0.012, ringSegments]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.08} />
      </mesh>,
    );
  }

  for (let i = 0; i < steps; i += 1) {
    const angle = (i / steps) * Math.PI * 2;
    const x = Math.cos(angle) * 14;
    const z = Math.sin(angle) * 14;

    elements.push(
      <line key={`spoke-${i}`}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([0, 0.01, 0, x, 0.01, z]), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#67e8f9" transparent opacity={0.06} />
      </line>,
    );
  }

  return <group>{elements}</group>;
}

const MemoLabStationMarker = memo(LabStationMarker);
