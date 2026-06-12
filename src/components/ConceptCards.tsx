import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

import { clamp, ease } from '../projects/process-optimization/timing';

export const ConceptCards: React.FC<{
	cards: Array<{ label: string; value: string; tone?: string }>;
	top?: number;
	compact?: boolean;
}> = ({ cards, top = 182, compact = false }) => {
	const frame = useCurrentFrame();

	return (
		<div
			style={{
				position: 'absolute',
				left: 108,
				top,
				width: 700,
				display: 'grid',
				gridTemplateColumns: '1fr 1fr',
				gap: compact ? 14 : 20,
				perspective: 1200,
			}}
		>
			{cards.map((card, index) => {
				const opacity = interpolate(frame, [index * 8, index * 8 + 22], [0, 1], {
					...clamp,
					easing: ease,
				});
				const y = interpolate(frame, [index * 8, index * 8 + 22], [28, 0], {
					...clamp,
					easing: ease,
				});
				const x = interpolate(frame, [index * 8, index * 8 + 24], [-18, 0], {
					...clamp,
					easing: ease,
				});
				const scan = interpolate((frame + index * 18) % 92, [0, 34, 92], [-180, 340, 340], {
					...clamp,
					easing: ease,
				});
				const glow = 0.24 + Math.sin((frame + index * 13) / 18) * 0.1;
				const tone = card.tone ?? '#67e8f9';

				return (
					<div
						key={card.label}
						style={{
							position: 'relative',
							height: compact ? 116 : 138,
							padding: compact ? '20px 24px' : '24px 28px',
							borderTop: `1px solid ${tone}72`,
							borderBottom: '1px solid rgba(255,255,255,0.12)',
							borderLeft: `4px solid ${tone}`,
							background:
								'linear-gradient(110deg, rgba(7,15,30,0.38), rgba(10,19,34,0.12) 58%, rgba(255,255,255,0.03))',
							boxShadow: `0 18px 58px ${tone}20, inset 0 1px 0 rgba(255,255,255,0.12)`,
							clipPath: 'polygon(0 0, calc(100% - 26px) 0, 100% 26px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
							opacity,
							transform: `translate3d(${x}px, ${y}px, 0) rotateX(${interpolate(opacity, [0, 1], [9, 0], clamp)}deg)`,
							overflow: 'hidden',
						}}
					>
						<div
							style={{
								position: 'absolute',
								inset: 0,
								opacity: glow,
								background: `radial-gradient(circle at 12% 18%, ${tone}66, transparent 34%)`,
							}}
						/>
						<div
							style={{
								position: 'absolute',
								left: scan,
								top: -40,
								width: 88,
								height: 230,
								opacity: 0.32,
								background: `linear-gradient(90deg, transparent, ${tone}, transparent)`,
								transform: 'rotate(16deg)',
							}}
						/>
						<div
							style={{
								position: 'absolute',
								right: 18,
								top: 16,
								width: 58,
								height: 6,
								opacity: 0.58,
								background: `linear-gradient(90deg, transparent, ${tone})`,
								boxShadow: `0 0 18px ${tone}`,
							}}
						/>
						<div
							style={{
								position: 'relative',
								color: tone,
								fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
								fontSize: compact ? 14 : 15,
								fontWeight: 900,
								letterSpacing: 0,
								textTransform: 'uppercase',
								textShadow: `0 0 18px ${tone}66`,
							}}
						>
							{card.label}
						</div>
						<div
							style={{
								position: 'relative',
								color: '#f8fbff',
								fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
								fontSize: compact ? 26 : 30,
								fontWeight: 850,
								lineHeight: 1.04,
								letterSpacing: 0,
								marginTop: compact ? 12 : 16,
								textShadow: '0 0 22px rgba(255,255,255,0.16)',
							}}
						>
							{card.value}
						</div>
					</div>
				);
			})}
		</div>
	);
};
