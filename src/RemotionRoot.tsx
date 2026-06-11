import "./index.css";
import React from "react";
import { Composition } from "remotion";
import {
  SPCTEK_DURATION_IN_FRAMES,
  SPCTEK_FPS,
  SPCTEK_HEIGHT,
  SPCTEK_WIDTH,
  SpctekAiBrandDemo,
} from "./SpctekAiBrandDemo";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="SpctekAiBrandDemo"
      component={SpctekAiBrandDemo}
      durationInFrames={SPCTEK_DURATION_IN_FRAMES}
      fps={SPCTEK_FPS}
      width={SPCTEK_WIDTH}
      height={SPCTEK_HEIGHT}
    />
  );
};
