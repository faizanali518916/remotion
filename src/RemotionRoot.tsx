import "./index.css";
import React from "react";
import { Composition } from "remotion";
import { registeredCompositions } from "./projects";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {registeredCompositions.map((composition) => (
        <Composition
          key={composition.fullId}
          id={composition.fullId}
          component={composition.component}
          durationInFrames={composition.durationInFrames}
          fps={composition.fps}
          width={composition.width}
          height={composition.height}
        />
      ))}
    </>
  );
};
