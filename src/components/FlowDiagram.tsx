import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

import { clamp, ease } from '../projects/process-optimization/timing';

type FlowStep = {
	label: string;
	value: string;
	tone?: string;
};

const Arrow: React.FC<{
	left: number;
	top: number;
	width?: number;
	height?: number;
	direction: 'right' | 'left' | 'down';
	progress: number;
	tone: string;
}> = ({ left, top, width = 118, height = 92, direction, progress, tone }) => {
	const isDown = direction === 'down';
	const lineLength = isDown ? height : width;

	return (
		<div
			style={{
				position: 'absolute',
				left,
				top,
				width,
				height,
				opacity: progress,
			}}
		>
			<div
				style={{
					position: 'absolute',
					left: direction === 'left' ? width - lineLength * progress : 0,
					top: isDown ? 0 : height / 2,
					width: isDown ? 2 : lineLength * progress,
					height: isDown ? lineLength * progress : 2,
					background: tone,
					boxShadow: `0 0 22px ${tone}`,
				}}
			/>
			<div
				style={{
					position: 'absolute',
					left:
						direction === 'left'
							? Math.max(0, width - lineLength * progress - 11)
							: isDown
								? -8
								: lineLength * progress - 2,
					top: isDown ? lineLength * progress - 2 : height / 2 - 8,
					width: 0,
					height: 0,
					borderTop: direction === 'down' ? `12px solid ${tone}` : '8px solid transparent',
					borderBottom: direction === 'down' ? '0 solid transparent' : '8px solid transparent',
					borderLeft: direction === 'right' ? `14px solid ${tone}` : '0 solid transparent',
					borderRight: direction === 'left' ? `14px solid ${tone}` : '0 solid transparent',
					filter: `drop-shadow(0 0 10px ${tone})`,
				}}
			/>
		</div>
	);
};

export const FlowDiagram: React.FC<{
	steps: FlowStep[];
	top?: number;
	tone?: string;
}> = ({ steps, top = 156, tone = '#67e8f9' }) => {
	const frame = useCurrentFrame();
	const positions =
		steps.length <= 2
			? [
					{ left: 70, top: 116 },
					{ left: 492, top: 116 },
				]
			: [
					{ left: 52, top: 20 },
					{ left: 476, top: 20 },
					{ left: 476, top: 292 },
					{ left: 52, top: 292 },
				];
	const arrowProgress = interpolate(frame, [12, 62], [0, 1], {
		...clamp,
		easing: ease,
	});

	return (
		<div
			style={{
				position: 'absolute',
				left: 96,
				top,
				width: 760,
				height: steps.length <= 2 ? 360 : 560,
			}}
		>
			<div
				style={{
					position: 'absolute',
					left: 92,
					top: steps.length <= 2 ? 142 : 236,
					width: 566,
					height: 1,
					opacity: 0.22,
					background: 'linear-gradient(90deg, transparent, rgba(103,232,249,0.72), transparent)',
				}}
			/>
			{steps.length <= 2 ? (
				<Arrow left={336} top={132} width={138} height={54} direction="right" progress={arrowProgress} tone={tone} />
			) : (
				<>
					<Arrow left={332} top={72} width={124} height={58} direction="right" progress={arrowProgress} tone={tone} />
					<Arrow left={610} top={178} width={46} height={96} direction="down" progress={arrowProgress} tone={tone} />
					<Arrow left={332} top={344} width={124} height={58} direction="left" progress={arrowProgress} tone={tone} />
				</>
			)}
			{steps.map((step, index) => {
				const stepTone = step.tone ?? tone;
				const opacity = interpolate(frame, [index * 9, index * 9 + 22], [0, 1], {
					...clamp,
					easing: ease,
				});
				const y = interpolate(frame, [index * 9, index * 9 + 22], [26, 0], {
					...clamp,
					easing: ease,
				});
				const scan = interpolate((frame + index * 16) % 88, [0, 34, 88], [-140, 320, 320], clamp);
				const position = positions[index];

				return (
					<div
						key={step.label}
						style={{
							position: 'absolute',
							left: position.left,
							top: position.top,
							width: 250,
							height: 164,
							padding: '22px 24px',
							borderTop: `1px solid ${stepTone}8a`,
							borderLeft: `4px solid ${stepTone}`,
							borderBottom: '1px solid rgba(255,255,255,0.12)',
							background:
								'linear-gradient(112deg, rgba(7,15,30,0.42), rgba(10,19,34,0.14) 62%, rgba(255,255,255,0.04))',
							boxShadow: `0 20px 64px ${stepTone}24, inset 0 1px 0 rgba(255,255,255,0.13)`,
							clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 18px 100%, 0 calc(100% - 18px))',
							opacity,
							transform: `translateY(${y}px)`,
							overflow: 'hidden',
						}}
					>
						<div
							style={{
								position: 'absolute',
								left: scan,
								top: -32,
								width: 78,
								height: 226,
								opacity: 0.28,
								background: `linear-gradient(90deg, transparent, ${stepTone}, transparent)`,
								transform: 'rotate(15deg)',
							}}
						/>
						<div
							style={{
								position: 'relative',
								color: stepTone,
								fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
								fontSize: 15,
								fontWeight: 950,
								letterSpacing: 0,
								textTransform: 'uppercase',
								textShadow: `0 0 18px ${stepTone}75`,
							}}
						>
							{step.label}
						</div>
						<div
							style={{
								position: 'relative',
								marginTop: 18,
								color: '#f8fbff',
								fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
								fontSize: 27,
								fontWeight: 880,
								lineHeight: 1.04,
								letterSpacing: 0,
								textShadow: '0 0 24px rgba(255,255,255,0.16)',
							}}
						>
							{step.value}
						</div>
					</div>
				);
			})}
		</div>
	);
};
