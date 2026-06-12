import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

import { LightSweep, SceneStage } from '../../../components';
import type { StageSide } from '../data';
import { clamp } from '../timing';

export const TopicRevealScene: React.FC<{ side: StageSide }> = ({ side }) => {
	const frame = useCurrentFrame();

	return (
		<SceneStage side={side}>
			<LightSweep />
			<div
				style={{
					position: 'absolute',
					left: 66,
					top: 154,
					width: 760,
					color: '#f8fbff',
					fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
					textAlign: 'center',
					fontSize: 86,
					lineHeight: 0.9,
					fontWeight: 950,
					letterSpacing: 0,
					textTransform: 'uppercase',
					opacity: interpolate(frame, [0, 24, 148, 180], [0, 1, 1, 0], clamp),
					transform: `scale(${interpolate(frame, [0, 28], [0.88, 1], clamp)})`,
					textShadow: '0 0 44px rgba(103,232,249,0.42)',
				}}
			>
				Process
				<br />
				Optimization
			</div>
		</SceneStage>
	);
};
