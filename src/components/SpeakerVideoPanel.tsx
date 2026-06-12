import React from 'react';
import { AbsoluteFill, interpolate, OffthreadVideo, staticFile, useCurrentFrame } from 'remotion';

import { PROCESS_OPTIMIZATION_DURATION_IN_FRAMES } from '../projects/process-optimization/data';
import { clamp, ease } from '../projects/process-optimization/timing';

const RAW_VIDEO_SRC = staticFile('assets/process-optimization/raw.mp4');
const LEFT_X = 72;
const RIGHT_X = 1158;

export const SpeakerVideoPanel: React.FC = () => {
	const frame = useCurrentFrame();
	const intro = interpolate(frame, [0, 42], [0, 1], {
		...clamp,
		easing: ease,
	});
	const left = interpolate(
		frame,
		[0, 54, 566, 626, 1184, 1244, 1736, 1796, PROCESS_OPTIMIZATION_DURATION_IN_FRAMES],
		[RIGHT_X, RIGHT_X, RIGHT_X, LEFT_X, LEFT_X, RIGHT_X, RIGHT_X, LEFT_X, LEFT_X],
		{
			...clamp,
			easing: ease,
		}
	);
	const totalPush = interpolate(frame, [0, PROCESS_OPTIMIZATION_DURATION_IN_FRAMES], [0, 1], clamp);
	const panelScale = interpolate(intro, [0, 1], [0.94, 1], clamp);
	const videoScale = 1.12 + totalPush * 0.055;

	return (
		<AbsoluteFill>
			<div
				style={{
					position: 'absolute',
					left,
					top: 0,
					width: 690,
					height: 1080,
					overflow: 'hidden',
					borderRadius: 30,
					transform: `scale(${panelScale})`,
					transformOrigin: 'center',
					backgroundColor: '#05070f',
					border: '1px solid rgba(125, 213, 255, 0.42)',
					boxShadow: '0 28px 90px rgba(0, 154, 255, 0.28)',
				}}
			>
				<OffthreadVideo
					src={RAW_VIDEO_SRC}
					style={{
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						transform: `scale(${videoScale})`,
					}}
				/>
				<div
					style={{
						position: 'absolute',
						inset: 0,
						background: 'linear-gradient(90deg, rgba(0,0,0,0.22), rgba(0,0,0,0) 42%, rgba(0,0,0,0.2))',
						pointerEvents: 'none',
					}}
				/>
			</div>
		</AbsoluteFill>
	);
};
