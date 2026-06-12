import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

import { clamp, ease } from '../projects/process-optimization/timing';

export const TechBackground: React.FC = () => {
	const frame = useCurrentFrame();
	const drift = frame * 0.38;
	const sweep = interpolate(frame % 210, [0, 46, 210], [-520, 2200, 2200], {
		...clamp,
		easing: ease,
	});

	const nodes = Array.from({ length: 26 }, (_, index) => {
		const x = 90 + ((index * 163) % 1740);
		const y = 74 + ((index * 97) % 930);
		const opacity = 0.16 + Math.sin((frame + index * 19) / 35) * 0.08;
		return { x, y, opacity };
	});

	return (
		<AbsoluteFill
			style={{
				background:
					'radial-gradient(circle at 32% 18%, rgba(0, 174, 255, 0.14), transparent 28%), radial-gradient(circle at 78% 74%, rgba(126, 95, 255, 0.14), transparent 30%), linear-gradient(135deg, #02040a 0%, #07111b 46%, #03050d 100%)',
				overflow: 'hidden',
			}}
		>
			<div
				style={{
					position: 'absolute',
					inset: -80,
					opacity: 0.26,
					backgroundImage:
						'linear-gradient(rgba(96, 220, 255, 0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(96, 220, 255, 0.12) 1px, transparent 1px)',
					backgroundSize: '58px 58px',
					transform: `translate3d(${-drift % 58}px, ${(drift * 0.62) % 58}px, 0) perspective(900px) rotateX(58deg) scale(1.28)`,
					transformOrigin: 'center',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					opacity: 0.065,
					backgroundImage:
						'repeating-linear-gradient(0deg, rgba(255,255,255,0.45) 0, rgba(255,255,255,0.45) 1px, transparent 1px, transparent 5px)',
				}}
			/>
			{nodes.map((node, index) => (
				<div
					key={index}
					style={{
						position: 'absolute',
						left: node.x,
						top: node.y,
						width: index % 5 === 0 ? 5 : 3,
						height: index % 5 === 0 ? 5 : 3,
						borderRadius: 99,
						backgroundColor: index % 4 === 0 ? '#a78bfa' : '#67e8f9',
						opacity: node.opacity,
						boxShadow: '0 0 16px rgba(103,232,249,0.65)',
					}}
				/>
			))}
			<div
				style={{
					position: 'absolute',
					left: sweep,
					top: -180,
					width: 250,
					height: 1480,
					opacity: 0.22,
					background: 'linear-gradient(90deg, transparent, rgba(134, 239, 255, 0.48), transparent)',
					transform: 'rotate(18deg)',
				}}
			/>
		</AbsoluteFill>
	);
};
