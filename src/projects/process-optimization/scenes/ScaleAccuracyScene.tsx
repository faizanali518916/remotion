import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

import { LightSweep, SceneStage } from '../../../components';
import type { StageSide } from '../data';
import { clamp } from '../timing';

export const ScaleAccuracyScene: React.FC<{ side: StageSide }> = ({ side }) => {
	const frame = useCurrentFrame();

	return (
		<SceneStage side={side}>
			<LightSweep tone="green" />
			<div
				style={{
					position: 'absolute',
					left: 78,
					top: 158,
					width: 760,
					textAlign: 'center',
					color: '#ecfeff',
					fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
					fontSize: 88,
					fontWeight: 950,
					lineHeight: 0.95,
					letterSpacing: 0,
					opacity: interpolate(frame, [0, 18, 124, 148], [0, 1, 1, 0], clamp),
					transform: `scale(${interpolate(frame, [0, 156], [0.94, 1.08], clamp)})`,
					textShadow: '0 0 28px rgba(103,232,249,0.7), 0 0 80px rgba(59,130,246,0.38)',
				}}
			>
				SCALE
				<br />
				WITH ACCURACY
			</div>
		</SceneStage>
	);
};
