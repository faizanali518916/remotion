import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

type GlowOrbProps = {
	size: number;
	color: string;
	x: number;
	y: number;
	delay?: number;
	driftX?: number;
	driftY?: number;
	opacity?: number;
};

export const GlowOrb: React.FC<GlowOrbProps> = ({
	size,
	color,
	x,
	y,
	delay = 0,
	driftX = 24,
	driftY = 18,
	opacity = 0.42,
}) => {
	const frame = useCurrentFrame();
	const local = frame + delay;
	const dx = Math.sin(local / 78) * driftX;
	const dy = Math.cos(local / 96) * driftY;
	const pulse = interpolate(Math.sin(local / 42), [-1, 1], [0.72, 1.08]);

	return (
		<div
			style={{
				position: 'absolute',
				width: size,
				height: size,
				left: x + dx,
				top: y + dy,
				borderRadius: '50%',
				opacity,
				transform: `scale(${pulse})`,
				background: `radial-gradient(circle, ${color} 0%, ${color}77 28%, transparent 70%)`,
				filter: 'blur(18px)',
				mixBlendMode: 'screen',
			}}
		/>
	);
};
