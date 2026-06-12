import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

import { AnimatedText } from '../../../components/AnimatedText';
import { GlassCard } from '../../../components/GlassCard';
import { WorkflowPipeline } from '../../../components/WorkflowPipeline';
import { fadeIn, slideUp, springScale, stagger } from '../../../lib/animations';
import { frameworkSteps } from '../../../lib/data';

export const FrameworkScene: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const glow = interpolate(frame, [170, 230], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill
			style={{
				background:
					'radial-gradient(circle at 50% 64%, rgba(34,197,94,0.13), transparent 28%), linear-gradient(135deg, #020617, #061225 56%, #020617)',
				color: '#fff',
				fontFamily: 'Inter, ui-sans-serif, system-ui, Arial, sans-serif',
				overflow: 'hidden',
			}}
		>
			{/* Converts the diagnosis into the repeatable SPCTEK operating framework. */}
			<div style={{ position: 'absolute', top: 78, left: 130, right: 130, textAlign: 'center' }}>
				<AnimatedText
					delay={0}
					style={{
						fontSize: 62,
						fontWeight: 850,
						letterSpacing: 0,
						lineHeight: 1.08,
					}}
				>
					The SPCTEK Operational Intelligence Framework
				</AnimatedText>
			</div>
			<div style={{ position: 'absolute', left: 150, right: 150, top: 248 }}>
				<WorkflowPipeline delay={28} labels={['Diagnose', 'Structure', 'Automate', 'Practical AI']} accent="#22d3ee" />
			</div>
			<div
				style={{
					position: 'absolute',
					left: 120,
					right: 120,
					bottom: 110,
					display: 'grid',
					gridTemplateColumns: 'repeat(4, 1fr)',
					gap: 24,
				}}
			>
				{frameworkSteps.map((step, index) => {
					const delay = stagger(index, 76, 16);
					return (
						<GlassCard
							key={step.title}
							accent={index === 3 ? '#22c55e' : '#22d3ee'}
							style={{
								padding: 28,
								minHeight: 260,
								opacity: fadeIn(frame, delay, 20),
								transform: `translateY(${slideUp(frame, delay, 20, 34)}px) scale(${springScale(frame, fps, delay)})`,
							}}
						>
							<div style={{ color: '#67e8f9', fontSize: 20, fontWeight: 900 }}>{step.label}</div>
							<div
								style={{
									marginTop: 18,
									color: '#f8fafc',
									fontSize: 30,
									lineHeight: 1.08,
									fontWeight: 850,
								}}
							>
								{step.title}
							</div>
							<div style={{ marginTop: 18, color: '#cbd5e1', fontSize: 20, lineHeight: 1.42 }}>{step.detail}</div>
						</GlassCard>
					);
				})}
			</div>
			<div
				style={{
					position: 'absolute',
					left: 600,
					right: 600,
					bottom: 70,
					height: 5,
					borderRadius: 999,
					background: 'linear-gradient(90deg, #22d3ee, #8b5cf6, #22c55e)',
					opacity: glow,
					boxShadow: `0 0 ${64 * glow}px rgba(34,211,238,0.85)`,
				}}
			/>
		</AbsoluteFill>
	);
};
