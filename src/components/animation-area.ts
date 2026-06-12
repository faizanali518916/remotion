import type { StageSide } from '../projects/process-optimization/data';

export const animationAreaForSide = (side: StageSide) => ({
	left: side === 'left' ? 92 : 788,
	width: 948,
});
