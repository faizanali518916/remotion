import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { AnimatedText } from "../components/AnimatedText";
import { GlassCard } from "../components/GlassCard";
import { automationUseCases } from "../lib/data";
import { fadeIn, slideUp, stagger } from "../lib/animations";

export const AutomationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = interpolate(Math.sin(frame / 18), [-1, 1], [0.86, 1.08]);
  const flow = interpolate(frame, [40, 188], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.18), transparent 32%), linear-gradient(135deg, #020617, #08111f 58%, #020617)",
        color: "#fff",
        fontFamily: "Inter, ui-sans-serif, system-ui, Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Shows how repeated manual work is routed through an automation engine into clean outputs. */}
      <div style={{ position: "absolute", top: 72, left: 130, right: 130, textAlign: "center" }}>
        <AnimatedText
          delay={0}
          style={{ fontSize: 64, fontWeight: 850, letterSpacing: 0, lineHeight: 1.08 }}
        >
          From manual work to scalable automation.
        </AnimatedText>
      </div>
      <div
        style={{
          position: "absolute",
          top: 245,
          left: 125,
          right: 125,
          bottom: 126,
          display: "grid",
          gridTemplateColumns: "1fr 360px 1fr",
          gap: 56,
          alignItems: "center",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          {automationUseCases.slice(0, 4).map((item, index) => {
            const delay = stagger(index, 36, 8);
            return (
              <GlassCard
                key={item}
                accent="#8b5cf6"
                style={{
                  padding: "22px 20px",
                  opacity: fadeIn(frame, delay, 16),
                  transform: `translate(${Math.sin((frame + index * 17) / 23) * 8}px, ${
                    slideUp(frame, delay, 16, 28) + Math.cos((frame + index * 11) / 26) * 8
                  }px)`,
                }}
              >
                <div style={{ fontSize: 24, color: "#e2e8f0", fontWeight: 800 }}>
                  {item}
                </div>
              </GlassCard>
            );
          })}
        </div>
        <div style={{ position: "relative", height: 420 }}>
          <svg
            width="900"
            height="420"
            viewBox="0 0 900 420"
            style={{ position: "absolute", left: -270, top: 0 }}
          >
            <path
              d="M10 210 C170 80, 250 340, 390 210 S650 90, 890 210"
              stroke="rgba(34,211,238,0.22)"
              strokeWidth="6"
              fill="none"
            />
            <path
              d="M10 210 C170 80, 250 340, 390 210 S650 90, 890 210"
              stroke="url(#flowGradient)"
              strokeWidth="6"
              strokeDasharray="900"
              strokeDashoffset={900 - flow * 900}
              strokeLinecap="round"
              fill="none"
            />
            <defs>
              <linearGradient id="flowGradient" x1="0" y1="0" x2="900" y2="0">
                <stop stopColor="#8b5cf6" />
                <stop offset="0.5" stopColor="#22d3ee" />
                <stop offset="1" stopColor="#22c55e" />
              </linearGradient>
            </defs>
          </svg>
          <GlassCard
            accent="#22d3ee"
            style={{
              position: "absolute",
              inset: "38px 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 30,
              opacity: fadeIn(frame, 54, 24),
              transform: `scale(${pulse})`,
            }}
          >
            <div
              style={{
                width: 112,
                height: 112,
                borderRadius: 999,
                background:
                  "radial-gradient(circle, rgba(34,211,238,0.9), rgba(34,211,238,0.08) 68%)",
                boxShadow: "0 0 74px rgba(34,211,238,0.52)",
              }}
            />
            <div style={{ marginTop: 22, fontSize: 28, fontWeight: 900, textAlign: "center" }}>
              SPCTEK.AI
              <br />
              Automation Engine
            </div>
          </GlassCard>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          {automationUseCases.slice(4).map((item, index) => {
            const delay = stagger(index, 82, 9);
            return (
              <GlassCard
                key={item}
                accent="#22c55e"
                style={{
                  padding: "22px 20px",
                  opacity: fadeIn(frame, delay, 18),
                  transform: `translateY(${slideUp(frame, delay, 18, 28)}px)`,
                }}
              >
                <div style={{ fontSize: 24, color: "#dcfce7", fontWeight: 800 }}>
                  {item}
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 250,
          right: 250,
          bottom: 54,
          display: "flex",
          justifyContent: "space-between",
          color: "#94a3b8",
          fontSize: 24,
          fontWeight: 800,
          opacity: fadeIn(frame, 30, 20),
        }}
      >
        <span>Manual Inputs</span>
        <span>SPCTEK.AI Automation Engine</span>
        <span>Clean Outputs</span>
      </div>
    </AbsoluteFill>
  );
};
