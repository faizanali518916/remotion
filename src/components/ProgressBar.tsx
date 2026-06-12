import React from 'react';

type ProgressBarProps = {
	value: number;
	accent?: string;
	height?: number;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ value, accent = '#22d3ee', height = 10 }) => {
	const clamped = Math.max(0, Math.min(1, value));

	return (
		<div
			style={{
				height,
				width: '100%',
				borderRadius: 999,
				background: 'rgba(148,163,184,0.18)',
				overflow: 'hidden',
			}}
		>
			<div
				style={{
					width: `${clamped * 100}%`,
					height: '100%',
					borderRadius: 999,
					background: `linear-gradient(90deg, ${accent}, #a78bfa)`,
					boxShadow: `0 0 28px ${accent}`,
				}}
			/>
		</div>
	);
};
