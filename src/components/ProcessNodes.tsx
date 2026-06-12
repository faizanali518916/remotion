import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

import { clamp, ease } from '../projects/process-optimization/timing';

export const ProcessNodes: React.FC<{
	mode?: 'broken' | 'map' | 'success';
}> = ({ mode = 'broken' }) => {
	const frame = useCurrentFrame();
	const labels =
		mode === 'map'
			? ['MAP', 'BOTTLENECK', 'TASKS', 'FLOW']
			: mode === 'success'
				? ['BEST', 'PRACTICE', 'AUTOMATE', 'SCALE']
				: ['STEP', 'DELAY', 'ERROR', 'REWORK'];
	const progress = interpolate(frame, [0, 80], [0, 1], {
		...clamp,
		easing: ease,
	});
	const tone = mode === 'success' ? '#4ade80' : mode === 'map' ? '#67e8f9' : '#fb7185';

	return (
		<div
			style={{
				position: 'absolute',
				left: 92,
				top: 680,
				width: 690,
				height: 168,
				opacity: interpolate(frame, [0, 20, 120, 150], [0, 1, 1, 0], clamp),
			}}
		>
			<div
				style={{
					position: 'absolute',
					left: 58,
					right: 58,
					top: 72,
					height: 2,
					background: 'rgba(255,255,255,0.18)',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					left: 58,
					top: 72,
					width: 574 * progress,
					height: 2,
					background: tone,
					boxShadow: `0 0 24px ${tone}`,
				}}
			/>
			{labels.map((label, index) => {
				const active = progress > index / (labels.length - 1) - 0.04;
				const jitter = mode === 'broken' ? Math.sin((frame + index * 8) / 3) * 2.5 : 0;
				const nodePulse = active ? 1 + Math.sin((frame + index * 6) / 10) * 0.04 : 0.92;

				return (
					<div
						key={label}
						style={{
							position: 'absolute',
							left: index * 168,
							top: 22 + jitter,
							width: 150,
							height: 118,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 12,
							color: active ? '#f8fbff' : 'rgba(248,251,255,0.52)',
							fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
							fontSize: 15,
							fontWeight: 900,
							letterSpacing: 0,
							textAlign: 'center',
							transform: `scale(${nodePulse})`,
						}}
					>
						<div
							style={{
								position: 'relative',
								width: 60,
								height: 60,
								borderRadius: '50%',
								border: `1px solid ${active ? tone : 'rgba(255,255,255,0.22)'}`,
								background: active
									? `radial-gradient(circle, ${tone}44, rgba(5,12,24,0.1) 58%, rgba(5,12,24,0))`
									: 'rgba(255,255,255,0.03)',
								boxShadow: active ? `0 0 34px ${tone}66` : 'none',
							}}
						>
							<div
								style={{
									position: 'absolute',
									inset: 17,
									borderRadius: '50%',
									background: active ? tone : 'rgba(255,255,255,0.22)',
									boxShadow: active ? `0 0 18px ${tone}` : 'none',
								}}
							/>
						</div>
						<div>{label}</div>
					</div>
				);
			})}
		</div>
	);
};
