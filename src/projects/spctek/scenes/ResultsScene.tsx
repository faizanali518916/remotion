import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

import { AnimatedText } from '../../../components/AnimatedText';
import { GlassCard } from '../../../components/GlassCard';
import { ProgressBar } from '../../../components/ProgressBar';
import { fadeIn, slideUp, stagger } from '../../../lib/animations';
import { resultOutcomes } from '../../../lib/data';

export const ResultsScene: React.FC = () => {
	const frame = useCurrentFrame();
	const systemGlow = interpolate(frame, [60, 150], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill
			style={{
				background:
					'radial-gradient(circle at 50% 52%, rgba(34,197,94,0.15), transparent 32%), linear-gradient(135deg, #020617, #061124 58%, #020617)',
				color: '#fff',
				fontFamily: 'Inter, ui-sans-serif, system-ui, Arial, sans-serif',
				overflow: 'hidden',
			}}
		>
			{/* Shows the payoff: operations become measurable, faster, and easier to control. */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					backgroundImage:
						'linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)',
					backgroundSize: '76px 76px',
					opacity: 0.28,
					transform: `translateY(${Math.sin(frame / 70) * 18}px)`,
				}}
			/>
			<div style={{ position: 'absolute', top: 76, left: 130, right: 130, textAlign: 'center' }}>
				<AnimatedText delay={0} style={{ fontSize: 64, lineHeight: 1.08, fontWeight: 850, letterSpacing: 0 }}>
					The result: clarity, speed, scalability, and control.
				</AnimatedText>
			</div>
			<div
				style={{
					position: 'absolute',
					left: 150,
					right: 150,
					top: 275,
					display: 'grid',
					gridTemplateColumns: 'repeat(4, 1fr)',
					gap: 24,
				}}
			>
				{resultOutcomes.map((outcome, index) => {
					const delay = stagger(index, 34, 14);
					const value = interpolate(frame, [delay + 14, delay + 66], [0, 0.72 + index * 0.06], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					});

					return (
						<GlassCard
							key={outcome.label}
							accent={index === 3 ? '#22c55e' : '#22d3ee'}
							style={{
								minHeight: 430,
								padding: 30,
								opacity: fadeIn(frame, delay, 20),
								transform: `translateY(${slideUp(frame, delay, 20, 38)}px)`,
							}}
						>
							<div
								style={{
									width: 58,
									height: 58,
									borderRadius: 18,
									background: 'linear-gradient(135deg, rgba(34,211,238,0.36), rgba(139,92,246,0.24))',
									border: '1px solid rgba(255,255,255,0.18)',
									boxShadow: '0 0 34px rgba(34,211,238,0.2)',
								}}
							/>
							<div style={{ marginTop: 28, color: '#67e8f9', fontSize: 24, fontWeight: 900 }}>{outcome.label}</div>
							<div
								style={{
									marginTop: 10,
									color: '#f8fafc',
									fontSize: 56,
									lineHeight: 1,
									fontWeight: 950,
								}}
							>
								{outcome.metric}
							</div>
							<div style={{ marginTop: 22 }}>
								<ProgressBar value={value} accent={index === 3 ? '#22c55e' : '#22d3ee'} />
							</div>
							<div style={{ marginTop: 24, color: '#cbd5e1', fontSize: 20, lineHeight: 1.42 }}>{outcome.detail}</div>
						</GlassCard>
					);
				})}
			</div>
			<div
				style={{
					position: 'absolute',
					left: 560,
					right: 560,
					bottom: 88,
					height: 5,
					borderRadius: 999,
					background: 'linear-gradient(90deg, #22d3ee, #8b5cf6, #22c55e)',
					opacity: systemGlow,
					boxShadow: `0 0 ${systemGlow * 70}px rgba(34,211,238,0.72)`,
				}}
			/>
		</AbsoluteFill>
	);
};
