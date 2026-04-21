"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { labStations, type LabStationId } from "@/content/learner-lab";
import { LabHud } from "@/components/learner-lab/lab-hud";
import { LabShell } from "@/components/learner-lab/lab-shell";

export type LabQualityMode = "standard" | "low";

const AnalystLabCanvas = dynamic(
  () =>
    import("@/components/learner-lab/analyst-lab-canvas").then(
      (module) => module.AnalystLabCanvas,
    ),
  {
    ssr: false,
    loading: () => null,
  },
);

export function AnalystLabExperience() {
  const stationIds = useMemo(() => labStations.map((station) => station.id), []);
  const [activeStationId, setActiveStationId] = useState<LabStationId>("hub");
  const [qualityMode, setQualityMode] = useState<LabQualityMode>("standard");
  const handleSelectStation = useCallback((stationId: LabStationId) => {
    setActiveStationId(stationId);
  }, []);
  const handleQualityModeChange = useCallback((mode: LabQualityMode) => {
    setQualityMode(mode);
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveStationId("hub");
        return;
      }

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        setActiveStationId((current) => {
          const currentIndex = stationIds.indexOf(current);
          return stationIds[(currentIndex + 1) % stationIds.length] ?? "hub";
        });
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        setActiveStationId((current) => {
          const currentIndex = stationIds.indexOf(current);
          return stationIds[(currentIndex - 1 + stationIds.length) % stationIds.length] ?? "hub";
        });
      }

      if (/^[1-7]$/.test(event.key)) {
        const target = stationIds[Number(event.key) - 1];
        if (target) {
          setActiveStationId(target);
        }
      }

      if (event.key === "q" || event.key === "Q") {
        setQualityMode((current) => (current === "standard" ? "low" : "standard"));
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [stationIds]);

  return (
    <LabShell>
      <div className="absolute inset-0">
        <AnalystLabCanvas
          activeStationId={activeStationId}
          onSelectStation={handleSelectStation}
          qualityMode={qualityMode}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-10"
      >
        <LabHud
          activeStationId={activeStationId}
          onSelectStation={handleSelectStation}
          qualityMode={qualityMode}
          onQualityModeChange={handleQualityModeChange}
        />
      </motion.div>
    </LabShell>
  );
}
