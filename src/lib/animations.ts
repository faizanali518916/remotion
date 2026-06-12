import { Easing, interpolate, spring } from 'remotion';

export const fadeIn = (frame: number, start: number, duration: number) =>
	interpolate(frame, [start, start + duration], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});

export const slideUp = (frame: number, start: number, duration: number, distance: number) =>
	interpolate(frame, [start, start + duration], [distance, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});

export const slideX = (frame: number, start: number, duration: number, from: number, to: number) =>
	interpolate(frame, [start, start + duration], [from, to], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});

export const springScale = (frame: number, fps: number, delay = 0) =>
	spring({
		frame: frame - delay,
		fps,
		from: 0.88,
		to: 1,
		config: {
			damping: 18,
			stiffness: 130,
			mass: 0.8,
		},
	});

export const stagger = (index: number, baseDelay: number, step: number) => baseDelay + index * step;

export const progressValue = (frame: number, start: number, duration: number) =>
	interpolate(frame, [start, start + duration], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.inOut(Easing.cubic),
	});
