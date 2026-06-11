import React from "react";

type GlassCardProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  accent?: string;
};

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  accent = "#22d3ee",
}) => {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 24,
        border: "1px solid rgba(255,255,255,0.14)",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.045))",
        boxShadow: `0 24px 80px rgba(0,0,0,0.36), 0 0 42px ${accent}22`,
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(120deg, rgba(255,255,255,0.14), transparent 32%, transparent 70%, rgba(255,255,255,0.08))",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          opacity: 0.75,
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
};
