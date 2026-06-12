import type { SceneDefinition } from '../data';
import { AiMisbeliefScene } from './AiMisbeliefScene';
import { AutomateBestPracticeScene } from './AutomateBestPracticeScene';
import { DefinitionScene } from './DefinitionScene';
import { HookScene } from './HookScene';
import { MappingScene } from './MappingScene';
import { ProcessGapsScene } from './ProcessGapsScene';
import { RealityCheckScene } from './RealityCheckScene';
import { RealProblemScene } from './RealProblemScene';
import { ScaleAccuracyScene } from './ScaleAccuracyScene';
import { TopicRevealScene } from './TopicRevealScene';

export const processOptimizationScenes: SceneDefinition[] = [
	{
		id: 'hook',
		startFrame: 0,
		durationFrames: 165,
		component: HookScene,
	},
	{
		id: 'real-problem',
		startFrame: 165,
		durationFrames: 219,
		component: RealProblemScene,
	},
	{
		id: 'ai-misbelief',
		startFrame: 384,
		durationFrames: 222,
		component: AiMisbeliefScene,
	},
	{
		id: 'reality-check',
		startFrame: 606,
		durationFrames: 249,
		component: RealityCheckScene,
	},
	{
		id: 'process-gaps',
		startFrame: 855,
		durationFrames: 369,
		component: ProcessGapsScene,
	},
	{
		id: 'topic-reveal',
		startFrame: 1224,
		durationFrames: 192,
		component: TopicRevealScene,
	},
	{
		id: 'definition',
		startFrame: 1416,
		durationFrames: 198,
		component: DefinitionScene,
	},
	{
		id: 'mapping',
		startFrame: 1614,
		durationFrames: 162,
		component: MappingScene,
	},
	{
		id: 'automate-best-practice',
		startFrame: 1776,
		durationFrames: 186,
		component: AutomateBestPracticeScene,
	},
	{
		id: 'scale-accuracy',
		startFrame: 1962,
		durationFrames: 156,
		component: ScaleAccuracyScene,
	},
];
