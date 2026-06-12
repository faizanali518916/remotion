import React from 'react';

import { FlowDiagram, LightSweep, SceneStage } from '../../../components';
import type { StageSide } from '../data';

export const AutomateBestPracticeScene: React.FC<{ side: StageSide }> = ({ side }) => (
	<SceneStage side={side}>
		<LightSweep tone="green" />
		<FlowDiagram
			top={116}
			tone="#4ade80"
			steps={[
				{ label: 'standardize', value: 'best practice', tone: '#4ade80' },
				{ label: 'then', value: 'automate it', tone: '#67e8f9' },
			]}
		/>
		<FlowDiagram
			top={466}
			tone="#fb7185"
			steps={[
				{ label: 'avoid', value: 'broken practice', tone: '#fb7185' },
				{ label: 'risk', value: 'faster mess', tone: '#f97316' },
			]}
		/>
	</SceneStage>
);
