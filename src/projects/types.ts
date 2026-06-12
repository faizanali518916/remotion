import type React from "react";

export type ProjectComposition = {
  id: string;
  component: React.ComponentType;
  durationInFrames: number;
  fps: number;
  width: number;
  height: number;
};

export type VideoProject = {
  id: string;
  name: string;
  compositions: ProjectComposition[];
};
