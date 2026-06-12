import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

import { ConceptCards, LightSweep, SceneStage } from '../../../components';
import type { StageSide } from '../data';
import { clamp, ease } from '../timing';

export const RealProblemScene: React.FC<{ side: StageSide }> = ({ side }) => {
	const frame = useCurrentFrame();
	const reveal = interpolate(frame, [0, 24], [0, 1], {
		...clamp,
		easing: ease,
	});
	const scan = interpolate((frame * 1.8) % 80, [0, 80], [-80, 760], clamp);

	return (
		<SceneStage side={side}>
			<LightSweep tone="red" />
			<div
				style={{
					position: 'absolute',
					left: 92 + Math.sin(frame / 2) * 1.5,
					top: 74,
					width: 674,
					height: 118,
					color: '#fecaca',
					fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
					fontSize: 44,
					fontWeight: 950,
					lineHeight: 0.94,
					letterSpacing: 0,
					textTransform: 'uppercase',
					opacity: interpolate(frame, [0, 18, 170, 206], [0, 1, 1, 0], clamp),
					transform: `translateX(${interpolate(reveal, [0, 1], [-32, 0], clamp)}px)`,
					textShadow: '0 0 20px rgba(251,113,133,0.72), 0 0 58px rgba(127,29,29,0.44)',
				}}
			>
				<div style={{ overflow: 'hidden', position: 'relative' }}>
					<div
						style={{
							transform: `translateY(${interpolate(reveal, [0, 1], [58, 0], clamp)}px)`,
						}}
					>
						Messy internal
						<br />
						operations
					</div>
					<div
						style={{
							position: 'absolute',
							left: scan,
							top: 0,
							width: 74,
							height: 118,
							opacity: 0.3,
							background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)',
							transform: 'skewX(-18deg)',
						}}
					/>
				</div>
				<div
					style={{
						position: 'absolute',
						left: 0,
						bottom: 0,
						width: 674 * reveal,
						height: 3,
						background: 'linear-gradient(90deg, #fb7185, rgba(249,115,22,0.88), transparent)',
						boxShadow: '0 0 26px rgba(251,113,133,0.72)',
					}}
				/>
				<div
					style={{
						position: 'absolute',
						right: 0,
						top: 14,
						width: 112,
						height: 112,
						borderRadius: '50%',
						border: '1px solid rgba(251,113,133,0.3)',
						transform: `scale(${0.82 + reveal * 0.18})`,
					}}
				/>
			</div>
			<ConceptCards
				top={332}
				compact
				cards={[
					{ label: 'delay', value: 'handoffs stall', tone: '#fb7185' },
					{ label: 'confusion', value: 'ownership blurs', tone: '#f97316' },
					{ label: 'cost', value: 'rework grows', tone: '#fb7185' },
					{ label: 'outcome', value: 'speed drops', tone: '#f97316' },
				]}
			/>
		</SceneStage>
	);
};
