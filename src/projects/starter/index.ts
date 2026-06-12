import type { VideoProject } from "../types";
import {
  STARTER_DURATION_IN_FRAMES,
  STARTER_FPS,
  STARTER_HEIGHT,
  STARTER_WIDTH,
  StarterDemo,
} from "./StarterDemo";

export const starterProject: VideoProject = {
  id: "starter",
  name: "Starter Templates",
  compositions: [
    {
      id: "starter-demo",
      component: StarterDemo,
      durationInFrames: STARTER_DURATION_IN_FRAMES,
      fps: STARTER_FPS,
      width: STARTER_WIDTH,
      height: STARTER_HEIGHT,
    },
  ],
};
