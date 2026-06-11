import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { AnimatedText } from "../components/AnimatedText";
import { GlassCard } from "../components/GlassCard";
import { ProgressBar } from "../components/ProgressBar";
import { fadeIn, slideUp, stagger } from "../lib/animations";

const auditRows = [
  { label: "Workflow Map", before: "Unclear", after: "Mapped", value: 0.86 },
  { label: "Bottleneck Score", before: "Unknown", after: "Prioritized", value: 0.74 },
  { label: "Manual Task Load", before: "High", after: "Measured", value: 0.68 },
  { label: "Automation Readiness", before: "Low signal", after: "Scored", value: 0.82 },
  { label: "AI Opportunity Areas", before: "Scattered", after: "Ranked", value: 0.78 },
];

const callouts = [
  "Process gaps identified",
  "Manual tasks prioritized",
  "Automation opportunities mapped",
];

export const DiagnosisScene: React.FC = () => {
  const frame = useCurrentFrame();
  const scanX = interpolate(frame, [48, 160], [0, 940], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 52% 52%, rgba(34,211,238,0.13), transparent 32%), linear-gradient(135deg, #020617, #07111f 54%, #020617)",
        color: "#fff",
        fontFamily: "Inter, ui-sans-serif, system-ui, Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Shows the diagnostic layer that turns uncertainty into an actionable operating map. */}
      <div style={{ position: "absolute", top: 84, left: 130, right: 130 }}>
        <AnimatedText
          delay={0}
          style={{
            fontSize: 62,
            fontWeight: 850,
            lineHeight: 1.08,
            letterSpacing: 0,
          }}
        >
          First, we diagnose where operations break.
        </AnimatedText>
      </div>
      <GlassCard
        accent="#22d3ee"
        style={{
          position: "absolute",
          left: 150,
          top: 248,
          width: 1020,
          padding: 34,
          opacity: fadeIn(frame, 24, 24),
          transform: `translateY(${slideUp(frame, 24, 24, 36)}px)`,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 30 }}>
          <div>
            <div style={{ color: "#67e8f9", fontSize: 18, fontWeight: 800 }}>
              OPERATIONS AUDIT
            </div>
            <div style={{ marginTop: 6, fontSize: 34, fontWeight: 850 }}>
              Diagnostic dashboard
            </div>
          </div>
          <div style={{ color: "#22c55e", fontSize: 22, fontWeight: 800 }}>
            SYSTEM SIGNAL FOUND
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: scanX,
            width: 96,
            height: "100%",
            background:
              "linear-gradient(90deg, transparent, rgba(34,211,238,0.24), transparent)",
            opacity: fadeIn(frame, 42, 14),
          }}
        />
        {auditRows.map((row, index) => {
          const delay = stagger(index, 42, 12);
          const statusBlend = interpolate(frame, [delay + 22, delay + 46], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const value = interpolate(frame, [delay, delay + 42], [0.12, row.value], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={row.label}
              style={{
                display: "grid",
                gridTemplateColumns: "290px 160px 1fr",
                gap: 22,
                alignItems: "center",
                marginTop: 18,
                opacity: fadeIn(frame, delay, 16),
              }}
            >
              <div style={{ fontSize: 24, color: "#e2e8f0", fontWeight: 700 }}>
                {row.label}
              </div>
              <div
                style={{
                  fontSize: 20,
                  color: statusBlend > 0.5 ? "#86efac" : "#94a3b8",
                  fontWeight: 800,
                }}
              >
                {statusBlend > 0.5 ? row.after : row.before}
              </div>
              <ProgressBar value={value} accent={index % 2 === 0 ? "#22d3ee" : "#8b5cf6"} />
            </div>
          );
        })}
      </GlassCard>
      <div
        style={{
          position: "absolute",
          right: 150,
          top: 318,
          width: 460,
          display: "flex",
          flexDirection: "column",
          gap: 22,
        }}
      >
        {callouts.map((callout, index) => {
          const delay = stagger(index, 72, 18);
          return (
            <GlassCard
              key={callout}
              accent="#22c55e"
              style={{
                padding: "24px 26px",
                opacity: fadeIn(frame, delay, 18),
                transform: `translateX(${interpolate(frame, [delay, delay + 18], [46, 0], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                })}px)`,
              }}
            >
              <div style={{ color: "#bbf7d0", fontSize: 21, fontWeight: 800 }}>
                {callout}
              </div>
            </GlassCard>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
