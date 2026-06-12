import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

import type { StageSide } from '../projects/process-optimization/data';
import { clamp, ease } from '../projects/process-optimization/timing';
import { animationAreaForSide } from './animation-area';

export const SceneStage: React.FC<{
	side: StageSide;
	children: React.ReactNode;
}> = ({ side, children }) => {
	const frame = useCurrentFrame();
	const area = animationAreaForSide(side);
	const opacity = interpolate(frame, [0, 18], [0, 1], {
		...clamp,
		easing: ease,
	});
	const x = interpolate(frame, [0, 26], [side === 'left' ? -34 : 34, 0], {
		...clamp,
		easing: ease,
	});
	const rail = interpolate((frame * 1.4) % 120, [0, 120], [-220, 1040], clamp);
	const haloScale = interpolate(frame, [0, 60], [0.86, 1], {
		...clamp,
		easing: ease,
	});
	const sparkOpacity = interpolate(frame, [0, 26], [0, 1], {
		...clamp,
		easing: ease,
	});

	return (
		<div
			style={{
				position: 'absolute',
				left: area.left,
				top: 0,
				width: area.width,
				height: 1080,
				opacity,
				transform: `translateX(${x}px)`,
				overflow: 'hidden',
			}}
		>
			<div
				style={{
					position: 'absolute',
					left: 70,
					top: 92,
					width: 778,
					height: 778,
					borderRadius: '50%',
					border: '1px solid rgba(103,232,249,0.14)',
					opacity: 0.62,
					transform: `scale(${haloScale}) rotate(${frame * 0.12}deg)`,
					boxShadow: 'inset 0 0 90px rgba(103,232,249,0.08), 0 0 90px rgba(103,232,249,0.05)',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					left: 176,
					top: 198,
					width: 566,
					height: 566,
					borderRadius: '50%',
					border: '1px dashed rgba(167,139,250,0.18)',
					opacity: 0.72,
					transform: `rotate(${-frame * 0.22}deg)`,
				}}
			/>
			<div
				style={{
					position: 'absolute',
					left: rail,
					top: 58,
					width: 160,
					height: 920,
					opacity: 0.17,
					background: 'linear-gradient(90deg, transparent, rgba(103,232,249,0.9), transparent)',
					transform: 'rotate(20deg)',
					filter: 'blur(3px)',
				}}
			/>
			{Array.from({ length: 8 }, (_, index) => {
				const left = 92 + ((index * 113 + frame * 1.7) % 720);
				const top = 104 + ((index * 71 + frame * 0.9) % 760);
				const tone = index % 3 === 0 ? '#a7f3d0' : '#67e8f9';

				return (
					<div
						key={index}
						style={{
							position: 'absolute',
							left,
							top,
							width: index % 2 === 0 ? 42 : 72,
							height: 1,
							opacity: sparkOpacity * (0.18 + (index % 4) * 0.05),
							background: `linear-gradient(90deg, transparent, ${tone}, transparent)`,
							boxShadow: `0 0 14px ${tone}`,
						}}
					/>
				);
			})}
			{children}
		</div>
	);
};
