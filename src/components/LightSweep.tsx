import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

import { clamp, ease } from '../projects/process-optimization/timing';

export const LightSweep: React.FC<{ tone?: 'cyan' | 'red' | 'green' }> = ({ tone = 'cyan' }) => {
	const frame = useCurrentFrame();
	const color =
		tone === 'red'
			? 'rgba(255, 87, 87, 0.58)'
			: tone === 'green'
				? 'rgba(74, 222, 128, 0.52)'
				: 'rgba(103, 232, 249, 0.58)';
	const x = interpolate(frame, [0, 42], [-220, 1040], {
		...clamp,
		easing: ease,
	});

	return (
		<div
			style={{
				position: 'absolute',
				left: x,
				top: -140,
				width: 190,
				height: 1360,
				opacity: interpolate(frame, [0, 12, 42, 58], [0, 0.7, 0.18, 0], clamp),
				background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
				transform: 'rotate(17deg)',
				filter: 'blur(2px)',
			}}
		/>
	);
};
