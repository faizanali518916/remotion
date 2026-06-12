import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const STARTER_FPS = 30;
export const STARTER_DURATION_IN_FRAMES = 150;
export const STARTER_WIDTH = 1280;
export const STARTER_HEIGHT = 720;

export const StarterDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: {
      damping: 12,
      stiffness: 140,
    },
  });

  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        color: "#f8fafc",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Georgia, serif",
      }}
    >
      <div
        style={{
          opacity,
          transform: `scale(${0.85 + scale * 0.15})`,
          textAlign: "center",
          letterSpacing: 1,
        }}
      >
        <h1 style={{ fontSize: 74, margin: 0 }}>New Project Starter</h1>
        <p style={{ fontSize: 28, marginTop: 16, color: "#cbd5e1" }}>
          Duplicate this project folder to spin up another video.
        </p>
      </div>
    </AbsoluteFill>
  );
};
