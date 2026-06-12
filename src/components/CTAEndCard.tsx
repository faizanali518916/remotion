import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

import { clamp, ease } from '../projects/process-optimization/timing';

export const CTAEndCard: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const enter = spring({
		frame,
		fps,
		config: {
			damping: 16,
			stiffness: 140,
			mass: 0.8,
		},
	});
	const pulse = 1 + Math.sin(frame / 8) * 0.018;
	const line = interpolate(frame, [0, 34], [0, 1], {
		...clamp,
		easing: ease,
	});

	return (
		<AbsoluteFill
			style={{
				background:
					'radial-gradient(circle at 50% 50%, rgba(103,232,249,0.14), transparent 34%), linear-gradient(135deg, rgba(2,6,23,0.78), rgba(3,7,18,0.94))',
				alignItems: 'center',
				justifyContent: 'center',
				color: '#f8fbff',
				fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
				opacity: interpolate(frame, [0, 16], [0, 1], clamp),
				overflow: 'hidden',
			}}
		>
			{Array.from({ length: 7 }, (_, index) => (
				<div
					key={index}
					style={{
						position: 'absolute',
						left: 220 + index * 230 + Math.sin(frame / 18 + index) * 18,
						top: 84 + ((index * 137 + frame * 2.1) % 870),
						width: 190,
						height: 2,
						opacity: 0.16 + (index % 3) * 0.05,
						background: 'linear-gradient(90deg, transparent, rgba(103,232,249,0.95), transparent)',
						boxShadow: '0 0 18px rgba(103,232,249,0.68)',
					}}
				/>
			))}
			<div
				style={{
					position: 'absolute',
					width: 820,
					height: 820,
					borderRadius: '50%',
					border: '1px solid rgba(103,232,249,0.2)',
					boxShadow: 'inset 0 0 110px rgba(103,232,249,0.08), 0 0 130px rgba(103,232,249,0.08)',
					transform: `scale(${interpolate(enter, [0, 1], [0.75, 1], clamp)}) rotate(${frame * 0.12}deg)`,
				}}
			/>
			<div
				style={{
					position: 'relative',
					width: 1120,
					minHeight: 430,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					textAlign: 'center',
					transform: `scale(${interpolate(enter, [0, 1], [0.92, 1], clamp) * pulse})`,
					padding: 54,
				}}
			>
				<div
					style={{
						position: 'absolute',
						left: 60,
						right: 60,
						top: 36,
						height: 2,
						background:
							'linear-gradient(90deg, transparent, rgba(103,232,249,0.96), rgba(167,139,250,0.84), transparent)',
						transform: `scaleX(${line})`,
						boxShadow: '0 0 28px rgba(103,232,249,0.68)',
					}}
				/>
				<div
					style={{
						color: '#67e8f9',
						fontSize: 30,
						fontWeight: 900,
						letterSpacing: 0,
						marginBottom: 24,
						textShadow: '0 0 24px rgba(103,232,249,0.62)',
					}}
				>
					SPCTEK AI
				</div>
				<div
					style={{
						fontSize: 64,
						fontWeight: 950,
						lineHeight: 1.08,
						letterSpacing: 0,
						textShadow: '0 0 26px rgba(103,232,249,0.58), 0 0 86px rgba(167,139,250,0.34)',
					}}
				>
					Free Operations Audit
				</div>
				<div
					style={{
						marginTop: 28,
						fontSize: 30,
						fontWeight: 750,
						color: '#dbeafe',
						letterSpacing: 0,
						textShadow: '0 0 20px rgba(219,234,254,0.28)',
					}}
				>
					Link in caption
				</div>
			</div>
		</AbsoluteFill>
	);
};
