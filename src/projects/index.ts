import { processOptimizationProject } from "./process-optimization";
import { spctekProject } from "./spctek";
import { starterProject } from "./starter";
import type { ProjectComposition, VideoProject } from "./types";

export const projects: VideoProject[] = [
  spctekProject,
  starterProject,
  processOptimizationProject,
];

export type RegisteredComposition = ProjectComposition & {
  fullId: string;
  projectId: string;
};

export const registeredCompositions: RegisteredComposition[] = projects.flatMap(
  (project) =>
    project.compositions.map((composition) => ({
      ...composition,
      fullId:
        project.id === composition.id
          ? composition.id
          : `${project.id}-${composition.id}`,
      projectId: project.id,
    })),
);
