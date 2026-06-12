import { Easing, interpolate } from 'remotion';

import { PROCESS_OPTIMIZATION_FPS } from './data';

export const clamp = {
	extrapolateLeft: 'clamp' as const,
	extrapolateRight: 'clamp' as const,
};

export const ease = Easing.bezier(0.16, 1, 0.3, 1);

export const secondsToFrame = (seconds: number) => Math.round(seconds * PROCESS_OPTIMIZATION_FPS);

const speakerTravelWindows = [
	{ fadeOutStart: 546, hiddenStart: 566, hiddenEnd: 626, fadeInEnd: 652 },
	{ fadeOutStart: 1164, hiddenStart: 1184, hiddenEnd: 1244, fadeInEnd: 1270 },
	{ fadeOutStart: 1716, hiddenStart: 1736, hiddenEnd: 1796, fadeInEnd: 1822 },
];

export const speakerTravelOpacity = (frame: number) =>
	speakerTravelWindows.reduce((opacity, window) => {
		if (frame < window.fadeOutStart || frame > window.fadeInEnd) {
			return opacity;
		}

		if (frame < window.hiddenStart) {
			return Math.min(
				opacity,
				interpolate(frame, [window.fadeOutStart, window.hiddenStart], [1, 0], {
					...clamp,
					easing: Easing.out(Easing.cubic),
				})
			);
		}

		if (frame <= window.hiddenEnd) {
			return 0;
		}

		return Math.min(
			opacity,
			interpolate(frame, [window.hiddenEnd, window.fadeInEnd], [0, 1], {
				...clamp,
				easing: ease,
			})
		);
	}, 1);
