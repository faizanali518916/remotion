import React from 'react';
import { AbsoluteFill } from 'remotion';

import { AnimatedText } from '../../../components/AnimatedText';
import { DashboardCard } from '../../../components/DashboardCard';
import { dashboardCards } from '../../../lib/data';

const accents = ['#22d3ee', '#8b5cf6', '#22c55e'];

export const EcommerceAgencyScene: React.FC = () => {
	return (
		<AbsoluteFill
			style={{
				background:
					'radial-gradient(circle at 50% 34%, rgba(139,92,246,0.16), transparent 34%), linear-gradient(135deg, #020617, #07101c 56%, #020617)',
				color: '#fff',
				fontFamily: 'Inter, ui-sans-serif, system-ui, Arial, sans-serif',
				overflow: 'hidden',
			}}
		>
			{/* Grounds the brand promise in the operational realities of SMB, commerce, and agency teams. */}
			<div style={{ position: 'absolute', top: 76, left: 128, right: 128, textAlign: 'center' }}>
				<AnimatedText delay={0} style={{ fontSize: 60, lineHeight: 1.08, fontWeight: 850, letterSpacing: 0 }}>
					Built for eCommerce, agencies, and operations-heavy SMBs.
				</AnimatedText>
			</div>
			<div
				style={{
					position: 'absolute',
					left: 115,
					right: 115,
					top: 260,
					display: 'grid',
					gridTemplateColumns: 'repeat(3, 1fr)',
					gap: 28,
				}}
			>
				{dashboardCards.map((card, index) => (
					<DashboardCard key={card.title} {...card} accent={accents[index]} delay={32 + index * 18} />
				))}
			</div>
		</AbsoluteFill>
	);
};
