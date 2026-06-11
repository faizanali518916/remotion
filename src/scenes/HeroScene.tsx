import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AnimatedText } from "../components/AnimatedText";
import { GlowOrb } from "../components/GlowOrb";
import { fadeIn, slideUp, stagger } from "../lib/animations";

const tags = ["Diagnostics", "Automation", "Secure AI", "Scalable Systems"];

export const HeroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const wordmarkScale = spring({
    frame,
    fps,
    from: 0.82,
    to: 1,
    config: { damping: 18, stiffness: 110 },
  });
  const dataDrift = interpolate(frame, [0, 210], [-80, 80], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 50% 42%, rgba(34,211,238,0.18), transparent 34%), linear-gradient(135deg, #020617 0%, #050816 48%, #020617 100%)",
        color: "white",
        fontFamily: "Inter, ui-sans-serif, system-ui, Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Establishes the premium AI systems atmosphere before the value proposition lands. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          transform: `translate(${dataDrift * 0.2}px, ${dataDrift * 0.12}px)`,
          opacity: 0.48,
        }}
      />
      <GlowOrb size={560} color="#22d3ee" x={-140} y={70} />
      <GlowOrb size={500} color="#7c3aed" x={1440} y={-100} delay={30} />
      <GlowOrb size={360} color="#22c55e" x={1320} y={700} delay={80} opacity={0.24} />
      {[0, 1, 2, 3, 4].map((line) => (
        <div
          key={line}
          style={{
            position: "absolute",
            left: -200 + line * 390 + dataDrift,
            top: 130 + line * 145,
            width: 340,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(34,211,238,0.62), transparent)",
            opacity: 0.42,
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          inset: "168px 170px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            opacity: fadeIn(frame, 4, 34),
            transform: `scale(${wordmarkScale}) translateY(${slideUp(frame, 0, 34, 24)}px)`,
            fontSize: 76,
            fontWeight: 900,
            letterSpacing: 0,
            color: "#f8fafc",
            textShadow: "0 0 44px rgba(34,211,238,0.36)",
          }}
        >
          SPCTEK.AI
        </div>
        <AnimatedText
          delay={24}
          duration={34}
          distance={42}
          style={{
            marginTop: 34,
            maxWidth: 1240,
            fontSize: 78,
            lineHeight: 1.03,
            fontWeight: 850,
            letterSpacing: 0,
          }}
        >
          Transform Operational Chaos Into Intelligent Systems
        </AnimatedText>
        <AnimatedText
          delay={54}
          duration={28}
          distance={26}
          style={{
            marginTop: 28,
            color: "#bae6fd",
            fontSize: 32,
            fontWeight: 500,
          }}
        >
          AI automation built for real business workflows
        </AnimatedText>
        <div
          style={{
            display: "flex",
            gap: 18,
            marginTop: 54,
            justifyContent: "center",
          }}
        >
          {tags.map((tag, index) => {
            const delay = stagger(index, 82, 12);
            const opacity = fadeIn(frame, delay, 18);
            const y = slideUp(frame, delay, 18, 24);

            return (
              <div
                key={tag}
                style={{
                  opacity,
                  transform: `translateY(${y}px)`,
                  padding: "13px 20px",
                  borderRadius: 999,
                  border: "1px solid rgba(125,211,252,0.35)",
                  background: "rgba(15,23,42,0.68)",
                  color: "#e0f2fe",
                  fontSize: 21,
                  fontWeight: 700,
                  boxShadow: "0 0 32px rgba(34,211,238,0.14)",
                }}
              >
                {tag}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
