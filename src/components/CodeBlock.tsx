import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { GlassCard } from "./GlassCard";

type CodeBlockProps = {
  lines: string[];
  delay?: number;
  style?: React.CSSProperties;
};

export const CodeBlock: React.FC<CodeBlockProps> = ({
  lines,
  delay = 0,
  style,
}) => {
  const frame = useCurrentFrame();

  return (
    <GlassCard
      accent="#8b5cf6"
      style={{
        padding: 24,
        fontFamily: "Consolas, Monaco, monospace",
        color: "#dbeafe",
        ...style,
      }}
    >
      <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
        {["#ef4444", "#f59e0b", "#22c55e"].map((color) => (
          <div
            key={color}
            style={{ width: 12, height: 12, borderRadius: 999, background: color }}
          />
        ))}
      </div>
      {lines.map((line, index) => {
        const opacity = interpolate(
          frame,
          [delay + index * 7, delay + index * 7 + 12],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        const width = interpolate(
          frame,
          [delay + index * 7, delay + index * 7 + 18],
          [24, 100],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        return (
          <div
            key={line}
            style={{
              opacity,
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginTop: 10,
              fontSize: 24,
              lineHeight: 1.35,
            }}
          >
            <span style={{ color: "#64748b", width: 28 }}>{index + 1}</span>
            <span
              style={{
                width: `${width}%`,
                maxWidth: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {line}
            </span>
          </div>
        );
      })}
    </GlassCard>
  );
};
