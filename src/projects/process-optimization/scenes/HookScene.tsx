import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

import { ConceptCards, LightSweep, SceneStage } from '../../../components';
import type { StageSide } from '../data';
import { clamp, ease } from '../timing';

export const HookScene: React.FC<{ side: StageSide }> = ({ side }) => {
	const frame = useCurrentFrame();
	const titleScale = interpolate(frame, [0, 26], [0.88, 1], {
		...clamp,
		easing: ease,
	});

	return (
		<SceneStage side={side}>
			<LightSweep />
			<div
				style={{
					position: 'absolute',
					left: 94,
					top: 118,
					color: '#9beafe',
					fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
					fontSize: 19,
					fontWeight: 900,
					letterSpacing: 0,
					textTransform: 'uppercase',
				}}
			>
				SPCTEK AI OPERATIONS SERIES
			</div>
			<div
				style={{
					position: 'absolute',
					left: 88,
					top: 174,
					width: 680,
					color: '#f8fbff',
					fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
					fontSize: 82,
					fontWeight: 950,
					lineHeight: 0.94,
					letterSpacing: 0,
					textTransform: 'uppercase',
					transform: `scale(${titleScale})`,
					transformOrigin: 'left center',
					textShadow: '0 0 44px rgba(103,232,249,0.36)',
				}}
			>
				Business
				<br />
				failure is
				<br />
				operational
			</div>
			<ConceptCards
				top={666}
				cards={[
					{ label: 'signal', value: 'strong product' },
					{ label: 'risk', value: 'weak process', tone: '#fb7185' },
				]}
			/>
		</SceneStage>
	);
};
