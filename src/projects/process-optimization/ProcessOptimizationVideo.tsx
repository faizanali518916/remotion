import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  OffthreadVideo,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const PROCESS_OPTIMIZATION_FPS = 30;
export const PROCESS_OPTIMIZATION_WIDTH = 1920;
export const PROCESS_OPTIMIZATION_HEIGHT = 1080;
export const PROCESS_OPTIMIZATION_DURATION_IN_FRAMES = 2215;

const RAW_VIDEO_SRC = staticFile("assets/process-optimization/raw.mp4");

type Caption = {
  start: number;
  end: number;
  text: string;
  emphasis: string[];
};

type Scene = {
  id: string;
  startFrame: number;
  durationFrames: number;
  caption: string;
};

const captions: Caption[] = [
  {
    start: 0,
    end: 2.2,
    text: "Why do smart businesses fail?",
    emphasis: ["smart businesses", "fail"],
  },
  {
    start: 2.2,
    end: 5.5,
    text: "It's not always the product or the market.",
    emphasis: ["product", "market"],
  },
  {
    start: 5.5,
    end: 8.8,
    text: "In today's market, the real problem is messy internal operations.",
    emphasis: ["real problem", "messy internal operations"],
  },
  {
    start: 8.8,
    end: 13,
    text: "Teams are trusting AI to fix broken back-office practices.",
    emphasis: ["AI", "broken"],
  },
  {
    start: 13,
    end: 17.2,
    text: "AI can help, but it cannot save a broken process.",
    emphasis: ["AI can help", "broken process"],
  },
  {
    start: 17.2,
    end: 20.2,
    text: "Automation without clarity just makes the mess faster.",
    emphasis: ["Automation", "mess faster"],
  },
  {
    start: 20.2,
    end: 24.5,
    text: "The real issue is how the business actually operates.",
    emphasis: ["real issue", "operates"],
  },
  {
    start: 24.5,
    end: 28.5,
    text: "The gaps are inside the process, not just the tools.",
    emphasis: ["inside the process", "not just the tools"],
  },
  {
    start: 28.5,
    end: 34,
    text: "Disconnected steps create delays, confusion, and inconsistent results.",
    emphasis: ["delays", "confusion", "inconsistent results"],
  },
  {
    start: 34,
    end: 40.8,
    text: "That is why process optimization has to come before automation.",
    emphasis: ["process optimization", "before automation"],
  },
  {
    start: 40.8,
    end: 44,
    text: "Today, we're talking about process optimization.",
    emphasis: ["process optimization"],
  },
  {
    start: 44,
    end: 47.2,
    text: "Simple idea: fix the process before you scale it.",
    emphasis: ["fix the process", "scale"],
  },
  {
    start: 47.2,
    end: 52,
    text: "At SPCTEK AI, we map how work gets done.",
    emphasis: ["SPCTEK AI", "map"],
  },
  {
    start: 52,
    end: 56.2,
    text: "Then we find bottlenecks, wasted steps, and repeatable tasks.",
    emphasis: ["bottlenecks", "repeatable tasks"],
  },
  {
    start: 56.2,
    end: 61.8,
    text: "After that, we automate the best practice, not the broken one.",
    emphasis: ["automate", "best practice"],
  },
  {
    start: 61.8,
    end: 67,
    text: "So when you scale, you scale with accuracy.",
    emphasis: ["scale", "accuracy"],
  },
  {
    start: 67,
    end: 73.82,
    text: "Get your free operations audit. Link in caption.",
    emphasis: ["free operations audit", "Link in caption"],
  },
];

const scenes: Scene[] = [
  {
    id: "hook",
    startFrame: 0,
    durationFrames: 165,
    caption: "Why do smart businesses fail?",
  },
  {
    id: "real-problem",
    startFrame: 165,
    durationFrames: 219,
    caption: "Messy operations",
  },
  {
    id: "ai-misbelief",
    startFrame: 384,
    durationFrames: 222,
    caption: "AI != magic fix",
  },
  {
    id: "reality-check",
    startFrame: 606,
    durationFrames: 249,
    caption: "How the business operates",
  },
  {
    id: "process-gaps",
    startFrame: 855,
    durationFrames: 369,
    caption: "Workflow gaps",
  },
  {
    id: "topic-reveal",
    startFrame: 1224,
    durationFrames: 192,
    caption: "Process Optimization",
  },
  {
    id: "definition",
    startFrame: 1416,
    durationFrames: 198,
    caption: "Fix before you scale",
  },
  {
    id: "mapping",
    startFrame: 1614,
    durationFrames: 162,
    caption: "Map the workflow",
  },
  {
    id: "automate-best-practice",
    startFrame: 1776,
    durationFrames: 186,
    caption: "Automate best practice",
  },
  {
    id: "scale-accuracy",
    startFrame: 1962,
    durationFrames: 156,
    caption: "Scale with accuracy",
  },
  {
    id: "cta",
    startFrame: 2118,
    durationFrames: 97,
    caption: "Free operations audit",
  },
];

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const ease = Easing.bezier(0.16, 1, 0.3, 1);

const secondsToFrame = (seconds: number) =>
  Math.round(seconds * PROCESS_OPTIMIZATION_FPS);

const splitCaptionParts = (text: string, emphasis: string[]) => {
  const ranges = emphasis
    .map((phrase) => {
      const start = text.toLowerCase().indexOf(phrase.toLowerCase());
      return start === -1
        ? null
        : {
            start,
            end: start + phrase.length,
          };
    })
    .filter((range): range is { start: number; end: number } => Boolean(range))
    .sort((a, b) => a.start - b.start);

  const parts: Array<{ text: string; highlighted: boolean }> = [];
  let cursor = 0;

  ranges.forEach((range) => {
    if (range.start < cursor) {
      return;
    }

    if (range.start > cursor) {
      parts.push({ text: text.slice(cursor, range.start), highlighted: false });
    }

    parts.push({ text: text.slice(range.start, range.end), highlighted: true });
    cursor = range.end;
  });

  if (cursor < text.length) {
    parts.push({ text: text.slice(cursor), highlighted: false });
  }

  return parts.length > 0 ? parts : [{ text, highlighted: false }];
};

const PanelFrame: React.FC<{
  side: "left" | "right";
  children: React.ReactNode;
}> = ({ side, children }) => {
  const isLeft = side === "left";

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        border: isLeft
          ? "1px solid rgba(125, 213, 255, 0.42)"
          : "1px solid rgba(143, 119, 255, 0.28)",
        boxShadow: isLeft
          ? "0 28px 90px rgba(0, 154, 255, 0.28)"
          : "0 24px 90px rgba(101, 88, 255, 0.18)",
        pointerEvents: "none",
      }}
    >
      {children}
    </div>
  );
};

const SplitMirrorVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const intro = interpolate(frame, [0, 42], [0, 1], {
    ...clamp,
    easing: ease,
  });
  const totalPush = interpolate(
    frame,
    [0, PROCESS_OPTIMIZATION_DURATION_IN_FRAMES],
    [0, 1],
    {
      ...clamp,
    },
  );
  const pulse = Math.sin(frame / 46) * 5;
  const panelScale = interpolate(intro, [0, 1], [0.94, 1], clamp);
  const leftX = interpolate(intro, [0, 1], [-220, 72], clamp) + pulse;
  const rightX =
    interpolate(intro, [0, 1], [2040, 1160], clamp) - pulse * 0.56;
  const videoScale = 1.12 + totalPush * 0.055;

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: leftX,
          top: 0,
          width: 690,
          height: 1080,
          overflow: "hidden",
          borderRadius: 30,
          transform: `scale(${panelScale})`,
          transformOrigin: "center left",
          backgroundColor: "#05070f",
        }}
      >
        <OffthreadVideo
          src={RAW_VIDEO_SRC}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${videoScale})`,
          }}
        />
        <PanelFrame side="left">
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(0,0,0,0.22), rgba(0,0,0,0) 42%, rgba(0,0,0,0.2))",
            }}
          />
        </PanelFrame>
      </div>

      <div
        style={{
          position: "absolute",
          left: rightX,
          top: 28,
          width: 690,
          height: 1024,
          overflow: "hidden",
          borderRadius: 30,
          opacity: interpolate(frame, [36, 92], [0, 0.46], {
            ...clamp,
            easing: ease,
          }),
          filter: "blur(2px) saturate(0.78) contrast(1.04)",
          transform: `scale(${interpolate(intro, [0, 1], [0.98, 1], clamp)})`,
          transformOrigin: "center right",
          backgroundColor: "#05070f",
        }}
      >
        <OffthreadVideo
          muted
          src={RAW_VIDEO_SRC}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scaleX(-1) scale(${videoScale + 0.04})`,
          }}
        />
        <PanelFrame side="right">
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(270deg, rgba(6,8,18,0.18), rgba(6,8,18,0.86) 72%)",
            }}
          />
        </PanelFrame>
      </div>
    </AbsoluteFill>
  );
};

const TechBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = frame * 0.38;
  const sweep = interpolate(frame % 210, [0, 46, 210], [-520, 2200, 2200], {
    ...clamp,
    easing: ease,
  });

  const nodes = Array.from({ length: 26 }, (_, index) => {
    const x = 90 + ((index * 163) % 1740);
    const y = 74 + ((index * 97) % 930);
    const opacity = 0.16 + Math.sin((frame + index * 19) / 35) * 0.08;
    return { x, y, opacity };
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 32% 18%, rgba(0, 174, 255, 0.14), transparent 28%), radial-gradient(circle at 78% 74%, rgba(126, 95, 255, 0.14), transparent 30%), linear-gradient(135deg, #02040a 0%, #07111b 46%, #03050d 100%)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -80,
          opacity: 0.26,
          backgroundImage:
            "linear-gradient(rgba(96, 220, 255, 0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(96, 220, 255, 0.12) 1px, transparent 1px)",
          backgroundSize: "58px 58px",
          transform: `translate3d(${-drift % 58}px, ${(drift * 0.62) % 58}px, 0) perspective(900px) rotateX(58deg) scale(1.28)`,
          transformOrigin: "center",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.065,
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.45) 0, rgba(255,255,255,0.45) 1px, transparent 1px, transparent 5px)",
        }}
      />
      {nodes.map((node, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: node.x,
            top: node.y,
            width: index % 5 === 0 ? 5 : 3,
            height: index % 5 === 0 ? 5 : 3,
            borderRadius: 99,
            backgroundColor: index % 4 === 0 ? "#a78bfa" : "#67e8f9",
            opacity: node.opacity,
            boxShadow: "0 0 16px rgba(103,232,249,0.65)",
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          left: sweep,
          top: -180,
          width: 250,
          height: 1480,
          opacity: 0.22,
          background:
            "linear-gradient(90deg, transparent, rgba(134, 239, 255, 0.48), transparent)",
          transform: "rotate(18deg)",
        }}
      />
    </AbsoluteFill>
  );
};

const KineticCaption: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;
  const caption =
    captions.find(
      (item) => currentTime >= item.start && currentTime < item.end,
    ) ?? captions[captions.length - 1];

  const startFrame = secondsToFrame(caption.start);
  const endFrame = secondsToFrame(caption.end);
  const localFrame = frame - startFrame;
  const intro = spring({
    frame: localFrame,
    fps,
    config: {
      damping: 15,
      stiffness: 165,
      mass: 0.72,
    },
  });
  const out = interpolate(frame, [endFrame - 8, endFrame], [1, 0], clamp);
  const y = interpolate(intro, [0, 1], [30, 0], clamp);
  const scale = interpolate(intro, [0, 1], [0.94, 1], clamp);
  const words = splitCaptionParts(caption.text, caption.emphasis);
  const isHero =
    caption.text.includes("Process Optimization") ||
    caption.text.includes("Scale with accuracy") ||
    caption.text.includes("free operations audit");

  return (
    <div
      style={{
        position: "absolute",
        left: 716,
        top: isHero ? 368 : 414,
        width: 502,
        minHeight: 178,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "28px 34px",
        border: "1px solid rgba(145, 224, 255, 0.28)",
        background:
          "linear-gradient(135deg, rgba(5,12,24,0.74), rgba(10,18,34,0.42))",
        boxShadow:
          "0 28px 80px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.16)",
        backdropFilter: "blur(10px)",
        opacity: out,
        transform: `translateY(${y}px) scale(${scale})`,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 28,
          right: 28,
          top: 14,
          height: 2,
          background:
            "linear-gradient(90deg, transparent, rgba(103,232,249,0.86), rgba(167,139,250,0.82), transparent)",
          transform: `scaleX(${interpolate(localFrame, [0, 18], [0, 1], {
            ...clamp,
            easing: ease,
          })})`,
        }}
      />
      <div
        style={{
          color: "#f8fbff",
          fontFamily:
            "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
          fontSize: isHero ? 58 : 43,
          fontWeight: 820,
          lineHeight: 1.04,
          letterSpacing: 0,
          textShadow: "0 0 28px rgba(74, 222, 255, 0.26)",
        }}
      >
        {words.map((part, index) => (
          <span
            key={`${part.text}-${index}`}
            style={{
              color: part.highlighted ? "#67e8f9" : "#f8fbff",
              textShadow: part.highlighted
                ? "0 0 22px rgba(103,232,249,0.72)"
                : "0 0 22px rgba(255,255,255,0.12)",
            }}
          >
            {part.text}
          </span>
        ))}
      </div>
    </div>
  );
};

const LightSweep: React.FC<{ tone?: "cyan" | "red" | "green" }> = ({
  tone = "cyan",
}) => {
  const frame = useCurrentFrame();
  const color =
    tone === "red"
      ? "rgba(255, 87, 87, 0.58)"
      : tone === "green"
        ? "rgba(74, 222, 128, 0.52)"
        : "rgba(103, 232, 249, 0.58)";
  const x = interpolate(frame, [0, 42], [-480, 1420], {
    ...clamp,
    easing: ease,
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: -140,
        width: 190,
        height: 1360,
        opacity: interpolate(frame, [0, 12, 42, 58], [0, 0.7, 0.18, 0], clamp),
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        transform: "rotate(17deg)",
        filter: "blur(2px)",
      }}
    />
  );
};

const ProcessNodes: React.FC<{ mode?: "broken" | "map" | "success" }> = ({
  mode = "broken",
}) => {
  const frame = useCurrentFrame();
  const labels =
    mode === "map"
      ? ["MAP", "BOTTLENECK", "TASKS", "FLOW"]
      : mode === "success"
        ? ["BEST", "PRACTICE", "AUTOMATE", "SCALE"]
        : ["STEP", "DELAY", "ERROR", "REWORK"];
  const progress = interpolate(frame, [0, 80], [0, 1], {
    ...clamp,
    easing: ease,
  });
  const tone =
    mode === "success"
      ? "#4ade80"
      : mode === "map"
        ? "#67e8f9"
        : "#fb7185";

  return (
    <div
      style={{
        position: "absolute",
        left: 742,
        top: 666,
        width: 438,
        height: 158,
        opacity: interpolate(frame, [0, 20, 120, 150], [0, 1, 1, 0], clamp),
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 32,
          right: 32,
          top: 66,
          height: 2,
          background: "rgba(255,255,255,0.18)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 32,
          top: 66,
          width: 374 * progress,
          height: 2,
          background: tone,
          boxShadow: `0 0 24px ${tone}`,
        }}
      />
      {labels.map((label, index) => {
        const active = progress > index / (labels.length - 1) - 0.04;
        const jitter =
          mode === "broken" ? Math.sin((frame + index * 8) / 3) * 2.5 : 0;

        return (
          <div
            key={label}
            style={{
              position: "absolute",
              left: 8 + index * 126,
              top: 38 + jitter,
              width: 86,
              height: 58,
              border: `1px solid ${active ? tone : "rgba(255,255,255,0.2)"}`,
              background: active
                ? "rgba(5,12,24,0.72)"
                : "rgba(5,12,24,0.38)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: active ? "#f8fbff" : "rgba(248,251,255,0.52)",
              fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
              fontSize: 15,
              fontWeight: 800,
              letterSpacing: 0,
              boxShadow: active ? `0 0 28px ${tone}55` : "none",
            }}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
};

const SceneEffects: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const intro = interpolate(frame, [0, 22], [0, 1], {
    ...clamp,
    easing: ease,
  });

  if (scene.id === "hook") {
    return (
      <>
        <LightSweep />
        <div
          style={{
            position: "absolute",
            left: 736,
            top: 238,
            width: 452,
            height: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#9beafe",
            fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
            fontSize: 19,
            fontWeight: 900,
            letterSpacing: 0,
            textTransform: "uppercase",
            border: "1px solid rgba(103,232,249,0.34)",
            backgroundColor: "rgba(4, 10, 22, 0.54)",
            opacity: intro,
            transform: `translateY(${interpolate(intro, [0, 1], [24, 0], clamp)}px)`,
          }}
        >
          SPCTEK AI OPERATIONS SERIES
        </div>
      </>
    );
  }

  if (scene.id === "real-problem" || scene.id === "reality-check") {
    return (
      <>
        <LightSweep tone="red" />
        <div
          style={{
            position: "absolute",
            left: 718,
            top: 202,
            width: 490,
            height: 72,
            border: "1px solid rgba(255, 92, 92, 0.42)",
            background:
              "linear-gradient(90deg, rgba(127,29,29,0.42), rgba(8,10,18,0.26))",
            color: "#fecaca",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
            fontSize: 24,
            fontWeight: 850,
            letterSpacing: 0,
            textTransform: "uppercase",
            opacity: interpolate(frame, [0, 18, 150, 182], [0, 1, 1, 0], clamp),
            transform: `translateX(${Math.sin(frame / 2) * 1.5}px)`,
          }}
        >
          {scene.caption}
        </div>
      </>
    );
  }

  if (scene.id === "ai-misbelief") {
    const glitch = frame > 26 && frame < 37 ? Math.sin(frame * 2.8) * 7 : 0;

    return (
      <>
        <LightSweep />
        <div
          style={{
            position: "absolute",
            left: 742 + glitch,
            top: 218,
            width: 440,
            height: 92,
            border: "1px solid rgba(103,232,249,0.42)",
            background:
              "linear-gradient(135deg, rgba(6, 182, 212, 0.28), rgba(88, 28, 135, 0.28))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ecfeff",
            fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
            fontSize: 36,
            fontWeight: 900,
            letterSpacing: 0,
            opacity: interpolate(frame, [0, 16, 170, 206], [0, 1, 1, 0], clamp),
            boxShadow: "0 0 44px rgba(103,232,249,0.28)",
          }}
        >
          AI != MAGIC FIX
        </div>
      </>
    );
  }

  if (scene.id === "process-gaps") {
    return <ProcessNodes mode="broken" />;
  }

  if (scene.id === "topic-reveal") {
    return (
      <>
        <LightSweep />
        <div
          style={{
            position: "absolute",
            left: 652,
            top: 182,
            width: 620,
            color: "#f8fbff",
            fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
            textAlign: "center",
            fontSize: 70,
            lineHeight: 0.9,
            fontWeight: 950,
            letterSpacing: 0,
            textTransform: "uppercase",
            opacity: interpolate(frame, [0, 24, 148, 180], [0, 1, 1, 0], clamp),
            transform: `scale(${interpolate(intro, [0, 1], [0.88, 1], clamp)})`,
            textShadow: "0 0 44px rgba(103,232,249,0.42)",
          }}
        >
          Process
          <br />
          Optimization
        </div>
      </>
    );
  }

  if (scene.id === "mapping") {
    return <ProcessNodes mode="map" />;
  }

  if (scene.id === "automate-best-practice") {
    return (
      <>
        <LightSweep tone="green" />
        <ProcessNodes mode="success" />
      </>
    );
  }

  if (scene.id === "scale-accuracy") {
    return (
      <div
        style={{
          position: "absolute",
          left: 640,
          top: 166,
          width: 640,
          textAlign: "center",
          color: "#ecfeff",
          fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
          fontSize: 78,
          fontWeight: 950,
          lineHeight: 0.95,
          letterSpacing: 0,
          opacity: interpolate(frame, [0, 18, 124, 148], [0, 1, 1, 0], clamp),
          transform: `scale(${interpolate(frame, [0, 156], [0.94, 1.08], clamp)})`,
          textShadow:
            "0 0 28px rgba(103,232,249,0.7), 0 0 80px rgba(59,130,246,0.38)",
        }}
      >
        SCALE
        <br />
        WITH ACCURACY
      </div>
    );
  }

  return null;
};

const CTAEndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    frame,
    fps,
    config: {
      damping: 16,
      stiffness: 140,
      mass: 0.8,
    },
  });
  const pulse = 1 + Math.sin(frame / 8) * 0.018;

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(135deg, rgba(2,6,23,0.82), rgba(3,7,18,0.94))",
        alignItems: "center",
        justifyContent: "center",
        color: "#f8fbff",
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        opacity: interpolate(frame, [0, 16], [0, 1], clamp),
      }}
    >
      <div
        style={{
          width: 840,
          minHeight: 360,
          border: "1px solid rgba(103,232,249,0.32)",
          background:
            "linear-gradient(135deg, rgba(8,17,33,0.86), rgba(10,16,31,0.62))",
          boxShadow: "0 34px 120px rgba(0,0,0,0.54)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          transform: `scale(${interpolate(enter, [0, 1], [0.92, 1], clamp) * pulse})`,
          padding: 54,
        }}
      >
        <div
          style={{
            color: "#67e8f9",
            fontSize: 30,
            fontWeight: 900,
            letterSpacing: 0,
            marginBottom: 24,
          }}
        >
          SPCTEK AI
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 950,
            lineHeight: 1.08,
            letterSpacing: 0,
            textShadow: "0 0 32px rgba(103,232,249,0.32)",
          }}
        >
          Free Operations Audit
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 30,
            fontWeight: 750,
            color: "#dbeafe",
            letterSpacing: 0,
          }}
        >
          Link in caption
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const ProcessOptimizationVideo: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#02040a",
        overflow: "hidden",
      }}
    >
      <TechBackground />
      <SplitMirrorVideo />
      {scenes.map((scene) => (
        <Sequence
          key={scene.id}
          from={scene.startFrame}
          durationInFrames={scene.durationFrames}
        >
          <SceneEffects scene={scene} />
        </Sequence>
      ))}
      <KineticCaption />
      <Sequence from={2118} durationInFrames={97}>
        <CTAEndCard />
      </Sequence>
    </AbsoluteFill>
  );
};
