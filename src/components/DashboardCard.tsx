import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { fadeIn, slideUp } from "../lib/animations";
import { GlassCard } from "./GlassCard";
import { ProgressBar } from "./ProgressBar";

type DashboardCardProps = {
  title: string;
  items: string[];
  metric: string;
  caption: string;
  delay?: number;
  accent?: string;
  style?: React.CSSProperties;
};

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  items,
  metric,
  caption,
  delay = 0,
  accent = "#22d3ee",
  style,
}) => {
  const frame = useCurrentFrame();
  const opacity = fadeIn(frame, delay, 24);
  const y = slideUp(frame, delay, 24, 36);
  const barValue = interpolate(frame, [delay + 16, delay + 62], [0, 0.88], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <GlassCard
      accent={accent}
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        padding: 30,
        minHeight: 410,
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 700, color: "#f8fafc" }}>
          {title}
        </div>
        <div
          style={{
            width: 13,
            height: 13,
            borderRadius: 999,
            background: accent,
            boxShadow: `0 0 28px ${accent}`,
          }}
        />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {items.map((item, index) => (
          <div
            key={item}
            style={{
              opacity: fadeIn(frame, delay + 14 + index * 4, 14),
              padding: "12px 14px",
              borderRadius: 14,
              background: "rgba(15,23,42,0.72)",
              border: "1px solid rgba(148,163,184,0.18)",
              color: "#cbd5e1",
              fontSize: 20,
            }}
          >
            {item}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 28 }}>
        <ProgressBar value={barValue} accent={accent} />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 14,
          marginTop: 24,
        }}
      >
        <div style={{ fontSize: 58, fontWeight: 800, color: "#ffffff" }}>
          {metric}
        </div>
        <div style={{ color: "#94a3b8", fontSize: 20 }}>{caption}</div>
      </div>
    </GlassCard>
  );
};
