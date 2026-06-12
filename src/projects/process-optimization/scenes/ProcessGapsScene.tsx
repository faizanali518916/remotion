import React from 'react';

import { FlowDiagram, ProcessNodes, SceneStage } from '../../../components';
import type { StageSide } from '../data';

export const ProcessGapsScene: React.FC<{ side: StageSide }> = ({ side }) => (
	<SceneStage side={side}>
		<FlowDiagram
			top={104}
			tone="#fb7185"
			steps={[
				{ label: 'gap', value: 'step disconnects', tone: '#fb7185' },
				{ label: 'impact', value: 'inconsistent results', tone: '#f97316' },
			]}
		/>
		<ProcessNodes mode="broken" />
	</SceneStage>
);
