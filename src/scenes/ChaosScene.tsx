import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { GlassCard } from "../components/GlassCard";
import { problemCards } from "../lib/data";
import { fadeIn, slideUp, stagger } from "../lib/animations";

const positions = [
  { x: 154, y: 322, r: -9 },
  { x: 466, y: 238, r: 6 },
  { x: 774, y: 366, r: -5 },
  { x: 1110, y: 232, r: 8 },
  { x: 1398, y: 380, r: -6 },
  { x: 338, y: 632, r: 7 },
  { x: 820, y: 674, r: 5 },
  { x: 1260, y: 646, r: -8 },
];

export const ChaosScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 46% 44%, rgba(124,58,237,0.16), transparent 34%), linear-gradient(135deg, #020617, #070a1e 58%, #020617)",
        color: "#fff",
        fontFamily: "Inter, ui-sans-serif, system-ui, Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Visualizes the pre-system state: many tools, no reliable operating logic. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(148,163,184,0.20) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          opacity: 0.25,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 92,
          left: 150,
          right: 150,
          textAlign: "center",
        }}
      >
        <div
          style={{
            opacity: fadeIn(frame, 0, 24),
            transform: `translateY(${slideUp(frame, 0, 24, 28)}px)`,
            fontSize: 64,
            lineHeight: 1.1,
            fontWeight: 850,
            letterSpacing: 0,
          }}
        >
          The problem is not lack of AI tools.
          <br />
          <span style={{ color: "#67e8f9" }}>It is lack of systems.</span>
        </div>
      </div>
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0 }}
      >
        {positions.slice(0, -1).map((position, index) => {
          const next = positions[index + 1];
          const opacity = interpolate(frame, [30 + index * 8, 70 + index * 8], [0, 0.34], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <line
              key={`${position.x}-${next.x}`}
              x1={position.x + 135}
              y1={position.y + 45}
              x2={next.x + 135}
              y2={next.y + 45}
              stroke="#38bdf8"
              strokeWidth="2"
              strokeDasharray="10 18"
              opacity={opacity}
            />
          );
        })}
      </svg>
      {problemCards.map((card, index) => {
        const position = positions[index];
        const delay = stagger(index, 36, 7);
        const opacity = fadeIn(frame, delay, 18);
        const floatX = Math.sin((frame + index * 21) / 24) * 10;
        const floatY = Math.cos((frame + index * 15) / 28) * 9;
        const y = slideUp(frame, delay, 18, 30);

        return (
          <GlassCard
            key={card}
            accent={index % 2 === 0 ? "#22d3ee" : "#8b5cf6"}
            style={{
              position: "absolute",
              left: position.x,
              top: position.y,
              width: 280,
              padding: "24px 26px",
              opacity,
              transform: `translate(${floatX}px, ${floatY + y}px) rotate(${position.r}deg)`,
            }}
          >
            <div style={{ color: "#f8fafc", fontSize: 25, fontWeight: 800 }}>
              {card}
            </div>
            <div
              style={{
                marginTop: 12,
                height: 8,
                width: `${58 + index * 4}%`,
                borderRadius: 999,
                background: "linear-gradient(90deg, #38bdf8, #8b5cf6)",
                opacity: 0.72,
              }}
            />
          </GlassCard>
        );
      })}
    </AbsoluteFill>
  );
};
