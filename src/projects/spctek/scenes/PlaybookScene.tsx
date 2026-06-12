import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

import { AnimatedText } from '../../../components/AnimatedText';
import { CodeBlock } from '../../../components/CodeBlock';
import { GlassCard } from '../../../components/GlassCard';
import { ProgressBar } from '../../../components/ProgressBar';
import { fadeIn, slideUp, springScale, stagger } from '../../../lib/animations';
import { playbookSections } from '../../../lib/data';

export const PlaybookScene: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	return (
		<AbsoluteFill
			style={{
				background:
					'radial-gradient(circle at 70% 48%, rgba(34,211,238,0.17), transparent 32%), linear-gradient(135deg, #020617, #07111f 58%, #020617)',
				color: '#fff',
				fontFamily: 'Inter, ui-sans-serif, system-ui, Arial, sans-serif',
				overflow: 'hidden',
			}}
		>
			{/* Positions consultation as a strategic roadmap, not a generic AI tool pitch. */}
			<div style={{ position: 'absolute', top: 78, left: 128, right: 128 }}>
				<AnimatedText delay={0} style={{ fontSize: 62, lineHeight: 1.08, fontWeight: 850, letterSpacing: 0 }}>
					Get a clear AI roadmap before you automate.
				</AnimatedText>
			</div>
			<GlassCard
				accent="#22d3ee"
				style={{
					position: 'absolute',
					left: 155,
					top: 250,
					width: 710,
					padding: 36,
					opacity: fadeIn(frame, 24, 24),
					transform: `translateY(${slideUp(frame, 24, 24, 40)}px) scale(${springScale(frame, fps, 20)})`,
				}}
			>
				<div style={{ color: '#67e8f9', fontSize: 19, fontWeight: 900 }}>CUSTOM AI PLAYBOOK</div>
				<div
					style={{
						marginTop: 12,
						fontSize: 52,
						fontWeight: 900,
						lineHeight: 1.02,
						color: '#fff',
					}}
				>
					Operational clarity before automation
				</div>
				<div style={{ marginTop: 24 }}>
					<ProgressBar
						value={interpolate(frame, [46, 116], [0, 0.93], {
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						})}
						accent="#22d3ee"
						height={12}
					/>
				</div>
				<div style={{ marginTop: 30, display: 'flex', flexDirection: 'column', gap: 14 }}>
					{playbookSections.map((section, index) => {
						const delay = stagger(index, 58, 10);
						return (
							<div
								key={section}
								style={{
									opacity: fadeIn(frame, delay, 14),
									transform: `translateX(${interpolate(frame, [delay, delay + 18], [-22, 0], {
										extrapolateLeft: 'clamp',
										extrapolateRight: 'clamp',
									})}px)`,
									display: 'flex',
									alignItems: 'center',
									gap: 16,
									padding: '14px 16px',
									borderRadius: 16,
									background: 'rgba(15,23,42,0.68)',
									border: '1px solid rgba(148,163,184,0.18)',
									fontSize: 23,
									color: '#e2e8f0',
									fontWeight: 800,
								}}
							>
								<span
									style={{
										width: 12,
										height: 12,
										borderRadius: 999,
										background: '#22c55e',
										boxShadow: '0 0 24px rgba(34,197,94,0.75)',
									}}
								/>
								{section}
							</div>
						);
					})}
				</div>
			</GlassCard>
			<CodeBlock
				delay={62}
				lines={[
					'diagnose(operations)',
					'prioritize(workflows)',
					'automate(repeatable_tasks)',
					'applyAI(secure_context)',
				]}
				style={{
					position: 'absolute',
					right: 150,
					top: 312,
					width: 680,
					opacity: fadeIn(frame, 44, 24),
					transform: `translateY(${slideUp(frame, 44, 24, 34)}px)`,
				}}
			/>
			<div
				style={{
					position: 'absolute',
					right: 154,
					bottom: 130,
					width: 680,
					fontSize: 42,
					lineHeight: 1.18,
					fontWeight: 850,
					color: '#f8fafc',
					opacity: fadeIn(frame, 118, 24),
					transform: `translateY(${slideUp(frame, 118, 24, 28)}px)`,
				}}
			>
				Start with clarity.
				<br />
				<span style={{ color: '#67e8f9' }}>Then automate with confidence.</span>
			</div>
		</AbsoluteFill>
	);
};
