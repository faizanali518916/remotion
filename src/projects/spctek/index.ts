import {
  SPCTEK_DURATION_IN_FRAMES,
  SPCTEK_FPS,
  SPCTEK_HEIGHT,
  SPCTEK_WIDTH,
  SpctekAiBrandDemo,
} from "../../SpctekAiBrandDemo";
import type { VideoProject } from "../types";

export const spctekProject: VideoProject = {
  id: "spctek",
  name: "SPCTEK Demos",
  compositions: [
    {
      id: "brand-demo",
      component: SpctekAiBrandDemo,
      durationInFrames: SPCTEK_DURATION_IN_FRAMES,
      fps: SPCTEK_FPS,
      width: SPCTEK_WIDTH,
      height: SPCTEK_HEIGHT,
    },
  ],
};
