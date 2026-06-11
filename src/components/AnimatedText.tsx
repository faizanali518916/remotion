import React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, slideUp } from "../lib/animations";

type AnimatedTextProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  style?: React.CSSProperties;
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  delay = 0,
  duration = 28,
  distance = 34,
  style,
}) => {
  const frame = useCurrentFrame();
  const opacity = fadeIn(frame, delay, duration);
  const y = slideUp(frame, delay, duration, distance);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
