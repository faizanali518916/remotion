import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

import { ConceptCards, LightSweep, SceneStage } from '../../../components';
import type { StageSide } from '../data';
import { clamp, ease } from '../timing';

export const AiMisbeliefScene: React.FC<{ side: StageSide }> = ({ side }) => {
	const frame = useCurrentFrame();
	const glitch = frame > 26 && frame < 37 ? Math.sin(frame * 2.8) * 7 : 0;
	const reveal = interpolate(frame, [0, 22], [0, 1], {
		...clamp,
		easing: ease,
	});
	const beam = interpolate((frame * 2.1) % 90, [0, 90], [-120, 680], clamp);

	return (
		<SceneStage side={side}>
			<LightSweep />
			<div
				style={{
					position: 'absolute',
					left: 128 + glitch,
					top: 88,
					width: 626,
					height: 140,
					display: 'flex',
					alignItems: 'center',
					color: '#ecfeff',
					fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
					fontSize: 58,
					fontWeight: 950,
					letterSpacing: 0,
					opacity: interpolate(frame, [0, 16, 170, 206], [0, 1, 1, 0], clamp),
					textShadow: '0 0 20px rgba(103,232,249,0.72), 0 0 68px rgba(167,139,250,0.42)',
					transform: `translateX(${interpolate(reveal, [0, 1], [-36, 0], clamp)}px)`,
					overflow: 'hidden',
				}}
			>
				<div
					style={{
						position: 'absolute',
						left: beam,
						top: -24,
						width: 86,
						height: 190,
						opacity: 0.38,
						background: 'linear-gradient(90deg, transparent, rgba(167,243,208,0.94), transparent)',
						transform: 'skewX(-20deg)',
					}}
				/>
				<div
					style={{
						position: 'absolute',
						left: 0,
						bottom: 16,
						width: 626 * reveal,
						height: 2,
						background: 'linear-gradient(90deg, rgba(103,232,249,0.96), rgba(167,139,250,0.84), transparent)',
						boxShadow: '0 0 24px rgba(103,232,249,0.78)',
					}}
				/>
				<span style={{ color: '#67e8f9' }}>AI</span>
				<span style={{ margin: '0 22px', color: '#c4b5fd' }}>!=</span>
				<span>MAGIC FIX</span>
			</div>
			<ConceptCards
				top={352}
				compact
				cards={[
					{ label: 'AI', value: 'amplifies the system' },
					{ label: 'broken process', value: 'amplifies the mess', tone: '#fb7185' },
				]}
			/>
		</SceneStage>
	);
};
