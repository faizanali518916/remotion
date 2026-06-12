import type { VideoProject } from "../types";
import {
  PROCESS_OPTIMIZATION_DURATION_IN_FRAMES,
  PROCESS_OPTIMIZATION_FPS,
  PROCESS_OPTIMIZATION_HEIGHT,
  PROCESS_OPTIMIZATION_WIDTH,
  ProcessOptimizationVideo,
} from "./ProcessOptimizationVideo";

export const processOptimizationProject: VideoProject = {
  id: "process-optimization",
  name: "Process Optimization",
  compositions: [
    {
      id: "process-optimization",
      component: ProcessOptimizationVideo,
      durationInFrames: PROCESS_OPTIMIZATION_DURATION_IN_FRAMES,
      fps: PROCESS_OPTIMIZATION_FPS,
      width: PROCESS_OPTIMIZATION_WIDTH,
      height: PROCESS_OPTIMIZATION_HEIGHT,
    },
  ],
};
