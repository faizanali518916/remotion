import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { progressValue } from "../lib/animations";

type WorkflowPipelineProps = {
  labels: string[];
  delay?: number;
  accent?: string;
};

export const WorkflowPipeline: React.FC<WorkflowPipelineProps> = ({
  labels,
  delay = 0,
  accent = "#22d3ee",
}) => {
  const frame = useCurrentFrame();
  const progress = progressValue(frame, delay, 80);

  return (
    <div
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: `repeat(${labels.length}, 1fr)`,
        alignItems: "center",
        gap: 22,
        width: "100%",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 60,
          right: 60,
          top: 48,
          height: 3,
          background: "rgba(148,163,184,0.16)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 48,
          height: 3,
          width: `calc((100% - 120px) * ${progress})`,
          background: `linear-gradient(90deg, ${accent}, #8b5cf6, #22c55e)`,
          boxShadow: `0 0 24px ${accent}`,
        }}
      />
      {labels.map((label, index) => {
        const reveal = interpolate(
          frame,
          [delay + index * 18, delay + index * 18 + 20],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        return (
          <div
            key={label}
            style={{
              position: "relative",
              zIndex: 1,
              opacity: reveal,
              transform: `translateY(${(1 - reveal) * 22}px) scale(${
                0.94 + reveal * 0.06
              })`,
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 94,
                height: 94,
                margin: "0 auto 18px",
                borderRadius: 999,
                border: `1px solid ${accent}88`,
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.18), rgba(15,23,42,0.86))",
                boxShadow: `0 0 44px ${accent}33`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#f8fafc",
                fontSize: 28,
                fontWeight: 800,
              }}
            >
              {index + 1}
            </div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 700,
                color: "#f8fafc",
                lineHeight: 1.15,
              }}
            >
              {label}
            </div>
          </div>
        );
      })}
    </div>
  );
};
