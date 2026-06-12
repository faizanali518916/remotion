import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame } from 'remotion';

import { CTAEndCard, KineticCaption, SpeakerVideoPanel, TechBackground } from '../../components';
import { getAnimationSide } from './data';
import { processOptimizationScenes } from './scenes';
import { speakerTravelOpacity } from './timing';

export {
	PROCESS_OPTIMIZATION_DURATION_IN_FRAMES,
	PROCESS_OPTIMIZATION_FPS,
	PROCESS_OPTIMIZATION_HEIGHT,
	PROCESS_OPTIMIZATION_WIDTH,
} from './data';

const SceneTimeline: React.FC = () => {
	const frame = useCurrentFrame();
	const side = getAnimationSide(frame);
	const travelOpacity = speakerTravelOpacity(frame);

	return (
		<>
			{processOptimizationScenes.map((scene) => {
				const SceneComponent = scene.component;

				return (
					<Sequence key={scene.id} from={scene.startFrame} durationInFrames={scene.durationFrames}>
						<AbsoluteFill style={{ opacity: travelOpacity }}>
							<SceneComponent side={side} />
						</AbsoluteFill>
					</Sequence>
				);
			})}
		</>
	);
};

export const ProcessOptimizationVideo: React.FC = () => {
	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#02040a',
				overflow: 'hidden',
			}}
		>
			<TechBackground />
			<SpeakerVideoPanel />
			<SceneTimeline />
			<KineticCaption />
			<Sequence from={2118} durationInFrames={97}>
				<CTAEndCard />
			</Sequence>
		</AbsoluteFill>
	);
};
