import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { GlowOrb } from "../components/GlowOrb";
import { fadeIn, slideUp } from "../lib/animations";

export const FinalCtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({
    frame,
    fps,
    from: 0.86,
    to: 1,
    config: { damping: 18, stiffness: 120 },
  });
  const fadeOut = interpolate(frame, [132, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 50% 44%, rgba(34,211,238,0.28), transparent 32%), linear-gradient(135deg, #020617, #050816 58%, #020617)",
        color: "#fff",
        fontFamily: "Inter, ui-sans-serif, system-ui, Arial, sans-serif",
        overflow: "hidden",
        opacity: fadeOut,
      }}
    >
      {/* Leaves the room with a clear brand memory and one executive-level action. */}
      <GlowOrb size={720} color="#22d3ee" x={600} y={110} opacity={0.34} />
      <GlowOrb size={420} color="#8b5cf6" x={1160} y={520} delay={24} opacity={0.26} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          opacity: 0.34,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: "178px 160px 120px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            opacity: fadeIn(frame, 0, 22),
            transform: `scale(${scale}) translateY(${slideUp(frame, 0, 22, 24)}px)`,
            fontSize: 112,
            fontWeight: 950,
            letterSpacing: 0,
            textShadow: "0 0 70px rgba(34,211,238,0.52)",
          }}
        >
          SPCTEK.AI
        </div>
        <div
          style={{
            marginTop: 30,
            opacity: fadeIn(frame, 22, 22),
            transform: `translateY(${slideUp(frame, 22, 22, 30)}px)`,
            color: "#e0f2fe",
            fontSize: 42,
            fontWeight: 750,
          }}
        >
          Fix the operations. Build the systems. Scale with AI.
        </div>
        <div
          style={{
            marginTop: 58,
            opacity: fadeIn(frame, 46, 20),
            transform: `translateY(${slideUp(frame, 46, 20, 26)}px)`,
            padding: "22px 34px",
            borderRadius: 999,
            border: "1px solid rgba(34,211,238,0.7)",
            background: "linear-gradient(90deg, rgba(34,211,238,0.22), rgba(139,92,246,0.22))",
            boxShadow: "0 0 54px rgba(34,211,238,0.28)",
            fontSize: 31,
            fontWeight: 900,
          }}
        >
          Book a Free Operations Assessment
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 6,
            color: "#94a3b8",
            fontSize: 22,
            opacity: fadeIn(frame, 70, 20),
          }}
        >
          Transformation through intelligent automation.
        </div>
      </div>
    </AbsoluteFill>
  );
};
