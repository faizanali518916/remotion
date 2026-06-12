import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

import { captions } from '../projects/process-optimization/data';
import { clamp, ease, secondsToFrame, speakerTravelOpacity } from '../projects/process-optimization/timing';

const splitCaptionParts = (text: string, emphasis: string[]) => {
	const ranges = emphasis
		.map((phrase) => {
			const start = text.toLowerCase().indexOf(phrase.toLowerCase());
			return start === -1
				? null
				: {
						start,
						end: start + phrase.length,
					};
		})
		.filter((range): range is { start: number; end: number } => Boolean(range))
		.sort((a, b) => a.start - b.start);

	const parts: Array<{ text: string; highlighted: boolean }> = [];
	let cursor = 0;

	ranges.forEach((range) => {
		if (range.start < cursor) {
			return;
		}

		if (range.start > cursor) {
			parts.push({ text: text.slice(cursor, range.start), highlighted: false });
		}

		parts.push({ text: text.slice(range.start, range.end), highlighted: true });
		cursor = range.end;
	});

	if (cursor < text.length) {
		parts.push({ text: text.slice(cursor), highlighted: false });
	}

	const normalizedParts = parts.reduce<Array<{ text: string; highlighted: boolean }>>((acc, part) => {
		if (/^[,.;:!?]/.test(part.text) && acc.length > 0) {
			acc[acc.length - 1].text += part.text[0];
			const remainingText = part.text.slice(1);

			if (remainingText) {
				acc.push({ ...part, text: remainingText });
			}

			return acc;
		}

		acc.push(part);
		return acc;
	}, []);

	return normalizedParts.length > 0 ? normalizedParts : [{ text, highlighted: false }];
};

export const KineticCaption: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const currentTime = frame / fps;
	const caption =
		captions.find((item) => currentTime >= item.start && currentTime < item.end) ?? captions[captions.length - 1];

	const startFrame = secondsToFrame(caption.start);
	const endFrame = secondsToFrame(caption.end);
	const localFrame = frame - startFrame;
	const intro = spring({
		frame: localFrame,
		fps,
		config: {
			damping: 15,
			stiffness: 165,
			mass: 0.72,
		},
	});
	const out = interpolate(frame, [endFrame - 18, endFrame - 5], [1, 0], clamp);
	const travelClearance = speakerTravelOpacity(frame);
	const ctaClearance = interpolate(frame, [2100, 2118], [1, 0], clamp);
	const y = interpolate(intro, [0, 1], [44, 0], clamp);
	const scale = interpolate(intro, [0, 1], [0.92, 1], clamp);
	const words = splitCaptionParts(caption.text, caption.emphasis);
	const isHero =
		caption.text.includes('Process Optimization') ||
		caption.text.includes('Scale with accuracy') ||
		caption.text.includes('free operations audit');
	const underline = interpolate(localFrame, [2, 22], [0, 1], {
		...clamp,
		easing: ease,
	});
	const pulse = 0.82 + Math.sin(frame / 9) * 0.18;

	return (
		<div
			style={{
				position: 'absolute',
				left: 326,
				top: isHero ? 748 : 806,
				width: 1268,
				minHeight: 176,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				textAlign: 'center',
				padding: '0 42px',
				opacity: out * travelClearance * ctaClearance,
				transform: `translateY(${y}px) scale(${scale})`,
				transformOrigin: 'center bottom',
				filter: `drop-shadow(0 0 ${22 + pulse * 20}px rgba(103,232,249,0.34))`,
			}}
		>
			<div
				style={{
					position: 'absolute',
					left: 64,
					right: 64,
					top: 4,
					height: 1,
					opacity: 0.72,
					background: 'linear-gradient(90deg, transparent, rgba(103,232,249,0.9), rgba(167,139,250,0.82), transparent)',
					transform: `scaleX(${underline})`,
					transformOrigin: 'center',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					left: 178 + Math.sin(frame / 14) * 34,
					bottom: 4,
					width: 780,
					height: 3,
					opacity: 0.78,
					background: 'linear-gradient(90deg, transparent, rgba(74,222,255,0.94), rgba(74,222,128,0.72), transparent)',
					boxShadow: '0 0 30px rgba(103,232,249,0.72)',
					transform: `scaleX(${underline})`,
					transformOrigin: 'center',
				}}
			/>
			<div
				style={{
					color: '#f8fbff',
					fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
					fontSize: isHero ? 70 : 43,
					fontWeight: 900,
					lineHeight: isHero ? 0.98 : 1.08,
					letterSpacing: 0,
					textShadow: '0 0 18px rgba(2,6,23,0.95), 0 0 36px rgba(74, 222, 255, 0.36)',
					WebkitTextStroke: '1px rgba(175, 239, 255, 0.12)',
					whiteSpace: 'pre-wrap',
				}}
			>
				{words.map((part, index) => (
					<span
						key={`${part.text}-${index}`}
						style={{
							display: 'inline-block',
							whiteSpace: 'pre-wrap',
							color: part.highlighted ? 'transparent' : '#f8fbff',
							background: part.highlighted ? 'linear-gradient(90deg, #67e8f9, #a7f3d0, #c4b5fd)' : undefined,
							WebkitBackgroundClip: part.highlighted ? 'text' : undefined,
							textShadow: part.highlighted
								? '0 0 24px rgba(103,232,249,0.82), 0 0 58px rgba(167,139,250,0.34)'
								: '0 0 22px rgba(255,255,255,0.16)',
							transform: `translateY(${interpolate(localFrame, [index * 3, index * 3 + 16], [18, 0], {
								...clamp,
								easing: ease,
							})}px)`,
							opacity: interpolate(localFrame, [index * 3, index * 3 + 12], [0, 1], {
								...clamp,
								easing: ease,
							}),
						}}
					>
						{part.text}
					</span>
				))}
			</div>
		</div>
	);
};
