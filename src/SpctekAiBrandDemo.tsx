import React from "react";
import { Series } from "remotion";
import { AutomationScene } from "./scenes/AutomationScene";
import { ChaosScene } from "./scenes/ChaosScene";
import { DiagnosisScene } from "./scenes/DiagnosisScene";
import { EcommerceAgencyScene } from "./scenes/EcommerceAgencyScene";
import { FinalCtaScene } from "./scenes/FinalCtaScene";
import { FrameworkScene } from "./scenes/FrameworkScene";
import { HeroScene } from "./scenes/HeroScene";
import { PlaybookScene } from "./scenes/PlaybookScene";
import { ResultsScene } from "./scenes/ResultsScene";

export const SPCTEK_FPS = 30;
export const SPCTEK_DURATION_IN_SECONDS = 45;
export const SPCTEK_DURATION_IN_FRAMES =
  SPCTEK_DURATION_IN_SECONDS * SPCTEK_FPS;

export const SPCTEK_WIDTH = 1920;
export const SPCTEK_HEIGHT = 1080;

const secondToFrames = (seconds: number) => seconds * SPCTEK_FPS;

export const SpctekAiBrandDemo: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={secondToFrames(5)}>
        <HeroScene />
      </Series.Sequence>

      <Series.Sequence durationInFrames={secondToFrames(4)}>
        <ChaosScene />
      </Series.Sequence>

      <Series.Sequence durationInFrames={secondToFrames(6)}>
        <DiagnosisScene />
      </Series.Sequence>

      <Series.Sequence durationInFrames={secondToFrames(6)}>
        <FrameworkScene />
      </Series.Sequence>

      <Series.Sequence durationInFrames={secondToFrames(5)}>
        <AutomationScene />
      </Series.Sequence>

      <Series.Sequence durationInFrames={secondToFrames(5)}>
        <ResultsScene />
      </Series.Sequence>

      <Series.Sequence durationInFrames={secondToFrames(5)}>
        <EcommerceAgencyScene />
      </Series.Sequence>

      <Series.Sequence durationInFrames={secondToFrames(5)}>
        <PlaybookScene />
      </Series.Sequence>

      <Series.Sequence durationInFrames={secondToFrames(4)}>
        <FinalCtaScene />
      </Series.Sequence>
    </Series>
  );
};
