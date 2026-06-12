import type React from 'react';

export const PROCESS_OPTIMIZATION_FPS = 30;
export const PROCESS_OPTIMIZATION_WIDTH = 1920;
export const PROCESS_OPTIMIZATION_HEIGHT = 1080;
export const PROCESS_OPTIMIZATION_DURATION_IN_FRAMES = 2215;

export type StageSide = 'left' | 'right';

export type Caption = {
	start: number;
	end: number;
	text: string;
	emphasis: string[];
};

export type SceneId =
	| 'hook'
	| 'real-problem'
	| 'ai-misbelief'
	| 'reality-check'
	| 'process-gaps'
	| 'topic-reveal'
	| 'definition'
	| 'mapping'
	| 'automate-best-practice'
	| 'scale-accuracy'
	| 'cta';

export type SceneDefinition = {
	id: SceneId;
	startFrame: number;
	durationFrames: number;
	component: React.ComponentType<{ side: StageSide }>;
};

export const captions: Caption[] = [
	{
		start: 0,
		end: 2.2,
		text: 'Why do smart businesses fail?',
		emphasis: ['smart businesses', 'fail'],
	},
	{
		start: 2.2,
		end: 5.5,
		text: "It's not always the product or the market.",
		emphasis: ['product', 'market'],
	},
	{
		start: 5.5,
		end: 8.8,
		text: "In today's market, the real problem is messy internal operations.",
		emphasis: ['real problem', 'messy internal operations'],
	},
	{
		start: 8.8,
		end: 13,
		text: 'Teams are trusting AI to fix broken back-office practices.',
		emphasis: ['AI', 'broken'],
	},
	{
		start: 13,
		end: 17.2,
		text: 'AI can help, but it cannot save a broken process.',
		emphasis: ['AI can help', 'broken process'],
	},
	{
		start: 17.2,
		end: 20.2,
		text: 'Automation without clarity just makes the mess faster.',
		emphasis: ['Automation', 'mess faster'],
	},
	{
		start: 20.2,
		end: 24.5,
		text: 'The real issue is how the business actually operates.',
		emphasis: ['real issue', 'operates'],
	},
	{
		start: 24.5,
		end: 28.5,
		text: 'The gaps are inside the process, not just the tools.',
		emphasis: ['inside the process', 'not just the tools'],
	},
	{
		start: 28.5,
		end: 34,
		text: 'Disconnected steps create delays, confusion, and inconsistent results.',
		emphasis: ['delays', 'confusion', 'inconsistent results'],
	},
	{
		start: 34,
		end: 40.8,
		text: 'That is why process optimization has to come before automation.',
		emphasis: ['process optimization', 'before automation'],
	},
	{
		start: 40.8,
		end: 44,
		text: "Today, we're talking about process optimization.",
		emphasis: ['process optimization'],
	},
	{
		start: 44,
		end: 47.2,
		text: 'Simple idea: fix the process before you scale it.',
		emphasis: ['fix the process', 'scale'],
	},
	{
		start: 47.2,
		end: 52,
		text: 'At SPCTEK AI, we map how work gets done.',
		emphasis: ['SPCTEK AI', 'map'],
	},
	{
		start: 52,
		end: 56.2,
		text: 'Then we find bottlenecks, wasted steps, and repeatable tasks.',
		emphasis: ['bottlenecks', 'repeatable tasks'],
	},
	{
		start: 56.2,
		end: 61.8,
		text: 'After that, we automate the best practice, not the broken one.',
		emphasis: ['automate', 'best practice'],
	},
	{
		start: 61.8,
		end: 67,
		text: 'So when you scale, you scale with accuracy.',
		emphasis: ['scale', 'accuracy'],
	},
	{
		start: 67,
		end: 73.82,
		text: 'Get your free operations audit. Link in caption.',
		emphasis: ['free operations audit', 'Link in caption'],
	},
];

export const getSpeakerSide = (frame: number): StageSide => {
	if (frame < 606) {
		return 'right';
	}

	if (frame < 1224) {
		return 'left';
	}

	if (frame < 1776) {
		return 'right';
	}

	return 'left';
};

export const getAnimationSide = (frame: number): StageSide => (getSpeakerSide(frame) === 'left' ? 'right' : 'left');
